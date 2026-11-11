import Link from "next/link";
import { PorticoDaSala } from "@/components/navegacao/PorticoDaSala";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ORACOES, oracaoPorId } from "@/content/oracoes";
import type { BlocoDeLadainha, Fecho } from "@/content/oracoes";
import { Rodape } from "@/components/vitrine/Rodape";
import { Passagem } from "@/components/atmosphere/Passagem";
import { DadosEstruturados } from "@/components/seo/DadosEstruturados";
import { grafoDeMigalhas } from "@/lib/seo/dadosEstruturados";
import { cartao } from "@/lib/seo/cartao";

export function generateStaticParams() {
  return ORACOES.map((o) => ({ oracao: o.id }));
}

type Props = { params: Promise<{ oracao: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { oracao } = await params;
  const o = oracaoPorId(oracao);
  if (!o) return {};

  const caminho = `/biblioteca/${o.id}`;
  return {
    title: o.nome,
    description: o.proposito,
    keywords: [o.nome, "oração", "consagração a Nossa Senhora"],
    ...cartao({
      titulo: o.nome,
      descricao: o.proposito,
      caminho,
      tipo: "article",
    }),
  };
}

export default async function PaginaDaOracao({ params }: Props) {
  const { oracao } = await params;
  const o = oracaoPorId(oracao);
  if (!o) notFound();

  // A ladainha é bilíngue em duas colunas, como no devocionário; o hino
  // cabe na medida estreita de sempre.
  const largura = o.ladainha ? "max-w-[76rem]" : "max-w-[62ch]";

  return (
    <Passagem>
      <div className="min-h-dvh">
        <DadosEstruturados
          dados={grafoDeMigalhas([
            { nome: "Biblioteca", caminho: "/biblioteca" },
            { nome: o.nome, caminho: `/biblioteca/${o.id}` },
          ])}
        />

        <PorticoDaSala />

        {/* Uma oração se reza sobre papel claro, não no escuro. */}
        <main data-sala="pedra" className="bg-[var(--fundo)]">
          <div className={`mx-auto ${largura} px-6 py-20 sm:px-10`}>
            <Link
              href="/biblioteca"
              className="text-sm text-[var(--texto-suave)] underline
                decoration-[color-mix(in_oklab,var(--realce)_40%,transparent)] underline-offset-[6px]
                transition-colors hover:text-[var(--realce)]"
            >
              Biblioteca
            </Link>

            <header className="mt-12 text-center">
              {o.origem && (
                <p className="font-[family-name:var(--font-livro)] text-[var(--realce)] italic">
                  {o.origem}
                </p>
              )}

              <h1 className="mt-3 font-[family-name:var(--font-livro)] text-[clamp(2rem,1.4rem+2.6vw,3.25rem)] leading-[1.08] text-balance text-[var(--texto)] uppercase">
                {o.nome}
              </h1>

              <div
                aria-hidden
                className="mx-auto mt-8 h-px w-24 bg-[linear-gradient(to_right,transparent,var(--realce),transparent)]"
              />

              <p className="voz-livro mx-auto mt-8 max-w-[62ch] text-[var(--texto-suave)]">
                {o.proposito}
              </p>
            </header>

            {/* O texto para rezar: centrado, largo de entrelinha, sem ruído. */}
            {o.portugues && (
              <div className="mx-auto mt-16 max-w-[62ch] text-center">
                {o.portugues.map((estrofe, i) => (
                  <p
                    key={i}
                    className={`font-[family-name:var(--font-livro)] text-[clamp(1.2rem,1.05rem+0.6vw,1.45rem)] leading-[1.9] whitespace-pre-line text-[var(--texto)] ${
                      i > 0 ? "mt-9" : ""
                    }`}
                  >
                    {estrofe}
                  </p>
                ))}
              </div>
            )}

            {o.ladainha && <Ladainha blocos={o.ladainha} />}

            {/* O fecho do hino vai só em português: o latim dele espera
                dentro do recolhido, junto com as estrofes latinas. */}
            {o.fecho && !o.ladainha && <FechoEmPortugues fecho={o.fecho} />}

            {o.fecho && o.ladainha && <FechoBilingue fecho={o.fecho} />}

            {o.latim && (
              <details className="mx-auto mt-16 max-w-[62ch] border-t border-[color-mix(in_oklab,var(--realce)_30%,transparent)] pt-9">
                <summary className="cursor-pointer list-none text-center font-[family-name:var(--font-livro)] text-lg tracking-[0.1em] text-[var(--realce)] uppercase transition-opacity hover:opacity-75">
                  Ver o original em latim
                </summary>
                <div className="mt-9 text-center">
                  {o.latim.map((estrofe, i) => (
                    <p
                      key={i}
                      className={`font-[family-name:var(--font-livro)] text-[1.05rem] leading-[1.85] whitespace-pre-line text-[color-mix(in_oklab,var(--texto)_68%,transparent)] italic ${
                        i > 0 ? "mt-7" : ""
                      }`}
                    >
                      {estrofe}
                    </p>
                  ))}

                  {o.fecho && <FechoEmLatim fecho={o.fecho} />}
                </div>
              </details>
            )}

            <p className="mx-auto mt-14 max-w-[62ch] border-t border-[color-mix(in_oklab,var(--realce)_25%,transparent)] pt-7 text-sm leading-relaxed text-[color-mix(in_oklab,var(--texto)_55%,transparent)]">
              {o.procedencia}
              {!o.revisada && " Esta tradução ainda não passou por revisão."}
            </p>
          </div>
        </main>

        <Rodape />
      </div>
    </Passagem>
  );
}

/**
 * O ℣ e o ℟ do devocionário.
 *
 * Os caracteres prontos (U+2123 e U+211F) ficam fora do recorte latino que
 * o Google Fonts entrega, de modo que o navegador os pediria a outra fonte
 * — ou mostraria um quadrado vazio. Aqui a letra é a do livro e o traço é
 * desenhado por cima, que é exactamente o que a página impressa mostra.
 */
function Sinal({ letra, leitura }: { letra: "V" | "R"; leitura: string }) {
  return (
    <span className="mr-2 inline-flex shrink-0 items-baseline">
      <span className="sr-only">{leitura}</span>
      <span aria-hidden className="relative inline-block">
        {letra}
        <span
          aria-hidden
          className="absolute top-1/2 left-1/2 h-px w-[0.9em] -translate-x-1/2 -translate-y-1/2 -rotate-[62deg] bg-current"
        />
      </span>
      <span aria-hidden>.</span>
    </span>
  );
}

/** As invocações em duas colunas, latim à esquerda, como no livro. */
function Ladainha({ blocos }: { blocos: readonly BlocoDeLadainha[] }) {
  return (
    <div className="mt-16">
      {blocos.map((bloco, b) => (
        <div key={b} className={b > 0 ? "mt-10" : ""}>
          {bloco.invocacoes.map((inv, i) => (
            // Sem espaço entre as linhas da grade: o filete que separa as
            // colunas vive na borda da coluna portuguesa, e só corre
            // inteiro, como no livro, se uma linha encostar na seguinte.
            <div key={i} className="grid gap-x-10 sm:grid-cols-2">
              <p
                className="py-[0.35rem] font-[family-name:var(--font-livro)] text-[1.08rem] leading-[1.6] text-[var(--texto)]
                  sm:order-2 sm:border-l sm:border-[color-mix(in_oklab,var(--realce)_22%,transparent)] sm:pl-10"
              >
                {inv.portugues}
                {bloco.resposta && i === 0 && (
                  <strong className="font-semibold text-[var(--realce)]">
                    {" "}
                    {bloco.resposta.portugues}.
                  </strong>
                )}
              </p>

              {inv.latim && (
                <p className="py-[0.35rem] font-[family-name:var(--font-livro)] text-[0.98rem] leading-[1.6] text-[color-mix(in_oklab,var(--texto)_60%,transparent)] italic sm:order-1">
                  {inv.latim}
                  {bloco.resposta?.latim && i === 0 && (
                    <strong className="font-semibold not-italic text-[color-mix(in_oklab,var(--realce)_80%,transparent)]">
                      {" "}
                      {bloco.resposta.latim}.
                    </strong>
                  )}
                </p>
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

/** O fecho da ladainha, nas mesmas duas colunas das invocações. */
function FechoBilingue({ fecho }: { fecho: Fecho }) {
  const linhas: { sinal: "V" | "R"; leitura: string; dito: typeof fecho.versiculo }[] =
    [
      { sinal: "V", leitura: "Versículo.", dito: fecho.versiculo },
      { sinal: "R", leitura: "Resposta.", dito: fecho.responsorio },
    ];

  return (
    <div className="mt-12 border-t border-[color-mix(in_oklab,var(--realce)_25%,transparent)] pt-10">
      {linhas.map(({ sinal, leitura, dito }) => (
        <div key={sinal} className="grid gap-x-10 sm:grid-cols-2">
          <p className="py-[0.35rem] font-[family-name:var(--font-livro)] text-[1.08rem] leading-[1.6] text-[var(--texto)] sm:order-2 sm:border-l sm:border-[color-mix(in_oklab,var(--realce)_22%,transparent)] sm:pl-10">
            <Sinal letra={sinal} leitura={leitura} />
            {dito.portugues}
          </p>
          {dito.latim && (
            <p className="py-[0.35rem] font-[family-name:var(--font-livro)] text-[0.98rem] leading-[1.6] text-[color-mix(in_oklab,var(--texto)_60%,transparent)] italic sm:order-1">
              <Sinal letra={sinal} leitura={leitura} />
              {dito.latim}
            </p>
          )}
        </div>
      ))}

      <div className="mt-8 grid gap-x-10 sm:grid-cols-2">
        <p className="font-[family-name:var(--font-livro)] text-[1.08rem] leading-[1.75] text-[var(--texto)] sm:order-2 sm:border-l sm:border-[color-mix(in_oklab,var(--realce)_22%,transparent)] sm:pl-10">
          {fecho.oracao.portugues}
        </p>
        {fecho.oracao.latim && (
          <p className="mt-4 font-[family-name:var(--font-livro)] text-[0.98rem] leading-[1.75] text-[color-mix(in_oklab,var(--texto)_60%,transparent)] italic sm:order-1 sm:mt-0">
            {fecho.oracao.latim}
          </p>
        )}
      </div>
    </div>
  );
}

/** O fecho do hino: centrado, sob as estrofes. */
function FechoEmPortugues({ fecho }: { fecho: Fecho }) {
  return (
    <div className="mx-auto mt-12 max-w-[62ch] border-t border-[color-mix(in_oklab,var(--realce)_25%,transparent)] pt-10 text-center">
      <p className="font-[family-name:var(--font-livro)] text-[1.12rem] leading-[1.8] text-[var(--texto)]">
        <Sinal letra="V" leitura="Versículo." />
        {fecho.versiculo.portugues}
      </p>
      <p className="mt-2 font-[family-name:var(--font-livro)] text-[1.12rem] leading-[1.8] text-[var(--texto)]">
        <Sinal letra="R" leitura="Resposta." />
        {fecho.responsorio.portugues}
      </p>
      <p className="mt-8 font-[family-name:var(--font-livro)] text-[1.12rem] leading-[1.8] text-[var(--texto)]">
        {fecho.oracao.portugues}
      </p>
    </div>
  );
}

/** O mesmo fecho em latim, dentro do recolhido. */
function FechoEmLatim({ fecho }: { fecho: Fecho }) {
  if (!fecho.versiculo.latim) return null;

  return (
    <div className="mt-9 border-t border-[color-mix(in_oklab,var(--realce)_18%,transparent)] pt-7">
      <p className="font-[family-name:var(--font-livro)] text-[1.05rem] leading-[1.85] text-[color-mix(in_oklab,var(--texto)_68%,transparent)] italic">
        <Sinal letra="V" leitura="Versículo." />
        {fecho.versiculo.latim}
      </p>
      {fecho.responsorio.latim && (
        <p className="mt-2 font-[family-name:var(--font-livro)] text-[1.05rem] leading-[1.85] text-[color-mix(in_oklab,var(--texto)_68%,transparent)] italic">
          <Sinal letra="R" leitura="Resposta." />
          {fecho.responsorio.latim}
        </p>
      )}
      {fecho.oracao.latim && (
        <p className="mt-7 font-[family-name:var(--font-livro)] text-[1.05rem] leading-[1.85] text-[color-mix(in_oklab,var(--texto)_68%,transparent)] italic">
          {fecho.oracao.latim}
        </p>
      )}
    </div>
  );
}
