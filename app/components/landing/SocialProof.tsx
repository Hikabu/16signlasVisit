import { PRODUCT_NAME } from "@/app/lib/landing/constants";
import { Container, SectionTitle, TextLink } from "./ui";

const metrics = [
  {
    stat: "60%",
    label: "reduction in first-round interview volume without missing a single strong hire",
    source: "12-person engineering team, DeFi protocol",
  },
  {
    stat: "3 hrs",
    label: "saved per open role per week in manual CV screening",
    source: "Infrastructure protocol",
  },
  {
    stat: "$0",
    label: "spent on recruiter fees in Q3 — all 4 hires sourced and verified in-house",
    source: "L1 engineering team",
  },
  {
    stat: "2",
    label: "mis-hires identified and avoided in 6 months based on Evidence Brief red flags",
    source: "Wallet protocol",
  },
];

export function SocialProof() {
  return (
    <section id="case-study" className="section scroll-mt-[var(--nav-height)] bg-[color:var(--surface-secondary)]">
      <Container>
        <SectionTitle>What teams measure after switching.</SectionTitle>

        <div className="mt-[var(--space-12)] grid gap-[var(--space-4)] sm:grid-cols-2 lg:grid-cols-4">
          {metrics.map(({ stat, label, source }) => (
            <article key={label.slice(0, 20)} className="card p-[var(--space-6)]">
              <p className="text-[length:var(--text-lg)] font-medium tracking-tight text-[color:var(--foreground)]">
                {stat}
              </p>
              <p className="mt-2 text-sm leading-[var(--leading-body)] text-[color:var(--muted)]">{label}</p>
              <p className="mt-[var(--space-4)] text-xs text-[color:var(--muted)]">{source}</p>
            </article>
          ))}
        </div>

        <blockquote className="card mx-auto mt-[var(--space-12)] max-w-[68ch] p-[var(--space-8)] md:p-10">
          <p className="text-[length:var(--text-md)] leading-[var(--leading-body)] text-[color:var(--foreground)]">
            &ldquo;We hired a &lsquo;senior&rsquo; Solidity developer who turned out to be a mid. Cost us a full audit
            cycle. The seniority calibration in {PRODUCT_NAME} would have caught it in the Evidence Brief.&rdquo;
          </p>
          <footer className="mt-[var(--space-6)] flex items-center gap-[var(--space-3)]">
            <span
              className="flex h-10 w-10 items-center justify-center rounded-full bg-[color:var(--surface-secondary)] text-sm font-medium text-[color:var(--muted-strong)]"
              aria-hidden
            >
              HE
            </span>
            <cite className="not-italic">
              <span className="block text-sm font-medium text-[color:var(--foreground)]">Head of Engineering</span>
              <span className="text-sm text-[color:var(--muted)]">DeFi protocol</span>
            </cite>
          </footer>
        </blockquote>

        <div className="mt-[var(--space-8)] text-center">
          <TextLink href="#case-study">Read the full case study</TextLink>
        </div>
      </Container>
    </section>
  );
}
