"use server";

import { redirect } from "next/navigation";
import { clienteServidor } from "@/lib/supabase/servidor";
import { clienteAdmin } from "@/lib/supabase/admin";

export type EstadoEntrada =
  | { situacao: "inicial" }
  | { situacao: "erro"; mensagem: string };

const SENHA_MINIMA = 8;

/**
 * Entra na conta, criando-a se ainda não existir.
 *
 * POR ENQUANTO SEM VERIFICAÇÃO DE E-MAIL. A conta nasce com o endereço já
 * dado por confirmado, de modo que ninguém precisa esperar mensagem alguma.
 *
 * O preço disso é real: sem verificação, nada impede alguém de se cadastrar
 * com um e-mail que não é seu. Quem controla a conta é quem escolheu a
 * senha. Para voltar a exigir confirmação, basta trocar este arquivo pelo
 * envio de link — o resto do sistema não muda.
 *
 * A ordem das tentativas importa. Criamos primeiro: se o e-mail já existe, a
 * criação falha e a senha de quem já tem conta permanece intacta. Só então
 * tentamos entrar. O contrário permitiria sobrescrever a senha alheia.
 */
export async function entrarOuCriar(
  _anterior: EstadoEntrada,
  dados: FormData,
): Promise<EstadoEntrada> {
  const email = String(dados.get("email") ?? "")
    .trim()
    .toLowerCase();
  const senha = String(dados.get("senha") ?? "");
  const destinoPedido = String(dados.get("destino") ?? "/caminho");

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { situacao: "erro", mensagem: "Confira o endereço de e-mail." };
  }

  if (senha.length < SENHA_MINIMA) {
    return {
      situacao: "erro",
      mensagem: `A senha precisa ter ao menos ${SENHA_MINIMA} caracteres.`,
    };
  }

  const admin = clienteAdmin();
  const { error: erroCriacao } = await admin.auth.admin.createUser({
    email,
    password: senha,
    email_confirm: true,
  });

  const jaExistia =
    erroCriacao !== null &&
    (erroCriacao.code === "email_exists" ||
      erroCriacao.status === 422 ||
      /already/i.test(erroCriacao.message));

  if (erroCriacao && !jaExistia) {
    return {
      situacao: "erro",
      mensagem: "Não foi possível criar a conta agora. Tente novamente.",
    };
  }

  const supabase = await clienteServidor();
  const { error: erroEntrada } = await supabase.auth.signInWithPassword({
    email,
    password: senha,
  });

  if (erroEntrada) {
    return {
      situacao: "erro",
      mensagem: jaExistia
        ? "Já existe uma conta com este e-mail, e a senha não confere."
        : "Não foi possível entrar agora. Tente novamente.",
    };
  }

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
