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
    title: "Code",
    hiringQuestion: "What kind of change is being made, and how is it bounded?",
    reveals: "The change record makes the implementation focus and the selected surface area visible. It preserves the relationship between the stated change and the amount of code touched.",
    proof: "feat: auth refactor",
    meta: ["commit a3f9b", "1,847 lines changed"],
  },
  {
    number: "02",
    title: "Version History",
    hiringQuestion: "How does the work develop across time and contributors?",
    reveals: "The sequence of commits shows how an implementation took shape rather than only its final state. It provides context about timing, participation, and the files that changed along the way.",
    proof: "42 commits across 11 days",
    meta: ["3 contributors", "changes across 8 files"],
  },
  {
    number: "03",
    title: "Pull Requests",
    hiringQuestion: "How is a proposed change explained before it is merged?",
    reveals: "The pull request records the problem being addressed, the reasoning offered, and the scope presented for review. Linked issues and the change set keep that explanation connected to the work itself.",
    proof: "PR #284 opened",
    meta: ["+1,847 −392 lines", "3 linked issues", "detailed rationale"],
  },
  {
    number: "04",
    title: "Code Reviews",
    hiringQuestion: "How does the work change in response to review?",
    reveals: "The review thread makes questions, responses, and subsequent resolutions observable. It documents how multiple people examined the same implementation before approval.",
    proof: "14 inline comments",
    meta: ["2 reviewers", "12 resolved", "approved"],
  },
  {
    number: "05",
    title: "Delivery",
    hiringQuestion: "What checks stand between a code change and release?",
    reveals: "The delivery record shows which automated checks ran and what they covered at the point of release. It preserves the relationship between the change, the test result, and the build process.",
    proof: "847 tests passed",
    meta: ["coverage 91%", "lint clean", "build 2m 14s"],
  },
  {
    number: "06",
    title: "Production",
    hiringQuestion: "What happens after the change reaches a live system?",
    reveals: "The deployment record shows how the change was introduced and what operational signals followed. It also documents the recovery path that was prepared alongside the release.",
    proof: "Deployed successfully",
    meta: ["canary release", "p99 latency −18ms", "rollback plan documented"],
  },
];

const SIGNAL_STAGES: Stage[] = [
  {
    number: "01",
    title: "Evidence Collected",
    hiringQuestion: "What source material is available for examination?",
    reveals: "The connected work history identifies which engineering records are in scope. It makes the source set visible before any interpretation is made.",
    proof: "Work history connected",
    meta: ["commits", "pull requests", "reviews", "delivery activity"],
  },
  {
    number: "02",
    title: "Context Reconstructed",
    hiringQuestion: "What surrounding context is visible around each change?",
    reveals: "The record is read across projects, time, and collaborators rather than as isolated events. This preserves the conditions around a contribution, including its complexity and scope.",
    proof: "Changes examined over time",
    meta: ["project complexity", "contribution scope", "collaborator context"],
  },
  {
    number: "03",
    title: "Capability Signals",
    hiringQuestion: "Which recurring engineering behaviors can be observed in the record?",
    reveals: "Repeated patterns across artifacts make particular forms of work visible over time. The record can show how ownership, technical depth, consistency, and collaboration appear in context.",
    proof: "Observable patterns identified",
    meta: ["ownership", "technical depth", "consistency", "collaboration"],
  },
  {
    number: "04",
    title: "Claims Verified",
    hiringQuestion: "Can each report statement be traced to source artifacts?",
    reveals: "Each conclusion is checked against the activity and records that support it. The links preserve a path from an interpreted signal back to the underlying work.",
    proof: "Every conclusion checked",
    meta: ["linked evidence", "timestamped activity", "source traceability"],
  },
  {
    number: "05",
    title: "Risks Identified",
    hiringQuestion: "Where does the record leave questions unanswered?",
    reveals: "Gaps in the available work are recorded as limits of what can be observed. The report distinguishes an absent record from a conclusion about the person who created it.",
    proof: "Evidence gaps made visible",
    meta: ["limited ownership", "unclear impact", "insufficient evidence"],
  },
  {
    number: "06",
    title: "Capability Report",
    hiringQuestion: "What can a hiring team take into an interview from the record?",
    reveals: "The report organizes observed patterns, open questions, and the evidence connected to each one. It gives the interview a documented starting point without replacing the conversation.",
    proof: "Decision-ready evidence",
    meta: [
      "verified strengths",
      "role-relevant risks",
      "evidence-linked interview questions",
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
