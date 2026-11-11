import { criarData, type DataSimples } from "./dataSimples";
import { dataMovel, type RegraMovel } from "./pascoa";

/**
 * As celebrações marianas em que a consagração pode ser feita.
 *
 * Esta lista é fechada: a tradição de Montfort é consagrar-se numa festa de
 * Nossa Senhora, e o sistema só oferece estas datas.
 *
 * SOBRE AS DATAS
 * Vinte e três caem em dia fixo de calendário, de modo que só dependem do
 * ano. Uma não: Nossa Senhora da Penha, padroeira do Espírito Santo, cai na
 * segunda-feira que fecha o oitavário da Páscoa, e anda até um mês de um
 * ano para o outro. Por isso há duas formas de dizer quando uma festa cai,
 * e `dataDaFesta` é o único lugar que precisa saber a diferença.
 *
 * ONDE ESTÁ O TEXTO DE CADA UMA
 * Em content/festas.ts. Aqui fica só o que o calendário precisa para
 * calcular — o resto é prosa, e prosa não pertence a um módulo de datas.
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
  | "nossa-senhora-de-guadalupe";

/** Grau litúrgico, quando a celebração tem um no calendário romano. */
export type Grau =
  | "solenidade"
  | "festa"
  | "memoria"
  | "memoria-facultativa"
  | "devocao";

/**
 * Quando a festa cai: ou num dia de calendário, ou por regra ligada à
 * Páscoa. Os campos se excluem, e o tipo não deixa escrever os dois.
 */
export type Quando =
  | { mes: number; dia: number; movel?: undefined }
  | { mes?: undefined; dia?: undefined; movel: RegraMovel };

export type Festa = {
  id: FestaId;
  nome: string;
  /** Títulos pelos quais a mesma celebração é conhecida. */
  tambemChamada?: string[];
  grau: Grau;
  /** Uma linha, para o cartão do calendário. */
  resumo: string;
  /** O que pesa na decisão: padroeira, feriado, ligação com Montfort. */
  nota?: string;
} & Quando;

export const FESTAS: readonly Festa[] = [
  {
    id: "santa-maria-mae-de-deus",
    nome: "Santa Maria, Mãe de Deus",
    mes: 1,
    dia: 1,
    grau: "solenidade",
    resumo: "O primeiro dia do ano confiado à maternidade divina de Maria.",
    nota: "A preparação atravessa o Advento e o Natal.",
  },
  {
    id: "apresentacao-do-senhor",
    nome: "Apresentação do Senhor",
    tambemChamada: [
      "Nossa Senhora das Candeias",
      "Nossa Senhora dos Navegantes",
    ],
    mes: 2,
    dia: 2,
    grau: "festa",
    resumo: "Quarenta dias depois do Natal, a Luz é levada ao Templo.",
  },
  {
    id: "nossa-senhora-de-lourdes",
    nome: "Nossa Senhora de Lourdes",
    mes: 2,
    dia: 11,
    grau: "memoria",
    resumo: "“Eu sou a Imaculada Conceição”, disse a Senhora a Bernadete.",
    nota: "É também o Dia Mundial do Doente.",
  },
  {
    /**
     * A data estava em 2 de abril, que vinha da Wikipédia. A Arquidiocese
     * de Florianópolis, que é a casa desta devoção, celebra a padroeira em
     * 17 de fevereiro — e é essa que vale.
     */
    id: "nossa-senhora-do-desterro",
    nome: "Nossa Senhora do Desterro",
    mes: 2,
    dia: 17,
    grau: "devocao",
    resumo: "A Mãe que fugiu para o Egito carregando o Filho.",
    nota: "Padroeira de Florianópolis.",
  },
  {
    id: "anunciacao",
    nome: "Anunciação do Senhor",
    mes: 3,
    dia: 25,
    grau: "solenidade",
    resumo: "O sim que abriu a porta da Encarnação.",
    nota: "Muito escolhida por quem segue Montfort de perto.",
  },
  {
    /**
     * A única móvel da lista. Estava com 8 de abril, que não é a data em
     * ano nenhum: em 2025 a festa caiu em 28 de abril e em 2026 em 13 de
     * abril, como o próprio Convento da Penha publicou.
     */
    id: "nossa-senhora-da-penha",
    nome: "Nossa Senhora da Penha",
    movel: "segunda-depois-do-oitavario-da-pascoa",
    grau: "devocao",
    resumo: "A Senhora venerada no alto do rochedo, padroeira capixaba.",
    nota: "Data móvel: cai sempre oito dias depois do Domingo de Páscoa.",
  },
  {
    id: "nossa-senhora-do-bom-conselho",
    nome: "Nossa Senhora do Bom Conselho",
    mes: 4,
    dia: 26,
    grau: "devocao",
    resumo: "A quem se recorre diante de uma decisão difícil.",
  },
  {
    id: "nossa-senhora-de-fatima",
    nome: "Nossa Senhora de Fátima",
    mes: 5,
    dia: 13,
    grau: "memoria",
    resumo: "O pedido de oração, penitência e conversão feito a três pastores.",
  },
  {
    id: "nossa-senhora-auxiliadora",
    nome: "Nossa Senhora Auxiliadora",
    mes: 5,
    dia: 24,
    grau: "devocao",
    resumo: "O socorro dos cristãos, título caro a Dom Bosco.",
  },
  {
    id: "visitacao",
    nome: "Visitação de Nossa Senhora",
    mes: 5,
    dia: 31,
    grau: "festa",
    resumo: "Maria atravessa as montanhas para servir, e canta o Magnificat.",
  },
  {
    id: "nossa-senhora-do-perpetuo-socorro",
    nome: "Nossa Senhora do Perpétuo Socorro",
    mes: 6,
    dia: 27,
    grau: "devocao",
    resumo: "O ícone em que o Menino olha para a cruz e busca a mão da Mãe.",
  },
  {
    id: "nossa-senhora-do-carmo",
    nome: "Nossa Senhora do Carmo",
    mes: 7,
    dia: 16,
    grau: "memoria-facultativa",
    resumo: "A Senhora do escapulário e da vida escondida com Deus.",
  },
  {
    id: "nossa-senhora-das-neves",
    nome: "Nossa Senhora das Neves",
    mes: 8,
    dia: 5,
    grau: "memoria-facultativa",
    resumo: "A dedicação de Santa Maria Maior, a mais antiga igreja mariana.",
  },
  {
    id: "assuncao",
    nome: "Assunção de Nossa Senhora",
    mes: 8,
    dia: 15,
    grau: "solenidade",
    resumo: "Elevada em corpo e alma à glória do céu.",
  },
  {
    id: "nossa-senhora-rainha",
    nome: "Nossa Senhora Rainha",
    mes: 8,
    dia: 22,
    grau: "memoria",
    resumo: "Oito dias depois da Assunção, a coroação.",
  },
  {
    id: "natividade-de-maria",
    nome: "Natividade de Nossa Senhora",
    mes: 9,
    dia: 8,
    grau: "festa",
    resumo: "O nascimento daquela por quem havia de vir a salvação.",
  },
  {
    id: "nossa-senhora-das-dores",
    nome: "Nossa Senhora das Dores",
    mes: 9,
    dia: 15,
    grau: "memoria",
    resumo: "A Mãe de pé junto à cruz.",
  },
  {
    id: "nossa-senhora-de-la-salette",
    nome: "Nossa Senhora de La Salette",
    mes: 9,
    dia: 19,
    grau: "devocao",
    resumo: "A Senhora que chorou diante de dois pastorinhos nos Alpes.",
  },
  {
    id: "nossa-senhora-do-rosario",
    nome: "Nossa Senhora do Rosário",
    mes: 10,
    dia: 7,
    grau: "memoria",
    resumo: "A oração que percorre a vida de Cristo pelos olhos de sua Mãe.",
  },
  {
    id: "nossa-senhora-aparecida",
    nome: "Nossa Senhora da Conceição Aparecida",
    mes: 10,
    dia: 12,
    grau: "solenidade",
    resumo: "A imagem achada nas águas do Paraíba, padroeira do Brasil.",
    nota: "Padroeira do Brasil e feriado nacional.",
  },
  {
    id: "apresentacao-de-maria",
    nome: "Apresentação de Nossa Senhora ao Templo",
    mes: 11,
    dia: 21,
    grau: "memoria",
    resumo: "A menina oferecida a Deus no Templo.",
  },
  {
    id: "nossa-senhora-das-gracas",
    nome: "Nossa Senhora das Graças",
    tambemChamada: ["Nossa Senhora da Medalha Milagrosa"],
    mes: 11,
    dia: 27,
    grau: "devocao",
    resumo:
      "“Ó Maria concebida sem pecado, rogai por nós que recorremos a vós.”",
  },
  {
    id: "imaculada-conceicao",
    nome: "Imaculada Conceição",
    mes: 12,
    dia: 8,
    grau: "solenidade",
    resumo: "Preservada do pecado desde o primeiro instante.",
    nota: "É a data mais escolhida para a consagração.",
  },
  {
    id: "nossa-senhora-de-guadalupe",
    nome: "Nossa Senhora de Guadalupe",
    mes: 12,
    dia: 12,
    grau: "festa",
    resumo: "A Senhora morena que falou na língua de Juan Diego.",
    nota: "Padroeira de todo o continente americano.",
  },
] as const;

const POR_ID = new Map(FESTAS.map((f) => [f.id, f]));

export function festaPorId(id: FestaId): Festa {
  const f = POR_ID.get(id);
  if (!f) throw new RangeError(`Festa desconhecida: ${id}`);
  return f;
}

/** A data em que a festa cai num determinado ano. */
export function dataDaFesta(festa: Festa, ano: number): DataSimples {
  if (festa.movel !== undefined) return dataMovel(festa.movel, ano);
  return criarData(ano, festa.mes, festa.dia);
}

/**
 * O ano em que a festa cai da próxima vez, contado a partir de uma data.
 *
 * Serve à página de cada festa, que precisa de um ano padrão quando nenhum
 * foi pedido. O ano corrente não serve: em novembro, vinte das vinte e
 * quatro datas já passaram, e a página anunciava uma consagração vencida.
 * A festa do próprio dia de hoje ainda conta como próxima — quem a abre
 * hoje de manhã não quer ser mandado para o ano que vem.
 */
export function anoDaProximaOcorrencia(festa: Festa, de: DataSimples): number {
  const anoBase = Number(de.slice(0, 4));
  return dataDaFesta(festa, anoBase) >= de ? anoBase : anoBase + 1;
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
