import { clienteServidor } from "@/lib/supabase/servidor";
import { dataSimples, hojeEm, type DataSimples } from "@/lib/agenda/dataSimples";
import { festaPorId, type Festa, type FestaId } from "@/lib/agenda/festas";
import {
  cronogramaPara,
  situacao,
  type Cronograma,
  type Situacao,
} from "@/lib/agenda/cronograma";
import type { PassoId } from "./passos";
import { ETAPAS, TOTAL_DIAS } from "./etapas";

/**
 * Leitura da jornada de quem está autenticado.
 *
 * Nenhuma destas funções filtra por dono: quem faz isso é o RLS no banco.
 * Se uma consulta aqui trouxesse a jornada de outra pessoa, o problema
 * estaria na política, e é lá que ele deve ser corrigido.
 */

export type StatusJornada =
  | "planejada"
  | "ativa"
  | "pausada"
  | "grande_dia"
  | "pos";

export type Jornada = {
  id: string;
  festa: Festa;
  consagracao: DataSimples;
  inicio: DataSimples;
  cronograma: Cronograma;
  status: StatusJornada;
  planoLeitura: "antes" | "durante";
  /** Dia → passos já concluídos naquele dia. */
  progresso: Map<number, PassoId[]>;
  /** Dias inteiramente concluídos. */
  concluidos: number[];
  hoje: DataSimples;
  situacao: Situacao;
};

type LinhaJornada = {
  id: string;
  festa_id: string;
  consagracao: string;
  inicio: string;
  status: StatusJornada;
  plano_leitura: "antes" | "durante";
};

type LinhaProgresso = {
  dia: number;
  passos: string[];
  concluido_em: string | null;
};

/** A jornada mais recente da pessoa, ou null se ainda não escolheu data. */
export async function jornadaAtual(): Promise<Jornada | null> {
  const supabase = await clienteServidor();

  const { data: perfil } = await supabase
    .from("perfis")
    .select("fuso")
    .maybeSingle();

  const { data: linha } = await supabase
    .from("jornadas")
    .select("id, festa_id, consagracao, inicio, status, plano_leitura")
    .order("criado_em", { ascending: false })
    .limit(1)
    .maybeSingle<LinhaJornada>();

  if (!linha) return null;

  const { data: dias } = await supabase
    .from("progresso_dias")
    .select("dia, passos, concluido_em")
    .eq("jornada_id", linha.id)
    .returns<LinhaProgresso[]>();

  const progresso = new Map<number, PassoId[]>();
  const concluidos: number[] = [];

  for (const d of dias ?? []) {
    progresso.set(d.dia, d.passos as PassoId[]);
    if (d.concluido_em) concluidos.push(d.dia);
  }

  const hoje = hojeEm(perfil?.fuso ?? "America/Sao_Paulo");
  const festa = festaPorId(linha.festa_id as FestaId);
  const cronograma = cronogramaPara(festa, dataSimples(linha.consagracao));

  return {
    id: linha.id,
    festa,
    consagracao: cronograma.consagracao,
    inicio: cronograma.inicio,
    cronograma,
    status: linha.status,
    planoLeitura: linha.plano_leitura,
    progresso,
    concluidos: concluidos.sort((a, b) => a - b),
    hoje,
    situacao: situacao(cronograma, hoje),
  };
}

/**
 * O dia que a pessoa deve estar vivendo agora.
 *
 * Não é simplesmente a data de hoje: quem se atrasou continua de onde parou.
 * Toma-se o menor entre o dia do calendário e o primeiro dia ainda não
 * concluído, para que ninguém seja empurrado adiante por um dia perdido.
 */
export function diaCorrente(j: Jornada): number {
  const primeiroEmAberto =
    Array.from({ length: TOTAL_DIAS }, (_, i) => i + 1).find(
      (d) => !j.concluidos.includes(d),
    ) ?? TOTAL_DIAS;

  if (j.situacao.fase === "aguardando") return 1;
  if (j.situacao.fase !== "em-curso") return primeiroEmAberto;

  return Math.min(j.situacao.dia, primeiroEmAberto);
}

/** Quantos dias de calendário se passaram sem que a jornada avançasse. */
export function diasEmAtraso(j: Jornada): number {
  if (j.situacao.fase !== "em-curso") return 0;
  return Math.max(0, j.situacao.dia - diaCorrente(j));
}

export const ETAPAS_DA_JORNADA = ETAPAS;
