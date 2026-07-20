"use client";

import { useEffect, useRef } from "react";

const TAU = Math.PI * 2;

export function EvidenceParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;
  
    let animId: number;
    let startTime = performance.now();

    const draw = (now: number) => {
      const elapsed = (now - startTime) / 1000; // seconds

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

      const cx = width * 0.51;
      const cy = height * 0.45;
      // Elliptical radii
      const rx = width * 0.415;
      const ry = height * 0.32;

      // ── Soft ambient outer glow ──────────────────────────────────────────
      // We fake a 3D torus by layering elliptical gradients
      const glowRadial = context.createRadialGradient(cx, cy, ry * 0.55, cx, cy, ry * 1.35);
      glowRadial.addColorStop(0, "rgba(74, 144, 217, 0.00)");
      glowRadial.addColorStop(0.55, "rgba(74, 144, 217, 0.04)");
      glowRadial.addColorStop(0.82, "rgba(107, 140, 174, 0.10)");
      glowRadial.addColorStop(1, "rgba(74, 144, 217, 0.00)");
      context.save();
      context.scale(1, ry / rx); // squish to ellipse
      const sqCx = cx;
      const sqCy = cy / (ry / rx);
      context.fillStyle = glowRadial;
      context.beginPath();
      context.ellipse(sqCx, sqCy, rx * 1.35, rx * 1.35, 0, 0, TAU);
      context.fill();
      context.restore();

      // ── Concentric tick marks (precision instrument) ─────────────────────
      const tickCount = 72;
      const tickInner = 0.93;
      const tickOuter = 1.0;
      for (let i = 0; i < tickCount; i++) {
        const angle = (i / tickCount) * TAU;
        const isMajor = i % 9 === 0;
        const isMid = !isMajor && i % 3 === 0;
        const innerScale = isMajor ? tickInner - 0.045 : isMid ? tickInner - 0.018 : tickInner;

        const x1 = cx + Math.cos(angle) * rx * innerScale;
        const y1 = cy + Math.sin(angle) * ry * innerScale;
        const x2 = cx + Math.cos(angle) * rx * tickOuter;
        const y2 = cy + Math.sin(angle) * ry * tickOuter;

        const alpha = isMajor ? 0.45 : isMid ? 0.25 : 0.12;
        context.strokeStyle = `rgba(255,255,255,${alpha})`;
        context.lineWidth = isMajor ? 1.2 : 0.7;
        context.beginPath();
        context.moveTo(x1, y1);
        context.lineTo(x2, y2);
        context.stroke();
      }

      // ── Main elliptical ring (stroke, not fill) ──────────────────────────
      // Outer boundary of the ring
      context.save();
      context.beginPath();
      context.ellipse(cx, cy, rx, ry, 0, 0, TAU);
      context.strokeStyle = "rgba(255,255,255,0.08)";
      context.lineWidth = 28;
      context.stroke();

      // Inner crisp edge
      context.beginPath();
      context.ellipse(cx, cy, rx * 0.88, ry * 0.88, 0, 0, TAU);
      context.strokeStyle = "rgba(255,255,255,0.05)";
      context.lineWidth = 28;
      context.stroke();
      context.restore();

      // ── Outer ring stroke — muted silver ────────────────────────────────
      context.beginPath();
      context.ellipse(cx, cy, rx * 1.0, ry * 1.0, 0, 0, TAU);
      context.strokeStyle = "rgba(200,210,225,0.14)";
      context.lineWidth = 1.2;
      context.stroke();

      // ── Inner ring stroke ────────────────────────────────────────────────
      context.beginPath();
      context.ellipse(cx, cy, rx * 0.87, ry * 0.87, 0, 0, TAU);
      context.strokeStyle = "rgba(180,195,215,0.09)";
      context.lineWidth = 0.8;
      context.stroke();

      // ── Rotating highlight arc (watch bezel catching light) ──────────────
      const highlightSpeed = 0.08; // very slow rotation
      const highlightAngle = elapsed * highlightSpeed * TAU - Math.PI * 0.5;
      const arcSpan = Math.PI * 0.38; // ~68°

      context.save();
      // Clip to the ring band
      context.beginPath();
      context.ellipse(cx, cy, rx * 1.035, ry * 1.035, 0, 0, TAU);
      context.ellipse(cx, cy, rx * 0.835, ry * 0.835, 0, TAU, 0); // reverse = hole
      context.clip("evenodd");

      // Draw the highlight as a series of thin arc strokes for the ellipse
      const steps = 120;
      for (let s = 0; s < steps; s++) {
        const t = s / steps;
        const a = highlightAngle + t * arcSpan;
        const tFade = Math.sin(t * Math.PI); // bell curve fade
        const hAlpha = tFade * 0.55;
        const px = cx + Math.cos(a) * rx * 0.935;
        const py = cy + Math.sin(a) * ry * 0.935;
        const gradient = context.createRadialGradient(px, py, 0, px, py, rx * 0.1);
        gradient.addColorStop(0, `rgba(255,255,255,${hAlpha})`);
        gradient.addColorStop(1, "rgba(255,255,255,0)");
        context.fillStyle = gradient;
        context.beginPath();
        context.arc(px, py, rx * 0.1, 0, TAU);
        context.fill();
      }
      context.restore();

      // ── Second smaller accent arc (180° offset, blue-tinted) ─────────────
      const accent2Angle = highlightAngle + Math.PI + Math.PI * 0.05;
      const accent2Span = Math.PI * 0.18;
      context.save();
      context.beginPath();
      context.ellipse(cx, cy, rx * 1.035, ry * 1.035, 0, 0, TAU);
      context.ellipse(cx, cy, rx * 0.835, ry * 0.835, 0, TAU, 0);
      context.clip("evenodd");
      const steps2 = 60;
      for (let s = 0; s < steps2; s++) {
        const t = s / steps2;
        const a = accent2Angle + t * accent2Span;
        const tFade = Math.sin(t * Math.PI);
        const hAlpha = tFade * 0.22;
        const px = cx + Math.cos(a) * rx * 0.935;
        const py = cy + Math.sin(a) * ry * 0.935;
        const gradient = context.createRadialGradient(px, py, 0, px, py, rx * 0.09);
        gradient.addColorStop(0, `rgba(107,140,174,${hAlpha})`);
        gradient.addColorStop(1, "rgba(107,140,174,0)");
        context.fillStyle = gradient;
        context.beginPath();
        context.arc(px, py, rx * 0.09, 0, TAU);
        context.fill();
      }
      context.restore();

      // ── Subtle inner-edge glow ───────────────────────────────────────────
      context.save();
      context.beginPath();
      context.ellipse(cx, cy, rx * 0.88, ry * 0.88, 0, 0, TAU);
      context.strokeStyle = "rgba(107,140,174,0.12)";
      context.lineWidth = 6;
      context.shadowColor = "rgba(107,140,174,0.35)";
      context.shadowBlur = 12;
      context.stroke();
      context.restore();

      animId = requestAnimationFrame(draw);
    };

    animId = requestAnimationFrame(draw);

    const resizeObserver = new ResizeObserver(() => {
      // canvas size will be recalculated in draw()
    });
    resizeObserver.observe(canvas);

    return () => {
      cancelAnimationFrame(animId);
      resizeObserver.disconnect();
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden="true" />;
}
