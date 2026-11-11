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
  {
    id: "cadeia-nossa-senhora-inox",
    link: "https://meli.la/2ZqzNmu",
    nota: "A mais próxima do que Montfort descreve: metal simples, sem pedra nem enfeite, com uma medalha de Nossa Senhora. O aço inox resolve o problema prático de quem vai usá-la todos os dias e lavar as mãos vinte vezes — não enferruja nem mancha a pele.",
  },
  {
    id: "cadeia-fatima-sao-bento",
    link: "https://meli.la/2Us1RFu",
    nota: "Junta a medalha de Fátima à de São Bento. Faz sentido para quem se consagra em 13 de maio, e a de São Bento é tradicionalmente usada como sinal de proteção — com a mesma ressalva de sempre: é sinal, não amuleto.",
  },
  {
    id: "cadeia-sao-jose",
    link: "https://meli.la/1FEwWet",
    nota: "Com a medalha de São José. Montfort não fala dele neste ponto do Tratado, mas quem se consagra pelas mãos de Maria costuma descobrir, no caminho, que o marido dela anda por perto. Boa escolha para pais de família.",
  },
  {
    id: "cadeia-tres-medalhas",
    link: "https://meli.la/2P1toUo",
    nota: "Três medalhas num elo só. É a mais visível das cinco, e por isso a que menos combina com o conselho de Montfort de levar o sinal sem o exibir. Está aqui porque há quem queira justamente uma lembrança que não passe despercebida nem a si mesmo.",
  },
  {
    id: "cadeia-aparecida",
    link: "https://meli.la/1sYRVHU",
    nota: "Com a padroeira do Brasil. A escolha óbvia para quem marcou a consagração em 12 de outubro, e a mais fácil de explicar a quem perguntar o que é isso no seu pulso.",
  },
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

/**
 * O guia das cadeias.
 *
 * POR QUE ELE EXISTE
 * Esta página era duas frases de apresentação e cinco links de afiliado com
 * os títulos copiados da loja — e um espaço de publicidade por cima. É a
 * definição exata do que o Google chama conteúdo replicado e página de
 * afiliado sem valor agregado, e foi um dos motivos da recusa da conta de
 * editor. Mas o problema não era só esse: quem chega aqui tem uma dúvida
 * real — o que é essa cadeia, se precisa dela, de que material, onde se usa,
 * se manda benzer — e a página não respondia a nenhuma.
 *
 * O QUE ESTÁ ESCRITO ABAIXO
 * O que o Tratado diz no § 236 e o que a prática acrescentou. Onde não há
 * regra, o texto diz que não há regra, em vez de inventar uma: não existe
 * especificação litúrgica de material, medida ou formato para a cadeia, e
 * qualquer site que afirme o contrário está a inventar.
 */
export const GUIA = [
  {
    titulo: "O que Montfort propõe, e onde",
    paragrafos: [
      "No § 236 do Tratado da Verdadeira Devoção, ao tratar das práticas exteriores desta devoção, São Luís Maria sugere que quem se consagrou use pequenas correntes de ferro — no pulso, no pé ou ao pescoço — como sinal da entrega que fez. Ele as apresenta como lembrança de duas coisas ao mesmo tempo: das cadeias do pecado e do demónio, que o batismo rompeu, e das cadeias de amor que o consagrado aceitou livremente ao entregar-se a Jesus Cristo pelas mãos de Maria.",
      "A imagem é dura de propósito, e ele sabia. A devoção que propõe chama-se, no próprio livro, escravidão de amor — vocabulário que incomoda hoje e já incomodava no século XVIII. O argumento dele é que não existe meio-termo: ou se pertence a si mesmo, ou se pertence a Deus; e que a única escravidão que liberta é a que se escolhe.",
      "Montfort é também explícito quanto ao peso disto: chama estas práticas de exteriores e diz que a devoção vale inteira sem nenhuma delas. Quem não puder, não quiser ou não achar prudente usar a cadeia está a fazer exatamente a mesma consagração que os outros.",
    ],
  },
  {
    titulo: "O que a cadeia não é",
    paragrafos: [
      "Não é amuleto. Não protege por si, não traz sorte, não afasta mal nenhum pelo metal de que é feita. Um objeto bento é um sacramental: dispõe quem o usa a receber a graça, e não funciona como um interruptor. Quem o usa esperando efeito automático trocou a fé por superstição com vocabulário católico — e o próprio Montfort é severo com isso, quando descreve os falsos devotos.",
      "Não é obrigação. Não há preceito nenhum, de nenhum grau, que mande usá-la. Não é condição para a consagração ser válida, não entra na fórmula, e ninguém lhe vai perguntar por ela.",
      "Não é uniforme. A tradição não fixou material, medida, cor nem formato. Quem lhe disser que tem de ser de ferro, ou de tantos elos, ou usada no pé esquerdo, está a repetir costume local como se fosse regra.",
    ],
  },
  {
    titulo: "Como escolher a sua",
    paragrafos: [
      "O material é a primeira escolha e a mais prática. Montfort fala em ferro, que era o metal pobre e disponível do seu tempo, e o ferro é o mais fiel à imagem — mas enferruja em contacto com a pele e com a água, e muita gente desiste nas primeiras semanas. O aço inoxidável resolve isso sem trair o sentido: continua a ser metal comum, sem valor de joia. A prata é opção para quem tem alergia a ligas baratas.",
      "O lugar vem a seguir. O pulso é o mais usado hoje, porque é o mais cómodo e o que menos chama atenção. O tornozelo é o mais tradicional e o mais discreto de todos — fica coberto o ano inteiro, e Montfort gostava justamente disso. Ao pescoço é o menos frequente.",
      "A medida é onde mais se erra ao comprar pela internet. Meça o pulso ou o tornozelo com uma fita antes de encomendar e acrescente cerca de um centímetro de folga: a cadeia não deve marcar a pele nem deslizar sobre a mão. Prefira fecho de mosquetão ou de rosca ao fecho de pressão, que abre sozinho com o uso.",
      "Quanto ao desenho, vale o conselho que o próprio Tratado dá sobre as práticas exteriores: que o sinal lembre quem o usa, e não que anuncie aos outros. Uma cadeia discreta cumpre melhor o que foi feita para cumprir.",
    ],
  },
  {
    titulo: "Benzer, e quando começar a usar",
    paragrafos: [
      "Peça a um sacerdote que a benza. Não é obrigatório — um objeto não bento não deixa de ser lembrança —, mas o Ritual tem a bênção de objetos de devoção, leva menos de um minuto, e qualquer pároco a faz depois da missa se lhe pedirem. Se a sua paróquia marcar bênção de objetos em alguma data, é a ocasião.",
      "Sobre quando pôr: o costume é usá-la a partir do dia da consagração, não antes. Durante os trinta e três dias a pessoa ainda está a preparar-se, e a cadeia é sinal de uma entrega já feita. Muita gente leva a cadeia ao altar no Grande Dia, recebe a bênção e sai com ela posta — é um gesto bonito e fácil de combinar com o padre com antecedência.",
      "Se um dia ela se partir, não significa nada. Compre outra, ou não compre. O que foi prometido não estava no metal.",
    ],
  },
] as const;

/** Texto de abertura da página, editável sem mexer no código da tela. */
export const APRESENTACAO = {
  sobrenome: "Sinal da escravidão de amor",
  titulo: "Cadeias de consagração",
  texto:
    "No § 236 do Tratado, São Luís Maria propõe usar pequenas cadeias de ferro como lembrança das que se rompem no batismo e das que se aceitam livremente na consagração. Não é obrigação nem amuleto: é um sinal, levado no corpo, que lembra o que foi decidido quando a memória esmorece.",
  nota: "Nada aqui é necessário para a sua consagração. Montfort é explícito ao chamar estas práticas de exteriores, e a preparação vale inteira sem nenhuma delas.",
} as const;
