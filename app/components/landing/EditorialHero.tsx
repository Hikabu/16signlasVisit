"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useIsScrolled } from "@/app/hooks/useIsScrolled";
import { EvidenceParticles } from "./EvidenceParticles";
import styles from "./EditorialHero.module.css";

const navItems = [
  { label: "Report", href: "#prepared-interview", section: "prepared-interview" },
  { label: "Problem", href: "#the-shift", section: "the-shift" },
  { label: "CV never shows", href: "#cv-misses", section: "cv-misses" },
  { label: "Research", href: "#research", section: "research" },
  { label: "Principles", href: "#problem-value", section: "problem-value" },
  { label: "Method", href: "#how-it-works", section: "how-it-works" },
] as const;

const sectionIds = [
  "hero",
  "prepared-interview",
  "the-shift",
  "cv-misses",
  "research",
  "problem-value",
  "how-it-works",
  "book-call",
] as const;

export function EditorialHero() {
  const frameRef = useRef<HTMLDivElement>(null);
  const cursorLightRef = useRef<HTMLDivElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);
  const [activeSection, setActiveSection] = useState("hero");
  const isScrolled = useIsScrolled(18);

  useEffect(() => {
    const updateActiveSection = () => {
      const threshold = window.innerHeight * 0.38;
      let currentSection = "hero";

      for (const sectionId of sectionIds) {
        const section = document.getElementById(sectionId);
        if (section && section.getBoundingClientRect().top <= threshold) {
          currentSection = sectionId;
        }
      }

      setActiveSection((current) => current === currentSection ? current : currentSection);
    };

    updateActiveSection();
    window.addEventListener("scroll", updateActiveSection, { passive: true });
    window.addEventListener("resize", updateActiveSection);

    return () => {
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("resize", updateActiveSection);
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
    <>
      <header className={`${styles.header} ${isScrolled ? styles.headerScrolled : ""}`}>
        <div className={styles.headerInner}>
          <a href="#hero" className={styles.brand} aria-label="16 Signals home">
            <Image
              className={styles.brandMark}
              src="/a16zero.png"
              alt=""
              width={1024}
              height={1024}
              priority
            />
            <span>16 Signals</span>
          </a>

          <nav className={styles.nav} aria-label="Main navigation">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={activeSection === item.section ? styles.activeNav : undefined}
                aria-current={activeSection === item.section ? "location" : undefined}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className={styles.headerActions}>
            <a className={styles.headerCta} href="#book-call">
              Run it on your work
            </a>
            <a className={styles.contactLink} href="#book-call">
              Contact
            </a>
          </div>
        </div>
      </header>

      <section id="hero" className={styles.outer} aria-labelledby="hero-title">
        <div className={styles.frame} ref={frameRef}>
          <div ref={cursorLightRef} className={styles.cursorLight} aria-hidden="true" />

          <div className={styles.heroGrid}>
            <div className={styles.copyColumn}>
              <div className={styles.headlineBlock}>

                <h1 id="hero-title" className={styles.headline} aria-label="Hiring layer for teams that ship fast">
                  <span className={styles.headlineLine}>
                    <span className={styles.headlineWord} style={{ animationDelay: "0ms" }} aria-hidden="true">The hiring layer for </span>
                  </span>
                  <span className={styles.headlineLine}>
                    <span className={styles.headlineWord} style={{ animationDelay: "120ms" }} aria-hidden="true">teams that ship fast</span>{" "}
                    {/* <span className={styles.headlineWord} style={{ animationDelay: "120ms" }} aria-hidden="true">engineering hires</span>{" "} */}
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
    </>
  );
}
