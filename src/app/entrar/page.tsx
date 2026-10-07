import Image from "next/image";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { FormularioEntrada } from "@/components/conta/FormularioEntrada";
import { PorticoPublico } from "@/components/navegacao/PorticoPublico";
import { IMAGENS, urlDaImagem } from "@/lib/imagens";
import { usuarioAtual } from "@/lib/supabase/servidor";
import { Passagem } from "@/components/atmosphere/Passagem";

export const metadata: Metadata = {
  title: "Entrar",
  description: "Entre na sua conta para continuar a preparação.",
  alternates: { canonical: "/entrar" },
  /**
   * Formulário não é conteúdo. Indexar a página de entrada seria oferecer ao
   * Google uma página sem texto a competir com as que têm — e quem procura
   * "consagração a Nossa Senhora" não quer cair num campo de senha.
   *
   * `follow: true` é deliberado: a página continua a ser lida e os elos que
   * saem dela continuam a valer. É por isso que o robots.txt **não** a
   * bloqueia; ver os comentários lá.
   */
  robots: { index: false, follow: true },
};

const PASSOS = [
  {
    n: "Primeiro",
    t: "Sua conta",
    d: "Nome, e-mail e senha. Entra na hora, sem confirmação por e-mail.",
  },
  { n: "Depois", t: "A data", d: "A festa de Nossa Senhora em que deseja se consagrar." },
  { n: "Então", t: "O caminho", d: "No dia certo, a jornada se abre sozinha." },
] as const;

export default async function Entrar({
  searchParams,
}: {
  searchParams: Promise<{ destino?: string; expirou?: string }>;
}) {
  const { destino, expirou } = await searchParams;

  if (await usuarioAtual()) redirect("/caminho");

  return (
    <Passagem>
      <div className="min-h-dvh">
        <PorticoPublico />

        <main className="grid min-h-[calc(100dvh-5.25rem)] lg:grid-cols-2">
          {/* A fotografia, que fica ao lado e não atrás do formulário. */}
          <div className="relative hidden lg:block">
            <Image
              src={urlDaImagem("naveVitral", { largura: 1400, qualidade: 74 })}
              alt={IMAGENS.naveVitral.alt}
              fill
              sizes="50vw"
              className="object-cover"
              priority
            />
            <div
              aria-hidden
              className="absolute inset-0 bg-[linear-gradient(to_right,rgba(8,5,3,0.35),rgba(8,5,3,0.8))]"
            />

            <figure className="absolute inset-x-0 bottom-0 px-14 pb-14">
              <blockquote className="font-[family-name:var(--font-livro)] text-[clamp(1.4rem,1.1rem+1vw,2rem)] leading-[1.35] text-balance text-[var(--color-marfim)] italic">
                “Você escolhe a data. O sistema prepara o caminho. Você vive a
                jornada.”
              </blockquote>
              <figcaption className="mt-5 h-px w-16 bg-[linear-gradient(to_right,var(--color-ouro),transparent)]" />
            </figure>
          </div>

          {/* O formulário, sobre pedra clara. */}
          <div
            data-sala="pedra"
            className="flex flex-col justify-center bg-[var(--fundo)] px-6 py-20 sm:px-12 lg:px-16"
          >
            <div className="mx-auto w-full max-w-[42ch]">
              <p className="font-[family-name:var(--font-livro)] text-[clamp(1.1rem,0.95rem+0.6vw,1.5rem)] text-[var(--realce)] italic">
                Bem-vindo de volta
              </p>

              <h1 className="mt-3 font-[family-name:var(--font-livro)] text-[clamp(2rem,1.5rem+2vw,3rem)] leading-[1.06] text-[var(--texto)] uppercase">
                Entrar
              </h1>

              <div
                aria-hidden
                className="mt-7 h-px w-20 bg-[linear-gradient(to_right,var(--realce),transparent)]"
              />

              {expirou ? (
                <p className="voz-livro mt-8 border-l-2 border-[var(--realce)] pl-5 text-[var(--texto)]">
                  Sua sessão foi encerrada. Por aqui a entrada não fica
                  guardada: cada visita começa com você dizendo quem é.
                </p>
              ) : (
                <p className="voz-livro mt-8 text-[var(--texto-suave)]">
                  Informe o e-mail e a senha da sua conta. A entrada não fica
                  guardada de uma visita para a outra — é pedida de novo a cada
                  vez, de propósito.
                </p>
              )}

              <FormularioEntrada destino={destino ?? "/caminho"} />

              <ol className="mt-16 space-y-6 border-t border-[color-mix(in_oklab,var(--realce)_30%,transparent)] pt-9">
                {PASSOS.map((passo) => (
                  <li key={passo.t} className="flex gap-5">
                    <span className="mt-1 w-[5.5rem] shrink-0 font-[family-name:var(--font-livro)] text-sm text-[color-mix(in_oklab,var(--texto)_52%,transparent)] italic">
                      {passo.n}
                    </span>
                    <span>
                      <span className="block font-[family-name:var(--font-livro)] text-lg text-[var(--texto)]">
                        {passo.t}
                      </span>
                      <span className="mt-0.5 block text-sm leading-relaxed text-[var(--texto-suave)]">
                        {passo.d}
                      </span>
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </main>
      </div>
    </Passagem>
  );
}
