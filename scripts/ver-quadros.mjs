/**
 * Fotografa cada um dos três quadros do hero.
 *
 * Uso: node scripts/ver-quadros.mjs
 *
 * Responde se clicar em 01, 02 e 03 troca mesmo a fotografia e a mensagem.
 */
import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";

const BASE = process.env.BASE ?? "http://localhost:3000";
const PASTA = ".retratos/quadros";
await mkdir(PASTA, { recursive: true });

const navegador = await chromium.launch();
const pagina = await navegador.newPage({
  viewport: { width: 1280, height: 780 },
  reducedMotion: "no-preference",
});

await pagina.goto(`${BASE}/`, { waitUntil: "networkidle" });
await pagina.waitForTimeout(3000);

for (let i = 1; i <= 3; i++) {
  await pagina.click(`button[aria-label^="Quadro ${i}"]`);
  await pagina.waitForTimeout(2200);

  const titulo = await pagina.textContent("h1");
  const foto = await pagina.getAttribute("section img", "src");
  const id = decodeURIComponent(foto ?? "").match(/photo-[\w-]+/)?.[0];

  console.log(`0${i}  “${titulo?.trim()}”  ${id}`);
  await pagina.screenshot({ path: `${PASTA}/quadro-0${i}.png` });
}

await navegador.close();
