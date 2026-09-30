import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { ORACOES } from "@/content/oracoes";
import { IMAGENS, urlDaImagem } from "@/lib/imagens";
import { Portico } from "@/components/navegacao/Portico";
import { PorticoPublico } from "@/components/navegacao/PorticoPublico";
import { usuarioAtual } from "@/lib/supabase/servidor";

export const metadata: Metadata = {
  title: "Biblioteca",
  description:
    "As orações da preparação, o livro que acompanha a jornada e os textos de formação.",
};

export default async function Biblioteca() {
  const autenticado = Boolean(await usuarioAtual());

  return (
    <div data-sala="estudo" className="min-h-dvh">
      {/* Quem já tem jornada navega pelas salas; quem não tem, pelo menu
          de apresentação, que é o que lhe serve. */}
      {autenticado ? <Portico autenticado /> : <PorticoPublico />}

      <main className="luz-alta px-6 pb-28 sm:px-10">
        <header className="mx-auto max-w-[62ch] pt-16 text-center">
          <h1 className="font-[family-name:var(--font-livro)] text-[clamp(2rem,1.5rem+2.4vw,3.25rem)] leading-tight text-[var(--color-marfim)]">
            Biblioteca
          </h1>
          <div
            aria-hidden
            className="mx-auto mt-8 h-px w-24 bg-[linear-gradient(to_right,transparent,var(--color-ouro),transparent)]"
          />
          <p className="voz-livro mx-auto mt-8 text-[var(--texto-suave)]">
            As orações que atravessam os trinta e três dias, e o livro que
            caminha ao lado desta preparação.
          </p>
        </header>

        {/* O livro, primeiro, porque é dele que a jornada depende. */}
        <section className="mx-auto mt-20 max-w-4xl">
          <div className="superficie-madeira grid gap-0 sm:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
            <div className="relative min-h-[240px] overflow-hidden">
              <Image
                src={urlDaImagem("livroAberto", { largura: 800 })}
                alt={IMAGENS.livroAberto.alt}
                fill
                sizes="(max-width: 40rem) 100vw, 20rem"
                className="object-cover"
              />
              <div
                aria-hidden
                className="absolute inset-0 bg-[linear-gradient(to_right,transparent_40%,var(--color-nogueira))] sm:bg-[linear-gradient(to_right,transparent_55%,var(--color-nogueira))]"
              />
            </div>

            <div className="px-8 py-10">
              <h2 className="font-[family-name:var(--font-livro)] text-2xl leading-snug text-[var(--color-marfim)]">
                Tratado da Verdadeira Devoção à Santíssima Virgem
              </h2>
              <p className="mt-2 font-[family-name:var(--font-livro)] text-lg text-[var(--color-ouro)] italic">
                São Luís Maria Grignion de Montfort
              </p>
              <p className="voz-livro mt-5 text-[0.98rem] text-[var(--texto-suave)]">
                Este é o livro da preparação. Não o reproduzimos aqui, por
                respeito ao trabalho das editoras e dos tradutores — a cada dia
                indicamos quais parágrafos ler no seu exemplar.
              </p>
              <Link
                href="/sobre/o-livro"
                className="mt-7 inline-block font-[family-name:var(--font-livro)] text-base tracking-[0.14em] uppercase
                  text-[var(--color-ouro)] underline decoration-[color-mix(in_oklab,var(--color-ouro)_45%,transparent)]
                  underline-offset-[7px] transition-colors hover:text-[var(--color-ouro-luz)]"
              >
                Como escolher sua edição
              </Link>
            </div>
          </div>
        </section>

        {/* Orações */}
        <section className="mx-auto mt-24 max-w-4xl">
          <h2 className="text-center font-[family-name:var(--font-livro)] text-3xl text-[var(--color-marfim)]">
            Orações
          </h2>

          <ul className="mt-12 space-y-px">
            {ORACOES.map((o) => (
              <li key={o.id}>
                <Link
                  href={`/biblioteca/${o.id}`}
                  className="brilho-borda superficie-madeira group block px-7 py-7
                    transition-[box-shadow] duration-700 ease-[var(--ease-santuario)]
                    hover:shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--color-ouro)_55%,transparent)]"
                >
                  <h3 className="font-[family-name:var(--font-livro)] text-2xl text-[var(--color-marfim)]
                    transition-colors duration-500 group-hover:text-[var(--color-ouro-luz)]">
                    {o.nome}
                  </h3>
                  {o.origem && (
                    <p className="mt-1 text-sm text-[color-mix(in_oklab,var(--color-pergaminho)_45%,transparent)]">
                      {o.origem}
                    </p>
                  )}
                  <p className="voz-livro mt-3 text-[0.98rem] text-[var(--texto-suave)]">
                    {o.proposito}
                  </p>
                </Link>
              </li>
            ))}
          </ul>

          <p className="mx-auto mt-12 max-w-[60ch] text-center text-sm leading-relaxed text-[color-mix(in_oklab,var(--color-pergaminho)_50%,transparent)]">
            As traduções ao português são próprias, feitas a partir do latim
            para este aplicativo, e ainda aguardam revisão. As ladainhas e o
            Rosário entrarão em seguida.
          </p>
        </section>
      </main>
    </div>
  );
}
