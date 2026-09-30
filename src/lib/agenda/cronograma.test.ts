import { describe, expect, it } from "vitest";
import { dataSimples, diferencaEmDias, hojeEm } from "./dataSimples";
import { FESTAS, dataDaFesta, festaPorId } from "./festas";
import {
  comecarHoje,
  dataDoDia,
  diaNaData,
  montarCronograma,
  opcoesDeData,
  situacao,
} from "./cronograma";
import { TOTAL_DIAS } from "@/lib/jornada/etapas";

const imaculada = festaPorId("imaculada-conceicao");
const aparecida = festaPorId("nossa-senhora-aparecida");

describe("montarCronograma", () => {
  it("começa 33 dias antes da festa", () => {
    const c = montarCronograma(imaculada, 2026);
    expect(c.consagracao).toBe("2026-12-08");
    expect(c.inicio).toBe("2026-11-05");
    expect(c.ultimoDia).toBe("2026-12-07");
  });

  it("coloca o Dia 33 na véspera da consagração", () => {
    for (const festa of FESTAS) {
      const c = montarCronograma(festa, 2027);
      expect(dataDoDia(c.inicio, TOTAL_DIAS)).toBe(c.ultimoDia);
      expect(diferencaEmDias(c.ultimoDia, c.consagracao)).toBe(1);
    }
  });

  it("cobre os 33 dias em quatro blocos sem lacuna nem sobreposição", () => {
    const c = montarCronograma(aparecida, 2026);
    expect(c.blocos).toHaveLength(4);
    expect(c.blocos[0].inicio).toBe(c.inicio);
    expect(c.blocos.at(-1)!.fim).toBe(c.ultimoDia);

    for (let i = 1; i < c.blocos.length; i++) {
      expect(diferencaEmDias(c.blocos[i - 1].fim, c.blocos[i].inicio)).toBe(1);
    }

    const soma = c.blocos.reduce(
      (t, b) => t + diferencaEmDias(b.inicio, b.fim) + 1,
      0,
    );
    expect(soma).toBe(TOTAL_DIAS);
  });

  it("atravessa a virada do ano", () => {
    // Santa Maria, Mãe de Deus: 1º de janeiro. A preparação cai no ano anterior.
    const c = montarCronograma(festaPorId("santa-maria-mae-de-deus"), 2027);
    expect(c.consagracao).toBe("2027-01-01");
    expect(c.inicio).toBe("2026-11-29");
  });

  it("acerta em ano bissexto", () => {
    // 2028 é bissexto: a preparação para 25 de março passa por 29 de fevereiro.
    const c = montarCronograma(festaPorId("anunciacao"), 2028);
    expect(c.consagracao).toBe("2028-03-25");
    expect(c.inicio).toBe("2028-02-21");
    expect(diaNaData(c.inicio, dataSimples("2028-02-29"))).toBe(9);
  });
});

describe("situacao", () => {
  const c = montarCronograma(imaculada, 2026);

  it("conta os dias que faltam para começar", () => {
    expect(situacao(c, dataSimples("2026-11-01"))).toEqual({
      fase: "aguardando",
      diasAteComecar: 4,
    });
  });

  it("reconhece o primeiro e o último dia da preparação", () => {
    expect(situacao(c, c.inicio)).toMatchObject({ fase: "em-curso", dia: 1 });
    expect(situacao(c, c.ultimoDia)).toMatchObject({
      fase: "em-curso",
      dia: 33,
    });
  });

  it("nomeia a etapa do dia", () => {
    // Dia 17 cai na primeira semana, o conhecimento de si mesmo.
    const s = situacao(c, dataDoDia(c.inicio, 17));
    expect(s).toMatchObject({ fase: "em-curso", dia: 17 });
    if (s.fase === "em-curso") {
      expect(s.etapa.id).toBe("conhecimento-de-si");
    }
  });

  it("distingue o Grande Dia do que veio antes e do que vem depois", () => {
    expect(situacao(c, c.consagracao).fase).toBe("grande-dia");
    expect(situacao(c, dataSimples("2026-12-09"))).toEqual({
      fase: "consagrado",
      diasDesdeConsagracao: 1,
    });
  });
});

describe("opcoesDeData", () => {
  it("só oferece datas em que ainda dá tempo de fazer os 33 dias", () => {
    // Em 20 de novembro já não se alcança a Imaculada de 8 de dezembro,
    // porque a preparação teria começado em 5 de novembro.
    const opcoes = opcoesDeData(dataSimples("2026-11-20"), FESTAS, 50);
    const imaculada2026 = opcoes.find((o) => o.data === "2026-12-08");
    expect(imaculada2026).toBeUndefined();

    // Mas a do ano seguinte continua disponível.
    expect(opcoes.some((o) => o.data === "2027-12-08")).toBe(true);
  });

  it("inclui a festa cuja preparação começa exatamente hoje", () => {
    const opcoes = opcoesDeData(dataSimples("2026-11-05"), FESTAS, 50);
    const hoje = opcoes.find((o) => o.data === "2026-12-08");
    expect(hoje?.diasAteComecar).toBe(0);
  });

  it("devolve as datas em ordem de calendário", () => {
    const opcoes = opcoesDeData(dataSimples("2026-03-01"), FESTAS, 20);
    const datas = opcoes.map((o) => o.data);
    expect([...datas].sort()).toEqual(datas);
  });

  it("nunca oferece uma data já passada", () => {
    const hoje = dataSimples("2026-07-04");
    for (const o of opcoesDeData(hoje, FESTAS, 50)) {
      expect(o.data >= hoje).toBe(true);
      expect(o.inicio >= hoje).toBe(true);
    }
  });
});

describe("comecarHoje", () => {
  it("aponta a primeira preparação que ainda pode ser iniciada", () => {
    const o = comecarHoje(dataSimples("2026-11-05"), FESTAS);
    expect(o?.data).toBe("2026-12-08");
    expect(o?.diasAteComecar).toBe(0);
  });
});

describe("festas", () => {
  it("todas as datas são fixas e se repetem todo ano", () => {
    for (const festa of FESTAS) {
      const a = dataDaFesta(festa, 2026);
      const b = dataDaFesta(festa, 2027);
      expect(a.slice(5)).toBe(b.slice(5));
    }
  });

  it("não há duas festas no mesmo dia", () => {
    const chaves = FESTAS.map((f) => `${f.mes}-${f.dia}`);
    expect(new Set(chaves).size).toBe(FESTAS.length);
  });
});

describe("hojeEm", () => {
  it("usa o dia do calendário local, não o de UTC", () => {
    // 22h em São Paulo (UTC−3) já é o dia seguinte em UTC.
    const instante = new Date("2026-11-06T01:30:00Z");
    expect(hojeEm("America/Sao_Paulo", instante)).toBe("2026-11-05");
    expect(hojeEm("UTC", instante)).toBe("2026-11-06");
  });
});
