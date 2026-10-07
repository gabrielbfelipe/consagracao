/**
 * Modo de ensaio: um caminho de teste para percorrer o sistema inteiro sem
 * esperar trinta e três dias.
 *
 * Existe porque não há como verificar o fluxo de ponta a ponta de outro
 * jeito: a jornada é toda derivada do calendário, e cada dia só abre quando
 * a data chega. Esperar um mês para descobrir que o dia 20 tem um defeito
 * não é opção.
 *
 * COMO SE LIGA
 * Pela variável NEXT_PUBLIC_MODO_ENSAIO=1. Desligada — que é o padrão, e o
 * que vale em produção quando ninguém a define — a data de ensaio não
 * aparece no calendário e as ações de avançar recusam-se a rodar. Nada no
 * modo de ensaio altera o conteúdo dos dias nem as regras da preparação:
 * mexe-se apenas nas datas da jornada, que é o que faz o tempo passar.
 *
 * O QUE ELE NÃO É
 * Não é um atalho devocional. A data de ensaio não é uma festa de Nossa
 * Senhora e nunca entra na lista das vinte e quatro: fica marcada como
 * ensaio, aparece à parte e diz na cara o que é.
 */
import { TOTAL_DIAS } from "@/lib/jornada/etapas";

/**
 * O Grande Dia é o dia seguinte ao 33, e por isso o ensaio vai até 34.
 *
 * Mora aqui, e não junto das ações, porque um arquivo "use server" só pode
 * exportar funções assíncronas — exportar uma constante de lá derruba a
 * aplicação inteira na compilação.
 */
export const DIA_DA_CONSAGRACAO = TOTAL_DIAS + 1;

export const MODO_ENSAIO = process.env.NEXT_PUBLIC_MODO_ENSAIO === "1";

/** O identificador da data de ensaio, usado em festas.ts e nas ações. */
export const FESTA_DE_ENSAIO = "dia-de-ensaio";

/** Lança quando alguém chama uma ação de ensaio com o modo desligado. */
export function exigirModoEnsaio() {
  if (!MODO_ENSAIO) {
    throw new Error(
      "O modo de ensaio está desligado. Defina NEXT_PUBLIC_MODO_ENSAIO=1.",
    );
  }
}
