/**
 * As orações da preparação.
 *
 * SOBRE AS FONTES
 * Os hinos e as ladainhas em latim são anteriores a qualquer direito
 * autoral e estão em domínio público. Os textos portugueses daqui foram
 * transcritos de devocionário impresso — são as versões que o povo reza e
 * canta, e não traduções feitas para este aplicativo. Onde a transcrição
 * é de livro, `revisada` é verdadeiro e `procedencia` diz de onde veio;
 * onde a tradução ainda é nossa, `revisada` é falso e o aviso aparece ao
 * pé da página.
 *
 * ORTOGRAFIA DO LATIM
 * Dentro deste arquivo os ditongos vão sempre escritos "ae" e "oe", e os
 * acentos de tonicidade que o devocionário traz para o canto não são
 * reproduzidos. É escolha de uniformidade: as palavras são as do livro.
 */

/** Um mesmo dito nas duas línguas. O latim falta quando não há original. */
export type Bilingue = {
  latim?: string;
  portugues: string;
};

/**
 * Um trecho de ladainha com a resposta que nele se repete.
 *
 * No devocionário a resposta vem em negrito na primeira invocação e
 * subentende-se nas seguintes, até que outra a substitua — "tende piedade
 * de nós", depois "livrai-nos, Senhor", depois "vos rogamos, ouvi-nos".
 * Guardá-la uma vez por bloco é o que permite mostrá-la assim.
 */
export type BlocoDeLadainha = {
  /** Ausente quando cada linha já traz a sua própria resposta. */
  resposta?: Bilingue;
  invocacoes: readonly Bilingue[];
};

/** O versículo, o responsório e a oração que fecham o que se rezou. */
export type Fecho = {
  versiculo: Bilingue;
  responsorio: Bilingue;
  oracao: Bilingue;
};

export type Oracao = {
  id: string;
  nome: string;
  /** Quando rezá-la e por quê. */
  proposito: string;
  /** Século e origem, quando conhecidos. */
  origem?: string;
  /** Original em latim, quando existe. Estrofe por estrofe. */
  latim?: readonly string[];
  /** O corpo em português, estrofe por estrofe. Ausente nas ladainhas. */
  portugues?: readonly string[];
  /** As invocações, quando a oração é ladainha. */
  ladainha?: readonly BlocoDeLadainha[];
  /** O que se diz depois do corpo, quando o livro o traz. */
  fecho?: Fecho;
  /** Falso enquanto a tradução não passou por revisão. */
  revisada: boolean;
  /** De onde veio o texto português. */
  procedencia: string;
};

/** A mesma procedência serve a tudo que foi copiado do devocionário. */
const DEVOCIONARIO =
  "Texto português transcrito de devocionário impresso, conferido linha a linha.";

/**
 * O fecho do Espírito Santo, que é o mesmo no hino e na ladainha.
 *
 * O devocionário o repete inteiro nos dois lugares; aqui fica escrito uma
 * vez só, para que não possam divergir por descuido de edição.
 */
const FECHO_DO_ESPIRITO_SANTO: Fecho = {
  versiculo: {
    latim: "Emitte Spiritum tuum et creabuntur.",
    portugues: "Enviai o vosso Espírito, e tudo será criado.",
  },
  responsorio: {
    latim: "Et renovabis faciem terrae.",
    portugues: "E renovareis a face da terra.",
  },
  oracao: {
    latim:
      "Oremus. Deus qui corda fidelium Sancti Spiritus illustratione docuisti, da nobis in eodem Spiritu recta sapere et de eius semper consolatione gaudere. Per Christum Dominum nostrum. Amen.",
    portugues:
      "Oremos. Ó Deus, que instruístes os corações dos vossos fiéis com a luz do Espírito Santo; concedei-nos que no mesmo Espírito conheçamos o que é reto, e gozemos sempre as suas consolações. Por Cristo Nosso Senhor. Amém.",
  },
};

export const ORACOES: readonly Oracao[] = [
  {
    id: "veni-creator",
    nome: "Vinde, Espírito Criador",
    proposito:
      "Abre a preparação e volta nos dias de estudo. Pede-se luz antes de qualquer coisa, porque nada disto se faz por esforço próprio.",
    origem: "Hino do século IX, atribuído a Rabano Mauro",
    latim: [
      "Veni, Creator Spiritus,\nmentes tuorum visita,\nimple superna gratia,\nquae tu creasti pectora.",
      "Qui diceris Paraclitus,\naltissimi donum Dei,\nfons vivus, ignis, charitas\net spiritalis unctio.",
      "Tu septiformis munere,\ndigitus paternae dexterae,\ntu rite promissum Patris,\nsermone ditans guttura.",
      "Accende lumen sensibus,\ninfunde amorem cordibus,\ninfirma nostri corporis\nvirtute firmans perpeti.",
      "Hostem repellas longius,\npacemque dones protinus,\nductore sic te praevio\nvitemus omne noxium.",
      "Per te sciamus da Patrem,\nnoscamus atque Filium,\nteque utriusque Spiritum\ncredamus omni tempore.",
      "Deo Patri sit gloria\net Filio qui a mortuis\nsurrexit ac Paraclito\nin sempiterna saecula. Amen.",
    ],
    portugues: [
      "Vem, ó Criador Espírito,\nAs almas dos teus visita;\nOs corações que criaste,\nEnche de graça infinita.",
      "Tu, Paráclito és chamado\nDom do Pai celestial,\nFogo, caridade, fonte\nViva e unção espiritual.",
      "Tu dás septiforme graça;\nDedo és da destra paterna;\nDo Pai, solene promessa,\nDás força da voz superna.",
      "Nossa razão esclarece,\nTeu amor no peito acende,\nDo nosso corpo a fraqueza\nCom tua força defende.",
      "De nós afasta o inimigo.\nDá-nos a paz sem demora,\nGuia-nos; e evitaremos\nTudo quanto se deplora.",
      "Dá que Deus Pai e seu Filho\nPor ti nós bem conheçamos,\nE em ti, Espírito de ambos\nEm todo tempo creiamos.",
      "A Deus Pai se dê a glória\nE ao Filho ressuscitado,\nParáclito e a ti também\nCom louvor perpetuado. Amém.",
    ],
    fecho: FECHO_DO_ESPIRITO_SANTO,
    revisada: true,
    procedencia: DEVOCIONARIO,
  },
  {
    id: "ave-maris-stella",
    nome: "Ave, Estrela do Mar",
    proposito:
      "Atravessa os trinta e três dias. Pede caminho seguro a quem navega — que é a imagem de toda esta preparação.",
    origem: "Hino do século VIII ou IX, de autor desconhecido",
    latim: [
      "Ave, maris Stella,\nDei Mater alma,\natque semper virgo,\nfelix caeli porta.",
      "Sumens illud Ave,\nGabrielis ore,\nfunda nos in pace\nmutans Hevae nomen.",
      "Solve vincla reis,\nprofer lumen caecis,\nmala nostra pelle,\nbona cuncta posce.",
      "Monstra te esse Matrem,\nsumat per te preces,\nqui pro nobis natus\ntulit esse tuus.",
      "Virgo singularis,\ninter omnes mitis,\nnos culpis solutos\nmites fac et castos.",
      "Vitam praesta puram,\niter para tutum,\nut videntes Iesum,\nsemper collaetemur.",
      "Sit laus Deo Patri,\nsummo Christo decus,\nSpiritui Sancto\ntribus honor unus. Amen.",
    ],
    portugues: [
      "Ave, do mar Estrela,\nDe Deus Mãe bela,\nSempre Virgem, da morada\nCeleste feliz entrada.",
      "Ó tu que ouviste da boca\nDo anjo a saudação;\nDá-nos paz e quietação;\nE o nome de Eva troca.",
      "As prisões aos réus desata.\nE a nós cegos alumia;\nDe tudo que nos maltrata\nNos livra, o bem nos granjeia.",
      "Ostenta que és Mãe, fazendo\nQue os rogos do povo seu\nOuça aquele que, nascendo\nPor nós, quis ser Filho teu.",
      "Ó Virgem especiosa,\nToda cheia de ternura,\nExtintos nossos pecados,\nDá-nos pureza e brandura,",
      "Dá-nos uma vida pura,\nPõe-nos em via segura,\nPara que a Jesus gozemos,\nE sempre nos alegremos.",
      "A Deus Pai veneremos;\nA Jesus Cristo também.\nE ao Espírito Santo; demos\nAos três um louvor. Amém.",
    ],
    revisada: true,
    procedencia: DEVOCIONARIO,
  },
  {
    id: "magnificat",
    nome: "Magnificat",
    proposito:
      "O cântico de Maria, rezado sobretudo na segunda semana. É ela quem fala, e diz tudo o que a consagração quer aprender.",
    origem: "Evangelho de Lucas, capítulo 1, versículos 46 a 55",
    portugues: [
      "A minha alma engrandece o Senhor,\ne o meu espírito exulta em Deus, meu Salvador,",
      "porque olhou para a pequenez de sua serva.\nEis que, desde agora, todas as gerações me chamarão bem-aventurada,",
      "porque o Todo-Poderoso fez em mim maravilhas,\ne santo é o seu nome.",
      "Sua misericórdia se estende, de geração em geração,\nsobre aqueles que o temem.",
      "Agiu com a força do seu braço,\ndispersou os soberbos no pensamento do seu coração.",
      "Derrubou os poderosos de seus tronos\ne elevou os humildes.",
      "Encheu de bens os famintos\ne despediu os ricos de mãos vazias.",
      "Socorreu Israel, seu servo,\nlembrando-se de sua misericórdia,",
      "como havia prometido a nossos pais,\nem favor de Abraão e de sua descendência, para sempre.",
    ],
    revisada: false,
    procedencia:
      "Tradução própria a partir da Vulgata. Para uso litúrgico, prefira a tradução da sua Bíblia.",
  },

  // ========================================================================
  // AS LADAINHAS
  // Rezadas todo dia das três semanas, conforme os § 228 a 230. Vêm na
  // ordem em que o devocionário as traz.
  // ========================================================================
  {
    id: "ladainha-do-espirito-santo",
    nome: "Ladainha do Espírito Santo",
    proposito:
      "Reza-se todos os dias das três semanas, com a oração que a segue. É a primeira coisa de cada manhã: pede-se ao Espírito Santo o conhecimento de si, o de Maria e o de Jesus Cristo, nessa ordem.",
    origem: "Ladainha de devoção particular, de autor e data desconhecidos",
    ladainha: [
      {
        invocacoes: [
          { latim: "Kyrie, eleison.", portugues: "Senhor, tende piedade de nós." },
          {
            latim: "Christe, eleison.",
            portugues: "Jesus Cristo, tende piedade de nós.",
          },
          { latim: "Kyrie, eleison.", portugues: "Senhor, tende piedade de nós." },
          {
            latim: "Spiritus Sancte, audi nos.",
            portugues: "Divino Espírito Santo, ouvi-nos.",
          },
          {
            latim: "Spiritus Paraclite, exaudi nos.",
            portugues: "Espírito Paráclito, atendei-nos.",
          },
        ],
      },
      {
        resposta: { latim: "miserere nobis", portugues: "tende piedade de nós" },
        invocacoes: [
          { latim: "Pater de caelis, Deus,", portugues: "Deus Pai dos céus," },
          {
            latim: "Fili, Redemptor mundi, Deus,",
            portugues: "Deus Filho, Redentor do mundo,",
          },
          { latim: "Spiritus Sancte, Deus,", portugues: "Deus Espírito Santo," },
          {
            latim: "Sancta Trinitas, unus Deus,",
            portugues: "Santíssima Trindade, que sois um só Deus,",
          },
          { latim: "Spiritus veritatis,", portugues: "Espírito da verdade," },
          { latim: "Spiritus sapientiae,", portugues: "Espírito da sabedoria," },
          {
            latim: "Spiritus intellectus,",
            portugues: "Espírito da inteligência,",
          },
          {
            latim: "Spiritus fortitudinis,",
            portugues: "Espírito da fortaleza,",
          },
          { latim: "Spiritus pietatis,", portugues: "Espírito da piedade," },
          {
            latim: "Spiritus recti consilii,",
            portugues: "Espírito do bom conselho,",
          },
          { latim: "Spiritus scientiae,", portugues: "Espírito da ciência," },
          {
            latim: "Spiritus sancti timoris,",
            portugues: "Espírito do santo temor,",
          },
          { latim: "Spiritus caritatis,", portugues: "Espírito da caridade," },
          { latim: "Spiritus gaudii,", portugues: "Espírito da alegria," },
          { latim: "Spiritus pacis,", portugues: "Espírito da paz," },
          { latim: "Spiritus virtutum,", portugues: "Espírito das virtudes," },
          {
            latim: "Spiritus multiformis gratiae,",
            portugues: "Espírito de toda a graça,",
          },
          {
            latim: "Spiritus adoptionis Filiorum Dei,",
            portugues: "Espírito da adoção dos filhos de Deus,",
          },
          {
            latim: "Purificator animarum nostrarum,",
            portugues: "Purificador das nossas almas,",
          },
          {
            latim: "Ecclesiae catholicae sanctificator et rector,",
            portugues: "Santificador e guia da Igreja Católica,",
          },
          {
            latim: "Caelestium donorum distributor,",
            portugues: "Distribuidor dos dons celestes,",
          },
          {
            latim: "Discretor cogitationum et intentionum cordis,",
            portugues: "Conhecedor dos pensamentos e das intenções do coração,",
          },
          {
            latim: "Dulcedo in tuo servitio incipientium,",
            portugues: "Doçura dos que começam a vos servir,",
          },
          { latim: "Corona perfectorum,", portugues: "Coroa dos perfeitos," },
          { latim: "Gaudium Angelorum,", portugues: "Alegria dos anjos," },
          {
            latim: "Illuminatio Patriarcharum,",
            portugues: "Luz dos patriarcas,",
          },
          {
            latim: "Inspiratio Prophetarum,",
            portugues: "Inspiração dos profetas,",
          },
          {
            latim: "Os et sapientia Apostolorum,",
            portugues: "Palavra e sabedoria dos apóstolos,",
          },
          { latim: "Victoria Martyrum,", portugues: "Vitória dos mártires," },
          {
            latim: "Scientia Confessorum,",
            portugues: "Ciência dos confessores,",
          },
          { latim: "Puritas Virginum,", portugues: "Pureza das virgens," },
          {
            latim: "Unctio Sanctorum omnium,",
            portugues: "Unção de todos os santos,",
          },
        ],
      },
      {
        invocacoes: [
          {
            latim: "Propitius esto, parce nobis, Domine.",
            portugues: "Sede-nos propício, perdoai-nos, Senhor.",
          },
          {
            latim: "Propitius esto, exaudi nos, Domine.",
            portugues: "Sede-nos propício, atendei-nos, Senhor.",
          },
        ],
      },
      {
        resposta: {
          latim: "libera nos, Domine",
          portugues: "livrai-nos, Senhor",
        },
        invocacoes: [
          { latim: "Ab omni peccato,", portugues: "De todo o pecado," },
          {
            latim: "Ab omnibus tentationibus et insidiis diaboli,",
            portugues: "De todas as tentações e ciladas do demônio,",
          },
          {
            latim: "Ab omni praesumptione et desperatione,",
            portugues: "De toda a presunção e desesperação,",
          },
          {
            latim: "Ab impugnatione veritatis agnitae,",
            portugues: "Do ataque à verdade conhecida,",
          },
          {
            latim: "Ab invidentia fraternae gratiae,",
            portugues: "Da inveja da graça fraterna,",
          },
          {
            latim: "Ab omni obstinatione et impoenitentia,",
            portugues: "De toda a obstinação e impenitência,",
          },
          {
            latim: "Ab omni negligentia et tepore animi,",
            portugues: "De toda a negligência e tepor do espírito,",
          },
          {
            latim: "Ab omni immunditia mentis et corporis,",
            portugues: "De toda a impureza da mente e do corpo,",
          },
          {
            latim: "Ab haeresibus et erroribus universis,",
            portugues: "De todas as heresias e erros,",
          },
          { latim: "Ab omni malo spiritu,", portugues: "De todo o mau espírito," },
          {
            latim: "A mala et aeterna morte,",
            portugues: "Da morte má e eterna,",
          },
          {
            latim: "Per aeternam ex Patre Filioque processionem tuam,",
            portugues: "Pela vossa eterna procedência do Pai e do Filho,",
          },
          {
            latim: "Per miraculosam conceptionem Filii Dei,",
            portugues: "Pela milagrosa conceição do Filho de Deus,",
          },
          {
            latim: "Per descensionem tuam super Christum baptizatum,",
            portugues: "Pela vossa descida sobre Jesus Cristo batizado,",
          },
          {
            latim: "Per sanctam apparitionem tuam in transfiguratione Domini,",
            portugues: "Pela vossa santa aparição na transfiguração do Senhor,",
          },
          {
            latim: "Per adventum tuum super discipulos Christi,",
            portugues: "Pela vossa vinda sobre os discípulos do Senhor,",
          },
          { latim: "In die iudicii,", portugues: "No dia do juízo," },
        ],
      },
      {
        resposta: {
          latim: "te rogamus, audi nos",
          portugues: "nós vos rogamos, ouvi-nos",
        },
        invocacoes: [
          { latim: "Peccatores,", portugues: "Ainda que pecadores," },
          { latim: "Ut nobis parcas,", portugues: "Para que nos perdoeis," },
          {
            latim:
              "Ut omnia Ecclesiae membra vivificare et sanctificare digneris,",
            portugues:
              "Para que vos digneis vivificar e santificar todos os membros da Igreja,",
          },
          {
            latim:
              "Ut verae pietatis, devotionis et orationis donum nobis dare digneris,",
            portugues:
              "Para que vos digneis conceder-nos o dom da verdadeira piedade, devoção e oração,",
          },
          {
            latim:
              "Ut sinceros misericordiae charitatisque affectus nobis inspirare digneris,",
            portugues:
              "Para que vos digneis inspirar-nos sinceros afetos de misericórdia e de caridade,",
          },
          {
            latim:
              "Ut spiritum novum et cor mundum in nobis creare digneris,",
            portugues:
              "Para que vos digneis criar em nós um espírito novo e um coração puro,",
          },
          {
            latim:
              "Ut veram pacem et cordis tranquillitatem nobis dare digneris,",
            portugues:
              "Para que vos digneis conceder-nos verdadeira paz e tranquilidade do coração,",
          },
          {
            latim:
              "Ut ad tollerandas propter iustitiam persecutiones nos dignos et fortes efficias,",
            portugues:
              "Para que vos digneis fazer-nos dignos e fortes para suportar as perseguições pela justiça,",
          },
          {
            latim: "Ut nos in numerum electorum tuorum recipias,",
            portugues: "Para que vos digneis receber-nos no número dos vossos eleitos,",
          },
          {
            latim: "Ut nos in gratia tua confirmare digneris,",
            portugues: "Para que vos digneis confirmar-nos em vossa graça,",
          },
          {
            latim: "Ut nos exaudire digneris,",
            portugues: "Para que vos digneis ouvir-nos,",
          },
          { latim: "Spiritus Dei,", portugues: "Espírito de Deus," },
        ],
      },
      {
        invocacoes: [
          {
            latim:
              "Agnus Dei, qui tollis peccata mundi, effunde in nos Spiritum Sanctum.",
            portugues:
              "Cordeiro de Deus, que tirais o pecado do mundo, enviai-nos o Espírito Santo.",
          },
          {
            latim:
              "Agnus Dei, qui tollis peccata mundi, emitte promissum in nos Patris Spiritum.",
            portugues:
              "Cordeiro de Deus, que tirais o pecado do mundo, mandai-nos o Espírito prometido do Pai.",
          },
          {
            latim:
              "Agnus Dei, qui tollis peccata mundi, da nobis Spiritum bonum.",
            portugues:
              "Cordeiro de Deus, que tirais o pecado do mundo, dai-nos o Espírito bom.",
          },
          {
            latim: "Spiritus Sancte, audi nos.",
            portugues: "Espírito Santo, ouvi-nos.",
          },
          {
            latim: "Spiritus Paraclite, exaudi nos.",
            portugues: "Espírito Consolador, atendei-nos.",
          },
        ],
      },
    ],
    fecho: FECHO_DO_ESPIRITO_SANTO,
    revisada: true,
    procedencia: DEVOCIONARIO,
  },
  {
    id: "ladainha-de-nossa-senhora",
    nome: "Ladainha de Nossa Senhora",
    proposito:
      "Reza-se na primeira semana, depois do Ave, Estrela do Mar. São os nomes de Maria, um a um — e quem os repete acaba por conhecê-la, que é o que a segunda semana vai pedir.",
    origem: "Ladainha lauretana, em uso em Loreto desde o século XVI",
    ladainha: [
      {
        invocacoes: [
          { latim: "Kyrie, eleison.", portugues: "Senhor, tende piedade de nós." },
          {
            latim: "Christe, eleison.",
            portugues: "Jesus Cristo, tende piedade de nós.",
          },
          { latim: "Kyrie, eleison.", portugues: "Senhor, tende piedade de nós." },
          { latim: "Christe, audi nos.", portugues: "Jesus Cristo, ouvi-nos." },
          {
            latim: "Christe, exaudi nos.",
            portugues: "Jesus Cristo, atendei-nos.",
          },
        ],
      },
      {
        resposta: { latim: "miserere nobis", portugues: "tende piedade de nós" },
        invocacoes: [
          { latim: "Pater de caelis Deus,", portugues: "Deus, Pai dos céus," },
          {
            latim: "Fili, Redemptor mundi, Deus,",
            portugues: "Deus Filho, Redentor do mundo,",
          },
          { latim: "Spiritus Sancte Deus,", portugues: "Deus Espírito Santo," },
          {
            latim: "Sancta Trinitas, unus Deus,",
            portugues: "Santíssima Trindade, que sois um só Deus,",
          },
        ],
      },
      {
        resposta: { latim: "ora pro nobis", portugues: "rogai por nós" },
        invocacoes: [
          { latim: "Sancta Maria,", portugues: "Santa Maria," },
          { latim: "Sancta Dei Genitrix,", portugues: "Santa Mãe de Deus," },
          {
            latim: "Sancta Virgo virginum,",
            portugues: "Santa Virgem das virgens,",
          },
          { latim: "Mater Christi,", portugues: "Mãe de Jesus Cristo," },
          { latim: "Mater divinae gratiae,", portugues: "Mãe da divina graça," },
          { latim: "Mater purissima,", portugues: "Mãe puríssima," },
          { latim: "Mater castissima,", portugues: "Mãe castíssima," },
          { latim: "Mater inviolata,", portugues: "Mãe imaculada," },
          { latim: "Mater intemerata,", portugues: "Mãe intacta," },
          { latim: "Mater amabilis,", portugues: "Mãe amável," },
          { latim: "Mater admirabilis,", portugues: "Mãe admirável," },
          { latim: "Mater boni consilii,", portugues: "Mãe do bom conselho," },
          { latim: "Mater Creatoris,", portugues: "Mãe do Criador," },
          { latim: "Mater Salvatoris,", portugues: "Mãe do Salvador," },
          { latim: "Virgo prudentissima,", portugues: "Virgem prudentíssima," },
          { latim: "Virgo veneranda,", portugues: "Virgem venerável," },
          { latim: "Virgo praedicanda,", portugues: "Virgem louvável," },
          { latim: "Virgo potens,", portugues: "Virgem poderosa," },
          { latim: "Virgo clemens,", portugues: "Virgem benigna," },
          { latim: "Virgo fidelis,", portugues: "Virgem fiel," },
          { latim: "Speculum justitiae,", portugues: "Espelho de justiça," },
          { latim: "Sedes sapientiae,", portugues: "Sede da sabedoria," },
          {
            latim: "Causa nostrae laetitiae,",
            portugues: "Causa de nossa alegria,",
          },
          { latim: "Vas spirituale,", portugues: "Vaso espiritual," },
          { latim: "Vas honorabile,", portugues: "Vaso honorífico," },
          {
            latim: "Vas insigne devotionis,",
            portugues: "Vaso insigne de devoção,",
          },
          { latim: "Rosa mystica,", portugues: "Rosa mística," },
          { latim: "Turris Davidica,", portugues: "Torre de Davi," },
          { latim: "Turris eburnea,", portugues: "Torre de marfim," },
          { latim: "Domus aurea,", portugues: "Casa de ouro," },
          { latim: "Foederis arca,", portugues: "Arca da aliança," },
          { latim: "Janua caeli,", portugues: "Porta do céu," },
          { latim: "Stella matutina,", portugues: "Estrela da manhã," },
          { latim: "Salus infirmorum,", portugues: "Saúde dos enfermos," },
          {
            latim: "Refugium peccatorum,",
            portugues: "Refúgio dos pecadores,",
          },
          {
            latim: "Consolatrix afflictorum,",
            portugues: "Consoladora dos aflitos,",
          },
          {
            latim: "Auxilium christianorum,",
            portugues: "Auxílio dos cristãos,",
          },
          { latim: "Regina angelorum,", portugues: "Rainha dos anjos," },
          {
            latim: "Regina patriarcharum,",
            portugues: "Rainha dos patriarcas,",
          },
          { latim: "Regina prophetarum,", portugues: "Rainha dos profetas," },
          { latim: "Regina apostolorum,", portugues: "Rainha dos apóstolos," },
          { latim: "Regina martyrum,", portugues: "Rainha dos mártires," },
          {
            latim: "Regina confessorum,",
            portugues: "Rainha dos confessores,",
          },
          { latim: "Regina virginum,", portugues: "Rainha das virgens," },
          {
            latim: "Regina sanctorum omnium,",
            portugues: "Rainha de todos os santos,",
          },
          {
            latim: "Regina sine labe originali concepta,",
            portugues: "Rainha concebida sem pecado original,",
          },
          {
            latim: "Regina in caelum assumpta,",
            portugues: "Rainha assunta ao céu,",
          },
          {
            latim: "Regina sacratissimi Rosarii,",
            portugues: "Rainha do santo Rosário,",
          },
          { latim: "Regina pacis,", portugues: "Rainha da paz," },
        ],
      },
      {
        invocacoes: [
          {
            latim:
              "Agnus Dei, qui tollis peccata mundi, parce nobis, Domine.",
            portugues:
              "Cordeiro de Deus, que tirais o pecado do mundo, perdoai-nos, Senhor.",
          },
          {
            latim:
              "Agnus Dei, qui tollis peccata mundi, exaudi nos, Domine.",
            portugues:
              "Cordeiro de Deus, que tirais o pecado do mundo, ouvi-nos, Senhor.",
          },
          {
            latim: "Agnus Dei, qui tollis peccata mundi, miserere nobis.",
            portugues:
              "Cordeiro de Deus, que tirais o pecado do mundo, tende piedade de nós.",
          },
        ],
      },
    ],
    fecho: {
      versiculo: {
        latim: "Ora pro nobis, sancta Dei Genitrix,",
        portugues: "Rogai por nós, santa Mãe de Deus.",
      },
      responsorio: {
        latim: "Ut digni efficiamur promissionibus Christi.",
        portugues: "Para que sejamos dignos das promessas de Cristo.",
      },
      oracao: {
        latim:
          "Oremus. Concede nos famulos tuos, quaesumus, Domine Deus, perpetua mentis et corporis sanitate gaudere: et gloriosa beatae Mariae semper Virginis intercessione a praesenti liberari tristitia, et aeterna perfrui laetitia. Per Christum Dominum nostrum. Amen.",
        portugues:
          "Oremos. Senhor Deus, nós vos suplicamos que concedais a vossos servos lograr perpétua saúde de alma e corpo; e que pela gloriosa intercessão da bem-aventurada sempre Virgem Maria sejamos livres da presente tristeza e gozemos da eterna alegria. Por Cristo Nosso Senhor. Amém.",
      },
    },
    revisada: true,
    procedencia: DEVOCIONARIO,
  },
  {
    id: "ladainha-do-santissimo-nome-de-jesus",
    nome: "Ladainha do Santíssimo Nome de Jesus",
    proposito:
      "Reza-se na terceira semana, quando a preparação volta os olhos para Jesus Cristo. É o nome dele dito de todas as maneiras que a Igreja aprendeu a dizê-lo.",
    origem:
      "Atribuída a são Bernardino de Sena, século XV; aprovada para uso público em 1886",
    ladainha: [
      {
        invocacoes: [
          { latim: "Kyrie, eleison.", portugues: "Senhor, tende piedade de nós." },
          {
            latim: "Christe, eleison.",
            portugues: "Jesus Cristo, tende piedade de nós.",
          },
          { latim: "Kyrie, eleison.", portugues: "Senhor, tende piedade de nós." },
          { latim: "Iesu, audi nos.", portugues: "Jesus Cristo, ouvi-nos." },
          { latim: "Iesu, exaudi nos.", portugues: "Jesus Cristo, atendei-nos." },
        ],
      },
      {
        resposta: { latim: "miserere nobis", portugues: "tende piedade de nós" },
        invocacoes: [
          {
            latim: "Pater de caelis Deus,",
            portugues: "Pai celeste, que sois Deus,",
          },
          {
            latim: "Fili, Redemptor mundi, Deus,",
            portugues: "Filho, Redentor do mundo, que sois Deus,",
          },
          {
            latim: "Spiritus Sancte Deus,",
            portugues: "Espírito Santo, que sois Deus,",
          },
          {
            latim: "Sancta Trinitas, unus Deus,",
            portugues: "Santíssima Trindade, que sois um só Deus,",
          },
          { latim: "Iesu, Fili Dei vivi,", portugues: "Jesus, Filho de Deus vivo," },
          { latim: "Iesu, splendor Patris,", portugues: "Jesus, esplendor do Pai," },
          {
            latim: "Iesu, candor lucis aeternae,",
            portugues: "Jesus, pureza da luz eterna,",
          },
          { latim: "Iesu, Rex gloriae,", portugues: "Jesus, Rei da glória," },
          { latim: "Iesu, sol iustitiae,", portugues: "Jesus, sol de justiça," },
          {
            latim: "Iesu, Fili Mariae Virginis,",
            portugues: "Jesus, Filho da Virgem Maria,",
          },
          { latim: "Iesu amabilis,", portugues: "Jesus amável," },
          { latim: "Iesu admirabilis,", portugues: "Jesus admirável," },
          { latim: "Iesu, Deus fortis,", portugues: "Jesus, Deus forte," },
          {
            latim: "Iesu, pater futuri saeculi,",
            portugues: "Jesus, Pai do futuro século,",
          },
          {
            latim: "Iesu, magni consilii angele,",
            portugues: "Jesus, Anjo do grande conselho,",
          },
          { latim: "Iesu potentissime,", portugues: "Jesus poderosíssimo," },
          { latim: "Iesu patientissime,", portugues: "Jesus pacientíssimo," },
          { latim: "Iesu obedientissime,", portugues: "Jesus obedientíssimo," },
          {
            latim: "Iesu, mitis et humilis corde,",
            portugues: "Jesus, brando e humilde de coração,",
          },
          {
            latim: "Iesu, amator castitatis,",
            portugues: "Jesus, amante da castidade,",
          },
          { latim: "Iesu, amator noster,", portugues: "Jesus, amador nosso," },
          { latim: "Iesu, Deus pacis,", portugues: "Jesus, Deus da paz," },
          { latim: "Iesu, auctor vitae,", portugues: "Jesus, autor da vida," },
          {
            latim: "Iesu, exemplar virtutum,",
            portugues: "Jesus, exemplar das virtudes,",
          },
          {
            latim: "Iesu, zelator animarum,",
            portugues: "Jesus, zelador das almas,",
          },
          { latim: "Iesu, Deus noster,", portugues: "Jesus, nosso Deus," },
          { latim: "Iesu, refugium nostrum,", portugues: "Jesus, nosso refúgio," },
          { latim: "Iesu, pater pauperum,", portugues: "Jesus, Pai dos pobres," },
          {
            latim: "Iesu, thesaure fidelium,",
            portugues: "Jesus, tesouro dos fiéis,",
          },
          { latim: "Iesu, bone pastor,", portugues: "Jesus, Bom Pastor," },
          { latim: "Iesu, lux vera,", portugues: "Jesus, luz verdadeira," },
          {
            latim: "Iesu, sapientia aeterna,",
            portugues: "Jesus, sabedoria eterna,",
          },
          { latim: "Iesu, bonitas infinita,", portugues: "Jesus, bondade infinita," },
          {
            latim: "Iesu, via et vita nostra,",
            portugues: "Jesus, nosso caminho e nossa vida,",
          },
          {
            latim: "Iesu, gaudium Angelorum,",
            portugues: "Jesus, alegria dos anjos,",
          },
          {
            latim: "Iesu, rex Patriarcharum,",
            portugues: "Jesus, Rei dos patriarcas,",
          },
          {
            latim: "Iesu, magister Apostolorum,",
            portugues: "Jesus, Mestre dos apóstolos,",
          },
          {
            latim: "Iesu, doctor Evangelistarum,",
            portugues: "Jesus, Doutor dos evangelistas,",
          },
          {
            latim: "Iesu, fortitudo Martyrum,",
            portugues: "Jesus, fortaleza dos mártires,",
          },
          {
            latim: "Iesu, lumen Confessorum,",
            portugues: "Jesus, luz dos confessores,",
          },
          {
            latim: "Iesu, puritas Virginum,",
            portugues: "Jesus, pureza das virgens,",
          },
          {
            latim: "Iesu, corona sanctorum omnium,",
            portugues: "Jesus, coroa de todos os santos,",
          },
        ],
      },
      {
        invocacoes: [
          {
            latim: "Propitius esto; parce nobis, Iesu.",
            portugues: "Sede-nos propício; perdoai-nos, Jesus.",
          },
          {
            latim: "Propitius esto; exaudi nos, Iesu.",
            portugues: "Sede-nos propício; ouvi-nos, Jesus.",
          },
        ],
      },
      {
        resposta: { latim: "libera nos, Iesu", portugues: "livrai-nos, Jesus" },
        invocacoes: [
          { latim: "Ab omni malo,", portugues: "De todo o mal," },
          { latim: "Ab omni peccato,", portugues: "De todo o pecado," },
          { latim: "Ab ira tua,", portugues: "De vossa ira," },
          { latim: "Ab insidiis diaboli,", portugues: "Das ciladas do demônio," },
          {
            latim: "A spiritu fornicationis,",
            portugues: "Do espírito da impureza,",
          },
          { latim: "A morte perpetua,", portugues: "De morte eterna," },
          {
            latim: "A neglectu inspirationum tuarum,",
            portugues: "Do desprezo das vossas inspirações,",
          },
          {
            latim: "Per mysterium sanctae incarnationis tuae,",
            portugues: "Pelo mistério da vossa santa Encarnação,",
          },
          { latim: "Per nativitatem tuam,", portugues: "Pela vossa natividade," },
          { latim: "Per infantiam tuam,", portugues: "Pela vossa infância," },
          {
            latim: "Per divinissimam vitam tuam,",
            portugues: "Pela vossa santíssima vida,",
          },
          { latim: "Per labores tuos,", portugues: "Pelos vossos trabalhos," },
          {
            latim: "Per agoniam et passionem tuam,",
            portugues: "Pela vossa agonia e paixão,",
          },
          {
            latim: "Per crucem et derelictionem tuam,",
            portugues: "Pela vossa cruz e desamparo,",
          },
          { latim: "Per languores tuos,", portugues: "Pelas vossas angústias," },
          {
            latim: "Per mortem et sepulturam tuam,",
            portugues: "Pela vossa morte e sepultura,",
          },
          {
            latim: "Per resurrectionem tuam,",
            portugues: "Pela vossa ressurreição,",
          },
          { latim: "Per ascensionem tuam,", portugues: "Pela vossa ascensão," },
          {
            latim: "Per sanctissimae Eucharistiae institutionem tuam,",
            portugues: "Pela vossa instituição da Santíssima Eucaristia,",
          },
          { latim: "Per gaudia tua,", portugues: "Pelas vossas alegrias," },
          { latim: "Per gloriam tuam,", portugues: "Pela vossa glória," },
        ],
      },
      {
        invocacoes: [
          {
            latim: "Agnus Dei, qui tollis peccata mundi, parce nobis, Iesu.",
            portugues:
              "Cordeiro de Deus, que tirais o pecado do mundo, perdoai-nos, Jesus.",
          },
          {
            latim: "Agnus Dei, qui tollis peccata mundi, exaudi nos, Iesu.",
            portugues:
              "Cordeiro de Deus, que tirais o pecado do mundo, ouvi-nos, Jesus.",
          },
          {
            latim: "Agnus Dei, qui tollis peccata mundi, miserere nobis, Iesu.",
            portugues:
              "Cordeiro de Deus, que tirais o pecado do mundo, tende piedade de nós, Jesus.",
          },
          { latim: "Iesu, audi nos.", portugues: "Jesus, ouvi-nos." },
          { latim: "Iesu, exaudi nos.", portugues: "Jesus, atendei-nos." },
        ],
      },
    ],
    fecho: {
      versiculo: {
        latim: "Iesu, audi nos.",
        portugues: "Jesus, ouvi-nos.",
      },
      responsorio: {
        latim: "Iesu, exaudi nos.",
        portugues: "Jesus, atendei-nos.",
      },
      oracao: {
        latim:
          "Oremus. Domine Iesu Christe, qui dixisti: Petite, et accipietis; quaerite, et invenietis; pulsate, et aperietur vobis; quaesumus, da nobis, petentibus divinissimi tui amoris affectum, ut te toto corde, ore et opere diligamus et a tua nunquam laude cessemus. Sancti nominis tui, Domine, timorem pariter et amorem fac nos habere perpetuum; quia nunquam tua gubernatione destituis, quos in soliditate tuae dilectionis instituis. Qui vivis et regnas in saecula saeculorum. Amen.",
        portugues:
          "Oremos. Senhor Jesus Cristo, que dissestes: Pedi e recebereis; buscai e achareis; batei e abrir-se-vos-á, nós vos suplicamos que concedais a nós, que vo-lo pedimos, os sentimentos afetivos de vosso divino amor, a fim de que nós vos amemos de todo o coração e que esse amor transcenda por nossas ações sem que deixemos de vos amar. Permiti que tenhamos sempre, Senhor, um igual temor e amor pelo vosso santo nome; pois não deixais de governar aqueles que estabeleceis na firmeza do vosso amor. Vós que viveis e reinais pelos séculos dos séculos. Amém.",
      },
    },
    revisada: true,
    procedencia: DEVOCIONARIO,
  },
  {
    id: "ladainha-do-sagrado-coracao-de-jesus",
    nome: "Ladainha do Sagrado Coração de Jesus",
    proposito:
      "Não está entre as orações que Montfort prescreve. Vem no mesmo devocionário da preparação, e serve a quem reza as primeiras sextas-feiras ou quer passar a terceira semana diante do Coração que a consagração quer imitar.",
    origem:
      "Composta em Marselha no século XVIII; aprovada para toda a Igreja em 1899",
    ladainha: [
      {
        invocacoes: [
          { latim: "Kyrie, eleison.", portugues: "Senhor, tende piedade de nós." },
          {
            latim: "Christe, eleison.",
            portugues: "Jesus Cristo, tende piedade de nós.",
          },
          { latim: "Kyrie, eleison.", portugues: "Senhor, tende piedade de nós." },
          { latim: "Christe, audi nos.", portugues: "Jesus Cristo, ouvi-nos." },
          {
            latim: "Christe, exaudi nos.",
            portugues: "Jesus Cristo, atendei-nos.",
          },
        ],
      },
      {
        resposta: { latim: "miserere nobis", portugues: "tende piedade de nós" },
        invocacoes: [
          {
            latim: "Pater de caelis Deus,",
            portugues: "Pai celeste, que sois Deus,",
          },
          {
            latim: "Fili, Redemptor mundi, Deus,",
            portugues: "Filho, Redentor do mundo, que sois Deus,",
          },
          {
            latim: "Spiritus Sancte Deus,",
            portugues: "Espírito Santo, que sois Deus,",
          },
          {
            latim: "Sancta Trinitas, unus Deus,",
            portugues: "Santíssima Trindade, que sois um só Deus,",
          },
          {
            latim: "Cor Iesu, Filii Patris aeterni,",
            portugues: "Coração de Jesus, Filho do Pai Eterno,",
          },
          {
            latim: "Cor Iesu, in sinu Virginis Matris a Spiritu Sancto formatum,",
            portugues:
              "Coração de Jesus, formado pelo Espírito Santo no seio da Virgem Mãe,",
          },
          {
            latim: "Cor Iesu, Verbo Dei substantialiter unitum,",
            portugues:
              "Coração de Jesus, unido substancialmente ao Verbo de Deus,",
          },
          {
            latim: "Cor Iesu, maiestatis infinitae,",
            portugues: "Coração de Jesus, de majestade infinita,",
          },
          {
            latim: "Cor Iesu, templum Dei sanctum,",
            portugues: "Coração de Jesus, templo santo de Deus,",
          },
          {
            latim: "Cor Iesu, tabernaculum Altissimi,",
            portugues: "Coração de Jesus, tabernáculo do Altíssimo,",
          },
          {
            latim: "Cor Iesu, domus Dei et porta caeli,",
            portugues: "Coração de Jesus, casa de Deus e porta do céu,",
          },
          {
            latim: "Cor Iesu, fornax ardens caritatis,",
            portugues: "Coração de Jesus, fornalha ardente de caridade,",
          },
          {
            latim: "Cor Iesu, iustitiae et amoris receptaculum,",
            portugues: "Coração de Jesus, receptáculo de justiça e de amor,",
          },
          {
            latim: "Cor Iesu, bonitate et amore plenum,",
            portugues: "Coração de Jesus, cheio de bondade e de amor,",
          },
          {
            latim: "Cor Iesu, virtutum omnium abyssus,",
            portugues: "Coração de Jesus, abismo de todas as virtudes,",
          },
          {
            latim: "Cor Iesu, omni laude dignissimum,",
            portugues: "Coração de Jesus, digníssimo de todo o louvor,",
          },
          {
            latim: "Cor Iesu, rex et centrum omnium cordium,",
            portugues: "Coração de Jesus, Rei e centro de todos os corações,",
          },
          {
            latim: "Cor Iesu, in quo sunt omnes thesauri sapientiae et scientiae,",
            portugues:
              "Coração de Jesus, no qual estão todos os tesouros da sabedoria e ciência,",
          },
          {
            latim: "Cor Iesu, in quo habitat omnis plenitudo divinitatis,",
            portugues:
              "Coração de Jesus, no qual habita toda a plenitude da divindade,",
          },
          {
            latim: "Cor Iesu, in quo Pater sibi bene complacuit,",
            portugues:
              "Coração de Jesus, no qual o Pai põe as suas complacências,",
          },
          {
            latim: "Cor Iesu, de cuius plenitudine omnes nos accepimus,",
            portugues:
              "Coração de Jesus, de cuja plenitude nós todos participamos,",
          },
          {
            latim: "Cor Iesu, desiderium collium aeternorum,",
            portugues: "Coração de Jesus, desejo das colinas eternas,",
          },
          {
            latim: "Cor Iesu, patiens et multae misericordiae,",
            portugues: "Coração de Jesus, paciente e misericordioso,",
          },
          {
            latim: "Cor Iesu, dives in omnes qui invocant te,",
            portugues: "Coração de Jesus, rico para todos os que vos invocam,",
          },
          {
            latim: "Cor Iesu, fons vitae et sanctitatis,",
            portugues: "Coração de Jesus, fonte de vida e santidade,",
          },
          {
            latim: "Cor Iesu, propitiatio pro peccatis nostris,",
            portugues: "Coração de Jesus, propiciação pelos nossos pecados,",
          },
          {
            latim: "Cor Iesu, saturatum opprobriis,",
            portugues: "Coração de Jesus, saturado de opróbrios,",
          },
          {
            latim: "Cor Iesu, attritum propter scelera nostra,",
            portugues: "Coração de Jesus, atribulado por causa de nossos crimes,",
          },
          {
            latim: "Cor Iesu, usque ad mortem obediens factum,",
            portugues: "Coração de Jesus, feito obediente até à morte,",
          },
          {
            latim: "Cor Iesu, lancea perforatum,",
            portugues: "Coração de Jesus, atravessado pela lança,",
          },
          {
            latim: "Cor Iesu, fons totius consolationis,",
            portugues: "Coração de Jesus, fonte de toda a consolação,",
          },
          {
            latim: "Cor Iesu, vita et resurrectio nostra,",
            portugues: "Coração de Jesus, nossa vida e ressurreição,",
          },
          {
            latim: "Cor Iesu, pax et reconciliatio nostra,",
            portugues: "Coração de Jesus, nossa paz e reconciliação,",
          },
          {
            latim: "Cor Iesu, victima peccatorum,",
            portugues: "Coração de Jesus, vítima dos pecadores,",
          },
          {
            latim: "Cor Iesu, salus in te sperantium,",
            portugues: "Coração de Jesus, salvação dos que esperam em vós,",
          },
          {
            latim: "Cor Iesu, spes in te morientium,",
            portugues: "Coração de Jesus, esperança dos que expiram em vós,",
          },
          {
            latim: "Cor Iesu, deliciae Sanctorum omnium,",
            portugues: "Coração de Jesus, delícia de todos os santos,",
          },
        ],
      },
      {
        invocacoes: [
          {
            latim: "Agnus Dei, qui tollis peccata mundi, parce nobis, Domine.",
            portugues:
              "Cordeiro de Deus, que tirais o pecado do mundo, perdoai-nos, Senhor.",
          },
          {
            latim: "Agnus Dei, qui tollis peccata mundi, exaudi nos, Domine.",
            portugues:
              "Cordeiro de Deus, que tirais o pecado do mundo, ouvi-nos, Senhor.",
          },
          {
            latim: "Agnus Dei, qui tollis peccata mundi, miserere nobis.",
            portugues:
              "Cordeiro de Deus, que tirais o pecado do mundo, tende piedade de nós.",
          },
        ],
      },
    ],
    fecho: {
      versiculo: {
        latim: "Iesu, mitis et humilis Corde,",
        portugues: "Jesus, manso e humilde de coração,",
      },
      responsorio: {
        latim: "Fac cor nostrum secundum Cor tuum.",
        portugues: "Fazei nosso coração semelhante ao vosso.",
      },
      oracao: {
        latim:
          "Oremus. Omnipotens sempiterne Deus, respice in Cor dilectissimi Filii tui, et in laudes et satisfactiones, quas in nomine peccatorum tibi persolvit, iisque misericordiam tuam petentibus, tu veniam concede placatus, in nomine eiusdem Filii tui Iesu Christi, qui tecum vivit et regnat in saecula saeculorum. Amen.",
        portugues:
          "Oremos. Deus onipotente e eterno, olhai para o Coração de vosso Filho diletíssimo e para os louvores e as satisfações que Ele, em nome dos pecadores, vos tributa; e aos que imploram a vossa misericórdia concedei benigno o perdão em nome do vosso mesmo Filho Jesus Cristo, que convosco vive e reina por todos os séculos dos séculos. Amém.",
      },
    },
    revisada: true,
    procedencia: DEVOCIONARIO,
  },
  {
    id: "jesus-vivente-em-maria",
    nome: "Ó Jesus vivente em Maria",
    proposito:
      "Fecha a terceira semana. Pede que Cristo viva em nós como viveu nela — que é o ponto de chegada de toda a preparação.",
    origem: "Oração da escola francesa de espiritualidade, século XVII",
    latim: [
      "O Iesu vivens in Maria,\nveni et vive in famulis tuis,\nin spiritu sanctitatis tuae,\nin plenitudine virtutis tuae,\nin perfectione viarum tuarum,\nin veritate virtutum tuarum,\nin communione mysteriorum tuorum;\ndominare omni adversae potestati\nin Spiritu tuo, ad gloriam Patris. Amen.",
    ],
    portugues: [
      "Ó Jesus, que viveis em Maria,\nvinde e vivei em vossos servos,\nno espírito da vossa santidade,\nna plenitude da vossa força,\nna perfeição dos vossos caminhos,\nna verdade das vossas virtudes,\nna comunhão dos vossos mistérios;\ndominai todo poder contrário\nno vosso Espírito, para glória do Pai. Amém.",
    ],
    revisada: false,
    procedencia: "Tradução própria a partir do latim.",
  },
] as const;

export function oracaoPorId(id: string): Oracao | null {
  return ORACOES.find((o) => o.id === id) ?? null;
}

/**
 * A fórmula da consagração.
 *
 * O texto de Montfort é de 1712 e está em domínio público no original
 * francês. Não o reproduzimos de memória: uma oração que alguém vai rezar
 * uma vez na vida não pode sair aproximada. Ela deve ser transcrita da
 * edição que a pessoa tem em mãos, ou de uma tradução conferida.
 */
export const FORMULA_PENDENTE = {
  aviso:
    "O texto da consagração será exibido aqui quando for transcrito e conferido contra uma edição impressa.",
  enquantoIsso:
    "No Grande Dia, leia a fórmula no seu exemplar do Tratado. Ela está nas páginas finais, depois do capítulo sobre as práticas exteriores.",
};
