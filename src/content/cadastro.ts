/**
 * As perguntas do cadastro.
 *
 * Uma só fonte para o formulário e para a validação no servidor: a lista de
 * opções que a tela mostra é a mesma que o servidor aceita, de modo que não
 * há como as duas se desencontrarem.
 *
 * O critério para entrar aqui foi um só: a pessoa tem de saber responder de
 * cabeça, sem procurar nada. Por isso a diocese é texto livre e não lista
 * fechada — quem sabe o nome escreve, quem não sabe deixa em branco e segue.
 * Nada além do nome é obrigatório.
 *
 * LGPD: reunidos, estes campos descrevem convicção religiosa, que o art. 5º,
 * II trata como dado sensível. É por isso que o consentimento é colhido na
 * mesma tela, e não depois.
 */

export type Opcao = { valor: string; rotulo: string };

export type Pergunta = {
  /** Nome do campo, igual ao da coluna em public.perfis. */
  nome: string;
  rotulo: string;
  /** Uma linha abaixo do rótulo, quando ajuda a responder sem hesitar. */
  ajuda?: string;
  /** Sem opções, é campo de texto. */
  opcoes?: readonly Opcao[];
  /** Quantas colunas o campo ocupa na grade de duas. */
  largura?: "inteira" | "metade";
  maximo?: number;
  autoComplete?: string;
};

export const UFS = [
  "AC", "AL", "AM", "AP", "BA", "CE", "DF", "ES", "GO", "MA",
  "MG", "MS", "MT", "PA", "PB", "PE", "PI", "PR", "RJ", "RN",
  "RO", "RR", "RS", "SC", "SE", "SP", "TO",
] as const;

/**
 * O que o sistema precisa para funcionar: como chamar a pessoa, e em que
 * fuso ela vive — porque é o fuso que decide quando um dia da jornada
 * começa e termina para ela.
 */
export const IDENTIFICACAO: readonly Pergunta[] = [
  {
    nome: "nome",
    rotulo: "Como você quer ser chamado?",
    ajuda: "É o nome com que o sistema vai falar com você.",
    largura: "inteira",
    maximo: 120,
    autoComplete: "given-name",
  },
] as const;

/**
 * As perguntas eclesiais. Todas opcionais, todas de resposta imediata.
 */
export const PERGUNTAS: readonly Pergunta[] = [
  {
    nome: "diocese",
    rotulo: "Sua diocese",
    ajuda: "Se não souber de cabeça, deixe em branco. Dá para preencher depois.",
    largura: "metade",
    maximo: 120,
  },
  {
    nome: "paroquia",
    rotulo: "Sua paróquia",
    largura: "metade",
    maximo: 120,
  },
  {
    nome: "uf",
    rotulo: "Estado",
    largura: "metade",
    opcoes: UFS.map((uf) => ({ valor: uf, rotulo: uf })),
  },
  {
    nome: "faixa_etaria",
    rotulo: "Sua faixa de idade",
    largura: "metade",
    opcoes: [
      { valor: "ate-17", rotulo: "Até 17 anos" },
      { valor: "18-24", rotulo: "18 a 24" },
      { valor: "25-34", rotulo: "25 a 34" },
      { valor: "35-49", rotulo: "35 a 49" },
      { valor: "50-64", rotulo: "50 a 64" },
      { valor: "65-mais", rotulo: "65 ou mais" },
    ],
  },
  {
    nome: "estado_de_vida",
    rotulo: "Seu estado de vida",
    largura: "metade",
    opcoes: [
      { valor: "solteiro", rotulo: "Solteiro(a)" },
      { valor: "noivo", rotulo: "Noivo(a)" },
      { valor: "casado", rotulo: "Casado(a)" },
      { valor: "viuvo", rotulo: "Viúvo(a)" },
      { valor: "seminarista", rotulo: "Seminarista" },
      { valor: "religioso", rotulo: "Religioso(a)" },
      { valor: "diacono", rotulo: "Diácono" },
      { valor: "sacerdote", rotulo: "Sacerdote" },
    ],
  },
  {
    nome: "ja_se_consagrou",
    rotulo: "Já fez a consagração alguma vez?",
    ajuda: "Quem já fez está renovando, e o caminho tem outro sabor.",
    largura: "metade",
    opcoes: [
      { valor: "nao", rotulo: "Será a primeira vez" },
      { valor: "sim", rotulo: "Já fiz, vou renovar" },
    ],
  },
  {
    nome: "frequencia_missa",
    rotulo: "Com que frequência vai à missa?",
    ajuda: "Não há resposta certa. Serve para entendermos quem chega aqui.",
    largura: "metade",
    opcoes: [
      { valor: "diaria", rotulo: "Quase todo dia" },
      { valor: "semanal", rotulo: "Todo domingo" },
      { valor: "as-vezes", rotulo: "De vez em quando" },
      { valor: "raramente", rotulo: "Raramente" },
    ],
  },
  {
    nome: "reza_terco",
    rotulo: "Você reza o terço?",
    largura: "metade",
    opcoes: [
      { valor: "diario", rotulo: "Todo dia" },
      { valor: "as-vezes", rotulo: "Às vezes" },
      { valor: "ainda-nao", rotulo: "Ainda não" },
    ],
  },
  {
    nome: "movimento",
    rotulo: "Participa de alguma pastoral, movimento ou comunidade?",
    ajuda: "Escreva do seu jeito. Em branco também é resposta.",
    largura: "inteira",
    maximo: 120,
  },
  {
    nome: "como_conheceu",
    rotulo: "Como chegou até aqui?",
    largura: "metade",
    opcoes: [
      { valor: "busca", rotulo: "Procurando na internet" },
      { valor: "amigo", rotulo: "Alguém me indicou" },
      { valor: "paroquia", rotulo: "Pela paróquia" },
      { valor: "rede-social", rotulo: "Por uma rede social" },
      { valor: "outro", rotulo: "De outro jeito" },
    ],
  },
] as const;

/** Toda pergunta de lista fechada, pelo nome do campo. */
const LISTAS = new Map(
  [...IDENTIFICACAO, ...PERGUNTAS]
    .filter((p) => p.opcoes)
    .map((p) => [p.nome, p.opcoes!.map((o) => o.valor)]),
);

/**
 * Devolve o valor se ele estiver na lista daquela pergunta, e null caso
 * contrário. Campo vazio vira null: o banco guarda ausência, não "".
 */
export function valorDeLista(nome: string, bruto: unknown): string | null {
  const valores = LISTAS.get(nome);
  if (!valores) return null;
  const v = String(bruto ?? "").trim();
  return valores.includes(v) ? v : null;
}

/** Texto aparado e limitado ao tamanho da coluna, ou null se vazio. */
export function valorDeTexto(bruto: unknown, maximo = 120): string | null {
  const v = String(bruto ?? "")
    .trim()
    .slice(0, maximo);
  return v || null;
}
