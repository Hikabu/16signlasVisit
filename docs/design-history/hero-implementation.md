# 16Signals — Hero Implementation

## Task

Build the hero section for the 16Signals landing page.

Reference the attached Lumena homepage only for composition, spacing, typography scale and restraint.

Do NOT copy branding, colors or illustrations.

The result should feel like the first page of an engineering report rather than a SaaS marketing site.

Everything must feel intentional, quiet and premium.

No startup gradients.
No glowing cards.
No floating glassmorphism.
No feature boxes.
No illustrations of people.
No AI clichés.

The product itself is the hero.

------------------------------------------------

## Product

16Signals verifies engineering capability from real work.

Instead of reading resumes, it analyzes public engineering activity
(GitHub, GitLab, Linear, Jira, etc.)
and produces an evidence-backed capability report.

Every conclusion is linked to observable work.

The platform is designed for:

• CTOs
• Engineering Managers
• Founders
• Technical Recruiters

The buyer values certainty over inspiration.

------------------------------------------------

## Design Philosophy

The page should feel like:

editorial
architectural
forensic
precise

Imagine a mix of

Linear
Lumena
OpenAI Research
Stripe Editorial

Everything should breathe.

Large empty areas.

Few elements.

Nothing decorative unless it communicates meaning.

Whitespace is part of the design.

------------------------------------------------

## Color System

Background

#090909

Primary text

#F2F0EB

Secondary text

#8D8B87

Borders

#242424

Accent

Bordeaux

#7B2432

Use the accent less than 3% of the screen.

No blue.

No purple.

No gradients.

No neon.

------------------------------------------------

## Typography

General Sans
Inter
Neue Montreal

Headline

very large

72–96px

weight 400–500

tight line height

The size creates authority.

Never bold.

Body

18–20px

comfortable reading width

around 34–40 characters.

Labels

12px

uppercase

high tracking

grey

------------------------------------------------

## Layout

Use the Lumena composition almost exactly.

12-column grid.

Large margins.

Thin navigation.

Large left headline.

Generous negative space.

Particle artwork on the right.

Supporting copy underneath.

Small evidence block bottom-left.

Nothing centered.

Everything aligned to the grid.

------------------------------------------------

## Navigation

Very quiet.

Bottom border only.

Left

16Signals logo

Center

Product

Reports

How it Works

Trust

Pricing

Right

Log in

Book Demo

The CTA should be understated.

Small.

Dark with a thin Bordeaux outline.

------------------------------------------------

## Hero Copy

Eyebrow

VERIFIED ENGINEERING SIGNALS

Headline

Hire from evidence.

Not assumptions.

Body

Candidate history already contains the answers.

16Signals transforms real engineering work into a verified capability report before the first interview.

Two actions

Primary

View Sample Report

Secondary

How Scoring Works

Buttons should feel understated.

No oversized pills.

------------------------------------------------

## Left Evidence Block

Replace Lumena's article list.

Use two proof statements.

Each starts with a small Bordeaux indicator.

71% less screening time

Every conclusion links to commits, pull requests or tickets

Tiny typography.

Feels like report annotations.

------------------------------------------------

## Right Visual

This is the centerpiece.

Not an illustration.

Not artwork.

Not decoration.

Create a procedural SVG made from tiny monospace glyphs.

Characters may include

•

+

×

<

>

/

░

▓

█

0

1

Arrange them into a circular evidence field.

Think radar.

Think forensic scan.

Think engineering graph.

Not a logo.

Not a face.

The form should resemble a scorecard emerging from thousands of tiny observations.

Density increases toward the outer ring.

Center remains almost empty.

Less than 5% of particles use Bordeaux.

Everything else stays grey.

The image should feel computational rather than artistic.

------------------------------------------------

## Motion

Everything moves slowly.

Nothing attracts attention.

Particles drift less than 3px.

Occasionally one particle changes opacity.

No looping spectacle.

No pulsing.

No morphing.

Navigation

150ms hover.

Underline.

CTA

Subtle background transition.

Particle system must continue running independently without stealing focus.

------------------------------------------------

## Spacing

The entire hero should feel oversized.

Visitors should immediately notice restraint.

Large margins.

Large whitespace.

Few elements.

One clear visual hierarchy.

No stacked cards.

No boxed sections.

------------------------------------------------

## Technical

React

Next.js

Tailwind

SVG particle field.

Seeded random generation.

Deterministic output.

Responsive.

Desktop preserves Lumena composition.

Tablet reduces whitespace proportionally.

Mobile stacks:

Headline

Copy

CTA

Evidence block

Particle illustration

No layout shifts.

Maintain premium spacing across breakpoints.

------------------------------------------------

## Definition of Premium

Premium is achieved through reduction.

Every removed element increases clarity.

Every remaining element has a reason to exist.

If any component exists only because "landing pages usually have it", remove it.

The visitor should think:

"This company values evidence enough to design like evidence."
