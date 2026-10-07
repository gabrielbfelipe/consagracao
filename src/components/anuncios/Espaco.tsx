"use client";

import { useEffect, useRef } from "react";
import Script from "next/script";
import { EDITOR, ROTULO, type Formato } from "@/content/anuncios";

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

/**
 * O que se pede à rede, e quanto lugar se guarda para a resposta.
 *
 * Sem reservar o lugar, o bloco nasce com zero de altura e empurra o que
 * está abaixo quando o anúncio chega — o salto que o Google mede como CLS e
 * que castiga o posicionamento do site inteiro.
 *
 * DUAS COISAS QUE SÓ UM NAVEGADOR DE VERDADE CONTOU
 *
 * A primeira: pedindo `format="auto"`, a rede escolheu 280px onde eu tinha
 * guardado 120. Ela decide pela largura disponível, e a largura aqui é
 * grande. Por isso o formato passou a ser dito — `horizontal` traz faixa,
 * `rectangle` traz retângulo —, e o que se guarda é o que chega.
 *
 * A segunda é mais feia, e nenhuma documentação a menciona: quando o
 * anúncio assenta, o script do AdSense escreve, **em linha e com
 * !important**, no elemento que envolve o <ins>:
 *
 *     height: auto !important; min-height: 0px !important;
 *
 * É a rede a limpar restrições de altura para o anúncio poder crescer. Um
 * estilo em linha com !important não se vence com classe nenhuma — e o
 * efeito é justamente o salto que a reserva existia para evitar. Aconteceu
 * em /cadeias e não em /calendario na mesma visita, o que o torna pior:
 * passa despercebido em qualquer verificação por amostragem.
 *
 * Daí o desenho atual:
 *   - a altura é guardada no <aside>, dois níveis acima do <ins>, fora do
 *     alcance da reescrita;
 *   - `full-width-responsive` fica desligado, que é o comportamento que
 *     dispara a limpeza das alturas dos ascendentes. O anúncio continua
 *     responsivo dentro da largura que lhe damos.
 */
const PEDIDO: Record<Formato, { formato: string; altura: string }> = {
  faixa: { formato: "horizontal", altura: "min-h-[180px] sm:min-h-[200px]" },
  retangulo: { formato: "rectangle", altura: "min-h-[340px] sm:min-h-[360px]" },
};

/**
 * O retângulo em si.
 *
 * O `push` diz à rede que há um bloco novo para preencher. O guarda de `ref`
 * existe porque em desenvolvimento o React monta cada componente duas vezes,
 * e o segundo push sobre o mesmo <ins> faz a rede reclamar em voz alta no
 * console ("All ins elements in the DOM with class=adsbygoogle already have
 * ads in them"). Uma navegação de verdade monta um <ins> novo, e aí o push
 * acontece como deve.
 */
export function Espaco({
  unidade,
  formato,
}: {
  unidade: string;
  formato: Formato;
}) {
  const jaPedido = useRef(false);

  useEffect(() => {
    if (jaPedido.current) return;
    jaPedido.current = true;
    try {
      (window.adsbygoogle = window.adsbygoogle ?? []).push({});
    } catch {
      // A rede pode estar bloqueada por uma extensão, ou fora do ar. Nesse
      // caso fica o espaço vazio, que é exatamente o que deve acontecer.
    }
  }, []);

  return (
    <aside
      aria-label={ROTULO}
      className={`mx-auto w-full max-w-5xl px-6 py-14 sm:px-10 ${PEDIDO[formato].altura}`}
    >
      {/* O script da rede vive aqui, e não no layout.
          Posto no layout, ele seria baixado em todas as páginas — inclusive
          nas de oração e no diário, que não têm anúncio nenhum —, e com ele
          os cookies da rede. Aqui, só chega às páginas que realmente têm um
          espaço a preencher. O next/script carrega o mesmo endereço uma vez
          só, mesmo que a página tenha dois espaços.

          `lazyOnload` espera o navegador ficar ocioso. Rende um pouco menos
          do que carregar cedo, e é a escolha certa quando todos os espaços
          estão no pé da página: ninguém os vê antes de rolar até lá, e
          enquanto isso o script não disputa a rede com a fotografia que a
          pessoa veio ver. */}
      <Script
        id="rede-de-anuncios"
        src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${EDITOR}`}
        strategy="lazyOnload"
        crossOrigin="anonymous"
      />

      {/* O filete e o rótulo, no mesmo desenho dos separadores da casa. O
          rótulo é pequeno mas legível: tem de ser possível saber que aquilo
          é publicidade sem esforço nenhum. */}
      <div className="flex items-center gap-4">
        <span className="font-[family-name:var(--font-interface)] text-[0.68rem] tracking-[0.22em] text-[color-mix(in_oklab,var(--texto)_42%,transparent)] uppercase">
          {ROTULO}
        </span>
        <div
          aria-hidden
          className="h-px flex-1 bg-[color-mix(in_oklab,var(--realce)_22%,transparent)]"
        />
      </div>

      {/* A moldura.
          Quase todo anúncio gráfico vem sobre fundo branco, e um retângulo
          branco solto sobre a madeira escura parece um buraco na página.
          Um filete de bronze à volta faz dele uma placa emoldurada — o mesmo
          gesto das fotografias da casa. Não encosta no anúncio nem o cobre:
          é moldura por fora, que é o que a rede permite. */}
      <div className="mt-4 p-px shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--realce)_28%,transparent)]">
        <ins
          className="adsbygoogle block"
          style={{ display: "block" }}
          data-ad-client={EDITOR}
          data-ad-slot={unidade}
          data-ad-format={PEDIDO[formato].formato}
          data-full-width-responsive="false"
        />
      </div>
    </aside>
  );
}
