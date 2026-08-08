"use client";

import { useState } from "react";
import { APPLICANTS, JOBS, REPORT_SECTIONS } from "@/app/data/landing";
import type { ApplicantId, JobId } from "@/app/types/landing";
import { ReportIcon } from "./ReportIcon";
import { styles } from "./styles";

export function ReportSidebar() {
  const [jobsOpen, setJobsOpen] = useState(true);
  const [expandedJob, setExpandedJob] = useState<JobId | null>("backend");
  const [applicationsOpen, setApplicationsOpen] = useState(true);
  const [expandedApplicant, setExpandedApplicant] =
    useState<ApplicantId | null>("alex");

  return (
    <aside className={styles.sidebar} aria-label="Hiring navigation">
      <div className={styles.workspaceBrand}>
        <ReportIcon src="/a16zero.png" className={styles.brandAsset} />
        <strong>16Signals</strong>
        <span>⌄</span>
      </div>

      <nav className={styles.sidebarNav} aria-label="Jobs and settings">
        <button
          type="button"
          className={`${styles.navRow} ${styles.primaryNav} ${styles.pathNav}`}
          aria-expanded={jobsOpen}
          aria-controls="prepared-interview-jobs"
          onClick={() => setJobsOpen((open) => !open)}
        >
          <span className={styles.navRowText}>
            <ReportIcon src="/icons/inbox.svg" />
            <span>Jobs</span>
          </span>
          <span
            className={`${styles.navChevron} ${jobsOpen ? styles.navChevronOpen : ""}`}
            aria-hidden="true"
          >
            ›
          </span>
        </button>

        {jobsOpen && (
          <div id="prepared-interview-jobs" className={styles.navChildren}>
            {JOBS.map((job) => {
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
                    <span
                      className={`${styles.navChevron} ${isExpanded ? styles.navChevronOpen : ""}`}
                      aria-hidden="true"
                    >
                      ›
                    </span>
                  </button>

                  {isExpanded && (
                    <div
                      id={`prepared-interview-${job.id}`}
                      className={styles.navChildren}
                    >
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
                            <span
                              className={styles.applicationCount}
                              aria-label="18 applicants"
                            >
                              18
                            </span>
                            <span
                              className={`${styles.navChevron} ${applicationsOpen ? styles.navChevronOpen : ""}`}
                              aria-hidden="true"
                            >
                              ›
                            </span>
                          </span>
                        </button>
                      ) : (
                        <a className={styles.navRow} href="#prepared-interview">
                          <span>Applications</span>
                        </a>
                      )}

                      {applicationsOpen && isCurrentJob && (
                        <div
                          id={`prepared-interview-${job.id}-applications`}
                          className={styles.navChildren}
                        >
                          {APPLICANTS.map((applicant) => {
                            const isApplicantExpanded =
                              expandedApplicant === applicant.id;
                            const isCurrentApplicant = applicant.id === "alex";

                            return (
                              <div key={applicant.id}>
                                <button
                                  type="button"
                                  className={`${styles.navRow} ${isCurrentApplicant ? styles.pathNav : ""}`}
                                  aria-expanded={isApplicantExpanded}
                                  aria-controls={`prepared-interview-${applicant.id}-report`}
                                  onClick={() =>
                                    setExpandedApplicant(
                                      isApplicantExpanded ? null : applicant.id,
                                    )
                                  }
                                >
                                  <span>{applicant.label}</span>
                                  <span
                                    className={`${styles.navChevron} ${isApplicantExpanded ? styles.navChevronOpen : ""}`}
                                    aria-hidden="true"
                                  >
                                    ›
                                  </span>
                                </button>

                                {isApplicantExpanded && (
                                  <div
                                    id={`prepared-interview-${applicant.id}-report`}
                                    className={styles.navChildren}
                                  >
                                    {REPORT_SECTIONS.map((section) => {
                                      const isActive =
                                        isCurrentApplicant && section.id === "report";

                                      return (
                                        <a
                                          key={section.id}
                                          className={`${styles.navRow} ${isActive ? styles.activeNav : ""}`}
                                          href="#prepared-interview"
                                          aria-current={isActive ? "page" : undefined}
                                        >
                                          <span>{section.label}</span>
                                        </a>
                                      );
                                    })}
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

        <a
          className={`${styles.navRow} ${styles.primaryNav}`}
          href="#prepared-interview"
        >
          <span className={styles.navRowText}>
            <ReportIcon src="/icons/progress.svg" />
            <span>Create job</span>
          </span>
        </a>
      </nav>

      <nav className={styles.sidebarFooter} aria-label="Account and support">
        <a className={styles.navRow} href="#prepared-interview">
          <span className={styles.navRowText}>
            <ReportIcon src="/icons/16position/tech_interview_link.svg" />
            <span>Support</span>
          </span>
        </a>
        <a className={styles.navRow} href="#prepared-interview">
          <span className={styles.navRowText}>
            <ReportIcon src="/icons/16position/tech_interview_atom.svg" />
            <span>Settings</span>
          </span>
        </a>
        <a className={styles.navRow} href="#prepared-interview">
          <span className={styles.navRowText}>
            <ReportIcon src="/icons/16position/16_signlas_hole.svg" />
            <span>Log out</span>
          </span>
        </a>
      </nav>
    </aside>
  );
}
