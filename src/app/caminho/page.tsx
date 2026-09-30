import Link from "next/link";
import type { Metadata } from "next";
import { Colunata } from "@/components/jornada/Colunata";
import { TOTAL_DIAS, etapaDoDia } from "@/lib/jornada/etapas";
import {
  diaCorrente,
  diasEmAtraso,
  jornadaAtual,
  type Jornada,
} from "@/lib/jornada/repositorio";
import { diaEMes, porExtenso } from "@/lib/agenda/dataSimples";

export const metadata: Metadata = { title: "Meu Caminho" };

export default async function Caminho() {
  const jornada = await jornadaAtual();

  if (!jornada) return <SemJornada />;
  if (jornada.situacao.fase === "aguardando") {
    return (
      <Aguardando jornada={jornada} faltam={jornada.situacao.diasAteComecar} />
    );
  }
  if (jornada.situacao.fase === "grande-dia") {
    return <GrandeDia jornada={jornada} />;
  }
  if (jornada.situacao.fase === "consagrado") {
    return <Consagrado jornada={jornada} />;
  }

  return <EmCurso jornada={jornada} />;
}

/* -------------------------------------------------------------------------- */

function Moldura({
  sala,
  children,
}: {
  sala: string;
  children: React.ReactNode;
}) {
  return (
    <main
      data-sala={sala}
      className="luz-alta flex min-h-dvh flex-col justify-center px-6 py-20 sm:px-10"
    >
      <div className="mx-auto w-full max-w-4xl text-center">{children}</div>
    </main>
  );
}

function Botao({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="brilho-borda superficie-vidro mt-12 inline-flex items-center px-12 py-4
        font-[family-name:var(--font-livro)] text-lg tracking-[0.3em] indent-[0.3em] uppercase
        text-[var(--color-marfim)] transition-[box-shadow,color] duration-500 ease-[var(--ease-santuario)]
        hover:text-[var(--color-ouro-luz)]
        hover:shadow-[inset_0_0_0_1px_var(--color-ouro),0_0_32px_-10px_color-mix(in_oklab,var(--color-ouro)_70%,transparent)]"
    >
      {children}
    </Link>
  );
}

/* -------------------------------------------------------------------------- */

function SemJornada() {
  return (
    <Moldura sala="biblioteca">
      <h1 className="font-[family-name:var(--font-livro)] text-[clamp(2rem,1.5rem+2.4vw,3.25rem)] leading-tight text-[var(--color-marfim)]">
        Sua jornada ainda não começou
      </h1>
      <p className="voz-livro mx-auto mt-8 text-[var(--texto-suave)]">
        Escolha a festa de Nossa Senhora em que deseja se consagrar. A partir
        dela, o caminho de trinta e três dias é preparado para você.
      </p>
      <Botao href="/calendario">Escolher a data</Botao>
    </Moldura>
  );
}

function Aguardando({ jornada, faltam }: { jornada: Jornada; faltam: number }) {
  return (
    <Moldura sala="biblioteca">
      <p className="font-[family-name:var(--font-livro)] tracking-[0.28em] text-[var(--texto-suave)] uppercase">
        {jornada.festa.nome}
      </p>
      <h1 className="mt-5 font-[family-name:var(--font-livro)] text-[clamp(2rem,1.5rem+2.4vw,3.25rem)] leading-tight text-[var(--color-marfim)]">
        {faltam === 1 ? "Amanhã você começa" : `Faltam ${faltam} dias`}
      </h1>
      <p className="voz-livro mx-auto mt-8 text-[var(--texto-suave)]">
        Sua preparação começa em {porExtenso(jornada.inicio)} e o dia da
        consagração será {porExtenso(jornada.consagracao)}. Enquanto isso, você
        pode ler o guia e providenciar seu exemplar do Tratado.
      </p>
      <Botao href="/guia">Ler o guia</Botao>
    </Moldura>
  );
}

function EmCurso({ jornada }: { jornada: Jornada }) {
  const dia = diaCorrente(jornada);
  const etapa = etapaDoDia(dia);
  const atraso = diasEmAtraso(jornada);
  const acesos = jornada.concluidos.length;

  return (
    <Moldura sala={etapa.sala}>
      <p className="font-[family-name:var(--font-livro)] text-lg tracking-[0.28em] text-[var(--texto-suave)] uppercase">
        Dia {dia} de {TOTAL_DIAS}
      </p>

      <h1 className="mt-5 font-[family-name:var(--font-livro)] text-[clamp(2.25rem,1.5rem+3vw,3.75rem)] leading-[1.1] text-balance text-[var(--color-marfim)]">
        {etapa.nome}
      </h1>

      <p className="voz-livro mx-auto mt-8 text-[var(--texto-suave)]">
        {etapa.proposito}
      </p>

      <div className="mt-20">
        <Colunata diaAtual={dia} concluidos={jornada.concluidos} />
      </div>

      <p className="mt-12 text-sm text-[var(--texto-suave)]">
        {acesos === 0
          ? "Nenhum dia aceso ainda."
          : `${acesos} ${acesos === 1 ? "dia aceso" : "dias acesos"}.`}{" "}
        Sua consagração é em {diaEMes(jornada.consagracao)}.
      </p>

      {atraso > 0 && (
        <p className="voz-livro mx-auto mt-6 text-[var(--color-ouro)]">
          O calendário seguiu sem você por {atraso}{" "}
          {atraso === 1 ? "dia" : "dias"}, e isso não é problema. Continue de
          onde parou; nada do que você viveu se perdeu.
        </p>
      )}

      <Botao href={`/dia/${dia}`}>Entrar no dia {dia}</Botao>
    </Moldura>
  );
}

function GrandeDia({ jornada }: { jornada: Jornada }) {
  return (
    <Moldura sala="altar">
      <h1 className="font-[family-name:var(--font-livro)] text-[clamp(2.5rem,1.6rem+3.6vw,4.5rem)] leading-[1.05] tracking-[0.04em] text-[var(--color-marfim)]">
        Hoje é o dia
      </h1>
      <p className="voz-livro mx-auto mt-8 text-[var(--texto-suave)]">
        Sua jornada de preparação chegou ao seu destino. Hoje,{" "}
        {porExtenso(jornada.consagracao)}, na festa de {jornada.festa.nome},
        você faz sua consagração.
      </p>
      <p className="mt-10 text-sm text-[var(--texto-suave)]">
        O guia completo deste dia está sendo preparado.
      </p>
    </Moldura>
  );
}

function Consagrado({ jornada }: { jornada: Jornada }) {
  const dias =
    jornada.situacao.fase === "consagrado"
      ? jornada.situacao.diasDesdeConsagracao
      : 0;

  return (
    <Moldura sala="altar">
      <h1 className="font-[family-name:var(--font-livro)] text-[clamp(2rem,1.5rem+2.4vw,3.25rem)] leading-tight text-[var(--color-marfim)]">
        Agora começa uma nova etapa
      </h1>
      <p className="voz-livro mx-auto mt-8 text-[var(--texto-suave)]">
        Você se consagrou em {porExtenso(jornada.consagracao)}, há {dias}{" "}
        {dias === 1 ? "dia" : "dias"}. O que se prometeu num dia vive-se nos
        outros, e é essa parte que queremos acompanhar com você.
      </p>
      <p className="mt-10 text-sm text-[var(--texto-suave)]">
        A jornada de pós-consagração está sendo preparada.
      </p>
    </Moldura>
  );
}
