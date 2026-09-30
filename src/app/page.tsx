import Link from "next/link";
import { Nave } from "@/components/atmosphere/Nave";

export default function Entrada() {
  return (
    <main
      data-sala="biblioteca"
      className="luz-alta relative flex min-h-dvh flex-col items-center justify-center overflow-hidden px-6 py-20 text-center"
    >
      <Nave className="chega-nave pointer-events-none absolute inset-0 -z-10 h-full w-full" />

      {/* O chão escurece para que o texto tenha onde assentar. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-2/3 bg-[linear-gradient(to_top,var(--color-sombra),transparent)]"
      />

      <h1
        className="chega max-w-[19ch] font-[family-name:var(--font-livro)] text-[clamp(2.25rem,1.4rem+3.6vw,4.25rem)] leading-[1.12] font-normal text-balance text-[var(--color-marfim)]"
        style={{ "--espera": "500ms" } as React.CSSProperties}
      >
        Comece sua jornada de preparação para a Consagração a Nossa Senhora
      </h1>

      <div
        className="chega mt-10 h-px w-28 bg-[linear-gradient(to_right,transparent,var(--color-ouro),transparent)]"
        style={{ "--espera": "1100ms" } as React.CSSProperties}
        aria-hidden
      />

      <p
        className="chega voz-livro mt-10 text-[var(--texto-suave)]"
        style={{ "--espera": "1300ms" } as React.CSSProperties}
      >
        Trinta e três dias de leitura, oração e silêncio, segundo o método de
        São Luís Maria Grignion de Montfort. Você escolhe a data em que deseja
        se consagrar; o caminho até ela é preparado para você, dia por dia.
      </p>

      <div
        className="chega mt-12 flex flex-col items-center gap-6"
        style={{ "--espera": "1700ms" } as React.CSSProperties}
      >
        <Link
          href="/guia"
          className="brilho-borda superficie-vidro group inline-flex items-center px-12 py-4
            font-[family-name:var(--font-livro)] text-lg tracking-[0.3em] indent-[0.3em] text-[var(--color-marfim)]
            uppercase transition-[box-shadow,color] duration-500 ease-[var(--ease-santuario)]
            hover:text-[var(--color-ouro-luz)]
            hover:shadow-[inset_0_0_0_1px_var(--color-ouro),0_0_32px_-10px_color-mix(in_oklab,var(--color-ouro)_70%,transparent)]"
        >
          Entrar
        </Link>

        <Link
          href="/caminho"
          className="font-[family-name:var(--font-interface)] text-sm text-[var(--texto-suave)]
            underline decoration-[color-mix(in_oklab,var(--color-ouro)_45%,transparent)] underline-offset-[6px]
            transition-colors duration-300 hover:text-[var(--color-pergaminho)]"
        >
          Já comecei minha jornada
        </Link>
      </div>
    </main>
  );
}
