"use client";

import { useEffect, useState } from "react";
import { useScrollReveal } from "@/app/hooks/useScrollReveal";
import styles from "./Positioning.module.css";

type StoryStage = 0 | 1 | 2;
type CardKind = "screening" | "signals" | "technical";

type SignalLine = {
  text: string;
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
  summary: "Evaluates how well someone describes their experience.",
  status: "Useful · partial",
  lines: [
    {
      text: "Relevant context",
    },
    {
      text: "Communication and motivation",
    },
    {
      text: "Role and team fit",
    },
  ],
};

const TECHNICAL: StoryCard = {
  kind: "technical",
  eyebrow: "Deeper review",
  title: "Technical interview",
  summary: "Evaluates how well someone performs during a prepared conversation or exercise.",
  status: "Deep · costly",
  lines: [
    {
      text: "Technical depth",
    },
    {
      text: "Problem-solving discussion",
    },
    {
      text: "Late and expensive",
    },
    {
      text: "Still partly gameable",
    },
  ],
};

const SIGNALS: StoryCard = {
  kind: "signals",
  eyebrow: "The missing middle layer",
  title: "16Signals",
  summary:
    "16signals examines that work before the interview.",
  status: "Evidence layer",
  lines: [
    {
      text: "Validates screening claims",
    },
    {
      text: "Prioritizes interview attention",
    },
    {
      text: "Prepares a more informed interview",
    },
  ],
};

const CARDS: Record<CardKind, StoryCard> = {
  screening: SCREENING,
  signals: SIGNALS,
  technical: TECHNICAL,
};

const INITIAL_STATE: StoryState = {
  stage: 2,
  screeningCount: SCREENING.lines.length,
  technicalCount: TECHNICAL.lines.length,
  signalsCount: SIGNALS.lines.length,
};

const AUTO_ORDERS: CardKind[][] = [
  ["screening", "signals", "technical"],
  ["signals", "screening", "technical"],
  ["screening", "technical", "signals"],
];

function getSequenceSummary(order: CardKind[]) {
  const signalsPosition = order.indexOf("signals");
  const technicalPosition = order.indexOf("technical");

  if (signalsPosition === 1 && technicalPosition === 2) {
    return {
      text: "Between screening and the technical interview, 16Signals turns real-work evidence into a sharper, more relevant conversation.",
    };
  }

  if (signalsPosition < technicalPosition) {
    return {
      text:
        signalsPosition === 0
          ? "Placed first, 16Signals can guide the rest of the process, but the team has less screening context to anchor the evidence."
          : "Before deeper interview time is used, 16Signals helps the team focus the conversation on what still needs to be investigated.",
    };
  }

  if (signalsPosition === 2) {
    return {
      text: "After the interviews, 16Signals still adds evidence, but earlier hiring effort has already been spent without it.",
    };
  }

  return {
    text: "After the technical interview, 16Signals still supports human review, though deeper team attention has already been used.",
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
            <span className={styles.notificationIndex}>0{index + 1}</span>
            <span>{line.text}</span>
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
}: {
  card: StoryCard;
  active: boolean;
  visible: boolean;
  visibleCount: number;
  position: number;
}) {
  const kindClass = `card${card.kind[0].toUpperCase()}${card.kind.slice(1)}`;

  return (
    <article
      className={`${styles.card} ${styles[kindClass]} ${
        active ? styles.cardActive : styles.cardQuiet
      } ${visible ? styles.cardVisible : ""}`}
      data-sequence-card={card.kind}
      aria-current={active ? "step" : undefined}
      aria-label={`${position + 1}. ${card.title}`}
    >
      <div className={styles.cardTopline}>
        <span className={styles.step}>POSITION 0{position + 1}</span>
        <span className={styles.status}>
          <i aria-hidden="true" />
          {card.status}
        </span>
      </div>

      <div className={styles.cardHeading}>
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
    </article>
  );
}

export function Positioning() {
  const [sequenceIndex, setSequenceIndex] = useState(0);
  const { ref: introRef, isRevealed: introRevealed } =
    useScrollReveal<HTMLElement>({
      threshold: 0.18,
      rootMargin: "0px 0px -14% 0px",
    });

  useEffect(() => {
    const interval = window.setInterval(() => {
      setSequenceIndex((current) => (current + 1) % AUTO_ORDERS.length);
    }, 20000); //every 30sec change 

    return () => window.clearInterval(interval);
  }, []);

  const story = INITIAL_STATE;
  const order = AUTO_ORDERS[sequenceIndex];
  const visibleCounts: Record<CardKind, number> = {
    screening: story.screeningCount,
    signals: story.signalsCount,
    technical: story.technicalCount,
  };
  const focusedKind: CardKind = "signals";
  const summary = getSequenceSummary(order);

  return (
    <section
      id="the-shift"
      className={styles.section}
      aria-labelledby="hiring-timeline-title"
    >
      <div className={styles.story}>
        <div
          className={styles.sticky}
          data-story-stage="2"
          data-sequence-index={sequenceIndex + 1}
        >
          <header
            ref={introRef}
            className={`${styles.intro} ${
              introRevealed ? styles.introRevealed : ""
            }`}
          >
            <div className={styles.introRevealLine}>
              <h2 id="hiring-timeline-title">
                How to use 16 signlas?
              </h2>
            </div>
          </header>

          <div className={styles.timeline}>
            <div className={styles.trackShell}>
              <div
                key={sequenceIndex}
                className={styles.dynamicSummary}
                aria-live="polite"
              >
                <span className={styles.counter}>0{sequenceIndex + 1} / 03</span>
                <p>{summary.text}</p>
              </div>

              <div
                className={styles.track}
                aria-label="Automatic hiring sequence comparison"
              >
                {order.map((kind, index) => {
                  const card = CARDS[kind];
                  const isVisible =
                    kind === "screening" ||
                    (kind === "technical" && story.stage >= 1) ||
                    (kind === "signals" && story.stage === 2);

                  return (
                    <div className={styles.slot} key={`${kind}-${sequenceIndex}`}>
                      <TimelineCard
                        card={card}
                        active={focusedKind === kind}
                        visible={isVisible}
                        visibleCount={visibleCounts[kind]}
                        position={index}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
