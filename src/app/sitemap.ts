import type { MetadataRoute } from "next";
import { FESTAS_REAIS } from "@/lib/agenda/festas";
import { ORACOES } from "@/content/oracoes";
import { PAGINAS } from "@/content/sobre";
import { urlAbsoluta } from "@/lib/seo/site";

/**
 * O sitemap.
 *
 * É gerado a partir das mesmas listas que desenham as páginas — as cinco
 * salas de apresentação, as festas do calendário, as orações da biblioteca.
 * Escrever um XML à mão daria o mesmo resultado hoje e estaria errado na
 * próxima oração acrescentada; assim, acrescentar conteúdo é o bastante.
 *
 * SOBRE A DATA DE ALTERAÇÃO
 * `lastModified` é a data da publicação, porque todo o conteúdo daqui vive
 * no repositório e muda quando o site é publicado. Não é a data de cada
 * texto — isso exigiria consultar o histórico do git durante a compilação,
 * e o ganho seria nenhum: o Google trata o lastmod como pista, e desconfia
 * dele quando não corresponde a mudanças reais.
 *
 * SOBRE A DATA DE ENSAIO
 * A lista é FESTAS_REAIS, nunca FESTAS. Com o modo de ensaio ligado existe
 * uma "festa" que não é celebração nenhuma, criada para percorrer o sistema
 * sem esperar trinta e três dias. Submetê-la ao Google seria pedir a
 * indexação de uma página de teste. Há um teste que garante isto.
 *
 * O que não está aqui: as salas pessoais (fechadas por sessão), /entrar e
 * /cadastro (noindex, por serem formulários sem conteúdo) e /silencio (uma
 * tela sem texto). Um sitemap que inclui o que não deve ser indexado perde
 * credibilidade inteiro, e com ela o proveito de ter um.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const publicacao = new Date();

  return [
    {
      url: urlAbsoluta("/"),
      lastModified: publicacao,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: urlAbsoluta("/calendario"),
      lastModified: publicacao,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    // As vinte e quatro festas de Nossa Senhora. Cada uma é uma página com
    // texto próprio sobre a celebração e a conta dos dias até ela: é por aqui
    // que alguém procurando "consagração em 8 de dezembro" chega ao site.
    ...FESTAS_REAIS.map((festa) => ({
      url: urlAbsoluta(`/calendario/${festa.id}`),
      lastModified: publicacao,
      changeFrequency: "yearly" as const,
      priority: 0.7,
    })),
    ...PAGINAS.map((pagina) => ({
      url: urlAbsoluta(`/sobre/${pagina.slug}`),
      lastModified: publicacao,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    {
      url: urlAbsoluta("/biblioteca"),
      lastModified: publicacao,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    ...ORACOES.map((oracao) => ({
      url: urlAbsoluta(`/biblioteca/${oracao.id}`),
      lastModified: publicacao,
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
    {
      url: urlAbsoluta("/cadeias"),
      lastModified: publicacao,
      changeFrequency: "weekly",
      priority: 0.6,
    },
    {
      url: urlAbsoluta("/oracao"),
      lastModified: publicacao,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: urlAbsoluta("/privacidade"),
      lastModified: publicacao,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: urlAbsoluta("/creditos"),
      lastModified: publicacao,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}
