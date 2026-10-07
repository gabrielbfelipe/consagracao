"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { PAGINAS } from "@/content/sobre";

/**
 * O pórtico: a faixa no alto de todas as salas abertas ao público.
 *
 * Sobre a fotografia do hero ele é transparente, para não cortar a imagem;
 * ao rolar, assenta num fundo escuro para continuar legível. No celular
 * abre em tela cheia, porque um menu espremido num canto não combina com
 * o resto da casa.
 */

/**
 * As duas salas que não são páginas de apresentação.
 *
 * `so2xl` marca as que só aparecem em telas largas: com sete rótulos em
 * português, um monitor de 1280px empurrava o botão de ação para fora da
 * tela. Quem não as vê aqui as encontra no rodapé e no menu recolhido.
 */
const EXTRAS = [
  { href: "/calendario", rotulo: "Calendário", so2xl: false },
  { href: "/cadeias", rotulo: "Cadeias", so2xl: false },
  { href: "/biblioteca", rotulo: "Biblioteca", so2xl: true },
] as const;

export function PorticoPublico({
  sobreImagem = false,
}: {
  /** Verdadeiro quando há fotografia por baixo e o pórtico deve flutuar. */
  sobreImagem?: boolean;
}) {
  const [aberto, setAberto] = useState(false);
  const [rolou, setRolou] = useState(false);
  const caminho = usePathname();

  const itens = [
    ...PAGINAS.map((p) => ({
      href: `/sobre/${p.slug}`,
      rotulo: p.menu,
      so2xl: false,
    })),
    ...EXTRAS,
  ];

  useEffect(() => {
    const aoRolar = () => setRolou(window.scrollY > 40);
    aoRolar();
    window.addEventListener("scroll", aoRolar, { passive: true });
    return () => window.removeEventListener("scroll", aoRolar);
  }, []);

  // Com o menu aberto em tela cheia, a página atrás não deve rolar junto.
  useEffect(() => {
    document.body.style.overflow = aberto ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [aberto]);

  const flutuante = sobreImagem && !rolou && !aberto;

  return (
    <header
      className={`top-0 right-0 left-0 z-50 transition-[background-color,box-shadow,backdrop-filter] duration-700 ease-[var(--ease-santuario)] ${
        sobreImagem ? "fixed" : "sticky"
      } ${
        flutuante
          ? "bg-transparent"
          : "bg-[color-mix(in_oklab,var(--color-sombra)_92%,transparent)] shadow-[0_1px_0_color-mix(in_oklab,var(--color-ouro)_22%,transparent)] backdrop-blur-sm"
      }`}
    >
      <div className="mx-auto flex max-w-[110rem] items-center justify-between gap-8 px-6 py-5 sm:px-10">
        <Marca aoClicar={() => setAberto(false)} />

        {/* Sete rótulos em português são muito mais largos que os do inglês:
            com tipo grande eles transbordavam e engoliam o botão de ação.
            Aqui a letra é menor e o entreletras, curto. */}
        <nav aria-label="Seções" className="hidden items-center gap-6 xl:flex">
          {itens.map((item) => (
            <Elo
              key={item.href}
              href={item.href}
              rotulo={item.rotulo}
              ativo={caminho === item.href}
              so2xl={item.so2xl}
            />
          ))}
        </nav>

        <div className="flex items-center gap-6">
          <Link
            href="/entrar"
            className="hidden font-[family-name:var(--font-interface)] text-sm whitespace-nowrap
              text-[color-mix(in_oklab,var(--color-pergaminho)_60%,transparent)]
              transition-colors duration-500 hover:text-[var(--color-pergaminho)] 2xl:inline"
          >
            Já tenho conta
          </Link>

          <Link
            href="/cadastro"
            className="brilho-borda hidden items-center px-8 py-3
              font-[family-name:var(--font-livro)] text-sm tracking-[0.22em] indent-[0.22em] whitespace-nowrap
              text-[var(--color-marfim)] uppercase
              shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--color-ouro)_65%,transparent)]
              transition-[box-shadow,color] duration-500 ease-[var(--ease-santuario)]
              hover:text-[var(--color-ouro-luz)] hover:shadow-[inset_0_0_0_1px_var(--color-ouro-luz)] sm:inline-flex"
          >
            Iniciar
          </Link>

          <button
            type="button"
            onClick={() => setAberto(!aberto)}
            aria-expanded={aberto}
            aria-controls="menu-completo"
            className="flex h-11 w-11 shrink-0 flex-col items-center justify-center gap-[5px]
              rounded-full shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--color-ouro)_55%,transparent)]
              transition-colors duration-500 hover:shadow-[inset_0_0_0_1px_var(--color-ouro-luz)] xl:hidden"
          >
            <span className="sr-only">
              {aberto ? "Fechar menu" : "Abrir menu"}
            </span>
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
        </div>
      </div>

      <AnimatePresence>
        {aberto && (
          <motion.nav
            id="menu-completo"
            aria-label="Seções"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 top-[5.25rem] overflow-y-auto bg-[var(--color-sombra)] xl:hidden"
          >
            <ul className="px-6 py-8 sm:px-10">
              {itens.map((item, i) => (
                <motion.li
                  key={item.href}
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
                    href={item.href}
                    onClick={() => setAberto(false)}
                    className="block py-5 font-[family-name:var(--font-livro)] text-2xl
                      text-[var(--color-marfim)] transition-colors duration-300 hover:text-[var(--color-ouro-luz)]"
                  >
                    {item.rotulo}
                  </Link>
                </motion.li>
              ))}
            </ul>

            <div className="px-6 pb-16 sm:px-10">
              <Link
                href="/cadastro"
                onClick={() => setAberto(false)}
                className="brilho-borda flex items-center justify-center px-10 py-4
                  font-[family-name:var(--font-livro)] text-base tracking-[0.28em] indent-[0.28em] uppercase
                  text-[var(--color-marfim)]
                  shadow-[inset_0_0_0_1px_var(--color-ouro)] transition-colors duration-500
                  hover:text-[var(--color-ouro-luz)]"
              >
                Iniciar preparação
              </Link>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}

function Marca({ aoClicar }: { aoClicar: () => void }) {
  return (
    <Link
      href="/"
      onClick={aoClicar}
      className="group flex items-center gap-3.5 whitespace-nowrap"
    >
      {/* O arco e a estrela, o mesmo desenho do ícone do aplicativo. */}
      <svg viewBox="0 0 48 48" className="h-9 w-9 shrink-0" aria-hidden>
        <defs>
          <linearGradient id="marca-ouro" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#f0dfa8" />
            <stop offset="60%" stopColor="#c2a15c" />
            <stop offset="100%" stopColor="#8a6b2e" />
          </linearGradient>
        </defs>
        <path
          d="M11 42 L11 22 A13 13 0 0 1 37 22 L37 42"
          fill="none"
          stroke="url(#marca-ouro)"
          strokeWidth="2.4"
          strokeLinecap="round"
        />
        <path
          d="M24 15 Q25 24 31 25.5 Q25 27 24 36 Q23 27 17 25.5 Q23 24 24 15 Z"
          fill="url(#marca-ouro)"
        />
      </svg>

      <span className="font-[family-name:var(--font-livro)] text-lg leading-none tracking-[0.22em] text-[var(--color-marfim)] uppercase transition-colors duration-500 group-hover:text-[var(--color-ouro-luz)]">
        Consagração
      </span>
    </Link>
  );
}

function Elo({
  href,
  rotulo,
  ativo,
  so2xl = false,
}: {
  href: string;
  rotulo: string;
  ativo: boolean;
  so2xl?: boolean;
}) {
  return (
    <Link
      href={href}
      aria-current={ativo ? "page" : undefined}
      className={`relative font-[family-name:var(--font-livro)] text-[0.82rem] tracking-[0.06em] whitespace-nowrap
        uppercase transition-colors duration-500 ease-[var(--ease-santuario)] hover:text-[var(--color-ouro-luz)]
        ${so2xl ? "hidden 2xl:inline" : ""}
        ${ativo ? "text-[var(--color-ouro)]" : "text-[color-mix(in_oklab,var(--color-pergaminho)_72%,transparent)]"}`}
    >
      {rotulo}
      <span
        aria-hidden
        className={`absolute -bottom-2 left-0 h-px bg-[var(--color-ouro)] transition-all duration-500 ease-[var(--ease-santuario)] ${
          ativo ? "w-full" : "w-0"
        }`}
      />
    </Link>
  );
}
