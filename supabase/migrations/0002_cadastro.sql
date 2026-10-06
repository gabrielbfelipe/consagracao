-- ===========================================================================
-- Cadastro: quem é a pessoa, e os poucos dados eclesiais que pedimos
--
-- Tudo aqui é opcional menos o nome. São perguntas de resposta fácil, para
-- saber de onde vem quem usa o sistema — diocese, estado, estado de vida —
-- e nada que obrigue alguém a procurar informação que não tem à mão.
--
-- LGPD: estes campos, somados, descrevem convicção religiosa, que o art. 5º,
-- II trata como dado sensível. Por isso o consentimento continua a ser
-- condição para que qualquer coisa seja guardada, e passa a ser colhido no
-- próprio cadastro, que é onde os dados nascem.
-- ===========================================================================

alter table public.perfis
  -- Onde a pessoa reza. A diocese é o recorte que interessa de verdade;
  -- a paróquia vem junto porque quem sabe uma costuma saber a outra.
  add column diocese text,
  add column paroquia text,
  -- Unidade da federação, em duas letras, ou nulo para quem está fora.
  add column uf text check (uf is null or uf ~ '^[A-Z]{2}$'),
  add column pais text not null default 'BR',

  add column faixa_etaria text check (faixa_etaria in (
    'ate-17', '18-24', '25-34', '35-49', '50-64', '65-mais'
  )),

  add column estado_de_vida text check (estado_de_vida in (
    'solteiro', 'noivo', 'casado', 'viuvo',
    'seminarista', 'religioso', 'diacono', 'sacerdote'
  )),

  -- Já se consagrou antes? Muda o sentido da jornada: é primeira vez ou
  -- renovação.
  add column ja_se_consagrou boolean,

  add column frequencia_missa text check (frequencia_missa in (
    'diaria', 'semanal', 'as-vezes', 'raramente'
  )),

  add column reza_terco text check (reza_terco in (
    'diario', 'as-vezes', 'ainda-nao'
  )),

  -- Pastoral, movimento, comunidade. Texto livre: a variedade é grande
  -- demais para uma lista fechada não ofender ninguém por omissão.
  add column movimento text,

  add column como_conheceu text check (como_conheceu in (
    'busca', 'amigo', 'paroquia', 'rede-social', 'outro'
  ));

comment on column public.perfis.diocese is
  'Diocese ou arquidiocese informada pela pessoa, em texto livre.';
comment on column public.perfis.ja_se_consagrou is
  'Verdadeiro quando esta não é a primeira consagração, mas uma renovação.';

-- O perfil nasce junto com o usuário, já com o que veio do cadastro. Assim
-- não existe instante em que a conta exista e o perfil não, e o cliente não
-- precisa de uma segunda escrita que poderia falhar sozinha.
create or replace function public.criar_perfil()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
  dados jsonb := coalesce(new.raw_user_meta_data, '{}'::jsonb);
begin
  insert into public.perfis (
    id, nome, fuso, consentimento_em,
    diocese, paroquia, uf, pais,
    faixa_etaria, estado_de_vida, ja_se_consagrou,
    frequencia_missa, reza_terco, movimento, como_conheceu
  )
  values (
    new.id,
    nullif(dados ->> 'nome', ''),
    coalesce(nullif(dados ->> 'fuso', ''), 'America/Sao_Paulo'),
    -- Só carimba o consentimento se o cadastro disse que houve.
    case when dados ->> 'consentimento' = 'sim' then now() end,
    nullif(dados ->> 'diocese', ''),
    nullif(dados ->> 'paroquia', ''),
    nullif(dados ->> 'uf', ''),
    coalesce(nullif(dados ->> 'pais', ''), 'BR'),
    nullif(dados ->> 'faixa_etaria', ''),
    nullif(dados ->> 'estado_de_vida', ''),
    case
      when dados ->> 'ja_se_consagrou' = 'sim' then true
      when dados ->> 'ja_se_consagrou' = 'nao' then false
    end,
    nullif(dados ->> 'frequencia_missa', ''),
    nullif(dados ->> 'reza_terco', ''),
    nullif(dados ->> 'movimento', ''),
    nullif(dados ->> 'como_conheceu', '')
  )
  on conflict (id) do nothing;
  return new;
end;
$$;
