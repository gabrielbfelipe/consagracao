/**
 * Percorre a jornada de ensaio do Dia 1 ao Grande Dia.
 *
 * Uso: node --env-file=.env.local scripts/verificar-ensaio.mjs
 *      BASE=https://… node --env-file=.env.local scripts/verificar-ensaio.mjs
 *
 * É o ensaio do ensaio: confere que a data de ensaio aparece, que a jornada
 * começa hoje, que a régua anda de dia em dia, que cada um dos trinta e três
 * dias abre, e que no Grande Dia a carta do primeiro dia se abre — que é a
 * regra mais delicada do sistema e a única que só pode ser verificada
 * estando lá.
 *
 * Cria uma conta descartável e apaga no fim.
 */
import { chromium } from "playwright";
import { createClient } from "@supabase/supabase-js";

const BASE = process.env.BASE ?? "http://localhost:3000";
const admin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { autoRefreshToken: false, persistSession: false } },
);

const email = `ensaio33-${Date.now()}@exemplo.test`;
const SENHA = "umaSenhaLonga123";

const provas = [];
const prova = (nome, ok, detalhe = "") => provas.push({ nome, ok, detalhe });

const navegador = await chromium.launch({
  args: ["--disable-background-timer-throttling", "--disable-renderer-backgrounding"],
});
const ctx = await navegador.newContext({ viewport: { width: 1440, height: 1000 } });
const p = await ctx.newPage();

let usuario = null;

try {
  // --- Conta -------------------------------------------------------------
  await p.goto(`${BASE}/cadastro`, { waitUntil: "networkidle" });
  await p.fill("input[name=\"nome\"]", "Ensaio Completo");
  await p.fill("input[name=\"email\"]", email);
  await p.fill("input[name=\"senha\"]", SENHA);
  await p.fill("input[name=\"senha_repetida\"]", SENHA);
  await p.check("input[name=\"consentimento\"]");
  await p.click("button[type=\"submit\"]");
  await p.waitForURL("**/calendario", { timeout: 30000 });

  const { data: lista } = await admin.auth.admin.listUsers({ perPage: 1000 });
  usuario = lista.users.find((u) => u.email === email);

  // --- A data de ensaio está no calendário -------------------------------
  const cartao = p.locator("main ul li a").filter({ hasText: "Dia de ensaio" });
  prova("a data de ensaio aparece no calendário", (await cartao.count()) > 0);
  prova(
    "e diz que a preparação começa hoje",
    (await cartao.first().textContent()).includes("começa hoje"),
  );
  prova(
    "e avisa que não é consagração",
    (await cartao.first().textContent()).includes("não é consagração"),
  );

  await cartao.first().click();
  await p.waitForURL("**/calendario/dia-de-ensaio**", { timeout: 20000 });
  await p.locator("button").filter({ hasText: "Escolher esta data" }).click();
  await p.waitForURL("**/caminho", { timeout: 30000 });

  const barra = p.locator("text=Ensaio").first();
  prova("a régua de ensaio aparece", await barra.isVisible());

  const corpoInicial = await p.textContent("body");
  prova(
    "a jornada começa no Dia 1",
    /Dia 1 de 33/.test(corpoInicial),
    (corpoInicial.match(/Dia \d+ de 33/) ?? ["—"])[0],
  );

  // --- Anda pelos 33 dias ------------------------------------------------
  const diaDaRegua = () =>
    p.evaluate(() => {
      const t = document.body.innerText.match(/Dia (\d+) de 33|Grande Dia/);
      return t ? (t[1] ? Number(t[1]) : 34) : null;
    });

  /**
   * Espera a régua chegar ao dia pedido.
   *
   * waitForLoadState("networkidle") não serve aqui, e isso custou uma volta
   * inteira a perceber: o botão não navega — chama a ação e depois pede ao
   * roteador que recarregue. Entre o clique e a tela repintada há uma ida ao
   * servidor que a rede já deu por sossegada, de modo que a leitura caía no
   * valor antigo e acusava um atraso de exactamente um dia, sempre.
   */
  async function esperarDia(alvo, limite = 15000) {
    const fim = Date.now() + limite;
    while (Date.now() < fim) {
      if ((await diaDaRegua()) === alvo) return true;
      await p.waitForTimeout(150);
    }
    return false;
  }

  const falhas = [];
  for (let d = 1; d <= 33; d++) {
    if (d > 1) {
      await p.locator("button").filter({ hasText: "Próximo" }).click();
    }

    if (!(await esperarDia(d))) {
      falhas.push(`régua diz ${await diaDaRegua()} quando devia dizer ${d}`);
      continue;
    }

    // A tela do dia tem de abrir, e com o conteúdo daquele dia.
    await p.goto(`${BASE}/dia/${d}`, { waitUntil: "networkidle" });
    const texto = await p.textContent("body");
    const abriu = !/não encontr|Application error/i.test(texto);
    const temPassos = /Prepare-se|Leia|Medite|Reze/.test(texto);
    if (!abriu || !temPassos) {
      falhas.push(
        `dia ${d} não abriu — ${texto.replace(/\s+/g, " ").trim().slice(0, 90)}`,
      );
    }

    await p.goto(`${BASE}/caminho`, { waitUntil: "networkidle" });
  }

  prova(
    "os trinta e três dias abrem, um a um",
    falhas.length === 0,
    falhas.slice(0, 3).join("; "),
  );

  // --- O Grande Dia ------------------------------------------------------
  await p.locator("button").filter({ hasText: "Grande Dia" }).first().click();
  prova("a régua chega ao Grande Dia", await esperarDia(34));

  const noGrandeDia = await p.textContent("body");
  prova(
    "o caminho anuncia o Grande Dia",
    /HOJE É O DIA|Grande Dia|chegou/i.test(noGrandeDia),
  );

  await p.goto(`${BASE}/grande-dia`, { waitUntil: "networkidle" });
  prova(
    "a sala do Grande Dia abre",
    !/Application error|não encontr/i.test(await p.textContent("body")),
    p.url(),
  );

  // --- A carta, que é a regra mais delicada ------------------------------
  // Volta ao Dia 1, escreve a carta, confere que fica lacrada, e só então
  // salta para o Grande Dia para a ver abrir.
  await p.goto(`${BASE}/caminho`, { waitUntil: "networkidle" });
  await p.locator("button").filter({ hasText: "Dia 1" }).first().click();
  await esperarDia(1);

  await p.goto(`${BASE}/carta`, { waitUntil: "networkidle" });

  const SEGREDO = "Carta de ensaio: se isto aparecer antes do Grande Dia, a regra falhou.";
  const campoCarta = p.locator("textarea").first();
  prova("no Dia 1 a carta ainda pode ser escrita", (await campoCarta.count()) > 0);

  await campoCarta.fill(SEGREDO);

  // Selar é em dois tempos de propósito: o gesto não se desfaz, e por isso
  // há uma confirmação. O ensaio tem de passar pelos dois, senão a carta
  // nunca chega a ser gravada e as provas seguintes medem o vazio.
  await p.locator("button").filter({ hasText: "Selar a carta" }).click();
  await p.locator("button").filter({ hasText: "Sim, selar" }).click();
  await p
    .locator("text=/lacrada|selada|Guardada/i")
    .first()
    .waitFor({ timeout: 20000 })
    .catch(() => {});
  await p.goto(`${BASE}/carta`, { waitUntil: "networkidle" });

  const antesDoDia = await p.textContent("body");
  prova(
    "e depois de selada fica lacrada, sem mostrar o texto",
    !antesDoDia.includes(SEGREDO),
    antesDoDia.includes(SEGREDO) ? "o texto vazou antes do Grande Dia" : "",
  );

  await p.goto(`${BASE}/caminho`, { waitUntil: "networkidle" });
  await p.locator("button").filter({ hasText: "Grande Dia" }).first().click();
  await esperarDia(34);
  await p.goto(`${BASE}/carta`, { waitUntil: "networkidle" });
  const depoisDoDia = await p.textContent("body");
  prova(
    "no Grande Dia a carta se abre",
    depoisDoDia.includes(SEGREDO),
  );

  // --- A régua não toca numa jornada de verdade --------------------------
  const { data: jornada } = await admin
    .from("jornadas")
    .select("festa_id, inicio, consagracao")
    .eq("perfil_id", usuario.id)
    .maybeSingle();
  prova(
    "a jornada continua marcada como ensaio",
    jornada?.festa_id === "dia-de-ensaio",
    jornada?.festa_id,
  );
  const dias =
    (new Date(jornada.consagracao) - new Date(jornada.inicio)) / 86400000;
  prova(
    "e o intervalo de 33 dias nunca foi quebrado",
    dias === 33,
    `${dias} dias`,
  );
} catch (erro) {
  prova("o roteiro chegou ao fim", false, String(erro).split("\n")[0]);
} finally {
  if (usuario) await admin.auth.admin.deleteUser(usuario.id);
  await navegador.close();

  let falhou = false;
  for (const { nome, ok, detalhe } of provas) {
    if (!ok) falhou = true;
    console.log(`${ok ? "ok   " : "FALHA"} ${nome.padEnd(48)} ${detalhe}`);
  }
  console.log(
    `\n${falhou ? "HÁ FALHAS" : `${provas.length} provas, todas passam.`}`,
  );
  process.exit(falhou ? 1 : 0);
}
