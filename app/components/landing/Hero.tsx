"use client";

import { useState, useEffect, useRef } from "react";
import { HERO_CTA, HERO_SECONDARY_CTA } from "@/app/lib/landing/constants";

/**
 * HERO — Section 1
 *
 * Spec: SECTION.md
 * One motion event total: the receipt-pull demonstration.
 * Triggered once, 2 seconds after the frame settles. Never again.
 *
 * Sequence (~1s total):
 *  t=0ms    — underline begins drawing left→right (300ms, cubic-bezier(0.4,0,0.2,1))
 *  t=300ms  — thread draws from claim to citation marker (350ms)
 *  t=650ms  — citation marker surfaces its accent state (150ms)
 *
 * After: absolute stillness. Everything persists.
 */

export function Hero() {
  // Three discrete animation phases
  const [phase, setPhase] = useState<0 | 1 | 2 | 3>(0);
  const fired = useRef(false);

  useEffect(() => {
    if (fired.current) return;
    fired.current = true;

    const t1 = setTimeout(() => setPhase(1), 2000);          // underline draws
    const t2 = setTimeout(() => setPhase(2), 2000 + 300);    // thread draws
    const t3 = setTimeout(() => setPhase(3), 2000 + 650);    // citation accent surfaces

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  return (
    <section
      id="hero"
      aria-label="Hero"
      className="hero-field relative w-full overflow-hidden flex flex-col items-center"
      style={{ minHeight: "100svh", backgroundColor: "#08090b" }}
    >
      {/* ── Quiet zone: navigation placeholder (~12% vh) ── */}
      {/* Header sits fixed on top; this keeps content from overlapping it */}
      <div className="hero-nav-offset w-full shrink-0" aria-hidden />

      {/* ── Empty field (~18% vh) — the quiet before the statement ── */}
      <div className="hero-empty-field w-full shrink-0" aria-hidden />

      {/* ── Headline block — central 8 columns, centered ── */}
      <div
        className="hero-headline-block w-full px-4 text-center"
        style={{ maxWidth: "min(100%, 900px)" }}
      >
        <h1
          className="hero-headline font-sans text-[#e8e8e8] select-none"
          style={{
            fontSize: "clamp(32px, 5.2vw, 64px)",
            fontWeight: 560,
            lineHeight: 1.07,
            letterSpacing: "-0.033em",
            textWrap: "balance",
          }}
        >
          Software engineering changed.
          <br />
          Hiring didn&apos;t.
        </h1>

        {/* Supporting line — one short sans, visibly subordinate */}
        <p
          className="hero-sub font-sans mt-4 select-none"
          style={{
            fontSize: "clamp(13px, 1.25vw, 15px)",
            color: "rgba(255,255,255,0.36)",
            letterSpacing: "-0.01em",
            lineHeight: 1.5,
          }}
        >
          This is hiring built on the work itself.
        </p>
      </div>

      {/* ── Measured gap: larger than any gap inside the artifact ── */}
      <div className="hero-gap shrink-0" aria-hidden />

      {/* ── CTA pair — centered, quiet, found not shouted ── */}
      <div
        className="hero-ctas flex flex-row items-center justify-center gap-3"
        role="group"
        aria-label="Primary actions"
      >
        {/* Primary CTA: hairline white border, rectangular, 2px radius */}
        <a
          id="hero-cta-explore"
          href="#how-it-works"
          className="hero-cta-primary font-sans"
          style={{
            display: "inline-flex",
            alignItems: "center",
            padding: "9px 18px",
            fontSize: "clamp(11px, 1.05vw, 13px)",
            fontWeight: 450,
            letterSpacing: "-0.01em",
            color: "rgba(255,255,255,0.88)",
            border: "1px solid rgba(255,255,255,0.28)",
            borderRadius: "2px",
            background: "transparent",
            textDecoration: "none",
            transition: "border-color 150ms cubic-bezier(0.4,0,0.2,1)",
            cursor: "pointer",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.borderColor =
              "rgba(255,255,255,0.52)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.borderColor =
              "rgba(255,255,255,0.28)";
          }}
        >
          {HERO_CTA}
        </a>

        {/* Secondary CTA: even quieter — lower opacity border */}
        <a
          id="hero-cta-run"
          href="#book-call"
          className="hero-cta-secondary font-sans"
          style={{
            display: "inline-flex",
            alignItems: "center",
            padding: "9px 18px",
            fontSize: "clamp(11px, 1.05vw, 13px)",
            fontWeight: 450,
            letterSpacing: "-0.01em",
            color: "rgba(255,255,255,0.34)",
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
            el.style.color = "rgba(255,255,255,0.56)";
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget as HTMLAnchorElement;
            el.style.borderColor = "rgba(255,255,255,0.10)";
            el.style.color = "rgba(255,255,255,0.34)";
          }}
        >
          {HERO_SECONDARY_CTA}
        </a>
      </div>

      {/* ── Spacer between CTAs and artifact ── */}
      <div className="hero-artifact-spacer shrink-0" aria-hidden />

      {/* ── Report Artifact ──
          Central 10 columns (~max-w-5xl), lower 40-45% viewport height,
          bleeds off the bottom edge. No perspective, no tilt, no float.
          Document on a desk.
      ── */}
      <div
        id="hero-artifact"
        className="hero-artifact w-11/12 shrink-0 flex flex-col"
        style={{
          maxWidth: "min(100% - 2rem, 1000px)",
          /* height intentionally overflows the viewport — the bleed is the scroll motive */
          height: "clamp(360px, 46vh, 520px)",
          background: "#0c0d0f",
          border: "1px solid rgba(255,255,255,0.07)",
          borderBottom: "none",
          borderRadius: "3px 3px 0 0",
          overflow: "hidden",
          /* near-imperceptible edge treatment to separate from field */
          boxShadow: "0 -1px 0 rgba(255,255,255,0.04)",
        }}
      >
        {/* ── Evidence manifest strip (small monospace) ── */}
        <div
          className="font-mono flex items-center justify-between shrink-0 select-none"
          style={{
            padding: "10px 20px",
            borderBottom: "1px solid rgba(255,255,255,0.05)",
            fontSize: "clamp(9px, 0.9vw, 11px)",
            color: "rgba(255,255,255,0.22)",
            letterSpacing: "0.04em",
          }}
        >
          <span>MANIFEST // SOURCE: github.com/16signals/pipeline</span>
          <span className="hidden sm:inline" style={{ color: "rgba(255,255,255,0.14)" }}>
            BRANCH: main
          </span>
          <span>VERIFIED: 112 COMMITS // 2026-07-07T04:31:09Z</span>
        </div>

        {/* ── Report header ── */}
        <div
          className="shrink-0 select-none"
          style={{
            padding: "16px 20px 12px",
            borderBottom: "1px solid rgba(255,255,255,0.04)",
          }}
        >
          <div
            className="font-mono"
            style={{
              fontSize: "clamp(8px, 0.75vw, 10px)",
              color: "rgba(255,255,255,0.22)",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              marginBottom: "5px",
            }}
          >
            EVIDENCE RECORD — CANDIDATE #4812
          </div>
          <div
            className="font-sans"
            style={{
              fontSize: "clamp(12px, 1.15vw, 14px)",
              fontWeight: 450,
              color: "rgba(255,255,255,0.72)",
              letterSpacing: "-0.015em",
            }}
          >
            Verification Brief — Senior Systems Engineer
          </div>
        </div>

        {/* ── Claims list ── */}
        <div
          className="flex-1 flex flex-col overflow-hidden"
          style={{ padding: "0 20px" }}
        >
          {/* ── Claim 1: The receipt-pull subject ── */}
          <div
            className="claim-row flex items-center gap-4 py-4 select-none"
            style={{ borderBottom: "1px solid rgba(255,255,255,0.03)" }}
          >
            {/* Claim text with animated underline */}
            <div className="flex-1 relative">
              <p
                className="font-sans relative inline"
                style={{
                  fontSize: "clamp(11px, 1.05vw, 13px)",
                  fontWeight: 400,
                  color: "rgba(255,255,255,0.82)",
                  lineHeight: 1.55,
                  letterSpacing: "-0.01em",
                }}
              >
                Verified: Optimised query planner and index structure in payment-service

                {/* Hairline underline — draws left→right in 300ms */}
                <span
                  aria-hidden
                  style={{
                    position: "absolute",
                    bottom: "-1px",
                    left: 0,
                    height: "1px",
                    background: "rgba(255,255,255,0.36)",
                    width: phase >= 1 ? "100%" : "0%",
                    transition:
                      phase >= 1
                        ? "width 300ms cubic-bezier(0.4,0,0.2,1)"
                        : "none",
                  }}
                />
              </p>
            </div>

            {/* Hairline connector thread — draws in 350ms starting at t=300ms */}
            <div
              aria-hidden
              className="hidden md:block shrink-0"
              style={{ width: "clamp(40px, 8vw, 120px)", height: "1px", position: "relative" }}
            >
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "rgba(255,255,255,0.10)",
                  transformOrigin: "left center",
                  transform: phase >= 2 ? "scaleX(1)" : "scaleX(0)",
                  transition:
                    phase >= 2
                      ? "transform 350ms cubic-bezier(0.4,0,0.2,1)"
                      : "none",
                }}
              />
            </div>

            {/* Citation marker — surfaces accent at t=650ms in 150ms */}
            <button
              id="hero-citation-animated"
              aria-label="Artifact reference pr/142 — inspectable in the full report"
              className="font-mono shrink-0"
              style={{
                fontSize: "clamp(9px, 0.85vw, 11px)",
                fontWeight: 400,
                padding: "3px 8px",
                border: `1px solid ${
                  phase >= 3 ? "rgba(217,167,82,0.36)" : "rgba(255,255,255,0.08)"
                }`,
                borderRadius: "2px",
                background: phase >= 3 ? "rgba(217,167,82,0.05)" : "transparent",
                color: phase >= 3 ? "#D9A752" : "rgba(255,255,255,0.24)",
                letterSpacing: "0.02em",
                cursor: "default",
                transition:
                  "border-color 150ms cubic-bezier(0.4,0,0.2,1), color 150ms cubic-bezier(0.4,0,0.2,1), background 150ms cubic-bezier(0.4,0,0.2,1)",
              }}
              /* Hover: signals inspectability — hairline state shift only */
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLButtonElement;
                el.style.cursor = "pointer";
                if (phase >= 3) {
                  el.style.borderColor = "rgba(217,167,82,0.58)";
                } else {
                  el.style.borderColor = "rgba(255,255,255,0.16)";
                }
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLButtonElement;
                el.style.cursor = "default";
                el.style.borderColor =
                  phase >= 3 ? "rgba(217,167,82,0.36)" : "rgba(255,255,255,0.08)";
              }}
            >
              [pr/142]
            </button>
          </div>

          {/* ── Claim 2: Still — slightly recessive ── */}
          <div
            className="claim-row flex items-center gap-4 py-4 select-none"
            style={{
              borderBottom: "1px solid rgba(255,255,255,0.03)",
              opacity: 0.52,
            }}
          >
            <div className="flex-1">
              <p
                className="font-sans"
                style={{
                  fontSize: "clamp(11px, 1.05vw, 13px)",
                  fontWeight: 400,
                  color: "rgba(255,255,255,0.70)",
                  lineHeight: 1.55,
                  letterSpacing: "-0.01em",
                }}
              >
                Observed: Implemented transaction safety wrappers in auth-service
              </p>
            </div>
            <div
              aria-hidden
              className="hidden md:block shrink-0"
              style={{ width: "clamp(40px, 8vw, 120px)", height: "1px" }}
            />
            <div
              className="font-mono shrink-0"
              style={{
                fontSize: "clamp(9px, 0.85vw, 11px)",
                fontWeight: 400,
                padding: "3px 8px",
                border: "1px solid rgba(255,255,255,0.05)",
                borderRadius: "2px",
                color: "rgba(255,255,255,0.18)",
                letterSpacing: "0.02em",
              }}
            >
              [ref/78]
            </div>
          </div>

          {/* ── Claim 3: Even more recessive — trails off into the bleed ── */}
          <div
            className="claim-row flex items-center gap-4 py-4 select-none"
            style={{ opacity: 0.28 }}
          >
            <div className="flex-1">
              <p
                className="font-sans"
                style={{
                  fontSize: "clamp(11px, 1.05vw, 13px)",
                  fontWeight: 400,
                  color: "rgba(255,255,255,0.70)",
                  lineHeight: 1.55,
                  letterSpacing: "-0.01em",
                }}
              >
                Verified: Comprehensive error boundary tests for webhook consumers
              </p>
            </div>
            <div
              aria-hidden
              className="hidden md:block shrink-0"
              style={{ width: "clamp(40px, 8vw, 120px)", height: "1px" }}
            />
            <div
              className="font-mono shrink-0"
              style={{
                fontSize: "clamp(9px, 0.85vw, 11px)",
                fontWeight: 400,
                padding: "3px 8px",
                border: "1px solid rgba(255,255,255,0.04)",
                borderRadius: "2px",
                color: "rgba(255,255,255,0.14)",
                letterSpacing: "0.02em",
              }}
            >
              [test/92]
            </div>
          </div>

          {/* ── Monospace metadata row — timestamps, below claims ── */}
          <div
            className="font-mono shrink-0 select-none"
            style={{
              marginTop: "auto",
              padding: "10px 0",
              borderTop: "1px solid rgba(255,255,255,0.03)",
              fontSize: "clamp(8px, 0.75vw, 10px)",
              color: "rgba(255,255,255,0.14)",
              letterSpacing: "0.04em",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "12px",
            }}
          >
            <span>REF: 16S-EVD-4812-A</span>
            <span className="hidden sm:inline">PIPELINE: v3.1.4</span>
            <span>RUN: 2026-07-07T04:31:09Z</span>
          </div>
        </div>
      </div>
      {/* The artifact bleeds off the bottom edge — this is intentional */}
    </section>
  );
}