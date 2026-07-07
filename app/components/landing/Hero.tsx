"use client";

import { useState, useEffect } from "react";
import { HERO_CTA, HERO_SECONDARY_CTA } from "@/app/lib/landing/constants";

export function Hero() {
  const [isTriggered, setIsTriggered] = useState(false);

  useEffect(() => {
    // Start the receipt-pull animation sequence 2 seconds after the page settles
    const timer = setTimeout(() => {
      setIsTriggered(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      className="relative w-full h-[100svh] min-h-[650px] overflow-hidden flex flex-col items-center justify-between text-[#e6e6e6]"
      style={{ backgroundColor: "#07080a" }}
    >
      {/* Navigation Quiet Zone Offset (~12% viewport height) */}
      <div className="h-[12vh] min-h-[64px] w-full shrink-0" />

      {/* Content Area */}
      <div className="flex-grow flex flex-col items-center justify-start w-full px-4 select-none">
        {/* Empty Field Space (~18% of viewport height) */}
        <div className="h-[6vh] md:h-[18vh] shrink-0" />

        {/* Headline Block (Centered, Central 8 Columns => max-w-4xl) */}
        <div className="w-full max-w-4xl text-center px-4">
          <h1
            className="font-sans font-semibold tracking-tight text-white leading-[1.08]"
            style={{
              fontSize: "clamp(34px, 5.5vw, 68px)",
              letterSpacing: "-0.03em",
            }}
          >
            Software engineering changed.
            <br />
            Hiring didn&apos;t.
          </h1>
          <p className="mt-4 font-sans text-sm md:text-base text-[#9c9c9d] tracking-tight">
            This is hiring built on the work itself.
          </p>
        </div>

        {/* Measured Gap (larger than gaps inside artifact) */}
        <div className="h-[4vh] md:h-[6vh] shrink-0" />

        {/* CTA Pair (Centered) */}
        <div className="flex flex-row items-center justify-center gap-4 w-full">
          <a
            id="hero-cta-explore"
            href="#how-it-works"
            className="px-5 py-2.5 text-xs md:text-sm font-sans font-medium tracking-tight rounded-[2px] border border-white/80 text-white bg-transparent transition-[border-color,opacity] duration-150 ease-out hover:border-white hover:opacity-90 active:scale-[0.98]"
          >
            {HERO_CTA}
          </a>
          <a
            id="hero-cta-run"
            href="#book-call"
            className="px-5 py-2.5 text-xs md:text-sm font-sans font-medium tracking-tight rounded-[2px] border border-white/20 text-white/50 bg-transparent transition-[border-color,text-color] duration-150 ease-out hover:border-white/40 hover:text-white/70 active:scale-[0.98]"
          >
            {HERO_SECONDARY_CTA}
          </a>
        </div>
      </div>

      {/* Report Artifact (Centered, Central 10 Columns => max-w-5xl, lower 40-45% height => h-[42vh], bleeding off bottom edge) */}
      <div className="w-11/12 max-w-5xl h-[42vh] relative overflow-hidden bg-[#0e1012] border-t border-x border-white/10 rounded-t-[4px] shadow-[rgba(0,0,0,0.5)_0px_8px_32px] flex flex-col shrink-0">
        {/* Manifest strip (small monospace) */}
        <div className="w-full flex items-center justify-between px-5 py-3 border-b border-white/5 text-[10px] md:text-xs font-mono text-[#9c9c9d]/50 select-none">
          <span>MANIFEST // SOURCE: github.com/16signals/pipeline</span>
          <span className="hidden sm:inline">BRANCH: main</span>
          <span>VERIFIED: 112 COMMITS // DATE: 2026-07-07</span>
        </div>

        {/* Report Card content */}
        <div className="flex-1 p-6 md:p-8 flex flex-col gap-6 overflow-hidden">
          {/* Report Title / Label */}
          <div className="flex flex-col gap-1 select-none">
            <span className="text-[10px] font-mono tracking-widest text-[#9c9c9d]/40 uppercase">EVIDENCE RECORD</span>
            <h3 className="text-base font-sans font-medium text-white/90">Verification Brief — Candidate #4812</h3>
          </div>

          {/* Claims List */}
          <div className="flex flex-col gap-4">
            {/* Claim 1: Animated Receipt Pull */}
            <div className="flex flex-row items-center justify-between gap-4 py-2 border-b border-white/[0.02]">
              <div className="flex-1 relative py-1">
                <p className="text-xs md:text-sm font-sans text-white/90 leading-relaxed relative inline-block select-none">
                  Verified: Optimised db queries and index structure in payment-service
                  {/* Underline hairline */}
                  <span
                    className="absolute bottom-0 left-0 h-[1px] bg-white/40 transition-[width] duration-[300ms] ease-out"
                    style={{
                      width: isTriggered ? "100%" : "0%",
                    }}
                  />
                </p>
              </div>

              {/* Hairline Connector Thread */}
              <div className="flex-1 hidden md:block h-[1px] relative overflow-hidden">
                <div
                  className="absolute inset-0 bg-white/10 origin-left transition-transform duration-[350ms] ease-out"
                  style={{
                    transform: isTriggered ? "scaleX(1)" : "scaleX(0)",
                    transitionDelay: "300ms",
                  }}
                />
              </div>

              {/* Citation Marker */}
              <div
                id="hero-citation-animated"
                className="font-mono text-[10px] md:text-xs border px-2.5 py-0.5 rounded-[2px] select-none transition-all duration-[150ms] ease-out"
                style={{
                  borderColor: isTriggered ? "rgba(217, 167, 82, 0.4)" : "rgba(255, 255, 255, 0.1)",
                  color: isTriggered ? "#D9A752" : "rgba(255, 255, 255, 0.4)",
                  backgroundColor: isTriggered ? "rgba(217, 167, 82, 0.05)" : "transparent",
                  transitionDelay: "650ms",
                }}
              >
                [pr/142]
              </div>
            </div>

            {/* Claim 2: Still (no animation) */}
            <div className="flex flex-row items-center justify-between gap-4 py-2 border-b border-white/[0.02] opacity-60">
              <div className="flex-1">
                <p className="text-xs md:text-sm font-sans text-white/80 leading-relaxed select-none">
                  Observed: Implemented transaction safety wrappers in auth-service
                </p>
              </div>

              <div className="flex-1 hidden md:block h-[1px]" />

              <div className="font-mono text-[10px] md:text-xs border border-white/5 px-2.5 py-0.5 rounded-[2px] text-white/20 select-none">
                [ref/78]
              </div>
            </div>

            {/* Claim 3: Still (no animation) */}
            <div className="flex flex-row items-center justify-between gap-4 py-2 border-b border-white/[0.02] opacity-40">
              <div className="flex-1">
                <p className="text-xs md:text-sm font-sans text-white/80 leading-relaxed select-none">
                  Verified: Wrote comprehensive error boundary tests for webhook consumers
                </p>
              </div>

              <div className="flex-1 hidden md:block h-[1px]" />

              <div className="font-mono text-[10px] md:text-xs border border-white/5 px-2.5 py-0.5 rounded-[2px] text-white/20 select-none">
                [test/92]
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
