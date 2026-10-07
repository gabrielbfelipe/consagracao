import { ImageResponse } from "next/og";

/**
 * A imagem que aparece quando alguém partilha o endereço no WhatsApp, no
 * Telegram, no Facebook ou no X.
 *
 * POR QUE DESENHADA, E NÃO UMA FOTOGRAFIA
 * Uma fotografia de nave fica bonita e não diz nada: o cartão do WhatsApp
 * mostra o título em letra miúda sob a imagem, e num grupo em movimento é a
 * imagem que é lida. Esta tem o nome dentro, no mesmo Garamond do site, e
 * por isso funciona mesmo recortada ou vista pequena.
 *
 * SOBRE A FONTE
 * O satori — o desenhista por trás do ImageResponse — não lê woff2, que é o
 * que o Google Fonts serve a navegadores. Serve .ttf a quem não se anuncia
 * como navegador, e é isso que acontece aqui. Se a busca falhar (rede fora
 * do ar durante a compilação, formato alterado), o cartão é desenhado com a
 * fonte que o next/og traz. Fica menos bonito e continua legível — o que
 * não pode acontecer é a compilação inteira quebrar por causa de um cartão
 * de partilha.
 */

export const alt =
  "Consagração a Nossa Senhora — trinta e três dias de preparação segundo São Luís de Montfort";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const OURO = "#c9a227";
const OURO_LUZ = "#e8cf84";
const MARFIM = "#f4efe6";
const MADEIRA = "#1c130d";

async function garamond(): Promise<
  { name: string; data: ArrayBuffer; style: "normal" | "italic"; weight: 400 }[]
> {
  try {
    const css = await fetch(
      "https://fonts.googleapis.com/css2?family=EB+Garamond:ital@0;1",
      { cache: "force-cache" },
    ).then((r) => r.text());

    // Duas declarações, itálico primeiro: é a ordem em que o Google as serve.
    const urls = [...css.matchAll(/src: url\((https:[^)]+\.ttf)\)/g)].map(
      (m) => m[1],
    );
    const italico = urls[0];
    const normal = urls[1];
    if (!italico || !normal) return [];

    const [a, b] = await Promise.all([
      fetch(normal).then((r) => r.arrayBuffer()),
      fetch(italico).then((r) => r.arrayBuffer()),
    ]);

    return [
      { name: "Garamond", data: a, style: "normal", weight: 400 },
      { name: "Garamond", data: b, style: "italic", weight: 400 },
    ];
  } catch {
    return [];
  }
}

export default async function Cartao() {
  const fonts = await garamond();
  const familia = fonts.length ? "Garamond" : undefined;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "70px 92px",
          background: MADEIRA,
          fontFamily: familia,
          position: "relative",
        }}
      >
        {/* A luz que entra pela esquerda alta, como nas fotografias do site. */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(900px 640px at 10% -14%, rgba(201,162,39,0.34), rgba(28,19,13,0) 70%)",
          }}
        />
        {/* O filete de ouro: a moldura de um frontispício. */}
        <div
          style={{
            position: "absolute",
            top: 30,
            left: 30,
            right: 30,
            bottom: 30,
            border: "1px solid rgba(201,162,39,0.45)",
          }}
        />

        {/* Tudo num fluxo só, centrado como bloco.
            A assinatura esteve presa ao rodapé com `position: absolute`, e
            batia na terceira linha da descrição — o satori não avisa quando
            dois elementos se sobrepõem, e o cartão só se vê depois de
            desenhado. Em fluxo normal, nada pode cair em cima de nada. */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            position: "relative",
          }}
        >
          <div
            style={{
              fontSize: 33,
              fontStyle: "italic",
              color: OURO_LUZ,
              letterSpacing: 0.5,
            }}
          >
            Trinta e três dias de preparação
          </div>

          <div
            style={{
              marginTop: 16,
              fontSize: 88,
              lineHeight: 1.04,
              color: MARFIM,
              textTransform: "uppercase",
              letterSpacing: 1,
              maxWidth: 930,
            }}
          >
            Consagração a Nossa Senhora
          </div>

          <div
            style={{
              marginTop: 30,
              width: 160,
              height: 2,
              background: `linear-gradient(to right, ${OURO}, rgba(201,162,39,0))`,
            }}
          />

          <div
            style={{
              marginTop: 28,
              fontSize: 31,
              lineHeight: 1.5,
              color: "rgba(244,239,230,0.80)",
              maxWidth: 840,
            }}
          >
            Escolha a festa em que deseja se consagrar. O caminho até ela é
            preparado, um dia de cada vez.
          </div>

          <div
            style={{
              marginTop: 46,
              fontSize: 25,
              color: "rgba(201,162,39,0.92)",
              letterSpacing: 1.6,
              textTransform: "uppercase",
            }}
          >
            Segundo São Luís Maria Grignion de Montfort
          </div>
        </div>
      </div>
    ),
    { ...size, fonts: fonts.length ? fonts : undefined },
  );
}
