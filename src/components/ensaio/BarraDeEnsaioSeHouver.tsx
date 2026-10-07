import { DIA_DA_CONSAGRACAO, MODO_ENSAIO } from "@/lib/ensaio/modo";
import { jornadaAtual } from "@/lib/jornada/repositorio";
import { BarraDeEnsaio } from "./BarraDeEnsaio";

/**
 * Põe a régua do ensaio em todas as telas, quando há o que ensaiar.
 *
 * Fica no layout de propósito: a jornada atravessa muitas páginas — caminho,
 * dia, carta, grande dia, diário — e ter de lembrar de acrescentar a barra em
 * cada uma seria garantir que uma ficasse de fora justamente na hora de
 * conferi-la.
 *
 * Com o modo desligado sai antes de qualquer consulta ao banco, de modo que
 * não custa nada a quem não está ensaiando — que é todo mundo, em produção.
 */
export async function BarraDeEnsaioSeHouver() {
  if (!MODO_ENSAIO) return null;

  const jornada = await jornadaAtual().catch(() => null);
  if (!jornada?.festa.ensaio) return null;

  const s = jornada.situacao;
  const dia =
    s.fase === "em-curso"
      ? s.dia
      : s.fase === "aguardando"
        ? 1
        : DIA_DA_CONSAGRACAO;

  return (
    <>
      {/* A régua é fixa no pé da tela, e sem isto taparia o fim de páginas
          que terminam rente ao rodapé. Este espaço entra no fluxo normal
          para que o fim da página possa rolar acima dela. */}
      <div aria-hidden className="h-24 shrink-0" />
      <BarraDeEnsaio diaAtual={dia} />
    </>
  );
}
