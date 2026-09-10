"use client"

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react"
import {
  MOCK_OWNED_PROJECTS,
  MOCK_SHARED_PROJECTS,
  type Project,
} from "@/lib/mock-projects"
import { toProjectSlug } from "@/lib/project-slug"

export type ProjectDialog = "create" | "rename" | "delete"
export type ProjectsTab = "my-projects" | "shared"

export interface ProjectDialogsController {
  activeDialog: ProjectDialog | null
  targetProject: Project | null
  projectName: string
  slugPreview: string
  isLoading: boolean
  ownedProjects: Project[]
  sharedProjects: Project[]
  projectsTab: ProjectsTab
  setProjectsTab: (tab: ProjectsTab) => void
  setProjectName: (name: string) => void
  openCreate: () => void
  openRename: (project: Project) => void
  openDelete: (project: Project) => void
  close: () => void
  submit: () => Promise<void>
}

const ProjectDialogsContext = createContext<ProjectDialogsController | null>(
  null,
)

const MOCK_SAVE_DELAY_MS = 500

function wait(ms: number) {
  return new Promise<void>((resolve) => {
    setTimeout(resolve, ms)
  })
}

function createOwnedProject(name: string): Project {
  const trimmed = name.trim()

  return {
    id: `proj_${crypto.randomUUID()}`,
    name: trimmed,
    slug: toProjectSlug(trimmed) || "project",
  }
}

function useProjectDialogsState(
  onProjectCreated?: () => void,
): ProjectDialogsController {
  const [activeDialog, setActiveDialog] = useState<ProjectDialog | null>(null)
  const [targetProject, setTargetProject] = useState<Project | null>(null)
  const [projectName, setProjectName] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [ownedProjects, setOwnedProjects] = useState<Project[]>(() => [
    ...MOCK_OWNED_PROJECTS,
  ])
  const [sharedProjects] = useState<Project[]>(() => [...MOCK_SHARED_PROJECTS])
  const [projectsTab, setProjectsTab] = useState<ProjectsTab>("my-projects")
  const submittingRef = useRef(false)

  const slugPreview = toProjectSlug(projectName)

  const openCreate = useCallback(() => {
    if (submittingRef.current) return
    setTargetProject(null)
    setProjectName("")
    setIsLoading(false)
    setActiveDialog("create")
  }, [])

  const openRename = useCallback((project: Project) => {
    if (submittingRef.current) return
    setTargetProject(project)
    setProjectName(project.name)
    setIsLoading(false)
    setActiveDialog("rename")
  }, [])

  const openDelete = useCallback((project: Project) => {
    if (submittingRef.current) return
    setTargetProject(project)
    setProjectName(project.name)
    setIsLoading(false)
    setActiveDialog("delete")
  }, [])

  const close = useCallback(() => {
    if (isLoading) return
    setActiveDialog(null)
    setTargetProject(null)
    setProjectName("")
  }, [isLoading])

  const submit = useCallback(async () => {
    if (submittingRef.current) return
    if (activeDialog !== "delete" && !projectName.trim()) return

    const dialog = activeDialog
    const name = projectName.trim()
    const target = targetProject

    submittingRef.current = true
    setIsLoading(true)

    try {
      await wait(MOCK_SAVE_DELAY_MS)

      if (dialog === "create") {
        setOwnedProjects((current) => [createOwnedProject(name), ...current])
        setProjectsTab("my-projects")
        onProjectCreated?.()
      }

      if (dialog === "rename" && target) {
        const slug = toProjectSlug(name) || target.slug
        setOwnedProjects((current) =>
          current.map((project) =>
            project.id === target.id ? { ...project, name, slug } : project,
          ),
        )
      }

      if (dialog === "delete" && target) {
        setOwnedProjects((current) =>
          current.filter((project) => project.id !== target.id),
        )
      }

      setActiveDialog(null)
      setTargetProject(null)
      setProjectName("")
    } finally {
      submittingRef.current = false
      setIsLoading(false)
    }
  }, [activeDialog, onProjectCreated, projectName, targetProject])

  return useMemo(
    () => ({
      activeDialog,
      targetProject,
      projectName,
      slugPreview,
      isLoading,
      ownedProjects,
      sharedProjects,
      projectsTab,
      setProjectsTab,
      setProjectName,
      openCreate,
      openRename,
      openDelete,
      close,
      submit,
    }),
    [
      activeDialog,
      targetProject,
      projectName,
      slugPreview,
      isLoading,
      ownedProjects,
      sharedProjects,
      projectsTab,
      openCreate,
      openRename,
      openDelete,
      close,
      submit,
    ],
  )
}

export function ProjectDialogsProvider({
  children,
  onProjectCreated,
}: {
  children: ReactNode
  onProjectCreated?: () => void
}) {
  const value = useProjectDialogsState(onProjectCreated)

  return (
    <ProjectDialogsContext.Provider value={value}>
      {children}
    </ProjectDialogsContext.Provider>
  )
}

export function useProjectDialogs(): ProjectDialogsController {
  const context = useContext(ProjectDialogsContext)

  if (!context) {
    throw new Error("useProjectDialogs must be used within a ProjectDialogsProvider")
  }

  return context
}
