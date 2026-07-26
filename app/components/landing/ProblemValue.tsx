import { LargeWord } from "./LargeWord";
import { Reveal } from "./Reveal";
import type { CSSProperties } from "react";

const folders = [
  {
    label: "01",
    tabOffset: "7%",
    title: "Proof of Work",
    body: "We separate shipped work from polished claims, so the shortlist starts with evidence instead of presentation.",
  },
  {
    label: "02",
    tabOffset: "18%",
    title: "Real Contributions",
    body: "Commits, projects, ownership patterns, and technical context are mapped before anyone reaches your calendar.",
  },
  {
    label: "03",
    tabOffset: "38%",
    title: "Consistency",
    body: "Seniority, depth, and trajectory are checked across time, not guessed from a single resume snapshot.",
  },
  {
    label: "04",
    tabOffset: "12%",
    title: "Anti-Fraud",
    body: "Borrowed work, inflated authorship, and weak provenance are flagged early, while strong candidates keep moving.",
  },
  {
    label: "05",
    tabOffset: "48%",
    title: "Technical Signals",
    body: "The output is a verified brief: strengths, risks, and interview probes ready for your engineering team.",
  },
] as const;

export function ProblemValue() {
  return (
    <section id="problem-value" className="landing-section relative isolate overflow-clip section-transition section-edge-highlight">
      <LargeWord className="left-[4vw] top-0">FILTER</LargeWord>
      <div className="container">
        <Reveal className="max-w-3xl">
          <p className="section-label reveal-child">Problem / Value</p>
          <h2 className="section-title reveal-child mt-4 text-white">The applicant pile arrives already sorted.</h2>
          <p className="reveal-child mt-5 max-w-2xl text-lg leading-[var(--leading-body)] text-[color:var(--muted-strong)]">
            Each layer removes a different hiring risk, until your team is left with people worth speaking to.
          </p>
        </Reveal>

        <div className="verification-folder-stack mt-16 space-y-8">
          {folders.map((folder, index) => (
            <Reveal
              as="article"
              key={folder.title}
              className="verification-folder"
              threshold={0.22}
              style={
                {
                  "--folder-index": index,
                  "--folder-total": folders.length,
                  "--folder-top": `${88 + index * 10}px`,
                  "--folder-shift": `${index * 2}px`,
                  "--reveal-delay": `${index * 70}ms`,
                  "--folder-tab-offset": folder.tabOffset,
                } as CSSProperties
              }
            >
              <div className="verification-folder__tab reveal-child">
                <svg
                  className="verification-folder__tab-shape"
                  viewBox="0 0 200 32"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                >
                  <defs>
                    <linearGradient id="folder-tab-gradient" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#34495e" />
                      <stop offset="100%" stopColor="#243342" />
                    </linearGradient>
                  </defs>
                  <rect x="0.5" y="0.5" width="199" height="31" rx="2" />
                </svg>
                <span className="verification-folder__tab-label">{folder.label}</span>
              </div>
              <div className="grid min-h-[360px] content-between gap-12 p-8 md:grid-cols-[0.86fr_1.14fr] md:p-10 lg:p-12">
                <div>
                  <p className="reveal-child text-xs font-medium uppercase tracking-[0.14em] text-[#62676b]">{folder.label}</p>
                  <h3 className="reveal-child mt-5 max-w-[12ch] text-[28px] font-semibold leading-[1.08] text-[#17191b]">
                    {folder.title}
                  </h3>
                </div>
                <div className="flex flex-col justify-end">
                  <p className="reveal-child max-w-xl text-[15px] leading-[1.55] text-[color:var(--folder-foreground)]">{folder.body}</p>
                  <div className="reveal-child mt-10 h-px w-full bg-[color:var(--folder-line)]" />
                  <p className="reveal-child mt-5 text-xs tracking-[0.02em] text-[color:var(--folder-muted)]">Verified before the first interview.</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
