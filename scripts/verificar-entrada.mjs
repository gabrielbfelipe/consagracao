/**
 * Prova que a entrada por senha faz o que promete, contra o banco real.
 *
 * Uso: node --env-file=.env.local scripts/verificar-entrada.mjs
 *
 * O ponto delicado: como a conta é criada sem confirmação de e-mail, é
 * preciso garantir que tentar "criar" uma conta que já existe NÃO troque a
 * senha de quem já a tinha. Isso seria tomada de conta alheia.
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
  provas.push(passou);
  console.log(`${passou ? "✓" : "✗"} ${nome}${detalhe ? ` — ${detalhe}` : ""}`);
}

function anon() {
  return createClient(URL, ANON, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}

/** Repete o que a ação do servidor faz: cria primeiro, depois entra. */
async function entrarOuCriar(email, senha) {
  const { error: erroCriacao } = await admin.auth.admin.createUser({
    email,
    password: senha,
    email_confirm: true,
  });

  const jaExistia =
    erroCriacao !== null &&
    (erroCriacao.code === "email_exists" ||
      erroCriacao.status === 422 ||
      /already/i.test(erroCriacao.message));

  if (erroCriacao && !jaExistia) {
    return { ok: false, motivo: "criacao", erro: erroCriacao.message };
  }

  const cliente = anon();
  const { data, error } = await cliente.auth.signInWithPassword({
    email,
    password: senha,
  });

  if (error) return { ok: false, motivo: jaExistia ? "senha" : "entrada" };
  return { ok: true, novo: !jaExistia, id: data.user.id, cliente };
}

const marca = crypto.randomUUID().slice(0, 8);
const email = `entrada-${marca}@exemplo-teste.invalid`;
const SENHA = "umaSenhaBoa123";
let id;

try {
  // 1. Conta nova, sem qualquer e-mail de confirmação.
  const primeira = await entrarOuCriar(email, SENHA);
  conferir("cria a conta e entra na hora", primeira.ok && primeira.novo);
  id = primeira.id;

  // 2. O e-mail já nasce confirmado, senão a entrada nem aconteceria.
  const { data: usuario } = await admin.auth.admin.getUserById(id);
  conferir(
    "o e-mail já nasce confirmado",
    Boolean(usuario?.user?.email_confirmed_at),
  );

  // 3. O gatilho criou o perfil, e ele começa sem consentimento.
  const { data: perfil } = await primeira.cliente
    .from("perfis")
    .select("id, consentimento_em")
    .maybeSingle();
  conferir("o perfil é criado junto", perfil?.id === id);
  conferir(
    "e começa sem consentimento, para passar pela acolhida",
    perfil?.consentimento_em === null,
  );

  // 4. Voltar com a mesma senha entra na MESMA conta, sem duplicar.
  const segunda = await entrarOuCriar(email, SENHA);
  conferir(
    "voltar com a mesma senha entra na mesma conta",
    segunda.ok && !segunda.novo && segunda.id === id,
  );

  // 5. O ponto crítico: senha errada não entra NEM troca a senha existente.
  const invasao = await entrarOuCriar(email, "outraSenhaQualquer999");
  conferir("senha errada não entra", !invasao.ok && invasao.motivo === "senha");

  const conferindo = await entrarOuCriar(email, SENHA);
  conferir(
    "e a senha original continua valendo",
    conferindo.ok && conferindo.id === id,
    "a tentativa falha não sobrescreveu nada",
  );

  // 6. Senha curta é recusada pelo próprio Supabase.
  const { error: erroCurta } = await admin.auth.admin.createUser({
    email: `curta-${marca}@exemplo-teste.invalid`,
    password: "123",
    email_confirm: true,
  });
  conferir("senha curta demais é recusada", Boolean(erroCurta));
} finally {
  if (id) await admin.auth.admin.deleteUser(id).catch(() => {});
}

const falhas = provas.filter((p) => !p).length;
console.log(`\n${provas.length - falhas} de ${provas.length} provas passaram.`);
process.exit(falhas === 0 ? 0 : 1);
