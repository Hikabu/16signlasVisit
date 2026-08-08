"use client";

import { useEffect, useState, type CSSProperties } from "react";
import { EVIDENCE_OUTPUTS } from "@/app/data/landing";
import type { EvidenceId } from "@/app/types/landing";
import { EvidenceControl } from "./EvidenceControl";
import { ReportIcon } from "./ReportIcon";
import { styles } from "./styles";

export function CandidateReport() {
  const [openEvidence, setOpenEvidence] = useState<EvidenceId | null>(null);

  useEffect(() => {
    const closeEvidence = () => setOpenEvidence(null);
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeEvidence();
    };

    window.addEventListener("click", closeEvidence);
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      window.removeEventListener("click", closeEvidence);
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, []);

  return (
    <div className={styles.reportMain}>
      <div className={styles.reportHeader}>
        <div>
          <p className={styles.kicker}>
            Senior Backend Engineer · Candidate brief
          </p>
          <h3>
            Alex Morgan
            <ReportIcon
              src="/icons/bird.svg"
              className={styles.birdAsset}
              size={20}
            />
          </h3>
          <p className={styles.reportSubtitle}>
            16Signals examined 18 months of engineering work across four
            repositories and organized the strongest evidence for this role.
          </p>
        </div>
        <div className={styles.readyState}>
          <span>Ready for interview</span>
          <small>46 source artifacts linked</small>
        </div>
      </div>

      <div id="prepared-outputs" className={styles.outputArea}>
        <div className={styles.outputHeading}>
          <span>Hiring brief</span>
          <span>Source evidence</span>
        </div>

        <div className={styles.connectionTrack} aria-hidden="true">
          <span />
        </div>

        <div className={styles.outputList}>
          {EVIDENCE_OUTPUTS.map((output, index) => (
            <article
              key={output.id}
              className={`${styles.outputRow} ${styles[`outputRow${index + 1}`]}`}
              style={
                {
                  "--output-delay": `${160 + index * 220}ms`,
                } as CSSProperties
              }
            >
              <span className={styles.outputNode} aria-hidden="true">
                {output.index}
              </span>
              <p className={styles.outputLabel}>{output.label}</p>
              <p className={styles.outputConclusion}>{output.conclusion}</p>
              <EvidenceControl
                output={output}
                open={openEvidence === output.id}
                onOpen={() => setOpenEvidence(output.id)}
                onClose={() =>
                  setOpenEvidence((current) =>
                    current === output.id ? null : current,
                  )
                }
              />
            </article>
          ))}
        </div>
      </div>

      <div className={styles.interviewPlan}>
        <div>
          <span className={styles.planLabel}>45-minute interview</span>
          <span className={styles.planState}>Prepared from evidence</span>
        </div>
        <div className={styles.planTrack} aria-label="Prepared interview agenda">
          <span style={{ "--segment": "20%" } as CSSProperties}>
            Confirm role
          </span>
          <span style={{ "--segment": "35%" } as CSSProperties}>
            Test unknowns
          </span>
          <span style={{ "--segment": "45%" } as CSSProperties}>
            Deep dive
          </span>
        </div>
      </div>
    </div>
  );
}
