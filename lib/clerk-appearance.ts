import { dark } from "@clerk/ui/themes"

/**
 * Clerk appearance config.
 *
 * Uses the `dark` preset as the base, then overrides individual variables with
 * concrete hex / font values that match the app's design-system tokens exactly.
 * We resolve the token values here rather than passing CSS variable references
 * because Clerk renders its component tree outside the app's CSS cascade, so
 * `var(--accent-primary)` may not resolve inside Clerk's shadow context.
 */
export const clerkAppearance = {
  theme: dark,
  variables: {
    // ── Colours ─────────────────────────────────────────────────────────────
    colorPrimary:          "#00c8d4",          // --accent-primary
    colorDanger:           "#ff4d4f",          // --state-error
    colorSuccess:          "#34d399",          // --state-success
    colorWarning:          "#fbbf24",          // --state-warning
    colorNeutral:          "#c0c0cc",          // --text-secondary
    colorForeground:       "#f0f0f4",          // --text-primary
    colorPrimaryForeground:"#080809",          // --primary-foreground
    colorMutedForeground:  "#808090",          // --text-muted
    colorMuted:            "#1e1e23",          // --bg-subtle
    colorBackground:       "#111114",          // --bg-surface
    colorInputForeground:  "#f0f0f4",          // --text-primary
    colorInput:            "#1e1e23",          // --bg-subtle
    colorRing:             "#00c8d4",          // --accent-primary
    colorBorder:           "#2a2a30",          // --border-default
    colorModalBackdrop:    "#080809",          // --bg-base

    // ── Typography ──────────────────────────────────────────────────────────
    // `next/font` writes Geist to `--font-geist-sans` on <html>; pass both the
    // var reference *and* fallbacks so it resolves in Clerk's render context.
    fontFamily:     "var(--font-geist-sans), 'Geist', ui-sans-serif, system-ui, sans-serif",
    fontFamilyMono: "var(--font-geist-mono), 'Geist Mono', ui-monospace, monospace",

    // ── Shape ───────────────────────────────────────────────────────────────
    borderRadius: "0.5rem",                    // --radius-md
  },
}
