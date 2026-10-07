import { EDITOR } from "@/content/anuncios";

/**
 * O ads.txt.
 *
 * É um arquivo de uma linha que diz quem está autorizado a vender a
 * publicidade deste domínio. Sem ele, boa parte dos compradores recusa o
 * inventário por não conseguir provar que o espaço é seu — o site mostra os
 * anúncios e recebe uma fração do que receberia. É o passo que mais se
 * esquece e o mais barato de dar.
 *
 * Gerado em vez de escrito à mão, para acompanhar o código de editor que
 * estiver configurado. Sem editor configurado, responde 404: um ads.txt
 * vazio ou com um código falso é pior do que nenhum.
 */
export function GET() {
  if (!EDITOR.startsWith("ca-pub-")) {
    return new Response("Não há rede de publicidade configurada.", {
      status: 404,
      headers: { "content-type": "text/plain; charset=utf-8" },
    });
  }

  // O formato é fixo: domínio do vendedor, identificação do editor, relação
  // (DIRECT, por ser conta própria) e o identificador do Google no TAG.
  const linha = `google.com, ${EDITOR.replace("ca-pub-", "pub-")}, DIRECT, f08c47fec0942fa0`;

  return new Response(`${linha}\n`, {
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "public, max-age=86400",
    },
  });
}
