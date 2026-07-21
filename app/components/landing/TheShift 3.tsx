"use client";

import { useEffect, useRef, useState, useCallback } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

type Stage = {
  number: string;
  title: string;
  proof: string;
  explanation: string;
  meta: string[];
};

// ─── Data ─────────────────────────────────────────────────────────────────────

const ENGINEERING_STAGES: Stage[] = [
  {
    number: "01",
    title: "Code",
    proof: "feat: auth refactor",
    explanation: "Every change is traced to a human intent, not a mystery patch.",
    meta: ["commit a3f9b", "1,847 lines changed"],
  },
  {
    number: "02",
    title: "Version Control",
    proof: "42 commits across 11 days",
    explanation: "Time-stamped history proves the pace and collaboration behind the build.",
    meta: ["branch created", "3 authors"],
  },
  {
    number: "03",
    title: "Pull Request",
    proof: "PR #284 opened",
    explanation: "Review is mandatory, not optional. The request carries context, not just code.",
    meta: ["+1,847 −392 lines", "3 linked issues", "description: detailed"],
  },
  {
    number: "04",
    title: "Reviews",
    proof: "14 inline comments",
    explanation: "Feedback is captured where it happened, not reconstructed from memory later.",
    meta: ["2 reviewers", "12 resolved", "approved"],
  },
  {
    number: "05",
    title: "CI / CD",
    proof: "847 tests passed",
    explanation: "Deployment is a consequence of verified state, not hope.",
    meta: ["pipeline triggered", "coverage 91%", "lint clean", "build 2m 14s"],
  },
  {
    number: "06",
    title: "Deployment",
    proof: "Deployed to production",
    explanation: "What reaches users is auditable, rollback-ready, and timestamped to the second.",
    meta: [
      "merged 2024-03-14 09:12 UTC",
      "canary 5% traffic",
      "p99 latency −18ms",
      "rollback plan confirmed",
    ],
  },
];

const HIRING_STAGES: Stage[] = [
  {
    number: "01",
    title: "Résumé",
    proof: "Application received",
    explanation: "The first signal is captured before memory distorts what you actually saw.",
    meta: ["parsed skills", "matched to role requirements", "flagged experience gaps"],
  },
  {
    number: "02",
    title: "Phone Screen",
    proof: "30-minute technical screen",
    explanation: "No evaluation is reconstructed after the fact; every score is captured at the moment.",
    meta: ["communication score", "technical depth rating", "culture alignment note"],
  },
  {
    number: "03",
    title: "Whiteboard",
    proof: "System design exercise",
    explanation: "Thinking process is documented live — not summarized from a fading impression.",
    meta: ["problem breakdown score", "architecture quality", "time management"],
  },
  {
    number: "04",
    title: "Technical Review",
    proof: "Code review submission",
    explanation: "The artifact speaks for itself. Judgment is applied to evidence, not recall.",
    meta: ["PR quality", "test coverage", "documentation clarity"],
  },
  {
    number: "05",
    title: "Interview Panel",
    proof: "4 interviewers, structured rubric",
    explanation: "Every voice in the room leaves a record. Consensus is built on data, not dominance.",
    meta: ["individual scores", "consensus rating", "debrief notes recorded"],
  },
  {
    number: "06",
    title: "Decision",
    proof: "Offer extended",
    explanation: "The outcome is traceable end-to-end. Any future audit starts here, not from memory.",
    meta: [
      "total evaluation time: 12 days",
      "6 documented touchpoints",
      "decision audit trail complete",
    ],
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getItemStyle(delta: number): React.CSSProperties {
  const abs = Math.abs(delta);
  if (abs === 0) return { opacity: 1, transform: "scale(1)", filter: "none" };
  if (abs === 1) return { opacity: 0.35, transform: "scale(0.97)", filter: "none" };
  if (abs === 2) return { opacity: 0.12, transform: "scale(0.94)", filter: "blur(1px)" };
  return { opacity: 0.05, transform: "scale(0.92)", filter: "blur(2px)" };
}

// ─── Floating Quote Component ───────────────────────────────────────────────

function FloatingQuote({ text }: { text: string }) {
  const [displayText, setDisplayText] = useState(text);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(false);
    const timer = setTimeout(() => {
      setDisplayText(text);
      setIsVisible(true);
    }, 100);

    return () => clearTimeout(timer);
  }, [text]);

  return (
    <div className={`ts-quote-wrapper ${isVisible ? "ts-quote-visible" : ""}`}>
      <div className="ts-quote-line" />
      <p className="ts-quote-text">“{displayText}”</p>
    </div>
  );
}

// ─── Vertical Timeline Block ──────────────────────────────────────────────────


function VerticalTimeline({
  stages,
  label,
  headline,
  tagline,
  body,
  id,
}: {
  stages: Stage[];
  label: string;
  headline: string;
  tagline: string;
  body: string;
  id: string;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const railFillRef = useRef<HTMLDivElement>(null);
  const dotRefs = useRef<(HTMLDivElement | null)[]>([]);
  const railRef = useRef<HTMLDivElement>(null);

  const updateRailFill = useCallback((idx: number) => {
    if (!railFillRef.current || !railRef.current) return;
    const dot = dotRefs.current[idx];
    if (!dot) return;
    const railRect = railRef.current.getBoundingClientRect();
    const dotRect = dot.getBoundingClientRect();
    const fillH = dotRect.top - railRect.top + dotRect.height / 2;
    railFillRef.current.style.height = `${Math.max(0, fillH)}px`;
  }, []);

  useEffect(() => {
    const items = itemRefs.current.filter(Boolean) as HTMLDivElement[];
    if (!items.length) return;

    const visibilityMap = new Map<number, number>();
    const thresholds = Array.from({ length: 21 }, (_, i) => i / 20);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const idx = items.indexOf(entry.target as HTMLDivElement);
          if (idx !== -1) visibilityMap.set(idx, entry.intersectionRatio);
        });

        let bestIdx = 0;
        let bestRatio = -1;
        visibilityMap.forEach((ratio, idx) => {
          if (ratio > bestRatio) { bestRatio = ratio; bestIdx = idx; }
        });

        setActiveIndex(bestIdx);
        updateRailFill(bestIdx);

        dotRefs.current.forEach((dot, i) => {
          if (!dot) return;
          dot.classList.toggle("ts-dot--active", i === bestIdx);
        });
      },
      { threshold: thresholds, rootMargin: "-25% 0px -25% 0px" }
    );

    items.forEach((item) => observer.observe(item));
    updateRailFill(0);

    return () => observer.disconnect();
  }, [updateRailFill]);

  useEffect(() => {
    const recalc = () => updateRailFill(activeIndex);
    window.addEventListener("scroll", recalc, { passive: true });
    window.addEventListener("resize", recalc, { passive: true });
    return () => {
      window.removeEventListener("scroll", recalc);
      window.removeEventListener("resize", recalc);
    };
  }, [activeIndex, updateRailFill]);

  return (
    <div className="ts-block" id={id}>
      {/* Left sticky column */}
      <div className="ts-left">
        <div className="ts-label">{label}</div>
        <h2 className="ts-headline">{headline}</h2>
        <p className="ts-tagline">{tagline}</p>
        <p className="ts-body">{body}</p>
      </div>

      {/* Right timeline column */}
      <div className="ts-right">
        {/* Vertical rail */}
        <div className="ts-rail" ref={railRef}>
          <div className="ts-rail-fill" ref={railFillRef} />
        </div>

        {/* Items */}
        <div className="ts-items">
          {stages.map((stage, i) => {
            const delta = i - activeIndex;
            const style = getItemStyle(delta);
            const isActive = delta === 0;

            return (
              <div
                key={stage.number}
                ref={(el) => { itemRefs.current[i] = el; }}
                className={`ts-item${isActive ? " ts-item--active" : ""}`}
                style={style}
                aria-current={isActive ? "true" : undefined}
              >
                {/* Dot */}
                <div
                  className="ts-dot"
                  ref={(el) => { dotRefs.current[i] = el; }}
                />

                {/* Feature Column */}
                <div className="ts-feature-col">
                  {isActive ? (
                    <div className="ts-title ts-title--active">{stage.title}</div>
                  ) : (
                    <div className="ts-title ts-title--inactive">{stage.title}</div>
                  )}
                </div>

                {/* Proof Column */}
                <div className="ts-proof-col">
                  {isActive && (
                    <div className="ts-proof-wrapper">
                      <div className="ts-stage-num">{stage.number}</div>
                      <div className="ts-proof">{stage.proof}</div>
                      <p className="ts-belief ts-belief-mobile-only">{stage.explanation}</p>
                      <div className="ts-meta">
                        {stage.meta.map((m, mi) => (
                          <span key={mi} className="ts-meta-line">{m}</span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* 4th Stage Column: Quote Column */}
                <div className="ts-quote-col">
                  {isActive && <FloatingQuote text={stage.explanation} />}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ─── Main Export ──────────────────────────────────────────────────────────────

export function TheShift() {
  return (
    <section
      id="the-shift"
      className="ts-section"
      aria-label="The Shift — Engineering and Hiring"
    >
      <div className="ts-inner">
        <VerticalTimeline
          id="ts-engineering"
          stages={ENGINEERING_STAGES}
          label="Engineering Work"
          headline="Engineering became observable."
          tagline="Evidence-based engineering and hiring. Not dashboards rebuilt from logs — every decision is recorded as it happens, with proof you can audit."
          body="Every revision, review, decision and deployment now leaves a timestamped record."
        />

        <div className="ts-spacer" aria-hidden="true" />

        <VerticalTimeline
          id="ts-hiring"
          stages={HIRING_STAGES}
          label="Hiring"
          headline="Hiring finally had evidence."
          tagline="Every evaluation step recorded at the moment it happens — not pieced together from memory after the fact."
          body="Every evaluation step recorded — not reconstructed after the fact."
        />
      </div>
    </section>
  );
}
