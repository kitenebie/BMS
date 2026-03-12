import React, { useState, useEffect } from "react"
import { 
  FilePlus, 
  Building2, 
  CalendarDays, 
  Wallet, 
  BadgeCent, 
  ClipboardList, 
  Target, 
  X, 
  Loader2, 
  Save,
  AlertTriangle,
  CheckCircle2,
  Info
} from "lucide-react"
import { toast } from "sonner"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/src/components/ui/dialog"
import { Button } from "@/src/components/ui/button"
import { Input } from "@/src/components/ui/input"
import { Label } from "@/src/components/ui/label"
import { Textarea } from "@/src/components/ui/textarea"
import { Badge } from "@/src/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select"
import { formatCurrency } from "@/src/lib/utils"

interface AddProgramModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  selectedAip?: {
    aipCode: string
    office: string
    departmentCode: string
    sector: string
  }
}

const initialFormState = {
  aipCode: "",
  department: "",
  sector: "",
  subSector: "",
  dateStarted: "",
  dateCompleted: "",
  serviceType: "",
  fundType: "",
  expenseType: "",
  ccTypologyCode: "",
  amount: "",
  ccAmount: "",
  ppa: "",
  expectedOutput: "",
}

export function AddProgramModal({ open, onOpenChange, selectedAip }: AddProgramModalProps) {
  const [formData, setFormData] = useState(initialFormState)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isDirty, setIsDirty] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showConfirmClose, setShowConfirmClose] = useState(false)

  // Initialize form with selected AIP data when opened
  useEffect(() => {
    if (open && selectedAip) {
      setFormData({
        ...initialFormState,
        aipCode: selectedAip.aipCode,
        department: selectedAip.office,
        sector: selectedAip.sector,
      })
      setErrors({})
      setIsDirty(false)
    } else if (open) {
      setFormData(initialFormState)
      setErrors({})
      setIsDirty(false)
    }
  }, [open, selectedAip])

  const handleChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    setIsDirty(true)
    // Clear error for this field when user types
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[field]
        return newErrors
      })
    }
  }

  const handleAmountChange = (field: "amount" | "ccAmount", value: string) => {
    // Only allow numbers and decimals
    const numericValue = value.replace(/[^0-9.]/g, "")
    handleChange(field, numericValue)
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.aipCode) newErrors.aipCode = "AIP Code is required"
    if (!formData.department) newErrors.department = "Department is required"
    if (!formData.sector) newErrors.sector = "Sector is required"
    if (!formData.dateStarted) newErrors.dateStarted = "Date Started is required"
    if (!formData.dateCompleted) newErrors.dateCompleted = "Date Completed is required"
    
    if (formData.dateStarted && formData.dateCompleted) {
      if (new Date(formData.dateCompleted) < new Date(formData.dateStarted)) {
        newErrors.dateCompleted = "Date Completed cannot be earlier than Date Started"
      }
    }

    if (!formData.expenseType) newErrors.expenseType = "Expense Type is required"
    
    if (!formData.amount) {
      newErrors.amount = "Amount is required"
    } else if (parseFloat(formData.amount) <= 0) {
      newErrors.amount = "Amount must be greater than 0"
    }

    if (!formData.ppa.trim()) newErrors.ppa = "Project/Program/Activity is required"
    if (!formData.expectedOutput.trim()) newErrors.expectedOutput = "Expected Output is required"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSave = () => {
    if (!validateForm()) {
      toast.error("Please fix the errors in the form")
      return
    }

    setIsSubmitting(true)
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setIsDirty(false)
      toast.success("Program entry saved successfully")
      onOpenChange(false)
    }, 1500)
  }

  const handleInteractOutside = (e: Event) => {
    e.preventDefault()
    if (isDirty) {
      setShowConfirmClose(true)
    } else {
      onOpenChange(false)
    }
  }

  const handleCloseClick = () => {
    if (isDirty) {
      setShowConfirmClose(true)
    } else {
      onOpenChange(false)
    }
  }

  const confirmClose = () => {
    setShowConfirmClose(false)
    onOpenChange(false)
  }

  const numericAmount = parseFloat(formData.amount) || 0

  return (
    <>
      <Dialog open={open} onOpenChange={(val) => {
        if (!val) handleCloseClick()
      }}>
        <DialogContent 
          className="max-w-[1200px] w-[95vw] p-0 overflow-hidden gap-0 rounded-2xl bg-slate-50/50"
          onInteractOutside={handleInteractOutside}
          hideCloseButton
        >
          {/* Sticky Header */}
          <div className="sticky top-0 z-20 bg-white border-b border-slate-200 px-6 py-4 shadow-sm">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <div className="bg-green-100 p-2 rounded-lg">
                    <FilePlus className="h-5 w-5 text-green-700" />
                  </div>
                  <DialogTitle className="text-2xl font-bold text-slate-900">Add Program</DialogTitle>
                  <Badge variant="secondary" className="bg-green-50 text-green-700 hover:bg-green-100 border-green-200 ml-2">
                    <CheckCircle2 className="h-3 w-3 mr-1" />
                    AIP Main Linked
                  </Badge>
                </div>
                <DialogDescription className="text-slate-500 text-base">
                  Create a new program entry under the selected AIP Main record.
                </DialogDescription>
              </div>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8 rounded-full text-slate-500 hover:bg-slate-100 hover:text-slate-900"
                onClick={handleCloseClick}
              >
                <X className="h-5 w-5" />
                <span className="sr-only">Close</span>
              </Button>
            </div>

            {/* Selected AIP Summary Strip */}
            <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 bg-slate-50 border border-slate-200 rounded-lg px-4 py-3">
              <div className="flex flex-col">
                <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">AIP Main Code</span>
                <span className="text-sm font-mono font-semibold text-slate-900">{selectedAip?.aipCode || "1000-000-2-01-01-000-000"}</span>
              </div>
              <div className="w-px h-8 bg-slate-200 hidden sm:block"></div>
              <div className="flex flex-col">
                <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">Office</span>
                <span className="text-sm font-semibold text-slate-900">{selectedAip?.office || "OFFICE OF THE CITY MAYOR (OCM)"}</span>
              </div>
              <div className="w-px h-8 bg-slate-200 hidden md:block"></div>
              <div className="flex flex-col">
                <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">Department Code</span>
                <span className="text-sm font-semibold text-slate-900">{selectedAip?.departmentCode || "2-01-001"}</span>
              </div>
            </div>
          </div>

          {/* Scrollable Form Body */}
          <div className="overflow-y-auto max-h-[calc(90vh-200px)] p-6 space-y-8">
            
            {/* SECTION 1: PROGRAM REFERENCE */}
            <section className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="bg-slate-50/80 border-b border-slate-100 px-5 py-3 flex items-center gap-2">
                <Building2 className="h-4 w-4 text-slate-500" />
                <h3 className="font-semibold text-slate-800">Program Reference</h3>
              </div>
              <div className="p-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="aipCode" className="text-slate-700">AIP Code <span className="text-red-500">*</span></Label>
                  <Input 
                    id="aipCode" 
                    value={formData.aipCode} 
                    readOnly
                    className="bg-slate-50 border-slate-200 text-slate-600 font-mono"
                  />
                  {errors.aipCode && <p className="text-xs text-red-500 font-medium">{errors.aipCode}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="department" className="text-slate-700">Department <span className="text-red-500">*</span></Label>
                  <Input 
                    id="department" 
                    value={formData.department} 
                    readOnly
                    className="bg-slate-50 border-slate-200 text-slate-600"
                  />
                  {errors.department && <p className="text-xs text-red-500 font-medium">{errors.department}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sector" className="text-slate-700">Sector <span className="text-red-500">*</span></Label>
                  <Input 
                    id="sector" 
                    value={formData.sector} 
                    readOnly
                    className="bg-slate-50 border-slate-200 text-slate-600"
                  />
                  {errors.sector && <p className="text-xs text-red-500 font-medium">{errors.sector}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subSector" className="text-slate-700">Sub-sector</Label>
                  <Select value={formData.subSector} onValueChange={(val) => handleChange("subSector", val)}>
                    <SelectTrigger id="subSector" className={errors.subSector ? "border-red-500 ring-red-500" : ""}>
                      <SelectValue placeholder="Select sub-sector" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1000-01">General Public Services</SelectItem>
                      <SelectItem value="2000-01">Education</SelectItem>
                      <SelectItem value="3000-01">Health</SelectItem>
                      <SelectItem value="4000-01">Economic Services</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </section>

            {/* SECTION 2: TIMELINE & CLASSIFICATION */}
            <section className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="bg-slate-50/80 border-b border-slate-100 px-5 py-3 flex items-center gap-2">
                <CalendarDays className="h-4 w-4 text-slate-500" />
                <h3 className="font-semibold text-slate-800">Timeline & Classification</h3>
              </div>
              <div className="p-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="dateStarted" className="text-slate-700">Date Started <span className="text-red-500">*</span></Label>
                  <Input 
                    id="dateStarted" 
                    type="date"
                    value={formData.dateStarted} 
                    onChange={(e) => handleChange("dateStarted", e.target.value)}
                    className={errors.dateStarted ? "border-red-500 ring-red-500" : ""}
                  />
                  {errors.dateStarted && <p className="text-xs text-red-500 font-medium">{errors.dateStarted}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dateCompleted" className="text-slate-700">Date Completed <span className="text-red-500">*</span></Label>
                  <Input 
                    id="dateCompleted" 
                    type="date"
                    value={formData.dateCompleted} 
                    onChange={(e) => handleChange("dateCompleted", e.target.value)}
                    className={errors.dateCompleted ? "border-red-500 ring-red-500" : ""}
                  />
                  {errors.dateCompleted && <p className="text-xs text-red-500 font-medium">{errors.dateCompleted}</p>}
                </div>
                <div className="col-span-1 sm:col-span-2 lg:col-span-2 flex items-center">
                  <p className="text-sm text-slate-500 flex items-center gap-1.5 bg-slate-50 px-3 py-2 rounded-md border border-slate-100 w-full">
                    <Info className="h-4 w-4 text-blue-500 shrink-0" />
                    Program dates should fall within the selected budget year.
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="serviceType" className="text-slate-700">Service Type</Label>
                  <Select value={formData.serviceType} onValueChange={(val) => handleChange("serviceType", val)}>
                    <SelectTrigger id="serviceType">
                      <SelectValue placeholder="Select service type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="general">General Services</SelectItem>
                      <SelectItem value="social">Social Services</SelectItem>
                      <SelectItem value="economic">Economic Services</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fundType" className="text-slate-700">Fund Type</Label>
                  <Select value={formData.fundType} onValueChange={(val) => handleChange("fundType", val)}>
                    <SelectTrigger id="fundType">
                      <SelectValue placeholder="Select fund type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="gf">General Fund</SelectItem>
                      <SelectItem value="sef">Special Education Fund</SelectItem>
                      <SelectItem value="tf">Trust Fund</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="expenseType" className="text-slate-700">Expense Type <span className="text-red-500">*</span></Label>
                  <Select value={formData.expenseType} onValueChange={(val) => handleChange("expenseType", val)}>
                    <SelectTrigger id="expenseType" className={errors.expenseType ? "border-red-500 ring-red-500" : ""}>
                      <SelectValue placeholder="Select expense type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ps">Personal Services (PS)</SelectItem>
                      <SelectItem value="mooe">MOOE</SelectItem>
                      <SelectItem value="co">Capital Outlay (CO)</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.expenseType && <p className="text-xs text-red-500 font-medium">{errors.expenseType}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ccTypologyCode" className="text-slate-700">CC Typology Code</Label>
                  <Input 
                    id="ccTypologyCode" 
                    value={formData.ccTypologyCode} 
                    onChange={(e) => handleChange("ccTypologyCode", e.target.value)}
                    placeholder="Enter code"
                  />
                </div>
              </div>
            </section>

            {/* SECTION 3: FINANCIAL DETAILS */}
            <section className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="bg-slate-50/80 border-b border-slate-100 px-5 py-3 flex items-center gap-2">
                <Wallet className="h-4 w-4 text-slate-500" />
                <h3 className="font-semibold text-slate-800">Financial Details</h3>
              </div>
              <div className="p-5 flex flex-col lg:flex-row gap-8">
                <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="amount" className="text-slate-700">Amount <span className="text-red-500">*</span></Label>
                    <div className="relative">
                      <span className="absolute left-3 top-2.5 text-slate-500 font-medium">₱</span>
                      <Input 
                        id="amount" 
                        value={formData.amount} 
                        onChange={(e) => handleAmountChange("amount", e.target.value)}
                        placeholder="0.00"
                        className={`pl-8 text-right font-mono ${errors.amount ? "border-red-500 ring-red-500" : ""}`}
                      />
                    </div>
                    {errors.amount && <p className="text-xs text-red-500 font-medium">{errors.amount}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="ccAmount" className="text-slate-700">CC Amount</Label>
                    <div className="relative">
                      <span className="absolute left-3 top-2.5 text-slate-500 font-medium">₱</span>
                      <Input 
                        id="ccAmount" 
                        value={formData.ccAmount} 
                        onChange={(e) => handleAmountChange("ccAmount", e.target.value)}
                        placeholder="0.00"
                        className="pl-8 text-right font-mono"
                      />
                    </div>
                  </div>
                </div>
                
                {/* Derived Summary Card */}
                <div className="w-full lg:w-72 bg-slate-50 border border-slate-200 rounded-lg p-4 shrink-0">
                  <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                    <BadgeCent className="h-3.5 w-3.5" />
                    Financial Summary
                  </h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-start text-sm">
                      <span className="text-slate-500">Fund Type:</span>
                      <span className="font-medium text-slate-900 text-right">
                        {formData.fundType === 'gf' ? 'General Fund' : 
                         formData.fundType === 'sef' ? 'Special Education Fund' : 
                         formData.fundType === 'tf' ? 'Trust Fund' : '-'}
                      </span>
                    </div>
                    <div className="flex justify-between items-start text-sm">
                      <span className="text-slate-500">Expense Type:</span>
                      <span className="font-medium text-slate-900 text-right">
                        {formData.expenseType === 'ps' ? 'Personal Services' : 
                         formData.expenseType === 'mooe' ? 'MOOE' : 
                         formData.expenseType === 'co' ? 'Capital Outlay' : '-'}
                      </span>
                    </div>
                    <div className="pt-3 border-t border-slate-200 flex justify-between items-center">
                      <span className="text-slate-700 font-medium">Total Amount:</span>
                      <span className="text-lg font-bold text-green-700 font-mono">
                        {formatCurrency(numericAmount)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 4: DESCRIPTIVE DETAILS */}
            <section className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="bg-slate-50/80 border-b border-slate-100 px-5 py-3 flex items-center gap-2">
                <ClipboardList className="h-4 w-4 text-slate-500" />
                <h3 className="font-semibold text-slate-800">Descriptive Details</h3>
              </div>
              <div className="p-5 grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="ppa" className="text-slate-700">Project / Program / Activity <span className="text-red-500">*</span></Label>
                  <Textarea 
                    id="ppa" 
                    value={formData.ppa} 
                    onChange={(e) => handleChange("ppa", e.target.value)}
                    placeholder="Describe the project, program, or activity..."
                    className={`min-h-[120px] resize-y ${errors.ppa ? "border-red-500 ring-red-500" : ""}`}
                  />
                  {errors.ppa && <p className="text-xs text-red-500 font-medium">{errors.ppa}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="expectedOutput" className="text-slate-700">Expected Output <span className="text-red-500">*</span></Label>
                  <Textarea 
                    id="expectedOutput" 
                    value={formData.expectedOutput} 
                    onChange={(e) => handleChange("expectedOutput", e.target.value)}
                    placeholder="What are the expected deliverables or outcomes?"
                    className={`min-h-[120px] resize-y ${errors.expectedOutput ? "border-red-500 ring-red-500" : ""}`}
                  />
                  {errors.expectedOutput && <p className="text-xs text-red-500 font-medium">{errors.expectedOutput}</p>}
                </div>
              </div>
            </section>

          </div>

          {/* Sticky Footer */}
          <div className="sticky bottom-0 z-20 bg-white border-t border-slate-200 px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
            <p className="text-sm text-slate-500 flex items-center gap-1.5">
              <Target className="h-4 w-4 text-slate-400" />
              Review all classification and financial details before saving.
            </p>
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <Button 
                variant="outline" 
                onClick={handleCloseClick}
                className="w-full sm:w-auto"
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button 
                variant="secondary" 
                className="w-full sm:w-auto bg-slate-100 text-slate-700 hover:bg-slate-200"
                disabled={isSubmitting}
                onClick={() => toast.success("Draft saved")}
              >
                Save Draft
              </Button>
              <Button 
                onClick={handleSave} 
                className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white min-w-[120px]"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    Save Program
                  </>
                )}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Unsaved Changes Confirmation Dialog */}
      <Dialog open={showConfirmClose} onOpenChange={setShowConfirmClose}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-amber-600">
              <AlertTriangle className="h-5 w-5" />
              Unsaved Changes
            </DialogTitle>
            <DialogDescription className="text-base text-slate-600 pt-2">
              You have unsaved changes. Are you sure you want to close this form? All your progress will be lost.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="mt-4">
            <Button variant="outline" onClick={() => setShowConfirmClose(false)}>
              Continue Editing
            </Button>
            <Button variant="destructive" onClick={confirmClose}>
              Discard Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
