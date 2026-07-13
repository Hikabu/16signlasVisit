"use client";

import { useEffect, useRef } from "react";

const TAU = Math.PI * 2;

function seededRandom(seed: number) {
  let value = seed;
  return () => {
    value = (value * 16807) % 2147483647;
    return (value - 1) / 2147483646;
  };
}

export function EvidenceParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;

    const random = seededRandom(16);
    const points = Array.from({ length: 460 }, (_, index) => {
      const angle = random() * TAU;
      const radius = 0.64 + (random() - 0.5) * 0.26;
      return {
        angle,
        radius,
        weight: random(),
        phase: random() * TAU,
        mark: index % 7 === 0 ? "/" : index % 11 === 0 ? "+" : "·",
      };
    });

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

      const cx = width * 0.53;
      const cy = height * 0.47;
      const rx = width * 0.42;
      const ry = height * 0.29;
      const drift = reducedMotion ? 0 : time * 0.000025;

      for (const point of points) {
        const wave = reducedMotion ? 0 : Math.sin(time * 0.0005 + point.phase) * 0.012;
        const angle = point.angle + drift;
        const radius = point.radius + wave;
        const x = cx + Math.cos(angle) * rx * radius;
        const y = cy + Math.sin(angle) * ry * radius + Math.sin(angle * 3) * height * 0.045;
        const edge = Math.abs(Math.sin(angle));
        const alpha = 0.12 + point.weight * 0.36 + edge * 0.08;
        const size = 7 + point.weight * 2;
        context.font = `${size}px "SFMono-Regular", Consolas, monospace`;
        context.fillStyle = `rgba(141, 139, 135, ${alpha})`;
        context.fillText(point.mark, x, y);
      }

      if (!reducedMotion) frame = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(frame);
  }, []);

  return <canvas ref={canvasRef} />;
}
