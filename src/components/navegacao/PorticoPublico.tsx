"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { PAGINAS } from "@/content/sobre";

/**
 * O cabeçalho de quem ainda não tem conta.
 *
 * Mantém a linguagem da casa — capitulares espaçadas, sem ícones — mas aqui
 * carrega o menu inteiro, porque é por ele que a apresentação foi dividida.
 * No celular recolhe-se, para não roubar a tela de quem está lendo.
 */

const EXTRAS = [
  { href: "/calendario", rotulo: "Calendário" },
  { href: "/biblioteca", rotulo: "Biblioteca" },
] as const;

export function PorticoPublico() {
  const [aberto, setAberto] = useState(false);
  const caminho = usePathname();
  const semMovimento = useReducedMotion();

  const itens = [
    ...PAGINAS.map((p) => ({ href: `/sobre/${p.slug}`, rotulo: p.menu })),
    ...EXTRAS,
  ];

  return (
    <header className="relative z-30">
      <div className="flex items-center justify-between gap-6 px-6 py-5 sm:px-10">
        <Link
          href="/"
          className="font-[family-name:var(--font-livro)] text-[0.95rem] tracking-[0.2em] whitespace-nowrap
            text-[var(--color-marfim)] uppercase transition-colors duration-500 hover:text-[var(--color-ouro-luz)]"
        >
          Consagração
        </Link>

        {/* Desktop: tudo à vista. */}
        <nav aria-label="Seções" className="hidden items-center gap-7 lg:flex">
          {itens.map((item) => (
            <Elo
              key={item.href}
              href={item.href}
              rotulo={item.rotulo}
              ativo={caminho === item.href}
            />
          ))}
        </nav>

        <div className="flex items-center gap-5">
          <Link
            href="/entrar"
            className="hidden font-[family-name:var(--font-interface)] text-sm
              text-[color-mix(in_oklab,var(--texto)_55%,transparent)]
              transition-colors duration-500 hover:text-[var(--texto)] sm:inline"
          >
            Já tenho conta
          </Link>

          <Link
            href="/entrar"
            className="brilho-borda superficie-vidro hidden items-center px-7 py-2.5
              font-[family-name:var(--font-livro)] text-sm tracking-[0.2em] indent-[0.2em] whitespace-nowrap
              text-[var(--color-marfim)] uppercase transition-[box-shadow,color] duration-500 ease-[var(--ease-santuario)]
              hover:text-[var(--color-ouro-luz)]
              hover:shadow-[inset_0_0_0_1px_var(--color-ouro)] sm:inline-flex"
          >
            Iniciar
          </Link>

          <button
            type="button"
            onClick={() => setAberto(!aberto)}
            aria-expanded={aberto}
            aria-controls="menu-recolhido"
            className="font-[family-name:var(--font-livro)] text-sm tracking-[0.16em] uppercase
              text-[var(--color-ouro)] transition-colors duration-500 hover:text-[var(--color-ouro-luz)] lg:hidden"
          >
            {aberto ? "Fechar" : "Menu"}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {aberto && (
          <motion.nav
            id="menu-recolhido"
            aria-label="Seções"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={
              semMovimento
                ? { duration: 0 }
                : { duration: 0.45, ease: [0.22, 0.61, 0.36, 1] }
            }
            className="superficie-vidro overflow-hidden lg:hidden"
          >
            <ul className="px-6 py-4 sm:px-10">
              {itens.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setAberto(false)}
                    className="block py-3 font-[family-name:var(--font-livro)] text-lg
                      text-[var(--texto)] transition-colors duration-300 hover:text-[var(--color-ouro-luz)]"
                  >
                    {item.rotulo}
                  </Link>
                </li>
              ))}
              <li className="mt-3 border-t border-[color-mix(in_oklab,var(--color-bronze)_40%,transparent)] pt-4">
                <Link
                  href="/entrar"
                  onClick={() => setAberto(false)}
                  className="block py-2 font-[family-name:var(--font-livro)] text-lg tracking-[0.16em]
                    text-[var(--color-ouro)] uppercase"
                >
                  Iniciar preparação
                </Link>
              </li>
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}

function Elo({
  href,
  rotulo,
  ativo,
}: {
  href: string;
  rotulo: string;
  ativo: boolean;
}) {
  return (
    <Link
      href={href}
      aria-current={ativo ? "page" : undefined}
      className={`relative font-[family-name:var(--font-livro)] text-[0.9rem] tracking-[0.14em] whitespace-nowrap
        uppercase transition-colors duration-500 ease-[var(--ease-santuario)] hover:text-[var(--color-ouro-luz)]
        ${ativo ? "text-[var(--color-ouro)]" : "text-[color-mix(in_oklab,var(--texto)_58%,transparent)]"}`}
    >
      {rotulo}
      {ativo && (
        <span
          aria-hidden
          className="absolute -bottom-2 left-0 h-px w-full bg-[linear-gradient(to_right,var(--color-ouro),transparent)]"
        />
      )}
    </Link>
  );
}
