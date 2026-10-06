"use server";

import { redirect } from "next/navigation";
import {
  clienteServidor,
  marcarAberturaDaSessao,
} from "@/lib/supabase/servidor";
import { clienteAdmin } from "@/lib/supabase/admin";
import { valorDeLista, valorDeTexto } from "@/content/cadastro";

/**
 * O que a pessoa escreveu, devolvido quando o cadastro é recusado.
 *
 * Depois de uma ação de formulário o React limpa os campos não controlados.
 * Num formulário de três campos isso passa despercebido; aqui são catorze, e
 * quem esquecia de marcar o consentimento perdia tudo o que tinha digitado.
 * Por isso os valores voltam e são reaplicados como padrão.
 *
 * As senhas não voltam. Não há razão para fazê-las atravessar de novo a
 * rede e ficar num estado do cliente — são duas linhas para redigitar.
 */
export type ValoresDoCadastro = Record<string, string>;

export type EstadoCadastro =
  | { situacao: "inicial" }
  | {
      situacao: "erro";
      mensagem: string;
      campo?: string;
      valores: ValoresDoCadastro;
      /** Sobe a cada recusa, e serve de chave para reaplicar os padrões. */
      tentativa: number;
    };

/** Tudo o que o formulário mandou, menos as senhas. */
const CAMPOS_DEVOLVIDOS = [
  "nome", "email", "diocese", "paroquia", "movimento",
  "uf", "faixa_etaria", "estado_de_vida", "ja_se_consagrou",
  "frequencia_missa", "reza_terco", "como_conheceu",
] as const;

const SENHA_MINIMA = 8;

/**
 * Cria a conta e entra nela.
 *
 * POR ENQUANTO SEM VERIFICAÇÃO DE E-MAIL. A conta nasce com o endereço já
 * dado por confirmado, de modo que ninguém precisa esperar mensagem alguma.
 * O preço é real: sem verificação, nada impede alguém de se cadastrar com um
 * e-mail que não é seu. Quem controla a conta é quem escolheu a senha.
 *
 * Os dados do perfil viajam como metadados do usuário e são gravados pelo
 * gatilho que cria o perfil, dentro da mesma transação. Assim não existe
 * instante em que a conta exista e o perfil esteja vazio, e não há uma
 * segunda escrita que possa falhar sozinha e deixar o cadastro pela metade.
 */
export async function criarConta(
  anterior: EstadoCadastro,
  dados: FormData,
): Promise<EstadoCadastro> {
  const tentativa =
    anterior.situacao === "erro" ? anterior.tentativa + 1 : 1;

  const valores: ValoresDoCadastro = Object.fromEntries(
    CAMPOS_DEVOLVIDOS.map((c) => [c, String(dados.get(c) ?? "")]),
  );

  const recusar = (mensagem: string, campo?: string): EstadoCadastro => ({
    situacao: "erro",
    mensagem,
    campo,
    valores,
    tentativa,
  });

  const email = String(dados.get("email") ?? "")
    .trim()
    .toLowerCase();
  const senha = String(dados.get("senha") ?? "");
  const repetida = String(dados.get("senha_repetida") ?? "");
  const nome = valorDeTexto(dados.get("nome"), 120);

  if (!nome) {
    return recusar(
      "Diga como você quer ser chamado.",
      "nome",
    );
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return recusar(
      "Confira o endereço de e-mail.",
      "email",
    );
  }

  if (senha.length < SENHA_MINIMA) {
    return recusar(
      `A senha precisa ter ao menos ${SENHA_MINIMA} caracteres.`,
      "senha",
    );
  }

  if (senha !== repetida) {
    return recusar(
      "As duas senhas não são iguais.",
      "senha_repetida",
    );
  }

  if (dados.get("consentimento") !== "sim") {
    return recusar(
      "Sem o seu consentimento não podemos guardar nada. Marque a caixa para continuar.",
      "consentimento",
    );
  }

  const fuso = String(dados.get("fuso") ?? "America/Sao_Paulo");
  if (!fusoValido(fuso)) {
    return recusar("Fuso horário não reconhecido.", "fuso");
  }

  const admin = clienteAdmin();
  const { error: erroCriacao } = await admin.auth.admin.createUser({
    email,
    password: senha,
    email_confirm: true,
    user_metadata: {
      nome,
      fuso,
      consentimento: "sim",
      diocese: valorDeTexto(dados.get("diocese")),
      paroquia: valorDeTexto(dados.get("paroquia")),
      movimento: valorDeTexto(dados.get("movimento")),
      uf: valorDeLista("uf", dados.get("uf")),
      faixa_etaria: valorDeLista("faixa_etaria", dados.get("faixa_etaria")),
      estado_de_vida: valorDeLista("estado_de_vida", dados.get("estado_de_vida")),
      ja_se_consagrou: valorDeLista("ja_se_consagrou", dados.get("ja_se_consagrou")),
      frequencia_missa: valorDeLista("frequencia_missa", dados.get("frequencia_missa")),
      reza_terco: valorDeLista("reza_terco", dados.get("reza_terco")),
      como_conheceu: valorDeLista("como_conheceu", dados.get("como_conheceu")),
    },
  });

  if (erroCriacao) {
    const jaExistia =
      erroCriacao.code === "email_exists" ||
      erroCriacao.status === 422 ||
      /already/i.test(erroCriacao.message);

    return recusar(
      jaExistia
        ? "Já existe uma conta com este e-mail. Entre por ela."
        : "Não foi possível criar a conta agora. Tente novamente.",
      "email",
    );
  }

  const supabase = await clienteServidor();
  const { error: erroEntrada } = await supabase.auth.signInWithPassword({
    email,
    password: senha,
  });

  if (erroEntrada) {
    return recusar(
      "A conta foi criada, mas não conseguimos entrar agora. Use a tela de entrada.",
    );
  }

  // O relógio da sessão começa a contar agora. Ver lib/supabase/sessao.ts.
  await marcarAberturaDaSessao();

  // redirect() lança por dentro; fica fora de qualquer try para não ser
  // confundido com erro.
  redirect("/calendario");
}

function fusoValido(fuso: string): boolean {
  try {
    new Intl.DateTimeFormat("en-CA", { timeZone: fuso });
    return true;
  } catch {
    return false;
  }
}
