import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ORACOES, oracaoPorId } from "@/content/oracoes";

export function generateStaticParams() {
  return ORACOES.map((o) => ({ oracao: o.id }));
}

type Props = { params: Promise<{ oracao: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { oracao } = await params;
  const o = oracaoPorId(oracao);
  return { title: o?.nome ?? "Oração" };
}

export default async function PaginaDaOracao({ params }: Props) {
  const { oracao } = await params;
  const o = oracaoPorId(oracao);
  if (!o) notFound();

  return (
    <main data-sala="capela" className="luz-alta min-h-dvh px-6 py-16 sm:px-10">
      <div className="mx-auto max-w-[60ch]">
        <Link
          href="/biblioteca"
          className="text-sm text-[var(--texto-suave)] underline
            decoration-[color-mix(in_oklab,var(--color-ouro)_35%,transparent)] underline-offset-[6px]
            transition-colors hover:text-[var(--color-pergaminho)]"
        >
          Biblioteca
        </Link>

        <h1 className="mt-10 font-[family-name:var(--font-livro)] text-[clamp(2rem,1.5rem+2.4vw,3.25rem)] leading-tight text-[var(--color-marfim)]">
          {o.nome}
        </h1>

        {o.origem && (
          <p className="mt-3 font-[family-name:var(--font-livro)] text-lg text-[var(--color-ouro)] italic">
            {o.origem}
          </p>
        )}

        <div
          aria-hidden
          className="mt-9 h-px w-24 bg-[linear-gradient(to_right,var(--color-ouro),transparent)]"
        />

        <p className="voz-livro mt-9 text-[var(--texto-suave)]">{o.proposito}</p>

        {/* O texto para rezar, em pergaminho, com espaço para respirar. */}
        <div className="superficie-pergaminho mt-14 px-8 py-11 sm:px-11">
          {o.portugues.map((estrofe, i) => (
            <p
              key={i}
              className={`font-[family-name:var(--font-livro)] text-[1.2rem] leading-[1.85] whitespace-pre-line text-[#2a1d12] ${
                i > 0 ? "mt-7" : ""
              }`}
            >
              {estrofe}
            </p>
          ))}
        </div>

        {o.latim && (
          <details className="mt-10 group">
            <summary className="cursor-pointer list-none font-[family-name:var(--font-livro)] text-lg
              text-[var(--color-ouro)] transition-colors hover:text-[var(--color-ouro-luz)]">
              Ver o original em latim
            </summary>
            <div className="superficie-madeira mt-5 px-7 py-8">
              {o.latim.map((estrofe, i) => (
                <p
                  key={i}
                  className={`font-[family-name:var(--font-livro)] text-[1.05rem] leading-[1.8] whitespace-pre-line
                    text-[var(--texto-suave)] italic ${i > 0 ? "mt-6" : ""}`}
                >
                  {estrofe}
                </p>
              ))}
            </div>
          </details>
        )}

        <p className="mt-12 text-sm leading-relaxed text-[color-mix(in_oklab,var(--color-pergaminho)_48%,transparent)]">
          {o.procedencia}
          {!o.revisada && " Esta tradução ainda não passou por revisão."}
        </p>
      </div>
    </main>
  );
}
