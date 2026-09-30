/**
 * A nave: arcos encaixados que recuam até um ponto luminoso ao fundo.
 *
 * É o eixo central da casa — o olhar entra pela frente e é conduzido à luz.
 * Desenhada em SVG, e não em imagem, para escalar em qualquer tela sem peso.
 */

const LARGURA = 1000;
const ALTURA = 640;

/** Ponto de fuga: para onde toda a arquitetura converge. */
const FUGA = { x: 500, y: 300 };

/** Arco da boca da nave, o mais próximo de quem olha. */
const BOCA = { meiaLargura: 360, nascenca: 470, base: 700 };

const PROFUNDIDADE = 9;
const RECUO = 0.79;

function arco(escala: number) {
  const meiaLargura = BOCA.meiaLargura * escala;
  const nascenca = FUGA.y + (BOCA.nascenca - FUGA.y) * escala;
  const base = FUGA.y + (BOCA.base - FUGA.y) * escala;
  const esq = FUGA.x - meiaLargura;
  const dir = FUGA.x + meiaLargura;

  // Pés retos até a nascença, e daí o semicírculo do arco pleno.
  return `M ${esq} ${base} L ${esq} ${nascenca} A ${meiaLargura} ${meiaLargura} 0 0 1 ${dir} ${nascenca} L ${dir} ${base}`;
}

export function Nave({ className = "" }: { className?: string }) {
  const arcos = Array.from({ length: PROFUNDIDADE }, (_, i) => {
    const escala = RECUO ** i;
    // Quanto mais fundo, mais o arco recebe a luz que vem de trás.
    const luz = 0.1 + (i / (PROFUNDIDADE - 1)) ** 1.6 * 0.62;
    return { d: arco(escala), luz, espessura: 1.6 * escala + 0.35 };
  });

  return (
    <svg
      viewBox={`0 0 ${LARGURA} ${ALTURA}`}
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      className={className}
    >
      <defs>
        <radialGradient id="nave-fundo" cx="50%" cy="47%" r="38%">
          <stop offset="0%" stopColor="#f0dfa8" stopOpacity="0.5" />
          <stop offset="38%" stopColor="#c2a15c" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#c2a15c" stopOpacity="0" />
        </radialGradient>

        <linearGradient id="nave-pedra" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f0dfa8" />
          <stop offset="55%" stopColor="#c2a15c" />
          <stop offset="100%" stopColor="#7a5a32" />
        </linearGradient>

        {/* A luz que atravessa o vão, larga em cima e afilada no chão. */}
        <linearGradient id="nave-feixe" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffeec2" stopOpacity="0.16" />
          <stop offset="100%" stopColor="#ffeec2" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* O fundo iluminado, para onde os arcos conduzem. */}
      <ellipse cx={FUGA.x} cy={300} rx={300} ry={230} fill="url(#nave-fundo)" />

      {/* Feixes vindos das janelas altas, fora de quadro. */}
      <g opacity="0.75">
        <path d="M 250 0 L 360 0 L 250 640 L 120 640 Z" fill="url(#nave-feixe)" />
        <path d="M 700 0 L 790 0 L 900 640 L 760 640 Z" fill="url(#nave-feixe)" />
      </g>

      {arcos.map((a, i) => (
        <path
          key={i}
          d={a.d}
          fill="none"
          stroke="url(#nave-pedra)"
          strokeWidth={a.espessura}
          strokeOpacity={a.luz}
          strokeLinecap="round"
        />
      ))}
    </svg>
  );
}
