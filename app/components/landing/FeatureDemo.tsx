import { Container, PrimaryButton, SectionTitle } from "./ui";

const steps = [
  { n: "1", title: "Submit", body: "Upload a CV or paste a link. No ATS integration required." },
  {
    n: "2",
    title: "Verify",
    body: "P7 authenticity check, 3-rung employment verification, AI generation analysis, commit history analysis runs automatically.",
  },
  {
    n: "3",
    title: "Read",
    body: "Evidence Brief delivered. Signal score, red flags, interview probes, role-match, and AI leverage quality on one page.",
  },
  {
    n: "4",
    title: "Decide",
    body: "You know what you are hiring before the first call. Not after it.",
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
    <section id="how-it-works" className="bg-[color:var(--surface)] py-20 md:py-24">
      <Container>
        <SectionTitle className="max-w-[28ch]">Two speeds. One pipeline. No wasted interviews.</SectionTitle>

        <div className="mt-10 grid gap-8 md:grid-cols-2">
          <div className="rounded-lg border border-[color:var(--border)] p-6">
            <h3 className="text-lg font-medium text-[color:var(--foreground)]">Light Mode</h3>
            <p className="body-md mt-3">
              Process your full applicant backlog. Sub-3-minute Evidence Brief per candidate. Ranked by signal,
              authenticity pre-filtered, AI patterns flagged. You start every week knowing exactly who is worth your
              team&apos;s time.
            </p>
          </div>
          <div className="rounded-lg border border-[color:var(--border)] p-6">
            <h3 className="text-lg font-medium text-[color:var(--foreground)]">Deep Mode</h3>
            <p className="body-md mt-3">
              For candidates who make the cut. Full role and stack fit scoring, seniority calibration, interview
              intelligence with specific probes per red flag. You walk into the first technical call knowing more about
              this candidate than they expect.
            </p>
          </div>
        </div>

        <div className="mt-14">
          <p className="section-label mb-4">Evidence Brief preview</p>
          <div className="relative overflow-hidden rounded-lg border border-[color:var(--border)] bg-[color:var(--surface-secondary)] p-6 md:p-8">
            <div className="grid gap-4 md:grid-cols-[1fr_auto]">
              <div className="space-y-3 rounded-md border border-[color:var(--border)] bg-[color:var(--surface)] p-5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-sm font-medium">Candidate Evidence Brief</span>
                  <span className="text-xs text-[color:var(--muted)]">2m 47s · Deep Mode</span>
                </div>
                <div className="h-2 w-full max-w-[200px] rounded-full bg-[color:var(--surface-secondary)]">
                  <div className="h-full w-[82%] rounded-full bg-[color:var(--accent)]" />
                </div>
                <p className="text-xs text-[color:var(--muted)]">Signal score 82 — ranked #2 in batch</p>
                <ul className="grid gap-2 sm:grid-cols-2">
                  {callouts.map((label) => (
                    <li
                      key={label}
                      className="rounded border border-dashed border-[color:var(--border)] px-3 py-2 text-xs text-[color:var(--muted-strong)]"
                    >
                      {label}
                    </li>
                  ))}
                </ul>
              </div>
              <p className="max-w-[28ch] self-center text-sm text-[color:var(--muted)] md:text-right">
                Annotated preview — full walkthrough available on request.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step) => (
            <article key={step.n} className="card p-5">
              <span className="text-xs font-medium text-[color:var(--accent)]">Step {step.n}</span>
              <h4 className="mt-2 text-base font-medium text-[color:var(--foreground)]">{step.title}</h4>
              <p className="mt-2 text-sm leading-relaxed text-[color:var(--muted-strong)]">{step.body}</p>
            </article>
          ))}
        </div>

        <ul className="mt-14 space-y-3 border-t border-[color:var(--border)] pt-12">
          <li className="section-label">We built a fix for every way hiring lies to you</li>
          {featureMap.map(({ problem, fix }) => (
            <li key={problem} className="grid gap-1 text-sm md:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] md:gap-8">
              <span className="text-[color:var(--muted-strong)]">{problem}</span>
              <span className="text-[color:var(--foreground)]">→ {fix}</span>
            </li>
          ))}
        </ul>

        <div className="mt-12 flex justify-center">
          <PrimaryButton href="#verify">See a real Evidence Brief</PrimaryButton>
        </div>
      </Container>
    </section>
  );
}
