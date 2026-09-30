import type { Metadata, Viewport } from "next";
import { EB_Garamond, Archivo } from "next/font/google";
import "./globals.css";

/* A voz do livro: desenho francês do século XVI, a letra dos devocionários. */
const ebGaramond = EB_Garamond({
  variable: "--font-eb-garamond",
  subsets: ["latin"],
  display: "swap",
});

/* A voz da interface, que deve desaparecer atrás do conteúdo. */
const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Consagração a Nossa Senhora",
    template: "%s · Consagração a Nossa Senhora",
  },
  description:
    "Um caminho de preparação, oração e conhecimento que conduz o coração a Cristo pelas mãos de Maria.",
  applicationName: "Consagração",
};

export const viewport: Viewport = {
  themeColor: "#1c130d",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-BR"
      className={`${ebGaramond.variable} ${archivo.variable} h-full`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
