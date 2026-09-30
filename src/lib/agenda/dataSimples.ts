/**
 * Datas de calendário, sem hora e sem fuso.
 *
 * A jornada acontece em dias do calendário, não em instantes: o Dia 1 de
 * quem está em Manaus começa na mesma data que o de quem está em Lisboa.
 * Toda a aritmética é feita em UTC para que o horário de verão nunca
 * empurre uma data para o dia anterior.
 */

/** Data no formato ISO `AAAA-MM-DD`. */
export type DataSimples = string & { readonly __marca: "DataSimples" };

const FORMATO = /^\d{4}-\d{2}-\d{2}$/;

export function dataSimples(iso: string): DataSimples {
  if (!FORMATO.test(iso)) {
    throw new TypeError(`Data inválida: "${iso}". Esperado AAAA-MM-DD.`);
  }
  const d = paraUTC(iso as DataSimples);
  if (deUTC(d) !== iso) {
    throw new RangeError(`Data inexistente no calendário: "${iso}".`);
  }
  return iso as DataSimples;
}

export function criarData(ano: number, mes: number, dia: number): DataSimples {
  const iso = `${String(ano).padStart(4, "0")}-${String(mes).padStart(2, "0")}-${String(dia).padStart(2, "0")}`;
  return dataSimples(iso);
}

function paraUTC(d: DataSimples): Date {
  const [ano, mes, dia] = d.split("-").map(Number);
  return new Date(Date.UTC(ano, mes - 1, dia));
}

function deUTC(d: Date): string {
  return d.toISOString().slice(0, 10);
}

/** Soma dias (aceita negativo) devolvendo outra data de calendário. */
export function somarDias(d: DataSimples, dias: number): DataSimples {
  const base = paraUTC(d);
  base.setUTCDate(base.getUTCDate() + dias);
  return deUTC(base) as DataSimples;
}

/** Quantos dias de `de` até `ate`. Negativo se `ate` já passou. */
export function diferencaEmDias(de: DataSimples, ate: DataSimples): number {
  const MS_POR_DIA = 86_400_000;
  return Math.round((paraUTC(ate).getTime() - paraUTC(de).getTime()) / MS_POR_DIA);
}

export function ano(d: DataSimples): number {
  return Number(d.slice(0, 4));
}

/** 0 = domingo, 6 = sábado. */
export function diaDaSemana(d: DataSimples): number {
  return paraUTC(d).getUTCDay();
}

export function eAnterior(a: DataSimples, b: DataSimples): boolean {
  return a < b;
}

/**
 * A data de hoje no fuso da pessoa, como data de calendário.
 * Sem isso, alguém no Brasil às 22h veria o dia seguinte se usássemos UTC.
 */
export function hojeEm(fuso: string, agora: Date = new Date()): DataSimples {
  // en-CA formata como AAAA-MM-DD, que é exatamente o que guardamos.
  const iso = new Intl.DateTimeFormat("en-CA", {
    timeZone: fuso,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(agora);
  return dataSimples(iso);
}

const NOMES_MES = [
  "janeiro", "fevereiro", "março", "abril", "maio", "junho",
  "julho", "agosto", "setembro", "outubro", "novembro", "dezembro",
];

/** "8 de dezembro de 2026" */
export function porExtenso(d: DataSimples): string {
  const [a, m, dia] = d.split("-").map(Number);
  return `${dia} de ${NOMES_MES[m - 1]} de ${a}`;
}

/** "8 de dezembro" — quando o ano já está claro no contexto. */
export function diaEMes(d: DataSimples): string {
  const [, m, dia] = d.split("-").map(Number);
  return `${dia} de ${NOMES_MES[m - 1]}`;
}
