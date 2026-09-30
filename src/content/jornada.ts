/**
 * O conteúdo de cada um dos 33 dias.
 *
 * ATENÇÃO — ESTADO DO CONTEÚDO
 * Estão escritos aqui os dias que servem de modelo, um para cada etapa da
 * jornada. Os demais aparecem no aplicativo como "em preparação", e não
 * como página vazia ou texto inventado.
 *
 * Nada deste arquivo deve ir a produção sem revisão pastoral. O campo
 * `revisao` registra quem revisou e quando; enquanto estiver nulo, o dia é
 * tratado como rascunho.
 *
 * As indicações de leitura apontam para os parágrafos (§) do Tratado da
 * Verdadeira Devoção. O texto do livro não é reproduzido: o usuário lê no
 * exemplar que adquiriu.
 */

export type Revisao = { por: string; em: string } | null;

export type Dia = {
  numero: number;
  /** O assunto do dia, em poucas palavras. */
  tema: string;
  /** Abre o dia e diz aonde ele vai. */
  introducao: string;
  leitura: {
    /** Ex.: "§ 78 a 82". Vazio quando o dia não tem leitura no Tratado. */
    paragrafos: string | null;
    /** A explicação mastigada do que foi lido. Paráfrase, nunca transcrição. */
    comentario: string[];
  };
  /** Poucas perguntas, para meditar e não para responder por escrito. */
  meditacao: string[];
  /** A oração do dia, pelo nome com que aparece na biblioteca. */
  oracao: { nome: string; motivo: string };
  /** Algo concreto para fazer hoje. */
  exercicio: string;
  /** Frase curta para repetir ao longo do dia. */
  jaculatoria: string;
  /** O que fica decidido ao fim do dia. */
  resolucao: string;
  revisao: Revisao;
};

export const DIAS: readonly Dia[] = [
  {
    numero: 1,
    tema: "O primeiro passo",
    introducao:
      "Hoje você não precisa entender tudo. Precisa apenas começar, e dizer a Deus por que está começando.",
    leitura: {
      paragrafos: "§ 1 a 13",
      comentario: [
        "Montfort abre o Tratado dizendo uma coisa que desarma: foi por Maria que Jesus Cristo veio ao mundo, e é por ela que ele quer reinar nele. O argumento não é sentimental, é lógico. Se Deus escolheu esse caminho para vir até nós, não é estranho que ele seja também o caminho para voltarmos até Ele.",
        "Ele também avisa, logo no começo, que esta devoção é pouco conhecida e que escreve para poucos. Não por elitismo: porque sabe que o que propõe custa alguma coisa. Vale ler essas primeiras páginas sem pressa de concordar.",
        "Se alguma frase soar exagerada, guarde-a em vez de descartá-la. Montfort escreve com a linguagem apaixonada do seu tempo, e muita coisa que soa excessiva na primeira leitura se esclarece nos capítulos seguintes.",
      ],
    },
    meditacao: [
      "O que me trouxe até aqui? Houve um acontecimento, uma pessoa, uma inquietação?",
      "O que eu espero que seja diferente em mim daqui a trinta e três dias?",
      "Existe algo que eu já sei que não vou querer entregar?",
    ],
    oracao: {
      nome: "Vinde, Espírito Criador",
      motivo:
        "Começa-se pedindo luz, porque nada do que vem a seguir se faz por esforço próprio.",
    },
    exercicio:
      "Escolha um horário fixo para os próximos trinta e três dias e proteja-o. Vinte minutos bastam, desde que sejam sempre os mesmos.",
    jaculatoria: "Totus tuus — inteiramente vosso.",
    resolucao:
      "Escrever a carta do primeiro dia, dizendo com as próprias palavras por que decidi fazer esta consagração.",
    revisao: null,
  },
  {
    numero: 2,
    tema: "O espírito do mundo",
    introducao:
      "Antes de encher, esvaziar. Os próximos dias servem para reconhecer o que já pensa dentro de nós sem que tenhamos escolhido.",
    leitura: {
      paragrafos: "§ 78 a 82",
      comentario: [
        "O que Montfort chama de espírito do mundo não é o mundo criado por Deus, nem as pessoas, nem o trabalho, nem as coisas boas da vida. É uma maneira de julgar: a que mede tudo pela aparência, pelo resultado imediato e pela opinião dos outros.",
        "Ela é difícil de enxergar porque não se apresenta como escolha. Aparece como bom senso, como o modo normal de ver as coisas. Por isso a primeira parte da preparação é de reconhecimento, e não ainda de combate.",
        "Repare que o exame não é sobre pecados grandes. É sobre critérios: o que me faz sentir bem-sucedido, o que me envergonha, diante de quem eu quero parecer bem.",
      ],
    },
    meditacao: [
      "Que opinião alheia pesa mais do que eu gostaria de admitir?",
      "Quando tomei uma decisão recente, o que de fato pesou: o que era bom, ou o que ia parecer bem?",
      "Em que ponto eu aceito para mim um critério que rejeitaria em outra pessoa?",
    ],
    oracao: {
      nome: "Ave Maris Stella",
      motivo:
        "Um hino antigo que pede caminho seguro a quem navega — e é disso que se trata nestes primeiros dias.",
    },
    exercicio:
      "Passe hoje uma hora sem consultar o celular por hábito. Repare quantas vezes a mão o procura sem motivo.",
    jaculatoria: "Senhor, que eu veja.",
    resolucao:
      "Identificar um critério meu que vem do espírito do mundo, e anotá-lo sem me justificar.",
    revisao: null,
  },
  {
    numero: 13,
    tema: "A verdade sobre mim",
    introducao:
      "Começa hoje a primeira semana. Olhar para dentro com verdade é desconfortável, mas é a única entrada que a graça tem.",
    leitura: {
      paragrafos: "§ 79 a 89",
      comentario: [
        "O conhecimento de si mesmo que Montfort propõe não é auto-observação nem autoanálise. É reconhecer, diante de Deus, que não nos bastamos — e que essa insuficiência não é um defeito a esconder, mas o lugar por onde Ele entra.",
        "A tentação desta semana é o desânimo. Ver a própria pobreza sem ver a misericórdia produz tristeza, não conversão. Se em algum momento a leitura o deixar pesado, pare e reze; o objetivo não é humilhação, é verdade.",
        "A outra tentação é o oposto: olhar de leve, concordar em tese e passar adiante. Sete dias são dados justamente para não passar rápido.",
      ],
    },
    meditacao: [
      "Que defeito meu eu já desisti de combater, e por quê?",
      "O que eu prefiro que os outros não saibam a meu respeito?",
      "Onde, nos últimos meses, eu percebi que fui ajudado sem merecer?",
    ],
    oracao: {
      nome: "Ladainha do Espírito Santo",
      motivo:
        "Pede-se o dom da verdade antes de olhar para dentro, para que o olhar não se torne acusação.",
    },
    exercicio:
      "Peça desculpas hoje a alguém a quem você deve um pedido de desculpas, mesmo que antigo e pequeno.",
    jaculatoria: "Tende compaixão de mim, que sou pecador.",
    resolucao:
      "Fazer um exame de consciência escrito, e considerar marcar uma confissão antes do Grande Dia.",
    revisao: null,
  },
  {
    numero: 20,
    tema: "Quem é ela",
    introducao:
      "Começa a segunda semana. Depois de olhar para si, olhar para aquela que foi dada como mãe.",
    leitura: {
      paragrafos: "§ 14 a 39",
      comentario: [
        "Montfort começa afirmando uma coisa que evita todo mal-entendido: Maria não é necessária a Deus por natureza. Ele não precisava dela, escolheu-a. Tudo o que ela tem, tem por dom.",
        "Daí ele tira a consequência que interessa: se Deus quis depender de uma criatura para vir ao mundo, então o caminho dela não é um atalho devocional, é o caminho que o próprio Deus abriu.",
        "Esta semana costuma ser a que mais desfaz resistências. Muita gente chega aqui com receio de estar exagerando na devoção a Maria, e descobre que o exagero seria justamente separá-la de Cristo, a quem ela sempre remete.",
      ],
    },
    meditacao: [
      "Que ideia eu tinha de Nossa Senhora antes de começar esta preparação?",
      "Há em mim algum receio de que a devoção a ela tire algo de Cristo? De onde vem esse receio?",
      "O que muda em mim se eu a tratar como mãe, e não como personagem?",
    ],
    oracao: {
      nome: "Ladainha de Nossa Senhora",
      motivo:
        "Cada invocação é um título antigo; rezá-las devagar é conhecê-la pelos nomes que a Igreja lhe deu.",
    },
    exercicio:
      "Reze hoje um terço inteiro, sem pressa e sem fazer outra coisa ao mesmo tempo.",
    jaculatoria: "Mãe, ensinai-me a conhecer vosso Filho.",
    resolucao:
      "Rezar o terço todos os dias até o fim da preparação, ainda que seja uma dezena nos dias impossíveis.",
    revisao: null,
  },
  {
    numero: 27,
    tema: "Aonde tudo isto leva",
    introducao:
      "Começa a última semana. As duas anteriores existiam para chegar até aqui: a Cristo.",
    leitura: {
      paragrafos: "§ 60 a 67",
      comentario: [
        "Montfort é categórico: se a devoção a Maria afastasse de Jesus Cristo, seria preciso rejeitá-la como falsa. Ela vale precisamente porque leva a Ele, e desaparece quando chega — como o caminho desaparece quando se chega em casa.",
        "É por isso que a consagração não se dirige a Maria como destino final. A fórmula entrega a pessoa a Jesus Cristo, e pede a Maria que conduza e guarde essa entrega.",
        "Nesta semana o texto volta aos mistérios da vida de Cristo. Não é matéria nova: é o mesmo caminho, visto agora do fim.",
      ],
    },
    meditacao: [
      "Que imagem de Jesus Cristo eu carrego? De onde ela veio?",
      "Em que parte da minha vida eu ainda não o deixei entrar?",
      "O que significa, concretamente, pertencer a Ele a partir do mês que vem?",
    ],
    oracao: {
      nome: "Ó Jesus vivente em Maria",
      motivo:
        "A oração com que Montfort fecha o caminho, pedindo que Cristo viva em nós como viveu nela.",
    },
    exercicio:
      "Passe quinze minutos em silêncio, sem ler e sem pedir nada. Apenas na presença.",
    jaculatoria: "Jesus vivente em Maria, vinde viver em mim.",
    resolucao:
      "Definir o horário, o lugar e, se possível, a missa em que farei a consagração.",
    revisao: null,
  },
] as const;

const POR_NUMERO = new Map(DIAS.map((d) => [d.numero, d]));

/** O conteúdo do dia, ou null quando ainda está por escrever. */
export function diaPorNumero(n: number): Dia | null {
  return POR_NUMERO.get(n) ?? null;
}

/** Os dias que já têm conteúdo, para o painel de quem escreve. */
export const DIAS_ESCRITOS = DIAS.map((d) => d.numero);
