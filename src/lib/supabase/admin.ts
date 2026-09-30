import "server-only";
import { createClient } from "@supabase/supabase-js";

/**
 * Cliente com a chave secreta, que ignora o RLS.
 *
 * Existe por um motivo só: criar a conta já com o e-mail dado por
 * confirmado, para que a pessoa entre sem esperar mensagem nenhuma.
 *
 * O import de "server-only" faz a construção falhar se este arquivo for
 * arrastado para o pacote do navegador — é a rede de proteção que impede a
 * chave secreta de vazar por um import descuidado.
 */
export function clienteAdmin() {
  const chave = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!chave) throw new Error("Falta SUPABASE_SERVICE_ROLE_KEY.");

  return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, chave, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}
