"use client";

import { useEffect, useMemo, useState } from "react";

const scenes = [
  {
    label: "VERIFY",
    headline: "Before investing engineering time, know what is real.",
    nodes: ["GitHub", "Projects", "Contributions", "Technical History", "AI Usage", "Collaboration"],
    metrics: ["Identity linked", "Evidence mapped", "Claim surface built", "Source confidence"],
    score: "42",
  },
  {
    label: "ANALYZE",
    headline: "Independent signals reduce hiring uncertainty.",
    nodes: ["P1", "P2", "P3", "P4", "P5", "P6"],
    metrics: ["16 signals active", "Seniority calibrated", "Anomalies isolated", "Interview probes"],
    score: "78",
  },
  {
    label: "PROVE",
    headline: "Portable proof instead of assumptions.",
    nodes: ["Authenticity", "Execution", "Technical Depth", "Collaboration", "Role Fit", "Trust"],
    metrics: ["Verified profile", "Reusable proof", "Employer-ready", "Signal locked"],
    score: "94",
  },
] as const;

const LOOP_MS = 15000;
const SCENE_MS = LOOP_MS / scenes.length;

export function AnimatedResponses() {
  const [sceneIndex, setSceneIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setSceneIndex((current) => (current + 1) % scenes.length);
    }, SCENE_MS);

    return () => window.clearInterval(timer);
  }, []);

  const scene = scenes[sceneIndex];
  const signalCells = useMemo(() => Array.from({ length: 16 }, (_, index) => index), []);

  return (
    <div className="blueprint-panel min-h-[560px] p-4 md:p-6">
      <div className="relative z-10 flex h-full min-h-[520px] flex-col">
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-[color:var(--brand)] shadow-[0_0_18px_rgb(0_154_147/0.8)]" />
            <span className="font-mono text-xs uppercase tracking-[0.12em] text-white/80">Verification Engine</span>
          </div>
          <div className="font-mono text-xs text-[color:var(--muted)]">Loop 15s / Scene {sceneIndex + 1}</div>
        </div>

        <div className="grid flex-1 gap-5 py-6 xl:grid-cols-[0.72fr_1.2fr]">
          <aside className="flex flex-col justify-between gap-4">
            <div>
              <p className="section-label">{scene.label}</p>
              <h3 className="mt-4 max-w-[22ch] text-2xl font-medium leading-tight text-white">{scene.headline}</h3>
            </div>
            <div className="grid gap-2">
              {scene.metrics.map((metric, index) => (
                <div
                  key={metric}
                  className={`flex items-center justify-between rounded-[var(--radius-base)] border px-3 py-2 font-mono text-xs transition-all duration-700 ease-out ${
                    index <= sceneIndex + 1
                      ? "border-[color:var(--brand)]/40 bg-[color:var(--brand)]/8 text-white"
                      : "border-white/10 bg-white/[0.02] text-[color:var(--muted)]"
                  }`}
                >
                  <span>{metric}</span>
                  <span className="text-[color:var(--brand)]">0{index + 1}</span>
                </div>
              ))}
            </div>
          </aside>

          <div className="relative flex min-h-[300px] items-center justify-center">
            <svg className="absolute inset-0 h-full w-full text-[color:var(--brand)]" viewBox="0 0 420 360" fill="none" aria-hidden>
              {scene.nodes.map((_, index) => {
                const angle = (Math.PI * 2 * index) / scene.nodes.length - Math.PI / 2;
                const x = 210 + Math.cos(angle) * 150;
                const y = 180 + Math.sin(angle) * 118;
                return (
                  <line
                    key={index}
                    x1={x}
                    y1={y}
                    x2="210"
                    y2="180"
                    stroke="currentColor"
                    strokeWidth="1"
                    strokeDasharray="4 8"
                    style={{
                      animation: `blueprint-flow ${3.8 + index * 0.18}s ease-out infinite`,
                      animationDelay: `${index * 140}ms`,
                    }}
                  />
                );
              })}
            </svg>

            <div className="relative z-10 flex h-36 w-36 items-center justify-center rounded-[var(--radius-base)] border border-[color:var(--brand)]/50 bg-[#010506]/90 text-center shadow-[0_0_80px_rgb(0_154_147/0.12)]">
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-[color:var(--muted)]">Score</p>
                <p className="mt-1 font-mono text-5xl font-medium text-white">{scene.score}</p>
              </div>
            </div>

            {scene.nodes.map((node, index) => {
              const angle = (Math.PI * 2 * index) / scene.nodes.length - Math.PI / 2;
              const left = 50 + Math.cos(angle) * 36;
              const top = 50 + Math.sin(angle) * 32;
              return (
                <div
                  key={node}
                  className="absolute z-10 rounded-[var(--radius-base)] border border-white/12 bg-[#010506]/90 px-3 py-2 font-mono text-[11px] text-white/82 transition-all duration-700 ease-out"
                  style={{
                    left: `${left}%`,
                    top: `${top}%`,
                    transform: "translate(-50%, -50%)",
                    opacity: 0.62 + index * 0.05,
                  }}
                >
                  {node}
                </div>
              );
            })}
          </div>

          <aside className="grid gap-5 xl:col-span-2 xl:grid-cols-2">
            <div className="rounded-[var(--radius-base)] border border-white/10 bg-white/[0.025] p-4">
              <div className="flex flex-wrap items-center justify-between gap-2 font-mono text-xs text-[color:var(--muted)]">
                <span>16 Verification Signals</span>
                <span>{scene.label}</span>
              </div>
              <div className="mt-4 grid grid-cols-4 gap-2">
                {signalCells.map((cell) => (
                  <span
                    key={cell}
                    className={`aspect-square rounded-[4px] border transition-all duration-700 ease-out ${
                      cell <= sceneIndex * 5 + 5
                        ? "border-[color:var(--brand)]/60 bg-[color:var(--brand)]/20"
                        : "border-white/10 bg-white/[0.025]"
                    }`}
                  />
                ))}
              </div>
            </div>

            <div className="rounded-[var(--radius-base)] border border-white/10 bg-white/[0.025] p-4">
              <p className="font-mono text-xs uppercase tracking-[0.12em] text-[color:var(--muted)]">Output</p>
              <div className="mt-4 space-y-3">
                {["Candidate Evidence", "16 Signals", "Verification Engine", "Portable Skill Profile"].map((item, index) => (
                  <div key={item} className="flex items-center gap-3">
                    <span
                      className={`h-2 w-2 rounded-full ${
                        index <= sceneIndex + 1 ? "bg-[color:var(--brand)]" : "bg-white/18"
                      }`}
                    />
                    <span className="text-sm text-white/78">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>

        <div className="grid grid-cols-3 gap-2 border-t border-white/10 pt-4">
          {scenes.map((item, index) => (
            <button
              key={item.label}
              type="button"
              className={`h-2 rounded-full transition-colors duration-500 ${index === sceneIndex ? "bg-[color:var(--brand)]" : "bg-white/12"}`}
              aria-label={`Show ${item.label.toLowerCase()} scene`}
              onClick={() => setSceneIndex(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
