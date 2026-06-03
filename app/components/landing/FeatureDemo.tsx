import { Container, SectionLabel, SectionTitle } from "./ui";

const problems = [
  {
    code: "P-01",
    title: "AI-inflated profiles",
    symptom: "Applications look precise, current, and senior while the underlying work history is thin or borrowed.",
    signal: "Authorship patterns, commit depth, and AI leverage quality are checked before the first screen.",
  },
  {
    code: "P-02",
    title: "Interview time burn",
    symptom: "Senior engineers spend the first call discovering whether the resume was worth reading.",
    signal: "The brief turns interviews into confirmation of specific evidence gaps.",
  },
  {
    code: "P-03",
    title: "Seniority distortion",
    symptom: "Candidates present as architects when their verified trajectory shows lateral repetition.",
    signal: "Technical depth and systems evolution are scored independently of self-reported level.",
  },
];

export function FeatureDemo() {
  return (
    <section id="problems" className="section scroll-mt-[var(--nav-height)]">
      <Container>
        <div className="grid gap-[var(--space-8)] lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <SectionLabel>Problems we solve</SectionLabel>
            <SectionTitle className="mt-4 max-w-[13ch]">Hiring failures leave diagnostic traces.</SectionTitle>
          </div>
          <p className="body-lg max-w-[62ch] lg:pt-10">
            Resumes and interviews collapse evidence into claims. 16 Signals keeps the evidence separate long enough to
            test it, weight it, and show where confidence is real.
          </p>
        </div>

        <div className="mt-[var(--space-12)] grid gap-[var(--space-4)] md:grid-cols-3">
          {problems.map(({ code, title, symptom, signal }, index) => (
            <article key={title} className="card relative min-h-[320px] overflow-hidden p-[var(--space-6)]">
              <div
                aria-hidden
                className="absolute left-0 top-0 h-0.5 bg-[color:var(--brand)]/70"
                style={{ width: `${34 + index * 22}%` }}
              />
              <div className="flex items-center justify-between font-mono text-xs text-[color:var(--muted)]">
                <span>{code}</span>
                <span>DIAGNOSTIC</span>
              </div>
              <h3 className="mt-[var(--space-8)] text-xl font-medium leading-tight text-white">{title}</h3>
              <p className="mt-[var(--space-4)] text-sm leading-[var(--leading-body)] text-[color:var(--muted)]">
                {symptom}
              </p>
              <div className="mt-[var(--space-8)] border-t border-white/10 pt-[var(--space-4)]">
                <p className="font-mono text-xs uppercase tracking-[0.12em] text-[color:var(--brand)]">Verified signal</p>
                <p className="mt-3 text-sm leading-[var(--leading-body)] text-white/82">{signal}</p>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
