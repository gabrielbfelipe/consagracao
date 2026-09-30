/**
 * As quatro etapas da preparação de São Luís Maria Grignion de Montfort:
 * doze dias preliminares, para desprender-se do espírito do mundo, e depois
 * três semanas — conhecimento de si, de Nossa Senhora e de Jesus Cristo.
 */

export const TOTAL_DIAS = 33;

export type EtapaId =
  | "preliminares"
  | "conhecimento-de-si"
  | "conhecimento-de-maria"
  | "conhecimento-de-jesus";

export type Etapa = {
  id: EtapaId;
  nome: string;
  /** Usado sob a colunata, onde só cabem duas ou três palavras. */
  rotuloCurto: string;
  primeiroDia: number;
  dias: number;
  /** O que a pessoa busca nesta etapa, em uma frase. */
  proposito: string;
  /** A sala vai clareando conforme a jornada avança. */
  sala: "biblioteca" | "estudo" | "capela";
};

export const ETAPAS: readonly Etapa[] = [
  {
    id: "preliminares",
    nome: "Dias preliminares",
    rotuloCurto: "Preliminares",
    primeiroDia: 1,
    dias: 12,
    proposito:
      "Desprender-se do espírito do mundo, que se opõe ao espírito de Jesus Cristo.",
    sala: "biblioteca",
  },
  {
    id: "conhecimento-de-si",
    nome: "Conhecimento de si mesmo",
    rotuloCurto: "Conhecimento de si",
    primeiroDia: 13,
    dias: 7,
    proposito:
      "Olhar para dentro com verdade e mansidão, reconhecendo a própria pobreza e a necessidade de socorro.",
    sala: "estudo",
  },
  {
    id: "conhecimento-de-maria",
    nome: "Conhecimento de Nossa Senhora",
    rotuloCurto: "Nossa Senhora",
    primeiroDia: 20,
    dias: 7,
    proposito:
      "Aprofundar a compreensão sobre aquela que conduz seus filhos a Cristo.",
    sala: "capela",
  },
  {
    id: "conhecimento-de-jesus",
    nome: "Conhecimento de Jesus Cristo",
    rotuloCurto: "Jesus Cristo",
    primeiroDia: 27,
    dias: 7,
    proposito:
      "Chegar a Cristo pelas mãos de Maria, que é o fim de todo este caminho.",
    sala: "capela",
  },
] as const;

/** A etapa a que pertence um dia de 1 a 33. */
export function etapaDoDia(dia: number): Etapa {
  if (!Number.isInteger(dia) || dia < 1 || dia > TOTAL_DIAS) {
    throw new RangeError(
      `Dia fora da jornada: ${dia}. Esperado um inteiro de 1 a ${TOTAL_DIAS}.`,
    );
  }

  // As etapas cobrem 1..33 sem lacunas, então sempre há uma correspondência.
  return ETAPAS.findLast((e) => dia >= e.primeiroDia)!;
}

/** Posição do dia dentro da própria etapa, a partir de 1. */
export function diaNaEtapa(dia: number): number {
  return dia - etapaDoDia(dia).primeiroDia + 1;
}
