"use client";

import { useEffect, useRef } from "react";
import type { CSSProperties } from "react";
import { Reveal } from "@/app/animations/Reveal";
import { PROCESS_FOLDERS } from "@/app/data/landing";

export function ProblemValue() {
  const stackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stack = stackRef.current;
    if (!stack) return;

    const cards = Array.from(
      stack.querySelectorAll<HTMLElement>("[data-verification-folder]"),
    );
    const intro = stack.parentElement?.querySelector<HTMLElement>(
      "[data-problem-value-intro]",
    );
    const mobileQuery = window.matchMedia("(max-width: 767px)");
    let animationFrame = 0;
    let previousIndex = -1;
    let wasMobile = false;

    const updateCurrentFolder = () => {
      animationFrame = 0;

      if (mobileQuery.matches) {
        if (!wasMobile) cards.forEach((card) => card.setAttribute("data-current", "true"));
        intro?.style.setProperty("--intro-release-offset", "0px");
        wasMobile = true;
        previousIndex = -1;
        return;
      }

      if (wasMobile) {
        wasMobile = false;
        previousIndex = -1;
      }

      let currentIndex = 0;

      cards.forEach((card, index) => {
        if (index === 0) return;

        const cardRect = card.getBoundingClientRect();
        const previousRect = cards[index - 1].getBoundingClientRect();
        const previousMidpoint = previousRect.top + previousRect.height * 0.5;

        if (cardRect.top <= previousMidpoint) currentIndex = index;
      });

      const lastCard = cards[cards.length - 1];
      const lastCardTop = lastCard.getBoundingClientRect().top;
      const lastStickyTop = Number.parseFloat(
        window.getComputedStyle(lastCard).top,
      );
      const releaseOffset = Math.min(0, lastCardTop - lastStickyTop);
      intro?.style.setProperty(
        "--intro-release-offset",
        `${releaseOffset}px`,
      );

      if (currentIndex === previousIndex) return;

      cards.forEach((card, index) => {
        card.setAttribute("data-current", index === currentIndex ? "true" : "false");
      });
      previousIndex = currentIndex;
    };

    const scheduleUpdate = () => {
      if (animationFrame) return;
      animationFrame = window.requestAnimationFrame(updateCurrentFolder);
    };

    updateCurrentFolder();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);

    return () => {
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      intro?.style.removeProperty("--intro-release-offset");
      if (animationFrame) window.cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <section
      id="problem-value"
      className="problem-value-section landing-section relative isolate overflow-clip section-transition section-edge-highlight"
    >
      <div className="container">
        <div
          className="problem-value__intro-sticky"
          data-problem-value-intro
        >
          <Reveal className="problem-value__intro max-w-3xl">
            <p className="section-label problem-value__eyebrow reveal-child">One brief. Clear answers</p>
            <h2 className="section-title problem-value__title reveal-child mt-4 text-white">From application to interview brief</h2>
            <p className="reveal-child mt-5 max-w-2xl text-lg leading-[var(--leading-body)] text-[color:var(--muted-strong)]">
              Add the role. Invite the candidate. Receive the evidence. Use it in the interview.
            </p>
          </Reveal>
        </div>

        <div ref={stackRef} className="verification-folder-stack mt-16 space-y-8">
          {PROCESS_FOLDERS.map((folder, index) => (
            <Reveal
              as="article"
              key={folder.title}
              className="verification-folder"
              data-verification-folder
              threshold={0.1}
              rootMargin="0px 0px -8% 0px"
              style={
                {
                  "--folder-index": index,
                  "--folder-total": PROCESS_FOLDERS.length,
                  "--folder-top": `${332 + index * 10}px`,
                  "--folder-shift": "0px",
                  "--reveal-delay": `${index * 70}ms`,
                  "--folder-accent-left": folder.accentOffset,
                } as CSSProperties
              }
            >
              <div className="verification-folder__grain" aria-hidden="true" />
              <div className="verification-folder__accent" aria-hidden="true" />
              <div className="verification-folder__content">
                <div className="verification-folder__left">
                  <p className="verification-folder__step">
                    <span>{folder.label}</span>
                    <span aria-hidden="true">/</span>
                    <span>{folder.step}</span>
                  </p>
                  <h3>{folder.title}</h3>
                </div>
                <div className="verification-folder__right">
                  <p className="verification-folder__description">{folder.body}</p>
                  <div className="verification-folder__divider" aria-hidden="true" />
                  <p className="verification-folder__status">{folder.note}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
