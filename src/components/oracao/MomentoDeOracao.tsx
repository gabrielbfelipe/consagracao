"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { LIMITE, SOCORROS, type Socorro } from "@/content/socorro";

type Etapa = "escolher" | "acolhida" | "palavra" | "oracao" | "silencio" | "fim";

/**
 * Conduz um momento breve de oração: acolher, ouvir uma palavra, rezar,
 * ficar em silêncio e sair. Cinco minutos, não um programa.
 */
export function MomentoDeOracao() {
  const [socorro, setSocorro] = useState<Socorro | null>(null);
  const [etapa, setEtapa] = useState<Etapa>("escolher");

  const transicao = { duration: 0.7, ease: [0.22, 0.61, 0.36, 1] as const };

  function escolher(s: Socorro) {
    setSocorro(s);
    setEtapa("acolhida");
  }

  return (
    <div className="mx-auto w-full max-w-[56ch]">
      <AnimatePresence mode="wait">
        <motion.div
          key={etapa}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={transicao}
        >
          {etapa === "escolher" && (
            <div className="text-center">
              <p className="voz-livro mx-auto text-[var(--texto-suave)]">
                O que está pesando agora?
              </p>
              <ul className="mt-10 space-y-px">
                {SOCORROS.map((s) => (
                  <li key={s.id}>
                    <button
                      type="button"
                      onClick={() => escolher(s)}
                      className="superficie-vidro block w-full px-7 py-6
                        font-[family-name:var(--font-livro)] text-xl text-[var(--color-marfim)]
                        transition-colors duration-500 ease-[var(--ease-santuario)]
                        hover:text-[var(--color-ouro-luz)]"
                    >
                      {s.rotulo}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {socorro && etapa === "acolhida" && (
            <Passo aoContinuar={() => setEtapa("palavra")} rotulo="Continuar">
              <p className="voz-livro text-[var(--texto-suave)]">
                {socorro.acolhida}
              </p>
            </Passo>
          )}

          {socorro && etapa === "palavra" && (
            <Passo aoContinuar={() => setEtapa("oracao")} rotulo="Rezar">
              <blockquote className="superficie-pergaminho px-8 py-9">
                <p className="font-[family-name:var(--font-livro)] text-[1.25rem] leading-[1.8] text-[#2a1d12]">
                  {socorro.passagem.texto}
                </p>
                <footer className="mt-5 font-[family-name:var(--font-livro)] text-[#6b4f2e]">
                  {socorro.passagem.referencia}
                </footer>
              </blockquote>
            </Passo>
          )}

          {socorro && etapa === "oracao" && (
            <Passo aoContinuar={() => setEtapa("silencio")} rotulo="Ficar em silêncio">
              <p className="voz-livro text-[var(--color-marfim)]">
                {socorro.oracao}
              </p>
              <p className="ouro mt-9 text-center font-[family-name:var(--font-livro)] text-2xl">
                {socorro.jaculatoria}
              </p>
            </Passo>
          )}

          {socorro && etapa === "silencio" && (
            <Silencio aoTerminar={() => setEtapa("fim")} />
          )}

          {socorro && etapa === "fim" && (
            <div className="text-center">
              <p className="voz-livro mx-auto text-[var(--texto-suave)]">
                {socorro.encorajamento}
              </p>

              <div className="mt-12 flex flex-col items-center gap-6">
                <Link href="/caminho" className={BOTAO}>
                  Voltar ao caminho
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    setSocorro(null);
                    setEtapa("escolher");
                  }}
                  className="text-sm text-[var(--texto-suave)] underline
                    decoration-[color-mix(in_oklab,var(--color-ouro)_35%,transparent)] underline-offset-[6px]
                    transition-colors hover:text-[var(--color-pergaminho)]"
                >
                  Ficar mais um pouco
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* O limite, sempre à vista. */}
      <aside className="mt-24 border-t border-[color-mix(in_oklab,var(--color-bronze)_40%,transparent)] pt-9">
        <p className="text-sm leading-relaxed text-[var(--texto-suave)]">
          {LIMITE.texto}
        </p>

        <div className="superficie-vidro mt-7 px-6 py-6">
          <p className="font-[family-name:var(--font-livro)] text-lg text-[var(--color-marfim)]">
            {LIMITE.emergencia.aviso}
          </p>
          <p className="mt-3 text-[var(--texto-suave)]">
            <a
              href={`tel:${LIMITE.emergencia.telefone}`}
              className="font-[family-name:var(--font-livro)] text-3xl text-[var(--color-ouro-luz)]"
            >
              {LIMITE.emergencia.telefone}
            </a>
            <span className="mt-2 block text-sm">
              {LIMITE.emergencia.nome}. {LIMITE.emergencia.detalhe}
            </span>
          </p>
        </div>
      </aside>
    </div>
  );
}

const BOTAO = `brilho-borda superficie-vidro inline-flex items-center px-11 py-4
  font-[family-name:var(--font-livro)] text-lg tracking-[0.3em] indent-[0.3em] uppercase
  text-[var(--color-marfim)] transition-[box-shadow,color] duration-500 ease-[var(--ease-santuario)]
  hover:text-[var(--color-ouro-luz)]
  hover:shadow-[inset_0_0_0_1px_var(--color-ouro),0_0_32px_-10px_color-mix(in_oklab,var(--color-ouro)_70%,transparent)]`;

function Passo({
  children,
  aoContinuar,
  rotulo,
}: {
  children: React.ReactNode;
  aoContinuar: () => void;
  rotulo: string;
}) {
  return (
    <div>
      {children}
      <div className="mt-12 text-center">
        <button type="button" onClick={aoContinuar} className={BOTAO}>
          {rotulo}
        </button>
      </div>
    </div>
  );
}

/** Dois minutos de silêncio, contados para trás, sem apressar ninguém. */
function Silencio({ aoTerminar }: { aoTerminar: () => void }) {
  const TOTAL = 120;
  const [restam, setRestam] = useState(TOTAL);

  useEffect(() => {
    if (restam <= 0) return;
    const t = setTimeout(() => setRestam((r) => r - 1), 1000);
    return () => clearTimeout(t);
  }, [restam]);

  const minutos = Math.floor(restam / 60);
  const segundos = String(restam % 60).padStart(2, "0");

  return (
    <div className="text-center">
      <p className="voz-livro mx-auto text-[var(--texto-suave)]">
        Fique em silêncio. Não é preciso pensar em nada nem pedir nada.
      </p>

      <p
        aria-live="off"
        className="mt-16 font-[family-name:var(--font-livro)] text-6xl tabular-nums text-[color-mix(in_oklab,var(--color-ouro)_75%,transparent)]"
      >
        {minutos}:{segundos}
      </p>

      {/* Um halo que respira devagar, para dar ritmo sem instruir. */}
      <div
        aria-hidden
        className="mx-auto mt-14 h-28 w-28 rounded-full
          bg-[radial-gradient(circle,color-mix(in_oklab,var(--color-ouro-luz)_26%,transparent),transparent_70%)]
          motion-safe:animate-[respirar_9s_ease-in-out_infinite]"
      />

      <button
        type="button"
        onClick={aoTerminar}
        className="mt-16 text-sm text-[var(--texto-suave)] underline
          decoration-[color-mix(in_oklab,var(--color-ouro)_35%,transparent)] underline-offset-[6px]
          transition-colors hover:text-[var(--color-pergaminho)]"
      >
        {restam > 0 ? "Sair do silêncio" : "Continuar"}
      </button>
    </div>
  );
}
