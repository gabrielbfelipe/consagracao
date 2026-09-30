"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { IMAGENS, urlDaImagem, type NomeDaImagem } from "@/lib/imagens";

/**
 * A entrada do santuário: fotografia de nave em tela cheia, com três
 * quadros que se sucedem na ordem 1 → 2 → 3 → 1, sem parar.
 *
 * O ritmo é calmo, mas não arrastado: cinco a seis segundos por quadro,
 * tirados do próprio texto. Para quem pediu menos movimento, ele
 * simplesmente não anda sozinho.
 */

type Quadro = {
  imagem: NomeDaImagem;
  sobrenome: string;
  titulo: string;
  texto: string;
  /** Uma palavra, para o índice lateral. Sem ela, os números não dizem nada. */
  rotulo: string;
};

/**
 * Três quadros, três verbos, um só destino.
 *
 * Comece, caminhe, entregue-se: a mesma coisa vista do começo, do meio e do
 * fim. Cada um tem a sua fotografia — a nave que se percorre, aquela que
 * conduz, e a luz a que se chega.
 */
const QUADROS: readonly Quadro[] = [
  {
    // A nave com profundidade: o olhar entra e é conduzido ao fundo.
    imagem: "naveGotica",
    rotulo: "Comece",
    sobrenome: "Trinta e três dias de preparação",
    titulo: "Comece o caminho",
    texto:
      "Um dia para cada ano que Cristo viveu na terra. Leitura, oração e silêncio, conduzidos um dia de cada vez.",
  },
  {
    imagem: "nossaSenhora",
    rotulo: "Caminhe",
    sobrenome: "Pelas mãos de Maria",
    titulo: "Caminhe acompanhado",
    texto:
      "A consagração não termina em Nossa Senhora. É ela quem conduz, e Cristo é o destino de todo o caminho.",
  },
  {
    imagem: "vitralGrande",
    rotulo: "Entregue-se",
    sobrenome: "No dia que você escolher",
    // Hífen inquebrável: sem ele o título parte em "ENTREGUE-" / "SE INTEIRO".
    titulo: "Entregue‑se inteiro",
    texto:
      "Vinte e quatro festas marianas. Escolha uma, e o caminho até ela será preparado para você.",
  },
] as const;

/**
 * Quanto tempo cada quadro fica no ar.
 *
 * Um número fixo trata textos de tamanhos diferentes como se fossem iguais.
 * Aqui o tempo sai do próprio conteúdo, somando três parcelas:
 *
 *   ENTRADA   0,7s para o quadro assentar e estar legível — o mesmo tempo
 *             da transição do texto;
 *   LEITURA   palavras ÷ 6,5 por segundo. Não é a taxa de leitura corrida
 *             (~4,2/s, ou 252 por minuto); é a de varredura, que é como se
 *             lê um título em caixa alta e duas linhas de apoio: aos
 *             saltos, sem soletrar. Conta-se tudo o que aparece;
 *   DECISÃO   0,9s depois de varrer, para reparar no botão.
 *
 * Os limites existem para que um texto muito curto não pisque e um muito
 * longo não prenda quem já leu. Dá 6,1s, 5,6s e 5,1s.
 */
const ENTRADA_MS = 700;
const PALAVRAS_POR_SEGUNDO = 6.5;
const DECISAO_MS = 900;
const MINIMO_MS = 4500;
const MAXIMO_MS = 8000;

/** A troca de fotografia. Curta o bastante para não comer o quadro novo. */
const CRUZAMENTO_S = 1;

function duracaoDoQuadro(q: Quadro): number {
  const palavras = `${q.sobrenome} ${q.titulo} ${q.texto}`
    .trim()
    .split(/\s+/).length;

  const leitura = (palavras / PALAVRAS_POR_SEGUNDO) * 1000;
  const total = ENTRADA_MS + leitura + DECISAO_MS;

  return Math.round(Math.min(Math.max(total, MINIMO_MS), MAXIMO_MS));
}

export function Hero() {
  const [atual, setAtual] = useState(0);
  /** Enquanto o ponteiro ou o foco estão aqui, o ciclo espera. */
  const [visitado, setVisitado] = useState(false);
  const semMovimento = useReducedMotion();
  const temporizador = useRef<ReturnType<typeof setTimeout> | null>(null);

  const quadro = QUADROS[atual];
  const duracao = duracaoDoQuadro(quadro);

  /** Sempre para a frente, e do terceiro de volta ao primeiro. */
  const avancar = useCallback(
    () => setAtual((i) => (i + 1) % QUADROS.length),
    [],
  );

  useEffect(() => {
    if (semMovimento || visitado) return;
    temporizador.current = setTimeout(avancar, duracao);
    return () => {
      if (temporizador.current) clearTimeout(temporizador.current);
    };
  }, [atual, visitado, semMovimento, avancar, duracao]);

  return (
    <section
      aria-roledescription="apresentação"
      aria-label="Apresentação do santuário"
      onMouseEnter={() => setVisitado(true)}
      onMouseLeave={() => setVisitado(false)}
      onFocusCapture={() => setVisitado(true)}
      onBlurCapture={() => setVisitado(false)}
      className="relative flex min-h-[92svh] flex-col justify-center overflow-hidden"
    >
      {/* As fotografias, uma de cada vez, com aproximação quase imperceptível. */}
      <AnimatePresence initial={false}>
        <motion.div
          key={atual}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: CRUZAMENTO_S, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          {/* Aproximação lenta. Com o quadro mais curto, o percurso também
              encurta — 1,045 em vez de 1,07 — para que a velocidade
              aparente continue a mesma.
              O respeito por "menos movimento" vem do MotionConfig no
              layout, e não de uma ramificação aqui — que renderizaria
              estilos diferentes no servidor e no cliente. */}
          <motion.div
            className="absolute inset-0"
            initial={{ scale: 1 }}
            animate={{ scale: 1.045 }}
            transition={{
              duration: duracao / 1000 + CRUZAMENTO_S,
              ease: "linear",
            }}
          >
            <Image
              src={urlDaImagem(quadro.imagem, { largura: 2000, qualidade: 78 })}
              alt={IMAGENS[quadro.imagem].alt}
              fill
              sizes="100vw"
              className="object-cover"
              priority={atual === 0}
            />
          </motion.div>
        </motion.div>
      </AnimatePresence>

      {/* Escurecimento assimétrico: pesa onde o texto se apoia e alivia do
          outro lado, para que a arquitetura continue à vista. Um véu uniforme
          apaga a fotografia, e é ela que carrega a página. */}
      <div
        aria-hidden
        className="absolute inset-0 bg-[linear-gradient(to_right,rgba(8,5,3,0.9)_0%,rgba(8,5,3,0.55)_38%,rgba(8,5,3,0.1)_100%)]"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-[linear-gradient(to_top,rgba(8,5,3,0.88),transparent_36%)]"
      />
      {/* Um leito escuro no alto: o pórtico é transparente sobre a foto, e
          sem isto ele desaparece quando o quadro é claro — como acontece
          com o do vitral. */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-40 bg-[linear-gradient(to_bottom,rgba(8,5,3,0.82),transparent)]"
      />
      {/* Uma faixa estreita à direita, onde vive o índice. Sombra projetada
          não vence uma coluna em plena luz; esta faixa vence, e é discreta
          o bastante para a arquitetura continuar visível através dela. */}
      <div
        aria-hidden
        className="absolute inset-y-0 right-0 hidden w-72 bg-[linear-gradient(to_left,rgba(8,5,3,0.62),transparent)] sm:block"
      />

      {/* O texto */}
      <div className="relative z-10 w-full px-6 pt-28 pb-56 sm:px-12 sm:pb-40 lg:px-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={atual}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.7, ease: [0.22, 0.61, 0.36, 1] }}
            className="max-w-4xl"
          >
            <p className="font-[family-name:var(--font-livro)] text-[clamp(1.25rem,1rem+1vw,1.9rem)] text-[var(--color-ouro)] italic">
              {quadro.sobrenome}
            </p>

            <h1 className="mt-4 font-[family-name:var(--font-livro)] text-[clamp(2.75rem,1.6rem+5.6vw,6.5rem)] leading-[0.98] tracking-[0.01em] text-balance text-[var(--color-marfim)] uppercase">
              {quadro.titulo}
            </h1>

            <p className="mt-8 max-w-[52ch] font-[family-name:var(--font-livro)] text-[clamp(1.05rem,0.95rem+0.5vw,1.35rem)] leading-[1.7] text-[color-mix(in_oklab,var(--color-pergaminho)_88%,transparent)]">
              {quadro.texto}
            </p>
          </motion.div>
        </AnimatePresence>

        <div className="mt-11 flex flex-wrap items-center gap-x-9 gap-y-4">
          <Link
            href="/entrar"
            className="brilho-borda group inline-flex items-center px-8 py-3.5 sm:px-11 sm:py-4
              font-[family-name:var(--font-livro)] text-sm tracking-[0.22em] indent-[0.22em] uppercase sm:text-base sm:tracking-[0.28em] sm:indent-[0.28em]
              text-[var(--color-marfim)] shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--color-marfim)_45%,transparent)]
              transition-[box-shadow,color] duration-500 ease-[var(--ease-santuario)]
              hover:text-[var(--color-ouro-luz)] hover:shadow-[inset_0_0_0_1px_var(--color-ouro)]"
          >
            Iniciar preparação
          </Link>

          <Link
            href="/sobre/a-consagracao"
            className="font-[family-name:var(--font-livro)] text-base tracking-[0.14em] uppercase
              text-[color-mix(in_oklab,var(--color-pergaminho)_70%,transparent)] underline
              decoration-[color-mix(in_oklab,var(--color-ouro)_50%,transparent)] underline-offset-[9px]
              transition-colors duration-500 hover:text-[var(--color-ouro-luz)]"
          >
            Saber mais
          </Link>
        </div>
      </div>

      {/* O índice dos quadros.
          Números soltos não dizem o que são — com o nome ao lado e o tempo
          correndo na linha, lê-se na hora que é uma apresentação de três
          partes, e não um menu de três destinos.
          No celular não há margem lateral livre: desce para o pé, em linha.
          A sombra projetada mantém o índice legível mesmo quando a
          fotografia clareia atrás dele. */}
      <div className="absolute bottom-36 left-6 z-10 [filter:drop-shadow(0_0_3px_rgba(8,5,3,1))_drop-shadow(0_2px_12px_rgba(8,5,3,0.9))] sm:top-1/2 sm:right-9 sm:bottom-auto sm:left-auto sm:-translate-y-1/2">
        <ul className="flex flex-row gap-6 sm:flex-col sm:items-end sm:gap-6">
          {QUADROS.map((q, i) => {
            const ativo = i === atual;
            return (
              <li key={q.titulo}>
                <button
                  type="button"
                  onClick={() => setAtual(i)}
                  aria-label={`Quadro ${i + 1} de ${QUADROS.length}: ${q.titulo}`}
                  aria-current={ativo ? "true" : undefined}
                  className="group flex items-center gap-3"
                >
                  <span
                    className={`font-[family-name:var(--font-livro)] text-sm tabular-nums transition-colors duration-500 ${
                      ativo
                        ? "text-[var(--color-ouro-luz)]"
                        : "text-[color-mix(in_oklab,var(--color-pergaminho)_68%,transparent)] group-hover:text-[var(--color-pergaminho)]"
                    }`}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  {/* A linha corre enquanto o quadro está no ar. */}
                  <span
                    aria-hidden
                    className={`relative h-px overflow-hidden transition-all duration-700 ease-[var(--ease-santuario)] ${
                      ativo
                        ? "w-10 bg-[color-mix(in_oklab,var(--color-pergaminho)_28%,transparent)]"
                        : "w-4 bg-[color-mix(in_oklab,var(--color-pergaminho)_40%,transparent)]"
                    }`}
                  >
                    {ativo && (
                      <span
                        key={atual}
                        data-pausado={visitado || undefined}
                        style={{ animationDuration: `${duracao}ms` }}
                        className="absolute inset-0 origin-left bg-[var(--color-ouro-luz)]
                          motion-safe:animate-[percorrer_linear_forwards]
                          motion-reduce:scale-x-100
                          data-[pausado]:[animation-play-state:paused]"
                      />
                    )}
                  </span>

                  <span
                    className={`hidden font-[family-name:var(--font-livro)] text-sm tracking-[0.12em] uppercase transition-colors duration-500 xl:inline ${
                      ativo
                        ? "text-[var(--color-marfim)]"
                        : "text-[color-mix(in_oklab,var(--color-pergaminho)_68%,transparent)] group-hover:text-[var(--color-pergaminho)]"
                    }`}
                  >
                    {q.rotulo}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      {/* A inscrição no rodapé da nave. */}
      <div className="absolute inset-x-0 bottom-0 z-10 px-6 pb-9 sm:px-12 lg:px-20">
        <div className="flex items-center gap-5 border-t border-[color-mix(in_oklab,var(--color-ouro)_28%,transparent)] pt-7">
          <span
            aria-hidden
            className="hidden h-11 w-11 shrink-0 items-center justify-center rounded-full
              shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--color-ouro)_55%,transparent)] sm:flex"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-5 w-5"
              fill="none"
              aria-hidden
            >
              <path
                d="M12 3v18M7 8.5h10"
                stroke="var(--color-ouro)"
                strokeWidth="1.2"
                strokeLinecap="round"
              />
            </svg>
          </span>
          <p className="font-[family-name:var(--font-livro)] text-[var(--color-pergaminho)]">
            Segundo São Luís Maria Grignion de Montfort
            <span className="mt-0.5 block text-sm text-[color-mix(in_oklab,var(--color-pergaminho)_55%,transparent)]">
              O método seguido por São João Paulo II, que dele tirou seu lema:
              Totus tuus.
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}
