"use client"

import { bulkDeleteTransactionsAction, bulkUpdateTransactionsAction } from "@/app/(app)/transactions/actions"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Category, Project } from "@/prisma/client"
import { Trash2, X } from "lucide-react"
import { useState } from "react"

interface BulkActionsMenuProps {
  selectedIds: string[]
  categories?: Category[]
  projects?: Project[]
  onActionComplete?: () => void
}

export function BulkActionsMenu({
  selectedIds,
  categories = [],
  projects = [],
  onActionComplete,
}: BulkActionsMenuProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedProject, setSelectedProject] = useState<string | null>(null)

  const handleBulkUpdate = async () => {
    if (!selectedCategory && !selectedProject) {
      alert("Sélectionnez au moins une catégorie ou un projet")
      return
    }

    try {
      setIsLoading(true)
      const result = await bulkUpdateTransactionsAction(selectedIds, {
        categoryCode: selectedCategory || undefined,
        projectCode: selectedProject || undefined,
      })
      if (!result.success) {
        throw new Error(result.error)
      }
      onActionComplete?.()
    } catch (error) {
      console.error("Failed to update transactions:", error)
      alert(`Erreur lors de la mise à jour: ${error}`)
    } finally {
      setIsLoading(false)
      setSelectedCategory(null)
      setSelectedProject(null)
    }
  }

  const handleDelete = async () => {
    const confirmMessage = `Êtes-vous sûr de vouloir supprimer ces ${selectedIds.length} transactions et tous leurs fichiers? Cette action ne peut pas être annulée.`
    if (!confirm(confirmMessage)) return

    try {
      setIsLoading(true)
      const result = await bulkDeleteTransactionsAction(selectedIds)
      if (!result.success) {
        throw new Error(result.error)
      }
      onActionComplete?.()
    } catch (error) {
      console.error("Failed to delete transactions:", error)
      alert(`Erreur lors de la suppression: ${error}`)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 p-4 bg-white dark:bg-slate-900 rounded-lg shadow-lg border">
      <div className="flex flex-col gap-3 min-w-[350px]">
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium">{selectedIds.length} sélectionnés</span>
          <button
            onClick={() => onActionComplete?.()}
            className="text-muted-foreground hover:text-foreground"
            title="Fermer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {categories.length > 0 && (
          <Select value={selectedCategory || ""} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Sélectionner une catégorie" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">Aucune catégorie</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category.code} value={category.code}>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: category.color }} />
                    {category.name}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}

        {projects.length > 0 && (
          <Select value={selectedProject || ""} onValueChange={setSelectedProject}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Sélectionner un projet" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">Aucun projet</SelectItem>
              {projects.map((project) => (
                <SelectItem key={project.code} value={project.code}>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: project.color }} />
                    {project.name}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}

        <div className="flex gap-2">
          <Button
            onClick={handleBulkUpdate}
            disabled={isLoading || (!selectedCategory && !selectedProject)}
            className="flex-1"
          >
            Appliquer
          </Button>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={isLoading}
            className="gap-2"
            title="Supprimer les transactions"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
