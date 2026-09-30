"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Poeira } from "@/components/atmosphere/Poeira";

/**
 * Modo Silêncio.
 *
 * A interface some. Fica uma oração curta, uma luz e nada mais. Até a saída
 * se apaga depois de um tempo parado, e só reaparece ao primeiro movimento —
 * quem entra aqui não deveria ter um botão pedindo atenção no canto da tela.
 */

const ORACOES = [
  "Eis-me aqui.",
  "Falai, Senhor, que o vosso servo escuta.",
  "Meu Deus e meu tudo.",
  "Totus tuus — inteiramente vosso.",
  "Jesus vivente em Maria, vinde viver em mim.",
];

export function TelaDeSilencio() {
  const [oracao] = useState(
    () => ORACOES[Math.floor(Math.random() * ORACOES.length)],
  );
  const [mostraSaida, setMostraSaida] = useState(true);

  useEffect(() => {
    let temporizador: ReturnType<typeof setTimeout>;

    function adiar() {
      setMostraSaida(true);
      clearTimeout(temporizador);
      temporizador = setTimeout(() => setMostraSaida(false), 4000);
    }

    adiar();
    const eventos = ["pointermove", "keydown", "touchstart", "scroll"] as const;
    eventos.forEach((e) =>
      window.addEventListener(e, adiar, { passive: true }),
    );

    return () => {
      clearTimeout(temporizador);
      eventos.forEach((e) => window.removeEventListener(e, adiar));
    };
  }, []);

  return (
    <main
      data-sala="capela"
      className="relative flex min-h-dvh items-center justify-center overflow-hidden px-8"
    >
      <Poeira densidade={0.00005} className="absolute inset-0 h-full w-full" />

      {/* Uma única fonte de luz, muito acima. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0
          bg-[radial-gradient(ellipse_52%_44%_at_50%_16%,rgba(255,240,205,0.13),transparent_72%)]"
      />

      <p
        className="relative max-w-[22ch] text-center font-[family-name:var(--font-livro)]
        text-[clamp(1.75rem,1.2rem+2.6vw,3rem)] leading-[1.4] text-balance
        text-[color-mix(in_oklab,var(--color-marfim)_88%,transparent)]"
      >
        {oracao}
      </p>

      <Link
        href="/caminho"
        className={`absolute bottom-10 left-1/2 -translate-x-1/2 font-[family-name:var(--font-interface)]
          text-sm text-[color-mix(in_oklab,var(--color-pergaminho)_45%,transparent)]
          transition-opacity duration-[1400ms] ease-[var(--ease-santuario)]
          hover:text-[var(--color-pergaminho)] focus-visible:opacity-100
          ${mostraSaida ? "opacity-100" : "opacity-0"}`}
      >
        Sair do silêncio
      </Link>
    </main>
  );
}
