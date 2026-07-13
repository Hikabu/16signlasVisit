"use client";

import { useEffect, useRef, useState } from "react";

function random(seed: number) {
  let value = seed >>> 0;
  return () => {
    value = (value * 1664525 + 1013904223) >>> 0;
    return value / 4294967296;
  };
}

export function ShiftEvidenceBand() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true);
        observer.disconnect();
      }
    }, { rootMargin: "0px 0px -12%", threshold: 0.28 });
    observer.observe(wrapper);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrapper = wrapperRef.current;
    if (!canvas || !wrapper) return;

    const draw = () => {
      const { width, height } = wrapper.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const styles = getComputedStyle(document.documentElement);
      const colors = ["--deep-teal-950", "--deep-teal-800", "--deep-teal-700", "--teal-600", "--teal-500"]
        .map((name) => styles.getPropertyValue(name).trim());
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      canvas.width = Math.max(1, Math.round(width * dpr));
      canvas.height = Math.max(1, Math.round(height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, width, height);

      const rng = random(160326);
      const columns = Math.ceil(width / 3.2);
      for (let column = 0; column < columns; column += 1) {
        const x = (column / Math.max(1, columns - 1)) * width;
        const era = x / width;
        const density = 0.34 + Math.sin(era * Math.PI * 3.7 + 0.6) * 0.12 + Math.sin(era * Math.PI * 11.3) * 0.07 + era * 0.28;
        const count = Math.max(2, Math.round(5 + density * 13 + rng() * 5));
        for (let index = 0; index < count; index += 1) {
          const emphasis = rng();
          const centerBias = (rng() + rng()) / 2;
          ctx.globalAlpha = 0.22 + rng() * 0.62;
          ctx.fillStyle = colors[Math.min(colors.length - 1, Math.floor((density + rng() * 0.55) * 3.1))];
          ctx.fillRect(
            x + (rng() - 0.5) * 3.8,
            8 + centerBias * (height - 16),
            emphasis > 0.91 ? 2.4 + rng() * 5.5 : 0.65 + rng() * 1.45,
            emphasis > 0.95 ? 1.2 + rng() * 1.8 : 0.55 + rng() * 0.85,
          );
        }
      }
      ctx.globalAlpha = 1;
    };

    draw();
    const resizeObserver = new ResizeObserver(draw);
    resizeObserver.observe(wrapper);
    return () => resizeObserver.disconnect();
  }, []);

  return (
    <div ref={wrapperRef} className="shift-evidence-band" data-visible={visible ? "true" : "false"} role="img" aria-label="A dense accumulated record of engineering work across time">
      <canvas ref={canvasRef} aria-hidden="true" />
    </div>
  );
}
