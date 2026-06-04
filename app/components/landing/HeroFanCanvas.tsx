"use client";

import { useEffect, useRef } from "react";

type Blade = {
  angle: number;
  width: number;
  length: number;
  delay: number;
  breath: number;
  speed: number;
  alpha: number;
};

const easeOutExpo = (value: number) => (value >= 1 ? 1 : 1 - 2 ** (-10 * value));

const blades: Blade[] = Array.from({ length: 17 }, (_, index) => {
  const center = (index - 8) / 8;
  return {
    angle: center * 58,
    width: 28 + (1 - Math.abs(center)) * 20,
    length: 1.04 + (1 - Math.abs(center)) * 0.16,
    delay: index * 22,
    breath: 1.2 + Math.abs(center) * 1.5,
    speed: 0.00028 + index * 0.000012,
    alpha: 0.34 + (1 - Math.abs(center)) * 0.26,
  };
});

export function HeroFanCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d", { alpha: false });
    if (!context) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const noiseCanvas = document.createElement("canvas");
    const noiseContext = noiseCanvas.getContext("2d");
    const start = performance.now();
    let animationFrame = 0;
    let width = 0;
    let height = 0;
    let dpr = 1;

    const resize = () => {
      const bounds = canvas.parentElement?.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = Math.ceil(bounds?.width || window.innerWidth);
      height = Math.max(Math.ceil(bounds?.height || window.innerHeight), 640);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const refreshNoise = () => {
      if (!noiseContext) return;

      const size = 180;
      noiseCanvas.width = size;
      noiseCanvas.height = size;
      const image = noiseContext.createImageData(size, size);

      for (let i = 0; i < image.data.length; i += 4) {
        const shade = 150 + Math.random() * 105;
        image.data[i] = shade;
        image.data[i + 1] = shade;
        image.data[i + 2] = shade;
        image.data[i + 3] = Math.random() * 22;
      }

      noiseContext.putImageData(image, 0, 0);
    };

    const drawBlade = (blade: Blade, index: number, elapsed: number, opening: number) => {
      const pivotX = width * 0.5;
      const pivotY = height * 0.98;
      const fanLength = Math.max(width, height) * blade.length;
      const baseWidth = blade.width + width * 0.026;
      const breath = reducedMotion ? 0 : Math.sin(elapsed * blade.speed + index * 0.8) * blade.breath;
      const angle = (blade.angle * opening + breath) * (Math.PI / 180);
      const highlight = reducedMotion ? 0.48 : 0.48 + Math.sin(elapsed * 0.00036 + index * 0.72) * 0.16;

      context.save();
      context.translate(pivotX, pivotY);
      context.rotate(angle);

      const bladeGradient = context.createLinearGradient(-baseWidth, 0, baseWidth, 0);
      bladeGradient.addColorStop(0, "rgba(0, 26, 26, 0)");
      bladeGradient.addColorStop(Math.max(0.08, highlight - 0.34), "rgba(0, 79, 75, 0.38)");
      bladeGradient.addColorStop(highlight, `rgba(34, 200, 191, ${blade.alpha})`);
      bladeGradient.addColorStop(Math.min(0.94, highlight + 0.22), "rgba(64, 224, 216, 0.3)");
      bladeGradient.addColorStop(1, "rgba(0, 26, 26, 0)");

      context.beginPath();
      context.moveTo(0, 0);
      context.bezierCurveTo(baseWidth * 0.4, -fanLength * 0.28, baseWidth * 1.2, -fanLength * 0.72, baseWidth * 1.48, -fanLength);
      context.lineTo(-baseWidth * 1.48, -fanLength);
      context.bezierCurveTo(-baseWidth * 1.2, -fanLength * 0.72, -baseWidth * 0.4, -fanLength * 0.28, 0, 0);
      context.closePath();
      context.fillStyle = bladeGradient;
      context.fill();

      const silkGradient = context.createLinearGradient(0, -fanLength, 0, 0);
      silkGradient.addColorStop(0, "rgba(64, 224, 216, 0)");
      silkGradient.addColorStop(0.28 + highlight * 0.18, "rgba(64, 224, 216, 0.18)");
      silkGradient.addColorStop(0.62, "rgba(0, 154, 147, 0.08)");
      silkGradient.addColorStop(1, "rgba(0, 26, 26, 0)");
      context.globalCompositeOperation = "screen";
      context.fillStyle = silkGradient;
      context.fill();

      context.restore();
    };

    const render = (now: number) => {
      const elapsed = reducedMotion ? 2600 : now - start;

      context.globalCompositeOperation = "source-over";
      context.fillStyle = "#020304";
      context.fillRect(0, 0, width, height);

      const aura = context.createRadialGradient(width * 0.5, height * 0.76, 0, width * 0.5, height * 0.76, width * 0.62);
      aura.addColorStop(0, "rgba(34, 200, 191, 0.26)");
      aura.addColorStop(0.35, "rgba(0, 154, 147, 0.1)");
      aura.addColorStop(1, "rgba(0, 26, 26, 0)");
      context.fillStyle = aura;
      context.fillRect(0, 0, width, height);

      for (let index = 0; index < blades.length; index += 1) {
        const blade = blades[index];
        const opening = easeOutExpo(Math.max(0, Math.min(1, (elapsed - blade.delay) / 2150)));
        drawBlade(blade, index, elapsed, opening);
      }

      context.globalCompositeOperation = "screen";
      const centerGlow = context.createRadialGradient(width * 0.5, height * 0.95, 0, width * 0.5, height * 0.95, height * 0.52);
      centerGlow.addColorStop(0, "rgba(64, 224, 216, 0.36)");
      centerGlow.addColorStop(0.24, "rgba(0, 154, 147, 0.12)");
      centerGlow.addColorStop(1, "rgba(0, 26, 26, 0)");
      context.fillStyle = centerGlow;
      context.fillRect(0, 0, width, height);

      context.globalCompositeOperation = "source-over";
      const vignette = context.createRadialGradient(width * 0.5, height * 0.48, height * 0.22, width * 0.5, height * 0.52, width * 0.78);
      vignette.addColorStop(0, "rgba(2, 3, 4, 0)");
      vignette.addColorStop(0.62, "rgba(2, 3, 4, 0.36)");
      vignette.addColorStop(1, "rgba(2, 3, 4, 0.96)");
      context.fillStyle = vignette;
      context.fillRect(0, 0, width, height);

      if (noiseContext) {
        const drift = reducedMotion ? 0 : Math.sin(elapsed * 0.00025) * 24;
        const pattern = context.createPattern(noiseCanvas, "repeat");
        if (pattern) {
          context.save();
          context.globalAlpha = 0.055;
          context.globalCompositeOperation = "screen";
          context.translate(drift, -drift * 0.6);
          context.fillStyle = pattern;
          context.fillRect(-220, -220, width + 440, height + 440);
          context.restore();
        }
      }

      if (!reducedMotion) {
        animationFrame = requestAnimationFrame(render);
      }
    };

    resize();
    refreshNoise();
    render(start);

    const onResize = () => {
      resize();
      if (reducedMotion) render(start + 2600);
    };

    window.addEventListener("resize", onResize);
    const noiseTimer = window.setInterval(refreshNoise, 900);

    return () => {
      window.removeEventListener("resize", onResize);
      window.clearInterval(noiseTimer);
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" aria-hidden />;
//   return (
//   <div className="absolute inset-0 overflow-hidden bg-[#009A93]/10 blur-xl opacity-90">
//     <canvas
//       ref={canvasRef}
//       className="absolute inset-0 h-full w-full"
//       aria-hidden
//     />

//     <div className="pointer-events-none absolute inset-0 bg-[#009A93]/10 blur-3xl opacity-0" />
//   </div>
// );
}
