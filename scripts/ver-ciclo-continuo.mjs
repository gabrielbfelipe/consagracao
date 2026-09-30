/**
 * Prova que nada detém o ciclo do hero.
 *
 * Uso: node scripts/ver-ciclo-continuo.mjs
 *      BASE=https://… node scripts/ver-ciclo-continuo.mjs
 *
 * Cada caso aqui já congelou a apresentação alguma vez. O hero ocupa a tela
 * inteira, de modo que o ponteiro pousa nele quase sempre; e o foco fica no
 * número do índice depois do clique. Enquanto houve pausa por ponteiro ou
 * por foco, bastava isso para tudo parar.
 *
 * ARMADILHA, e ela custou caro: um renderizador headless ocioso estrangula
 * os temporizadores. Se o ensaio dorme dezasseis segundos de uma vez, mede
 * o estrangulamento do Chromium e acusa uma pausa que não existe. Por isso
 * aqui se sonda de meio em meio segundo — o que também é o estado de um
 * separador real em primeiro plano — e o navegador sobe com o
 * estrangulamento desligado.
 */
import { chromium } from "playwright";

const BASE = process.env.BASE ?? "http://localhost:3000";
const JANELA_MS = 16000; // quase três quadros
const SONDAGEM_MS = 500;

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
await pagina.waitForTimeout(1500);

const titulo = () =>
  pagina.evaluate(() =>
    document.querySelector("section h1")?.textContent?.trim(),
  );

/** Observa por uma janela, sondando, e devolve os quadros que passaram. */
async function observar(ms = JANELA_MS) {
  const vistos = [];
  const fim = Date.now() + ms;
  while (Date.now() < fim) {
    const t = await titulo();
    if (t && t !== vistos.at(-1)) vistos.push(t);
    await pagina.waitForTimeout(SONDAGEM_MS);
  }
  return vistos;
}

const casos = [];
async function conferir(nome, preparar) {
  await preparar();
  const vistos = await observar();
  casos.push({ nome, vistos });
}

// 1. O ponteiro pousado sobre o hero, como acontece no desktop.
await conferir("ponteiro parado sobre o hero", () => pagina.mouse.move(700, 400));

// 2. O foco preso num número do índice, logo depois do clique.
await conferir("foco preso no índice após o clique", async () => {
  await pagina.click("section ul li:nth-child(2) button");
  await pagina.mouse.move(20, 855); // tira o ponteiro; o foco fica
});

// 3. Rolar para longe: tem de andar enquanto está fora de vista…
await pagina.mouse.move(700, 400);
await pagina.mouse.wheel(0, 2400);
const foraDeVista = await observar();
await pagina.mouse.wheel(0, -2400);
await pagina.mouse.move(700, 400);
casos.push({ nome: "andou enquanto estava fora de vista", vistos: foraDeVista });

// …e continuar andando depois de voltar ao topo.
await conferir("continua andando depois de voltar ao topo", () =>
  pagina.waitForTimeout(200),
);

// 4. Aba escondida: ao reaparecer, o quadro em cena recomeça a contar.
const outra = await navegador.newPage();
await outra.goto("about:blank");
await outra.bringToFront();
await outra.waitForTimeout(20000);
await pagina.bringToFront();
await conferir("continua andando depois de a aba voltar", () =>
  pagina.waitForTimeout(300),
);
await outra.close();

let falhou = false;
for (const c of casos) {
  const andou = c.vistos.length > 1;
  if (!andou) falhou = true;
  console.log(
    `${andou ? "anda  " : "PAROU "} ${c.nome.padEnd(42)} ${c.vistos.length} quadro(s): ${c.vistos.map((t) => `“${t}”`).join(" → ")}`,
  );
}
console.log(`\n${falhou ? "HÁ ALGO DETENDO O CICLO" : "Nada detém o ciclo."}`);

await navegador.close();
process.exit(falhou ? 1 : 0);
