import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { carimboDeAbertura, semValidade } from "./sessao";

/**
 * Cliente do Supabase para componentes e ações de servidor.
 * Cada chamada cria o seu, porque os cookies mudam a cada requisição.
 */
export async function clienteServidor() {
  const armazem = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return armazem.getAll();
        },
        setAll(novos) {
          try {
            // semValidade: a sessão morre com o navegador. Ver sessao.ts.
            novos.forEach(({ name, value, options }) =>
              armazem.set(name, value, semValidade(options)),
            );
          } catch {
            // Componentes de servidor não escrevem cookies; o proxy
            // já cuidou da renovação da sessão.
          }
        },
      },
    },
  );
}

/**
 * Marca o instante em que esta sessão começou.
 *
 * Chamado logo depois de entrar. É este carimbo que o proxy consulta para
 * recusar sessões velhas demais, mesmo quando o navegador restaura os
 * cookies de sessão ao reabrir.
 */
export async function marcarAberturaDaSessao() {
  const armazem = await cookies();
  const { nome, valor, opcoes } = carimboDeAbertura();
  armazem.set(nome, valor, opcoes);
}

/** A pessoa autenticada, ou null. */
export async function usuarioAtual() {
  const supabase = await clienteServidor();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
}
