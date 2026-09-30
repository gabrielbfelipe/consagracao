/**
 * Publica na Vercel usando a API de arquivos.
 *
 * Uso: node --env-file=.env.local scripts/publicar.mjs [--preview]
 *
 * A CLI da Vercel começa listando times, o que um token de escopo de projeto
 * não alcança. Aqui falamos direto com a API: sobem-se os arquivos por SHA e
 * cria-se o deployment referenciando-os.
 *
 * A lista de arquivos vem de `git ls-files`, de modo que o que o Git ignora
 * — .env.local à frente de tudo — nunca é enviado.
 */
import { createHash } from "node:crypto";
import { execFileSync } from "node:child_process";
import { readFile } from "node:fs/promises";
import path from "node:path";

const TOKEN = process.env.VERCEL_TOKEN;
const PROJETO = "consagracao";
const RAIZ = path.resolve(import.meta.dirname, "..");
const producao = !process.argv.includes("--preview");

if (!TOKEN) {
  console.error("Falta VERCEL_TOKEN no ambiente.");
  process.exit(1);
}

/** Arquivos que o Git rastreia — nunca os que ele ignora. */
function arquivosRastreados() {
  const saida = execFileSync("git", ["ls-files", "-z"], {
    cwd: RAIZ,
    encoding: "utf8",
    maxBuffer: 64 * 1024 * 1024,
  });
  return saida.split("\0").filter(Boolean);
}

async function api(caminho, opcoes = {}) {
  const resposta = await fetch(`https://api.vercel.com${caminho}`, {
    ...opcoes,
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      ...opcoes.headers,
    },
  });

  const corpo = await resposta.text();
  if (!resposta.ok) {
    throw new Error(`${opcoes.method ?? "GET"} ${caminho} → ${resposta.status}\n${corpo}`);
  }
  return corpo ? JSON.parse(corpo) : null;
}

/**
 * O que existe na pasta mas não seria enviado.
 *
 * Publica-se o que o Git rastreia, e um arquivo novo sem commit sumiria em
 * silêncio — o deploy diria "pronto" sem levar o que se acabou de escrever.
 * Melhor recusar do que publicar pela metade.
 */
function pendencias() {
  const saida = execFileSync(
    "git",
    ["status", "--porcelain", "--untracked-files=normal"],
    { cwd: RAIZ, encoding: "utf8" },
  );
  return saida
    .split("\n")
    .filter(Boolean)
    .map((linha) => ({ marca: linha.slice(0, 2), arquivo: linha.slice(3) }));
}

// --- 1. Ler e resumir cada arquivo ------------------------------------------

const soltos = pendencias();
if (soltos.length > 0 && !process.argv.includes("--mesmo-assim")) {
  console.error("Há mudanças que não seriam publicadas, porque o Git não as segue:\n");
  soltos.forEach(({ marca, arquivo }) =>
    console.error(`  ${marca.trim() === "??" ? "novo " : "alterado"}  ${arquivo}`),
  );
  console.error(
    "\nFaça commit antes de publicar, ou repita com --mesmo-assim para ignorar.",
  );
  process.exit(1);
}

const caminhos = arquivosRastreados();
console.log(`${caminhos.length} arquivos rastreados pelo Git.`);

const arquivos = [];
for (const relativo of caminhos) {
  const conteudo = await readFile(path.join(RAIZ, relativo));
  arquivos.push({
    file: relativo.split(path.sep).join("/"),
    sha: createHash("sha1").update(conteudo).digest("hex"),
    size: conteudo.byteLength,
    conteudo,
  });
}

const total = arquivos.reduce((t, a) => t + a.size, 0);
console.log(`${(total / 1024).toFixed(0)} KB no total.`);

// --- 2. Enviar cada um, identificado pelo próprio resumo ---------------------

let enviados = 0;
for (const a of arquivos) {
  await api("/v2/files", {
    method: "POST",
    headers: {
      "Content-Type": "application/octet-stream",
      "Content-Length": String(a.size),
      "x-vercel-digest": a.sha,
    },
    body: a.conteudo,
  });
  enviados++;
  if (enviados % 20 === 0 || enviados === arquivos.length) {
    console.log(`  enviados ${enviados}/${arquivos.length}`);
  }
}

// --- 3. Criar o deployment referenciando os resumos --------------------------

console.log(`Criando deployment (${producao ? "produção" : "prévia"})…`);

const deployment = await api("/v13/deployments?skipAutoDetectionConfirmation=1", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    name: PROJETO,
    project: PROJETO,
    target: producao ? "production" : undefined,
    files: arquivos.map(({ file, sha, size }) => ({ file, sha, size })),
    projectSettings: { framework: "nextjs" },
  }),
});

console.log(`  ${deployment.id}`);
console.log(`  https://${deployment.url}`);

// --- 4. Acompanhar a construção ---------------------------------------------

const ESTADOS_FINAIS = ["READY", "ERROR", "CANCELED"];
let estado = deployment.readyState ?? deployment.status;
let voltas = 0;

while (!ESTADOS_FINAIS.includes(estado) && voltas < 150) {
  await new Promise((r) => setTimeout(r, 4000));
  const atual = await api(`/v13/deployments/${deployment.id}`);
  if (atual.readyState !== estado) {
    estado = atual.readyState;
    console.log(`  ${estado}`);
  }
  voltas++;
}

if (estado !== "READY") {
  console.error(`\nA construção terminou em ${estado}.`);
  process.exit(1);
}

const pronto = await api(`/v13/deployments/${deployment.id}`);
const dominios = [
  ...new Set([pronto.url, ...(pronto.alias ?? [])].filter(Boolean)),
];

console.log("\nNo ar:");
dominios.forEach((d) => console.log(`  https://${d}`));
