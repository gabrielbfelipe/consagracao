import { describe, expect, it } from "vitest";
import robots from "@/app/robots";
import sitemap from "@/app/sitemap";
import { FESTAS, FESTAS_REAIS } from "@/lib/agenda/festas";
import { ORACOES } from "@/content/oracoes";
import { PAGINAS } from "@/content/sobre";
import { ETAPAS } from "@/lib/jornada/etapas";
import { grafoDaHome, grafoDeMigalhas } from "@/lib/seo/dadosEstruturados";
import { cartao } from "@/lib/seo/cartao";
import {
  DESCRICAO_HOME,
  SITE_URL,
  TITULO_HOME,
  urlAbsoluta,
} from "@/lib/seo/site";

/**
 * O SEO técnico é feito de regras que ninguém vê quebrar.
 *
 * Um canonical apontando para o lugar errado, uma página pessoal dentro do
 * sitemap, um título que cresceu dez letras e passou a ser cortado: nada
 * disso aparece na tela, nada disso derruba a compilação, e todos descobrem
 * meses depois, quando o site não aparece mais. São exatamente as regras que
 * um teste deve guardar.
 */

describe("o cartão de visita na busca", () => {
  it("o título cabe no resultado do Google", () => {
    expect(TITULO_HOME.length).toBeLessThanOrEqual(60);
    // E diz do que se trata na primeira palavra.
    expect(TITULO_HOME.toLowerCase().startsWith("consagração")).toBe(true);
  });

  it("a descrição cabe, e não é curta demais para valer o espaço", () => {
    expect(DESCRICAO_HOME.length).toBeLessThanOrEqual(155);
    expect(DESCRICAO_HOME.length).toBeGreaterThanOrEqual(110);
  });

  it("o endereço do site é absoluto e sem barra sobrando", () => {
    expect(SITE_URL).toMatch(/^https:\/\//);
    expect(SITE_URL.endsWith("/")).toBe(false);
    expect(urlAbsoluta("/cadeias")).toBe(`${SITE_URL}/cadeias`);
    expect(urlAbsoluta("/")).toBe(`${SITE_URL}/`);
  });
});

describe("o sitemap", () => {
  const mapa = sitemap();
  const enderecos = mapa.map((e) => e.url);

  it("abre pela página inicial, com prioridade máxima", () => {
    expect(enderecos[0]).toBe(urlAbsoluta("/"));
    expect(mapa[0].priority).toBe(1);
  });

  it("não repete endereço nenhum", () => {
    expect(new Set(enderecos).size).toBe(enderecos.length);
  });

  it("só tem endereços absolutos deste domínio", () => {
    for (const e of enderecos) expect(e.startsWith(`${SITE_URL}/`)).toBe(true);
  });

  it("traz as cinco salas de apresentação", () => {
    for (const p of PAGINAS) {
      expect(enderecos).toContain(urlAbsoluta(`/sobre/${p.slug}`));
    }
  });

  it("traz todas as festas verdadeiras do calendário", () => {
    for (const f of FESTAS_REAIS) {
      expect(enderecos).toContain(urlAbsoluta(`/calendario/${f.id}`));
    }
  });

  it("traz todas as orações da biblioteca", () => {
    for (const o of ORACOES) {
      expect(enderecos).toContain(urlAbsoluta(`/biblioteca/${o.id}`));
    }
  });

  /**
   * O modo de ensaio acrescenta às FESTAS uma data que não é celebração
   * nenhuma. Se um dia alguém trocar FESTAS_REAIS por FESTAS neste arquivo —
   * e é um erro de uma letra —, o site passa a pedir ao Google a indexação
   * de uma página de teste. É este teste que cai.
   */
  it("nunca submete a data de ensaio", () => {
    const ensaio = FESTAS.filter((f) => f.ensaio);
    for (const f of ensaio) {
      expect(enderecos).not.toContain(urlAbsoluta(`/calendario/${f.id}`));
    }
  });

  it("não submete nenhuma sala pessoal nem porta de entrada", () => {
    const proibidos = [
      "/caminho",
      "/dia/",
      "/diario",
      "/carta",
      "/grande-dia",
      "/conta",
      "/entrar",
      "/cadastro",
      "/silencio",
      "/api",
    ];
    for (const e of enderecos) {
      const caminho = e.slice(SITE_URL.length);
      for (const proibido of proibidos) {
        expect(caminho.startsWith(proibido)).toBe(false);
      }
    }
  });

  it("todas as prioridades estão entre zero e um", () => {
    for (const e of mapa) {
      expect(e.priority).toBeGreaterThan(0);
      expect(e.priority).toBeLessThanOrEqual(1);
    }
  });
});

describe("o robots.txt", () => {
  const regras = robots();
  const geral = Array.isArray(regras.rules) ? regras.rules[0] : regras.rules;
  const proibidos = [geral.disallow ?? []].flat();

  it("aponta para o sitemap deste domínio", () => {
    expect(regras.sitemap).toBe(urlAbsoluta("/sitemap.xml"));
  });

  it("libera a vitrine", () => {
    expect([geral.allow ?? []].flat()).toContain("/");
  });

  it("fecha as salas pessoais e a API", () => {
    for (const area of [
      "/caminho",
      "/dia/",
      "/diario",
      "/carta",
      "/grande-dia",
      "/conta/",
      "/api/",
    ]) {
      expect(proibidos).toContain(area);
    }
  });

  /**
   * Deliberado, e contraintuitivo: as portas ficam rastreáveis. O que as
   * mantém fora do índice é o `noindex` no HTML de cada uma, e para o
   * Googlebot ler esse `noindex` ele precisa de poder abrir a página. Um
   * Disallow aqui impediria justamente isso — e a página poderia acabar
   * indexada sem descrição, pelo simples facto de alguém a ligar de fora.
   */
  it("não bloqueia o rastreamento das portas de entrada", () => {
    for (const porta of ["/entrar", "/cadastro"]) {
      expect(proibidos.some((p) => String(p).startsWith(porta))).toBe(false);
    }
  });
});

describe("os dados estruturados", () => {
  const grafo = grafoDaHome();
  const tipos = grafo["@graph"].map((n) => n["@type"]);

  it("descreve o site, quem o faz, o programa e o roteiro", () => {
    expect(tipos).toEqual(
      expect.arrayContaining([
        "WebSite",
        "Organization",
        "WebApplication",
        "HowTo",
      ]),
    );
  });

  it("toda entidade do grafo tem identidade própria", () => {
    for (const no of grafo["@graph"]) {
      expect(no["@id"]).toMatch(/^https:\/\/.+#/);
    }
  });

  it("afirma a gratuidade como preço, e não só em palavras", () => {
    const app = grafo["@graph"].find((n) => n["@type"] === "WebApplication") as
      | { isAccessibleForFree?: boolean; offers?: { price?: string; priceCurrency?: string } }
      | undefined;
    expect(app?.isAccessibleForFree).toBe(true);
    expect(app?.offers?.price).toBe("0.00");
    expect(app?.offers?.priceCurrency).toBe("BRL");
  });

  it("o roteiro tem a escolha da data, as quatro etapas e o grande dia", () => {
    const howTo = grafo["@graph"].find((n) => n["@type"] === "HowTo") as
      | { step: { position: number }[]; totalTime: string }
      | undefined;
    expect(howTo?.step).toHaveLength(ETAPAS.length + 2);
    expect(howTo?.totalTime).toBe("P33D");
    // As posições são a ordem, e precisam ser seguidas.
    expect(howTo?.step.map((p) => p.position)).toEqual(
      Array.from({ length: ETAPAS.length + 2 }, (_, i) => i + 1),
    );
  });

  it("a trilha de migalhas começa no início e é numerada em ordem", () => {
    const trilha = grafoDeMigalhas([
      { nome: "Calendário mariano", caminho: "/calendario" },
      { nome: "Imaculada Conceição", caminho: "/calendario/imaculada" },
    ]);
    expect(trilha.itemListElement).toHaveLength(3);
    expect(trilha.itemListElement[0].name).toBe("Início");
    expect(trilha.itemListElement[0].item).toBe(urlAbsoluta("/"));
    expect(trilha.itemListElement.map((i) => i.position)).toEqual([1, 2, 3]);
  });

  it("não contém `<`, que fecharia o script na página", () => {
    // O componente escapa por segurança; isto garante que não há motivo.
    expect(JSON.stringify(grafo)).not.toContain("<");
  });
});

/**
 * Este bloco guarda um defeito que já aconteceu, e que não aparece em
 * compilação nenhuma: os campos de metadados do Next substituem os do
 * layout em vez de os completarem. Uma página que declarasse só título e
 * descrição no `twitter` perdia o `card`, e todas as partilhas internas
 * passavam a sair sem imagem. Só se vê abrindo o HTML servido — ou aqui.
 */
describe("o cartão de partilha", () => {
  const c = cartao({
    titulo: "Um título",
    descricao: "Uma descrição.",
    caminho: "/uma-pagina",
  });

  it("pede sempre o cartão grande, nunca o pequeno", () => {
    expect(c.twitter).toMatchObject({ card: "summary_large_image" });
  });

  it("leva imagem nos dois formatos", () => {
    expect(c.openGraph?.images).toBeTruthy();
    expect(c.twitter?.images).toBeTruthy();
  });

  it("o canónico e o og:url apontam para o mesmo lugar", () => {
    expect(c.alternates?.canonical).toBe("/uma-pagina");
    expect(c.openGraph).toMatchObject({ url: "/uma-pagina" });
  });

  it("declara o idioma e o nome do site", () => {
    expect(c.openGraph).toMatchObject({ locale: "pt_BR" });
    expect(c.openGraph).toMatchObject({ siteName: "Consagração a Nossa Senhora" });
  });

  it("um artigo é declarado como artigo", () => {
    const artigo = cartao({
      titulo: "t",
      descricao: "d",
      caminho: "/a",
      tipo: "article",
    });
    expect(artigo.openGraph).toMatchObject({ type: "article" });
  });
});
