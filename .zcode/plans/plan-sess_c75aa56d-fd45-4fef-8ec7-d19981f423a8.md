
## Implementation Plan: New Hero Section per CREATIVEDIRECTOR.md

### Summary
Build a new editorial-style hero section (HeroTop) that sits above the existing hero (now HeroReport). The new hero follows the Lumena-inspired composition from the reference image: left-aligned large headline, right-side procedural particle field, bottom-left evidence block. Black background, white/grey narrative, Bordeaux accent used sparingly.

### Files to Create
1. **`app/components/landing/EvidenceField.tsx`** — Canvas-based procedural particle visualization
   - Monospace glyphs (`+ × < > / ░ ▓ █ 0 1`) in circular radar pattern
   - Density increases toward outer ring, center nearly empty
   - <5% particles use Bordeaux (#7B2432), rest grey (#8D8B87)
   - Seeded random (deterministic), subtle drift <3px, occasional opacity changes
   - Reuse `seededRandom` pattern from existing `EvidenceParticles.tsx`

2. **`app/components/landing/HeroTop.tsx`** — New hero section component
   - Left side (7 cols): Eyebrow → Headline (72-96px) → Body → CTAs → Evidence block
   - Right side (5 cols): EvidenceField particle canvas
   - Copy per spec: "Hire from evidence. Not assumptions."
   - Two CTAs: "View Sample Report" + "How Scoring Works"
   - Bottom-left evidence: "71% less screening time" + "Every conclusion links to commits, pull requests or tickets"
   - Background: #090909, text: #F2F0EB, secondary: #8D8B87

### Files to Modify
3. **`app/components/landing/Hero.tsx`** — Rename export to `HeroReport` (all code preserved)
4. **`app/page.tsx`** — Import HeroTop + HeroReport, place HeroTop before HeroReport
5. **`app/lib/landing/constants.ts`** — Update nav links (Product, Reports, How it Works, Trust, Pricing) and CTA text
6. **`app/components/landing/Header.tsx`** — Update nav links, add "Log in", Bordeaux-outlined CTA
7. **`app/globals.css`** — Add CSS classes for HeroTop layout grid, typography, evidence block, responsive stacking

### Design Principles
- No gradients, no glowing cards, no glassmorphism, no AI clichés
- Everything aligned to 12-column grid, nothing centered
- Whitespace is part of the design — large margins, few elements
- Bordeaux accent used <3% of screen
- Motion: slow, subtle, non-attention-seeking
- Responsive: desktop preserves split layout, mobile stacks vertically
