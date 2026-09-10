"use client"

import type { FormEvent } from "react"
import { Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { useProjectDialogs } from "@/hooks/use-project-dialogs"

function handleDialogOpenChange(
  open: boolean,
  isLoading: boolean,
  close: () => void,
) {
  if (!open && !isLoading) {
    close()
  }
}

function preventDismissWhileLoading(isLoading: boolean) {
  return (event: { preventDefault: () => void }) => {
    if (isLoading) {
      event.preventDefault()
    }
  }
}

function BusyButtonLabel({
  isLoading,
  idle,
  busy,
}: {
  isLoading: boolean
  idle: string
  busy: string
}) {
  if (!isLoading) {
    return idle
  }

  return (
    <>
      <Loader2 className="animate-spin" />
      {busy}
    </>
  )
}

export function ProjectDialogs() {
  const {
    activeDialog,
    targetProject,
    projectName,
    slugPreview,
    isLoading,
    setProjectName,
    close,
    submit,
  } = useProjectDialogs()

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    void submit()
  }

  const currentName = targetProject?.name ?? "this project"

  return (
    <>
      <Dialog
        open={activeDialog === "create"}
        onOpenChange={(open) => handleDialogOpenChange(open, isLoading, close)}
      >
        <DialogContent
          className="rounded-3xl"
          aria-busy={isLoading}
          onPointerDownOutside={preventDismissWhileLoading(isLoading)}
          onEscapeKeyDown={preventDismissWhileLoading(isLoading)}
        >
          <DialogHeader>
            <DialogTitle>Create project</DialogTitle>
            <DialogDescription>
              Name the workspace. A URL slug is generated from the name.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="grid gap-4">
            <div className="grid gap-2">
              <label htmlFor="create-project-name" className="text-sm font-medium">
                Project name
              </label>
              <Input
                id="create-project-name"
                type="text"
                name="projectName"
                value={projectName}
                onChange={(event) => setProjectName(event.target.value)}
                placeholder="Payments Platform"
                disabled={isLoading}
                autoComplete="off"
                spellCheck={false}
                className="text-text-primary caret-text-primary"
              />
              <p
                className="pointer-events-none text-sm text-text-muted"
                aria-live="polite"
              >
                Slug:{" "}
                <span className="font-mono text-text-secondary">
                  {slugPreview || "—"}
                </span>
              </p>
            </div>
            <DialogFooter className="rounded-b-3xl">
              <Button
                type="button"
                variant="outline"
                onClick={close}
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading || !projectName.trim()}>
                <BusyButtonLabel
                  isLoading={isLoading}
                  idle="Create"
                  busy="Creating"
                />
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog
        open={activeDialog === "rename"}
        onOpenChange={(open) => handleDialogOpenChange(open, isLoading, close)}
      >
        <DialogContent
          className="rounded-3xl"
          aria-busy={isLoading}
          onPointerDownOutside={preventDismissWhileLoading(isLoading)}
          onEscapeKeyDown={preventDismissWhileLoading(isLoading)}
        >
          <DialogHeader>
            <DialogTitle>Rename project</DialogTitle>
            <DialogDescription>
              The current name is {currentName}.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="grid gap-4">
            <div className="grid gap-2">
              <label htmlFor="rename-project-name" className="text-sm font-medium">
                Project name
              </label>
              <Input
                id="rename-project-name"
                type="text"
                name="projectName"
                value={projectName}
                onChange={(event) => setProjectName(event.target.value)}
                disabled={isLoading}
                autoFocus
                autoComplete="off"
                spellCheck={false}
                className="text-text-primary caret-text-primary"
              />
            </div>
            <DialogFooter className="rounded-b-3xl">
              <Button
                type="button"
                variant="outline"
                onClick={close}
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading || !projectName.trim()}>
                <BusyButtonLabel
                  isLoading={isLoading}
                  idle="Rename"
                  busy="Renaming"
                />
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog
        open={activeDialog === "delete"}
        onOpenChange={(open) => handleDialogOpenChange(open, isLoading, close)}
      >
        <DialogContent
          className="rounded-3xl"
          aria-busy={isLoading}
          onPointerDownOutside={preventDismissWhileLoading(isLoading)}
          onEscapeKeyDown={preventDismissWhileLoading(isLoading)}
        >
          <DialogHeader>
            <DialogTitle>Delete project</DialogTitle>
            <DialogDescription>
              This will permanently delete {currentName}.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="rounded-b-3xl">
            <Button
              type="button"
              variant="outline"
              onClick={close}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              type="button"
              variant="destructive"
              onClick={() => {
                void submit()
              }}
              disabled={isLoading}
            >
              <BusyButtonLabel
                isLoading={isLoading}
                idle="Delete"
                busy="Deleting"
              />
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
