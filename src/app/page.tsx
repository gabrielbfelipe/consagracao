import Link from "next/link";
import { Nave } from "@/components/atmosphere/Nave";
import { PorticoPublico } from "@/components/navegacao/PorticoPublico";
import { PAGINAS } from "@/content/sobre";

export default function Entrada() {
  return (
    <div data-sala="biblioteca" className="min-h-dvh">
      <PorticoPublico />

      {/* A nave: o eixo que conduz o olhar até a luz do fundo. */}
      <section className="luz-alta relative flex min-h-[78svh] flex-col items-center justify-center overflow-hidden px-6 py-16 text-center">
        <Nave className="chega-nave pointer-events-none absolute inset-0 -z-10 h-full w-full" />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-2/3 bg-[linear-gradient(to_top,var(--color-sombra),transparent)]"
        />

        <h1
          className="chega max-w-[19ch] font-[family-name:var(--font-livro)] text-[clamp(2.25rem,1.4rem+3.6vw,4.25rem)] leading-[1.12] text-balance text-[var(--color-marfim)]"
          style={{ "--espera": "400ms" } as React.CSSProperties}
        >
          Comece sua jornada de preparação para a Consagração a Nossa Senhora
        </h1>

        <div
          className="chega mt-9 h-px w-28 bg-[linear-gradient(to_right,transparent,var(--color-ouro),transparent)]"
          style={{ "--espera": "900ms" } as React.CSSProperties}
          aria-hidden
        />

        <p
          className="chega voz-livro mt-9 text-[var(--texto-suave)]"
          style={{ "--espera": "1100ms" } as React.CSSProperties}
        >
          Consagrar-se é entregar a si mesmo a Jesus Cristo pelas mãos de Maria.
          São trinta e três dias de leitura, oração e silêncio, segundo o método
          de São Luís de Montfort. Você escolhe a data; o caminho até ela é
          preparado para você, dia por dia.
        </p>

        <div
          className="chega mt-11 flex flex-col items-center gap-5"
          style={{ "--espera": "1400ms" } as React.CSSProperties}
        >
          <Link
            href="/entrar"
            className="brilho-borda superficie-vidro inline-flex items-center px-12 py-4
              font-[family-name:var(--font-livro)] text-lg tracking-[0.3em] indent-[0.3em] uppercase
              text-[var(--color-marfim)] transition-[box-shadow,color] duration-500 ease-[var(--ease-santuario)]
              hover:text-[var(--color-ouro-luz)]
              hover:shadow-[inset_0_0_0_1px_var(--color-ouro),0_0_32px_-10px_color-mix(in_oklab,var(--color-ouro)_70%,transparent)]"
          >
            Iniciar preparação
          </Link>

          <p className="text-sm text-[var(--texto-suave)]">
            Leva um minuto: você cria sua conta e escolhe a data.
          </p>
        </div>
      </section>

      {/* Em poucas linhas, o que há atrás de cada porta. */}
      <section className="px-6 pb-24 sm:px-10">
        <ul className="mx-auto grid max-w-6xl gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {PAGINAS.map((p) => (
            <li key={p.slug} className="assenta">
              <Link href={`/sobre/${p.slug}`} className="group block">
                <div
                  aria-hidden
                  className="h-px w-full bg-[linear-gradient(to_right,color-mix(in_oklab,var(--color-ouro)_65%,transparent),transparent)]
                    transition-[background] duration-700 ease-[var(--ease-santuario)]
                    group-hover:bg-[linear-gradient(to_right,var(--color-ouro-luz),transparent)]"
                />

                <h2 className="mt-5 font-[family-name:var(--font-livro)] text-[1.6rem] leading-snug text-[var(--color-marfim)]
                  transition-colors duration-500 group-hover:text-[var(--color-ouro-luz)]">
                  {p.titulo}
                </h2>

                <p className="voz-livro mt-3 text-[0.98rem] text-[var(--texto-suave)]">
                  {p.resumo}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <footer className="px-6 pb-20 text-center">
        <p className="voz-livro mx-auto text-[var(--texto-suave)]">
          “Um caminho de preparação, oração e conhecimento que conduz o coração
          a Cristo pelas mãos de Maria.”
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
          <Link href="/calendario" className={ELO}>
            Ver as datas
          </Link>
          <Link href="/biblioteca" className={ELO}>
            Biblioteca
          </Link>
          <Link href="/privacidade" className={ELO}>
            Privacidade
          </Link>
          <Link href="/creditos" className={ELO}>
            Créditos
          </Link>
        </div>
      </footer>
    </div>
  );
}

const ELO = `text-sm text-[var(--texto-suave)] underline
  decoration-[color-mix(in_oklab,var(--color-ouro)_35%,transparent)] underline-offset-[6px]
  transition-colors hover:text-[var(--color-pergaminho)]`;
