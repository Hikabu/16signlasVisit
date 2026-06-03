"use client";

import { useState } from "react";
import { Container, SectionTitle } from "./ui";

const tabs = [
  {
    id: "verification",
    label: "How verification works",
    content: (
      <div className="space-y-[var(--space-8)]">
        <div>
          <h3 className="text-base font-medium text-[color:var(--foreground)]">3-rung employment verification</h3>
          <p className="body-md mt-2">
            Email domain confirmation → organizational membership check → contribution fingerprint cross-reference. A
            claimed role at a credible protocol takes under 90 seconds to authenticate or flag as unverifiable.
          </p>
        </div>
        <div>
          <h3 className="text-base font-medium text-[color:var(--foreground)]">AI code laundering detection</h3>
          <p className="body-md mt-2">
            LLM-based style discontinuity analysis compares authorship patterns across a candidate&apos;s full commit
            history. A consistent engineering voice produces consistent stylistic patterns. A laundered portfolio does
            not.
          </p>
        </div>
        <div>
          <h3 className="text-base font-medium text-[color:var(--foreground)]">Commit velocity and quality correlation</h3>
          <p className="body-md mt-2">
            High commit velocity combined with low review engagement and shallow diffs is a distinct signal pattern.
            Candidates who manufacture activity to inflate their profiles produce a recognizable signature.
          </p>
        </div>
        <ol className="flex flex-wrap items-center gap-2 text-sm text-[color:var(--muted-strong)]">
          {["Email domain", "Org membership", "Contribution fingerprint"].map((step, i) => (
            <li key={step} className="flex items-center gap-2">
              {i > 0 && <span className="text-[color:var(--muted)]">→</span>}
              <span className="rounded-[var(--radius-base)] border border-[color:var(--border)] px-[var(--space-3)] py-1.5">
                {step}
              </span>
            </li>
          ))}
        </ol>
      </div>
    ),
  },
  {
    id: "primitives",
    label: "What the seven primitives catch",
    content: (
      <dl className="space-y-[var(--space-4)]">
        {[
          {
            name: "P2 Systems Evolution",
            mechanism: "Trajectory shows architectural growth vs lateral repetition",
            failure: "Same role recycled across companies without depth",
          },
          {
            name: "P3 Collaboration Leverage",
            mechanism: "Velocity of engineers around them on shared work",
            failure: "Team stalls when they are on the critical path",
          },
          {
            name: "P5 Operational Maturity",
            mechanism: "Incident ownership and on-call behavior in public history",
            failure: "Feature shipping only — no evidence of production ownership",
          },
          {
            name: "P6 AI Leverage Quality",
            mechanism: "AI used to accelerate real work vs fabricate output",
            failure: "Polished portfolios with shallow underlying contribution",
          },
          {
            name: "P7 Authenticity Confidence",
            mechanism: "Work verifiably theirs vs laundered attribution",
            failure: "AI generation and surface-level GitHub activity",
          },
        ].map(({ name, mechanism, failure }) => (
          <div
            key={name}
            className="grid gap-2 border-b border-[color:var(--border)] pb-[var(--space-4)] last:border-0 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1fr)_minmax(0,1fr)] md:gap-6"
          >
            <dt className="text-sm font-medium text-[color:var(--foreground)]">{name}</dt>
            <dd className="text-sm text-[color:var(--muted-strong)]">{mechanism}</dd>
            <dd className="text-sm text-[color:var(--muted)]">{failure}</dd>
          </div>
        ))}
      </dl>
    ),
  },
  {
    id: "interview",
    label: "What you get before every interview",
    content: (
      <ul className="space-y-[var(--space-6)]">
        {[
          {
            title: "Section D: Red flags with interview probes",
            body: "Not “ask about their experience with X” — the exact question engineered to surface whether a stated skill is real or rehearsed.",
          },
          {
            title: "Section E: Interview intelligence",
            body: "What to go deep on, what to skip, where the candidate is likely strongest and weakest based on their verified evidence profile.",
          },
          {
            title: "Section F: Role and stack match",
            body: "Explicit gap analysis between what the role requires and what the candidate has actually demonstrated.",
          },
        ].map(({ title, body }) => (
          <li key={title}>
            <h3 className="text-base font-medium text-[color:var(--foreground)]">{title}</h3>
            <p className="body-md mt-2">{body}</p>
          </li>
        ))}
        <p className="text-sm font-medium text-[color:var(--foreground)]">
          Result: you stop fishing in interviews and start confirming specific hypotheses. Every minute of that session is
          used.
        </p>
      </ul>
    ),
  },
];

export function FeatureDeepDive() {
  const [active, setActive] = useState(0);

  return (
    <section className="section bg-[color:var(--surface)]">
      <Container>
        <SectionTitle className="max-w-[32ch]">Not vibes. Not keywords. Seven verifiable primitives.</SectionTitle>
        <p className="body-md mt-[var(--space-4)] max-w-[62ch]">
          Every Evidence Brief scores candidates across 7 independently weighted primitives — each designed to catch a
          specific class of hiring failure that resumes and interviews miss.
        </p>

        <div className="mt-[var(--space-8)] overflow-hidden rounded-[var(--radius-card)] border border-[color:var(--border)]">
          <div
            className="flex flex-col border-b border-[color:var(--border)] sm:flex-row"
            role="tablist"
            aria-label="Feature deep dive"
          >
            {tabs.map((tab, i) => (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={active === i}
                className={`flex-1 px-[var(--space-4)] py-[var(--space-3)] text-left text-sm transition-colors duration-200 sm:text-center ${
                  active === i
                    ? "bg-[color:var(--foreground)] text-[color:var(--primary-foreground)]"
                    : "bg-[color:var(--surface-secondary)] text-[color:var(--muted-strong)] hover:text-[color:var(--foreground)]"
                }`}
                onClick={() => setActive(i)}
              >
                {tab.label}
              </button>
            ))}
          </div>
          <div className="p-[var(--space-6)] md:p-[var(--space-8)]" role="tabpanel">
            {tabs[active]?.content}
          </div>
        </div>
      </Container>
    </section>
  );
}
