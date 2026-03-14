import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import { Loader2, Save } from "lucide-react"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/src/components/ui/dialog"
import { Button } from "@/src/components/ui/button"
import { ProgramLinkSummaryCard } from "@/src/components/ProgramLinkSummaryCard"
import { UnsavedChangesDialog } from "@/src/components/UnsavedChangesDialog"
import { 
  SubProgramFormSections, 
  subProgramSchema, 
  SubProgramFormValues 
} from "@/src/components/SubProgramFormSections"

interface AddSubProgramModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

// Mock Data
const selectedProgram = {
  aipProgramCode: "1000-000-2-01-01-001-000",
  title: "EXECUTIVE MANAGEMENT",
  department: "2-01-001 | Office of the City Mayor",
  sector: "GENERAL ADMINISTRATIVE AND SUPPORT SERVICES"
}

const serviceTypes = [
  "Administrative Service",
  "Community Support",
  "Public Governance",
  "Operational Support"
]

const expenseTypes = [
  "PS",
  "MOOE",
  "CO"
]

const fundTypes = [
  "General Fund",
  "Special Education Fund",
  "Trust Fund"
]

const ccTypologyCodes = [
  "CC-101",
  "CC-205",
  "CC-310"
]

const defaultValues: SubProgramFormValues = {
  aipCode: "1000-000-2-01-01-001-001",
  department: "2-01-001 | Office of the City Mayor",
  sector: "GENERAL ADMINISTRATIVE AND SUPPORT SERVICES",
  subSector: "",
  dateStarted: "2025-01-01",
  dateCompleted: "2025-12-31",
  serviceType: "",
  fundType: "General Fund",
  expenseType: "",
  amount: "",
  ccTypologyCode: "",
  ccAmount: "",
  projectProgramActivity: "",
  expectedOutput: "",
  // Design section fields
  designType: "",
  designStatus: "",
  architecturalDesign: "",
  technicalSpecs: "",
  location: "",
}

export function AddSubProgramModal({ open, onOpenChange }: AddSubProgramModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showUnsavedDialog, setShowUnsavedDialog] = useState(false)

  const form = useForm<SubProgramFormValues>({
    resolver: zodResolver(subProgramSchema),
    defaultValues,
    mode: "onChange",
  })

  const { handleSubmit, formState: { isDirty, isValid }, reset } = form

  const handleClose = (isOpen: boolean) => {
    if (!isOpen) {
      if (isDirty) {
        setShowUnsavedDialog(true)
      } else {
        onOpenChange(false)
        reset()
      }
    } else {
      onOpenChange(true)
    }
  }

  const handleConfirmDiscard = () => {
    setShowUnsavedDialog(false)
    onOpenChange(false)
    reset()
  }

  const onSubmit = async (data: SubProgramFormValues) => {
    setIsSubmitting(true)
    
    // Simulate API request
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    setIsSubmitting(false)
    toast.success("Sub-Program saved successfully")
    onOpenChange(false)
    reset()
  }

  return (
    <>
      <Dialog open={open} onOpenChange={handleClose}>
        <DialogContent 
          className="max-w-[1200px] xl:max-w-[1400px] p-0 gap-0 shadow-2xl sm:rounded-2xl overflow-hidden flex flex-col max-h-[90vh]"
          hideCloseButton
        >
          {/* STICKY HEADER */}
          <DialogHeader className="px-6 py-5 border-b border-slate-300/70 dark:border-white/[0.06] bg-[#F0F0F0]/75 dark:bg-[#12121a]/65 sticky top-0 z-20 shadow-sm backdrop-blur-xl">
            <div className="flex items-start justify-between">
              <div>
                <DialogTitle className="text-2xl font-bold text-slate-900 dark:text-slate-100">Add Program for:</DialogTitle>
              </div>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8 rounded-full text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-100"
                onClick={() => handleClose(false)}
              >
                <span className="sr-only">Close</span>
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-4 w-4"><path d="M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>
              </Button>
            </div>
            
            <ProgramLinkSummaryCard 
              aipProgramCode={selectedProgram.aipProgramCode}
              title={selectedProgram.title}
              department={selectedProgram.department}
              sector={selectedProgram.sector}
            />
          </DialogHeader>

          {/* SCROLLABLE BODY */}
          <div className="flex-1 overflow-y-auto px-6 py-2 bg-[#F0F0F0]/30 dark:bg-[#0a0a0f]/20">
            <form id="sub-program-form" onSubmit={handleSubmit(onSubmit)}>
              <SubProgramFormSections 
                form={form}
                serviceTypes={serviceTypes}
                expenseTypes={expenseTypes}
                fundTypes={fundTypes}
                ccTypologyCodes={ccTypologyCodes}
              />
            </form>
          </div>

          {/* STICKY FOOTER */}
          <DialogFooter className="px-6 py-4 border-t border-slate-300/70 dark:border-white/[0.06] bg-[#F0F0F0]/75 dark:bg-[#12121a]/65 sticky bottom-0 z-20 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] dark:shadow-[0_-10px_30px_rgba(0,0,0,0.45)] backdrop-blur-xl flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <p className="text-sm text-slate-500 dark:text-slate-400 italic">
              Ensure classification and financial details are correct before saving.
            </p>
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => handleClose(false)}
                className="w-full sm:w-auto"
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                form="sub-program-form"
                className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white gap-2"
                disabled={!isValid || isSubmitting}
              >
                {isSubmitting ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Save className="h-4 w-4" />
                )}
                {isSubmitting ? "Saving..." : "Save Sub-Program"}
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <UnsavedChangesDialog 
        open={showUnsavedDialog} 
        onOpenChange={setShowUnsavedDialog}
        onConfirm={handleConfirmDiscard}
      />
    </>
  )
}
