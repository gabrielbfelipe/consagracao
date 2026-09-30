/**
 * Os sete passos de cada dia.
 *
 * O dia não é um texto longo entregue de uma vez: é uma condução. Cada passo
 * pede uma coisa só, e só depois abre o seguinte.
 */

export type PassoId =
  | "prepare"
  | "leia"
  | "medite"
  | "reze"
  | "reflita"
  | "pratique"
  | "registre";

export type Passo = {
  id: PassoId;
  /** O verbo, como aparece no topo da tela. */
  nome: string;
  /** O que se faz aqui, em uma linha, para quem chega sem saber. */
  instrucao: string;
};

export const PASSOS: readonly Passo[] = [
  {
    id: "prepare",
    nome: "Prepare-se",
    instrucao: "Deixe o dia do lado de fora antes de entrar.",
  },
  {
    id: "leia",
    nome: "Leia",
    instrucao: "O trecho de hoje, no seu exemplar do Tratado.",
  },
  {
    id: "medite",
    nome: "Medite",
    instrucao: "Poucas perguntas, para carregar e não para responder agora.",
  },
  {
    id: "reze",
    nome: "Reze",
    instrucao: "A oração própria deste dia.",
  },
  {
    id: "reflita",
    nome: "Reflita",
    instrucao: "Escreva o que ficou. Ninguém além de você lerá.",
  },
  {
    id: "pratique",
    nome: "Pratique",
    instrucao: "Algo concreto para levar ao longo do dia.",
  },
  {
    id: "registre",
    nome: "Registre",
    instrucao: "O que hoje deixou, guardado no seu diário.",
  },
] as const;

export const TOTAL_PASSOS = PASSOS.length;
