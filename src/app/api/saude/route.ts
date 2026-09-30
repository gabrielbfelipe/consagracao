import { NextResponse } from "next/server";

/**
 * Diz se o servidor tem o que precisa para funcionar, sem revelar nada.
 *
 * Existe porque "as variáveis estão configuradas no painel" e "o servidor em
 * produção realmente as enxerga" são duas afirmações diferentes, e só a
 * segunda importa. Responde apenas presente ou ausente — nunca o valor.
 */
export const dynamic = "force-dynamic";

export function GET() {
  const necessarias = [
    "NEXT_PUBLIC_SUPABASE_URL",
    "NEXT_PUBLIC_SUPABASE_ANON_KEY",
    "SUPABASE_SERVICE_ROLE_KEY",
  ] as const;

  const ambiente = Object.fromEntries(
    necessarias.map((nome) => [nome, Boolean(process.env[nome])]),
  );

  const inteiro = Object.values(ambiente).every(Boolean);

  return NextResponse.json(
    { pronto: inteiro, ambiente },
    { status: inteiro ? 200 : 503 },
  );
}
