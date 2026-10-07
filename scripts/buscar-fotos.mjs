/**
 * Busca o título e o carrossel de fotos de cada produto de content/produtos.ts
 * e guarda o resultado em content/produtos-fotos.json.
 *
 * Uso: npm run produtos
 *      npm run produtos -- --so cadeia-aco-inox   (refaz só um)
 *      npm run produtos -- --tudo                 (refaz todos, ignora o cache)
 *
 * POR QUE AQUI, E NÃO NA HORA DE SERVIR A PÁGINA
 * As lojas limitam e bloqueiam leitura automática. Uma página que buscasse
 * a cada visita ficaria lenta e quebraria sem aviso, justamente quando
 * houvesse movimento. Aqui a busca acontece uma vez, na sua máquina, e o
 * resultado entra no repositório: a página passa a não depender de ninguém.
 *
 * O QUE ELE FAZ, EXATAMENTE
 * Abre o link seguindo os redirecionamentos dos links curtos de afiliado,
 * lê o HTML público da página do produto e recolhe os endereços das fotos
 * que o vendedor publicou. Não contorna bloqueio nenhum: se a loja recusar,
 * ele diz qual produto falhou e segue.
 *
 * O QUE ESPERAR DE CADA LOJA — LEIA ANTES DE SE FRUSTRAR
 * MERCADO LIVRE recusa quem não é navegador. Medido: a página devolve uma
 * casca sem fotos, e a API pública devolve 403. Para buscar de lá é preciso
 * credencial própria: registe uma aplicação em developers.mercadolivre.com.br
 * e ponha o token em ML_ACCESS_TOKEN no .env.local. Com ele, este script usa
 * a API oficial, que devolve o carrossel completo. Sem ele, é à mão.
 * AMAZON às vezes entrega a página e às vezes bloqueia, e não há aviso.
 * OUTRAS LOJAS costumam funcionar pela meta og:image, que dá uma foto.
 *
 * Quando falhar, preencha `fotos` à mão em content/produtos.ts. É um
 * minuto por produto e nunca mais quebra — e, francamente, escolher as
 * fotos dá um resultado melhor do que aceitar as que vierem.
 */
import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const RAIZ = path.dirname(fileURLToPath(new URL("../package.json", import.meta.url)));
const DESTINO = path.join(RAIZ, "src/content/produtos-fotos.json");

const argumentos = process.argv.slice(2);
const SO = valorDe("--so");
const TUDO = argumentos.includes("--tudo");

/** Quantas fotos guardar por produto. Carrosséis costumam ter 6 a 10. */
const MAXIMO_FOTOS = 12;

/* ========================================================================
   Leitura da lista de produtos
   ======================================================================== */

// content/produtos.ts é TypeScript; em vez de compilar, lê-se o ficheiro e
// extrai-se o que interessa. É frágil a reformatações grandes, e por isso o
// script avisa quando não encontra nada em vez de gravar um vazio.
const fonte = await readFile(path.join(RAIZ, "src/content/produtos.ts"), "utf8");
const corpo = fonte
  .slice(fonte.indexOf("export const PRODUTOS"))
  // Fora os comentários: o exemplo comentado no topo da lista não é um
  // produto, e sem isto o script tentava buscá-lo.
  .replace(/^[ 	]*\/\/.*$/gm, "");

const produtos = [];
for (const bloco of corpo.matchAll(/\{([^{}]*)\}/g)) {
  const texto = bloco[1];

  const id = campo(texto, "id");
  const link = campo(texto, "link");
  if (!id || !link) continue;

  const fotosManuais = [...texto.matchAll(/"(https?:\/\/[^"]+)"/g)]
    .map((m) => m[1])
    .filter((u) => u !== link);

  produtos.push({ id, link, titulo: campo(texto, "titulo"), fotosManuais });
}

if (produtos.length === 0) {
  console.log(
    "Nenhum produto em src/content/produtos.ts. Acrescente um e rode de novo.",
  );
  process.exit(0);
}

/* ========================================================================
   O que já estava guardado
   ======================================================================== */

let guardado = {};
try {
  guardado = JSON.parse(await readFile(DESTINO, "utf8"));
} catch {
  // Primeira vez: nasce vazio.
}

/* ========================================================================
   Busca
   ======================================================================== */

const NAVEGADOR = {
  "user-agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0 Safari/537.36",
  "accept-language": "pt-BR,pt;q=0.9",
  accept:
    "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
};

let novos = 0;
let falhas = 0;

for (const produto of produtos) {
  const jaTem = guardado[produto.id]?.fotos?.length;
  if (jaTem && !TUDO && (!SO || SO !== produto.id)) {
    console.log(`·  ${produto.id} — já guardado (${jaTem} fotos)`);
    continue;
  }
  if (SO && SO !== produto.id) continue;

  if (produto.fotosManuais.length > 0) {
    console.log(
      `·  ${produto.id} — ${produto.fotosManuais.length} foto(s) escritas à mão, não busco`,
    );
    continue;
  }

  process.stdout.write(`→  ${produto.id} … `);

  try {
    const { url, html } = await abrir(produto.link);
    const loja = lojaDe(url);

    // O Mercado Livre tem rota oficial; quando há credencial, usa-se ela,
    // que devolve o carrossel inteiro em vez de adivinhar pelo HTML.
    const pelaApi =
      loja === "Mercado Livre" ? await fotosPelaApiDoML(url) : null;

    const fotos = (pelaApi?.fotos ?? colher(html, loja)).slice(0, MAXIMO_FOTOS);
    const titulo = produto.titulo ?? pelaApi?.titulo ?? tituloDe(html);

    if (fotos.length === 0) {
      falhas++;
      console.log(
        `nenhuma foto (${loja})` +
          (loja === "Mercado Livre" && !process.env.ML_ACCESS_TOKEN
            ? " — o Mercado Livre recusa quem não é navegador. Ponha ML_ACCESS_TOKEN no .env.local, ou preencha as fotos à mão."
            : " — preencha as fotos à mão em produtos.ts."),
      );
      continue;
    }

    guardado[produto.id] = {
      titulo: titulo ?? null,
      loja,
      fotos,
      buscadoEm: new Date().toISOString(),
    };
    novos++;
    console.log(`${fotos.length} fotos · ${loja}${titulo ? ` · ${titulo.slice(0, 50)}` : ""}`);
  } catch (erro) {
    falhas++;
    console.log(`falhou — ${String(erro.message ?? erro).slice(0, 90)}`);
  }

  // Um pedido de cada vez, com pausa: é uma lista curta e não há pressa.
  await new Promise((r) => setTimeout(r, 1200));
}

await writeFile(DESTINO, JSON.stringify(guardado, null, 2) + "\n", "utf8");

console.log(
  `\n${novos} produto(s) atualizado(s), ${falhas} falha(s). Guardado em src/content/produtos-fotos.json.`,
);
if (falhas > 0) {
  console.log(
    "Para os que falharam: abra o anúncio, copie o endereço de cada foto\n" +
      "(botão direito → copiar endereço da imagem) e ponha em `fotos` no\n" +
      "produto correspondente, em src/content/produtos.ts.",
  );
}

/* ========================================================================
   Peças
   ======================================================================== */

function valorDe(bandeira) {
  const i = argumentos.indexOf(bandeira);
  return i >= 0 ? argumentos[i + 1] : null;
}

function campo(texto, nome) {
  const m = texto.match(new RegExp(`${nome}\\s*:\\s*"([^"]*)"`));
  return m ? m[1] : null;
}

/** Abre o link seguindo redirecionamentos — os de afiliado quase sempre têm. */
async function abrir(link) {
  const resposta = await fetch(link, {
    headers: NAVEGADOR,
    redirect: "follow",
  });
  if (!resposta.ok) {
    throw new Error(`a loja respondeu ${resposta.status}`);
  }
  return { url: resposta.url, html: await resposta.text() };
}

/**
 * O caminho oficial do Mercado Livre, quando há credencial.
 *
 * A API devolve o campo `pictures`, que é exatamente o carrossel publicado
 * pelo vendedor — melhor do que qualquer leitura de HTML. Sem token não se
 * tenta: medido, a API responde 403 a quem não se identifica.
 */
async function fotosPelaApiDoML(url) {
  const token = process.env.ML_ACCESS_TOKEN;
  if (!token) return null;

  const id = url.match(/ML[A-Z]-?(\d{6,})/);
  if (!id) return null;
  const item = `ML${url.match(/ML([A-Z])/)[1]}${id[1]}`;

  for (const rota of [`items/${item}`, `products/${item}`]) {
    const r = await fetch(`https://api.mercadolibre.com/${rota}`, {
      headers: { authorization: `Bearer ${token}` },
    });
    if (!r.ok) continue;
    const dados = await r.json();
    const fotos = (dados.pictures ?? [])
      .map((f) => f.secure_url ?? f.url)
      .filter(Boolean);
    if (fotos.length > 0) return { fotos, titulo: dados.title ?? dados.name };
  }
  return null;
}

function lojaDe(url) {
  if (/mercadoliv|mercadolib/i.test(url)) return "Mercado Livre";
  if (/amazon\./i.test(url)) return "Amazon";
  return new URL(url).hostname.replace(/^www\./, "");
}

function tituloDe(html) {
  const og = html.match(
    /<meta[^>]+property=["']og:title["'][^>]+content=["']([^"']+)["']/i,
  );
  if (og) return limpar(og[1]);
  const t = html.match(/<title[^>]*>([^<]+)<\/title>/i);
  return t ? limpar(t[1]) : null;
}

/**
 * Recolhe o carrossel.
 *
 * Cada loja publica as fotos de um jeito, e por isso há um reconhecedor por
 * loja, com a meta og:image como rede de segurança — ela existe em quase
 * toda página de produto e garante ao menos uma imagem.
 */
function colher(html, loja) {
  const fotos = [];

  if (loja === "Mercado Livre") {
    // O Mercado Livre serve as fotos a partir de mlstatic.com, e o sufixo
    // diz o tamanho. Pedimos a versão grande trocando o sufixo.
    for (const m of html.matchAll(
      /https:\/\/http2\.mlstatic\.com\/D_[\w-]+\.(?:jpg|webp|png)/g,
    )) {
      fotos.push(m[0].replace(/D_(?:NQ_)?(?:NP_)?(?:2X_)?/, "D_NQ_NP_2X_"));
    }
  }

  if (loja === "Amazon") {
    // O carrossel da Amazon viaja num bloco JSON dentro da própria página.
    for (const m of html.matchAll(
      /"hiRes"\s*:\s*"(https:\/\/m\.media-amazon\.com\/images\/I\/[^"]+)"/g,
    )) {
      fotos.push(m[1].replace(/\\u002F/g, "/"));
    }
    if (fotos.length === 0) {
      for (const m of html.matchAll(
        /"large"\s*:\s*"(https:\/\/m\.media-amazon\.com\/images\/I\/[^"]+)"/g,
      )) {
        fotos.push(m[1].replace(/\\u002F/g, "/"));
      }
    }
  }

  for (const m of html.matchAll(
    /<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["']/gi,
  )) {
    fotos.push(limpar(m[1]));
  }

  // Sem repetidas, e sem as miniaturas de interface que escapam do filtro.
  return [...new Set(fotos)].filter((u) => !/sprite|icon|logo/i.test(u));
}

function limpar(texto) {
  return texto
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .trim();
}
