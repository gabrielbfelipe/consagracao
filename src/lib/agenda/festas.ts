import {
  criarData,
  hojeEm,
  somarDias,
  type DataSimples,
} from "./dataSimples";
import { MODO_ENSAIO } from "@/lib/ensaio/modo";

/**
 * As celebrações marianas em que a consagração pode ser feita.
 *
 * Esta lista é fechada: a tradição de Montfort é consagrar-se numa festa de
 * Nossa Senhora, e o sistema só oferece estas datas. Todas são fixas no
 * calendário, de modo que a data só depende do ano.
 */

export type FestaId =
  | "santa-maria-mae-de-deus"
  | "apresentacao-do-senhor"
  | "nossa-senhora-de-lourdes"
  | "anunciacao"
  | "nossa-senhora-do-desterro"
  | "nossa-senhora-da-penha"
  | "nossa-senhora-do-bom-conselho"
  | "nossa-senhora-de-fatima"
  | "nossa-senhora-auxiliadora"
  | "visitacao"
  | "nossa-senhora-do-perpetuo-socorro"
  | "nossa-senhora-do-carmo"
  | "nossa-senhora-das-neves"
  | "assuncao"
  | "nossa-senhora-rainha"
  | "natividade-de-maria"
  | "nossa-senhora-das-dores"
  | "nossa-senhora-de-la-salette"
  | "nossa-senhora-do-rosario"
  | "nossa-senhora-aparecida"
  | "apresentacao-de-maria"
  | "nossa-senhora-das-gracas"
  | "imaculada-conceicao"
  | "nossa-senhora-de-guadalupe"
  // Não é festa de Nossa Senhora: é a data de ensaio, que só existe com
  // NEXT_PUBLIC_MODO_ENSAIO=1. Ver lib/ensaio/modo.ts.
  | "dia-de-ensaio";

/** Grau litúrgico, quando a celebração tem um no calendário romano. */
export type Grau = "solenidade" | "festa" | "memoria" | "memoria-facultativa" | "devocao";

export type Festa = {
  id: FestaId;
  nome: string;
  /** Títulos pelos quais a mesma celebração é conhecida. */
  tambemChamada?: string[];
  mes: number;
  dia: number;
  grau: Grau;
  /** Uma linha, para o cartão do calendário. */
  resumo: string;
  /** Para quem quer conhecer a celebração antes de escolher. */
  sobre: string;
  /** O que pesa na decisão: padroeira, feriado, ligação com Montfort. */
  nota?: string;
  /**
   * Verdadeiro só na data de ensaio, que não é celebração nenhuma e serve
   * para percorrer o sistema. Fica fora da lista quando o modo está
   * desligado, e a sua data é sempre daqui a trinta e três dias.
   */
  ensaio?: true;
};

export const FESTAS: readonly Festa[] = [
  {
    id: "santa-maria-mae-de-deus",
    nome: "Santa Maria, Mãe de Deus",
    mes: 1,
    dia: 1,
    grau: "solenidade",
    resumo: "O primeiro dia do ano confiado à maternidade divina de Maria.",
    sobre:
      "A Igreja abre o ano celebrando o título mais antigo e mais alto de Nossa Senhora, proclamado no Concílio de Éfeso em 431: Theotókos, aquela que gerou Deus feito homem. Consagrar-se nesta data é colocar o ano inteiro sob esse mistério.",
    nota: "A preparação atravessa o Advento e o Natal.",
  },
  {
    id: "apresentacao-do-senhor",
    nome: "Apresentação do Senhor",
    tambemChamada: ["Nossa Senhora das Candeias", "Nossa Senhora dos Navegantes"],
    mes: 2,
    dia: 2,
    grau: "festa",
    resumo: "Quarenta dias depois do Natal, a Luz é levada ao Templo.",
    sobre:
      "Maria e José apresentam o Menino no Templo, e o velho Simeão o reconhece como luz para iluminar as nações. Daí vêm as velas bentas e o nome Candeias. No Brasil, a mesma data é festejada como Nossa Senhora dos Navegantes.",
  },
  {
    id: "nossa-senhora-de-lourdes",
    nome: "Nossa Senhora de Lourdes",
    mes: 2,
    dia: 11,
    grau: "memoria",
    resumo: "“Eu sou a Imaculada Conceição”, disse a Senhora a Bernadete.",
    sobre:
      "Em 1858, numa gruta pobre no sul da França, Nossa Senhora apareceu dezoito vezes a uma menina de catorze anos que mal sabia ler. Lourdes é a festa dos doentes e dos pequenos, e das graças que chegam a quem não tem nada a oferecer.",
  },
  {
    id: "anunciacao",
    nome: "Anunciação do Senhor",
    mes: 3,
    dia: 25,
    grau: "solenidade",
    resumo: "O sim que abriu a porta da Encarnação.",
    sobre:
      "Nove meses antes do Natal, a Igreja celebra o momento em que o Verbo se fez carne no seio de Maria. Montfort volta sempre a este mistério: a Encarnação é o modelo de toda consagração, porque nele Deus quis depender de um sim humano.",
    nota: "Muito escolhida por quem segue Montfort de perto.",
  },
  {
    id: "nossa-senhora-do-desterro",
    nome: "Nossa Senhora do Desterro",
    mes: 4,
    dia: 2,
    grau: "devocao",
    resumo: "A Mãe que fugiu para o Egito carregando o Filho.",
    sobre:
      "Celebra a Sagrada Família refugiada em terra estrangeira, fugindo de Herodes. É a devoção de quem vive longe de casa, de quem precisou partir, e de quem se sente estrangeiro onde está.",
  },
  {
    id: "nossa-senhora-da-penha",
    nome: "Nossa Senhora da Penha",
    mes: 4,
    dia: 8,
    grau: "devocao",
    resumo: "A Senhora venerada no alto do rochedo.",
    sobre:
      "Devoção nascida na Espanha e trazida a Portugal e ao Brasil, onde ganhou santuários sobre penhascos — o mais conhecido em Vila Velha, no Espírito Santo. É a festa da subida: uma devoção de romeiros e de promessas cumpridas a pé.",
  },
  {
    id: "nossa-senhora-do-bom-conselho",
    nome: "Nossa Senhora do Bom Conselho",
    mes: 4,
    dia: 26,
    grau: "devocao",
    resumo: "A quem se recorre diante de uma decisão difícil.",
    sobre:
      "Devoção ligada ao antigo santuário de Genazzano, na Itália. Invoca-se Nossa Senhora como aquela que obtém do Espírito Santo o dom do conselho. Escolhida por quem chega à consagração em meio a uma decisão que ainda não sabe tomar.",
  },
  {
    id: "nossa-senhora-de-fatima",
    nome: "Nossa Senhora de Fátima",
    mes: 5,
    dia: 13,
    grau: "memoria",
    resumo: "O pedido de oração, penitência e conversão feito a três pastores.",
    sobre:
      "Entre maio e outubro de 1917, Nossa Senhora apareceu seis vezes na Cova da Iria a Lúcia, Francisco e Jacinta. Pediu o Rosário diário e prometeu que, no fim, o seu Imaculado Coração triunfaria.",
  },
  {
    id: "nossa-senhora-auxiliadora",
    nome: "Nossa Senhora Auxiliadora",
    mes: 5,
    dia: 24,
    grau: "devocao",
    resumo: "O socorro dos cristãos, título caro a Dom Bosco.",
    sobre:
      "Título antigo, ligado à proteção da Igreja em horas difíceis e difundido no mundo inteiro por Dom Bosco, que construiu em Turim a basílica dedicada a ela. É a devoção da confiança em meio à luta.",
  },
  {
    id: "visitacao",
    nome: "Visitação de Nossa Senhora",
    mes: 5,
    dia: 31,
    grau: "festa",
    resumo: "Maria atravessa as montanhas para servir, e canta o Magnificat.",
    sobre:
      "Grávida, Maria parte às pressas para ajudar a prima Isabel. É a primeira vez que leva Jesus a alguém, e é ali que entoa o Magnificat. Festa de quem entende a consagração como serviço.",
  },
  {
    id: "nossa-senhora-do-perpetuo-socorro",
    nome: "Nossa Senhora do Perpétuo Socorro",
    mes: 6,
    dia: 27,
    grau: "devocao",
    resumo: "O ícone em que o Menino olha para a cruz e busca a mão da Mãe.",
    sobre:
      "Ícone bizantino confiado aos redentoristas em 1866 e hoje difundido pelo mundo inteiro. Nele, o Menino vê os instrumentos da Paixão e se volta para a Mãe. É a devoção do socorro que não se cansa.",
  },
  {
    id: "nossa-senhora-do-carmo",
    nome: "Nossa Senhora do Carmo",
    mes: 7,
    dia: 16,
    grau: "memoria-facultativa",
    resumo: "A Senhora do escapulário e da vida escondida com Deus.",
    sobre:
      "Nascida da tradição dos eremitas do Monte Carmelo, é a festa do escapulário e da devoção silenciosa. Fala a quem deseja uma vida interior constante mais do que grandes gestos.",
  },
  {
    id: "nossa-senhora-das-neves",
    nome: "Nossa Senhora das Neves",
    mes: 8,
    dia: 5,
    grau: "memoria-facultativa",
    resumo: "A neve de agosto que marcou o chão de uma basílica em Roma.",
    sobre:
      "Dedicação da Basílica de Santa Maria Maior, a maior igreja mariana do Ocidente. Conta a tradição que a neve caiu em pleno verão romano para indicar onde ela seria construída.",
  },
  {
    id: "assuncao",
    nome: "Assunção de Nossa Senhora",
    mes: 8,
    dia: 15,
    grau: "solenidade",
    resumo: "Elevada em corpo e alma à glória do céu.",
    sobre:
      "Dogma proclamado em 1950, mas crença antiquíssima da Igreja. Celebra o destino que a consagração antecipa: pertencer inteiramente a Deus, corpo e alma. É a maior das solenidades marianas.",
  },
  {
    id: "nossa-senhora-rainha",
    nome: "Nossa Senhora Rainha",
    mes: 8,
    dia: 22,
    grau: "memoria",
    resumo: "Oito dias depois da Assunção, a coroação.",
    sobre:
      "Colocada no oitavo dia após a Assunção para mostrar que uma festa nasce da outra: quem foi elevada ao céu reina ali como mãe e intercessora, não como soberana distante.",
  },
  {
    id: "natividade-de-maria",
    nome: "Natividade de Nossa Senhora",
    mes: 9,
    dia: 8,
    grau: "festa",
    resumo: "O nascimento daquela por quem havia de vir a salvação.",
    sobre:
      "Nove meses depois da Imaculada Conceição, a Igreja celebra o nascimento de Maria. É uma das três datas de nascimento festejadas na liturgia, ao lado das de Jesus e de João Batista.",
  },
  {
    id: "nossa-senhora-das-dores",
    nome: "Nossa Senhora das Dores",
    mes: 9,
    dia: 15,
    grau: "memoria",
    resumo: "A Mãe de pé junto à cruz.",
    sobre:
      "No dia seguinte à Exaltação da Santa Cruz, contemplam-se as sete dores de Maria. Festa densa e consoladora para quem chega à consagração carregando um sofrimento.",
  },
  {
    id: "nossa-senhora-de-la-salette",
    nome: "Nossa Senhora de La Salette",
    mes: 9,
    dia: 19,
    grau: "devocao",
    resumo: "A Senhora que chorou diante de dois pastorinhos nos Alpes.",
    sobre:
      "Em 1846, numa montanha da França, Nossa Senhora apareceu chorando a Maximin e Mélanie, pedindo conversão e reconciliação. É a devoção da penitência e do retorno.",
  },
  {
    id: "nossa-senhora-do-rosario",
    nome: "Nossa Senhora do Rosário",
    mes: 10,
    dia: 7,
    grau: "memoria",
    resumo: "A oração que percorre a vida de Cristo pelos olhos de sua Mãe.",
    sobre:
      "Montfort foi um grande pregador do Rosário e o recomenda como alimento diário de quem se consagra. Escolher esta data é comprometer-se, desde o princípio, com essa oração.",
  },
  {
    id: "nossa-senhora-aparecida",
    nome: "Nossa Senhora da Conceição Aparecida",
    mes: 10,
    dia: 12,
    grau: "solenidade",
    resumo: "A imagem achada nas águas do Paraíba, padroeira do Brasil.",
    sobre:
      "Em 1717, três pescadores tiraram do rio Paraíba do Sul uma pequena imagem escurecida, primeiro o corpo, depois a cabeça. Dali nasceu a devoção que se tornou o coração religioso do Brasil.",
    nota: "Padroeira do Brasil e feriado nacional.",
  },
  {
    id: "apresentacao-de-maria",
    nome: "Apresentação de Nossa Senhora ao Templo",
    mes: 11,
    dia: 21,
    grau: "memoria",
    resumo: "A menina oferecida a Deus no Templo.",
    sobre:
      "Memória de raiz oriental que celebra a entrega de Maria a Deus desde a infância. É, em si mesma, uma festa da consagração: uma vida inteira colocada nas mãos do Senhor antes de qualquer mérito.",
  },
  {
    id: "nossa-senhora-das-gracas",
    nome: "Nossa Senhora das Graças",
    tambemChamada: ["Nossa Senhora da Medalha Milagrosa"],
    mes: 11,
    dia: 27,
    grau: "devocao",
    resumo: "“Ó Maria concebida sem pecado, rogai por nós que recorremos a vós.”",
    sobre:
      "Em 1830, em Paris, Nossa Senhora pediu a Santa Catarina Labouré que mandasse cunhar a medalha com raios de luz saindo de suas mãos — as graças que ela derrama sobre quem as pede. Ficou conhecida como Medalha Milagrosa.",
  },
  {
    id: "imaculada-conceicao",
    nome: "Imaculada Conceição",
    mes: 12,
    dia: 8,
    grau: "solenidade",
    resumo: "Preservada do pecado desde o primeiro instante.",
    sobre:
      "Dogma proclamado em 1854. Celebra a obra-prima da graça: uma criatura inteiramente pura desde o começo, não por força própria, mas pelos méritos de Cristo aplicados de antemão.",
    nota: "É a data mais escolhida para a consagração.",
  },
  {
    id: "nossa-senhora-de-guadalupe",
    nome: "Nossa Senhora de Guadalupe",
    mes: 12,
    dia: 12,
    grau: "festa",
    resumo: "A Senhora morena que falou na língua de Juan Diego.",
    sobre:
      "Em 1531, no monte Tepeyac, Nossa Senhora apareceu a um indígena recém-convertido, falou-lhe em náuatle e deixou sua imagem na tilma. É a festa do encontro entre povos.",
    nota: "Padroeira da América Latina.",
  },

  /* ----------------------------------------------------------------------
     A data de ensaio. Não é celebração nenhuma, e por isso vem depois das
     vinte e quatro, separada. Só aparece com NEXT_PUBLIC_MODO_ENSAIO=1.
     ---------------------------------------------------------------------- */
  {
    id: "dia-de-ensaio",
    ensaio: true,
    nome: "Dia de ensaio",
    // Ignorados: a data desta entrada é sempre hoje mais trinta e três.
    mes: 1,
    dia: 1,
    grau: "devocao",
    resumo: "Para percorrer o sistema sem esperar trinta e três dias.",
    sobre:
      "Esta não é uma festa de Nossa Senhora, e não serve para a consagração. É uma data de ensaio: a preparação começa hoje, e os controles de ensaio permitem andar de dia em dia até o fim para conferir o funcionamento do sistema.",
    nota: "Visível apenas com o modo de ensaio ligado.",
  },
] as const;

/**
 * As vinte e quatro celebrações marianas, sem a data de ensaio.
 *
 * É esta a lista que o calendário mostra quando o modo de ensaio está
 * desligado — o padrão. A regra continua inteira: só se consagra numa festa
 * de Nossa Senhora.
 */
export const FESTAS_REAIS = FESTAS.filter((f) => !f.ensaio);

/** O que o calendário deve oferecer agora, conforme o modo de ensaio. */
export const FESTAS_OFERECIDAS = MODO_ENSAIO ? FESTAS : FESTAS_REAIS;

const POR_ID = new Map(FESTAS.map((f) => [f.id, f]));

export function festaPorId(id: FestaId): Festa {
  const f = POR_ID.get(id);
  if (!f) throw new RangeError(`Festa desconhecida: ${id}`);
  return f;
}

/**
 * A data em que a festa cai num determinado ano.
 *
 * A data de ensaio é a exceção: ela não tem dia no calendário, é sempre
 * daqui a trinta e três dias, para que a preparação comece hoje — hoje e em
 * qualquer dia em que alguém a abra. O ano é ignorado nela, de propósito.
 */
export function dataDaFesta(festa: Festa, ano: number): DataSimples {
  if (festa.ensaio) return somarDias(hojeEm("America/Sao_Paulo"), 33);
  return criarData(ano, festa.mes, festa.dia);
}

export type Ocorrencia = { festa: Festa; data: DataSimples };

/** Todas as festas de um ano, em ordem de calendário. */
export function festasDoAno(ano: number): Ocorrencia[] {
  return FESTAS.map((festa) => ({ festa, data: dataDaFesta(festa, ano) })).sort(
    (a, b) => a.data.localeCompare(b.data),
  );
}

/**
 * As próximas ocorrências a partir de uma data, atravessando a virada do ano.
 * Quem abre o app em novembro precisa ver dezembro e também janeiro seguinte.
 */
export function proximasFestas(de: DataSimples, quantidade = 12): Ocorrencia[] {
  const anoBase = Number(de.slice(0, 4));
  return [anoBase, anoBase + 1, anoBase + 2]
    .flatMap(festasDoAno)
    .filter((o) => o.data >= de)
    .slice(0, quantidade);
}
