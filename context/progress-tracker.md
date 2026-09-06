# Progress Tracker

Update this file whenever the current phase, active feature, or implementation state changes.

## Current Phase

- Feature implementation — Design System ✓

## Current Goal

- Define the next feature to implement.

## Completed

- Next.js boilerplate cleanup (stripped globals.css, removed public SVGs, minimal page.tsx).
- **01-design-system** — shadcn/ui (radix-nova preset) initialised; button, card, dialog, input, tabs, textarea, scroll-area added; lucide-react installed; `lib/utils.ts` cn() helper created; globals.css rewritten with full dark-only token set mapped to shadcn CSS variables via `@theme inline`; layout.tsx updated with `dark` class and "ghost AI" metadata.

## In Progress

- None.

## Next Up

- Add the next planned feature unit here.

## Open Questions

- Add unresolved product or implementation questions here.

## Architecture Decisions

- Design is dark-only; all theme tokens live in globals.css as CSS custom properties mapped through `@theme inline`.
- shadcn components import `cn` from the `cn` package directly (radix-nova preset convention). `lib/utils.ts` exports a separate `cn()` using clsx + tailwind-merge for use in custom components.
- Do not modify generated `components/ui/*` files.

## Session Notes

- shadcn CLI version 4.21.0 used; preset: radix-nova (Lucide + Geist).
- `tw-animate-css` and `radix-ui` are installed as peer dependencies.
