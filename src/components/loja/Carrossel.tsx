"use client";

import { useState } from "react";
import Image from "next/image";

/**
 * O carrossel de fotos de um produto.
 *
 * São as fotos que o próprio vendedor publicou no anúncio, carregadas da
 * loja. Nada se avança sozinho: quem quiser ver as outras clica — uma
 * página com dez produtos a girar fotos ao mesmo tempo seria um letreiro
 * de praça, e esta é a última sala em que isso caberia.
 */
export function Carrossel({
  fotos,
  alt,
  destaque = false,
}: {
  fotos: readonly string[];
  alt: string;
  destaque?: boolean;
}) {
  const [atual, setAtual] = useState(0);

  if (fotos.length === 0) {
    return (
      <div>
        <div
          className={`flex items-center justify-center bg-[color-mix(in_oklab,var(--color-bronze)_18%,transparent)] ${
            destaque ? "aspect-[4/3]" : "aspect-square"
          }`}
        >
          <p className="px-6 text-center text-sm text-[var(--texto-suave)]">
            Sem foto por enquanto
          </p>
        </div>
        {/* O mesmo espaço da fila de miniaturas, para o título deste cartão
            ficar à mesma altura dos vizinhos. */}
        <div aria-hidden className="mt-3 min-h-12" />
      </div>
    );
  }

  const foto = fotos[Math.min(atual, fotos.length - 1)];

  return (
    <div>
      <div
        className={`relative overflow-hidden bg-[#f4efe6] ${
          destaque ? "aspect-[4/3]" : "aspect-square"
        }`}
      >
        <Image
          key={foto}
          src={foto}
          alt={alt}
          fill
          sizes={
            destaque
              ? "(max-width: 1024px) 100vw, 50vw"
              : "(max-width: 640px) 100vw, 33vw"
          }
          className="object-contain"
          unoptimized
        />
      </div>

      {/* A fila de miniaturas ocupa lugar mesmo quando não há miniaturas:
          sem isto, um produto com três fotos empurra o seu título para baixo
          e o vizinho com uma foto não, e a grade fica desalinhada. */}
      <div className="mt-3 flex min-h-12 flex-wrap gap-2">
        {fotos.length > 1 &&
          fotos.map((f, i) => (
            <button
              key={f}
              type="button"
              onClick={() => setAtual(i)}
              aria-label={`Foto ${i + 1} de ${fotos.length}`}
              aria-current={i === atual ? "true" : undefined}
              className={`relative h-12 w-12 shrink-0 overflow-hidden bg-[#f4efe6] transition-[box-shadow,opacity] duration-300 ${
                i === atual
                  ? "shadow-[inset_0_0_0_2px_var(--color-ouro)]"
                  : "opacity-60 hover:opacity-100"
              }`}
            >
              <Image
                src={f}
                alt=""
                fill
                sizes="48px"
                className="object-contain"
                unoptimized
              />
            </button>
          ))}
      </div>
    </div>
  );
}
