"use server";

import { redirect } from "next/navigation";
import {
  clienteServidor,
  marcarAberturaDaSessao,
} from "@/lib/supabase/servidor";

export type EstadoEntrada =
  | { situacao: "inicial" }
  | {
      situacao: "erro";
      mensagem: string;
      /** O e-mail digitado volta: errar a senha não deve custar o endereço. */
      email: string;
      /** Sobe a cada recusa, e serve de chave para reaplicar o padrão. */
      tentativa: number;
    };

/**
 * Entra numa conta que já existe. Nada mais.
 *
 * Esta tela já criou contas sozinha, quando o e-mail não era encontrado.
 * Era cômodo e estava errado por dois motivos: um erro de digitação no
 * endereço abria uma conta nova e vazia em vez de avisar, e a pessoa que
 * fosse cadastrar-se nunca chegava a responder as perguntas do cadastro.
 * Criar conta agora é um gesto próprio, em /cadastro.
 *
 * A mensagem de falha não distingue "não existe" de "senha errada": dizer
 * qual dos dois foi entrega a quem tenta adivinhar a informação de que um
 * e-mail está ou não cadastrado aqui — e, neste sistema, isso é dizer algo
 * sobre a fé de alguém.
 */
export async function entrar(
  anterior: EstadoEntrada,
  dados: FormData,
): Promise<EstadoEntrada> {
  const email = String(dados.get("email") ?? "")
    .trim()
    .toLowerCase();
  const senha = String(dados.get("senha") ?? "");
  const destinoPedido = String(dados.get("destino") ?? "/caminho");

  const tentativa = anterior.situacao === "erro" ? anterior.tentativa + 1 : 1;
  const recusar = (mensagem: string): EstadoEntrada => ({
    situacao: "erro",
    mensagem,
    email,
    tentativa,
  });

  if (!email || !senha) {
    return recusar("Informe o e-mail e a senha.");
  }

  const supabase = await clienteServidor();
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password: senha,
  });

  if (error) {
    return recusar("E-mail ou senha não conferem. Confira e tente de novo.");
  }

  // O relógio da sessão começa a contar agora. Ver lib/supabase/sessao.ts.
  await marcarAberturaDaSessao();

  // Quem ainda não consentiu passa pela acolhida; nada é guardado antes.
  const { data: perfil } = await supabase
    .from("perfis")
    .select("consentimento_em")
    .maybeSingle<{ consentimento_em: string | null }>();

  const interno =
    destinoPedido.startsWith("/") && !destinoPedido.startsWith("//");

  // redirect() lança por dentro; fica fora de qualquer try para não ser
  // confundido com erro.
  redirect(
    perfil?.consentimento_em
      ? interno
        ? destinoPedido
        : "/caminho"
      : "/conta/bem-vindo",
  );
}
