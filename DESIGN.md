---
version: alpha
name: Vercel
description: Minimal, high-contrast marketing and product landing system for vercel.com. Uses Geist typography, near-black text, white/light surfaces, thin neutral borders, pill CTAs, and large airy layouts with subtle gradient-led visual emphasis.
colors:
 colors:
  background: "#000000"       # Pure Vercel black for the main backdrop
  text: "#edd5d5"             # (See note: recommended fallback "#f5f5f5" for pure white text)
  accent: "#009A93"           # Your main color used as a vibrant interactive accent
  primary: "#ffffff"          # Crisp white for primary headings and main buttons
  secondary: "#888888"        # Muted gray for secondary text, descriptions, and subtitles
  tertiary: "#333333"         # Medium gray for subtle borders, dividers, and disabled states
  neutral: "#0a0a0a"          # Extremely dark gray for secondary sections/footers
  surface: "#111111"          # Slightly lighter elevated black for cards, code blocks, and dropdowns
  on-surface: "#f5f5f5"       # High-contrast off-white for text sitting on top of cards
  error: "#f87171"            # A slightly brighter, desaturated red that passes WCAG contrast on dark surfaces
typography:
  fontFamily: "Geist"
  headline-display:
    fontFamily: "Geist"
    fontSize: "35px"
    lineHeight: 46.0687px
    fontWeight: 600
    letterSpacing: "-1.945px"
  headline-lg:
    fontFamily: "Geist"
    fontSize: "29px"
    lineHeight: 35px
    fontWeight: 500
    letterSpacing: "-0.28px"
  headline-md:
    fontFamily: "Geist"
    fontSize: "24px"
    lineHeight: 32px
    fontWeight: 500
    letterSpacing: "-0.96px"
  body-lg:
    fontFamily: "Geist"
    fontSize: "16px"
    lineHeight: 24px
    fontWeight: 400
    letterSpacing: "0px"
  body-md:
    fontFamily: "Geist"
    fontSize: "16px"
    lineHeight: 24px
    fontWeight: 400
    letterSpacing: "0px"
  body-sm:
    fontFamily: "Geist"
    fontSize: "14px"
    lineHeight: 20px
    fontWeight: 400
    letterSpacing: "0px"
  label-lg:
    fontFamily: "Geist"
    fontSize: "14px"
    lineHeight: 20px
    fontWeight: 500
    letterSpacing: "0px"
  label-md:
    fontFamily: "Geist"
    fontSize: "14px"
    lineHeight: 20px
    fontWeight: 500
    letterSpacing: "0px"
  label-sm:
    fontFamily: "Geist"
    fontSize: "12px"
    lineHeight: 16px
    fontWeight: 500
    letterSpacing: "0px"
rounded:
  none: "0px"
  sm: "8px"
  md: "12px"
  lg: "16px"
  xl: "24px"
  full: "100px"
spacing:
  xs: "2px"
  sm: "6px"
  md: "16px"
  lg: "22px"
  xl: "40px"
components:
  button:
    primary:
      backgroundColor: "#171717"
      color: "#ffffff"
      borderRadius: "100px"
      borderWidth: "0px"
      borderStyle: "none"
      padding: "13px 14px"
      minWidth: "181px"
      minHeight: "40px"
      fontFamily: "Geist"
      fontSize: "14px"
      fontWeight: 500
      textDecoration: "none"
      boxShadow: "none"
    secondary:
      backgroundColor: "#ffffff"
      color: "#171717"
      borderRadius: "100px"
      borderWidth: "0px"
      borderStyle: "none"
      padding: "13px 14px"
      minWidth: "181px"
      minHeight: "40px"
      fontFamily: "Geist"
      fontSize: "14px"
      fontWeight: 500
      textDecoration: "none"
      boxShadow: "rgba(0, 0, 0, 0.08) 0px 0px 0px 1px"
    link:
      backgroundColor: "transparent"
      color: "#171717"
      borderRadius: "0px"
      borderWidth: "0px"
      borderStyle: "none"
      padding: "0px"
      minWidth: "0px"
      minHeight: "0px"
      fontFamily: "Geist"
      fontSize: "14px"
      fontWeight: 400
      textDecoration: "underline"
      boxShadow: "none"
  card:
    backgroundColor: "#fafafa"
    color: "#171717"
    borderRadius: "8px"
    borderWidth: "1px"
    borderStyle: "solid"
    borderColor: "#e5e7eb"
    padding: "16px"
    boxShadow: "none"
---

# Overview

Vercel.com is a clean, high-contrast, product-led marketing site. The page uses a very light neutral canvas, near-black text, and generous whitespace. Visual energy comes from a restrained gradient field and a geometric hero illustration, not from heavy chrome or decorative UI.

Primary goals:
- Communicate speed, confidence, and technical sophistication.
- Keep calls to action obvious and compact.
- Use simple, familiar controls with very light elevation.
- Favor expansive sections, centered hero content, and minimal borders.

# Colors

Use a mostly monochrome system with a light surface and near-black copy.

## Core tokens
- `background`: `#fafafa`
- `surface`: `#ffffff`
- `text` / `on-surface`: `#171717`
- `accent` / `primary`: `#171717`
- `secondary`: `#ffffff`
- `tertiary`: `#e5e7eb`

## Guidance
- Treat `#fafafa` as the page base and `#ffffff` as the main content surface.
- Use `#171717` for headings, body text, icons, and primary CTA fills.
- Use thin neutral borders rather than tinted outlines.
- Reserve saturated color for decorative gradients and product visuals; no brand color token is provided in the extracted payload, so avoid introducing a new semantic accent token unless necessary.

# Typography

The system is built on Geist with tight, modern spacing and compact display headings.

## Token set
- `headline-display`: 35px / 46.0687px, 600, `-1.945px`
- `headline-lg`: 29px / 35px, 500, `-0.28px`
- `headline-md`: 24px / 32px, 500, `-0.96px`
- `body-lg`: 16px / 24px, 400, `0px`
- `body-md`: 16px / 24px, 400, `0px`
- `body-sm`: 14px / 20px, 400, `0px`
- `label-lg`: 14px / 20px, 500, `0px`
- `label-md`: 14px / 20px, 500, `0px`
- `label-sm`: 12px / 16px, 500, `0px`

## Guidance
- Use `headline-display` for the homepage hero and major campaign statements.
- Use `headline-lg` and `headline-md` for section titles and product callouts.
- Keep body copy short and scannable.
- Preserve the negative letter spacing on display text; it is part of the brand feel.
- Buttons and nav labels should use 14px Geist with medium weight.

# Layout

The page layout is open, centered, and editorial.

## Structural patterns
- Wide top navigation with left-aligned logo and compact text links.
- Centered hero block with a constrained max width.
- Large vertical spacing between hero, feature blocks, and supporting sections.
- Content often sits on a subtle grid or within a faint structural frame.

## Guidance
- Prefer generous outer padding and strong horizontal centering.
- Keep section widths comfortable for reading, typically medium-wide rather than full bleed.
- Use layout as a frame for the hero and product messaging, not as a decorative system.
- Maintain clear hierarchy with large headline, short paragraph, then two CTA buttons.

# Elevation & Depth

Depth is minimal and mostly implicit.

- Primary buttons are solid and flat.
- Secondary buttons use a subtle 1px shadow ring rather than a heavy border.
- Cards use light gray borders and no shadow.
- Avoid layered shadows, frosted effects, or strong z-depth.

Use depth only to clarify interactivity, not to add visual drama.

# Shapes

Vercel favors rounded pills for actions and small rounded rectangles for content containers.

## Tokens
- `none`: `0px`
- `sm`: `8px`
- `md`: `12px`
- `lg`: `16px`
- `xl`: `24px`
- `full`: `100px`

## Guidance
- Use `full` for buttons and nav-like pills.
- Use `sm` for cards and utility containers.
- Avoid aggressive corner radii on large surfaces unless the component is specifically a pill CTA.

# Components

## Buttons
### Primary
- Dark fill, white text, pill radius.
- Minimum width: `181px`.
- Minimum height: `40px`.
- Padding: `13px 14px`.
- Font: Geist, 14px, 500.

### Secondary
- White fill, dark text, pill radius.
- Uses a subtle shadow ring instead of a prominent border.
- Matches primary button sizing for paired CTA treatment.

### Link
- Transparent background.
- Underlined text.
- 14px, normal weight.
- Use for inline actions and secondary navigation, not as a main hero CTA.

## Cards
- `#fafafa` background with `1px solid #e5e7eb`.
- `8px` radius.
- `16px` padding.
- No shadow.
- Use for content previews, feature modules, and simple information tiles.

# Do's and Don'ts

## Do
- Do use Geist everywhere; keep the typographic voice consistent.
- Do set hero headlines large, bold, and tightly tracked.
- Do keep text color near-black and surfaces very light.
- Do pair a filled primary button with a white secondary button in major hero sections.
- Do use thin borders and ample whitespace instead of chrome-heavy cards.
- Do keep CTAs short: action-first phrasing works best.
- Do center important marketing content and allow it to breathe.
- Do preserve the restrained, technical tone shown in the homepage excerpt.

## Don't
- Don't introduce bright brand colors as core UI tokens.
- Don't use gradients as container backgrounds for text-heavy blocks.
- Don't add deep shadows, glassmorphism, or noisy borders.
- Don't make buttons rectangular or heavily outlined.
- Don't crowd sections with too many links or dense descriptive copy.
- Don't rely on decorative icons to carry meaning; keep labels explicit.
- Don't use multiple display fonts or mixed typographic systems.
- Don't overcomplicate the layout; simplicity is a brand feature.