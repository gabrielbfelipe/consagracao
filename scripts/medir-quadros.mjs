/**
 * Mede o ciclo automático do hero, sem confiar no que o código promete.
 *
 * Uso: node scripts/medir-quadros.mjs
 *
 * Observa o título mudando e cronometra quanto cada quadro ficou no ar,
 * confere que o terceiro volta ao primeiro, e testa se o botão de pausa
 * realmente detém o ciclo.
 */
import { chromium } from "playwright";

const BASE = process.env.BASE ?? "http://localhost:3000";

const navegador = await chromium.launch();
const pagina = await navegador.newPage({
  viewport: { width: 1440, height: 860 },
  reducedMotion: "no-preference",
});

await pagina.goto(`${BASE}/`, { waitUntil: "networkidle" });
await pagina.waitForTimeout(2000);

// Observa o título e anota o instante de cada troca.
await pagina.evaluate(() => {
  window.__trocas = [];
  const h1 = document.querySelector("section h1");
  const anotar = (texto) =>
    window.__trocas.push({ texto: texto.trim(), em: performance.now() });

  anotar(h1.textContent);
  new MutationObserver(() => {
    const atual = document.querySelector("section h1")?.textContent ?? "";
    const ultimo = window.__trocas.at(-1)?.texto;
    if (atual.trim() && atual.trim() !== ultimo) anotar(atual);
  }).observe(document.querySelector("section"), {
    subtree: true,
    childList: true,
    characterData: true,
  });
});

// Deixa o ponteiro longe: sobre o hero, a pausa de cortesia congelaria tudo.
await pagina.mouse.move(5, 850);

console.log("Observando um ciclo inteiro…\n");
await pagina.waitForTimeout(40000);

const trocas = await pagina.evaluate(() => window.__trocas);

// O primeiro registro pega o quadro já em cena, de modo que aquele
// intervalo é parcial. Só os seguintes são ciclos inteiros.
console.log("QUADRO".padEnd(26), "FICOU NO AR");
for (let i = 0; i < trocas.length - 1; i++) {
  const ms = trocas[i + 1].em - trocas[i].em;
  console.log(
    `“${trocas[i].texto}”`.padEnd(26),
    `${(ms / 1000).toFixed(1)}s`,
    i === 0 ? "(parcial — já estava em cena)" : "",
  );
}
console.log(`\nÚltimo em cena: “${trocas.at(-1).texto}”`);

const sequencia = trocas.map((t) => t.texto);
const voltou =
  sequencia.length > 3 && sequencia[3] === sequencia[0];
console.log(`Voltou ao primeiro depois do terceiro: ${voltou ? "sim" : "não"}`);

// --- O botão de pausa detém mesmo o ciclo? --------------------------------

await pagina.click('button[aria-pressed]');
const antes = await pagina.textContent("section h1");
const pressionado = await pagina.getAttribute("button[aria-pressed]", "aria-pressed");
await pagina.mouse.move(5, 850);
await pagina.waitForTimeout(15000);
const depois = await pagina.textContent("section h1");

console.log(`\naria-pressed após clicar: ${pressionado}`);
console.log(
  `Com a pausa ligada, 15s depois: ${
    antes.trim() === depois.trim() ? "não trocou (correto)" : "TROCOU — pausa não funciona"
  }`,
);

await navegador.close();
