"use client"

import { Pencil, Plus, Trash2, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs"
import { useProjectDialogs } from "@/hooks/use-project-dialogs"
import type { Project } from "@/lib/mock-projects"
import { cn } from "@/lib/utils"

interface ProjectSidebarProps {
  isOpen: boolean
  onClose: () => void
}

export function ProjectSidebar({ isOpen, onClose }: ProjectSidebarProps) {
  const {
    openCreate,
    ownedProjects,
    sharedProjects,
    projectsTab,
    setProjectsTab,
    isLoading,
  } = useProjectDialogs()

  function handleClose() {
    onClose()
    // Return focus to the navbar toggle once state has flushed
    requestAnimationFrame(() => {
      document.querySelector<HTMLElement>("[data-sidebar-toggle]")?.focus()
    })
  }

  return (
    <>
      {isOpen ? (
        <div
          className="fixed inset-0 top-12 z-30 bg-black/50 md:hidden"
          onClick={handleClose}
          aria-hidden="true"
        />
      ) : null}

      <aside
        inert={!isOpen}
        className={cn(
          "fixed left-0 top-12 bottom-0 z-40 flex w-72 flex-col",
          "bg-elevated border-r border-border shadow-2xl",
          "transition-transform duration-300 ease-in-out",
          isOpen ? "translate-x-0" : "-translate-x-full",
        )}
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
          <Tabs
            value={projectsTab}
            onValueChange={(value) => {
              if (value === "my-projects" || value === "shared") {
                setProjectsTab(value)
              }
            }}
            className="flex flex-1 flex-col"
          >
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
              className="flex flex-1 flex-col overflow-y-auto"
            >
              <ProjectList
                projects={ownedProjects}
                emptyLabel="No projects yet"
                showActions
              />
            </TabsContent>

            <TabsContent
              value="shared"
              className="flex flex-1 flex-col overflow-y-auto"
            >
              <ProjectList
                projects={sharedProjects}
                emptyLabel="No shared projects"
                showActions={false}
              />
            </TabsContent>
          </Tabs>
        </div>

        {/* Footer */}
        <div className="border-t border-border p-3">
          <Button
            variant="outline"
            className="w-full gap-2"
            onClick={openCreate}
            disabled={isLoading}
          >
            <Plus className="h-4 w-4" />
            New Project
          </Button>
        </div>
      </aside>
    </>
  )
}

function ProjectList({
  projects,
  emptyLabel,
  showActions,
}: {
  projects: Project[]
  emptyLabel: string
  showActions: boolean
}) {
  const { openRename, openDelete, isLoading } = useProjectDialogs()

  if (projects.length === 0) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <p className="text-sm text-text-muted">{emptyLabel}</p>
      </div>
    )
  }

  return (
    <ul className="flex flex-col gap-1 pt-3">
      {projects.map((project) => (
        <li
          key={project.id}
          className="flex items-center gap-1 rounded-xl px-2 py-1.5 hover:bg-subtle"
        >
          <span className="min-w-0 flex-1 truncate text-sm text-text-primary">
            {project.name}
          </span>
          {showActions ? (
            <div className="flex shrink-0 items-center">
              <Button
                type="button"
                variant="ghost"
                size="icon-sm"
                aria-label={`Rename ${project.name}`}
                onClick={() => openRename(project)}
                disabled={isLoading}
              >
                <Pencil className="h-4 w-4" />
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="icon-sm"
                aria-label={`Delete ${project.name}`}
                onClick={() => openDelete(project)}
                disabled={isLoading}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ) : null}
        </li>
      ))}
    </ul>
  )
}
