import { PRODUCT_NAME } from "@/app/lib/landing/constants";
import { IconAlertTriangle, IconClock, IconTrendingUp } from "./icons";
import { Container } from "./ui";

const blocks = [
  {
    icon: IconAlertTriangle,
    problem:
      "AI-generated applications flood your pipeline. You cannot tell real builders from well-prompted ChatGPT.",
    benefit:
      "AI Authenticity Detection flags generation patterns, style discontinuity, and commit inflation before you open the CV.",
    payoff:
      "You stop wasting time on candidates who can write about building — and start only talking to candidates who have.",
  },
  {
    icon: IconClock,
    problem: "First technical interviews cost 90 minutes of senior engineering time. Most should not happen.",
    benefit:
      "Deep Mode generates role and stack match scoring, red flags with interview probes, and seniority calibration before the call.",
    payoff: "Your first technical conversation has a specific agenda. You already know where to push.",
  },
  {
    icon: IconTrendingUp,
    problem:
      "Mid-levels slide through as seniors. You do not find out until they are 3 months in and cannot lead a sprint.",
    benefit:
      "Seniority-adjusted primitive weighting and Systems Evolution trajectory analysis gives an honest level assessment independent of the CV's self-description.",
    payoff: "You hire the level you need — not the level someone claimed.",
  },
];

export function ValueProposition() {
  return (
    <section id="verification-layer" className="section scroll-mt-[var(--nav-height)] bg-[color:var(--surface-secondary)]">
      <Container>
        <div className="mx-auto max-w-[72ch] text-center">
          <p className="body-lg text-pretty">
            Every other part of your stack runs on verifiable truth. On-chain data is immutable. Commit history is
            signed. Code either passes the test suite or it does not.
          </p>
          <p className="body-lg mt-[var(--space-4)] text-pretty">
            Hiring has always been the exception — self-reported claims, coached answers, and job posts that do not
            reflect what you need.
          </p>
          <p className="body-lg mt-[var(--space-4)] text-pretty">
            {PRODUCT_NAME} closes the gap: a verification layer between claims and your decision — authenticating work,
            flagging AI inflation, and calibrating seniority against the role.
          </p>
          <p className="mt-[var(--space-6)] text-base font-medium text-[color:var(--foreground)]">
            Make hiring decisions on proof, not promises.
          </p>
        </div>

        <div className="mt-[var(--space-12)] grid gap-[var(--space-4)] md:grid-cols-3">
          {blocks.map(({ icon: Icon, problem, benefit, payoff }) => (
            <article key={problem.slice(0, 24)} className="card flex flex-col p-[var(--space-6)]">
              <Icon className="mb-[var(--space-4)] text-[color:var(--muted)]" />
              <p className="text-sm leading-[var(--leading-body)] text-[color:var(--muted)]">{problem}</p>
              <hr className="divider my-[var(--space-4)]" />
              <p className="text-sm leading-[var(--leading-body)] text-[color:var(--foreground)]">{benefit}</p>
              <hr className="divider my-[var(--space-4)]" />
              <p className="mt-auto text-sm font-medium leading-[var(--leading-body)] text-[color:var(--brand)]">
                {payoff}
              </p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
