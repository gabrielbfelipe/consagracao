/**
 * Prova que trocar a data da consagração não leva nada embora.
 *
 * Uso: node --env-file=.env.local scripts/verificar-troca-de-data.mjs
 *      BASE=https://… node --env-file=.env.local scripts/verificar-troca-de-data.mjs
 *
 * É a prova que importa nesta funcionalidade. O diário, a carta do primeiro
 * dia, o motivo e o progresso pendem da jornada: se a troca abrisse uma
 * jornada nova em vez de mover a que existe, tudo isso ficaria preso à
 * antiga — vivo, invisível e inalcançável. Por isso o ensaio compara o
 * IDENTIFICADOR da jornada antes e depois, e não apenas as datas.
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

const email = `troca-${Date.now()}@exemplo.test`;
const SENHA = "umaSenhaLonga123";
// O botão de selar só acorda com 40 caracteres, e com razão: uma carta de
// três palavras não é uma carta.
const SEGREDO =
  "Carta escrita antes de trocar a data, para provar que a troca não a leva embora.";

const provas = [];
const prova = (nome, ok, detalhe = "") => provas.push({ nome, ok, detalhe });

const navegador = await chromium.launch({
  args: ["--disable-background-timer-throttling", "--disable-renderer-backgrounding"],
});
const ctx = await navegador.newContext({ viewport: { width: 1440, height: 1000 } });
const p = await ctx.newPage();

let usuario = null;

/** As cartas de festas de verdade, sem a data de ensaio. */
const cartoesReais = () =>
  p.locator("main ul li a").filter({ hasNotText: "Dia de ensaio" });

try {
  // --- Conta e primeira data ---------------------------------------------
  await p.goto(`${BASE}/cadastro`, { waitUntil: "networkidle" });
  await p.fill("input[name=\"nome\"]", "Troca de Data");
  await p.fill("input[name=\"email\"]", email);
  await p.fill("input[name=\"senha\"]", SENHA);
  await p.fill("input[name=\"senha_repetida\"]", SENHA);
  await p.check("input[name=\"consentimento\"]");
  await p.click("button[type=\"submit\"]");
  await p.waitForURL("**/calendario", { timeout: 30000 });

  prova(
    "sem jornada, o calendário convida a escolher",
    (await p.textContent("body")).includes("Em que dia você deseja se consagrar"),
  );

  await cartoesReais().first().click();
  await p.waitForURL("**/calendario/**", { timeout: 20000 });
  const primeiraFesta = new URL(p.url()).pathname.split("/").pop();
  await p.locator("button").filter({ hasText: "Escolher esta data" }).click();
  await p.waitForURL("**/caminho", { timeout: 30000 });

  const { data: lista } = await admin.auth.admin.listUsers({ perPage: 1000 });
  usuario = lista.users.find((u) => u.email === email);

  const jornadas = async () =>
    (
      await admin
        .from("jornadas")
        .select("id, festa_id, inicio, consagracao")
        .eq("perfil_id", usuario.id)
        .order("criado_em", { ascending: false })
    ).data ?? [];

  const antes = await jornadas();
  prova("a primeira escolha abre uma jornada", antes.length === 1, antes[0]?.festa_id);

  // --- Deixa rastro: carta pela tela, diário pela base -------------------
  await p.goto(`${BASE}/carta`, { waitUntil: "networkidle" });
  await p.locator("textarea").first().fill(SEGREDO);
  await p.locator("button").filter({ hasText: "Selar a carta" }).click();
  await p.locator("button").filter({ hasText: "Sim, selar" }).click();
  await p.waitForTimeout(2500);

  const { data: cartaAntes } = await admin
    .from("carta_primeiro_dia")
    .select("jornada_id")
    .eq("jornada_id", antes[0].id)
    .maybeSingle();
  prova("a carta ficou guardada antes da troca", Boolean(cartaAntes));

  // O diário entra por aqui porque escrevê-lo pela tela exigiria abrir um
  // dia que ainda não chegou; o que se quer provar é a sobrevivência dele.
  await admin.from("diario").insert({
    jornada_id: antes[0].id,
    dia: 1,
    tipo: "livre",
    texto: "Anotação feita antes de trocar a data.",
  });
  await admin.from("meu_motivo").insert({
    jornada_id: antes[0].id,
    texto: "Meu motivo, escrito antes da troca.",
  });

  // --- A porta para trocar ------------------------------------------------
  await p.goto(`${BASE}/caminho`, { waitUntil: "networkidle" });
  const elo = p.locator("a").filter({ hasText: "Trocar a data da consagração" });
  prova("o caminho oferece trocar a data", (await elo.count()) > 0);
  await elo.first().click();
  await p.waitForURL("**/calendario**", { timeout: 20000 });

  const noCalendario = await p.textContent("body");
  prova(
    "o calendário passa a falar em trocar",
    noCalendario.includes("Para que dia você quer mudar"),
  );
  prova(
    "e diz que nada do que foi escrito se perde",
    noCalendario.includes("Nada do que você escreveu se perde"),
  );
  prova("e marca qual é a data de hoje", noCalendario.includes("Esta é a sua data"));

  // --- Troca para outra data ---------------------------------------------
  const outro = cartoesReais().filter({ hasNotText: "Esta é a sua data" }).first();
  await outro.click();
  await p.waitForURL("**/calendario/**", { timeout: 20000 });
  const segundaFesta = new URL(p.url()).pathname.split("/").pop();
  prova("a segunda data é mesmo outra", segundaFesta !== primeiraFesta, `${primeiraFesta} → ${segundaFesta}`);

  const naFesta = await p.textContent("body");
  prova(
    "a tela da festa avisa que é troca",
    naFesta.includes("Trocar para esta data"),
  );
  prova(
    "e diz de que data para que data",
    /Sua data passa de .+ para /.test(naFesta.replace(/\s+/g, " ")),
  );

  await p.locator("button").filter({ hasText: "Trocar para esta data" }).click();
  await p.waitForURL("**/caminho", { timeout: 30000 });

  // --- O que sobreviveu ---------------------------------------------------
  const depois = await jornadas();
  prova("continua havendo uma só jornada", depois.length === 1, `${depois.length}`);
  prova(
    "é a MESMA jornada, movida, e não outra",
    depois[0]?.id === antes[0]?.id,
    depois[0]?.id === antes[0]?.id ? "" : "abriu jornada nova — o histórico ficaria órfão",
  );
  prova(
    "a festa mudou",
    depois[0]?.festa_id === segundaFesta,
    `${antes[0]?.festa_id} → ${depois[0]?.festa_id}`,
  );
  prova(
    "e o intervalo de 33 dias continua intacto",
    (new Date(depois[0].consagracao) - new Date(depois[0].inicio)) / 86400000 === 33,
  );

  const sobrou = async (tabela) =>
    (
      await admin
        .from(tabela)
        .select("jornada_id")
        .eq("jornada_id", antes[0].id)
    ).data?.length ?? 0;

  prova("a carta do primeiro dia sobreviveu", (await sobrou("carta_primeiro_dia")) === 1);
  prova("o diário sobreviveu", (await sobrou("diario")) === 1);
  prova("o meu motivo sobreviveu", (await sobrou("meu_motivo")) === 1);

  // --- Voltar à mesma data não oferece botão -----------------------------
  await p.goto(`${BASE}/calendario/${segundaFesta}?ano=${depois[0].consagracao.slice(0, 4)}`, {
    waitUntil: "networkidle",
  });
  const naMesma = await p.textContent("body");
  prova(
    "na data que já é a sua, não há botão de trocar",
    naMesma.includes("Esta já é a sua data") &&
      (await p.locator("button").filter({ hasText: "Trocar para esta data" }).count()) === 0,
  );
} catch (erro) {
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
