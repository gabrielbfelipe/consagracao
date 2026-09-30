"use client";

import { useActionState, useState } from "react";
import { useFormStatus } from "react-dom";
import { entrarOuCriar, type EstadoEntrada } from "@/app/entrar/acoes";

/**
 * E-mail e senha. Um único formulário cria a conta ou entra na que já existe,
 * porque para a pessoa é o mesmo gesto e não faz sentido perguntar antes.
 *
 * As cores vêm da sala, e não de valores fixos: o mesmo formulário aparece
 * sobre pedra clara e sobre madeira escura.
 */
export function FormularioEntrada({ destino }: { destino: string }) {
  const [estado, acao] = useActionState<EstadoEntrada, FormData>(
    entrarOuCriar,
    { situacao: "inicial" },
  );
  const [mostrarSenha, setMostrarSenha] = useState(false);

  return (
    <form action={acao} className="mt-10 w-full text-left">
      <input type="hidden" name="destino" value={destino} />

      <label className="block">
        <span className="font-[family-name:var(--font-livro)] text-base text-[var(--texto)]">
          Seu e-mail
        </span>
        <input
          type="email"
          name="email"
          required
          autoComplete="email"
          placeholder="nome@exemplo.com"
          className={`${CAMPO} mt-2`}
        />
      </label>

      <label className="mt-7 block">
        <span className="font-[family-name:var(--font-livro)] text-base text-[var(--texto)]">
          Sua senha
        </span>
        <span className="mt-0.5 block text-sm text-[color-mix(in_oklab,var(--texto)_58%,transparent)]">
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
          decoration-[color-mix(in_oklab,var(--realce)_45%,transparent)] underline-offset-[5px]
          transition-colors hover:text-[var(--realce)]"
      >
        {mostrarSenha ? "Ocultar senha" : "Mostrar senha"}
      </button>

      {estado.situacao === "erro" && (
        <p
          role="alert"
          className="mt-5 border-l-2 border-[var(--realce)] pl-4 text-sm leading-relaxed text-[var(--texto)]"
        >
          {estado.mensagem}
        </p>
      )}

      <Continuar />
    </form>
  );
}

const CAMPO = `block w-full bg-[color-mix(in_oklab,var(--fundo-longe)_45%,transparent)] px-5 py-3.5
  font-[family-name:var(--font-livro)] text-lg text-[var(--texto)]
  shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--realce)_38%,transparent)]
  placeholder:text-[color-mix(in_oklab,var(--texto)_38%,transparent)]
  transition-shadow duration-300
  focus:outline-none focus-visible:shadow-[inset_0_0_0_2px_var(--realce)]`;

function Continuar() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="brilho-borda mt-9 inline-flex w-full items-center justify-center px-10 py-4
        font-[family-name:var(--font-livro)] text-base tracking-[0.28em] indent-[0.28em] uppercase
        text-[var(--texto)]
        shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--realce)_75%,transparent)]
        transition-[box-shadow,color,opacity] duration-500 ease-[var(--ease-santuario)]
        hover:text-[var(--realce)] hover:shadow-[inset_0_0_0_2px_var(--realce)]
        disabled:opacity-55"
    >
      {pending ? "Entrando" : "Entrar"}
    </button>
  );
}
