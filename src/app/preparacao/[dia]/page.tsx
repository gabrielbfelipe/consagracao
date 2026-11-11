import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { DIAS, diaPorNumero } from "@/content/jornada";
import { TOTAL_DIAS, etapaDoDia } from "@/lib/jornada/etapas";
import { oracaoPorId } from "@/content/oracoes";
import { PorticoDaSala } from "@/components/navegacao/PorticoDaSala";
import { Rodape } from "@/components/vitrine/Rodape";
import { Passagem } from "@/components/atmosphere/Passagem";
import { DadosEstruturados } from "@/components/seo/DadosEstruturados";
import { grafoDeMigalhas } from "@/lib/seo/dadosEstruturados";
import { cartao } from "@/lib/seo/cartao";

/**
 * Os doze dias preliminares, abertos a quem ainda não entrou.
 *
 * POR QUE EXISTEM, SENDO QUE /dia/[n] JÁ MOSTRA ISTO
 * Porque /dia/[n] não mostra a ninguém de fora. Aquela sala pede sessão,
 * guarda o que a pessoa escreve e está fora do índice por isso. O
 * resultado era um site cujo conteúdo de maior fôlego — o comentário de
 * cada um dos trinta e três dias — nenhum visitante e nenhum buscador
 * jamais via. Quem chegava pela busca encontrava só a vitrine.
 *
 * Aqui estão os doze primeiros, de leitura, sem nada do que é pessoal: não
 * há diário, não há reflexão guardada, não há conclusão de dia. É o mesmo
 * conteúdo, servido como página de leitura.
 *
 * POR QUE SÓ DOZE
 * Os doze preliminares formam uma unidade fechada no § 227 — desprender-se
 * do espírito do mundo — e quem os lê sabe exactamente o que recebe nas
 * três semanas seguintes. Abrir os trinta e três seria dar o caminho
 * inteiro sem o que o torna caminho: a cadência de um dia por vez, o
 * registo e a carta.
 */

const PRELIMINARES = DIAS.filter((d) => d.numero <= 12);

/** "dia-7" é mais legível num resultado de busca do que "7". */
function numeroDoSlug(slug: string): number | null {
  const m = /^dia-(\d{1,2})$/.exec(slug);
  if (!m) return null;
  const n = Number(m[1]);
  return PRELIMINARES.some((d) => d.numero === n) ? n : null;
}

export function generateStaticParams() {
  return PRELIMINARES.map((d) => ({ dia: `dia-${d.numero}` }));
}

type Props = { params: Promise<{ dia: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { dia } = await params;
  const n = numeroDoSlug(dia);
  if (n === null) return {};

  const d = diaPorNumero(n)!;
  const titulo = `Dia ${n} da consagração: ${d.tema}`;
  const descricao = d.introducao.slice(0, 155);

  return {
    title: titulo,
    description: descricao,
    keywords: [
      `dia ${n} consagração`,
      "doze dias preliminares",
      "Tratado da Verdadeira Devoção",
      "consagração a Nossa Senhora",
    ],
    ...cartao({
      titulo,
      descricao,
      caminho: `/preparacao/dia-${n}`,
      tipo: "article",
    }),
  };
}

export default async function DiaPreliminar({ params }: Props) {
  const { dia } = await params;
  const n = numeroDoSlug(dia);
  if (n === null) notFound();

  const d = diaPorNumero(n)!;
  const etapa = etapaDoDia(n);
  const anterior = n > 1 ? n - 1 : null;
  const proximo = n < PRELIMINARES.length ? n + 1 : null;
  const oracao = d.oracao.id ? oracaoPorId(d.oracao.id) : null;

  return (
    <Passagem>
      <div className="min-h-dvh">
        <DadosEstruturados
          dados={grafoDeMigalhas([
            { nome: "A preparação, dia a dia", caminho: "/preparacao" },
            { nome: `Dia ${n}`, caminho: `/preparacao/dia-${n}` },
          ])}
        />

        <PorticoDaSala />

        <main data-sala="pedra" className="bg-[var(--fundo)]">
          <article className="mx-auto max-w-[66ch] px-6 py-20 sm:px-10">
            <Link
              href="/preparacao"
              className="text-sm text-[var(--texto-suave)] underline
                decoration-[color-mix(in_oklab,var(--realce)_40%,transparent)] underline-offset-[6px]
                transition-colors hover:text-[var(--realce)]"
            >
              A preparação, dia a dia
            </Link>

            <header className="mt-12">
              <p className="font-[family-name:var(--font-livro)] tracking-[0.24em] text-[var(--realce)] uppercase">
                Dia {n} de {TOTAL_DIAS} · {etapa.nome}
              </p>

              <h1 className="mt-4 font-[family-name:var(--font-livro)] text-[clamp(2rem,1.4rem+2.6vw,3.25rem)] leading-[1.08] text-balance text-[var(--texto)]">
                {d.tema}
              </h1>

              <p className="voz-livro mt-8 text-[var(--texto-suave)]">
                {d.introducao}
              </p>
            </header>

            <Secao titulo="A leitura de hoje">
              <p className="voz-livro text-[var(--texto-suave)]">
                Hoje se lê do parágrafo {d.leitura.de} ao {d.leitura.ate} do
                Tratado da Verdadeira Devoção. Os números são os mesmos em
                qualquer edição numerada, de modo que serve o exemplar que
                você tiver em mãos — o texto de São Luís Maria não é
                reproduzido aqui, por respeito a quem o traduziu e publicou.
              </p>
            </Secao>

            <Secao titulo="O que foi lido">
              <div className="voz-livro text-[var(--texto-suave)]">
                {d.leitura.comentario.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </Secao>

            <Secao titulo="Para meditar">
              <ol className="space-y-5">
                {d.meditacao.map((q, i) => (
                  <li key={i} className="flex gap-4">
                    <span
                      aria-hidden
                      className="font-[family-name:var(--font-livro)] text-[var(--realce)] tabular-nums"
                    >
                      {i + 1}.
                    </span>
                    <span className="font-[family-name:var(--font-livro)] text-[1.15rem] leading-[1.75] text-[var(--texto)]">
                      {q}
                    </span>
                  </li>
                ))}
              </ol>
            </Secao>

            <Secao titulo="A oração de hoje">
              <p className="font-[family-name:var(--font-livro)] text-[1.5rem] leading-snug text-[var(--texto)]">
                {d.oracao.nome}
              </p>
              <p className="voz-livro mt-4 text-[var(--texto-suave)]">
                {d.oracao.motivo}
              </p>
              {oracao && (
                <Link
                  href={`/biblioteca/${oracao.id}`}
                  className="mt-6 inline-block font-[family-name:var(--font-livro)] text-[var(--realce)] underline
                    decoration-[color-mix(in_oklab,var(--realce)_45%,transparent)] underline-offset-[7px]
                    transition-opacity hover:opacity-75"
                >
                  Ler o texto completo na biblioteca
                </Link>
              )}
            </Secao>

            <Secao titulo="O exercício do dia">
              <p className="voz-livro text-[var(--texto-suave)]">
                {d.exercicio}
              </p>
            </Secao>

            <Secao titulo="A jaculatória">
              <p className="text-center font-[family-name:var(--font-livro)] text-[clamp(1.4rem,1.1rem+1.2vw,2rem)] leading-snug text-balance text-[var(--realce)] italic">
                {d.jaculatoria}
              </p>
              <p className="mt-5 text-center text-sm text-[color-mix(in_oklab,var(--texto)_55%,transparent)]">
                Uma frase curta, para repetir ao longo do dia sempre que a
                cabeça voltar ao assunto.
              </p>
            </Secao>

            <Secao titulo="A resolução">
              <p className="voz-livro text-[var(--texto-suave)]">
                {d.resolucao}
              </p>
            </Secao>

            {/* O convite, no fim e uma vez só. Quem leu até aqui já sabe o
                que há dentro; não precisa de ser interrompido para saber. */}
            <aside className="mt-20 border-t border-[color-mix(in_oklab,var(--realce)_30%,transparent)] pt-10">
              <h2 className="font-[family-name:var(--font-livro)] text-[1.5rem] leading-snug text-[var(--texto)]">
                Isto é um dia dos trinta e três
              </h2>
              <p className="voz-livro mt-4 text-[var(--texto-suave)]">
                Os doze dias preliminares estão abertos aqui para serem lidos
                por quem quiser, sem conta e sem compromisso. O caminho
                inteiro — as três semanas seguintes, o diário, a carta que
                você escreve no primeiro dia e só reabre no dia da
                consagração, e a conta dos dias até lá — fica do outro lado
                da porta, e é de graça.
              </p>
              <Link
                href="/calendario"
                className="brilho-borda mt-8 inline-flex items-center px-10 py-4
                  font-[family-name:var(--font-livro)] text-sm tracking-[0.22em] indent-[0.22em] uppercase
                  text-[var(--texto)]
                  shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--realce)_60%,transparent)]
                  transition-[box-shadow,color] duration-500
                  hover:text-[var(--realce)] hover:shadow-[inset_0_0_0_1px_var(--realce)]"
              >
                Escolher minha data
              </Link>
            </aside>

            <nav
              aria-label="Dias"
              className="mt-16 flex items-start justify-between gap-8 border-t border-[color-mix(in_oklab,var(--realce)_25%,transparent)] pt-8"
            >
              {anterior ? (
                <Link href={`/preparacao/dia-${anterior}`} className={ELO}>
                  <span className="block text-xs tracking-[0.18em] uppercase opacity-70">
                    Anterior
                  </span>
                  Dia {anterior}: {diaPorNumero(anterior)!.tema}
                </Link>
              ) : (
                <span />
              )}

              {proximo && (
                <Link
                  href={`/preparacao/dia-${proximo}`}
                  className={`${ELO} text-right`}
                >
                  <span className="block text-xs tracking-[0.18em] uppercase opacity-70">
                    Próximo
                  </span>
                  Dia {proximo}: {diaPorNumero(proximo)!.tema}
                </Link>
              )}
            </nav>
          </article>
        </main>

        <Rodape />
      </div>
    </Passagem>
  );
}

const ELO = `max-w-[22ch] font-[family-name:var(--font-livro)] text-[var(--texto-suave)]
  transition-colors duration-500 hover:text-[var(--realce)]`;

function Secao({
  titulo,
  children,
}: {
  titulo: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-16">
      <h2 className="font-[family-name:var(--font-livro)] text-sm tracking-[0.22em] text-[var(--realce)] uppercase">
        {titulo}
      </h2>
      <div
        aria-hidden
        className="mt-4 h-px w-16 bg-[color-mix(in_oklab,var(--realce)_40%,transparent)]"
      />
      <div className="mt-7">{children}</div>
    </section>
  );
}
