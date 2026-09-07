import { BrainCircuit, GitBranch, FileCode2 } from "lucide-react"
import type { LucideIcon } from "lucide-react"

interface AuthSplitLayoutProps {
  children: React.ReactNode
}

const features: Array<{ icon: LucideIcon; title: string; description: string }> = [
  {
    icon: BrainCircuit,
    title: "AI Architecture Generation",
    description:
      "Describe your system, AI maps it to nodes and edges on a live canvas.",
  },
  {
    icon: GitBranch,
    title: "Real-time Collaboration",
    description:
      "Live cursors, presence indicators, and shared node editing across your team.",
  },
  {
    icon: FileCode2,
    title: "Instant Spec Generation",
    description:
      "Export a complete Markdown technical spec directly from the canvas graph.",
  },
]

export function AuthSplitLayout({ children }: AuthSplitLayoutProps) {
  return (
    <div className="flex min-h-svh bg-base">

      {/* ── Left panel — 50 % ─────────────────────────────── */}
      <aside className="hidden w-1/2 flex-col border-r border-border bg-surface px-12 py-10 lg:flex">

        {/* Brand mark */}
        <div className="flex items-center gap-2.5">
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-accent text-[11px] font-bold text-primary-foreground">
            G
          </div>
          <span className="text-sm font-medium text-text-primary">Ghost AI</span>
        </div>

        {/* Hero — vertically centred inside the remaining space */}
        <div className="flex flex-1 flex-col justify-center">
          <h1 className="text-4xl font-bold leading-tight tracking-tight text-text-primary">
            Design systems at the<br />speed of thought.
          </h1>

          <p className="mt-5 max-w-xs text-sm leading-relaxed text-text-secondary">
            Describe your architecture in plain English. Ghost AI maps it to
            a shared canvas your whole team can refine in real time.
          </p>

          <ul className="mt-10 space-y-6">
            {features.map(({ icon: Icon, title, description }) => (
              <li key={title} className="flex items-start gap-4">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent-dim">
                  <Icon className="h-4 w-4 text-accent" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-text-primary">{title}</p>
                  <p className="mt-1 text-xs leading-relaxed text-text-secondary">
                    {description}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Footer */}
        <p className="text-xs text-text-faint">
          © 2026 Ghost AI. All rights reserved.
        </p>
      </aside>

      {/* ── Right panel — 50 % ─────────────────────────────── */}
      <main className="flex w-full items-center justify-center p-8 lg:w-1/2">
        {children}
      </main>

    </div>
  )
}
