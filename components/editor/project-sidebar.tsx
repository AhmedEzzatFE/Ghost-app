"use client"

import { X, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs"

interface ProjectSidebarProps {
  isOpen: boolean
  onClose: () => void
}

export function ProjectSidebar({ isOpen, onClose }: ProjectSidebarProps) {
  function handleClose() {
    onClose()
    // Return focus to the navbar toggle once state has flushed
    requestAnimationFrame(() => {
      document.querySelector<HTMLElement>("[data-sidebar-toggle]")?.focus()
    })
  }

  return (
    <aside
      inert={!isOpen}
      className={[
        "fixed left-0 top-12 bottom-0 z-40 flex w-72 flex-col",
        "bg-elevated border-r border-border shadow-2xl",
        "transition-transform duration-300 ease-in-out",
        isOpen ? "translate-x-0" : "-translate-x-full",
      ].join(" ")}
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border px-4 py-3">
        <span className="text-sm font-semibold text-text-primary">Projects</span>
        <Button
          variant="ghost"
          size="icon-sm"
          onClick={handleClose}
          aria-label="Close sidebar"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>

      {/* Tabs */}
      <div className="flex flex-1 flex-col overflow-hidden p-3">
        <Tabs defaultValue="my-projects" className="flex flex-1 flex-col">
          <TabsList className="w-full">
            <TabsTrigger value="my-projects" className="flex-1">
              My Projects
            </TabsTrigger>
            <TabsTrigger value="shared" className="flex-1">
              Shared
            </TabsTrigger>
          </TabsList>

          <TabsContent
            value="my-projects"
            className="flex flex-1 items-center justify-center"
          >
            <p className="text-sm text-text-muted">No projects yet</p>
          </TabsContent>

          <TabsContent
            value="shared"
            className="flex flex-1 items-center justify-center"
          >
            <p className="text-sm text-text-muted">No shared projects</p>
          </TabsContent>
        </Tabs>
      </div>

      {/* Footer */}
      <div className="border-t border-border p-3">
        <Button variant="outline" className="w-full gap-2">
          <Plus className="h-4 w-4" />
          New Project
        </Button>
      </div>
    </aside>
  )
}
