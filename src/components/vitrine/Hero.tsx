"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { IMAGENS, urlDaImagem, type NomeDaImagem } from "@/lib/imagens";

/**
 * A entrada do santuário: fotografia de nave em tela cheia, com três
 * quadros que se sucedem devagar.
 *
 * O ritmo é deliberadamente lento — nove segundos por quadro. Um carrossel
 * apressado pede atenção; este quer dar tempo de olhar. Para quem pediu
 * menos movimento, ele simplesmente não anda sozinho.
 */

type Quadro = {
  imagem: NomeDaImagem;
  sobrenome: string;
  titulo: string;
  texto: string;
};

const QUADROS: readonly Quadro[] = [
  {
    // A nave com profundidade: o olhar entra e é conduzido ao fundo.
    imagem: "naveGotica",
    sobrenome: "Comece sua preparação",
    titulo: "Trinta e três dias",
    texto:
      "Um caminho de leitura, oração e silêncio que conduz o coração a Cristo pelas mãos de Maria.",
  },
  {
    imagem: "nossaSenhora",
    sobrenome: "Pelas mãos de Maria",
    titulo: "Até Cristo",
    texto:
      "A consagração não termina em Nossa Senhora. É ela quem conduz, e Ele é o destino de todo o caminho.",
  },
  {
    imagem: "vitralGrande",
    sobrenome: "Escolha o seu dia",
    titulo: "Uma data sua",
    texto:
      "Vinte e quatro festas marianas. Você escolhe uma, e o caminho até ela é calculado para você.",
  },
] as const;

const INTERVALO = 9000;

export function Hero() {
  const [atual, setAtual] = useState(0);
  const [pausado, setPausado] = useState(false);
  const semMovimento = useReducedMotion();
  const temporizador = useRef<ReturnType<typeof setTimeout> | null>(null);

  const avancar = useCallback(
    (passo = 1) =>
      setAtual((i) => (i + passo + QUADROS.length) % QUADROS.length),
    [],
  );

  useEffect(() => {
    if (semMovimento || pausado) return;
    temporizador.current = setTimeout(() => avancar(), INTERVALO);
    return () => {
      if (temporizador.current) clearTimeout(temporizador.current);
    };
  }, [atual, pausado, semMovimento, avancar]);

  const quadro = QUADROS[atual];

  return (
    <section
      aria-roledescription="apresentação"
      aria-label="Apresentação do santuário"
      onMouseEnter={() => setPausado(true)}
      onMouseLeave={() => setPausado(false)}
      onFocusCapture={() => setPausado(true)}
      onBlurCapture={() => setPausado(false)}
      className="relative flex min-h-[92svh] flex-col justify-center overflow-hidden"
    >
      {/* As fotografias, uma de cada vez, com aproximação quase imperceptível. */}
      <AnimatePresence initial={false}>
        <motion.div
          key={atual}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.6, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          {/* Aproximação lenta. O respeito por "menos movimento" vem do
              MotionConfig no layout, e não de uma ramificação aqui — que
              renderizaria estilos diferentes no servidor e no cliente. */}
          <motion.div
            className="absolute inset-0"
            initial={{ scale: 1 }}
            animate={{ scale: 1.07 }}
            transition={{ duration: INTERVALO / 1000 + 2, ease: "linear" }}
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

      {/* O texto */}
      <div className="relative z-10 w-full px-6 pt-28 pb-56 sm:px-12 sm:pb-40 lg:px-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={atual}
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.9, ease: [0.22, 0.61, 0.36, 1] }}
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

      {/* Os quadros, numerados como numa página de manuscrito.
          No celular não há margem lateral livre: eles descem para o pé,
          em linha, para não atravessarem o texto. */}
      <div className="absolute bottom-36 left-6 z-10 sm:top-1/2 sm:bottom-auto sm:left-auto sm:right-9 sm:-translate-y-1/2">
        <ul className="flex flex-row gap-6 sm:flex-col sm:gap-5">
          {QUADROS.map((q, i) => (
            <li key={q.titulo}>
              <button
                type="button"
                onClick={() => setAtual(i)}
                aria-label={`Quadro ${i + 1}: ${q.titulo}`}
                aria-current={i === atual ? "true" : undefined}
                className="group flex items-center gap-3"
              >
                <span
                  className={`font-[family-name:var(--font-livro)] text-sm tabular-nums transition-colors duration-500 ${
                    i === atual
                      ? "text-[var(--color-ouro-luz)]"
                      : "text-[color-mix(in_oklab,var(--color-pergaminho)_45%,transparent)] group-hover:text-[var(--color-pergaminho)]"
                  }`}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span
                  aria-hidden
                  className={`h-px transition-all duration-700 ease-[var(--ease-santuario)] ${
                    i === atual
                      ? "w-8 bg-[var(--color-ouro-luz)]"
                      : "w-3 bg-[color-mix(in_oklab,var(--color-pergaminho)_40%,transparent)]"
                  }`}
                />
              </button>
            </li>
          ))}
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
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden>
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
