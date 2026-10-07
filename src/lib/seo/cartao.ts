import type { Metadata } from "next";
import { SITE_LOCALE, SITE_NOME } from "@/lib/seo/site";

/**
 * O canónico e o cartão de partilha de uma página, montados de uma vez.
 *
 * POR QUE EXISTE
 * Isto nasceu de um defeito que só se vê no HTML servido. Os campos de
 * metadados do Next **substituem** os do layout, não se somam a eles: uma
 * página que declarasse `twitter: { title, description }` perdia o
 * `card: "summary_large_image"` do layout e passava a pedir o cartão
 * pequeno. O mesmo acontecia com `openGraph`, que perdia a imagem e o
 * `type`. O resultado era o pior possível: todas as páginas internas
 * partilhadas no WhatsApp sem imagem nenhuma, e nada na compilação a dizer.
 *
 * Com um objeto montado aqui, não há como esquecer um campo — e há um teste
 * que o confere.
 *
 * SOBRE A IMAGEM
 * É sempre a mesma: o cartão desenhado em app/opengraph-image.tsx. Uma
 * imagem por página seria melhor e não é verdade nenhuma que faça diferença
 * aqui — o que se partilha é o site, e o cartão diz o nome do site.
 */
export function cartao({
  titulo,
  descricao,
  caminho,
  tipo = "website",
}: {
  titulo: string;
  descricao: string;
  /** Relativo, como "/cadeias". Vira absoluto pelo metadataBase do layout. */
  caminho: string;
  tipo?: "website" | "article";
}): Pick<Metadata, "alternates" | "openGraph" | "twitter"> {
  const imagem = "/opengraph-image";

  return {
    alternates: { canonical: caminho },
    openGraph: {
      type: tipo,
      url: caminho,
      siteName: SITE_NOME,
      locale: SITE_LOCALE,
      title: titulo,
      description: descricao,
      images: [{ url: imagem, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: titulo,
      description: descricao,
      images: [imagem],
    },
  };
}
