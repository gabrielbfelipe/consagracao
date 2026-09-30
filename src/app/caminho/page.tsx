import type { Metadata } from "next";
import { Colunata } from "@/components/jornada/Colunata";
import { TOTAL_DIAS, etapaDoDia } from "@/lib/jornada/etapas";

export const metadata: Metadata = { title: "Meu Caminho" };

export default function Caminho() {
  // Provisório: enquanto não há conta, a jornada é demonstrada no dia 17.
  const diaAtual = 17;
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
          Dezesseis dias acesos. Restam {TOTAL_DIAS - diaAtual} até a
          consagração.
        </p>
      </div>
    </main>
  );
}
