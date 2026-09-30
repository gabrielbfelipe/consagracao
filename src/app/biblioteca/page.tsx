import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { ORACOES } from "@/content/oracoes";
import { IMAGENS, urlDaImagem } from "@/lib/imagens";
import { Portico } from "@/components/navegacao/Portico";
import { PorticoPublico } from "@/components/navegacao/PorticoPublico";
import { TituloDeSecao } from "@/components/vitrine/TituloDeSecao";
import { EloDeTexto } from "@/components/vitrine/Botao";
import { Rodape } from "@/components/vitrine/Rodape";
import { usuarioAtual } from "@/lib/supabase/servidor";
import { Passagem } from "@/components/atmosphere/Passagem";

export const metadata: Metadata = {
  title: "Biblioteca",
  description:
    "As orações da preparação, o livro que acompanha a jornada e os textos de formação.",
};

export default async function Biblioteca() {
  const autenticado = Boolean(await usuarioAtual());

  return (
    <Passagem>
      <div className="min-h-dvh">
        {autenticado ? <Portico autenticado /> : <PorticoPublico sobreImagem />}

        <header
          data-sala="estudo"
          className="relative flex min-h-[50svh] items-end overflow-hidden"
        >
          <Image
            src={urlDaImagem("bibliotecaBarroca", {
              largura: 2000,
              qualidade: 76,
            })}
            alt={IMAGENS.bibliotecaBarroca.alt}
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-[linear-gradient(to_top,rgba(8,5,3,0.96)_8%,rgba(8,5,3,0.5)_55%,rgba(8,5,3,0.55))]"
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-[linear-gradient(to_right,rgba(8,5,3,0.66),transparent_60%)]"
          />

          <div className="relative w-full px-6 pb-14 sm:px-12 lg:px-20">
            <p className="font-[family-name:var(--font-livro)] text-[clamp(1.1rem,0.95rem+0.7vw,1.6rem)] text-[var(--color-ouro)] italic">
              Orações, formação e o livro
            </p>
            <h1 className="mt-3 font-[family-name:var(--font-livro)] text-[clamp(2.25rem,1.5rem+3.4vw,4.5rem)] leading-[1.03] text-[var(--color-marfim)] uppercase">
              Biblioteca
            </h1>
          </div>
        </header>

        {/* O livro, primeiro, porque é dele que a jornada depende. */}
        <section data-sala="estudo" className="bg-[var(--fundo)]">
          <div className="grid lg:grid-cols-2">
            <div className="relative min-h-[40svh] lg:min-h-[64svh]">
              <Image
                src={urlDaImagem("livroAberto", { largura: 1400 })}
                alt={IMAGENS.livroAberto.alt}
                fill
                sizes="(max-width: 64rem) 100vw, 50vw"
                className="object-cover"
              />
              <div
                aria-hidden
                className="absolute inset-0 bg-[linear-gradient(to_top,var(--fundo)_3%,transparent_55%)] lg:bg-[linear-gradient(to_right,transparent_50%,var(--fundo))]"
              />
            </div>

            <div className="flex items-center px-6 py-20 sm:px-12 lg:px-16">
              <div className="max-w-[50ch]">
                <TituloDeSecao
                  sobrenome="São Luís Maria Grignion de Montfort"
                  titulo="Tratado da Verdadeira Devoção"
                />

                <p className="voz-livro mt-8 text-[var(--texto-suave)]">
                  Este é o livro da preparação. Não o reproduzimos aqui, por
                  respeito ao trabalho das editoras e dos tradutores — a cada
                  dia indicamos quais parágrafos ler no seu exemplar, e aqui
                  você anota e marca o que quiser.
                </p>

                <EloDeTexto href="/sobre/o-livro" className="mt-8">
                  Como escolher sua edição
                </EloDeTexto>
              </div>
            </div>
          </div>
        </section>

        {/* As orações, sobre pedra clara — são para ler. */}
        <section
          data-sala="pedra"
          className="bg-[var(--fundo)] px-6 py-24 sm:px-10 lg:py-32"
        >
          <div className="mx-auto max-w-[100rem]">
            <TituloDeSecao
              sobrenome="Rezadas ao longo dos trinta e três dias"
              titulo="As orações da preparação"
              centrado
            />

            <ul className="mx-auto mt-16 grid max-w-[76rem] gap-x-12 gap-y-12 md:grid-cols-2">
              {ORACOES.map((o, i) => (
                <li key={o.id} className="assenta">
                  <Link
                    href={`/biblioteca/${o.id}`}
                    className="group block h-full"
                  >
                    <div className="flex items-baseline gap-4">
                      <span
                        aria-hidden
                        className="font-[family-name:var(--font-livro)] text-2xl text-[color-mix(in_oklab,var(--realce)_45%,transparent)] tabular-nums"
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div
                        aria-hidden
                        className="h-px flex-1 bg-[color-mix(in_oklab,var(--realce)_35%,transparent)]"
                      />
                    </div>

                    <h3 className="mt-5 font-[family-name:var(--font-livro)] text-[1.7rem] leading-snug text-[var(--texto)] transition-colors duration-500 group-hover:text-[var(--realce)]">
                      {o.nome}
                    </h3>

                    {o.origem && (
                      <p className="mt-1.5 font-[family-name:var(--font-livro)] text-[var(--realce)] italic">
                        {o.origem}
                      </p>
                    )}

                    <p className="voz-livro mt-4 text-[0.98rem] text-[var(--texto-suave)]">
                      {o.proposito}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>

            <p className="mx-auto mt-16 max-w-[62ch] text-center text-sm leading-relaxed text-[color-mix(in_oklab,var(--texto)_55%,transparent)]">
              As traduções ao português são próprias, feitas a partir do latim
              para este aplicativo, e trazem o original ao lado para
              conferência. Aguardam revisão. As ladainhas e o Rosário entrarão
              em seguida.
            </p>
          </div>
        </section>

        <Rodape />
      </div>
    </Passagem>
  );
}
