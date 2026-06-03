# Landing Page Design Strategy — Conversion-Centered Design Brief
**Product:** Skills Verification & Proof-of-Work Hiring Layer for Web3 Teams  
**Framework:** Conversion-Centered Design (CCD) — 7 Principles Applied  
**Audience:** Problem Aware — Heads of Engineering, CTOs, Technical Hiring Leads at Web3 protocols  
**Model:** B2B SaaS  
**Document type:** Design + Copy Strategy Handoff

---

## How to Read This Document

Each section below follows the same structure:

- **CCD Principles Applied** — which of the 7 principles govern the section's design decisions
- **Strategic Rationale** — the psychological, UX, and persuasion reasoning behind every recommendation
- **Copy Direction** — headline, subheadline, and body copy recommendations with multiple angle options
- **Visual Execution Notes** — layout, component, and interaction specifications for design and engineering handoff
- **Primary CTA** — the single conversion action the section drives toward

---

## Section 1 — Navigation / Header

**CCD Principles:** Focus · Friction Reduction · Consistency

### Strategic Rationale

For a Problem Aware B2B buyer like Marcus (Head of Engineering, Web3 protocol), the nav serves three functions: orientation, signal of credibility, and lowest-friction path to the offer. This audience scans nav links as a first trust signal — the label choices communicate whether the product understands their world. A nav that says "Solutions / Resources / Partners" reads like a legacy HR software company. A nav that says "How it works / Verification / For Web3 teams" reads like it was built by engineers who understand the domain.

Attention ratio in the header must be 1:1. Only one action should be visually weighted as primary. Every additional competing link reduces the probability Marcus takes the intended first step.

### Copy Direction

**Logo / Brand:** Product name only. No tagline in the nav — the hero does that work.

**Nav Links (recommended order — left to right):**

- How it works
- Verification layer
- For Web3 teams
- Pricing

**Primary CTA — three angle options:**

| Angle | CTA Label | Rationale |
|---|---|---|
| A — Low friction, proof-first | See a verified candidate brief | Lets the product demonstrate value before asking for commitment. Marcus clicks this over "Start free trial" every time. |
| B — Irony / contrast | Run your first verification free | Frames the action as experiencing the product, not buying a subscription. |
| C — Time efficiency | See how it works in 2 minutes | Sets a minimal time commitment and mirrors the sub-3-minute Evidence Brief promise embedded in the product. |

**Recommended:** Angle A — "See a verified candidate brief" as the primary nav CTA. It is the lowest-friction, highest-curiosity offer for a Problem Aware buyer who does not yet know a solution exists in this exact form.

### Visual Execution Notes

- **Layout:** Sticky nav. Transparent on hero entry, solid background on scroll. Height: 56–64px.
- **CTA placement:** Far right. High contrast fill button — the only element in the nav with a fill color.
- **All other links:** Text only, muted weight, no fill.
- **Mobile:** Collapse all nav links into a hamburger at ≤768px. CTA button persists as a floating fixed element at bottom of viewport on mobile — do not hide it.
- **Attention ratio:** 1:1 — one primary action. No secondary CTA in the nav.
- **Component suggestion:** Sticky header with single solid-fill CTA button and transparent background variant.

---

## Section 2 — Hero (Above the Fold)

**CCD Principles:** Focus · Structure · Benefits · Attention · Trust

### Strategic Rationale

The hero has one job: achieve message-market fit in under 5 seconds. For a Problem Aware buyer, this means the headline must name the problem they are already experiencing — not introduce a solution they have not yet searched for. The moment Marcus reads the headline and thinks "that is exactly what I am dealing with," the page has earned the next scroll.

The structure follows a strict hierarchy: Headline (names the problem) → Subheadline (frames the promise and mechanism) → Social Proof Hook (establishes credibility before the CTA) → CTA (single action). The hero image or visual must communicate the outcome, not the interface.

### Copy Direction

**Option A — The Irony Frame (recommended for Web3 audience)**

> **Headline:** Your protocol is trustless. Your hiring still runs on trust-me resumes.
>
> **Subheadline:** AI-inflated CVs pass every ATS. Interview loops burn 40+ engineering hours. You still don't know if they can actually ship. [Product] is a verification layer that surfaces real proof of work — so you see exactly who you're hiring before the first call.
>
> **Social Proof Hook (below subheadline, before CTA):** Used by engineering leads at [Protocol A], [Protocol B], and [Protocol C] to verify 1,200+ candidates.
>
> **Primary CTA:** Verify your next candidate free

**Option B — The Cost-of-Wrong-Hire Frame**

> **Headline:** A bad senior hire costs $150K and 6 months of team velocity. We stop it before the first interview.
>
> **Subheadline:** Most hiring failures are predictable. The signals were there — buried under polished CVs and coached interview answers. [Product] surfaces them automatically: AI inflation detection, commit authenticity, seniority verification, and role-match scoring — all before you spend a minute of your team's time.
>
> **Primary CTA:** See a sample Evidence Brief

**Option C — The Signal/Noise Frame**

> **Headline:** 200 applicants. 3 minutes each. Zero noise.
>
> **Subheadline:** Every applicant gets a verified Evidence Brief: real work authenticated, AI patterns detected, seniority calibrated, employment confirmed. Ranked by signal strength — not keyword match. You see the top 5 worth calling before your morning standup.
>
> **Primary CTA:** Process your backlog free

**Recommended:** Option A. The Web3 irony frame creates immediate resonance through a contradiction Marcus already feels but has not articulated. It earns attention through recognition, not through a claim.

### Visual Execution Notes

- **Layout:** Z-pattern. Headline top-left → Subheadline below → Visual right → CTA bottom-left, visually distinct.
- **Hero visual (Option A):** Split-screen static image. Left side: a polished CV with red flag annotations overlaid (commit inflation flagged, employment claim flagged, AI pattern flagged). Right side: clean Evidence Brief card with green verification ticks and signal score. No stock photography. No human faces. Purely UI-native.
- **Hero visual (Option B):** Animated timeline: "Resume received → Evidence Brief generated (2m 47s) → 4 red flags surfaced → Interview scope narrowed to 3 targeted questions." Crossed-out "interview call" visual showing eliminated sessions.
- **Hero visual (Option C):** A stack of 200 CV cards collapsing into a ranked list of 5 verified candidate cards. Number "200" to "5" does the visual work.
- **CTA button:** Full-width on mobile, fixed width on desktop. Accent color — used exclusively here and nowhere else above the fold.
- **Social proof positioning:** Place immediately below the CTA, not above it. Above the CTA creates distraction before the action. Below reinforces the decision after consideration.
- **Typography:** Headline 48–56px, weight 600. Subheadline 18–20px, weight 400, line-height 1.7. No hero body copy beyond 2 sentences.

---

## Section 3 — Value Proposition

**CCD Principles:** Structure · Benefits · Consistency

### Strategic Rationale

The Value Proposition section bridges the emotional hook from the hero to the logical proof in the feature section. The structure must follow a Problem → Benefit → Emotional Payoff pattern for each block. This is not a feature list — it is a translation layer between Marcus's pain and the product's mechanism.

For a Problem Aware B2B buyer, the most powerful value proposition format is one that names his exact problem in the problem column and then delivers a named, specific mechanism as the benefit — not a vague outcome promise. "We detect AI inflation" is weak. "Commit inflation detection, code laundering check, and LLM-based style discontinuity analysis flag AI-generated portfolios before you open them" is specific enough to be trusted.

Each block should close with a short emotional payoff line — not a marketing tagline but a consequence statement: what does solving this problem actually mean for Marcus's day, team, or sleep schedule.

### Copy Direction

**Option A — Three-Block Pain-to-Payoff Grid**

**Block 1: AI Noise**
- Problem: AI-generated applications flood your pipeline. You cannot tell real builders from well-prompted ChatGPT.
- Benefit: AI Authenticity Detection flags generation patterns, style discontinuity, and commit inflation before you open the CV.
- Emotional payoff: You stop wasting time on candidates who can write about building — and start only talking to candidates who have.

**Block 2: Expensive First Interviews**
- Problem: First technical interviews cost 90 minutes of senior engineering time. Most should not happen.
- Benefit: Deep Mode generates role and stack match scoring, red flags with interview probes, and seniority calibration before the call.
- Emotional payoff: Your first technical conversation has a specific agenda. You already know where to push.

**Block 3: Seniority Inflation**
- Problem: Mid-levels slide through as seniors. You do not find out until they are 3 months in and cannot lead a sprint.
- Benefit: Seniority-adjusted primitive weighting and Systems Evolution trajectory analysis gives an honest level assessment independent of the CV's self-description.
- Emotional payoff: You hire the level you need — not the level someone claimed.

**Option B — Single Narrative Block ("The Verification Layer")**

> Every other part of your stack runs on verifiable truth. On-chain data is immutable. Commit history is signed. Code either passes the test suite or it does not.
>
> Hiring has always been the exception — a social ritual built on self-reported claims, coached answers, and HR job posts that do not reflect what you actually need.
>
> [Product] closes the gap. It is a verification layer that sits between a candidate's claims and your decision — authenticating real work, flagging AI inflation, confirming employment history, and calibrating seniority against what the role demands.
>
> The result: you make hiring decisions the same way you make every other technical decision. On proof, not promises.

**Option C — Before / After Contrast (Dimensionalized)**

| Before [Product] | After [Product] |
|---|---|
| 200 CVs, manual screen, 20 phone screens, 8 technicals, 2 offers, 1 maybe-right hire | 200 CVs, Evidence Brief per candidate (sub-3 min), ranked top 5, 3 targeted technicals, 1 verified hire |
| 40+ engineering hours per hire cycle on interviews that should have been a 3-minute report | Engineering time spent only on candidates who passed a verification threshold |
| Seniority, authenticity, AI usage — all invisible until 3 months in | Every interview opens with a probe list, red flags pre-surfaced, role match already scored |

**Recommended:** Option A for visual execution (three cards). Option B as a narrative block above the cards to set context. They can and should coexist in sequence.

### Visual Execution Notes

- **Layout:** Three equal-width cards in a horizontal row on desktop. Stack vertically on mobile.
- **Each card structure:** Problem statement (muted, smaller text) → thin divider → Benefit (full weight, product mechanism) → thin divider → Emotional payoff (italic or distinct color, final line).
- **Icon treatment:** A single Tabler outline icon per card anchors the problem visually (examples: `ti-alert-triangle` for AI noise, `ti-clock` for interview waste, `ti-trending-up` for seniority calibration). No decorative icon overload.
- **Background:** Section background slightly off-white (secondary surface) to visually separate from the hero. Cards on white with a 0.5px border.
- **Do not bold mid-sentence.** All emphasis is structural (position, size, weight on headings only).

---

## Section 4 — Feature Overview / Demo

**CCD Principles:** Benefits · Attention · Friction Reduction · Structure

### Strategic Rationale

This section is where emotion converts to logic. Marcus has felt recognized (hero), had his pain bridged to a promise (value prop), and now needs to understand the mechanism well enough to trust it. The demo section must show how the product actually works — not describe it in abstract terms.

For B2B buyers with technical evaluator profiles, a video walkthrough or annotated screenshot is significantly more persuasive than prose explanations. The goal is to let the product create its own conviction. The copy in this section is framing, not explanation — the demo artifact does the work.

The Light Mode / Deep Mode architecture is a strong structural frame here. It maps to two distinct buyer pain states: volume (Light Mode) and precision (Deep Mode). Lead with the pairing as a concept before diving into either.

### Copy Direction

**Option A — Two-Mode Narrative Frame**

> **Section headline:** Two speeds. One pipeline. No wasted interviews.
>
> **Light Mode:** Process your full applicant backlog. Sub-3-minute Evidence Brief per candidate. Ranked by signal, authenticity pre-filtered, AI patterns flagged. You start every week knowing exactly who is worth your team's time.
>
> **Deep Mode:** For candidates who make the cut. Full role and stack fit scoring, seniority calibration, interview intelligence with specific probes per red flag. You walk into the first technical call knowing more about this candidate than they expect.

**Option B — Step-by-Step Card Flow**

> **Section headline:** From CV to verified brief in under 3 minutes.
>
> Step 1 — Submit: Upload a CV or paste a link. No ATS integration required.  
> Step 2 — Verify: P7 authenticity check, 3-rung employment verification, AI generation analysis, commit history analysis runs automatically.  
> Step 3 — Read: Evidence Brief delivered. Signal score, red flags, interview probes, role-match, and AI leverage quality on one page.  
> Step 4 — Decide: You know what you are hiring before the first call. Not after it.

**Option C — Problem-Led Feature Reveal**

> **Section headline:** We built a fix for every way hiring lies to you.
>
> - AI-inflated CVs → Commit inflation detection + LLM style discontinuity analysis
> - Employment claims you cannot verify → 3-rung verification: email domain, org membership, contribution fingerprint
> - Seniority inflation → Seniority-adjusted primitive weighting + Systems Evolution trajectory
> - 200 applicants eating TA bandwidth → Light Mode batch processing + ranked output
> - Expensive first interviews → Deep Mode interview intelligence + Section E/F/D reports
> - No signal on AI tool usage → P6 AI Leverage Quality + configuration file detection

**Recommended:** Combine Option A as the section headline and framing, with Option C as an annotated feature list below the demo video or screenshot. Option B works well as the video walkthrough chapter structure.

### Visual Execution Notes

- **Primary demo asset:** A short (60–90 second) screen recording showing the full flow: CV uploaded → Evidence Brief generated → red flags surfaced → interview probes displayed. No voiceover needed — on-screen annotation text is sufficient for this audience.
- **If video is not yet available:** Use an annotated screenshot of the Evidence Brief with labeled callouts pointing to each section (Signal Score, P7 Authenticity, Seniority Rating, Interview Probes, Role Match, AI Leverage). Each callout links to the relevant feature description.
- **Step cards (Option B layout):** Horizontal numbered steps on desktop. Each step is a card with a step number, short heading, and single line of copy. No paragraphs per step.
- **CTA placement:** One CTA at the bottom of the section only. "Watch a 90-second walkthrough" or "See a real Evidence Brief." Do not place CTAs between demo steps — it interrupts the logical flow.
- **Background:** Keep this section on white. The demo asset needs maximum contrast.

---

## Section 5 — Social Proof and Results

**CCD Principles:** Trust · Consistency · Attention

### Strategic Rationale

Marcus is a skeptic by default. He has been burned by tools that promised signal and delivered noise. He has paid a recruiter $18K for one acceptable placement. He will not extend trust to a product based on polished marketing copy alone.

The most credible social proof for this buyer profile is: quantified outcomes from peer-level operators at comparable organizations, in their own language, describing a specific situation he recognizes. Generic five-star reviews are not just unhelpful — they actively reduce trust because Marcus knows they are curated. A case study that describes a bad hire he would have recognized, caught by a specific mechanism in the product, is worth fifty testimonial quotes.

Logo carousels are appropriate only if the logos are genuinely recognizable to the Web3 engineering audience. A carousel of unknown protocol names adds no credibility. If logo recognition is low, replace with metric-only proof blocks.

### Copy Direction

**Option A — Metric-Led Proof (recommended lead format)**

> **Section headline:** What teams measure after switching.

Metric blocks:
- 60% reduction in first-round interview volume without missing a single strong hire — [Protocol Name], 12-person engineering team
- 3 hours saved per open role per week in manual CV screening — [Protocol Name]
- $0 spent on recruiter fees in Q3 — all 4 hires sourced and verified in-house — [Protocol Name]
- 2 mis-hires identified and avoided in 6 months based on Evidence Brief red flags that would have passed a standard interview — [Protocol Name]

**Option B — Peer Voice Testimonials**

> "We hired a 'senior' Solidity developer who turned out to be a mid. Cost us a full audit cycle. The seniority calibration in [Product] would have caught it in the Evidence Brief." — Head of Engineering, [Protocol]

> "The AI detection alone was worth it. We had 3 candidates in our last batch whose GitHub looked real but the commit style analysis flagged heavy AI laundering. All three failed the deep technical when we tested them live." — CTO, [Protocol]

> "I used to spend Sunday nights reviewing CVs. Now I read 5 Evidence Briefs on Monday morning and have my shortlist before standup." — Engineering Lead, [Protocol]

**Option C — Case Study Micro-Format**

> **Section headline:** One hire. The full picture.
>
> **Situation:** DeFi protocol, 2 open senior engineer roles, 180 applicants in 3 weeks. Team had no dedicated TA. CTO was personally reviewing CVs on weekends.
>
> **What they used:** Light Mode batch run on all 180 → 12 passed authenticity threshold → Deep Mode on top 12 → 4 selected for first technical.
>
> **Result:** 2 hires made in 19 days. Both passed 90-day performance review. CTO reclaimed 11 hours per week.
>
> **What the Evidence Brief caught:** 2 AI-laundered portfolios, 1 seniority inflation (mid presented as senior), 1 employment claim that did not survive 3-rung verification.

**Recommended:** Lead with Option A (metric blocks) for immediate scannable credibility, followed by one Option B testimonial quote, with a link to the full Option C case study. This layering serves both fast-scanners (Marcus in decision mode) and deep-readers (Marcus in validation mode).

### Visual Execution Notes

- **Metric blocks:** 4-across grid on desktop, 2-across on tablet, single column on mobile. Each block: large number or stat on top (24px, weight 500), descriptive label below (13px, muted), source protocol in smallest text at bottom.
- **Testimonial cards:** Single quote per card. Include name, title, and protocol name. Do not use stock avatar photos — initials circles only. No star ratings — this audience does not trust stars on B2B tools.
- **Logo carousel:** Only use if logos are recognizable to Web3 engineering audience. Use muted (desaturated) logos on a secondary background. 6–10 logos maximum. If fewer than 5 recognizable logos are available, omit the carousel entirely and lead with metrics.
- **Case study CTA:** "Read the full case study" linked to a dedicated page, not a modal.

---

## Section 6 — Feature Deep Dive

**CCD Principles:** Structure · Benefits · Trust

### Strategic Rationale

This section exists for Marcus specifically. He is the highly logical buyer who, after becoming emotionally convinced, needs to verify the mechanism before trusting it with a real hire decision. He will expand every accordion. He will read the methodology description. He will look for anything that sounds like marketing language instead of engineering honesty.

The P1–P7 primitive framework is a strong technical differentiator — it signals that the product was designed by people who thought systematically about what actually predicts on-the-job performance, not by people who copy-pasted keywords from HR software. Each primitive should be named and described in its own right, with the specific failure mode it catches stated explicitly.

Do not water down the technical language here. This section should reward the reader who goes deep.

### Copy Direction

**Option A — The P1–P7 Primitives Explained**

> **Section headline:** Not vibes. Not keywords. Seven verifiable primitives.
>
> Every Evidence Brief scores candidates across 7 independently weighted primitives. Each is designed to catch a specific class of hiring failure that resumes and interviews miss.
>
> - P2 Systems Evolution — Does their trajectory show genuine architectural growth or lateral repetition of the same role at different companies?
> - P3 Collaboration Leverage — Do the engineers around them ship faster? Or does velocity stall when they are on the critical path?
> - P5 Operational Maturity — How do they behave when systems break at 2am? Is there evidence of incident ownership or just feature shipping?
> - P6 AI Leverage Quality — Do they use AI to accelerate genuine work, or to fabricate the appearance of output?
> - P7 Authenticity Confidence — Is the work verifiably theirs, or is it laundered through AI generation and surface-level attribution?

**Option B — The Verification Methodology**

> **Section headline:** How we verify what you cannot.
>
> **3-rung employment verification:** Email domain confirmation → organizational membership check → contribution fingerprint cross-reference. A claimed role at a credible protocol takes under 90 seconds to authenticate or flag as unverifiable.
>
> **AI code laundering detection:** LLM-based style discontinuity analysis compares authorship patterns across a candidate's full commit history. A consistent engineering voice produces consistent stylistic patterns. A laundered portfolio does not. The analysis flags discontinuities that correlate with AI-generation events, not just the presence of AI-adjacent tools.
>
> **Commit velocity and quality correlation:** High commit velocity combined with low review engagement and shallow diffs is a distinct signal pattern. Candidates who manufacture activity to inflate their profiles produce a recognizable signature. We score it separately from raw activity count.

**Option C — Interview Intelligence Explained**

> **Section headline:** Your first technical call, already prepared.
>
> Deep Mode does not just score — it generates Section D, E, and F outputs that turn every first interview into a targeted investigation instead of a general conversation.
>
> - Section D: Red flags with specific interview probes — not "ask about their experience with X" but the exact question engineered to surface whether a stated skill is real or rehearsed.
> - Section E: Interview intelligence — what to go deep on, what to skip, where the candidate is likely strongest and weakest based on their verified evidence profile.
> - Section F: Role and stack match — explicit gap analysis between what the role requires and what the candidate has actually demonstrated.
>
> Result: you stop fishing in interviews and start confirming specific hypotheses. Every minute of that session is used.

**Recommended:** Run all three options as sequential subsections within the deep dive. Use an accordion or tabbed layout on desktop to prevent the section from visually overwhelming buyers who are not yet ready for this depth. Each tab label should name the benefit, not the feature: "How verification works" / "What the seven primitives catch" / "What you get before every interview."

### Visual Execution Notes

- **Layout:** Accordion or tabbed module. Tabs expand inline, not to modal. Default state: all collapsed except the first.
- **Each primitive row:** Name (bold, left-aligned) → one-line mechanism description → one-line failure mode it catches (muted, right-aligned or indented). Scannable table or definition-list format.
- **Methodology section:** Consider a simple horizontal flow diagram showing the 3-rung verification steps. Text-based, no stock icons, monochrome.
- **No marketing language.** Every sentence in this section should be falsifiable. Avoid: "industry-leading," "powerful," "seamless," "revolutionary."

---

## Section 7 — Use Cases / Who It Is For

**CCD Principles:** Focus · Benefits · Structure

### Strategic Rationale

The "Who it's for" section serves a segmentation function — it lets Marcus self-select and feel specifically addressed, rather than feeling like one entry in a mass market. For Web3 B2B tools, this section also signals that the product was designed with an understanding of how engineering organizations in this space actually work, not adapted from a generic HR software template.

The most effective angle for this buyer profile is the exclusion frame: explicitly stating who the product is not for creates stronger desire in the target buyer than inclusive language does. Marcus will actively want to be in the category of buyer the product is designed for.

### Copy Direction

**Option A — Role-Led Segmentation**

> **Section headline:** Built for the people making the real hiring decisions.
>
> **For Heads of Engineering:** Run your full applicant pool through Light Mode before you touch a single CV. Start every hiring week knowing your top 5 candidates — verified — before your first standup.
>
> **For CTOs at early-stage protocols:** Every hire is existentially high-stakes when you are at 15 people. Deep Mode gives you the interview intelligence to treat it that way without adding process overhead.
>
> **For TA leads at Web3 teams:** Process 200+ applicants without burning senior engineering hours on first-round screens that should have been automated weeks ago.

**Option B — Scenario Matching**

> **Section headline:** Wherever you are getting burned, we have a fix.
>
> - Flooded with AI-generated applications → Light Mode authenticity pre-filter cuts noise before you open a single CV
> - Recurring bad seniority-level hires → Seniority-adjusted primitive weighting and trajectory analysis gives an honest level assessment
> - Wasting senior engineering time on first interviews → Deep Mode Interview Intelligence targets every session
> - Unable to verify employment history quickly → 3-rung verification in under 90 seconds per claim
> - No signal on how candidates use AI tools → P6 AI Leverage Quality scores this as a first-class hiring signal

**Option C — Exclusion / Inclusion Frame**

> **Section headline:** This is not for every team.
>
> [Product] is built for engineering leaders who make technical hiring decisions directly — and who have already concluded that the standard resume and interview process is not producing reliable signal.
>
> If you are still running hiring through a recruiter who filters by keyword match, this will not help you yet.
>
> If you are the person reviewing GitHub profiles at midnight trying to find real signal in a pile of AI-polished CVs — this was built for exactly that problem.

**Recommended:** Option C as the section lead (short, high-impact, earns scroll), followed by Option A as the role-segmented cards. Option B works well as a secondary callout block within or after the role cards.

### Visual Execution Notes

- **Layout:** Two or three horizontal cards for role segments on desktop. Each card: role label (bold heading) → 2–3 lines of copy specific to that role → a single CTA link ("See how it works for engineering leads").
- **Exclusion block (Option C):** No card treatment. Plain centered text, larger body size (18–20px), generous whitespace above and below. The restraint signals confidence.
- **CTA per segment:** Text link, not button. "See how it works for [role]" — each links to the relevant use case detail or feature section anchor.

---

## Section 8 — Pricing

**CCD Principles:** Focus · Friction Reduction · Trust · Benefits

### Strategic Rationale

Marcus evaluates price differently from most SaaS buyers. He does not compare your price to comparable tools — he compares it against the cost of the problem. A mis-hire at senior level at a Web3 protocol costs $80–180K when recruiter fees, salary burn, velocity loss, and re-hiring are included. The most effective pricing page strategy is to make this comparison unavoidable before revealing the price tier.

Name the tiers after what they do, not after their hierarchy. "Starter / Pro / Enterprise" signals HR software thinking. "Light / Deep / Protocol" signals product thinking. Marcus will trust the latter more before he has even read the feature breakdown.

### Copy Direction

**Option A — Cost-of-Problem Anchor**

> **Section headline:** A mis-hire costs $150K. A verification costs less than your team's cheapest sprint.
>
> Before the tiers: frame the cost context. A senior mis-hire at a Web3 protocol costs $80–180K when you account for recruiting fees, salary, remediation time, velocity loss, and re-hiring. One avoided bad hire pays for a full year of [Product].

**Option B — ROI-First Framing with Interactive Calculator**

> **Section headline:** What does one avoided mis-hire get you?
>
> Three-line breakeven reference:
> - Average cost of a mis-hire at senior level: $140K
> - Annual cost of [Product] at your team size: [tier price]
> - Breakeven: avoid 0.1 mis-hires per year. If you hire more than twice per year, you are already ahead.
>
> Interactive element: a single slider ("How many senior hires per year?") that outputs the cost-of-risk exposure and the breakeven calculation. This is not a conversion trick — it gives Marcus the exact ROI framing he will use to justify the purchase internally.

**Option C — Direct Tier Presentation**

> **Section headline:** Pick the depth you need.
>
> **Light** — Batch processing, authenticity filter, ranked output. For teams drowning in applicant volume. Start here.  
> **Deep** — Everything in Light plus full Evidence Brief, Interview Intelligence, seniority calibration. For every hire that matters.  
> **Protocol** — Unlimited, API access, custom role primitives, team seats. For when verification is a recurring process, not a one-off problem.

**Recommended:** Lead with Option A or B as the section framing (cost anchor), then present Option C tiers. If the ROI calculator is feasible to build, Option B is the highest-converting frame for this buyer profile — Marcus will self-convince through the calculation.

### Visual Execution Notes

- **Tier cards:** Three cards, equal width, side by side on desktop. Recommended tier to highlight: "Deep" — it is the highest-value tier for the core ICP and should carry a "Most used by engineering leads" badge rather than "Most popular."
- **Recommended tier treatment:** 2px border accent on the "Deep" card only. Same background as other cards. Small badge above the card header.
- **Feature comparison table:** Include below the cards, collapsed by default. Expand on "Compare all features." Do not put the full table above the fold — it creates premature friction.
- **Price display:** Show the number. Do not force a sales call for basic pricing. Marcus will leave the page if he cannot see a number. If pricing is custom, show a starting-from anchor and the basis for custom quotes.
- **CTA per tier:** "Start with Light," "Try Deep free for 3 candidates," "Talk to us about Protocol." Each CTA is distinct and matches the tier's entry path.

---

## Section 9 — Risk Reversal and Objection Handling

**CCD Principles:** Trust · Friction Reduction · Focus

### Strategic Rationale

Marcus arrives at this section with residual objections that his rational mind is raising to protect him from another bad decision. He has tried tools before that did not deliver. He does not want to commit to an onboarding process. He does not want to expose candidate data to an untrusted third party. He does not want a tool that requires ATS integration or a change to his existing process.

The FAQ format works for this section because it lets Marcus find his specific objection and have it addressed directly. The questions should be written in his voice — skeptical, direct, engineering-native. "Can candidates game this?" is a better FAQ question than "Is the verification system reliable?" because the first is what Marcus actually thinks.

### Copy Direction

**Option A — Objection-Matched FAQ**

> **Section headline:** The questions we get from skeptical engineering leads.

FAQ entries:

> **Can candidates game this?**
> Authenticity analysis looks at patterns across a candidate's full public history, not a one-time submission. Coaching for a test does not change a 3-year commit fingerprint.

> **What if a candidate has private repositories?**
> We verify what is verifiable and flag what is not. A gap in public evidence is itself a data point we surface — not an automatic disqualification, but a signal you factor into your decision.

> **Does this replace the technical interview?**
> No. It makes it shorter and sharper. Deep Mode tells you exactly what to test. Your interview time becomes confirmation of specific hypotheses, not open-ended exploration.

> **How long does implementation take?**
> Zero. Paste a CV link or upload a file. First Evidence Brief in under 3 minutes. No ATS integration required, no onboarding call required, no setup process.

> **What happens to candidate data?**
> Candidate data is never used to train models or shared with third parties. GDPR compliant. Candidate data deleted on request within 48 hours.

**Option B — Risk Reversal with Proof Offer**

> **Section headline:** Try it on a real candidate before you pay anything.
>
> Your first 3 Evidence Briefs are free. No credit card. No sales call. Submit a real candidate from your current pipeline and read the output before you decide if this is worth it.
>
> If you do not find something in that report you would not have found yourself — we have not earned your trust yet.

**Option C — Reassurance Strip (short taglines)**

- No ATS integration required. Works with your existing process.
- Cancel any time. Month-to-month. No annual lock-in to start.
- Candidate data is never used to train models or shared with third parties.
- GDPR compliant. Data deleted on request within 48 hours.
- Built by engineers who have hired engineers — not an HR software team.

**Recommended:** All three options should coexist. Option C as a short strip immediately after the pricing section (reduces purchase anxiety before the next scroll). Option A as a full FAQ accordion below. Option B as a standalone block with a CTA at the bottom of the FAQ section.

### Visual Execution Notes

- **Reassurance strip (Option C):** Single-line items in a 2 or 3-column grid. Small icon from Tabler (`ti-check`, `ti-shield`, `ti-x`) preceding each line. Muted text, secondary background. No borders on individual items — the grid itself provides structure.
- **FAQ accordion:** Each question is a clickable row. Expanded answer appears below in the same row without page jump. Default: all collapsed. Use `ti-chevron-down` as the expand indicator.
- **Risk reversal block (Option B):** Center-aligned text, larger body size. Single CTA button below. No card treatment — generous whitespace creates emphasis through restraint.
- **"Built by engineers" tagline:** This line carries disproportionate weight for Marcus. Consider visual treatment that distinguishes it — different font weight or positioning — without breaking the design system.

---

## Section 10 — Final CTA

**CCD Principles:** Focus · Attention · Benefits · Friction Reduction

### Strategic Rationale

The final CTA section is the last opportunity to convert. By this point, Marcus has read through the full page or has scrolled past sections that answered his specific questions. The final CTA must not repeat the hero — it must close differently.

For a Problem Aware B2B buyer who has made it to the bottom of the page, the most effective close is pain re-activation combined with a zero-friction first action. He knows the problem. He has seen the mechanism. Now remind him that the problem is happening right now — today, in his current pipeline — and that the first step costs him nothing and takes 3 minutes.

### Copy Direction

**Option A — Pain Re-Activation Close (recommended)**

> **Headline:** You already know the interview you are about to schedule should not be happening.
>
> There is a CV in your pipeline right now that looks credible. You are not sure it is real. You are about to spend 90 minutes of your senior engineer's time finding out.
>
> Run it through [Product] first. 3 minutes. Then decide.
>
> **CTA:** Verify that candidate now — it is free

**Option B — Team Pride Close**

> **Headline:** The best engineering teams in Web3 are not lucky. They are systematic.
>
> They have replaced the gut-check with a verification layer. They walk into every first interview already knowing what they are testing for. They do not miss strong hires because they never waste time on false signals.
>
> That is the team you are building.
>
> **CTA:** Start verifying your next hire

**Option C — Direct Engineer-to-Engineer Close**

> **Headline:** No sales call. No demo. Just submit a candidate and see what we find.
>
> We built [Product] because we got burned by the same broken process you are running. We did not want to pitch you a solution — we wanted to show you one.
>
> Your first 3 Evidence Briefs are free. No card. No call. No commitment. Paste a link and read the output.
>
> **CTA:** Get your first 3 verifications

**Recommended:** Option A. It is the highest-converting angle for Problem Aware buyers because it re-activates an immediate, present-tense pain — not a future aspiration. The second paragraph puts Marcus mentally in the specific moment of bad decision-making, and the CTA is the relief valve.

### Visual Execution Notes

- **Layout:** Full-width section. Center-aligned text on a distinct background (the only section in the page that uses the primary accent color as a background, or a deep neutral — not the same off-white used elsewhere). This creates visual finality.
- **Headline:** Largest text on the page outside the hero. 40–48px, weight 500.
- **Body:** 2–3 sentences maximum. Line-height 1.8. No lists.
- **CTA button:** Full-width on mobile. Largest CTA button on the page. If the background is dark, use a white or light fill button. Accent color CTA on a light background. One button only — no secondary link.
- **No social proof here.** Social proof belongs higher in the page. Adding it here creates decision paralysis at the moment of action.
- **No navigation elements** in this section. Reinforce the 1:1 attention ratio at the most critical conversion point.

---

## Section 11 — Footer

**CCD Principles:** Trust · Consistency

### Strategic Rationale

The footer is a trust compliance and navigation utility section. For a B2B Web3 audience, it signals organizational legitimacy. Missing or sparse footers on B2B SaaS tools are a trust negative for Marcus — they suggest early-stage instability. A well-structured footer communicates that this is a real company with legal accountability and a functioning organization.

### Copy Direction

No headline copy required. Structure only:

**Column 1 — Product**
- How it works
- Verification layer
- Light Mode
- Deep Mode
- Pricing

**Column 2 — Company**
- About
- Blog / Protocol Notes
- Careers
- Contact

**Column 3 — Resources**
- Documentation
- Case studies
- Security overview
- API reference (if available)

**Column 4 — Legal**
- Privacy policy
- Terms of service
- Data processing agreement (GDPR)
- Cookie policy

**Bottom bar:**
- Copyright line
- Social links (GitHub, Twitter/X — relevant to Web3 audience)

### Visual Execution Notes

- **Layout:** 4-column grid on desktop. 2-column on tablet. Single column on mobile.
- **Background:** Dark neutral or off-black. Creates clear visual closure for the page and separates from the final CTA section above.
- **Typography:** All links in muted weight, secondary color. No bold in footer links — hierarchy is communicated by column heading weight only.
- **Security badge or certifications:** If SOC 2, GDPR compliance certification, or similar credentials exist, place them in the bottom bar as small badge elements — not prominently featured, but present as a final trust signal for anyone who checks.
- **No CTA in the footer.** The final CTA section immediately above handles the last conversion opportunity. The footer's job is closure and compliance, not conversion.

---

## Appendix — CCD Principle Quick Reference

| Principle | Primary Sections | Design Directive |
|---|---|---|
| Focus | Nav, Hero, Final CTA | One primary CTA per section. 1:1 attention ratio. Eliminate competing actions. |
| Structure | Hero, Value Prop, Deep Dive | Headline → Benefit → Proof → CTA hierarchy. F-pattern or Z-pattern layout. |
| Consistency | All | Tone, vocabulary, and visual language must stay Web3-native and engineering-first throughout. |
| Benefits | Value Prop, Demo, Use Cases | Every feature statement must be followed by the outcome it produces and the emotional consequence of that outcome. |
| Attention | Hero, Final CTA | Accent color reserved for primary CTAs only. Directional cues (layout, whitespace, scale) guide eye to action. |
| Trust | Social Proof, Risk Reversal, Footer | Quantified outcomes over testimonial quotes. Peer-level voices over generic reviews. Methodology transparency over claims. |
| Friction Reduction | Nav, Pricing, Risk Reversal | First action must require zero commitment. No credit card for first 3 verifications. No ATS integration required. Mobile-optimized throughout. |

---

## Appendix — Key Vocabulary for This Audience

The following terms should appear naturally in copy throughout the page. They signal domain fluency and build subconscious trust with Marcus:

- Trustless (in the context of verification, not as a Web3 jargon drop)
- Proof of work / proof of skills
- Signal vs noise
- Evidence Brief (product-specific term — use consistently as a proper noun)
- Verification layer (the product's category frame — use as a noun, not as a modifier)
- Commit history / contribution fingerprint
- On-chain proof (use sparingly — evokes the trustless infrastructure parallel without being jargon-heavy)
- Seniority calibration
- Interview intelligence

**Terms to avoid:**
- "Powerful" — signals marketing, not engineering
- "Seamless" — overused SaaS filler
- "Revolutionary" — triggers skepticism immediately
- "AI-powered" — weaponized meaninglessness in 2025
- "Best-in-class" — no specificity, no credibility
- "Passionate" — Marcus's most despised recruiting word

