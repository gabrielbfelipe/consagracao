import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de privacidade",
  description:
    "O que guardamos, por quanto tempo, com quem compartilhamos e como apagar tudo.",
};

/**
 * Escrita para ser lida, não para proteger quem a escreveu.
 * Frases curtas, sem remissões a artigos que ninguém vai procurar.
 */
export default function Privacidade() {
  return (
    <main data-sala="biblioteca" className="min-h-dvh px-6 py-24">
      <article className="mx-auto max-w-[62ch]">
        <h1 className="font-[family-name:var(--font-livro)] text-[clamp(2rem,1.5rem+2vw,3rem)] leading-tight text-[var(--color-marfim)]">
          Política de privacidade
        </h1>

        <div
          aria-hidden
          className="mt-8 h-px w-24 bg-[linear-gradient(to_right,var(--color-ouro),transparent)]"
        />

        <Secao titulo="O que guardamos">
          <p>
            Seu e-mail, para que você possa entrar. O nome que você quiser
            informar. Seu fuso horário. A data de consagração que você
            escolher, os dias que concluir e o que escrever no diário, nas
            reflexões, no Meu Motivo e na Carta do Primeiro Dia.
          </p>
          <p>
            Não pedimos endereço, telefone, documento nem dados de pagamento.
          </p>
        </Secao>

        <Secao titulo="Por que isso é um dado sensível">
          <p>
            A Lei Geral de Proteção de Dados considera a convicção religiosa um
            dado pessoal sensível. Saber que alguém se prepara para uma
            consagração revela sua religião, e por isso pedimos seu
            consentimento em destaque antes de guardar qualquer coisa. Esse
            consentimento fica registrado com data e hora.
          </p>
        </Secao>

        <Secao titulo="Quem lê o que você escreve">
          <p>
            Ninguém. Seu diário e suas reflexões são protegidos no banco de
            dados por regras que só reconhecem a sua conta. Nem outros
            usuários, nem participantes de um mesmo grupo, nem a equipe do
            aplicativo em operação normal.
          </p>
          <p>
            A Carta do Primeiro Dia é guardada lacrada. O próprio banco de
            dados recusa entregá-la antes do dia da sua consagração — nem para
            você.
          </p>
        </Secao>

        <Secao titulo="Inteligência artificial">
          <p>
            Nenhum texto seu é enviado a um modelo de inteligência artificial
            sem que você peça, clicando. Quando você pedir, o texto é usado
            apenas para gerar aquela resposta. Não treinamos modelos com o que
            você escreve, e não autorizamos terceiros a fazê-lo.
          </p>
        </Secao>

        <Secao titulo="Com quem compartilhamos">
          <p>
            Não vendemos nem cedemos seus dados. Usamos fornecedores de
            infraestrutura para hospedar o aplicativo, guardar o banco de dados
            e enviar e-mails, que tratam os dados apenas para nos prestar esse
            serviço.
          </p>
        </Secao>

        <Secao titulo="Apagar tudo">
          <p>
            Você pode apagar sua conta e tudo o que guardamos a qualquer
            momento, sem precisar justificar. Apagar significa apagar: a
            jornada, o progresso, o diário, as cartas e o perfil são removidos.
            Não mantemos cópia de cortesia.
          </p>
        </Secao>

        <Secao titulo="Por quanto tempo guardamos">
          <p>
            Enquanto sua conta existir. Se você apagar a conta, os dados vão
            junto. Cópias de segurança rotineiras são descartadas no ciclo
            normal de retenção do provedor.
          </p>
        </Secao>

        <Secao titulo="Seus direitos">
          <p>
            A lei garante a você confirmar que tratamos seus dados, acessá-los,
            corrigi-los, pedir cópia, revogar o consentimento e pedir a
            eliminação. Revogar o consentimento equivale a apagar a conta,
            porque sem ele não há como acompanhar a preparação.
          </p>
        </Secao>

        <Secao titulo="Como falar conosco">
          <p>
            O canal de contato para assuntos de privacidade será publicado
            aqui antes de o aplicativo receber seus primeiros usuários.
          </p>
        </Secao>

        <p className="mt-16 text-sm text-[color-mix(in_oklab,var(--color-pergaminho)_50%,transparent)]">
          Este texto ainda não passou por revisão jurídica. Antes de o
          aplicativo abrir ao público, ele deve ser revisto por um advogado e
          ganhar a identificação do responsável pelo tratamento dos dados.
        </p>

        <Link
          href="/guia"
          className="mt-12 inline-block text-sm text-[var(--texto-suave)] underline
            decoration-[color-mix(in_oklab,var(--color-ouro)_35%,transparent)] underline-offset-[6px]
            transition-colors hover:text-[var(--color-pergaminho)]"
        >
          Voltar ao guia
        </Link>
      </article>
    </main>
  );
}

function Secao({
  titulo,
  children,
}: {
  titulo: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-12">
      <h2 className="font-[family-name:var(--font-livro)] text-2xl text-[var(--color-marfim)]">
        {titulo}
      </h2>
      <div className="voz-livro mt-4 text-[var(--texto-suave)]">{children}</div>
    </section>
  );
}
