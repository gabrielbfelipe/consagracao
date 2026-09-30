/**
 * Prova, contra o banco real, que as políticas fazem o que prometem.
 *
 * Uso: node --env-file=.env.local scripts/verificar-rls.mjs
 *
 * Cria duas pessoas de teste, verifica o isolamento entre elas e o lacre da
 * carta do primeiro dia, e apaga tudo ao final — inclusive se falhar.
 */
import { createClient } from "@supabase/supabase-js";

const URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const ANON = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const SECRETA = process.env.SUPABASE_SERVICE_ROLE_KEY;

const admin = createClient(URL, SECRETA, {
  auth: { autoRefreshToken: false, persistSession: false },
});

const provas = [];
function conferir(nome, passou, detalhe = "") {
  provas.push({ nome, passou, detalhe });
  console.log(`${passou ? "✓" : "✗"} ${nome}${detalhe ? ` — ${detalhe}` : ""}`);
}

/**
 * Datas no fuso do perfil, e não em UTC.
 *
 * A política da carta pergunta que dia é hoje em America/Sao_Paulo. Contar
 * em UTC daria um dia a mais entre 21h e 0h, e o teste acusaria uma falha
 * onde o banco está certo.
 */
const FUSO = "America/Sao_Paulo";

function emDias(n) {
  const hoje = new Intl.DateTimeFormat("en-CA", {
    timeZone: FUSO,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());

  const d = new Date(`${hoje}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + n);
  return d.toISOString().slice(0, 10);
}

async function criarPessoa(email) {
  const senha = `teste-${crypto.randomUUID()}`;
  const { data, error } = await admin.auth.admin.createUser({
    email,
    password: senha,
    email_confirm: true,
  });
  if (error) throw new Error(`createUser: ${error.message}`);

  const cliente = createClient(URL, ANON, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
  const { error: erroEntrada } = await cliente.auth.signInWithPassword({
    email,
    password: senha,
  });
  if (erroEntrada) throw new Error(`signIn: ${erroEntrada.message}`);

  return { id: data.user.id, cliente };
}

const marca = crypto.randomUUID().slice(0, 8);
let ana, bento;

try {
  ana = await criarPessoa(`ana-${marca}@exemplo-teste.invalid`);
  bento = await criarPessoa(`bento-${marca}@exemplo-teste.invalid`);

  // O gatilho deve ter criado o perfil sozinho.
  const { data: perfilAna } = await ana.cliente
    .from("perfis")
    .select("id")
    .maybeSingle();
  conferir("perfil é criado junto com a conta", perfilAna?.id === ana.id);

  // Ana não enxerga o perfil de Bento.
  const { data: perfis } = await ana.cliente.from("perfis").select("id");
  conferir(
    "cada pessoa só enxerga o próprio perfil",
    perfis?.length === 1 && perfis[0].id === ana.id,
    `viu ${perfis?.length ?? 0}`,
  );

  // --- Jornada -------------------------------------------------------------

  const consagracao = emDias(40);
  const { data: jornada, error: erroJornada } = await ana.cliente
    .from("jornadas")
    .insert({
      perfil_id: ana.id,
      festa_id: "imaculada-conceicao",
      consagracao,
      inicio: emDias(7),
    })
    .select("id")
    .single();
  conferir("a pessoa cria a própria jornada", !erroJornada, erroJornada?.message);

  // A restrição do banco recusa um início que não seja 33 dias antes.
  const { error: erroTorto } = await ana.cliente.from("jornadas").insert({
    perfil_id: ana.id,
    festa_id: "assuncao",
    consagracao: emDias(60),
    inicio: emDias(10),
  });
  conferir("o banco recusa cronograma incoerente", !!erroTorto);

  // Bento não alcança a jornada de Ana.
  const { data: doBento } = await bento.cliente.from("jornadas").select("id");
  conferir(
    "ninguém lê a jornada de outra pessoa",
    (doBento?.length ?? 0) === 0,
    `viu ${doBento?.length ?? 0}`,
  );

  // Nem escreve nela.
  const { error: erroInvasao } = await bento.cliente
    .from("progresso_dias")
    .insert({ jornada_id: jornada.id, dia: 1, passos: ["leia"] });
  conferir("ninguém escreve na jornada de outra pessoa", !!erroInvasao);

  // --- Diário --------------------------------------------------------------

  await ana.cliente.from("diario").insert({
    jornada_id: jornada.id,
    dia: 1,
    tipo: "reflexao",
    texto: "texto íntimo de Ana",
  });

  const { data: diarioAlheio } = await bento.cliente.from("diario").select("texto");
  conferir(
    "o diário não vaza para outra pessoa",
    (diarioAlheio?.length ?? 0) === 0,
    `viu ${diarioAlheio?.length ?? 0}`,
  );

  // --- Meu motivo -----------------------------------------------------------

  await ana.cliente
    .from("meu_motivo")
    .upsert(
      { jornada_id: jornada.id, texto: "primeiro motivo" },
      { onConflict: "jornada_id" },
    );
  const { error: erroRegravar } = await ana.cliente
    .from("meu_motivo")
    .upsert(
      { jornada_id: jornada.id, texto: "motivo revisto" },
      { onConflict: "jornada_id" },
    );
  const { data: motivo } = await ana.cliente
    .from("meu_motivo")
    .select("texto")
    .single();
  conferir(
    "o motivo pode ser reescrito quantas vezes for preciso",
    !erroRegravar && motivo?.texto === "motivo revisto",
  );

  const { data: motivoAlheio } = await bento.cliente
    .from("meu_motivo")
    .select("texto");
  conferir("o motivo não vaza para outra pessoa", (motivoAlheio?.length ?? 0) === 0);

  // --- Tabela de controle ----------------------------------------------------

  const { data: migracoes, error: erroMigracoes } = await ana.cliente
    .from("migracoes")
    .select("nome");
  conferir(
    "a tabela de migrações não é alcançável pela API",
    !!erroMigracoes || (migracoes?.length ?? 0) === 0,
  );

  // --- Carta do primeiro dia ------------------------------------------------

  const { error: erroCarta } = await ana.cliente
    .from("carta_primeiro_dia")
    .insert({ jornada_id: jornada.id, texto: "Por que decidi me consagrar" });
  conferir("a carta pode ser escrita no primeiro dia", !erroCarta, erroCarta?.message);

  const { data: cartaCedo } = await ana.cliente
    .from("carta_primeiro_dia")
    .select("texto");
  conferir(
    "a carta fica lacrada antes do Grande Dia",
    (cartaCedo?.length ?? 0) === 0,
    `a própria autora leu ${cartaCedo?.length ?? 0} linha(s)`,
  );

  const { data: sabeQueExiste } = await ana.cliente.rpc("tenho_carta", {
    jornada: jornada.id,
  });
  conferir("mas sabe-se que ela existe", sabeQueExiste === true);

  // Chegado o dia, a carta abre.
  await admin
    .from("jornadas")
    .update({ consagracao: emDias(0), inicio: emDias(-33) })
    .eq("id", jornada.id);

  const { data: cartaNoDia } = await ana.cliente
    .from("carta_primeiro_dia")
    .select("texto");
  conferir(
    "no Grande Dia a carta se abre",
    cartaNoDia?.[0]?.texto === "Por que decidi me consagrar",
    `leu ${cartaNoDia?.length ?? 0} linha(s)`,
  );

  // E continua fechada para os demais.
  const { data: cartaAlheia } = await bento.cliente
    .from("carta_primeiro_dia")
    .select("texto");
  conferir(
    "a carta nunca se abre para outra pessoa",
    (cartaAlheia?.length ?? 0) === 0,
  );

  // --- Apagar a conta leva tudo --------------------------------------------

  await admin.auth.admin.deleteUser(ana.id);
  ana = null;

  const { count } = await admin
    .from("jornadas")
    .select("id", { count: "exact", head: true })
    .eq("id", jornada.id);
  conferir("apagar a conta apaga os dados em cascata", count === 0);
} finally {
  if (ana) await admin.auth.admin.deleteUser(ana.id).catch(() => {});
  if (bento) await admin.auth.admin.deleteUser(bento.id).catch(() => {});
}

const falhas = provas.filter((p) => !p.passou);
console.log(
  `\n${provas.length - falhas.length} de ${provas.length} provas passaram.`,
);
process.exit(falhas.length === 0 ? 0 : 1);
