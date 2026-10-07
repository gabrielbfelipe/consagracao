import {
  ANUNCIOS_LIGADOS,
  ESCONDER_DE_QUEM_ENTROU,
  ESPACOS,
  type Posicao,
} from "@/content/anuncios";
import { usuarioAtual } from "@/lib/supabase/servidor";
import { Espaco } from "@/components/anuncios/Espaco";

/**
 * Um espaço de publicidade, onde a página mandar.
 *
 * Decide no servidor, e por isso o HTML de quem não deve ver anúncio sai
 * sem anúncio nenhum — nem o retângulo vazio, nem o pedido à rede. É a
 * diferença entre esconder e não existir.
 *
 * Três motivos para não existir, nesta ordem:
 *   1. não há código de editor configurado (é o estado de hoje);
 *   2. aquele espaço ainda não tem bloco criado no AdSense;
 *   3. quem está a ver já entrou, e a casa não anuncia para quem entrou.
 *
 * A lista de salas onde isto nunca deve ser chamado está em content/anuncios.ts,
 * e um teste a guarda.
 */
export async function Anuncio({ posicao }: { posicao: Posicao }) {
  if (!ANUNCIOS_LIGADOS) return null;

  const espaco = ESPACOS[posicao];
  if (!espaco.unidade) return null;

  if (ESCONDER_DE_QUEM_ENTROU) {
    // Falha fechada: se a consulta à sessão der erro, não se mostra anúncio.
    // O contrário — mostrar na dúvida — poria publicidade diante de quem
    // pagou com o seu cadastro para não a ver.
    const usuario = await usuarioAtual().catch(() => null);
    if (usuario) return null;
  }

  return <Espaco unidade={espaco.unidade} formato={espaco.formato} />;
}
