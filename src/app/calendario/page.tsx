import Link from "next/link";
import type { Metadata } from "next";
import { FESTAS } from "@/lib/agenda/festas";
import { opcoesDeData } from "@/lib/agenda/cronograma";
import { diaEMes, hojeEm, porExtenso } from "@/lib/agenda/dataSimples";
import { Portico } from "@/components/navegacao/Portico";
import { PorticoPublico } from "@/components/navegacao/PorticoPublico";
import { usuarioAtual } from "@/lib/supabase/servidor";
import { Passagem } from "@/components/atmosphere/Passagem";

export const metadata: Metadata = {
  title: "Calendário Mariano",
  description:
    "Escolha a festa de Nossa Senhora em que deseja se consagrar. O caminho até ela é calculado para você.",
};

const GRAU: Record<string, string> = {
  solenidade: "Solenidade",
  festa: "Festa",
  memoria: "Memória",
  "memoria-facultativa": "Memória facultativa",
  devocao: "Celebração devocional",
};

export default async function Calendario() {
  const autenticado = Boolean(await usuarioAtual());

  // Enquanto não há perfil, o calendário fala a partir do Brasil.
  const hoje = hojeEm("America/Sao_Paulo");
  const opcoes = opcoesDeData(hoje, FESTAS, 24);

  return (
    <Passagem>
      <div data-sala="manuscrito" className="min-h-dvh">
        {autenticado ? <Portico autenticado /> : <PorticoPublico />}

        <main className="luz-alta px-6 pt-10 pb-24 sm:px-10 lg:px-16">
          <header className="mx-auto max-w-[62ch] text-center">
            <h1 className="font-[family-name:var(--font-livro)] text-[clamp(2rem,1.4rem+2.4vw,3.25rem)] leading-tight text-[var(--color-marfim)]">
              Em que dia você deseja se consagrar?
            </h1>

            <div
              aria-hidden
              className="mx-auto mt-8 h-px w-24 bg-[linear-gradient(to_right,transparent,var(--color-ouro),transparent)]"
            />

            <p className="voz-livro mx-auto mt-8 text-[var(--texto-suave)]">
              A consagração é feita numa festa de Nossa Senhora, e os trinta e
              três dias de preparação a antecedem. Escolha a celebração que fala
              ao seu coração: o dia de começar será calculado a partir dela.
            </p>

            <p className="mt-6 text-sm text-[var(--texto-suave)]">
              Mostrando as datas que ainda dá tempo de alcançar, a partir de{" "}
              {porExtenso(hoje)}.
            </p>
          </header>

          <ul className="mx-auto mt-20 grid max-w-6xl gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {opcoes.map(({ festa, data, inicio, diasAteComecar }) => (
              <li key={`${festa.id}-${data}`}>
                <Link
                  href={`/calendario/${festa.id}?ano=${data.slice(0, 4)}`}
                  className="brilho-borda superficie-madeira group relative flex h-full flex-col items-center
                  rounded-t-[7rem] px-7 pt-16 pb-9 text-center
                  transition-[transform,box-shadow] duration-700 ease-[var(--ease-santuario)]
                  hover:-translate-y-1
                  hover:shadow-[inset_0_0_0_1px_var(--color-bronze),0_26px_50px_-30px_color-mix(in_oklab,var(--color-ouro)_60%,transparent)]"
                >
                  {/* A luz que cai dentro do nicho, só quando se olha para ele. */}
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-0 rounded-t-[7rem] opacity-0
                    transition-opacity duration-700 ease-[var(--ease-santuario)] group-hover:opacity-100
                    bg-[radial-gradient(ellipse_60%_38%_at_50%_0%,color-mix(in_oklab,var(--color-ouro-luz)_22%,transparent),transparent_70%)]"
                  />

                  <p className="ouro font-[family-name:var(--font-livro)] text-2xl tracking-[0.12em]">
                    {diaEMes(data)}
                  </p>

                  <h2 className="mt-4 font-[family-name:var(--font-livro)] text-[1.6rem] leading-[1.2] text-balance text-[var(--color-marfim)]">
                    {festa.nome}
                  </h2>

                  {festa.tambemChamada && (
                    <p className="mt-2 font-[family-name:var(--font-livro)] text-base text-[var(--texto-suave)] italic">
                      {festa.tambemChamada.join(" · ")}
                    </p>
                  )}

                  <p className="voz-livro mt-5 text-[0.98rem] text-[var(--texto-suave)]">
                    {festa.resumo}
                  </p>

                  <p className="mt-auto pt-7 text-xs text-[color-mix(in_oklab,var(--color-pergaminho)_48%,transparent)]">
                    {GRAU[festa.grau]}
                  </p>

                  <p className="mt-3 text-sm text-[var(--color-ouro)]">
                    {diasAteComecar === 0
                      ? "A preparação começa hoje"
                      : `Começa em ${diaEMes(inicio)}`}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </main>
      </div>
    </Passagem>
  );
}
