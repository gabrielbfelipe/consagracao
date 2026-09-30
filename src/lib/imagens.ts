/**
 * Acervo de imagens do santuário.
 *
 * Todas vêm do Unsplash, sob a Licença Unsplash: uso livre, inclusive
 * comercial, sem necessidade de permissão. A atribuição não é exigida, mas
 * é devida, e por isso cada foto guarda o nome de quem a fez — a página de
 * créditos lê daqui.
 *
 * As imagens do Unsplash+ (plus.unsplash.com) são pagas e não entram aqui.
 */

export type Imagem = {
  /** Identificador do arquivo no CDN do Unsplash. */
  id: string;
  /** Descrição para quem não vê a imagem. */
  alt: string;
  autor: string;
  pagina: string;
  /** Ponto que deve permanecer visível ao recortar. */
  foco?: string;
};

export const IMAGENS = {
  bibliotecaBarroca: {
    id: "photo-1562932831-afcfe48b5786",
    alt: "Salão de biblioteca barroca com estantes ornamentadas, douraduras e afresco no teto.",
    autor: "Valdemaras D.",
    pagina: "https://unsplash.com/photos/-YHSwy6uqvk",
    foco: "center",
  },
  arcaria: {
    id: "photo-1660700023707-d65c9b1e4e59",
    alt: "Interior monumental com uma sucessão de arcos de pedra.",
    autor: "J. Balla Photography",
    pagina: "https://unsplash.com/photos/a-large-ornate-room-with-many-arches",
    foco: "center",
  },
  luzPelasJanelas: {
    id: "photo-1705073193541-05807fe98b5f",
    alt: "Luz do sol atravessando janelas altas e pousando sobre a pedra.",
    autor: "Viktoriya",
    pagina: "https://unsplash.com/photos/the-sun-is-shining-through-the-windows-of-a-building",
    foco: "center",
  },
  tetoSacro: {
    id: "photo-1463143296037-46790ff95a7e",
    alt: "Teto de biblioteca com pintura religiosa em relevo.",
    autor: "Hieu Vu Minh",
    pagina: "https://unsplash.com/photos/QyaJEwB-lYU",
    foco: "center",
  },
  velas: {
    id: "photo-1476900164809-ff19b8ae5968",
    alt: "Velas acesas na penumbra de uma igreja.",
    autor: "Mike Labrum",
    pagina: "https://unsplash.com/photos/N3q6EWpEIkE",
    foco: "center",
  },
  livroAberto: {
    id: "photo-1534289907116-888fe70c4806",
    alt: "Livro antigo aberto sobre uma superfície de madeira.",
    autor: "Danika Perkinson",
    pagina: "https://unsplash.com/photos/9MOa1JMRhoc",
    foco: "center",
  },
  pergaminho: {
    id: "photo-1522442676585-c751dab71864",
    alt: "Pergaminho envelhecido com escrita manuscrita.",
    autor: "Tanner Mardis",
    pagina: "https://unsplash.com/photos/2FaCnWrQDxg",
    foco: "center",
  },
} as const satisfies Record<string, Imagem>;

export type NomeDaImagem = keyof typeof IMAGENS;

/**
 * Monta a URL da imagem no tamanho pedido.
 * O Unsplash serve o recorte e a compressão no próprio CDN, então não
 * carregamos um arquivo maior do que a tela precisa.
 */
export function urlDaImagem(
  nome: NomeDaImagem,
  { largura, qualidade = 72 }: { largura: number; qualidade?: number },
): string {
  const { id } = IMAGENS[nome];
  return `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${largura}&q=${qualidade}`;
}

export const CREDITOS = Object.values(IMAGENS);
