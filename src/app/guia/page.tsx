import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { CAPITULOS } from "@/content/guia";
import { IMAGENS, urlDaImagem } from "@/lib/imagens";

export const metadata: Metadata = {
  title: "Antes de começar",
  description:
    "O que é a consagração a Nossa Senhora, como funciona a preparação de 33 dias e o que você fará a cada dia.",
};

export default function Guia() {
  return (
    <main data-sala="biblioteca" className="min-h-dvh">
      <header className="luz-alta flex min-h-[70svh] flex-col items-center justify-center px-6 py-24 text-center">
        <h1 className="font-[family-name:var(--font-livro)] text-[clamp(2.25rem,1.5rem+3vw,3.75rem)] leading-[1.1] text-balance text-[var(--color-marfim)]">
          Antes de começar
        </h1>

        <div
          aria-hidden
          className="mt-9 h-px w-24 bg-[linear-gradient(to_right,transparent,var(--color-ouro),transparent)]"
        />

        <p className="voz-livro mt-9 text-[var(--texto-suave)]">
          Se você nunca fez uma preparação como esta, comece por aqui. São oito
          capítulos curtos que explicam o que é a consagração, como os trinta e
          três dias se organizam e o que você fará em cada um deles.
        </p>
      </header>

      {CAPITULOS.map((cap, i) => (
        <section key={cap.id} id={cap.id} className="relative">
          {/* A imagem é a porta do capítulo: passa-se sob o arco e se entra. */}
          {cap.imagem && (
            <div className="relative mx-auto h-[38svh] max-w-5xl overflow-hidden rounded-t-[12rem] sm:h-[46svh]">
              <Image
                src={urlDaImagem(cap.imagem, { largura: 1400 })}
                alt={IMAGENS[cap.imagem].alt}
                fill
                sizes="(max-width: 64rem) 100vw, 64rem"
                className="object-cover"
                priority={i === 0}
              />
              {/* O pé da imagem escurece para o texto nascer da penumbra. */}
              <div
                aria-hidden
                className="absolute inset-0 bg-[linear-gradient(to_top,var(--fundo)_2%,transparent_55%),radial-gradient(ellipse_70%_50%_at_50%_0%,rgba(255,238,194,0.16),transparent_70%)]"
              />
            </div>
          )}

          <div className="assenta mx-auto max-w-[62ch] px-6 pt-14 pb-24">
            <p className="font-[family-name:var(--font-interface)] text-sm text-[color-mix(in_oklab,var(--color-pergaminho)_45%,transparent)]">
              Capítulo {i + 1} de {CAPITULOS.length}
            </p>

            <h2 className="mt-4 font-[family-name:var(--font-livro)] text-[clamp(1.9rem,1.4rem+1.8vw,2.75rem)] leading-[1.15] text-balance text-[var(--color-marfim)]">
              {cap.titulo}
            </h2>

            <p className="mt-4 font-[family-name:var(--font-livro)] text-xl leading-relaxed text-[var(--color-ouro)] italic">
              {cap.chamada}
            </p>

            <div className="voz-livro mt-9 text-[var(--texto-suave)]">
              {cap.paragrafos.map((p, j) => (
                <p key={j}>{p}</p>
              ))}
            </div>

            {cap.aviso && (
              <aside className="superficie-pergaminho mt-12 px-7 py-8">
                <h3 className="font-[family-name:var(--font-livro)] text-2xl leading-snug text-[#2a1d12]">
                  {cap.aviso.titulo}
                </h3>
                <div className="mt-4 font-[family-name:var(--font-livro)] text-[1.05rem] leading-[1.75] text-[#3d2c1c]">
                  {cap.aviso.texto.map((p, j) => (
                    <p key={j} className={j > 0 ? "mt-4" : undefined}>
                      {p}
                    </p>
                  ))}
                </div>
              </aside>
            )}
          </div>
        </section>
      ))}

      <footer className="luz-alta flex flex-col items-center px-6 pt-10 pb-28 text-center">
        <p className="voz-livro text-[var(--texto-suave)]">
          É tudo o que você precisa saber para começar. O próximo passo é
          escolher o dia da sua consagração.
        </p>

        <Link
          href="/calendario"
          className="brilho-borda superficie-vidro mt-12 inline-flex items-center px-12 py-4
            font-[family-name:var(--font-livro)] text-lg tracking-[0.3em] indent-[0.3em] uppercase
            text-[var(--color-marfim)] transition-[box-shadow,color] duration-500 ease-[var(--ease-santuario)]
            hover:text-[var(--color-ouro-luz)]
            hover:shadow-[inset_0_0_0_1px_var(--color-ouro),0_0_32px_-10px_color-mix(in_oklab,var(--color-ouro)_70%,transparent)]"
        >
          Escolher a data
        </Link>

        <Link
          href="/creditos"
          className="mt-10 text-sm text-[var(--texto-suave)] underline
            decoration-[color-mix(in_oklab,var(--color-ouro)_35%,transparent)] underline-offset-[6px]
            transition-colors hover:text-[var(--color-pergaminho)]"
        >
          Créditos das imagens
        </Link>
      </footer>
    </main>
  );
}
