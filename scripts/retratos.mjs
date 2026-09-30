/**
 * Tira retratos das telas, para poder olhá-las em vez de imaginá-las.
 *
 * Uso: node scripts/retratos.mjs [caminho...] [--movel]
 *
 * Sem argumentos, percorre as telas públicas. Salva em .retratos/, que o
 * Git ignora — são material de trabalho, não parte do projeto.
 */
import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";

const BASE = process.env.BASE ?? "http://localhost:3000";
const PASTA = ".retratos";

const args = process.argv.slice(2);
const movel = args.includes("--movel");
/** Só o que se vê antes de rolar — para julgar o hero em tamanho real. */
const dobra = args.includes("--dobra");
const pedidos = args.filter((a) => !a.startsWith("--"));

const TELAS = pedidos.length
  ? pedidos
  : [
      "/",
      "/sobre/a-consagracao",
      "/sobre/por-que-fazer",
      "/sobre/a-plataforma",
      "/entrar",
      "/biblioteca",
      "/biblioteca/ave-maris-stella",
      "/oracao",
      "/privacidade",
    ];

await mkdir(PASTA, { recursive: true });

const navegador = await chromium.launch();
const contexto = await navegador.newContext({
  viewport: movel ? { width: 390, height: 844 } : { width: 1440, height: 900 },
  deviceScaleFactor: 1,
  // As revelações por scroll deixam o conteúdo em opacidade zero até entrar
  // na viewport, e um retrato de página inteira captura tudo de uma vez —
  // as seções sairiam pretas. Pedindo menos movimento, elas nascem visíveis,
  // que é o que precisamos julgar aqui: a composição, não a entrada.
  reducedMotion: "reduce",
});

const pagina = await contexto.newPage();

for (const tela of TELAS) {
  const nome =
    (tela === "/" ? "home" : tela.replace(/^\//, "").replaceAll("/", "-")) +
    (movel ? "-movel" : "") +
    (dobra ? "-dobra" : "");

  await pagina.goto(`${BASE}${tela}`, { waitUntil: "networkidle" });
  // Dá tempo às fontes, às fotografias e à sequência de chegada.
  await pagina.waitForTimeout(2600);

  await pagina.screenshot({ path: `${PASTA}/${nome}.png`, fullPage: !dobra });
  console.log(`  ${PASTA}/${nome}.png`);
}

await navegador.close();
