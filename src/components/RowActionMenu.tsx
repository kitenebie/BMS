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

interface RowActionMenuProps {
  aipId: string
  onDeleteRequest: (id: string) => void
}

export function RowActionMenu({ aipId, onDeleteRequest }: RowActionMenuProps) {
  const handleQuickAction = () => {
    toast.success("Opening AIP Programs")
  }

  const handleView = () => {
    toast.info("Viewing AIP details")
  }

  const handleEdit = () => {
    toast.info("Opening edit modal")
  }

  const handleClone = () => {
    toast.info("Opening clone flow")
  }

  return (
    <div className="flex items-center justify-end gap-2 opacity-80 group-hover:opacity-100 transition-opacity">
      <Button 
        variant="ghost" 
        size="sm" 
        className="h-8 px-2 text-green-700 bg-green-50 hover:bg-green-100 hover:text-green-800"
        onClick={handleQuickAction}
        aria-label="Programs"
        title="Programs"
      >
        <Plus className="h-4 w-4 mr-1" />
        <span className="text-xs font-medium">Programs</span>
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
            onClick={() => onDeleteRequest(aipId)} 
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
