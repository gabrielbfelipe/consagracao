import { describe, expect, it } from "vitest";
import {
  DIAS,
  DISCIPLINA_DAS_SEMANAS,
  PRIMEIRO_PARAGRAFO,
  ULTIMO_PARAGRAFO,
  faixaDeLeitura,
  tamanhoDaLeitura,
} from "./jornada";
import { ETAPAS, TOTAL_DIAS } from "@/lib/jornada/etapas";

describe("os trinta e três dias", () => {
  it("existem todos, uma vez cada, em ordem", () => {
    expect(DIAS).toHaveLength(TOTAL_DIAS);
    expect(DIAS.map((d) => d.numero)).toEqual(
      Array.from({ length: TOTAL_DIAS }, (_, i) => i + 1),
    );
  });

  it("nenhum chega vazio à tela", () => {
    for (const d of DIAS) {
      expect(d.tema.length, `dia ${d.numero}`).toBeGreaterThan(0);
      expect(d.introducao.length, `dia ${d.numero}`).toBeGreaterThan(0);
      expect(d.leitura.comentario.length, `dia ${d.numero}`).toBeGreaterThanOrEqual(2);
      expect(d.meditacao.length, `dia ${d.numero}`).toBeGreaterThanOrEqual(2);
      expect(d.exercicio.length, `dia ${d.numero}`).toBeGreaterThan(0);
      expect(d.jaculatoria.length, `dia ${d.numero}`).toBeGreaterThan(0);
      expect(d.resolucao.length, `dia ${d.numero}`).toBeGreaterThan(0);
      expect(d.oracao.nome.length, `dia ${d.numero}`).toBeGreaterThan(0);
    }
  });
});

/**
 * A regra que esta suíte existe para guardar.
 *
 * A leitura atravessa o Tratado uma vez só, para a frente: o dia seguinte
 * começa exatamente onde o anterior parou. Sem isto, é fácil um dia repetir
 * o que o outro já mandou ler, ou saltar um trecho sem ninguém reparar —
 * foi o que aconteceu na primeira versão deste conteúdo, em que o § 78 era
 * lido no dia 2, outra vez no dia 13 e outra no dia 19.
 */
describe("a leitura anda sempre para a frente", () => {
  it("começa no primeiro parágrafo do Tratado", () => {
    expect(DIAS[0].leitura.de).toBe(PRIMEIRO_PARAGRAFO);
  });

  it("termina no último", () => {
    expect(DIAS.at(-1)!.leitura.ate).toBe(ULTIMO_PARAGRAFO);
  });

  it("cada dia começa onde o anterior parou — sem saltos nem repetições", () => {
    for (let i = 1; i < DIAS.length; i++) {
      const anterior = DIAS[i - 1];
      const atual = DIAS[i];
      expect(
        atual.leitura.de,
        `o dia ${atual.numero} devia começar no § ${anterior.leitura.ate + 1}, logo depois do dia ${anterior.numero}`,
      ).toBe(anterior.leitura.ate + 1);
    }
  });

  it("nenhum dia termina antes de começar", () => {
    for (const d of DIAS) {
      expect(d.leitura.ate, `dia ${d.numero}`).toBeGreaterThanOrEqual(d.leitura.de);
    }
  });

  it("os trinta e três dias cobrem o Tratado inteiro, sem sobrar parágrafo", () => {
    const lidos = DIAS.flatMap((d) =>
      Array.from(
        { length: tamanhoDaLeitura(d.leitura) },
        (_, i) => d.leitura.de + i,
      ),
    );
    expect(lidos).toHaveLength(ULTIMO_PARAGRAFO - PRIMEIRO_PARAGRAFO + 1);
    expect(new Set(lidos).size).toBe(lidos.length);
  });

  it("nenhum dia pede uma leitura desproporcional", () => {
    // Os números do Tratado têm tamanhos muito diferentes, de modo que o
    // número de parágrafos varia. O que não pode haver é um dia que seja
    // várias vezes outro: isso seria corte por conta de dividir, e não por
    // fronteira do livro.
    for (const d of DIAS) {
      const n = tamanhoDaLeitura(d.leitura);
      expect(n, `dia ${d.numero}`).toBeGreaterThanOrEqual(4);
      expect(n, `dia ${d.numero}`).toBeLessThanOrEqual(18);
    }
  });
});

describe("as etapas recebem a parte do livro que lhes toca", () => {
  it("cada etapa cobre uma faixa contínua, e as quatro se encaixam", () => {
    for (const etapa of ETAPAS) {
      const dias = DIAS.filter(
        (d) =>
          d.numero >= etapa.primeiroDia &&
          d.numero < etapa.primeiroDia + etapa.dias,
      );
      expect(dias, etapa.nome).toHaveLength(etapa.dias);

      // Dentro da etapa a leitura também é contínua.
      for (let i = 1; i < dias.length; i++) {
        expect(dias[i].leitura.de).toBe(dias[i - 1].leitura.ate + 1);
      }
    }
  });

  it("os doze dias preliminares terminam no trecho de despojar-se", () => {
    // § 78 a 82 é o artigo "Devemos despojar-nos do que há de mau em nós".
    // Fechar a etapa preliminar exatamente aí não é coincidência.
    expect(DIAS[11].leitura.ate).toBe(82);
  });

  it("o último dia lê o método de comunhão, que é o que se faz no dia seguinte", () => {
    expect(DIAS.at(-1)!.leitura.de).toBe(266);
  });
});

describe("faixaDeLeitura", () => {
  it("escreve a faixa como se lê num livro", () => {
    expect(faixaDeLeitura({ de: 83, ate: 89 })).toBe("§ 83 a 89");
  });

  it("não diz 'a' quando é um parágrafo só", () => {
    expect(faixaDeLeitura({ de: 151, ate: 151 })).toBe("§ 151");
  });
});

describe("a disciplina de oração", () => {
  it("tem uma entrada por etapa, e cita o parágrafo de onde veio", () => {
    expect(DISCIPLINA_DAS_SEMANAS).toHaveLength(ETAPAS.length);
    for (const d of DISCIPLINA_DAS_SEMANAS) {
      expect(d.todoDia.length).toBeGreaterThan(0);
      expect(d.fonte).toMatch(/^§ \d+$/);
    }
  });
});
