"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import Link from "next/link";
import {
  criarConta,
  type EstadoCadastro,
  type ValoresDoCadastro,
} from "@/app/cadastro/acoes";
import { PERGUNTAS, type Pergunta } from "@/content/cadastro";
import { useFusoDoAparelho } from "@/lib/conta/fusoDoAparelho";

/**
 * O cadastro, em três blocos: a conta, quem é a pessoa, e o consentimento.
 *
 * Só o nome, o e-mail e a senha são obrigatórios. As perguntas eclesiais
 * existem para sabermos de onde vem quem usa isto, e qualquer uma pode
 * ficar em branco — o que está dito em cada rótulo, e não só no fim.
 *
 * O consentimento vem na mesma tela porque é aqui que os dados nascem.
 * Pedi-lo depois seria pedir permissão para guardar o que já foi guardado.
 */
export function FormularioCadastro() {
  const [estado, acao] = useActionState<EstadoCadastro, FormData>(criarConta, {
    situacao: "inicial",
  });

  // O fuso vai junto, sem perguntar: é o que decide quando um dia da jornada
  // começa e termina. Fica corrigível depois, na conta.
  const fuso = useFusoDoAparelho();

  const erroDe = (campo: string) =>
    estado.situacao === "erro" && estado.campo === campo
      ? estado.mensagem
      : undefined;

  // Depois de uma ação de formulário o React limpa os campos não
  // controlados. São catorze aqui: perder tudo por causa de uma caixa não
  // marcada é inaceitável. A ação devolve o que foi escrito, e a chave por
  // tentativa remonta cada campo para que o novo padrão valha.
  //
  // A chave vai nos CAMPOS, nunca no <form>. Remontar o formulário inteiro
  // deixa o useFormStatus do botão presa em "enviando", e o botão nunca mais
  // reabilita — a segunda tentativa não chega a sair do navegador.
  const valores: ValoresDoCadastro =
    estado.situacao === "erro" ? estado.valores : {};
  const tentativa = estado.situacao === "erro" ? estado.tentativa : 0;

  return (
    <form action={acao} className="w-full text-left">
      <input type="hidden" name="fuso" value={fuso} />

      {/* --- A conta ------------------------------------------------------ */}
      <fieldset>
        <legend className="sr-only">Sua conta</legend>

        <Campo
          key={`nome-${tentativa}`}
          nome="nome"
          rotulo="Como você quer ser chamado?"
          ajuda="É o nome com que o sistema vai falar com você."
          autoComplete="given-name"
          obrigatorio
          maximo={120}
          valor={valores.nome}
          erro={erroDe("nome")}
        />

        <Campo
          key={`email-${tentativa}`}
          nome="email"
          tipo="email"
          rotulo="Seu e-mail"
          autoComplete="email"
          marcador="nome@exemplo.com"
          obrigatorio
          valor={valores.email}
          erro={erroDe("email")}
        />

        <div className="mt-7 grid gap-7 sm:grid-cols-2">
          <Campo
            nome="senha"
            tipo="password"
            rotulo="Sua senha"
            ajuda="Ao menos oito caracteres."
            autoComplete="new-password"
            minimo={8}
            obrigatorio
            semMargem
            erro={erroDe("senha")}
          />
          <Campo
            nome="senha_repetida"
            tipo="password"
            rotulo="Repita a senha"
            ajuda="Para não guardar um erro de digitação."
            autoComplete="new-password"
            minimo={8}
            obrigatorio
            semMargem
            erro={erroDe("senha_repetida")}
          />
        </div>
      </fieldset>

      {/* --- Quem é a pessoa ---------------------------------------------- */}
      <fieldset className="mt-16">
        <legend className="font-[family-name:var(--font-livro)] text-[clamp(1.3rem,1.1rem+0.6vw,1.7rem)] text-[var(--texto)]">
          Um pouco sobre você
        </legend>
        <p className="mt-2 max-w-[56ch] text-sm leading-relaxed text-[var(--texto-suave)]">
          Nada aqui é obrigatório, e nada muda a sua jornada. Serve para
          sabermos quem chega até este lugar. Se não souber alguma resposta de
          cabeça, deixe em branco e siga.
        </p>

        <div
          aria-hidden
          className="mt-7 h-px w-20 bg-[linear-gradient(to_right,var(--realce),transparent)]"
        />

        <div className="mt-8 grid gap-7 sm:grid-cols-2">
          {PERGUNTAS.map((p) => (
            <PerguntaDoCadastro
              key={`${p.nome}-${tentativa}`}
              pergunta={p}
              valor={valores[p.nome]}
            />
          ))}
        </div>
      </fieldset>

      {/* --- O consentimento ---------------------------------------------- */}
      <div className="superficie-pergaminho mt-16 px-7 py-7">
        <h2 className="font-[family-name:var(--font-livro)] text-2xl leading-snug text-[#2a1d12]">
          Antes de guardar qualquer coisa
        </h2>

        <div className="mt-4 font-[family-name:var(--font-livro)] text-[1.05rem] leading-[1.75] text-[#3d2c1c]">
          <p>
            Para acompanhar sua preparação, precisamos guardar o que você
            respondeu acima, a data que escolher, os dias que concluir e o que
            escrever no diário. Isso revela sua convicção religiosa, que a Lei
            Geral de Proteção de Dados trata como dado sensível.
          </p>
          <p className="mt-4">
            O que você escreve é seu e de mais ninguém. Não vendemos, não
            compartilhamos e não usamos para treinar nenhum modelo. Nenhum
            texto seu vai para a inteligência artificial sem que você clique
            para isso. Você pode apagar tudo a qualquer momento, e apagar
            significa apagar.
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

        {erroDe("consentimento") && (
          <p role="alert" className="mt-4 text-sm font-medium text-[#7a2e1e]">
            {erroDe("consentimento")}
          </p>
        )}
      </div>

      {/* O erro sem campo próprio — o que não cabe ao lado de uma caixa. */}
      {estado.situacao === "erro" && !estado.campo && (
        <p
          role="alert"
          className="mt-7 border-l-2 border-[var(--realce)] pl-4 text-sm leading-relaxed text-[var(--texto)]"
        >
          {estado.mensagem}
        </p>
      )}

      <Continuar />

      <p className="mt-7 text-center text-sm text-[var(--texto-suave)]">
        Já tem conta?{" "}
        <Link
          href="/entrar"
          className="underline decoration-[color-mix(in_oklab,var(--realce)_50%,transparent)] underline-offset-[5px] transition-colors hover:text-[var(--realce)]"
        >
          Entrar
        </Link>
      </p>
    </form>
  );
}

/** Uma pergunta do módulo de cadastro: vira lista ou campo de texto. */
function PerguntaDoCadastro({
  pergunta,
  valor,
}: {
  pergunta: Pergunta;
  valor?: string;
}) {
  const classe = pergunta.largura === "inteira" ? "sm:col-span-2" : undefined;

  if (pergunta.opcoes) {
    return (
      <label className={`flex h-full flex-col ${classe ?? ""}`}>
        <Rotulo rotulo={pergunta.rotulo} ajuda={pergunta.ajuda} />
        <select
          name={pergunta.nome}
          defaultValue={valor ?? ""}
          className={`${CAMPO} mt-auto`}
        >
          <option value="">Prefiro não dizer</option>
          {pergunta.opcoes.map((o) => (
            <option key={o.valor} value={o.valor}>
              {o.rotulo}
            </option>
          ))}
        </select>
      </label>
    );
  }

  return (
    <Campo
      nome={pergunta.nome}
      rotulo={pergunta.rotulo}
      ajuda={pergunta.ajuda}
      maximo={pergunta.maximo}
      autoComplete={pergunta.autoComplete}
      valor={valor}
      classe={classe}
      semMargem
    />
  );
}

/**
 * O rótulo e a sua ajuda.
 *
 * Fica num bloco com folga embaixo porque o campo é empurrado para o pé da
 * célula pelo `mt-auto`: sem a folga, um rótulo de uma linha encostaria no
 * campo numa coluna e não na outra. É o que alinha os campos entre si
 * mesmo quando um dos rótulos ocupa duas linhas e o vizinho ocupa uma.
 */
function Rotulo({ rotulo, ajuda }: { rotulo: string; ajuda?: string }) {
  return (
    <span className="block pb-2">
      <span className="font-[family-name:var(--font-livro)] text-base text-[var(--texto)]">
        {rotulo}
      </span>
      {ajuda && (
        <span className="mt-0.5 block text-sm leading-snug text-[color-mix(in_oklab,var(--texto)_58%,transparent)]">
          {ajuda}
        </span>
      )}
    </span>
  );
}

function Campo({
  nome,
  rotulo,
  ajuda,
  tipo = "text",
  marcador,
  autoComplete,
  obrigatorio = false,
  minimo,
  maximo,
  erro,
  valor,
  classe,
  semMargem = false,
}: {
  nome: string;
  rotulo: string;
  ajuda?: string;
  tipo?: string;
  marcador?: string;
  autoComplete?: string;
  obrigatorio?: boolean;
  minimo?: number;
  maximo?: number;
  erro?: string;
  /** O que a pessoa já tinha escrito, devolvido por uma recusa. */
  valor?: string;
  classe?: string;
  semMargem?: boolean;
}) {
  return (
    <label
      className={`flex h-full flex-col ${semMargem ? "" : "mt-7"} ${classe ?? ""}`}
    >
      <Rotulo rotulo={rotulo} ajuda={ajuda} />
      <input
        type={tipo}
        name={nome}
        required={obrigatorio}
        minLength={minimo}
        maxLength={maximo}
        placeholder={marcador}
        autoComplete={autoComplete}
        defaultValue={valor ?? ""}
        aria-invalid={erro ? true : undefined}
        className={`${CAMPO} mt-auto`}
      />
      {erro && (
        <span role="alert" className="mt-2 block text-sm text-[var(--realce)]">
          {erro}
        </span>
      )}
    </label>
  );
}

const CAMPO = `block w-full bg-[color-mix(in_oklab,var(--fundo-longe)_45%,transparent)] px-5 py-3.5
  font-[family-name:var(--font-livro)] text-lg text-[var(--texto)]
  shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--realce)_38%,transparent)]
  placeholder:text-[color-mix(in_oklab,var(--texto)_38%,transparent)]
  transition-shadow duration-300
  focus:outline-none focus-visible:shadow-[inset_0_0_0_2px_var(--realce)]
  aria-[invalid]:shadow-[inset_0_0_0_2px_var(--realce)]`;

function Continuar() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="brilho-borda mt-10 inline-flex w-full items-center justify-center px-10 py-4
        font-[family-name:var(--font-livro)] text-base tracking-[0.28em] indent-[0.28em] uppercase
        text-[var(--texto)]
        shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--realce)_75%,transparent)]
        transition-[box-shadow,color,opacity] duration-500 ease-[var(--ease-santuario)]
        hover:text-[var(--realce)] hover:shadow-[inset_0_0_0_2px_var(--realce)]
        disabled:opacity-55"
    >
      {pending ? "Criando sua conta" : "Criar conta"}
    </button>
  );
}
