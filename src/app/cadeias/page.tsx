import Link from "next/link";
import type { Metadata } from "next";
import { cartao } from "@/lib/seo/cartao";
import { PorticoDaSala } from "@/components/navegacao/PorticoDaSala";
import { Passagem } from "@/components/atmosphere/Passagem";
import { Rodape } from "@/components/vitrine/Rodape";
import { Carrossel } from "@/components/loja/Carrossel";
import { Anuncio } from "@/components/anuncios/Anuncio";
import {
  APRESENTACAO,
  AVISO_DA_AMAZON,
  AVISO_DE_AFILIADO,
  GUIA,
  PRODUTOS,
} from "@/content/produtos";
import fotosGuardadas from "@/content/produtos-fotos.json";
import { DadosEstruturados } from "@/components/seo/DadosEstruturados";
import { grafoDeMigalhas } from "@/lib/seo/dadosEstruturados";

export const metadata: Metadata = {
  title: "Cadeias de consagração",
  description:
    "As cadeiazinhas que São Luís de Montfort propõe como sinal da escravidão de amor, e onde encontrá-las.",
  ...cartao({
    titulo: "Cadeias de consagração",
    descricao:
      "As cadeiazinhas que São Luís de Montfort propõe como sinal da escravidão de amor, e onde encontrá-las.",
    caminho: "/cadeias",
  }),
};

type FotosGuardadas = Record<
  string,
  { titulo: string | null; loja: string; fotos: string[]; buscadoEm: string }
>;

/**
 * A sala da loja.
 *
 * Fica aberta a quem não entrou e a quem entrou — o pórtico resolve-se
 * sozinho —, porque a cadeia interessa antes de a pessoa ter conta e depois
 * de ela ter terminado a preparação.
 *
 * O que se vende aqui não é necessário à consagração, e a página diz isso
 * em voz alta antes de mostrar qualquer preço. Montfort chama estas práticas
 * de exteriores, e seria desonesto deixar alguém com a impressão de que
 * precisa comprar alguma coisa para se consagrar.
 */
export default async function Cadeias() {
  const guardadas = fotosGuardadas as FotosGuardadas;

  const produtos = PRODUTOS.map((p) => {
    const buscado = guardadas[p.id];
    return {
      ...p,
      // O que está escrito à mão vence o que foi buscado, sempre.
      fotos: p.fotos ?? buscado?.fotos ?? [],
      titulo: p.titulo ?? buscado?.titulo ?? "Cadeia de consagração",
      loja: buscado?.loja ?? null,
    };
  });

  // A frase da Amazon só entra quando há produto da Amazon. Ver produtos.ts.
  const temAmazon = produtos.some((p) => p.loja === "Amazon");
  const aviso = temAmazon
    ? `${AVISO_DE_AFILIADO} ${AVISO_DA_AMAZON}`
    : AVISO_DE_AFILIADO;

  const emDestaque = produtos.filter((p) => p.destaque);
  const demais = produtos.filter((p) => !p.destaque);

  return (
    <Passagem>
      <div data-sala="pedra" className="min-h-dvh bg-[var(--fundo)]">
        {/* Só a trilha de migalhas. Não há `Product` nem `Offer` aqui: o
            preço e a disponibilidade vivem na loja e mudam sem avisar, e
            declarar um preço que não se confere é como o Google encontra
            dados estruturados enganosos. */}
        <DadosEstruturados
          dados={grafoDeMigalhas([{ nome: "Cadeias", caminho: "/cadeias" }])}
        />

        <PorticoDaSala />

        <main className="px-6 pt-10 pb-24 sm:px-10 lg:px-16">
          <header className="mx-auto max-w-[62ch] text-center">
            <p className="font-[family-name:var(--font-livro)] text-[clamp(1.1rem,0.95rem+0.6vw,1.5rem)] text-[var(--realce)] italic">
              {APRESENTACAO.sobrenome}
            </p>

            <h1 className="mt-3 font-[family-name:var(--font-livro)] text-[clamp(2rem,1.4rem+2.4vw,3.25rem)] leading-tight text-[var(--texto)]">
              {APRESENTACAO.titulo}
            </h1>

            <div
              aria-hidden
              className="mx-auto mt-8 h-px w-24 bg-[linear-gradient(to_right,transparent,var(--realce),transparent)]"
            />

            <p className="voz-livro mx-auto mt-8 text-[var(--texto-suave)]">
              {APRESENTACAO.texto}
            </p>

            {/* O aviso vem antes dos produtos, e não no rodapé. */}
            <p className="mx-auto mt-8 max-w-[54ch] border-l-2 border-[var(--realce)] pl-5 text-left text-[0.95rem] leading-relaxed text-[var(--texto)]">
              {APRESENTACAO.nota}
            </p>
          </header>

          {/* O guia vem antes das lojas, de propósito: quem chega aqui tem
              uma dúvida antes de ter uma compra. */}
          <div className="mx-auto mt-20 max-w-[66ch]">
            {GUIA.map((secao) => (
              <section key={secao.titulo} className="mt-14 first:mt-0">
                <h2 className="font-[family-name:var(--font-livro)] text-[clamp(1.4rem,1.2rem+0.9vw,1.9rem)] leading-snug text-[var(--texto)]">
                  {secao.titulo}
                </h2>
                <div
                  aria-hidden
                  className="mt-4 h-px w-16 bg-[color-mix(in_oklab,var(--realce)_40%,transparent)]"
                />
                <div className="voz-livro mt-6 text-[var(--texto-suave)]">
                  {secao.paragrafos.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
              </section>
            ))}
          </div>

          <div className="mx-auto mt-24 max-w-[66ch] text-center">
            <div
              aria-hidden
              className="mx-auto h-px w-24 bg-[linear-gradient(to_right,transparent,var(--realce),transparent)]"
            />
            <h2 className="mt-10 font-[family-name:var(--font-livro)] text-[clamp(1.5rem,1.25rem+1vw,2.1rem)] text-[var(--texto)]">
              Onde encontrar
            </h2>
            <p className="voz-livro mt-5 text-[var(--texto-suave)]">
              Estas são cadeias que achei honestas pelo preço, em lojas que
              entregam no Brasil inteiro. Não recebi nada de nenhuma delas
              para as indicar, e a nota ao lado de cada uma é minha.
            </p>
          </div>

          {produtos.length === 0 ? (
            <Vazia />
          ) : (
            <>
              {emDestaque.length > 0 && (
                <ul className="mx-auto mt-20 grid max-w-5xl gap-10 lg:grid-cols-2">
                  {emDestaque.map((p) => (
                    <li key={p.id}>
                      <Cartao produto={p} destaque />
                    </li>
                  ))}
                </ul>
              )}

              {demais.length > 0 && (
                <ul className="mx-auto mt-10 grid max-w-6xl gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
                  {demais.map((p) => (
                    <li key={p.id}>
                      <Cartao produto={p} />
                    </li>
                  ))}
                </ul>
              )}

              <p className="mx-auto mt-20 max-w-[58ch] text-center text-sm leading-relaxed text-[var(--texto-suave)]">
                {aviso}
              </p>
            </>
          )}

          <div className="mt-20 text-center">
            <Link
              href="/sobre/o-livro"
              className="font-[family-name:var(--font-livro)] text-base tracking-[0.14em] uppercase
                text-[var(--texto-suave)] underline
                decoration-[color-mix(in_oklab,var(--realce)_50%,transparent)] underline-offset-[9px]
                transition-colors duration-500 hover:text-[var(--realce)]"
            >
              O que você realmente precisa é do livro
            </Link>
          </div>
          <Anuncio posicao="cadeias-pe" />
        </main>

        <Rodape />
      </div>
    </Passagem>
  );
}

function Cartao({
  produto,
  destaque = false,
}: {
  produto: {
    id: string;
    link: string;
    titulo: string;
    nota?: string;
    fotos: readonly string[];
    loja: string | null;
  };
  destaque?: boolean;
}) {
  return (
    <article className="flex h-full flex-col">
      <Carrossel fotos={produto.fotos} alt={produto.titulo} destaque={destaque} />

      <h2
        className={`mt-6 font-[family-name:var(--font-livro)] leading-snug text-[var(--texto)] ${
          destaque ? "text-[clamp(1.5rem,1.2rem+1vw,2rem)]" : "text-xl"
        }`}
      >
        {produto.titulo}
      </h2>

      {produto.nota && (
        <p className="mt-3 text-[0.98rem] leading-relaxed text-[var(--texto-suave)]">
          {produto.nota}
        </p>
      )}

      <div className="mt-auto pt-7">
        <a
          href={produto.link}
          target="_blank"
          rel="nofollow sponsored noopener noreferrer"
          className="brilho-borda inline-flex items-center px-8 py-3.5
            font-[family-name:var(--font-livro)] text-sm tracking-[0.22em] indent-[0.22em] uppercase
            text-[var(--texto)]
            shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--realce)_70%,transparent)]
            transition-[box-shadow,color] duration-500 ease-[var(--ease-santuario)]
            hover:text-[var(--realce)] hover:shadow-[inset_0_0_0_2px_var(--realce)]"
        >
          Ver na loja
        </a>

        {produto.loja && (
          <p className="mt-3 text-xs tracking-wide text-[color-mix(in_oklab,var(--texto)_50%,transparent)] uppercase">
            {produto.loja}
          </p>
        )}
      </div>
    </article>
  );
}

/** Enquanto não houver produto nenhum, a sala diz o que falta — e a quem. */
function Vazia() {
  return (
    <div className="mx-auto mt-20 max-w-[54ch] text-center">
      <p className="voz-livro text-[var(--texto-suave)]">
        Ainda não há cadeias indicadas aqui. Elas aparecem assim que forem
        escolhidas, uma a uma, entre as que valem a pena.
      </p>
      <p className="mt-6 text-sm text-[var(--texto-suave)]">
        Enquanto isso, procure em livrarias católicas e em paróquias — muitas
        vendem as cadeiazinhas, e ali você vê antes de levar.
      </p>
    </div>
  );
}
