# UI Revision — Fix Existing Implementation

Do **NOT** redesign the landing page.

The structure is correct.

Only fix the following implementation issues while preserving all existing animations, layout and component architecture.

---

# 1. Background Gradient

## Current Problem

The current background looks flat and almost black.

It lost the visual depth from the design reference.

## Required Fix

Replace the existing background with the exact radial gradient below.

```css
background:
radial-gradient(
circle at 30% 20%,
#09524f 0%,
#073a39 50%,
#0c1b1c 100%
);
```

Requirements

* rich teal glow
* dark edges
* smooth transitions
* premium depth
* no harsh color stops
* one global background for the entire page
* extremely subtle animated movement is allowed

The background should become part of the visual identity instead of feeling like a flat color.

---

# 2. Folder Section Width

## Current Problem

The stacked folders stretch almost full width.

This destroys the illusion of physical folders.

## Required Fix

Center the entire folder stack horizontally.

Add a reasonable max-width.

The folders should feel like premium floating cards.

Leave generous whitespace on both sides.

The layout should resemble a document stack sitting in the center of the screen.

Do not allow the folders to span edge-to-edge.

---

# 3. Folder Tab Positioning

## Current Problem

Every folder tab is positioned in exactly the same place.

The folders look artificial.

## Required Fix

Stagger every folder tab horizontally.

Example

Folder 1 → left

Folder 2 → slightly right

Folder 3 → center

Folder 4 → slightly left

Folder 5 → right

The tabs should feel like real office folders placed on top of each other.

The positions should look intentional but slightly irregular.

Never perfectly align all tabs.

---

# 4. Folder Colors

## Current Problem

The folders blend into the background.

There is almost no visual hierarchy.

## Required Fix

Increase contrast.

The folders should immediately become the visual focus.

Preferred options

* clean premium white
* or soft pink / blush matching the existing accent color

Avoid grey.

Avoid dark cards.

Avoid transparent backgrounds.

The folders must clearly separate from the teal background while keeping the premium minimal aesthetic.

---

# 5. Hero Fan Animation (Highest Priority)
DO NOT CHANGE THE EXISTING FAN SHAPE.

The fan is part of the brand.

Before changing anything inspect how it is built.

This is currently the biggest issue.

Do not keep the existing implementation.

Rewrite the reveal animation.

## Current Problem

The fan behaves like a single rectangle being uncovered by a curtain moving upward.

It looks mechanical.

It does not feel alive.

## Required Behavior

The fan should appear to emerge naturally from darkness.

The reveal starts at the central hub of the fan.

From that point, every rib/blade gradually becomes visible while expanding outward.

The movement should feel organic.

Imagine watching a traditional folding fan slowly appear from shadow.

It is **not** a vertical mask animation.

It is an outward reveal originating from the center.

## Motion Requirements

Each blade must have its own animation timing.

Never animate every blade simultaneously.

Introduce small random offsets.

Some blades reveal

* slightly earlier
* slightly later
* slightly faster
* slightly slower

The differences should be subtle.

The result should resemble a handcrafted object unfolding instead of a synchronized loading animation.

The animation should feel calm, elegant and premium.

Never fast.

Never bouncy.

Never linear.

Use ease-in-out curves.

## Technical Suggestions

Inspect how the current fan is built before changing anything.

If the blades are individual elements:

* animate each element independently
* use Framer Motion staggerChildren or custom delays
* animate opacity + scale + clip-path (or mask)

If the current CSS implementation prevents achieving this effect cleanly,

refactor the implementation while preserving the exact geometry of the fan.

Do **not** change the shape.

Do **not** change proportions.

Do **not** redesign the fan.

Only improve how it is revealed.

---

# Final Goal

The landing page should immediately feel more premium.

The background should have depth.

The folders should become clear focal points.

The hero animation should feel handcrafted and cinematic instead of looking like a simple sliding mask.

Do not modify any other sections unless necessary to support these fixes.
