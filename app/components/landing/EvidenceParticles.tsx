"use client";

import { useEffect, useRef } from "react";

// ─── Constants ─────────────────────────────────────────────────────────────────
const TAU = Math.PI * 2;

// Theme palette (hex converted to usable RGB for canvas)
const COL_HOTSPOT = "0, 154, 147";   // #009A93
const COL_MID     = "0, 133, 128";   // #008580
const COL_DEEP    = "9, 82, 79";     // #09524F
const COL_SHADOW  = "7, 58, 57";     // #073A39

// ─── Glyph pools ──────────────────────────────────────────────────────────────
const GLYPHS_TINY     = ["·", ".", ":", "0", "1"];
const GLYPHS_BRACKET  = ["<", ">", "{", "}", "[", "]", "/", "\\", "|"];
const GLYPHS_SYMBOL   = ["+", "=", "-", "_", "×", "*"];
const GLYPHS_EVIDENCE = ["PR", "COMMIT", "REVIEW", "MERGE"];

// Which (from → to) replacements happen occasionally
const REPLACEMENTS: [string, string][] = [
  ["0",  "PR"],
  ["1",  "REVIEW"],
  ["·",  "COMMIT"],
  [":",  "MERGE"],
];

// ─── Seeded PRNG ──────────────────────────────────────────────────────────────
function makePrng(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807 + 0) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

// ─── Glyph picker (weighted by distribution spec) ─────────────────────────────
function pickGlyph(rng: () => number): string {
  const roll = rng();
  const pool = roll < 0.60 ? GLYPHS_TINY
             : roll < 0.80 ? GLYPHS_BRACKET
             : roll < 0.90 ? GLYPHS_SYMBOL
             :               GLYPHS_EVIDENCE;
  return pool[Math.floor(rng() * pool.length)];
}

// ─── Lane configuration (inner → outer) ───────────────────────────────────────
// radiusFactor: multiplied by base ring radius
// speedMult:    speed relative to primary (25 s / revolution)
// baseOpacity:  depth-layer max opacity
// fontSize:     px (before DPR scaling)
const LANES = [
  { radiusFactor: 0.78, speedMult: 1.00, baseOpacity: 0.35, fontSize: 6.5 }, // innermost / back
  { radiusFactor: 0.88, speedMult: 0.93, baseOpacity: 0.70, fontSize: 8.0 }, // inner-mid
  { radiusFactor: 1.00, speedMult: 1.07, baseOpacity: 1.00, fontSize: 9.0 }, // primary / front
  { radiusFactor: 1.13, speedMult: 0.97, baseOpacity: 0.35, fontSize: 6.5 }, // outer / back
];

// ─── Gap regions [startAngle, spanAngle] (radians) ───────────────────────────
// 6 deliberate empty arcs spaced around the ring
const GAPS: [number, number][] = [
  [0.05 * TAU, 0.055 * TAU],
  [0.19 * TAU, 0.040 * TAU],
  [0.33 * TAU, 0.060 * TAU],
  [0.50 * TAU, 0.050 * TAU],
  [0.67 * TAU, 0.045 * TAU],
  [0.84 * TAU, 0.035 * TAU],
];

// ─── Evidence hotspot ──────────────────────────────────────────────────────────
const HOTSPOT_CENTER = 0.74 * TAU;
const HOTSPOT_HALF   = 0.09 * TAU; // half-arc width

function hotspotStrength(baseAngle: number): number {
  let diff = Math.abs(baseAngle - HOTSPOT_CENTER);
  if (diff > Math.PI) diff = TAU - diff;
  return Math.max(0, 1 - diff / HOTSPOT_HALF);
}

function inGap(angle: number): boolean {
  const a = ((angle % TAU) + TAU) % TAU;
  for (const [start, span] of GAPS) {
    const end = (start + span) % TAU;
    if (span + start > TAU) {
      if (a >= start || a < end) return true;
    } else {
      if (a >= start && a < end) return true;
    }
  }
  return false;
}

// ─── Organic cluster density (sine superposition — no uniform randomness) ─────
function clusterDensity(t: number): number {
  return Math.max(0, Math.min(1,
    0.50
    + 0.28 * Math.sin(t * TAU * 3.7 + 1.1)
    + 0.14 * Math.sin(t * TAU * 7.3 + 2.4)
    + 0.08 * Math.sin(t * TAU * 13.1 + 0.6),
  ));
}

// ─── Particle data ─────────────────────────────────────────────────────────────
interface Particle {
  laneIdx:       number;
  baseAngle:     number;
  glyph:         string;
  currentGlyph:  string;
  nextReplaceAt: number;
  wobble:        number;
  tier:          "hotspot" | "bright" | "mid" | "dim";
}

// Glyphs per lane — denser middle lanes
const LANE_COUNTS = [110, 200, 240, 100];

function buildParticles(startTime: number): Particle[] {
  const rng = makePrng(42);
  const particles: Particle[] = [];

  for (let li = 0; li < LANES.length; li++) {
    const count = LANE_COUNTS[li];

    for (let i = 0; i < count; i++) {
      const t         = i / count;
      const baseAngle = t * TAU;
      const density   = clusterDensity(t);
      const hs        = hotspotStrength(baseAngle);

      // Skip glyphs in gap regions (hotspot edge spillover allowed)
      if (inGap(baseAngle)) {
        if (hs < 0.6 || rng() > 0.18) continue;
      }

      // Skip in low-density zones (organic clusters vs. voids)
      if (density < 0.35 && rng() > density * 2.6) continue;

      const glyph = pickGlyph(rng);
      const wobble = (rng() - 0.5) * 0.055;

      let tier: Particle["tier"];
      if (hs > 0.70 && li === 2)                tier = "hotspot";
      else if (li === 1 || li === 2)            tier = "bright";
      else if (hs > 0.40)                       tier = "mid";
      else                                      tier = "dim";

      const nextReplaceAt = startTime + 8000 + rng() * 37000;

      particles.push({ laneIdx: li, baseAngle, glyph, currentGlyph: glyph, nextReplaceAt, wobble, tier });
    }
  }
  return particles;
}

function maybeReplace(p: Particle, now: number, rng: () => number): void {
  if (now < p.nextReplaceAt) return;
  const pair = REPLACEMENTS[Math.floor(rng() * REPLACEMENTS.length)];
  if (p.currentGlyph === pair[0])      p.currentGlyph = pair[1];
  else if (p.currentGlyph === pair[1]) p.currentGlyph = pair[0];
  else                                  p.currentGlyph = p.glyph;
  p.nextReplaceAt = now + 6000 + rng() * 24000;
}

// ─── Component ─────────────────────────────────────────────────────────────────
export function EvidenceParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx    = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const rng = makePrng(99); // replacement rng — runtime only
    let particles: Particle[] | null = null;
    const offsets = [0, 0, 0, 0]; // accumulated angular offset per lane
    const BASE_SPEED = TAU / 25000; // 25 s / revolution in rad/ms

    let animId: number;
    let lastTime = performance.now();

    const tick = (now: number) => {
      const delta = now - lastTime;
      lastTime = now;

      // Handle resize
      const rect = canvas.getBoundingClientRect();
      const dpr  = Math.min(window.devicePixelRatio || 1, 2);
      const w    = Math.max(1, Math.round(rect.width));
      const h    = Math.max(1, Math.round(rect.height));
      if (canvas.width !== w * dpr || canvas.height !== h * dpr) {
        canvas.width  = w * dpr;
        canvas.height = h * dpr;
      }

      if (!particles) particles = buildParticles(now);

      // Advance lane offsets
      for (let i = 0; i < 4; i++) {
        offsets[i] = (offsets[i] + delta * BASE_SPEED * LANES[i].speedMult) % TAU;
      }

      // ── Draw ──
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);
      ctx.textAlign    = "center";
      ctx.textBaseline = "middle";

      // Slightly off-centre ellipse for asymmetry
      const cx  = w * 0.506;
      const cy  = h * 0.506;
      const baseR = Math.min(w, h) * 0.41;
      const rx  = baseR * 1.09; // wider
      const ry  = baseR * 0.91; // shorter

      for (const p of particles) {
        maybeReplace(p, now, rng);

        const lane   = LANES[p.laneIdx];
        const angle  = p.baseAngle + offsets[p.laneIdx] + p.wobble;
        const lrf    = lane.radiusFactor;

        // Position on imperfect ellipse
        const x = cx + Math.cos(angle) * rx * lrf;
        const y = cy + Math.sin(angle) * ry * lrf;

        // Tangent vector — align glyph to path direction
        const tx      = -Math.sin(angle) * rx * lrf;
        const ty      =  Math.cos(angle) * ry * lrf;
        const tangent = Math.atan2(ty, tx);

        // Colour & alpha
        const hs = hotspotStrength(p.baseAngle);
        let rgb: string;
        let alpha: number;
        switch (p.tier) {
          case "hotspot":
            rgb   = COL_HOTSPOT;
            alpha = lane.baseOpacity * (0.85 + hs * 0.15);
            break;
          case "bright":
            rgb   = hs > 0.4 ? COL_HOTSPOT : COL_MID;
            alpha = lane.baseOpacity * (0.65 + hs * 0.25);
            break;
          case "mid":
            rgb   = COL_DEEP;
            alpha = lane.baseOpacity * 0.60;
            break;
          default:
            rgb   = COL_SHADOW;
            alpha = lane.baseOpacity * 0.35;
        }
        alpha = Math.min(alpha, 1.0);

        const isEv   = GLYPHS_EVIDENCE.includes(p.currentGlyph);
        const fsize  = isEv ? lane.fontSize * 0.76 : lane.fontSize;

        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(tangent);
        ctx.globalAlpha = alpha;
        ctx.font        = `${fsize}px "SFMono-Regular","Consolas","Menlo",monospace`;
        ctx.fillStyle   = `rgb(${rgb})`;
        ctx.fillText(p.currentGlyph, 0, 0);
        ctx.restore();
      }

      animId = requestAnimationFrame(tick);
    };

    animId = requestAnimationFrame(tick);

    const ro = new ResizeObserver(() => {
      const rect = canvas.getBoundingClientRect();
      const dpr  = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width  = Math.round(rect.width)  * dpr;
      canvas.height = Math.round(rect.height) * dpr;
    });
    ro.observe(canvas);

    return () => {
      cancelAnimationFrame(animId);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{ display: "block", width: "100%", height: "100%" }}
    />
  );
}
