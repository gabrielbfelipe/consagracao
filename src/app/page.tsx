import Image from "next/image";
import { Passagem } from "@/components/atmosphere/Passagem";
import Link from "next/link";
import { Hero } from "@/components/vitrine/Hero";
import { Algarismo, TituloDeSecao } from "@/components/vitrine/TituloDeSecao";
import { Botao, EloDeTexto } from "@/components/vitrine/Botao";
import { Rodape } from "@/components/vitrine/Rodape";
import { PorticoPublico } from "@/components/navegacao/PorticoPublico";
import { IMAGENS, urlDaImagem } from "@/lib/imagens";
import { ETAPAS } from "@/lib/jornada/etapas";
import { PAGINAS } from "@/content/sobre";

const PASSOS = [
  {
    titulo: "Escolha a data",
    texto:
      "Vinte e quatro festas de Nossa Senhora. Você escolhe aquela em que deseja se consagrar.",
  },
  {
    titulo: "Receba o caminho",
    texto:
      "O sistema calcula o dia exato de começar — trinta e três dias antes — e distribui as etapas pelo seu calendário.",
  },
  {
    titulo: "Viva cada dia",
    texto:
      "No dia marcado, a jornada se abre sozinha. Leitura, meditação, oração e um espaço para escrever.",
  },
] as const;

export default function Entrada() {
  return (
    <Passagem>
      <div className="min-h-dvh">
        <PorticoPublico sobreImagem />

        <div data-sala="biblioteca">
          <Hero />
        </div>

        {/* Pedra — a primeira sala clara, para o olho descansar do hero. */}
        <section
          data-sala="pedra"
          className="bg-[var(--fundo)] px-6 py-28 sm:px-10 lg:py-36"
        >
          <div className="mx-auto grid max-w-[100rem] items-center gap-14 lg:grid-cols-2 lg:gap-24">
            <div className="assenta relative aspect-[4/5] overflow-hidden">
              <Image
                src={urlDaImagem("vitralEscuro", { largura: 1000 })}
                alt={IMAGENS.vitralEscuro.alt}
                fill
                sizes="(max-width: 64rem) 100vw, 50vw"
                className="object-cover"
              />
              <div
                aria-hidden
                className="absolute inset-0 shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--realce)_45%,transparent)]"
              />
            </div>

            <div className="assenta">
              <TituloDeSecao
                sobrenome="O que é a consagração"
                titulo="Entregar-se a Cristo pelas mãos de Maria"
              />

              <div className="voz-livro mt-9 text-[var(--texto-suave)]">
                <p>
                  Consagrar-se é entregar a si mesmo a Deus de modo definitivo —
                  o corpo, o tempo, o trabalho, as orações, o que se tem e o que
                  ainda virá.
                </p>
                <p>
                  A consagração a Nossa Senhora não coloca Maria no lugar de
                  Deus. Faz o contrário: você se entrega a Jesus Cristo, e pede
                  a ela que conduza essa entrega, porque ninguém o conhece
                  melhor, e ninguém leva a Ele com mais segurança.
                </p>
                <p>
                  Nada muda no seu estado de vida. Não há voto, nem obrigação
                  sob pecado. O que muda é a intenção com que se vive.
                </p>
              </div>

              <EloDeTexto href="/sobre/a-consagracao" className="mt-10">
                Conhecer o método de Montfort
              </EloDeTexto>
            </div>
          </div>
        </section>

        {/* As quatro etapas — de volta à penumbra da nave. */}
        <section
          data-sala="biblioteca"
          className="relative overflow-hidden bg-[var(--fundo)] px-6 py-28 sm:px-10 lg:py-36"
        >
          <div aria-hidden className="absolute inset-0">
            <Image
              src={urlDaImagem("colunata", { largura: 1800, qualidade: 60 })}
              alt=""
              fill
              sizes="100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-[color-mix(in_oklab,var(--color-sombra)_82%,transparent)]" />
          </div>

          <div className="relative mx-auto max-w-[100rem]">
            <TituloDeSecao
              sobrenome="Trinta e três dias"
              titulo="As quatro etapas do caminho"
              centrado
            />

            <ol className="mt-20 grid gap-x-10 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
              {ETAPAS.map((etapa, i) => (
                <li key={etapa.id} className="assenta">
                  <Algarismo n={i + 1} />

                  <div
                    aria-hidden
                    className="mt-5 h-px w-full bg-[linear-gradient(to_right,color-mix(in_oklab,var(--color-ouro)_70%,transparent),transparent)]"
                  />

                  <h3 className="mt-6 font-[family-name:var(--font-livro)] text-2xl leading-snug text-[var(--color-marfim)]">
                    {etapa.nome}
                  </h3>

                  <p className="mt-2 font-[family-name:var(--font-livro)] text-[var(--color-ouro)] italic">
                    {etapa.dias === 12
                      ? "Doze dias"
                      : `Dias ${etapa.primeiroDia} ao ${etapa.primeiroDia + etapa.dias - 1}`}
                  </p>

                  <p className="voz-livro mt-4 text-[0.98rem] text-[color-mix(in_oklab,var(--color-pergaminho)_78%,transparent)]">
                    {etapa.proposito}
                  </p>
                </li>
              ))}
            </ol>

            <p className="mx-auto mt-16 max-w-[60ch] text-center font-[family-name:var(--font-livro)] text-lg text-[color-mix(in_oklab,var(--color-pergaminho)_75%,transparent)] italic">
              No dia seguinte ao trigésimo terceiro — a festa que você escolheu
              — acontece a consagração.
            </p>
          </div>
        </section>

        {/* Como funciona — pedra outra vez. */}
        <section
          data-sala="pedra"
          className="relative overflow-hidden bg-[var(--fundo)] px-6 py-28 sm:px-10 lg:py-36"
        >
          <div aria-hidden className="absolute inset-0 opacity-[0.13]">
            <Image
              src={urlDaImagem("naveClara", { largura: 1800, qualidade: 55 })}
              alt=""
              fill
              sizes="100vw"
              className="object-cover"
            />
          </div>

          <div className="relative mx-auto max-w-[100rem]">
            <TituloDeSecao
              sobrenome="Como funciona"
              titulo="Você escolhe a data. O caminho é preparado."
              centrado
            />

            <ol className="mt-20 grid gap-12 lg:grid-cols-3 lg:gap-16">
              {PASSOS.map((passo, i) => (
                <li key={passo.titulo} className="assenta">
                  <span
                    aria-hidden
                    className="font-[family-name:var(--font-livro)] text-[5rem] leading-[0.8] text-[color-mix(in_oklab,var(--realce)_38%,transparent)]"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  <h3 className="mt-5 font-[family-name:var(--font-livro)] text-[1.75rem] text-[var(--texto)]">
                    {passo.titulo}
                  </h3>

                  <p className="voz-livro mt-4 text-[0.98rem] text-[var(--texto-suave)]">
                    {passo.texto}
                  </p>
                </li>
              ))}
            </ol>

            <div className="mt-20 text-center">
              <Botao href="/entrar">Iniciar preparação</Botao>
            </div>
          </div>
        </section>

        {/* O livro — penumbra de sala de estudos. */}
        <section data-sala="estudo" className="relative bg-[var(--fundo)]">
          <div className="grid lg:grid-cols-2">
            <div className="relative min-h-[46svh] lg:min-h-[76svh]">
              <Image
                src={urlDaImagem("livroAberto", { largura: 1400 })}
                alt={IMAGENS.livroAberto.alt}
                fill
                sizes="(max-width: 64rem) 100vw, 50vw"
                className="object-cover"
              />
              <div
                aria-hidden
                className="absolute inset-0 bg-[linear-gradient(to_top,var(--fundo)_3%,transparent_55%)] lg:bg-[linear-gradient(to_right,transparent_52%,var(--fundo))]"
              />
            </div>

            <div className="flex items-center px-6 py-24 sm:px-12 lg:px-20">
              <div className="assenta max-w-[52ch]">
                <TituloDeSecao
                  sobrenome="O livro que acompanha"
                  titulo="Tratado da Verdadeira Devoção"
                />

                <p className="voz-livro mt-9 text-[var(--texto-suave)]">
                  A jornada caminha ao lado do livro de São Luís de Montfort. A
                  cada dia indicamos exatamente quais parágrafos ler, e aqui
                  você anota, marca e medita sobre eles.
                </p>

                <div className="superficie-pergaminho mt-10 px-7 py-7">
                  <h3 className="font-[family-name:var(--font-livro)] text-xl leading-snug text-[#2a1d12]">
                    Por que o livro não está aqui dentro
                  </h3>
                  <p className="mt-3 font-[family-name:var(--font-livro)] text-[1.02rem] leading-[1.75] text-[#3d2c1c]">
                    A obra é de domínio público no original, mas as traduções ao
                    português pertencem às editoras e aos tradutores que as
                    fizeram. Reproduzi-las aqui seria tomar o trabalho de outras
                    pessoas. Recomendamos que você adquira o seu exemplar — um
                    livro que fica com a pessoa a vida inteira.
                  </p>
                </div>

                <EloDeTexto href="/sobre/o-livro" className="mt-9">
                  Como escolher sua edição
                </EloDeTexto>
              </div>
            </div>
          </div>
        </section>

        {/* As portas restantes — pedra. */}
        <section
          data-sala="pedra"
          className="bg-[var(--fundo)] px-6 py-28 sm:px-10 lg:py-36"
        >
          <div className="mx-auto max-w-[100rem]">
            <TituloDeSecao
              sobrenome="Antes de começar"
              titulo="Conheça o caminho"
              centrado
            />

            <ul className="mt-20 grid gap-x-12 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
              {PAGINAS.map((p) => (
                <li key={p.slug} className="assenta">
                  <Link
                    href={`/sobre/${p.slug}`}
                    className="group block h-full"
                  >
                    <div
                      aria-hidden
                      className="h-px w-full origin-left bg-[linear-gradient(to_right,var(--realce),transparent)] transition-transform duration-700 ease-[var(--ease-santuario)] group-hover:scale-x-[1.02]"
                    />
                    <h3 className="mt-6 font-[family-name:var(--font-livro)] text-[1.65rem] leading-snug text-[var(--texto)] transition-colors duration-500 group-hover:text-[var(--realce)]">
                      {p.titulo}
                    </h3>
                    <p className="voz-livro mt-3 text-[0.98rem] text-[var(--texto-suave)]">
                      {p.resumo}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* O chamado final */}
        <section
          data-sala="biblioteca"
          className="relative flex min-h-[72svh] items-center justify-center overflow-hidden px-6 py-28 text-center"
        >
          <div aria-hidden className="absolute inset-0">
            <Image
              src={urlDaImagem("luzPelasJanelas", {
                largura: 2000,
                qualidade: 74,
              })}
              alt=""
              fill
              sizes="100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-[color-mix(in_oklab,var(--color-sombra)_62%,transparent)]" />
          </div>

          <div className="relative max-w-[56ch]">
            <p className="font-[family-name:var(--font-livro)] text-[clamp(1.2rem,1rem+0.9vw,1.7rem)] text-[var(--color-ouro)] italic">
              Você escolhe a data
            </p>

            <h2 className="mt-4 font-[family-name:var(--font-livro)] text-[clamp(2.25rem,1.5rem+3.4vw,4.5rem)] leading-[1.02] text-balance text-[var(--color-marfim)] uppercase">
              O caminho já está preparado
            </h2>

            <p className="voz-livro mx-auto mt-9 text-[color-mix(in_oklab,var(--color-pergaminho)_82%,transparent)]">
              Trinta e três dias separam este momento da sua consagração. Basta
              escolher quando eles começam.
            </p>

            <div className="mt-12">
              <Botao href="/entrar">Iniciar preparação</Botao>
            </div>
          </div>
        </section>

        <Rodape />
      </div>
    </Passagem>
  );
}
