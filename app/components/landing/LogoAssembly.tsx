"use client";

/**
 * LogoAssembly
 * --------------
 * Renders the company logo with a reveal animation triggered when scroll
 * lines converge (progress 0.80+). The logo fades in with a subtle scale-up
 * and glow, appearing to "assemble" from the flowing lines.
 *
 * After assembly, the logo persists inline with a gentle pulse glow.
 */

import { useFanAnimation } from "./FanAnimationContext";
import Image from "next/image";

export function LogoAssembly() {
  const { progress, hasRevealed } = useFanAnimation();

  if (!hasRevealed) return null;

  // Logo appears during convergence phase (0.72-0.94)
  const logoProgress =
    progress < 0.72 ? 0 : progress < 0.94 ? (progress - 0.72) / 0.22 : 1;

  // Ease-out curve for organic feel
  const eased = 1 - Math.pow(1 - logoProgress, 3);

  const opacity = eased;
  const scale = 0.92 + eased * 0.08;
  const glowIntensity = eased * 0.6;

  if (opacity <= 0.01) return null;

  return (
    <div
      className="logo-assembly"
      style={
        {
          "--logo-opacity": opacity,
          "--logo-scale": scale,
          "--logo-glow": glowIntensity,
        } as React.CSSProperties
      }
      aria-hidden="true"
    >
      <div className="logo-assembly__glow" />
      <Image
        src="/a16zero.png"
        alt=""
        width={56}
        height={56}
        className="logo-assembly__image"
        aria-hidden="true"
      />
    </div>
  );
}
