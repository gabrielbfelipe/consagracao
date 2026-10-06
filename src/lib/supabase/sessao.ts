import type { CookieOptions } from "@supabase/ssr";

/**
 * A sessão não sobrevive ao fechar do navegador.
 *
 * A pedido: entrar no sistema é um gesto consciente, feito a cada vez. Não
 * há "continuar conectado". São duas travas, porque uma só não basta.
 *
 * A PRIMEIRA é o cookie de sessão. Tirando `maxAge` e `expires`, o cookie
 * deixa de ter data de validade e o navegador o descarta ao fechar. É o que
 * cobre o caso comum.
 *
 * A SEGUNDA existe porque a primeira tem um furo conhecido: navegador
 * configurado para "continuar de onde parei" restaura cookies de sessão, e
 * aí a sessão atravessaria o fechamento. Por isso o proxy carimba o início
 * da sessão num cookie à parte e recusa qualquer sessão mais velha que
 * VALIDADE_MS, mandando entrar de novo. Essa trava é do servidor, de modo
 * que nenhuma configuração do navegador a contorna.
 */

/** Quanto tempo uma sessão pode durar, contado da entrada. */
export const VALIDADE_MS = 12 * 60 * 60 * 1000;

/** Nome do cookie que guarda o instante da entrada. */
export const COOKIE_ABERTURA = "sessao_aberta_em";

/**
 * Tira a validade das opções de cookie, transformando-o em cookie de sessão.
 *
 * O Supabase pede cookies com um ano de vida. Preservamos todo o resto —
 * `path`, `sameSite`, `secure`, `httpOnly` — e mexemos só na duração.
 */
export function semValidade(opcoes: CookieOptions = {}): CookieOptions {
  const { maxAge: _maxAge, expires: _expires, ...resto } = opcoes;
  return resto;
}

/**
 * Verdadeiro quando a sessão já passou do prazo — ou quando não dá para
 * saber quando ela começou.
 *
 * Carimbo ausente conta como expirado, de propósito. Quem tem token válido
 * mas perdeu o carimbo é ou uma sessão aberta antes desta regra existir, ou
 * alguém que apagou justamente o cookie que limita a duração. Nos dois
 * casos a resposta certa é a mesma: entrar de novo.
 */
export function expirou(
  abertaEm: string | undefined,
  agora = Date.now(),
): boolean {
  const inicio = Number(abertaEm);
  return !abertaEm || !Number.isFinite(inicio) || agora - inicio > VALIDADE_MS;
}

/** O cookie que marca o início da sessão, com as mesmas travas do token. */
export function carimboDeAbertura(agora = Date.now()) {
  return {
    nome: COOKIE_ABERTURA,
    valor: String(agora),
    opcoes: {
      path: "/",
      sameSite: "lax",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    } as const,
  };
}
