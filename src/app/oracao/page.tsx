import Link from "next/link";
import type { Metadata } from "next";
import { MomentoDeOracao } from "@/components/oracao/MomentoDeOracao";
import { Poeira } from "@/components/atmosphere/Poeira";

export const metadata: Metadata = {
  title: "Um momento de oração",
  description:
    "Uma oração breve para os momentos difíceis: uma palavra, uma prece e um silêncio.",
};

export default function Oracao() {
  return (
    <main
      data-sala="capela"
      className="luz-alta relative min-h-dvh overflow-hidden px-6 py-16 sm:px-10"
    >
      <Poeira className="absolute inset-0 -z-10 h-full w-full" />

      <div className="mx-auto max-w-[56ch]">
        <Link
          href="/caminho"
          className="text-sm text-[var(--texto-suave)] underline
            decoration-[color-mix(in_oklab,var(--color-ouro)_35%,transparent)] underline-offset-[6px]
            transition-colors hover:text-[var(--color-pergaminho)]"
        >
          Voltar
        </Link>

        <h1 className="mt-12 text-center font-[family-name:var(--font-livro)] text-[clamp(1.9rem,1.4rem+2.2vw,3rem)] leading-tight text-[var(--color-marfim)]">
          Um momento de oração
        </h1>

        <div
          aria-hidden
          className="mx-auto mt-8 h-px w-24 bg-[linear-gradient(to_right,transparent,var(--color-ouro),transparent)]"
        />
      </div>

      <div className="mt-14">
        <MomentoDeOracao />
      </div>
    </main>
  );
}
