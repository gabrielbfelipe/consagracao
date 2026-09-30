/**
 * O que se oferece a quem abre "Preciso de um momento de oração".
 *
 * Princípio: isto não diagnostica nada, não resolve nada e não substitui
 * ninguém. Oferece uma oração, uma palavra e um silêncio — e diz com
 * clareza onde procurar ajuda de verdade quando for o caso.
 *
 * As passagens bíblicas são tradução própria a partir da Vulgata, breves e
 * sempre com a referência à vista, para que se possa conferir na própria
 * Bíblia. CONTEÚDO SUJEITO A REVISÃO PASTORAL.
 */

export type MotivoSocorro = "desanimo" | "tentacao" | "aflicao" | "vazio";

export type Socorro = {
  id: MotivoSocorro;
  /** Como a pessoa nomeia o que sente, na primeira pessoa. */
  rotulo: string;
  /** Uma frase que acolhe sem minimizar. */
  acolhida: string;
  passagem: { texto: string; referencia: string };
  oracao: string;
  jaculatoria: string;
  /** Dito ao fim do silêncio. Nunca promete resultado. */
  encorajamento: string;
};

export const SOCORROS: readonly Socorro[] = [
  {
    id: "desanimo",
    rotulo: "Estou desanimado",
    acolhida:
      "O desânimo não é sinal de que você escolheu errado. Costuma vir justamente quando o começo já passou e ainda falta caminho.",
    passagem: {
      texto:
        "Vinde a mim, todos vós que estais cansados e sobrecarregados, e eu vos aliviarei.",
      referencia: "Mateus 11, 28",
    },
    oracao:
      "Senhor, não tenho hoje a vontade que tinha no primeiro dia. Não vim pedir que o caminho fique fácil, mas que eu não o largue. Dai-me hoje o bastante para hoje. Nossa Senhora, segurai-me a mão até que eu volte a andar sozinho.",
    jaculatoria: "Mãe, não me deixeis desistir.",
    encorajamento:
      "Ninguém atravessa trinta e três dias sem dias assim. Continuar depois deles vale mais do que ter começado com entusiasmo.",
  },
  {
    id: "tentacao",
    rotulo: "Estou sendo tentado",
    acolhida:
      "Sentir a tentação não é consentir nela. Que você tenha aberto esta página já é um movimento na direção contrária.",
    passagem: {
      texto:
        "Deus é fiel, e não permitirá que sejais tentados além das vossas forças; mas, com a tentação, dará também a saída.",
      referencia: "1 Coríntios 10, 13",
    },
    oracao:
      "Senhor, sozinho eu não consigo, e é por isso que estou aqui em vez de estar em outro lugar. Guardai-me neste momento. Nossa Senhora, ficai entre mim e aquilo que me chama.",
    jaculatoria: "Jesus, Maria, salvai-me agora.",
    encorajamento:
      "Passe adiante o que for possível: levante-se, mude de ambiente, procure alguém. A graça costuma agir através de coisas pequenas e concretas.",
  },
  {
    id: "aflicao",
    rotulo: "Estou aflito com alguma coisa",
    acolhida:
      "Você não precisa resolver a aflição antes de rezar. Pode trazê-la exatamente como está.",
    passagem: {
      texto:
        "Lançai sobre ele toda a vossa preocupação, porque ele tem cuidado de vós.",
      referencia: "1 Pedro 5, 7",
    },
    oracao:
      "Senhor, vós conheceis o que me pesa e eu não preciso explicar. Não peço ainda a solução; peço que eu não carregue isto sozinho. Nossa Senhora, que guardastes tantas coisas no coração, ensinai-me a esperar.",
    jaculatoria: "Senhor, confio em vós.",
    encorajamento:
      "Se a aflição tem nome e endereço, vale falar dela com alguém: um sacerdote, uma pessoa de confiança, ou um profissional. Rezar e procurar ajuda não são caminhos concorrentes.",
  },
  {
    id: "vazio",
    rotulo: "Não sinto nada",
    acolhida:
      "A secura é parte conhecida da vida espiritual, e não é castigo nem sinal de falta de fé. Quase todos os santos escreveram sobre ela.",
    passagem: {
      texto:
        "Minha alma tem sede de Deus, do Deus vivo: quando irei e verei a face de Deus?",
      referencia: "Salmo 42, 3",
    },
    oracao:
      "Senhor, não sinto nada, e mesmo assim estou aqui. Aceitai esta presença seca, que é tudo o que tenho hoje para oferecer. Nossa Senhora, rezai vós em mim o que eu não consigo rezar.",
    jaculatoria: "Creio, Senhor; ajudai a minha falta de fé.",
    encorajamento:
      "Rezar sem sentir nada tem valor. Muitas vezes é o momento em que a oração deixa de ser sobre o que sentimos e passa a ser sobre quem escuta.",
  },
] as const;

export function socorroPorId(id: string): Socorro | null {
  return SOCORROS.find((s) => s.id === id) ?? null;
}

/**
 * O limite desta funcionalidade, dito em voz alta.
 * Aparece em toda sessão, sem letra miúda.
 */
export const LIMITE = {
  texto:
    "Este momento de oração não substitui a confissão, a direção espiritual nem ajuda profissional. Se o que você está vivendo for grave ou persistente, procure um sacerdote e, se for o caso, um profissional de saúde.",
  emergencia: {
    aviso: "Se você está pensando em tirar a própria vida, procure ajuda agora.",
    nome: "CVV — Centro de Valorização da Vida",
    telefone: "188",
    detalhe: "Ligação gratuita, 24 horas por dia.",
    site: "https://www.cvv.org.br/",
  },
};
