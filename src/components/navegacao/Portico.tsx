import Link from "next/link";
import { sair } from "@/app/conta/acoes";

/**
 * O pórtico: a faixa discreta no alto das salas internas.
 *
 * Não é barra de aplicativo. É uma inscrição sobre a porta — letra pequena,
 * capitulares espaçadas, nada de ícones. Some do caminho quando não se olha
 * para ela.
 */

const SALAS = [
  { href: "/caminho", nome: "Meu caminho" },
  { href: "/biblioteca", nome: "Biblioteca" },
  { href: "/diario", nome: "Diário" },
  { href: "/calendario", nome: "Calendário" },
] as const;

export function Portico({ autenticado }: { autenticado: boolean }) {
  return (
    <header className="relative z-20 flex flex-wrap items-center justify-between gap-x-8 gap-y-4 px-6 py-5 sm:px-10">
      <nav aria-label="Salas" className="flex flex-wrap items-center gap-x-7 gap-y-2">
        {SALAS.map((sala) => (
          <Link
            key={sala.href}
            href={sala.href}
            className="font-[family-name:var(--font-livro)] text-[0.9rem] tracking-[0.18em] uppercase
              text-[color-mix(in_oklab,var(--texto)_58%,transparent)]
              transition-colors duration-500 ease-[var(--ease-santuario)]
              hover:text-[var(--color-ouro-luz)]"
          >
            {sala.nome}
          </Link>
        ))}
      </nav>

      <div className="flex items-center gap-7">
        <Link
          href="/oracao"
          className="font-[family-name:var(--font-livro)] text-[0.9rem] tracking-[0.14em]
            text-[var(--color-ouro)] transition-colors duration-500 hover:text-[var(--color-ouro-luz)]"
        >
          Preciso de um momento de oração
        </Link>

        {autenticado && (
          <form action={sair}>
            <button
              type="submit"
              className="font-[family-name:var(--font-interface)] text-sm
                text-[color-mix(in_oklab,var(--texto)_45%,transparent)]
                transition-colors duration-500 hover:text-[var(--texto)]"
            >
              Sair
            </button>
          </form>
        )}
      </div>
    </header>
  );
}
