# Complete Frontend Rewrite — 16Signals

## Objective

Completely redesign the landing page while keeping the existing brand identity.

The final result should feel premium, calm, confident and minimal. Think Linear, Stripe, Vercel and Apple rather than startup templates.

This is **not** a redesign of the brand. It is a complete UX/UI rewrite while preserving the existing visual identity.

---

# General Rules

## Code Quality

* Rewrite the frontend from scratch.
* Remove all unused components, pages, assets and folders.
* Keep the project structure clean.
* Separate components into logical folders.
* Use reusable components.
* No duplicated code.
* Keep animations isolated.
* Use lazy loading where appropriate.
* Optimize every animation for 60fps.
* Avoid unnecessary React rerenders.

Use:

* React
* Framer Motion
* CSS Modules or Tailwind (follow existing project)
* position: sticky instead of heavy JS whenever possible
* GPU accelerated transforms
* transform + opacity animations only

---

# Design System

All colors already exist inside the root theme.

If new colors are required, add them only inside the global theme/root variables.

Never hardcode colors inside components.

---

# Background

Use one global page background instead of individual section backgrounds.

```
radial-gradient(
circle at 30% 20%,
#09524f 0%,
#073a39 50%,
#0c1b1c 100%
)
```

The background should slowly move using an extremely subtle animation.

Almost unnoticeable.

---

# Large Background Words

Between sections use oversized typography.

Examples

PROOF

VERIFY

SIGNALS

FILTER

TRUST

These are decorative only.

Requirements

* absolute positioned
* behind content
* opacity around 0.04
* pointer-events none
* responsive vw font sizing
* never interfere with readability

---

# Page Structure

1. Hero
2. Problem / Value
3. How It Works
4. Book a Call

Keep every section full width with generous spacing.

---

# SECTION 1 — HERO

DO NOT CHANGE THE EXISTING FAN SHAPE.

The fan is part of the brand.

Before changing anything inspect how it is built.

If it is CSS only, optimize it.

If SVG improves performance while keeping identical appearance, migrate it.

Never redesign the geometry.

## Hero Experience

The visitor first sees only the headline.

The fan is mostly hidden.

While the page loads the fan slowly reveals upward from its center as if emerging from darkness.

It should feel like a curtain is uncovering it.

Not like a fade.

The fan remains partially hidden.

It should never become fully bright.

Apply a soft dark overlay so it always feels inside shadow.

The fan should have an extremely subtle idle sway.

Almost breathing.

Very slow.

No obvious looping.

## Hero Layout

Left aligned.

Headline:

Maximum five words.

Below it:

Five short sentences explaining the product.

Communicate:

"We already filtered candidates for you."

The user should immediately understand:

Instead of interviewing hundreds of random applicants, you only spend time interviewing verified engineers.

The feeling should be similar to receiving a shortlist from an elite recruiting agency.

Minimal text.

Large typography.

Strong whitespace.

---

# SECTION 2 — PROBLEM / VALUE

Build this section as stacked folders/cards.

Reference:

Physical folders stacked on a desk.

Each new folder slides upward while scrolling and perfectly covers the previous folder.

Implementation:

* position: sticky
* top offsets
* increasing z-index
* opaque backgrounds
* smooth transitions
* no expensive scroll listeners

The interaction should communicate:

"We already sorted everything."

Each folder explains one layer of verification.

For example

Proof of Work

Real Contributions

Consistency

Anti-Fraud

Technical Signals

The user should feel every folder removes another hiring problem.

---

# SECTION 3 — HOW IT WORKS

Create a scroll-driven timeline.

Layout

Left:

Sticky vertical timeline.

Animated progress indicator.

Right:

Large content blocks.

Each block contains:

* step number
* headline
* supporting text
* illustration

Animation

Timeline fills according to scroll progress.

Each step:

* fade in
* translate upward
* illustration scales from 0.95 to 1
* smooth fade out

Do not snap scrolling.

Everything should remain scroll-driven.

Implementation

Use:

* Framer Motion useScroll
* useTransform
* whileInView
* useInView

Avoid manual scroll listeners.

---

# SECTION 4 — BOOK A CALL

Very clean section.

Single CTA.

Integrate Cal.com embed.

No distractions.

Large spacing.

The CTA should feel like the natural final step after understanding the product.

Placeholder copy is acceptable.

I will replace the text later.

---

# Motion Principles

Animations should never feel flashy.

Everything should communicate confidence.

Motion should be slow.

Elegant.

Purposeful.

Never distracting.

---

# Responsive

Desktop first.

Then tablet.

Then mobile.

The experience must remain identical across screen sizes.

---

# Performance

Target smooth 60fps.

Prefer CSS over JavaScript.

Prefer sticky over scroll listeners.

Avoid layout thrashing.

Optimize all assets.

Only render what is needed.

---

# Overall Feeling

The entire website should communicate one idea:

"You don't review applications anymore.

You interview people who have already been verified."
