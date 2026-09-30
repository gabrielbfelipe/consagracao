import { ViewTransition } from "react";

/**
 * A passagem de uma sala a outra.
 *
 * Quem troca de página deve sentir que atravessou um arco, e não que
 * mudou de aba. A sala que se deixa recua e desfoca; a que se entra chega
 * de leve e assenta. As curvas e durações estão em globals.css, sob a
 * classe "sala".
 *
 * Precisa ficar em cada page.tsx, e nunca no layout: layouts persistem
 * entre navegações, de modo que entrada e saída nunca disparariam ali.
 */
export function Passagem({ children }: { children: React.ReactNode }) {
  return (
    <ViewTransition enter="sala" exit="sala" default="none">
      {children}
    </ViewTransition>
  );
}
