"use server";

import { headers } from "next/headers";
import { clienteServidor } from "@/lib/supabase/servidor";

export type EstadoEntrada =
  | { situacao: "inicial" }
  | { situacao: "enviado"; email: string }
  | { situacao: "erro"; mensagem: string };

/**
 * Envia o link de entrada por e-mail.
 *
 * Sem senha: a pessoa recebe um link, clica, e está dentro. Uma senha a
 * menos para esquecer, e nenhuma senha nossa para vazar.
 */
export async function enviarLink(
  _anterior: EstadoEntrada,
  dados: FormData,
): Promise<EstadoEntrada> {
  const email = String(dados.get("email") ?? "").trim();
  const destino = String(dados.get("destino") ?? "/caminho");

  if (!email.includes("@")) {
    return { situacao: "erro", mensagem: "Confira o endereço de e-mail." };
  }

  const cabecalhos = await headers();
  const origem =
    cabecalhos.get("origin") ??
    `https://${cabecalhos.get("host") ?? "localhost:3000"}`;

  const supabase = await clienteServidor();
  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: `${origem}/auth/confirmar?destino=${encodeURIComponent(destino)}`,
    },
  });

  if (error) {
    return {
      situacao: "erro",
      // A mensagem do Supabase vem em inglês; aqui ela fala português.
      mensagem:
        error.status === 429
          ? "Muitos pedidos seguidos. Aguarde um minuto e tente de novo."
          : "Não foi possível enviar o link agora. Tente novamente em instantes.",
    };
  }

  return { situacao: "enviado", email };
}
