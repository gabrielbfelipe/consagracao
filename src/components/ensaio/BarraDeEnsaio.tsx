"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { irParaODia, apagarEnsaio } from "@/lib/ensaio/acoes";
import { DIA_DA_CONSAGRACAO } from "@/lib/ensaio/modo";
import { TOTAL_DIAS } from "@/lib/jornada/etapas";

/**
 * A régua do ensaio, fixa no pé da tela.
 *
 * Deliberadamente feia: faixa âmbar, letra de interface, nada do desenho do
 * santuário. Se ela se parecesse com o resto, alguém acabaria por confundi-la
 * com uma funcionalidade — e ela não é. É um andaime, e andaime tem de
 * parecer andaime.
 *
 * Os botões chamam a ação diretamente e seguem com router.refresh(), em vez
 * de a ação terminar com redirect(). O motivo é um comportamento específico
 * do roteador: quando o redirect() de um Server Action aponta para a mesma
 * página de onde o botão foi clicado, a navegação que ele dispara é do lado
 * do cliente, e o roteador pode reaproveitar o que já tinha em cache em vez
 * de buscar de novo — a ação respondia com sucesso, a data mudava no banco,
 * e a régua continuava a dizer o dia antigo. router.refresh() não tem essa
 * ambiguidade: busca de novo o que está na tela, sempre.
 *
 * Só aparece sobre a jornada de ensaio, e o servidor recusa estas ações
 * sobre qualquer outra.
 */
export function BarraDeEnsaio({
  diaAtual,
}: {
  /** O dia em cena, de 1 a 33, ou 34 no Grande Dia. */
  diaAtual: number;
}) {
  const router = useRouter();
  const [emAndamento, iniciarTransicao] = useTransition();

  const anterior = Math.max(1, diaAtual - 1);
  const proximo = Math.min(DIA_DA_CONSAGRACAO, diaAtual + 1);

  function irPara(dia: number) {
    iniciarTransicao(async () => {
      await irParaODia(dia);
      router.refresh();
    });
  }

  function apagar() {
    iniciarTransicao(async () => {
      await apagarEnsaio();
      router.push("/calendario");
      router.refresh();
    });
  }

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t-2 border-[#c98a2e] bg-[#1a1206]/97 px-4 py-3 backdrop-blur-sm">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-x-4 gap-y-2 font-[family-name:var(--font-interface)] text-sm">
        <span className="font-semibold tracking-wide text-[#e8b964] uppercase">
          Ensaio{emAndamento ? "…" : ""}
        </span>

        <span className="text-[#cbb79a]">
          {diaAtual > TOTAL_DIAS
            ? "Grande Dia"
            : `Dia ${diaAtual} de ${TOTAL_DIAS}`}
        </span>

        <span aria-hidden className="text-[#5c4a30]">
          |
        </span>

        <Passo para={1} atual={diaAtual} rotulo="« Dia 1" onIr={irPara} desligado={emAndamento} />
        <Passo para={anterior} atual={diaAtual} rotulo="‹ Anterior" onIr={irPara} desligado={emAndamento} />
        <Passo para={proximo} atual={diaAtual} rotulo="Próximo ›" onIr={irPara} desligado={emAndamento} />
        <Passo para={TOTAL_DIAS} atual={diaAtual} rotulo="Dia 33" onIr={irPara} desligado={emAndamento} />
        <Passo
          para={DIA_DA_CONSAGRACAO}
          atual={diaAtual}
          rotulo="Grande Dia »"
          onIr={irPara}
          desligado={emAndamento}
        />

        <span aria-hidden className="text-[#5c4a30]">
          |
        </span>

        {/* Saltos largos, para alcançar o meio da jornada sem clicar trinta
            vezes. Cada etapa começa num destes dias. */}
        {[13, 20, 27].map((d) => (
          <Passo
            key={d}
            para={d}
            atual={diaAtual}
            rotulo={`Dia ${d}`}
            onIr={irPara}
            desligado={emAndamento}
          />
        ))}

        <span aria-hidden className="text-[#5c4a30]">
          |
        </span>

        <button
          type="button"
          onClick={apagar}
          disabled={emAndamento}
          className="rounded-sm px-2.5 py-1 text-[#cbb79a] underline decoration-[#8a6b2e] underline-offset-4
            transition-colors hover:text-[#e8b964] disabled:opacity-50"
        >
          Apagar e escolher outra data
        </button>
      </div>
    </div>
  );
}

function Passo({
  para,
  atual,
  rotulo,
  onIr,
  desligado,
}: {
  para: number;
  atual: number;
  rotulo: string;
  onIr: (dia: number) => void;
  desligado: boolean;
}) {
  const aqui = para === atual;

  return (
    <button
      type="button"
      onClick={() => onIr(para)}
      disabled={aqui || desligado}
      aria-current={aqui ? "true" : undefined}
      className={`rounded-sm px-2.5 py-1 transition-colors disabled:cursor-default ${
        aqui
          ? "bg-[#3a2a12] text-[#e8b964]"
          : "text-[#cbb79a] hover:bg-[#2a1d0c] hover:text-[#e8b964] disabled:opacity-50"
      }`}
    >
      {rotulo}
    </button>
  );
}
