import Link from "next/link";
import { PorticoDaSala } from "@/components/navegacao/PorticoDaSala";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ORACOES, oracaoPorId } from "@/content/oracoes";
import { Rodape } from "@/components/vitrine/Rodape";
import { Passagem } from "@/components/atmosphere/Passagem";
import { DadosEstruturados } from "@/components/seo/DadosEstruturados";
import { grafoDeMigalhas } from "@/lib/seo/dadosEstruturados";
import { cartao } from "@/lib/seo/cartao";

export function generateStaticParams() {
  return ORACOES.map((o) => ({ oracao: o.id }));
}

type Props = { params: Promise<{ oracao: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { oracao } = await params;
  const o = oracaoPorId(oracao);
  if (!o) return {};

  const caminho = `/biblioteca/${o.id}`;
  return {
    title: o.nome,
    description: o.proposito,
    keywords: [o.nome, "oração", "consagração a Nossa Senhora"],
    ...cartao({
      titulo: o.nome,
      descricao: o.proposito,
      caminho,
      tipo: "article",
    }),
  };
}

export default async function PaginaDaOracao({ params }: Props) {
  const { oracao } = await params;
  const o = oracaoPorId(oracao);
  if (!o) notFound();

  return (
    <Passagem>
      <div className="min-h-dvh">
        <DadosEstruturados
          dados={grafoDeMigalhas([
            { nome: "Biblioteca", caminho: "/biblioteca" },
            { nome: o.nome, caminho: `/biblioteca/${o.id}` },
          ])}
        />

        <PorticoDaSala />

        {/* Uma oração se reza sobre papel claro, não no escuro. */}
        <main data-sala="pedra" className="bg-[var(--fundo)]">
          <div className="mx-auto max-w-[62ch] px-6 py-20 sm:px-10">
            <Link
              href="/biblioteca"
              className="text-sm text-[var(--texto-suave)] underline
                decoration-[color-mix(in_oklab,var(--realce)_40%,transparent)] underline-offset-[6px]
                transition-colors hover:text-[var(--realce)]"
            >
              Biblioteca
            </Link>

            <header className="mt-12 text-center">
              {o.origem && (
                <p className="font-[family-name:var(--font-livro)] text-[var(--realce)] italic">
                  {o.origem}
                </p>
              )}

              <h1 className="mt-3 font-[family-name:var(--font-livro)] text-[clamp(2rem,1.4rem+2.6vw,3.25rem)] leading-[1.08] text-balance text-[var(--texto)] uppercase">
                {o.nome}
              </h1>

              <div
                aria-hidden
                className="mx-auto mt-8 h-px w-24 bg-[linear-gradient(to_right,transparent,var(--realce),transparent)]"
              />

              <p className="voz-livro mx-auto mt-8 text-[var(--texto-suave)]">
                {o.proposito}
              </p>
            </header>

            {/* O texto para rezar: centrado, largo de entrelinha, sem ruído. */}
            <div className="mt-16 text-center">
              {o.portugues.map((estrofe, i) => (
                <p
                  key={i}
                  className={`font-[family-name:var(--font-livro)] text-[clamp(1.2rem,1.05rem+0.6vw,1.45rem)] leading-[1.9] whitespace-pre-line text-[var(--texto)] ${
                    i > 0 ? "mt-9" : ""
                  }`}
                >
                  {estrofe}
                </p>
              ))}
            </div>

            {o.latim && (
              <details className="mt-16 border-t border-[color-mix(in_oklab,var(--realce)_30%,transparent)] pt-9">
                <summary className="cursor-pointer list-none text-center font-[family-name:var(--font-livro)] text-lg tracking-[0.1em] text-[var(--realce)] uppercase transition-opacity hover:opacity-75">
                  Ver o original em latim
                </summary>
                <div className="mt-9 text-center">
                  {o.latim.map((estrofe, i) => (
                    <p
                      key={i}
                      className={`font-[family-name:var(--font-livro)] text-[1.05rem] leading-[1.85] whitespace-pre-line text-[color-mix(in_oklab,var(--texto)_68%,transparent)] italic ${
                        i > 0 ? "mt-7" : ""
                      }`}
                    >
                      {estrofe}
                    </p>
                  ))}
                </div>
              </details>
            )}

            <p className="mt-14 border-t border-[color-mix(in_oklab,var(--realce)_25%,transparent)] pt-7 text-sm leading-relaxed text-[color-mix(in_oklab,var(--texto)_55%,transparent)]">
              {o.procedencia}
              {!o.revisada && " Esta tradução ainda não passou por revisão."}
            </p>
          </div>
        </main>

        <Rodape />
      </div>
    </Passagem>
  );
}
