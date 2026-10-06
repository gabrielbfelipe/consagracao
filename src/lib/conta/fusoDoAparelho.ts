"use client";

import { useSyncExternalStore } from "react";

export const FUSO_PADRAO = "America/Sao_Paulo";

/**
 * O fuso horário do aparelho.
 *
 * Parece um caso de useEffect com setState, e era assim que estava escrito.
 * Não é: o fuso não muda enquanto a página vive, de modo que não há o que
 * sincronizar — há um valor que o servidor não pode conhecer e o navegador
 * sim. Para isso existe useSyncExternalStore, que recebe os dois instantâneos
 * e deixa o React reconciliar sozinho, sem render em cascata e sem o aviso de
 * hidratação que uma leitura direta de Intl no corpo do componente provocaria.
 *
 * No servidor, e em qualquer aparelho que não saiba responder, fica o fuso
 * brasileiro — que é o de quase todo mundo aqui, e é corrigível na tela.
 */
export function useFusoDoAparelho(): string {
  return useSyncExternalStore(assinar, instantaneo, instantaneoNoServidor);
}

/** Nada a observar: o fuso do aparelho não muda durante a visita. */
function assinar() {
  return () => {};
}

function instantaneo(): string {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone || FUSO_PADRAO;
  } catch {
    return FUSO_PADRAO;
  }
}

function instantaneoNoServidor(): string {
  return FUSO_PADRAO;
}
