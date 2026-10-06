"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { clienteServidor, usuarioAtual } from "@/lib/supabase/servidor";
import { COOKIE_ABERTURA } from "@/lib/supabase/sessao";

export type EstadoAcolhida =
  | { situacao: "inicial" }
  | { situacao: "erro"; mensagem: string };

/**
 * Registra o consentimento e os dados mínimos do perfil.
 *
 * A LGPD trata convicção religiosa como dado sensível (art. 5º, II), e exige
 * consentimento destacado e específico. Por isso o carimbo de hora fica
 * gravado: sem ele, nada além do perfil vazio existe.
 */
export async function aceitarEContinuar(
  _anterior: EstadoAcolhida,
  dados: FormData,
): Promise<EstadoAcolhida> {
  const usuario = await usuarioAtual();
  if (!usuario) redirect("/entrar");

  if (dados.get("consentimento") !== "sim") {
    return {
      situacao: "erro",
      mensagem:
        "Sem o seu consentimento não podemos guardar nada. Marque a caixa para continuar.",
    };
  }

  const nome = String(dados.get("nome") ?? "").trim().slice(0, 120);
  const fuso = String(dados.get("fuso") ?? "America/Sao_Paulo");

  if (!fusoValido(fuso)) {
    return { situacao: "erro", mensagem: "Fuso horário não reconhecido." };
  }

  const supabase = await clienteServidor();
  const { error } = await supabase
    .from("perfis")
    .update({
      nome: nome || null,
      fuso,
      consentimento_em: new Date().toISOString(),
    })
    .eq("id", usuario.id);

  if (error) {
    return {
      situacao: "erro",
      mensagem: "Não foi possível guardar agora. Tente novamente.",
    };
  }

  revalidatePath("/caminho");
  redirect("/calendario");
}

/** Retira o consentimento e apaga tudo o que foi guardado. */
export async function apagarTudo() {
  const usuario = await usuarioAtual();
  if (!usuario) redirect("/entrar");

  const supabase = await clienteServidor();

  // As jornadas levam consigo progresso, diário, motivo e carta, por cascata.
  const { error } = await supabase
    .from("jornadas")
    .delete()
    .eq("perfil_id", usuario.id);

  if (error) throw new Error(error.message);

  await supabase
    .from("perfis")
    .update({ consentimento_em: null, nome: null })
    .eq("id", usuario.id);

  await supabase.auth.signOut();
  (await cookies()).delete(COOKIE_ABERTURA);
  redirect("/");
}

/**
 * Sai da conta. É o único caminho de volta à vitrine: enquanto houver
 * sessão, o proxy mantém quem está dentro, dentro.
 */
export async function sair() {
  const supabase = await clienteServidor();
  await supabase.auth.signOut();
  (await cookies()).delete(COOKIE_ABERTURA);
  redirect("/");
}

function fusoValido(fuso: string): boolean {
  try {
    new Intl.DateTimeFormat("en-CA", { timeZone: fuso });
    return true;
  } catch {
    return false;
  }
}
