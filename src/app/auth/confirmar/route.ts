import { NextResponse, type NextRequest } from "next/server";
import type { EmailOtpType } from "@supabase/supabase-js";
import { clienteServidor } from "@/lib/supabase/servidor";

/**
 * Recebe quem clicou no link do e-mail, troca o código por uma sessão e
 * encaminha ao destino pretendido.
 */
export async function GET(requisicao: NextRequest) {
  const { searchParams, origin } = requisicao.nextUrl;
  const tokenHash = searchParams.get("token_hash");
  const tipo = searchParams.get("type") as EmailOtpType | null;
  const destino = searchParams.get("destino") ?? "/caminho";

  // Só destinos internos: um `destino` vindo de fora não pode nos usar
  // como trampolim para outro site.
  const seguro = destino.startsWith("/") && !destino.startsWith("//");
  const paraOnde = seguro ? destino : "/caminho";

  if (tokenHash && tipo) {
    const supabase = await clienteServidor();
    const { error } = await supabase.auth.verifyOtp({
      type: tipo,
      token_hash: tokenHash,
    });

    if (!error) {
      // Quem ainda não consentiu passa primeiro pela acolhida; nada é
      // guardado antes disso.
      const { data: perfil } = await supabase
        .from("perfis")
        .select("consentimento_em")
        .maybeSingle<{ consentimento_em: string | null }>();

      const destinoFinal = perfil?.consentimento_em
        ? paraOnde
        : "/conta/bem-vindo";

      return NextResponse.redirect(new URL(destinoFinal, origin));
    }
  }

  const falhou = new URL("/entrar", origin);
  falhou.searchParams.set("expirado", "1");
  return NextResponse.redirect(falhou);
}
