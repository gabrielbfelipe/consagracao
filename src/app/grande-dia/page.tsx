import Link from "next/link";
import { redirect } from "next/navigation";
import type { Metadata } from "next";
import { MOMENTOS } from "@/content/grandeDia";
import { FORMULA_PENDENTE, ORACOES } from "@/content/oracoes";
import { Poeira } from "@/components/atmosphere/Poeira";
import { jornadaAtual } from "@/lib/jornada/repositorio";
import { porExtenso } from "@/lib/agenda/dataSimples";

export const metadata: Metadata = { title: "O Grande Dia" };

export default async function GrandeDia() {
  const jornada = await jornadaAtual();
  if (!jornada) redirect("/calendario");

  const chegou =
    jornada.situacao.fase === "grande-dia" ||
    jornada.situacao.fase === "consagrado";

  return (
    <main
      data-sala="altar"
      className="luz-alta relative min-h-dvh overflow-hidden px-6 pb-28 sm:px-10"
    >
      <Poeira
        densidade={0.00006}
        className="absolute inset-0 -z-10 h-full w-full"
      />

      <header className="mx-auto max-w-[62ch] pt-24 text-center">
        {chegou ? (
          <>
            <h1 className="font-[family-name:var(--font-livro)] text-[clamp(2.5rem,1.6rem+3.6vw,4.5rem)] leading-[1.05] tracking-[0.03em] text-[var(--color-marfim)]">
              Hoje é o dia
            </h1>
            <p className="voz-livro mx-auto mt-9 text-[var(--texto-suave)]">
              Sua jornada de preparação chegou ao seu destino. Hoje, na festa de{" "}
              {jornada.festa.nome}, você faz sua consagração.
            </p>
          </>
        ) : (
          <>
            <h1 className="font-[family-name:var(--font-livro)] text-[clamp(2rem,1.5rem+2.4vw,3.25rem)] leading-tight text-[var(--color-marfim)]">
              O dia da consagração
            </h1>
            <p className="voz-livro mx-auto mt-9 text-[var(--texto-suave)]">
              Será em {porExtenso(jornada.consagracao)}, na festa de{" "}
              {jornada.festa.nome}. Leia este guia antes, com calma, para não
              precisar decidir nada no próprio dia.
            </p>
          </>
        )}

        <div
          aria-hidden
          className="mx-auto mt-10 h-px w-28 bg-[linear-gradient(to_right,transparent,var(--color-ouro-luz),transparent)]"
        />
      </header>

      {/* Os momentos do dia, em ordem. */}
      <div className="mx-auto mt-20 max-w-[62ch] space-y-px">
        {MOMENTOS.map((m) => (
          <section key={m.id} className="superficie-vidro px-7 py-9 sm:px-10">
            <p className="font-[family-name:var(--font-livro)] text-sm tracking-[0.18em] uppercase text-[var(--color-ouro)]">
              {m.quando}
            </p>
            <h2 className="mt-3 font-[family-name:var(--font-livro)] text-2xl leading-snug text-[var(--color-marfim)]">
              {m.titulo}
            </h2>
            <div className="voz-livro mt-5 text-[var(--texto-suave)]">
              {m.paragrafos.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </section>
        ))}
      </div>

      {/* As orações do dia, à mão. */}
      <section className="mx-auto mt-20 max-w-[62ch]">
        <h2 className="text-center font-[family-name:var(--font-livro)] text-3xl text-[var(--color-marfim)]">
          As orações de hoje
        </h2>
        <ul className="mt-10 space-y-px">
          {ORACOES.map((o) => (
            <li key={o.id}>
              <Link
                href={`/biblioteca/${o.id}`}
                className="superficie-madeira block px-7 py-5 font-[family-name:var(--font-livro)] text-xl
                  text-[var(--color-marfim)] transition-colors duration-500 hover:text-[var(--color-ouro-luz)]"
              >
                {o.nome}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* A fórmula: o que falta, dito sem rodeio. */}
      <section className="mx-auto mt-20 max-w-[62ch]">
        <h2 className="text-center font-[family-name:var(--font-livro)] text-3xl text-[var(--color-marfim)]">
          A fórmula da consagração
        </h2>
        <div className="superficie-pergaminho mt-10 px-8 py-10">
          <p className="font-[family-name:var(--font-livro)] text-[1.15rem] leading-[1.8] text-[#2a1d12]">
            {FORMULA_PENDENTE.enquantoIsso}
          </p>
          <p className="mt-6 text-sm leading-relaxed text-[#6b4f2e]">
            {FORMULA_PENDENTE.aviso}
          </p>
        </div>
      </section>

      {chegou && (
        <div className="mx-auto mt-20 max-w-[62ch] text-center">
          <Link
            href="/carta"
            className="brilho-borda superficie-vidro inline-flex items-center px-12 py-4
              font-[family-name:var(--font-livro)] text-lg tracking-[0.3em] indent-[0.3em] uppercase
              text-[var(--color-marfim)] transition-[box-shadow,color] duration-500 ease-[var(--ease-santuario)]
              hover:text-[var(--color-ouro-luz)]
              hover:shadow-[inset_0_0_0_1px_var(--color-ouro),0_0_36px_-10px_var(--color-ouro-luz)]"
          >
            Abrir a carta do primeiro dia
          </Link>
          <p className="mt-6 text-sm text-[var(--texto-suave)]">
            Escrita por você há trinta e três dias.
          </p>
        </div>
      )}
    </main>
  );
}
