import { ETAPAS, etapaDoDia, TOTAL_DIAS } from "@/lib/jornada/etapas";

type Props = {
  /** Dia em que o usuário está, de 1 a 33. */
  diaAtual: number;
  /** Dias já concluídos — não precisam ser contíguos. */
  concluidos?: number[];
};

/**
 * A colunata dos 33 dias.
 *
 * Não é uma barra de progresso: é um corredor de arcos que vai sendo
 * iluminado. Dia concluído está aceso, o dia de hoje é o mais luminoso,
 * e o que ainda virá permanece na penumbra.
 */
export function Colunata({ diaAtual, concluidos = [] }: Props) {
  const feitos = new Set(concluidos);
  const etapa = etapaDoDia(diaAtual);

  return (
    <div
      role="img"
      aria-label={`Dia ${diaAtual} de ${TOTAL_DIAS}. ${feitos.size} dias concluídos. Etapa: ${etapa.nome}.`}
      className="flex w-full items-end gap-[clamp(0.5rem,2vw,1.25rem)]"
    >
      {ETAPAS.map((e) => (
        <div key={e.id} className="flex flex-1 flex-col gap-2">
          <div className="flex items-end gap-[2px]">
            {Array.from({ length: e.dias }, (_, i) => {
              const dia = e.primeiroDia + i;
              const aceso = feitos.has(dia);
              const hoje = dia === diaAtual;

              return (
                <span
                  key={dia}
                  data-estado={hoje ? "hoje" : aceso ? "aceso" : "penumbra"}
                  className="arco block h-7 flex-1 sm:h-9
                    data-[estado=penumbra]:bg-[color-mix(in_oklab,var(--color-sombra)_72%,transparent)]
                    data-[estado=penumbra]:shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--color-bronze)_28%,transparent)]
                    data-[estado=aceso]:bg-[linear-gradient(to_top,color-mix(in_oklab,var(--color-ouro-fundo)_85%,transparent),color-mix(in_oklab,var(--color-ouro)_70%,transparent))]
                    data-[estado=hoje]:bg-[linear-gradient(to_top,var(--color-ouro),var(--color-ouro-luz))]
                    data-[estado=hoje]:shadow-[0_0_18px_-2px_color-mix(in_oklab,var(--color-ouro-luz)_65%,transparent)]"
                />
              );
            })}
          </div>
          <span className="font-[family-name:var(--font-interface)] text-[0.6875rem] leading-tight text-[var(--texto-suave)]">
            {e.rotuloCurto}
          </span>
        </div>
      ))}
    </div>
  );
}
