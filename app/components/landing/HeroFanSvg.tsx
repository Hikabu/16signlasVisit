import type { CSSProperties } from "react";

/**
 * HeroFanSvg
 * ----------
 * Animation-ready folding fan, rendered entirely as vector SVG.
 *
 * Design intent (see ANIMATIONFAN.md / hero spec):
 *  - A single folding hand-fan emerges from darkness (near-black bg handled by the Hero).
 *  - Most of the form stays in shadow; #009A93 reflections define the silhouette.
 *  - 25 independent ribs share ONE common pivot at the bottom center, so the fan can:
 *      1) open from the pivot,
 *      2) disassemble — each rib stretches up and collapses into a glowing line,
 *      3) those lines converge into the company logo further down the page.
 *
 * Every rib is its own <g class="fan-rib"> carrying data-rib-index / data-rib-angle,
 * plus a `fan-rib__blade` (the membrane) and `fan-rib__spine` (the linear core it
 * collapses into). This makes the asset directly targetable by GSAP / Framer Motion
 * without touching geometry.
 *
 * The SVG is intentionally stateless (no hooks) so it can render on the server.
 */

export type FanGeometry = {
  viewBox: number;
  pivot: { x: number; y: number };
  ribCount: number;
  stepDeg: number;
  centerIndex: number;
  ribLength: number;
  spanDeg: number;
};

/** Single source of truth for the fan's geometry. Import this to drive external animation. */
export const FAN_GEOMETRY: FanGeometry = {
  viewBox: 1000,
  pivot: { x: 500, y: 940 },
  ribCount: 25,
  stepDeg: 6,
  centerIndex: 12, // (ribCount - 1) / 2
  ribLength: 880,
  spanDeg: 72, // half-span; full fan = ±72° (144° total)
};

type Rib = {
  index: number;
  /** Rotation in degrees applied at the pivot. 0 = straight up. */
  angle: number;
  /** 0 at the center rib → 1 at the outer ribs. */
  edgeFactor: number;
  /** Per-rib presence; center ribs read slightly brighter than the edges. */
  opacity: number;
};

const buildRibs = (): Rib[] => {
  const { ribCount, stepDeg, centerIndex } = FAN_GEOMETRY;
  return Array.from({ length: ribCount }, (_, index) => {
    const angle = (index - centerIndex) * stepDeg;
    const edgeFactor = Math.abs(index - centerIndex) / centerIndex;
    const opacity = 0.72 + (1 - edgeFactor) * 0.28;
    return { index, angle, edgeFactor, opacity };
  });
};

const RIBS = buildRibs();

/**
 * One rib shape, drawn in local coordinates with the pivot at (0,0) and the tip
 * pointing up toward (0, -L). Every rib reuses this exact path — only the group's
 * rotation differs — which keeps the fan mathematically regular and lets it fold,
 * stretch, or dissolve predictably.
 */
const buildRibPath = (length: number, halfWidthTip: number, halfWidthMid: number): string => {
  const L = length;
  return [
    "M 0 0",
    `C ${halfWidthMid * 0.6} ${(-L * 0.18).toFixed(0)} ${halfWidthTip} ${(-L * 0.52).toFixed(0)} ${halfWidthTip} ${(-L * 0.86).toFixed(0)}`,
    `Q ${halfWidthTip} ${-L} 0 ${-L}`,
    `Q ${-halfWidthTip} ${-L} ${-halfWidthTip} ${(-L * 0.86).toFixed(0)}`,
    `C ${-halfWidthTip} ${(-L * 0.52).toFixed(0)} ${-halfWidthMid * 0.6} ${(-L * 0.18).toFixed(0)} 0 0`,
    "Z",
  ].join(" ");
};

const RIB_PATH = buildRibPath(FAN_GEOMETRY.ribLength, 13, 20);

/** Point on the fan's outer circle. Angle in degrees from vertical (up), +right. */
const polarPoint = (radius: number, angleDeg: number) => {
  const rad = (angleDeg * Math.PI) / 180;
  return {
    x: FAN_GEOMETRY.pivot.x + radius * Math.sin(rad),
    y: FAN_GEOMETRY.pivot.y - radius * Math.cos(rad),
  };
};

/** Build the curved top edge of the fan at a given radius, spanning the full arc. */
const buildArcPath = (radius: number): string => {
  const { spanDeg } = FAN_GEOMETRY;
  const start = polarPoint(radius, -spanDeg);
  const end = polarPoint(radius, spanDeg);
  // Large-arc-flag 0 (arc < 180°), sweep-flag 1 (clockwise → over the top).
  return `M ${start.x.toFixed(1)} ${start.y.toFixed(1)} A ${radius} ${radius} 0 0 1 ${end.x.toFixed(1)} ${end.y.toFixed(1)}`;
};

const OUTER_ARC = buildArcPath(FAN_GEOMETRY.ribLength);
const INNER_ARC = buildArcPath(FAN_GEOMETRY.ribLength * 0.86);

type HeroFanSvgProps = {
  className?: string;
  style?: CSSProperties;
  /** Sets how the fan scales within its container. Pivot stays anchored bottom-center. */
  preserveAspectRatio?: string;
  /** Decorative by default; the headline is the accessible content. */
  ariaHidden?: boolean;
  /** Prefix for gradient/filter ids — change if you mount two fans in one document. */
  idPrefix?: string;
};

export function HeroFanSvg({
  className,
  style,
  preserveAspectRatio = "xMidYMax meet",
  ariaHidden = true,
  idPrefix = "fan",
}: HeroFanSvgProps) {
  const { viewBox, pivot, ribLength } = FAN_GEOMETRY;
  const tipY = pivot.y - ribLength; // brightest point of the screen-space gradient

  return (
    <svg
      viewBox={`0 0 ${viewBox} ${viewBox}`}
      preserveAspectRatio={preserveAspectRatio}
      className={className}
      style={style}
      aria-hidden={ariaHidden}
      role={ariaHidden ? undefined : "img"}
      focusable="false"
    >
      <defs>
        {/* Ambient teal glow sitting behind the fan, fading to transparent. */}
        <radialGradient id={`${idPrefix}-aura`} cx="50%" cy="94%" r="60%">
          <stop offset="0%" stopColor="#22C8BF" stopOpacity="0.34" />
          <stop offset="34%" stopColor="#009A93" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#001A1A" stopOpacity="0" />
        </radialGradient>

        {/*
          Rib fill — defined in screen space (bright at the top, dark at the pivot).
          Because all ribs fan upward toward the same region, this single gradient
          makes the tips glow while the base stays hidden in shadow, and naturally
          dims the wider side ribs whose tips sit lower. One gradient, 25 ribs.
        */}
        <linearGradient
          id={`${idPrefix}-rib`}
          gradientUnits="userSpaceOnUse"
          x1={pivot.x}
          y1={tipY}
          x2={pivot.x}
          y2={pivot.y}
        >
          <stop offset="0%" stopColor="#40E0D8" stopOpacity="0.55" />
          <stop offset="16%" stopColor="#22C8BF" stopOpacity="0.82" />
          <stop offset="40%" stopColor="#009A93" stopOpacity="0.74" />
          <stop offset="66%" stopColor="#004F4B" stopOpacity="0.62" />
          <stop offset="88%" stopColor="#001A1A" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#001A1A" stopOpacity="0" />
        </linearGradient>

        {/* The glowing spine each rib collapses into during the line phase. */}
        <linearGradient
          id={`${idPrefix}-spine`}
          gradientUnits="userSpaceOnUse"
          x1={pivot.x}
          y1={tipY}
          x2={pivot.x}
          y2={pivot.y}
        >
          <stop offset="0%" stopColor="#7FF2EC" stopOpacity="0.95" />
          <stop offset="30%" stopColor="#40E0D8" stopOpacity="0.9" />
          <stop offset="62%" stopColor="#009A93" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#009A93" stopOpacity="0" />
        </linearGradient>

        {/* Faint rim that hints at the fan's full silhouette while it's still in shadow. */}
        <linearGradient id={`${idPrefix}-rim`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#40E0D8" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#009A93" stopOpacity="0" />
        </linearGradient>

        <radialGradient id={`${idPrefix}-pivot`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#7FF2EC" stopOpacity="0.95" />
          <stop offset="45%" stopColor="#22C8BF" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#009A93" stopOpacity="0" />
        </radialGradient>

        <filter id={`${idPrefix}-soft`} x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="7" />
        </filter>
      </defs>

      {/* Ambient base glow. */}
      <g className="fan-aura">
        <rect x="0" y="0" width={viewBox} height={viewBox} fill={`url(#${idPrefix}-aura)`} />
      </g>

      {/*
        Implied rim — soft arcs that read as "a large object hidden in darkness"
        before the ribs themselves resolve. Sits behind the ribs.
      */}
      <g className="fan-silhouette" filter={`url(#${idPrefix}-soft)`} opacity="0.55">
        <path d={OUTER_ARC} fill="none" stroke={`url(#${idPrefix}-rim)`} strokeWidth="2.5" />
        <path d={INNER_ARC} fill="none" stroke={`url(#${idPrefix}-rim)`} strokeWidth="1.5" opacity="0.7" />
      </g>

      {/* Ribs. Each group rotates about the shared pivot; children use local coords. */}
      <g className="fan-ribs">
        {RIBS.map(({ index, angle, opacity }) => (
          <g
            key={index}
            className="fan-rib"
            data-rib-index={index}
            data-rib-angle={angle}
            style={{ opacity }}
            transform={`translate(${pivot.x} ${pivot.y}) rotate(${angle})`}
          >
            {/* Membrane blade — fades out when the rib collapses into a line. */}
            <path className="fan-rib__blade" d={RIB_PATH} fill={`url(#${idPrefix}-rib)`} />
            {/* Linear core — the glowing line this rib becomes. */}
            <line
              className="fan-rib__spine"
              x1="0"
              y1="0"
              x2="0"
              y2={-ribLength}
              stroke={`url(#${idPrefix}-spine)`}
              strokeWidth="1.4"
              strokeLinecap="round"
            />
          </g>
        ))}
      </g>

      {/* Pivot node — covers rib convergence and anchors the fold point. */}
      <g className="fan-pivot">
        <circle cx={pivot.x} cy={pivot.y} r="120" fill={`url(#${idPrefix}-pivot)`} />
        <circle cx={pivot.x} cy={pivot.y} r="7" fill="#7FF2EC" />
      </g>
    </svg>
  );
}
