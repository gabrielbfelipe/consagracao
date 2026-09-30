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
};

export const IMAGENS = {
  // --- Naves e arquitetura ---------------------------------------------------
  naveVitral: {
    id: "photo-1652948701568-843ffbd8f110",
    alt: "Nave de catedral com abóbada alta e vitrais ao fundo.",
    autor: "Chris Boland",
    pagina: "https://unsplash.com/s/photos/cathedral-nave",
  },
  naveGotica: {
    id: "photo-1707566289043-d85074fdd2f2",
    alt: "Interior de grande catedral com vitrais iluminando as colunas.",
    autor: "Andy Bridge",
    pagina: "https://unsplash.com/s/photos/cathedral-nave",
  },
  colunata: {
    id: "photo-1549541337-db015c252064",
    alt: "Colunas de pedra erguendo-se em direção à abóbada.",
    autor: "Zoltan Tasi",
    pagina: "https://unsplash.com/s/photos/cathedral-nave",
  },
  /** A única clara do acervo: sustenta as seções de pedra. */
  naveClara: {
    id: "photo-1567449763675-aa790a25f4b9",
    alt: "Interior de igreja barroca em tons claros, com arcos e luz difusa.",
    autor: "Adrianna Kaczmarek",
    pagina: "https://unsplash.com/s/photos/cathedral-nave",
  },
  arcaria: {
    id: "photo-1660700023707-d65c9b1e4e59",
    alt: "Interior monumental com uma sucessão de arcos de pedra.",
    autor: "J. Balla Photography",
    pagina: "https://unsplash.com/photos/a-large-ornate-room-with-many-arches",
  },

  // --- Luz e vitrais ---------------------------------------------------------
  vitralEscuro: {
    id: "photo-1635002338542-51dd41416480",
    alt: "Vitral aceso na penumbra de uma nave.",
    autor: "Thomas Dewey",
    pagina: "https://unsplash.com/s/photos/stained-glass-window-church",
  },
  vitralGrande: {
    id: "photo-1632230997264-b2bfc65cb8b4",
    alt: "Grande vitral de igreja atravessado pela luz.",
    autor: "Jakub Pierożyński",
    pagina: "https://unsplash.com/s/photos/stained-glass-window-church",
  },
  vitralPurpura: {
    id: "photo-1447858496759-dd23e166e1c5",
    alt: "Vitral de catedral em tons de púrpura e azul.",
    autor: "Jamieson Gordon",
    pagina: "https://unsplash.com/s/photos/stained-glass-window-church",
  },
  luzPelasJanelas: {
    id: "photo-1705073193541-05807fe98b5f",
    alt: "Luz do sol atravessando janelas altas e pousando sobre a pedra.",
    autor: "Viktoriya",
    pagina:
      "https://unsplash.com/photos/the-sun-is-shining-through-the-windows-of-a-building",
  },

  // --- Nossa Senhora ---------------------------------------------------------
  nossaSenhora: {
    id: "photo-1554089638-52a6a0c7b2a1",
    alt: "Imagem de Nossa Senhora numa catedral.",
    autor: "Josh Applegate",
    pagina: "https://unsplash.com/photos/Dit35uPly04",
  },
  imagemMariana: {
    id: "photo-1576027202680-eef36697d47d",
    alt: "Imagem da Virgem Maria em pedra clara.",
    autor: "Mateus Campos Felipe",
    pagina: "https://unsplash.com/photos/jZLKaLsjgJ4",
  },
  virgemSerena: {
    id: "photo-1563305760-46c570fea2c7",
    alt: "Imagem de Nossa Senhora com o olhar baixo.",
    autor: "Maria Oswalt",
    pagina: "https://unsplash.com/photos/5xar-6sfQ8w",
  },

  // --- Oração ----------------------------------------------------------------
  tercoNasMaos: {
    id: "photo-1506630391771-a4428d1e6bcd",
    alt: "Silhueta de mulher rezando com um terço nas mãos.",
    autor: "Isabella Fischer",
    pagina: "https://unsplash.com/photos/a-4428d1e6bcd",
  },
  terco: {
    id: "photo-1544015385-b033a87109f5",
    alt: "Terço de contas claras sobre superfície escura.",
    autor: "Daniele Levis Pelusi",
    pagina: "https://unsplash.com/s/photos/rosary",
  },
  velas: {
    id: "photo-1476900164809-ff19b8ae5968",
    alt: "Velas acesas na penumbra de uma igreja.",
    autor: "Mike Labrum",
    pagina: "https://unsplash.com/photos/N3q6EWpEIkE",
  },

  // --- Livro e estudo --------------------------------------------------------
  bibliotecaBarroca: {
    id: "photo-1562932831-afcfe48b5786",
    alt: "Salão de biblioteca barroca com estantes ornamentadas e afresco no teto.",
    autor: "Valdemaras D.",
    pagina: "https://unsplash.com/photos/-YHSwy6uqvk",
  },
  tetoSacro: {
    id: "photo-1463143296037-46790ff95a7e",
    alt: "Teto de biblioteca com pintura religiosa em relevo.",
    autor: "Hieu Vu Minh",
    pagina: "https://unsplash.com/photos/QyaJEwB-lYU",
  },
  livroAberto: {
    id: "photo-1534289907116-888fe70c4806",
    alt: "Livro antigo aberto sobre uma superfície de madeira.",
    autor: "Danika Perkinson",
    pagina: "https://unsplash.com/photos/9MOa1JMRhoc",
  },
  pergaminho: {
    id: "photo-1522442676585-c751dab71864",
    alt: "Pergaminho envelhecido com escrita manuscrita.",
    autor: "Tanner Mardis",
    pagina: "https://unsplash.com/photos/2FaCnWrQDxg",
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
  return `https://images.unsplash.com/${IMAGENS[nome].id}?auto=format&fit=crop&w=${largura}&q=${qualidade}`;
}

/** Créditos sem repetir o mesmo fotógrafo. */
export const CREDITOS = Object.values(IMAGENS);
