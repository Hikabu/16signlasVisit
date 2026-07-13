import { ShiftEvidenceBand } from "./ShiftEvidenceBand";

export function Shift() {
  return (
    <section className="shift-section" id="the-shift" aria-labelledby="shift-heading">
      <div className="shift-editorial-column">
        <h2 id="shift-heading">
          Engineering work became the most documented profession in history.
          <span>Hiring still evaluates engineers as if that record doesn&apos;t exist.</span>
        </h2>
        <p className="shift-evidence-line">
          commits <i aria-hidden>·</i> reviews <i aria-hidden>·</i> deployments <i aria-hidden>·</i> pull requests <i aria-hidden>·</i> discussions <i aria-hidden>·</i> ownership <i aria-hidden>·</i> timestamps <i aria-hidden>·</i> production history
        </p>
      </div>
      <ShiftEvidenceBand />
    </section>
  );
}
