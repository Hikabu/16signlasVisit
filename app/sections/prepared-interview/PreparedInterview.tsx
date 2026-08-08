"use client";

import { useEffect, useRef, useState } from "react";
import { useScrollReveal } from "@/app/hooks/useScrollReveal";
import { CandidateReport } from "./CandidateReport";
import { ReportDetails } from "./ReportDetails";
import { ReportIcon } from "./ReportIcon";
import { ReportSidebar } from "./ReportSidebar";
import { styles } from "./styles";

export function PreparedInterview() {
  const { ref: introRef, isRevealed: introRevealed } =
    useScrollReveal<HTMLElement>();
  const reportRef = useRef<HTMLDivElement>(null);
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    const report = reportRef.current;
    if (!report) return;

    const revealWhenInView = () => {
      const bounds = report.getBoundingClientRect();
      if (bounds.top < window.innerHeight * 0.96 && bounds.bottom > 0) {
        setIsRevealed(true);
        return true;
      }
      return false;
    };

    if (revealWhenInView()) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setIsRevealed(true);
        observer.disconnect();
      },
      { threshold: 0.04, rootMargin: "0px 0px -4% 0px" },
    );

    observer.observe(report);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="prepared-interview"
      className={styles.section}
      aria-labelledby="prepared-interview-title"
    >
      <div className={styles.sectionGlow} aria-hidden="true" />

      <div className={styles.inner}>
        <header
          ref={introRef}
          className={`${styles.intro} ${introRevealed ? styles.introRevealed : ""}`}
        >
          <div className={styles.introCopy}>
            <div className={`${styles.introRevealLine} ${styles.introHeadline}`}>
              <h2 id="prepared-interview-title">
                {"We already went through their work. So you don't have to"}
              </h2>
            </div>
            <div className={`${styles.introRevealLine} ${styles.introBody}`}>
              <p>
                {"16Signals turns years of engineering activity into one organized hiring brief-showing so you walk in already knowing what's proven, what's unclear, and what's worth asking."}
              </p>
            </div>
          </div>
        </header>

        <div
          ref={reportRef}
          className={styles.report}
          data-prepared-report-revealed={isRevealed ? "true" : "false"}
          onClick={(event) => event.stopPropagation()}
        >
          <div className={styles.windowBar} aria-hidden="true">
            <div className={styles.trafficLights}>
              <span className={styles.trafficLightRed} />
              <span className={styles.trafficLightYellow} />
              <span className={styles.trafficLightGreen} />
            </div>
            <span className={styles.windowTitle}>Candidate evidence report</span>
            <span className={styles.windowBarSpacer} />
          </div>

          <div className={styles.reportChrome}>
            <div className={styles.chromeIdentity}>
              <ReportIcon src="/a16zero.png" className={styles.brandAsset} />
              <span className={styles.productName}>16Signals</span>
              <span className={styles.chromeDivider} />
              <nav className={styles.chromeLocation} aria-label="Breadcrumb">
                <ol>
                  <li>Jobs</li>
                  <li>Backend Developer</li>
                  <li>Applications</li>
                  <li aria-current="page">Alex Morgan</li>
                </ol>
              </nav>
            </div>
            <div className={styles.chromeStatus}>
              <span className={styles.issueCount}>Candidate 02 / 18</span>
              <span className={styles.chromeIcon}>⌃</span>
              <span className={styles.chromeIcon}>⌄</span>
              <button type="button" aria-label="More report options">
                <span />
                <span />
                <span />
              </button>
            </div>
          </div>

          <div className={styles.reportWorkspace}>
            <ReportSidebar />
            <CandidateReport />
            <ReportDetails />
          </div>
        </div>
      </div>
    </section>
  );
}
