"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { clienteServidor, usuarioAtual } from "@/lib/supabase/servidor";
import { dataDaFesta, festaPorId, type FestaId } from "@/lib/agenda/festas";
import { cronogramaPara } from "@/lib/agenda/cronograma";
import { dataSimples, hojeEm } from "@/lib/agenda/dataSimples";
import { TOTAL_DIAS } from "./etapas";
import { diaCompleto, ePasso, unirPassos, type PassoId } from "./passos";

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

/**
 * Guarda passos do dia, juntando-os aos que já estavam — nunca por cima.
 *
 * Recebe todos os passos que a tela sabe estarem feitos, e não só o último.
 * Assim, se alguma gravação anterior se perdeu, a seguinte a repõe.
 *
 * O caminho principal é a função public.marcar_passos, que junta os passos
 * dentro do banco numa só instrução e é imune a gravações simultâneas. Ela
 * vem na migração 0003. Enquanto essa migração não for aplicada, a função
 * não existe, e cai-se no caminho de reserva — ler, juntar, gravar —, que é
 * o antigo sem o defeito de sobrescrever. Ele ainda pode perder uma corrida
 * entre duas abas abertas; dentro de uma aba, a fila do condutor impede.
 *
 * Devolve se o dia ficou concluído, para a tela não ter de adivinhar.
 */
export async function marcarPassos(
  jornadaId: string,
  dia: number,
  passos: PassoId[],
): Promise<{ concluido: boolean }> {
  validarDia(dia);
  if (passos.length === 0 || !passos.every(ePasso)) {
    throw new Error("Passo inválido.");
  }

  const supabase = await clienteServidor();

  const { data, error } = await supabase.rpc("marcar_passos", {
    p_jornada: jornadaId,
    p_dia: dia,
    p_passos: unirPassos(passos),
  });

  let concluido: boolean;
  if (!error) {
    concluido = Boolean(data);
  } else if (funcaoAusente(error)) {
    concluido = await marcarSemFuncao(jornadaId, dia, passos);
  } else {
    throw new Error(error.message);
  }

  revalidatePath(`/dia/${dia}`);
  revalidatePath("/caminho");
  return { concluido };
}

/** O PostgREST responde PGRST202 quando a função chamada não existe. */
function funcaoAusente(erro: { code?: string; message?: string }) {
  return (
    erro.code === "PGRST202" ||
    /could not find the function/i.test(erro.message ?? "")
  );
}

/** Caminho de reserva, até a migração 0003 ser aplicada. */
async function marcarSemFuncao(
  jornadaId: string,
  dia: number,
  novos: PassoId[],
): Promise<boolean> {
  const supabase = await clienteServidor();

  const { data: atual } = await supabase
    .from("progresso_dias")
    .select("passos, concluido_em")
    .eq("jornada_id", jornadaId)
    .eq("dia", dia)
    .maybeSingle<{ passos: string[]; concluido_em: string | null }>();

  const passos = unirPassos(atual?.passos ?? [], novos);
  const completo = diaCompleto(passos);

  const { error } = await supabase.from("progresso_dias").upsert(
    {
      jornada_id: jornadaId,
      dia,
      passos,
      // A primeira vez em que o dia fechou é a que vale.
      concluido_em: completo
        ? (atual?.concluido_em ?? new Date().toISOString())
        : null,
    },
    { onConflict: "jornada_id,dia" },
  );

  if (error) throw new Error(error.message);
  return completo;
}

/** Guarda o que a pessoa escreveu, substituindo o texto anterior daquele dia. */
export async function salvarTexto(
  jornadaId: string,
  dia: number,
  tipo: "reflexao" | "registro",
  texto: string,
) {
  validarDia(dia);

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

function validarDia(dia: number) {
  if (!Number.isInteger(dia) || dia < 1 || dia > TOTAL_DIAS) {
    throw new Error("Dia inválido.");
  }
}
