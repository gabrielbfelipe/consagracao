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

export const PRODUTOS: readonly Produto[] = [
  // Exemplo do formato — apague esta entrada ao pôr a primeira de verdade.
  // {
  //   id: "cadeia-aco-inox",
  //   link: "https://mercadolivre.com/sec/SEU-LINK",
  //   nota: "Aço inoxidável, fecho resistente. A que eu uso.",
  //   destaque: true,
  // },
] as const;

/**
 * O aviso que os programas de afiliados exigem.
 *
 * A Amazon obriga a declarar a participação no programa de forma visível,
 * e o Mercado Livre pede transparência equivalente. Independentemente da
 * exigência, quem lê tem direito de saber que o link rende comissão.
 */
export const AVISO_DE_AFILIADO =
  "Os links desta página são de afiliado: se você comprar por eles, uma parte do valor volta para manter este site, sem nenhum custo a mais para você. Como Associado da Amazon, recebo por compras qualificadas.";

/** Texto de abertura da página, editável sem mexer no código da tela. */
export const APRESENTACAO = {
  sobrenome: "Sinal da escravidão de amor",
  titulo: "Cadeias de consagração",
  texto:
    "No § 236 do Tratado, São Luís Maria propõe usar pequenas cadeias de ferro como lembrança das que se rompem no batismo e das que se aceitam livremente na consagração. Não é obrigação nem amuleto: é um sinal, levado no corpo, que lembra o que foi decidido quando a memória esmorece.",
  nota: "Nada aqui é necessário para a sua consagração. Montfort é explícito ao chamar estas práticas de exteriores, e a preparação vale inteira sem nenhuma delas.",
} as const;
