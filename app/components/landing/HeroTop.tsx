"use client";

import { EvidenceField } from "./EvidenceField";
import {
  HERO_TOP_CTA_PRIMARY,
  HERO_TOP_CTA_SECONDARY,
  HERO_TOP_HEADLINE,
  HERO_TOP_EYEBROW,
  HERO_TOP_BODY,
} from "@/app/lib/landing/constants";

/**
 * HeroTop — Editorial hero section (Section 1)
 *
 * Spec: CREATIVEDIRECTOR.md
 * Lumena-inspired composition: left-aligned large headline, right-side procedural
 * particle field, bottom-left evidence block.
 * Black background (#090909), white/grey narrative, Bordeaux accent <3%.
 *
 * Everything left-aligned on a 12-column grid.
 * Nothing centered. Whitespace is the design.
 */

export function HeroTop() {
  return (
    <section
      id="hero-top"
      aria-label="Hero"
      className="hero-top-field relative w-full overflow-hidden"
      style={{ backgroundColor: "#090909" }}
    >
      {/* ── Nav offset: spacer for fixed header ── */}
      <div className="hero-top-nav-offset w-full shrink-0" aria-hidden />

      {/* ── Main grid: left 7 cols (copy) + right 5 cols (particle field) ── */}
      <div className="hero-top-grid">
        {/* ── Left side: copy column ── */}
        <div className="hero-top-copy">
          {/* Eyebrow label */}
          <p className="hero-top-eyebrow">{HERO_TOP_EYEBROW}</p>

          {/* Headline — very large, left-aligned */}
          <h1
            className="hero-top-headline"
            style={{
              fontSize: "clamp(40px, 5.6vw, 88px)",
              fontWeight: 450,
              lineHeight: 1.04,
              letterSpacing: "-0.038em",
              color: "#F2F0EB",
            }}
          >
            {HERO_TOP_HEADLINE.split("\n").map((line, i) => (
              <span key={i}>
                {line}
                {i < HERO_TOP_HEADLINE.split("\n").length - 1 && <br />}
              </span>
            ))}
          </h1>

          {/* Body copy — constrained width, comfortable reading */}
          <p className="hero-top-body">{HERO_TOP_BODY}</p>

          {/* CTA pair — understated, not oversized */}
          <div className="hero-top-ctas" role="group" aria-label="Primary actions">
            <a
              href="#problem-value"
              className="hero-top-cta-primary font-sans"
              style={{
                display: "inline-flex",
                alignItems: "center",
                padding: "10px 20px",
                fontSize: "clamp(12px, 1.05vw, 14px)",
                fontWeight: 440,
                letterSpacing: "-0.01em",
                color: "#F2F0EB",
                border: "1px solid rgba(255,255,255,0.24)",
                borderRadius: "2px",
                background: "transparent",
                textDecoration: "none",
                transition:
                  "border-color 150ms cubic-bezier(0.4,0,0.2,1), background 150ms cubic-bezier(0.4,0,0.2,1)",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.borderColor = "rgba(255,255,255,0.44)";
                el.style.background = "rgba(255,255,255,0.04)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.borderColor = "rgba(255,255,255,0.24)";
                el.style.background = "transparent";
              }}
            >
              {HERO_TOP_CTA_PRIMARY}
            </a>

            <a
              href="#how-it-works"
              className="hero-top-cta-secondary font-sans"
              style={{
                display: "inline-flex",
                alignItems: "center",
                padding: "10px 20px",
                fontSize: "clamp(12px, 1.05vw, 14px)",
                fontWeight: 440,
                letterSpacing: "-0.01em",
                color: "rgba(255,255,255,0.38)",
                border: "1px solid rgba(255,255,255,0.10)",
                borderRadius: "2px",
                background: "transparent",
                textDecoration: "none",
                transition:
                  "border-color 150ms cubic-bezier(0.4,0,0.2,1), color 150ms cubic-bezier(0.4,0,0.2,1)",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.borderColor = "rgba(255,255,255,0.22)";
                el.style.color = "rgba(255,255,255,0.64)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.borderColor = "rgba(255,255,255,0.10)";
                el.style.color = "rgba(255,255,255,0.38)";
              }}
            >
              {HERO_TOP_CTA_SECONDARY}
            </a>
          </div>

          {/* Evidence block — bottom-left, two proof statements */}
          <div className="hero-top-evidence">
            <div className="evidence-item">
              <span className="evidence-indicator" aria-hidden />
              <span>71% less screening time</span>
            </div>
            <div className="evidence-item">
              <span className="evidence-indicator" aria-hidden />
              <span>Every conclusion links to commits, pull requests or tickets</span>
            </div>
          </div>
        </div>

        {/* ── Right side: EvidenceField particle visualization ── */}
        <div className="hero-top-visual" aria-hidden>
          <EvidenceField />
        </div>
      </div>
    </section>
  );
}
