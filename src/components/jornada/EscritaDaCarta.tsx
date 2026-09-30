"use client";

import { useActionState, useState } from "react";
import { useFormStatus } from "react-dom";
import { selarCarta, type EstadoCarta } from "@/app/carta/acoes";

/**
 * A escrita da carta que só se abre no Grande Dia.
 *
 * Há uma confirmação antes de selar, porque o gesto não se desfaz: depois de
 * enviada, nem a própria autora relê o texto por trinta e três dias.
 */
export function EscritaDaCarta({ jornadaId }: { jornadaId: string }) {
  const [estado, acao] = useActionState<EstadoCarta, FormData>(selarCarta, {
    situacao: "inicial",
  });
  const [texto, setTexto] = useState("");
  const [confirmando, setConfirmando] = useState(false);

  if (estado.situacao === "selada") {
    return (
      <div className="superficie-madeira mt-12 px-8 py-12 text-center">
        <p className="ouro font-[family-name:var(--font-livro)] text-3xl">
          Carta selada
        </p>
        <p className="voz-livro mx-auto mt-6 text-[var(--texto-suave)]">
          Está guardada. Você a reencontrará no dia da sua consagração.
        </p>
      </div>
    );
  }

  return (
    <form action={acao} className="mt-12">
      <input type="hidden" name="jornada" value={jornadaId} />

      <p className="voz-livro text-[var(--texto-suave)]">
        Escreva por que você decidiu se consagrar. Não precisa ser bonito nem
        organizado — precisa ser verdadeiro. Esta carta será guardada e só se
        abrirá no dia da sua consagração, quando você já não for bem o mesmo que
        a escreveu.
      </p>

      <label className="mt-9 block">
        <span className="sr-only">Sua carta</span>
        <textarea
          name="texto"
          value={texto}
          onChange={(e) => {
            setTexto(e.target.value);
            setConfirmando(false);
          }}
          rows={14}
          required
          className="superficie-pergaminho block w-full resize-y px-7 py-6
            font-[family-name:var(--font-livro)] text-[1.15rem] leading-[1.8] text-[#2a1d12]
            placeholder:text-[#8a6f52] focus:outline-none"
          placeholder="Decidi fazer esta consagração porque…"
        />
      </label>

      {estado.situacao === "erro" && (
        <p role="alert" className="mt-4 text-sm text-[var(--color-ouro-luz)]">
          {estado.mensagem}
        </p>
      )}

      {confirmando ? (
        <div className="superficie-vidro mt-8 px-7 py-7">
          <p className="font-[family-name:var(--font-livro)] text-xl text-[var(--color-marfim)]">
            Selar agora?
          </p>
          <p className="voz-livro mt-3 text-[var(--texto-suave)]">
            Depois de selada, a carta não pode ser lida nem alterada até o dia
            da consagração. Nem por você.
          </p>
          <div className="mt-7 flex flex-wrap items-center gap-6">
            <Selar />
            <button
              type="button"
              onClick={() => setConfirmando(false)}
              className="text-sm text-[var(--texto-suave)] underline
                decoration-[color-mix(in_oklab,var(--color-ouro)_35%,transparent)] underline-offset-[6px]
                transition-colors hover:text-[var(--color-pergaminho)]"
            >
              Ainda quero mexer
            </button>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setConfirmando(true)}
          disabled={texto.trim().length < 40}
          className="brilho-borda superficie-vidro mt-8 inline-flex items-center px-11 py-4
            font-[family-name:var(--font-livro)] text-lg tracking-[0.3em] indent-[0.3em] uppercase
            text-[var(--color-marfim)] transition-[box-shadow,color,opacity] duration-500 ease-[var(--ease-santuario)]
            hover:text-[var(--color-ouro-luz)]
            hover:shadow-[inset_0_0_0_1px_var(--color-ouro),0_0_32px_-10px_color-mix(in_oklab,var(--color-ouro)_70%,transparent)]
            disabled:opacity-45"
        >
          Selar a carta
        </button>
      )}
    </form>
  );
}

function Selar() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="brilho-borda superficie-vidro inline-flex items-center px-10 py-3.5
        font-[family-name:var(--font-livro)] text-base tracking-[0.26em] indent-[0.26em] uppercase
        text-[var(--color-marfim)] transition-[box-shadow,color,opacity] duration-500 ease-[var(--ease-santuario)]
        hover:text-[var(--color-ouro-luz)]
        hover:shadow-[inset_0_0_0_1px_var(--color-ouro),0_0_28px_-10px_color-mix(in_oklab,var(--color-ouro)_70%,transparent)]
        disabled:opacity-55"
    >
      {pending ? "Selando" : "Sim, selar"}
    </button>
  );
}
