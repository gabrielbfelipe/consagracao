import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { Acolhida } from "@/components/conta/Acolhida";
import { clienteServidor, usuarioAtual } from "@/lib/supabase/servidor";

export const metadata: Metadata = { title: "Bem-vindo" };

export default async function BemVindo() {
  const usuario = await usuarioAtual();
  if (!usuario) redirect("/entrar");

  // Quem já consentiu não precisa passar por aqui de novo.
  const supabase = await clienteServidor();
  const { data: perfil } = await supabase
    .from("perfis")
    .select("consentimento_em")
    .maybeSingle<{ consentimento_em: string | null }>();

  if (perfil?.consentimento_em) redirect("/caminho");

  return (
    <main
      data-sala="biblioteca"
      className="luz-alta flex min-h-dvh flex-col items-center justify-center px-6 py-20"
    >
      <div className="text-center">
        <h1 className="font-[family-name:var(--font-livro)] text-[clamp(2rem,1.5rem+2.4vw,3.25rem)] leading-tight text-[var(--color-marfim)]">
          Você entrou
        </h1>

        <div
          aria-hidden
          className="mx-auto mt-8 h-px w-24 bg-[linear-gradient(to_right,transparent,var(--color-ouro),transparent)]"
        />

        <p className="voz-livro mx-auto mt-8 text-[var(--texto-suave)]">
          Duas perguntas rápidas antes de escolher a data da sua consagração.
        </p>
      </div>

      <div className="mt-14 w-full">
        <Acolhida emailDaConta={usuario.email ?? ""} />
      </div>
    </main>
  );
}
