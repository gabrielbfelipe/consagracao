import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Consagração a Nossa Senhora",
    short_name: "Consagração",
    description:
      "Um caminho de preparação, oração e conhecimento que conduz o coração a Cristo pelas mãos de Maria.",
    start_url: "/caminho",
    display: "standalone",
    orientation: "portrait",
    background_color: "#1c130d",
    theme_color: "#1c130d",
    lang: "pt-BR",
    categories: ["lifestyle", "education"],
    icons: [
      {
        src: "/icone.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
      {
        src: "/icone-mascara.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "maskable",
      },
    ],
  };
}
