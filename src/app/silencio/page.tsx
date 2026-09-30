import type { Metadata } from "next";
import { TelaDeSilencio } from "@/components/oracao/TelaDeSilencio";

export const metadata: Metadata = {
  title: "Silêncio",
  description: "Um pequeno espaço digital de recolhimento.",
};

export default function Silencio() {
  return <TelaDeSilencio />;
}
