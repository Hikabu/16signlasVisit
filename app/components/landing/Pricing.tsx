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
    cta: "Try Deep free for 3 candidates",
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
    <section id="pricing" className="bg-[color:var(--surface)] py-20 md:py-24">
      <Container>
        <SectionTitle className="max-w-[40ch]">
          A mis-hire costs $150K. A verification costs less than your team&apos;s cheapest sprint.
        </SectionTitle>
        <p className="body-md mt-4 max-w-[62ch]">
          A senior mis-hire at a Web3 protocol costs $80–180K when you account for recruiting fees, salary, remediation
          time, velocity loss, and re-hiring. One avoided bad hire pays for a full year of {PRODUCT_NAME}.
        </p>

        <div className="mt-12 rounded-lg border border-[color:var(--border)] bg-[color:var(--surface-secondary)] p-6 md:p-8">
          <h3 className="text-base font-medium text-[color:var(--foreground)]">What does one avoided mis-hire get you?</h3>
          <label className="mt-6 block text-sm text-[color:var(--muted)]" htmlFor="hires-slider">
            Senior hires per year: <span className="font-medium text-[color:var(--foreground)]">{hiresPerYear}</span>
          </label>
          <input
            id="hires-slider"
            type="range"
            min={1}
            max={12}
            value={hiresPerYear}
            onChange={(e) => setHiresPerYear(Number(e.target.value))}
            className="mt-3 w-full max-w-md accent-[color:var(--accent)]"
          />
          <ul className="mt-6 grid gap-3 text-sm sm:grid-cols-3">
            <li>
              <span className="text-[color:var(--muted)]">Cost-of-risk exposure</span>
              <p className="text-lg font-medium">${roi.exposure.toLocaleString()}</p>
            </li>
            <li>
              <span className="text-[color:var(--muted)]">Deep annual cost</span>
              <p className="text-lg font-medium">${roi.annualProduct.toLocaleString()}</p>
            </li>
            <li>
              <span className="text-[color:var(--muted)]">Breakeven (mis-hires avoided)</span>
              <p className="text-lg font-medium">{roi.breakeven}</p>
            </li>
          </ul>
        </div>

        <p className="section-label mt-14">Pick the depth you need</p>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {tiers.map((tier) => (
            <article
              key={tier.name}
              className={`card relative flex flex-col p-6 ${
                tier.highlight ? "border-2 border-[color:var(--accent)]" : ""
              }`}
            >
              {tier.badge && (
                <span className="absolute -top-3 left-4 rounded-full bg-[color:var(--accent)] px-3 py-0.5 text-[11px] font-medium text-white">
                  {tier.badge}
                </span>
              )}
              <h3 className="text-lg font-medium">{tier.name}</h3>
              <p className="mt-2">
                <span className="text-2xl font-medium">{tier.price}</span>
                <span className="text-sm text-[color:var(--muted)]">{tier.period}</span>
              </p>
              <p className="mt-4 flex-1 text-sm leading-relaxed text-[color:var(--muted-strong)]">{tier.description}</p>
              <a
                href={tier.href}
                className={`mt-6 inline-flex min-h-[40px] items-center justify-center rounded-full px-4 text-sm font-medium ${
                  tier.highlight ? "btn-primary w-full" : "btn-dark w-full"
                }`}
              >
                {tier.cta}
              </a>
            </article>
          ))}
        </div>

        <div className="mt-10">
          <button
            type="button"
            className="flex w-full items-center justify-between gap-2 rounded-lg border border-[color:var(--border)] px-4 py-3 text-sm font-medium"
            aria-expanded={tableOpen}
            onClick={() => setTableOpen((o) => !o)}
          >
            Compare all features
            <IconChevronDown className={`transition ${tableOpen ? "rotate-180" : ""}`} />
          </button>
          {tableOpen && (
            <div className="mt-2 overflow-x-auto rounded-lg border border-[color:var(--border)]">
              <table className="w-full min-w-[480px] text-left text-sm">
                <thead>
                  <tr className="border-b border-[color:var(--border)] bg-[color:var(--surface-secondary)]">
                    <th className="p-3 font-medium">Feature</th>
                    <th className="p-3 font-medium">Light</th>
                    <th className="p-3 font-medium">Deep</th>
                    <th className="p-3 font-medium">Protocol</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonRows.map(([feature, ...cols]) => (
                    <tr key={feature} className="border-b border-[color:var(--border)] last:border-0">
                      <td className="p-3 text-[color:var(--muted-strong)]">{feature}</td>
                      {cols.map((cell, i) => (
                        <td key={i} className="p-3">
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
