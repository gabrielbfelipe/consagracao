"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { clienteServidor, usuarioAtual } from "@/lib/supabase/servidor";
import { dataDaFesta, festaPorId, type FestaId } from "@/lib/agenda/festas";
import { MODO_ENSAIO } from "@/lib/ensaio/modo";
import { cronogramaPara } from "@/lib/agenda/cronograma";
import { dataSimples, hojeEm } from "@/lib/agenda/dataSimples";
import { TOTAL_DIAS } from "./etapas";
import { PASSOS, type PassoId } from "./passos";

/**
 * Registra a data escolhida e abre a jornada.
 *
 * As datas são recalculadas aqui a partir do identificador da festa: o que
 * vem do formulário é apenas a escolha, nunca o cronograma já pronto.
 */
export async function escolherData(dados: FormData) {
  const festaId = String(dados.get("festa") ?? "") as FestaId;
  const ano = Number(dados.get("ano"));

  const usuario = await usuarioAtual();
  if (!usuario) {
    redirect(
      `/entrar?destino=${encodeURIComponent(`/calendario/${festaId}?ano=${ano}`)}`,
    );
  }

  const festa = festaPorId(festaId);
  if (!Number.isInteger(ano)) {
    throw new Error("Ano inválido.");
  }

  // A data de ensaio não é festa de Nossa Senhora. Com o modo desligado ela
  // nem aparece no calendário, mas quem conhecesse o endereço ainda poderia
  // enviar o formulário; é aqui que isso para.
  if (festa.ensaio && !MODO_ENSAIO) {
    throw new Error("Esta data não está disponível.");
  }

  const cronograma = cronogramaPara(festa, dataDaFesta(festa, ano));
  const hoje = hojeEm("America/Sao_Paulo");

  if (cronograma.inicio < hoje) {
    throw new Error(
      "A preparação para essa data já teria começado. Escolha outra.",
    );
  }

  const supabase = await clienteServidor();
  const { error } = await supabase.from("jornadas").insert({
    perfil_id: usuario.id,
    festa_id: festa.id,
    consagracao: cronograma.consagracao,
    inicio: cronograma.inicio,
    status: cronograma.inicio === hoje ? "ativa" : "planejada",
  });

  if (error) throw new Error(error.message);

  revalidatePath("/caminho");
  redirect("/caminho");
}

/** Marca um passo do dia como cumprido, sem apagar os já marcados. */
export async function marcarPasso(
  jornadaId: string,
  dia: number,
  passo: PassoId,
) {
  validar(dia, passo);
  const supabase = await clienteServidor();

  const { data: atual } = await supabase
    .from("progresso_dias")
    .select("passos")
    .eq("jornada_id", jornadaId)
    .eq("dia", dia)
    .maybeSingle<{ passos: string[] }>();

  const passos = Array.from(new Set([...(atual?.passos ?? []), passo]));
  const completo = PASSOS.every((p) => passos.includes(p.id));

  const { error } = await supabase.from("progresso_dias").upsert(
    {
      jornada_id: jornadaId,
      dia,
      passos,
      concluido_em: completo ? new Date().toISOString() : null,
    },
    { onConflict: "jornada_id,dia" },
  );

  if (error) throw new Error(error.message);

  revalidatePath(`/dia/${dia}`);
  revalidatePath("/caminho");
}

/** Guarda o que a pessoa escreveu, substituindo o texto anterior daquele dia. */
export async function salvarTexto(
  jornadaId: string,
  dia: number,
  tipo: "reflexao" | "registro",
  texto: string,
) {
  if (!Number.isInteger(dia) || dia < 1 || dia > TOTAL_DIAS) {
    throw new Error("Dia inválido.");
  }

  const supabase = await clienteServidor();
  // "registro" é o que fica no diário como entrada livre do dia.
  const tipoNoBanco = tipo === "reflexao" ? "reflexao" : "livre";

  const { data: existente } = await supabase
    .from("diario")
    .select("id")
    .eq("jornada_id", jornadaId)
    .eq("dia", dia)
    .eq("tipo", tipoNoBanco)
    .maybeSingle<{ id: string }>();

  const { error } = existente
    ? await supabase.from("diario").update({ texto }).eq("id", existente.id)
    : await supabase
        .from("diario")
        .insert({ jornada_id: jornadaId, dia, tipo: tipoNoBanco, texto });

  if (error) throw new Error(error.message);

  revalidatePath("/diario");
}

function validar(dia: number, passo: PassoId) {
  if (!Number.isInteger(dia) || dia < 1 || dia > TOTAL_DIAS) {
    throw new Error("Dia inválido.");
  }
  if (!PASSOS.some((p) => p.id === passo)) {
    throw new Error("Passo inválido.");
  }
}
