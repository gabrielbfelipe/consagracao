import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { FormularioEntrada } from "@/components/conta/FormularioEntrada";
import { usuarioAtual } from "@/lib/supabase/servidor";

export const metadata: Metadata = { title: "Entrar" };

export default async function Entrar({
  searchParams,
}: {
  searchParams: Promise<{ destino?: string; expirado?: string }>;
}) {
  const { destino, expirado } = await searchParams;

  if (await usuarioAtual()) redirect("/caminho");

  return (
    <main
      data-sala="capela"
      className="luz-alta flex min-h-dvh flex-col items-center justify-center px-6 py-20 text-center"
    >
      <h1 className="font-[family-name:var(--font-livro)] text-[clamp(2rem,1.5rem+2vw,3rem)] leading-tight text-[var(--color-marfim)]">
        Entrar
      </h1>

      <div
        aria-hidden
        className="mt-8 h-px w-24 bg-[linear-gradient(to_right,transparent,var(--color-ouro),transparent)]"
      />

      <p className="voz-livro mt-8 text-[var(--texto-suave)]">
        {expirado
          ? "Esse link já não vale — eles duram uma hora e servem uma vez só. Peça outro abaixo."
          : "Informe seu e-mail e enviaremos um link de acesso. Não há senha a criar nem a lembrar."}
      </p>

      <FormularioEntrada destino={destino ?? "/caminho"} />
    </main>
  );
}
