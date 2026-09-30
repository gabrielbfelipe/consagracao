-- ===========================================================================
-- Fundação do santuário
--
-- Regra geral: cada pessoa só alcança o que é seu. Toda tabela tem RLS
-- ligado e nenhuma política se apoia no front-end.
--
-- LGPD: convicção religiosa é dado sensível (art. 5º, II). O consentimento
-- fica registrado em perfis.consentimento_em, e apagar a conta em
-- auth.users leva tudo embora por cascata.
-- ===========================================================================

-- --- Perfil ----------------------------------------------------------------

create table public.perfis (
  id uuid primary key references auth.users on delete cascade,
  nome text,
  -- O fuso define que dia é "hoje" para esta pessoa.
  fuso text not null default 'America/Sao_Paulo',
  -- Momento do consentimento explícito para tratar dado sensível.
  consentimento_em timestamptz,
  movimento_reduzido boolean not null default false,
  modo_retiro boolean not null default false,
  criado_em timestamptz not null default now()
);

alter table public.perfis enable row level security;

create policy "perfil próprio: ler" on public.perfis
  for select using (auth.uid() = id);
create policy "perfil próprio: criar" on public.perfis
  for insert with check (auth.uid() = id);
create policy "perfil próprio: alterar" on public.perfis
  for update using (auth.uid() = id) with check (auth.uid() = id);

-- Todo usuário novo ganha um perfil, para que nada dependa do cliente.
create function public.criar_perfil()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.perfis (id, nome)
  values (new.id, new.raw_user_meta_data ->> 'nome')
  on conflict (id) do nothing;
  return new;
end;
$$;

create trigger ao_criar_usuario
  after insert on auth.users
  for each row execute function public.criar_perfil();

-- --- Jornada ---------------------------------------------------------------

create type public.status_jornada as enum (
  'planejada', 'ativa', 'pausada', 'grande_dia', 'pos'
);

create table public.jornadas (
  id uuid primary key default gen_random_uuid(),
  perfil_id uuid not null references public.perfis(id) on delete cascade,
  -- Identificador da festa, conforme src/lib/agenda/festas.ts
  festa_id text not null,
  consagracao date not null,
  inicio date not null,
  status public.status_jornada not null default 'planejada',
  -- Ler o Tratado antes da preparação ou ao longo dela.
  plano_leitura text not null default 'durante'
    check (plano_leitura in ('antes', 'durante')),
  criado_em timestamptz not null default now(),
  -- O Dia 1 cai 33 dias antes da festa. Guardado, mas nunca incoerente.
  constraint inicio_33_dias_antes check (inicio = consagracao - 33)
);

create index jornadas_por_perfil on public.jornadas (perfil_id, criado_em desc);

alter table public.jornadas enable row level security;

create policy "jornada própria: ler" on public.jornadas
  for select using (auth.uid() = perfil_id);
create policy "jornada própria: criar" on public.jornadas
  for insert with check (auth.uid() = perfil_id);
create policy "jornada própria: alterar" on public.jornadas
  for update using (auth.uid() = perfil_id) with check (auth.uid() = perfil_id);
create policy "jornada própria: apagar" on public.jornadas
  for delete using (auth.uid() = perfil_id);

-- Auxiliar usada pelas políticas das tabelas filhas.
create function public.jornada_e_minha(jornada uuid)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1 from public.jornadas j
    where j.id = jornada and j.perfil_id = auth.uid()
  );
$$;

-- --- Progresso diário ------------------------------------------------------

create table public.progresso_dias (
  id uuid primary key default gen_random_uuid(),
  jornada_id uuid not null references public.jornadas(id) on delete cascade,
  dia smallint not null check (dia between 1 and 33),
  -- Passos concluídos: prepare, leia, medite, reze, reflita, pratique, registre
  passos text[] not null default '{}',
  concluido_em timestamptz,
  unique (jornada_id, dia)
);

alter table public.progresso_dias enable row level security;

create policy "progresso próprio" on public.progresso_dias
  for all using (public.jornada_e_minha(jornada_id))
  with check (public.jornada_e_minha(jornada_id));

-- --- Diário ----------------------------------------------------------------

create table public.diario (
  id uuid primary key default gen_random_uuid(),
  jornada_id uuid not null references public.jornadas(id) on delete cascade,
  dia smallint check (dia between 1 and 33),
  tipo text not null check (
    tipo in ('reflexao', 'intencao', 'dificuldade', 'graca', 'resolucao', 'livre')
  ),
  texto text not null,
  criado_em timestamptz not null default now(),
  atualizado_em timestamptz not null default now()
);

create index diario_por_jornada on public.diario (jornada_id, dia, criado_em);

alter table public.diario enable row level security;

create policy "diário próprio" on public.diario
  for all using (public.jornada_e_minha(jornada_id))
  with check (public.jornada_e_minha(jornada_id));

-- --- Meu motivo ------------------------------------------------------------

create table public.meu_motivo (
  jornada_id uuid primary key references public.jornadas(id) on delete cascade,
  texto text not null,
  atualizado_em timestamptz not null default now()
);

alter table public.meu_motivo enable row level security;

create policy "motivo próprio" on public.meu_motivo
  for all using (public.jornada_e_minha(jornada_id))
  with check (public.jornada_e_minha(jornada_id));

-- --- Carta do primeiro dia -------------------------------------------------
--
-- A carta é escrita no Dia 1 e só pode ser lida no Grande Dia. Isso não é
-- uma regra de tela: quem consultar a base direto com o token da pessoa
-- também não alcança o texto antes da hora.

create table public.carta_primeiro_dia (
  jornada_id uuid primary key references public.jornadas(id) on delete cascade,
  texto text not null,
  selada_em timestamptz not null default now(),
  aberta_em timestamptz
);

alter table public.carta_primeiro_dia enable row level security;

-- Escrever a própria carta, sim.
create policy "carta própria: selar" on public.carta_primeiro_dia
  for insert with check (public.jornada_e_minha(jornada_id));

-- Lê-la, só a partir do dia da consagração, no fuso da própria pessoa.
create policy "carta própria: ler no grande dia" on public.carta_primeiro_dia
  for select using (
    exists (
      select 1
      from public.jornadas j
      join public.perfis p on p.id = j.perfil_id
      where j.id = jornada_id
        and j.perfil_id = auth.uid()
        and (now() at time zone p.fuso)::date >= j.consagracao
    )
  );

-- Saber que a carta existe não revela o que ela diz.
create function public.tenho_carta(jornada uuid)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1 from public.carta_primeiro_dia c
    where c.jornada_id = jornada and public.jornada_e_minha(jornada)
  );
$$;

-- --- Atualização de carimbos ------------------------------------------------

create function public.tocar_atualizado_em()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.atualizado_em = now();
  return new;
end;
$$;

create trigger diario_atualizado
  before update on public.diario
  for each row execute function public.tocar_atualizado_em();

create trigger motivo_atualizado
  before update on public.meu_motivo
  for each row execute function public.tocar_atualizado_em();
