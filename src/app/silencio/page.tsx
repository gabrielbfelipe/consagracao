import type { Metadata } from "next";
import { TelaDeSilencio } from "@/components/oracao/TelaDeSilencio";

export const metadata: Metadata = {
  title: "Silêncio",
  description: "Um pequeno espaço digital de recolhimento.",
  alternates: { canonical: "/silencio" },
  /* Uma tela sem texto, de propósito. Não há o que indexar aqui. */
  robots: { index: false, follow: true },
};

export default function Silencio() {
  return <TelaDeSilencio />;
}
