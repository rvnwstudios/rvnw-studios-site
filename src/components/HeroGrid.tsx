"use client";

import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

interface GridConfig {
  cols: number;
  rows: number;
  travelCount: number;
  className: string;
}

// Full density on desktop; halved resolution + traveling paths below `md` —
// see "Mobile behavior" in Homepage Section Map.md. Both variants render
// server-side and are toggled purely with CSS breakpoints, so there's no
// hydration flash or JS-driven layout switch.
const DESKTOP: GridConfig = {
  cols: 13,
  rows: 9,
  travelCount: 10,
  className: "hidden select-none md:block",
};

const MOBILE: GridConfig = {
  cols: 7,
  rows: 5,
  travelCount: 5,
  className: "select-none md:hidden",
};

function GridLayer({ cols, rows, travelCount, className, reducedMotion }: GridConfig & { reducedMotion: boolean }) {
  const maxX = cols - 1;
  const maxY = rows - 1;
  const nodes: { x: number; y: number }[] = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) nodes.push({ x: c, y: r });
  }

  const travelers = Array.from({ length: travelCount }, (_, i) => {
    const row = Math.round(((i + 0.5) / travelCount) * maxY);
    const reverse = i % 2 === 1;
    const duration = 10 + (i % 4) * 2.5;
    const begin = -((i / travelCount) * duration);
    return {
      key: i,
      row,
      values: reverse ? `${maxX};0` : `0;${maxX}`,
      duration,
      begin,
    };
  });

  return (
    <svg
      className={`pointer-events-none absolute inset-0 z-0 opacity-70 ${className}`}
      viewBox={`0 0 ${maxX} ${maxY}`}
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <g stroke="#F7F5F0" strokeOpacity="0.05" strokeWidth={maxX / 480}>
        {Array.from({ length: cols }, (_, c) => (
          <line key={`v${c}`} x1={c} y1={0} x2={c} y2={maxY} />
        ))}
        {Array.from({ length: rows }, (_, r) => (
          <line key={`h${r}`} x1={0} y1={r} x2={maxX} y2={r} />
        ))}
      </g>
      <g fill="#F7F5F0" fillOpacity="0.16">
        {nodes.map((n, i) => (
          <circle key={i} cx={n.x} cy={n.y} r={maxX / 280} />
        ))}
      </g>
      <g fill="#FF5A1F" fillOpacity="0.85">
        {travelers.map((t) => (
          <circle key={t.key} cx={0} cy={t.row} r={maxX / 150}>
            {!reducedMotion && (
              <animate
                attributeName="cx"
                values={t.values}
                dur={`${t.duration}s`}
                begin={`${t.begin}s`}
                repeatCount="indefinite"
                calcMode="linear"
              />
            )}
          </circle>
        ))}
      </g>
    </svg>
  );
}

/**
 * Ambient background motion — persistent, not directional, so it stays on
 * linear/SMIL timing rather than the reveal easing token (Motion Guide).
 * Reduced motion drops the traveling nodes to a static position; the grid
 * itself never moves either way.
 */
export function HeroGrid() {
  const reducedMotion = usePrefersReducedMotion();

  return (
    <>
      <GridLayer {...DESKTOP} reducedMotion={reducedMotion} />
      <GridLayer {...MOBILE} reducedMotion={reducedMotion} />
    </>
  );
}
