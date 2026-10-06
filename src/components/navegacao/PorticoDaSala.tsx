import { Portico } from "./Portico";
import { PorticoPublico } from "./PorticoPublico";
import { clienteServidor, usuarioAtual } from "@/lib/supabase/servidor";
import { saudacao } from "@/lib/conta/saudacao";

/**
 * O pórtico certo para quem está olhando.
 *
 * Existe porque cada sala escolhia o seu, e as que esqueciam de escolher
 * mostravam o pórtico da rua a quem já estava dentro — com abas que levavam
 * de volta à vitrine. Quem entrou só volta à porta da rua ao sair.
 */
export async function PorticoDaSala({
  sobreImagem = false,
}: {
  /** Verdadeiro quando há fotografia por baixo e o pórtico deve flutuar. */
  sobreImagem?: boolean;
}) {
  const usuario = await usuarioAtual();
  if (!usuario) return <PorticoPublico sobreImagem={sobreImagem} />;

  const supabase = await clienteServidor();
  const { data: perfil } = await supabase
    .from("perfis")
    .select("nome, fuso")
    .eq("id", usuario.id)
    .maybeSingle<{ nome: string | null; fuso: string }>();

  return (
    <Portico
      autenticado
      saudacao={saudacao(perfil?.nome, perfil?.fuso ?? "America/Sao_Paulo")}
    />
  );
}
