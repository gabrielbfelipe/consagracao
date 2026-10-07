/**
 * O script de dados estruturados.
 *
 * SOBRE O `replace`
 * JSON.stringify não escapa `<`. Se um dia um destes textos vier de algo
 * que a pessoa escreveu — o nome de um produto, o título de uma festa —,
 * uma sequência como `</script>` fecharia o script e o resto entraria na
 * página como HTML. Trocar `<` pelo seu equivalente Unicode fecha essa
 * porta: dentro de JSON, `\u003c` e `<` são a mesma letra, e o buscador lê
 * o mesmo valor.
 *
 * É `<script>` nativo, e não next/script: isto não é código a executar, é
 * dado a ler, e o carregador do Next só atrasaria a sua chegada ao HTML.
 */
export function DadosEstruturados({ dados }: { dados: unknown }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(dados).replace(/</g, "\u003c"),
      }}
    />
  );
}
