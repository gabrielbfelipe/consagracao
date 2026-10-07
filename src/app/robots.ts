import type { MetadataRoute } from "next";
import { SITE_URL, urlAbsoluta } from "@/lib/seo/site";

/**
 * O robots.txt, gerado em vez de escrito à mão, para que o endereço do
 * sitemap acompanhe o domínio em que o site estiver.
 *
 * O QUE FICA DE FORA, E POR QUÊ
 * Dois grupos. Primeiro, as salas pessoais: /caminho, /dia, /diario,
 * /carta, /grande-dia e /conta. Nenhuma delas abre sem sessão — o proxy
 * manda o visitante para a entrada —, então o que o Googlebot encontraria
 * ali é um desvio. Pedir-lhe que não tente poupa rastreamento e evita
 * dezenas de endereços no índice mostrando a mesma tela de entrada.
 *
 * Segundo, /api: respostas de função, nunca páginas.
 *
 * DUAS PORTAS QUE **NÃO** FICAM DE FORA
 * /entrar e /cadastro continuam rastreáveis, e levam `noindex, follow` no
 * próprio HTML. A diferença importa: um Disallow aqui impediria o Googlebot
 * de ler a página e, portanto, de seguir os elos que saem dela — e é por
 * eles que o cadastro distribui autoridade ao resto da casa. Bloquear o
 * rastreamento também não garante que o endereço fique fora do índice: se
 * alguém o ligar de fora, ele entra sem descrição nenhuma. O `noindex` no
 * HTML é o que realmente o mantém fora, e exige que a página seja lida.
 *
 * O Disallow não é segredo nem segurança: é um pedido público e legível por
 * qualquer um. O que guarda as salas pessoais é o RLS e o proxy.
 */
export default function robots(): MetadataRoute.Robots {
  const privadas = [
    "/caminho",
    "/dia/",
    "/diario",
    "/carta",
    "/grande-dia",
    "/conta/",
    "/api/",
  ];

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: privadas,
      },
      // O GPTBot e os seus semelhantes leem a parte pública como qualquer
      // outro. Não há regra à parte para eles porque não há razão para
      // haver: o que é público é público, e o que é pessoal já está acima.
    ],
    sitemap: urlAbsoluta("/sitemap.xml"),
    host: SITE_URL,
  };
}
