import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { MomentoDeOracao } from "@/components/oracao/MomentoDeOracao";
import { Poeira } from "@/components/atmosphere/Poeira";
import { Passagem } from "@/components/atmosphere/Passagem";
import { urlDaImagem } from "@/lib/imagens";

export const metadata: Metadata = {
  title: "Um momento de oração",
  description:
    "Uma oração breve para os momentos difíceis: uma palavra, uma prece e um silêncio.",
};

/**
 * Esta sala não recebe o pórtico nem o rodapé.
 *
 * Quem abre esta página está em dificuldade, e um menu com sete portas é
 * exatamente o contrário do que ela precisa. Fica uma saída, e nada mais.
 */
export default function Oracao() {
  return (
    <Passagem>
      <main
        data-sala="capela"
        className="relative min-h-dvh overflow-hidden px-6 py-14 sm:px-10"
      >
        <div aria-hidden className="absolute inset-0">
          <Image
            src={urlDaImagem("velas", { largura: 1800, qualidade: 66 })}
            alt=""
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-[color-mix(in_oklab,var(--color-azul-profundo)_88%,transparent)]" />
        </div>

        <Poeira className="absolute inset-0 h-full w-full" />

        <div className="relative mx-auto max-w-[56ch]">
          <Link
            href="/caminho"
            className="text-sm text-[var(--texto-suave)] underline
            decoration-[color-mix(in_oklab,var(--color-ouro)_35%,transparent)] underline-offset-[6px]
            transition-colors hover:text-[var(--color-pergaminho)]"
          >
            Voltar
          </Link>

          <header className="mt-14 text-center">
            <p className="font-[family-name:var(--font-livro)] text-[clamp(1.1rem,0.95rem+0.6vw,1.5rem)] text-[var(--color-ouro)] italic">
              Fique um pouco
            </p>

            <h1 className="mt-3 font-[family-name:var(--font-livro)] text-[clamp(1.9rem,1.4rem+2.2vw,3rem)] leading-[1.08] text-[var(--color-marfim)] uppercase">
              Um momento de oração
            </h1>

            <div
              aria-hidden
              className="mx-auto mt-8 h-px w-24 bg-[linear-gradient(to_right,transparent,var(--color-ouro),transparent)]"
            />
          </header>
        </div>

        <div className="relative mt-14">
          <MomentoDeOracao />
        </div>
      </main>
    </Passagem>
  );
}
