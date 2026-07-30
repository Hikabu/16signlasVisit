"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type CSSProperties } from "react";
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
  step: string;
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
  step: "01",
  eyebrow: "First context",
  title: "Screening / HR",
  summary: "Useful context, with limited proof.",
  status: "Partial signal",
  lines: [
    {
      text: "Relevant background",
      icon: "/icons/16position/hr_interview_bike.svg",
      tone: "blue",
    },
    {
      text: "Motivation and communication",
      icon: "/icons/16position/hr_interview_chair.svg",
      tone: "green",
    },
    {
      text: "Claims can be rehearsed",
      icon: "/icons/16position/hr_interview_task.svg",
      tone: "amber",
    },
  ],
};

const TECHNICAL: StoryCard = {
  kind: "technical",
  step: "03",
  eyebrow: "Deeper review",
  title: "Technical interview",
  summary: "More depth, after more team time.",
  status: "Late-stage signal",
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
      text: "Expensive, late, partly gameable",
      icon: "/icons/16position/tech_interview_table.svg",
      tone: "amber",
    },
  ],
};

const SIGNALS: StoryCard = {
  kind: "signals",
  step: "02",
  eyebrow: "Before the technical interview",
  title: "16Signals",
  summary: "Real-work evidence, added at the right moment.",
  status: "Evidence layer",
  lines: [
    {
      text: "Verifies ability from real work",
      icon: "/icons/16position/16_signlas_portfolio.svg",
      tone: "green",
    },
    {
      text: "Adds evidence before interview",
      icon: "/icons/16position/16_signals_book.svg",
      tone: "amber",
    },
    {
      text: "Helps prioritize interview attention",
      icon: "/icons/16position/16_signlas_hole.svg",
      tone: "blue",
    },
    {
      text: "Builds confidence for human review",
      icon: "/icons/16position/16_signlas_portfolio.svg",
      tone: "violet",
    },
    {
      text: "Makes technical interviews informed",
      icon: "/icons/16position/tech_interview_atom.svg",
      tone: "green",
    },
    {
      text: "Reduces guesswork between stages",
      icon: "/icons/16position/tech_interview_link.svg",
      tone: "amber",
    },
  ],
};

const INITIAL_STATE: StoryState = {
  stage: 0,
  screeningCount: 1,
  technicalCount: 0,
  signalsCount: 0,
};

function visibleLineCount(total: number, localProgress: number) {
  return Math.min(total, Math.max(1, Math.floor(localProgress * total) + 1));
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
}: {
  card: StoryCard;
  active: boolean;
  visible: boolean;
  visibleCount: number;
}) {
  return (
    <article
      className={`${styles.card} ${styles[`card${card.kind[0].toUpperCase()}${card.kind.slice(1)}`]} ${
        active ? styles.cardActive : styles.cardQuiet
      } ${visible ? styles.cardVisible : ""}`}
      aria-current={active ? "step" : undefined}
    >
      <div className={styles.cardTopline}>
        <span className={styles.step}>{card.step}</span>
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
            width={25}
            height={25}
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
          Supports human review · No automatic rejection
        </p>
      )}
    </article>
  );
}

export function TheShift() {
  const storyRef = useRef<HTMLDivElement>(null);
  const [story, setStory] = useState<StoryState>(INITIAL_STATE);

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
    window.addEventListener("resize", requestUpdate);

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
    };
  }, []);

  const screeningActive = story.stage === 0;
  const technicalActive = story.stage === 1;
  const signalsActive = story.stage === 2;

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
          style={{ "--story-stage": story.stage } as CSSProperties}
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
              The missing piece before the technical interview.
            </h2>
            <p>
              Screening adds context. Technical interviews add depth.
              <span> 16Signals adds real-work evidence between them.</span>
            </p>
          </header>

          <div className={styles.timeline}>
            <div className={styles.rail} aria-hidden="true">
              <span className={styles.railBase} />
              <span className={styles.railProgress} />
              <i className={styles.railNodeOne} />
              <i className={styles.railNodeTwo} />
              <i className={styles.railNodeThree} />
            </div>

            <TimelineCard
              card={SCREENING}
              active={screeningActive}
              visible
              visibleCount={story.screeningCount}
            />
            <TimelineCard
              card={SIGNALS}
              active={signalsActive}
              visible={story.stage === 2}
              visibleCount={story.signalsCount}
            />
            <TimelineCard
              card={TECHNICAL}
              active={technicalActive}
              visible={story.stage >= 1}
              visibleCount={story.technicalCount}
            />
          </div>

          <div className={styles.scrollCue} aria-hidden="true">
            <span />
            Scroll to place the evidence
          </div>
        </div>
      </div>
    </section>
  );
}
