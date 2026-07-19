"use client";

import { useState, useEffect, useRef } from "react";

/**
 * EvidenceReportSection — Section 2
 *
 * Dedicated section containing the full-screen report artifact.
 * Seamless transition using a Raycast-style scroll reveal:
 * - Card translates up (translateY) and scales up smoothly on scroll entry.
 * - IntersectionObserver starts the receipt-pull drawing animations only when visible.
 * - Background is pure black (#000) for a seamless flow with the hero section.
 */
export function EvidenceReportSection() {
  const [phase, setPhase] = useState<0 | 1 | 2 | 3>(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const animated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (!animated.current) {
            animated.current = true;
            // Trigger drawing phase animations slightly after entry transition begins
            const t1 = setTimeout(() => setPhase(1), 500);          // underline draws
            const t2 = setTimeout(() => setPhase(2), 500 + 300);    // thread draws
            const t3 = setTimeout(() => setPhase(3), 500 + 650);    // citation accent surfaces

            return () => {
              clearTimeout(t1);
              clearTimeout(t2);
              clearTimeout(t3);
            };
          }
        }
      },
      { threshold: 0.15 }
    );

    const element = sectionRef.current;
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
      observer.disconnect();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="evidence-report-section"
      aria-label="Evidence Report Section"
      className="relative w-full overflow-hidden flex flex-col items-center justify-end bg-black"
      style={{ minHeight: "100svh" }}
    >
      {/* ── Seamless Scroll Reveal Wrapper ── */}
      <div
        className="w-full flex flex-col items-center transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? "translateY(0) scale(1)" : "translateY(80px) scale(0.96)",
          willChange: "transform, opacity",
        }}
      >
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
            /* Slightly taller for the dedicated viewport section */
            height: "clamp(400px, 58vh, 600px)",
            background: "#0c0d0f",
            border: "1px solid rgba(255,255,255,0.07)",
            borderBottom: "none",
            borderRadius: "4px 4px 0 0",
            overflow: "hidden",
            /* shadow to separate from the flat dark background */
            boxShadow: "0 -4px 30px rgba(0, 0, 0, 0.6)",
          }}
        >
          {/* ── Evidence manifest strip (small monospace) ── */}
          <div
            className="font-mono flex items-center justify-between shrink-0 select-none"
            style={{
              padding: "12px 20px",
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
              padding: "18px 20px 14px",
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

            {/* ── Claim 3: Even more recessive — trails off into the fold ── */}
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

            {/* ── Monospace metadata row ── */}
            <div
              className="font-mono shrink-0 select-none"
              style={{
                marginTop: "auto",
                padding: "12px 0",
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
      </div>
    </section>
  );
}