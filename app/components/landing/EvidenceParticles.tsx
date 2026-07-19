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
    const glyphs = ["›", "››", "·", "/", "×", "+", "01", "↗"];
    const points = Array.from({ length: 620 }, (_, index) => {
      const angle = (index / 620) * TAU;
      const radius = 0.73 + (random() - 0.5) * 0.34;
      return {
        angle,
        radius,
        weight: random(),
        phase: random() * TAU,
        mark: glyphs[(index + Math.floor(random() * glyphs.length)) % glyphs.length],
        tone: random(),
      };
    });

    const draw = (offset = 0) => {
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

      const cx = width * 0.51;
      const cy = height * 0.45;
      const rx = width * 0.49;
      const ry = height * 0.36;

      for (const point of points) {
        const angle = (point.angle + offset) % TAU;
        const radius = point.radius;
        const lowerPull = Math.max(0, Math.sin(angle)) * Math.max(0, -Math.cos(angle)) * height * 0.11;
        const x = cx + Math.cos(angle) * rx * radius;
        const y = cy + Math.sin(angle) * ry * radius + Math.sin(angle * 3) * height * 0.036 + lowerPull;
        const edge = Math.abs(Math.sin(angle));
        const alpha = 0.3 + point.weight * 0.56 + edge * 0.08;
        const size = 5.5 + point.weight * 3.4;
        const lightness = point.tone > 0.82 ? 1 : point.tone > 0.38 ? 0.62 : 0.3;

        context.font = `${size}px "SFMono-Regular", Consolas, monospace`;
        context.fillStyle = lightness === 1
          ? `rgba(75, 198, 208, ${alpha * 0.94})`
          : lightness === 0.62
            ? `rgba(0, 159, 172, ${alpha})`
            : `rgba(0, 91, 99, ${alpha * 0.94})`;
        context.fillText(point.mark, x, y);
      }
    };

    let animationFrameId: number;
    let currentOffset = 0;
    const speed = 0.00008; // Radians per millisecond (slow and smooth)
    let lastTime = performance.now();

    const tick = (time: number) => {
      const delta = time - lastTime;
      lastTime = time;
      currentOffset = (currentOffset + delta * speed) % TAU;
      draw(currentOffset);
      animationFrameId = requestAnimationFrame(tick);
    };

    animationFrameId = requestAnimationFrame(tick);

    const resizeObserver = new ResizeObserver(() => {
      draw(currentOffset);
    });
    resizeObserver.observe(canvas);

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden="true" />;
}
