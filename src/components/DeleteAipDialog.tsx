import { useState } from "react"
import { Loader2, AlertTriangle, Trash2 } from "lucide-react"
import { toast } from "sonner"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/src/components/ui/dialog"
import { Button } from "@/src/components/ui/button"

interface DeleteAipDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  aipId: string | null
  onSuccess?: () => void
}

export function DeleteAipDialog({
  open,
  onOpenChange,
  aipId,
  onSuccess,
}: DeleteAipDialogProps) {
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = () => {
    if (!aipId) return
    
    setIsDeleting(true)
    
    // Simulate async delete
    setTimeout(() => {
      setIsDeleting(false)
      onOpenChange(false)
      toast.success("AIP record deleted")
      if (onSuccess) onSuccess()
    }, 1500)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-red-600 flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            Delete AIP Record
          </DialogTitle>
          <DialogDescription className="text-base text-slate-600 pt-2">
            Are you sure you want to delete this AIP record? This action cannot be undone and will permanently remove the record from the database.
          </DialogDescription>
        </DialogHeader>

        {aipId && (
          <div className="bg-slate-50 border border-slate-100 rounded-lg p-3 my-2">
            <p className="text-sm text-slate-500">
              Record ID: <span className="font-mono font-medium text-slate-900">{aipId}</span>
            </p>
          </div>
        )}

        <DialogFooter className="gap-2 sm:gap-0 mt-4">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isDeleting}
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={isDeleting}
            className="gap-2 min-w-[120px]"
          >
            {isDeleting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Deleting...
              </>
            ) : (
              <>
                <Trash2 className="h-4 w-4" />
                Delete
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
