/**
 * Mede o ciclo automático do hero, sem confiar no que o código promete.
 *
 * Uso: node scripts/medir-quadros.mjs
 *
 * Observa o título mudando, cronometra quanto cada quadro ficou no ar e
 * confere que a ordem é sempre 1 → 2 → 3 → 1, ciclo após ciclo.
 */
import { chromium } from "playwright";

const BASE = process.env.BASE ?? "http://localhost:3000";

/** A ordem que o componente declara. Lida daqui, não adivinhada. */
const QUADROS_ESPERADOS = [
  "Comece o caminho",
  "Caminhe acompanhado",
  "Entregue‑se inteiro",
];

// Sem isto, um renderizador headless ocioso estrangula os temporizadores e
// as durações medidas saem maiores do que as reais.
const navegador = await chromium.launch({
  args: [
    "--disable-background-timer-throttling",
    "--disable-backgrounding-occluded-windows",
    "--disable-renderer-backgrounding",
  ],
});
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

// O ponteiro pode ficar onde quiser: nada detém o ciclo.
await pagina.mouse.move(700, 400);

console.log("Observando um ciclo inteiro…\n");
await pagina.waitForTimeout(30000);

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
const titulos = [...new Set(sequencia)];

// A ordem tem de ser sempre a mesma: cada quadro seguido do próximo, e o
// terceiro seguido do primeiro. Um salto ou um retrocesso aparece aqui.
const ordem = QUADROS_ESPERADOS;
const erros = [];
for (let i = 0; i < sequencia.length - 1; i++) {
  const de = ordem.indexOf(sequencia[i]);
  const para = ordem.indexOf(sequencia[i + 1]);
  if (de < 0 || para < 0) {
    erros.push(`título desconhecido: “${sequencia[i + 1]}”`);
  } else if (para !== (de + 1) % ordem.length) {
    erros.push(`${de + 1} → ${para + 1} (esperado ${de + 1} → ${((de + 1) % ordem.length) + 1})`);
  }
}

console.log(`
Sequência observada: ${sequencia.map((t) => ordem.indexOf(t) + 1).join(" → ")}`);
console.log(`Ordem 1→2→3→1 em todas as trocas: ${erros.length === 0 ? "sim" : "NÃO — " + erros.join("; ")}`);
console.log(`Ciclos inteiros observados: ${(sequencia.length / 3).toFixed(1)}`);
console.log(`Títulos vistos: ${titulos.length} de 3`);

await navegador.close();
