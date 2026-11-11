import { criarData, type DataSimples } from "./dataSimples";

/**
 * O cômputo da Páscoa, e as datas que dependem dela.
 *
 * POR QUE ISTO EXISTE NUM SISTEMA DE DATAS FIXAS
 * O calendário deste aplicativo foi escrito para festas fixas — "a data só
 * depende do ano", diz o comentário em festas.ts, e havia um teste a
 * guardá-lo. A premissa estava errada por uma festa: Nossa Senhora da
 * Penha, padroeira do Espírito Santo, não cai em dia de calendário. Cai na
 * segunda-feira que fecha o oitavário da Páscoa, e por isso anda até um mês
 * de um ano para o outro. O arquivo trazia 8 de abril, que não é a data em
 * nenhum ano: em 2025 foi 28 de abril, em 2026 foi 13 de abril.
 *
 * O ALGORITMO
 * É o cômputo gregoriano na forma publicada por Jean Meeus em Astronomical
 * Algorithms, conhecida como algoritmo de Butcher. Só aritmética inteira,
 * sem tabelas, válido para todo ano do calendário gregoriano. Não se mexe
 * nele: ou está certo, e os testes mostram que está, ou se reescreve do
 * zero a partir da mesma fonte.
 */
export function pascoa(ano: number): DataSimples {
  const a = ano % 19;
  const b = Math.floor(ano / 100);
  const c = ano % 100;
  const d = Math.floor(b / 4);
  const e = b % 4;
  const f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4);
  const k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const mes = Math.floor((h + l - 7 * m + 114) / 31);
  const dia = ((h + l - 7 * m + 114) % 31) + 1;

  return criarData(ano, mes, dia);
}

/** As regras móveis de que o calendário precisa, pelo nome. */
export type RegraMovel = "segunda-depois-do-oitavario-da-pascoa";

/**
 * A data de uma festa móvel num ano.
 *
 * A única regra por enquanto é a da Penha: oito dias depois do Domingo de
 * Páscoa, que é sempre a segunda-feira seguinte ao Domingo da Oitava. Em
 * 2025 deu 28 de abril e em 2026 deu 13 de abril, que é o que o Convento
 * da Penha publicou nos dois anos.
 */
export function dataMovel(regra: RegraMovel, ano: number): DataSimples {
  switch (regra) {
    case "segunda-depois-do-oitavario-da-pascoa": {
      const domingo = pascoa(ano);
      return somarDiasSimples(domingo, 8);
    }
  }
}

/**
 * Soma dias a uma data, sem passar por fuso horário.
 *
 * Existe aqui em vez de usar o `somarDias` de dataSimples para não criar
 * uma dependência circular entre os dois módulos — aquele importa festas,
 * que importa este.
 */
function somarDiasSimples(d: DataSimples, dias: number): DataSimples {
  const [ano, mes, dia] = d.split("-").map(Number);
  const t = Date.UTC(ano, mes - 1, dia + dias);
  const r = new Date(t);
  return criarData(
    r.getUTCFullYear(),
    r.getUTCMonth() + 1,
    r.getUTCDate(),
  );
}
