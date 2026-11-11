"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { sair } from "@/app/conta/acoes";

/**
 * O pórtico: a faixa discreta no alto das salas internas.
 *
 * Não é barra de aplicativo. É uma inscrição sobre a porta — letra pequena,
 * capitulares espaçadas, nada de ícones. Some do caminho quando não se olha
 * para ela.
 *
 * No celular a inscrição não cabe: cinco salas, a saída e o pedido de
 * oração empilhavam-se em quatro linhas e empurravam a sala para baixo.
 * Abaixo de `lg` ficam a saudação e um recolhimento; o resto espera dentro
 * dele, em tela cheia, como no pórtico da rua.
 */

const SALAS = [
  { href: "/caminho", nome: "Meu caminho" },
  { href: "/biblioteca", nome: "Biblioteca" },
  { href: "/diario", nome: "Diário" },
  { href: "/calendario", nome: "Calendário" },
  { href: "/cadeias", nome: "Cadeias" },
] as const;

export function Portico({
  autenticado,
  saudacao,
}: {
  autenticado: boolean;
  /** "Boa tarde, Gabriel". Aparece em todas as salas internas. */
  saudacao?: string;
}) {
  const [aberto, setAberto] = useState(false);
  const caminho = usePathname();

  // Com o menu aberto em tela cheia, a página atrás não deve rolar junto.
  useEffect(() => {
    document.body.style.overflow = aberto ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [aberto]);

  return (
    <>
      <header className="relative z-50 flex items-center justify-between gap-x-8 gap-y-4 px-6 py-5 sm:px-10 lg:flex-wrap">
        <nav
          aria-label="Salas"
          className="hidden flex-wrap items-center gap-x-7 gap-y-2 lg:flex"
        >
          {SALAS.map((sala) => (
            <Link
              key={sala.href}
              href={sala.href}
              className="font-[family-name:var(--font-livro)] text-[0.9rem] tracking-[0.18em] uppercase
                text-[color-mix(in_oklab,var(--texto)_58%,transparent)]
                transition-colors duration-500 ease-[var(--ease-santuario)]
                hover:text-[var(--color-ouro-luz)]"
            >
              {sala.nome}
            </Link>
          ))}
        </nav>

        {/* No celular a saudação toma o lugar da inscrição: é o que resta
            de pessoal quando os rótulos se recolhem. */}
        <p className="font-[family-name:var(--font-livro)] text-[0.95rem] text-[color-mix(in_oklab,var(--texto)_62%,transparent)] lg:hidden">
          {saudacao ?? "Consagração"}
        </p>

        <div className="flex items-center gap-7">
          {saudacao && (
            <p className="hidden font-[family-name:var(--font-livro)] text-[0.95rem] text-[color-mix(in_oklab,var(--texto)_62%,transparent)] lg:block">
              {saudacao}
            </p>
          )}

          <Link
            href="/oracao"
            className="hidden font-[family-name:var(--font-livro)] text-[0.9rem] tracking-[0.14em]
              text-[var(--color-ouro)] transition-colors duration-500 hover:text-[var(--color-ouro-luz)] lg:inline"
          >
            Preciso de um momento de oração
          </Link>

          {autenticado && (
            <form action={sair} className="hidden lg:block">
              <button
                type="submit"
                className="font-[family-name:var(--font-interface)] text-sm
                  text-[color-mix(in_oklab,var(--texto)_45%,transparent)]
                  transition-colors duration-500 hover:text-[var(--texto)]"
              >
                Sair
              </button>
            </form>
          )}

          <BotaoDoRecolhimento
            aberto={aberto}
            aoClicar={() => setAberto(!aberto)}
          />
        </div>
      </header>

      {/* Fora do cabeçalho, como no pórtico da rua: um painel `fixed` preso
          dentro de um elemento com filtro de fundo nasce com altura zero. */}
      <AnimatePresence>
        {aberto && (
          <motion.nav
            id="menu-da-sala"
            aria-label="Salas"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 top-[5.25rem] z-40 overflow-y-auto bg-[var(--color-sombra)] lg:hidden"
          >
            <ul className="px-6 py-8 sm:px-10">
              {SALAS.map((sala, i) => (
                <motion.li
                  key={sala.href}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.06 * i,
                    duration: 0.5,
                    ease: [0.22, 0.61, 0.36, 1],
                  }}
                  className="border-b border-[color-mix(in_oklab,var(--color-bronze)_35%,transparent)]"
                >
                  <Link
                    href={sala.href}
                    onClick={() => setAberto(false)}
                    aria-current={caminho === sala.href ? "page" : undefined}
                    className={`block py-5 font-[family-name:var(--font-livro)] text-2xl
                      transition-colors duration-300 hover:text-[var(--color-ouro-luz)] ${
                        caminho === sala.href
                          ? "text-[var(--color-ouro)]"
                          : "text-[var(--color-marfim)]"
                      }`}
                  >
                    {sala.nome}
                  </Link>
                </motion.li>
              ))}
            </ul>

            <div className="px-6 pb-16 sm:px-10">
              <Link
                href="/oracao"
                onClick={() => setAberto(false)}
                className="brilho-borda flex items-center justify-center px-10 py-4
                  font-[family-name:var(--font-livro)] text-base tracking-[0.1em] text-[var(--color-ouro)]
                  shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--color-ouro)_65%,transparent)]
                  transition-colors duration-500 hover:text-[var(--color-ouro-luz)]"
              >
                Preciso de um momento de oração
              </Link>

              {autenticado && (
                <form action={sair} className="mt-8 text-center">
                  <button
                    type="submit"
                    className="font-[family-name:var(--font-interface)] text-sm
                      text-[color-mix(in_oklab,var(--color-pergaminho)_55%,transparent)]
                      transition-colors duration-500 hover:text-[var(--color-pergaminho)]"
                  >
                    Sair
                  </button>
                </form>
              )}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}

/** As três barras que viram cruz, iguais às do pórtico da rua. */
function BotaoDoRecolhimento({
  aberto,
  aoClicar,
}: {
  aberto: boolean;
  aoClicar: () => void;
}) {
  return (
    <button
      type="button"
      onClick={aoClicar}
      aria-expanded={aberto}
      aria-controls="menu-da-sala"
      className="flex h-11 w-11 shrink-0 flex-col items-center justify-center gap-[5px]
        rounded-full shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--color-ouro)_55%,transparent)]
        transition-colors duration-500 hover:shadow-[inset_0_0_0_1px_var(--color-ouro-luz)] lg:hidden"
    >
      <span className="sr-only">{aberto ? "Fechar menu" : "Abrir menu"}</span>
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          aria-hidden
          className={`block h-px w-4 bg-[var(--color-ouro)] transition-all duration-500 ease-[var(--ease-santuario)] ${
            aberto && i === 0 ? "translate-y-[6px] rotate-45" : ""
          } ${aberto && i === 1 ? "opacity-0" : ""} ${
            aberto && i === 2 ? "-translate-y-[6px] -rotate-45" : ""
          }`}
        />
      ))}
    </button>
  );
}
