# Section 2 — The Shift: Visual Design Specification

This section is the negative space of the entire landing page. It is an essay-like exhale after the dense artifact of the hero. The design must execute this stillness with extreme typographic and spatial precision. 

Here is the exact visual craftsmanship required to elevate this from a blank screen to an unforgettable, premium editorial moment.

### Exact Composition
The layout is a strict single-column, left-aligned editorial measure. The composition relies on asymmetrical vertical balance. 
*   **Top 15%:** A fixed, persistent global navigation (if present, stripped of all background).
*   **15% to 35%:** The declarative statement and the monospace sub-line, hugging the left edge of the grid.
*   **35% to 80%:** A vast, intentional void. 
*   **80% to 100%:** The "evidence strata" band, cropped horizontally across the full width of the viewport.

**Why this improves the experience:** By pushing the text to the upper third and leaving the bottom empty, the eye is forced to travel downward through nothingness. This creates a physical sensation of "time passing" or "a gap existing" between the statement and the reality of the work record.
**Why it supports the specification:** The narrative demands a "held breath" and "maximal whitespace." This composition physically enforces that pacing.
**Why it increases trust:** Premium brands (Apple, Stripe) use whitespace as a luxury signal. It communicates: "We are so confident in our message that we don't need to fill every inch of the screen with features."
**Why it avoids AI clichés:** AI generators default to centered text in the middle of the screen. Left-aligned top-heavy composition feels like a serious legal document or a premium editorial, not a SaaS template.

### Spacing
*   **Container Width:** 720px maximum for the text block.
*   **Horizontal Padding:** 8.33% (or 48px on desktop, 24px on mobile) from the left edge.
*   **Vertical Padding:** Top margin of 20vh from the top of the viewport to the headline. Bottom margin 0vh (the strata touches the bottom).
*   **Internal Spacing:** 32px between the end of the sans headline and the start of the mono sub-line.

**Why it supports the specification:** The 720px measure ensures perfect readability (45-75 characters per line), honoring the "editorial, not dashboard" philosophy. The 20vh top margin creates the "upper-mid third" placement required by the visual hierarchy.

### Typography Scale
*   **Headline (Sans):** 48px / 56px (desktop), 32px / 40px (mobile). Grotesque sans-serif. Font weight: 500 (Medium, not Bold). Letter-spacing: -0.02em. Line-height: 1.1.
*   **Sub-line (Mono):** 14px / 21px. True monospace. Font weight: 400. Letter-spacing: 0.01em. Color: 60% opacity off-white. Line-height: 1.5.

**Why it improves the experience:** The dramatic jump from 48px sans to 14px mono creates a stark visual cliff. The eye snaps to the headline, then drops sharply to the dense, factual mono texture.
**Why it increases trust:** Medium weight (instead of Bold) reads as calm and objective, not promotional. The mono sub-line acts as a "receipt" to the headline's claim.
**Why it avoids AI clichés:** Standard SaaS design uses Bold headlines and gradient text. Using Medium weight grotesque sans paired with a precise monospace mimics the aesthetic of an audit report or high-end developer tooling (Vercel, Linear), not a marketing page.

### Report Presentation (The Evidence Strata)
There is no product UI in this section. Instead, the artifact is the "evidence strata" at the bottom.
*   **Visual Execution:** A 120px tall band stretched 100% width across the bottom of the viewport. It is composed of thousands of 1px vertical lines and 2px monospace characters, varying in density and height. 
*   **Treatment:** It looks like a cross-section of compacted geological strata or a condensed git commit graph viewed from a mile away. 

**Why it improves the experience:** It transforms the abstract concept of "years of work history" into a tangible, visual texture. 
**Why it supports the specification:** The spec dictates "abstraction permitted only when derived from real data structures." This strata is a literal visualization of timestamped commit/PR data, stripped of readable text and reduced to pure density.
**Why it avoids AI clichés:** AI tools would place a blurred, glowing dashboard here. Using a data-driven abstract texture is restrained, intellectual, and deeply on-brand for "evidence under examination."

### Border Treatments
*   **The "Fold":** A single 1px hairline divider separates the text block area from the bottom evidence strata. Color: `rgba(255,255,255,0.06)`. 
*   **No borders around text:** The text floats freely; no cards, no boxes.

**Why it improves the experience:** The hairline acts as a literal "page fold," creating a psychological separation between the "argument" (the text) and the "proof" (the strata). 
**Why it increases trust:** Hairlines (1px) are the typographic equivalent of a precise architectural drawing. They communicate exactness.

### Depth, Shadows, and Lighting
*   **Depth:** Zero depth in the upper portion. The text is flush with the background. 
*   **Lighting:** Matte, flat, ambient. No glows, no spotlights, no gradients.
*   **Strata Depth:** The evidence strata at the bottom is slightly darker than the background, as if receding into a shadow. 

**Why it supports the specification:** "The brand does not glow. It marks." "Cards are documents... shadows imply floating; documents lie flat." Everything here is flat. The only "depth" is the implied depth of the data layer beneath the page.

### Contrast
*   **Background:** `#0A0908` (Warm near-black, ink, not void).
*   **Primary Text:** `#F8F5F0` (Off-white, paper-and-ink discipline). High contrast.
*   **Sub-line Text:** `rgba(248, 245, 240, 0.55)` (Low contrast, recedes).
*   **Strata:** `rgba(248, 245, 240, 0.08)` to `0.15` (Barely visible, requires the eye to work).

**Why it improves the experience:** The contrast hierarchy dictates the reading order. The headline is unavoidable. The mono sub-line is readable but quiet. The strata is a whisper, rewarding the viewer for looking closely.
**Why it avoids AI clichés:** The warm near-black (`#0A0908` instead of `#000000` or dark gray-blue) prevents the sterile, "AI void" feel. The off-white (`#F8F5F0` instead of pure white) feels like high-quality paper, anchoring the "document" metaphor.

### Visual Rhythm
The rhythm is: Statement. Silence. Silence. Silence. Texture.
The pacing is deliberately jarring. A huge typographic moment, followed by immense nothingness, followed by a dense, incomprehensible band of data at the bottom. 

**Why it supports the specification:** The narrative requires a "temporal vertigo." This rhythm forces the visitor to sit in the gap between "what engineering became" (the text) and "the record that exists" (the strata). 

### Button Styling & Navigation Styling
*   **Buttons:** None. Absolutely zero CTAs in this viewport.
*   **Navigation:** If global navigation persists, it must be reduced to ghost text. No pill backgrounds, no blur effects, no active states. Just quiet, 14px sans-serif text floating in the top 32px of the screen. 

**Why it improves the experience:** Removing all interactive chrome forces 100% of the visitor's attention onto the narrative. 
**Why it increases trust:** A page that doesn't ask you to do anything for an entire viewport feels radically confident. It says: "We are explaining something, not selling something."
**Why it avoids AI clichés:** SaaS pages are terrified of whitespace without a CTA. Refusing to pitch here breaks the template.

### Premium Details & Micro-Polish
1.  **The Mono Rhythm:** The monospace sub-line must be perfectly kerned. The vertical stems of the characters should create a rhythmic, mechanical drumbeat beneath the organic flow of the sans headline.
2.  **The Strata Crop:** The bottom edge of the viewport must act as a hard mask. The strata should not have a fade-to-black gradient at the bottom. It should be sharply cropped, implying the record goes on forever beneath the fold.
3.  **IDE Easing:** The scroll-triggered reveal of the strata must use a specific cubic-bezier curve (e.g., `cubic-bezier(0.4, 0, 0.2, 1)`)—fast, precise, terminal-like. No spring physics.

**Why it improves the experience:** These details bypass the conscious mind. The viewer doesn't "see" the easing curve, they just feel that the page behaves like a well-engineered tool rather than a website.
**Why it avoids AI clichés:** AI generators default to soft, bouncy, "delightful" animations and soft fading edges. Hard crops, terminal easing, and mechanical rhythm read as developer tooling.

### Responsive Considerations
*   **Desktop (>1024px):** Full 720px text measure. 20vh top margin. Strata spans 100% width.
*   **Tablet (768px - 1024px):** Text measure reduces to 600px. Top margin reduces to 15vh. Strata spans 100% width.
*   **Mobile (<768px):** Headline scales to 32px. Text measure breaks to 85% viewport width. The critical change: the vertical whitespace is compressed slightly (to prevent the text from looking lost), but the 120px strata band at the bottom remains the same proportional size. The left alignment is maintained to keep the editorial, document-like feel.

**Why it improves the experience:** Mobile screens cannot afford the same luxurious 80% void as desktop without the text looking accidental. Compressing the vertical void while maintaining the structural relationship (text high, strata low) preserves the narrative intent.
