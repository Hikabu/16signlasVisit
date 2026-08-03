"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { useScrollReveal } from "@/app/hooks/useScrollReveal";
import styles from "./PreparedInterview.module.css";

type EvidenceId = "proven" | "verify" | "ask";
type JobId = "backend" | "frontend" | "product-design";
type ApplicantId = "alex" | "maya" | "daniel";
type ReportSection =
  | "report"
  | "linked-evidence"
  | "questions-to-explore"
  | "interview-plan"
  | "open-questions";

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
    label: "Verified capability",
    conclusion:
      "Owns complex backend systems from technical decision through production release.",
    evidenceCount: "12",
    artifactType: "CAPABILITY TRACE",
    artifactId: "12 connected artifacts · 4 repositories",
    artifactTitle: "Production ownership repeated across multiple projects",
    artifactDetail:
      "16Signals connected architecture decisions, review responses, test coverage and release activity across 18 months of work.",
    artifactMeta:
      "3 major changes · 6 collaborators · production outcomes verified",
  },
  {
    id: "verify",
    index: "02",
    label: "Unproven area",
    conclusion:
      "Technical leadership is visible; sustained mentorship is not yet proven.",
    evidenceCount: "4",
    artifactType: "EVIDENCE LIMIT",
    artifactId: "32 review threads examined",
    artifactTitle: "Strong technical guidance, limited coaching history",
    artifactDetail:
      "The record shows frequent technical influence, but not enough repeated evidence of delegation, coaching or developing other engineers.",
    artifactMeta:
      "4 guidance examples · 1 coaching thread · insufficient evidence",
  },
  {
    id: "ask",
    index: "03",
    label: "Interview focus",
    conclusion:
      "Test how they make architecture decisions when delivery speed and system flexibility conflict.",
    evidenceCount: "3",
    artifactType: "PREPARED QUESTION",
    artifactId: "PR #284 · decision thread",
    artifactTitle:
      "Why was the event-driven approach rejected in favor of a synchronous boundary?",
    artifactDetail:
      "The final implementation is clear, but the record does not fully explain how the candidate weighed migration cost, operational risk and future scale.",
    artifactMeta:
      "3 linked artifacts · 2 alternatives · rationale partially recorded",
  },
];

const jobs: { id: JobId; label: string }[] = [
  { id: "backend", label: "Backend Developer" },
  { id: "frontend", label: "Frontend Developer" },
  { id: "product-design", label: "Product Designer" },
];

const applicants: { id: ApplicantId; label: string }[] = [
  { id: "alex", label: "Alex Morgan" },
  { id: "maya", label: "Maya Chen" },
  { id: "daniel", label: "Daniel Kim" },
];

const reportSections: { id: ReportSection; label: string }[] = [
  { id: "report", label: "Report" },
  { id: "linked-evidence", label: "Linked evidence" },
  { id: "questions-to-explore", label: "Questions to explore" },
  { id: "interview-plan", label: "Interview plan" },
  { id: "open-questions", label: "Open questions" },
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
  const [jobsOpen, setJobsOpen] = useState(true);
  const [expandedJob, setExpandedJob] = useState<JobId | null>("backend");
  const [applicationsOpen, setApplicationsOpen] = useState(true);
  const [expandedApplicant, setExpandedApplicant] =
    useState<ApplicantId | null>("alex");

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
            <div className={styles.introCopy}>
            <div className={`${styles.introRevealLine} ${styles.introHeadline}`}>
              <h2 id="prepared-interview-title">
                Skip the investigation Start with the evidence
              </h2>
            </div>
            <div className={`${styles.introRevealLine} ${styles.introBody}`}>
              <p>
                16Signals turns years of engineering activity into one organized hiring
                brief-showing what is already proven, what remains uncertain and exactly
                what to investigate in the interview.
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
            <span className={styles.windowTitle}>Candidate evidence report</span>
            <span className={styles.windowBarSpacer} />
          </div>

          <div className={styles.reportChrome}>
            <div className={styles.chromeIdentity}>
              <img className={styles.brandAsset} src="/a16zero.png" alt="" />
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
            <aside className={styles.sidebar} aria-label="Hiring navigation">
              <div className={styles.workspaceBrand}><img className={styles.brandAsset} src="/a16zero.png" alt="" /><strong>16Signals</strong><span>⌄</span></div>

              <nav className={styles.sidebarNav} aria-label="Jobs and settings">
                <button
                  type="button"
                  className={`${styles.navRow} ${styles.primaryNav} ${styles.pathNav}`}
                  aria-expanded={jobsOpen}
                  aria-controls="prepared-interview-jobs"
                  onClick={() => setJobsOpen((open) => !open)}
                >
                  <span className={styles.navRowText}>
                    <img src="/icons/inbox.svg" alt="" />
                    <span>Jobs</span>
                  </span>
                  <span className={`${styles.navChevron} ${jobsOpen ? styles.navChevronOpen : ""}`} aria-hidden="true">›</span>
                </button>

                {jobsOpen && (
                  <div id="prepared-interview-jobs" className={styles.navChildren}>
                    {jobs.map((job) => {
                      const isExpanded = expandedJob === job.id;
                      const isCurrentJob = job.id === "backend";

                      return (
                        <div key={job.id}>
                          <button
                            type="button"
                            className={`${styles.navRow} ${isCurrentJob ? styles.pathNav : ""}`}
                            aria-expanded={isExpanded}
                            aria-controls={`prepared-interview-${job.id}`}
                            onClick={() => {
                              if (isExpanded) {
                                setExpandedJob(null);
                                return;
                              }
                              setExpandedJob(job.id);
                              setApplicationsOpen(false);
                              setExpandedApplicant(null);
                            }}
                          >
                            <span>{job.label}</span>
                            <span className={`${styles.navChevron} ${isExpanded ? styles.navChevronOpen : ""}`} aria-hidden="true">›</span>
                          </button>

                          {isExpanded && (
                            <div id={`prepared-interview-${job.id}`} className={styles.navChildren}>
                              <a className={styles.navRow} href="#prepared-interview">
                                <span>Job details</span>
                              </a>
                              {isCurrentJob ? (
                                <button
                                  type="button"
                                  className={`${styles.navRow} ${styles.pathNav}`}
                                  aria-expanded={applicationsOpen}
                                  aria-controls={`prepared-interview-${job.id}-applications`}
                                  onClick={() => {
                                    setApplicationsOpen((open) => !open);
                                    if (applicationsOpen) setExpandedApplicant(null);
                                  }}
                                >
                                  <span>Applications</span>
                                  <span className={styles.navRowActions}>
                                    <span className={styles.applicationCount} aria-label="18 applicants">18</span>
                                    <span className={`${styles.navChevron} ${applicationsOpen ? styles.navChevronOpen : ""}`} aria-hidden="true">›</span>
                                  </span>
                                </button>
                              ) : (
                                <a className={styles.navRow} href="#prepared-interview">
                                  <span>Applications</span>
                                </a>
                              )}

                              {applicationsOpen && isCurrentJob && (
                                <div id={`prepared-interview-${job.id}-applications`} className={styles.navChildren}>
                                  {applicants.map((applicant) => {
                                    const isApplicantExpanded = expandedApplicant === applicant.id;
                                    const isCurrentApplicant = applicant.id === "alex";

                                    return (
                                      <div key={applicant.id}>
                                        <button
                                          type="button"
                                          className={`${styles.navRow} ${isCurrentApplicant ? styles.pathNav : ""}`}
                                          aria-expanded={isApplicantExpanded}
                                          aria-controls={`prepared-interview-${applicant.id}-report`}
                                          onClick={() => setExpandedApplicant(isApplicantExpanded ? null : applicant.id)}
                                        >
                                          <span>{applicant.label}</span>
                                          <span className={`${styles.navChevron} ${isApplicantExpanded ? styles.navChevronOpen : ""}`} aria-hidden="true">›</span>
                                        </button>

                                        {isApplicantExpanded && (
                                          <div id={`prepared-interview-${applicant.id}-report`} className={styles.navChildren}>
                                            {reportSections.map((section) => (
                                              <a
                                                key={section.id}
                                                className={`${styles.navRow} ${isCurrentApplicant && section.id === "report" ? styles.activeNav : ""}`}
                                                href="#prepared-interview"
                                                aria-current={isCurrentApplicant && section.id === "report" ? "page" : undefined}
                                              >
                                                <span>{section.label}</span>
                                              </a>
                                            ))}
                                          </div>
                                        )}
                                      </div>
                                    );
                                  })}
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}

                <a className={`${styles.navRow} ${styles.primaryNav}`} href="#prepared-interview">
                  <span className={styles.navRowText}><img src="/icons/progress.svg" alt="" /><span>Create job</span></span></a>
              </nav>

              <nav className={styles.sidebarFooter} aria-label="Account and support">
                <a className={styles.navRow} href="#prepared-interview">
                  <span className={styles.navRowText}><img src="/icons/16position/tech_interview_link.svg" alt="" /><span>Support</span></span>
                </a>
                <a className={styles.navRow} href="#prepared-interview">
                  <span className={styles.navRowText}><img src="/icons/16position/tech_interview_atom.svg" alt="" /><span>Settings</span></span>
                </a>
                <a className={styles.navRow} href="#prepared-interview">
                  <span className={styles.navRowText}><img src="/icons/16position/16_signlas_hole.svg" alt="" /><span>Log out</span></span>
                </a>
              </nav>
            </aside>

            <div className={styles.reportMain}>
              <div className={styles.reportHeader}>
                <div>
                  <p className={styles.kicker}>Senior Backend Engineer · Candidate brief</p>
                  <h3>Alex Morgan<img className={styles.birdAsset} src="/icons/bird.svg" alt="" /></h3>
                  <p className={styles.reportSubtitle}>
                    16Signals examined 18 months of engineering work across four repositories and organized the strongest evidence for this role.
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
            <aside className={styles.detailPanel} aria-label="Candidate report details">
              <div className={styles.detailTopline}>
                <span>REPORT-018</span>
                <span>⋯</span>
              </div>
              <div className={styles.detailBody}>
                <div className={styles.detailItem}><span className={styles.statusDot}>●</span><span>Analysis complete</span></div>
                <div className={styles.detailItem}><span className={styles.priorityBars}>▂▅▇</span><span>Senior Backend Engineer</span></div>
                <div className={styles.detailItem}><span className={styles.avatar}>A</span><span>Alex Morgan</span></div>
                <div className={`${styles.detailItem} ${styles.detailItemMuted}`}><img className={styles.analyzedBrandAsset} src="/a16zero.png" alt="" /><span>Analyzed by 16Signals</span></div>
                <div className={styles.detailDivider} />
                <div className={styles.detailItem}><span className={styles.muted}>Work examined</span><span className={styles.detailValue}>18 months</span></div>
                <div className={styles.detailItem}><span className={styles.muted}>Evidence</span><span className={styles.detailValue}>46 linked</span></div>
                <div className={styles.detailItem}><span className={styles.muted}>Verified strengths</span><span className={styles.detailValue}>4</span></div>
                <div className={styles.detailItem}><span className={styles.muted}>Areas to verify</span><span className={styles.detailValue}>2</span></div>
              </div>
            </aside>
          </div>
          <aside className={styles.floatingAssistant} aria-label="16Signals evidence analysis">
            <div className={styles.assistantHeader}>
              <img className={styles.assistantBrandAsset} src="/icons/a16zero.svg" alt="" />
              <span>16Signals</span>
              <small>Evidence analysis</small>
              <b>−　↗　×</b>
            </div>
            <div className={styles.assistantContent}>
              <div className={styles.evidenceFeed}>
                <article className={styles.evidenceCard}>
                  <strong>46 source artifacts connected</strong>
                  <small>4 repositories · 18 months · 6 collaborators</small>
                </article>
                <article className={styles.evidenceCard}>
                  <strong>Reconstructing contribution context…</strong>
                  <small>Ownership, complexity, reviews and production outcomes</small>
                </article>
                <article className={styles.evidenceCard}>
                  <strong>Production ownership verified</strong>
                  <small>Repeated across 3 major backend changes and 2 releases</small>
                </article>
                <article className={styles.evidenceCard}>
                  <strong>One important evidence gap found</strong>
                  <small>Sustained mentorship and delegation are not yet proven</small>
                </article>
                <div className={styles.changeCard}><strong>Interview brief prepared</strong><span>3 verified capabilities · 2 risks · 4 questions</span><code>Every conclusion linked to source work</code></div>
              </div>
            </div>
            <div className={styles.promptBox}>Search this candidate&apos;s evidence… <span>⌕　↑</span></div>
          </aside>
        </div>
      </div>
    </section>
  );
}
