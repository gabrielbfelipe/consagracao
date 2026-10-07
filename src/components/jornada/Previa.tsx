import { PASSOS } from "@/lib/jornada/passos";
import {
  DISCIPLINA_DAS_SEMANAS,
  diaPorNumero,
  faixaDeLeitura,
} from "@/content/jornada";
import { diaEMes, type DataSimples } from "@/lib/agenda/dataSimples";

/**
 * O que a pessoa vai viver, mostrado antes de ela escolher a data.
 *
 * Existe porque escolher uma festa é assumir trinta e três dias, e até aqui
 * a tela pedia esse compromisso mostrando apenas datas. Quem decide no
 * escuro desiste no dia 4. Por isso a prévia é concreta: o que acontece num
 * dia qualquer, o que se reza em cada semana, um dia de verdade mostrado por
 * inteiro, e o que é preciso ter em mãos antes de começar.
 *
 * O dia 1 não é um exemplo inventado para a vitrine — é o mesmo texto que a
 * pessoa vai encontrar no primeiro dia, lido do conteúdo da jornada.
 */
export function Previa({
  inicio,
  consagracao,
}: {
  /** O primeiro dia da preparação. */
  inicio: DataSimples;
  /** O Grande Dia. */
  consagracao: DataSimples;
}) {
  const primeiro = diaPorNumero(1);

  return (
    <section className="mx-auto mt-16 max-w-3xl">
      <header className="text-center">
        <p className="ouro font-[family-name:var(--font-livro)] text-sm tracking-[0.3em] uppercase">
          Antes de decidir
        </p>
        <h2 className="mt-4 font-[family-name:var(--font-livro)] text-[clamp(1.7rem,1.3rem+1.6vw,2.5rem)] leading-tight text-[var(--color-marfim)]">
          Como são estes trinta e três dias
        </h2>
        <div
          aria-hidden
          className="mx-auto mt-7 h-px w-20 bg-[linear-gradient(to_right,transparent,var(--color-ouro),transparent)]"
        />
      </header>

      {/* --- Um dia qualquer ------------------------------------------- */}
      <div className="superficie-vidro mt-12 px-7 py-9 sm:px-10">
        <h3 className="font-[family-name:var(--font-livro)] text-2xl text-[var(--color-marfim)]">
          Todo dia, sete passos
        </h3>
        <p className="voz-livro mt-4 text-[var(--texto-suave)]">
          Cada passo pede uma coisa só, e só depois abre o seguinte. Entre vinte
          e trinta minutos, no horário que você escolher.
        </p>

        <ol className="mt-8 grid gap-x-8 gap-y-5 sm:grid-cols-2">
          {PASSOS.map((passo, i) => (
            <li key={passo.id} className="flex gap-4">
              <span
                aria-hidden
                className="mt-1 w-5 shrink-0 font-[family-name:var(--font-livro)] text-sm tabular-nums text-[var(--color-ouro)]"
              >
                {i + 1}
              </span>
              <span>
                <span className="block font-[family-name:var(--font-livro)] text-lg text-[var(--color-marfim)]">
                  {passo.nome}
                </span>
                <span className="mt-0.5 block text-sm leading-relaxed text-[var(--texto-suave)]">
                  {passo.instrucao}
                </span>
              </span>
            </li>
          ))}
        </ol>
      </div>

      {/* --- O que se reza em cada etapa -------------------------------- */}
      <div className="mt-6 space-y-px">
        <h3 className="superficie-madeira px-7 py-5 font-[family-name:var(--font-livro)] text-2xl text-[var(--color-marfim)]">
          O que se reza em cada etapa
        </h3>

        {DISCIPLINA_DAS_SEMANAS.map((d) => (
          <div key={d.etapa} className="superficie-madeira px-7 py-6">
            <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
              <h4 className="font-[family-name:var(--font-livro)] text-xl text-[var(--color-marfim)]">
                {d.etapa}
              </h4>
              <p className="font-[family-name:var(--font-livro)] text-sm text-[var(--color-ouro)]">
                {d.fonte}
              </p>
            </div>

            <ul className="mt-3 flex flex-wrap gap-x-3 gap-y-2">
              {d.todoDia.map((o) => (
                <li
                  key={o}
                  className="font-[family-name:var(--font-livro)] text-[0.95rem] text-[var(--texto-suave)]
                    shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--color-ouro)_28%,transparent)] px-3.5 py-1.5"
                >
                  {o}
                </li>
              ))}
            </ul>

            {d.nota && (
              <p className="mt-4 max-w-[62ch] text-sm leading-relaxed text-[color-mix(in_oklab,var(--color-pergaminho)_55%,transparent)]">
                {d.nota}
              </p>
            )}
          </div>
        ))}
      </div>

      {/* --- Um dia de verdade, por inteiro ----------------------------- */}
      {primeiro && (
        <div className="superficie-pergaminho mt-6 px-7 py-9 sm:px-10">
          <p className="font-[family-name:var(--font-livro)] text-sm tracking-[0.2em] text-[#6b4f2e] uppercase">
            Seu primeiro dia · {diaEMes(inicio)}
          </p>
          <h3 className="mt-3 font-[family-name:var(--font-livro)] text-[clamp(1.6rem,1.3rem+1vw,2.1rem)] leading-tight text-[#2a1d12]">
            {primeiro.tema}
          </h3>

          <p className="mt-4 font-[family-name:var(--font-livro)] text-[1.08rem] leading-[1.75] text-[#3d2c1c]">
            {primeiro.introducao}
          </p>

          <dl className="mt-8 space-y-5">
            <div>
              <dt className="font-[family-name:var(--font-livro)] text-sm tracking-wide text-[#6b4f2e]">
                A leitura
              </dt>
              <dd className="mt-1 font-[family-name:var(--font-livro)] text-lg text-[#2a1d12]">
                {faixaDeLeitura(primeiro.leitura)}
              </dd>
            </div>

            <div>
              <dt className="font-[family-name:var(--font-livro)] text-sm tracking-wide text-[#6b4f2e]">
                Uma das perguntas
              </dt>
              <dd className="mt-1 font-[family-name:var(--font-livro)] text-lg leading-snug text-[#2a1d12] italic">
                “{primeiro.meditacao[0]}”
              </dd>
            </div>

            <div>
              <dt className="font-[family-name:var(--font-livro)] text-sm tracking-wide text-[#6b4f2e]">
                O que se faz
              </dt>
              <dd className="mt-1 font-[family-name:var(--font-livro)] text-lg leading-snug text-[#2a1d12]">
                {primeiro.exercicio}
              </dd>
            </div>
          </dl>
        </div>
      )}

      {/* --- O que é preciso ter em mãos -------------------------------- */}
      <div className="superficie-vidro mt-6 px-7 py-9 sm:px-10">
        <h3 className="font-[family-name:var(--font-livro)] text-2xl text-[var(--color-marfim)]">
          O que você vai precisar
        </h3>

        <ul className="mt-7 space-y-6">
          <Item titulo="Um exemplar do Tratado da Verdadeira Devoção">
            A leitura de cada dia aponta para os parágrafos numerados do livro,
            que são os mesmos em qualquer edição. Não reproduzimos o texto aqui:
            as traduções pertencem a quem as fez. Procure uma edição com os
            parágrafos numerados — é por eles que o caminho se orienta.
          </Item>

          <Item titulo="Vinte a trinta minutos por dia, sempre no mesmo horário">
            Montfort pede constância, não intensidade. O horário fixo vale mais
            do que o tempo longo.
          </Item>

          <Item titulo="Uma Bíblia">
            Alguns dos doze dias preliminares têm uma passagem do Evangelho em
            vez de um trecho do Tratado.
          </Item>

          <Item titulo={`Confissão e comunhão no dia ${diaEMes(consagracao)}`}>
            É o que o § 231 pede para o dia da consagração: confessar-se e
            comungar com a intenção de se dar a Jesus Cristo pelas mãos de
            Maria. Convém marcar a confissão com alguns dias de antecedência.
          </Item>
        </ul>
      </div>

      <p className="mt-10 text-center text-sm leading-relaxed text-[var(--texto-suave)]">
        Nada aqui é definitivo. Depois de escolher, você pode pausar, retomar ou
        trocar de data — o que você escrever fica guardado.
      </p>
    </section>
  );
}

function Item({
  titulo,
  children,
}: {
  titulo: string;
  children: React.ReactNode;
}) {
  return (
    <li className="border-l border-[color-mix(in_oklab,var(--color-ouro)_38%,transparent)] pl-6">
      <h4 className="font-[family-name:var(--font-livro)] text-lg text-[var(--color-marfim)]">
        {titulo}
      </h4>
      <p className="mt-1.5 max-w-[64ch] text-[0.95rem] leading-[1.7] text-[var(--texto-suave)]">
        {children}
      </p>
    </li>
  );
}
