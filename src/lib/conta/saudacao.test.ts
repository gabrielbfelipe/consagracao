import { describe, expect, it } from "vitest";
import { periodoEm, primeiroNome, saudacao } from "./saudacao";

const SP = "America/Sao_Paulo";

/** Um instante UTC, para que cada caso diga a hora que quer testar. */
const em = (utc: string) => new Date(utc);

describe("periodoEm", () => {
  it("conta a hora no fuso da pessoa, não na do servidor", () => {
    // 21h UTC é 18h em São Paulo: noite ali, embora o servidor já diga outra
    // coisa. É o caso que motivou a função.
    expect(periodoEm(SP, em("2026-10-06T21:00:00Z"))).toBe("noite");
    expect(periodoEm("UTC", em("2026-10-06T21:00:00Z"))).toBe("noite");
    expect(periodoEm("Europe/Lisbon", em("2026-10-06T21:00:00Z"))).toBe("noite");
  });

  it("vira para a tarde ao meio-dia e para a noite às dezoito", () => {
    expect(periodoEm(SP, em("2026-10-06T14:59:00Z"))).toBe("manha"); // 11:59
    expect(periodoEm(SP, em("2026-10-06T15:00:00Z"))).toBe("tarde"); // 12:00
    expect(periodoEm(SP, em("2026-10-06T20:59:00Z"))).toBe("tarde"); // 17:59
    expect(periodoEm(SP, em("2026-10-06T21:00:00Z"))).toBe("noite"); // 18:00
  });

  it("põe a madrugada na manhã, e não na noite", () => {
    // "Boa noite" em português também é despedida. Dizê-la a quem acabou de
    // abrir o aplicativo às três da manhã é pior do que um "bom dia" cedo.
    expect(periodoEm(SP, em("2026-10-06T06:00:00Z"))).toBe("manha"); // 03:00
    expect(periodoEm(SP, em("2026-10-06T03:00:00Z"))).toBe("manha"); // 00:00
  });

  it("não derruba a página com um fuso inválido guardado no perfil", () => {
    expect(() => periodoEm("Nao/Existe", em("2026-10-06T15:00:00Z"))).not.toThrow();
  });
});

describe("saudacao", () => {
  it("chama pelo primeiro nome", () => {
    expect(saudacao("Gabriel Belentani", SP, em("2026-10-06T15:00:00Z"))).toBe(
      "Boa tarde, Gabriel",
    );
  });

  it("cumprimenta mesmo quem não deu nome", () => {
    expect(saudacao(null, SP, em("2026-10-06T12:00:00Z"))).toBe("Bom dia");
    expect(saudacao("   ", SP, em("2026-10-06T12:00:00Z"))).toBe("Bom dia");
  });
});

describe("primeiroNome", () => {
  it("devolve só a primeira palavra", () => {
    expect(primeiroNome("Maria das Dores")).toBe("Maria");
    expect(primeiroNome("  João  Pedro ")).toBe("João");
  });

  it("devolve nulo quando não há nome", () => {
    expect(primeiroNome(null)).toBeNull();
    expect(primeiroNome("")).toBeNull();
  });
});
