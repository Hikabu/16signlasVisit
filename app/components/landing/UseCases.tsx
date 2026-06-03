import { PRODUCT_NAME } from "@/app/lib/landing/constants";
import { Container, SectionTitle, TextLink } from "./ui";

const roles = [
  {
    title: "For Heads of Engineering",
    body: "Run your full applicant pool through Light Mode before you touch a single CV. Start every hiring week knowing your top 5 candidates — verified — before your first standup.",
    link: "engineering leads",
  },
  {
    title: "For CTOs at early-stage protocols",
    body: "Every hire is existentially high-stakes when you are at 15 people. Deep Mode gives you the interview intelligence to treat it that way without adding process overhead.",
    link: "CTOs",
  },
  {
    title: "For TA leads at Web3 teams",
    body: "Process 200+ applicants without burning senior engineering hours on first-round screens that should have been automated weeks ago.",
    link: "TA leads",
  },
];

const scenarios = [
  { pain: "Flooded with AI-generated applications", fix: "Light Mode authenticity pre-filter cuts noise before you open a single CV" },
  { pain: "Recurring bad seniority-level hires", fix: "Seniority-adjusted primitive weighting and trajectory analysis" },
  { pain: "Wasting senior engineering time on first interviews", fix: "Deep Mode Interview Intelligence targets every session" },
  { pain: "Unable to verify employment history quickly", fix: "3-rung verification in under 90 seconds per claim" },
  { pain: "No signal on how candidates use AI tools", fix: "P6 AI Leverage Quality scores this as a first-class hiring signal" },
];

export function UseCases() {
  return (
    <section id="for-web3-teams" className="section scroll-mt-[var(--nav-height)] bg-[color:var(--surface-secondary)]">
      <Container>
        <div className="mx-auto max-w-[58ch] text-center">
          <SectionTitle>This is not for every team.</SectionTitle>
          <p className="body-lg mt-[var(--space-6)]">
            {PRODUCT_NAME} is built for engineering leaders who make technical hiring decisions directly — and who have
            already concluded that the standard resume and interview process is not producing reliable signal.
          </p>
          <p className="body-lg mt-[var(--space-4)]">
            If you are still running hiring through a recruiter who filters by keyword match, this will not help you
            yet.
          </p>
          <p className="body-lg mt-[var(--space-4)] font-medium text-[color:var(--foreground)]">
            If you are the person reviewing GitHub profiles at midnight trying to find real signal in a pile of
            AI-polished CVs — this was built for exactly that problem.
          </p>
        </div>

        <div className="mt-[var(--space-12)] grid gap-[var(--space-4)] md:grid-cols-3">
          {roles.map(({ title, body, link }) => (
            <article key={title} className="card p-[var(--space-6)]">
              <h3 className="text-base font-medium text-[color:var(--foreground)]">{title}</h3>
              <p className="mt-[var(--space-3)] text-sm leading-[var(--leading-body)] text-[color:var(--muted-strong)]">
                {body}
              </p>
              <TextLink href="#how-it-works" className="mt-[var(--space-4)] inline-block">
                See how it works for {link}
              </TextLink>
            </article>
          ))}
        </div>

        <div className="mt-[var(--space-12)] rounded-[var(--radius-card)] border border-[color:var(--border)] bg-[color:var(--surface)] p-[var(--space-6)] md:p-[var(--space-8)]">
          <h3 className="text-base font-medium text-[color:var(--foreground)]">Wherever you are getting burned, we have a fix.</h3>
          <ul className="mt-[var(--space-6)] space-y-[var(--space-4)]">
            {scenarios.map(({ pain, fix }) => (
              <li key={pain} className="grid gap-1 text-sm md:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] md:gap-8">
                <span className="text-[color:var(--muted-strong)]">{pain}</span>
                <span className="text-[color:var(--foreground)]">→ {fix}</span>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
