"use client";

import { useEffect, useRef, useState } from "react";

// ─── Data ───────────────────────────────────────────────────────────────────

type EvidenceMark = {
  label: string;
  isTeal?: boolean;
  sub?: string;
};

const ENGINEERING_NODES: { label: string; marks: EvidenceMark[] }[] = [
  {
    label: "Code",
    marks: [{ label: "commit a3f9b" }, { label: "feat: auth refactor", isTeal: true }],
  },
  {
    label: "Version Control",
    marks: [
      { label: "branch created" },
      { label: "42 commits", isTeal: true, sub: "over 11 days" },
      { label: "3 authors" },
    ],
  },
  {
    label: "Pull Request",
    marks: [
      { label: "PR #284 opened" },
      { label: "+1,847 −392 lines", isTeal: true },
      { label: "description: detailed" },
      { label: "linked issues: 3" },
    ],
  },
  {
    label: "Reviews",
    marks: [
      { label: "review: requested" },
      { label: "2 reviewers" },
      { label: "14 inline comments", isTeal: true },
      { label: "resolved: 12" },
      { label: "approved" },
    ],
  },
  {
    label: "CI / CD",
    marks: [
      { label: "pipeline triggered" },
      { label: "tests: 847 passed", isTeal: true },
      { label: "coverage: 91%" },
      { label: "lint: clean" },
      { label: "build: 2m 14s" },
    ],
  },
  {
    label: "Deployment",
    marks: [
      { label: "merged 2024-03-14 09:12 UTC" },
      { label: "deployed → staging" },
      { label: "canary: 5% traffic", isTeal: true },
      { label: "p99 latency: −18ms", isTeal: true },
      { label: "deployed → production" },
      { label: "rollback plan: confirmed" },
    ],
  },
];

const HIRING_NODES: string[] = [
  "Résumé",
  "Phone Screen",
  "Whiteboard",
  "Résumé",
  "Interview",
];

// ─── Scroll reveal hook ──────────────────────────────────────────────────────

function useScrollReveal(ref: React.RefObject<HTMLElement | null>) {
  const [progress, setProgress] = useState(0);
  const [triggered, setTriggered] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onScroll = () => {
      if (triggered) return;
      const rect = el.getBoundingClientRect();
      const windowH = window.innerHeight;
      const start = windowH * 0.9;
      const end = windowH * -0.3;
      if (rect.top > start) return;
      const raw = (start - rect.top) / (start - end);
      const clamped = Math.min(1, Math.max(0, raw));
      setProgress(clamped);
      if (clamped >= 1) setTriggered(true);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [ref, triggered]);

  return progress;
}

// ─── Engineering Track ───────────────────────────────────────────────────────

function EngineeringTrack({ progress }: { progress: number }) {
  const totalNodes = ENGINEERING_NODES.length;
  const nodeProgress = progress * totalNodes;

  return (
    <div className="shift-track" aria-label="Engineering work evolution">
      <div className="shift-track-label">Engineering Work</div>
      <div className="shift-rail-wrap">
        <div className="shift-rail">
          <div
            className="shift-rail-fill"
            style={{ width: `${progress * 100}%` }}
          />
        </div>

        <div className="shift-nodes">
          {ENGINEERING_NODES.map((node, i) => {
            const nodeAlpha = Math.min(1, Math.max(0, nodeProgress - i));
            const marksProgress = Math.min(1, Math.max(0, (nodeProgress - i - 0.2) / 0.5));

            return (
              <div
                key={node.label}
                className="shift-node-col"
                style={{ opacity: nodeAlpha }}
              >
                <div className="shift-node-dot" />
                <div className="shift-node-name">{node.label}</div>

                <div className="shift-marks">
                  {node.marks.map((mark, mi) => {
                    const markDelay = mi / node.marks.length;
                    const markAlpha = Math.min(
                      1,
                      Math.max(0, (marksProgress - markDelay) * node.marks.length)
                    );
                    return (
                      <div
                        key={mi}
                        className={`shift-mark${mark.isTeal ? " shift-mark--teal" : ""}`}
                        style={{ opacity: markAlpha }}
                      >
                        <span className="shift-mark-tick" aria-hidden="true" />
                        <span className="shift-mark-text">{mark.label}</span>
                        {mark.sub && (
                          <span className="shift-mark-sub">{mark.sub}</span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ─── Hiring Track ────────────────────────────────────────────────────────────

function HiringTrack({ progress }: { progress: number }) {
  const totalNodes = HIRING_NODES.length;
  const nodeProgress = progress * totalNodes;

  return (
    <div className="shift-track shift-track--sparse" aria-label="Hiring process unchanged">
      <div className="shift-track-label shift-track-label--dim">Hiring</div>
      <div className="shift-rail-wrap">
        <div className="shift-rail shift-rail--dim">
          <div
            className="shift-rail-fill shift-rail-fill--dim"
            style={{ width: `${progress * 100}%` }}
          />
        </div>

        <div className="shift-nodes shift-nodes--sparse">
          {HIRING_NODES.map((label, i) => {
            const nodeAlpha = Math.min(1, Math.max(0, nodeProgress - i));
            return (
              <div
                key={i}
                className="shift-node-col"
                style={{ opacity: nodeAlpha }}
              >
                <div className="shift-node-dot shift-node-dot--dim" />
                <div className="shift-node-name shift-node-name--dim">{label}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ─── Main Section ────────────────────────────────────────────────────────────

export function TheShift() {
  const sectionRef = useRef<HTMLElement>(null);
  const progress = useScrollReveal(sectionRef as React.RefObject<HTMLElement>);

  return (
    <section
      id="the-shift"
      ref={sectionRef}
      className="shift-section"
      aria-labelledby="shift-headline"
    >
      <div className="shift-inner">
        {/* Section index */}
        <div className="shift-index" aria-hidden="true">02</div>

        {/* Headline block */}
        <header className="shift-headline-block">
          <h2 id="shift-headline" className="shift-headline">
            Engineering became observable.
            <br />
            Hiring kept looking elsewhere.
          </h2>
          <p className="shift-subtext">
            Every revision, review, decision and deployment now leaves a
            timestamped record. The work became richer evidence. The evaluation
            process barely changed.
          </p>
        </header>

        {/* Rule */}
        <div className="shift-rule" aria-hidden="true" />

        {/* Timeline */}
        <div className="shift-timeline-wrap">
          <EngineeringTrack progress={progress} />
          <div className="shift-track-divider" aria-hidden="true" />
          <HiringTrack progress={progress} />
        </div>

        {/* Transition */}
        <footer className="shift-transition">
          <div className="shift-rule shift-rule--subtle" aria-hidden="true" />
          <p className="shift-transition-text">
            So what does the record reveal?
          </p>
        </footer>
      </div>
    </section>
  );
}
