import { LargeWord } from "./LargeWord";
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
    <section id="problem-value" className="landing-section relative isolate overflow-clip">
      <LargeWord className="left-[4vw] top-0">FILTER</LargeWord>
      <div className="container">
        <div className="max-w-3xl">
          <p className="section-label">Problem / Value</p>
          <h2 className="section-title mt-4 text-white">The applicant pile arrives already sorted.</h2>
          <p className="mt-5 max-w-2xl text-lg leading-[var(--leading-body)] text-[color:var(--muted-strong)]">
            Each layer removes a different hiring risk, until your team is left with people worth speaking to.
          </p>
        </div>

        <div className="verification-folder-stack mt-16 space-y-8">
          {folders.map((folder, index) => (
            <article
              key={folder.title}
              className="verification-folder"
              style={
                {
                  "--folder-index": index,
                  "--folder-total": folders.length,
                  "--folder-top": `${88 + index * 10}px`,
                  "--folder-shift": `${index * 2}px`,
                  "--folder-tab-offset": folder.tabOffset,
                } as CSSProperties
              }
            >
              <div className="verification-folder__tab">
                <span>{folder.label}</span>
              </div>
              <div className="grid min-h-[360px] content-between gap-12 p-7 md:grid-cols-[0.86fr_1.14fr] md:p-10 lg:p-12">
                <div>
                  <p className="text-sm font-medium uppercase text-[#09524f]/70">{folder.label}</p>
                  <h3 className="mt-5 max-w-[12ch] text-4xl font-medium leading-[1.05] text-[#132426] md:text-6xl">
                    {folder.title}
                  </h3>
                </div>
                <div className="flex flex-col justify-end">
                  <p className="max-w-xl text-xl leading-[1.45] text-[color:var(--folder-foreground)]">{folder.body}</p>
                  <div className="mt-10 h-px w-full bg-[color:var(--folder-line)]" />
                  <p className="mt-5 text-sm text-[color:var(--folder-muted)]">Verified before the first interview.</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
