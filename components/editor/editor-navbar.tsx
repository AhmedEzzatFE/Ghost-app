"use client"

import { PanelLeftOpen, PanelLeftClose } from "lucide-react"
import { UserButton } from "@clerk/nextjs"
import { Button } from "@/components/ui/button"

interface EditorNavbarProps {
  isSidebarOpen: boolean
  onSidebarToggle: () => void
}

export function EditorNavbar({ isSidebarOpen, onSidebarToggle }: EditorNavbarProps) {
  return (
    <header className="fixed inset-x-0 top-0 z-50 flex h-12 items-center bg-surface border-b border-border">
      {/* Left section */}
      <div className="flex items-center px-3">
        <Button
          variant="ghost"
          size="icon"
          onClick={onSidebarToggle}
          aria-label={isSidebarOpen ? "Close sidebar" : "Open sidebar"}
          data-sidebar-toggle=""
        >
          {isSidebarOpen ? (
            <PanelLeftClose className="h-5 w-5" />
          ) : (
            <PanelLeftOpen className="h-5 w-5" />
          )}
        </Button>
      </div>

      {/* Center section */}
      <div className="flex-1" />

      {/* Right section */}
      <div className="flex items-center px-3">
        <UserButton />
      </div>
    </header>
  )
}
