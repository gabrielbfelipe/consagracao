"use client";

import { MotionConfig } from "motion/react";

/**
 * Faz o respeito por "menos movimento" valer em toda a casa.
 *
 * Por que aqui e não em cada componente: useReducedMotion() devolve null no
 * servidor e o valor verdadeiro no navegador. Quem ramifica os estilos com
 * ele renderiza uma coisa no servidor e outra no cliente, e a hidratação
 * acusa a diferença. O MotionConfig resolve por dentro, sem que a marcação
 * inicial mude.
 */
export function Movimento({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
