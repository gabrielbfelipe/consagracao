import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

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
            novos.forEach(({ name, value, options }) =>
              armazem.set(name, value, options),
            );
          } catch {
            // Componentes de servidor não escrevem cookies; o middleware
            // já cuidou da renovação da sessão.
          }
        },
      },
    },
  );
}

/** A pessoa autenticada, ou null. */
export async function usuarioAtual() {
  const supabase = await clienteServidor();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
}
