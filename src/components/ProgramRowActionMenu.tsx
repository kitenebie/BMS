import { useState } from "react"
import { 
  MoreHorizontal, 
  Plus, 
  Pencil, 
  Trash2, 
  Eye, 
  Copy 
} from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/src/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu"

interface ProgramRowActionMenuProps {
  programId: string
  onDeleteRequest?: (id: string) => void
  onAddSubProgram?: (id: string) => void
  onEdit?: (id: string) => void
}

export function ProgramRowActionMenu({ programId, onDeleteRequest, onAddSubProgram, onEdit }: ProgramRowActionMenuProps) {
  const handleQuickAction = () => {
    if (onAddSubProgram) {
      onAddSubProgram(programId)
    } else {
      toast.success("Opening Sub-Program Modal")
    }
  }

  const handleView = () => {
    toast.info("Viewing Program details")
  }

  const handleEdit = () => {
    if (onEdit) {
      onEdit(programId)
    } else {
      toast.info("Opening edit modal")
    }
  }

  const handleClone = () => {
    toast.info("Opening clone flow")
  }

  const handleDelete = () => {
    if (onDeleteRequest) {
      onDeleteRequest(programId)
    } else {
      toast.error("Delete requested")
    }
  }

  return (
    <div className="flex items-center justify-end gap-2 opacity-80 group-hover:opacity-100 transition-opacity">
      <Button 
        variant="ghost" 
        size="sm" 
        className="h-8 px-2 text-indigo-700 bg-indigo-50 hover:bg-indigo-100 hover:text-indigo-800"
        onClick={handleQuickAction}
        aria-label="Sub-Program"
        title="Sub-Program"
      >
        <Plus className="h-4 w-4 mr-1" />
        <span className="text-xs font-medium">Sub-Program</span>
      </Button>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8 text-slate-500 hover:text-slate-900"
            aria-label="Open menu"
          >
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuItem onClick={handleView} className="gap-2 cursor-pointer">
            <Eye className="h-4 w-4 text-slate-500" />
            View Details
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleEdit} className="gap-2 cursor-pointer">
            <Pencil className="h-4 w-4 text-slate-500" />
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleClone} className="gap-2 cursor-pointer">
            <Copy className="h-4 w-4 text-slate-500" />
            Clone
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem 
            onClick={handleDelete} 
            className="gap-2 cursor-pointer text-red-600 focus:text-red-600 focus:bg-red-50"
          >
            <Trash2 className="h-4 w-4" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
