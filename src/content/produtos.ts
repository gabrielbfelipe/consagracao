/**
 * As cadeias e os objetos de consagração oferecidos na loja.
 *
 * COMO ACRESCENTAR UM PRODUTO
 * 1. Copie o seu link de afiliado (Mercado Livre ou Amazon) e acrescente um
 *    item à lista abaixo, com um `id` curto e estável.
 * 2. Rode `npm run produtos`. O script abre o link, descobre o título e
 *    baixa o carrossel de fotos que o vendedor publicou, e guarda tudo em
 *    produtos-fotos.json.
 * 3. Confira o que veio e publique.
 *
 * Não há limite de quantos cabem aqui.
 *
 * POR QUE AS FOTOS SÃO BUSCADAS POR UM SCRIPT, E NÃO NA HORA
 * Buscar a cada visita seria lento para quem lê a página, e ficaria à mercê
 * da loja: as lojas limitam e bloqueiam pedidos automáticos, e uma página
 * que depende disso quebra sem aviso, justamente quando houver movimento.
 * Buscando uma vez, na sua máquina, e guardando o resultado no repositório,
 * a página fica rápida e não depende de ninguém para funcionar.
 *
 * QUANDO A BUSCA FALHAR
 * Vai falhar às vezes — a Amazon, em particular, bloqueia leitura automática
 * das suas páginas com frequência. Nesse caso o script diz qual produto
 * falhou, e basta preencher `fotos` à mão com os endereços das imagens. O
 * que está escrito aqui sempre vence o que foi buscado.
 */

export type Produto = {
  /** Curto e estável: é a chave das fotos guardadas e do endereço da página. */
  id: string;
  /** O seu link de afiliado. É para onde o botão leva. */
  link: string;
  /** Sobrepõe o título que veio da loja. Deixe vazio para usar o de lá. */
  titulo?: string;
  /** Por que você recomenda este. Aparece abaixo do título. */
  nota?: string;
  /**
   * Endereços das fotos, quando você quiser escolhê-las ou quando a busca
   * falhar. Preenchido aqui, ignora o que o script tiver guardado.
   */
  fotos?: string[];
  /** Põe o produto em primeiro lugar, com cartão maior. */
  destaque?: boolean;
};

/*
 * SOBRE ESTES LINKS, PARA QUEM MEXER AQUI DEPOIS
 *
 * São links de afiliado gerados no aplicativo do Mercado Livre. Não abrem a
 * página do produto: caem todos em mercadolivre.com.br/social/gabrielbfelipe,
 * uma vitrine com dezenas de peças. O produto de cada um vive no parâmetro
 * `ref`, que é opaco — mas o Mercado Livre resolve-o no servidor e põe o
 * título e a foto certos nas etiquetas Open Graph, que é de onde o
 * `npm run produtos` os tira. Por isso cada um traz uma foto, e não o
 * carrossel inteiro do vendedor.
 *
 * Para ter o carrossel completo, gere o link na própria página do produto
 * (o que resolve para /MLB-… ou /p/MLB…) e rode `npm run produtos -- --tudo`.
 */
export const PRODUTOS: readonly Produto[] = [
  { id: "cadeia-nossa-senhora-inox", link: "https://meli.la/2ZqzNmu" },
  { id: "cadeia-fatima-sao-bento", link: "https://meli.la/2Us1RFu" },
  { id: "cadeia-sao-jose", link: "https://meli.la/1FEwWet" },
  { id: "cadeia-tres-medalhas", link: "https://meli.la/2P1toUo" },
  { id: "cadeia-aparecida", link: "https://meli.la/1sYRVHU" },
] as const;

/**
 * O aviso que os programas de afiliados exigem.
 *
 * A Amazon obriga a declarar a participação no programa de forma visível,
 * e o Mercado Livre pede transparência equivalente. Independentemente da
 * exigência, quem lê tem direito de saber que o link rende comissão.
 */
export const AVISO_DE_AFILIADO =
  "Os links desta página são de afiliado: se você comprar por eles, uma parte do valor volta para manter este site, sem nenhum custo a mais para você.";

/**
 * A frase que a Amazon exige de quem participa do programa dela.
 *
 * Fica à parte porque só é verdade quando há produto da Amazon na página. A
 * página junta-a ao aviso quando houver, e omite-a quando não houver —
 * declarar-se Associado da Amazon numa página sem um único link da Amazon é
 * uma afirmação falsa, ainda que inofensiva.
 */
export const AVISO_DA_AMAZON =
  "Como Associado da Amazon, recebo por compras qualificadas.";

/** Texto de abertura da página, editável sem mexer no código da tela. */
export const APRESENTACAO = {
  sobrenome: "Sinal da escravidão de amor",
  titulo: "Cadeias de consagração",
  texto:
    "No § 236 do Tratado, São Luís Maria propõe usar pequenas cadeias de ferro como lembrança das que se rompem no batismo e das que se aceitam livremente na consagração. Não é obrigação nem amuleto: é um sinal, levado no corpo, que lembra o que foi decidido quando a memória esmorece.",
  nota: "Nada aqui é necessário para a sua consagração. Montfort é explícito ao chamar estas práticas de exteriores, e a preparação vale inteira sem nenhuma delas.",
} as const;
