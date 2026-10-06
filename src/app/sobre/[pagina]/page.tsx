import Image from "next/image";
import { PorticoDaSala } from "@/components/navegacao/PorticoDaSala";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { PAGINAS, paginaPorSlug, proximaPagina } from "@/content/sobre";
import { IMAGENS, urlDaImagem } from "@/lib/imagens";
import { Botao, EloDeTexto } from "@/components/vitrine/Botao";
import { Rodape } from "@/components/vitrine/Rodape";
import { Passagem } from "@/components/atmosphere/Passagem";

export function generateStaticParams() {
  return PAGINAS.map((p) => ({ pagina: p.slug }));
}

type Props = { params: Promise<{ pagina: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { pagina } = await params;
  const p = paginaPorSlug(pagina);
  if (!p) return {};
  return { title: p.titulo, description: p.resumo };
}

export default async function Sobre({ params }: Props) {
  const { pagina } = await params;
  const p = paginaPorSlug(pagina);
  if (!p) notFound();

  const proxima = proximaPagina(p.slug);

  return (
    <Passagem>
      <div className="min-h-dvh">
        <PorticoDaSala sobreImagem />

        {/* A fachada: fotografia em tela larga com o título sobreposto. */}
        <header
          data-sala="biblioteca"
          className="relative flex min-h-[58svh] items-end overflow-hidden"
        >
          <Image
            src={urlDaImagem(p.imagem ?? "arcaria", {
              largura: 2000,
              qualidade: 76,
            })}
            alt={IMAGENS[p.imagem ?? "arcaria"].alt}
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
          {/* Dois véus: um de baixo para cima, que assenta o título, e outro
              da esquerda, porque a fotografia pode clarear justamente onde o
              texto começa. */}
          <div
            aria-hidden
            className="absolute inset-0 bg-[linear-gradient(to_top,rgba(8,5,3,0.96)_8%,rgba(8,5,3,0.55)_52%,rgba(8,5,3,0.6))]"
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-[linear-gradient(to_right,rgba(8,5,3,0.7),rgba(8,5,3,0.15)_55%,transparent)]"
          />

          <div className="relative w-full px-6 pb-16 sm:px-12 lg:px-20">
            <div className="mx-auto max-w-[100rem]">
              <p className="font-[family-name:var(--font-livro)] text-[clamp(1.1rem,0.95rem+0.7vw,1.6rem)] text-[var(--color-ouro)] italic">
                {p.chamada}
              </p>

              <h1 className="mt-3 max-w-[20ch] font-[family-name:var(--font-livro)] text-[clamp(2.25rem,1.5rem+3.4vw,4.5rem)] leading-[1.03] text-balance text-[var(--color-marfim)] uppercase">
                {p.titulo}
              </h1>
            </div>
          </div>
        </header>

        {/* O corpo, sobre pedra clara: texto longo se lê melhor assim. */}
        <main data-sala="pedra" className="bg-[var(--fundo)]">
          <article className="mx-auto max-w-[68ch] px-6 py-24 sm:px-10 lg:py-32">
            {p.secoes.map((secao, i) => (
              <section key={i} className={`assenta ${i > 0 ? "mt-14" : ""}`}>
                {secao.titulo && (
                  <>
                    <h2 className="font-[family-name:var(--font-livro)] text-[clamp(1.6rem,1.3rem+1.1vw,2.1rem)] leading-snug text-[var(--texto)]">
                      {secao.titulo}
                    </h2>
                    <div
                      aria-hidden
                      className="mt-5 h-px w-16 bg-[linear-gradient(to_right,var(--realce),transparent)]"
                    />
                  </>
                )}

                <div
                  className={`voz-livro text-[var(--texto-suave)] ${secao.titulo ? "mt-6" : ""}`}
                >
                  {secao.paragrafos.map((texto, j) => (
                    <p key={j}>{texto}</p>
                  ))}
                </div>
              </section>
            ))}

            {p.aviso && (
              <aside className="assenta mt-16 border-y border-[color-mix(in_oklab,var(--realce)_40%,transparent)] py-10">
                <h2 className="font-[family-name:var(--font-livro)] text-[clamp(1.5rem,1.25rem+0.9vw,1.9rem)] leading-snug text-[var(--texto)]">
                  {p.aviso.titulo}
                </h2>
                <div className="voz-livro mt-5 text-[var(--texto-suave)]">
                  {p.aviso.texto.map((texto, i) => (
                    <p key={i}>{texto}</p>
                  ))}
                </div>
              </aside>
            )}

            {proxima && (
              <nav className="mt-20 border-t border-[color-mix(in_oklab,var(--realce)_30%,transparent)] pt-10">
                <p className="font-[family-name:var(--font-livro)] text-[var(--realce)] italic">
                  A seguir
                </p>
                <EloDeTexto
                  href={`/sobre/${proxima.slug}`}
                  className="mt-3 !text-[var(--texto)]"
                >
                  {proxima.titulo}
                </EloDeTexto>
              </nav>
            )}
          </article>
        </main>

        {/* O chamado, sempre ao fim de cada sala. */}
        <section
          data-sala="biblioteca"
          className="relative flex min-h-[54svh] items-center justify-center overflow-hidden px-6 py-24 text-center"
        >
          <div aria-hidden className="absolute inset-0">
            <Image
              src={urlDaImagem("velas", { largura: 1800, qualidade: 68 })}
              alt=""
              fill
              sizes="100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-[color-mix(in_oklab,var(--color-sombra)_74%,transparent)]" />
          </div>

          <div className="relative max-w-[52ch]">
            <h2 className="font-[family-name:var(--font-livro)] text-[clamp(1.9rem,1.4rem+2.4vw,3rem)] leading-[1.08] text-balance text-[var(--color-marfim)] uppercase">
              Comece quando quiser
            </h2>
            <p className="voz-livro mx-auto mt-7 text-[color-mix(in_oklab,var(--color-pergaminho)_82%,transparent)]">
              A conta leva um minuto, e a data pode ser escolhida com calma
              depois.
            </p>
            <div className="mt-10">
              <Botao href="/entrar">Iniciar preparação</Botao>
            </div>
          </div>
        </section>

        <Rodape />
      </div>
    </Passagem>
  );
}
