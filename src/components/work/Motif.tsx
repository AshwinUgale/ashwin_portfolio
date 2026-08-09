import React from 'react';
import type { MotifId } from '@/data/projects';

// Signature hero glyph per project. Abstract, stroke = currentColor (the page
// sets color to the project accent). Same visual language, different metaphor.

const wrap = 'h-full w-full';
const stroke = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.4, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };
const soft = 'rgba(236,232,225,0.16)';

const Muteval = () => (
  // mutation: a grid of glyphs, one row mutated + struck
  <svg viewBox="0 0 120 120" className={wrap} aria-hidden>
    {[0, 1, 2, 3, 4].map((r) =>
      [0, 1, 2, 3, 4].map((c) => (
        <rect key={`${r}-${c}`} x={12 + c * 20} y={12 + r * 20} width="12" height="12" rx="2"
          style={{ ...stroke, stroke: r === 2 ? 'currentColor' : soft }} />
      ))
    )}
    <line x1="8" y1="38" x2="112" y2="38" style={{ ...stroke, strokeWidth: 2 }} className="mo-strike" />
    <circle cx="100" cy="24" r="4" style={{ ...stroke, strokeWidth: 2 }} className="mo-pulse" />
  </svg>
);

const Tracelint = () => (
  // trace graph: a chain of tool calls, one flagged
  <svg viewBox="0 0 120 120" className={wrap} aria-hidden>
    <path d="M16 28 H70 M16 28 V60 H60 M16 60 V92 H96" style={{ ...stroke, stroke: soft }} />
    {[[16, 28], [70, 28], [60, 60], [96, 92], [16, 60]].map(([x, y], i) => (
      <circle key={i} cx={x} cy={y} r="6" style={{ ...stroke }} />
    ))}
    <circle cx="96" cy="92" r="9" style={{ ...stroke, strokeWidth: 2 }} className="mo-pulse" />
    <path d="M86 104 q10 8 20 0" style={{ ...stroke, strokeWidth: 2 }} className="mo-underline" />
  </svg>
);

const Goldset = () => (
  // curation: scattered points collapsing into clusters, one outlier kept
  <svg viewBox="0 0 120 120" className={wrap} aria-hidden>
    <circle cx="38" cy="44" r="16" style={{ ...stroke, stroke: soft }} />
    <circle cx="80" cy="74" r="14" style={{ ...stroke, stroke: soft }} />
    {[[32, 40], [44, 46], [38, 52], [40, 36]].map(([x, y], i) => <circle key={`a${i}`} cx={x} cy={y} r="2.5" style={{ ...stroke }} />)}
    {[[76, 72], [86, 76], [80, 80]].map(([x, y], i) => <circle key={`b${i}`} cx={x} cy={y} r="2.5" style={{ ...stroke }} />)}
    <circle cx="100" cy="30" r="4" style={{ ...stroke, strokeWidth: 2 }} className="mo-pulse" />
    <path d="M96 30 l8 0 M100 26 l0 8" style={{ ...stroke }} />
  </svg>
);

const Retrieval = () => (
  // ranking: bars re-ordering, top one selected
  <svg viewBox="0 0 120 120" className={wrap} aria-hidden>
    {[[28, 64], [44, 40], [30, 30], [52, 20]].map(([w, y], i) => (
      <rect key={i} x="24" y={16 + i * 22} width={w * 1.2} height="12" rx="2"
        style={{ ...stroke, stroke: i === 3 ? 'currentColor' : soft }} className={i === 3 ? 'mo-slide' : ''} />
    ))}
    <path d="M96 22 l8 0 M100 18 l0 8" style={{ ...stroke, strokeWidth: 2 }} className="mo-pulse" />
  </svg>
);

const Docchat = () => (
  // pinned doc + chat
  <svg viewBox="0 0 120 120" className={wrap} aria-hidden>
    <rect x="24" y="20" width="52" height="66" rx="4" style={{ ...stroke }} />
    {[34, 44, 54, 64].map((y) => <line key={y} x1="34" y1={y} x2={y === 64 ? 56 : 66} y2={y} style={{ ...stroke, stroke: soft }} />)}
    <circle cx="76" cy="26" r="7" style={{ ...stroke, strokeWidth: 2 }} className="mo-pulse" />
    <path d="M70 26 l4 4 l8 -9" style={{ ...stroke, strokeWidth: 2 }} />
    <path d="M64 92 h30 a4 4 0 0 1 4 4 v10 a4 4 0 0 1 -4 4 H78 l-8 8 v-8 h-6 a4 4 0 0 1 -4 -4 V96 a4 4 0 0 1 4 -4 z" style={{ ...stroke }} />
  </svg>
);

const Mcp = () => (
  // connector: a hub wiring to clients
  <svg viewBox="0 0 120 120" className={wrap} aria-hidden>
    <circle cx="60" cy="60" r="12" style={{ ...stroke, strokeWidth: 2 }} />
    {[[24, 30], [96, 30], [24, 90], [96, 90]].map(([x, y], i) => (
      <g key={i}>
        <line x1="60" y1="60" x2={x} y2={y} style={{ ...stroke, stroke: soft }} />
        <rect x={x - 9} y={y - 7} width="18" height="14" rx="3" style={{ ...stroke }} />
      </g>
    ))}
    <circle cx="60" cy="60" r="4" style={{ ...stroke, strokeWidth: 2 }} className="mo-pulse" />
  </svg>
);

const Mneme = () => (
  // three memory tiers as concentric rings
  <svg viewBox="0 0 120 120" className={wrap} aria-hidden>
    <circle cx="60" cy="60" r="40" style={{ ...stroke, stroke: soft }} />
    <circle cx="60" cy="60" r="27" style={{ ...stroke, stroke: soft }} />
    <circle cx="60" cy="60" r="14" style={{ ...stroke, strokeWidth: 2 }} />
    <circle cx="60" cy="20" r="3.5" style={{ ...stroke }} className="mo-orbit" />
    <circle cx="60" cy="33" r="3" style={{ ...stroke }} />
    <circle cx="60" cy="60" r="4" style={{ ...stroke, strokeWidth: 2 }} className="mo-pulse" />
  </svg>
);

const Toolpicker = () => (
  // many tools, K selected through a funnel
  <svg viewBox="0 0 120 120" className={wrap} aria-hidden>
    {[22, 38, 54, 70, 86].map((y, i) => (
      <rect key={y} x="16" y={y - 6} width="14" height="12" rx="2"
        style={{ ...stroke, stroke: i === 1 || i === 3 ? 'currentColor' : soft }} />
    ))}
    <path d="M38 30 L70 52 M38 78 L70 60 M70 52 v8" style={{ ...stroke, stroke: soft }} />
    <path d="M74 44 h22 v24 h-22 z" style={{ ...stroke, opacity: 0 }} />
    {[46, 62].map((y) => <rect key={y} x="86" y={y - 6} width="16" height="12" rx="2" style={{ ...stroke, strokeWidth: 2 }} className="mo-slide" />)}
  </svg>
);

const MAP: Record<MotifId, React.FC> = {
  muteval: Muteval, tracelint: Tracelint, goldset: Goldset, retrieval: Retrieval,
  docchat: Docchat, mcp: Mcp, mneme: Mneme, toolpicker: Toolpicker,
};

const Motif = ({ id, className = '' }: { id: MotifId; className?: string }) => {
  const C = MAP[id];
  return (
    <span className={`block text-[hsl(var(--accent))] ${className}`} style={{ lineHeight: 0 }}>
      <C />
    </span>
  );
};

export default Motif;
