/**
 * Os espaços de publicidade do santuário.
 *
 * COMO LIGAR
 * 1. Crie a conta no Google AdSense e espere a aprovação do site.
 * 2. Ponha o seu código de editor (ca-pub-0000000000000000) em
 *    NEXT_PUBLIC_ADSENSE_ID, no .env.local e nas variáveis da Vercel.
 * 3. No painel do AdSense, crie um bloco de anúncio para cada espaço abaixo
 *    e cole o número do bloco em `unidade`.
 *
 * Enquanto `unidade` estiver vazia, o espaço não existe: não ocupa lugar, não
 * baixa script nenhum, não deixa buraco na página. Dá para ligar um de cada
 * vez e ver o resultado antes de ligar o seguinte.
 *
 * ONDE NÃO HÁ ANÚNCIO, E POR QUÊ
 * Esta é a parte que importa mais do que a lista de cima.
 *
 *   /oracao      Quem abre esta página está em dificuldade. A tela foi feita
 *                sem pórtico e sem rodapé justamente para não oferecer nada
 *                além de uma saída. Um anúncio aqui seria vender espaço ao
 *                lado do número do CVV.
 *   /silencio    É uma tela de recolhimento. Um retângulo que pisca é o
 *                contrário exato do que ela é.
 *   /dia/[n]     Os trinta e três dias. É o lugar onde a pessoa lê, medita e
 *                escreve — o produto inteiro.
 *   /diario      O que ela escreveu.
 *   /carta       A carta do primeiro dia, selada.
 *   /grande-dia  O dia da consagração.
 *   /caminho     A sala de onde ela parte todos os dias.
 *   /biblioteca/[oracao]  As orações em si. O índice pode ter anúncio; a
 *                oração aberta, não — ninguém abre o Veni Creator para
 *                comparar preços.
 *   /entrar, /cadastro    Formulários. Anúncio ao lado de um campo de senha
 *                derruba o cadastro e parece golpe.
 *
 * Há um teste que lê os arquivos destas páginas e falha se um anúncio
 * aparecer em qualquer uma delas. Não é zelo excessivo: é a regra que se
 * quebra por descuido, seis meses depois, quando ninguém lembra por que ela
 * existia.
 */

export type Formato = "faixa" | "retangulo";

export type Espaco = {
  /** O número do bloco criado no painel do AdSense. Vazio = desligado. */
  unidade: string;
  formato: Formato;
  /** Onde fica, em português, para quem for criar o bloco lá. */
  onde: string;
};

/**
 * Seis espaços, todos em pé de página — depois do conteúdo, nunca no meio.
 *
 * Publicidade no meio do texto rende mais; é o que toda recomendação de SEO
 * diz, e é verdade. Também é o que transforma uma página de leitura em algo
 * que se fecha. Aqui o anúncio aparece quando a pessoa chegou ao fim do que
 * foi ler — que é também quando ela está mais disposta a olhar para o lado.
 */
export const ESPACOS = {
  "home-pe": {
    unidade: "",
    formato: "faixa",
    onde: "Página inicial, depois do convite final e antes do rodapé",
  },
  "calendario-pe": {
    unidade: "",
    formato: "faixa",
    onde: "Calendário mariano, depois das vinte e quatro festas",
  },
  "festa-pe": {
    unidade: "",
    formato: "retangulo",
    onde: "Página de uma festa, depois do cronograma e do botão",
  },
  "sobre-fim": {
    unidade: "",
    formato: "retangulo",
    onde: "Fim de cada página de apresentação, antes do convite",
  },
  "biblioteca-pe": {
    unidade: "",
    formato: "faixa",
    onde: "Índice da biblioteca, depois da lista de orações",
  },
  "cadeias-pe": {
    unidade: "",
    formato: "faixa",
    onde: "Sala das cadeias, depois dos produtos",
  },
} as const satisfies Record<string, Espaco>;

export type Posicao = keyof typeof ESPACOS;

/** O código de editor. Sem ele, não há publicidade em lugar nenhum. */
export const EDITOR = process.env.NEXT_PUBLIC_ADSENSE_ID ?? "";

export const ANUNCIOS_LIGADOS = EDITOR.startsWith("ca-pub-");

/**
 * Quem já entrou não vê anúncio.
 *
 * É uma decisão sua, e está aqui numa linha para você poder mudá-la. O
 * raciocínio por trás do padrão: quem criou conta está dentro da preparação,
 * e o que o site promete a essa pessoa é recolhimento. Além disso, quase
 * todo o movimento de busca cai nas páginas públicas — que é onde os seis
 * espaços estão. Desligando isto, você ganha os anúncios do calendário e da
 * biblioteca para quem está logado, e pouco mais.
 */
export const ESCONDER_DE_QUEM_ENTROU = true;

/**
 * O rótulo. O AdSense exige que o anúncio não se confunda com o conteúdo, e
 * aceita exatamente estas palavras — "Publicidade" ou "Anúncios". Qualquer
 * outra coisa ("Recomendado para você", "Veja também") é motivo de suspensão
 * da conta, por induzir o clique.
 */
export const ROTULO = "Publicidade";
