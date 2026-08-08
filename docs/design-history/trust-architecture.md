3. TRUSTCandidates can add info when they will see report . It will be marked as an addition from the candidate. 
#16 
Internal Trust Architecture Document: 16Signals
Framing assumption: a hiring intelligence report is asking an experienced engineering leader to partially outsource judgment on a six-figure decision to a system with no track record. Default trust is zero, and one confidently wrong claim destroys more trust than fifty correct ones build. The architecture below is designed around that asymmetry.

Part 1 — What Creates Trust?
Why humans trust different experts:
* Senior engineers are trusted because their reasoning was witnessed over time. They show their work, they say "I'm not sure," and they've been right before in front of you. Trust is earned through visible calibration.
* Technical interviewers are trusted weakly and mostly by proxy ("I trust the person, not the method"). Notably, interview processes are widely distrusted — which is our opening, but also our warning: process-based judgment without visible evidence decays into ritual.
* Doctors are trusted through institutional credentialing, accountability, and diagnostics: the trend has moved from opinion to tests you can re-run. Second opinions are legitimate, not insulting.
* Financial auditors are trusted through published methodology, independence from the audited party, and liability. They never opine beyond what the records support — and they issue "qualified opinions" when evidence is incomplete.
* Git is trusted absolutely because it is verifiable by construction — content-addressed, deterministic. Nobody trusts Git's judgment; Git makes no judgments.
* GitHub is trusted through reliability plus the fact that your own data is visible to you — you'd catch it lying.
* Stripe Radar is trusted despite being opaque, because outcomes are measurable in money, error costs are recoverable (review queues, not silent blocks), and the merchant keeps override authority.
* Google Search is trusted for retrieval, not judgment — users verify instantly and the cost of a bad result is one click.
Universal principles extracted:
1. Trust comes from verifiability ("I can check this myself") or accountability + track record ("someone credible pays if this is wrong"). New systems have no track record — so 16Signals must be built almost entirely on verifiability.
2. Calibrated uncertainty builds more trust than confidence. The expert who says "I don't know" is believed when they say "I'm certain."
3. Reversibility and override lower the trust threshold. People rely on imperfect systems when they keep the final say and errors are catchable (Radar's model).
4. Consistency is a precondition. An expert who gives different answers to the same question on different days is not an expert.
5. Independence matters. Auditors are trusted because they don't work for the numbers they audit. 16Signals must never appear to grade toward the answer the paying customer wants.
Applied to 16Signals: we cannot borrow credentials, we have no track record, and our conclusions influence expensive decisions. Therefore every conclusion must be checkable in under a minute by the person reading it. That single requirement drives everything below.

Part 2 — The Trust Framework
Six governing principles for every report:
1. Evidence compiles upward; conclusions never float. The pipeline is architecturally one-directional: extract verifiable facts from artifacts → derive signals from facts → synthesize conclusions from signals. The system is incapable of producing a claim that isn't traceable to extracted facts — no free-form generation followed by post-hoc citation (that's how hallucinations get footnotes). V1. Trade-off: less fluent, narrower reports; some interesting-but-unsupported observations get suppressed. Correct trade.
2. Three visibly separated layers: Fact / Inference / Recommendation. "This PR refactored the auth module across 14 files" (fact) is not "candidate handles cross-cutting changes well" (inference) is not "focus the system design interview on service boundaries" (recommendation). Readers trust systems that know the difference; blending them reads as marketing. V1.
3. Calibrated confidence with refusal as a first-class outcome. (Part 4.) V1.
4. Determinism and versioning. Same evidence + same rubric version = same conclusions, re-runnable and reproducible. Every report is stamped with rubric version, model version, and an evidence-snapshot hash. V1 for stamping and consistency controls; full bit-level reproducibility can mature later. Trade-off: constrains model usage patterns (pinned models, structured generation); accepted.
5. Challengeability. Every claim can be disputed by the candidate and marked disagreed-with by the reviewer, with visible status. A report nobody can push back on is a verdict, and engineering leaders reject verdicts. V1 minimal (flag + comment), full workflow later.
6. Independence. Evidence assessment is computed identically regardless of which customer is paying or which role is open. Customization exists only at the job-fit layer (Part 6). This is the auditor principle: evidence is universal; fit is local.V1, structural.

Part 3 — Explainability
Four possible depths:
* L0 — Scores only. Fast to read, zero trust. A "7.4 maturity" with no path to the evidence is exactly what CTOs are primed to dismiss. Rejected.
* L1 — Narrative summary. Readable, but unverifiable prose is indistinguishable from confident hallucination. Rejected as a terminal level.
* L2 — Evidence-cited claims. Every claim carries inline citations that link to the actual artifacts (PRs, commits, review threads, files) or — for private-repo evidence — to the derived evidence record with artifact metadata. One click from claim to proof.
* L3 — Full reasoning trace. The derivation: which facts fed which signal, how the rubric weighted them, what was excluded and why.
Recommendation: L2 as the default reading experience, L3 available on expansion for every claim. V1 for both — L3 is nearly free if Part 2's pipeline is built correctly, because the reasoning trace is the pipeline's intermediate state, not a generated explanation.
Additional requirements:
* The Evidence Manifest. Every report opens with exactly what was analyzed (repos, time span, artifact counts) and — critically — what was not available (private work not shared, metadata-only repos). Auditors list scope limitations before findings; so do we. This preempts the most damaging skeptical question: "what did it miss?" V1.
* Uncertainty exposed per claim, not just per report (Part 4).
* Disagreement affordance on every claim — not buried in a feedback form.
Trade-off of deep explainability: it invites nitpicking. A CTO will click into a citation and argue with the assessment. This is the desired outcome — it converts a skeptical reader into an active auditor, and auditors who mostly agree become advocates. The system that hides its reasoning gets dismissed in one sentence; the system that shows it gets argued with, which is engagement.

Part 4 — Confidence & Uncertainty
Engineering leaders distrust false precision more than they distrust uncertainty. A "confidence: 87%" score with no basis reads as theater. The model:
Per-signal confidence, three tiers, each defined by evidence structure, not model vibes:
* Established — supported by multiple independent artifacts, across time, ideally socially witnessed (reviewed PRs, merged work in shared repos). Stated plainly.
* Indicative — supported by limited or homogeneous evidence (one repo, short window, solo work). Stated with explicit hedging and what would confirm it.
* Not assessable — insufficient evidence. The signal renders as "not assessable," never as a low score, with a one-line statement of what evidence would be needed and a suggested interview probe to assess it instead.
Report-level Evidence Confidence (Rich / Partial / Insufficient, carried over from the product architecture) gates what the report may contain: an Insufficient report contains no scores, no maturity level, no recommendation — only the manifest and a statement that evidence-based evaluation isn't possible for this candidate.
Quantification style: confidence is always grounded in countable facts — "based on 47 merged PRs across 3 repositories over 26 months" — rather than abstract percentages. Counts are verifiable; percentages are not.
When the system refuses: below evidence thresholds; when signals contradict each other beyond a consistency bound (surfaced as "conflicting evidence" with both sides shown, rather than silently averaged); when the role requires signals we cannot derive (e.g., EM evaluation in V1). Refusal must be designed as a respectable artifact, not an error page — the report that says "we can't assess this, here's what to probe in interviews instead" is, paradoxically, the strongest trust-builder in the entire product. All V1.

Part 5 — Human Collaboration
Design stance: the report is a working document that structures the human's investigation, not a verdict that ends it.
* The interview-as-hypothesis-testing loop (the core collaboration mechanic). Every "Indicative" signal and every "not assessable" gap generates a targeted interview question, explicitly linked to the uncertainty it resolves. The report doesn't compete with the interview — it aims it. After interviews, the reviewer marks each hypothesis confirmed/refuted in one click. This makes the report more accurate over the hiring process, gives humans a concrete validation role, and generates our calibration data (Part 6). V1 — this is the product's collaboration spine.
* Per-claim reviewer actions: agree / disagree / verified-in-interview / annotate. Disagreements don't edit the system's assessment; they sit alongside it, attributed. The record shows both the machine's view and the team's — like a code review thread. V1 minimal.
* Role-appropriate surfaces: recruiters get summary, fit, and prioritization; engineering reviewers get the full evidence layer. Same underlying report, different depth defaults — trust fails when a recruiter forwards a technical claim they can't defend. V1 simple (two views).
* Spot-check mode: a dedicated flow showing 3–5 raw artifacts side-by-side with the system's assessment of them, letting an engineer audit the judgment quality directly in minutes. This is how senior engineers actually decide whether to trust a junior's review — sample it. V1; disproportionate trust return for low build cost.

Part 6 — Learning System
Four feedback channels, treated very differently:
1. Per-claim reviewer agreement (from Part 5) — high-volume, immediate, claim-level. Primary calibration signal. V1 collection.
2. Interview-verification outcomes — did probing confirm the Indicative signals? Directly measures predictive validity of the evidence layer. V1 collection.
3. Candidate disputes — corrections of factual errors (wrong attribution, misread context) fixed with priority; disputed inferences logged and visible. Candidates are the only party who knows the ground truth of their own work; ignoring them caps accuracy. V1.
4. Hiring outcomes — treacherous and to be handled with restraint: delayed by 6–12 months, contaminated by survivorship bias (we only observe hired candidates), and polluted by the customer's own biases. Never train directly on hire/no-hire labels — that would launder customer bias into the model. Use outcomes only for aggregate calibration monitoring (are "Established" signals actually predictive?). Later.
Evolution without inconsistency: rubrics and models change only through versioned releases with changelogs; existing reports are never silently altered; a re-run under a new version is a new, labeled version of the report. Consistency isn't the absence of change — it's the absence of unexplained change. V1 discipline.
Customization boundary: organizations may adjust job-fit weighting (what matters for this role), never the evidence assessments themselves. The moment two companies can see different assessments of the same work, the evidence layer stops being an audit and becomes an opinion for hire. V1, structural.

Part 7 — Skeptical CTO Review
The questions I would ask receiving this report cold, and the architectural answers:
1. "How do I know the AI didn't make this up?" → Every claim cites artifacts; click any claim, see the PR. The pipeline cannot emit uncited claims (Part 2.1).
2. "Would it say the same thing tomorrow?" → Version-stamped, deterministic per rubric version; re-run reproduces it.
3. "What did it actually look at? What did it miss?" → Evidence Manifest, including the not-available list, on page one.
4. "Is this just measuring who has free time for OSS?" → Published banned-signals list (no streaks, volume, activity cadence); insufficient evidence is never negative.
5. "Can a candidate game this with AI-generated repos?" → Weighting toward longitudinal, socially-witnessed evidence (reviews, co-contributors, merged-into-shared-repo work); anomaly flags on synthetic-looking histories; versioned re-runs visible to employers.
6. "Why should I trust its code judgment over my senior engineers'?" → We don't ask you to. Spot-check mode: audit its judgment against artifacts yourself in five minutes. The report structures your engineers' judgment; it doesn't replace it.
7. "What's its accuracy?" → Published calibration data: reviewer agreement rates per claim type, interview-verification confirmation rates, expert-panel benchmark agreement.
8. "Prove it on someone I know." → Self-test mode: run it on your own engineers (with their consent) or yourself.The buyer evaluates the system against ground truth they already possess. This is the single highest-leverage trust feature in the product, and it should be the default first-run experience. V1, non-negotiable.
9. "Who's accountable when it's wrong?" → Dispute and correction workflow with response SLA; erratum notices on affected reports.
10. "Is it telling me what I want to hear?" → Evidence layer is customer-independent (Part 2.6); fit layer is clearly labeled as parameterized by your inputs.
Redesigns forced by this exercise: the Evidence Manifest moves to the top of the report, spot-check and self-test modes enter V1 scope, and the banned-signals list becomes a published document rather than an internal one.

Part 8 — Trust Principles (Engineering Standards)
1. No claim without a citation. If it can't be traced to an artifact, it doesn't ship. Uncited insight is indistinguishable from hallucination.
2. Refusing is better than pretending. "Insufficient evidence" is a success state of the system, not a failure state.
3. Absence of evidence is never negative evidence. The empty-GitHub candidate is unassessed, not weak. This is simultaneously our fairness, legal, and credibility firewall.
4. Separate fact, inference, and recommendation — always and visibly.
5. Same evidence, same conclusion. All change is versioned, logged, and explained; no silent drift.
6. Evidence is universal; fit is local. Customers customize what matters, never what happened.
7. Every conclusion is challengeable by both the reviewer and the candidate, and disagreement is preserved, not overwritten.
8. Humans hold final authority — structurally. The product contains no decision actions; it informs systems of record, it never operates them.
9. Confidence is counted, not felt. Certainty language must be backed by countable evidence structure (volume, independence, recency, social witness).
10. Optimize for being verified, not believed. Every design choice should shorten the path from "the system says" to "I checked."
The compounding effect: principles 1–10 make the product slower to build and more modest in its claims than a naive AI-report generator. That modesty is the moat. Anyone can generate a confident report; a system that earns the trust of people who are professionally paid to be skeptical is the thing competitors can't copy with a bigger model.
