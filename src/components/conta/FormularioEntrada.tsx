"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { enviarLink, type EstadoEntrada } from "@/app/entrar/acoes";

export function FormularioEntrada({ destino }: { destino: string }) {
  const [estado, acao] = useActionState<EstadoEntrada, FormData>(enviarLink, {
    situacao: "inicial",
  });

  if (estado.situacao === "enviado") {
    return (
      <div className="superficie-vidro mt-12 max-w-[46ch] px-8 py-9">
        <p className="font-[family-name:var(--font-livro)] text-2xl text-[var(--color-marfim)]">
          O link foi enviado
        </p>
        <p className="voz-livro mt-4 text-[var(--texto-suave)]">
          Abra a mensagem que chegou em {estado.email} e clique no link para
          entrar. Ele vale por uma hora.
        </p>
        <p className="mt-5 text-sm text-[var(--texto-suave)]">
          Se não encontrar, confira a caixa de spam.
        </p>
      </div>
    );
  }

  return (
    <form action={acao} className="mt-12 w-full max-w-[38ch]">
      <input type="hidden" name="destino" value={destino} />

      <label className="block text-left">
        <span className="text-sm text-[var(--texto-suave)]">Seu e-mail</span>
        <input
          type="email"
          name="email"
          required
          autoComplete="email"
          placeholder="nome@exemplo.com"
          aria-describedby={estado.situacao === "erro" ? "erro" : undefined}
          className="superficie-vidro mt-2 block w-full px-5 py-3.5
            font-[family-name:var(--font-livro)] text-lg text-[var(--color-marfim)]
            placeholder:text-[color-mix(in_oklab,var(--color-pergaminho)_35%,transparent)]
            focus:outline-none focus-visible:shadow-[inset_0_0_0_1px_var(--color-ouro)]"
        />
      </label>

      {estado.situacao === "erro" && (
        <p id="erro" role="alert" className="mt-3 text-left text-sm text-[var(--color-ouro-luz)]">
          {estado.mensagem}
        </p>
      )}

      <Enviar />
    </form>
  );
}

function Enviar() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="brilho-borda superficie-vidro mt-7 inline-flex w-full items-center justify-center px-10 py-4
        font-[family-name:var(--font-livro)] text-lg tracking-[0.3em] indent-[0.3em] uppercase
        text-[var(--color-marfim)] transition-[box-shadow,color,opacity] duration-500 ease-[var(--ease-santuario)]
        hover:text-[var(--color-ouro-luz)]
        hover:shadow-[inset_0_0_0_1px_var(--color-ouro),0_0_32px_-10px_color-mix(in_oklab,var(--color-ouro)_70%,transparent)]
        disabled:opacity-55"
    >
      {pending ? "Enviando" : "Enviar link"}
    </button>
  );
}
