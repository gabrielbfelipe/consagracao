import Image from "next/image";
import { PorticoDaSala } from "@/components/navegacao/PorticoDaSala";
import type { Metadata } from "next";
import {
  CREDITOS,
  IMAGENS,
  urlDaImagem,
  type NomeDaImagem,
} from "@/lib/imagens";
import { Rodape } from "@/components/vitrine/Rodape";
import { Passagem } from "@/components/atmosphere/Passagem";

export const metadata: Metadata = {
  title: "Créditos das imagens",
  description: "Quem fez as fotografias que compõem este santuário.",
};

export default function Creditos() {
  const nomes = Object.keys(IMAGENS) as NomeDaImagem[];

  return (
    <Passagem>
      <div className="min-h-dvh">
        <PorticoDaSala />

        <main data-sala="pedra" className="bg-[var(--fundo)]">
          <div className="mx-auto max-w-[100rem] px-6 py-20 sm:px-10 lg:py-28">
            <header className="mx-auto max-w-[62ch] text-center">
              <p className="font-[family-name:var(--font-livro)] text-[var(--realce)] italic">
                A quem se deve
              </p>

              <h1 className="mt-3 font-[family-name:var(--font-livro)] text-[clamp(2rem,1.5rem+2vw,3rem)] leading-[1.06] text-[var(--texto)] uppercase">
                Créditos das imagens
              </h1>

              <div
                aria-hidden
                className="mx-auto mt-8 h-px w-24 bg-[linear-gradient(to_right,transparent,var(--realce),transparent)]"
              />

              <p className="voz-livro mx-auto mt-8 text-[var(--texto-suave)]">
                As fotografias deste site vêm do Unsplash e são usadas sob a
                Licença Unsplash. A atribuição não é exigida por ela, mas é
                devida a quem fez o trabalho.
              </p>
            </header>

            <ul className="mt-20 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
              {nomes.map((nome) => {
                const img = IMAGENS[nome];
                return (
                  <li key={img.id} className="assenta">
                    <a
                      href={img.pagina}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="group block"
                    >
                      <div className="relative aspect-[4/3] overflow-hidden">
                        <Image
                          src={urlDaImagem(nome, {
                            largura: 700,
                            qualidade: 62,
                          })}
                          alt={img.alt}
                          fill
                          sizes="(max-width: 40rem) 100vw, (max-width: 64rem) 50vw, 33vw"
                          className="object-cover transition-transform duration-[1200ms] ease-[var(--ease-santuario)] group-hover:scale-[1.04]"
                        />
                      </div>

                      <p className="mt-4 font-[family-name:var(--font-livro)] text-xl text-[var(--texto)] transition-colors duration-500 group-hover:text-[var(--realce)]">
                        {img.autor}
                      </p>
                      <p className="mt-1 text-sm leading-relaxed text-[var(--texto-suave)]">
                        {img.alt}
                      </p>
                    </a>
                  </li>
                );
              })}
            </ul>

            <p className="mt-16 text-center text-sm text-[color-mix(in_oklab,var(--texto)_55%,transparent)]">
              {CREDITOS.length} fotografias, todas de licença livre.
            </p>
          </div>
        </main>

        <Rodape />
      </div>
    </Passagem>
  );
}
