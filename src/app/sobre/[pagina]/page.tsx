import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { PAGINAS, paginaPorSlug, proximaPagina } from "@/content/sobre";
import { IMAGENS, urlDaImagem } from "@/lib/imagens";
import { PorticoPublico } from "@/components/navegacao/PorticoPublico";

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
    <div data-sala="biblioteca" className="min-h-dvh">
      <PorticoPublico />

      <main className="pb-28">
        {p.imagem && (
          <div className="relative mx-auto h-[30svh] max-w-5xl overflow-hidden rounded-t-[10rem] sm:h-[38svh]">
            <Image
              src={urlDaImagem(p.imagem, { largura: 1400 })}
              alt={IMAGENS[p.imagem].alt}
              fill
              sizes="(max-width: 64rem) 100vw, 64rem"
              className="object-cover"
              priority
            />
            <div
              aria-hidden
              className="absolute inset-0 bg-[linear-gradient(to_top,var(--fundo)_3%,transparent_58%),radial-gradient(ellipse_70%_50%_at_50%_0%,rgba(255,238,194,0.16),transparent_70%)]"
            />
          </div>
        )}

        <article className="mx-auto max-w-[62ch] px-6 pt-12">
          <h1 className="font-[family-name:var(--font-livro)] text-[clamp(2rem,1.4rem+2.6vw,3.25rem)] leading-[1.12] text-balance text-[var(--color-marfim)]">
            {p.titulo}
          </h1>

          <p className="mt-4 font-[family-name:var(--font-livro)] text-xl leading-relaxed text-[var(--color-ouro)] italic">
            {p.chamada}
          </p>

          <div
            aria-hidden
            className="mt-9 h-px w-24 bg-[linear-gradient(to_right,var(--color-ouro),transparent)]"
          />

          {p.secoes.map((secao, i) => (
            <section key={i} className="assenta mt-12">
              {secao.titulo && (
                <h2 className="font-[family-name:var(--font-livro)] text-2xl leading-snug text-[var(--color-marfim)]">
                  {secao.titulo}
                </h2>
              )}
              <div
                className={`voz-livro text-[var(--texto-suave)] ${secao.titulo ? "mt-5" : ""}`}
              >
                {secao.paragrafos.map((texto, j) => (
                  <p key={j}>{texto}</p>
                ))}
              </div>
            </section>
          ))}

          {p.aviso && (
            <aside className="superficie-pergaminho mt-14 px-7 py-8">
              <h2 className="font-[family-name:var(--font-livro)] text-2xl leading-snug text-[#2a1d12]">
                {p.aviso.titulo}
              </h2>
              <div className="mt-4 font-[family-name:var(--font-livro)] text-[1.05rem] leading-[1.75] text-[#3d2c1c]">
                {p.aviso.texto.map((texto, i) => (
                  <p key={i} className={i > 0 ? "mt-4" : undefined}>
                    {texto}
                  </p>
                ))}
              </div>
            </aside>
          )}

          {/* Fim da página: ou segue lendo, ou começa. */}
          <nav className="mt-20 flex flex-col items-center gap-7 border-t border-[color-mix(in_oklab,var(--color-bronze)_35%,transparent)] pt-12">
            <Link href="/entrar" className={BOTAO}>
              Iniciar preparação
            </Link>

            {proxima && (
              <Link
                href={`/sobre/${proxima.slug}`}
                className="text-center text-sm text-[var(--texto-suave)] underline
                  decoration-[color-mix(in_oklab,var(--color-ouro)_35%,transparent)] underline-offset-[6px]
                  transition-colors hover:text-[var(--color-pergaminho)]"
              >
                Continuar lendo: {proxima.titulo.toLowerCase()}
              </Link>
            )}
          </nav>
        </article>
      </main>
    </div>
  );
}

const BOTAO = `brilho-borda superficie-vidro inline-flex items-center px-12 py-4
  font-[family-name:var(--font-livro)] text-lg tracking-[0.3em] indent-[0.3em] uppercase
  text-[var(--color-marfim)] transition-[box-shadow,color] duration-500 ease-[var(--ease-santuario)]
  hover:text-[var(--color-ouro-luz)]
  hover:shadow-[inset_0_0_0_1px_var(--color-ouro),0_0_32px_-10px_color-mix(in_oklab,var(--color-ouro)_70%,transparent)]`;
