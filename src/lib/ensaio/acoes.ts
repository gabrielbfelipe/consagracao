"use server";

import { revalidatePath } from "next/cache";
import { clienteServidor, usuarioAtual } from "@/lib/supabase/servidor";
import { hojeEm, somarDias, dataSimples } from "@/lib/agenda/dataSimples";
import { TOTAL_DIAS } from "@/lib/jornada/etapas";
import { DIA_DA_CONSAGRACAO, exigirModoEnsaio } from "./modo";

/**
 * Faz o tempo passar na jornada de ensaio.
 *
 * O sistema inteiro deriva o dia de hoje do calendário: a jornada guarda a
 * data de início e a da consagração, e o dia atual é a diferença entre o
 * início e hoje. Para andar no tempo sem mexer no relógio, portanto, basta
 * mover as duas datas para trás. Mover as duas juntas preserva a regra que
 * o banco cobra — `inicio = consagracao - 33` —, de modo que nenhum estado
 * impossível pode ser gravado por aqui.
 *
 * O progresso já marcado não se perde: ele é guardado por número de dia, e
 * não por data.
 *
 * Só funciona com o modo de ensaio ligado e só sobre a jornada de ensaio.
 * As duas condições são verificadas no servidor, e não na tela.
 */

/**
 * Põe a jornada no dia pedido, de 1 a 34, sendo 34 o Grande Dia.
 *
 * Em vez de somar ou subtrair sobre o que está lá, calcula as datas a
 * partir de hoje. Assim o resultado não depende do estado anterior e não
 * acumula erro quando se clica depressa várias vezes seguidas.
 */
export async function irParaODia(alvo: number) {
  exigirModoEnsaio();

  if (!Number.isInteger(alvo) || alvo < 1 || alvo > DIA_DA_CONSAGRACAO) {
    throw new RangeError(`Dia fora do ensaio: ${alvo}.`);
  }

  const usuario = await usuarioAtual();
  if (!usuario) throw new Error("Não há sessão.");

  const supabase = await clienteServidor();

  const { data: perfil } = await supabase
    .from("perfis")
    .select("fuso")
    .eq("id", usuario.id)
    .maybeSingle<{ fuso: string }>();

  const { data: jornada } = await supabase
    .from("jornadas")
    .select("id, festa_id")
    .order("criado_em", { ascending: false })
    .limit(1)
    .maybeSingle<{ id: string; festa_id: string }>();

  if (!jornada) throw new Error("Não há jornada para ensaiar.");
  if (jornada.festa_id !== "dia-de-ensaio") {
    throw new Error(
      "Os controles de ensaio só agem sobre a jornada de ensaio, nunca sobre uma preparação de verdade.",
    );
  }

  const hoje = hojeEm(perfil?.fuso ?? "America/Sao_Paulo");
  const inicio = somarDias(hoje, -(alvo - 1));
  const consagracao = somarDias(inicio, TOTAL_DIAS);

  const { error } = await supabase
    .from("jornadas")
    .update({
      inicio: dataSimples(inicio),
      consagracao: dataSimples(consagracao),
      status: alvo > TOTAL_DIAS ? "grande_dia" : "ativa",
    })
    .eq("id", jornada.id);

  if (error) throw new Error(error.message);

  // Marca tudo o que depende da jornada como obsoleto no servidor. Não
  // basta, sozinho: quando o botão que chama esta ação já está na mesma
  // página para onde se voltaria, o redirect() de um Server Action vira uma
  // navegação do lado do cliente, e o roteador pode reaproveitar o que já
  // tinha em cache em vez de buscar de novo — a ação respondia 200, a data
  // mudava no banco, e a régua continuava a dizer o dia antigo. Por isso
  // quem chama esta função também chama router.refresh() em seguida; ver
  // BarraDeEnsaio.tsx.
  revalidatePath("/", "layout");
}

/**
 * Apaga a jornada de ensaio, para recomeçar do zero.
 *
 * Sem redirect() aqui: é chamada diretamente por um onClick, não por um
 * <form>, e quem navega depois é o cliente — em BarraDeEnsaio.tsx — com
 * router.push() seguido de router.refresh(), pelo mesmo motivo de
 * irParaODia acima.
 */
export async function apagarEnsaio() {
  exigirModoEnsaio();

  const usuario = await usuarioAtual();
  if (!usuario) throw new Error("Não há sessão.");

  const supabase = await clienteServidor();
  const { error } = await supabase
    .from("jornadas")
    .delete()
    .eq("perfil_id", usuario.id)
    .eq("festa_id", "dia-de-ensaio");

  if (error) throw new Error(error.message);

  revalidatePath("/", "layout");
}
