Design Specification — Section 1: HERO
Project: 16Signals homepage
Status: Implementation-ready
Sources of truth: Strategy, Narrative Architecture (v2), Creative Direction, Experience Blueprint (Scene 1)
Owner: Creative Direction → Senior Product Designer

Section Purpose
The hero performs one psychological job: establish the room. The visitor arrives pattern-matching against every AI startup they have seen this year — glow, gradients, sparkle, promise. Within one second, this hero must break that pattern through stillness, and within five seconds it must answer "what is this?" through a single sentence and a single real artifact.
Before leaving this section the visitor must think, in order:

"This is not like the others." (triggered by stillness and restraint)
"This reads a candidate's actual work." (triggered by the sentence)
"The output is real — that's a real report." (triggered by the artifact)
"Something in that report just pointed to its own proof." (triggered by the single receipt-pull demonstration)

Connection backward: none — this is the opening frame; it carries the burden of first trust.
Connection forward: the hero makes two promises the rest of the page keeps. The artifact is deliberately incomplete (promise: you will see the full report in Scene 4) and the receipt-pull is performed exactly once by the system (promise: in Scene 4, you get to perform it). The scroll out of the hero is the visitor accepting those promises.

Narrative
The story inside this section: a document is laid on the desk in front of you.
The visitor is not being pitched. They have walked into a serious practice — the office of the staff engineer everyone trusts — and on the desk is an evidence report about a real engineer, built from that engineer's real work. Nobody performs for the visitor. Nobody raises their voice. Instead, once, quietly, the document demonstrates its nature: a claim underlines itself and draws a fine thread to the artifact that proves it. Then the room is still again.
The change in the visitor's mind: they entered expecting an AI product to impress them; they leave the hero understanding that this product intends to be verified by them. That inversion — from "believe me" to "check me" — is the entire brand, staged in one frame.

Emotional Goal
On entry: mild skepticism, high pattern-matching alertness. Expected.
Within two seconds: a drop in guard — the stillness registers as confidence, the absence of decoration registers as seriousness. The feeling of entering a quiet, well-lit professional room.
On the receipt-pull moment: a small, private "huh" — curiosity without spectacle. Not awe. Awe is the wrong emotion; awe is for performances. The target is professional curiosity.
On leaving (scrolling): calm interest and a sense of implicit promise — "I want to see the rest of that document."
The hero must never produce excitement. Excitement is the competitor's emotion.

Visual Hierarchy
The eye travels in exactly four beats:

The headline. One line, the largest type on the entire page, ink on dark, upper-center of the frame. It is the only high-contrast element at first glance.
The artifact. The report, entering the frame from the lower third — the second-largest mass, but lower contrast than the headline. The eye falls from the sentence onto the document it describes.
The single accent point. Inside the artifact, one citation marker rendered in the evidence accent — the only saturated color in the entire viewport. Because it is the sole color event, the eye finds it without being pushed. This is where the visitor's eye is resting when the receipt-pull occurs.
The CTAs. Two actions, quiet, positioned between headline and artifact or adjacent to the artifact's upper edge. They are found, not shouted — the visitor should notice them after understanding, never before.

Navigation is fifth and last: minimal, low-contrast, structurally present but visually recessive.

Layout
Composition: a vertical, center-weighted composition on a wide stage. Single-column narrative axis — the page's editorial spine begins here.
Grid: 12-column underlying grid; the headline occupies the central 8 columns, the artifact the central 10. Nothing touches the outer columns — they are permanent negative space, the page's "margins of the essay."
Alignment: headline centered; artifact centered; CTAs centered as a pair. Center alignment is chosen deliberately: it reads as address — the page speaking directly to the visitor — and matches the courtroom/exhibit register of the Creative Direction. Left-alignment would read as interface; this frame is not an interface, it is a statement plus an exhibit.
Vertical rhythm (proportions, top to bottom):

~12% of viewport: quiet zone containing navigation
~18%: empty field
Headline block
One measured gap (larger than any gap inside the artifact — the sentence must feel detached from, and superior to, everything below it)
CTA pair
The artifact, occupying roughly the lower 40–45% of the viewport and bleeding off the bottom edge

Negative space: enormous, and asymmetrically distributed — vast above and beside the headline, tight inside the artifact. This contrast (spacious argument, dense proof) is the brand thesis rendered as a single frame and is non-negotiable.
Balance and density: the frame holds exactly two masses — sentence and document. Nothing else has visual weight. If a third mass appears in any mockup, remove it.

Hero Artifact / Product Placement
The report is the hero image and must be treated the way Apple treats hardware: a real object, precisely presented, generously surrounded.
Size: wide — spanning the central 10 columns — and tall enough that its density is legible, but never fully contained by the viewport.
Position: lower third, entering upward into the frame, cropped by the bottom edge of the viewport.
Cropping — the critical decision: the artifact is deliberately incomplete. Visible: the report's header region (the evidence manifest strip — what was analyzed — rendered small in monospace), one or two claim lines, and one citation marker with its artifact reference. Hidden below the fold: the report's full anatomy — scores, fit analysis, interview focus. The crop creates the scroll motive: legible enough to be real, incomplete enough to demand continuation.
What must be visible, and why:

Real density — actual structured content at honest scale. Density is the proof of realness; airy fake-UI is the number-one failure mode.
Monospace metadata — timestamps, artifact references. Mono is the record's voice; its presence in frame one begins teaching the two-voice system.
Exactly one accent-colored citation marker — the first lesson in the accent's meaning (accent = checkable), taught before any words explain it.

What must remain hidden: any numeric score, any recommendation language, the full report structure, and any second interactive affordance. The hero shows the nature of the artifact, never its conclusions.
Material treatment: the report lies flat on the dark field. No perspective tilt, no 3D rotation, no floating, no device frame, no browser chrome. It is a document on a desk, not a screenshot in space.

Typography
Headline: the serious grotesque sans, single line, tightest tracking on the page, largest size on the page. Weight: confident but not black — authority, not shouting. Line length: one line at desktop; maximum two at any breakpoint. No accent color, no gradient — ink only. The company speaks once here, plainly.
Supporting line (if present): one short sans line, visibly subordinate (roughly one-third the headline's presence), low-contrast ink. It exists only to name what the artifact is. If the artifact communicates this alone, the supporting line is removed.
Monospace: appears exclusively inside the artifact — timestamps, citation references, manifest entries — at small, honest sizes. Mono never appears in the headline zone. The separation is doctrinal: sans is our voice, mono is the record's voice, and the hero introduces them as distinct registers.
CTAs: sans, small, precise, identical size to each other; primary distinguished by treatment, not scale.
Scale logic: exactly three type scales exist in this frame — headline, supporting/CTA, artifact-internal. Fewer sizes, larger jumps, per Creative Direction. A fourth scale is a spec violation.

Motion Design
The hero contains one motion event, total. Motion law: motion may only reveal evidence or connect a claim to it.
Event: the receipt-pull demonstration.

Trigger: time-based — approximately 2 seconds after the frame settles, once per session. Not on scroll, not on hover, not looping.
Sequence: (1) one claim line inside the artifact underlines itself — a hairline drawing left to right; (2) a hairline thread draws from the claim to the citation marker / artifact reference, unhurried; (3) the reference surfaces its accent state. Total duration ~350ms of drawing within a ~1s composed sequence including pauses.
Easing: precise and deliberate — the feel of a well-tuned IDE. No spring, no bounce, no overshoot.
Purpose: this is the brand's signature gesture performed once, unannounced, like a tell. It demonstrates the product's entire epistemology — claims connect to proof — before a single explanatory word. It is also a promise: the system performs the pull once, then never again uninvited; in Scene 4 the visitor inherits the gesture.
After the event: absolute stillness. The underline and thread persist (evidence, once established, does not flicker).

Entrance treatment: page elements may fade/settle on initial load (sub-400ms, single pass), but there is no ambient motion of any kind afterward — no parallax, no drifting background, no gradient movement, no floating artifact. The background is a still surface for the entire scene. Stillness is the loudest element in the frame; protect it.

Interaction

Citation markers (hover): cursor becomes a subtle examination affordance; the marker responds with a hairline state shift — indicating "this is real and inspectable" — but does not open the receipt here. The full interaction is reserved for Scene 4. The hero hints; it does not spend the aha.
Artifact (hover): no tilt, no lift, no glow, no scale. The document does not perform. Only citation markers respond.
CTAs: primary and secondary respond with precise hairline shifts — border or underline weight, ~150ms. No fills blooming, no shadows growing, no color animation.
Headline: inert. Never interactive, never animated after settle.
Cursor behavior: default throughout except over citation markers and CTAs. No custom cursor gimmicks.

Rationale: every interaction in this frame either signals inspectability or affords the next step. Anything that merely rewards mouse movement is decoration and is excluded.

Visual Language

Field: near-black with warmth — ink-dark, not void-dark. Perfectly flat. No gradient mesh, no vignette, no noise texture, no radial anything. (The fan animation is removed permanently; nothing atmospheric replaces it.)
Ink: off-white primary type. Paper-and-ink contrast discipline.
Accent: one hue, forensic register (warm highlighter amber direction per Creative Direction; final hue per brand testing), appearing in this frame exactly once — on the citation marker/thread. The accent's scarcity here is what teaches its meaning. Coral does not appear. Teal does not appear.
Borders: hairlines only — 1px, low-contrast. The hairline is a first-class brand element (the citation made visible); the artifact's structure is drawn entirely in hairlines.
Radius: 2–4px on the artifact and CTAs. Precision, not friendliness.
Shadows and depth: none, or a single near-imperceptible edge treatment to separate artifact from field. Documents lie flat; floating implies performance.
Surfaces and materials: two materials total — the still dark field and the document surface (a barely lighter ink value). No glass, no blur, no frosted panels, no glow halos.
Texture: none. Specificity is the ornament; a timestamp is this brand's idea of decoration.


Information Architecture
Belongs in this section:

One worldview sentence (the reframe: engineering changed; hiring is now built on the work itself — final copy per Narrative Architecture, not this spec)
The report artifact, cropped as specified
Two actions: explore a real report (primary), run it on your own work (secondary)
Minimal navigation

Absolutely does not belong:

Any metric, percentage, or time-savings claim
Feature words, category labels, or the phrase "AI-powered" in any form (banned vocabulary)
Logo walls, badges, social proof of any kind
Explanations of how it works, sources, consent, compliance, or trust principles
A second artifact, screenshot, or illustration
Any navigation item that competes with the two CTAs

Hidden until later sections: the full report anatomy (Scene 4), the interactive receipt-pull (Scene 4), the refusal states and banned signals (Scene 5), the candidate-side experience (Scene 7), and every argument. The hero states; the page argues.

Design Constraints
Sacred — future designers may not change:

One motion event, performed once. No looping, no ambient animation, no re-trigger on scroll-return. Adding a second motion breaks the choreography of the entire page (each scene owns exactly one motion).
The accent appears only on the checkable. One accent instance in this frame. A second use — on the headline, a button fill treated as decoration, a background element — breaks the learned semantics the whole page depends on.
The artifact is real and dense. No invented metrics, no lorem, no blurred suggestion-of-UI. If real content isn't available at build time, the frame waits for it.
The artifact bleeds off the bottom edge. The crop is the scroll motive; a fully contained report kills the forward pull.
The background is still and flat. No atmospheric layer of any kind may be reintroduced. The fan, or any successor to it, is permanently out.
Two masses only — sentence and document. No third element with visual weight.
No numeric conclusions visible. Scores in the hero would recast the product as a scoring tool and contradict the trust architecture.
Headline is ink. Never accent-colored, never gradient.

Breaking any one of these does not degrade the design — it breaks the narrative.

Implementation Notes
For Figma, Fable, Lovable, Cursor — the failure modes to actively resist:

AI generators will add glow. Every generation pass will attempt a radial gradient, a glassmorphic card, a soft colored halo behind the headline. Delete all of it, every time. The dark field is flat. Flatness is the design.
Generators will fake the report. They will produce an airy card with three rounded stat blocks and a smiling avatar. This is the single worst outcome. The artifact must look like a dense, real document — hairline-structured, mono-metadata'd, honestly populated. When in doubt, make it denser and quieter.
Generators will center a badge row. No "trusted by," no G2 stars, no compliance seals. The hero has zero social proof by design.
Generators will animate everything on scroll. Only the one time-triggered receipt-pull exists. Strip all scroll-triggered fades, staggers, and parallax from this section.
Generators will make CTAs loud — large pill buttons, gradient fills, arrow icons. CTAs here are quiet, rectangular, small-radius, hairline-precise. The confident understatement is the conversion strategy.
Generators will add an illustration or 3D object to "balance" the composition. The imbalance is intentional. Nothing joins the sentence and the document.
Typography drift: generators default to 5–7 type sizes. This frame has three. Enforce.
Where restraint matters most: the two seconds before the receipt-pull. Implementers will feel the frame is "too empty" and be tempted to fill the wait. Do not. The stillness before the single gesture is the moment the visitor decides this company is different — it is the most valuable dead air on the page.

Build order note: prototype the receipt-pull first, in isolation, before composing the frame. It is the hardest element, the signature of the brand, and the component Scene 4 will inherit. If the pull doesn't feel precise — IDE-precise, not motion-graphics-precise — nothing else in the hero matters yet.