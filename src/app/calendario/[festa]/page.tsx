import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { FESTAS, festaPorId, type FestaId } from "@/lib/agenda/festas";
import { montarCronograma, situacao } from "@/lib/agenda/cronograma";
import { escolherData } from "@/lib/jornada/acoes";
import { Previa } from "@/components/jornada/Previa";
import { PorticoDaSala } from "@/components/navegacao/PorticoDaSala";
import { jornadaAtual } from "@/lib/jornada/repositorio";
import {
  diaEMes,
  diferencaEmDias,
  hojeEm,
  porExtenso,
} from "@/lib/agenda/dataSimples";
import { DadosEstruturados } from "@/components/seo/DadosEstruturados";
import { grafoDeMigalhas } from "@/lib/seo/dadosEstruturados";
import { cartao } from "@/lib/seo/cartao";
import { Anuncio } from "@/components/anuncios/Anuncio";

export function generateStaticParams() {
  return FESTAS.map((f) => ({ festa: f.id }));
}

type Props = {
  params: Promise<{ festa: string }>;
  searchParams: Promise<{ ano?: string }>;
};

/**
 * Vinte e quatro páginas com título e descrição próprios.
 *
 * É a maior superfície de busca do site: quem procura "consagração em 8 de
 * dezembro" ou "me consagrar em Aparecida" está a procurar uma data, não
 * uma plataforma, e é aqui que a resposta existe. Sem isto, as vinte e
 * quatro herdavam o mesmo título do layout e competiam entre si pela mesma
 * frase — que é a forma mais eficiente de nenhuma delas aparecer.
 *
 * `tambemChamada` entra nas palavras-chave porque a mesma celebração tem
 * nomes diferentes em regiões diferentes: quem procura Nossa Senhora dos
 * Navegantes e quem procura Apresentação do Senhor querem o dia 2 de
 * fevereiro.
 */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { festa: id } = await params;
  const festa = FESTAS.find((f) => f.id === id);
  if (!festa) return {};

  const dia = `${festa.dia} de ${MESES[festa.mes - 1]}`;
  const caminho = `/calendario/${festa.id}`;

  const titulo = `Consagração em ${dia} — ${festa.nome}`;
  const descricao = `${festa.resumo} A preparação de 33 dias começa 33 dias antes de ${dia}: veja a data exata de início e as etapas do método de Montfort.`;

  return {
    title: titulo,
    description: descricao,
    keywords: [
      `consagração ${dia}`,
      `consagração ${festa.nome}`,
      ...(festa.tambemChamada ?? []),
      "33 dias de preparação",
    ],
    ...cartao({ titulo, descricao, caminho, tipo: "article" }),
    // A data de ensaio não é celebração nenhuma: existe para percorrer o
    // sistema sem esperar trinta e três dias, e não tem o que fazer no índice.
    ...(festa.ensaio ? { robots: { index: false, follow: false } } : {}),
  };
}

const MESES = [
  "janeiro",
  "fevereiro",
  "março",
  "abril",
  "maio",
  "junho",
  "julho",
  "agosto",
  "setembro",
  "outubro",
  "novembro",
  "dezembro",
];

export default async function DetalheDaFesta({ params, searchParams }: Props) {
  const { festa: id } = await params;
  const { ano } = await searchParams;

  const festa = FESTAS.find((f) => f.id === id);
  if (!festa) notFound();

  // Quem já tem jornada não está a escolher: está a trocar, e a tela tem de
  // dizer isso antes do clique — e também o que acontece com o que já
  // escreveu, que é a dúvida que trava qualquer um.
  const jornada = await jornadaAtual().catch(() => null);

  const hoje = jornada?.hoje ?? hojeEm("America/Sao_Paulo");
  const anoEscolhido = Number(ano) || Number(hoje.slice(0, 4));
  const c = montarCronograma(festaPorId(festa.id as FestaId), anoEscolhido);
  const s = situacao(c, hoje);

  const trocando = Boolean(jornada);
  const jaEMinha =
    jornada?.festa.id === festa.id && jornada?.consagracao === c.consagracao;

  const diasAteComecar = diferencaEmDias(hoje, c.inicio);
  const diasAteConsagracao = diferencaEmDias(hoje, c.consagracao);

  return (
    <div data-sala="manuscrito" className="min-h-dvh">
      <DadosEstruturados
        dados={grafoDeMigalhas([
          { nome: "Calendário mariano", caminho: "/calendario" },
          { nome: festa.nome, caminho: `/calendario/${festa.id}` },
        ])}
      />

      <PorticoDaSala />

      <main className="luz-alta px-6 pt-10 pb-16 sm:px-10">
        <Link
          href="/calendario"
          className="mx-auto block max-w-3xl text-sm text-[var(--texto-suave)] underline
          decoration-[color-mix(in_oklab,var(--color-ouro)_40%,transparent)] underline-offset-[6px]
          transition-colors hover:text-[var(--color-pergaminho)]"
        >
          Ver outras datas
        </Link>

        <article className="mx-auto mt-12 max-w-3xl text-center">
          <p className="ouro font-[family-name:var(--font-livro)] text-xl tracking-[0.16em]">
            {porExtenso(c.consagracao)}
          </p>

          <h1 className="mt-4 font-[family-name:var(--font-livro)] text-[clamp(2.25rem,1.5rem+3vw,3.75rem)] leading-[1.1] text-balance text-[var(--color-marfim)]">
            {festa.nome}
          </h1>

          <div
            aria-hidden
            className="mx-auto mt-9 h-px w-24 bg-[linear-gradient(to_right,transparent,var(--color-ouro),transparent)]"
          />

          <p className="voz-livro mx-auto mt-9 text-left text-[var(--texto-suave)]">
            {festa.sobre}
          </p>

          {festa.nota && (
            <p className="voz-livro mx-auto mt-5 text-left text-[var(--color-ouro)]">
              {festa.nota}
            </p>
          )}
        </article>

        {/* O cronograma calculado */}
        <section className="superficie-vidro mx-auto mt-16 max-w-3xl px-7 py-10 sm:px-12">
          <h2 className="text-center font-[family-name:var(--font-livro)] text-2xl text-[var(--color-marfim)]">
            O caminho até esse dia
          </h2>

          <dl className="mt-10 grid gap-8 sm:grid-cols-3 sm:text-center">
            <div>
              <dt className="text-sm text-[var(--texto-suave)]">
                Você começa em
              </dt>
              <dd className="mt-2 font-[family-name:var(--font-livro)] text-2xl text-[var(--color-marfim)]">
                {porExtenso(c.inicio)}
              </dd>
            </div>
            <div>
              <dt className="text-sm text-[var(--texto-suave)]">
                {diasAteComecar > 0 ? "Faltam para começar" : "A preparação"}
              </dt>
              <dd className="mt-2 font-[family-name:var(--font-livro)] text-2xl text-[var(--color-marfim)]">
                {diasAteComecar > 1
                  ? `${diasAteComecar} dias`
                  : diasAteComecar === 1
                    ? "1 dia"
                    : diasAteComecar === 0
                      ? "Começa hoje"
                      : "Já teria começado"}
              </dd>
            </div>
            <div>
              <dt className="text-sm text-[var(--texto-suave)]">
                Faltam para a consagração
              </dt>
              <dd className="mt-2 font-[family-name:var(--font-livro)] text-2xl text-[var(--color-marfim)]">
                {diasAteConsagracao} dias
              </dd>
            </div>
          </dl>

          {/* As quatro etapas, na ordem em que serão vividas. */}
          <ol className="mt-12 space-y-px">
            {c.blocos.map(({ etapa, inicio, fim }) => (
              <li
                key={etapa.id}
                className="superficie-madeira flex flex-col gap-2 px-6 py-5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8"
              >
                <div>
                  <h3 className="font-[family-name:var(--font-livro)] text-xl text-[var(--color-marfim)]">
                    {etapa.nome}
                  </h3>
                  <p className="mt-1 max-w-[58ch] text-sm leading-relaxed text-[var(--texto-suave)]">
                    {etapa.proposito}
                  </p>
                </div>
                <p className="shrink-0 font-[family-name:var(--font-livro)] text-[var(--color-ouro)] sm:text-right">
                  {diaEMes(inicio)} a {diaEMes(fim)}
                  <span className="mt-0.5 block text-sm text-[var(--texto-suave)]">
                    {etapa.dias} dias
                  </span>
                </p>
              </li>
            ))}
          </ol>

          <p className="mt-10 text-center text-sm leading-relaxed text-[var(--texto-suave)]">
            No dia {diaEMes(c.ultimoDia)} você conclui o trigésimo terceiro dia.
            Na manhã seguinte, {porExtenso(c.consagracao)}, você faz sua
            consagração.
          </p>
        </section>

        {/* A prévia: quem vai assumir trinta e três dias precisa ver o que
          são antes de assumi-los. Só aparece enquanto a data ainda é
          alcançável — para uma festa que já passou, não há o que prever. */}
        {s.fase !== "consagrado" && (
          <Previa inicio={c.inicio} consagracao={c.consagracao} />
        )}

        <div className="mt-16 flex flex-col items-center gap-5">
          {s.fase === "consagrado" ? (
            <p className="max-w-[46ch] text-center text-[var(--texto-suave)]">
              Esta data já passou neste ano. Escolha outra celebração, ou esta
              mesma no ano que vem.
            </p>
          ) : jaEMinha ? (
            <p className="max-w-[46ch] text-center text-[var(--texto-suave)]">
              Esta já é a sua data. Não há nada a fazer aqui — sua preparação
              segue para {porExtenso(c.consagracao)}.
            </p>
          ) : (
            <form action={escolherData}>
              <input type="hidden" name="festa" value={festa.id} />
              <input type="hidden" name="ano" value={anoEscolhido} />
              <button
                type="submit"
                className="brilho-borda superficie-vidro inline-flex items-center px-12 py-4
              font-[family-name:var(--font-livro)] text-lg tracking-[0.3em] indent-[0.3em] uppercase
              text-[var(--color-marfim)] transition-[box-shadow,color] duration-500 ease-[var(--ease-santuario)]
              hover:text-[var(--color-ouro-luz)]
              hover:shadow-[inset_0_0_0_1px_var(--color-ouro),0_0_32px_-10px_color-mix(in_oklab,var(--color-ouro)_70%,transparent)]"
              >
                {trocando ? "Trocar para esta data" : "Escolher esta data"}
              </button>

              {trocando && (
                <p className="mx-auto mt-6 max-w-[48ch] text-center text-sm leading-relaxed text-[var(--texto-suave)]">
                  Sua data passa de {porExtenso(jornada!.consagracao)} para{" "}
                  {porExtenso(c.consagracao)}. O diário, a carta do primeiro
                  dia, o seu motivo e os dias já acesos continuam seus — e você
                  pode trocar de novo quando quiser.
                </p>
              )}
            </form>
          )}

          {trocando && (
            <Link
              href="/caminho"
              className="text-sm text-[var(--texto-suave)] underline
              decoration-[color-mix(in_oklab,var(--color-ouro)_40%,transparent)] underline-offset-[6px]
              transition-colors hover:text-[var(--color-pergaminho)]"
            >
              Deixar como está e voltar ao meu caminho
            </Link>
          )}

          <Link
            href={`/calendario/${festa.id}?ano=${anoEscolhido + 1}`}
            className="text-sm text-[var(--texto-suave)] underline
            decoration-[color-mix(in_oklab,var(--color-ouro)_40%,transparent)] underline-offset-[6px]
            transition-colors hover:text-[var(--color-pergaminho)]"
          >
            Ver esta mesma festa em {anoEscolhido + 1}
          </Link>
        </div>

        <Anuncio posicao="festa-pe" />
      </main>
    </div>
  );
}
