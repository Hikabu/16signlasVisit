"use client";

import { useMemo, useState } from "react";
import { PRODUCT_NAME } from "@/app/lib/landing/constants";
import { Container, SectionTitle } from "./ui";
import { IconChevronDown } from "./icons";

const tiers = [
  {
    name: "Light",
    price: "$299",
    period: "/mo",
    description: "Batch processing, authenticity filter, ranked output. For teams drowning in applicant volume.",
    cta: "Start with Light",
    href: "#verify",
    highlight: false,
  },
  {
    name: "Deep",
    price: "$799",
    period: "/mo",
    description:
      "Everything in Light plus full Evidence Brief, Interview Intelligence, seniority calibration. For every hire that matters.",
    cta: "Try Deep free for 3 candidates →",
    href: "#verify",
    highlight: true,
    badge: "Most used by engineering leads",
  },
  {
    name: "Protocol",
    price: "Custom",
    period: "",
    description: "Unlimited, API access, custom role primitives, team seats. For when verification is a recurring process.",
    cta: "Talk to us about Protocol",
    href: "#contact",
    highlight: false,
  },
];

const comparisonRows = [
  ["Light Mode batch processing", "✓", "✓", "✓"],
  ["Evidence Brief (Deep)", "—", "✓", "✓"],
  ["Interview Intelligence", "—", "✓", "✓"],
  ["API access", "—", "—", "✓"],
  ["Custom role primitives", "—", "—", "✓"],
];

export function Pricing() {
  const [hiresPerYear, setHiresPerYear] = useState(4);
  const [tableOpen, setTableOpen] = useState(false);

  const roi = useMemo(() => {
    const misHireCost = 140_000;
    const annualProduct = 799 * 12;
    const exposure = hiresPerYear * misHireCost * 0.15;
    const breakeven = (annualProduct / misHireCost).toFixed(2);
    return { misHireCost, annualProduct, exposure, breakeven };
  }, [hiresPerYear]);

  return (
    <section id="pricing" className="section scroll-mt-[var(--nav-height)] bg-[color:var(--surface)]">
      <Container>
        <SectionTitle className="max-w-[40ch]">
          A mis-hire costs $150K. A verification costs less than your team&apos;s cheapest sprint.
        </SectionTitle>
        <p className="body-md mt-[var(--space-4)] max-w-[62ch]">
          A senior mis-hire at a Web3 protocol costs $80–180K when you account for recruiting fees, salary, remediation
          time, velocity loss, and re-hiring. One avoided bad hire pays for a full year of {PRODUCT_NAME}.
        </p>

        <div className="mt-[var(--space-12)] rounded-[var(--radius-card)] border border-[color:var(--border)] bg-[color:var(--surface-secondary)] p-[var(--space-6)] md:p-[var(--space-8)]">
          <h3 className="text-base font-medium text-[color:var(--foreground)]">What does one avoided mis-hire get you?</h3>
          <label className="mt-[var(--space-6)] block text-sm text-[color:var(--muted)]" htmlFor="hires-slider">
            Senior hires per year: <span className="font-medium text-[color:var(--foreground)]">{hiresPerYear}</span>
          </label>
          <input
            id="hires-slider"
            type="range"
            min={1}
            max={12}
            value={hiresPerYear}
            onChange={(e) => setHiresPerYear(Number(e.target.value))}
            className="mt-[var(--space-3)] h-11 w-full max-w-md accent-[color:var(--brand)]"
          />
          <ul className="mt-[var(--space-6)] grid gap-[var(--space-3)] text-sm sm:grid-cols-3">
            <li>
              <span className="text-[color:var(--muted)]">Cost-of-risk exposure</span>
              <p className="text-[length:var(--text-lg)] font-medium">${roi.exposure.toLocaleString()}</p>
            </li>
            <li>
              <span className="text-[color:var(--muted)]">Deep annual cost</span>
              <p className="text-[length:var(--text-lg)] font-medium">${roi.annualProduct.toLocaleString()}</p>
            </li>
            <li>
              <span className="text-[color:var(--muted)]">Breakeven (mis-hires avoided)</span>
              <p className="text-[length:var(--text-lg)] font-medium">{roi.breakeven}</p>
            </li>
          </ul>
        </div>

        <p className="section-label mt-[var(--space-12)]">Pick the depth you need</p>
        <div className="mt-[var(--space-6)] grid gap-[var(--space-4)] md:grid-cols-3">
          {tiers.map((tier) => (
            <article
              key={tier.name}
              className={`card relative flex flex-col p-[var(--space-6)] ${
                tier.highlight ? "border-2 border-[color:var(--brand)]" : ""
              }`}
            >
              {tier.badge && (
                <span className="absolute -top-3 left-4 rounded-full bg-[color:var(--brand)] px-[var(--space-3)] py-0.5 text-[11px] font-medium text-[color:var(--brand-foreground)]">
                  {tier.badge}
                </span>
              )}
              <h3 className="text-[length:var(--text-md)] font-medium">{tier.name}</h3>
              <p className="mt-2">
                <span className="text-[length:var(--text-lg)] font-medium">{tier.price}</span>
                <span className="text-sm text-[color:var(--muted)]">{tier.period}</span>
              </p>
              <p className="mt-[var(--space-4)] flex-1 text-sm leading-[var(--leading-body)] text-[color:var(--muted-strong)]">
                {tier.description}
              </p>
              <a
                href={tier.href}
                className={`btn mt-[var(--space-6)] w-full ${tier.highlight ? "btn-primary" : "btn-secondary"}`}
              >
                {tier.cta}
              </a>
            </article>
          ))}
        </div>

        <div className="mt-[var(--space-8)]">
          <button
            type="button"
            className="flex w-full min-h-[44px] items-center justify-between gap-2 rounded-[var(--radius-base)] border border-[color:var(--border)] px-[var(--space-4)] py-[var(--space-3)] text-sm font-medium focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--brand)]"
            aria-expanded={tableOpen}
            onClick={() => setTableOpen((o) => !o)}
          >
            Compare all features
            <IconChevronDown className={`transition-transform duration-200 ${tableOpen ? "rotate-180" : ""}`} />
          </button>
          {tableOpen && (
            <div className="mt-2 overflow-x-auto rounded-[var(--radius-base)] border border-[color:var(--border)]">
              <table className="w-full min-w-[480px] text-left text-sm">
                <thead>
                  <tr className="border-b border-[color:var(--border)] bg-[color:var(--surface-secondary)]">
                    <th className="p-[var(--space-3)] font-medium">Feature</th>
                    <th className="p-[var(--space-3)] font-medium">Light</th>
                    <th className="p-[var(--space-3)] font-medium">Deep</th>
                    <th className="p-[var(--space-3)] font-medium">Protocol</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonRows.map(([feature, ...cols]) => (
                    <tr key={feature} className="border-b border-[color:var(--border)] last:border-0">
                      <td className="p-[var(--space-3)] text-[color:var(--muted-strong)]">{feature}</td>
                      {cols.map((cell, i) => (
                        <td key={i} className="p-[var(--space-3)]">
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
