import { useState } from "react"
import { Loader2, AlertTriangle, Copy, X } from "lucide-react"
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

const availableYears = ["2023", "2024", "2025", "2026", "2027", "2028"]

interface CloneAipMainModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CloneAipMainModal({ open, onOpenChange }: CloneAipMainModalProps) {
  const [sourceYear, setSourceYear] = useState<string>("2026")
  const [targetYear, setTargetYear] = useState<string>("2027")
  const [isConfirming, setIsConfirming] = useState(false)
  const [isCloning, setIsCloning] = useState(false)

  const handleClone = () => {
    if (!sourceYear || !targetYear) return
    setIsConfirming(true)
  }

  const confirmClone = () => {
    setIsCloning(true)
    setTimeout(() => {
      setIsCloning(false)
      setIsConfirming(false)
      onOpenChange(false)
      toast.success("AIP Main cloned successfully")
    }, 1500)
  }

  const isSameYear = sourceYear === targetYear
  const isFormValid = sourceYear && targetYear && !isSameYear

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-[760px] p-0 overflow-hidden gap-0 dark:bg-slate-900">
          <div className="p-6 sm:p-8">
            <DialogHeader className="mb-6">
              <DialogTitle className="text-2xl font-bold text-slate-900 dark:text-slate-100">Clone AIP Main</DialogTitle>
              <DialogDescription className="text-base text-slate-500 dark:text-slate-400">
                Clone your AIP records by year
              </DialogDescription>
            </DialogHeader>

            <Alert variant="warning" className="mb-8">
              <AlertTriangle className="h-5 w-5" />
              <AlertDescription className="text-sm font-medium">
                Please make sure that cloning will be done individually. Multiple clone operations at the same time may affect the database.
              </AlertDescription>
            </Alert>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-3">
                <Label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Select existing year to clone (Source)</Label>
                <Select value={sourceYear} onValueChange={setSourceYear}>
                  <SelectTrigger className="h-11">
                    <SelectValue placeholder="Select year" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableYears.map((year) => (
                      <SelectItem key={`source-${year}`} value={year}>
                        {year}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {!sourceYear && (
                  <p className="text-sm text-red-500 dark:text-red-400 font-medium">Source year is required</p>
                )}
              </div>

              <div className="space-y-3">
                <Label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Select year as cloned (Target)</Label>
                <Select value={targetYear} onValueChange={setTargetYear}>
                  <SelectTrigger className="h-11">
                    <SelectValue placeholder="Select year" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableYears.map((year) => (
                      <SelectItem key={`target-${year}`} value={year}>
                        {year}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {!targetYear && (
                  <p className="text-sm text-red-500 dark:text-red-400 font-medium">Target year is required</p>
                )}
                {isSameYear && sourceYear && targetYear && (
                  <p className="text-sm text-red-500 dark:text-red-400 font-medium">Source and target year cannot be the same</p>
                )}
              </div>
            </div>
          </div>

          <div className="bg-slate-50 dark:bg-slate-800/50 px-6 py-4 sm:px-8 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">
              Clone one year at a time for safety.
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
                onClick={handleClone} 
                disabled={!isFormValid}
                className="w-full sm:w-auto h-11 px-6 bg-green-600 hover:bg-green-700 dark:bg-emerald-600 dark:hover:bg-emerald-700 text-white gap-2"
              >
                <Copy className="h-4 w-4" />
                Clone Records
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Confirmation Dialog */}
      <Dialog open={isConfirming} onOpenChange={setIsConfirming}>
        <DialogContent className="max-w-md dark:bg-slate-900">
          <DialogHeader>
            <DialogTitle className="dark:text-slate-100">Confirm Clone</DialogTitle>
            <DialogDescription className="dark:text-slate-400">
              Are you sure you want to clone AIP Main from {sourceYear} to {targetYear}?
            </DialogDescription>
          </DialogHeader>
          
          <div className="bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 rounded-lg p-4 my-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-slate-500 dark:text-slate-400">Source Year:</span>
              <span className="font-semibold text-slate-900 dark:text-slate-100">{sourceYear}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-500 dark:text-slate-400">Target Year:</span>
              <span className="font-semibold text-slate-900 dark:text-slate-100">{targetYear}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-500 dark:text-slate-400">Action:</span>
              <span className="font-semibold text-slate-900 dark:text-slate-100">Clone AIP Main Records</span>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsConfirming(false)} disabled={isCloning}>
              Cancel
            </Button>
            <Button 
              onClick={confirmClone} 
              disabled={isCloning}
              className="bg-green-600 hover:bg-green-700 dark:bg-emerald-600 dark:hover:bg-emerald-700 text-white gap-2 min-w-[120px]"
            >
              {isCloning ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Cloning...
                </>
              ) : (
                "Yes, Clone"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
