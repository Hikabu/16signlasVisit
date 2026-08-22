"use client";

import { useEffect, useRef } from "react";

export function HowItWorks() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  /* Fade in content on scroll into view */
  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;
    if (!section || !content) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          content.dataset.visible = "true";
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="how-it-works"
      ref={sectionRef}
      className="hiw-statement-section"
      aria-labelledby="hiw-headline"
    >
      {/* Atmospheric gradient background */}
      <div className="hiw-atmosphere" aria-hidden="true">
        <div className="hiw-orb hiw-orb--petrol" />
        <div className="hiw-orb hiw-orb--aqua" />
        <div className="hiw-orb hiw-orb--apricot" />
        <div className="hiw-orb hiw-orb--olive" />
        <div className="hiw-grain" />
      </div>

      {/* Main copy */}
      <div className="container hiw-inner">
        <div className="hiw-copy" ref={contentRef} data-visible="false">

          <p className="hiw-eyebrow">
            Behind every application
          </p>

          <h2 id="hiw-headline" className="hiw-headline">
            Don&apos;t interview
            <br />
            <em>a&nbsp;résumé.</em>
          </h2>

          <div className="hiw-body">
            <p>
              There is a real person behind the application. Their work already
              contains years of{" "}
              <em>decisions, mistakes, trade&#8209;offs,
              collaboration and progress.</em>
            </p>
          </div>

          <p className="hiw-closer">
            <strong>16Signals doesn&apos;t decide who they are.</strong>
            <br />
            It helps you see enough of their work to ask better questions
            when you meet them.
          </p>

        </div>
      </div>
    </section>
  );
}
