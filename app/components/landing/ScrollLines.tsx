"use client";

/**
 * ScrollLines
 * ------------
 * Fixed-position container that manages the transition from fan ribs to
 * persistent decorative lines. Uses CSS custom properties driven by scroll
 * progress so the GPU handles interpolation.
 *
 * Behavior:
 * - progress 0.15–0.55: Lines emerge from fan center, travel to screen edges
 * - progress 0.55–0.80: Lines persist, float with gentle sine-wave pulse
 * - progress 0.80–1.00: Lines begin converging toward logo position
 *
 * Lines are pure CSS (no per-rib JS transforms) for performance.
 * The number of visible lines scales with viewport width.
 */

import { useFanAnimation } from "./FanAnimationContext";
import { FAN_GEOMETRY } from "./HeroFanSvg";
import { useEffect, useState } from "react";

export function ScrollLines() {
  const { progress, hasRevealed } = useFanAnimation();
  const [reducedMotion, setReducedMotion] = useState(false);
  const [lineCount, setLineCount] = useState(16);

  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => {
      setReducedMotion(motionQuery.matches);
      setLineCount(window.innerWidth < 720 ? 12 : 20);
    };

    update();
    motionQuery.addEventListener("change", update);
    window.addEventListener("resize", update, { passive: true });
    return () => {
      motionQuery.removeEventListener("change", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  // Derive line positions from fan geometry
  const { ribCount } = FAN_GEOMETRY;
  const visibleLines = Math.min(ribCount, lineCount);

  // Don't render until reveal has fired
  if (!hasRevealed) return null;

  // Reduced-motion: show static lines immediately
  if (reducedMotion) {
    return (
      <div className="scroll-lines scroll-lines--static" aria-hidden="true">
        {Array.from({ length: visibleLines }, (_, i) => {
          const edgeFactor = i / (visibleLines - 1);
          const isRight = edgeFactor > 0.5;
          return (
            <div
              key={i}
              className="scroll-lines__line"
              style={
                {
                  "--line-index": i,
                  "--line-edge": edgeFactor,
                  "--line-side": isRight ? 1 : -1,
                  "--line-opacity": 0.18 + (1 - edgeFactor) * 0.12,
                } as React.CSSProperties
              }
            />
          );
        })}
      </div>
    );
  }

  // Compute animation phase CSS variables
  const emergenceProgress =
    progress < 0.15 ? 0 : progress < 0.55 ? (progress - 0.15) / 0.4 : 1;

  const floatPhase =
    progress >= 0.55 && progress < 0.80
      ? (progress - 0.55) / 0.25
      : progress >= 0.80
        ? 1
        : 0;

  const convergenceProgress =
    progress < 0.80 ? 0 : (progress - 0.80) / 0.20;

  const globalOpacity =
    progress < 0.15 ? 0 : progress < 0.25 ? (progress - 0.15) / 0.1 : 1;

  return (
    <div
      className="scroll-lines"
      aria-hidden="true"
      style={
        {
          "--sl-emergence": emergenceProgress,
          "--sl-float": floatPhase,
          "--sl-convergence": convergenceProgress,
          "--sl-opacity": globalOpacity,
        } as React.CSSProperties
      }
    >
      {Array.from({ length: visibleLines }, (_, i) => {
        const edgeFactor = i / (visibleLines - 1);
        const isRight = edgeFactor > 0.5;
        // Stagger: center lines appear first
        const centerDist = Math.abs(edgeFactor - 0.5) * 2;
        const stagger = centerDist * 0.3;

        return (
          <div
            key={i}
            className="scroll-lines__line"
            style={
              {
                "--line-index": i,
                "--line-edge": edgeFactor,
                "--line-side": isRight ? 1 : -1,
                "--line-stagger": stagger,
                "--line-delay": `${stagger * 0.8}s`,
              } as React.CSSProperties
              }
          />
        );
      })}
    </div>
  );
}
