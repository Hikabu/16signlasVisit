"use client";

import { useEffect, useRef } from "react";

/**
 * EvidenceField — Procedural particle visualization
 *
 * Monospace glyphs arranged in a circular radar/scorecard pattern.
 * Density increases toward the outer ring; center remains nearly empty.
 * <5% of particles use Bordeaux accent; the rest stay grey.
 * Deterministic output via seeded random.
 * Subtle drift <3px, occasional opacity changes.
 * Feels computational, not artistic.
 */

const TAU = Math.PI * 2;

/** Mulberry32 seeded PRNG — deterministic output across renders. */
function seededRandom(seed: number) {
  let value = seed;
  return () => {
    value = (value * 16807) % 2147483647;
    return (value - 1) / 2147483646;
  };
}

const GLYPHS = ["+", "\u00d7", "<", ">", "/", "\u2591", "\u2593", "\u2588", "0", "1"] as const;

// Bordeaux accent — used on <5% of particles
const BORDEAUX = { r: 123, g: 36, b: 50 }; // #7B2432
// Secondary text grey
const GREY = { r: 141, g: 139, b: 135 }; // #8D8B87

interface Particle {
  angle: number;
  radius: number;
  weight: number;
  phase: number;
  glyph: string;
  isAccent: boolean;
  driftX: number;
  driftY: number;
  opacityPhase: number;
  opacitySpeed: number;
}

export function EvidenceField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;

    const random = seededRandom(42);
    const PARTICLE_COUNT = 320;

    // Generate particles — density weighted toward outer ring
    const points: Particle[] = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      // Use squared random to bias toward outer edge
      const radiusBias = Math.pow(random(), 0.6); // 0.6 pushes values higher
      const radius = 0.15 + radiusBias * 0.85; // 0.15–1.0 range (center starts at 15%)

      points.push({
        angle: random() * TAU,
        radius,
        weight: random(),
        phase: random() * TAU,
        glyph: GLYPHS[Math.floor(random() * GLYPHS.length)],
        isAccent: random() < 0.045, // <5% Bordeaux
        driftX: (random() - 0.5) * 2.5, // max drift ~3px
        driftY: (random() - 0.5) * 2.5,
        opacityPhase: random() * TAU,
        opacitySpeed: 0.0001 + random() * 0.0003, // very slow opacity cycle
      });
    }

    let frame = 0;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const draw = (time = 0) => {
      const bounds = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = Math.max(1, Math.round(bounds.width));
      const height = Math.max(1, Math.round(bounds.height));

      if (canvas.width !== width * dpr || canvas.height !== height * dpr) {
        canvas.width = width * dpr;
        canvas.height = height * dpr;
      }

      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      context.clearRect(0, 0, width, height);
      context.textAlign = "center";
      context.textBaseline = "middle";

      const cx = width * 0.5;
      const cy = height * 0.5;
      const rx = Math.min(width * 0.44, height * 0.42);
      const ry = Math.min(height * 0.44, width * 0.42);
      const drift = reducedMotion ? 0 : time * 0.000015;

      for (const p of points) {
        // Slow angular drift — barely perceptible
        const angle = p.angle + drift;
        // Subtle radial breathing
        const wave = reducedMotion ? 0 : Math.sin(time * 0.0003 + p.phase) * 0.008;
        const radius = p.radius + wave;

        // Elliptical positioning with slight vertical modulation
        const x = cx + Math.cos(angle) * rx * radius;
        const y = cy + Math.sin(angle) * ry * radius;

        // Tiny positional drift — <3px
        const dx = reducedMotion ? 0 : Math.sin(time * 0.0002 + p.phase) * p.driftX;
        const dy = reducedMotion ? 0 : Math.cos(time * 0.00025 + p.phase) * p.driftY;

        // Base alpha — outer particles more visible, center more faded
        const edgeFactor = p.radius; // closer to 1 = outer edge
        const baseAlpha = 0.08 + edgeFactor * 0.32 + p.weight * 0.16;

        // Occasional opacity shimmer
        const opacityShift = reducedMotion
          ? 0
          : Math.sin(time * p.opacitySpeed + p.opacityPhase) * 0.06;
        const alpha = Math.max(0.04, Math.min(0.72, baseAlpha + opacityShift));

        const color = p.isAccent ? BORDEAUX : GREY;
        const size = 6 + p.weight * 3;

        context.font = `${size}px "SFMono-Regular", Consolas, "Liberation Mono", Menlo, monospace`;
        context.fillStyle = `rgba(${color.r}, ${color.g}, ${color.b}, ${alpha})`;
        context.fillText(p.glyph, x + dx, y + dy);
      }

      // Optional: very faint concentric ring guides (like a radar)
      if (!reducedMotion) {
        const ringAlpha = 0.025;
        context.strokeStyle = `rgba(141, 139, 135, ${ringAlpha})`;
        context.lineWidth = 0.5;
        for (let r = 0.33; r <= 1.0; r += 0.33) {
          context.beginPath();
          context.ellipse(cx, cy, rx * r, ry * r, 0, 0, TAU);
          context.stroke();
        }
      }

      if (!reducedMotion) frame = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{ width: "100%", height: "100%", display: "block" }}
    />
  );
}
