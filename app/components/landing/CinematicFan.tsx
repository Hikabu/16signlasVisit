"use client";

import { useEffect, useRef, useState } from "react";
import { HeroFanSvg } from "./HeroFanSvg";
import { useFanAnimation } from "./FanAnimationContext";

export function CinematicFan() {
  const { hasRevealed, progress } = useFanAnimation();
  const containerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    setReducedMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    setMounted(true);
  }, []);

  // Scroll-driven opacity: fan fades as ribs stretch away (progress 0.15–0.55)
  const scrollOpacity =
    progress < 0.15 ? 1 : progress < 0.55 ? 1 - (progress - 0.15) / 0.4 : 0;

  // Scroll-driven scale: fan pulls apart slightly as ribs disengage
  const scrollScale =
    progress < 0.15
      ? 1
      : progress < 0.55
        ? 1 + (progress - 0.15) * 0.08
        : 1.032;

  return (
    <div
      ref={containerRef}
      className={`cinematic-fan ${hasRevealed ? "cinematic-fan--revealed" : ""}`}
      aria-hidden="true"
      style={
        {
          "--fan-scroll-opacity": scrollOpacity,
          "--fan-scroll-scale": scrollScale,
        } as React.CSSProperties
      }
    >
      <div className="cinematic-fan__silhouette">
        <HeroFanSvg idPrefix="fan-silhouette" />
      </div>
      <div className="cinematic-fan__main">
        <HeroFanSvg idPrefix="fan" />
      </div>

      {/* Light sweep overlay */}
      {mounted && !reducedMotion && hasRevealed && (
        <div className="cinematic-fan__sweep" />
      )}
    </div>
  );
}
