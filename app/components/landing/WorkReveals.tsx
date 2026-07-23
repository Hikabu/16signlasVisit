"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import styles from "./WorkReveals.module.css";

type ReportState = {
  number: string;
  title: string;
  primary: string;
  evidence: readonly string[];
  insight: string;
};

const REPORT_STATES: readonly ReportState[] = [
  {
    number: "01",
    title: "Judgment under change",
    primary: "See how they think when the first answer fails.",
    evidence: [
      "PR #284",
      "3 approaches considered",
      "Implementation revised after review",
    ],
    insight:
      "Reconsiders architecture without losing delivery momentum.",
  },
  {
    number: "02",
    title: "Collaboration under challenge",
    primary: "See what happens when their work is challenged.",
    evidence: [
      "14 review threads",
      "4 collaborators",
      "12 decisions resolved",
    ],
    insight:
      "Turns critical feedback into clearer, safer implementation.",
  },
  {
    number: "03",
    title: "Ownership through production",
    primary: "See whether responsibility ends at merge.",
    evidence: [
      "Canary release",
      "Rollback prepared",
      "p99 latency −18 ms",
    ],
    insight:
      "Owns changes through release and production verification.",
  },
] as const;

type TransitionPhase = "idle" | "out" | "in";

export function WorkReveals() {
  const sectionRef = useRef<HTMLElement>(null);
  const transitionLockedRef = useRef(false);
  const timeoutIdsRef = useRef<number[]>([]);
  const [hasEntered, setHasEntered] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [transitionPhase, setTransitionPhase] =
    useState<TransitionPhase>("idle");

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncMotionPreference = () =>
      setPrefersReducedMotion(mediaQuery.matches);

    syncMotionPreference();
    mediaQuery.addEventListener("change", syncMotionPreference);

    return () =>
      mediaQuery.removeEventListener("change", syncMotionPreference);
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
        if (entry.isIntersecting) setHasEntered(true);
      },
      {
        threshold: 0.25,
        rootMargin: "0px 0px -8% 0px",
      },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(
    () => () => {
      timeoutIdsRef.current.forEach((timeoutId) =>
        window.clearTimeout(timeoutId),
      );
    },
    [],
  );

  const changeReport = useCallback(
    (nextIndex: number) => {
      if (
        nextIndex === activeIndex ||
        nextIndex < 0 ||
        nextIndex >= REPORT_STATES.length ||
        transitionLockedRef.current
      ) {
        return;
      }

      if (prefersReducedMotion) {
        setActiveIndex(nextIndex);
        setTransitionPhase("idle");
        return;
      }

      transitionLockedRef.current = true;
      setTransitionPhase("out");

      const swapTimeout = window.setTimeout(() => {
        setActiveIndex(nextIndex);
        setTransitionPhase("in");

        const settleTimeout = window.setTimeout(() => {
          setTransitionPhase("idle");
          transitionLockedRef.current = false;
        }, 500);

        timeoutIdsRef.current.push(settleTimeout);
      }, 250);

      timeoutIdsRef.current.push(swapTimeout);
    },
    [activeIndex, prefersReducedMotion],
  );

  useEffect(() => {
    if (
      !hasEntered ||
      !isInView ||
      transitionPhase !== "idle" ||
      activeIndex >= REPORT_STATES.length - 1
    ) {
      return;
    }

    const advanceTimeout = window.setTimeout(
      () => changeReport(activeIndex + 1),
      5000,
    );

    return () => window.clearTimeout(advanceTimeout);
  }, [
    activeIndex,
    changeReport,
    hasEntered,
    isInView,
    transitionPhase,
  ]);

  const activeReport = REPORT_STATES[activeIndex];

  return (
    <section
      ref={sectionRef}
      id="work-reveals"
      className={`${styles.section} ${
        hasEntered ? styles.sectionEntered : ""
      }`}
      aria-labelledby="work-reveals-title"
    >
      <div className={styles.ambientGlow} aria-hidden="true" />

      <div className={styles.inner}>
        <div className={styles.copy}>
          <div className={styles.headlineReveal}>
            <p className={styles.eyebrow}>What work reveals</p>
            <h2 id="work-reveals-title" className={styles.title}>
              The record shows how they actually engineer.
            </h2>
          </div>

          <p className={styles.subheading}>
            Not activity counts. Recurring professional behavior reconstructed
            across time, context and collaborators.
          </p>
        </div>

        <div className={styles.viewerReveal}>
          <div className={styles.viewerShell}>
            <aside
              className={styles.progressRail}
              aria-label="Engineering behavior report sections"
            >
              <div className={styles.progressList} role="tablist">
                {REPORT_STATES.map((report, index) => {
                  const isActive = index === activeIndex;
                  const isComplete = index < activeIndex;
                  const isFinalActive =
                    isActive && index === REPORT_STATES.length - 1;

                  return (
                    <button
                      key={report.number}
                      type="button"
                      role="tab"
                      className={`${styles.progressStep} ${
                        isActive ? styles.progressStepActive : ""
                      }`}
                      aria-selected={isActive}
                      aria-controls="work-reveals-report"
                      aria-label={`${report.number} — ${report.title}`}
                      onClick={() => changeReport(index)}
                    >
                      <span className={styles.progressNumber}>
                        {report.number}
                      </span>
                      <span className={styles.progressTrack} aria-hidden="true">
                        <span
                          className={`${styles.progressFill} ${
                            isComplete || isFinalActive
                              ? styles.progressFillComplete
                              : ""
                          } ${
                            isActive && !isFinalActive
                              ? styles.progressFillActive
                              : ""
                          }`}
                        />
                      </span>
                    </button>
                  );
                })}
              </div>
            </aside>

            <article
              id="work-reveals-report"
              role="tabpanel"
              className={styles.reportPanel}
              aria-label={`${activeReport.number} — ${activeReport.title}`}
            >
              <header className={styles.reportHeader}>
                <div className={styles.reportIdentity}>
                  <span className={styles.signalMark} aria-hidden="true">
                    <i />
                    <i />
                    <i />
                  </span>
                  <span>Engineering behavior report</span>
                </div>

                <span className={styles.reportMeta}>
                  18 months · 46 linked artifacts
                </span>
              </header>

              <div
                key={activeReport.number}
                className={`${styles.reportContent} ${
                  transitionPhase === "out" ? styles.reportContentOut : ""
                } ${transitionPhase === "in" ? styles.reportContentIn : ""}`}
              >
                <div className={styles.reportIntro}>
                  <p className={styles.reportIndex}>
                    <span>{activeReport.number}</span>
                    {activeReport.title}
                  </p>
                  <h3 className={styles.reportPrimary}>
                    {activeReport.primary}
                  </h3>
                </div>

                <div className={styles.evidenceBlock}>
                  <p className={styles.reportLabel}>Observed evidence</p>
                  <div className={styles.evidenceList}>
                    {activeReport.evidence.map((item, index) => (
                      <p key={item} className={styles.evidenceItem}>
                        <span aria-hidden="true">0{index + 1}</span>
                        {item}
                      </p>
                    ))}
                  </div>
                </div>

                <div className={styles.insightBlock}>
                  <p className={styles.reportLabel}>What this reveals</p>
                  <p className={styles.insight}>{activeReport.insight}</p>
                </div>
              </div>

              <footer className={styles.reportFooter}>
                <span>
                  <i aria-hidden="true" />
                  Evidence linked
                </span>
                <span>Professional behavior reconstructed across time</span>
              </footer>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
