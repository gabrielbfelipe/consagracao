import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    // Fixa a raiz no projeto. Sem isto, o Turbopack sobe a árvore de pastas
    // e encontra o package-lock.json da pasta do usuário.
    root: __dirname,
  },
};

export default nextConfig;
