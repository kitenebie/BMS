import { useState } from "react"
import { Loader2, AlertTriangle, RotateCcw, X, Trash2 } from "lucide-react"
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
import { Label } from "@/src/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select"
import { Alert, AlertDescription } from "@/src/components/ui/alert"
import { Checkbox } from "@/src/components/ui/checkbox"

const rollbackYears = ["2023", "2024", "2025", "2026", "2027", "2028"]

interface RollbackAipClonesModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function RollbackAipClonesModal({ open, onOpenChange }: RollbackAipClonesModalProps) {
  const [selectedYear, setSelectedYear] = useState<string>("2026")
  const [isConfirming, setIsConfirming] = useState(false)
  const [isRollingBack, setIsRollingBack] = useState(false)
  const [hasConfirmedRisk, setHasConfirmedRisk] = useState(false)

  const handleRollbackClick = () => {
    if (!selectedYear) return
    setIsConfirming(true)
    setHasConfirmedRisk(false)
  }

  const confirmRollback = () => {
    setIsRollingBack(true)
    setTimeout(() => {
      setIsRollingBack(false)
      setIsConfirming(false)
      onOpenChange(false)
      toast.success("Cloned AIP records rolled back successfully")
    }, 1500)
  }

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-[680px] p-0 overflow-hidden gap-0">
          <div className="p-6 sm:p-8">
            <DialogHeader className="mb-6">
              <DialogTitle className="text-2xl font-bold text-slate-900 dark:text-slate-100">Rollback AIP Clones</DialogTitle>
              <DialogDescription className="text-base text-slate-500 dark:text-slate-400">
                Remove cloned AIP records for a specific year
              </DialogDescription>
            </DialogHeader>

            <Alert variant="destructive" className="mb-8 border-red-200 dark:border-red-900/50 bg-red-50/50 dark:bg-red-900/20">
              <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-400" />
              <AlertDescription className="text-sm font-medium text-red-800 dark:text-red-300">
                This will delete all cloned records for the selected year. Proceed with caution as this action is irreversible.
              </AlertDescription>
            </Alert>

            <div className="space-y-3">
              <Label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Select year to rollback</Label>
              <Select value={selectedYear} onValueChange={setSelectedYear}>
                <SelectTrigger className="h-11 max-w-sm">
                  <SelectValue placeholder="Select year" />
                </SelectTrigger>
                <SelectContent>
                  {rollbackYears.map((year) => (
                    <SelectItem key={`rollback-${year}`} value={year}>
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Only cloned AIP records for the selected year will be removed.
              </p>
              {!selectedYear && (
                <p className="text-sm text-red-500 dark:text-red-400 font-medium">Rollback year is required</p>
              )}
            </div>
          </div>

          <div className="bg-[#F0F0F0]/70 dark:bg-[#12121a]/50 px-6 py-4 sm:px-8 border-t border-slate-300/70 dark:border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4 backdrop-blur-xl">
            <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">
              This action removes cloned records for one year only.
            </p>
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <Button 
                variant="outline" 
                onClick={() => onOpenChange(false)}
                className="w-full sm:w-auto h-11 px-6"
              >
                Cancel
              </Button>
              <Button 
                onClick={handleRollbackClick} 
                disabled={!selectedYear}
                variant="destructive"
                className="w-full sm:w-auto h-11 px-6 gap-2"
              >
                <RotateCcw className="h-4 w-4" />
                Rollback
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Confirmation Dialog */}
      <Dialog open={isConfirming} onOpenChange={setIsConfirming}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-red-600 dark:text-red-400 flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              Confirm rollback
            </DialogTitle>
            <DialogDescription className="text-base text-slate-600 dark:text-slate-400 pt-2">
              Are you sure you want to remove all cloned AIP records for <strong className="text-slate-900 dark:text-slate-100">{selectedYear}</strong>? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          
          <div className="bg-red-50/50 dark:bg-red-900/20 border border-red-100 dark:border-red-900/50 rounded-lg p-4 my-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-slate-600 dark:text-slate-400">Year:</span>
              <span className="font-semibold text-slate-900 dark:text-slate-100">{selectedYear}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-600 dark:text-slate-400">Action:</span>
              <span className="font-semibold text-slate-900 dark:text-slate-100">Delete cloned AIP records</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-600 dark:text-slate-400">Risk Level:</span>
              <span className="font-semibold text-red-600 dark:text-red-400">High</span>
            </div>
          </div>

          <div className="flex items-start space-x-3 my-6">
            <Checkbox 
              id="confirm-risk" 
              checked={hasConfirmedRisk}
              onCheckedChange={(checked) => setHasConfirmedRisk(checked as boolean)}
              className="mt-1"
            />
            <div className="grid gap-1.5 leading-none">
              <label
                htmlFor="confirm-risk"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer text-slate-700 dark:text-slate-300"
              >
                I understand that this action is irreversible
              </label>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Please confirm only if you are certain that this year's cloned records should be deleted.
              </p>
            </div>
          </div>

          <DialogFooter className="gap-2 sm:gap-0">
            <Button variant="outline" onClick={() => setIsConfirming(false)} disabled={isRollingBack}>
              Keep Records
            </Button>
            <Button 
              onClick={confirmRollback} 
              disabled={isRollingBack || !hasConfirmedRisk}
              variant="destructive"
              className="gap-2 min-w-[140px]"
            >
              {isRollingBack ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Rolling back...
                </>
              ) : (
                <>
                  <Trash2 className="h-4 w-4" />
                  Yes, Rollback
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
