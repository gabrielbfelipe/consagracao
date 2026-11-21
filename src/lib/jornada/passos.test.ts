import { describe, expect, it } from "vitest";
import {
  PASSOS,
  diaCompleto,
  passoAlcancavel,
  unirPassos,
} from "./passos";
import { criarFila } from "./fila";

const TODOS = PASSOS.map((p) => p.id);

describe("unirPassos", () => {
  it("junta sem repetir e devolve na ordem do dia", () => {
    expect(unirPassos(["reze", "prepare"], ["leia", "prepare"])).toEqual([
      "prepare",
      "leia",
      "reze",
    ]);
  });

  it("nunca desmarca: o que já estava guardado continua", () => {
    expect(unirPassos(TODOS, [])).toEqual(TODOS);
  });

  it("descarta o que não é passo", () => {
    expect(unirPassos(["leia", "inventado", ""])).toEqual(["leia"]);
  });
});

describe("diaCompleto", () => {
  it("fecha com os sete", () => {
    expect(diaCompleto(TODOS)).toBe(true);
  });

  it("não fecha com seis, qualquer que seja o que falta", () => {
    for (const falta of TODOS) {
      expect(diaCompleto(TODOS.filter((p) => p !== falta))).toBe(false);
    }
  });
});

describe("passoAlcancavel", () => {
  const nenhum = new Set<string>();

  it("deixa voltar e deixa ir ao próximo", () => {
    expect(passoAlcancavel(0, 3, nenhum)).toBe(true);
    expect(passoAlcancavel(4, 3, nenhum)).toBe(true);
  });

  it("não deixa saltar por cima de passos não feitos", () => {
    expect(passoAlcancavel(6, 0, nenhum)).toBe(false);
  });

  it("deixa ir até o primeiro em aberto de um dia já começado", () => {
    const feitos = new Set(["prepare", "leia", "medite", "reze"]);
    expect(passoAlcancavel(4, 0, feitos)).toBe(true);
    expect(passoAlcancavel(5, 0, feitos)).toBe(false);
  });
});

/**
 * O defeito do dia 17, reproduzido.
 *
 * O "servidor" abaixo faz o que marcarPasso fazia: lê a lista, espera um
 * instante (a ida ao banco), e grava a lista inteira por cima.
 */
function servidorQueLeEGrava() {
  let guardado: string[] = [];
  const pausa = () => new Promise((r) => setTimeout(r, 5));

  return {
    lido: () => guardado,
    async marcar(passo: string) {
      const antes = guardado;
      await pausa();
      guardado = unirPassos(antes, [passo]);
    },
  };
}

describe("as gravações dos passos", () => {
  it("sem fila, gravações simultâneas apagam passos (o defeito)", async () => {
    const s = servidorQueLeEGrava();
    await Promise.all(TODOS.map((p) => s.marcar(p)));
    expect(diaCompleto(s.lido())).toBe(false);
  });

  it("com a fila, os sete chegam ao banco mesmo disparados juntos", async () => {
    const s = servidorQueLeEGrava();
    const enfileirar = criarFila();
    await Promise.all(TODOS.map((p) => enfileirar(() => s.marcar(p))));
    expect(s.lido()).toEqual(TODOS);
    expect(diaCompleto(s.lido())).toBe(true);
  });

  it("uma gravação que falha não trava as seguintes", async () => {
    const enfileirar = criarFila();
    const feitas: string[] = [];
    const a = enfileirar(async () => {
      throw new Error("rede caiu");
    });
    const b = enfileirar(async () => {
      feitas.push("b");
    });
    await expect(a).rejects.toThrow("rede caiu");
    await b;
    expect(feitas).toEqual(["b"]);
  });
});
