import type { NomeDaImagem } from "@/lib/imagens";

/**
 * As páginas de apresentação, separadas por assunto.
 *
 * Antes isto era um único rolar de oito capítulos, e ninguém chegava ao fim.
 * Agora cada assunto é uma sala com porta própria no menu, e a home traz só
 * o resumo de cada uma.
 *
 * Escrito para quem nunca fez nada parecido: nenhum termo entra sem ser
 * explicado na mesma frase.
 *
 * CONTEÚDO SUJEITO A REVISÃO PASTORAL.
 */

export type Secao = {
  titulo?: string;
  paragrafos: string[];
};

export type Aviso = { titulo: string; texto: string[] };

export type Pagina = {
  slug: string;
  /** Título da página. */
  titulo: string;
  /** Rótulo curto, para o menu do cabeçalho. */
  menu: string;
  /** Uma linha, logo abaixo do título. */
  chamada: string;
  /** O parágrafo que representa esta página na home. */
  resumo: string;
  imagem?: NomeDaImagem;
  secoes: Secao[];
  aviso?: Aviso;
};

export const PAGINAS: readonly Pagina[] = [
  {
    slug: "a-consagracao",
    titulo: "O que é a consagração",
    menu: "A consagração",
    chamada:
      "Entregar-se inteiramente a Jesus Cristo, pelas mãos de Nossa Senhora.",
    resumo:
      "Consagrar-se é entregar a si mesmo a Deus de modo definitivo. Não a Maria como destino: é a Cristo que nos entregamos, e a ela pedimos que conduza a entrega, porque ninguém o conhece melhor.",
    imagem: "bibliotecaBarroca",
    secoes: [
      {
        paragrafos: [
          "Consagrar alguma coisa é entregá-la a Deus de modo definitivo. Quando essa coisa é você mesmo — seu corpo, seu tempo, seu trabalho, suas orações, aquilo que você tem e aquilo que ainda vai ter — chama-se consagração pessoal.",
          "A consagração a Nossa Senhora não coloca Maria no lugar de Deus. Ela faz o contrário: você se entrega a Jesus Cristo, e pede a Maria que conduza essa entrega, porque ninguém o conhece melhor do que ela, e ninguém leva a Ele com mais segurança.",
          "É por isso que a fórmula clássica não diz “consagro-me a Maria”. Diz que nos entregamos a Jesus por Maria. Ela é o caminho, não o destino.",
        ],
      },
      {
        titulo: "O que não muda",
        paragrafos: [
          "Nada no seu estado de vida. Você não se torna religioso, não faz voto nenhum, não assume obrigação sob pecado. Se um dia deixar de rezar o que se propôs, não cometeu por isso uma falta grave.",
          "O que muda é a intenção com que você vive: tudo o que fizer passa a ser feito com ela e por ela oferecido a Cristo.",
        ],
      },
      {
        titulo: "Quem foi São Luís de Montfort",
        paragrafos: [
          "Nasceu na França em 1673 e passou a vida pregando pelas aldeias do interior, quase sempre a pé. Escreveu um livro pequeno, o Tratado da Verdadeira Devoção à Santíssima Virgem, que ficou esquecido dentro de um baú por mais de cem anos até ser encontrado em 1842.",
          "Nele propõe uma preparação de trinta e três dias antes da consagração — um dia para cada ano da vida de Cristo na terra. Não é um curso nem um treinamento: é um tempo de esvaziamento e de preenchimento. Primeiro você se desprende do que atrapalha, depois se enche daquilo que importa.",
        ],
      },
    ],
  },
  {
    slug: "por-que-fazer",
    titulo: "Por que fazer",
    menu: "Por que fazer",
    chamada: "Não é mais uma devoção. É um modo de viver as que você já tem.",
    resumo:
      "A consagração não acrescenta obrigações à sua vida espiritual: ela reorganiza o que já existe. Montfort a chama de caminho mais curto e mais seguro para chegar a Cristo — e não porque seja fácil.",
    imagem: "tetoSacro",
    secoes: [
      {
        paragrafos: [
          "A primeira reação de muita gente é razoável: já tenho pouco tempo para rezar, por que acrescentar mais uma coisa? A resposta é que a consagração não acrescenta. Ela reorganiza.",
          "Depois dela, as mesmas orações, o mesmo trabalho e as mesmas dificuldades continuam sendo os mesmos — mas deixam de ser oferecidos por conta própria. Passam pelas mãos de quem sabe apresentá-los melhor do que nós.",
        ],
      },
      {
        titulo: "O que Montfort promete",
        paragrafos: [
          "Ele é direto: chama esta devoção de caminho mais curto, mais fácil, mais perfeito e mais seguro para chegar a Cristo. Mais curto porque não se perde tempo com desvios. Mais seguro porque não depende da nossa avaliação sobre nós mesmos, que costuma errar nos dois sentidos.",
          "Fácil, aqui, não quer dizer confortável. Quer dizer que o peso muda de lugar. A dificuldade da vida cristã não desaparece; deixa de ser carregada sozinho.",
        ],
      },
      {
        titulo: "O que costuma mudar de fato",
        paragrafos: [
          "Quem atravessa os trinta e três dias costuma relatar três coisas. A primeira é uma noção mais concreta da própria fragilidade, sem o desespero que normalmente a acompanha. A segunda é o fim do receio de que a devoção a Maria tire algo de Cristo. A terceira é uma constância maior na oração, porque ela passou a ter um lugar fixo no dia.",
          "Nada disso é automático nem garantido. É o que se costuma ver, e é honesto dizer que muita gente não sente nada de especial — e nem por isso a consagração valeu menos.",
        ],
      },
      {
        titulo: "Quem já fez",
        paragrafos: [
          "O Papa São João Paulo II leu o Tratado quando trabalhava numa fábrica de produtos químicos em Cracóvia, durante a ocupação nazista. Tirou dali o lema do seu pontificado: Totus tuus, inteiramente vosso. Escreveu depois que aquele livro foi um ponto de virada em sua vida.",
          "São Maximiliano Kolbe, Santa Teresa de Calcutá e milhões de pessoas sem nome nenhum fizeram o mesmo caminho. Ele não foi feito para poucos.",
        ],
      },
    ],
  },
  {
    slug: "a-preparacao",
    titulo: "Os trinta e três dias",
    menu: "A preparação",
    chamada: "Doze dias para soltar, e três semanas para conhecer.",
    resumo:
      "Doze dias preliminares para desprender-se do espírito do mundo, e depois três semanas: conhecimento de si mesmo, de Nossa Senhora e de Jesus Cristo. No trigésimo quarto dia, a consagração.",
    imagem: "arcaria",
    secoes: [
      {
        titulo: "Os doze dias preliminares",
        paragrafos: [
          "Servem para desprender-se do espírito do mundo. Montfort chama assim a maneira de pensar que mede tudo pela aparência, pelo sucesso e pela opinião dos outros. Não se trata de desprezar o mundo, mas de reconhecer o quanto ele já pensa dentro de nós.",
          "É difícil de enxergar porque não se apresenta como escolha. Aparece como bom senso. Por isso esta primeira parte é de reconhecimento, e ainda não de combate.",
        ],
      },
      {
        titulo: "Primeira semana — conhecimento de si mesmo",
        paragrafos: [
          "Do dia treze ao dezenove. É a parte mais desconfortável e a mais libertadora: olhar com verdade para a própria miséria, sem desespero e sem maquiagem, e descobrir que é exatamente ali que a graça entra.",
          "A tentação desta semana é o desânimo. Ver a própria pobreza sem ver a misericórdia produz tristeza, não conversão.",
        ],
      },
      {
        titulo: "Segunda semana — conhecimento de Nossa Senhora",
        paragrafos: [
          "Do dia vinte ao vinte e seis. Quem ela é, o que a Igreja crê a seu respeito, e por que a devoção a ela não afasta de Cristo mas conduz a Ele.",
          "É a semana que mais desfaz resistências. Muita gente chega aqui receando estar exagerando, e descobre que o exagero seria justamente separá-la de Cristo, a quem ela sempre remete.",
        ],
      },
      {
        titulo: "Terceira semana — conhecimento de Jesus Cristo",
        paragrafos: [
          "Do dia vinte e sete ao trinta e três. É o fim de todo o caminho: as duas semanas anteriores existiam para chegar até aqui.",
          "No dia seguinte ao trigésimo terceiro — a festa que você escolheu — acontece a consagração.",
        ],
      },
      {
        titulo: "O Grande Dia",
        paragrafos: [
          "A tradição recomenda confessar-se e comungar nesse dia, e rezar a fórmula diante de uma imagem de Nossa Senhora: na igreja, se possível, ou em casa.",
          "A plataforma conduz esse momento — o que fazer antes, a que horas, quais orações rezar e como ler o texto da consagração com calma.",
        ],
      },
      {
        titulo: "E depois",
        paragrafos: [
          "Trinta e três dias preparam uma entrega que dura a vida. Por isso, terminado o Grande Dia, a mensagem não é “você terminou”, e sim “agora começa uma nova etapa”.",
          "Seguem conteúdos semanais, sugestões de prática, leituras de aprofundamento e a lembrança do aniversário da consagração, quando muitos escolhem renová-la.",
        ],
      },
    ],
  },
  {
    slug: "a-plataforma",
    titulo: "Como a plataforma funciona",
    menu: "A plataforma",
    chamada: "Você escolhe a data. O caminho até ela é preparado para você.",
    resumo:
      "Você escolhe a festa em que quer se consagrar, e o sistema calcula o dia exato de começar. A partir daí, cada dia chega pronto: leitura, meditação, oração, exercício e um espaço para escrever.",
    imagem: "velas",
    secoes: [
      {
        titulo: "Primeiro, a data",
        paragrafos: [
          "Você escolhe entre vinte e quatro festas de Nossa Senhora. O sistema calcula sozinho o dia de começar — trinta e três dias antes — e mostra como as etapas se distribuem pelo calendário.",
          "Só aparecem as datas que ainda dá tempo de alcançar. Se a preparação para uma festa já teria começado, ela não é oferecida neste ano, e sim no seguinte. Assim ninguém escolhe uma data impossível sem perceber.",
        ],
      },
      {
        titulo: "Depois, um dia de cada vez",
        paragrafos: [
          "No dia marcado para começar, a jornada se abre sozinha. Você não precisa decidir o que ler, quando rezar ou por onde começar.",
          "Cada dia é conduzido em sete passos curtos, entre vinte e quarenta minutos no total: prepare-se, leia, medite, reze, reflita, pratique e registre. Um passo de cada vez, e só depois o seguinte.",
        ],
      },
      {
        titulo: "O que fica guardado",
        paragrafos: [
          "Tudo o que você escreve vai para um diário que só você lê. No primeiro dia você pode escrever uma carta explicando por que decidiu se consagrar — ela fica lacrada e só se abre no dia da consagração. Nem você consegue relê-la antes disso, e isso é garantido pelo próprio banco de dados, não por uma regra de tela.",
          "Há também o Meu Motivo: uma ou duas frases que reaparecem nos dias em que a vontade faltar.",
        ],
      },
      {
        titulo: "Quando o dia não acontece",
        paragrafos: [
          "Você pode pausar e retomar. Se perder dias, continua de onde parou, e nada do que já viveu se apaga.",
          "Não há sequências a quebrar, pontuação, ranking nem comparação com ninguém. Nenhuma notificação vai dizer que você falhou.",
        ],
      },
      {
        titulo: "Quando pesar",
        paragrafos: [
          "Há um botão sempre à mão — “Preciso de um momento de oração” — que conduz uma oração breve: uma palavra da Escritura, uma prece, uma jaculatória e um silêncio.",
          "Existe também o Modo Silêncio, em que a interface praticamente desaparece e fica só uma oração na tela. Nenhum dos dois substitui a confissão, a direção espiritual ou ajuda profissional, e a própria tela diz isso.",
        ],
      },
    ],
  },
  {
    slug: "o-livro",
    titulo: "O livro e as orações",
    menu: "O livro",
    chamada: "Você vai precisar de um exemplar do Tratado.",
    resumo:
      "A jornada caminha ao lado do Tratado da Verdadeira Devoção. Não reproduzimos o livro aqui, por respeito a quem o traduziu e publicou — indicamos, a cada dia, quais parágrafos ler no seu exemplar.",
    imagem: "pergaminho",
    secoes: [
      {
        paragrafos: [
          "A cada dia indicamos exatamente qual trecho ler, pelo número dos parágrafos — a numeração que toda edição séria traz na margem. Aqui você marca o que leu, anota o que pensou e volta às suas anotações quando quiser.",
          "Ao escolher a sua edição, prefira uma que traga os parágrafos numerados. É o que permitirá acompanhar as indicações diárias sem se perder. Procure em livrarias católicas ou diretamente com a editora.",
        ],
      },
      {
        titulo: "As orações da preparação",
        paragrafos: [
          "Montfort indica um conjunto pequeno de orações que atravessam os trinta e três dias: o Vinde, Espírito Criador, a Ave, Estrela do Mar, o Magnificat, as ladainhas, o Rosário e o Ó Jesus vivente em Maria.",
          "Todas ficam na biblioteca, com o original em latim ao lado da tradução, para quem quiser conferir. Não é preciso saber nenhuma de cor: a repetição durante trinta e três dias se encarrega disso.",
        ],
      },
    ],
    aviso: {
      titulo: "Por que o livro não está aqui dentro",
      texto: [
        "O Tratado da Verdadeira Devoção é uma obra de São Luís de Montfort, mas as traduções para o português pertencem às editoras e aos tradutores que as fizeram. Reproduzir esse texto aqui seria tomar o trabalho de outras pessoas.",
        "Por isso recomendamos que você adquira o seu exemplar. É um livro pequeno, e daqueles que ficam com a pessoa a vida inteira — para reler, sublinhar e emprestar.",
        "Tudo o mais que esta jornada oferece foi escrito para você: as explicações, as meditações, os exercícios e as orações.",
      ],
    },
  },
] as const;

export function paginaPorSlug(slug: string): Pagina | null {
  return PAGINAS.find((p) => p.slug === slug) ?? null;
}

/** A página seguinte, para quem quiser ler tudo em ordem. */
export function proximaPagina(slug: string): Pagina | null {
  const i = PAGINAS.findIndex((p) => p.slug === slug);
  return i >= 0 && i < PAGINAS.length - 1 ? PAGINAS[i + 1] : null;
}
