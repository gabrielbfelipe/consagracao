/**
 * O que os buscadores precisam saber sobre esta casa, num só lugar.
 *
 * SOBRE O ENDEREÇO
 * Metade do SEO técnico é dizer, em todas as páginas, qual é o endereço
 * verdadeiro de cada uma. Isso exige um domínio absoluto, e um domínio
 * absoluto escrito à mão em dez arquivos é um erro à espera de acontecer:
 * basta migrar para um domínio próprio e metade das páginas passa a apontar
 * para o lugar antigo.
 *
 * Por isso há um valor só, lido do ambiente quando existe. Ao registar um
 * domínio, ponha NEXT_PUBLIC_SITE_URL nas variáveis da Vercel e nada mais
 * precisa mudar.
 *
 * ATENÇÃO: o endereço canónico tem de ser um endereço que você controla.
 * Apontar o canonical para um domínio alheio é pedir ao Google que tire o
 * site do índice e credite o conteúdo a outra pessoa.
 */

function semBarraFinal(url: string): string {
  return url.replace(/\/+$/, "");
}

/** O endereço de produção. É daqui que saem todos os canonicals. */
export const SITE_URL = semBarraFinal(
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://consagracao-plum.vercel.app",
);

export const SITE_NOME = "Consagração a Nossa Senhora";

/** Para a Organization do JSON-LD e o og:site_name. */
export const SITE_IDIOMA = "pt-BR";
export const SITE_LOCALE = "pt_BR";

/**
 * O título da página inicial.
 *
 * Sessenta caracteres é o ponto em que o Google começa a cortar o título no
 * resultado de busca (na prática ele mede pixels, não letras, mas sessenta é
 * o limite prudente). A palavra-chave principal vem primeiro, porque é a
 * primeira coisa que o olho lê na lista de resultados.
 */
export const TITULO_HOME = "Consagração a Nossa Senhora: Preparação de 33 Dias Online";

/**
 * A descrição da página inicial.
 *
 * Não é fator de posicionamento: é o texto de venda que decide o clique. Até
 * 155 caracteres, com o verbo no imperativo e o que se recebe de concreto.
 */
export const DESCRICAO_HOME =
  "Prepare sua consagração a Jesus por Maria pelo método de São Luís de Montfort. Calendário automático, orações diárias e diário espiritual gratuito.";

/** A descrição que serve ao site inteiro, quando a página não traz a sua. */
export const DESCRICAO_PADRAO =
  "Um caminho de preparação, oração e conhecimento que conduz o coração a Cristo pelas mãos de Maria.";

/**
 * Os termos pelos quais se procura isto.
 *
 * A meta keywords não é lida pelo Google desde 2009 — está aqui porque
 * buscadores menores (e alguns agregadores) ainda a consultam, e porque
 * custa nada. O trabalho de verdade está nos títulos, nos cabeçalhos e no
 * texto das páginas.
 */
export const PALAVRAS_CHAVE = [
  "consagração a Nossa Senhora",
  "consagração a Jesus por Maria",
  "Tratado da Verdadeira Devoção",
  "33 dias de preparação",
  "método de Montfort",
  "São Luís Maria Grignion de Montfort",
  "escravidão de amor",
  "Totus Tuus",
  "preparação para a consagração",
  "calendário mariano",
];

/** Transforma "/cadeias" em "https://.../cadeias". */
export function urlAbsoluta(caminho: string): string {
  if (caminho === "/" || caminho === "") return `${SITE_URL}/`;
  return `${SITE_URL}${caminho.startsWith("/") ? caminho : `/${caminho}`}`;
}
