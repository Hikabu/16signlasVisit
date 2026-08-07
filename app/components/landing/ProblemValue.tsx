"use client";

import { Reveal } from "./Reveal";
import { useEffect, useRef } from "react";
import type { CSSProperties } from "react";

const folders = [
  {
    label: "01",
    accentOffset: "8%",
    step: "DEFINE THE ROLE",
    title: "Add the role",
    body:
      "Share the job description or define the stack, responsibilities, and experience your team needs.",
    note: "Takes a few minutes.",
  },
  {
    label: "02",
    accentOffset: "27%",
    step: "INVITE THE CANDIDATE",
    title: "Invite the candidate",
    body:
      "Send a secure link. The candidate chooses and connects the professional work they want assessed.",
    note: "Candidate-controlled access.",
  },
  {
    label: "03",
    accentOffset: "54%",
    step: "REVIEW THE EVIDENCE",
    title: "16Signals reads the work",
    body:
      "We examine relevant contributions, technical decisions, code quality, collaboration, and evidence over time.",
    note: "Analysis runs automatically.",
  },
  {
    label: "04",
    accentOffset: "73%",
    step: "PREPARE THE INTERVIEW",
    title: "Open the brief",
    body:
      "See what matches the role, what is supported by evidence, what remains unclear, and what to ask next.",
    note: "Ready before the interview.",
  },
] as const;

export function ProblemValue() {
  const stackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stack = stackRef.current;
    if (!stack) return;

    const cards = Array.from(stack.querySelectorAll<HTMLElement>(".verification-folder"));
    const mobileQuery = window.matchMedia("(max-width: 767px)");
    let animationFrame = 0;
    let previousIndex = -1;
    let wasMobile = false;

    const updateCurrentFolder = () => {
      animationFrame = 0;

      if (mobileQuery.matches) {
        if (!wasMobile) cards.forEach((card) => card.setAttribute("data-current", "true"));
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
        const stickyTop = 88 + index * 10;
        if (card.getBoundingClientRect().top <= stickyTop + 12) currentIndex = index;
      });

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
      if (animationFrame) window.cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <section
      id="problem-value"
      className="problem-value-section landing-section relative isolate overflow-clip section-transition section-edge-highlight"
    >
      <div className="container">
        <Reveal className="max-w-3xl">
          <p className="section-label problem-value__eyebrow reveal-child">One brief. Clear answers</p>
          <h2 className="section-title problem-value__title reveal-child mt-4 text-white">From application to interview brief</h2>
          <p className="reveal-child mt-5 max-w-2xl text-lg leading-[var(--leading-body)] text-[color:var(--muted-strong)]">
            Add the role. Invite the candidate. Receive the evidence. Use it in the interview.
          </p>
        </Reveal>

        <div ref={stackRef} className="verification-folder-stack mt-16 space-y-8">
          {folders.map((folder, index) => (
            <Reveal
              as="article"
              key={folder.title}
              className="verification-folder"
              threshold={0.22}
              style={
                {
                  "--folder-index": index,
                  "--folder-total": folders.length,
                  "--folder-top": `${88 + index * 10}px`,
                  "--folder-shift": `${index * 2}px`,
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
