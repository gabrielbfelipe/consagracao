/**
 * O cartão do X (e de tudo o mais que lê a especificação do Twitter, que é
 * mais gente do que o nome sugere).
 *
 * É a mesma imagem do Open Graph. Existe como arquivo à parte porque a
 * convenção do Next gera `twitter:image` a partir de `twitter-image`, e não
 * do `opengraph-image`: sem este arquivo, o cartão grande do X ficaria sem
 * imagem. Reexportar é o suficiente — um desenho só, dois conjuntos de
 * etiquetas.
 */
export { alt, size, contentType, default } from "./opengraph-image";
