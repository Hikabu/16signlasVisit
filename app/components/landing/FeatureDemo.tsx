import { Container, PrimaryButton, SectionLabel, SectionTitle } from "./ui";

const steps = [
  { n: "1", title: "Submit", body: "Upload a CV or paste a link. No ATS integration required." },
  {
    n: "2",
    title: "Verify",
    body: "P7 authenticity, employment verification, AI analysis, and commit history run automatically.",
  },
  {
    n: "3",
    title: "Read",
    body: "Evidence Brief delivered: signal score, red flags, probes, role-match, and AI leverage on one page.",
  },
  {
    n: "4",
    title: "Decide",
    body: "Know what you are hiring before the first call — not after it.",
  },
];

const featureMap = [
  { problem: "AI-inflated CVs", fix: "Commit inflation detection + LLM style discontinuity analysis" },
  {
    problem: "Employment claims you cannot verify",
    fix: "3-rung verification: email domain, org membership, contribution fingerprint",
  },
  { problem: "Seniority inflation", fix: "Seniority-adjusted primitive weighting + Systems Evolution trajectory" },
  { problem: "200 applicants eating TA bandwidth", fix: "Light Mode batch processing + ranked output" },
  { problem: "Expensive first interviews", fix: "Deep Mode interview intelligence + Section E/F/D reports" },
  { problem: "No signal on AI tool usage", fix: "P6 AI Leverage Quality + configuration file detection" },
];

const callouts = [
  "Signal Score",
  "P7 Authenticity",
  "Seniority Rating",
  "Interview Probes",
  "Role Match",
  "AI Leverage",
];

export function FeatureDemo() {
  return (
    <section id="how-it-works" className="section scroll-mt-[var(--nav-height)] bg-[color:var(--surface)]">
      <Container>
        <SectionTitle className="max-w-[28ch]">Two speeds. One pipeline. No wasted interviews.</SectionTitle>

        <div className="mt-[var(--space-8)] grid gap-[var(--space-8)] md:grid-cols-2">
          <div className="card p-[var(--space-6)]">
            <h3 className="text-[length:var(--text-md)] font-medium leading-[var(--leading-heading)] text-[color:var(--foreground)]">
              Light Mode
            </h3>
            <p className="body-md mt-[var(--space-3)]">
              Process your full applicant backlog. Sub-3-minute Evidence Brief per candidate. Ranked by signal,
              authenticity pre-filtered, AI patterns flagged.
            </p>
          </div>
          <div className="card p-[var(--space-6)]">
            <h3 className="text-[length:var(--text-md)] font-medium leading-[var(--leading-heading)] text-[color:var(--foreground)]">
              Deep Mode
            </h3>
            <p className="body-md mt-[var(--space-3)]">
              For candidates who make the cut: role and stack fit, seniority calibration, and interview intelligence with
              probes per red flag.
            </p>
          </div>
        </div>

        <div className="mt-[var(--space-12)]">
          <SectionLabel>Evidence Brief preview</SectionLabel>
          <div className="relative mt-[var(--space-4)] overflow-hidden rounded-[var(--radius-card)] border border-[color:var(--border)] bg-[color:var(--surface-secondary)] p-[var(--space-6)] md:p-[var(--space-8)]">
            <div className="grid gap-[var(--space-4)] md:grid-cols-[1fr_auto]">
              <div className="space-y-[var(--space-3)] rounded-[var(--radius-base)] border border-[color:var(--border)] bg-[color:var(--surface)] p-[var(--space-6)]">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-sm font-medium">Candidate Evidence Brief</span>
                  <span className="text-xs text-[color:var(--muted)]">2m 47s · Deep Mode</span>
                </div>
                <div className="h-2 w-full max-w-[200px] rounded-full bg-[color:var(--surface-secondary)]">
                  <div className="h-full w-[82%] rounded-full bg-[color:var(--brand)]" />
                </div>
                <p className="text-xs text-[color:var(--muted)]">Signal score 82 — ranked #2 in batch</p>
                <ul className="grid gap-2 sm:grid-cols-2">
                  {callouts.map((label) => (
                    <li
                      key={label}
                      className="rounded-[var(--radius-base)] border border-dashed border-[color:var(--border)] px-[var(--space-3)] py-2 text-xs text-[color:var(--muted-strong)]"
                    >
                      {label}
                    </li>
                  ))}
                </ul>
              </div>
              <p className="max-w-[28ch] self-center text-sm text-[color:var(--muted)] md:text-right">
                Annotated preview — full walkthrough on request.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-[var(--space-12)] grid gap-[var(--space-3)] sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step) => (
            <article key={step.n} className="card p-[var(--space-6)]">
              <span className="text-xs font-medium text-[color:var(--brand)]">Step {step.n}</span>
              <h4 className="mt-2 text-base font-medium text-[color:var(--foreground)]">{step.title}</h4>
              <p className="mt-2 text-sm leading-[var(--leading-body)] text-[color:var(--muted-strong)]">{step.body}</p>
            </article>
          ))}
        </div>

        <ul className="mt-[var(--space-12)] space-y-[var(--space-3)] border-t border-[color:var(--border)] pt-[var(--space-12)]">
          <li className="section-label">A fix for every way hiring misleads you</li>
          {featureMap.map(({ problem, fix }) => (
            <li key={problem} className="grid gap-1 text-sm md:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] md:gap-8">
              <span className="text-[color:var(--muted-strong)]">{problem}</span>
              <span className="text-[color:var(--foreground)]">→ {fix}</span>
            </li>
          ))}
        </ul>

        <div className="mt-[var(--space-8)] flex justify-center">
          <PrimaryButton href="#verify" variant="secondary">
            See a real Evidence Brief →
          </PrimaryButton>
        </div>
      </Container>
    </section>
  );
}
