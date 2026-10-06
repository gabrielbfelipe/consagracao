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
 * O QUE ESTE ARQUIVO NÃO CONTÉM
 * O texto do livro. As indicações apontam para os parágrafos (§), que são os
 * mesmos em qualquer edição numerada, e o comentário é escrito aqui — é
 * paráfrase e explicação, nunca transcrição. As traduções do Tratado
 * pertencem a quem as fez, e a leitura se faz no exemplar que a pessoa
 * adquiriu. O mesmo vale para a fórmula de consagração, que Montfort manda
 * recitar no § 231 e que não é reproduzida aqui.
 *
 * As passagens do Evangelho também vão por referência, pelo mesmo motivo:
 * cada tradução da Bíblia tem dono.
 *
 * ESTADO DO CONTEÚDO
 * Nada deste arquivo deve ir a produção sem revisão pastoral. O campo
 * `revisao` registra quem revisou e quando; enquanto estiver nulo, o dia é
 * tratado como rascunho.
 */

export type Revisao = { por: string; em: string } | null;

export type Dia = {
  numero: number;
  /** O assunto do dia, em poucas palavras. */
  tema: string;
  /** Abre o dia e diz aonde ele vai. */
  introducao: string;
  leitura: {
    /** Ex.: "§ 78 a 82". Nulo quando o dia não tem leitura no Tratado. */
    paragrafos: string | null;
    /** Referência bíblica do dia, quando há. Nunca o texto. */
    evangelho?: string | null;
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
    todoDia: [
      "Vinde, Espírito Criador",
      "Ave, Estrela do Mar",
      "Um exame de consciência ao fim do dia",
    ],
    nota: "São doze dias para desapegar-se do espírito do mundo, contrário ao de Jesus Cristo. O Tratado não prescreve orações próprias para eles; estas vêm da prática comum da preparação.",
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
  // DIAS PRELIMINARES (1 a 12) — § 227
  // Desapegar-se do espírito do mundo, contrário ao de Jesus Cristo.
  // O Tratado não dá leitura para estes dias; por isso o caminho aqui é o
  // Evangelho, com os parágrafos do livro entrando onde ele de fato fala.
  // ======================================================================
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
      id: "ave-maris-stella",
      nome: "Ave, Estrela do Mar",
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
    numero: 3,
    tema: "Onde está o meu tesouro",
    introducao:
      "Ninguém descobre o que ama perguntando a si mesmo. Descobre olhando para onde o dinheiro, o tempo e o pensamento vão sozinhos.",
    leitura: {
      paragrafos: null,
      evangelho: "Mateus 6, 19-24",
      comentario: [
        "A frase é conhecida demais para ainda cortar: onde está o teu tesouro, aí estará o teu coração. Repare na ordem. Não se diz que o coração escolhe o tesouro; diz-se que o tesouro arrasta o coração. O afeto vai atrás do investimento, e não o contrário.",
        "Isso muda o exame de hoje. A pergunta não é “o que eu amo?”, que qualquer um responde bem. É “onde eu venho pondo o que tenho?” — e essa a agenda e o extrato respondem por nós, sem piedade.",
        "O trecho termina dizendo que ninguém serve a dois senhores. Não é ameaça: é descrição. Duas lealdades últimas não cabem na mesma pessoa, e quem tenta mantê-las acaba servindo à que nunca examinou.",
      ],
    },
    meditacao: [
      "Nos últimos trinta dias, para onde foi o meu dinheiro que não era necessidade?",
      "Qual é a primeira coisa em que penso ao acordar?",
      "Se eu perdesse amanhã uma única coisa, qual delas me faria sentir que perdi tudo?",
    ],
    oracao: {
      id: "veni-creator",
      nome: "Vinde, Espírito Criador",
      motivo:
        "Ver onde está o próprio tesouro exige uma luz que não é a nossa, porque a nossa protege o que ama.",
    },
    exercicio:
      "Abra o extrato e a agenda do último mês. Sem julgar, escreva as três coisas que mais consumiram seu dinheiro e seu tempo.",
    jaculatoria: "Senhor, mostrai-me onde está o meu coração.",
    resolucao:
      "Escolher uma dessas três coisas e reduzi-la, de modo verificável, até o Grande Dia.",
    revisao: null,
  },
  {
    numero: 4,
    tema: "A pressa",
    introducao:
      "O espírito do mundo raramente diz que Deus não importa. Diz que agora não dá, e isso basta para que nunca dê.",
    leitura: {
      paragrafos: null,
      evangelho: "Lucas 10, 38-42",
      comentario: [
        "Marta não faz nada de errado. Serve, cuida, recebe. A censura não é ao trabalho dela, é à agitação: anda inquieta e perturbada com muitas coisas. A palavra não acusa a atividade, acusa a dispersão.",
        "O que Maria escolheu não é o ócio, é a atenção. Ficar sentada diante de alguém é uma forma de trabalho que o nosso tempo desaprendeu — e é exatamente o que estes trinta e três dias pedem.",
        "Vale notar que Jesus não manda Marta parar de servir. Diz que uma só coisa é necessária. A diferença entre as duas não está no que fazem, mas em o que organiza o resto.",
      ],
    },
    meditacao: [
      "O que eu digo que farei “quando tiver tempo”? Há quanto tempo digo isso?",
      "Minha agitação serve a quem, de verdade?",
      "Quando foi a última vez que fiquei quinze minutos sem fazer nada e sem culpa?",
    ],
    oracao: {
      id: "ave-maris-stella",
      nome: "Ave, Estrela do Mar",
      motivo:
        "Pedir caminho seguro a quem atravessa os dias correndo, sem saber bem para onde.",
    },
    exercicio:
      "Faça hoje uma tarefa comum devagar de propósito — lavar a louça, caminhar, comer — sem nenhuma tela por perto.",
    jaculatoria: "Uma só coisa é necessária.",
    resolucao:
      "Proteger o horário que escolhi no primeiro dia, mesmo quando o dia apertar.",
    revisao: null,
  },
  {
    numero: 5,
    tema: "A opinião dos outros",
    introducao:
      "Há quem creia e não diga. O Evangelho tem uma frase dura para isso, e ela não é sobre os outros.",
    leitura: {
      paragrafos: null,
      evangelho: "João 12, 42-43",
      comentario: [
        "O texto fala de pessoas que creram e calaram, e dá o motivo sem rodeios: amaram mais a glória dos homens que a glória de Deus. Não foram incrédulos. Foram envergonhados.",
        "Repare que o problema não é querer ser estimado — isso é humano. É deixar que a estima decida. Entre o que é verdadeiro e o que me põe bem na fotografia, há um instante em que se escolhe, e esse instante quase sempre passa despercebido.",
        "Nestes dias preliminares, este é dos exames mais úteis, porque a vergonha costuma vestir-se de prudência. Dizemos que não é hora, que não vai adiantar, que seria forçar. Às vezes é verdade. Às vezes é medo com nome melhor.",
      ],
    },
    meditacao: [
      "Diante de quem eu escondo que estou fazendo esta preparação? Por quê?",
      "Que convicção minha eu já engoli para não desagradar?",
      "De quem eu quero aprovação a ponto de mudar o que digo?",
    ],
    oracao: {
      id: "veni-creator",
      nome: "Vinde, Espírito Criador",
      motivo:
        "Pede-se fortaleza, que é o dom de agir pelo que é verdadeiro mesmo quando custa.",
    },
    exercicio:
      "Diga hoje a uma pessoa, sem dramatizar, que você está se preparando para a consagração.",
    jaculatoria: "Não a nós, Senhor, mas ao vosso nome dai glória.",
    resolucao:
      "Parar de me explicar quando não me perguntaram, e não esconder quando perguntarem.",
    revisao: null,
  },
  {
    numero: 6,
    tema: "O que eu deixo entrar",
    introducao:
      "Ninguém decide o que vai pensar. Decide o que vai olhar, e o pensamento vem atrás.",
    leitura: {
      paragrafos: "§ 79",
      evangelho: "Mateus 6, 22-23",
      comentario: [
        "A lâmpada do corpo é o olho: o que entra pelos olhos ilumina ou escurece a pessoa inteira. É uma afirmação sobre formação, não sobre moralidade estreita — somos moldados pelo que consumimos com regularidade.",
        "Montfort, no § 79, descreve o fundo de concupiscência que fica em nós mesmo depois do batismo, e que torna o olhar sempre inclinado. Reconhecer essa inclinação não é pessimismo; é parar de se surpreender com a própria fragilidade e começar a tomar precauções simples.",
        "A precaução simples, aqui, tem a ver com o que se repete. Uma imagem vista uma vez passa. A mesma imagem vista todos os dias durante um ano forma um gosto, e o gosto forma um juízo.",
      ],
    },
    meditacao: [
      "O que eu consumo todo dia sem escolher — e que escolheria, se parasse para pensar?",
      "Que conteúdo me deixa pior comigo mesmo depois, e mesmo assim eu volto?",
      "O que eu veria com tranquilidade se alguém estivesse olhando a minha tela?",
    ],
    oracao: {
      id: "ave-maris-stella",
      nome: "Ave, Estrela do Mar",
      motivo:
        "O hino pede olhos puros — “solve vincla reis” — para quem está preso ao que vê.",
    },
    exercicio:
      "Apague hoje uma fonte: um perfil, um aplicativo, uma assinatura. Uma só, e de verdade.",
    jaculatoria: "Senhor, que a minha luz não seja trevas.",
    resolucao:
      "Manter essa fonte apagada até o Grande Dia, e decidir depois se volta.",
    revisao: null,
  },
  {
    numero: 7,
    tema: "A língua",
    introducao:
      "O lugar onde o espírito do mundo mais se esconde não é o que fazemos. É o que falamos dos outros quando eles não estão.",
    leitura: {
      paragrafos: null,
      evangelho: "Tiago 3, 1-12",
      comentario: [
        "Tiago compara a língua ao leme de um navio: pequena, e no entanto decide o rumo de tudo. A imagem serve bem a estes dias, porque a conversa é onde os nossos critérios aparecem sem disfarce.",
        "Ele observa algo incômodo: da mesma boca saem bênção e maldição. Não somos duas pessoas — somos uma, inconsistente, e a inconsistência fica visível na fala antes de ficar em qualquer outro lugar.",
        "Hoje não se trata de calar. Trata-se de reparar: em que tom eu falo de quem me irrita, o que eu conto de alguém que não teria coragem de dizer na frente dele, que prazer há em dar uma notícia ruim sobre outro.",
      ],
    },
    meditacao: [
      "De quem eu falei mal nos últimos sete dias? O que eu ganhei com isso?",
      "Há alguém cuja reputação piorou por causa de algo que eu disse?",
      "Eu uso a ironia para dizer o que não teria coragem de dizer direto?",
    ],
    oracao: {
      id: "veni-creator",
      nome: "Vinde, Espírito Criador",
      motivo:
        "Pede-se ao Espírito o domínio da fala, que nenhuma força de vontade sustenta por muito tempo.",
    },
    exercicio:
      "Passe o dia sem falar de nenhuma pessoa ausente, nem bem nem mal. Repare quanto da conversa se esvazia.",
    jaculatoria: "Senhor, ponde uma guarda à minha boca.",
    resolucao:
      "Interromper uma conversa de murmuração esta semana, sem sermão — mudando de assunto.",
    revisao: null,
  },
  {
    numero: 8,
    tema: "O que eu acumulo",
    introducao:
      "A parábola de hoje não condena o homem por ser rico. Condena-o por achar que o amanhã lhe pertencia.",
    leitura: {
      paragrafos: null,
      evangelho: "Lucas 12, 13-21",
      comentario: [
        "O homem da parábola faz tudo o que a prudência manda: teve uma colheita boa, construiu celeiros maiores, garantiu o futuro. Nada disso é censurado em si. O que o perde é o monólogo — ele conversa consigo mesmo, no plural de uma só pessoa, e não aparece ninguém mais no raciocínio.",
        "A palavra que Deus lhe dirige é “insensato”, e o motivo é de ordem prática: esta noite te pedirão a tua alma. O erro não foi moral, foi de cálculo. Ele planejou tudo menos o único acontecimento certo.",
        "Vale ler isto sem transformar em desprezo pelo trabalho ou pela poupança. A questão é outra: o que eu acumulo me torna mais livre para dar, ou mais preso ao que já tenho?",
      ],
    },
    meditacao: [
      "O que eu guardo “para o caso de precisar” e nunca precisei?",
      "Minha segurança está em alguma reserva? O que aconteceria comigo se ela sumisse?",
      "A quem eu daria, se desse hoje?",
    ],
    oracao: {
      id: "magnificat",
      nome: "Magnificat",
      motivo:
        "O cântico em que os ricos são despedidos de mãos vazias e os famintos saciados — dito por quem não tinha nada.",
    },
    exercicio:
      "Separe hoje algo seu que tem valor e dê a quem precisa. Não o que sobra: algo que você usaria.",
    jaculatoria: "Senhor, que eu não ponha a minha segurança onde ela não está.",
    resolucao:
      "Fixar uma esmola concreta para o dia da consagração, conforme o § 232 pede.",
    revisao: null,
  },
  {
    numero: 9,
    tema: "O bem que eu não faço",
    introducao:
      "Hoje não é dia de prometer melhora. É dia de reconhecer, sem dramatizar, que querer não tem bastado.",
    leitura: {
      paragrafos: "§ 79 a 80",
      evangelho: "Romanos 7, 15-25",
      comentario: [
        "São Paulo descreve uma experiência que todo mundo conhece e quase ninguém admite em voz alta: não faço o bem que quero, e faço o mal que não quero. Ele não está confessando um pecado em particular. Está descrevendo uma divisão interna que a boa vontade sozinha não cura.",
        "Montfort diz a mesma coisa em outra chave. No § 79 ele lembra que o batismo apaga a culpa mas deixa o fomento, a inclinação — e que, por isso, contar apenas com a própria firmeza é contar com o que já falhou antes.",
        "A conclusão de Paulo não é desespero, é um grito: quem me livrará? E a resposta é um nome, não um método. Esta é a porta pela qual a segunda parte da preparação vai entrar.",
      ],
    },
    meditacao: [
      "Que propósito eu já refiz tantas vezes que parei de contar?",
      "Onde eu confundo força de vontade com graça?",
      "O que mudaria se eu pedisse socorro em vez de prometer de novo?",
    ],
    oracao: {
      id: "veni-creator",
      nome: "Vinde, Espírito Criador",
      motivo:
        "A primeira coisa que se pede quando se descobre a própria impotência é o Espírito que supre.",
    },
    exercicio:
      "Escreva em uma frase o propósito que você mais quebrou. Guarde o papel; ele volta no Grande Dia.",
    jaculatoria: "Infeliz de mim! Quem me livrará?",
    resolucao:
      "Parar de prometer o que não sustento, e pedir todos os dias o que não consigo.",
    revisao: null,
  },
  {
    numero: 10,
    tema: "A vontade própria",
    introducao:
      "Há uma diferença entre querer o bem e querer que seja do meu jeito. A segunda é a mais difícil de largar.",
    leitura: {
      paragrafos: "§ 81 a 82",
      comentario: [
        "Montfort é direto: trazemos dentro um fundo que corrompe até as boas ações — amor-próprio, confiança em si, apego ao próprio juízo. Não fala dos pecados visíveis, fala do que se mistura ao que fazemos de melhor.",
        "É um exame desconfortável porque atinge a parte da vida de que mais nos orgulhamos. A obra boa feita para ser vista, a generosidade que cobra reconhecimento, o conselho que quer ter razão. Nada disso é mentira; é verdade contaminada.",
        "O remédio que ele propõe não é fazer menos, é fazer por outras mãos. Esta é a razão de toda a devoção que ele vai expor: entregar as próprias obras a quem as purifique, porque nós não conseguimos purificá-las sozinhos.",
      ],
    },
    meditacao: [
      "Em que coisa boa que faço há um pedaço esperando reconhecimento?",
      "Quando me contrariam, o que dói: o erro, ou não ter sido eu a decidir?",
      "Eu obedeço a alguém em alguma coisa? A quem?",
    ],
    oracao: {
      id: "ave-maris-stella",
      nome: "Ave, Estrela do Mar",
      motivo:
        "Pede-se a quem se chamou escrava do Senhor que ensine a querer sem impor.",
    },
    exercicio:
      "Ceda hoje, de propósito, numa decisão pequena em que você tinha razão — e não avise ninguém.",
    jaculatoria: "Não a minha vontade, mas a vossa.",
    resolucao:
      "Entregar a Nossa Senhora, a cada manhã, as obras do dia, antes de começá-las.",
    revisao: null,
  },
  {
    numero: 11,
    tema: "O desprezo do mundo",
    introducao:
      "A expressão soa dura e foi mal compreendida por séculos. Hoje vale entender o que ela quer dizer de verdade.",
    leitura: {
      paragrafos: "§ 256",
      comentario: [
        "Quando Montfort fala em desprezar o mundo, não fala das pessoas, nem da criação, nem do trabalho, nem da alegria. Fala de recusar como critério aquilo que o § 227 já chamara de espírito do mundo: julgar pela aparência, pelo imediato, pela opinião.",
        "A prova de que não é fuga está no que ele propõe em seguida: não sair do mundo, e sim atravessá-lo com outro juízo. Quem despreza o espírito do mundo costuma ser mais útil ao mundo, não menos.",
        "No fim de onze dias, é hora de perguntar o que mudou de fato. Não de sentimento — de critério. O que eu deixei de achar importante nestas duas semanas?",
      ],
    },
    meditacao: [
      "O que eu achava indispensável no dia 1 e já não acho?",
      "Onde o meu juízo continua idêntico ao de quem não crê?",
      "Que coisa boa do mundo eu confundi com o espírito do mundo, e rejeitei sem precisar?",
    ],
    oracao: {
      id: "magnificat",
      nome: "Magnificat",
      motivo:
        "O cântico inverte toda a ordem do mundo: derruba os poderosos e eleva os humildes. É o critério novo, cantado.",
    },
    exercicio:
      "Releia o que você anotou no dia 2 sobre um critério seu. Escreva embaixo o que mudou, mesmo que pouco.",
    jaculatoria: "Senhor, dai-me o vosso juízo sobre as coisas.",
    resolucao:
      "Nomear o critério que ainda me governa e que não é o do Evangelho.",
    revisao: null,
  },
  {
    numero: 12,
    tema: "O fim do primeiro trecho",
    introducao:
      "Doze dias se completam hoje. Eles não eram a preparação: eram a limpeza da casa antes de receber alguém.",
    leitura: {
      paragrafos: "§ 226 a 227",
      comentario: [
        "No § 227 está, em poucas linhas, o plano inteiro do que você vem fazendo: ao menos doze dias para desapegar-se do espírito do mundo, e depois três semanas para encher-se de Jesus Cristo pela Santíssima Virgem. Vale ler hoje esse parágrafo sabendo que a primeira parte dele terminou.",
        "Repare na ordem, que não é arbitrária. Primeiro esvaziar, depois encher. Quem pula a primeira parte enche por cima do que já estava lá, e depois estranha que nada tenha mudado.",
        "O que vem a seguir tem outro ritmo. As três semanas têm cada uma o seu objeto — você, ela, Ele — e cada uma delas uma disciplina de oração própria, que Montfort descreve nos § 228 a 230.",
      ],
    },
    meditacao: [
      "O que destes doze dias eu quero levar comigo, e o que foi só esforço passageiro?",
      "Em que ponto eu fui desonesto comigo mesmo durante este trecho?",
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
    jaculatoria: "Vinde, Espírito Santo, enchei os corações dos vossos fiéis.",
    resolucao:
      "Entrar na primeira semana sem pressa de chegar ao fim dela.",
    revisao: null,
  },

  // ======================================================================
  // PRIMEIRA SEMANA (13 a 19) — § 228
  // Conhecimento de si mesmo e contrição, tudo em espírito de humildade.
  // Leitura indicada pelo próprio Montfort: o § 78 e seguintes.
  // ======================================================================
  {
    numero: 13,
    tema: "A verdade sobre mim",
    introducao:
      "Começa hoje a primeira semana. Olhar para dentro com verdade é desconfortável, mas é a única entrada que a graça tem.",
    leitura: {
      paragrafos: "§ 78 a 82",
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
    numero: 14,
    tema: "Nada de bom que não venha dele",
    introducao:
      "Reconhecer que tudo o que presta em nós é recebido parece humilhação. É, na verdade, alívio.",
    leitura: {
      paragrafos: "§ 79 a 80",
      comentario: [
        "Montfort insiste num ponto que a cultura atual rejeita por instinto: por nós mesmos não temos senão a mentira e o pecado. É uma frase pesada, e precisa ser lida inteira — ele não diz que a pessoa não vale nada, diz que o que ela tem de bom não começou nela.",
        "A diferença é enorme. Um talento recebido continua sendo real; só muda de dono. Quem entende isso para de defender o que é seu e começa a administrar o que lhe foi confiado.",
        "Observe o efeito prático: quem sabe que recebeu tudo tem menos a proteger. É por isso que esta semana, que parece de rebaixamento, costuma terminar em liberdade.",
      ],
    },
    meditacao: [
      "Que dom meu eu trato como mérito?",
      "O que eu teria sido sem as pessoas que me foram dadas?",
      "Onde a minha competência virou identidade?",
    ],
    oracao: {
      nome: "Ladainha do Espírito Santo",
      motivo:
        "Na primeira semana ela se repete todo dia, conforme o § 228, junto com a oração que a segue.",
    },
    exercicio:
      "Escreva três coisas boas que você tem e não escolheu: uma pessoa, uma circunstância, uma capacidade.",
    jaculatoria: "Que eu me conheça — noverim me.",
    resolucao: "Agradecer antes de pedir, em toda oração desta semana.",
    revisao: null,
  },
  {
    numero: 15,
    tema: "Preciso de alguém entre mim e Deus",
    introducao:
      "Hoje Montfort responde a uma objeção que talvez já tenha lhe ocorrido: se Cristo basta, por que Maria?",
    leitura: {
      paragrafos: "§ 83 a 86",
      comentario: [
        "O argumento é de proporção. Entre Deus e nós a distância é infinita, e precisamos de um mediador — esse é Jesus Cristo, e Montfort não admite outro nessa função. Mas acrescenta: diante do próprio Cristo, que é Deus, a nossa miséria ainda pede alguém que nos apresente.",
        "Não se trata de um segundo mediador paralelo, e sim de alguém dentro da mediação única. A imagem que ele usa é familiar: quem leva um pedido a um rei por intermédio de quem o rei ama não diminui o rei, nem duvida dele.",
        "Se esta parte lhe parecer difícil, não force a concordância. Leia, guarde a objeção, e volte a ela na segunda semana — é lá que o argumento se completa.",
      ],
    },
    meditacao: [
      "Eu rezo como quem fala com alguém, ou como quem recita?",
      "Que parte de mim eu nunca levei a Deus por achar que não vale a pena?",
      "Que objeção honesta eu tenho a esta devoção? Vale escrevê-la.",
    ],
    oracao: {
      id: "ave-maris-stella",
      nome: "Ave, Estrela do Mar",
      motivo:
        "O § 228 manda recitá-lo todos os dias desta semana, junto com as ladainhas.",
    },
    exercicio:
      "Leve hoje a Nossa Senhora um pedido que você nunca fez por achá-lo pequeno demais.",
    jaculatoria: "Mostrai-vos minha mãe.",
    resolucao: "Escrever a objeção que ainda tenho, para relê-la no dia 26.",
    revisao: null,
  },
  {
    numero: 16,
    tema: "É difícil guardar o que se recebe",
    introducao:
      "O problema não é só receber a graça. É chegar ao fim do dia ainda com ela.",
    leitura: {
      paragrafos: "§ 87 a 89",
      comentario: [
        "Montfort observa algo que a experiência confirma: conservar a graça é mais difícil do que obtê-la. Carregamos um tesouro em vaso frágil, cercados de ladrões, e quase sempre descobrimos o roubo depois de consumado.",
        "Ele não propõe maior vigilância como solução — já sabemos que a nossa vigilância dorme. Propõe confiar o tesouro a quem saiba guardá-lo, e essa é a imagem que atravessa todo o Tratado.",
        "Vale reparar na honestidade do raciocínio: a devoção que ele vai propor não nasce de entusiasmo, nasce de um diagnóstico. Primeiro se constata a fragilidade; só depois se procura um depositário.",
      ],
    },
    meditacao: [
      "Que graça clara eu recebi e deixei esfriar?",
      "O que, na minha rotina, costuma apagar o que começou bem?",
      "A quem eu confiaria algo precioso de verdade? Por quê?",
    ],
    oracao: {
      nome: "Ladainha do Espírito Santo",
      motivo:
        "Quem dá a graça é o mesmo que a conserva; é a ele que se pede a guarda.",
    },
    exercicio:
      "Identifique o momento exato do dia em que você costuma perder a paz, e prepare uma frase curta para rezar ali.",
    jaculatoria: "Guardai, Senhor, o que me destes.",
    resolucao: "Rezar essa frase, naquele momento, todos os dias que faltam.",
    revisao: null,
  },
  {
    numero: 17,
    tema: "Contrição não é tristeza",
    introducao:
      "Montfort pede, nesta semana, a contrição dos próprios pecados. Convém saber o que isso é, e o que não é.",
    leitura: {
      paragrafos: "§ 228",
      comentario: [
        "O § 228 pede duas coisas juntas: o conhecimento de si e a contrição, tudo em espírito de humildade. A ordem importa — primeiro ver, depois doer-se. Doer-se antes de ver produz angústia sem objeto, que não converte ninguém.",
        "Contrição é dor de ter ofendido alguém que se ama, e vem acompanhada do propósito de não repetir. Não é vergonha de si, que fecha; não é remorso, que rumina; não é autodepreciação, que é orgulho ferido com outra roupa.",
        "O sinal de que a contrição é verdadeira é simples e verificável: ela aumenta a confiança em vez de diminuí-la. Quem se arrepende de verdade se aproxima; quem apenas se envergonha se afasta.",
      ],
    },
    meditacao: [
      "O que em mim é arrependimento, e o que é apenas vergonha de ter sido visto?",
      "Eu me afasto de Deus justamente quando mais precisaria chegar perto?",
      "Há um pecado que eu confesso sempre e nunca combato?",
    ],
    oracao: {
      nome: "Ladainha de Nossa Senhora",
      motivo:
        "Entre os títulos está Refúgio dos pecadores. O § 228 manda rezá-la todo dia desta semana.",
    },
    exercicio:
      "Prepare a sua confissão por escrito. Não a lista inteira da vida: o que pesa agora.",
    jaculatoria: "Senhor, tende piedade de mim.",
    resolucao: "Confessar-me antes do dia 33, e não na véspera.",
    revisao: null,
  },
  {
    numero: 18,
    tema: "Senhor, que eu veja",
    introducao:
      "Há um pedido que Montfort manda repetir ao longo de toda esta semana. Hoje é dia de fazê-lo devagar.",
    leitura: {
      paragrafos: "§ 228",
      evangelho: "Marcos 10, 46-52",
      comentario: [
        "“Domine, ut videam” — Senhor, que eu veja. A frase que Montfort propõe no § 228 é a do cego de Jericó, e não foi escolhida por acaso: é um pedido feito por quem sabe exatamente o que lhe falta.",
        "Repare no que precede o pedido no Evangelho. Bartimeu grita, é mandado calar, grita mais alto, joga fora o manto e vai. O pedido de ver vem depois de uma insistência que não tinha nenhuma garantia.",
        "Rezar isto durante uma semana faz um efeito curioso: a pessoa começa a perceber coisas que estavam à vista. Não porque algo novo apareceu, mas porque parou de desviar o olhar.",
      ],
    },
    meditacao: [
      "O que eu já sei a meu respeito e evito olhar de frente?",
      "Quem, à minha volta, eu deixei de enxergar?",
      "Se eu visse hoje uma só coisa com clareza, o que pediria para ver?",
    ],
    oracao: {
      id: "veni-creator",
      nome: "Vinde, Espírito Criador",
      motivo:
        "O § 228 sugere, entre as jaculatórias desta semana, o próprio “Veni, Sancte Spiritus”.",
    },
    exercicio:
      "Repita hoje, cem vezes se for preciso, as quatro palavras: Senhor, que eu veja.",
    jaculatoria: "Domine, ut videam — Senhor, que eu veja.",
    resolucao: "Não discutir hoje nenhuma correção que me fizerem.",
    revisao: null,
  },
  {
    numero: 19,
    tema: "O fundamento está posto",
    introducao:
      "Termina a primeira semana. Ela não foi feita para produzir bons sentimentos, e sim para pôr o chão.",
    leitura: {
      paragrafos: "§ 78 a 89",
      comentario: [
        "Vale reler hoje, de uma vez só, o trecho inteiro desta semana. Lido corrido, ele tem uma lógica que se perde quando se lê aos pedaços: temos um fundo corrompido (§ 79), não conseguimos guardar o bem (§ 87), precisamos de alguém (§ 83).",
        "Montfort chama este conhecimento de fundamento das outras graças — e a palavra é bem escolhida. Fundamento não aparece na casa pronta; sustenta tudo o que se vê.",
        "Se estes sete dias o deixaram menor aos próprios olhos e mais tranquilo, eles funcionaram. Se o deixaram menor e angustiado, falta a segunda metade: amanhã começa a semana de olhar para aquela que foi dada como mãe.",
      ],
    },
    meditacao: [
      "O que eu descobri sobre mim nesta semana que não sabia no dia 13?",
      "Eu me sinto menor e mais leve, ou menor e mais pesado? O que isso diz?",
      "O que eu levo desta semana para a próxima?",
    ],
    oracao: {
      nome: "Ladainha de Nossa Senhora",
      motivo:
        "Fecha-se a semana pedindo a ela o que o § 228 chama de fundamento de todas as outras graças.",
    },
    exercicio:
      "Releia o que escreveu no diário desde o dia 13. Sublinhe uma frase que seja verdadeira.",
    jaculatoria: "Senhor, que eu me conheça, e que eu vos conheça.",
    resolucao: "Entrar na segunda semana sem levar comigo o desânimo.",
    revisao: null,
  },

  // ======================================================================
  // SEGUNDA SEMANA (20 a 26) — § 229
  // Conhecimento da Santíssima Virgem, pedido ao Espírito Santo. Mais o
  // rosário todos os dias, nesta intenção.
  // ======================================================================
  {
    numero: 20,
    tema: "Quem é ela",
    introducao:
      "Começa a segunda semana. Depois de olhar para si, olhar para aquela que foi dada como mãe.",
    leitura: {
      paragrafos: "§ 14 a 36",
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
    numero: 21,
    tema: "Ela continua agindo",
    introducao:
      "Se o papel dela tivesse terminado em Belém, esta semana seria história. Montfort sustenta que não terminou.",
    leitura: {
      paragrafos: "§ 37 a 48",
      comentario: [
        "Aqui ele tira as consequências do que afirmou antes. Se Deus quis servir-se dela para a primeira vinda, serve-se dela também agora, na formação de cada cristão. O argumento é de coerência: Deus não muda de método.",
        "Montfort chega a dizer que a devoção a ela é necessária à salvação — e a frase precisa de cuidado. Ele não está pondo uma condição a mais sobre quem nunca ouviu falar dela. Está dizendo que, na ordem que Deus de fato estabeleceu, ninguém chega ao Filho por fora do caminho que o Filho escolheu.",
        "Se a formulação lhe soar forte demais, repare que ele próprio a modula no § 40 e seguintes. A leitura honesta deste trecho exige lê-lo inteiro, e não por frases soltas.",
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
      motivo:
        "O § 229 manda repeti-lo todos os dias também nesta semana, junto com as ladainhas.",
    },
    exercicio:
      "Reze hoje um mistério do terço pensando em cada cena, sem pressa de terminar a dezena.",
    jaculatoria: "Mãe de Deus, rogai por nós.",
    resolucao: "Pedir a ela, todo dia, aquilo que eu não consigo mudar sozinho.",
    revisao: null,
  },
  {
    numero: 22,
    tema: "Os últimos tempos",
    introducao:
      "Há no Tratado um trecho profético que ficou famoso. Vale lê-lo com sobriedade, que é como ele foi escrito.",
    leitura: {
      paragrafos: "§ 49 a 59",
      comentario: [
        "Montfort anuncia que nos últimos tempos Maria será mais conhecida que nunca, e que por ela Deus formará grandes santos. É um texto de esperança, não de terror, e foi escrito com a linguagem profética que a tradição permite.",
        "O risco de ler isto é duplo: tomar como calendário, o que o texto não é; ou descartar como exagero barroco, o que seria perder o essencial. O essencial é a convicção de que a história não está entregue ao acaso.",
        "A leitura proveitosa é esta: o que ele descreve de santos formados por ela é o que você está pedindo para si daqui a onze dias. O trecho deixa de ser sobre o futuro do mundo e passa a ser sobre o seu.",
      ],
    },
    meditacao: [
      "O que eu espero de verdade quando penso no futuro?",
      "Eu creio que a minha vida tem lugar em algo maior do que ela?",
      "Que santo eu conheço que parece ter sido formado assim?",
    ],
    oracao: {
      nome: "Ladainha do Espírito Santo",
      motivo:
        "Nesta semana pede-se a ele o conhecimento daquela que ele cobriu com sua sombra.",
    },
    exercicio:
      "Leia hoje a vida de um santo marcado pela devoção a Nossa Senhora. Vinte minutos bastam.",
    jaculatoria: "Vinde, Espírito Santo, pela vossa esposa fidelíssima.",
    resolucao: "Escolher um santo como companhia para o resto da preparação.",
    revisao: null,
  },
  {
    numero: 23,
    tema: "Devoções falsas",
    introducao:
      "Antes de dizer o que é a verdadeira devoção, Montfort descreve sete modos de errar. É um espelho incômodo.",
    leitura: {
      paragrafos: "§ 90 a 104",
      comentario: [
        "Ele enumera os devotos críticos, escrupulosos, exteriores, presunçosos, inconstantes, hipócritas e interesseiros. A lista é longa de propósito: quase todo mundo se reconhece em pelo menos um, e reconhecer-se é o objetivo.",
        "O mais perigoso é o presunçoso — o que se diz devoto e continua no pecado, contando com uma proteção automática. Montfort é severo aqui, e tem razão: uma devoção que dispensa a conversão não é devoção, é superstição com vocabulário católico.",
        "Leia este trecho procurando-se, e não procurando os outros. É a única leitura que dá fruto, e é também a mais difícil.",
      ],
    },
    meditacao: [
      "Em qual dessas sete figuras eu me reconheço?",
      "Minha devoção já me serviu de desculpa para não mudar?",
      "O que eu faço por costume e já não sei por quê?",
    ],
    oracao: {
      nome: "Ladainha de Nossa Senhora",
      motivo:
        "Rezá-la hoje é pedir que a devoção seja verdadeira, e não uma das sete que ele descreve.",
    },
    exercicio:
      "Escolha uma prática sua que virou automatismo e faça-a hoje com atenção inteira — ou deixe-a de lado.",
    jaculatoria: "Mãe, livrai-me de uma devoção de fachada.",
    resolucao: "Tirar da minha piedade uma coisa que faço só por hábito.",
    revisao: null,
  },
  {
    numero: 24,
    tema: "As marcas da devoção verdadeira",
    introducao:
      "Agora o retrato pelo lado certo: cinco sinais pelos quais se reconhece a devoção que vale.",
    leitura: {
      paragrafos: "§ 105 a 119",
      comentario: [
        "Montfort nomeia as marcas: interior, terna, santa, constante e desinteressada. Repare que nenhuma delas é um sentimento — todas são disposições verificáveis ao longo do tempo, e por isso mesmo pedem meses e não minutos para serem reconhecidas.",
        "A que mais custa é a última. Devoção desinteressada é a que permanece quando não vem nada em troca — nem consolação, nem resposta, nem a sensação de estar sendo ouvido. É a prova de que se ama a pessoa e não o benefício.",
        "Em seguida ele distingue as práticas comuns da prática perfeita. As comuns são boas e muita gente para nelas. A perfeita é o que você vai fazer no Grande Dia, e os próximos dois dias explicam em que ela consiste.",
      ],
    },
    meditacao: [
      "Qual destas cinco marcas falta mais na minha devoção?",
      "Eu continuaria rezando se não sentisse nada por um ano?",
      "O que eu espero receber em troca da consagração?",
    ],
    oracao: {
      id: "ave-maris-stella",
      nome: "Ave, Estrela do Mar",
      motivo:
        "Um hino sem pedido de proveito próprio: pede caminho, não recompensa.",
    },
    exercicio:
      "Reze hoje sem pedir nada para si. Só agradecimento e intercessão por outros.",
    jaculatoria: "Não pelo que recebo, mas por quem sois.",
    resolucao: "Rezar uma dezena por dia por alguém de quem eu não gosto.",
    revisao: null,
  },
  {
    numero: 25,
    tema: "A entrega inteira",
    introducao:
      "Hoje você lê exatamente o que vai fazer no Grande Dia. Convém ler devagar, porque é um compromisso.",
    leitura: {
      paragrafos: "§ 120 a 134",
      comentario: [
        "A prática perfeita consiste em entregar-se inteiramente a Maria, e por ela a Jesus Cristo: o corpo, os bens, os méritos, as satisfações e as orações — tudo, inclusive o direito de dispor do bem que fazemos.",
        "Montfort chama isso de perfeita renovação dos votos do batismo, e é a chave para entender a palavra escravidão, que ele usa e que soa mal hoje. Não é sujeição forçada: é o nome jurídico, no vocabulário do século XVIII, de uma doação que não guarda nada de volta. O que a torna cristã é ser livremente escolhida e por amor.",
        "Vale enfrentar a parte difícil: entregar os méritos significa abrir mão de dirigir as próprias boas obras, deixando que ela as aplique a quem quiser. Se isso incomoda, o incômodo é sinal de que você entendeu.",
      ],
    },
    meditacao: [
      "O que eu estou disposto a entregar? E o que eu quero guardar?",
      "Entregar os meus méritos me assusta? Por quê?",
      "Em que a palavra escravidão me incomoda, e em que ela me descreve?",
    ],
    oracao: {
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
    numero: 26,
    tema: "Rebeca e Jacó",
    introducao:
      "Montfort explica a devoção inteira por uma história do Gênesis. É o modo mais claro que ele encontrou, e funciona.",
    leitura: {
      paragrafos: "§ 183 a 212",
      evangelho: "Gênesis 27, 1-29",
      comentario: [
        "Rebeca veste Jacó com as roupas do irmão e com peles, para que o pai o abençoe. Montfort lê a cena inteira como figura: a mãe prepara o filho, cobre-o com o que não é dele, e o apresenta. A bênção vem por causa do que foi recebido, não do que ele era.",
        "É preciso dizer que a história bíblica tem um engano dentro dela, e Montfort não finge que não tem. Ele usa a figura, não o procedimento — e o que a figura mostra é que fomos revestidos de Cristo, e que é revestidos dele que somos apresentados ao Pai.",
        "Em seguida ele descreve o que ela faz com quem se entrega: ama, sustenta, conduz, defende, intercede. São cinco verbos, e vale perguntar-se de qual deles você mais precisa agora.",
      ],
    },
    meditacao: [
      "De qual dos cinco verbos eu mais preciso: ser amado, sustentado, conduzido, defendido ou apresentado?",
      "Releia a objeção que escrevi no dia 15. Ela ainda está de pé?",
      "O que significa, para mim, ser apresentado ao Pai não pelo que sou?",
    ],
    oracao: {
      nome: "Ladainha do Espírito Santo",
      motivo:
        "Fecha-se a semana pedindo a ele o conhecimento que se pediu durante sete dias.",
    },
    exercicio:
      "Reze hoje o terço inteiro, os três mistérios, se o seu dia permitir. Se não permitir, um, com atenção.",
    jaculatoria: "Revesti-me de vosso Filho.",
    resolucao: "Entrar na última semana sabendo que ela é sobre Ele, e não sobre mim.",
    revisao: null,
  },

  // ======================================================================
  // TERCEIRA SEMANA (27 a 33) — § 230
  // Conhecimento de Jesus Cristo. Mais a oração de santo Agostinho do § 67
  // e a ladainha do Santíssimo Nome de Jesus.
  // ======================================================================
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
        "No fim deste trecho, no § 67, está a oração de santo Agostinho que o § 230 manda rezar todos os dias desta semana. Procure-a hoje no seu exemplar e marque a página.",
      ],
    },
    meditacao: [
      "Que imagem de Jesus Cristo eu carrego? De onde ela veio?",
      "Em que parte da minha vida eu ainda não o deixei entrar?",
      "O que significa, concretamente, pertencer a Ele a partir do mês que vem?",
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
    resolucao:
      "Definir o horário, o lugar e, se possível, a missa em que farei a consagração.",
    revisao: null,
  },
  {
    numero: 28,
    tema: "Que eu vos conheça",
    introducao:
      "Montfort manda repetir, cem vezes ao dia se for preciso, um pedido de quatro palavras. Hoje é o dia dele.",
    leitura: {
      paragrafos: "§ 67 e § 230",
      comentario: [
        "“Noverim te” — Senhor, que eu vos conheça. A oração de santo Agostinho que está no § 67 é curta e pede uma coisa só: conhecer a Deus e conhecer-se a si mesmo. As duas semanas anteriores estão inteiras dentro dela.",
        "Conhecer, aqui, não é saber a respeito. É o conhecimento que vem do trato, aquele que não se transmite por explicação e que só o tempo com alguém produz. Por isso o pedido se repete: ninguém conhece outra pessoa de uma vez.",
        "O § 230 insiste na repetição justamente porque ela parece inútil. Dizer cem vezes a mesma coisa não informa a Deus de nada; forma quem diz.",
      ],
    },
    meditacao: [
      "Eu sei coisas sobre Cristo, ou eu o conheço?",
      "Quanto tempo por semana eu passo com Ele sem pedir nada?",
      "O que eu descobriria se passasse um ano fazendo este pedido?",
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
    tema: "A quem eu pertenço",
    introducao:
      "Antes de se entregar, convém saber que a entrega não cria um vínculo novo. Reconhece um que já existia.",
    leitura: {
      paragrafos: "§ 68 a 77",
      comentario: [
        "Montfort argumenta que já pertencemos a Jesus Cristo por três títulos: pela criação, pela redenção e pelo batismo. Não somos nossos, e nunca fomos. A consagração não transfere uma propriedade; reconhece uma que foi esquecida.",
        "Isso tira da consagração qualquer ar de gesto heroico. Ninguém está dando a Deus algo que lhe faltasse. Está devolvendo, de livre vontade, o que já era dele e vinha sendo administrado como se fosse próprio.",
        "O trecho também lembra as promessas do batismo, que quase todos fizeram por procuração, quando não podiam entender. O Grande Dia é a ocasião de assumi-las pessoalmente — é esse o sentido exato da palavra renovação.",
      ],
    },
    meditacao: [
      "Eu já li as promessas do meu batismo com atenção alguma vez?",
      "Que parte da minha vida eu administro como se fosse só minha?",
      "O que muda se eu não me pertenço?",
    ],
    oracao: {
      nome: "Ladainha do Santíssimo Nome de Jesus",
      motivo:
        "O § 230 acrescenta-a às orações desta semana, junto com as já conhecidas.",
    },
    exercicio:
      "Procure a data do seu batismo. Se não souber, peça à paróquia onde foi batizado.",
    jaculatoria: "Senhor, eu sou vosso.",
    resolucao: "Celebrar daqui em diante a data do meu batismo.",
    revisao: null,
  },
  {
    numero: 30,
    tema: "Um caminho fácil, curto, perfeito e seguro",
    introducao:
      "Montfort faz quatro afirmações sobre esta devoção. A primeira delas, hoje, costuma ser a mais contestada.",
    leitura: {
      paragrafos: "§ 152 a 168",
      comentario: [
        "Ele chama o caminho de fácil — não porque não custe, mas porque é percorrido apoiado em alguém. A distinção é a mesma entre subir sozinho e subir com quem conhece a trilha: o esforço continua, o risco de se perder não.",
        "Curto, porque encurta o tempo em que alguém se corrige sozinho a tropeções. Perfeito, porque se chega sem desvio. Seguro, porque é protegido contra a ilusão de ter chegado — que é o perigo de todo progresso espiritual.",
        "Se alguma dessas quatro palavras lhe soar grande demais, é o momento certo para a objeção: faltam três dias. Melhor trazê-la à tona agora do que descobri-la depois da consagração.",
      ],
    },
    meditacao: [
      "Qual das quatro palavras eu não consigo subscrever?",
      "O que eu já tentei fazer sozinho e não deu certo?",
      "Eu confio o bastante para ser conduzido?",
    ],
    oracao: {
      id: "jesus-vivente-em-maria",
      nome: "Ó Jesus vivente em Maria",
      motivo: "A oração do fim do caminho, rezada antes de chegar a ele.",
    },
    exercicio:
      "Converse hoje com alguém que já se consagrou, ou com um sacerdote, sobre a sua objeção.",
    jaculatoria: "Conduzi-me, que eu não sei o caminho.",
    resolucao: "Levar à confissão, se ainda não levei, o que me impede de entregar tudo.",
    revisao: null,
  },
  {
    numero: 31,
    tema: "O que isto faz numa pessoa",
    introducao:
      "Faltam dois dias. Hoje se lê o que Montfort promete — e convém ler sabendo que não é promessa de sentimento.",
    leitura: {
      paragrafos: "§ 213 a 225",
      comentario: [
        "Os efeitos que ele descreve são sete, e o primeiro é o menos atraente: conhecimento e desprezo de si mesmo. Não vem a consolação primeiro. Vem a verdade, de novo, agora sem o peso que tinha na primeira semana.",
        "Depois: participação da fé de Maria, graça do puro amor, grande confiança, comunicação do espírito dela, transformação em Cristo, e a maior glória de Jesus Cristo. Repare que o último não é um benefício para quem se consagra. É o ponto para onde tudo aponta.",
        "Montfort avisa, com honestidade, que isso não se dá de uma vez nem por igual em todos. É uma descrição do que a vida inteira pode produzir, não do que acontece na segunda-feira seguinte.",
      ],
    },
    meditacao: [
      "O que eu espero sentir no Grande Dia? E se não sentir nada?",
      "Qual destes efeitos eu já reconheço começando?",
      "Eu quero isto por mim, ou pela glória d'Ele?",
    ],
    oracao: {
      nome: "Ladainha do Santíssimo Nome de Jesus",
      motivo: "Os nomes d'Ele, repetidos, dizem melhor do que qualquer promessa.",
    },
    exercicio:
      "Releia a resolução que você escreveu no dia 1. Veja se ela se cumpriu.",
    jaculatoria: "Que Ele cresça, e eu diminua.",
    resolucao: "Não medir esta consagração pelo que eu sentir no dia.",
    revisao: null,
  },
  {
    numero: 32,
    tema: "Por ela, com ela, nela, para ela",
    introducao:
      "Amanhã é a véspera. Hoje se aprende o que fazer no dia seguinte ao Grande Dia, e em todos os outros.",
    leitura: {
      paragrafos: "§ 257 a 265",
      comentario: [
        "Quatro preposições organizam a vida inteira depois da consagração: fazer tudo por Maria, com Maria, em Maria e para Maria. Não são graus de devoção; são quatro aspectos de um mesmo gesto, e Montfort explica cada um com precisão.",
        "Por ela é agir em obediência ao espírito dela. Com ela é tomá-la por modelo em cada ação. Nela é agir dentro daquele interior, como num lugar. Para ela é fazer tudo tendo-a por fim próximo, sendo Deus o fim último.",
        "Esta é a parte prática que sobrevive ao Grande Dia. A consagração dura um instante; isto dura o resto da vida, e é por isto que o dia 34 não é o fim de nada.",
      ],
    },
    meditacao: [
      "Qual das quatro me parece possível já amanhã?",
      "Como será o meu dia 34?",
      "O que eu quero que permaneça disto daqui a um ano?",
    ],
    oracao: {
      id: "jesus-vivente-em-maria",
      nome: "Ó Jesus vivente em Maria",
      motivo: "A oração que pede exatamente isto: que Ele viva e aja em mim como nela.",
    },
    exercicio:
      "Escolha uma das quatro preposições e escreva, em uma frase, como ela se parecerá na sua semana.",
    jaculatoria: "Por vós, convosco, em vós e para vós.",
    resolucao: "Definir a prática concreta que vou manter depois da consagração.",
    revisao: null,
  },
  {
    numero: 33,
    tema: "A véspera",
    introducao:
      "Hoje é o último dia da preparação. Amanhã é o Grande Dia. Esta noite é para arrumar a casa, não para começar nada.",
    leitura: {
      paragrafos: "§ 231 a 233",
      comentario: [
        "O § 231 diz o que fazer amanhã, e é simples: confessar-se e comungar com a intenção de se dar a Jesus Cristo pelas mãos de Maria; depois da comunhão, recitar a fórmula de consagração; escrevê-la ou mandá-la escrever, e assiná-la no mesmo dia.",
        "O § 232 acrescenta um tributo — um jejum, uma mortificação, uma esmola, um círio. Montfort diz, com delicadeza, que mesmo um alfinete oferecido de bom coração basta, porque Deus olha a vontade. Se você ainda não escolheu o seu, escolha hoje.",
        "Procure agora, no seu exemplar, a fórmula de consagração: ela está nas páginas finais, depois do Tratado. Leia-a uma vez esta noite, em silêncio, sem rezá-la. Amanhã ela será rezada em voz alta, e é bom que não seja a primeira vez que você a vê.",
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

/** Os dias que já têm conteúdo, para o painel de quem escreve. */
export const DIAS_ESCRITOS = DIAS.map((d) => d.numero);
