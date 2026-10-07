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
    alt: "Nave de catedral gótica com abóbada de ogivas e vitrais acesos ao fundo do altar.",
    autor: "Chris Boland",
    pagina: "https://unsplash.com/s/photos/cathedral-nave",
  },
  naveGotica: {
    id: "photo-1707566289043-d85074fdd2f2",
    alt: "Interior de catedral na penumbra, com a luz dos vitrais descendo pelas colunas de pedra.",
    autor: "Andy Bridge",
    pagina: "https://unsplash.com/s/photos/cathedral-nave",
  },
  colunata: {
    id: "photo-1549541337-db015c252064",
    alt: "Colunata de pedra de uma catedral erguendo-se em direção à abóbada.",
    autor: "Zoltan Tasi",
    pagina: "https://unsplash.com/s/photos/cathedral-nave",
  },
  /** A única clara do acervo: sustenta as seções de pedra. */
  naveClara: {
    id: "photo-1567449763675-aa790a25f4b9",
    alt: "Interior de igreja barroca em pedra clara, com arcos em sucessão e luz difusa pela nave.",
    autor: "Adrianna Kaczmarek",
    pagina: "https://unsplash.com/s/photos/cathedral-nave",
  },
  arcaria: {
    id: "photo-1660700023707-d65c9b1e4e59",
    alt: "Sucessão de arcos de pedra num interior monumental, em perspectiva.",
    autor: "J. Balla Photography",
    pagina: "https://unsplash.com/photos/a-large-ornate-room-with-many-arches",
  },

  // --- Luz e vitrais ---------------------------------------------------------
  vitralEscuro: {
    id: "photo-1635002338542-51dd41416480",
    alt: "Vitral iluminado na penumbra de uma nave de catedral.",
    autor: "Thomas Dewey",
    pagina: "https://unsplash.com/s/photos/stained-glass-window-church",
  },
  vitralGrande: {
    id: "photo-1632230997264-b2bfc65cb8b4",
    alt: "Grande vitral de igreja atravessado pela luz do sol, em vermelhos e azuis.",
    autor: "Jakub Pierożyński",
    pagina: "https://unsplash.com/s/photos/stained-glass-window-church",
  },
  vitralPurpura: {
    id: "photo-1447858496759-dd23e166e1c5",
    alt: "Vitral de catedral em tons de púrpura e azul mariano.",
    autor: "Jamieson Gordon",
    pagina: "https://unsplash.com/s/photos/stained-glass-window-church",
  },
  luzPelasJanelas: {
    id: "photo-1705073193541-05807fe98b5f",
    alt: "Feixes de luz do sol atravessando janelas altas e pousando no chão de pedra da igreja.",
    autor: "Viktoriya",
    pagina:
      "https://unsplash.com/photos/the-sun-is-shining-through-the-windows-of-a-building",
  },

  // --- Nossa Senhora ---------------------------------------------------------
  nossaSenhora: {
    id: "photo-1554089638-52a6a0c7b2a1",
    alt: "Imagem de Nossa Senhora numa catedral, com as mãos abertas e o manto azul.",
    autor: "Josh Applegate",
    pagina: "https://unsplash.com/photos/Dit35uPly04",
  },
  imagemMariana: {
    id: "photo-1576027202680-eef36697d47d",
    alt: "Escultura da Virgem Maria em pedra clara, com as mãos postas em oração.",
    autor: "Mateus Campos Felipe",
    pagina: "https://unsplash.com/photos/jZLKaLsjgJ4",
  },
  virgemSerena: {
    id: "photo-1563305760-46c570fea2c7",
    alt: "Imagem de Nossa Senhora com o olhar baixo e as mãos unidas sobre o peito.",
    autor: "Maria Oswalt",
    pagina: "https://unsplash.com/photos/5xar-6sfQ8w",
  },

  // --- Oração ----------------------------------------------------------------
  tercoNasMaos: {
    id: "photo-1506630391771-a4428d1e6bcd",
    alt: "Silhueta de mulher rezando o terço, as contas entre os dedos, contra a luz da janela.",
    autor: "Isabella Fischer",
    pagina: "https://unsplash.com/photos/a-4428d1e6bcd",
  },
  terco: {
    id: "photo-1544015385-b033a87109f5",
    alt: "Terço de contas claras com crucifixo, estendido sobre uma superfície escura.",
    autor: "Daniele Levis Pelusi",
    pagina: "https://unsplash.com/s/photos/rosary",
  },
  velas: {
    id: "photo-1476900164809-ff19b8ae5968",
    alt: "Fileira de velas votivas acesas na penumbra de uma igreja.",
    autor: "Mike Labrum",
    pagina: "https://unsplash.com/photos/N3q6EWpEIkE",
  },

  // --- Livro e estudo --------------------------------------------------------
  bibliotecaBarroca: {
    id: "photo-1562932831-afcfe48b5786",
    alt: "Salão de biblioteca barroca com estantes de madeira entalhada, balaustrada dourada e afresco no teto.",
    autor: "Valdemaras D.",
    pagina: "https://unsplash.com/photos/-YHSwy6uqvk",
  },
  tetoSacro: {
    id: "photo-1463143296037-46790ff95a7e",
    alt: "Teto abobadado de biblioteca antiga com pintura religiosa e ornamentos em relevo dourado.",
    autor: "Hieu Vu Minh",
    pagina: "https://unsplash.com/photos/QyaJEwB-lYU",
  },
  livroAberto: {
    id: "photo-1534289907116-888fe70c4806",
    alt: "Livro antigo aberto sobre uma mesa de madeira escura, as páginas amarelecidas pelo tempo.",
    autor: "Danika Perkinson",
    pagina: "https://unsplash.com/photos/9MOa1JMRhoc",
  },
  pergaminho: {
    id: "photo-1522442676585-c751dab71864",
    alt: "Pergaminho envelhecido coberto de escrita manuscrita a tinta.",
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
