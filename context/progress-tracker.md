# Progress Tracker

Update this file whenever the current phase, active feature, or implementation state changes.

## Current Phase

- Feature implementation — Auth ✓

## Current Goal

- Define the next feature to implement.

## Completed

- Next.js boilerplate cleanup (stripped globals.css, removed public SVGs, minimal page.tsx).
- **01-design-system** — shadcn/ui (radix-nova preset) initialised; button, card, dialog, input, tabs, textarea, scroll-area added; lucide-react installed; `lib/utils.ts` cn() helper created; globals.css rewritten with full dark-only token set mapped to shadcn CSS variables via `@theme inline`; layout.tsx updated with `dark` class and "ghost AI" metadata.
- **02-editor-chrome** — `components/editor/editor-navbar.tsx` created: fixed-height top navbar, left/center/right sections, `PanelLeftOpen`/`PanelLeftClose` toggle, dark `bg-surface` background with `border-border` bottom border. `components/editor/project-sidebar.tsx` created: floating overlay (fixed, z-40), slides in from left via CSS transform transition, `isOpen`/`onClose` props, "Projects" header with close button, shadcn Tabs (My Projects / Shared) with empty placeholder states, full-width "New Project" button with `Plus` icon. `app/page.tsx` updated to wire both components together with local `sidebarOpen` state. Zero TS errors, zero lint errors.
- **03-auth** — `@clerk/ui` installed. Root layout wraps the app in `ClerkProvider` with Clerk’s `dark` theme and appearance variables mapped to existing CSS tokens (no hardcoded colors). `proxy.ts` at the project root protects all routes except `NEXT_PUBLIC_CLERK_SIGN_IN_URL` and `NEXT_PUBLIC_CLERK_SIGN_UP_URL`. `/` redirects authenticated users to `/editor` and unauthenticated users to sign-in. Dedicated `/sign-in` and `/sign-up` catch-all pages use Clerk components in a two-panel layout (logo, tagline, text-only feature list on large screens; form only on small screens). Editor navbar right section renders Clerk’s default `UserButton`. `npm run build` passes.

## In Progress

- None.

## Next Up

- Add the next planned feature unit here.

## Open Questions

- None.

## Architecture Decisions

- Design is dark-only; all theme tokens live in globals.css as CSS custom properties mapped through `@theme inline`.
- shadcn components import `cn` from the `cn` package directly (radix-nova preset convention). `lib/utils.ts` exports a separate `cn()` using clsx + tailwind-merge for use in custom components.
- Do not modify generated `components/ui/*` files.
- Auth uses Clerk’s `dark` theme as the base, with appearance variables overridden from app CSS custom properties.
- Route protection is protected-first in `proxy.ts`: only the Clerk sign-in and sign-up env var paths are public.

## Session Notes

- shadcn CLI version 4.21.0 used; preset: radix-nova (Lucide + Geist).
- `tw-animate-css` and `radix-ui` are installed as peer dependencies.
- Clerk appearance lives in `lib/clerk-appearance.ts`. Auth page chrome lives in `components/auth/auth-split-layout.tsx`.
- Clerk keys were added locally. Unauthenticated `/` and `/editor` redirect to `/sign-in`; `/sign-in` and `/sign-up` return 200 with the split layout.
