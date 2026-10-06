import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { COOKIE_ABERTURA, expirou, semValidade } from "@/lib/supabase/sessao";

/**
 * Renova a sessão a cada navegação e guarda as áreas pessoais.
 *
 * Chamava-se middleware.ts. A partir do Next 16 a convenção é proxy.ts; a
 * função é a mesma.
 *
 * O Supabase recomenda chamar getUser() aqui: é o que valida o token contra
 * o servidor de autenticação em vez de confiar no cookie.
 */

/** Áreas que exigem estar autenticado. */
const RESERVADAS = [
  "/caminho",
  "/dia",
  "/diario",
  "/conta",
  "/carta",
  "/grande-dia",
];

/**
 * Páginas de entrada. Quem já entrou não tem o que fazer nelas, e a porta
 * da rua é justamente onde ele não deve cair ao navegar pelo pórtico.
 */
const PORTAS = ["/", "/entrar", "/cadastro"];

export async function proxy(requisicao: NextRequest) {
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
          // semValidade: a sessão morre com o navegador. Ver sessao.ts.
          novos.forEach(({ name, value, options }) =>
            resposta.cookies.set(name, value, semValidade(options)),
          );
        },
      },
    },
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const caminho = requisicao.nextUrl.pathname;

  // A trava de duração, que o navegador não contorna. Sessão sem carimbo ou
  // velha demais é encerrada aqui mesmo, antes de qualquer página responder.
  if (user && expirou(requisicao.cookies.get(COOKIE_ABERTURA)?.value)) {
    await supabase.auth.signOut();

    const entrar = requisicao.nextUrl.clone();
    entrar.pathname = "/entrar";
    entrar.search = "";
    entrar.searchParams.set("expirou", "1");
    if (caminho !== "/" && !PORTAS.includes(caminho)) {
      entrar.searchParams.set("destino", caminho);
    }

    const saida = NextResponse.redirect(entrar);
    for (const { name } of requisicao.cookies.getAll()) {
      if (name.startsWith("sb-") || name === COOKIE_ABERTURA) {
        saida.cookies.delete(name);
      }
    }
    return saida;
  }

  const reservada = RESERVADAS.some(
    (r) => caminho === r || caminho.startsWith(`${r}/`),
  );

  if (reservada && !user) {
    const entrar = requisicao.nextUrl.clone();
    entrar.pathname = "/entrar";
    entrar.search = "";
    entrar.searchParams.set("destino", caminho);
    return NextResponse.redirect(entrar);
  }

  // Quem está dentro não volta à vitrine por acidente. Sair é o único jeito
  // de chegar à porta da rua, e sair apaga a sessão antes de mandar para lá.
  if (user && PORTAS.includes(caminho)) {
    const dentro = requisicao.nextUrl.clone();
    dentro.pathname = "/caminho";
    dentro.search = "";
    return NextResponse.redirect(dentro);
  }

  return resposta;
}

export const config = {
  matcher: [
    // Tudo, menos arquivos estáticos e imagens.
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|avif)$).*)",
  ],
};
