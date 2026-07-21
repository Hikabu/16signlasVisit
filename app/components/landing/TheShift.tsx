"use client";

import { useEffect, useRef, useState, useCallback } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

type Stage = {
  number: string;
  title: string;
  proof: string;
  meta: string[];
};

// ─── Data ─────────────────────────────────────────────────────────────────────

const ENGINEERING_STAGES: Stage[] = [
  {
    number: "01",
    title: "Code",
    proof: "feat: auth refactor",
    meta: ["commit a3f9b", "1,847 lines changed"],
  },
  {
    number: "02",
    title: "Version Control",
    proof: "42 commits across 11 days",
    meta: ["branch created", "3 authors"],
  },
  {
    number: "03",
    title: "Pull Request",
    proof: "PR #284 opened",
    meta: ["+1,847 −392 lines", "3 linked issues", "description: detailed"],
  },
  {
    number: "04",
    title: "Reviews",
    proof: "14 inline comments",
    meta: ["2 reviewers", "12 resolved", "approved"],
  },
  {
    number: "05",
    title: "CI / CD",
    proof: "847 tests passed",
    meta: ["pipeline triggered", "coverage 91%", "lint clean", "build 2m 14s"],
  },
  {
    number: "06",
    title: "Deployment",
    proof: "Deployed to production",
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
    meta: ["parsed skills", "matched to role requirements", "flagged experience gaps"],
  },
  {
    number: "02",
    title: "Phone Screen",
    proof: "30-minute technical screen",
    meta: ["communication score", "technical depth rating", "culture alignment note"],
  },
  {
    number: "03",
    title: "Whiteboard",
    proof: "System design exercise",
    meta: ["problem breakdown score", "architecture quality", "time management"],
  },
  {
    number: "04",
    title: "Technical Review",
    proof: "Code review submission",
    meta: ["PR quality", "test coverage", "documentation clarity"],
  },
  {
    number: "05",
    title: "Interview Panel",
    proof: "4 interviewers, structured rubric",
    meta: ["individual scores", "consensus rating", "debrief notes recorded"],
  },
  {
    number: "06",
    title: "Decision",
    proof: "Offer extended",
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
  if (abs === 0) return { opacity: 1, filter: "none" };
  if (abs === 1) return { opacity: 0.35, filter: "none" };
  if (abs === 2) return { opacity: 0.12, filter: "blur(1px)" };
  return { opacity: 0.05, filter: "blur(2px)" };
}

// ─── Vertical Timeline Block ──────────────────────────────────────────────────

function VerticalTimeline({
  stages,
  label,
  headline,
  body,
  id,
}: {
  stages: Stage[];
  label: string;
  headline: string;
  body: string;
  id: string;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [revealedStages, setRevealedStages] = useState<Set<number>>(() => new Set());
  const [animatingStages, setAnimatingStages] = useState<Set<number>>(() => new Set());
  const [completedAnimations, setCompletedAnimations] = useState<Set<number>>(() => new Set());
  const [leftCopyRevealed, setLeftCopyRevealed] = useState(false);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const revealedStagesRef = useRef(new Set<number>());
  const animationStartedRef = useRef(new Set<number>());
  const leftRef = useRef<HTMLDivElement>(null);
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
    const left = leftRef.current;
    if (!left || leftCopyRevealed) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setLeftCopyRevealed(true);
        observer.disconnect();
      },
      { threshold: 0.2, rootMargin: "0px 0px -12% 0px" },
    );

    observer.observe(left);
    return () => observer.disconnect();
  }, [leftCopyRevealed]);

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
    const items = itemRefs.current.filter(Boolean) as HTMLDivElement[];
    if (!items.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const newlyRevealed = entries.reduce<number[]>((indices, entry) => {
          if (!entry.isIntersecting) return indices;
          const idx = items.indexOf(entry.target as HTMLDivElement);
          if (idx !== -1 && !revealedStagesRef.current.has(idx)) indices.push(idx);
          return indices;
        }, []);

        if (!newlyRevealed.length) return;
        setRevealedStages((current) => {
          const next = new Set(current);
          newlyRevealed.forEach((idx) => {
            next.add(idx);
            revealedStagesRef.current.add(idx);
          });
          return next;
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" },
    );

    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!revealedStages.has(activeIndex) || animationStartedRef.current.has(activeIndex)) return;
    animationStartedRef.current.add(activeIndex);

    setAnimatingStages((current) => {
      const next = new Set(current);
      next.add(activeIndex);
      return next;
    });

    const timeout = window.setTimeout(() => {
      setAnimatingStages((current) => {
        const next = new Set(current);
        next.delete(activeIndex);
        return next;
      });
      setCompletedAnimations((current) => {
        const next = new Set(current);
        next.add(activeIndex);
        return next;
      });
    }, 1100);

    return () => window.clearTimeout(timeout);
  }, [activeIndex, revealedStages]);

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
      <div className={`ts-left${leftCopyRevealed ? " ts-left--revealed" : ""}`} ref={leftRef}>
        <div className="ts-copy-line">
          <div className="ts-copy-line__inner ts-label">{label}</div>
        </div>
        <div className="ts-copy-line">
          <h2 className="ts-copy-line__inner ts-headline">{headline}</h2>
        </div>
        <div className="ts-copy-line">
          <p className="ts-copy-line__inner ts-body">{body}</p>
        </div>
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
            const shouldAnimateContent = isActive && animatingStages.has(i);
            const hasCompletedReveal = isActive && completedAnimations.has(i);
            const isRevealed = revealedStages.has(i);

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
                  className={`ts-dot${isActive ? " ts-dot--active" : ""}${isRevealed ? " ts-dot--revealed" : ""}`}
                  ref={(el) => { dotRefs.current[i] = el; }}
                />

                {/* Content */}
                <div className="ts-content">
                  <div className={`ts-title ${isActive ? "ts-title--active" : "ts-title--inactive"}`}>
                    {stage.title}
                  </div>
                  {isActive && (
                    <div className={`ts-stage-content${shouldAnimateContent ? " ts-stage-content--reveal" : ""}${hasCompletedReveal ? " ts-stage-content--revealed" : ""}`}>
                      <div className="ts-stage-num">{stage.number}</div>
                      <div className="ts-proof">{stage.proof}</div>
                      <div className="ts-meta">
                        {stage.meta.map((m, mi) => (
                          <span key={mi} className="ts-meta-line">{m}</span>
                        ))}
                      </div>
                    </div>
                  )}
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
          body="Every revision, review, decision and deployment now leaves a timestamped record."
        />

        <div className="ts-spacer" aria-hidden="true" />

        <VerticalTimeline
          id="ts-hiring"
          stages={HIRING_STAGES}
          label="Hiring"
          headline="Hiring finally had evidence."
          body="Every evaluation step recorded — not reconstructed after the fact."
        />
      </div>
    </section>
  );
}
