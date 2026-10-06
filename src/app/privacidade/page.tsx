import type { Metadata } from "next";
import { PorticoDaSala } from "@/components/navegacao/PorticoDaSala";
import { Rodape } from "@/components/vitrine/Rodape";
import { Passagem } from "@/components/atmosphere/Passagem";

export const metadata: Metadata = {
  title: "Política de privacidade",
  description:
    "O que guardamos, por quanto tempo, com quem compartilhamos e como apagar tudo.",
};

/**
 * Escrita para ser lida, não para proteger quem a escreveu.
 * Frases curtas, sem remissões a artigos que ninguém vai procurar.
 */
const SECOES = [
  {
    titulo: "O que guardamos",
    paragrafos: [
      "Seu e-mail, para que você possa entrar. O nome que você quiser informar. Seu fuso horário. A data de consagração que você escolher, os dias que concluir e o que escrever no diário, nas reflexões, no Meu Motivo e na Carta do Primeiro Dia.",
      "Não pedimos endereço, telefone, documento nem dados de pagamento.",
    ],
  },
  {
    titulo: "Por que isso é um dado sensível",
    paragrafos: [
      "A Lei Geral de Proteção de Dados considera a convicção religiosa um dado pessoal sensível. Saber que alguém se prepara para uma consagração revela sua religião, e por isso pedimos seu consentimento em destaque antes de guardar qualquer coisa. Esse consentimento fica registrado com data e hora.",
    ],
  },
  {
    titulo: "Quem lê o que você escreve",
    paragrafos: [
      "Ninguém. Seu diário e suas reflexões são protegidos no banco de dados por regras que só reconhecem a sua conta. Nem outros usuários, nem participantes de um mesmo grupo, nem a equipe do aplicativo em operação normal.",
      "A Carta do Primeiro Dia é guardada lacrada. O próprio banco de dados recusa entregá-la antes do dia da sua consagração — nem para você.",
    ],
  },
  {
    titulo: "Inteligência artificial",
    paragrafos: [
      "Nenhum texto seu é enviado a um modelo de inteligência artificial sem que você peça, clicando. Quando você pedir, o texto é usado apenas para gerar aquela resposta. Não treinamos modelos com o que você escreve, e não autorizamos terceiros a fazê-lo.",
    ],
  },
  {
    titulo: "Com quem compartilhamos",
    paragrafos: [
      "Não vendemos nem cedemos seus dados. Usamos fornecedores de infraestrutura para hospedar o aplicativo, guardar o banco de dados e enviar e-mails, que tratam os dados apenas para nos prestar esse serviço.",
    ],
  },
  {
    titulo: "Apagar tudo",
    paragrafos: [
      "Você pode apagar sua conta e tudo o que guardamos a qualquer momento, sem precisar justificar. Apagar significa apagar: a jornada, o progresso, o diário, as cartas e o perfil são removidos. Não mantemos cópia de cortesia.",
    ],
  },
  {
    titulo: "Por quanto tempo guardamos",
    paragrafos: [
      "Enquanto sua conta existir. Se você apagar a conta, os dados vão junto. Cópias de segurança rotineiras são descartadas no ciclo normal de retenção do provedor.",
    ],
  },
  {
    titulo: "Seus direitos",
    paragrafos: [
      "A lei garante a você confirmar que tratamos seus dados, acessá-los, corrigi-los, pedir cópia, revogar o consentimento e pedir a eliminação. Revogar o consentimento equivale a apagar a conta, porque sem ele não há como acompanhar a preparação.",
    ],
  },
  {
    titulo: "Como falar conosco",
    paragrafos: [
      "O canal de contato para assuntos de privacidade será publicado aqui antes de o aplicativo receber seus primeiros usuários.",
    ],
  },
] as const;

export default function Privacidade() {
  return (
    <Passagem>
      <div className="min-h-dvh">
        <PorticoDaSala />

        <main data-sala="pedra" className="bg-[var(--fundo)]">
          <article className="mx-auto max-w-[66ch] px-6 py-20 sm:px-10 lg:py-28">
            <p className="font-[family-name:var(--font-livro)] text-[var(--realce)] italic">
              O que guardamos e por quê
            </p>

            <h1 className="mt-3 font-[family-name:var(--font-livro)] text-[clamp(2rem,1.5rem+2vw,3rem)] leading-[1.06] text-[var(--texto)] uppercase">
              Política de privacidade
            </h1>

            <div
              aria-hidden
              className="mt-8 h-px w-24 bg-[linear-gradient(to_right,var(--realce),transparent)]"
            />

            {SECOES.map((secao) => (
              <section key={secao.titulo} className="assenta mt-14">
                <h2 className="font-[family-name:var(--font-livro)] text-[1.6rem] leading-snug text-[var(--texto)]">
                  {secao.titulo}
                </h2>
                <div className="voz-livro mt-4 text-[var(--texto-suave)]">
                  {secao.paragrafos.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
              </section>
            ))}

            <p className="mt-20 border-t border-[color-mix(in_oklab,var(--realce)_30%,transparent)] pt-8 text-sm leading-relaxed text-[color-mix(in_oklab,var(--texto)_55%,transparent)]">
              Este texto ainda não passou por revisão jurídica. Antes de o
              aplicativo abrir ao público, ele deve ser revisto por um advogado
              e ganhar a identificação do responsável pelo tratamento dos dados.
            </p>
          </article>
        </main>

        <Rodape />
      </div>
    </Passagem>
  );
}
