import { AnimatedResponses } from "./AnimatedResponses";
import { Container, SectionLabel, SectionTitle } from "./ui";

export function ValueProposition() {
  return (
    <section id="verification-layer" className="section scroll-mt-[var(--nav-height)]">
      <Container>
        <div className="grid gap-[var(--space-12)] lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <div>
            <SectionLabel>Verification layer</SectionLabel>
            <SectionTitle className="mt-4 max-w-[12ch]">A portable skill profile built from evidence.</SectionTitle>
            <p className="body-lg mt-[var(--space-6)] max-w-[54ch]">
              Candidate evidence flows through 16 independent signals, then resolves into a skill profile employers can
              trust across roles, teams, and hiring workflows.
            </p>
            <div className="mt-[var(--space-8)] grid gap-3 font-mono text-xs text-[color:var(--muted)]">
              {["Candidate Evidence", "16 Signals", "Verification Engine", "Portable Skill Profile"].map((item, index) => (
                <div key={item} className="flex items-center gap-3">
                  <span className="flex h-7 w-7 items-center justify-center rounded-[var(--radius-base)] border border-white/12 text-[color:var(--brand)]">
                    {index + 1}
                  </span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
          <AnimatedResponses />
        </div>
      </Container>
    </section>
  );
}
