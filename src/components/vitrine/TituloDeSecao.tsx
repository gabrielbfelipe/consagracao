/**
 * O título de cada seção: uma linha em itálico sobre um título em versais,
 * separados por um filete de ouro. É o mesmo gesto de um frontispício —
 * anuncia-se o assunto antes de nomeá-lo.
 *
 * As cores vêm da sala (data-sala), e não de valores fixos, para que o mesmo
 * componente sirva sobre madeira escura e sobre pedra clara.
 */
export function TituloDeSecao({
  sobrenome,
  titulo,
  centrado = false,
}: {
  sobrenome: string;
  titulo: string;
  centrado?: boolean;
}) {
  return (
    <header className={centrado ? "text-center" : undefined}>
      <p className="font-[family-name:var(--font-livro)] text-[clamp(1.1rem,0.95rem+0.6vw,1.5rem)] text-[var(--realce)] italic">
        {sobrenome}
      </p>

      <h2 className="mt-3 font-[family-name:var(--font-livro)] text-[clamp(2rem,1.4rem+2.6vw,3.5rem)] leading-[1.08] tracking-[0.01em] text-balance text-[var(--texto)] uppercase">
        {titulo}
      </h2>

      <div
        aria-hidden
        className={`mt-7 h-px w-20 ${
          centrado
            ? "mx-auto bg-[linear-gradient(to_right,transparent,var(--realce),transparent)]"
            : "bg-[linear-gradient(to_right,var(--realce),transparent)]"
        }`}
      />
    </header>
  );
}

/** Algarismo romano decorativo, para as etapas numeradas. */
export function Algarismo({ n }: { n: number }) {
  const romanos = ["I", "II", "III", "IV", "V", "VI", "VII"];
  return (
    <span
      aria-hidden
      className="ouro font-[family-name:var(--font-livro)] text-4xl leading-none"
    >
      {romanos[n - 1] ?? n}
    </span>
  );
}
