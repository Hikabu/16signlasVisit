import { Container, SectionLabel, SectionTitle } from "./ui";

const steps = [
  {
    title: "Evidence",
    label: "Input",
    body: "Work history, code traces, project context, collaboration patterns, and technical claims enter as separate evidence layers.",
    metrics: ["Source mapped", "Claims separated", "History normalized"],
  },
  {
    title: "Verification",
    label: "Engine",
    body: "16 independent signals test authenticity, execution, technical depth, AI usage, seniority, and collaboration.",
    metrics: ["Signals weighted", "Anomalies flagged", "Confidence scored"],
  },
  {
    title: "Trust",
    label: "Output",
    body: "The result is a portable skill profile with verified strengths, risk areas, and interview probes.",
    metrics: ["Profile issued", "Proof reusable", "Interview focused"],
  },
];

export function FeatureDeepDive() {
  return (
    <section id="how-it-works" className="section scroll-mt-[var(--nav-height)]">
      <Container>
        <div className="max-w-[66ch]">
          <SectionLabel>How it works</SectionLabel>
          <SectionTitle className="mt-4">Evidence becomes trust through independent signal checks.</SectionTitle>
        </div>

        <div className="mt-[var(--space-12)] grid gap-4 lg:grid-cols-3">
          {steps.map((step, index) => (
            <article key={step.title} className="card p-[var(--space-6)]">
              <div className="flex items-center justify-between font-mono text-xs text-[color:var(--muted)]">
                <span>{step.label}</span>
                <span>0{index + 1}</span>
              </div>
              <div className="my-[var(--space-8)] flex items-center gap-3">
                <span className="flex h-12 w-12 items-center justify-center rounded-[var(--radius-base)] border border-[color:var(--brand)]/50 font-mono text-sm text-[color:var(--brand)]">
                  {index + 1}
                </span>
                <div className="h-px flex-1 bg-white/10" />
              </div>
              <h3 className="text-2xl font-medium leading-tight text-white">{step.title}</h3>
              <p className="mt-[var(--space-4)] text-sm leading-[var(--leading-body)] text-[color:var(--muted)]">
                {step.body}
              </p>
              <ul className="mt-[var(--space-8)] space-y-3">
                {step.metrics.map((metric) => (
                  <li key={metric} className="flex items-center gap-3 text-sm text-white/78">
                    <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--brand)]" />
                    {metric}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
