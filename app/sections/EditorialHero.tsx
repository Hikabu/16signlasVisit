"use client";

import { useEffect, useRef } from "react";
import { EvidenceParticles } from "@/app/animations/EvidenceParticles";
import styles from "./EditorialHero.module.css";

export function EditorialHero() {
  const outerRef = useRef<HTMLElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const atmosphereRef = useRef<HTMLDivElement>(null);
  const cursorLightRef = useRef<HTMLDivElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const hero = outerRef.current;
    const atmosphere = atmosphereRef.current;
    if (!hero || !atmosphere) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let animationFrame = 0;

    const interpolateOpacity = (progress: number) => {
      if (progress <= 0.4) return 1 - (progress / 0.4) * 0.3;
      if (progress <= 0.75) return 0.7 - ((progress - 0.4) / 0.35) * 0.5;
      return Math.max(0, 0.2 - ((progress - 0.75) / 0.25) * 0.2);
    };

    const updateAtmosphere = () => {
      const bounds = hero.getBoundingClientRect();
      const progress = Math.min(1, Math.max(0, -bounds.top / bounds.height));

      atmosphere.style.setProperty("--atmosphere-opacity", interpolateOpacity(progress).toFixed(3));
      atmosphere.style.setProperty("--atmosphere-shift", reducedMotion.matches ? "0px" : `${(progress * 28).toFixed(1)}px`);
      atmosphere.style.setProperty("--atmosphere-scale", reducedMotion.matches ? "1" : (1 + progress * 0.025).toFixed(4));
      animationFrame = 0;
    };

    const requestUpdate = () => {
      if (!animationFrame) animationFrame = requestAnimationFrame(updateAtmosphere);
    };

    updateAtmosphere();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    reducedMotion.addEventListener("change", requestUpdate);

    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      reducedMotion.removeEventListener("change", requestUpdate);
      if (animationFrame) cancelAnimationFrame(animationFrame);
    };
  }, []);

  useEffect(() => {
    const frame = frameRef.current;
    const cursorLight = cursorLightRef.current;
    const visual = visualRef.current;
    const finePointer = window.matchMedia("(pointer: fine)");
    if (!frame || !cursorLight || !visual || !finePointer.matches) return;

    let animationFrame = 0;
    let pointerX = 0;
    let pointerY = 0;

    const updatePointer = () => {
      const frameBounds = frame.getBoundingClientRect();
      const visualBounds = visual.getBoundingClientRect();
      const x = pointerX - frameBounds.left;
      const y = pointerY - frameBounds.top;
      const visualCenter = visualBounds.left + visualBounds.width / 2;
      const tilt = Math.max(-1, Math.min(1, ((pointerX - visualCenter) / visualBounds.width) * 2));

      cursorLight.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      cursorLight.style.opacity = "1";
      visual.style.setProperty("--ring-tilt", `${tilt.toFixed(2)}deg`);
      animationFrame = 0;
    };

    const onPointerMove = (event: PointerEvent) => {
      pointerX = event.clientX;
      pointerY = event.clientY;
      if (!animationFrame) animationFrame = requestAnimationFrame(updatePointer);
    };

    const onPointerLeave = () => {
      cursorLight.style.opacity = "0";
      visual.style.setProperty("--ring-tilt", "0deg");
    };

    frame.addEventListener("pointermove", onPointerMove);
    frame.addEventListener("pointerleave", onPointerLeave);

    return () => {
      frame.removeEventListener("pointermove", onPointerMove);
      frame.removeEventListener("pointerleave", onPointerLeave);
      if (animationFrame) cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <section id="hero" ref={outerRef} className={styles.outer} aria-labelledby="hero-title">
        <div className={styles.frame} ref={frameRef}>
          <div ref={atmosphereRef} className={styles.atmosphere} aria-hidden="true" />
          <div ref={cursorLightRef} className={styles.cursorLight} aria-hidden="true" />

          <div className={styles.heroGrid}>
            <div className={styles.copyColumn}>
              <div className={styles.headlineBlock}>
                <h1 id="hero-title" className={styles.headline} aria-label="Hiring layer for teams that ship fast">
                  <span className={styles.headlineLine}>
                    <span className={styles.headlineWord} style={{ animationDelay: "0ms" }} aria-hidden="true">
                      Know their work{" "}
                    </span>
                  </span>
                  <span className={styles.headlineLine}>
                    <span className={styles.headlineWord} style={{ animationDelay: "120ms" }} aria-hidden="true">
                      before you meet them
                    </span>{" "}
                  </span>
                </h1>
              </div>

              <div className={styles.narrative}>
                <p className={styles.subhead}>
                  Turn every application into a 90-second brief on demonstrated skills, CV claims, role fit, and what to explore in the interview.  </p>

                <div className={styles.actionGroup}>
                  <div className={styles.ctas} role="group" aria-label="Primary actions">
                    <a className={styles.primaryCta} href="#prepared-interview">
                      View a sample report
                      <span aria-hidden="true">↘</span>
                    </a>

                    <a className={styles.secondaryCta} href="#book-call">
                      Run it on your work
                      <span aria-hidden="true">↗</span>
                    </a>
                  </div>

                  <a className={styles.transitionLink} href="#prepared-interview">
                    See what you know before the interview
                    <span aria-hidden="true">↓</span>
                  </a>
                </div>
              </div>
            </div>

            <div ref={visualRef} className={styles.visual} aria-hidden="true">
              <EvidenceParticles />
            </div>
          </div>
        </div>
    </section>
  );
}
