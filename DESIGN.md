---
version: alpha
name: Raycast
description: Dark, minimal marketing system for raycast.com with high-contrast typography, soft inset card/button treatments, and a product-led layout centered on fast downloads and extension discovery.
colors:
  background: "#07080a"
  surface: "#07080a"
  on-surface: "#ffffff"
  primary: "#e6e6e6"
  accent: "#009A93"  
  secondary: "#9c9c9d"
  tertiary: "#2f3031"
  neutral: "#07080a"
  accent: "#ffffff"
  error: "#ff5a5f"
typography:
  fontFamily: "Inter"
  headline-display:
    fontFamily: "Inter, Inter Fallback, sans-serif"
    fontSize: "64px"
    lineHeight: "70.4px"
    fontWeight: 600
    letterSpacing: "0px"
  headline-lg:
    fontFamily: "Inter, Inter Fallback, sans-serif"
    fontSize: "47px"
    lineHeight: "56px"
    fontWeight: 500
    letterSpacing: "0.2px"
  headline-md:
    fontFamily: "Inter, Inter Fallback, sans-serif"
    fontSize: "34px"
    lineHeight: "41px"
    fontWeight: 500
    letterSpacing: "0.2px"
  body-lg:
    fontFamily: "Inter, Inter Fallback, sans-serif"
    fontSize: "18px"
    lineHeight: normal
    fontWeight: 400
    letterSpacing: "0.2px"
  body-md:
    fontFamily: "Inter, Inter Fallback, sans-serif"
    fontSize: "18px"
    lineHeight: normal
    fontWeight: 400
    letterSpacing: "0.2px"
  body-sm:
    fontFamily: "Inter, Inter Fallback, sans-serif"
    fontSize: "14px"
    lineHeight: normal
    fontWeight: 500
    letterSpacing: "0.2px"
  label-lg:
    fontFamily: "Inter, Inter Fallback, sans-serif"
    fontSize: "14px"
    lineHeight: normal
    fontWeight: 500
    letterSpacing: "0px"
  label-md:
    fontFamily: "Inter, Inter Fallback, sans-serif"
    fontSize: "14px"
    lineHeight: normal
    fontWeight: 500
    letterSpacing: "0px"
  label-sm:
    fontFamily: "Inter, Inter Fallback, sans-serif"
    fontSize: "14px"
    lineHeight: normal
    fontWeight: 500
    letterSpacing: "0px"
rounded:
  none: "0px"
  sm: "4px"
  md: "8px"
  lg: "12px"
  xl: "16px"
  full: "9999px"
spacing:
  xs: "6px"
  sm: "14px"
  md: "24px"
  lg: "48px"
  xl: "120px"
components:
  button:
    primary:
      backgroundColor: "{colors.primary}"
      color: "{colors.tertiary}"
      borderRadius: "{rounded.md}"
      padding: "8px 12px"
      minWidth: "173px"
      minHeight: "36px"
      fontFamily: "{typography.fontFamily}"
      fontSize: "14px"
      fontWeight: 500
      textDecoration: "none"
      boxShadow: "rgba(0, 0, 0, 0.5) 0px 0px 0px 2px, rgba(255, 255, 255, 0.19) 0px 0px 14px 0px, rgba(0, 0, 0, 0.2) 0px -1px 0.4px 0px inset, rgb(255, 255, 255) 0px 1px 0.4px 0px inset"
    secondary:
      backgroundColor: "{colors.primary}"
      color: "{colors.tertiary}"
      borderRadius: "{rounded.md}"
      padding: "8px 12px"
      minWidth: "173px"
      minHeight: "36px"
      fontFamily: "{typography.fontFamily}"
      fontSize: "14px"
      fontWeight: 500
      textDecoration: "none"
      boxShadow: "rgba(0, 0, 0, 0.5) 0px 0px 0px 2px, rgba(255, 255, 255, 0.19) 0px 0px 14px 0px, rgba(0, 0, 0, 0.2) 0px -1px 0.4px 0px inset, rgb(255, 255, 255) 0px 1px 0.4px 0px inset"
    link:
      backgroundColor: "transparent"
      color: "{colors.secondary}"
      borderRadius: "{rounded.none}"
      padding: "0px"
      minWidth: "0px"
      minHeight: "0px"
      fontFamily: "{typography.fontFamily}"
      fontSize: "14px"
      fontWeight: 500
      textDecoration: "underline"
      boxShadow: "none"
  card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    borderRadius: "{rounded.lg}"
    borderWidth: "1px"
    borderStyle: "solid"
    borderColor: "#ffffff0f"
    padding: "24px"
    boxShadow: "rgba(255, 255, 255, 0.15) 0px 1px 1px 0px inset"
---

# Overview

Raycast.com uses a restrained dark theme with a strong product-marketing hierarchy: oversized headline, short supporting copy, and two primary download calls to action. The page is designed to feel fast, precise, and native. Surfaces stay near-black, while interactive controls rely on light gray fills, subtle borders, and soft inset shadows for a tactile desktop-app feel.

Primary traits:
- Dark, minimal canvas with almost no chroma
- Large centered hero and generous vertical whitespace
- Typography-led layout with compact supporting copy
- Buttons that look physical rather than flat
- Utility navigation and download actions prioritized over decoration

# Colors

Use a near-black base with white text and muted gray secondary text. Accent color is effectively white; any warm or colored treatment should remain rare and purpose-driven.

## Tokens
- `background`: `#07080a`
- `surface`: `#07080a`
- `on-surface`: `#ffffff`
- `primary`: `#e6e6e6`
- `secondary`: `#9c9c9d`
- `tertiary`: `#2f3031`
- `neutral`: `#07080a`
- `accent`: `#ffffff`
- `error`: `#ff5a5f`

## Usage guidance
- Use white for headlines and key labels.
- Use muted gray for secondary navigation and metadata.
- Keep card and page surfaces nearly identical; separation comes from border, inset shadow, and spacing rather than color contrast.
- Reserve any red/pink tint for brand moments and destructive states.

# Typography

The system is set in Inter and uses weight and size to create hierarchy, not color variation.

## Tokens
- `headline-display`: `64px / 70.4px`, weight `600`, letter spacing `0px`
- `headline-lg`: `47px / 56px`, weight `500`, letter spacing `0.2px`
- `headline-md`: `34px / 41px`, weight `500`, letter spacing `0.2px`
- `body-lg`: `18px`, weight `400`, letter spacing `0.2px`
- `body-md`: `18px`, weight `400`, letter spacing `0.2px`
- `body-sm`: `14px`, weight `500`, letter spacing `0.2px`
- `label-lg`: `14px`, weight `500`, letter spacing `0px`
- `label-md`: `14px`, weight `500`, letter spacing `0px`
- `label-sm`: `14px`, weight `500`, letter spacing `0px`

## Guidance
- Use `headline-display` for the hero statement.
- Use `body-lg` for short supporting paragraphs; keep line lengths narrow and centered.
- Use `body-sm` and label styles for navigation, version text, and button copy.
- Keep tracking subtle; avoid wide letter spacing or all-caps styling unless the content is truly navigational or technical.
- Prefer sentence case.

# Layout

The homepage uses a centered, vertically stacked structure with substantial empty space around the hero content.

## Structure
- Top navigation sits in a floating, rounded container aligned to the page top center.
- Hero content is centered horizontally and vertically dominant.
- Primary CTAs sit beneath the hero copy in a compact horizontal row.
- Supporting metadata appears as a small single-line cluster under the CTAs.
- Secondary promotional link sits below, separated by spacing rather than a divider.

## Spacing
- Use `xl` for major section breathing room and page-scale separation.
- Use `lg` between hero heading, description, and CTA groups.
- Use `md` for local grouping.
- Use `sm` for tight UI clusters like nav items and inline metadata.
- Use `xs` only for micro-adjustments.

## Guidance
- Preserve large negative space; do not crowd the hero.
- Keep content centered unless presenting dense product listings or extension grids.
- Prefer short horizontal rows for actions, metadata, and nav links.
- Let the page feel broad and calm, not dense or dashboard-like.

# Elevation & Depth

Depth is subtle and tactile rather than dramatic.

## System
- Cards use a 1px translucent border and a light inner highlight.
- Buttons use a layered shadow stack that creates a soft raised appearance.
- Avoid large blur shadows or floating glass effects.
- The page background itself should remain visually flat.

## Guidance
- Use inset highlight to suggest native controls.
- Use shadow sparingly on interactive controls only.
- Do not introduce bright glows, heavy neon, or obvious material-style elevation.

# Shapes

Rounded corners are modest and consistent.

## Tokens
- `none`: `0px`
- `sm`: `4px`
- `md`: `8px`
- `lg`: `12px`
- `xl`: `16px`
- `full`: `9999px`

## Guidance
- Use `md` for buttons.
- Use `lg` for cards and floating containers when a more substantial frame is needed.
- Avoid overly pill-shaped controls unless the content is explicitly compact and badge-like.
- Maintain crisp geometry; shapes should support the desktop utility aesthetic.

# Components

## Buttons
Primary and secondary buttons are visually identical in the captured source: light gray fill, dark text, rounded 8px corners, and a tactile inset/outline shadow. Link buttons are minimal, gray, and underlined.

### Primary / Secondary
- Minimum width: `173px`
- Minimum height: `36px`
- Padding: `8px 12px`
- Background: `#e6e6e6`
- Text: `#2f3031`
- Radius: `8px`
- Font: Inter, `14px`, weight `500`

### Link
- Transparent background
- Underlined text
- Muted gray color
- No border or shadow

## Card
Cards are dark surfaces with a translucent border and light inset top highlight.

- Background: `#07080a`
- Border: `1px solid #ffffff0f`
- Radius: `12px`
- Padding: `24px`
- Inner highlight: `rgba(255, 255, 255, 0.15) 0px 1px 1px 0px inset`

## Navigation
Navigation is compact, text-only, and secondary in visual priority.
- Use muted gray text
- Keep spacing tight and aligned on a single row
- Reserve the strongest visual treatment for the Download action

## Hero
The hero pairs a large centered headline with a short supporting paragraph and two CTA buttons.
- Headline should fit in 1–2 lines
- Supporting copy should stay concise and pragmatic
- CTA row should remain compact and centered

# Do's and Don'ts

## Do
- Do use a nearly black full-page background with white content on top.
- Do keep the hero centered with generous whitespace around it.
- Do use Inter everywhere.
- Do make the main headline large, bold, and concise.
- Do use light gray button fills with dark text for primary actions.
- Do keep secondary text muted and visually subordinate.
- Do use subtle borders and inset shadows to imply tactile controls.
- Do keep nav links compact and low-contrast relative to the Download button.
- Do center supporting metadata under the CTA row.

## Don't
- Don't introduce bright backgrounds, gradients, or colorful sections.
- Don't use thin, delicate type for primary messaging.
- Don't turn buttons into flat rectangles without shadow or border treatment.
- Don't crowd the top navigation or the hero with dense utility links.
- Don't use large card radii, glassmorphism, or heavy drop shadows.
- Don't add unnecessary icons, badges, or illustration-heavy elements.
- Don't make all text the same weight or color.
- Don't spread the CTA row into a wide, dashboard-like layout.