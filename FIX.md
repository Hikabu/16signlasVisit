# UI Revision — Motion & Interaction Polish

Do **not** redesign the landing page.

Do **not** change the page structure, typography, spacing, or colors unless required for the fixes below.

This iteration is focused entirely on interaction quality, motion design, and premium scrolling behavior.

---

# 1. Sticky Header Behavior

## Current Problem
DO NOT CHANGE THE EXISTING FAN SHAPE.

The fan is part of the brand.

Before changing anything inspect how it is built.

The header feels permanently visible and lacks a premium transition.

It should evolve as the user scrolls instead of remaining static.


---

## Initial State

When the page first loads:

* header background must be completely transparent
* no blur
* no shadow
* no dark overlay
* logo displayed at its larger hero size
* navigation spacing should feel open and spacious

The header should visually blend into the hero.

---

## Scroll State

As soon as the user starts scrolling, transform the header into a compact sticky navigation.

Animate:

* reduce vertical padding
* slightly scale down the logo
* reduce spacing between navigation items
* add a subtle dark translucent background
* add a very soft shadow or backdrop blur to separate it from the page

The transition should feel seamless.

Use approximately:

```css
transition: all 0.3s ease-in-out;
```

Never make the transition abrupt.

The user should almost not notice it happening.

---

# 2. Hero Background Lines Animation

## Current Problem

The background sticks/ribs simply fade into view.

This makes the hero feel static.

---

## Required Behavior

The background sticks should rise upward from below while fading in.

Do not simply animate opacity.

Each stick should translate upward while becoming visible.

Example motion:

Initial

* opacity: 0
* translateY(40-60px)

Final

* opacity: 1
* translateY(0)

---

## Staggering

Every stick should have a slightly different timing.

Never animate every line simultaneously.

Introduce small randomized delays.

Some lines:

* begin earlier
* begin later
* rise slightly faster
* rise slightly slower

Keep the variation subtle.

The effect should resemble depth emerging from darkness rather than UI elements loading.

Avoid obvious sequential animations.

The movement should feel organic.

---

# 3. Scroll-Driven Section Reveal

## Current Problem

Every section appears too abruptly.

Scrolling lacks momentum.

The page feels flat.

---

## Required Behavior

Every major content block should appear as if it is slowly surfacing from below.

The animation should feel soft and elegant.

Never flashy.

Never exaggerated.

---

## Initial State

Before entering the viewport:

```css
opacity: 0;
transform: translateY(40px) scale(0.95);
```

---

## Final State

Once visible:

```css
opacity: 1;
transform: translateY(0) scale(1);
```

Use smooth easing.

Prefer a cubic-bezier curve that gives a slight floating sensation instead of a linear transition.

The motion should communicate weight and confidence.

---

## Trigger

Use one of the following:

* Framer Motion whileInView
* Framer Motion useInView
* Intersection Observer API

Avoid manual scroll listeners.

Trigger once when approximately 20–30% of the section enters the viewport.

---

## Animation Timing

Duration:

500–800ms

Small stagger between child elements.

Typical order:

1. badge
2. heading
3. description
4. illustration
5. buttons

Everything should feel naturally choreographed.

---

# Performance

Maintain 60fps.

Animate only:

* transform
* opacity

Avoid:

* width
* height
* top
* left
* expensive layout recalculations

Use GPU-accelerated transforms wherever possible.

---
Custom Folder-Tab Section Container
The Shape Requirement: Wrap the section or content cards in a container that mimics a physical folder with a single top tab.
Tab Top Border: The top of the container should not be a flat line. Instead, it must feature a pronounced, asymmetric tab on the top-left (resembling a file folder index tab).
The Slanted Geometric Cuts: * The left side of the tab should angle upward and outward to the right using a smooth diagonal slope.
The top edge of the tab is flat and horizontal.
The right side of the tab should slope downward and outward to the right at a mirrored diagonal angle before meeting the main body of the container.
Border Radii & Styling: All intersecting sharp corners of the tab (where it meets the top horizontal edge and where it connects back down to the main card container) must have a subtle, smooth border-radius to look clean and modern. The entire folder container needs a thin, light gray outline and a soft, diffused drop shadow behind it to give it depth.

# Overall Motion Language

Every interaction should communicate calm confidence.

Nothing should feel mechanical or template-like.

The page should give the impression that elements are emerging from depth rather than simply appearing.

Motion should be subtle enough that users feel the quality without consciously noticing the animation itself.
