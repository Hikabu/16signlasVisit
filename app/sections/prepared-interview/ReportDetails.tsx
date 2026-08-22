"use client";

import { useState } from "react";
import { ReportIcon } from "./ReportIcon";
import { styles } from "./styles";

export function ReportDetails() {
  const [isAssistantOpen, setIsAssistantOpen] = useState(true);

  return (
    <>
      <aside className={styles.detailPanel} aria-label="Candidate report details">
        <div className={styles.detailTopline}>
          <span>REPORT-018</span>
          <span>⋯</span>
        </div>
        <div className={styles.detailBody}>
          <div className={styles.detailItem}>
            <span className={styles.statusDot}>●</span>
            <span>Analysis complete</span>
          </div>
          <div className={styles.detailItem}>
            <span className={styles.priorityBars}>▂▅▇</span>
            <span>Senior Backend Engineer</span>
          </div>
          <div className={styles.detailItem}>
            <span className={styles.avatar}>A</span>
            <span>Alex Morgan</span>
          </div>
          <div className={`${styles.detailItem} ${styles.detailItemMuted}`}>
            <ReportIcon
              src="/a16zero.png"
              className={styles.analyzedBrandAsset}
            />
            <span>Analyzed by 16Signals</span>
          </div>
          <div className={styles.detailDivider} />
          <div className={styles.detailItem}>
            <span className={styles.muted}>Work examined</span>
            <span className={styles.detailValue}>18 months</span>
          </div>
          <div className={styles.detailItem}>
            <span className={styles.muted}>Evidence</span>
            <span className={styles.detailValue}>46 linked</span>
          </div>
          <div className={styles.detailItem}>
            <span className={styles.muted}>Verified strengths</span>
            <span className={styles.detailValue}>4</span>
          </div>
          <div className={styles.detailItem}>
            <span className={styles.muted}>Areas to verify</span>
            <span className={styles.detailValue}>2</span>
          </div>
        </div>
      </aside>

      {isAssistantOpen && <aside
        className={styles.floatingAssistant}
        aria-label="16Signals evidence analysis"
      >
        <div className={styles.assistantHeader}>
          <ReportIcon
            src="/icons/a16zero.svg"
            className={styles.assistantBrandAsset}
          />
          <span>16Signals</span>
          <small>Evidence analysis</small>
          <div className={styles.assistantActions}>
            <span aria-hidden="true">−　↗</span>
            <button
              type="button"
              className={styles.assistantClose}
              aria-label="Close evidence analysis"
              onClick={() => setIsAssistantOpen(false)}
            >
              ×
            </button>
          </div>
        </div>
        <div className={styles.assistantContent}>
          <div className={styles.evidenceFeed}>
            <article className={styles.evidenceCard}>
              <strong>46 source artifacts connected</strong>
              <small>4 repositories · 18 months · 6 collaborators</small>
            </article>
            <article className={styles.evidenceCard}>
              <strong>Reconstructing contribution context…</strong>
              <small>
                Ownership, complexity, reviews and production outcomes
              </small>
            </article>
            <article className={styles.evidenceCard}>
              <strong>Production ownership verified</strong>
              <small>
                Repeated across 3 major backend changes and 2 releases
              </small>
            </article>
            <article className={styles.evidenceCard}>
              <strong>One important evidence gap found</strong>
              <small>
                Sustained mentorship and delegation are not yet proven
              </small>
            </article>
            <div className={styles.changeCard}>
              <strong>Interview brief prepared</strong>
              <span>3 verified capabilities · 2 risks · 4 questions</span>
              <code>Every conclusion linked to source work</code>
            </div>
          </div>
        </div>
        <div className={styles.promptBox}>
          Search this candidate&apos;s evidence… <span>⌕　↑</span>
        </div>
      </aside>}
    </>
  );
}
