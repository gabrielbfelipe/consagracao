import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { CondutorDoDia } from "@/components/jornada/CondutorDoDia";
import { diaPorNumero } from "@/content/jornada";
import { TOTAL_DIAS, etapaDoDia } from "@/lib/jornada/etapas";

type Props = { params: Promise<{ n: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { n } = await params;
  return { title: `Dia ${n} de ${TOTAL_DIAS}` };
}

export default async function DiaDaJornada({ params }: Props) {
  const { n } = await params;
  const numero = Number(n);

  if (!Number.isInteger(numero) || numero < 1 || numero > TOTAL_DIAS) {
    notFound();
  }

  const etapa = etapaDoDia(numero);
  const dia = diaPorNumero(numero);

  return (
    <main
      data-sala={etapa.sala}
      className="luz-alta min-h-dvh px-6 py-16 sm:px-10"
    >
      <header className="mx-auto max-w-[64ch]">
        <Link
          href="/caminho"
          className="text-sm text-[var(--texto-suave)] underline
            decoration-[color-mix(in_oklab,var(--color-ouro)_35%,transparent)] underline-offset-[6px]
            transition-colors hover:text-[var(--color-pergaminho)]"
        >
          Meu caminho
        </Link>

        <p className="mt-10 font-[family-name:var(--font-livro)] tracking-[0.28em] text-[var(--texto-suave)] uppercase">
          Dia {numero} de {TOTAL_DIAS} · {etapa.nome}
        </p>

        {dia && (
          <h1 className="mt-4 font-[family-name:var(--font-livro)] text-[clamp(2.25rem,1.6rem+2.6vw,3.5rem)] leading-[1.1] text-balance text-[var(--color-marfim)]">
            {dia.tema}
          </h1>
        )}

        <div
          aria-hidden
          className="mt-9 h-px w-full bg-[linear-gradient(to_right,var(--color-ouro),transparent)]"
        />
      </header>

      <div className="mt-14">
        {dia ? (
          <CondutorDoDia dia={dia} etapa={etapa} />
        ) : (
          <EmPreparacao numero={numero} />
        )}
      </div>
    </main>
  );
}

/**
 * Um dia ainda não escrito não vira página vazia nem texto inventado:
 * diz o que é, e aponta os dias que já existem.
 */
function EmPreparacao({ numero }: { numero: number }) {
  return (
    <div className="mx-auto max-w-[62ch] text-center">
      <p className="voz-livro mx-auto text-[var(--texto-suave)]">
        O conteúdo do dia {numero} ainda está sendo escrito e revisado. Os dias
        1, 2, 13, 20 e 27 já podem ser percorridos: são um de cada etapa da
        jornada, e mostram como cada dia funciona.
      </p>

      <div className="mt-10 flex flex-wrap justify-center gap-px">
        {[1, 2, 13, 20, 27].map((d) => (
          <Link
            key={d}
            href={`/dia/${d}`}
            className="superficie-madeira px-7 py-5 font-[family-name:var(--font-livro)] text-xl
              text-[var(--color-marfim)] transition-colors duration-500 hover:text-[var(--color-ouro-luz)]"
          >
            Dia {d}
          </Link>
        ))}
      </div>
    </div>
  );
}
