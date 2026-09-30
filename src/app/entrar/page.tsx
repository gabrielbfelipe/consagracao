import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { FormularioEntrada } from "@/components/conta/FormularioEntrada";
import { PorticoPublico } from "@/components/navegacao/PorticoPublico";
import { usuarioAtual } from "@/lib/supabase/servidor";

export const metadata: Metadata = {
  title: "Iniciar preparação",
  description:
    "Crie sua conta e escolha a data da sua consagração.",
};

export default async function Entrar({
  searchParams,
}: {
  searchParams: Promise<{ destino?: string }>;
}) {
  const { destino } = await searchParams;

  if (await usuarioAtual()) redirect("/caminho");

  return (
    <div data-sala="capela" className="min-h-dvh">
      <PorticoPublico />

      <main className="luz-alta flex flex-col items-center px-6 py-16 text-center">
        <h1 className="font-[family-name:var(--font-livro)] text-[clamp(2rem,1.5rem+2vw,3rem)] leading-tight text-[var(--color-marfim)]">
          Iniciar preparação
        </h1>

        <div
          aria-hidden
          className="mt-8 h-px w-24 bg-[linear-gradient(to_right,transparent,var(--color-ouro),transparent)]"
        />

        <p className="voz-livro mt-8 text-[var(--texto-suave)]">
          Informe seu e-mail e escolha uma senha. Se ainda não tem conta, ela é
          criada na hora e você entra direto — não há e-mail de confirmação a
          esperar. Se já tem, é por aqui mesmo que se entra.
        </p>

        <FormularioEntrada destino={destino ?? "/caminho"} />

        {/* Os três passos, para que ninguém clique sem saber o que vem. */}
        <ol className="mt-16 flex max-w-[52ch] flex-col gap-5 text-left sm:flex-row sm:gap-8">
          {[
            {
              n: "Primeiro",
              t: "Sua conta",
              d: "E-mail e senha. Entra na hora.",
            },
            {
              n: "Depois",
              t: "A data",
              d: "Você escolhe a festa em que deseja se consagrar.",
            },
            {
              n: "Então",
              t: "O caminho",
              d: "No dia certo, a jornada se abre sozinha.",
            },
          ].map((passo) => (
            <li key={passo.t} className="flex-1">
              <div
                aria-hidden
                className="h-px w-full bg-[linear-gradient(to_right,color-mix(in_oklab,var(--color-ouro)_55%,transparent),transparent)]"
              />
              <p className="mt-3 text-sm text-[color-mix(in_oklab,var(--color-pergaminho)_50%,transparent)]">
                {passo.n}
              </p>
              <p className="mt-1 font-[family-name:var(--font-livro)] text-xl text-[var(--color-marfim)]">
                {passo.t}
              </p>
              <p className="mt-1.5 text-sm leading-relaxed text-[var(--texto-suave)]">
                {passo.d}
              </p>
            </li>
          ))}
        </ol>
      </main>
    </div>
  );
}
