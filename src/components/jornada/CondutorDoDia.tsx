"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import Link from "next/link";
import type { Dia } from "@/content/jornada";
import { PASSOS, TOTAL_PASSOS, type PassoId } from "@/lib/jornada/passos";
import type { Etapa } from "@/lib/jornada/etapas";
import { marcarPasso, salvarTexto } from "@/lib/jornada/acoes";

type Props = {
  dia: Dia;
  etapa: Etapa;
  jornadaId: string;
  passosFeitos: PassoId[];
  textos: { reflexao: string; registro: string };
};

/**
 * Conduz a pessoa pelos sete passos do dia, um de cada vez.
 *
 * Cada passo é marcado ao ser deixado para trás, e o que se escreve é
 * guardado sozinho pouco depois de a digitação parar — não há botão de
 * salvar a esquecer no meio de uma oração.
 */
export function CondutorDoDia({
  dia,
  etapa,
  jornadaId,
  passosFeitos,
  textos,
}: Props) {
  const [indice, setIndice] = useState(0);
  const [feitos, setFeitos] = useState<Set<PassoId>>(new Set(passosFeitos));
  const passo = PASSOS[indice];
  const semMovimento = useReducedMotion();

  const [reflexao, setReflexao] = useState(textos.reflexao);
  const [registro, setRegistro] = useState(textos.registro);

  function irPara(novo: number) {
    const deixado = PASSOS[indice].id;
    if (!feitos.has(deixado)) {
      setFeitos(new Set(feitos).add(deixado));
      void marcarPasso(jornadaId, dia.numero, deixado);
    }
    setIndice(novo);
  }

  const transicao = semMovimento
    ? { duration: 0 }
    : { duration: 0.55, ease: [0.22, 0.61, 0.36, 1] as const };

  return (
    <div className="mx-auto w-full max-w-[64ch]">
      <ol className="flex items-center gap-2" aria-label="Passos de hoje">
        {PASSOS.map((p, i) => (
          <li key={p.id} className="flex-1">
            <button
              type="button"
              onClick={() => irPara(i)}
              aria-current={i === indice ? "step" : undefined}
              className="group block w-full py-3"
            >
              <span className="sr-only">
                {p.nome}
                {i === indice ? " (passo atual)" : ""}
                {feitos.has(p.id) ? " — cumprido" : ""}
              </span>
              <span
                aria-hidden
                data-estado={
                  i === indice ? "atual" : feitos.has(p.id) ? "feito" : "adiante"
                }
                className="block h-px w-full transition-all duration-500 ease-[var(--ease-santuario)]
                  group-hover:h-[2px]
                  data-[estado=adiante]:bg-[color-mix(in_oklab,var(--color-bronze)_45%,transparent)]
                  data-[estado=feito]:bg-[color-mix(in_oklab,var(--color-ouro)_70%,transparent)]
                  data-[estado=atual]:h-[2px] data-[estado=atual]:bg-[var(--color-ouro-luz)]
                  data-[estado=atual]:shadow-[0_0_10px_color-mix(in_oklab,var(--color-ouro-luz)_70%,transparent)]"
              />
            </button>
          </li>
        ))}
      </ol>

      <AnimatePresence mode="wait">
        <motion.section
          key={passo.id}
          initial={{ opacity: 0, y: semMovimento ? 0 : 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: semMovimento ? 0 : -8 }}
          transition={transicao}
          className="pt-10"
        >
          <h2 className="font-[family-name:var(--font-livro)] text-[clamp(2rem,1.5rem+2vw,3rem)] leading-tight text-[var(--color-marfim)]">
            {passo.nome}
          </h2>
          <p className="mt-3 font-[family-name:var(--font-livro)] text-lg text-[var(--color-ouro)] italic">
            {passo.instrucao}
          </p>

          <div className="mt-10">
            {passo.id === "prepare" && (
              <div className="voz-livro text-[var(--texto-suave)]">
                <p>{dia.introducao}</p>
                <p>
                  Antes de seguir, fique um momento em silêncio. Sem pedir nada,
                  sem preparar palavra nenhuma. Quando estiver pronto, continue.
                </p>
              </div>
            )}

            {passo.id === "leia" && (
              <div>
                {dia.leitura.paragrafos ? (
                  <div className="superficie-pergaminho px-7 py-7">
                    <p className="font-[family-name:var(--font-livro)] text-sm tracking-wide text-[#6b4f2e]">
                      No seu exemplar do Tratado da Verdadeira Devoção
                    </p>
                    <p className="mt-2 font-[family-name:var(--font-livro)] text-3xl text-[#2a1d12]">
                      {dia.leitura.paragrafos}
                    </p>
                    <p className="mt-4 text-sm leading-relaxed text-[#4a3524]">
                      Leia devagar. Quando terminar, volte aqui para a
                      explicação.
                    </p>
                  </div>
                ) : (
                  <p className="voz-livro text-[var(--texto-suave)]">
                    Hoje não há leitura no Tratado.
                  </p>
                )}

                <div className="voz-livro mt-9 text-[var(--texto-suave)]">
                  {dia.leitura.comentario.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
              </div>
            )}

            {passo.id === "medite" && (
              <ol className="space-y-px">
                {dia.meditacao.map((q, i) => (
                  <li
                    key={i}
                    className="superficie-madeira px-6 py-6 font-[family-name:var(--font-livro)] text-xl leading-relaxed text-[var(--color-marfim)]"
                  >
                    {q}
                  </li>
                ))}
              </ol>
            )}

            {passo.id === "reze" && (
              <div>
                <p className="font-[family-name:var(--font-livro)] text-3xl text-[var(--color-marfim)]">
                  {dia.oracao.nome}
                </p>
                <p className="voz-livro mt-5 text-[var(--texto-suave)]">
                  {dia.oracao.motivo}
                </p>
                <p className="mt-8 text-sm text-[var(--texto-suave)]">
                  O texto completo e o áudio desta oração ficarão na biblioteca.
                </p>
              </div>
            )}

            {passo.id === "reflita" && (
              <Escrita
                rotulo="O que ficou da leitura de hoje?"
                ajuda="Escreva livremente. Não precisa ter forma, nem conclusão."
                valor={reflexao}
                aoMudar={setReflexao}
                gravar={(v) =>
                  salvarTexto(jornadaId, dia.numero, "reflexao", v)
                }
              />
            )}

            {passo.id === "pratique" && (
              <div className="space-y-px">
                <div className="superficie-madeira px-6 py-6">
                  <p className="text-sm text-[var(--texto-suave)]">
                    Exercício de hoje
                  </p>
                  <p className="voz-livro mt-2 text-[var(--color-marfim)]">
                    {dia.exercicio}
                  </p>
                </div>
                <div className="superficie-madeira px-6 py-6">
                  <p className="text-sm text-[var(--texto-suave)]">
                    Jaculatória — repita ao longo do dia
                  </p>
                  <p className="ouro mt-2 font-[family-name:var(--font-livro)] text-2xl">
                    {dia.jaculatoria}
                  </p>
                </div>
                <div className="superficie-madeira px-6 py-6">
                  <p className="text-sm text-[var(--texto-suave)]">Resolução</p>
                  <p className="voz-livro mt-2 text-[var(--color-marfim)]">
                    {dia.resolucao}
                  </p>
                </div>
              </div>
            )}

            {passo.id === "registre" && (
              <Escrita
                rotulo="O que você quer guardar deste dia?"
                ajuda="Uma frase basta. Este texto vai para o seu diário."
                valor={registro}
                aoMudar={setRegistro}
                gravar={(v) =>
                  salvarTexto(jornadaId, dia.numero, "registro", v)
                }
              />
            )}
          </div>
        </motion.section>
      </AnimatePresence>

      <nav className="mt-14 flex items-center justify-between gap-6">
        {indice > 0 ? (
          <button
            type="button"
            onClick={() => irPara(indice - 1)}
            className="text-sm text-[var(--texto-suave)] underline
              decoration-[color-mix(in_oklab,var(--color-ouro)_35%,transparent)] underline-offset-[6px]
              transition-colors hover:text-[var(--color-pergaminho)]"
          >
            Voltar a {PASSOS[indice - 1].nome.toLowerCase()}
          </button>
        ) : (
          <span />
        )}

        {indice < TOTAL_PASSOS - 1 ? (
          <button type="button" onClick={() => irPara(indice + 1)} className={ESTILO_BOTAO}>
            Continuar
          </button>
        ) : (
          <Link
            href="/caminho"
            onClick={() => {
              if (!feitos.has("registre")) {
                void marcarPasso(jornadaId, dia.numero, "registre");
              }
            }}
            className={ESTILO_BOTAO}
          >
            Concluir o dia {dia.numero}
          </Link>
        )}
      </nav>

      <p className="mt-10 text-center text-xs text-[color-mix(in_oklab,var(--color-pergaminho)_40%,transparent)]">
        {etapa.nome} · dia {dia.numero}
      </p>
    </div>
  );
}

const ESTILO_BOTAO = `brilho-borda superficie-vidro inline-flex items-center px-10 py-3.5
  font-[family-name:var(--font-livro)] text-base tracking-[0.26em] indent-[0.26em] uppercase
  text-[var(--color-marfim)] transition-[box-shadow,color] duration-500 ease-[var(--ease-santuario)]
  hover:text-[var(--color-ouro-luz)]
  hover:shadow-[inset_0_0_0_1px_var(--color-ouro),0_0_28px_-10px_color-mix(in_oklab,var(--color-ouro)_70%,transparent)]`;

/** Campo de escrita que se guarda sozinho quando a digitação para. */
function Escrita({
  rotulo,
  ajuda,
  valor,
  aoMudar,
  gravar,
}: {
  rotulo: string;
  ajuda: string;
  valor: string;
  aoMudar: (v: string) => void;
  gravar: (v: string) => Promise<void>;
}) {
  const [estado, setEstado] = useState<"parado" | "gravando" | "guardado">(
    "parado",
  );
  const tempo = useRef<ReturnType<typeof setTimeout> | null>(null);
  const gravarRef = useRef(gravar);
  gravarRef.current = gravar;

  const agendar = useCallback((texto: string) => {
    if (tempo.current) clearTimeout(tempo.current);
    setEstado("gravando");
    tempo.current = setTimeout(async () => {
      try {
        await gravarRef.current(texto);
        setEstado("guardado");
      } catch {
        setEstado("parado");
      }
    }, 900);
  }, []);

  useEffect(() => () => void (tempo.current && clearTimeout(tempo.current)), []);

  return (
    <label className="block">
      <span className="font-[family-name:var(--font-livro)] text-xl text-[var(--color-marfim)]">
        {rotulo}
      </span>
      <span className="mt-1 block text-sm text-[var(--texto-suave)]">
        {ajuda}
      </span>
      <textarea
        value={valor}
        onChange={(e) => {
          aoMudar(e.target.value);
          agendar(e.target.value);
        }}
        rows={9}
        className="superficie-pergaminho mt-5 block w-full resize-y px-6 py-5
          font-[family-name:var(--font-livro)] text-lg leading-[1.75] text-[#2a1d12]
          placeholder:text-[#8a6f52] focus:outline-none"
        placeholder="…"
      />
      <span
        aria-live="polite"
        className="mt-2 block h-5 text-sm text-[var(--texto-suave)]"
      >
        {estado === "gravando" && "Guardando…"}
        {estado === "guardado" && "Guardado"}
      </span>
    </label>
  );
}
