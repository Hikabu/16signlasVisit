
# Hero Background Animation Specification

### Visual Reference

Replicate the visual energy and premium feel of the Raycast hero animation shown in the reference image.

Do **not** copy the exact composition. Instead of parallel diagonal beams, the animation should behave like a **traditional folding hand fan opening outward** (Japanese/Chinese fan motion).

The movement should feel elegant, premium, minimal, and slightly mysterious.

---

## Core Visual Concept

The hero background consists of multiple large gradient blades that originate from a single pivot point near the bottom center of the viewport.

At page load:

* The blades are initially compressed together.
* They smoothly spread outward like a folding fan opening.
* Once fully opened, they continue a subtle breathing motion.
* Motion should be slow and organic, never distracting.

The effect should feel:

* Luxurious
* Cinematic
* High-end SaaS
* Similar visual sophistication to Raycast, Linear, Vercel, and Stripe

---

## Color System

Primary Brand Color:

```css
#009A93
```

Gradient Palette:

```css
Deep Shadow:    #001A1A
Dark Teal:      #004F4B
Brand Teal:     #009A93
Bright Accent:  #22C8BF
Highlight:      #40E0D8
```

Each blade should contain a smooth gradient transition:

```text
#001A1A
   →
#004F4B
   →
#009A93
   →
#22C8BF
   →
#40E0D8
```

The center of each blade should glow brighter while the edges fade softly into darkness.

Background:

```css
#020304
```

Nearly black.

---

## Animation Behavior

### Stage 1 — Fan Opening

The blades open from a common pivot point.

Imagine a handheld folding fan:

```text
      \  |  /
       \ | /
        \|/
         *
```

The pivot point remains fixed.

The blades rotate outward using easing:

```js
easeOutExpo
```

Duration:

```js
1800ms - 2500ms
```

No sudden acceleration.

The opening should feel deliberate and premium.

---

### Stage 2 — Organic Breathing

After opening:

Each blade continues subtle movement.

Use sine waves:

```js
angle += Math.sin(time * 0.0004 + offset) * amplitude;
```

Properties:

```js
amplitude: 1° - 3°
speed: very slow
```

Motion should feel like:

* fabric moving in air
* gentle breathing
* living architecture

Not like a loading spinner.

---

### Stage 3 — Dynamic Light Flow

Inside every blade:

Create a moving gradient highlight.

The bright region slowly travels along the blade length.

Use:

```js
Math.sin()
```

to shift gradient positions.

The highlight should feel like light passing across silk.

---

## Texture Treatment

To achieve the Raycast look:

Add procedural grain.

Requirements:

```js
opacity: 0.03 - 0.08
blend mode: screen
```

The grain must move subtly.

No static PNG overlays.

Generate through Canvas noise.

---

## Canvas Requirements

Use:

```html
<canvas>
```

as the background layer.

Canvas must:

```js
const dpr = window.devicePixelRatio || 1;
```

Support Retina displays.

Always resize on viewport changes.

Fill the entire viewport.

---

## Performance Requirements

Target:

```text
60 FPS
```

Use:

```js
requestAnimationFrame()
```

Avoid:

* SVG filters
* expensive blur effects
* excessive shadow calculations

Render everything through Canvas.

---

## Layout Integration

The animation is only a background layer.

Foreground contains:

* centered headline
* supporting text
* CTA buttons

The background must never compete with the content.

Text readability is critical.

Apply a subtle dark vignette around viewport edges.

---

## Art Direction

The final feeling should be:

> A premium Web3 / AI / SaaS landing page where teal light emerges from darkness through large fan-shaped architectural forms.

Think:

* Raycast motion language
* Linear elegance
* Vercel minimalism
* cinematic teal gradients
* opening hand fan geometry

The animation should immediately communicate sophistication, precision, trust, and modern technology.
