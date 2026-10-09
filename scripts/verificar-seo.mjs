/**
 * Confere, contra o site no ar, o que nenhum teste local consegue conferir.
 *
 * Uso: npm run verificar:seo
 *      npm run verificar:seo -- https://outro-endereco.com.br
 *
 * POR QUE ISTO EXISTE
 * O endereço canónico esteve apontando para consagracao-plum.vercel.app
 * depois de o projeto ganhar domínio próprio e o antigo deixar de existir.
 * O site servia páginas perfeitas cujo canonical dizia ao Google "o original
 * está noutro sítio" — e o outro sítio devolvia 404.
 *
 * Nada falhou: nem a compilação, nem o lint, nem os noventa e seis testes.
 * Um teste local não tem como saber qual é o domínio de verdade; só
 * perguntando ao site no ar é que se descobre. É o que este script faz.
 *
 * Rode-o depois de publicar, e sempre que mudar de domínio.
 */
import { readFileSync } from "node:fs";
import path from "node:path";

const RAIZ = path.resolve(import.meta.dirname, "..");

/**
 * O endereço e o nome do arquivo de verificação saem de lib/seo/site.ts, que
 * é a mesma fonte que as páginas usam — conferir contra uma cópia escrita
 * aqui seria conferir o script contra ele próprio.
 *
 * Lidos por expressão regular porque o Node não importa TypeScript: compilar
 * só para ler duas linhas seria desproporcionado. Se a linha mudar de forma,
 * o script para e diz qual é, em vez de adivinhar.
 */
function lerDeSite(padrao, oQue) {
  const fonte = readFileSync(path.join(RAIZ, "src/lib/seo/site.ts"), "utf8");
  const m = fonte.match(padrao);
  if (!m) {
    console.error(`Não encontrei ${oQue} em src/lib/seo/site.ts.`);
    process.exit(1);
  }
  return m[1];
}

const BASE = (
  process.argv[2] ?? lerDeSite(/NEXT_PUBLIC_SITE_URL \?\? "([^"]+)"/, "o endereço do site")
).replace(/\/+$/, "");
const ARQUIVO_DE_VERIFICACAO = lerDeSite(
  /ARQUIVO_DE_VERIFICACAO = "([^"]+)"/,
  "o arquivo de verificação do Search Console",
);

let falhas = 0;

function conta(ok, titulo, detalhe = "") {
  if (!ok) falhas++;
  console.log(`${ok ? "ok   " : "FALHA"} ${titulo}${detalhe ? ` — ${detalhe}` : ""}`);
}

async function pegar(caminho) {
  const resposta = await fetch(BASE + caminho, {
    redirect: "follow",
    headers: { "user-agent": "verificador-seo (projeto consagracao)" },
  });
  return { status: resposta.status, corpo: await resposta.text() };
}

console.log(`Conferindo ${BASE}\n`);

// 1. O site responde.
const home = await pegar("/");
conta(home.status === 200, "a página inicial responde", `status ${home.status}`);

// 2. O canonical aponta para este mesmo endereço. Era isto que estava errado.
const canonical = home.corpo.match(/rel="canonical" href="([^"]+)"/)?.[1] ?? "";
conta(
  canonical.startsWith(BASE),
  "o canonical aponta para este domínio",
  canonical || "não encontrado",
);

// 3. O domínio do canonical existe mesmo. Um canonical para um endereço
//    morto é pior do que nenhum: manda o Google desindexar a página boa.
if (canonical) {
  const alvo = await fetch(canonical, { redirect: "follow" }).catch(() => null);
  conta(alvo?.ok === true, "o domínio do canonical está no ar", `status ${alvo?.status ?? "sem resposta"}`);
}

// 4. O robots aponta para o sitemap deste domínio.
const robots = await pegar("/robots.txt");
conta(robots.status === 200, "o robots.txt responde");
conta(
  robots.corpo.includes(`${BASE}/sitemap.xml`),
  "o robots.txt aponta para o sitemap daqui",
);

// 5. O sitemap existe, tem endereços e todos são deste domínio.
const sitemap = await pegar("/sitemap.xml");
const enderecos = [...sitemap.corpo.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
conta(enderecos.length > 0, "o sitemap tem endereços", `${enderecos.length}`);
conta(
  enderecos.every((e) => e.startsWith(BASE)),
  "todos os endereços do sitemap são deste domínio",
  enderecos.find((e) => !e.startsWith(BASE)) ?? "",
);

// 6. Uma amostra do sitemap responde de verdade. Submeter endereços mortos
//    ao Google queima a confiança do arquivo inteiro.
const amostra = [enderecos[0], enderecos[Math.floor(enderecos.length / 2)], enderecos.at(-1)]
  .filter(Boolean);
for (const endereco of amostra) {
  const r = await fetch(endereco, { redirect: "follow" }).catch(() => null);
  conta(r?.ok === true, `responde: ${endereco.slice(BASE.length) || "/"}`, `status ${r?.status ?? "—"}`);
}

// 7. A verificação do Search Console. O Google revalida de tempos a tempos e
//    tira a propriedade se o arquivo sumir.
const verificacao = await pegar(`/${ARQUIVO_DE_VERIFICACAO}`);
conta(
  verificacao.status === 200 &&
    verificacao.corpo.trim() === `google-site-verification: ${ARQUIVO_DE_VERIFICACAO}`,
  "o arquivo do Search Console está servido com o conteúdo exato",
  `status ${verificacao.status}`,
);

// 8. A imagem de partilha. É a única parte do SEO que não aparece no HTML
//    como texto, e a que mais silenciosamente deixa de funcionar.
const ogImagem = home.corpo.match(/property="og:image" content="([^"]+)"/)?.[1];
if (ogImagem) {
  const r = await fetch(ogImagem).catch(() => null);
  const tipo = r?.headers.get("content-type") ?? "";
  conta(r?.ok === true && tipo.startsWith("image/"), "a imagem de partilha responde", tipo);
} else {
  conta(false, "a página inicial declara og:image");
}

// 9. As salas pessoais ficam fora do índice.
for (const sala of ["/caminho", "/diario"]) {
  const r = await fetch(BASE + sala, { redirect: "manual" });
  const ok = r.status === 307 || r.status === 308 || r.status === 302;
  conta(ok, `${sala} não abre sem sessão`, `status ${r.status}`);
}

console.log(falhas ? `\n${falhas} falha(s)` : "\ntudo certo");
process.exit(falhas ? 1 : 0);
