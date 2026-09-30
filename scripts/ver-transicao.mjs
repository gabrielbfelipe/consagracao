/**
 * Interroga o navegador sobre a troca de página.
 *
 * Uso: node scripts/ver-transicao.mjs
 *
 * Um retrato parado não responde se a transição aconteceu. Aqui lemos
 * document.getAnimations() durante a passagem, que lista exatamente quais
 * pseudo-elementos estão animando, com que nome e por quanto tempo.
 */
import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";

const BASE = process.env.BASE ?? "http://localhost:3000";
const PASTA = ".retratos/transicao";
await mkdir(PASTA, { recursive: true });

const navegador = await chromium.launch();
const pagina = await navegador.newPage({
  viewport: { width: 1280, height: 800 },
  reducedMotion: "no-preference",
});

await pagina.goto(`${BASE}/`, { waitUntil: "networkidle" });
await pagina.waitForTimeout(2500);

// Instrumenta antes de navegar: assim que a transição começar, guardamos
// a lista de animações que o navegador criou.
await pagina.evaluate(() => {
  window.__registro = { chamadas: 0, animacoes: [] };
  const original = document.startViewTransition?.bind(document);
  if (!original) return;

  document.startViewTransition = (cb) => {
    window.__registro.chamadas++;
    const transicao = original(cb);
    transicao.ready.then(() => {
      window.__registro.animacoes = document.getAnimations().map((a) => ({
        pseudo: a.effect?.pseudoElement ?? null,
        nome: a.animationName ?? null,
        duracao: a.effect?.getTiming?.().duration ?? null,
        atraso: a.effect?.getTiming?.().delay ?? null,
      }));
    });
    return transicao;
  };
});

await pagina.click('nav[aria-label="Seções"] a:has-text("A consagração")');
await pagina.waitForTimeout(1400);

const registro = await pagina.evaluate(() => window.__registro);

console.log(`startViewTransition chamada: ${registro.chamadas}x\n`);
if (registro.animacoes.length === 0) {
  console.log("Nenhuma animação de pseudo-elemento foi criada.");
} else {
  console.log("PSEUDO-ELEMENTO".padEnd(36), "ANIMAÇÃO".padEnd(14), "DURAÇÃO");
  for (const a of registro.animacoes) {
    console.log(
      String(a.pseudo ?? "—").padEnd(36),
      String(a.nome ?? "—").padEnd(14),
      `${a.duracao}ms` + (a.atraso ? ` (+${a.atraso}ms)` : ""),
    );
  }
}

await navegador.close();
