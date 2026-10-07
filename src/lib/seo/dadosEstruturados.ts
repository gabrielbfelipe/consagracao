import { ETAPAS, TOTAL_DIAS } from "@/lib/jornada/etapas";
import {
  DESCRICAO_HOME,
  SITE_IDIOMA,
  SITE_NOME,
  SITE_URL,
  urlAbsoluta,
} from "@/lib/seo/site";

/**
 * Os dados estruturados (JSON-LD) que descrevem o santuário.
 *
 * COMO ESTÁ MONTADO
 * Tudo num único script, dentro de um `@graph`. A alternativa — vários
 * scripts soltos — funciona, mas deixa as entidades sem relação entre si:
 * o buscador vê um aplicativo e um site e não sabe que são a mesma coisa.
 * Com o `@graph`, cada entidade tem um `@id` e as outras apontam para ele,
 * e o conjunto é lido como um grafo só.
 *
 * O QUE ESPERAR DISTO, HONESTAMENTE
 * O `WebApplication` e o `Organization` ajudam o buscador a entender o que
 * é este endereço, e alimentam o painel lateral quando o site ganha
 * autoridade. O `BreadcrumbList` é o único daqui que rende resultado rico
 * visível hoje — a trilha de migalhas que aparece sob o título.
 *
 * O `HowTo` já rendeu resultado rico com imagens e passos, mas o Google
 * retirou esse formato da busca em agosto de 2023. Continua valendo a pena
 * declará-lo: é como os modelos de linguagem e os buscadores que respondem
 * em prosa entendem que isto é um roteiro de trinta e três dias com quatro
 * etapas, e não uma página de texto solto. Só não espere ver caixas
 * diferentes no Google por causa dele.
 *
 * Não há `Course`: o schema Course pressupõe instância com data, instrutor e
 * modalidade, e declarar o que não existe é o caminho mais curto para uma
 * penalidade por dados estruturados enganosos.
 */

const ID_SITE = `${SITE_URL}/#site`;
const ID_ORGANIZACAO = `${SITE_URL}/#organizacao`;
const ID_APLICACAO = `${SITE_URL}/#aplicacao`;
const ID_PREPARACAO = `${SITE_URL}/#preparacao`;

/** O santo, como entidade: é ele que liga este site ao resto do assunto. */
const MONTFORT = {
  "@type": "Person",
  name: "São Luís Maria Grignion de Montfort",
  alternateName: "Saint Louis-Marie Grignion de Montfort",
  birthDate: "1673-01-31",
  deathDate: "1716-04-28",
  sameAs: "https://pt.wikipedia.org/wiki/Lu%C3%ADs_Maria_Grignion_de_Montfort",
} as const;

/** O livro, como entidade, para que fique claro de qual obra se trata. */
const TRATADO = {
  "@type": "Book",
  name: "Tratado da Verdadeira Devoção à Santíssima Virgem",
  author: MONTFORT,
  inLanguage: "pt-BR",
} as const;

export function grafoDaHome() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": ID_SITE,
        url: `${SITE_URL}/`,
        name: SITE_NOME,
        description: DESCRICAO_HOME,
        inLanguage: SITE_IDIOMA,
        publisher: { "@id": ID_ORGANIZACAO },
        about: TRATADO,
      },
      {
        "@type": "Organization",
        "@id": ID_ORGANIZACAO,
        name: SITE_NOME,
        url: `${SITE_URL}/`,
        description:
          "Projeto independente que acompanha a preparação de trinta e três dias para a Consagração Total a Jesus por Maria, segundo São Luís de Montfort.",
        logo: {
          "@type": "ImageObject",
          url: urlAbsoluta("/icone.svg"),
          caption: SITE_NOME,
        },
      },
      {
        "@type": "WebApplication",
        "@id": ID_APLICACAO,
        name: SITE_NOME,
        alternateName: "Preparação de 33 dias para a Consagração",
        url: `${SITE_URL}/`,
        description: DESCRICAO_HOME,
        // EducationalApplication é a categoria correta: o que o programa faz
        // é conduzir uma formação em etapas, não vender nem entreter.
        applicationCategory: "EducationalApplication",
        applicationSubCategory: "Formação espiritual católica",
        operatingSystem: "Web (qualquer navegador moderno), iOS, Android",
        browserRequirements: "Requer um navegador com JavaScript ativo.",
        inLanguage: SITE_IDIOMA,
        isAccessibleForFree: true,
        isFamilyFriendly: true,
        // Gratuito precisa ser dito como preço, e não só em palavras: sem a
        // Offer com 0.00, o buscador não tem como afirmar que é de graça.
        offers: {
          "@type": "Offer",
          price: "0.00",
          priceCurrency: "BRL",
          availability: "https://schema.org/InStock",
          category: "free",
        },
        featureList: [
          "Cálculo automático da data de início a partir de vinte e quatro festas de Nossa Senhora",
          "Os trinta e três dias abrindo-se um a um, no dia certo",
          "Plano de leitura em sequência do Tratado da Verdadeira Devoção, por parágrafo",
          "Orações da preparação com o original em latim e tradução",
          "Diário espiritual privado e carta do primeiro dia, selada até o Grande Dia",
          "Modo silêncio e um momento de oração para os dias difíceis",
        ],
        provider: { "@id": ID_ORGANIZACAO },
        publisher: { "@id": ID_ORGANIZACAO },
        isPartOf: { "@id": ID_SITE },
        about: TRATADO,
        mainEntityOfPage: { "@id": ID_SITE },
      },
      {
        "@type": "HowTo",
        "@id": ID_PREPARACAO,
        name: "Como se preparar para a Consagração a Nossa Senhora em 33 dias",
        description:
          "O método de São Luís de Montfort divide a preparação em doze dias preliminares e três semanas, e a consagração acontece no dia seguinte ao trigésimo terceiro, na festa escolhida.",
        inLanguage: SITE_IDIOMA,
        // ISO 8601: P33D são trinta e três dias.
        totalTime: `P${TOTAL_DIAS}D`,
        estimatedCost: {
          "@type": "MonetaryAmount",
          currency: "BRL",
          value: "0",
        },
        supply: [
          {
            "@type": "HowToSupply",
            name: "Um exemplar do Tratado da Verdadeira Devoção à Santíssima Virgem",
          },
          { "@type": "HowToSupply", name: "Um terço" },
          { "@type": "HowToSupply", name: "Um caderno, ou o diário do site" },
        ],
        tool: [{ "@type": "HowToTool", name: SITE_NOME }],
        about: TRATADO,
        step: [
          {
            "@type": "HowToStep",
            position: 1,
            name: "Escolha a festa de Nossa Senhora em que deseja se consagrar",
            text: "São vinte e quatro datas. Escolhida uma, o início fica marcado trinta e três dias antes.",
            url: urlAbsoluta("/calendario"),
          },
          // As quatro etapas saem de etapas.ts, que é a mesma fonte que a
          // página usa. Se um dia a divisão mudar, o dado estruturado muda
          // com ela — e não fica a afirmar ao Google o que o site já não diz.
          ...ETAPAS.map((etapa, i) => ({
            "@type": "HowToStep",
            position: i + 2,
            name:
              etapa.dias === 12
                ? `${etapa.nome}: ${etapa.rotuloCurto === "Preliminares" ? "desprender-se do espírito do mundo" : etapa.rotuloCurto}`
                : `${etapa.nome} (dias ${etapa.primeiroDia} a ${etapa.primeiroDia + etapa.dias - 1})`,
            text: etapa.proposito,
            url: urlAbsoluta("/sobre/a-preparacao"),
          })),
          {
            "@type": "HowToStep",
            position: ETAPAS.length + 2,
            name: "O dia da consagração",
            text: "No dia seguinte ao trigésimo terceiro, na festa escolhida: confissão, comunhão e a fórmula de consagração.",
            url: urlAbsoluta("/sobre/a-preparacao"),
          },
        ],
      },
    ],
  };
}

/**
 * A trilha de migalhas de uma página interna.
 *
 * É o único dado estruturado daqui que muda o que se vê na busca: em vez de
 * um endereço cru, o Google mostra "Início › Calendário › Imaculada
 * Conceição" sob o título.
 */
export function grafoDeMigalhas(
  trilha: readonly { nome: string; caminho: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { nome: "Início", caminho: "/" },
      ...trilha,
    ].map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.nome,
      item: urlAbsoluta(item.caminho),
    })),
  };
}
