import Link from "next/link";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { PorticoDaSala } from "@/components/navegacao/PorticoDaSala";
import { jornadaAtual } from "@/lib/jornada/repositorio";
import { clienteServidor } from "@/lib/supabase/servidor";
import { etapaDoDia } from "@/lib/jornada/etapas";
import { diaPorNumero } from "@/content/jornada";

export const metadata: Metadata = {
  title: "Diário",
  /**
   * Fora do índice, e com razão: esta sala não abre sem sessão. O que o
   * Googlebot encontraria aqui é o desvio para a entrada, e um índice cheio
   * de endereços que mostram todos a mesma tela de entrada só dilui o site.
   * O robots.txt também a pede de fora — este é o cinto, aquele é o tirante.
   */
  robots: { index: false, follow: false },
};

const NOME_DO_TIPO: Record<string, string> = {
  reflexao: "Reflexão",
  livre: "Registro do dia",
  intencao: "Intenção",
  dificuldade: "Dificuldade",
  graca: "Graça recebida",
  resolucao: "Resolução",
};

type Entrada = {
  id: string;
  dia: number | null;
  tipo: string;
  texto: string;
  criado_em: string;
};

export default async function Diario() {
  const jornada = await jornadaAtual();
  if (!jornada) redirect("/calendario");

  const supabase = await clienteServidor();
  const { data } = await supabase
    .from("diario")
    .select("id, dia, tipo, texto, criado_em")
    .eq("jornada_id", jornada.id)
    .order("dia", { ascending: true })
    .order("criado_em", { ascending: true })
    .returns<Entrada[]>();

  const entradas = data ?? [];

  // Agrupadas por dia, porque é assim que a pessoa vai procurar.
  const porDia = new Map<number, Entrada[]>();
  for (const e of entradas) {
    const dia = e.dia ?? 0;
    porDia.set(dia, [...(porDia.get(dia) ?? []), e]);
  }

  return (
    <div data-sala="estudo" className="min-h-dvh">
      <PorticoDaSala />

      <main className="luz-alta px-6 pb-28 sm:px-10">
        <header className="mx-auto max-w-[62ch] pt-16 text-center">
          <h1 className="font-[family-name:var(--font-livro)] text-[clamp(2rem,1.5rem+2.4vw,3.25rem)] leading-tight text-[var(--color-marfim)]">
            Diário
          </h1>
          <div
            aria-hidden
            className="mx-auto mt-8 h-px w-24 bg-[linear-gradient(to_right,transparent,var(--color-ouro),transparent)]"
          />
          <p className="voz-livro mx-auto mt-8 text-[var(--texto-suave)]">
            Tudo o que você escreveu ao longo da preparação, na ordem em que foi
            vivido. Ninguém além de você lê estas páginas.
          </p>
        </header>

        {entradas.length === 0 ? (
          <Vazio />
        ) : (
          <div className="mx-auto mt-20 max-w-[64ch] space-y-16">
            {[...porDia.entries()].map(([dia, doDia]) => (
              <section key={dia}>
                <header className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                  <h2 className="font-[family-name:var(--font-livro)] text-2xl text-[var(--color-marfim)]">
                    {dia === 0 ? "Sem dia" : `Dia ${dia}`}
                  </h2>
                  {dia > 0 && (
                    <p className="font-[family-name:var(--font-livro)] text-[var(--color-ouro)] italic">
                      {diaPorNumero(dia)?.tema ?? etapaDoDia(dia).nome}
                    </p>
                  )}
                </header>

                <div
                  aria-hidden
                  className="mt-4 h-px w-full bg-[linear-gradient(to_right,color-mix(in_oklab,var(--color-ouro)_55%,transparent),transparent)]"
                />

                <div className="mt-7 space-y-px">
                  {doDia.map((e) => (
                    <article
                      key={e.id}
                      className="superficie-pergaminho px-7 py-7"
                    >
                      <p className="font-[family-name:var(--font-livro)] text-sm tracking-wide text-[#6b4f2e]">
                        {NOME_DO_TIPO[e.tipo] ?? e.tipo}
                      </p>
                      <p className="mt-3 font-[family-name:var(--font-livro)] text-[1.1rem] leading-[1.8] whitespace-pre-wrap text-[#2a1d12]">
                        {e.texto}
                      </p>
                    </article>
                  ))}
                </div>
              </section>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

function Vazio() {
  return (
    <div className="mx-auto mt-24 max-w-[52ch] text-center">
      <p className="voz-livro mx-auto text-[var(--texto-suave)]">
        Seu diário ainda está em branco. Ele se enche sozinho conforme você
        percorre os dias — o que você escrever nos passos “Reflita” e “Registre”
        vem parar aqui.
      </p>
      <Link
        href="/caminho"
        className="brilho-borda superficie-vidro mt-12 inline-flex items-center px-11 py-4
          font-[family-name:var(--font-livro)] text-lg tracking-[0.3em] indent-[0.3em] uppercase
          text-[var(--color-marfim)] transition-[box-shadow,color] duration-500 ease-[var(--ease-santuario)]
          hover:text-[var(--color-ouro-luz)]
          hover:shadow-[inset_0_0_0_1px_var(--color-ouro),0_0_32px_-10px_color-mix(in_oklab,var(--color-ouro)_70%,transparent)]"
      >
        Ir para o meu caminho
      </Link>
    </div>
  );
}
