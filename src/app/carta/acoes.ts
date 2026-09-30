"use server";

import { revalidatePath } from "next/cache";
import { clienteServidor } from "@/lib/supabase/servidor";

export type EstadoCarta =
  | { situacao: "inicial" }
  | { situacao: "selada" }
  | { situacao: "erro"; mensagem: string };

/**
 * Sela a carta do primeiro dia.
 *
 * Só se escreve uma vez. Depois disso o banco não a devolve a ninguém — nem
 * a quem escreveu — até o dia da consagração, e é isso que dá peso ao gesto.
 */
export async function selarCarta(
  _anterior: EstadoCarta,
  dados: FormData,
): Promise<EstadoCarta> {
  const jornadaId = String(dados.get("jornada") ?? "");
  const texto = String(dados.get("texto") ?? "").trim();

  if (texto.length < 40) {
    return {
      situacao: "erro",
      mensagem:
        "Escreva um pouco mais. Você vai reler isto daqui a trinta e três dias.",
    };
  }

  const supabase = await clienteServidor();
  const { error } = await supabase
    .from("carta_primeiro_dia")
    .insert({ jornada_id: jornadaId, texto });

  if (error) {
    return {
      situacao: "erro",
      // Chave duplicada: já existe carta para esta jornada.
      mensagem:
        error.code === "23505"
          ? "Sua carta já foi selada. Ela será aberta no dia da consagração."
          : "Não foi possível selar a carta agora. Tente novamente.",
    };
  }

  revalidatePath("/carta");
  return { situacao: "selada" };
}

/** Guarda o motivo curto, que reaparece nos dias difíceis. */
export async function salvarMotivo(jornadaId: string, texto: string) {
  const supabase = await clienteServidor();
  const { error } = await supabase
    .from("meu_motivo")
    .upsert(
      { jornada_id: jornadaId, texto: texto.trim().slice(0, 400) },
      { onConflict: "jornada_id" },
    );

  if (error) throw new Error(error.message);
  revalidatePath("/carta");
}
