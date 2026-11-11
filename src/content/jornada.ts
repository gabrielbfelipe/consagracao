/**
 * O conteúdo dos trinta e três dias.
 *
 * DE ONDE VEM O ROTEIRO
 * Da própria obra, nos números 227 a 233 do Tratado da Verdadeira Devoção,
 * onde São Luís Maria descreve os exercícios preparatórios: ao menos doze
 * dias para desapegar-se do espírito do mundo e, depois, três semanas —
 * conhecimento de si (§ 228), conhecimento da Santíssima Virgem (§ 229) e
 * conhecimento de Jesus Cristo (§ 230). O que cada semana reza vem dos
 * mesmos números, e está em DISCIPLINA_DAS_SEMANAS, logo abaixo.
 *
 * A LEITURA ANDA SEMPRE PARA A FRENTE
 * Os trinta e três dias atravessam o Tratado inteiro, do § 1 ao § 273, sem
 * repetir e sem saltar: o dia seguinte começa exatamente onde o anterior
 * parou. Por isso a faixa é guardada como dois números, e não como texto —
 * assim a regra pode ser conferida por teste, e não por boa vontade. Ver
 * jornada.test.ts.
 *
 * Os cortes caem em fronteiras do livro (fim de artigo, fim de capítulo), e
 * não em contas de dividir: ler meia explicação e parar seria pior do que
 * um dia mais longo. É por isso que os dias variam entre cinco e dezoito
 * parágrafos — os números do Tratado têm tamanhos muito diferentes.
 *
 * As quatro etapas recebem a parte do livro que lhes corresponde: os doze
 * dias preliminares vão até o § 82, que é justamente onde Montfort fala em
 * despojar-se; a primeira semana fecha no § 134, fim da exposição da
 * consagração; a segunda cobre os motivos e a figura de Rebeca e Jacó; e a
 * terceira termina no § 273, com o método de comunhão — que é o que se faz
 * na manhã seguinte.
 *
 * O QUE ESTE ARQUIVO NÃO CONTÉM
 * O texto do livro. As indicações apontam para os parágrafos (§), que são os
 * mesmos em qualquer edição numerada, e o comentário é escrito aqui — é
 * paráfrase e explicação, nunca transcrição. As traduções do Tratado
 * pertencem a quem as fez, e a leitura se faz no exemplar que a pessoa
 * adquiriu. O mesmo vale para a fórmula de consagração, que Montfort manda
 * recitar no § 231 e que não é reproduzida aqui.
 *
 * ESTADO DO CONTEÚDO
 * Nada deste arquivo deve ir a produção sem revisão pastoral. O campo
 * `revisao` registra quem revisou e quando; enquanto estiver nulo, o dia é
 * tratado como rascunho.
 */

/** O Tratado vai do § 1 ao § 273 em qualquer edição numerada. */
export const PRIMEIRO_PARAGRAFO = 1;
export const ULTIMO_PARAGRAFO = 273;

export type Revisao = { por: string; em: string } | null;

export type Dia = {
  numero: number;
  /** O assunto do dia, em poucas palavras. */
  tema: string;
  /** Abre o dia e diz aonde ele vai. */
  introducao: string;
  leitura: {
    /** Primeiro parágrafo do dia. */
    de: number;
    /** Último parágrafo do dia, inclusive. */
    ate: number;
    /** A explicação mastigada do que foi lido. Paráfrase, nunca transcrição. */
    comentario: string[];
  };
  /** Poucas perguntas, para meditar e não para responder por escrito. */
  meditacao: string[];
  /** A oração do dia, pelo nome com que aparece na biblioteca. */
  oracao: {
    nome: string;
    motivo: string;
    /** id em content/oracoes.ts, quando o texto já está na biblioteca. */
    id?: string;
  };
  /** Algo concreto para fazer hoje. */
  exercicio: string;
  /** Frase curta para repetir ao longo do dia. */
  jaculatoria: string;
  /** O que fica decidido ao fim do dia. */
  resolucao: string;
  revisao: Revisao;
};

/**
 * O que se reza em cada etapa, conforme os § 228 a 230.
 *
 * Montfort não distribui orações dia a dia: prescreve-as por semana, e todas
 * se repetem todo dia daquela semana. Por isso isto fica fora da lista dos
 * dias — repeti-lo trinta e três vezes seria dizer trinta e três vezes a
 * mesma coisa, e esconder que o essencial da preparação é justamente a
 * repetição.
 */
export const DISCIPLINA_DAS_SEMANAS: readonly {
  etapa: string;
  fonte: string;
  todoDia: string[];
  nota?: string;
}[] = [
  {
    etapa: "Dias preliminares",
    fonte: "§ 227",
    todoDia: ["Vinde, Espírito Criador", "Ave, Estrela do Mar"],
    nota: "São doze dias para desapegar-se do espírito do mundo, contrário ao de Jesus Cristo.",
  },
  {
    etapa: "Conhecimento de si mesmo",
    fonte: "§ 228",
    todoDia: [
      "Ladainha do Espírito Santo, e a oração que a segue",
      "Ave, Estrela do Mar",
      "Ladainha de Nossa Senhora",
    ],
    nota: "Tudo em espírito de humildade, pedindo o conhecimento de si e a contrição dos próprios pecados. Montfort sugere repetir ao longo do dia: “Domine, ut videam” — Senhor, que eu veja; e “Noverim me” — que eu me conheça.",
  },
  {
    etapa: "Conhecimento de Nossa Senhora",
    fonte: "§ 229",
    todoDia: [
      "Ladainha do Espírito Santo",
      "Ave, Estrela do Mar",
      "O rosário, ou ao menos um terço, nesta intenção",
    ],
    nota: "A mesma disciplina da semana anterior, e mais o rosário todos os dias. Pede-se ao Espírito Santo o conhecimento daquela que ele cobriu com sua sombra.",
  },
  {
    etapa: "Conhecimento de Jesus Cristo",
    fonte: "§ 230",
    todoDia: [
      "Ladainha do Espírito Santo",
      "Ave, Estrela do Mar",
      "Ladainha do Santíssimo Nome de Jesus",
      "A oração de santo Agostinho que está no § 67",
    ],
    nota: "Montfort manda repetir cem vezes ao dia, se for preciso: “Noverim te” — Senhor, que eu vos conheça.",
  },
] as const;

export const DIAS: readonly Dia[] = [
  // ======================================================================
  // DIAS PRELIMINARES (1 a 12) — § 227 · leitura do § 1 ao § 82
  // Desapegar-se do espírito do mundo, contrário ao de Jesus Cristo. A
  // leitura termina exactamente no trecho em que Montfort manda despojar-se.
  // ======================================================================
  {
    numero: 1,
    tema: "O primeiro passo",
    introducao:
      "Hoje você não precisa entender tudo. Precisa apenas começar, e dizer a Deus por que está começando.",
    leitura: {
      de: 1,
      ate: 7,
      comentario: [
        "Montfort abre o Tratado dizendo uma coisa que desarma: foi por Maria que Jesus Cristo veio ao mundo, e é por ela que ele quer reinar nele. O argumento não é sentimental, é lógico. Se Deus escolheu esse caminho para vir até nós, não é estranho que ele seja também o caminho para voltarmos até Ele.",
        "Ele avisa logo que escreve para poucos, e que esta devoção é pouco conhecida. Não por elitismo: porque sabe que o que propõe custa alguma coisa. Vale ler estas primeiras páginas sem pressa de concordar.",
        "Se alguma frase soar exagerada, guarde-a em vez de descartá-la. Montfort escreve com a linguagem apaixonada do seu tempo, e muita coisa que soa excessiva na primeira leitura se esclarece nos capítulos seguintes.",
      ],
    },
    meditacao: [
      "O que me trouxe até aqui? Houve um acontecimento, uma pessoa, uma inquietação?",
      "O que eu espero que seja diferente em mim daqui a trinta e três dias?",
      "Existe algo que eu já sei que não vou querer entregar?",
    ],
    oracao: {
      id: "veni-creator",
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
    tema: "Aquela que ficou escondida",
    introducao:
      "A primeira coisa que Montfort observa sobre Maria é o silêncio que a cerca — e ele lê esse silêncio como intenção, não como esquecimento.",
    leitura: {
      de: 8,
      ate: 13,
      comentario: [
        "Deus Pai consentiu que ela fizesse poucos milagres em vida; o Filho quase não falou dela em público; o Espírito Santo deixou que os evangelistas dissessem pouquíssimo. Montfort não vê nisso desinteresse: vê um esconderijo deliberado, em respeito à humildade dela.",
        "Daí ele tira o que será o fio do livro: o que esteve escondido será manifestado. Quanto mais o fim dos tempos se aproxima, mais ela será conhecida — não por si, mas porque é por ela que Cristo torna a ser conhecido.",
        "Repare no tom destas páginas. Não há aqui nenhuma exigência ainda; há um convite a olhar para uma pessoa que passou despercebida. Para quem vem de uma devoção morna, este é o trecho que costuma desarrumar as coisas.",
      ],
    },
    meditacao: [
      "O que eu sei sobre Nossa Senhora que não aprendi em imagem ou canção?",
      "Há em mim alguma desconfiança quanto a esta devoção? De onde ela vem?",
      "Que coisas importantes da minha vida passaram despercebidas por serem silenciosas?",
    ],
    oracao: {
      id: "ave-maris-stella",
      nome: "Ave, Estrela do Mar",
      motivo:
        "Um hino antigo que pede caminho seguro a quem navega — e é disso que se trata nestes primeiros dias.",
    },
    exercicio:
      "Fique cinco minutos em silêncio diante de uma imagem de Nossa Senhora, sem pedir nada. Só olhando.",
    jaculatoria: "Mostrai-vos minha mãe.",
    resolucao: "Escrever a objeção que eu ainda tenho, para relê-la no dia 26.",
    revisao: null,
  },
  {
    numero: 3,
    tema: "Deus quis precisar dela",
    introducao:
      "Começa o primeiro capítulo. A afirmação que o abre é a mais forte do livro, e precisa ser lida inteira para não ser mal entendida.",
    leitura: {
      de: 14,
      ate: 20,
      comentario: [
        "Montfort diz que Deus Pai quis servir-se de Maria para dar o seu Filho ao mundo. E acrescenta a ressalva que desfaz todo equívoco: Deus não precisava dela por natureza, escolheu precisar. A necessidade é de decisão, não de falta.",
        "A distinção importa porque é ela que separa esta devoção de qualquer exagero. Maria não acrescenta nada a Deus; recebe tudo. O que a torna grande é inteiramente dom, e é por isso que honrá-la nunca tira nada d'Ele.",
        "Se Deus quis entrar no mundo por uma criatura, diz Montfort, não é estranho que queira que entremos n'Ele pelo mesmo caminho. Este é o argumento que o livro vai desenvolver até o fim.",
      ],
    },
    meditacao: [
      "O que muda se a humildade de Maria for a razão da grandeza dela, e não o contrário?",
      "Onde eu confundo ser importante com ser necessário?",
      "O que em mim foi dado, e eu trato como conquistado?",
    ],
    oracao: {
      id: "veni-creator",
      nome: "Vinde, Espírito Criador",
      motivo:
        "Pede-se entendimento, que é dom, antes de julgar o que se está lendo.",
    },
    exercicio:
      "Escreva três coisas boas que você tem e não escolheu: uma pessoa, uma circunstância, uma capacidade.",
    jaculatoria: "Tudo o que tenho, recebi.",
    resolucao: "Agradecer antes de pedir, em toda oração destes dias.",
    revisao: null,
  },
  {
    numero: 4,
    tema: "O Filho e o Espírito",
    introducao:
      "Ontem foi o Pai. Hoje Montfort mostra que as outras duas Pessoas fizeram a mesma escolha, e pelo mesmo motivo.",
    leitura: {
      de: 21,
      ate: 27,
      comentario: [
        "O Filho quis descer até nós por ela, e Montfort observa que ele continua a vir assim — nos sacramentos, na graça, na formação de cada cristão. O método não mudou depois de Belém.",
        "O Espírito Santo formou Cristo nela e nela continua a formar os membros de Cristo. É a imagem que Montfort mais usa: ela é o lugar onde a obra se faz, não a obreira que a faz sozinha.",
        "A palavra que ele emprega aqui e que costuma incomodar é molde. Não é mecânica nem fria: quer dizer que entrar nela é sair parecido com Jesus, porque foi esse o formato que ela já deu uma vez.",
      ],
    },
    meditacao: [
      "Em que ponto da minha vida eu preciso ser refeito, e não apenas corrigido?",
      "Eu rezo ao Espírito Santo alguma vez, ou só falo d'Ele?",
      "O que é mais fácil em mim: esforçar-me ou deixar-me moldar?",
    ],
    oracao: {
      id: "veni-creator",
      nome: "Vinde, Espírito Criador",
      motivo: "É o hino ao Espírito que forma Cristo em quem se deixa formar.",
    },
    exercicio:
      "Faça hoje uma tarefa comum devagar de propósito — lavar a louça, caminhar, comer — sem nenhuma tela por perto.",
    jaculatoria: "Vinde, Espírito Santo, formai Cristo em mim.",
    resolucao:
      "Proteger o horário que escolhi no primeiro dia, mesmo quando o dia apertar.",
    revisao: null,
  },
  {
    numero: 5,
    tema: "O que ela faz agora",
    introducao:
      "Se o papel dela tivesse terminado em Belém, isto seria história. Montfort sustenta que não terminou.",
    leitura: {
      de: 28,
      ate: 36,
      comentario: [
        "Estas páginas fecham o primeiro artigo descrevendo o que ele chama de ordem da graça: Deus serviu-se dela uma vez e continua a servir-se dela, de modo que o que foi feito então é a figura do que se faz agora em cada um.",
        "Montfort escreve que ela é o paraíso de Deus, o seu mundo inefável, o santuário onde ele repousa. A linguagem é a do seu tempo e soa densa; por baixo dela está uma afirmação simples — Deus tem gosto por aquele lugar, e quem vai para lá é bem recebido.",
        "Vale notar o que ele nunca diz. Em nenhum momento ela aparece como origem da graça; aparece sempre como aquela por onde a graça passa. É uma preposição, não uma fonte.",
      ],
    },
    meditacao: [
      "Eu trato Nossa Senhora como alguém do passado ou como alguém vivo?",
      "O que eu peço a ela? E o que nunca pensei em pedir?",
      "Que parte da minha formação cristã veio por mãos de mulheres?",
    ],
    oracao: {
      id: "ave-maris-stella",
      nome: "Ave, Estrela do Mar",
      motivo: "Chama-se estrela aquela por quem a luz chega, e não a luz.",
    },
    exercicio:
      "Leve hoje a Nossa Senhora um pedido que você nunca fez por achá-lo pequeno demais.",
    jaculatoria: "Por vós, até Ele.",
    resolucao: "Rezar uma Ave-Maria em cada passagem difícil do dia.",
    revisao: null,
  },
  {
    numero: 6,
    tema: "Necessária a todos",
    introducao:
      "Começa o segundo artigo, e com ele a afirmação que mais discussão provoca. Leia-a inteira antes de reagir.",
    leitura: {
      de: 37,
      ate: 43,
      comentario: [
        "Montfort tira as consequências do que afirmou: se Deus quis servir-se dela, então a devoção a ela é necessária à salvação — e, mais ainda, a quem é chamado a uma perfeição particular.",
        "A frase precisa de cuidado. Ele não está pondo uma condição a mais sobre quem nunca ouviu falar dela. Está dizendo que, na ordem que Deus de facto estabeleceu, ninguém chega ao Filho por fora do caminho que o Filho escolheu — e que negá-la deliberadamente é recusar esse caminho.",
        "Repare que ele próprio modula a afirmação à medida que avança. A leitura honesta deste trecho exige lê-lo até o fim, e não por frases soltas, que é como ele costuma ser citado dos dois lados.",
      ],
    },
    meditacao: [
      "Que afirmação deste trecho me incomoda? Consigo dizer exatamente por quê?",
      "Eu julgo o que leio pelo que diz, ou pelo que temo que queira dizer?",
      "A quem eu poderia levar esta dúvida com honestidade?",
    ],
    oracao: {
      id: "veni-creator",
      nome: "Vinde, Espírito Criador",
      motivo: "Pede-se o espírito de inteligência, que é dom e não esforço.",
    },
    exercicio:
      "Anote a frase do livro que mais lhe custou aceitar hoje. Guarde-a; ela volta no dia 26.",
    jaculatoria: "Senhor, que eu veja.",
    resolucao: "Não descartar nenhuma frase antes de a ter entendido.",
    revisao: null,
  },
  {
    numero: 7,
    tema: "Os últimos tempos",
    introducao:
      "Há no Tratado um trecho profético que ficou famoso. Vale lê-lo com a sobriedade com que foi escrito.",
    leitura: {
      de: 44,
      ate: 50,
      comentario: [
        "Montfort anuncia que nos últimos tempos Maria será mais conhecida que nunca, e que por ela Deus formará grandes santos. É um texto de esperança, não de terror, escrito na linguagem profética que a tradição permite.",
        "O risco de ler isto é duplo: tomar como calendário, o que o texto não é; ou descartar como exagero barroco, o que seria perder o essencial. O essencial é a convicção de que a história não está entregue ao acaso.",
        "A leitura proveitosa é esta: o que ele descreve de santos formados por ela é o que você está pedindo para si daqui a vinte e seis dias. O trecho deixa de ser sobre o futuro do mundo e passa a ser sobre o seu.",
      ],
    },
    meditacao: [
      "O que eu espero de verdade quando penso no futuro?",
      "Eu creio que a minha vida tem lugar em algo maior do que ela?",
      "Que santo eu conheço que parece ter sido formado assim?",
    ],
    oracao: {
      id: "ave-maris-stella",
      nome: "Ave, Estrela do Mar",
      motivo: "O hino de quem navega sem ver a margem.",
    },
    exercicio:
      "Leia hoje a vida de um santo marcado pela devoção a Nossa Senhora. Vinte minutos bastam.",
    jaculatoria: "Vinde, Espírito Santo, pela vossa esposa fidelíssima.",
    resolucao: "Escolher um santo como companhia para o resto da preparação.",
    revisao: null,
  },
  {
    numero: 8,
    tema: "Os apóstolos dos últimos tempos",
    introducao:
      "O retrato que Montfort faz dos santos do fim é também um retrato do que ele espera de quem lê o livro.",
    leitura: {
      de: 51,
      ate: 59,
      comentario: [
        "Ele descreve homens ardentes, livres, desapegados, sem nada de seu — e sustentados por Maria. O trecho é o ponto alto da primeira parte, e fecha o capítulo.",
        "Vale ler isto sem heroísmo. O que ele descreve não é temperamento forte: é gente que não tem o que defender, e por isso pode ir aonde for preciso. O desapego vem antes da coragem, e não depois.",
        "Hoje termina o primeiro capítulo. O seguinte muda de tom: deixa a contemplação e passa às verdades duras sobre nós mesmos. É o preparo para os dias que fecham a etapa preliminar.",
      ],
    },
    meditacao: [
      "O que eu tenho a defender que me impede de ir aonde deveria?",
      "Que liberdade eu invejo em alguém?",
      "Se eu não precisasse provar nada a ninguém, o que faria diferente amanhã?",
    ],
    oracao: {
      id: "magnificat",
      nome: "Magnificat",
      motivo:
        "O cântico em que os poderosos descem e os humildes sobem — o avesso do mundo, dito por quem não tinha nada.",
    },
    exercicio:
      "Separe hoje algo seu que tem valor e dê a quem precisa. Não o que sobra: algo que você usaria.",
    jaculatoria: "Nada de meu.",
    resolucao:
      "Fixar uma esmola concreta para o dia da consagração, conforme o § 232 pede.",
    revisao: null,
  },
  {
    numero: 9,
    tema: "Cristo é o fim de tudo",
    introducao:
      "Começa o segundo capítulo, com a verdade que governa todas as outras — e com a frase que protege esta devoção de si mesma.",
    leitura: {
      de: 60,
      ate: 67,
      comentario: [
        "Montfort é categórico: Jesus Cristo é o fim último de toda devoção. Se a devoção a Maria afastasse d'Ele, seria preciso rejeitá-la como falsa e diabólica. Ela vale precisamente porque leva a Ele, e desaparece quando chega — como o caminho desaparece quando se chega em casa.",
        "É por isso que a consagração não se dirige a Maria como destino final. A fórmula entrega a pessoa a Jesus Cristo, e pede a Maria que conduza e guarde essa entrega.",
        "No fim deste trecho, no § 67, está a oração de santo Agostinho que o § 230 manda rezar todos os dias da última semana. Marque a página; você voltará a ela no dia 28.",
      ],
    },
    meditacao: [
      "Que imagem de Jesus Cristo eu carrego? De onde ela veio?",
      "Em que parte da minha vida eu ainda não o deixei entrar?",
      "A minha devoção a Maria me aproxima d'Ele, ou substitui Ele?",
    ],
    oracao: {
      id: "jesus-vivente-em-maria",
      nome: "Ó Jesus vivente em Maria",
      motivo:
        "A oração com que Montfort fecha o caminho, pedindo que Cristo viva em nós como viveu nela.",
    },
    exercicio:
      "Passe quinze minutos em silêncio, sem ler e sem pedir nada. Apenas na presença.",
    jaculatoria: "Jesus vivente em Maria, vinde viver em mim.",
    resolucao: "Marcar a página do § 67 no meu exemplar.",
    revisao: null,
  },
  {
    numero: 10,
    tema: "A quem eu pertenço",
    introducao:
      "Antes de se entregar, convém saber que a entrega não cria um vínculo novo. Reconhece um que já existia.",
    leitura: {
      de: 68,
      ate: 72,
      comentario: [
        "Montfort argumenta que já pertencemos a Jesus Cristo por título de criação e por título de redenção. Não somos nossos, e nunca fomos. A consagração não transfere uma propriedade; reconhece uma que foi esquecida.",
        "Isso tira da consagração qualquer ar de gesto heroico. Ninguém está dando a Deus algo que lhe faltasse. Está devolvendo, de livre vontade, o que já era d'Ele e vinha sendo administrado como se fosse próprio.",
        "A palavra que ele usa — escravo — é a que mais choca hoje, e ele a usa de propósito, no sentido jurídico do século XVIII: pertença total. O que a torna cristã é ser escolhida livremente e por amor, e é a isso que o livro voltará no § 120.",
      ],
    },
    meditacao: [
      "Que parte da minha vida eu administro como se fosse só minha?",
      "O que muda se eu não me pertenço?",
      "Em que a palavra escravidão me incomoda, e em que ela me descreve?",
    ],
    oracao: {
      id: "ave-maris-stella",
      nome: "Ave, Estrela do Mar",
      motivo: "“Solve vincla reis” — desata as prisões dos culpados.",
    },
    exercicio:
      "Abra o extrato e a agenda do último mês. Sem julgar, escreva as três coisas que mais consumiram seu dinheiro e seu tempo.",
    jaculatoria: "Senhor, eu sou vosso.",
    resolucao:
      "Escolher uma dessas três coisas e reduzi-la, de modo verificável, até o Grande Dia.",
    revisao: null,
  },
  {
    numero: 11,
    tema: "As promessas do batismo",
    introducao:
      "Quase todos nós fizemos as promessas do batismo por procuração, quando não podíamos entender. Hoje se lê o que elas diziam.",
    leitura: {
      de: 73,
      ate: 77,
      comentario: [
        "No batismo renunciou-se a Satanás, às suas pompas e às suas obras, e deu-se a Jesus Cristo. Montfort observa, sem acusar ninguém, que quase ninguém se lembra disso — e que é esse esquecimento que explica a distância entre o que os cristãos dizem crer e o modo como vivem.",
        "Daqui nasce a ideia central do que ele vai propor: a consagração não é uma devoção a mais, é a renovação pessoal daquilo que foi prometido por nós sem nós. O Grande Dia é a ocasião de assumir com a própria boca o que outra boca disse.",
        "É por isso que ele insiste que esta prática não acrescenta nada à fé: devolve-lhe o que já estava lá e tinha caído no esquecimento.",
      ],
    },
    meditacao: [
      "Eu já li as promessas do meu batismo com atenção alguma vez?",
      "A que eu renunciaria hoje, se renunciasse de verdade?",
      "O que na minha vida contradiz o que eu digo crer?",
    ],
    oracao: {
      id: "ladainha-do-espirito-santo",
      nome: "Ladainha do Espírito Santo",
      motivo:
        "Aquele que agiu no batismo é o mesmo a quem se pede memória do que ali se prometeu.",
    },
    exercicio:
      "Procure a data do seu batismo. Se não souber, peça à paróquia onde foi batizado.",
    jaculatoria: "Renuncio, e me dou.",
    resolucao: "Celebrar daqui em diante a data do meu batismo.",
    revisao: null,
  },
  {
    numero: 12,
    tema: "Despojar-se",
    introducao:
      "Último dos doze dias, e o trecho não podia ser outro: é aqui que Montfort manda esvaziar antes de encher.",
    leitura: {
      de: 78,
      ate: 82,
      comentario: [
        "Montfort descreve o fundo que fica em nós mesmo depois do batismo: a inclinação ao mal, o amor-próprio, a confiança em si, o apego ao próprio juízo. Não fala dos pecados visíveis; fala do que se mistura ao que fazemos de melhor.",
        "É um exame desconfortável porque atinge a parte da vida de que mais nos orgulhamos. A obra boa feita para ser vista, a generosidade que cobra reconhecimento, o conselho que quer ter razão. Nada disso é mentira; é verdade contaminada.",
        "O remédio que ele propõe não é fazer menos, é fazer por outras mãos — e é exatamente isso que a consagração vai organizar. Com estes cinco parágrafos fecham-se os doze dias preliminares: a casa está varrida, e amanhã começa a primeira semana.",
      ],
    },
    meditacao: [
      "Em que coisa boa que faço há um pedaço esperando reconhecimento?",
      "Quando me contrariam, o que dói: o erro, ou não ter sido eu a decidir?",
      "Estou pronto para olhar para dentro durante sete dias seguidos?",
    ],
    oracao: {
      id: "veni-creator",
      nome: "Vinde, Espírito Criador",
      motivo:
        "Antes de abrir a primeira semana, pede-se de novo a luz — porque o que vem agora não se vê sem ela.",
    },
    exercicio:
      "Marque hoje a sua confissão, se ainda não marcou. O § 231 a pede antes do dia da consagração.",
    jaculatoria: "Não a minha vontade, mas a vossa.",
    resolucao: "Entrar na primeira semana sem pressa de chegar ao fim dela.",
    revisao: null,
  },

  // ======================================================================
  // PRIMEIRA SEMANA (13 a 19) — § 228 · leitura do § 83 ao § 134
  // Conhecimento de si mesmo e contrição. Termina no fim do capítulo IV,
  // onde a consagração já está inteiramente exposta.
  // ======================================================================
  {
    numero: 13,
    tema: "Preciso de alguém",
    introducao:
      "Começa a primeira semana. Olhar para dentro com verdade é desconfortável, mas é a única entrada que a graça tem.",
    leitura: {
      de: 83,
      ate: 89,
      comentario: [
        "Dois artigos curtos e decisivos. No primeiro, Montfort diz que entre Deus e nós a distância é infinita e precisamos de um mediador — e esse é Jesus Cristo, e ele não admite outro nessa função. Mas acrescenta: diante do próprio Cristo, que é Deus, a nossa miséria ainda pede alguém que nos apresente.",
        "No segundo, a observação que a experiência confirma: conservar a graça é mais difícil do que obtê-la. Carregamos um tesouro em vaso frágil, e quase sempre descobrimos o roubo depois de consumado.",
        "Repare na honestidade do raciocínio. A devoção que ele vai propor não nasce de entusiasmo, nasce de um diagnóstico: primeiro constata-se a fragilidade, só depois se procura um depositário.",
      ],
    },
    meditacao: [
      "Que defeito meu eu já desisti de combater, e por quê?",
      "Que graça clara eu recebi e deixei esfriar?",
      "A quem eu confiaria algo precioso de verdade? Por quê?",
    ],
    oracao: {
      id: "ladainha-do-espirito-santo",
      nome: "Ladainha do Espírito Santo",
      motivo:
        "Pede-se o dom da verdade antes de olhar para dentro, para que o olhar não se torne acusação.",
    },
    exercicio:
      "Peça desculpas hoje a alguém a quem você deve um pedido de desculpas, mesmo que antigo e pequeno.",
    jaculatoria: "Noverim me — que eu me conheça.",
    resolucao:
      "Fazer um exame de consciência escrito, e marcar a confissão se ainda não marquei.",
    revisao: null,
  },
  {
    numero: 14,
    tema: "Os falsos devotos",
    introducao:
      "Antes de dizer o que é a verdadeira devoção, Montfort descreve os modos de errar. É um espelho incômodo, e é por isso que ele vem na semana do conhecimento de si.",
    leitura: {
      de: 90,
      ate: 97,
      comentario: [
        "Ele começa a enumerar: os críticos, que desconfiam de tudo; os escrupulosos, que temem honrar Maria para não ofender Cristo; os exteriores, cuja devoção não passa dos gestos; os presunçosos, que se dizem devotos e continuam no pecado.",
        "O mais perigoso é este último, e Montfort é severo com razão: uma devoção que dispensa a conversão não é devoção, é superstição com vocabulário católico. Quem conta com proteção automática não está confiando — está negociando.",
        "Leia este trecho procurando-se, e não procurando os outros. É a única leitura que dá fruto, e é também a mais difícil.",
      ],
    },
    meditacao: [
      "Em qual destas figuras eu me reconheço?",
      "Minha devoção já me serviu de desculpa para não mudar?",
      "O que eu faço por costume e já não sei por quê?",
    ],
    oracao: {
      id: "ladainha-de-nossa-senhora",
      nome: "Ladainha de Nossa Senhora",
      motivo:
        "O § 228 manda rezá-la todo dia desta semana. Entre os títulos está Refúgio dos pecadores.",
    },
    exercicio:
      "Escolha uma prática sua que virou automatismo e faça-a hoje com atenção inteira — ou deixe-a de lado.",
    jaculatoria: "Senhor, tende piedade de mim.",
    resolucao: "Tirar da minha piedade uma coisa que faço só por hábito.",
    revisao: null,
  },
  {
    numero: 15,
    tema: "O resto do espelho",
    introducao:
      "A lista continua, e os três que faltam são os mais fáceis de encontrar em nós.",
    leitura: {
      de: 98,
      ate: 104,
      comentario: [
        "Os inconstantes, que hoje abraçam uma devoção e amanhã outra; os hipócritas, que cobrem pecados com aparência de piedade; os interesseiros, que recorrem a Nossa Senhora apenas para ganhar causas e curar doenças.",
        "O último é o mais comum e o menos percebido. Pedir é bom e ela gosta que se peça; o problema é quando a relação começa e termina no pedido, e some quando a resposta demora.",
        "Montfort fecha aqui a descrição do que não é devoção verdadeira. Amanhã começa o retrato pelo lado certo — e o contraste é o que faz este trecho valer os dois dias que levou.",
      ],
    },
    meditacao: [
      "A minha oração sobreviveria a um ano sem resposta nenhuma?",
      "Que devoção eu comecei com entusiasmo e larguei?",
      "O que eu peço mais vezes? O que isso diz de mim?",
    ],
    oracao: {
      id: "ladainha-do-espirito-santo",
      nome: "Ladainha do Espírito Santo",
      motivo:
        "Na primeira semana ela se repete todo dia, conforme o § 228, junto com a oração que a segue.",
    },
    exercicio:
      "Reze hoje sem pedir nada para si. Só agradecimento e intercessão por outros.",
    jaculatoria: "Não pelo que recebo, mas por quem sois.",
    resolucao: "Rezar uma dezena por dia por alguém de quem eu não gosto.",
    revisao: null,
  },
  {
    numero: 16,
    tema: "As marcas da devoção verdadeira",
    introducao:
      "Agora o retrato pelo lado certo: os sinais pelos quais se reconhece a devoção que vale.",
    leitura: {
      de: 105,
      ate: 112,
      comentario: [
        "Montfort nomeia as marcas: interior, terna, santa, constante e desinteressada. Repare que nenhuma delas é um sentimento — todas são disposições verificáveis ao longo do tempo, e por isso pedem meses e não minutos para serem reconhecidas.",
        "A que mais custa é a última. Devoção desinteressada é a que permanece quando não vem nada em troca — nem consolação, nem resposta, nem a sensação de estar sendo ouvido. É a prova de que se ama a pessoa e não o benefício.",
        "A terceira marca, santa, é a que liga tudo ao resto da semana: a devoção verdadeira leva a evitar o pecado e a imitar as virtudes dela. Se não mexe na conduta, ainda não chegou ao interior.",
      ],
    },
    meditacao: [
      "Qual destas marcas falta mais na minha devoção?",
      "Eu continuaria rezando se não sentisse nada por um ano?",
      "Que virtude dela me parece mais distante de mim?",
    ],
    oracao: {
      id: "ladainha-de-nossa-senhora",
      nome: "Ladainha de Nossa Senhora",
      motivo:
        "Cada invocação é um título antigo; rezá-las devagar é conhecê-la pelos nomes que a Igreja lhe deu.",
    },
    exercicio:
      "Escolha uma virtude de Nossa Senhora e pratique-a hoje numa situação concreta que você já sabe qual é.",
    jaculatoria: "Tornai-me vosso de verdade.",
    resolucao: "Escolher a marca que me falta e pedi-la todos os dias.",
    revisao: null,
  },
  {
    numero: 17,
    tema: "As práticas comuns, e a que não é comum",
    introducao:
      "Montfort passa em revista as devoções que todos conhecem, e anuncia uma que quase ninguém pratica.",
    leitura: {
      de: 113,
      ate: 119,
      comentario: [
        "As práticas comuns são boas e ele não as despreza: o terço, o escapulário, as ladainhas, o jejum do sábado. Muita gente para nelas, e nelas se salva. O que ele observa é que nenhuma delas pede tudo.",
        "Depois ele anuncia a prática perfeita, e faz questão de dizer que não a inventou: encontrou-a na Igreja, pouco conhecida. O que vem a seguir é a sua exposição.",
        "Este é o ponto de virada do livro. Até aqui foi fundamentação; a partir de amanhã é o que se faz. Convém chegar ao dia 18 tendo entendido o que distingue dar alguma coisa de dar-se.",
      ],
    },
    meditacao: [
      "Que devoções eu já pratico? Elas me custam alguma coisa?",
      "Qual é a diferença, na minha vida, entre dar e dar-me?",
      "O que eu ainda não ofereci a ninguém?",
    ],
    oracao: {
      id: "ave-maris-stella",
      nome: "Ave, Estrela do Mar",
      motivo:
        "O § 228 manda recitá-lo todos os dias desta semana, junto com as ladainhas.",
    },
    exercicio:
      "Prepare a sua confissão por escrito. Não a lista inteira da vida: o que pesa agora.",
    jaculatoria: "Domine, ut videam — Senhor, que eu veja.",
    resolucao: "Confessar-me antes do dia 33, e não na véspera.",
    revisao: null,
  },
  {
    numero: 18,
    tema: "A entrega inteira",
    introducao:
      "Hoje você lê exatamente o que vai fazer no Grande Dia. Convém ler devagar, porque é um compromisso.",
    leitura: {
      de: 120,
      ate: 127,
      comentario: [
        "A prática perfeita consiste em entregar-se inteiramente a Maria, e por ela a Jesus Cristo: o corpo, os bens, os méritos, as satisfações e as orações — tudo, inclusive o direito de dispor do bem que fazemos.",
        "Montfort detalha o que cada parte significa, e a mais difícil é a dos méritos: entregar o valor satisfatório das próprias boas obras, deixando que ela as aplique a quem quiser. Se isso incomoda, o incômodo é sinal de que você entendeu.",
        "Ele responde também à objeção óbvia — e os meus mortos, e as minhas intenções? A resposta dele é que nada se perde, porque quem recebe ama melhor do que nós e distribui melhor do que nós. Aceitar isso é o verdadeiro conteúdo da entrega.",
      ],
    },
    meditacao: [
      "O que eu estou disposto a entregar? E o que eu quero guardar?",
      "Entregar os meus méritos me assusta? Por quê?",
      "Por quem eu rezo, e custaria deixar de dirigir essas orações eu mesmo?",
    ],
    oracao: {
      id: "ladainha-de-nossa-senhora",
      nome: "Ladainha de Nossa Senhora",
      motivo:
        "Antes de se dar a alguém, convém passar devagar pelos nomes dessa pessoa.",
    },
    exercicio:
      "Escreva o que você ainda não quer entregar. Não para resolver hoje: para saber o que é.",
    jaculatoria: "Tudo vosso, e por vós tudo d'Ele.",
    resolucao: "Levar à oração, cada dia que falta, aquilo que escrevi hoje.",
    revisao: null,
  },
  {
    numero: 19,
    tema: "A renovação do batismo",
    introducao:
      "Termina a primeira semana explicando o que a consagração é, exatamente: não uma devoção nova, mas a retomada de uma promessa antiga.",
    leitura: {
      de: 128,
      ate: 134,
      comentario: [
        "Montfort chama a consagração de perfeita renovação dos votos do batismo, e mostra em que ela difere: no batismo fala-se por procuração e promete-se o essencial; aqui fala-se com a própria boca e entrega-se também o acessório — os méritos, as satisfações, o direito de escolher a quem aproveitam.",
        "Ele responde à objeção de que isso seria indiscrição: ninguém entrega mais do que tem, e quem recebe é a própria mãe. A entrega não cria obrigação nova diante de Deus; organiza melhor a que já existia.",
        "Com estes parágrafos a consagração está inteiramente exposta. Se estes sete dias o deixaram menor aos próprios olhos e mais tranquilo, eles funcionaram. Se o deixaram menor e angustiado, falta a segunda metade — e ela começa amanhã.",
      ],
    },
    meditacao: [
      "O que eu descobri sobre mim nesta semana que não sabia no dia 13?",
      "Eu me sinto menor e mais leve, ou menor e mais pesado? O que isso diz?",
      "O que eu levo desta semana para a próxima?",
    ],
    oracao: {
      id: "ladainha-do-espirito-santo",
      nome: "Ladainha do Espírito Santo",
      motivo:
        "Fecha-se a semana pedindo o que o § 228 chama de fundamento de todas as outras graças.",
    },
    exercicio:
      "Releia o que escreveu no diário desde o dia 13. Sublinhe uma frase que seja verdadeira.",
    jaculatoria: "Senhor, que eu me conheça, e que eu vos conheça.",
    resolucao: "Entrar na segunda semana sem levar comigo o desânimo.",
    revisao: null,
  },

  // ======================================================================
  // SEGUNDA SEMANA (20 a 26) — § 229 · leitura do § 135 ao § 212
  // Conhecimento da Santíssima Virgem: os motivos da devoção, a figura de
  // Rebeca e Jacó, e o modo como ela trata os que se lhe entregam.
  // ======================================================================
  {
    numero: 20,
    tema: "Por que esta devoção",
    introducao:
      "Começa a segunda semana. Depois de olhar para si, olhar para aquela que foi dada como mãe — e saber por que o caminho é este.",
    leitura: {
      de: 135,
      ate: 143,
      comentario: [
        "Montfort abre o capítulo dos motivos com o primeiro e maior: esta devoção põe-nos inteiramente a serviço de Deus. Não é um desvio pela criatura; é o modo mais completo de pertencer ao Criador.",
        "O segundo motivo é de imitação: Deus mesmo quis passar por ela. Quem toma esse caminho não inventa nada — segue o exemplo que o próprio Verbo deu ao encarnar.",
        "Note o que acontece com a objeção da semana passada. Aqui ela se desfaz sozinha, não por argumento novo, mas porque se vê que o caminho é d'Ele e não nosso. Esta semana costuma ser a que mais desfaz resistências.",
      ],
    },
    meditacao: [
      "Que ideia eu tinha de Nossa Senhora antes de começar esta preparação?",
      "Releia a objeção que escrevi no dia 2. Ela ainda está de pé?",
      "O que muda em mim se eu a tratar como mãe, e não como personagem?",
    ],
    oracao: {
      id: "ladainha-de-nossa-senhora",
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
    numero: 21,
    tema: "Ela purifica o que recebe",
    introducao:
      "O terceiro motivo responde à pergunta prática: o que acontece com o que eu entrego?",
    leitura: {
      de: 144,
      ate: 152,
      comentario: [
        "Montfort diz que ela se dá a quem se dá, e que faz com as nossas obras quatro coisas: purifica-as do que têm de impuro, embeleza-as, oferece-as ao Filho e consegue que sejam aceites. É a resposta ao § 82 — nós não conseguimos limpar o que fazemos; ela consegue.",
        "A imagem que ele usa é a do camponês que leva a maçã ao rei por meio da rainha. A fruta é a mesma; muda quem a apresenta, e muda o modo como é recebida.",
        "Aqui também aparece o motivo do abandono: esta devoção é um meio excelente de procurar a glória de Deus e não a nossa. Quem já não dispõe das próprias obras deixa de ter o que exibir.",
      ],
    },
    meditacao: [
      "O que eu faço de bom e estrago com a intenção?",
      "Eu confio em alguém a ponto de deixar essa pessoa escolher por mim?",
      "O que eu gostaria que fosse purificado antes de chegar a Deus?",
    ],
    oracao: {
      id: "ave-maris-stella",
      nome: "Ave, Estrela do Mar",
      motivo:
        "O § 229 manda repeti-lo todos os dias também nesta semana, junto com as ladainhas.",
    },
    exercicio: "Faça hoje uma boa ação que ninguém venha a saber que foi sua.",
    jaculatoria: "Apresentai-me vós.",
    resolucao:
      "Entregar a Nossa Senhora, a cada manhã, as obras do dia, antes de começá-las.",
    revisao: null,
  },
  {
    numero: 22,
    tema: "Fácil, curto, perfeito, seguro",
    introducao:
      "Montfort faz quatro afirmações sobre este caminho. A primeira costuma ser a mais contestada.",
    leitura: {
      de: 153,
      ate: 162,
      comentario: [
        "Ele chama o caminho de fácil — não porque não custe, mas porque é percorrido apoiado em alguém. A distinção é a mesma entre subir sozinho e subir com quem conhece a trilha: o esforço continua, o risco de se perder não.",
        "Curto, porque encurta o tempo em que alguém se corrige sozinho a tropeções. Perfeito, porque se chega sem desvio. Seguro, porque é protegido contra a ilusão de ter chegado — que é o perigo de todo progresso espiritual.",
        "Se alguma destas quatro palavras lhe soar grande demais, é o momento certo para a objeção: faltam onze dias. Melhor trazê-la à tona agora do que descobri-la depois da consagração.",
      ],
    },
    meditacao: [
      "Qual das quatro palavras eu não consigo subscrever?",
      "O que eu já tentei fazer sozinho e não deu certo?",
      "Eu confio o bastante para ser conduzido?",
    ],
    oracao: {
      id: "ladainha-do-espirito-santo",
      nome: "Ladainha do Espírito Santo",
      motivo:
        "Nesta semana pede-se a ele o conhecimento daquela que ele cobriu com sua sombra.",
    },
    exercicio:
      "Converse hoje com alguém que já se consagrou, ou com um sacerdote, sobre a sua objeção.",
    jaculatoria: "Conduzi-me, que eu não sei o caminho.",
    resolucao: "Levar à confissão o que me impede de entregar tudo.",
    revisao: null,
  },
  {
    numero: 23,
    tema: "A segurança e a liberdade",
    introducao:
      "O caminho é seguro — e Montfort explica contra o quê. Depois mostra o efeito que menos se espera de uma entrega total.",
    leitura: {
      de: 163,
      ate: 172,
      comentario: [
        "Ele termina de explicar a segurança: esta devoção protege contra as ilusões dos falsos místicos e contra o medo, porque quem se entrega não tem de julgar sozinho o próprio progresso. É menos sujeito a engano justamente quem menos se governa.",
        "Depois vem a afirmação que soa contraditória: esta devoção dá uma grande liberdade interior. Ele não a defende com teoria — descreve pessoas livres de escrúpulo, de angústia e do peso de ter de acertar sempre.",
        "O argumento é simples e resiste: quem não se pertence não tem de administrar a própria reputação diante de Deus. É aí que a palavra escravidão, que incomodou no § 68, começa a significar o seu contrário.",
      ],
    },
    meditacao: [
      "Que medo eu carrego na minha vida de fé?",
      "O escrúpulo me visita? Em que assunto?",
      "O que eu faria se não tivesse de acertar sempre?",
    ],
    oracao: {
      id: "ladainha-de-nossa-senhora",
      nome: "Ladainha de Nossa Senhora",
      motivo: "Entre os títulos está Consoladora dos aflitos.",
    },
    exercicio:
      "Entregue hoje, em voz alta, uma preocupação concreta — e não volte a ela até amanhã.",
    jaculatoria: "Cuidai vós, que eu não sei.",
    resolucao: "Parar de refazer mentalmente decisões que já tomei.",
    revisao: null,
  },
  {
    numero: 24,
    tema: "O bem que transborda",
    introducao:
      "O último motivo não é sobre quem se consagra. É sobre todos os outros.",
    leitura: {
      de: 173,
      ate: 182,
      comentario: [
        "Montfort sustenta que esta devoção faz mais bem ao próximo do que qualquer outra, justamente porque entrega as próprias satisfações a quem sabe distribuí-las. Quem se consagra deixa de rezar só pelos seus e passa a rezar por quem ela quiser.",
        "Ele antecipa a objeção afetiva — e os meus pais, e os meus filhos? — e responde que eles ganham, não perdem, porque passam a ser socorridos por alguém que ama melhor do que nós e vê mais longe.",
        "Fecha o capítulo dos motivos. Oito razões, e nenhuma delas sentimental: todas são argumentos sobre o modo como a graça circula. Amanhã o livro muda de registo e passa a contar uma história.",
      ],
    },
    meditacao: [
      "Por quem eu rezo hoje? Essa lista mudou nos últimos anos?",
      "Quem eu nunca pensei em incluir?",
      "Custaria entregar as minhas orações a quem as distribuísse melhor?",
    ],
    oracao: {
      id: "magnificat",
      nome: "Magnificat",
      motivo: "O cântico de quem recebeu para transbordar.",
    },
    exercicio:
      "Escreva o nome de três pessoas e reze por elas hoje — uma delas, alguém que você não conhece bem.",
    jaculatoria: "Por quem vós quiserdes.",
    resolucao: "Incluir na oração diária alguém que não me pediu nada.",
    revisao: null,
  },
  {
    numero: 25,
    tema: "Rebeca e Jacó",
    introducao:
      "Montfort explica a devoção inteira por uma história do Gênesis. É o modo mais claro que ele encontrou, e funciona.",
    leitura: {
      de: 183,
      ate: 200,
      comentario: [
        "Rebeca veste Jacó com as roupas do irmão e com peles, e apresenta-o ao pai para que o abençoe. Montfort lê a cena inteira como figura: a mãe prepara o filho, cobre-o com o que não é dele, e o apresenta. A bênção vem por causa do que foi recebido, não do que ele era.",
        "É preciso dizer que a história bíblica tem um engano dentro dela, e Montfort não finge que não tem. Ele usa a figura, não o procedimento — e o que a figura mostra é que fomos revestidos de Cristo, e que é revestidos d'Ele que somos apresentados ao Pai.",
        "O trecho é longo porque é narrativo, e lê-se depressa. Leia-o de uma vez, sem partir ao meio: é a interpretação que dá sentido à história, e ela só fecha no fim.",
      ],
    },
    meditacao: [
      "O que significa, para mim, ser apresentado ao Pai não pelo que sou?",
      "De que eu precisaria ser revestido hoje?",
      "Há alguma coisa em mim que eu insisto em apresentar sozinho?",
    ],
    oracao: {
      id: "ave-maris-stella",
      nome: "Ave, Estrela do Mar",
      motivo: "Hino de quem é conduzido, e não de quem conduz.",
    },
    exercicio:
      "Reze hoje um mistério do terço pensando em cada cena, sem pressa de terminar a dezena.",
    jaculatoria: "Revesti-me de vosso Filho.",
    resolucao: "Deixar-me ajudar em algo que eu costumo fazer sozinho.",
    revisao: null,
  },
  {
    numero: 26,
    tema: "O que ela faz com os seus",
    introducao:
      "Fecha-se a semana com cinco verbos. Vale perguntar de qual deles você mais precisa agora.",
    leitura: {
      de: 201,
      ate: 212,
      comentario: [
        "Montfort descreve o que ela faz com quem se lhe entrega: ama, sustenta, conduz, defende e intercede. Cada um tem o seu parágrafo, e nenhum é decorativo — são as cinco coisas que faltam a quem tenta sozinho.",
        "O que ele chama de conduzir merece atenção. Não é empurrar nem decidir no lugar de alguém: é ir junto, pelo caminho que já conhece, por ter sido a primeira a percorrê-lo.",
        "Amanhã começa a última semana, e ela é sobre Ele. Tudo o que se leu nestes sete dias existia para isto: ela não é o destino, é quem leva até lá — e amanhã se chega.",
      ],
    },
    meditacao: [
      "De qual dos cinco verbos eu mais preciso: ser amado, sustentado, conduzido, defendido ou apresentado?",
      "Releia a frase que anotei no dia 6, a que mais me custou aceitar. O que mudou?",
      "Estou pronto para a última semana?",
    ],
    oracao: {
      id: "ladainha-do-espirito-santo",
      nome: "Ladainha do Espírito Santo",
      motivo:
        "Fecha-se a semana pedindo a ele o conhecimento que se pediu durante sete dias.",
    },
    exercicio:
      "Reze hoje o terço inteiro, os três mistérios, se o seu dia permitir. Se não permitir, um, com atenção.",
    jaculatoria: "Mãe, conduzi-me a Ele.",
    resolucao:
      "Entrar na última semana sabendo que ela é sobre Ele, e não sobre mim.",
    revisao: null,
  },

  // ======================================================================
  // TERCEIRA SEMANA (27 a 33) — § 230 · leitura do § 213 ao § 273
  // Conhecimento de Jesus Cristo. Termina no método de comunhão, que é
  // justamente o que se faz na manhã seguinte.
  // ======================================================================
  {
    numero: 27,
    tema: "O que isto faz numa pessoa",
    introducao:
      "Começa a última semana. As duas anteriores existiam para chegar até aqui — e o primeiro efeito que Montfort promete não é o que se espera.",
    leitura: {
      de: 213,
      ate: 218,
      comentario: [
        "Os efeitos que ele descreve começam pelo menos atraente: conhecimento e desprezo de si mesmo. Não vem a consolação primeiro. Vem a verdade, de novo, agora sem o peso que tinha na primeira semana — porque agora há quem carregue.",
        "Depois: participação da fé de Maria, graça do puro amor, grande confiança em Deus e nela, e a comunicação do espírito dela. Repare que nenhum destes é uma emoção; todos são modos de ver e de querer.",
        "Montfort avisa, com honestidade, que isto não se dá de uma vez nem por igual em todos. É a descrição do que uma vida inteira pode produzir, não do que acontece na segunda-feira seguinte.",
      ],
    },
    meditacao: [
      "Que imagem de Jesus Cristo eu carrego hoje, no dia 27?",
      "Qual destes efeitos eu já reconheço começando?",
      "O que eu espero sentir no Grande Dia? E se não sentir nada?",
    ],
    oracao: {
      id: "jesus-vivente-em-maria",
      nome: "Ó Jesus vivente em Maria",
      motivo:
        "A oração com que Montfort fecha o caminho, pedindo que Cristo viva em nós como viveu nela.",
    },
    exercicio:
      "Passe quinze minutos em silêncio, sem ler e sem pedir nada. Apenas na presença.",
    jaculatoria: "Noverim te — Senhor, que eu vos conheça.",
    resolucao:
      "Definir o horário, o lugar e, se possível, a missa em que farei a consagração.",
    revisao: null,
  },
  {
    numero: 28,
    tema: "Transformados n'Ele",
    introducao:
      "O último dos efeitos não é sobre quem se consagra. É sobre a glória de Cristo — e é aí que o capítulo termina.",
    leitura: {
      de: 219,
      ate: 225,
      comentario: [
        "Montfort descreve a transformação da alma em Maria e, por ela, em Jesus Cristo. A imagem do molde volta aqui com outro peso: não se trata de imitar de fora, mas de ser formado por dentro.",
        "E então o efeito final: a maior glória de Jesus Cristo. Note que o livro termina este capítulo olhando para fora de nós. Tudo o que foi prometido a quem se consagra culmina em algo que não é benefício de ninguém, e sim honra d'Ele.",
        "Hoje é também o dia da oração de santo Agostinho, que está no § 67 e que o § 230 manda rezar durante toda esta semana. São quatro palavras: que eu vos conheça. Repita-as cem vezes, se for preciso.",
      ],
    },
    meditacao: [
      "Eu sei coisas sobre Cristo, ou eu o conheço?",
      "Quanto tempo por semana eu passo com Ele sem pedir nada?",
      "Eu quero isto por mim, ou pela glória d'Ele?",
    ],
    oracao: {
      nome: "Oração de santo Agostinho (§ 67)",
      motivo:
        "É a oração que o § 230 prescreve para todos os dias desta semana. Está no seu exemplar, no corpo do § 67.",
    },
    exercicio:
      "Repita o pedido ao longo do dia, nos intervalos: no trânsito, na fila, antes de dormir.",
    jaculatoria: "Noverim te — Senhor, que eu vos conheça.",
    resolucao: "Guardar esta jaculatória para depois do Grande Dia.",
    revisao: null,
  },
  {
    numero: 29,
    tema: "O que se faz no Grande Dia",
    introducao:
      "Faltam quatro dias, e hoje você lê as instruções do próprio Montfort para a manhã da consagração.",
    leitura: {
      de: 226,
      ate: 233,
      comentario: [
        "Aqui está o § 227, que descreve a preparação que você vem fazendo: doze dias para desapegar-se do espírito do mundo e três semanas para encher-se de Cristo. Lê-lo agora, do lado de dentro, é diferente de o ler no começo.",
        "O § 231 diz o que fazer: confessar-se e comungar com a intenção de se dar a Jesus Cristo pelas mãos de Maria; depois da comunhão, recitar a fórmula; escrevê-la ou mandá-la escrever, e assiná-la no mesmo dia.",
        "O § 232 acrescenta um tributo — um jejum, uma mortificação, uma esmola, um círio. Montfort diz, com delicadeza, que mesmo um alfinete oferecido de bom coração basta, porque Deus olha a vontade. Se ainda não escolheu o seu, escolha hoje.",
      ],
    },
    meditacao: [
      "Está tudo marcado: confissão, horário, missa?",
      "Que tributo eu vou oferecer, e por quê?",
      "O que significa, concretamente, pertencer a Ele a partir de sexta-feira?",
    ],
    oracao: {
      id: "ladainha-do-santissimo-nome-de-jesus",
      nome: "Ladainha do Santíssimo Nome de Jesus",
      motivo:
        "O § 230 acrescenta-a às orações desta semana, junto com as já conhecidas.",
    },
    exercicio:
      "Procure agora, no seu exemplar, a fórmula de consagração — ela está nas páginas finais, depois do Tratado. Marque a página.",
    jaculatoria: "Jesus, eu sou vosso.",
    resolucao: "Escolher o tributo do § 232 e deixá-lo preparado.",
    revisao: null,
  },
  {
    numero: 30,
    tema: "As práticas exteriores",
    introducao:
      "Montfort lista os sinais visíveis desta devoção. Nenhum é obrigatório, e ele diz isso.",
    leitura: {
      de: 234,
      ate: 243,
      comentario: [
        "A coroinha da Santíssima Virgem, as cadeiazinhas de ferro, a devoção especial ao mistério da Encarnação. São práticas exteriores, e ele próprio as chama assim — contêm algo de exterior, o que não quer dizer que sejam feitas sem interior.",
        "As cadeias são o sinal que mais chama atenção, e vale entender o que significam: lembram a escravidão de amor voluntária, e lembram-na no corpo, que é onde esquecemos mais depressa. Quem as usa não as usa para ser visto.",
        "O mistério da Encarnação ganha o lugar de honra porque é ali que tudo o que o livro diz aconteceu uma vez. Montfort sugere celebrá-lo a 25 de março com particular atenção — é a festa daquilo que você vai imitar.",
      ],
    },
    meditacao: [
      "Que sinal exterior da minha fé eu carrego? Por quê?",
      "O que eu faço para me lembrar do que decido?",
      "Eu me envergonho de algum sinal visível? Diante de quem?",
    ],
    oracao: {
      id: "ladainha-do-santissimo-nome-de-jesus",
      nome: "Ladainha do Santíssimo Nome de Jesus",
      motivo: "Os nomes d'Ele, repetidos, ensinam mais do que explicações.",
    },
    exercicio:
      "Decida se vai adotar algum sinal exterior — e, se sim, qual, e a partir de quando.",
    jaculatoria: "Preso de bom grado.",
    resolucao: "Escolher uma lembrança concreta que me recorde a consagração.",
    revisao: null,
  },
  {
    numero: 31,
    tema: "A Ave-Maria, o terço, o Magnificat",
    introducao:
      "As práticas que sobrarão quando a emoção do Grande Dia passar são as mais simples. São estas.",
    leitura: {
      de: 244,
      ate: 256,
      comentario: [
        "Montfort dedica um longo trecho à Ave-Maria e ao terço, e a razão é prática: são o que resta quando não resta tempo. Ele insiste em rezá-los com atenção, e diz sem rodeios que uma dezena bem rezada vale mais do que um rosário corrido.",
        "Depois o Magnificat, que ele recomenda para agradecer — é o único cântico que ela mesma compôs, e é inteiro sobre o que Deus faz, não sobre o que ela fez.",
        "E fecha com o desprezo do mundo, que é a mesma coisa dos doze dias preliminares vista do outro lado. Não é desprezo pelas pessoas nem pela criação: é recusa do critério que mede tudo pela aparência. O livro termina onde a sua preparação começou.",
      ],
    },
    meditacao: [
      "Quantas Ave-Marias eu rezo por dia sem prestar atenção a nenhuma?",
      "O que eu agradeço de verdade?",
      "O que mudou no meu critério desde o dia 1?",
    ],
    oracao: {
      id: "magnificat",
      nome: "Magnificat",
      motivo: "O cântico dela, para agradecer o que estes trinta dias deram.",
    },
    exercicio:
      "Reze hoje uma só dezena, devagar, pensando em cada palavra. Uma só.",
    jaculatoria: "A minha alma engrandece o Senhor.",
    resolucao: "Rezar o terço com atenção, nem que seja menos.",
    revisao: null,
  },
  {
    numero: 32,
    tema: "Por ela, com ela, nela, para ela",
    introducao:
      "Amanhã é a véspera. Hoje se aprende o que fazer no dia seguinte ao Grande Dia, e em todos os outros.",
    leitura: {
      de: 257,
      ate: 265,
      comentario: [
        "Quatro preposições organizam a vida inteira depois da consagração: fazer tudo por Maria, com Maria, em Maria e para Maria. Não são graus de devoção; são quatro aspectos de um mesmo gesto, e Montfort explica cada um com precisão.",
        "Por ela é agir em obediência ao espírito dela. Com ela é tomá-la por modelo em cada ação. Nela é agir dentro daquele interior, como num lugar. Para ela é fazer tudo tendo-a por fim próximo, sendo Deus o fim último.",
        "Esta é a parte prática que sobrevive ao Grande Dia. A consagração dura um instante; isto dura o resto da vida, e é por isto que o dia 34 não é o fim de nada.",
      ],
    },
    meditacao: [
      "Qual das quatro me parece possível já depois de amanhã?",
      "Como será o meu dia 34?",
      "O que eu quero que permaneça disto daqui a um ano?",
    ],
    oracao: {
      id: "jesus-vivente-em-maria",
      nome: "Ó Jesus vivente em Maria",
      motivo:
        "A oração que pede exatamente isto: que Ele viva e aja em mim como nela.",
    },
    exercicio:
      "Escolha uma das quatro preposições e escreva, em uma frase, como ela se parecerá na sua semana.",
    jaculatoria: "Por vós, convosco, em vós e para vós.",
    resolucao:
      "Definir a prática concreta que vou manter depois da consagração.",
    revisao: null,
  },
  {
    numero: 33,
    tema: "A véspera",
    introducao:
      "Último dia da preparação. A leitura de hoje é o método da comunhão — que é justamente o que você fará amanhã de manhã.",
    leitura: {
      de: 266,
      ate: 273,
      comentario: [
        "Montfort descreve como comungar nesta devoção, em três tempos: antes, humilhar-se profundamente e convidar Maria a receber o Filho em você; durante, deixar que seja ela a receber, e não você sozinho; depois, pedir-lhe que agradeça no seu lugar, porque o seu agradecimento não está à altura.",
        "Não é uma técnica. É um modo de reconhecer que o que vai acontecer amanhã é maior do que a sua disposição, e que é bom ter quem supra o que lhe falta — que é o fio de todo o livro, agora aplicado ao momento mais concreto.",
        "Com estes parágrafos o Tratado termina, e a sua leitura dos trinta e três dias também. Esta noite, procure a fórmula de consagração e leia-a uma vez, em silêncio, sem a rezar. Amanhã ela será rezada em voz alta, e é bom que não seja a primeira vez que você a vê.",
      ],
    },
    meditacao: [
      "Está tudo pronto: confissão, horário, missa, fórmula, tributo?",
      "O que eu diria a mim mesmo do dia 1, se pudesse?",
      "Com que disposição eu quero acordar amanhã?",
    ],
    oracao: {
      id: "ave-maris-stella",
      nome: "Ave, Estrela do Mar",
      motivo:
        "O hino que acompanhou a preparação inteira, rezado hoje pela última vez antes da entrega.",
    },
    exercicio:
      "Deixe separado o que vai precisar amanhã: a fórmula, o horário, o lugar, o tributo que escolheu.",
    jaculatoria: "Amanhã, inteiramente vosso.",
    resolucao: "Dormir cedo e chegar com tempo.",
    revisao: null,
  },
] as const;

const POR_NUMERO = new Map(DIAS.map((d) => [d.numero, d]));

/** O conteúdo do dia, ou null quando ainda está por escrever. */
export function diaPorNumero(n: number): Dia | null {
  return POR_NUMERO.get(n) ?? null;
}

/** "§ 83 a 89", ou "§ 151" quando o dia tem um parágrafo só. */
export function faixaDeLeitura(leitura: { de: number; ate: number }): string {
  return leitura.de === leitura.ate
    ? `§ ${leitura.de}`
    : `§ ${leitura.de} a ${leitura.ate}`;
}

/** Quantos parágrafos o dia pede. Útil para avisar os dias mais longos. */
export function tamanhoDaLeitura(leitura: { de: number; ate: number }): number {
  return leitura.ate - leitura.de + 1;
}

/** Os dias que já têm conteúdo, para o painel de quem escreve. */
export const DIAS_ESCRITOS = DIAS.map((d) => d.numero);
