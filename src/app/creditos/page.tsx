import Link from "next/link";
import type { Metadata } from "next";
import { CREDITOS } from "@/lib/imagens";

export const metadata: Metadata = { title: "Créditos das imagens" };

export default function Creditos() {
  return (
    <main data-sala="biblioteca" className="min-h-dvh px-6 py-24">
      <div className="mx-auto max-w-[62ch]">
        <h1 className="font-[family-name:var(--font-livro)] text-4xl text-[var(--color-marfim)]">
          Créditos das imagens
        </h1>

        <p className="voz-livro mt-8 text-[var(--texto-suave)]">
          As fotografias deste site vêm do Unsplash e são usadas sob a Licença
          Unsplash. A atribuição não é exigida por ela, mas é devida a quem fez
          o trabalho.
        </p>

        <ul className="mt-12 space-y-px">
          {CREDITOS.map((img) => (
            <li
              key={img.id}
              className="superficie-madeira flex flex-col gap-1 px-6 py-5"
            >
              <p className="font-[family-name:var(--font-livro)] text-lg text-[var(--color-marfim)]">
                {img.autor}
              </p>
              <p className="text-sm leading-relaxed text-[var(--texto-suave)]">
                {img.alt}
              </p>
              <a
                href={img.pagina}
                target="_blank"
                rel="noreferrer noopener"
                className="mt-1 w-fit text-sm text-[var(--color-ouro)] underline
                  decoration-[color-mix(in_oklab,var(--color-ouro)_40%,transparent)] underline-offset-[5px]"
              >
                Ver no Unsplash
              </a>
            </li>
          ))}
        </ul>

        <Link
          href="/"
          className="mt-14 inline-block text-sm text-[var(--texto-suave)] underline
            decoration-[color-mix(in_oklab,var(--color-ouro)_35%,transparent)] underline-offset-[6px]
            transition-colors hover:text-[var(--color-pergaminho)]"
        >
          Voltar ao início
        </Link>
      </div>
    </main>
  );
}
