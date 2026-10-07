import type { Metadata, Viewport } from "next";
import { EB_Garamond, Archivo } from "next/font/google";
import { Movimento } from "@/components/atmosphere/Movimento";
import { BarraDeEnsaioSeHouver } from "@/components/ensaio/BarraDeEnsaioSeHouver";
import {
  DESCRICAO_HOME,
  DESCRICAO_PADRAO,
  PALAVRAS_CHAVE,
  SITE_LOCALE,
  SITE_NOME,
  SITE_URL,
  TITULO_HOME,
  VERIFICACAO_GOOGLE,
} from "@/lib/seo/site";
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

/**
 * Os metadados que valem para a casa inteira.
 *
 * Tudo aqui é herdado por todas as páginas e sobreposto pelas que trazem o
 * seu. O `metadataBase` é o que permite escrever caminhos relativos nos
 * canonicals e nas imagens das páginas abaixo — sem ele, o Next recusa um
 * caminho relativo em campo que exige endereço absoluto.
 *
 * O `openGraph` e o `twitter` ficam aqui porque o que o WhatsApp mostra ao
 * partilhar um endereço interno importa tanto como o da home, e repetir
 * estes campos em dezenove páginas seria garantir que algumas ficassem para
 * trás.
 */
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITULO_HOME,
    template: `%s · ${SITE_NOME}`,
  },
  description: DESCRICAO_PADRAO,
  applicationName: "Consagração",
  keywords: PALAVRAS_CHAVE,
  authors: [{ name: SITE_NOME, url: SITE_URL }],
  creator: SITE_NOME,
  publisher: SITE_NOME,
  category: "religião",
  alternates: { canonical: "/" },
  // Telefone e data viram elos clicáveis no Safari por omissão, e um número
  // de parágrafo do Tratado lido como número de telefone fica ridículo.
  formatDetection: { telephone: false, date: false, address: false },
  openGraph: {
    type: "website",
    siteName: SITE_NOME,
    locale: SITE_LOCALE,
    url: "/",
    title: TITULO_HOME,
    description: DESCRICAO_HOME,
  },
  twitter: {
    card: "summary_large_image",
    title: TITULO_HOME,
    description: DESCRICAO_HOME,
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      // -1 e "large" removem os limites por omissão: o Google pode mostrar
      // o trecho inteiro e a imagem grande no resultado.
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [{ url: "/icone.svg", type: "image/svg+xml" }],
    apple: [{ url: "/icone.svg" }],
  },
  appleWebApp: {
    capable: true,
    title: "Consagração",
    statusBarStyle: "black-translucent",
  },
  manifest: "/manifest.webmanifest",
  // A meta de verificação do Search Console, quando houver código. Espalhada
  // por todas as páginas de propósito: o Google verifica pelo endereço que
  // você registar, e assim qualquer um deles serve.
  ...(VERIFICACAO_GOOGLE
    ? { verification: { google: VERIFICACAO_GOOGLE } }
    : {}),
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
      <body className="min-h-full flex flex-col">
        <Movimento>{children}</Movimento>
        <BarraDeEnsaioSeHouver />
      </body>
    </html>
  );
}
