import Link from "next/link";
import type { Metadata } from "next";
import { DIAS, DISCIPLINA_DAS_SEMANAS } from "@/content/jornada";
import { ETAPAS, TOTAL_DIAS } from "@/lib/jornada/etapas";
import { PorticoDaSala } from "@/components/navegacao/PorticoDaSala";
import { Rodape } from "@/components/vitrine/Rodape";
import { Passagem } from "@/components/atmosphere/Passagem";
import { TituloDeSecao } from "@/components/vitrine/TituloDeSecao";
import { DadosEstruturados } from "@/components/seo/DadosEstruturados";
import { grafoDeMigalhas } from "@/lib/seo/dadosEstruturados";
import { cartao } from "@/lib/seo/cartao";

const TITULO = "A preparação, dia a dia";
const DESCRICAO =
  "Os doze dias preliminares da consagração a Nossa Senhora, abertos para leitura: o que se lê do Tratado em cada dia, o comentário, a meditação e a oração.";

export const metadata: Metadata = {
  title: TITULO,
  description: DESCRICAO,
  keywords: [
    "doze dias preliminares",
    "consagração a Nossa Senhora 33 dias",
    "Tratado da Verdadeira Devoção",
    "preparação para a consagração",
  ],
  ...cartao({ titulo: TITULO, descricao: DESCRICAO, caminho: "/preparacao" }),
};

const PRELIMINARES = DIAS.filter((d) => d.numero <= 12);

export default function Preparacao() {
  return (
    <Passagem>
      <div className="min-h-dvh">
        <DadosEstruturados
          dados={grafoDeMigalhas([
            { nome: TITULO, caminho: "/preparacao" },
          ])}
        />

        <PorticoDaSala />

        <main data-sala="pedra" className="bg-[var(--fundo)]">
          <div className="mx-auto max-w-[80rem] px-6 py-20 sm:px-10 lg:py-28">
            <TituloDeSecao
              sobrenome={`Os doze primeiros dos ${TOTAL_DIAS}, abertos para leitura`}
              titulo={TITULO}
              centrado
            />

            <div className="mx-auto mt-14 max-w-[64ch]">
              <p className="voz-livro text-[var(--texto-suave)]">
                No § 227 do Tratado da Verdadeira Devoção, São Luís Maria
                Grignion de Montfort pede doze dias antes de tudo o mais —
                doze dias empregados em desprender-se do espírito do mundo,
                que se opõe ao de Jesus Cristo. Só depois começam as três
                semanas: o conhecimento de si mesmo, o de Nossa Senhora e o
                de Jesus Cristo.
              </p>

              <p className="voz-livro mt-6 text-[var(--texto-suave)]">
                Estes doze estão abertos aqui, inteiros, sem conta e sem
                compromisso. Cada página diz que parágrafos ler no seu
                exemplar, explica o que você acabou de ler, propõe três
                perguntas para meditar, indica a oração do dia, um exercício
                concreto e uma resolução. O texto de Montfort não é
                reproduzido: o que está escrito aqui é comentário, e a
                leitura se faz no livro.
              </p>

              <p className="voz-livro mt-6 text-[var(--texto-suave)]">
                As três semanas seguintes ficam do outro lado da porta, junto
                com o diário, a conta dos dias e a carta que se escreve no
                primeiro dia para reabrir no último. Também de graça.
              </p>
            </div>

            {/* Os doze, em lista — é a página que os buscadores vão ler. */}
            <ol className="mx-auto mt-20 grid max-w-[76rem] gap-x-14 gap-y-12 md:grid-cols-2">
              {PRELIMINARES.map((d) => (
                <li key={d.numero} className="assenta">
                  <Link
                    href={`/preparacao/dia-${d.numero}`}
                    className="group block h-full"
                  >
                    <div className="flex items-baseline gap-4">
                      <span
                        aria-hidden
                        className="font-[family-name:var(--font-livro)] text-2xl text-[color-mix(in_oklab,var(--realce)_45%,transparent)] tabular-nums"
                      >
                        {String(d.numero).padStart(2, "0")}
                      </span>
                      <div
                        aria-hidden
                        className="h-px flex-1 bg-[color-mix(in_oklab,var(--realce)_35%,transparent)]"
                      />
                      <span className="font-[family-name:var(--font-livro)] text-sm text-[color-mix(in_oklab,var(--texto)_50%,transparent)]">
                        § {d.leitura.de}–{d.leitura.ate}
                      </span>
                    </div>

                    <h2 className="mt-5 font-[family-name:var(--font-livro)] text-[1.7rem] leading-snug text-[var(--texto)] transition-colors duration-500 group-hover:text-[var(--realce)]">
                      {d.tema}
                    </h2>

                    <p className="voz-livro mt-4 text-[0.98rem] text-[var(--texto-suave)]">
                      {d.introducao}
                    </p>

                    <p className="mt-4 font-[family-name:var(--font-livro)] text-[0.95rem] text-[var(--realce)] italic">
                      {d.jaculatoria}
                    </p>
                  </Link>
                </li>
              ))}
            </ol>

            {/* O que vem depois, dito sem rodeio e sem mostrar o conteúdo. */}
            <section className="mx-auto mt-28 max-w-[64ch]">
              <h2 className="font-[family-name:var(--font-livro)] text-[clamp(1.6rem,1.3rem+1.2vw,2.25rem)] text-[var(--texto)]">
                O que vem depois dos doze
              </h2>

              <p className="voz-livro mt-6 text-[var(--texto-suave)]">
                As quatro etapas da preparação, com o que Montfort manda
                rezar em cada uma. As três últimas abrem-se para quem tiver
                escolhido a sua data.
              </p>

              <ul className="mt-10 space-y-px">
                {ETAPAS.map((etapa) => {
                  const disciplina = DISCIPLINA_DAS_SEMANAS.find(
                    (s) => s.etapa === etapa.nome,
                  );
                  return (
                    <li
                      key={etapa.id}
                      className="border-t border-[color-mix(in_oklab,var(--realce)_25%,transparent)] py-7"
                    >
                      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                        <h3 className="font-[family-name:var(--font-livro)] text-xl text-[var(--texto)]">
                          {etapa.nome}
                        </h3>
                        <p className="font-[family-name:var(--font-livro)] text-sm text-[var(--realce)]">
                          {disciplina?.fonte} · {etapa.dias} dias
                        </p>
                      </div>

                      <p className="voz-livro mt-3 text-[0.98rem] text-[var(--texto-suave)]">
                        {etapa.proposito}
                      </p>

                      {disciplina && (
                        <p className="mt-3 text-[0.95rem] leading-relaxed text-[color-mix(in_oklab,var(--texto)_58%,transparent)]">
                          Todo dia: {disciplina.todoDia.join(" · ")}.
                        </p>
                      )}
                    </li>
                  );
                })}
              </ul>

              <Link
                href="/calendario"
                className="brilho-borda mt-12 inline-flex items-center px-10 py-4
                  font-[family-name:var(--font-livro)] text-sm tracking-[0.22em] indent-[0.22em] uppercase
                  text-[var(--texto)]
                  shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--realce)_60%,transparent)]
                  transition-[box-shadow,color] duration-500
                  hover:text-[var(--realce)] hover:shadow-[inset_0_0_0_1px_var(--realce)]"
              >
                Escolher minha data
              </Link>
            </section>
          </div>
        </main>

        <Rodape />
      </div>
    </Passagem>
  );
}
