"use client";

import { useActionState, useEffect, useState } from "react";
import { useFormStatus } from "react-dom";
import Link from "next/link";
import { aceitarEContinuar, type EstadoAcolhida } from "@/app/conta/acoes";

/**
 * A primeira conversa com quem acabou de entrar.
 *
 * Pede o mínimo: um nome para ser chamado, o fuso para saber que dia é hoje
 * na vida da pessoa, e o consentimento — que a LGPD exige em destaque,
 * porque o que se guarda aqui diz respeito à fé de alguém.
 */
export function Acolhida({ emailDaConta }: { emailDaConta: string }) {
  const [estado, acao] = useActionState<EstadoAcolhida, FormData>(
    aceitarEContinuar,
    { situacao: "inicial" },
  );

  // O fuso do aparelho é uma sugestão, não uma imposição: fica visível e
  // editável, porque quem viaja ou mora fora precisa poder corrigir.
  const [fuso, setFuso] = useState("America/Sao_Paulo");
  useEffect(() => {
    try {
      const detectado = Intl.DateTimeFormat().resolvedOptions().timeZone;
      if (detectado) setFuso(detectado);
    } catch {
      // Sem detecção, fica o padrão brasileiro.
    }
  }, []);

  return (
    <form action={acao} className="mx-auto w-full max-w-[52ch] text-left">
      <label className="block">
        <span className="font-[family-name:var(--font-livro)] text-xl text-[var(--color-marfim)]">
          Como você quer ser chamado?
        </span>
        <span className="mt-1 block text-sm text-[var(--texto-suave)]">
          Opcional. Serve só para o aplicativo falar com você pelo nome.
        </span>
        <input
          type="text"
          name="nome"
          autoComplete="given-name"
          maxLength={120}
          className="superficie-vidro mt-3 block w-full px-5 py-3.5
            font-[family-name:var(--font-livro)] text-lg text-[var(--color-marfim)]
            focus:outline-none focus-visible:shadow-[inset_0_0_0_1px_var(--color-ouro)]"
        />
      </label>

      <label className="mt-9 block">
        <span className="font-[family-name:var(--font-livro)] text-xl text-[var(--color-marfim)]">
          Seu fuso horário
        </span>
        <span className="mt-1 block text-sm text-[var(--texto-suave)]">
          É o que define quando um dia da jornada começa e termina para você.
        </span>
        <input
          type="text"
          name="fuso"
          value={fuso}
          onChange={(e) => setFuso(e.target.value)}
          className="superficie-vidro mt-3 block w-full px-5 py-3.5
            font-[family-name:var(--font-interface)] text-base text-[var(--color-marfim)]
            focus:outline-none focus-visible:shadow-[inset_0_0_0_1px_var(--color-ouro)]"
        />
      </label>

      {/* O consentimento em destaque, como a lei pede — e legível. */}
      <div className="superficie-pergaminho mt-12 px-7 py-7">
        <h2 className="font-[family-name:var(--font-livro)] text-2xl leading-snug text-[#2a1d12]">
          Antes de guardar qualquer coisa
        </h2>

        <div className="mt-4 font-[family-name:var(--font-livro)] text-[1.05rem] leading-[1.75] text-[#3d2c1c]">
          <p>
            Para acompanhar sua preparação, precisamos guardar a data que você
            escolher, os dias que você concluir e o que você escrever no diário.
            Isso revela sua convicção religiosa, que a Lei Geral de Proteção de
            Dados trata como dado sensível.
          </p>
          <p className="mt-4">
            O que você escreve é seu e de mais ninguém. Não vendemos, não
            compartilhamos e não usamos para treinar nenhum modelo. Nenhum texto
            seu vai para a inteligência artificial sem que você clique para
            isso. Você pode apagar tudo a qualquer momento, e apagar significa
            apagar.
          </p>
        </div>

        <label className="mt-6 flex cursor-pointer items-start gap-3">
          <input
            type="checkbox"
            name="consentimento"
            value="sim"
            className="mt-1 size-5 shrink-0 accent-[#7a5a32]"
          />
          <span className="font-[family-name:var(--font-livro)] text-[1.05rem] leading-relaxed text-[#2a1d12]">
            Concordo que meus dados sejam guardados para acompanhar minha
            preparação, e li a{" "}
            <Link
              href="/privacidade"
              className="underline decoration-[#8a6b2e] underline-offset-[5px]"
            >
              política de privacidade
            </Link>
            .
          </span>
        </label>
      </div>

      {estado.situacao === "erro" && (
        <p role="alert" className="mt-5 text-sm text-[var(--color-ouro-luz)]">
          {estado.mensagem}
        </p>
      )}

      <Continuar />

      <p className="mt-8 text-center text-sm text-[var(--texto-suave)]">
        Conta: {emailDaConta}
      </p>
    </form>
  );
}

function Continuar() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="brilho-borda superficie-vidro mt-9 inline-flex w-full items-center justify-center px-10 py-4
        font-[family-name:var(--font-livro)] text-lg tracking-[0.3em] indent-[0.3em] uppercase
        text-[var(--color-marfim)] transition-[box-shadow,color,opacity] duration-500 ease-[var(--ease-santuario)]
        hover:text-[var(--color-ouro-luz)]
        hover:shadow-[inset_0_0_0_1px_var(--color-ouro),0_0_32px_-10px_color-mix(in_oklab,var(--color-ouro)_70%,transparent)]
        disabled:opacity-55"
    >
      {pending ? "Guardando" : "Concordar e continuar"}
    </button>
  );
}
