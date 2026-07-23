"use client";

import { useEffect, useRef, useState, useCallback } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

type Stage = {
  number: string;
  title: string;
  hiringQuestion: string;
  reveals: string;
  proof: string;
  meta: string[];
};

// ─── Data ─────────────────────────────────────────────────────────────────────

const ENGINEERING_STAGES: Stage[] = [
  {
    number: "01",
    title: "Source Code",
    hiringQuestion: "What kind of engineer appears when the résumé disappears?",
    reveals:
      "Finished code shows the result. The revisions behind it reveal judgment — how the engineer handles complexity, changes direction and improves an imperfect system.",
    proof: "feat: auth architecture rebuilt",
    meta: ["commit a3f9b", "1,847 lines changed"],
  },
  {
    number: "02",
    title: "Work Over Time",
    hiringQuestion: "Is this durable capability or one polished moment?",
    reveals:
      "Real ability leaves a pattern. Work repeated across projects, months and collaborators is far harder to stage than a portfolio, assessment or carefully prepared repository.",
    proof: "42 contributions across 11 days",
    meta: ["3 collaborators", "8 connected changes"],
  },
  {
    number: "03",
    title: "Technical Decisions",
    hiringQuestion: "Can this engineer turn ambiguity into decisions others can trust?",
    reveals:
      "Pull requests preserve the reasoning that code alone removes — the alternatives considered, trade-offs accepted and decisions made before the final implementation appeared.",
    proof: "PR #284: architecture decision",
    meta: ["3 alternatives considered", "linked constraints", "rationale preserved"],
  },
  {
    number: "04",
    title: "Team Influence",
    hiringQuestion: "Does this engineer only contribute code, or improve the team around it?",
    reveals:
      "Review history shows how the engineer challenges weak decisions, responds to criticism and helps difficult work become clearer, safer and stronger.",
    proof: "14 review decisions",
    meta: ["2 reviewers", "12 resolved", "approved"],
  },
  {
    number: "05",
    title: "Shipping Discipline",
    hiringQuestion: "Can they move difficult work into release without creating new risk?",
    reveals:
      "Delivery records expose the discipline behind shipping — whether quality is protected through testing, integration and repeatable release practices rather than confidence alone.",
    proof: "847 checks passed",
    meta: ["coverage 91%", "lint clean", "build 2m 14s"],
  },
  {
    number: "06",
    title: "Production Impact",
    hiringQuestion: "Does their engineering survive contact with real users?",
    reveals:
      "Production history separates code that looks complete from engineering that performs under real constraints, real traffic and real consequences.",
    proof: "Released to production",
    meta: ["canary verified", "p99 latency −18ms", "rollback prepared"],
  },
];

const SIGNAL_STAGES: Stage[] = [
  {
    number: "01",
    title: "Work Record Assembled",
    hiringQuestion: "What would your team have to investigate manually?",
    reveals:
      "16Signals brings fragmented commits, reviews, decisions and releases into one continuous work record — without forcing a senior engineer to open and interpret hundreds of disconnected artifacts.",
    proof: "Engineering history connected",
    meta: ["commits", "pull requests", "reviews", "releases"],
  },
  {
    number: "02",
    title: "Context Reconstructed",
    hiringQuestion: "What did each contribution actually require?",
    reveals:
      "An isolated commit proves almost nothing. 16Signals rebuilds the surrounding project, ownership, collaborators and constraints so the work is judged in the conditions where it happened.",
    proof: "Contribution context rebuilt",
    meta: ["system complexity", "ownership boundary", "team context"],
  },
  {
    number: "03",
    title: "Capability Mapped",
    hiringQuestion: "What becomes visible only across the full body of work?",
    reveals:
      "Recurring behavior reveals what a résumé cannot: how the engineer takes ownership, handles complexity, collaborates and delivers when the same abilities are tested repeatedly over time.",
    proof: "Longitudinal patterns detected",
    meta: ["ownership", "technical judgment", "consistency", "team influence"],
  },
  {
    number: "04",
    title: "Claims Proven",
    hiringQuestion: "Why should anyone trust the conclusion?",
    reveals:
      "Every important claim remains attached to the work that produced it. Hiring teams can move from conclusion to source evidence instead of trusting another opaque score or generated summary.",
    proof: "Every claim evidence-linked",
    meta: ["source artifacts", "timestamps", "traceable reasoning"],
  },
  {
    number: "05",
    title: "Risk Exposed",
    hiringQuestion: "What could become an expensive surprise after hiring?",
    reveals:
      "16Signals surfaces missing ownership, uncertain impact and unsupported assumptions before they disappear behind a confident interview. Where the work cannot prove something, the report says so.",
    proof: "Unknowns made explicit",
    meta: ["unproven ownership", "unclear impact", "insufficient evidence"],
  },
  {
    number: "06",
    title: "Decision Brief",
    hiringQuestion: "What changes when the interview begins with evidence?",
    reveals:
      "The team enters the interview already knowing what appears strong, what remains uncertain and exactly where to investigate. Less time proving the basics. More time testing the judgment that determines the hire.",
    proof: "Interview advantage created",
    meta: [
      "verified capabilities",
      "role-specific risks",
      "evidence-led questions",
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
                      <div className="ts-evidence-block">
                        <div className="ts-evidence-label">Hiring Question</div>
                        <p className="ts-question">{stage.hiringQuestion}</p>
                      </div>
                      <div className="ts-evidence-block">
                        <div className="ts-evidence-label">What This Reveals</div>
                        <p className="ts-reveals">{stage.reveals}</p>
                      </div>
                      <div className="ts-evidence-block">
                        <div className="ts-evidence-label">Observed Evidence</div>
                        <div className="ts-proof">{stage.proof}</div>
                        <div className="ts-meta">
                          {stage.meta.map((m, mi) => (
                            <span key={mi} className="ts-meta-line">{m}</span>
                          ))}
                        </div>
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
          id="ts-signals"
          stages={SIGNAL_STAGES}
          label="16Signals Analysis"
          headline="16Signals turns record into capability evidence."
          body="The platform examines real engineering activity and produces a report in which every conclusion links back to observable work."
        />
      </div>
    </section>
  );
}
