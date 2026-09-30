import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

/**
 * Renova a sessão a cada navegação e guarda as áreas pessoais.
 *
 * O Supabase recomenda chamar getUser() aqui: é o que valida o token contra
 * o servidor de autenticação em vez de confiar no cookie.
 */

/** Áreas que exigem estar autenticado. */
const RESERVADAS = ["/caminho", "/dia", "/diario", "/conta", "/carta"];

export async function middleware(requisicao: NextRequest) {
  let resposta = NextResponse.next({ request: requisicao });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return requisicao.cookies.getAll();
        },
        setAll(novos) {
          novos.forEach(({ name, value }) =>
            requisicao.cookies.set(name, value),
          );
          resposta = NextResponse.next({ request: requisicao });
          novos.forEach(({ name, value, options }) =>
            resposta.cookies.set(name, value, options),
          );
        },
      },
    },
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const caminho = requisicao.nextUrl.pathname;
  const reservada = RESERVADAS.some(
    (r) => caminho === r || caminho.startsWith(`${r}/`),
  );

  if (reservada && !user) {
    const entrar = requisicao.nextUrl.clone();
    entrar.pathname = "/entrar";
    entrar.searchParams.set("destino", caminho);
    return NextResponse.redirect(entrar);
  }

  return resposta;
}

export const config = {
  matcher: [
    // Tudo, menos arquivos estáticos e imagens.
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|avif)$).*)",
  ],
};
