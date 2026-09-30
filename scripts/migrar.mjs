/**
 * Aplica as migrações de supabase/migrations em ordem, uma única vez cada.
 *
 * Uso: node --env-file=.env.local scripts/migrar.mjs
 *
 * O controle do que já rodou fica na própria base, em public.migracoes, para
 * que rodar duas vezes não quebre nada.
 */
import { readdir, readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";
import pg from "pg";

const PASTA = fileURLToPath(new URL("../supabase/migrations", import.meta.url));

const url = process.env.DATABASE_URL;
if (!url) {
  console.error("Falta DATABASE_URL. Rode com --env-file=.env.local");
  process.exit(1);
}

const cliente = new pg.Client({
  connectionString: url,
  ssl: { rejectUnauthorized: false },
});

await cliente.connect();

await cliente.query(`
  create table if not exists public.migracoes (
    nome text primary key,
    aplicada_em timestamptz not null default now()
  )
`);

// Tabela de controle: não deve ser alcançável pela API. Sem nenhuma política,
// o RLS barra todo mundo; este script usa a conexão direta, que o ignora.
await cliente.query("alter table public.migracoes enable row level security");
await cliente.query("revoke all on public.migracoes from anon, authenticated");

const { rows } = await cliente.query("select nome from public.migracoes");
const aplicadas = new Set(rows.map((r) => r.nome));

const arquivos = (await readdir(PASTA)).filter((f) => f.endsWith(".sql")).sort();

let novas = 0;
for (const arquivo of arquivos) {
  if (aplicadas.has(arquivo)) {
    console.log(`· ${arquivo} (já aplicada)`);
    continue;
  }

  const sql = await readFile(path.join(PASTA, arquivo), "utf8");
  try {
    await cliente.query("begin");
    await cliente.query(sql);
    await cliente.query("insert into public.migracoes (nome) values ($1)", [
      arquivo,
    ]);
    await cliente.query("commit");
    console.log(`✓ ${arquivo}`);
    novas++;
  } catch (erro) {
    await cliente.query("rollback");
    console.error(`✗ ${arquivo}\n  ${erro.message}`);
    await cliente.end();
    process.exit(1);
  }
}

console.log(
  novas === 0 ? "Nada a aplicar." : `${novas} migração(ões) aplicada(s).`,
);
await cliente.end();
