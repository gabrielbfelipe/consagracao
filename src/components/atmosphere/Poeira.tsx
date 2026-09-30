"use client";

import { useEffect, useRef } from "react";

/**
 * Poeira suspensa no feixe de luz.
 *
 * O efeito que faz um ambiente parecer real em vez de desenhado. Tem de ser
 * quase imperceptível: se alguém reparar nas partículas, elas falharam.
 *
 * Pausa quando a aba sai de foco e não roda para quem pediu menos movimento.
 */
export function Poeira({
  densidade = 0.00008,
  className = "",
}: {
  /** Partículas por pixel de área. Acima de 0,0002 já chama atenção. */
  densidade?: number;
  className?: string;
}) {
  const tela = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = tela.current;
    if (!canvas) return;

    const menosMovimento = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );
    if (menosMovimento.matches) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let quadro = 0;
    let largura = 0;
    let altura = 0;
    let particulas: Particula[] = [];
    let visivel = true;

    type Particula = {
      x: number;
      y: number;
      raio: number;
      brilho: number;
      subida: number;
      deriva: number;
      fase: number;
    };

    function semear() {
      const proporcao = Math.min(window.devicePixelRatio || 1, 2);
      const caixa = canvas!.getBoundingClientRect();
      largura = caixa.width;
      altura = caixa.height;

      canvas!.width = largura * proporcao;
      canvas!.height = altura * proporcao;
      ctx!.setTransform(proporcao, 0, 0, proporcao, 0, 0);

      const quantas = Math.min(
        Math.round(largura * altura * densidade),
        // Teto rígido: nenhuma tela justifica mais do que isto.
        140,
      );

      particulas = Array.from({ length: quantas }, () => ({
        x: Math.random() * largura,
        y: Math.random() * altura,
        raio: 0.6 + Math.random() * 1.4,
        brilho: 0.12 + Math.random() * 0.3,
        // Sobem devagar, como cisco em ar parado e quente.
        subida: 0.04 + Math.random() * 0.12,
        deriva: 0.08 + Math.random() * 0.22,
        fase: Math.random() * Math.PI * 2,
      }));
    }

    function desenhar(tempo: number) {
      quadro = requestAnimationFrame(desenhar);
      if (!visivel) return;

      ctx!.clearRect(0, 0, largura, altura);

      for (const p of particulas) {
        p.y -= p.subida;
        p.x += Math.sin(tempo / 3600 + p.fase) * p.deriva * 0.1;

        if (p.y < -4) {
          p.y = altura + 4;
          p.x = Math.random() * largura;
        }

        // Some perto das bordas para não parecer um retângulo de pontinhos.
        const margem = Math.min(
          1,
          Math.min(p.y, altura - p.y, p.x, largura - p.x) / 70,
        );

        ctx!.beginPath();
        ctx!.arc(p.x, p.y, p.raio, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(255, 238, 198, ${p.brilho * margem})`;
        ctx!.fill();
      }
    }

    const aoRedimensionar = () => semear();
    const aoTrocarAba = () => {
      visivel = document.visibilityState === "visible";
    };

    semear();
    quadro = requestAnimationFrame(desenhar);

    window.addEventListener("resize", aoRedimensionar);
    document.addEventListener("visibilitychange", aoTrocarAba);

    return () => {
      cancelAnimationFrame(quadro);
      window.removeEventListener("resize", aoRedimensionar);
      document.removeEventListener("visibilitychange", aoTrocarAba);
    };
  }, [densidade]);

  return (
    <canvas
      ref={tela}
      aria-hidden="true"
      className={`pointer-events-none ${className}`}
    />
  );
}
