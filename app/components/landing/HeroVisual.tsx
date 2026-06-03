import { IconCheck } from "./icons";

export function HeroVisual() {
  return (
    <div className="grid gap-[var(--space-3)] sm:grid-cols-2" aria-hidden>
      <div className="card overflow-hidden p-[var(--space-4)]">
        <p className="section-label mb-[var(--space-3)]">Resume</p>
        <div className="space-y-2 rounded-[var(--radius-base)] border border-[color:var(--border)] bg-[color:var(--surface-secondary)] p-[var(--space-3)] text-xs leading-relaxed text-[color:var(--muted-strong)]">
          <p className="font-medium text-[color:var(--foreground)]">Senior Solidity Engineer</p>
          <p>5+ years DeFi · Led protocol migrations</p>
          <p className="text-[color:var(--muted)]">github.com/candidate · 2.4k commits</p>
        </div>
        <ul className="mt-[var(--space-3)] space-y-2">
          {[
            "Commit inflation flagged",
            "Employment claim unverified",
            "AI pattern detected",
          ].map((flag) => (
            <li
              key={flag}
              className="flex items-start gap-2 rounded-[var(--radius-base)] border border-[color:var(--danger-border)] bg-[color:var(--danger-muted)] px-2 py-1.5 text-[11px] text-[color:var(--danger)]"
            >
              <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[color:var(--danger)]" />
              {flag}
            </li>
          ))}
        </ul>
      </div>

      <div className="card overflow-hidden border-[color:var(--brand)]/25 p-[var(--space-4)]">
        <p className="section-label mb-[var(--space-3)] text-[color:var(--brand)]">Evidence Brief</p>
        <div className="rounded-[var(--radius-base)] border border-[color:var(--border)] bg-[color:var(--surface)] p-[var(--space-3)]">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-[color:var(--foreground)]">Signal score</span>
            <span className="rounded-full bg-[color:var(--success-muted)] px-2 py-0.5 text-xs font-medium text-[color:var(--success)]">
              82 / 100
            </span>
          </div>
          <ul className="mt-[var(--space-3)] space-y-2">
            {["P7 Authenticity verified", "Seniority: Senior (calibrated)", "Role match: Strong"].map((item) => (
              <li key={item} className="flex items-center gap-2 text-[11px] text-[color:var(--muted-strong)]">
                <span className="flex h-4 w-4 items-center justify-center rounded-full bg-[color:var(--success-muted)] text-[color:var(--success)]">
                  <IconCheck className="h-2.5 w-2.5" />
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>
        <p className="mt-[var(--space-3)] text-[11px] text-[color:var(--muted)]">Generated in 2m 47s · Light Mode</p>
      </div>
    </div>
  );
}
