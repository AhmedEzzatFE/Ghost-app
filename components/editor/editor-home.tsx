"use client";

import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useProjectDialogs } from "@/hooks/use-project-dialogs";

export function EditorHome() {
  const { openCreate, isLoading } = useProjectDialogs();

  return (
    <main className="flex min-h-screen items-center justify-center px-6 pt-12">
      <div className="flex max-w-lg flex-col items-center gap-4 text-center">
        <h1 className="text-2xl font-medium text-text-primary">
          Create a project or open an existing one
        </h1>
        <p className="text-sm text-text-muted">
          Start a new architecture workspace, or choose a project from the
          sidebar.
        </p>
        <Button className="gap-2" onClick={openCreate} disabled={isLoading}>
          <Plus className="h-4 w-4" />
          New Project
        </Button>
      </div>
    </main>
  );
}
