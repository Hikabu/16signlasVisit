import type { CSSProperties } from "react";
import { LargeWord } from "@/app/components/LargeWord";
import { HOW_IT_WORKS_STEPS } from "@/app/data/landing";

function StepIllustration({ index }: { index: number }) {
  return (
    <div className="timeline-illustration" aria-hidden="true">
      <div className="timeline-illustration__rail" />
      {[0, 1, 2, 3, 4].map((item) => (
        <span
          key={item}
          className="timeline-illustration__node"
          style={
            {
              "--node-left": `${16 + item * 17}%`,
              "--node-top": `${35 + (item % 2) * 24}%`,
              "--node-opacity": `${0.35 + item * 0.1}`,
              "--step-index": index,
            } as CSSProperties
          }
        />
      ))}
      <div className="timeline-illustration__brief">
        <span />
        <span />
        <span />
      </div>
    </div>
  );
}

export function HowItWorks() {
  return (
    <section id="how-it-works" className="timeline-section relative isolate overflow-clip section-transition section-edge-highlight">
      <LargeWord className="right-[-2vw] top-10">SIGNALS</LargeWord>
      <div className="container grid gap-12 lg:grid-cols-[0.72fr_1.28fr]">
        <aside className="timeline-sticky">
          <p className="section-label">How it works</p>
          <h2 className="section-title mt-4 text-white">A calmer way to hire engineers.</h2>
          <div className="timeline-track mt-10">
            <span className="timeline-track__fill" />
          </div>
        </aside>

        <div className="space-y-10 lg:space-y-16">
          {HOW_IT_WORKS_STEPS.map((step, index) => (
            <article key={step.title} className="timeline-step">
              <div>
                <p className="font-mono text-sm text-[color:var(--accent-soft)]">{step.number}</p>
                <h3 className="mt-4 max-w-xl text-3xl font-medium leading-[1.08] text-white md:text-5xl">
                  {step.title}
                </h3>
                <p className="mt-5 max-w-2xl text-lg leading-[var(--leading-body)] text-[color:var(--muted-strong)]">
                  {step.body}
                </p>
                <div className="mt-8 flex flex-wrap gap-2">
                  {step.chips.map((chip) => (
                    <span key={chip} className="rounded-[var(--radius-pill)] border border-white/10 px-3 py-1 text-xs text-white/70">
                      {chip}
                    </span>
                  ))}
                </div>
              </div>
              <StepIllustration index={index} />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
