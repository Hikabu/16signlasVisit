"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { useScrollReveal } from "@/app/hooks/useScrollReveal";
import styles from "./PreparedInterview.module.css";

type EvidenceId = "proven" | "verify" | "ask";

type Output = {
  id: EvidenceId;
  index: string;
  label: string;
  conclusion: string;
  evidenceCount: string;
  artifactType: string;
  artifactId: string;
  artifactTitle: string;
  artifactDetail: string;
  artifactMeta: string;
};

const outputs: Output[] = [
  {
    id: "proven",
    index: "01",
    label: "Already proven",
    conclusion: "Owns complex backend changes through production.",
    evidenceCount: "3",
    artifactType: "PR + RELEASE",
    artifactId: "PR #311 · v2.8.0",
    artifactTitle: "Authentication routing migration",
    artifactDetail:
      "Authored the change, resolved integration feedback and owned the canary release.",
    artifactMeta: "14 files · 6 reviews · production verified",
  },
  {
    id: "verify",
    index: "02",
    label: "Needs verification",
    conclusion: "Limited evidence of technical mentorship.",
    evidenceCount: "1",
    artifactType: "REVIEW PATTERN",
    artifactId: "32 reviews inspected",
    artifactTitle: "Guidance appears concise and implementation-led",
    artifactDetail:
      "Strong review activity is visible; sustained coaching or delegation is not yet evidenced.",
    artifactMeta: "1 coaching thread · confidence: limited",
  },
  {
    id: "ask",
    index: "03",
    label: "Ask this",
    conclusion:
      "In PR #284, what made you reject the event-driven approach?",
    evidenceCount: "2",
    artifactType: "DECISION RECORD",
    artifactId: "PR #284 · comment 18",
    artifactTitle: "Event-driven alternative rejected",
    artifactDetail:
      "The final design chose a synchronous boundary, but the trade-off is only partially recorded.",
    artifactMeta: "2 alternatives · 4 constraints · rationale incomplete",
  },
];

function EvidenceIcon() {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true">
      <path d="M6.3 5.1 8 3.4a3 3 0 0 1 4.2 4.2l-2.1 2.1a3 3 0 0 1-4.2 0" />
      <path d="m9.7 10.9-1.7 1.7a3 3 0 0 1-4.2-4.2l2.1-2.1a3 3 0 0 1 4.2 0" />
    </svg>
  );
}

function EvidenceControl({
  output,
  open,
  onOpen,
  onClose,
}: {
  output: Output;
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
}) {
  const popoverId = `evidence-${output.id}`;

  return (
    <div
      className={styles.evidenceControl}
      onMouseEnter={onOpen}
      onMouseLeave={onClose}
    >
      <button
        type="button"
        className={styles.evidenceButton}
        aria-expanded={open}
        aria-controls={popoverId}
        aria-label={`Show evidence for ${output.label}`}
        onClick={(event) => {
          event.stopPropagation();
          if (open) {
            onClose();
          } else {
            onOpen();
          }
        }}
        onFocus={onOpen}
      >
        <EvidenceIcon />
        <span>{output.evidenceCount}</span>
      </button>

      <div
        id={popoverId}
        className={`${styles.evidencePopover} ${
          open ? styles.evidencePopoverOpen : ""
        }`}
        role="note"
        aria-hidden={!open}
      >
        <div className={styles.artifactTopline}>
          <span>{output.artifactType}</span>
          <span className={styles.artifactVerified}>
            <i aria-hidden="true" />
            Linked
          </span>
        </div>
        <p className={styles.artifactId}>{output.artifactId}</p>
        <p className={styles.artifactTitle}>{output.artifactTitle}</p>
        <p className={styles.artifactDetail}>{output.artifactDetail}</p>
        <p className={styles.artifactMeta}>{output.artifactMeta}</p>
      </div>
    </div>
  );
}

export function PreparedInterview() {
  const { ref: introRef, isRevealed: introRevealed } =
    useScrollReveal<HTMLElement>();
  const reportRef = useRef<HTMLDivElement>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [openEvidence, setOpenEvidence] = useState<EvidenceId | null>(null);

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
          <div className={`${styles.introRevealLine} ${styles.introEyebrow}`}>
            <p className={styles.eyebrow}>
              <span>02</span>
              The prepared interview
            </p>
          </div>
          <div className={styles.introCopy}>
            <div className={`${styles.introRevealLine} ${styles.introHeadline}`}>
              <h2 id="prepared-interview-title">
                Walk in already knowing where to go deeper.
              </h2>
            </div>
            <div className={`${styles.introRevealLine} ${styles.introBody}`}>
              <p>
                Before the conversation begins, see what the work already proves,
                what remains uncertain and which questions are worth the interview
                time.
              </p>
            </div>
          </div>
        </header>

        <div
          ref={reportRef}
          className={`${styles.report} ${
            isRevealed ? styles.reportRevealed : ""
          }`}
          onClick={(event) => event.stopPropagation()}
        >
          <div className={styles.windowBar} aria-hidden="true">
            <div className={styles.trafficLights}>
              <span className={styles.trafficLightRed} />
              <span className={styles.trafficLightYellow} />
              <span className={styles.trafficLightGreen} />
            </div>
            <span className={styles.windowTitle}>Interview brief</span>
            <span className={styles.windowBarSpacer} />
          </div>

          <div className={styles.reportChrome}>
            <div className={styles.chromeIdentity}>
              <img className={styles.brandAsset} src="/icons/a16zero.svg" alt="" />
              <span className={styles.productName}>16Signals</span>
              <span className={styles.chromeDivider} />
              <span className={styles.chromeLocation}>Workspace</span>
            </div>
            <div className={styles.chromeStatus}>
              <span className={styles.issueCount}>02 / 145</span>
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
            <aside className={styles.sidebar} aria-label="Report navigation">
              <div className={styles.workspaceBrand}><img className={styles.brandAsset} src="/icons/a16zero.svg" alt="" /><strong>16Signals</strong><span>⌄</span></div>
              <div>
                <p className={styles.sidebarLabel}>Workspace</p>
                <p className={styles.candidateName}>Engineering</p>
              </div>

              <nav aria-label="Interview brief sections">
                <a href="#prepared-interview"><img src="/icons/inbox.svg" alt="" /><span>Inbox</span></a>
                <a href="#prepared-interview"><img src="/icons/progress.svg" alt="" /><span>My issues</span></a>
                <a href="#prepared-interview"><img src="/icons/git.svg" alt="" /><span>Reviews</span></a>
                <a href="#prepared-interview"><img src="/icons/statistick.svg" alt="" /><span>Pulse</span></a>
                <p className={styles.navSection}>Workspace</p>
                <a href="#prepared-interview"><img src="/icons/interviews.svg" alt="" /><span>Initiatives</span></a>
                <a href="#prepared-interview"><img src="/icons/project.svg" alt="" /><span>Projects</span></a>
                <a className={styles.activeNav} href="#prepared-interview"><span className={styles.activeDot}>◷</span><span>Faster app launch</span></a>
                <a href="#prepared-interview"><span className={styles.tealDot}>⌁</span><span>UI Refresh</span></a>
              </nav>

              <div className={styles.sourceScope}>
                <p className={styles.sidebarLabel}>Favorites</p>
                <div>
                  <span>◷　Faster app launch</span>
                </div>
                <div>
                  <span>⌁　Agent tasks</span>
                </div>
                <div>
                  <span>⌁　Agents Insights</span>
                </div>
              </div>
            </aside>

            <div className={styles.reportMain}>
              <div className={styles.reportHeader}>
                <div>
                  <p className={styles.kicker}>Prepared interview</p>
                  <h3>Faster app launch<img className={styles.birdAsset} src="/icons/bird.svg" alt="" /></h3>
                  <p className={styles.reportSubtitle}>
                    Render UI before <code>vehicle_state</code> sync when minimum required state is present, instead of blocking on full refresh during iOS startup.
                  </p>
                </div>
                <div className={styles.readyState}>
                  <span>ENG-2703</span>
                  <small>Evidence linked</small>
                </div>
              </div>

              <div id="prepared-outputs" className={styles.outputArea}>
                <div className={styles.outputHeading}>
                  <span>Activity</span>
                  <span>Evidence trace</span>
                </div>

                <div className={styles.connectionTrack} aria-hidden="true">
                  <span />
                </div>

                <div className={styles.outputList}>
                  {outputs.map((output, index) => (
                    <article
                      key={output.id}
                      className={`${styles.outputRow} ${
                        styles[`outputRow${index + 1}`]
                      }`}
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
                      <p className={styles.outputConclusion}>
                        {output.conclusion}
                      </p>
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
                  <span className={styles.planLabel}>45 min interview</span>
                  <span className={styles.planState}>Agenda prepared</span>
                </div>
                <div className={styles.planTrack} aria-label="Interview agenda">
                  <span style={{ "--segment": "22%" } as CSSProperties}>
                    Context
                  </span>
                  <span style={{ "--segment": "34%" } as CSSProperties}>
                    Verify
                  </span>
                  <span style={{ "--segment": "44%" } as CSSProperties}>
                    Go deeper
                  </span>
                </div>
              </div>
            </div>

            <aside className={styles.detailPanel} aria-label="Evidence collection progress">
              <div className={styles.detailTopline}>
                <span>Evidence processing</span>
                <span>Live</span>
              </div>
              <div className={styles.assistantCard}>
                <div className={styles.assistantHeader}><img className={styles.assistantBrandAsset} src="/icons/a16zero.svg" alt="" /><span>16Signals</span><small>Analysis</small><b>×</b></div>
                <div className={styles.assistantContent}>
                  <div className={styles.evidenceFeed}>
                    <article className={styles.evidenceCard}>
                      <strong>Evidence sources indexed</strong>
                      <div className={styles.evidenceChips}><code className={styles.commitChip}>112 commits</code><code>28 PRs</code><code>64 reviews</code><code>4 releases</code></div>
                      <small>Broad history makes the assessment harder to stage.</small>
                    </article>
                    <article className={styles.evidenceCard}>
                      <strong>Capability signals extracted</strong>
                      <div className={styles.evidenceChips}><code>ownership</code><code>judgment</code><code>delivery</code></div>
                      <small>Repeated behavior is visible across the work record.</small>
                    </article>
                    <article className={styles.evidenceCard}>
                      <strong>Confidence increased to 82%</strong>
                      <div className={styles.evidenceChips}><code>46 linked artifacts</code><code>3 patterns</code></div>
                      <small>Each conclusion is supported by more than one source.</small>
                    </article>
                    <article className={styles.evidenceCard}>
                      <strong>Interview priorities generated</strong>
                      <div className={styles.evidenceChips}><code>mentorship</code><code>trade-offs</code><code>production impact</code></div>
                      <small>Use the time to test judgment, not basic competence.</small>
                    </article>
                    <article className={`${styles.evidenceCard} ${styles.evidenceCardFinal}`}>
                      <strong>Interview brief ready</strong>
                      <div className={styles.evidenceChips}><code>3 focus areas</code><code>evidence trace</code></div>
                      <small>The report is ready to guide a sharper conversation.</small>
                    </article>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>

        <div className={styles.transition}>
          <span aria-hidden="true" />
          <p>What can real work reveal?</p>
          <span aria-hidden="true" />
          <span className={styles.transitionArrow} aria-hidden="true">
            ↓
          </span>
        </div>
      </div>
    </section>
  );
}
