"use client";

import { useActionState, useState } from "react";
import { useFormStatus } from "react-dom";
import { entrarOuCriar, type EstadoEntrada } from "@/app/entrar/acoes";

/**
 * E-mail e senha. Um único formulário cria a conta ou entra na que já existe,
 * porque para a pessoa é o mesmo gesto e não faz sentido perguntar antes.
 */
export function FormularioEntrada({ destino }: { destino: string }) {
  const [estado, acao] = useActionState<EstadoEntrada, FormData>(
    entrarOuCriar,
    { situacao: "inicial" },
  );
  const [mostrarSenha, setMostrarSenha] = useState(false);

  return (
    <form action={acao} className="mt-12 w-full max-w-[38ch] text-left">
      <input type="hidden" name="destino" value={destino} />

      <label className="block">
        <span className="text-sm text-[var(--texto-suave)]">Seu e-mail</span>
        <input
          type="email"
          name="email"
          required
          autoComplete="email"
          placeholder="nome@exemplo.com"
          className={CAMPO}
        />
      </label>

      <label className="mt-6 block">
        <span className="text-sm text-[var(--texto-suave)]">Sua senha</span>
        <span className="mt-0.5 block text-sm text-[color-mix(in_oklab,var(--color-pergaminho)_42%,transparent)]">
          Ao menos oito caracteres. Se já tem conta, use a mesma de sempre.
        </span>
        <input
          type={mostrarSenha ? "text" : "password"}
          name="senha"
          required
          minLength={8}
          autoComplete="current-password"
          className={`${CAMPO} mt-2`}
        />
      </label>

      <button
        type="button"
        onClick={() => setMostrarSenha(!mostrarSenha)}
        className="mt-3 text-sm text-[var(--texto-suave)] underline
          decoration-[color-mix(in_oklab,var(--color-ouro)_35%,transparent)] underline-offset-[5px]
          transition-colors hover:text-[var(--color-pergaminho)]"
      >
        {mostrarSenha ? "Ocultar senha" : "Mostrar senha"}
      </button>

      {estado.situacao === "erro" && (
        <p role="alert" className="mt-5 text-sm text-[var(--color-ouro-luz)]">
          {estado.mensagem}
        </p>
      )}

      <Continuar />
    </form>
  );
}

const CAMPO = `superficie-vidro block w-full px-5 py-3.5
  font-[family-name:var(--font-livro)] text-lg text-[var(--color-marfim)]
  placeholder:text-[color-mix(in_oklab,var(--color-pergaminho)_32%,transparent)]
  focus:outline-none focus-visible:shadow-[inset_0_0_0_1px_var(--color-ouro)]`;

function Continuar() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="brilho-borda superficie-vidro mt-8 inline-flex w-full items-center justify-center px-10 py-4
        font-[family-name:var(--font-livro)] text-lg tracking-[0.3em] indent-[0.3em] uppercase
        text-[var(--color-marfim)] transition-[box-shadow,color,opacity] duration-500 ease-[var(--ease-santuario)]
        hover:text-[var(--color-ouro-luz)]
        hover:shadow-[inset_0_0_0_1px_var(--color-ouro),0_0_32px_-10px_color-mix(in_oklab,var(--color-ouro)_70%,transparent)]
        disabled:opacity-55"
    >
      {pending ? "Entrando" : "Entrar"}
    </button>
  );
}
