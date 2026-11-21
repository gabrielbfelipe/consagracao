-- ============================================================================
-- Marcar passos do dia sem perder nenhum.
--
-- O DEFEITO
-- A aplicação lia a lista de passos do dia, acrescentava o novo e gravava a
-- lista inteira por cima. Duas marcações ao mesmo tempo liam a mesma lista
-- antiga, e a última a gravar apagava o passo da primeira. O dia ficava com
-- seis de sete passos e nunca contava como concluído — foi o que aconteceu
-- com um dia 17 percorrido até o fim.
--
-- A CORREÇÃO
-- A junção passa a acontecer dentro do banco, numa só instrução. O
-- INSERT ... ON CONFLICT DO UPDATE trava a linha do dia e junta os passos
-- novos à versão mais recente dela, de modo que marcações simultâneas se
-- enfileiram em vez de se apagarem. A conclusão é decidida aqui também, com
-- a lista já junta, e guarda o momento da primeira vez em que o dia fechou.
--
-- SEGURANÇA
-- security invoker: a função roda com as permissões de quem a chama, e a
-- política "progresso próprio" continua a decidir quem escreve em que
-- jornada. Ninguém marca passos na jornada de outra pessoa por aqui.
-- ============================================================================

create or replace function public.marcar_passos(
  p_jornada uuid,
  p_dia int,
  p_passos text[]
)
returns boolean
language plpgsql
security invoker
set search_path = ''
as $$
declare
  sete constant text[] := array[
    'prepare', 'leia', 'medite', 'reze', 'reflita', 'pratique', 'registre'
  ];
  concluido boolean;
begin
  if p_passos is null or not (p_passos <@ sete) then
    raise exception 'Passo inválido.' using errcode = '22023';
  end if;

  insert into public.progresso_dias as p (jornada_id, dia, passos, concluido_em)
  values (
    p_jornada,
    p_dia,
    array(select distinct x from unnest(p_passos) as x order by x),
    case when sete <@ p_passos then now() end
  )
  on conflict (jornada_id, dia) do update
    set passos = array(
          select distinct x
          from unnest(p.passos || excluded.passos) as x
          order by x
        ),
        concluido_em = case
          when sete <@ (p.passos || excluded.passos)
            then coalesce(p.concluido_em, now())
        end
  returning concluido_em is not null into concluido;

  return concluido;
end;
$$;

revoke all on function public.marcar_passos(uuid, int, text[]) from public, anon;
grant execute on function public.marcar_passos(uuid, int, text[]) to authenticated;

-- A API (PostgREST) guarda o esquema em cache. Sem este aviso, a função nova
-- pode levar um tempo para ser enxergada, e até lá a aplicação usa o caminho
-- de reserva — que funciona, mas não é imune a duas abas abertas.
notify pgrst, 'reload schema';
