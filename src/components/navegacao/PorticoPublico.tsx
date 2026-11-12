"use client";

import { useEffect, useRef, useState } from "react";
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
 * As quatro salas que não são páginas de apresentação.
 *
 * Ficam soltas na faixa porque são destinos, não leitura: calendário,
 * biblioteca, cadeias e o dia a dia da preparação. As cinco páginas de
 * apresentação (o que é, por que fazer, como funciona...) vão dentro do
 * menu "Conhecer" — ver o comentário sobre ele mais abaixo.
 */
const EXTRAS = [
  { href: "/preparacao", rotulo: "Dia a dia" },
  { href: "/calendario", rotulo: "Calendário" },
  { href: "/cadeias", rotulo: "Cadeias" },
  { href: "/biblioteca", rotulo: "Biblioteca" },
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

  // O menu do celular continua uma lista única e plana — não há porque
  // dar ao dedo uma gaveta dentro de outra gaveta.
  const itens = [
    ...PAGINAS.map((p) => ({ href: `/sobre/${p.slug}`, rotulo: p.menu })),
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
    <>
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

          {/*
           * Isto já foi nove rótulos soltos — as cinco páginas de
           * apresentação mais as quatro salas — e nove rótulos em
           * português, sem quebra de linha, não cabem nem num monitor de
           * 1920px: a faixa transbordava e nascia barra de rolagem
           * horizontal na página inteira. Agrupar as cinco páginas de
           * leitura num só menu suspenso ("Conhecer") devolve a faixa a
           * cinco itens, que é uma largura que qualquer tela a partir de
           * 1280px comporta com folga.
           */}
          <nav aria-label="Seções" className="hidden items-center gap-7 xl:flex">
            <MenuSuspenso
              rotulo="Conhecer"
              itens={PAGINAS.map((p) => ({
                href: `/sobre/${p.slug}`,
                rotulo: p.menu,
              }))}
              caminho={caminho}
            />
            {EXTRAS.map((item) => (
              <Elo
                key={item.href}
                href={item.href}
                rotulo={item.rotulo}
                ativo={caminho === item.href}
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
      </header>

      {/* O menu fica FORA do cabeçalho de propósito.
          Dentro dele nunca abria: o pórtico assentado usa backdrop-blur, e
          um elemento com backdrop-filter passa a ser o bloco de contenção
          dos descendentes fixos. O painel, que é `fixed inset-0`, era então
          medido contra a faixa de 5.25rem do próprio cabeçalho e nascia com
          altura zero — o ícone virava cruz e não se via nada. Aqui ele se
          mede contra a janela, e o z-40 o deixa correr por baixo da faixa. */}
      <AnimatePresence>
        {aberto && (
          <motion.nav
            id="menu-completo"
            aria-label="Seções"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 top-[5.25rem] z-40 overflow-y-auto bg-[var(--color-sombra)] xl:hidden"
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

            {/* Duas portas, e nesta ordem. "Já tenho conta" só aparece na
                faixa a partir de 2xl, de modo que no celular quem já está
                inscrito não tinha por onde entrar senão pela inscrição. */}
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

              <Link
                href="/entrar"
                onClick={() => setAberto(false)}
                className="mt-4 flex items-center justify-center px-10 py-4
                  font-[family-name:var(--font-livro)] text-base tracking-[0.28em] indent-[0.28em] uppercase
                  text-[color-mix(in_oklab,var(--color-pergaminho)_72%,transparent)]
                  shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--color-bronze)_55%,transparent)]
                  transition-[box-shadow,color] duration-500
                  hover:text-[var(--color-pergaminho)]
                  hover:shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--color-ouro)_55%,transparent)]"
              >
                Entrar
              </Link>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
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
}: {
  href: string;
  rotulo: string;
  ativo: boolean;
}) {
  return (
    <Link
      href={href}
      aria-current={ativo ? "page" : undefined}
      className={`relative font-[family-name:var(--font-livro)] text-[0.82rem] tracking-[0.06em] whitespace-nowrap
        uppercase transition-colors duration-500 ease-[var(--ease-santuario)] hover:text-[var(--color-ouro-luz)]
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

/**
 * O menu suspenso que recolhe as cinco páginas de apresentação.
 *
 * Por que um dropdown, e não mais um Elo entre os outros: essas cinco
 * páginas (o que é a consagração, por que fazer, como funciona a
 * preparação...) são leitura de quem ainda está decidindo, e formam um
 * grupo com nome próprio — "conhecer" antes de começar. As quatro salas
 * ao lado (calendário, biblioteca, cadeias, dia a dia) são destinos de
 * quem já decidiu. Juntar os dois tipos numa fileira só foi o que
 * transbordou a faixa; separá-los por função resolve o espaço e também
 * fica mais claro para quem lê.
 */
function MenuSuspenso({
  rotulo,
  itens,
  caminho,
}: {
  rotulo: string;
  itens: readonly { href: string; rotulo: string }[];
  caminho: string | null;
}) {
  const [aberto, setAberto] = useState(false);
  const raiz = useRef<HTMLDivElement>(null);
  const ativo = itens.some((item) => item.href === caminho);

  // Fecha ao clicar fora e ao apertar Esc. Navegar também fecha, mas isso
  // é o onClick de cada link: fechar por efeito ao mudar de rota dispara
  // renderização em cascata, e o lint reclama com razão.
  useEffect(() => {
    if (!aberto) return;

    const aoClicarFora = (e: MouseEvent) => {
      if (raiz.current && !raiz.current.contains(e.target as Node)) {
        setAberto(false);
      }
    };
    const aoTeclar = (e: KeyboardEvent) => {
      if (e.key === "Escape") setAberto(false);
    };

    document.addEventListener("mousedown", aoClicarFora);
    document.addEventListener("keydown", aoTeclar);
    return () => {
      document.removeEventListener("mousedown", aoClicarFora);
      document.removeEventListener("keydown", aoTeclar);
    };
  }, [aberto]);

  return (
    <div ref={raiz} className="relative">
      <button
        type="button"
        onClick={() => setAberto((v) => !v)}
        aria-expanded={aberto}
        aria-haspopup="menu"
        className={`relative flex items-center gap-1.5 font-[family-name:var(--font-livro)] text-[0.82rem] tracking-[0.06em]
          uppercase transition-colors duration-500 ease-[var(--ease-santuario)] hover:text-[var(--color-ouro-luz)]
          ${ativo ? "text-[var(--color-ouro)]" : "text-[color-mix(in_oklab,var(--color-pergaminho)_72%,transparent)]"}`}
      >
        {rotulo}
        <svg viewBox="0 0 12 8" aria-hidden className="h-2 w-2.5 shrink-0">
          <path
            d="M1 1l5 5 5-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`origin-center transition-transform duration-300 ${aberto ? "-rotate-180" : ""}`}
          />
        </svg>
        <span
          aria-hidden
          className={`absolute -bottom-2 left-0 h-px bg-[var(--color-ouro)] transition-all duration-500 ease-[var(--ease-santuario)] ${
            ativo ? "w-full" : "w-0"
          }`}
        />
      </button>

      <AnimatePresence>
        {aberto && (
          <motion.div
            role="menu"
            aria-label={rotulo}
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.22, ease: [0.22, 0.61, 0.36, 1] }}
            className="superficie-madeira absolute left-0 top-full z-10 mt-4 min-w-[16rem] py-2"
          >
            {itens.map((item) => {
              const itemAtivo = caminho === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  role="menuitem"
                  aria-current={itemAtivo ? "page" : undefined}
                  onClick={() => setAberto(false)}
                  className={`block px-5 py-3 font-[family-name:var(--font-livro)] text-[0.88rem] tracking-[0.02em]
                    transition-colors duration-300 hover:text-[var(--color-ouro-luz)]
                    ${itemAtivo ? "text-[var(--color-ouro)]" : "text-[color-mix(in_oklab,var(--color-pergaminho)_82%,transparent)]"}`}
                >
                  {item.rotulo}
                </Link>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
