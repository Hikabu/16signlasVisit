# 16 Signals landing page

The public 16 Signals product landing page, built with Next.js, React, TypeScript, and Tailwind CSS.

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Validation

```bash
npm run lint
npm run typecheck
npm run build
```

## Source structure

- `app/sections/` — landing-page sections and their component-scoped styles
- `app/animations/` — reusable reveal and canvas animation primitives
- `app/components/` — reusable visual components
- `app/hooks/` — shared React hooks
- `app/data/` — static landing-page content and configuration
- `app/types/` — shared TypeScript types
- `app/lib/` — small shared utilities
- `app/styles/` — global tokens, shared styles, and section-owned global CSS
- `docs/design-history/` — archived design direction and visual-system references
- `public/` — images and icons used by the page

The site currently has one App Router route at `/`.
