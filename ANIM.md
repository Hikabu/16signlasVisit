Create an animated demonstration panel inspired by Raycast's product showcase sections.

The purpose of the animation is to explain the product, not simulate a chatbot.

---

## Visual Style

The panel should look like:

- futuristic desktop software
- dark engineering interface
- blueprint aesthetic
- subtle motion

Background:

#010506

Accent:

#009A93

Grid visible inside panel:

very low opacity

---

## Animation Principles

Only one major movement should happen at a time.

Animations must feel:

- precise
- intentional
- system-driven

Never playful.

Never bouncy.

Never cartoonish.

Use:

- opacity fades
- slow transforms
- layer separation
- wireframe reveals

Avoid:

- typing simulations
- fake chat bubbles
- flashy transitions
- excessive motion

---

## Loop Structure

Total loop:

15 seconds

3 scenes

5 seconds each

---

### Scene 1

Label:

VERIFY

Show:

Candidate Profile

Multiple evidence nodes appear around it.

GitHub
Projects
Contributions
Technical History
AI Usage
Collaboration

Nodes connect to the center.

Lines animate slowly.

Headline:

"Before investing engineering time, know what is real."

---

### Scene 2

Label:

ANALYZE

The verification engine activates.

Evidence flows through:

16 Verification Signals

Signals light up sequentially.

Headline:

"Independent signals reduce hiring uncertainty."

---

### Scene 3

Label:

PROVE

A verified profile emerges.

Metrics appear.

Authenticity
Execution
Technical Depth
Collaboration

Verification score locks in.

Headline:

"Portable proof instead of assumptions."

---

## Motion System

All animations:

duration 400-800ms

easing:

easeOut

No spring animations.

No bounce.

No exaggerated scaling.

Everything should feel like premium software.

---

## Technical Requirements

React

Tailwind CSS

Framer Motion

Functional Components

Clean state machine architecture

Single source of truth for timeline progression

No hardcoded animation duplication

Reusable scene components

Maintain 60fps performance