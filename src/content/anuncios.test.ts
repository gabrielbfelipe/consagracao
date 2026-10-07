import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { ESPACOS, ROTULO, type Posicao } from "@/content/anuncios";

/**
 * A regra que este arquivo guarda não é técnica, é de carácter: há salas
 * desta casa onde não se vende espaço.
 *
 * Nada no sistema impede alguém de escrever <Anuncio /> dentro da página de
 * oração. A compilação passaria, os testes de tipo passariam, e o erro só
 * apareceria para quem abrisse aquela página num dia ruim. Por isso o teste
 * lê os arquivos em si: é a única forma de uma regra dessas sobreviver a
 * quem não estava aqui quando ela foi escrita.
 */

const APP = join(process.cwd(), "src", "app");

/** Ver a lista comentada e justificada em content/anuncios.ts. */
const SALAS_SEM_ANUNCIO = [
  ["a página de socorro", "oracao/page.tsx"],
  ["o modo silêncio", "silencio/page.tsx"],
  ["os trinta e três dias", "dia/[n]/page.tsx"],
  ["o diário", "diario/page.tsx"],
  ["a carta do primeiro dia", "carta/page.tsx"],
  ["o grande dia", "grande-dia/page.tsx"],
  ["meu caminho", "caminho/page.tsx"],
  ["a oração aberta", "biblioteca/[oracao]/page.tsx"],
  ["a entrada", "entrar/page.tsx"],
  ["o cadastro", "cadastro/page.tsx"],
  ["as boas-vindas", "conta/bem-vindo/page.tsx"],
  ["a política de privacidade", "privacidade/page.tsx"],
] as const;

/** Todos os .tsx de src/app, para varrer o que foi realmente escrito. */
function arquivosDaApp(pasta = APP): string[] {
  return readdirSync(pasta, { withFileTypes: true }).flatMap((item) => {
    const caminho = join(pasta, item.name);
    if (item.isDirectory()) return arquivosDaApp(caminho);
    return item.name.endsWith(".tsx") ? [caminho] : [];
  });
}

describe("onde não entra publicidade", () => {
  for (const [nome, arquivo] of SALAS_SEM_ANUNCIO) {
    it(`${nome} não tem anúncio`, () => {
      const fonte = readFileSync(join(APP, arquivo), "utf8");
      expect(fonte).not.toContain("<Anuncio");
      expect(fonte).not.toContain("adsbygoogle");
    });
  }

  it("a lista acima cobre arquivos que existem de verdade", () => {
    // Sem isto, renomear uma página desarma o teste em silêncio: ele passaria
    // a verificar um arquivo inexistente e ninguém notaria.
    for (const [, arquivo] of SALAS_SEM_ANUNCIO) {
      expect(() => readFileSync(join(APP, arquivo), "utf8")).not.toThrow();
    }
  });
});

describe("os espaços declarados", () => {
  const fontes = arquivosDaApp().map((f) => readFileSync(f, "utf8"));
  const usadas = fontes
    .flatMap((f) => [...f.matchAll(/<Anuncio\s+posicao="([^"]+)"/g)])
    .map((m) => m[1]);

  it("cada espaço do catálogo está realmente numa página", () => {
    for (const posicao of Object.keys(ESPACOS) as Posicao[]) {
      expect(usadas).toContain(posicao);
    }
  });

  it("nenhuma página pede um espaço que não existe", () => {
    for (const posicao of usadas) {
      expect(Object.keys(ESPACOS)).toContain(posicao);
    }
  });

  it("nenhum espaço aparece duas vezes", () => {
    expect(new Set(usadas).size).toBe(usadas.length);
  });

  it("todo espaço diz onde fica, para quem for criá-lo no painel", () => {
    for (const espaco of Object.values(ESPACOS)) {
      expect(espaco.onde.length).toBeGreaterThan(20);
    }
  });
});

describe("as regras da rede", () => {
  it("o rótulo é um dos que o AdSense aceita", () => {
    // Qualquer outra palavra — "Recomendado", "Veja também" — é motivo de
    // suspensão da conta, por induzir o clique.
    expect(["Publicidade", "Anúncios"]).toContain(ROTULO);
  });

  it("o código de editor tem a forma que o AdSense emite", async () => {
    const { EDITOR, ANUNCIOS_LIGADOS } = await import("@/content/anuncios");
    expect(EDITOR).toMatch(/^ca-pub-\d{16}$/);
    expect(ANUNCIOS_LIGADOS).toBe(true);
  });

  it("todo espaço tem um bloco, e o bloco é um número", () => {
    // Um espaço sem bloco não aparece — o que é o comportamento certo, e
    // também a forma mais silenciosa de ficar sem publicidade sem perceber.
    for (const [nome, espaco] of Object.entries(ESPACOS)) {
      expect(`${nome}: ${espaco.unidade}`).toMatch(/: \d{8,}$/);
    }
  });
});
