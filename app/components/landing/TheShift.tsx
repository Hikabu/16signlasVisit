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
    title: "Polished claims",
    sentence: "Resumes can be polished; work history is harder to fake.",
  },
  {
    number: "02",
    title: "Talk vs. doing",
    sentence: "Interviews show talking; work history shows doing.",
  },
  {
    number: "03",
    title: "Gameable tests",
    sentence: "Take-homes are gameable; real past work is harder to game.",
  },
  {
    number: "04",
    title: "Faster focus",
    sentence: "Evidence helps teams focus faster.",
  },
  {
    number: "05",
    title: "Verify early",
    sentence: "Bad hires are expensive; verify before deeper interviews.",
  },
  {
    number: "06",
    title: "Know what to ask",
    sentence: "16Signals shows what is proven, uncertain, and worth asking.",
  },
];

const HR_SIGNALS: BridgeCard[] = [
  { title: "Résumé claims", detail: "Self-reported" },
  { title: "Polished story", detail: "Well rehearsed" },
  { title: "Right keywords", detail: "Easy to optimize" },
  { title: "Surface signals", detail: "Useful, not enough" },
];

const TECHNICAL_SIGNALS: BridgeCard[] = [
  { title: "Technical depth", detail: "A staged snapshot" },
  { title: "Problem solving", detail: "Under interview conditions" },
  { title: "System judgment", detail: "Discussed, not observed" },
  { title: "Team time", detail: "Expensive and late" },
];

const WORK_SIGNALS: BridgeCard[] = [
  { title: "Proof", detail: "What actually shipped" },
  { title: "Ownership", detail: "What they drove" },
  { title: "Patterns", detail: "How they work over time" },
  { title: "Judgment", detail: "The trade-offs they made" },
  { title: "Delivery", detail: "How work reached done" },
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

// ─── Full-width missing-piece bridge ─────────────────────────────────────────

function MissingPieceDiagram() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const { ref: revealRef, isRevealed } = useScrollReveal<HTMLDivElement>({
    threshold: 0.2,
    rootMargin: "0px 0px -10% 0px",
  });

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      const wrapper = wrapperRef.current;
      if (!wrapper) return;

      const rect = wrapper.getBoundingClientRect();
      const distance = Math.max(1, rect.height - window.innerHeight);
      const next = Math.min(1, Math.max(0, -rect.top / distance));

      setProgress((current) => (Math.abs(current - next) > 0.001 ? next : current));
    };

    const requestUpdate = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate, { passive: true });

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
    };
  }, []);

  const hrPosition = progress * (HR_SIGNALS.length - 1);
  const technicalPosition = progress * (TECHNICAL_SIGNALS.length - 1);
  const workPosition = progress * (WORK_SIGNALS.length - 1);

  return (
    <div
      ref={wrapperRef}
      className={`ts-bridge${isRevealed ? " ts-bridge--revealed" : ""}`}
      aria-label="How 16Signals fills the evidence gap between HR screening and technical interviews"
    >
      <div ref={revealRef} className="ts-bridge__sticky">
        <div className="ts-bridge__intro">
          <span className="ts-bridge__kicker">THE EVIDENCE GAP</span>
          <h2>Interviews are first dates.<br />Work shows the relationship.</h2>
          <p>Impressions can be polished. Patterns cannot.</p>
        </div>

        <div className="ts-bridge__path" aria-hidden="true">
          <span className="ts-bridge__path-line" />
          <span className="ts-bridge__path-node ts-bridge__path-node--hr">
            <i />
            <b>HR SCREEN</b>
          </span>
          <span className="ts-bridge__path-node ts-bridge__path-node--unknown">
            <i />
            <b>UNKNOWN</b>
          </span>
          <span className="ts-bridge__path-node ts-bridge__path-node--technical">
            <i />
            <b>TECHNICAL INTERVIEW</b>
          </span>
          <span className="ts-bridge__drop-line" />
        </div>

        <div className="ts-bridge__columns">
          <BridgeColumn
            cards={HR_SIGNALS}
            position={hrPosition}
            eyebrow="FIRST IMPRESSION"
            title="Fast. Familiar. Shallow."
            note="Good for a shortlist. Not proof of the work."
            variant="hr"
          />

          <div className="ts-bridge__signals-shell">
            <div className="ts-bridge__signals-badge">
              <span className="ts-bridge__signal-dot" />
              16SIGNALS
            </div>
            <BridgeColumn
              cards={WORK_SIGNALS}
              position={workPosition}
              eyebrow="BEFORE THE INTERVIEW"
              title="Real work evidence."
              note="The missing context, while it can still change the decision."
              variant="signals"
            />
          </div>

          <BridgeColumn
            cards={TECHNICAL_SIGNALS}
            position={technicalPosition}
            eyebrow="LATE VALIDATION"
            title="Deeper. Costly. Staged."
            note="A stronger signal—after the team has already invested."
            variant="technical"
          />
        </div>

        <div className="ts-bridge__footer">
          <span>FROM IMPRESSION</span>
          <span className="ts-bridge__footer-line"><i style={{ width: `${progress * 100}%` }} /></span>
          <span>TO EVIDENCE</span>
        </div>
      </div>
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

export function TheShift() {
  return (
    <section
      id="the-shift"
      className="ts-section"
      aria-label="The Shift — Engineering and Hiring"
    >
      <MissingPieceDiagram />

      <div className="ts-inner">
        <VerticalTimeline
          id="ts-engineering"
          stages={ENGINEERING_STAGES}
          label="THE MISSING PIECE"
          headline="Between the HR screen and the technical interview."
          body="Interviews are expensive. Take-homes are gameable. Resumes are weak. 16Signals adds real work evidence before you spend more time."
        />
      </div>
    </section>
  );
}
