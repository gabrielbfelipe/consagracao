import type { FestaId } from "@/lib/agenda/festas";

/**
 * O que se conta sobre cada uma das vinte e quatro festas.
 *
 * POR QUE ESTE ARQUIVO EXISTE
 * As páginas de festa traziam um parágrafo de quarenta palavras cada, e o
 * resto da tela era o cronograma — o mesmo texto nas vinte e quatro,
 * mudando só as datas. Vinte e quatro páginas quase iguais, com publicidade
 * em todas, é exactamente o que o Google chama de conteúdo de baixo valor, e
 * foi por isso que a conta de editor foi recusada. Mais do que isso: quem
 * chega ao calendário está a escolher a data da própria consagração, e
 * quarenta palavras não bastam para escolher nada.
 *
 * O QUE ESTÁ ESCRITO AQUI, E O QUE NÃO ESTÁ
 * História da devoção, o acto da Igreja que a instituiu quando existe, o
 * que o título diz de Nossa Senhora, como a data é vivida no Brasil, e por
 * que alguém se consagraria nela. Não há aqui nenhuma linha copiada de
 * outro site: é redacção própria a partir das fontes listadas em cada
 * entrada, e são elas que a página mostra ao leitor.
 *
 * ONDE AS FONTES DISCORDAM, O TEXTO DIZ QUE DISCORDAM. Houve dois casos em
 * que elas corrigiram o que estava no sistema — a data do Desterro e a da
 * Penha —, e isso está registado no comentário de cada uma em
 * lib/agenda/festas.ts.
 *
 * NADA DISTO É MAGISTÉRIO. É informação histórica e devocional, escrita
 * para ajudar a escolher uma data. Questões de fé e de consciência
 * pertencem ao pároco de quem lê.
 */

export type Fonte = {
  titulo: string;
  url: string;
};

export type TextoDaFesta = {
  /** O parágrafo de abertura, logo abaixo do título. */
  sobre: string;
  /** O corpo: história, instituição, sentido, e a ligação com Montfort. */
  historia: readonly string[];
  /** Mostradas ao pé da página, para quem quiser conferir. */
  fontes: readonly Fonte[];
};

const MARIALIS_CULTUS: Fonte = {
  titulo: "Paulo VI, exortação apostólica Marialis Cultus (1974)",
  url: "https://www.vatican.va/content/paul-vi/pt/apost_exhortations/documents/hf_p-vi_exh_19740202_marialis-cultus.html",
};

const ROSARIUM: Fonte = {
  titulo: "João Paulo II, carta apostólica Rosarium Virginis Mariae (2002)",
  url: "https://www.vatican.va/content/john-paul-ii/pt/apost_letters/2002/documents/hf_jp-ii_apl_20021016_rosarium-virginis-mariae.html",
};

const PIO_IX: Fonte = {
  titulo: "Pio IX, bula Ineffabilis Deus (8 de dezembro de 1854)",
  url: "https://www.vatican.va/content/pius-ix/pt.html",
};

export const TEXTOS_DAS_FESTAS: Record<FestaId, TextoDaFesta> = {
  "santa-maria-mae-de-deus": {
    sobre:
      "A Igreja abre o ano celebrando o título mais antigo e mais alto de Nossa Senhora, proclamado no Concílio de Éfeso em 431: Theotókos, aquela que gerou Deus feito homem. Consagrar-se nesta data é colocar o ano inteiro sob esse mistério.",
    historia: [
      "O título é anterior a quase tudo o que se diz de Maria. Em 431, reunido em Éfeso, o terceiro concílio ecuménico respondeu a Nestório, que preferia chamá-la Christotókos — mãe de Cristo — por recear que Theotókos, Mãe de Deus, confundisse a divindade com a carne. O concílio decidiu pela palavra maior, e a razão não era sobre ela: se o que nasceu de Maria não é Deus, então Deus não se fez homem, e a Encarnação desfaz-se. Dizer Mãe de Deus é, antes de tudo, uma afirmação sobre Jesus Cristo.",
      "A data de 1 de janeiro é o oitavo dia do Natal — o dia em que o Evangelho relata a circuncisão e a imposição do nome. Roma celebrou aí, desde o século VII, uma festa mariana própria, que depois cedeu lugar à Circuncisão. A reforma do calendário, em 1969, devolveu-lhe o carácter antigo e fez dela a solenidade de Santa Maria, Mãe de Deus. Paulo VI comentou a decisão dizendo que a data se destina a celebrar a parte que Maria teve no mistério da salvação e a exaltar a singular dignidade que daí vem para a Mãe santa.",
      "No mesmo dia a Igreja reza pela paz: desde 1968, por decisão de Paulo VI, 1 de janeiro é o Dia Mundial da Paz, e as mensagens pontifícias desse dia formam um corpo contínuo de ensinamento social. Quem se consagra nesta data acorda num dia que é, ao mesmo tempo, dogmático e muito concreto.",
      "Para quem segue Montfort, a escolha tem uma lógica clara. O Tratado inteiro se apoia na maternidade divina: Maria importa porque Deus quis nascer dela, e a devoção que ele propõe é uma imitação do caminho que o próprio Deus escolheu para vir até nós. Começar o ano assim é dizer, em 1 de janeiro, o que se vai repetir nos doze meses seguintes.",
      "Há uma consequência prática a pesar antes de decidir: contando trinta e três dias para trás, a preparação começa no fim de novembro e atravessa inteiro o Advento e o Natal. Para muita gente isso é um ganho — o tempo litúrgico acompanha o que se está a fazer. Para quem tem a casa cheia e a agenda tomada nessas semanas, é o contrário. Vale olhar o calendário doméstico antes de marcar.",
    ],
    fontes: [MARIALIS_CULTUS],
  },

  "apresentacao-do-senhor": {
    sobre:
      "Quarenta dias depois do Natal, Maria e José levam o Menino ao Templo, e o velho Simeão o reconhece como luz para iluminar as nações. Daí vêm as velas bentas, o nome Candeias e, em boa parte do Brasil, a festa de Nossa Senhora dos Navegantes.",
    historia: [
      "O Evangelho de Lucas conta que, cumpridos os dias da purificação segundo a Lei de Moisés, os pais levaram Jesus a Jerusalém para o apresentar ao Senhor. Ali Simeão o tomou nos braços e disse as palavras que a Igreja repete todas as noites na oração de completas: luz para iluminar as nações e glória de Israel, teu povo. E disse a Maria a frase que atravessa tudo o que se celebra dela: uma espada te traspassará a alma.",
      "A celebração é antiquíssima. A peregrina Egéria, que esteve na Terra Santa no fim do século IV, descreve em Jerusalém uma festa no quadragésimo dia depois da Epifania, com procissão e grande solenidade. De lá passou a Constantinopla e a Roma. A procissão com velas acesas, que deu à data o nome popular de Candelária ou Candeias, está documentada em Roma desde o século VII e explica-se sozinha: celebra-se o dia em que a Luz entrou no seu Templo, e entra-se na igreja com luz na mão.",
      "Paulo VI foi cuidadoso ao classificá-la. É uma festa do Senhor, não de Nossa Senhora — e, no entanto, é uma festa em que a Mãe aparece inseparável do Filho: a memória conjunta do Filho e da Mãe, da oferta e da profecia de Simeão. É por isso que ela entra numa lista de datas marianas sem contradição nenhuma.",
      "No Brasil a data ganhou outro nome e outra cara. Em Porto Alegre, em boa parte do Rio Grande do Sul e em cidades ribeirinhas do país inteiro, 2 de fevereiro é a festa de Nossa Senhora dos Navegantes, com procissão de barcos e romaria pelo rio. É a mesma celebração litúrgica, vestida de um povo que vive da água. Quem procura uma e quem procura a outra está à procura do mesmo dia.",
      "Desde 1997, por decisão de João Paulo II, 2 de fevereiro é também o Dia Mundial da Vida Consagrada. A coincidência não é pequena para quem vai consagrar-se: o dia em que a Igreja reza por quem entregou a vida inteira é um bom dia para alguém entregar a sua, no estado em que está. A preparação, contada para trás, cai no fim de dezembro — começa logo depois do Natal, o que para muita gente é mais fácil do que começar dentro dele.",
    ],
    fontes: [MARIALIS_CULTUS],
  },

  "nossa-senhora-de-lourdes": {
    sobre:
      "Em 1858, numa gruta suja à beira do rio Gave, Nossa Senhora apareceu dezoito vezes a uma menina de catorze anos que não sabia ler, tinha asma e não conseguia decorar o catecismo. Lourdes é a festa dos doentes e dos pequenos.",
    historia: [
      "Bernadette Soubirous era a filha mais velha de um moleiro falido. A família vivia no cachot, a antiga cadeia de Lourdes, cedida por caridade porque ninguém mais a queria. Em 11 de fevereiro de 1858, apanhando lenha perto da gruta de Massabielle, ela viu numa cavidade da rocha uma jovem vestida de branco com um rosário no braço. Houve dezoito aparições, de fevereiro a julho. Bernadette foi interrogada pela polícia, pelo procurador, pelo pároco e por médicos, e nunca mudou uma vírgula do que dizia nem aceitou um tostão por isso.",
      "Em 25 de março daquele ano, a Senhora disse enfim o nome, no dialeto da região: Que soy era Immaculada Councepciou — eu sou a Imaculada Conceição. Bernadette repetiu a frase pelo caminho inteiro até ao presbitério para não a esquecer, porque não a entendia. O dogma havia sido definido por Pio IX quatro anos antes, em 1854, e a menina não tinha instrução para o saber.",
      "A fonte que ela escavou com as mãos, na nona aparição, corre até hoje. Desde 1883 funciona em Lourdes um Bureau des Constatations Médicales, aberto a médicos de qualquer crença, que examina as curas alegadas; de milhares de casos, a Igreja reconheceu setenta como milagres, depois de um processo longo e deliberadamente desconfiado. A sobriedade desse processo é, ela própria, parte do testemunho.",
      "Pio X estendeu a festa à Igreja inteira em 1907. Desde 1992, por decisão de João Paulo II, 11 de fevereiro é o Dia Mundial do Doente. Bernadette entrou para as Irmãs da Caridade de Nevers, viveu escondida, morreu aos trinta e cinco anos e foi canonizada em 1933 — não pelas aparições, mas pela maneira como viveu depois delas.",
      "Para quem se prepara pelo método de Montfort, Lourdes diz uma coisa incómoda e boa: a graça não procura os capazes. Ele repete isso no Tratado — a devoção que propõe não exige talento nem instrução, exige entrega. Consagrar-se em 11 de fevereiro é escolher uma data em que o argumento está provado por uma menina analfabeta. Contando para trás, a preparação começa em 9 ou 10 de janeiro, logo depois das festas.",
    ],
    fontes: [
      {
        titulo: "Sanctuaire Notre-Dame de Lourdes — Sainte Bernadette",
        url: "https://www.lourdes-france.org/sainte-bernadette/",
      },
      PIO_IX,
    ],
  },

  anunciacao: {
    sobre:
      "Nove meses antes do Natal, a Igreja celebra o momento em que o Verbo se fez carne no seio de Maria. Montfort volta sempre a este mistério: a Encarnação é o modelo de toda consagração, porque nele Deus quis depender de um sim humano.",
    historia: [
      "O relato está em Lucas 1, e é curto. O anjo saúda, anuncia, e espera. Maria pergunta como será, ouve a resposta e diz: eis a serva do Senhor, faça-se em mim segundo a tua palavra. Entre a pergunta e o sim há um silêncio que a tradição cristã nunca deixou de contemplar, porque nele está a liberdade de uma criatura diante de Deus, e Deus a respeitar.",
      "A data é de aritmética simples: 25 de março é exactamente nove meses antes de 25 de dezembro. A festa está atestada no Oriente desde o século VI e em Roma desde o século VII. Durante séculos, em boa parte da Europa, 25 de março foi também o primeiro dia do ano civil — o ano começava na Encarnação, e não no Natal nem em janeiro.",
      "Paulo VI classificou-a com precisão: é festa conjunta de Cristo e da Virgem, do Verbo que se faz filho de Maria e da Virgem que se torna Mãe de Deus. Por isso é solenidade do Senhor e, ao mesmo tempo, uma das maiores datas marianas do ano. Quando 25 de março cai na Semana Santa ou na oitava da Páscoa, a solenidade é transferida para depois — a Páscoa não cede lugar a nada.",
      "Para o método de Montfort esta é, provavelmente, a data mais coerente de todas. O Tratado volta à Encarnação a cada passo: ele argumenta que, se Deus quis vir ao mundo por Maria, não é estranho que se vá a Deus pelo mesmo caminho; e descreve a consagração como uma renovação do sim do batismo, feita à maneira do sim de Nazaré. Consagrar-se em 25 de março é dizer o fiat no dia do fiat.",
      "Há um detalhe prático bom: contando trinta e três dias para trás, a preparação começa em 20 ou 21 de fevereiro, o que faz com que ela corra quase inteira dentro da Quaresma. Quem procura uma preparação austera, sem concorrência de festa nenhuma, dificilmente encontra melhor encaixe no ano.",
    ],
    fontes: [MARIALIS_CULTUS],
  },

  "nossa-senhora-do-desterro": {
    sobre:
      "O título vem de Mateus 2: avisado em sonho, José toma o Menino e a Mãe e foge para o Egito, longe de Herodes. Desterro é sair da própria terra. É a devoção de quem vive longe de casa, de quem precisou partir, e de quem se sente estrangeiro onde está.",
    historia: [
      "A Arquidiocese de Florianópolis, que é a casa desta devoção no Brasil, explica o nome sem rodeios: desterro significa sair da própria terra, e refere-se ao episódio em que Maria, avisada por um anjo, deixa Belém e parte para o Egito, onde a Sagrada Família terá permanecido cerca de quatro anos. É um título que não celebra um triunfo nem uma aparição: celebra uma fuga noturna com uma criança ao colo.",
      "A devoção é portuguesa de origem e chegou ao Brasil com a colonização. A ilha de Santa Catarina foi povoada sob esse nome: a vila fundada em 1726 chamava-se Nossa Senhora do Desterro, e assim se chamou a cidade até 1894, quando foi rebatizada Florianópolis. A catedral metropolitana ainda é a Catedral de Nossa Senhora do Desterro, e a padroeira é celebrada com missa solene em 17 de fevereiro.",
      "Essa data merece uma palavra, porque a informação circula errada. Vários sites repetem 2 de abril, sem apontar fonte. Quem celebra a festa é a arquidiocese, e é o calendário dela que vale: as notícias da própria Arquidiocese de Florianópolis registam a missa da padroeira em 17 de fevereiro, e foi essa a data adotada aqui.",
      "O título diz algo que as outras festas marianas quase não dizem. Maria aparece aqui sem glória nenhuma — sem trono, sem coroa, sem milagre. Aparece como mulher pobre a atravessar um deserto com o marido e o filho, fugindo de um poder que manda matar crianças. Para quem reza diante de uma vida deslocada — migração, exílio, mudança forçada, perda de casa ou de país — é um rosto reconhecível, e isso tem valor pastoral próprio.",
      "Na lógica de Montfort, há um encaixe discreto e forte. A consagração entrega a Maria tudo o que se tem, inclusive o que não se escolheu: a terra que se perdeu, a cidade onde não se quis morar, o emprego que obrigou a mudar. Consagrar-se no Desterro é entregar justamente essa parte. Contando para trás, a preparação começa em meados de janeiro.",
    ],
    fontes: [
      {
        titulo:
          "Arquidiocese de Florianópolis — a padroeira celebrada em 17 de fevereiro",
        url: "https://arquifln.org.br/destaque-secundario/padroeira-de-florianopolis-e-da-catedral-e-lembrada-com-missa-solene",
      },
    ],
  },

  "nossa-senhora-da-penha": {
    sobre:
      "Padroeira do Espírito Santo, venerada no alto de um rochedo em Vila Velha desde o século XVI. A festa não cai em dia de calendário: cai na segunda-feira que fecha o oitavário da Páscoa, e por isso anda até um mês de um ano para o outro.",
    historia: [
      "A história começa em 1558, quando o frei franciscano Pedro Palácios chega à Capitania do Espírito Santo trazendo um painel de Nossa Senhora das Alegrias. Ele ergue primeiro, ao pé do morro, a capelinha de São Francisco, concluída em 1562. Entre 1566 e 1570 constrói a ermida no cume do penhasco, e em 1570 recebe de Portugal a imagem que encomendara. Nesse mesmo ano celebra-se pela primeira vez a Festa da Penha. Conta o santuário que o frei morreu na capelinha no dia seguinte aos festejos de 1570. O convento propriamente dito só foi aprovado em 1650.",
      "A data é móvel, e isto precisa de ser dito com clareza porque quase tudo neste calendário é fixo. O dia da padroeira cai na segunda-feira oito dias depois do Domingo de Páscoa — a segunda-feira seguinte ao Domingo da Oitava. Em 2025 foi 28 de abril; em 2026, 13 de abril. Antes dela corre o Oitavário, oito dias de celebrações que começam no próprio Domingo de Páscoa. O sistema calcula a data a partir da Páscoa de cada ano, de modo que ela está sempre certa.",
      "É a terceira maior festa mariana do Brasil, e tem uma forma própria. Sobe-se o morro a pé, muita gente descalça, por uma ladeira de pedra. Há a Romaria dos Homens, a Romaria das Mulheres, a romaria dos ciclistas, a Remaria pelo mar e os Conguistas com seus tambores — uma devoção de corpo inteiro, de promessa cumprida com as pernas.",
      "O nome Penha vem de penha, penhasco: a Senhora do alto da rocha. É um título ibérico antigo, de Portugal e Espanha, que no Brasil ganhou santuários em vários estados — o do Rio de Janeiro, na Penha Circular, é o outro grande. Mas o capixaba é o mais antigo, e é dele que vem esta data.",
      "Para quem se consagra, a subida é a imagem inteira da preparação: trinta e três dias são uma ladeira, não um salto. E há um ganho litúrgico que poucas datas oferecem — contando para trás, a preparação começa por volta do início da Quaresma e termina já dentro do tempo pascal. Começa-se em cinzas e chega-se em aleluia.",
    ],
    fontes: [
      {
        titulo: "Convento da Penha — a história do santuário",
        url: "https://conventodapenha.org.br/conheca-a-historia-do-convento-da-penha/",
      },
      {
        titulo: "Convento da Penha — Frei Pedro Palácios",
        url: "https://conventodapenha.org.br/frei-pedro-palacios/",
      },
    ],
  },

  "nossa-senhora-do-bom-conselho": {
    sobre:
      "Invoca-se Nossa Senhora como aquela que obtém do Espírito Santo o dom do conselho. É a data de quem chega à consagração no meio de uma decisão que ainda não sabe tomar.",
    historia: [
      "A devoção está ligada a Genazzano, uma cidade pequena a leste de Roma, e ao santuário que os agostinianos ali mantêm. A tradição local conta que em 25 de abril de 1467, enquanto a igreja de Santa Maria estava em obras e sem dinheiro para as terminar, apareceu num muro um fresco delgadíssimo com a imagem da Mãe e do Menino, que teria vindo pelo ar desde Escutári, na Albânia, fugindo do avanço turco. O fresco está lá, sobre uma camada de reboco de poucos milímetros, e é um dos objetos de devoção mais visitados do Lácio.",
      "O que a Igreja celebra, porém, não é o prodígio: é o título. Mater boni consilii — Mãe do bom conselho — nomeia Maria como aquela que alcança para quem pede o quarto dos dons do Espírito Santo, o conselho, que é a capacidade de discernir o que fazer quando a regra geral não basta. Leão XIII, que tinha devoção particular ao santuário, mandou acrescentar essa invocação às Ladainhas de Loreto em 1903, e é por isso que ela se reza hoje no mundo inteiro.",
      "Quem reza a Ladainha de Nossa Senhora durante a primeira semana desta preparação diz essa invocação em voz alta sem sempre reparar: Mãe do bom conselho, rogai por nós. É a única festa deste calendário cujo título a pessoa já vai repetir todos os dias, por prescrição do próprio Montfort.",
      "A escolha desta data costuma ter um motivo concreto por trás. Vem bem a quem está diante de uma decisão que não se resolve com vontade: um casamento, uma vocação, uma mudança de cidade, um tratamento, um negócio que pode arruinar a casa. Montfort insiste que a consagração não substitui o juízo nem dispensa o conselho humano — mas pede que se deixe de decidir sozinho, e esta data diz isso pelo nome.",
      "No calendário, 26 de abril cai quase sempre dentro do tempo pascal. Contando trinta e três dias para trás, a preparação começa em 24 ou 25 de março, perto da Anunciação, e atravessa a Semana Santa e a Páscoa. É um percurso exigente e bonito: entra-se na Paixão e sai-se na Ressurreição.",
    ],
    fontes: [MARIALIS_CULTUS],
  },

  "nossa-senhora-de-fatima": {
    sobre:
      "Entre maio e outubro de 1917, Nossa Senhora apareceu seis vezes na Cova da Iria a Lúcia, Francisco e Jacinta. Pediu o Rosário diário, penitência pelos pecadores, e prometeu que, no fim, o seu Imaculado Coração triunfaria.",
    historia: [
      "Eram três pastores pequenos: Lúcia dos Santos, com dez anos, e os primos Francisco e Jacinta Marto, com nove e sete. Apareceram-lhes seis vezes, sempre no dia 13, de maio a outubro de 1917, numa depressão de terreno chamada Cova da Iria, em Fátima. No ano anterior, segundo o relato de Lúcia, um Anjo tinha-os preparado em três visitas. As aparições aconteceram no auge da Primeira Guerra Mundial e num Portugal de governo anticlerical — o administrador do concelho chegou a prender as crianças e a ameaçá-las de morte para que negassem, e elas não negaram.",
      "O pedido foi simples e repetido: rezar o terço todos os dias pela paz, fazer penitência pelos pecadores, emendar a vida. Em 13 de outubro, diante de uma multidão calculada em dezenas de milhares, deu-se o fenómeno solar que a imprensa da época, inclusive a laica e hostil, descreveu em detalhe. Em 13 de outubro de 1930 o bispo de Leiria declarou dignas de crédito as visões e autorizou oficialmente o culto.",
      "Francisco e Jacinta morreram crianças, na pandemia de gripe de 1918-1920, e foram canonizados por Francisco em 13 de maio de 2017, no centenário da primeira aparição. Lúcia entrou para o Carmelo de Coimbra, escreveu as Memórias de que vem quase tudo o que se sabe, e morreu em 2005, com noventa e sete anos.",
      "A memória litúrgica de Nossa Senhora de Fátima foi inscrita no calendário romano geral em 2002, na terceira edição típica do Missal. Em Portugal e no Brasil ela é celebrada com grau mais alto, e no Brasil a devoção é enorme: há paróquias de Fátima em praticamente todas as dioceses.",
      "Para quem se prepara segundo Montfort, Fátima é a data de encaixe mais evidente de todas. O terço diário que Nossa Senhora pediu na Cova da Iria é exactamente o que o Tratado prescreve para a segunda semana da preparação, e a linguagem de consagração ao Imaculado Coração é prima da linguagem de Montfort, escrita duzentos anos antes. Contando para trás, a preparação começa em 10 de abril e corre quase inteira no tempo pascal.",
    ],
    fontes: [
      {
        titulo: "Santuário de Fátima — site oficial",
        url: "https://www.fatima.pt/pt",
      },
    ],
  },

  "nossa-senhora-auxiliadora": {
    sobre:
      "Título antigo, ligado à proteção da Igreja em horas difíceis, e difundido no mundo inteiro por Dom Bosco, que lhe construiu uma basílica em Turim. É a devoção da confiança em meio à luta.",
    historia: [
      "Auxilium Christianorum — socorro dos cristãos — é uma invocação que já constava das Ladainhas de Loreto muito antes de ter festa própria. A tradição liga a sua difusão à vitória de Lepanto, em 1571, e a São Pio V, embora a expressão seja mais antiga do que isso e apareça em orações a Maria desde os primeiros séculos.",
      "A data tem causa histórica precisa. Em 24 de maio de 1814, Pio VII entrou solenemente em Roma depois de cinco anos de cativeiro imposto por Napoleão. Atribuindo a libertação à intercessão de Nossa Senhora, instituiu em acção de graças a festa de Maria Auxiliadora para esse dia. As fontes divergem sobre o ano exacto do decreto — umas dão 1815, outras 1816 —, e isso é um exemplo útil de como a memória devocional se consolida antes dos papéis. A data em si, 24 de maio, nunca esteve em discussão.",
      "Quem fez o título correr o mundo foi João Bosco. O padre de Turim que recolhia meninos de rua escolheu Maria Auxiliadora como padroeira da sua obra, construiu-lhe a basílica no bairro de Valdocco, consagrada em 1868, e dizia que a casa inteira se sustentava por ela. Daí a devoção passou aos salesianos, e com os salesianos chegou a toda a América Latina. No Brasil, Maria Auxiliadora dá nome a colégios, paróquias e santuários em quase todos os estados.",
      "O título diz uma coisa sóbria. Não promete ausência de dificuldade: promete socorro dentro dela. É uma devoção de tempo de guerra — guerra de um país, de uma Igreja perseguida, ou de uma casa que não está a dar conta. Dom Bosco punha-a diante de rapazes sem família nem eira, e não lhes prometia uma vida fácil.",
      "Para quem se consagra, encaixa bem com uma parte do Tratado que costuma ser lida depressa: Montfort não apresenta a consagração como um atalho, apresenta-a como uma aliança para o combate. Ele fala em inimigo, em cadeias, em escravidão de amor — vocabulário de luta. Escolher 24 de maio é começar a preparação por volta de 21 de abril, já no tempo pascal, e chegar ao dia da entrega perto de Pentecostes.",
    ],
    fontes: [MARIALIS_CULTUS],
  },

  visitacao: {
    sobre:
      "Grávida, Maria parte às pressas pela montanha para ajudar a prima Isabel. É a primeira vez que leva Jesus a alguém, e é ali que entoa o Magnificat. Festa de quem entende a consagração como serviço.",
    historia: [
      "Lucas conta que, logo depois da Anunciação, Maria levantou-se e foi apressadamente à região montanhosa, a uma cidade de Judá. A pressa é o detalhe que a tradição mais comenta: acabara de receber a notícia maior da história humana e a primeira coisa que faz é ir cuidar de uma parente idosa e grávida. Ao chegar, é Isabel quem a proclama bendita entre as mulheres, e é em resposta a essa saudação que Maria canta o Magnificat — o cântico que a Igreja reza todas as tardes, há mil e quinhentos anos, nas vésperas.",
      "A festa é de origem franciscana: foi instituída no capítulo geral da ordem em 1263, por impulso de São Boaventura. Urbano VI estendeu-a à Igreja inteira em 1389, com uma intenção muito concreta — pedir o fim do Cisma do Ocidente, que então dividia a cristandade entre dois papas. A data era 2 de julho, depois da oitava do nascimento de João Batista.",
      "A reforma de 1969 mudou-a para 31 de maio, e por um motivo que vale conhecer: assim ela passou a ficar entre a Anunciação, em 25 de março, e o nascimento de João Batista, em 24 de junho, que é a ordem em que os acontecimentos se dão no Evangelho. O calendário passou a contar a história na sequência certa. Paulo VI aprovou a mudança e classificou a data como uma das festas em que se recorda a Virgem associada ao mistério do Filho.",
      "O Magnificat é uma das orações desta preparação — está na biblioteca deste site e Montfort manda rezá-lo, sobretudo na segunda semana. Consagrar-se em 31 de maio é escolher a data em que esse cântico foi dito pela primeira vez.",
      "O conteúdo da festa é incómodo no melhor sentido. O Magnificat não é um poema terno: fala em derrubar poderosos dos seus tronos e mandar os ricos embora de mãos vazias. Quem se consagra nesta data assume essa letra. Contando para trás, a preparação começa em 28 de abril, dentro do tempo pascal, e termina com o dia da consagração junto a Pentecostes.",
    ],
    fontes: [MARIALIS_CULTUS],
  },

  "nossa-senhora-do-perpetuo-socorro": {
    sobre:
      "Um ícone bizantino em que o Menino, vendo os instrumentos da Paixão nas mãos de dois anjos, se volta assustado para a Mãe e lhe agarra a mão com tanta força que a sandália se solta do pé. É a devoção do socorro que não se cansa.",
    historia: [
      "O ícone é de escola cretense, datado entre os séculos XIV e XV, do tipo que o Oriente chama Virgem da Paixão. Cada elemento é catequese: Miguel e Gabriel apresentam a cruz, a lança e a esponja; o Menino olha para elas e procura a mão da Mãe; a sandália pendurada é o gesto de uma criança que correu. E Maria não olha para o Filho — olha para fora, para quem reza diante dela.",
      "Chegou a Roma por volta de 1499 e foi venerado durante quase três séculos na igreja de São Mateus, na via Merulana. Com a destruição da igreja pelas tropas francesas, em 1798, o ícone desapareceu da vista pública e ficou esquecido num oratório de frades. Foi reencontrado quando os redentoristas compraram, sem saber, justamente o terreno onde estivera São Mateus.",
      "Em 11 de dezembro de 1865, a pedido do padre Nicolau Mauron, superior-geral dos redentoristas, Pio IX entregou-lhes o ícone com a recomendação que se tornou lema da congregação: fazei-a conhecida no mundo inteiro. O ícone foi solenemente entronizado na igreja de Santo Afonso, no Esquilino, em 26 de abril de 1866, e o mesmo Pio IX instituiu a festa litúrgica em 1867, para 27 de junho.",
      "A recomendação foi cumprida à risca. No Brasil, a devoção ao Perpétuo Socorro é uma das maiores do país, com a novena perpétua rezada toda semana em centenas de igrejas redentoristas — e o Santuário Nacional de Aparecida, aliás, é confiado à mesma congregação. É devoção de gente comum, com bilhetinho de pedido e de agradecimento lido em voz alta.",
      "Para quem se consagra, o ícone é quase um resumo do Tratado em imagem. Montfort propõe que se vá a Jesus pelas mãos de Maria, e aqui é o próprio Jesus menino que, diante do que o espera, busca a mão dela. Contando trinta e três dias para trás, a preparação começa em 25 de maio e corre pelo tempo comum, sem festa grande a atravessá-la — para muita gente, é a condição ideal.",
    ],
    fontes: [
      {
        titulo:
          "Redentoristas (A12) — o ícone do Perpétuo Socorro entregue por Pio IX",
        url: "https://www.a12.com/redentoristas/noticias/icone-do-perpetuo-socorro-entregue-aos-redentoristas",
      },
    ],
  },

  "nossa-senhora-do-carmo": {
    sobre:
      "Nascida da tradição dos eremitas do Monte Carmelo, é a festa do escapulário e da devoção silenciosa. Fala a quem deseja uma vida interior constante mais do que grandes gestos.",
    historia: [
      "O Monte Carmelo, na costa da atual Israel, é o monte de Elias — foi ali que o profeta enfrentou os sacerdotes de Baal e ali que, segundo o Livro dos Reis, viu subir do mar a pequena nuvem que a tradição cristã leu depois como figura de Maria. No fim do século XII instalaram-se naquelas grutas eremitas latinos, que se organizaram em ordem sob a Regra de Santo Alberto e tomaram como padroeira a Senhora do lugar. É por isso que os carmelitas não têm fundador no sentido comum: têm um monte.",
      "A tradição do escapulário liga-se a São Simão Stock, superior-geral da ordem, e à data de 16 de julho de 1251, em que teria recebido de Nossa Senhora o hábito reduzido com a promessa de proteção a quem o usasse. A Igreja nunca definiu a historicidade do episódio, e os próprios carmelitas o explicam hoje pelo que ele significa: o escapulário não é amuleto, é o sinal de que alguém se afiliou a uma família espiritual e aceitou a sua disciplina de oração.",
      "A festa espalhou-se a partir da ordem e tornou-se universal em 1726, com Bento XIII. Paulo VI incluiu-a entre as memórias marianas do calendário reformado. Do Carmelo saíram, depois, três doutores da Igreja — Teresa de Ávila, João da Cruz e Teresa de Lisieux —, o que faz desta uma data ligada menos a aparições do que a escolas de oração.",
      "No Brasil a devoção é antiga e popular, com o nome em cidades, bairros e paróquias de norte a sul, e com a Festa do Carmo celebrada com procissão em muitas delas.",
      "O encaixe com Montfort é direto e pouco citado. Ao tratar das práticas exteriores, no § 236 do Tratado, ele menciona o escapulário entre os sinais que o devoto pode assumir — ao lado das cadeiazinhas — e diz o mesmo que os carmelitas dizem: o sinal vale pelo que compromete, não por si. Consagrar-se em 16 de julho é escolher uma data que trata de constância, e a preparação, começando em 13 de junho, corre inteira no tempo comum.",
    ],
    fontes: [MARIALIS_CULTUS],
  },

  "nossa-senhora-das-neves": {
    sobre:
      "A Igreja celebra neste dia a dedicação da Basílica de Santa Maria Maior, em Roma, a mais antiga igreja do Ocidente dedicada a Nossa Senhora. O nome popular vem de uma neve de agosto que a tradição conta, e que é lenda tardia.",
    historia: [
      "Convém separar as duas coisas, porque elas costumam vir misturadas. O que o calendário litúrgico celebra em 5 de agosto é a dedicação da Basílica de Santa Maria Maior — Paulo VI nomeia-a assim, pelo seu nome próprio, na lista das memórias marianas. A basílica foi erguida no Esquilino pelo papa Sisto III, entre 432 e 440, logo depois do Concílio de Éfeso, e é um monumento construído precisamente para proclamar em pedra e mosaico o título de Theotókos que o concílio acabara de definir.",
      "A lenda da neve é muito posterior — aparece documentada a partir do século XIII. Conta que um patrício romano sem filhos e a mulher pediram a Nossa Senhora que lhes indicasse como empregar os bens, e que, na noite de 4 para 5 de agosto, caiu neve no alto do Esquilino, marcando no chão a planta da igreja a construir. A Igreja nunca a tomou por facto histórico, e o nome Santa Maria da Neve é popular, não litúrgico. Dizer isto não diminui a festa: a basílica existe, os mosaicos do século V estão lá, e a memória tem mil e seiscentos anos.",
      "Santa Maria Maior guarda também, desde o século VII, a relíquia venerada como do presépio, e é uma das quatro basílicas papais de Roma. Nos últimos pontificados tornou-se a igreja a que os papas vão rezar antes e depois de cada viagem, diante do ícone da Salus Populi Romani.",
      "No Brasil, Nossa Senhora das Neves é padroeira de João Pessoa — a cidade foi fundada em 1585 com o nome de Nossa Senhora das Neves — e de dezenas de paróquias pelo país.",
      "Para quem se consagra, esta é uma data de temperamento diferente das outras. Não há aparição, não há mensagem, não há segredo: há uma igreja antiga e uma definição de fé esculpida nela. Quem desconfia do que é extraordinário e quer uma devoção ancorada no que a Igreja definiu, e não no que se contou, encontra aqui a sua data. A preparação começa em 3 de julho.",
    ],
    fontes: [MARIALIS_CULTUS],
  },

  assuncao: {
    sobre:
      "Elevada em corpo e alma à glória do céu. Dogma proclamado em 1950, mas crença antiquíssima da Igreja. Celebra o destino que a consagração antecipa: pertencer inteiramente a Deus, corpo e alma.",
    historia: [
      "A festa é muito anterior ao dogma. Em Jerusalém celebrava-se já no século V uma Memória de Maria em 15 de agosto; no Oriente a data chama-se Dormição, e em Roma entrou no século VII, por Sérgio I, como uma das quatro grandes festas marianas com procissão. Ou seja: a Igreja celebrou a Assunção durante mil e quinhentos anos antes de a definir.",
      "A definição veio em 1 de novembro de 1950, com a constituição apostólica Munificentissimus Deus, de Pio XII, precedida de uma consulta a todo o episcopado do mundo. A fórmula é cuidadosa: a Imaculada Mãe de Deus, terminado o curso da vida terrena, foi assunta em corpo e alma à glória celeste. Repare no que a frase não decide — se Maria morreu antes de ser assunta. A Igreja deixou a questão em aberto de propósito, e quem afirma uma coisa ou outra está a dizer opinião teológica, não dogma.",
      "O conteúdo da festa é mais amplo do que parece. O que se celebra não é um privilégio isolado, é a primeira realização completa daquilo que foi prometido a todos: a ressurreição da carne, que se reza no Credo. Maria é o que a Igreja inteira há de ser. Por isso Paulo VI a chama a solenidade da sorte bem-aventurada e a imagem do que a Igreja espera.",
      "Em grande parte do mundo católico é dia de preceito, e em muitos países é feriado civil. No Brasil não é feriado nacional, mas é festa de padroeira em inúmeras cidades e, em várias delas, feriado municipal.",
      "Para quem se prepara pelo método de Montfort, esta é a maior das solenidades marianas e, por isso, uma das datas mais procuradas. Há ainda um detalhe que agrada a quem gosta de simetria: consagrando-se em 15 de agosto, a pessoa chega ao oitavo dia seguinte, 22 de agosto, já consagrada, na memória de Nossa Senhora Rainha — a festa que é o prolongamento desta. A preparação começa em 13 de julho.",
    ],
    fontes: [
      {
        titulo:
          "Pio XII, constituição apostólica Munificentissimus Deus (1950)",
        url: "https://www.vatican.va/content/pius-xii/pt/apost_constitutions/documents/hf_p-xii_apc_19501101_munificentissimus-deus.html",
      },
      MARIALIS_CULTUS,
    ],
  },

  "nossa-senhora-rainha": {
    sobre:
      "Oito dias depois da Assunção, a coroação. A data está colocada no oitavo dia para mostrar que uma festa nasce da outra: quem foi elevada ao céu reina ali como mãe e intercessora, não como soberana distante.",
    historia: [
      "A realeza de Maria é antiga na oração cristã — a Salve Rainha é do século XI, e os títulos régios enchem as Ladainhas de Loreto —, mas a festa é recente. Foi instituída por Pio XII com a encíclica Ad Caeli Reginam, de 11 de outubro de 1954, ao encerrar o Ano Mariano do centenário do dogma da Imaculada. A data inicial era 31 de maio.",
      "A reforma do calendário, em 1969, moveu-a para 22 de agosto, e o motivo é teológico, não de arrumação. Paulo VI explica-o: a memória passou para o oitavo dia depois da Assunção para que as duas datas fiquem ligadas e se veja que uma é consequência da outra. Maria não é rainha por nomeação: é rainha porque foi associada ao Filho e levada à glória dele. Tirar a festa de maio e pô-la na oitava da Assunção foi uma forma de impedir que a coroa se lesse como enfeite.",
      "Ad Caeli Reginam é também cuidadosa quanto ao sentido do título. A realeza de Maria é de ordem inteiramente diferente da de Cristo: ele é rei por natureza e por conquista; ela, por graça e por associação. É um reinado de intercessão, não de poder próprio.",
      "Para quem se prepara pelo método de São Luís Maria, esta é talvez a data que mais combina com o vocabulário do Tratado. Montfort chama à consagração uma escravidão de amor, fala em cadeias, em vassalagem, em pertencer. É linguagem de corte e de súbdito — chocante para o ouvido moderno, e ele sabia disso. A chave está aqui: trata-se de uma rainha que reina para interceder. Quem se entrega não se entrega a um poder, entrega-se a uma advogada.",
      "Na prática, consagrar-se em 22 de agosto significa começar a preparação em 20 de julho e atravessar agosto inteiro, incluindo a solenidade da Assunção no dia 15 — a festa maior cai dentro da preparação, a uma semana do fim, e isso costuma dar um último impulso bem-vindo.",
    ],
    fontes: [
      {
        titulo: "Pio XII, encíclica Ad Caeli Reginam (1954)",
        url: "https://www.vatican.va/content/pius-xii/pt/encyclicals/documents/hf_p-xii_enc_11101954_ad-caeli-reginam.html",
      },
      MARIALIS_CULTUS,
    ],
  },

  "natividade-de-maria": {
    sobre:
      "Nove meses depois da Imaculada Conceição, a Igreja celebra o nascimento de Maria. É uma das três datas de nascimento festejadas na liturgia, ao lado das de Jesus e de João Batista.",
    historia: [
      "A liturgia celebra o nascimento de três pessoas, e só três: Jesus, em 25 de dezembro; João Batista, em 24 de junho; e Maria, em 8 de setembro. Dos santos, a Igreja guarda o dia da morte, que é o do nascimento para o céu. Estas três excepções dizem uma coisa sobre o lugar de Maria na economia da salvação — ela está do lado de quem prepara a vinda, não do lado de quem a recebe depois.",
      "A festa nasceu em Jerusalém, entre os séculos V e VI, ligada à dedicação da basílica construída sobre o lugar que a tradição apontava como a casa de Joaquim e Ana, junto à piscina probática. De Jerusalém passou a Constantinopla e, no século VII, a Roma, onde Sérgio I a incluiu entre as quatro festas marianas celebradas com procissão solene.",
      "A data tem lógica de calendário: 8 de setembro é exactamente nove meses depois de 8 de dezembro, a Imaculada Conceição. A ordem histórica é a inversa — a festa da Natividade é muito mais antiga, e foi a partir dela que se fixou, séculos depois, a data da Conceição. O calendário litúrgico construiu-se assim, por encaixes sucessivos, e não por um plano feito de uma vez.",
      "Do nome dos pais de Maria, Joaquim e Ana, nada se sabe pelos Evangelhos: vêm do Protoevangelho de Tiago, escrito apócrifo do século II. A Igreja nunca lhes atribuiu valor histórico garantido, e no entanto manteve a memória, porque o que ela diz — que Maria teve pai, mãe e infância — é parte de levar a sério a Encarnação.",
      "Para quem se consagra, esta é a data dos começos pequenos. Celebra-se o nascimento de uma menina de quem ninguém, naquele dia, esperava nada; o resto veio depois, e veio por graça. É uma boa data para quem chega à preparação sem fervor nenhum, só com a decisão de começar — que é exactamente o que Montfort pede nos primeiros dias. Contando para trás, a preparação começa em 6 de agosto.",
    ],
    fontes: [MARIALIS_CULTUS],
  },

  "nossa-senhora-das-dores": {
    sobre:
      "No dia seguinte à Exaltação da Santa Cruz, contemplam-se as dores de Maria. É uma festa densa e consoladora para quem chega à consagração carregando um sofrimento.",
    historia: [
      "A colocação no calendário é deliberada e vale mais do que muitos comentários: 14 de setembro é a Exaltação da Santa Cruz, e 15 de setembro é Nossa Senhora das Dores. Primeiro a cruz, no dia seguinte quem estava ao pé dela. O Evangelho de João diz quatro palavras sobre isso — stabat iuxta crucem, estava de pé junto à cruz — e a liturgia construiu uma festa inteira sobre esse verbo. Ela não desmaia, não foge e não é retirada: fica de pé.",
      "A devoção às dores de Maria organizou-se no século XIII em torno dos Servos de Maria, os servitas, que a difundiram com a enumeração das sete dores: a profecia de Simeão, a fuga para o Egito, a perda do Menino no Templo, o encontro no caminho do Calvário, a crucifixão, a descida da cruz e o sepultamento. Do mesmo ambiente vem o Stabat Mater, sequência do século XIII que ainda se canta.",
      "Durante séculos houve duas celebrações — uma na Sexta-feira da Semana de Paixão e outra em setembro. Pio VII estendeu a de setembro à Igreja universal em 1814, no mesmo contexto do regresso do cativeiro napoleónico. A reforma de 1969 conservou apenas a de 15 de setembro, e Paulo VI inclui-a entre as festas em que Maria aparece estreitamente associada ao Filho.",
      "No Brasil, Nossa Senhora das Dores é padroeira de centenas de paróquias e de cidades inteiras, e a devoção tem forte presença na religiosidade popular do Nordeste e de Minas, com procissões do Encontro na Semana Santa.",
      "Montfort é explícito quanto a isto: a consagração não é um seguro contra o sofrimento. Ele avisa que quem se entrega a Maria recebe dela, muitas vezes, uma parte da cruz do Filho — e promete apenas que não a carregará sozinho. Quem chega à preparação com uma doença, um luto ou uma casa desfeita costuma reconhecer-se nesta data mais do que nas festas gloriosas. A preparação começa em 13 de agosto.",
    ],
    fontes: [MARIALIS_CULTUS],
  },

  "nossa-senhora-de-la-salette": {
    sobre:
      "Em 1846, numa montanha dos Alpes franceses, dois pastorinhos encontraram uma Senhora sentada e a chorar. É a única aparição mariana reconhecida em que o traço central é o pranto, e a devoção que dela nasce é de penitência e reconciliação.",
    historia: [
      "Em 19 de setembro de 1846, Maximin Giraud, de onze anos, e Mélanie Calvat, de catorze, guardavam vacas num alto da comuna de La Salette-Fallavaux, na diocese de Grenoble. Nenhum dos dois frequentava a igreja; eram empregados temporários, mal alfabetizados, que nem se conheciam bem. Viram uma luz e, dentro dela, uma mulher sentada com o rosto entre as mãos, a chorar. Ela levantou-se, falou-lhes primeiro em francês e depois no patoá da região para que entendessem, e desapareceu.",
      "A mensagem é dura e muito concreta. Ela queixa-se de duas coisas: do trabalho ao domingo e do uso do nome de seu Filho como palavrão. São repreensões quase domésticas, e é isso que lhes dá peso — não há aqui profecia grandiosa, há uma mãe a falar do dia a dia de uma aldeia. Anuncia também fome e perda de colheitas se nada mudar, e pede que a mensagem passe a todo o seu povo.",
      "O exame durou cinco anos, com interrogatórios separados das duas crianças, que nunca se contradisseram. Em 19 de setembro de 1851, por mandamento, o bispo de Grenoble, Philibert de Bruillard, declarou a aparição autêntica. No ano seguinte foram fundados os Missionários de Nossa Senhora de La Salette, hoje presentes em muitos países, e começou a construção da basílica a mil e oitocentos metros de altitude.",
      "No Brasil os saletinos estão sobretudo no Sul e em São Paulo, e a devoção é conhecida pelo título de Reconciliadora dos pecadores, que resume a mensagem melhor do que o relato das lágrimas.",
      "Para quem se prepara segundo Montfort, há uma correspondência exacta. A primeira semana da preparação é dedicada ao conhecimento de si mesmo e à contrição — a semana desconfortável, em que se olha para dentro sem desculpa. La Salette é a festa dessa semana feita data. Consagrar-se em 19 de setembro significa começar em 17 de agosto, com a preparação inteira no tempo comum.",
    ],
    fontes: [
      {
        titulo: "Sanctuaire Notre-Dame de La Salette — site oficial",
        url: "https://www.lasalette.cef.fr/",
      },
    ],
  },

  "nossa-senhora-do-rosario": {
    sobre:
      "A oração que percorre a vida de Cristo pelos olhos de sua Mãe. Montfort foi um grande pregador do Rosário e recomenda-o como alimento diário de quem se consagra — escolher esta data é comprometer-se, desde o princípio, com essa oração.",
    historia: [
      "A festa tem data de nascimento e um campo de batalha. Em 7 de outubro de 1571, a frota da Liga Santa venceu em Lepanto a armada otomana; São Pio V, que mandara rezar o rosário pela vitória, instituiu nesse dia a festa de Santa Maria da Vitória. Gregório XIII mudou-lhe o nome em 1573 para Festa do Santíssimo Rosário, e Clemente XI estendeu-a à Igreja universal em 1716. A origem militar é um facto histórico, e esconde-la seria desonesto; o que a Igreja conservou da data, porém, não foi a batalha — foi a oração.",
      "O rosário como forma fixou-se entre os séculos XII e XV, a partir do costume monástico de substituir os cento e cinquenta salmos por cento e cinquenta ave-marias para quem não sabia ler. Daí vem o número das contas. A pregação dominicana organizou-o em mistérios, e a estrutura chegou praticamente inalterada até 2002, quando João Paulo II propôs os mistérios luminosos na carta Rosarium Virginis Mariae, chamando-lhe compêndio do Evangelho e oração contemplativa por excelência.",
      "Paulo VI já dedicara ao rosário uma boa parte da Marialis Cultus, e com um alerta que continua útil: a repetição não é mantra nem conta a cumprir; é a batida que sustenta a contemplação, como o compasso sustenta uma música. Quando a repetição deixa de servir à contemplação, perdeu-se o rosário e ficou o barulho.",
      "No Brasil, a devoção tem uma história própria e significativa: as Irmandades de Nossa Senhora do Rosário dos Homens Pretos, organizadas desde o período colonial por africanos escravizados e seus descendentes, foram espaços de culto, de auxílio mútuo e de alforria, e os congados e reinados que delas descendem continuam vivos em Minas Gerais, Goiás e São Paulo.",
      "Para esta preparação a ligação é prescrita, não sugerida: no § 229 do Tratado, Montfort manda rezar o rosário, ou pelo menos um terço, todos os dias da segunda semana. Quem se consagra em 7 de outubro começa em 4 de setembro.",
    ],
    fontes: [ROSARIUM, MARIALIS_CULTUS],
  },

  "nossa-senhora-aparecida": {
    sobre:
      "Em 1717, três pescadores tiraram do rio Paraíba do Sul uma pequena imagem escurecida, primeiro o corpo, depois a cabeça. Dali nasceu a devoção que se tornou o coração religioso do Brasil.",
    historia: [
      "Os nomes ficaram: Domingos Garcia, João Alves e Filipe Pedroso. Pescavam no Paraíba do Sul, perto de Guaratinguetá, por ordem de uma autoridade de passagem, e não apanhavam nada. Numa das lançadas veio o corpo de uma pequena imagem de barro, sem cabeça; na seguinte, a cabeça. Depois disso, conta o relato, as redes encheram. A imagem, de pouco mais de trinta centímetros, é uma Nossa Senhora da Conceição de terracota, escurecida pelo tempo e pelas águas, provavelmente feita em Taubaté no fim do século XVII.",
      "A devoção cresceu de baixo para cima, em casa de pescador, muito antes de haver capela. A primeira capela é de 1745, e o fluxo de romeiros só aumentou. Em 1904, atendendo a pedido do episcopado brasileiro apresentado por dom Joaquim Arcoverde, Pio X autorizou a coroação solene da imagem, realizada em 8 de setembro daquele ano com a presença do núncio e do presidente da República.",
      "A proclamação como padroeira veio depois do Congresso Mariano de 1929: por decreto de Pio XI, datado de 16 de julho de 1930, Nossa Senhora Aparecida foi declarada principal padroeira do Brasil. A basílica nova, começada em 1955, foi consagrada por João Paulo II em 4 de julho de 1980, durante a sua primeira visita ao país, com a obra ainda inacabada. No mesmo ano, a Lei 6.802 tornou 12 de outubro feriado nacional.",
      "Vale dizer o que a imagem é e o que não é. Não há aparição em Aparecida: há um achado. Nossa Senhora não falou a ninguém, não deixou mensagem nem segredo. O que existe é uma imagem pequena, escura, partida e recomposta, encontrada por três homens pobres que não pescavam nada. O país inteiro se reconheceu nisso, e é essa a força da devoção.",
      "Para quem se consagra, 12 de outubro é a data brasileira por excelência: feriado, portanto fácil de guardar; solenidade em todo o país; e com a vantagem de cair cinco dias depois de Nossa Senhora do Rosário, de modo que a última semana da preparação atravessa as duas. A preparação começa em 9 de setembro.",
    ],
    fontes: [
      {
        titulo: "Santuário Nacional de Aparecida (A12) — história da devoção",
        url: "https://www.a12.com/aparecida",
      },
    ],
  },

  "apresentacao-de-maria": {
    sobre:
      "Memória de raiz oriental que celebra a entrega de Maria a Deus desde a infância. É, em si mesma, uma festa da consagração: uma vida inteira colocada nas mãos do Senhor antes de qualquer mérito.",
    historia: [
      "O episódio não está nos Evangelhos. Vem do Protoevangelho de Tiago, escrito apócrifo do século II, que conta que Joaquim e Ana, tendo recebido a filha depois de longa esterilidade, a levaram ao Templo aos três anos para a consagrar a Deus, e que ela subiu sozinha os degraus sem olhar para trás. Historicamente, nada disso se sustenta — não havia no Templo de Jerusalém instituição que acolhesse meninas desse modo.",
      "A Igreja sabe disto e manteve a festa assim mesmo, e a razão está dita com clareza por Paulo VI: apesar do carácter apócrifo do seu conteúdo, a celebração oferece motivos de reflexão altos e exemplares. Dito de outro modo: a memória não garante o facto, garante o sentido. O que se celebra é que a vida de Maria foi de Deus desde o princípio, antes de ela ter feito o que quer que fosse para o merecer.",
      "A origem litúrgica é mais sólida do que a narrativa. A data liga-se à dedicação, em 543, da basílica de Santa Maria Nova, construída em Jerusalém junto ao Templo. A festa espalhou-se no Oriente, entrou no Ocidente no século XIV pela corte papal de Avinhão, foi suprimida por Pio V e restaurada por Sisto V em 1585.",
      "Desde 1997 a data é também o Dia Pro Orantibus, em que a Igreja reza pelas comunidades de vida contemplativa — os mosteiros de clausura, que vivem exactamente o que a festa narra: uma vida inteira entregue, sem obra visível.",
      "Nenhuma data deste calendário descreve melhor o que Montfort propõe. A consagração do Tratado não é um compromisso para o futuro nem uma promessa de bom comportamento: é a entrega de tudo o que se é e do que se tem, de uma vez, sem reserva — corpo, bens, méritos e o direito de dispor deles. É o que a tradição põe nos pés daquela menina de três anos a subir os degraus. Contando para trás, a preparação começa em 20 de outubro.",
    ],
    fontes: [MARIALIS_CULTUS],
  },

  "nossa-senhora-das-gracas": {
    sobre:
      "Em 1830, numa capela de Paris, Nossa Senhora pediu a Catarina Labouré que mandasse cunhar uma medalha com raios de luz saindo de suas mãos — as graças que ela derrama sobre quem as pede. Ficou conhecida como Medalha Milagrosa.",
    historia: [
      "Catarina Labouré tinha vinte e quatro anos e era noviça das Filhas da Caridade, na casa da rua du Bac, em Paris. Na noite de 18 para 19 de julho de 1830 teve a primeira visão; em 27 de novembro do mesmo ano, a que deu origem à medalha. Viu Nossa Senhora de pé sobre um globo, com anéis nos dedos de onde saíam feixes de luz, e ouviu que os raios eram as graças que ela derrama sobre os que lhe pedem — e que muitas pedras ficavam escuras porque ninguém pedia nada.",
      "Em torno da figura formou-se uma moldura oval com a oração que entrou no vocabulário católico do mundo inteiro: ó Maria concebida sem pecado, rogai por nós que recorremos a vós. Depois o quadro girou e mostrou o reverso, com a letra M encimada por uma cruz e os dois corações, o de Jesus coroado de espinhos e o de Maria traspassado pela espada.",
      "As primeiras medalhas foram cunhadas em 1832, com autorização do arcebispo de Paris, no mesmo ano em que a cidade foi assolada por uma epidemia de cólera. A difusão foi vertiginosa e o povo passou a chamá-la milagrosa — nome popular, nunca oficial. Catarina guardou segredo sobre ser ela a vidente durante quarenta e seis anos, até ao fim da vida; viveu-os a cuidar de velhos num hospício do subúrbio. Foi canonizada por Pio XII em 1947.",
      "Há uma coincidência que a história registou: a fórmula da medalha afirmava Maria concebida sem pecado vinte e quatro anos antes de a Imaculada Conceição ser definida como dogma, em 1854, e vinte e oito antes de Lourdes. A devoção popular chegou primeiro, e a definição veio confirmá-la.",
      "Para quem se prepara segundo Montfort, esta é a data dos sinais exteriores — a medalha é prima da cadeiazinha de que o Tratado fala no § 236, e tem a mesma lógica: um objeto que não faz nada por si, e que serve para lembrar o corpo do que a cabeça decidiu. Consagrar-se em 27 de novembro significa começar em 25 de outubro e terminar já dentro do Advento.",
    ],
    fontes: [PIO_IX],
  },

  "imaculada-conceicao": {
    sobre:
      "Preservada do pecado desde o primeiro instante. Dogma proclamado em 1854. Celebra a obra-prima da graça: uma criatura inteiramente pura desde o começo, não por força própria, mas pelos méritos de Cristo aplicados de antemão.",
    historia: [
      "Convém desfazer uma confusão frequente logo no início: a Imaculada Conceição não é a conceição de Jesus, é a de Maria. O que se afirma é que ela, desde o primeiro instante da sua existência, foi preservada de toda a mancha do pecado original — e, o que é decisivo, que o foi em vista dos méritos de Jesus Cristo. Ela não se salva sozinha nem antes dele: é salva de um modo mais radical, por antecipação.",
      "A festa é muito anterior ao dogma. Celebrava-se no Oriente, desde o século VIII, a Conceição de Sant'Ana; passou ao Ocidente no século XI e gerou uma das maiores disputas teológicas da Idade Média — Bernardo de Claraval e Tomás de Aquino tinham dificuldades com ela, e foi o franciscano Duns Escoto quem desatou o nó com o argumento da redenção preservativa. Sisto IV aprovou a festa em 1476 e Clemente XI estendeu-a à Igreja inteira em 1708.",
      "A definição dogmática veio em 8 de dezembro de 1854, com a bula Ineffabilis Deus, de Pio IX. Quatro anos depois, em Lourdes, a Senhora disse a Bernadette, em dialeto, que era a Imaculada Conceição — e a menina não sabia o que a frase queria dizer.",
      "No Brasil a data tem peso histórico próprio. Nossa Senhora da Conceição foi declarada padroeira de Portugal e dos seus domínios por dom João IV, em 1646, e o Brasil inteiro se construiu sob esse título: é o que explica o número de igrejas da Conceição no país e o próprio nome da padroeira nacional, Nossa Senhora da Conceição Aparecida. Em muitas cidades 8 de dezembro é feriado municipal.",
      "É a data mais escolhida para a consagração, e por bons motivos: é a maior solenidade mariana do Advento, cai num tempo em que a Igreja já está a preparar-se, e o próprio Montfort apoia a sua devoção na graça preveniente que esta festa celebra — a ideia de que tudo começa por um dom recebido antes de qualquer mérito é, exactamente, o fundamento do Tratado. Contando para trás, a preparação começa em 5 de novembro.",
    ],
    fontes: [PIO_IX, MARIALIS_CULTUS],
  },

  "nossa-senhora-de-guadalupe": {
    sobre:
      "Em dezembro de 1531, no monte Tepeyac, Nossa Senhora apareceu a um indígena recém-batizado, falou-lhe na sua língua e deixou a sua imagem na tilma dele. É a festa do encontro entre povos, e a padroeira de todo o continente americano.",
    historia: [
      "O protagonista é Juan Diego Cuauhtlatoatzin, índio chichimeca de cerca de cinquenta e sete anos, batizado havia pouco. Entre 9 e 12 de dezembro de 1531, a dez anos apenas da queda de Tenochtitlán, encontrou no outeiro do Tepeyac uma jovem que se apresentou como a Mãe do verdadeiro Deus e lhe pediu que o bispo construísse ali um templo. O bispo, o franciscano Juan de Zumárraga, pediu um sinal. Em 12 de dezembro, Juan Diego recolheu no alto do morro, fora de estação, rosas de Castela, levou-as na tilma e, ao abri-la diante do bispo, apareceu nela a imagem.",
      "O relato clássico é o Nican Mopohua, escrito em náuatle por volta de 1556 e atribuído a Antonio Valeriano, indígena formado no colégio de Tlatelolco. Está escrito na língua e na retórica dos vencidos, e é por isso que importa: a Senhora de Guadalupe não fala a língua do conquistador. Os próprios elementos da imagem são lidos como catequese em código náuatle — a faixa negra na cintura, que indicava gravidez; o sol por trás e a lua aos pés, sinais que o povo mexica sabia ler; o rosto moreno.",
      "O efeito histórico é mensurável. A evangelização do México, que patinava, acelerou-se em poucos anos, e a devoção tornou-se o eixo da identidade religiosa mexicana. Juan Diego foi canonizado por João Paulo II em 31 de julho de 2002, na própria basílica.",
      "O alcance passou de nacional a continental. Na exortação Ecclesia in America, de 1999, João Paulo II chamou-lhe Mãe e Evangelizadora da América e pediu que 12 de dezembro fosse celebrado em todo o continente — e é por isso que a data é festa, e não apenas memória, nas Américas.",
      "Para quem se consagra, a lição é a que Montfort repete de outra forma: a graça adapta-se a quem a recebe, e não o contrário. Ele escreve para pessoas simples e avisa que a sua devoção não exige instrução. Guadalupe é esse princípio em imagem — Deus a falar náuatle. A preparação começa em 9 de novembro e termina dentro do Advento, a poucos dias do Natal.",
    ],
    fontes: [
      {
        titulo:
          "Insigne y Nacional Basílica de Santa María de Guadalupe — site oficial",
        url: "https://virgendeguadalupe.org.mx/",
      },
      {
        titulo:
          "João Paulo II, exortação apostólica Ecclesia in America (1999)",
        url: "https://www.vatican.va/content/john-paul-ii/pt/apost_exhortations/documents/hf_jp-ii_exh_22011999_ecclesia-in-america.html",
      },
    ],
  },
};

/** O texto de uma festa, pelo id. */
export function textoDaFesta(id: FestaId): TextoDaFesta {
  return TEXTOS_DAS_FESTAS[id];
}
