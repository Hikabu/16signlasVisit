"use client";

import Image from "next/image";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type DragEvent,
} from "react";
import styles from "./TheShift.module.css";

type StoryStage = 0 | 1 | 2;
type CardKind = "screening" | "signals" | "technical";

type SignalLine = {
  text: string;
  icon: string;
  tone: "amber" | "blue" | "green" | "violet";
};

type StoryCard = {
  kind: CardKind;
  eyebrow: string;
  title: string;
  summary: string;
  status: string;
  lines: SignalLine[];
};

type StoryState = {
  stage: StoryStage;
  screeningCount: number;
  technicalCount: number;
  signalsCount: number;
};

const SCREENING: StoryCard = {
  kind: "screening",
  eyebrow: "First context",
  title: "Screening / HR",
  summary: "Useful context. Still only part of the picture.",
  status: "Useful · partial",
  lines: [
    {
      text: "Relevant context",
      icon: "/icons/16position/hr_interview_bike.svg",
      tone: "blue",
    },
    {
      text: "Communication and motivation",
      icon: "/icons/16position/hr_interview_chair.svg",
      tone: "green",
    },
    {
      text: "Role and team fit",
      icon: "/icons/16position/hr_interview_task.svg",
      tone: "violet",
    },
  ],
};

const TECHNICAL: StoryCard = {
  kind: "technical",
  eyebrow: "Deeper review",
  title: "Technical interview",
  summary: "Adds depth and discussion—later in the process.",
  status: "Deep · costly",
  lines: [
    {
      text: "Technical depth",
      icon: "/icons/16position/tech_interview_atom.svg",
      tone: "green",
    },
    {
      text: "Problem-solving discussion",
      icon: "/icons/16position/tech_interview_link.svg",
      tone: "blue",
    },
    {
      text: "Late and expensive",
      icon: "/icons/16position/tech_interview_table.svg",
      tone: "amber",
    },
    {
      text: "Still partly gameable",
      icon: "/icons/16position/tech_interview_link.svg",
      tone: "amber",
    },
  ],
};

const SIGNALS: StoryCard = {
  kind: "signals",
  eyebrow: "The missing middle layer",
  title: "16Signals",
  summary:
    "16Signals adds real-work evidence after screening and before the technical interview.",
  status: "Evidence layer",
  lines: [
    {
      text: "Validates screening claims",
      icon: "/icons/16position/16_signlas_portfolio.svg",
      tone: "green",
    },
    {
      text: "Prioritizes interview attention",
      icon: "/icons/16position/16_signals_book.svg",
      tone: "blue",
    },
    {
      text: "Prepares a more informed interview",
      icon: "/icons/16position/16_signlas_hole.svg",
      tone: "violet",
    },
  ],
};

const CARDS: Record<CardKind, StoryCard> = {
  screening: SCREENING,
  signals: SIGNALS,
  technical: TECHNICAL,
};

const INITIAL_ORDER: CardKind[] = ["screening", "signals", "technical"];

const INITIAL_STATE: StoryState = {
  stage: 0,
  screeningCount: 1,
  technicalCount: 0,
  signalsCount: 0,
};

function visibleLineCount(total: number, localProgress: number) {
  return Math.min(total, Math.max(1, Math.floor(localProgress * total) + 1));
}

function getSequenceSummary(order: CardKind[]) {
  const signalsPosition = order.indexOf("signals");
  const technicalPosition = order.indexOf("technical");

  if (signalsPosition === 1 && technicalPosition === 2) {
    return {
      label: "Strongest placement",
      text: "Screen first, add real-work evidence next, then use deeper interview time where it matters most.",
    };
  }

  if (signalsPosition < technicalPosition) {
    return {
      label: "Evidence before depth",
      text:
        signalsPosition === 0
          ? "Real-work evidence guides human review before technical interview time is used, with less screening context available upfront."
          : "Real-work evidence arrives before deeper interview time is used, helping the team prioritize what to investigate.",
    };
  }

  if (signalsPosition === 2) {
    return {
      label: "Useful, but later",
      text: "The team still gains real-work evidence for human review, but money and interview time were already spent on earlier stages.",
    };
  }

  return {
    label: "Evidence after depth",
    text: "16Signals still supports human review, though the technical interview has already consumed deeper team attention.",
  };
}

function NotificationList({
  card,
  visibleCount,
  active,
}: {
  card: StoryCard;
  visibleCount: number;
  active: boolean;
}) {
  return (
    <ul className={styles.notifications} aria-label={`${card.title} signals`}>
      {card.lines.map((line, index) => {
        const isVisible = index < visibleCount;
        const isNewest = active && index === visibleCount - 1;

        return (
          <li
            key={line.text}
            className={`${styles.notification} ${
              isVisible ? styles.notificationVisible : ""
            } ${isNewest ? styles.notificationNewest : ""}`}
          >
            <span
              className={`${styles.notificationIcon} ${
                styles[`icon${line.tone[0].toUpperCase()}${line.tone.slice(1)}`]
              }`}
              aria-hidden="true"
            >
              <span
                style={
                  {
                    "--signal-icon": `url("${line.icon}")`,
                  } as CSSProperties
                }
              />
            </span>
            <span>{line.text}</span>
            <i aria-hidden="true" />
          </li>
        );
      })}
    </ul>
  );
}

function TimelineCard({
  card,
  active,
  visible,
  visibleCount,
  position,
  canReorder,
  isDragging,
  onFocus,
  onDragStart,
  onDragEnd,
  onDrop,
  onMove,
}: {
  card: StoryCard;
  active: boolean;
  visible: boolean;
  visibleCount: number;
  position: number;
  canReorder: boolean;
  isDragging: boolean;
  onFocus: () => void;
  onDragStart: (event: DragEvent<HTMLElement>) => void;
  onDragEnd: () => void;
  onDrop: (event: DragEvent<HTMLElement>) => void;
  onMove: (direction: -1 | 1) => void;
}) {
  const kindClass = `card${card.kind[0].toUpperCase()}${card.kind.slice(1)}`;

  return (
    <article
      className={`${styles.card} ${styles[kindClass]} ${
        active ? styles.cardActive : styles.cardQuiet
      } ${visible ? styles.cardVisible : ""} ${
        isDragging ? styles.cardDragging : ""
      }`}
      data-sequence-card={card.kind}
      aria-current={active ? "step" : undefined}
      aria-label={`${position + 1}. ${card.title}`}
      tabIndex={visible ? 0 : -1}
      draggable={canReorder}
      onClick={onFocus}
      onFocus={onFocus}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onDragOver={(event) => {
        if (canReorder) event.preventDefault();
      }}
      onDrop={onDrop}
    >
      <div className={styles.cardTopline}>
        <span className={styles.step}>POSITION 0{position + 1}</span>
        <span className={styles.status}>
          <i aria-hidden="true" />
          {card.status}
        </span>
      </div>

      <div className={styles.cardHeading}>
        {card.kind === "signals" && (
          <Image
            src="/icons/a16zero.svg"
            alt=""
            width={31}
            height={31}
            className={styles.brandMark}
          />
        )}
        <div>
          <span className={styles.cardEyebrow}>{card.eyebrow}</span>
          <h3>{card.title}</h3>
        </div>
      </div>

      <p className={styles.cardSummary}>{card.summary}</p>
      <NotificationList
        card={card}
        visibleCount={visibleCount}
        active={active}
      />

      {card.kind === "signals" && (
        <p className={styles.humanNote}>
          <span aria-hidden="true">✓</span>
          Supports human review · Helps prioritize attention
        </p>
      )}

      <div className={styles.cardControls} aria-label={`Move ${card.title}`}>
        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            onMove(-1);
          }}
          disabled={!canReorder || position === 0}
          aria-label={`Move ${card.title} earlier`}
        >
          ←
        </button>
        <span aria-hidden="true">Drag to reorder</span>
        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            onMove(1);
          }}
          disabled={!canReorder || position === 2}
          aria-label={`Move ${card.title} later`}
        >
          →
        </button>
      </div>
    </article>
  );
}

export function TheShift() {
  const storyRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [story, setStory] = useState<StoryState>(INITIAL_STATE);
  const [order, setOrder] = useState<CardKind[]>(INITIAL_ORDER);
  const [manualFocus, setManualFocus] = useState<CardKind | null>(null);
  const [draggingKind, setDraggingKind] = useState<CardKind | null>(null);

  useEffect(() => {
    let frame = 0;

    const updateStory = () => {
      frame = 0;
      const element = storyRef.current;
      if (!element) return;

      const rect = element.getBoundingClientRect();
      const scrollDistance = Math.max(1, rect.height - window.innerHeight);
      const progress = Math.min(1, Math.max(0, -rect.top / scrollDistance));

      let next: StoryState;

      if (progress < 0.32) {
        const local = progress / 0.32;
        next = {
          stage: 0,
          screeningCount: visibleLineCount(SCREENING.lines.length, local),
          technicalCount: 0,
          signalsCount: 0,
        };
      } else if (progress < 0.62) {
        const local = (progress - 0.32) / 0.3;
        next = {
          stage: 1,
          screeningCount: SCREENING.lines.length,
          technicalCount: visibleLineCount(TECHNICAL.lines.length, local),
          signalsCount: 0,
        };
      } else {
        const local = (progress - 0.62) / 0.38;
        next = {
          stage: 2,
          screeningCount: SCREENING.lines.length,
          technicalCount: TECHNICAL.lines.length,
          signalsCount: visibleLineCount(SIGNALS.lines.length, local),
        };
      }

      setStory((current) =>
        current.stage === next.stage &&
        current.screeningCount === next.screeningCount &&
        current.technicalCount === next.technicalCount &&
        current.signalsCount === next.signalsCount
          ? current
          : next,
      );
    };

    const requestUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(updateStory);
    };

    updateStory();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    document.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", requestUpdate);
      document.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
    };
  }, []);

  const scrollCardIntoView = useCallback((kind: CardKind, smooth = true) => {
    const track = trackRef.current;
    const card = track?.querySelector<HTMLElement>(
      `[data-sequence-card="${kind}"]`,
    );
    if (!track || !card) return;

    const trackRect = track.getBoundingClientRect();
    const cardRect = card.getBoundingClientRect();
    const target =
      track.scrollLeft +
      cardRect.left -
      trackRect.left -
      (track.clientWidth - cardRect.width) / 2;
    track.scrollTo({
      left: Math.max(0, target),
      behavior:
        smooth &&
        !window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "smooth"
          : "auto",
    });
  }, []);

  const focusCard = useCallback(
    (kind: CardKind, smooth = true) => {
      setManualFocus(kind);
      scrollCardIntoView(kind, smooth);
    },
    [scrollCardIntoView],
  );

  useEffect(() => {
    if (manualFocus) return;
    const activeKind =
      story.stage === 0
        ? "screening"
        : story.stage === 1
          ? "technical"
          : "signals";
    const frame = window.requestAnimationFrame(() =>
      scrollCardIntoView(activeKind),
    );
    return () => window.cancelAnimationFrame(frame);
  }, [manualFocus, scrollCardIntoView, story.stage]);

  const reorder = useCallback(
    (moving: CardKind, target: CardKind) => {
      if (moving === target || story.stage < 2) return;

      setOrder((current) => {
        const next = current.filter((kind) => kind !== moving);
        next.splice(current.indexOf(target), 0, moving);
        return next;
      });
      setManualFocus(moving);
      window.requestAnimationFrame(() => focusCard(moving));
    },
    [focusCard, story.stage],
  );

  const moveCard = useCallback(
    (kind: CardKind, direction: -1 | 1) => {
      if (story.stage < 2) return;
      const currentIndex = order.indexOf(kind);
      const targetIndex = currentIndex + direction;
      if (targetIndex < 0 || targetIndex >= order.length) return;

      const next = [...order];
      [next[currentIndex], next[targetIndex]] = [
        next[targetIndex],
        next[currentIndex],
      ];
      setOrder(next);
      setManualFocus(kind);
      window.requestAnimationFrame(() => focusCard(kind));
    },
    [focusCard, order, story.stage],
  );

  const visibleCounts: Record<CardKind, number> = {
    screening: story.screeningCount,
    signals: story.signalsCount,
    technical: story.technicalCount,
  };
  const focusedKind =
    manualFocus ??
    (story.stage === 0
      ? "screening"
      : story.stage === 1
        ? "technical"
        : "signals");
  const summary = getSequenceSummary(order);
  const focusedPosition = order.indexOf(focusedKind);

  return (
    <section
      id="the-shift"
      className={styles.section}
      aria-labelledby="hiring-timeline-title"
    >
      <div ref={storyRef} className={styles.story}>
        <div
          className={styles.sticky}
          data-story-stage={story.stage}
          style={
            {
              "--story-stage": story.stage,
              "--active-position": focusedPosition,
            } as CSSProperties
          }
        >
          <div className={styles.ambientGlow} aria-hidden="true" />

          <header className={styles.intro}>
            <div className={styles.eyebrowRow}>
              <span className={styles.eyebrow}>The hiring sequence</span>
              <span className={styles.counter} aria-live="polite">
                0{story.stage + 1} / 03
              </span>
            </div>
            <h2 id="hiring-timeline-title">
              Put evidence where it changes the interview.
            </h2>
            <div className={styles.dynamicSummary} aria-live="polite">
              <span>{story.stage < 2 ? "Building the sequence" : summary.label}</span>
              <p>
                {story.stage < 2
                  ? "Screening gives first context. Technical interviews add depth. The missing evidence layer arrives next."
                  : summary.text}
              </p>
            </div>
          </header>

          <div className={styles.timeline}>
            <div className={styles.trackShell}>
              <div
                ref={trackRef}
                className={styles.track}
                aria-label="Draggable hiring sequence"
              >
                <div className={styles.rail} aria-hidden="true">
                  <span className={styles.railBase} />
                  <span className={styles.railProgress} />
                </div>

                {order.map((kind, index) => {
                  const card = CARDS[kind];
                  const isVisible =
                    kind === "screening" ||
                    (kind === "technical" && story.stage >= 1) ||
                    (kind === "signals" && story.stage === 2);

                  return (
                    <div className={styles.slot} key={kind}>
                      <i className={styles.railNode} aria-hidden="true" />
                      <TimelineCard
                        card={card}
                        active={focusedKind === kind}
                        visible={isVisible}
                        visibleCount={visibleCounts[kind]}
                        position={index}
                        canReorder={story.stage === 2}
                        isDragging={draggingKind === kind}
                        onFocus={() => {
                          if (!isVisible) return;
                          focusCard(kind);
                        }}
                        onDragStart={(event) => {
                          if (story.stage < 2) {
                            event.preventDefault();
                            return;
                          }
                          setDraggingKind(kind);
                          event.dataTransfer.effectAllowed = "move";
                          event.dataTransfer.setData("text/plain", kind);
                        }}
                        onDragEnd={() => setDraggingKind(null)}
                        onDrop={(event) => {
                          event.preventDefault();
                          const moving =
                            (event.dataTransfer.getData(
                              "text/plain",
                            ) as CardKind) || draggingKind;
                          if (moving) reorder(moving, kind);
                          setDraggingKind(null);
                        }}
                        onMove={(direction) => moveCard(kind, direction)}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className={styles.scrollCue}>
            <span aria-hidden="true" />
            {story.stage < 2
              ? "Scroll to build the sequence"
              : "Drag cards to compare the order"}
          </div>
        </div>
      </div>
    </section>
  );
}
