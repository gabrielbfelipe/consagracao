/**
 * Junta as fotos candidatas numa folha de contato, para escolher olhando.
 *
 * Uso: node scripts/folha-contato.mjs
 * Lê os .jpg de .retratos/fotos e salva .retratos/folha-contato.png
 */
import { chromium } from "playwright";
import { readdir, writeFile } from "node:fs/promises";
import { pathToFileURL } from "node:url";
import path from "node:path";

const PASTA = path.resolve(".retratos/fotos");
const arquivos = (await readdir(PASTA)).filter((f) => f.endsWith(".jpg")).sort();

const html = `<body style="margin:0;background:#111;display:grid;grid-template-columns:repeat(3,1fr);gap:6px">
${arquivos
  .map(
    (f) => `<figure style="margin:0;position:relative">
  <img src="${f}" style="width:100%;display:block">
  <figcaption style="position:absolute;top:0;left:0;background:#000c;color:#fff;font:13px monospace;padding:5px 9px">${f.replace(".jpg", "")}</figcaption>
</figure>`,
  )
  .join("\n")}
</body>`;

const paginaHtml = path.join(PASTA, "folha.html");
await writeFile(paginaHtml, html);

const navegador = await chromium.launch();
const pagina = await navegador.newPage({ viewport: { width: 1320, height: 900 } });
await pagina.goto(pathToFileURL(paginaHtml).href);
await pagina.waitForTimeout(1800);
await pagina.screenshot({ path: ".retratos/folha-contato.png", fullPage: true });
await navegador.close();

console.log(`${arquivos.length} fotos em .retratos/folha-contato.png`);
