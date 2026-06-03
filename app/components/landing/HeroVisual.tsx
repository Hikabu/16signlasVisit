import { IconCheck } from "./icons";

export function HeroVisual() {
  return (
    <div className="grid gap-3 sm:grid-cols-2" aria-hidden>
      <div className="card overflow-hidden p-4">
        <p className="mb-3 text-xs font-medium uppercase tracking-wider text-[color:var(--muted)]">Resume</p>
        <div className="space-y-2 rounded-md border border-[color:var(--border)] bg-[color:var(--surface-secondary)] p-3 text-xs leading-relaxed text-[color:var(--muted-strong)]">
          <p className="font-medium text-[color:var(--foreground)]">Senior Solidity Engineer</p>
          <p>5+ years DeFi · Led protocol migrations</p>
          <p className="text-[color:var(--muted)]">github.com/candidate · 2.4k commits</p>
        </div>
        <ul className="mt-3 space-y-2">
          {[
            "Commit inflation flagged",
            "Employment claim unverified",
            "AI pattern detected",
          ].map((flag) => (
            <li
              key={flag}
              className="flex items-start gap-2 rounded border border-red-200/80 bg-red-50 px-2 py-1.5 text-[11px] text-red-800"
            >
              <span className="mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full bg-red-500" />
              {flag}
            </li>
          ))}
        </ul>
      </div>

      <div className="card overflow-hidden border-[color:var(--accent)]/30 p-4">
        <p className="mb-3 text-xs font-medium uppercase tracking-wider text-[color:var(--accent)]">Evidence Brief</p>
        <div className="rounded-md border border-[color:var(--border)] bg-[color:var(--surface)] p-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-[color:var(--foreground)]">Signal score</span>
            <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-medium text-emerald-800">82 / 100</span>
          </div>
          <ul className="mt-3 space-y-2">
            {["P7 Authenticity verified", "Seniority: Senior (calibrated)", "Role match: Strong"].map((item) => (
              <li key={item} className="flex items-center gap-2 text-[11px] text-[color:var(--muted-strong)]">
                <span className="flex h-4 w-4 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                  <IconCheck className="h-2.5 w-2.5" />
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>
        <p className="mt-3 text-[11px] text-[color:var(--muted)]">Generated in 2m 47s · Light Mode</p>
      </div>
    </div>
  );
}
