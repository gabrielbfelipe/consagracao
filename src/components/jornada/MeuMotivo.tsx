"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { salvarMotivo } from "@/app/carta/acoes";

/** Texto curto, editável sempre, guardado sozinho quando a digitação para. */
export function MeuMotivo({
  jornadaId,
  inicial,
}: {
  jornadaId: string;
  inicial: string;
}) {
  const [texto, setTexto] = useState(inicial);
  const [estado, setEstado] = useState<"parado" | "gravando" | "guardado">(
    "parado",
  );
  const tempo = useRef<ReturnType<typeof setTimeout> | null>(null);

  const agendar = useCallback(
    (valor: string) => {
      if (tempo.current) clearTimeout(tempo.current);
      setEstado("gravando");
      tempo.current = setTimeout(async () => {
        try {
          await salvarMotivo(jornadaId, valor);
          setEstado("guardado");
        } catch {
          setEstado("parado");
        }
      }, 900);
    },
    [jornadaId],
  );

  useEffect(
    () => () => void (tempo.current && clearTimeout(tempo.current)),
    [],
  );

  return (
    <div className="mt-7">
      <label className="block">
        <span className="sr-only">Meu motivo</span>
        <textarea
          value={texto}
          onChange={(e) => {
            setTexto(e.target.value);
            agendar(e.target.value);
          }}
          rows={4}
          maxLength={400}
          className="superficie-pergaminho block w-full resize-y px-6 py-5
            font-[family-name:var(--font-livro)] text-lg leading-[1.75] text-[#2a1d12]
            placeholder:text-[#8a6f52] focus:outline-none"
          placeholder="Comecei esta jornada porque…"
        />
      </label>
      <span
        aria-live="polite"
        className="mt-2 block h-5 text-sm text-[var(--texto-suave)]"
      >
        {estado === "gravando" && "Guardando…"}
        {estado === "guardado" && "Guardado"}
      </span>
    </div>
  );
}
