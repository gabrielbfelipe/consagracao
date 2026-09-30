import type { NomeDaImagem } from "@/lib/imagens";

/**
 * O guia de entrada: o que é a consagração e como esta preparação funciona.
 *
 * Escrito para quem nunca fez nada parecido e não conhece o vocabulário.
 * Nenhum termo entra sem ser explicado na mesma frase.
 *
 * CONTEÚDO SUJEITO A REVISÃO PASTORAL antes de ir ao ar.
 */

export type Capitulo = {
  id: string;
  titulo: string;
  /** Uma linha que resume o capítulo, lida antes do texto. */
  chamada: string;
  paragrafos: string[];
  imagem?: NomeDaImagem;
  /** Um recado que precisa ficar destacado do corpo do texto. */
  aviso?: { titulo: string; texto: string[] };
};

export const CAPITULOS: readonly Capitulo[] = [
  {
    id: "o-que-e",
    titulo: "O que é a consagração",
    chamada:
      "Entregar-se inteiramente a Jesus Cristo, pelas mãos de Nossa Senhora.",
    imagem: "bibliotecaBarroca",
    paragrafos: [
      "Consagrar-se é entregar alguma coisa a Deus de modo definitivo. Quando essa coisa é você mesmo — seu corpo, seu tempo, seu trabalho, suas orações, aquilo que você tem e aquilo que ainda vai ter — chama-se consagração pessoal.",
      "A consagração a Nossa Senhora não coloca Maria no lugar de Deus. Ela faz o contrário: você se entrega a Jesus Cristo, e pede a Maria que conduza essa entrega, porque ninguém o conhece melhor do que ela, e ninguém leva a Ele com mais segurança.",
      "É por isso que a fórmula clássica não diz “consagro-me a Maria”, e sim que nos entregamos a Jesus por Maria. Ela é o caminho, não o destino.",
      "Nada disso muda o seu estado de vida. Você não se torna religioso, não faz voto nenhum, não assume obrigação sob pecado. O que muda é a intenção com que você vive: tudo o que você fizer passa a ser feito com Ela e por Ela oferecido a Cristo.",
    ],
  },
  {
    id: "metodo",
    titulo: "O método de São Luís de Montfort",
    chamada:
      "Um padre francês do século XVIII escreveu o caminho que você vai percorrer.",
    imagem: "livroAberto",
    paragrafos: [
      "São Luís Maria Grignion de Montfort nasceu na França em 1673 e passou a vida pregando pelas aldeias do interior, quase sempre a pé. Escreveu um livro pequeno, o Tratado da Verdadeira Devoção à Santíssima Virgem, que ficou perdido dentro de um baú por mais de cem anos até ser encontrado em 1842.",
      "Nesse livro ele propõe uma preparação de trinta e três dias antes da consagração — um dia para cada ano da vida de Cristo na terra. Não é um curso nem um treinamento. É um tempo de esvaziamento e de preenchimento: primeiro você se desprende do que atrapalha, depois se enche daquilo que importa.",
      "O método foi seguido por milhões de pessoas desde então, entre elas o Papa São João Paulo II, que tirou do Tratado o lema do seu pontificado: Totus tuus, inteiramente vosso.",
      "Você não precisa ter formação nenhuma para fazer esta preparação. Precisa de trinta e três dias e de um pouco de silêncio por dia.",
    ],
  },
  {
    id: "etapas",
    titulo: "Como os trinta e três dias se organizam",
    chamada: "Doze dias para soltar, e três semanas para conhecer.",
    imagem: "arcaria",
    paragrafos: [
      "Os doze primeiros dias servem para desprender-se do espírito do mundo. Montfort chama assim a maneira de pensar que mede tudo pela aparência, pelo sucesso e pela pressa. Não se trata de desprezar o mundo, mas de reconhecer o quanto ele já pensa dentro de nós.",
      "A primeira semana, do dia treze ao dezenove, é dedicada ao conhecimento de si mesmo. É a parte mais desconfortável e a mais libertadora: olhar com verdade para a própria miséria, sem desespero e sem maquiagem, e descobrir que é exatamente ali que a graça entra.",
      "A segunda semana, do dia vinte ao vinte e seis, é dedicada ao conhecimento de Nossa Senhora. Quem é ela, o que a Igreja crê a seu respeito, por que a devoção a ela não afasta de Cristo mas conduz a Ele.",
      "A terceira semana, do dia vinte e sete ao trinta e três, é dedicada ao conhecimento de Jesus Cristo, que é o fim de todo o caminho. As duas semanas anteriores existiam para chegar até aqui.",
      "No trigésimo quarto dia — a festa que você escolheu — você faz a consagração.",
    ],
  },
  {
    id: "dia-a-dia",
    titulo: "O que você fará a cada dia",
    chamada: "Sete passos curtos, entre vinte e quarenta minutos.",
    imagem: "velas",
    paragrafos: [
      "Cada dia é conduzido do começo ao fim. Você não precisa decidir o que ler, quando rezar ou por onde começar: basta abrir e seguir.",
      "Primeiro você se prepara, com um instante de silêncio para deixar o dia do lado de fora. Depois lê o trecho do dia e recebe uma explicação em linguagem simples do que acabou de ler. Em seguida medita, guiado por poucas perguntas. Reza a oração própria daquele dia. Reflete, escrevendo o que quiser, com a ajuda de um assistente se preferir. Pratica, levando para o dia um exercício concreto e uma jaculatória — uma frase curta para repetir enquanto faz outras coisas. E por fim registra no seu diário o que ficou.",
      "Se um dia você não conseguir, nada se perde. A jornada não tem sequência a quebrar nem cobrança a receber. Você retoma de onde parou, ou reorganiza o calendário, e o que já foi vivido continua guardado.",
    ],
  },
  {
    id: "o-livro",
    titulo: "O livro que acompanha a jornada",
    chamada: "Você vai precisar de um exemplar do Tratado.",
    imagem: "pergaminho",
    paragrafos: [
      "A cada dia indicaremos exatamente qual trecho do Tratado da Verdadeira Devoção ler, pelo número dos parágrafos — a numeração que toda edição séria traz na margem. Aqui você poderá marcar o que leu, anotar o que pensou e voltar às suas anotações quando quiser.",
      "Ao escolher a sua edição, prefira uma que traga os parágrafos numerados. É o que permitirá acompanhar as indicações diárias sem se perder.",
    ],
    aviso: {
      titulo: "Por que o livro não está aqui dentro",
      texto: [
        "O Tratado da Verdadeira Devoção é uma obra de São Luís de Montfort, mas as traduções para o português pertencem às editoras e aos tradutores que as fizeram. Reproduzir esse texto aqui seria tomar o trabalho de outras pessoas.",
        "Por isso recomendamos que você adquira o seu exemplar, em uma livraria católica ou diretamente com a editora. É um livro pequeno, e daqueles que ficam com a pessoa a vida inteira — para reler, sublinhar e emprestar.",
        "Tudo o mais que esta jornada oferece foi escrito para você: as explicações, as meditações, os exercícios e as orações.",
      ],
    },
  },
  {
    id: "oracoes",
    titulo: "As orações da preparação",
    chamada: "Poucas, repetidas todos os dias até se tornarem suas.",
    paragrafos: [
      "Montfort indica um conjunto pequeno de orações que atravessam os trinta e três dias. Entre elas estão o Vinde, Espírito Criador, a Ave-Maris-Stella, o Magnificat, as ladainhas e o Rosário.",
      "Todas estarão disponíveis no aplicativo, escritas e também narradas em áudio, para quando você quiser rezar caminhando, dirigindo ou com os olhos fechados.",
      "Não é preciso saber nenhuma de cor. A repetição durante trinta e três dias se encarrega disso.",
    ],
  },
  {
    id: "grande-dia",
    titulo: "O dia da consagração",
    chamada: "A festa que você escolher, e o que acontece nela.",
    imagem: "luzPelasJanelas",
    paragrafos: [
      "No dia da festa você fará a consagração propriamente dita. A tradição recomenda que se confesse e comungue nesse dia, e que a fórmula seja rezada diante de uma imagem de Nossa Senhora — na igreja, se possível, ou em casa.",
      "O aplicativo o conduzirá por esse momento: o que fazer antes, a que horas, quais orações rezar e o texto da consagração, apresentado de modo que você possa lê-lo com calma, em tela cheia ou ouvindo.",
      "Muitos escrevem, no primeiro dia, uma carta explicando por que decidiram fazer isso. Essa carta fica guardada e só é aberta no dia da consagração. Se você quiser escrever a sua, nós a guardaremos.",
    ],
  },
  {
    id: "depois",
    titulo: "E depois do dia",
    chamada: "A consagração não é uma linha de chegada.",
    paragrafos: [
      "Trinta e três dias preparam uma entrega que dura a vida. Por isso, terminado o Grande Dia, o aplicativo muda: em vez de encerrar, ele passa a acompanhar o que começou.",
      "Você receberá conteúdos semanais, sugestões de prática, leituras de aprofundamento e a lembrança do aniversário da sua consagração, quando muitos escolhem renová-la.",
      "O que se prometeu num dia se vive nos outros. É essa parte que o aplicativo quer acompanhar com você.",
    ],
  },
] as const;
