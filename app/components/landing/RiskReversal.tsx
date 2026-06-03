"use client";

import { useState } from "react";
import { Container, PrimaryButton, SectionTitle } from "./ui";
import { IconCheck, IconChevronDown, IconShield } from "./icons";

const reassurance = [
  "No ATS integration required. Works with your existing process.",
  "Cancel any time. Month-to-month. No annual lock-in to start.",
  "Candidate data is never used to train models or shared with third parties.",
  "GDPR compliant. Data deleted on request within 48 hours.",
  "Built by engineers who have hired engineers — not an HR software team.",
];

const faqs = [
  {
    q: "Can candidates game this?",
    a: "Authenticity analysis looks at patterns across a candidate's full public history, not a one-time submission. Coaching for a test does not change a 3-year commit fingerprint.",
  },
  {
    q: "What if a candidate has private repositories?",
    a: "We verify what is verifiable and flag what is not. A gap in public evidence is itself a data point we surface — not an automatic disqualification, but a signal you factor into your decision.",
  },
  {
    q: "Does this replace the technical interview?",
    a: "No. It makes it shorter and sharper. Deep Mode tells you exactly what to test. Your interview time becomes confirmation of specific hypotheses, not open-ended exploration.",
  },
  {
    q: "How long does implementation take?",
    a: "Zero. Paste a CV link or upload a file. First Evidence Brief in under 3 minutes. No ATS integration required, no onboarding call required, no setup process.",
  },
  {
    q: "What happens to candidate data?",
    a: "Candidate data is never used to train models or shared with third parties. GDPR compliant. Candidate data deleted on request within 48 hours.",
  },
];

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-[color:var(--border)] last:border-0">
      <button
        type="button"
        className="flex w-full items-center justify-between gap-4 py-4 text-left text-sm font-medium text-[color:var(--foreground)]"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
      >
        {q}
        <IconChevronDown className={`shrink-0 transition ${open ? "rotate-180" : ""}`} />
      </button>
      {open && <p className="pb-4 text-sm leading-relaxed text-[color:var(--muted-strong)]">{a}</p>}
    </div>
  );
}

export function RiskReversal() {
  return (
    <>
      <section className="bg-[color:var(--surface-secondary)] py-12 md:py-16">
        <Container>
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {reassurance.map((line, i) => (
              <li key={line} className="flex gap-3 text-sm text-[color:var(--muted-strong)]">
                {i === 2 || i === 3 ? (
                  <IconShield className="mt-0.5 shrink-0 text-[color:var(--accent)]" />
                ) : (
                  <IconCheck className="mt-0.5 shrink-0 text-[color:var(--accent)]" />
                )}
                <span className={i === 4 ? "font-medium text-[color:var(--foreground)]" : ""}>{line}</span>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="bg-[color:var(--surface)] py-20 md:py-24">
        <Container>
          <SectionTitle>The questions we get from skeptical engineering leads.</SectionTitle>
          <div className="mt-10 max-w-[72ch] rounded-lg border border-[color:var(--border)] px-4 md:px-6">
            {faqs.map((item) => (
              <FaqItem key={item.q} {...item} />
            ))}
          </div>

          <div id="verify" className="mx-auto mt-16 max-w-[52ch] scroll-mt-28 text-center">
            <h3 className="text-xl font-medium text-[color:var(--foreground)] md:text-2xl">
              Try it on a real candidate before you pay anything.
            </h3>
            <p className="body-md mt-4">
              Your first 3 Evidence Briefs are free. No credit card. No sales call. Submit a real candidate from your
              current pipeline and read the output before you decide if this is worth it.
            </p>
            <p className="mt-4 text-sm text-[color:var(--muted)]">
              If you do not find something in that report you would not have found yourself — we have not earned your
              trust yet.
            </p>
            <div className="mt-8 flex justify-center">
              <PrimaryButton href="#verify">Get your first 3 verifications</PrimaryButton>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
