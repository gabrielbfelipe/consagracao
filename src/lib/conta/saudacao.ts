/**
 * Como o sistema cumprimenta quem chegou.
 *
 * A hora é a do fuso da pessoa, não a do servidor. Um servidor em UTC diria
 * "boa noite" às seis da tarde em São Paulo, e esse é exatamente o tipo de
 * detalhe que faz um sistema parecer que não está falando com ninguém.
 */

export type Periodo = "manha" | "tarde" | "noite";

/**
 * O período do dia no fuso informado.
 *
 * As fronteiras são as de sempre: a tarde começa ao meio-dia e a noite às
 * dezoito horas. A madrugada cai na manhã, e não na noite — às três da
 * manhã "bom dia" soa estranho, mas "boa noite" em português é despedida, e
 * despedir-se de quem acabou de chegar é pior.
 */
export function periodoEm(fuso: string, agora: Date = new Date()): Periodo {
  const hora = horaEm(fuso, agora);
  if (hora < 12) return "manha";
  if (hora < 18) return "tarde";
  return "noite";
}

const COMO_SE_DIZ: Record<Periodo, string> = {
  manha: "Bom dia",
  tarde: "Boa tarde",
  noite: "Boa noite",
};

/**
 * "Boa tarde, Gabriel" — ou só "Boa tarde", para quem não deu nome.
 *
 * Nunca devolve pontuação final: quem chama decide se vem vírgula, ponto ou
 * um travessão depois.
 */
export function saudacao(
  nome: string | null | undefined,
  fuso: string,
  agora: Date = new Date(),
): string {
  const corpo = COMO_SE_DIZ[periodoEm(fuso, agora)];
  const chamado = primeiroNome(nome);
  return chamado ? `${corpo}, ${chamado}` : corpo;
}

/**
 * O primeiro nome, que é por onde se chama alguém.
 *
 * Quem escreveu o nome inteiro no cadastro não quer ser saudado com ele
 * todos os dias. Partículas ficam de fora: "de Souza" não é nome de chamar.
 */
export function primeiroNome(nome: string | null | undefined): string | null {
  const limpo = (nome ?? "").trim().replace(/\s+/g, " ");
  if (!limpo) return null;
  return limpo.split(" ")[0];
}

/** A hora cheia (0 a 23) naquele fuso. */
function horaEm(fuso: string, agora: Date): number {
  try {
    const hora = new Intl.DateTimeFormat("pt-BR", {
      timeZone: fuso,
      hour: "numeric",
      hour12: false,
    }).format(agora);
    // "24" aparece em algumas plataformas para a meia-noite.
    return Number(hora) % 24;
  } catch {
    // Fuso inválido guardado no perfil não deve derrubar a página.
    return agora.getHours();
  }
}
