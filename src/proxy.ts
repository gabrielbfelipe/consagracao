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
  const caminho = requisicao.nextUrl.pathname;

  // A trava de duração, decidida só pelos cookies e ANTES de falar com o
  // Supabase. Ver lib/supabase/sessao.ts.
  //
  // A ordem importa, e custou uma medição para descobrir. Uma navegação
  // dispara mais de um pedido ao mesmo tempo para a mesma rota. Se a decisão
  // dependesse de getUser(), o primeiro pedido encerraria a sessão e o
  // segundo — já com o token invalidado — cairia no ramo de página
  // reservada, mandando a pessoa para a entrada sem dizer por quê. Qual dos
  // dois vencia a corrida era sorte. Olhando só para os cookies, que os dois
  // pedidos ainda carregam iguais, os dois tomam o mesmo caminho.
  const temToken = requisicao.cookies
    .getAll()
    .some((c) => c.name.startsWith("sb-"));

  if (temToken && expirou(requisicao.cookies.get(COOKIE_ABERTURA)?.value)) {
    const entrar = requisicao.nextUrl.clone();
    entrar.pathname = "/entrar";
    entrar.search = "";
    entrar.searchParams.set("expirou", "1");
    if (!PORTAS.includes(caminho)) entrar.searchParams.set("destino", caminho);

    const saida = NextResponse.redirect(entrar);
    for (const { name } of requisicao.cookies.getAll()) {
      if (name.startsWith("sb-") || name === COOKIE_ABERTURA) {
        saida.cookies.delete(name);
      }
    }
    return saida;
  }

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
    // Tudo, menos arquivos estaticos.
    //
    // A lista de extensoes inclui html, txt, xml e webmanifest: sao o
    // robots.txt, o sitemap.xml, o ads.txt, o manifesto e o arquivo de
    // verificacao do Google Search Console. Enderecos publicos por
    // natureza, que nenhuma sessao deve poder desviar.
    //
    // O caso que isto fecha nao e teorico: o ramo de sessao expirada
    // acima redireciona *qualquer* caminho quando ha cookie do Supabase
    // velho, e redirecionaria tambem o arquivo de verificacao, que o
    // Google exige encontrar com o conteudo exato. Um visitante anonimo,
    // como o robo, nao tem cookie e nunca cairia nisso; mas a regra nao
    // deve depender de quem esta a bater a porta.
    //
    // Nenhuma rota da aplicacao termina em extensao, por isso exclui-las
    // nao deixa nada de pessoal desprotegido.
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|avif|html|txt|xml|webmanifest)$).*)",
  ],
};
