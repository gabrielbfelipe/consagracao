"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { clienteServidor, usuarioAtual } from "@/lib/supabase/servidor";
import { dataDaFesta, festaPorId, type FestaId } from "@/lib/agenda/festas";
import { cronogramaPara } from "@/lib/agenda/cronograma";
import { dataSimples, hojeEm } from "@/lib/agenda/dataSimples";
import { TOTAL_DIAS } from "./etapas";
import { PASSOS, type PassoId } from "./passos";

/**
 * Registra a data escolhida e abre a jornada — ou troca a data já escolhida.
 *
 * As datas são recalculadas aqui a partir do identificador da festa: o que
 * vem do formulário é apenas a escolha, nunca o cronograma já pronto.
 *
 * Quando já existe jornada, esta ação ALTERA aquela linha em vez de abrir
 * outra. A diferença importa por dois motivos. O primeiro é que o progresso,
 * o diário, o motivo e a carta pendem da jornada: abrir uma segunda deixaria
 * tudo isso preso à primeira, invisível e vivo — e era o que acontecia antes,
 * porque a tela mostra sempre a jornada mais recente. O segundo é que trocar
 * de data não é desistir: o que a pessoa escreveu continua dela.
 *
 * O progresso é guardado por número de dia, e não por data, de modo que ele
 * atravessa a troca intacto. Quem adiar a consagração volta a um dia menor
 * com dias à frente já acesos; é estranho de ver e é honesto — aqueles dias
 * foram mesmo vividos.
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


  const cronograma = cronogramaPara(festa, dataDaFesta(festa, ano));
  const hoje = hojeEm("America/Sao_Paulo");

  if (cronograma.inicio < hoje) {
    throw new Error(
      "A preparação para essa data já teria começado. Escolha outra.",
    );
  }

  const supabase = await clienteServidor();

  // O RLS já limita o que se enxerga à própria pessoa; esta consulta serve
  // só para saber se é a primeira escolha ou uma troca.
  const { data: existente } = await supabase
    .from("jornadas")
    .select("id")
    .order("criado_em", { ascending: false })
    .limit(1)
    .maybeSingle<{ id: string }>();

  const campos = {
    festa_id: festa.id,
    consagracao: cronograma.consagracao,
    inicio: cronograma.inicio,
    status: cronograma.inicio === hoje ? "ativa" : "planejada",
  } as const;

  const { error } = existente
    ? await supabase.from("jornadas").update(campos).eq("id", existente.id)
    : await supabase
        .from("jornadas")
        .insert({ perfil_id: usuario.id, ...campos });

  if (error) throw new Error(error.message);

  // Layout, e não página: a jornada aparece em salas que não são /caminho.
  revalidatePath("/", "layout");
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
