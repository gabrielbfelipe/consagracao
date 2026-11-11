import type { Metadata } from "next";
import { redirect } from "next/navigation";
import Link from "next/link";
import { EscritaDaCarta } from "@/components/jornada/EscritaDaCarta";
import { MeuMotivo } from "@/components/jornada/MeuMotivo";
import { jornadaAtual } from "@/lib/jornada/repositorio";
import { clienteServidor } from "@/lib/supabase/servidor";
import { diferencaEmDias, porExtenso } from "@/lib/agenda/dataSimples";
import { PorticoDaSala } from "@/components/navegacao/PorticoDaSala";

export const metadata: Metadata = {
  title: "A carta do primeiro dia",
  /**
   * Fora do índice, e com razão: esta sala não abre sem sessão. O que o
   * Googlebot encontraria aqui é o desvio para a entrada, e um índice cheio
   * de endereços que mostram todos a mesma tela de entrada só dilui o site.
   * O robots.txt também a pede de fora — este é o cinto, aquele é o tirante.
   */
  robots: { index: false, follow: false },
};

export default async function Carta() {
  const jornada = await jornadaAtual();
  if (!jornada) redirect("/calendario");

  const supabase = await clienteServidor();

  // A política de leitura devolve a carta só a partir do dia da consagração.
  // Antes disso o texto não chega aqui, e é assim que deve ser.
  const { data: carta } = await supabase
    .from("carta_primeiro_dia")
    .select("texto, selada_em")
    .eq("jornada_id", jornada.id)
    .maybeSingle<{ texto: string; selada_em: string }>();

  const { data: existe } = await supabase.rpc("tenho_carta", {
    jornada: jornada.id,
  });

  const { data: motivo } = await supabase
    .from("meu_motivo")
    .select("texto")
    .eq("jornada_id", jornada.id)
    .maybeSingle<{ texto: string }>();

  const aberta = Boolean(carta);
  const selada = Boolean(existe) && !aberta;
  const faltam = diferencaEmDias(jornada.hoje, jornada.consagracao);

  return (
    <div
      data-sala={aberta ? "altar" : "estudo"}
      className="luz-alta min-h-dvh"
    >
      <PorticoDaSala />

      <main className="px-6 pt-6 pb-20">
        <div className="mx-auto w-full max-w-[62ch]">
          <Link
            href="/caminho"
            className="text-sm text-[var(--texto-suave)] underline
              decoration-[color-mix(in_oklab,var(--color-ouro)_35%,transparent)] underline-offset-[6px]
              transition-colors hover:text-[var(--color-pergaminho)]"
          >
            Meu caminho
          </Link>

          <h1 className="mt-10 font-[family-name:var(--font-livro)] text-[clamp(2rem,1.5rem+2.4vw,3.25rem)] leading-tight text-[var(--color-marfim)]">
            A carta do primeiro dia
          </h1>

          <div
            aria-hidden
            className="mt-8 h-px w-24 bg-[linear-gradient(to_right,var(--color-ouro),transparent)]"
          />

          {aberta && <Aberta texto={carta!.texto} seladaEm={carta!.selada_em} />}

          {selada && (
            <Selada
              faltam={faltam}
              consagracao={porExtenso(jornada.consagracao)}
            />
          )}

          {!aberta && !selada && <EscritaDaCarta jornadaId={jornada.id} />}

          <section className="mt-24">
            <h2 className="font-[family-name:var(--font-livro)] text-2xl text-[var(--color-marfim)]">
              Meu motivo
            </h2>
            <p className="voz-livro mt-4 text-[var(--texto-suave)]">
              Uma ou duas frases sobre o que o trouxe até aqui. Diferente da
              carta, esta você pode reler e mudar quando quiser — ela reaparece
              nos dias em que a vontade faltar.
            </p>
            <MeuMotivo jornadaId={jornada.id} inicial={motivo?.texto ?? ""} />
          </section>
        </div>
      </main>
    </div>
  );
}

function Selada({
  faltam,
  consagracao,
}: {
  faltam: number;
  consagracao: string;
}) {
  return (
    <div className="superficie-madeira mt-12 px-8 py-12 text-center">
      <p className="ouro font-[family-name:var(--font-livro)] text-3xl">
        Sua carta está guardada
      </p>
      <p className="voz-livro mx-auto mt-6 text-[var(--texto-suave)]">
        Ela será aberta em {consagracao}
        {faltam > 0 && `, daqui a ${faltam} ${faltam === 1 ? "dia" : "dias"}`}.
        Até lá, nem você pode lê-la — o que está escrito ali fica esperando o
        dia em que fará sentido reler.
      </p>
    </div>
  );
}

function Aberta({ texto, seladaEm }: { texto: string; seladaEm: string }) {
  const escritaEm = new Date(seladaEm).toLocaleDateString("pt-BR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="mt-12">
      <p className="voz-livro text-[var(--texto-suave)]">
        Você escreveu isto em {escritaEm}, no primeiro dia da sua preparação.
      </p>

      <blockquote className="superficie-pergaminho mt-9 px-8 py-10">
        <p className="font-[family-name:var(--font-livro)] text-[1.2rem] leading-[1.8] whitespace-pre-wrap text-[#2a1d12]">
          {texto}
        </p>
      </blockquote>
    </div>
  );
}
