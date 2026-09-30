import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    // Fixa a raiz no projeto. Sem isto, o Turbopack sobe a árvore de pastas
    // e encontra o package-lock.json da pasta do usuário.
    root: __dirname,
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
  async redirects() {
    return [
      // O guia era uma página só, longa demais. Virou cinco salas com porta
      // própria no menu; quem tiver o endereço antigo continua chegando.
      { source: "/guia", destination: "/sobre/a-consagracao", permanent: true },
    ];
  },
};

export default nextConfig;
