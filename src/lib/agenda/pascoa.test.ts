import { describe, expect, it } from "vitest";
import { dataMovel, pascoa } from "./pascoa";

/**
 * As datas de conferência vêm do calendário litúrgico e, para a Penha, do
 * que o próprio Convento publicou: 28 de abril em 2025 e 13 de abril em
 * 2026. Se alguma linha destas falhar, o cômputo foi mexido.
 */
describe("o cômputo da Páscoa", () => {
  const CONHECIDAS: [number, string][] = [
    [2020, "2020-04-12"],
    [2021, "2021-04-04"],
    [2022, "2022-04-17"],
    [2023, "2023-04-09"],
    [2024, "2024-03-31"],
    [2025, "2025-04-20"],
    [2026, "2026-04-05"],
    [2027, "2027-03-28"],
    [2028, "2028-04-16"],
    [2030, "2030-04-21"],
    [2038, "2038-04-25"],
  ];

  for (const [ano, esperada] of CONHECIDAS) {
    it(`cai em ${esperada}`, () => {
      expect(pascoa(ano)).toBe(esperada);
    });
  }

  it("nunca sai do intervalo de 22 de março a 25 de abril", () => {
    for (let ano = 1900; ano <= 2200; ano++) {
      const d = pascoa(ano);
      expect(d >= `${ano}-03-22`).toBe(true);
      expect(d <= `${ano}-04-25`).toBe(true);
    }
  });

  it("cai sempre num domingo", () => {
    for (let ano = 2000; ano <= 2100; ano++) {
      const [a, m, d] = pascoa(ano).split("-").map(Number);
      expect(new Date(Date.UTC(a, m - 1, d)).getUTCDay()).toBe(0);
    }
  });
});

describe("a festa da Penha", () => {
  const REGRA = "segunda-depois-do-oitavario-da-pascoa" as const;

  it("cai em 28 de abril em 2025, como o Convento publicou", () => {
    expect(dataMovel(REGRA, 2025)).toBe("2025-04-28");
  });

  it("cai em 13 de abril em 2026, como o Convento publicou", () => {
    expect(dataMovel(REGRA, 2026)).toBe("2026-04-13");
  });

  it("é sempre uma segunda-feira", () => {
    for (let ano = 2020; ano <= 2060; ano++) {
      const [a, m, d] = dataMovel(REGRA, ano).split("-").map(Number);
      expect(new Date(Date.UTC(a, m - 1, d)).getUTCDay()).toBe(1);
    }
  });

  it("cai sempre oito dias depois do Domingo de Páscoa", () => {
    for (let ano = 2020; ano <= 2060; ano++) {
      const p = new Date(pascoa(ano) + "T00:00:00Z").getTime();
      const f = new Date(dataMovel(REGRA, ano) + "T00:00:00Z").getTime();
      expect((f - p) / 86400000).toBe(8);
    }
  });
});
