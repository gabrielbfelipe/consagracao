import Link from "next/link";
import type { Metadata } from "next";
import { Colunata } from "@/components/jornada/Colunata";
import { TOTAL_DIAS, etapaDoDia } from "@/lib/jornada/etapas";

export const metadata: Metadata = { title: "Meu Caminho" };

export default function Caminho() {
  // Provisório: enquanto não há conta, a jornada é demonstrada no dia 13,
  // que abre a primeira semana e já tem conteúdo escrito.
  const diaAtual = 13;
  const concluidos = Array.from({ length: diaAtual - 1 }, (_, i) => i + 1);
  const etapa = etapaDoDia(diaAtual);

  return (
    <main
      data-sala={etapa.sala}
      className="luz-alta flex min-h-dvh flex-col justify-center px-6 py-20 sm:px-10"
    >
      <div className="mx-auto w-full max-w-4xl text-center">
        <p className="font-[family-name:var(--font-livro)] text-lg tracking-[0.28em] text-[var(--texto-suave)] uppercase">
          Dia {diaAtual} de {TOTAL_DIAS}
        </p>

        <h1 className="mt-5 font-[family-name:var(--font-livro)] text-[clamp(2.25rem,1.5rem+3vw,3.75rem)] leading-[1.1] text-balance text-[var(--color-marfim)]">
          {etapa.nome}
        </h1>

        <p className="voz-livro mx-auto mt-8 text-[var(--texto-suave)]">
          {etapa.proposito}
        </p>

        <div className="mt-20">
          <Colunata diaAtual={diaAtual} concluidos={concluidos} />
        </div>

        <p className="mt-12 text-sm text-[var(--texto-suave)]">
          {diaAtual - 1} dias acesos. Restam {TOTAL_DIAS - diaAtual + 1} até a
          consagração.
        </p>

        <Link
          href={`/dia/${diaAtual}`}
          className="brilho-borda superficie-vidro mt-12 inline-flex items-center px-12 py-4
            font-[family-name:var(--font-livro)] text-lg tracking-[0.3em] indent-[0.3em] uppercase
            text-[var(--color-marfim)] transition-[box-shadow,color] duration-500 ease-[var(--ease-santuario)]
            hover:text-[var(--color-ouro-luz)]
            hover:shadow-[inset_0_0_0_1px_var(--color-ouro),0_0_32px_-10px_color-mix(in_oklab,var(--color-ouro)_70%,transparent)]"
        >
          Entrar no dia {diaAtual}
        </Link>
      </div>
    </main>
  );
}
