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

const ORDEM = new Map(PASSOS.map((p, i) => [p.id, i]));

/** Se um texto é o identificador de um dos sete passos. */
export function ePasso(valor: string): valor is PassoId {
  return ORDEM.has(valor as PassoId);
}

/**
 * Junta os passos já guardados com os novos, sem repetir e na ordem do dia.
 *
 * Junta, e nunca substitui: um passo marcado não se desmarca. A versão antiga
 * gravava por cima a lista que tinha lido, e quando duas marcações chegavam
 * juntas a segunda apagava o passo da primeira — foi assim que dias inteiros
 * ficaram abertos com os sete passos percorridos.
 */
export function unirPassos(
  ...listas: readonly (readonly string[])[]
): PassoId[] {
  const todos = new Set<PassoId>();
  for (const lista of listas) {
    for (const p of lista) if (ePasso(p)) todos.add(p);
  }
  return [...todos].sort((a, b) => ORDEM.get(a)! - ORDEM.get(b)!);
}

/** O dia fecha quando os sete passos estão guardados, e só então. */
export function diaCompleto(passos: readonly string[]): boolean {
  return PASSOS.every((p) => passos.includes(p.id));
}

/**
 * Até onde a barra de passos deixa ir.
 *
 * O dia é uma condução: cada passo abre o seguinte. Pode-se voltar a qualquer
 * passo, e avançar só até o primeiro que ainda não foi feito. Antes, a barra
 * deixava saltar do primeiro para o sétimo, e os passos do meio nunca eram
 * marcados — o dia ficava aberto sem a pessoa saber por quê.
 */
export function passoAlcancavel(
  alvo: number,
  atual: number,
  feitos: ReadonlySet<string>,
): boolean {
  if (alvo <= atual + 1) return true;
  return PASSOS.slice(0, alvo).every((p) => feitos.has(p.id));
}
