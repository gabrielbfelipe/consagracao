/**
 * Percorre o cadastro, a entrada e as regras de navegação de quem está
 * dentro, e confere na base o que ficou guardado.
 *
 * Uso: node --env-file=.env.local scripts/verificar-cadastro.mjs
 *      BASE=https://… node --env-file=.env.local scripts/verificar-cadastro.mjs
 *
 * Cria uma conta descartável, verifica tudo por ela, e apaga no fim — na
 * base, e não só na tela: várias destas provas só valem se a linha em
 * public.perfis for lida de fora do aplicativo.
 */
import { chromium } from "playwright";
import { createClient } from "@supabase/supabase-js";

const BASE = process.env.BASE ?? "http://localhost:3000";

const admin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { autoRefreshToken: false, persistSession: false } },
);

const email = `ensaio-${Date.now()}@exemplo.test`;
const SENHA = "umaSenhaLonga123";
const NOME = "Maria Aparecida de Souza";

const provas = [];
const prova = (nome, ok, detalhe = "") => provas.push({ nome, ok, detalhe });

const navegador = await chromium.launch({
  args: [
    "--disable-background-timer-throttling",
    "--disable-renderer-backgrounding",
  ],
});
const ctx = await navegador.newContext({
  viewport: { width: 1440, height: 900 },
});
const p = await ctx.newPage();

let usuario = null;

try {
  // --- 1. A tela de entrada leva ao cadastro ------------------------------
  await p.goto(`${BASE}/entrar`, { waitUntil: "networkidle" });
  const linkCadastro = p.locator("a[href=\"/cadastro\"]");
  prova("a entrada oferece link para o cadastro", (await linkCadastro.count()) > 0);
  await linkCadastro.first().click();
  await p.waitForURL("**/cadastro");

  // --- 2. Sem consentimento não se cadastra ------------------------------
  await p.fill("input[name=\"nome\"]", NOME);
  await p.fill("input[name=\"email\"]", email);
  await p.fill("input[name=\"senha\"]", SENHA);
  await p.fill("input[name=\"senha_repetida\"]", SENHA);
  await p.click("button[type=\"submit\"]");
  await p.waitForTimeout(1500);
  prova(
    "recusa o cadastro sem consentimento",
    p.url().includes("/cadastro") &&
      (await p.locator("[role=\"alert\"]").count()) > 0,
  );

  // A recusa não pode custar o que já foi digitado: o React limpa campos
  // não controlados depois de uma ação de formulário, e aqui são catorze.
  const sobrou = await p.evaluate(() => {
    const d = new FormData(document.querySelector("form"));
    return { nome: d.get("nome"), email: d.get("email") };
  });
  prova(
    "a recusa devolve o que já estava escrito",
    sobrou.nome === "Maria Aparecida de Souza" && sobrou.email !== "",
    `nome=${sobrou.nome || "(vazio)"}`,
  );

  // --- 3. O cadastro inteiro --------------------------------------------
  await p.fill("input[name=\"senha\"]", SENHA);
  await p.fill("input[name=\"senha_repetida\"]", SENHA);
  await p.fill("input[name=\"diocese\"]", "Arquidiocese de Campinas");
  await p.fill("input[name=\"paroquia\"]", "Nossa Senhora das Dores");
  await p.fill("input[name=\"movimento\"]", "Pastoral da juventude");
  await p.selectOption("select[name=\"uf\"]", "SP");
  await p.selectOption("select[name=\"faixa_etaria\"]", "25-34");
  await p.selectOption("select[name=\"estado_de_vida\"]", "casado");
  await p.selectOption("select[name=\"ja_se_consagrou\"]", "nao");
  await p.selectOption("select[name=\"frequencia_missa\"]", "semanal");
  await p.selectOption("select[name=\"reza_terco\"]", "as-vezes");
  await p.selectOption("select[name=\"como_conheceu\"]", "paroquia");
  await p.check("input[name=\"consentimento\"]");
  await p.click("button[type=\"submit\"]");
  await p.waitForURL("**/calendario", { timeout: 25000 });
  prova("o cadastro entra e vai ao calendário", p.url().includes("/calendario"));

  // --- 4. O que de fato ficou na base ------------------------------------
  const { data: lista } = await admin.auth.admin.listUsers({ perPage: 1000 });
  usuario = lista.users.find((u) => u.email === email);
  prova("a conta existe", Boolean(usuario));

  const { data: perfil } = await admin
    .from("perfis")
    .select("*")
    .eq("id", usuario.id)
    .single();

  const guardado = [
    ["nome", perfil.nome, NOME],
    ["diocese", perfil.diocese, "Arquidiocese de Campinas"],
    ["paróquia", perfil.paroquia, "Nossa Senhora das Dores"],
    ["movimento", perfil.movimento, "Pastoral da juventude"],
    ["uf", perfil.uf, "SP"],
    ["faixa etária", perfil.faixa_etaria, "25-34"],
    ["estado de vida", perfil.estado_de_vida, "casado"],
    ["já se consagrou", perfil.ja_se_consagrou, false],
    ["frequência à missa", perfil.frequencia_missa, "semanal"],
    ["terço", perfil.reza_terco, "as-vezes"],
    ["como conheceu", perfil.como_conheceu, "paroquia"],
  ];
  for (const [campo, obtido, esperado] of guardado) {
    prova(`guardou ${campo}`, obtido === esperado, String(obtido));
  }
  prova(
    "carimbou o consentimento",
    Boolean(perfil.consentimento_em),
    String(perfil.consentimento_em),
  );

  // A senha com que a conta nasceu é mesmo a que foi digitada? Perguntado
  // direto ao Supabase, fora do navegador, para separar um defeito do
  // cadastro de um defeito da tela de entrada.
  const anon = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    { auth: { autoRefreshToken: false, persistSession: false } },
  );
  const { error: erroDireto } = await anon.auth.signInWithPassword({
    email,
    password: SENHA,
  });
  prova(
    "a senha digitada no cadastro é a senha da conta",
    !erroDireto,
    erroDireto ? erroDireto.message : "",
  );

  // Cadastrar-se com um e-mail que já existe não pode trocar a senha de
  // quem já o tem. Sem verificação de e-mail, essa seria a tomada de conta
  // alheia mais barata que existe: basta saber o endereço.
  const ctxInvasor = await navegador.newContext();
  const invasor = await ctxInvasor.newPage();
  await invasor.goto(`${BASE}/cadastro`, { waitUntil: "networkidle" });
  await invasor.fill("input[name=\"nome\"]", "Outra Pessoa");
  await invasor.fill("input[name=\"email\"]", email);
  await invasor.fill("input[name=\"senha\"]", "senhaDoInvasor999");
  await invasor.fill("input[name=\"senha_repetida\"]", "senhaDoInvasor999");
  await invasor.check("input[name=\"consentimento\"]");
  await invasor.click("button[type=\"submit\"]");
  await invasor.locator("[role=\"alert\"]").first().waitFor({ timeout: 25000 });
  prova(
    "cadastrar-se com e-mail já usado é recusado",
    invasor.url().includes("/cadastro"),
    (await invasor.locator("[role=\"alert\"]").first().textContent()).trim(),
  );

  const { error: senhaTrocada } = await anon.auth.signInWithPassword({
    email,
    password: SENHA,
  });
  prova("e a senha de quem já tinha a conta continua valendo", !senhaTrocada);

  const { error: invasorEntrou } = await anon.auth.signInWithPassword({
    email,
    password: "senhaDoInvasor999",
  });
  prova("a senha do invasor não vale", Boolean(invasorEntrou));
  await ctxInvasor.close();

  // --- 5. A saudação pelo nome e pela hora -------------------------------
  const corpo = await p.textContent("body");
  // O textContent cola elementos vizinhos sem espaço, de modo que o nome
  // vem grudado no link seguinte. Basta conferir o começo.
  const achada = corpo.match(/Bo[am] (?:dia|tarde|noite), Maria/);
  prova(
    "saúda pela hora e pelo primeiro nome",
    Boolean(achada),
    achada ? achada[0] : "não encontrou saudação",
  );

  // --- 6. O cabeçalho não devolve à vitrine ------------------------------
  const abas = await p.$$eval("header nav a", (as) =>
    as.map((a) => a.getAttribute("href")),
  );
  prova(
    "nenhuma aba do cabeçalho aponta para a vitrine",
    abas.length > 0 && !abas.includes("/"),
    abas.join(" "),
  );

  for (const href of ["/biblioteca", "/calendario", "/diario"]) {
    await p.goto(`${BASE}${href}`, { waitUntil: "networkidle" });
    const ficou = new URL(p.url()).pathname !== "/";
    const temSair = (await p.locator("form button").filter({ hasText: "Sair" }).count()) > 0;
    prova(`${href} mantém quem está dentro`, ficou && temSair, p.url());
  }

  await p.goto(`${BASE}/`, { waitUntil: "networkidle" });
  prova(
    "a vitrine devolve para dentro quem já entrou",
    new URL(p.url()).pathname !== "/",
    p.url(),
  );

  // --- 7. A prévia, antes de escolher a data -----------------------------
  await p.goto(`${BASE}/calendario`, { waitUntil: "networkidle" });
  await p.locator("main ul li a").first().click();
  // waitForLoadState sozinho resolve na página velha quando a navegação
  // ainda nem começou. É preciso esperar a URL mudar.
  await p.waitForURL("**/calendario/**", { timeout: 20000 });
  await p.waitForLoadState("networkidle");
  const previa = await p.textContent("body");
  prova("a prévia mostra os sete passos do dia", previa.includes("Todo dia, sete passos"));
  prova("a prévia mostra o que se reza em cada etapa", previa.includes("O que se reza em cada etapa"));
  prova("a prévia mostra o primeiro dia de verdade", previa.includes("Seu primeiro dia"));
  prova("a prévia diz que o livro é necessário", previa.includes("exemplar do Tratado"));
  prova(
    "o botão de escolher a data continua lá",
    (await p.locator("button").filter({ hasText: "Escolher esta data" }).count()) > 0,
  );

  // --- 8. A sessão não sobrevive ao navegador ----------------------------
  const biscoitos = await ctx.cookies();
  const daSessao = biscoitos.filter(
    (c) => c.name.startsWith("sb-") || c.name === "sessao_aberta_em",
  );
  const comValidade = daSessao.filter((c) => c.expires && c.expires > 0);
  prova(
    "os cookies de sessão morrem com o navegador",
    daSessao.length > 0 && comValidade.length === 0,
    `${daSessao.length} cookies, ${comValidade.length} com data de validade`,
  );

  const ctx2 = await navegador.newContext();
  const p2 = await ctx2.newPage();
  await p2.goto(`${BASE}/caminho`, { waitUntil: "networkidle" });
  prova("navegador novo tem de entrar de novo", p2.url().includes("/entrar"), p2.url());

  // --- 9. Entrar: a senha errada não passa, a certa passa ----------------
  await p2.fill("input[name=\"email\"]", email);
  await p2.fill("input[name=\"senha\"]", "senhaErrada123");
  await p2.click("button[type=\"submit\"]");
  await p2.locator("[role=\"alert\"]").first().waitFor({ timeout: 25000 });
  prova("senha errada não entra", p2.url().includes("/entrar"));

  // O alerta aparece antes de o React terminar de reinicializar o
  // formulário. Preencher nesse intervalo é escrever num campo que será
  // limpo logo a seguir. O botão voltando a "Entrar" é o sinal de que
  // assentou.
  await p2
    .locator("button[type=\"submit\"]")
    .filter({ hasText: "Entrar" })
    .first()
    .waitFor({ state: "visible", timeout: 25000 });
  await p2.waitForFunction(
    () => !document.querySelector("button[type=\"submit\"]").disabled,
    null,
    { timeout: 25000 },
  );

  await p2.fill("input[name=\"senha\"]", SENHA);
  const enviado = await p2.evaluate(() => {
    const d = new FormData(document.querySelector("form"));
    return {
      email: d.get("email"),
      senha: String(d.get("senha") ?? ""),
      destino: d.get("destino"),
    };
  });
  prova(
    "o formulário leva o e-mail e a senha certos",
    enviado.email === email && enviado.senha === SENHA,
    `email=${enviado.email} senha=${enviado.senha.length} caracteres destino=${enviado.destino}`,
  );
  await p2.click("button[type=\"submit\"]");
  // Espera fixa aqui mente: a ação de servidor responde 200 e a navegação
  // vem depois, no payload. Já mediu 3,8s numa máquina lenta.
  const entrou = await p2
    .waitForURL((u) => !u.pathname.startsWith("/entrar"), { timeout: 25000 })
    .then(() => true)
    .catch(() => false);
  const queixa = entrou
    ? ""
    : await p2
        .locator("[role=\"alert\"]")
        .first()
        .textContent()
        .then((t) => (t ?? "").trim())
        .catch(() => "sem alerta");
  prova("a senha certa entra", entrou, `${p2.url()} ${queixa}`);
  if (!entrou) throw new Error(`entrada recusada: ${queixa}`);

  // --- 10. A trava de duração, que o navegador não contorna --------------
  //
  // Esperar doze horas não é opção: envelhece-se o carimbo. É justamente
  // este o caso que o cookie de sessão sozinho não cobre — navegador que
  // restaura a sessão ao reabrir devolveria o token com o carimbo antigo.
  const agora = await ctx2.cookies();
  const carimbo = agora.find((c) => c.name === "sessao_aberta_em");
  prova("a sessão leva carimbo de abertura", Boolean(carimbo));

  await ctx2.addCookies([
    {
      ...carimbo,
      value: String(Date.now() - 13 * 60 * 60 * 1000),
    },
  ]);
  await p2.goto(`${BASE}/caminho`, { waitUntil: "networkidle" });
  prova(
    "sessão velha demais é encerrada no servidor",
    p2.url().includes("/entrar") && p2.url().includes("expirou"),
    p2.url(),
  );
  const restantes = await ctx2.cookies();
  prova(
    "e os cookies da sessão vão junto",
    restantes.filter((c) => c.name.startsWith("sb-")).length === 0,
    restantes.map((c) => c.name).join(" ") || "(nenhum)",
  );
  prova(
    "a tela explica por que pede a senha de novo",
    (await p2.textContent("body")).includes("Sua sessão foi encerrada"),
  );

  // Entra de novo para o último passo.
  await p2.fill("input[name=\"email\"]", email);
  await p2.fill("input[name=\"senha\"]", SENHA);
  await p2.click("button[type=\"submit\"]");
  await p2.waitForURL((u) => !u.pathname.startsWith("/entrar"), { timeout: 25000 });

  // --- 11. Sair é o único caminho de volta à vitrine ---------------------
  await p2.goto(`${BASE}/caminho`, { waitUntil: "networkidle" });
  const temSairNoCaminho =
    (await p2.locator("form button").filter({ hasText: "Sair" }).count()) > 0;
  prova("o pórtico de /caminho oferece a saída", temSairNoCaminho, p2.url());
  await p2.locator("form button").filter({ hasText: "Sair" }).first().click();
  const saiu = await p2
    .waitForURL((u) => u.pathname === "/", { timeout: 25000 })
    .then(() => true)
    .catch(() => false);
  prova("sair devolve à vitrine", saiu, p2.url());
} catch (erro) {
  // Um passo que estoura não pode levar embora o que os anteriores apuraram.
  prova("o roteiro chegou ao fim", false, String(erro).split("\n")[0]);
} finally {
  if (usuario) await admin.auth.admin.deleteUser(usuario.id);
  await navegador.close();

  let falhou = false;
  for (const { nome, ok, detalhe } of provas) {
    if (!ok) falhou = true;
    console.log(`${ok ? "ok   " : "FALHA"} ${nome.padEnd(50)} ${detalhe}`);
  }
  console.log(
    `\n${falhou ? "HÁ FALHAS" : `${provas.length} provas, todas passam.`}`,
  );
  process.exit(falhou ? 1 : 0);
}
