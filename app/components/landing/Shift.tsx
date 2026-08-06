"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useScrollReveal } from "@/app/hooks/useScrollReveal";

// ─── Types ────────────────────────────────────────────────────────────────────

type Stage = {
  number: string;
  title: string;
  sentence: string;
};

type BridgeCard = {
  title: string;
  detail: string;
};

// ─── Data ─────────────────────────────────────────────────────────────────────

const ENGINEERING_STAGES: Stage[] = [
  {
    number: "01",
    title: "What have they used?",
    sentence:
      "- See the languages, systems, and technical complexity demonstrated in their work",
  },
  {
    number: "02",
    title: "What is relevant?",
    sentence:
      "- Find the experience that directly relates to the role your team is hiring for",
  },
  {
    number: "03",
    title: "What does the code show?",
    sentence:
      "- Review evidence of structure, testing, maintainability, security, and technical complexity",
  },
  {
    number: "04",
    title: "Working style",
    sentence:
      "- See how they communicate, review work, solve problems, and take ownership",
  },
 {
    number: "05",
    title: "Evidence gaps",
    sentence: 
      "- See which role requirements are supported by their work and which still need to be checked",
  },
  {
    number: "06",
    title: "What should you ask next?",
    sentence:
      "- Enter the interview knowing what is already supported and where to go deeper",
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

function getBridgeCardStyle(index: number, position: number): React.CSSProperties {
  const delta = index - position;
  const distance = Math.abs(delta);

  return {
    opacity: Math.max(0, 1 - distance * 0.58),
    transform: `translateY(calc(-50% + ${delta * 88}px)) scale(${Math.max(0.92, 1 - distance * 0.045)})`,
    filter: distance > 1 ? `blur(${Math.min(2.5, (distance - 1) * 1.4)}px)` : "none",
    zIndex: Math.max(1, 20 - Math.round(distance * 4)),
  };
}

function BridgeColumn({
  cards,
  position,
  eyebrow,
  title,
  note,
  variant,
}: {
  cards: BridgeCard[];
  position: number;
  eyebrow: string;
  title: string;
  note: string;
  variant: "hr" | "signals" | "technical";
}) {
  return (
    <div className={`ts-bridge__column ts-bridge__column--${variant}`}>
      <div className="ts-bridge__column-head">
        <span className="ts-bridge__column-eyebrow">{eyebrow}</span>
        <h3>{title}</h3>
      </div>

      <div className="ts-bridge__card-window">
        <div className="ts-bridge__card-stack">
          {cards.map((card, index) => (
            <div
              className="ts-bridge__card"
              key={card.title}
              style={getBridgeCardStyle(index, position)}
            >
              <span className="ts-bridge__card-index">{String(index + 1).padStart(2, "0")}</span>
              <span className="ts-bridge__card-copy">
                <strong>{card.title}</strong>
                <small>{card.detail}</small>
              </span>
              <span className="ts-bridge__card-mark" aria-hidden="true" />
            </div>
          ))}
        </div>
      </div>

      <p className="ts-bridge__column-note">{note}</p>
    </div>
  );
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
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const revealedStagesRef = useRef(new Set<number>());
  const animationStartedRef = useRef(new Set<number>());
  const { ref: leftRef, isRevealed: leftCopyRevealed } = useScrollReveal<HTMLDivElement>();
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
    window.addEventListener("resize", recalc, { passive: true });
    return () => {
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
                      <p className="ts-point-sentence">{stage.sentence}</p>
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

export function Shift() {
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
          label="WHAT 16SIGNALS ADDS"
          headline="What the CV leaves out"
          body="One brief shows what matches the role, where evidence is missing, and where the interview should go deeper."
        />
      </div>
    </section>
  );
}
