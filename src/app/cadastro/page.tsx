import Image from "next/image";
import type { Metadata } from "next";
import { FormularioCadastro } from "@/components/conta/FormularioCadastro";
import { PorticoPublico } from "@/components/navegacao/PorticoPublico";
import { IMAGENS, urlDaImagem } from "@/lib/imagens";
import { Passagem } from "@/components/atmosphere/Passagem";

export const metadata: Metadata = {
  title: "Criar conta",
  description:
    "Crie sua conta para começar a preparação de trinta e três dias para a Consagração a Nossa Senhora.",
};

export default function Cadastro() {
  return (
    <Passagem>
      <div className="min-h-dvh">
        <PorticoPublico />

        <main className="grid lg:grid-cols-[1fr_1.15fr]">
          {/* A fotografia fica, mas não acompanha a rolagem do formulário:
              presa no alto, ela é a parede ao lado, não um fundo que foge. */}
          <div className="relative hidden lg:block">
            <div className="sticky top-0 h-dvh">
              <Image
                src={urlDaImagem("naveVitral", { largura: 1400, qualidade: 74 })}
                alt={IMAGENS.naveVitral.alt}
                fill
                sizes="45vw"
                className="object-cover"
                priority
              />
              <div
                aria-hidden
                className="absolute inset-0 bg-[linear-gradient(to_right,rgba(8,5,3,0.35),rgba(8,5,3,0.82))]"
              />

              <figure className="absolute inset-x-0 bottom-0 px-14 pb-14">
                <blockquote className="font-[family-name:var(--font-livro)] text-[clamp(1.4rem,1.1rem+1vw,2rem)] leading-[1.35] text-balance text-[var(--color-marfim)] italic">
                  “Você escolhe a data. O sistema prepara o caminho. Você vive a
                  jornada.”
                </blockquote>
                <figcaption className="mt-5 h-px w-16 bg-[linear-gradient(to_right,var(--color-ouro),transparent)]" />
              </figure>
            </div>
          </div>

          {/* O formulário, sobre pedra clara. */}
          <div
            data-sala="pedra"
            className="bg-[var(--fundo)] px-6 py-20 sm:px-12 lg:px-16"
          >
            <div className="mx-auto w-full max-w-[64ch]">
              <p className="font-[family-name:var(--font-livro)] text-[clamp(1.1rem,0.95rem+0.6vw,1.5rem)] text-[var(--realce)] italic">
                Antes de começar
              </p>

              <h1 className="mt-3 font-[family-name:var(--font-livro)] text-[clamp(2rem,1.5rem+2vw,3rem)] leading-[1.06] text-[var(--texto)] uppercase">
                Criar conta
              </h1>

              <div
                aria-hidden
                className="mt-7 h-px w-20 bg-[linear-gradient(to_right,var(--realce),transparent)]"
              />

              <p className="voz-livro mt-8 text-[var(--texto-suave)]">
                A conta entra em funcionamento na hora — não há e-mail de
                confirmação a esperar. Depois dela você escolhe a data da
                consagração, e o caminho até lá é calculado para você.
              </p>

              <div className="mt-12">
                <FormularioCadastro />
              </div>
            </div>
          </div>
        </main>
      </div>
    </Passagem>
  );
}
