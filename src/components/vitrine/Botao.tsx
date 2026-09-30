import Link from "next/link";

/**
 * O botão da casa: sem preenchimento, apenas um filete de metal em volta.
 * As cores vêm da sala, para servir tanto sobre madeira escura quanto
 * sobre pedra clara.
 */
export function Botao({
  href,
  children,
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`brilho-borda inline-flex items-center px-12 py-4
        font-[family-name:var(--font-livro)] text-base tracking-[0.28em] indent-[0.28em] uppercase
        text-[var(--texto)]
        shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--realce)_75%,transparent)]
        transition-[box-shadow,color] duration-500 ease-[var(--ease-santuario)]
        hover:text-[var(--realce)] hover:shadow-[inset_0_0_0_2px_var(--realce)] ${className}`}
    >
      {children}
    </Link>
  );
}

/** Um elo discreto, sublinhado, para "saber mais". */
export function EloDeTexto({
  href,
  children,
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`inline-block font-[family-name:var(--font-livro)] text-base tracking-[0.14em] uppercase
        text-[var(--realce)] underline decoration-[color-mix(in_oklab,var(--realce)_45%,transparent)]
        underline-offset-[9px] transition-colors duration-500 hover:decoration-[var(--realce)] ${className}`}
    >
      {children}
    </Link>
  );
}
