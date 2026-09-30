import {
  diferencaEmDias,
  somarDias,
  type DataSimples,
} from "./dataSimples";
import { dataDaFesta, type Festa, type Ocorrencia } from "./festas";
import { ETAPAS, TOTAL_DIAS, type Etapa } from "@/lib/jornada/etapas";

/**
 * O cronograma da preparação.
 *
 * A consagração é feita no dia da festa. Os 33 dias a precedem, de modo que
 * o Dia 33 cai na véspera e o Dia 1 cai 33 dias antes da festa.
 * Para a Imaculada de 8 de dezembro, a preparação começa em 5 de novembro.
 */

export type BlocoDeEtapa = {
  etapa: Etapa;
  inicio: DataSimples;
  fim: DataSimples;
};

export type Cronograma = {
  /** O dia da consagração: a própria festa. */
  consagracao: DataSimples;
  festa: Festa;
  /** Dia 1 da preparação. */
  inicio: DataSimples;
  /** Dia 33, a véspera. */
  ultimoDia: DataSimples;
  blocos: BlocoDeEtapa[];
};

export function montarCronograma(festa: Festa, ano: number): Cronograma {
  const consagracao = dataDaFesta(festa, ano);
  return cronogramaPara(festa, consagracao);
}

function cronogramaPara(festa: Festa, consagracao: DataSimples): Cronograma {
  const inicio = somarDias(consagracao, -TOTAL_DIAS);

  return {
    consagracao,
    festa,
    inicio,
    ultimoDia: somarDias(consagracao, -1),
    blocos: ETAPAS.map((etapa) => ({
      etapa,
      inicio: dataDoDia(inicio, etapa.primeiroDia),
      fim: dataDoDia(inicio, etapa.primeiroDia + etapa.dias - 1),
    })),
  };
}

/** A data em que cai um dia da jornada, de 1 a 33. */
export function dataDoDia(inicio: DataSimples, dia: number): DataSimples {
  if (!Number.isInteger(dia) || dia < 1 || dia > TOTAL_DIAS) {
    throw new RangeError(`Dia fora da jornada: ${dia}.`);
  }
  return somarDias(inicio, dia - 1);
}

/** O número do dia da jornada correspondente a uma data, ou null se fora dela. */
export function diaNaData(
  inicio: DataSimples,
  data: DataSimples,
): number | null {
  const n = diferencaEmDias(inicio, data) + 1;
  return n >= 1 && n <= TOTAL_DIAS ? n : null;
}

/* ==========================================================================
   Situação da jornada em relação a hoje
   ========================================================================== */

export type Situacao =
  | { fase: "aguardando"; diasAteComecar: number }
  | { fase: "em-curso"; dia: number; etapa: Etapa; diasAteConsagracao: number }
  | { fase: "grande-dia" }
  | { fase: "consagrado"; diasDesdeConsagracao: number };

export function situacao(c: Cronograma, hoje: DataSimples): Situacao {
  const paraConsagracao = diferencaEmDias(hoje, c.consagracao);

  if (paraConsagracao === 0) return { fase: "grande-dia" };
  if (paraConsagracao < 0) {
    return { fase: "consagrado", diasDesdeConsagracao: -paraConsagracao };
  }

  const diasAteComecar = diferencaEmDias(hoje, c.inicio);
  if (diasAteComecar > 0) return { fase: "aguardando", diasAteComecar };

  const dia = diaNaData(c.inicio, hoje)!;
  return {
    fase: "em-curso",
    dia,
    etapa: ETAPAS.findLast((e) => dia >= e.primeiroDia)!,
    diasAteConsagracao: paraConsagracao,
  };
}

/* ==========================================================================
   Escolha da data
   ========================================================================== */

export type Opcao = Ocorrencia & {
  inicio: DataSimples;
  /** Dias entre hoje e o Dia 1. Zero quando a preparação começa hoje. */
  diasAteComecar: number;
  /** Falso quando o Dia 1 já passou: não dá mais tempo de fazer os 33 dias. */
  viavel: boolean;
};

/**
 * As datas que a pessoa ainda alcança, a partir de hoje.
 *
 * Uma festa só entra se o Dia 1 ainda não passou. Quem procura em 20 de
 * novembro já não chega à Imaculada deste ano, e o sistema precisa dizer
 * isso antes de a pessoa se decidir por ela.
 */
export function opcoesDeData(
  hoje: DataSimples,
  festas: readonly Festa[],
  quantidade = 12,
): Opcao[] {
  const anoBase = Number(hoje.slice(0, 4));

  return [anoBase, anoBase + 1]
    .flatMap((ano) =>
      festas.map((festa) => {
        const data = dataDaFesta(festa, ano);
        const inicio = somarDias(data, -TOTAL_DIAS);
        const diasAteComecar = diferencaEmDias(hoje, inicio);
        return {
          festa,
          data,
          inicio,
          diasAteComecar,
          viavel: diasAteComecar >= 0,
        };
      }),
    )
    .filter((o) => o.viavel)
    .sort((a, b) => a.data.localeCompare(b.data))
    .slice(0, quantidade);
}

/**
 * Modo flexível: começar hoje, sem ter escolhido uma data.
 * Devolve a festa cuja preparação começaria exatamente hoje ou logo depois —
 * a que melhor acolhe quem já quer dar o primeiro passo.
 */
export function comecarHoje(
  hoje: DataSimples,
  festas: readonly Festa[],
): Opcao | null {
  return opcoesDeData(hoje, festas, 1)[0] ?? null;
}
