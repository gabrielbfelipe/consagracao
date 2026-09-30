/**
 * As orações da preparação.
 *
 * SOBRE AS FONTES
 * Os hinos latinos são anteriores a qualquer direito autoral e estão em
 * domínio público. As traduções para o português, porém, pertencem a quem
 * as fez — por isso as daqui são traduções próprias, feitas para este
 * aplicativo, e não cópias de missais ou devocionários.
 *
 * Toda tradução abaixo está marcada `revisada: false`. Nenhuma deve ir ao ar
 * sem passar por quem saiba latim e por um sacerdote.
 */

export type Oracao = {
  id: string;
  nome: string;
  /** Quando rezá-la e por quê. */
  proposito: string;
  /** Século e origem, quando conhecidos. */
  origem?: string;
  /** Original em latim, quando existe. */
  latim?: string[];
  portugues: string[];
  /** Falso enquanto a tradução não passou por revisão. */
  revisada: boolean;
  /** De onde veio o texto português. */
  procedencia: string;
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
      "Qui diceris Paraclitus,\naltissimi donum Dei,\nfons vivus, ignis, caritas,\net spiritalis unctio.",
      "Tu septiformis munere,\ndigitus paternae dexterae,\ntu rite promissum Patris,\nsermone ditans guttura.",
      "Accende lumen sensibus,\ninfunde amorem cordibus,\ninfirma nostri corporis\nvirtute firmans perpeti.",
      "Hostem repellas longius,\npacemque dones protinus;\nductore sic te praevio\nvitemus omne noxium.",
      "Per te sciamus da Patrem,\nnoscamus atque Filium,\nteque utriusque Spiritum\ncredamus omni tempore.",
      "Deo Patri sit gloria,\net Filio, qui a mortuis\nsurrexit, ac Paraclito,\nin saeculorum saecula. Amen.",
    ],
    portugues: [
      "Vinde, Espírito Criador,\nvisitai as almas dos vossos,\nenchei da graça do alto\nos peitos que criastes.",
      "Vós que sois chamado Consolador,\ndom do Deus altíssimo,\nfonte viva, fogo, caridade\ne unção espiritual.",
      "Vós, que sois sete vezes dom,\ndedo da mão direita do Pai,\nvós, prometido pelo Pai,\nque enriqueceis a boca com a palavra.",
      "Acendei uma luz nos sentidos,\nderramai o amor nos corações,\ne o que há de fraco em nosso corpo\nfirmai com força que não passa.",
      "Afastai para longe o inimigo,\ndai-nos a paz sem demora;\nindo vós à frente como guia,\nque evitemos todo mal.",
      "Concedei que por vós conheçamos o Pai,\ne que conheçamos também o Filho,\ne que em vós, Espírito de ambos,\ncreiamos em todo tempo.",
      "Glória a Deus Pai,\ne ao Filho, que dos mortos\nressurgiu, e ao Consolador,\npelos séculos dos séculos. Amém.",
    ],
    revisada: false,
    procedencia: "Tradução própria a partir do latim.",
  },
  {
    id: "ave-maris-stella",
    nome: "Ave, Estrela do Mar",
    proposito:
      "Atravessa os trinta e três dias. Pede caminho seguro a quem navega — que é a imagem de toda esta preparação.",
    origem: "Hino do século VIII ou IX, de autor desconhecido",
    latim: [
      "Ave, maris stella,\nDei Mater alma,\natque semper Virgo,\nfelix caeli porta.",
      "Sumens illud «Ave»\nGabrielis ore,\nfunda nos in pace,\nmutans Hevae nomen.",
      "Solve vincla reis,\nprofer lumen caecis,\nmala nostra pelle,\nbona cuncta posce.",
      "Monstra te esse matrem,\nsumat per te preces\nqui pro nobis natus\ntulit esse tuus.",
      "Virgo singularis,\ninter omnes mitis,\nnos culpis solutos\nmites fac et castos.",
      "Vitam praesta puram,\niter para tutum,\nut videntes Iesum\nsemper collaetemur.",
      "Sit laus Deo Patri,\nsummo Christo decus,\nSpiritui Sancto\ntribus honor unus. Amen.",
    ],
    portugues: [
      "Ave, estrela do mar,\nMãe de Deus que alimenta,\ne sempre Virgem,\nditosa porta do céu.",
      "Recebendo aquele «Ave»\nda boca de Gabriel,\nfirmai-nos na paz,\nmudando o nome de Eva.",
      "Soltai as cadeias dos culpados,\ntrazei luz aos cegos,\nafastai os nossos males,\npedi para nós todo bem.",
      "Mostrai que sois mãe:\nreceba por vós as preces\naquele que, nascido por nós,\nquis ser vosso filho.",
      "Virgem única,\nmansa entre todas,\nlivres das culpas,\nfazei-nos mansos e puros.",
      "Dai-nos uma vida limpa,\npreparai um caminho seguro,\npara que, vendo Jesus,\nnos alegremos para sempre.",
      "Louvor a Deus Pai,\nglória a Cristo altíssimo,\ne ao Espírito Santo:\naos três, uma só honra. Amém.",
    ],
    revisada: false,
    procedencia: "Tradução própria a partir do latim.",
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
