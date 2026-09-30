/**
 * Envolve o conteúdo das páginas públicas em <Passagem>.
 *
 * Uso: node scripts/envolver-passagem.mjs
 *
 * Feito por script porque é a mesma edição mecânica em muitos arquivos, e
 * porque errar a indentação à mão em nove páginas é mais provável do que
 * escrever isto. Idempotente: quem já tem Passagem é deixado em paz.
 */
import { readFile, writeFile } from "node:fs/promises";

const PAGINAS = [
  "src/app/sobre/[pagina]/page.tsx",
  "src/app/entrar/page.tsx",
  "src/app/biblioteca/page.tsx",
  "src/app/biblioteca/[oracao]/page.tsx",
  "src/app/privacidade/page.tsx",
  "src/app/creditos/page.tsx",
  "src/app/calendario/page.tsx",
];

for (const caminho of PAGINAS) {
  let texto = await readFile(caminho, "utf8");

  if (texto.includes("<Passagem>")) {
    console.log(`· ${caminho} (já envolvida)`);
    continue;
  }

  // O import entra depois da última linha de import.
  const linhas = texto.split("\n");
  const ultimoImport = linhas.findLastIndex((l) => l.startsWith("import "));
  linhas.splice(
    ultimoImport + 1,
    0,
    'import { Passagem } from "@/components/atmosphere/Passagem";',
  );
  texto = linhas.join("\n");

  // Envolve o que está entre "return (" e o ");" que fecha o componente.
  const abre = texto.indexOf("  return (\n");
  const fecha = texto.lastIndexOf("\n  );\n}");

  if (abre === -1 || fecha === -1 || fecha < abre) {
    console.error(`✗ ${caminho}: não encontrei o corpo do return`);
    process.exit(1);
  }

  const inicio = abre + "  return (\n".length;
  const corpo = texto.slice(inicio, fecha);
  // Reindenta o corpo em dois espaços, para caber dentro da Passagem.
  const reindentado = corpo
    .split("\n")
    .map((l) => (l.trim() ? `  ${l}` : l))
    .join("\n");

  texto =
    texto.slice(0, inicio) +
    "    <Passagem>\n" +
    reindentado +
    "\n    </Passagem>" +
    texto.slice(fecha);

  await writeFile(caminho, texto);
  console.log(`✓ ${caminho}`);
}
