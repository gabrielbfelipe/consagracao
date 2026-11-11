import Link from "next/link";
import type { Metadata } from "next";
import { cartao } from "@/lib/seo/cartao";
import { EMAIL_DE_CONTATO } from "@/lib/seo/site";
import { PorticoDaSala } from "@/components/navegacao/PorticoDaSala";
import { Rodape } from "@/components/vitrine/Rodape";
import { Passagem } from "@/components/atmosphere/Passagem";
import { TituloDeSecao } from "@/components/vitrine/TituloDeSecao";

export const metadata: Metadata = {
  title: "Contato",
  description:
    "Como falar com quem mantém este site: dúvidas sobre a preparação, erros no conteúdo, privacidade e direitos de imagem.",
  ...cartao({
    titulo: "Contato",
    descricao:
      "Como falar com quem mantém este site: dúvidas sobre a preparação, erros no conteúdo, privacidade e direitos de imagem.",
    caminho: "/contato",
  }),
};

/**
 * A porta de quem está do lado de fora.
 *
 * Existe por dois motivos. O primeiro é devido: um site que guarda o que as
 * pessoas escrevem tem de dizer a quem elas reclamam. O segundo é prático:
 * quem avalia um site à procura de sinais de abandono procura justamente
 * isto, e a ausência conta contra.
 *
 * O endereço não é uma imagem nem está partido em pedaços por JavaScript
 * para enganar robôs de spam. Esconder o contato para evitar spam é
 * esconder o contato.
 */

const ASSUNTOS = [
  {
    titulo: "Dúvidas sobre a preparação",
    texto:
      "Sobre como escolher a data, o que fazer em cada dia, o que o Tratado pede e o que este site acrescenta. Respondo o que souber, e digo quando não souber — não sou sacerdote, e questões de consciência pertencem ao seu confessor.",
  },
  {
    titulo: "Erros no conteúdo",
    texto:
      "Uma data errada, um parágrafo do Tratado mal citado, uma tradução que destoa do seu devocionário, um nome de festa trocado. Este é o recado mais útil que você pode mandar, e o que recebe resposta mais depressa.",
  },
  {
    titulo: "Privacidade e seus dados",
    texto:
      "Para acessar o que guardamos sobre você, corrigir, pedir cópia, revogar o consentimento ou apagar a conta inteira. Peça do mesmo e-mail com que se cadastrou e não precisa justificar nada.",
  },
  {
    titulo: "Imagens e textos de terceiros",
    texto:
      "Se você é autor de alguma fotografia ou de algum texto usado aqui e quer a atribuição corrigida, ou a retirada, escreva. Atendemos sem discussão e com pedido de desculpas.",
  },
  {
    titulo: "Paróquias, grupos e movimentos",
    texto:
      "Se quer levar a preparação a um grupo, ou conduzir uma turma pelos trinta e três dias, escreva contando o que pretende. O site é gratuito e continuará sendo.",
  },
] as const;

export default function Contato() {
  return (
    <Passagem>
      <div className="min-h-dvh">
        <PorticoDaSala />

        <main data-sala="pedra" className="bg-[var(--fundo)]">
          <div className="mx-auto max-w-[70rem] px-6 py-20 sm:px-10 lg:py-28">
            <TituloDeSecao
              sobrenome="Quem mantém este site, e como falar com ele"
              titulo="Contato"
              centrado
            />

            <div className="mx-auto mt-14 max-w-[62ch] text-center">
              <p className="voz-livro text-[var(--texto-suave)]">
                Este site é mantido por uma pessoa só, que fez esta preparação
                e quis deixar o caminho mais fácil para quem viesse depois.
                Não há empresa por trás, nem equipe, nem atendimento em
                horário comercial.
              </p>

              <p className="voz-livro mt-6 text-[var(--texto-suave)]">
                Toda mensagem é lida. A resposta costuma sair em alguns dias,
                e nunca passa de sete.
              </p>

              <a
                href={`mailto:${EMAIL_DE_CONTATO}`}
                className="brilho-borda mt-12 inline-flex items-center px-10 py-5
                  font-[family-name:var(--font-livro)] text-[clamp(1.05rem,0.95rem+0.5vw,1.35rem)]
                  tracking-[0.06em] text-[var(--texto)]
                  shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--realce)_60%,transparent)]
                  transition-[box-shadow,color] duration-500 ease-[var(--ease-santuario)]
                  hover:text-[var(--realce)] hover:shadow-[inset_0_0_0_1px_var(--realce)]"
              >
                {EMAIL_DE_CONTATO}
              </a>

              <p className="mt-6 text-sm text-[color-mix(in_oklab,var(--texto)_55%,transparent)]">
                Escreva em português. É a única língua em que consigo
                responder com cuidado.
              </p>
            </div>

            <div
              aria-hidden
              className="mx-auto mt-20 h-px w-24 bg-[linear-gradient(to_right,transparent,var(--realce),transparent)]"
            />

            <h2 className="mt-20 text-center font-[family-name:var(--font-livro)] text-[clamp(1.6rem,1.3rem+1.2vw,2.25rem)] text-[var(--texto)]">
              Sobre o que escrever
            </h2>

            <ul className="mx-auto mt-14 grid max-w-[72rem] gap-x-14 gap-y-12 md:grid-cols-2">
              {ASSUNTOS.map((a, i) => (
                <li key={a.titulo} className="assenta">
                  <div className="flex items-baseline gap-4">
                    <span
                      aria-hidden
                      className="font-[family-name:var(--font-livro)] text-2xl text-[color-mix(in_oklab,var(--realce)_45%,transparent)] tabular-nums"
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div
                      aria-hidden
                      className="h-px flex-1 bg-[color-mix(in_oklab,var(--realce)_35%,transparent)]"
                    />
                  </div>

                  <h3 className="mt-5 font-[family-name:var(--font-livro)] text-[1.5rem] leading-snug text-[var(--texto)]">
                    {a.titulo}
                  </h3>

                  <p className="voz-livro mt-4 text-[0.98rem] text-[var(--texto-suave)]">
                    {a.texto}
                  </p>
                </li>
              ))}
            </ul>

            <p className="mx-auto mt-20 max-w-[62ch] border-t border-[color-mix(in_oklab,var(--realce)_25%,transparent)] pt-8 text-center text-sm leading-relaxed text-[color-mix(in_oklab,var(--texto)_55%,transparent)]">
              Se a sua mensagem é sobre o que você escreveu dentro da sua
              preparação — o diário, as reflexões, a Carta do Primeiro Dia —
              saiba antes que ninguém aqui consegue lê-los: o banco de dados
              só os entrega à sua conta. O que diz a{" "}
              <Link
                href="/privacidade"
                className="underline decoration-[color-mix(in_oklab,var(--realce)_40%,transparent)] underline-offset-[5px] transition-colors hover:text-[var(--realce)]"
              >
                política de privacidade
              </Link>{" "}
              é verdade, inclusive quando é inconveniente para nós.
            </p>
          </div>
        </main>

        <Rodape />
      </div>
    </Passagem>
  );
}
