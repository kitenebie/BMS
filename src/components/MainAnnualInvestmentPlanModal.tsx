import React, { useState, useEffect } from "react"
import { 
  FolderTree, 
  Building2, 
  Layers3, 
  Hash, 
  FileText, 
  Save, 
  X, 
  Loader2, 
  AlertTriangle,
  Info,
  CheckCircle2
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

// Mock Data
const departments = [
  "2-01-001 | Office of the City Mayor",
  "2-01-002 | Office of the City Vice-Mayor",
  "2-01-003 | Office of the Sangguniang Panlungsod",
  "2-01-005 | Office of the City Treasurer",
  "2-01-006 | Office of the City Assessor",
  "2-01-007 | Office of the City Accountant",
  "2-01-008 | Office of the City Budget Officer",
  "2-01-009 | Office of the City Planning and Development Coordinator",
]

const sectors = [
  "GENERAL ADMINISTRATIVE AND SUPPORT SERVICES",
  "SOCIAL SERVICES",
  "ECONOMIC SERVICES",
  "ENVIRONMENTAL SERVICES",
]

const subSectorsBySector: Record<string, string[]> = {
  "GENERAL ADMINISTRATIVE AND SUPPORT SERVICES": [
    "Executive Governance",
    "Legislative Support",
    "Finance Administration",
    "Planning and Coordination",
  ],
  "SOCIAL SERVICES": [
    "Health Services",
    "Education Support",
    "Community Welfare",
  ],
  "ECONOMIC SERVICES": [
    "Infrastructure Development",
    "Agricultural Support",
    "Tourism Promotion",
  ],
  "ENVIRONMENTAL SERVICES": [
    "Waste Management",
    "Disaster Preparedness",
    "Environmental Protection",
  ],
}

const initialFormState = {
  department: "",
  sector: "",
  subSector: "",
  aipCode: "",
  projectProgramActivity: "",
}

interface MainAnnualInvestmentPlanModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  defaultValues?: typeof initialFormState
}

export function MainAnnualInvestmentPlanModal({ 
  open, 
  onOpenChange,
  defaultValues
}: MainAnnualInvestmentPlanModalProps) {
  const [formData, setFormData] = useState(initialFormState)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isDirty, setIsDirty] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showConfirmClose, setShowConfirmClose] = useState(false)

  // Initialize form
  useEffect(() => {
    if (open) {
      if (defaultValues) {
        setFormData(defaultValues)
      } else {
        setFormData(initialFormState)
      }
      setErrors({})
      setIsDirty(false)
    }
  }, [open, defaultValues])

  const handleChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => {
      const newData = { ...prev, [field]: value }
      
      // Reset sub-sector if sector changes
      if (field === "sector") {
        newData.subSector = ""
      }
      
      // Auto-generate AIP Code hint based on department (mock logic)
      if (field === "department" && !prev.aipCode) {
        const deptCode = value.split(" | ")[0]
        if (deptCode) {
          newData.aipCode = `1000-000-${deptCode}-000-000`
        }
      }
      
      return newData
    })
    setIsDirty(true)
    
    // Clear error for this field
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[field]
        return newErrors
      })
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.department) newErrors.department = "Department is required"
    if (!formData.sector) newErrors.sector = "Sector is required"
    if (!formData.subSector) newErrors.subSector = "Sub-sector is required"
    
    if (!formData.aipCode) {
      newErrors.aipCode = "AIP Code is required"
    } else if (!/^[0-9-]+$/.test(formData.aipCode)) {
      newErrors.aipCode = "AIP Code format is invalid"
    }
    
    if (!formData.projectProgramActivity.trim()) {
      newErrors.projectProgramActivity = "Project / Program / Activity is required"
    }

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
      toast.success("Main AIP saved successfully")
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

  const availableSubSectors = formData.sector ? subSectorsBySector[formData.sector] || [] : []

  return (
    <>
      <Dialog open={open} onOpenChange={(val) => {
        if (!val) handleCloseClick()
      }}>
        <DialogContent 
          className="max-w-[1180px] w-[95vw] p-0 overflow-hidden gap-0 rounded-2xl bg-slate-50/50"
          onInteractOutside={handleInteractOutside}
          hideCloseButton
        >
          {/* Sticky Header */}
          <div className="sticky top-0 z-20 bg-white border-b border-slate-200 px-6 py-5 shadow-sm">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-3 mb-1.5">
                  <div className="bg-indigo-100 p-2 rounded-lg">
                    <FolderTree className="h-5 w-5 text-indigo-700" />
                  </div>
                  <DialogTitle className="text-2xl font-bold text-slate-900">Main Annual Investment Plan</DialogTitle>
                  <Badge variant="secondary" className="bg-indigo-50 text-indigo-700 hover:bg-indigo-100 border-indigo-200 ml-2">
                    <CheckCircle2 className="h-3 w-3 mr-1" />
                    Master Record
                  </Badge>
                </div>
                <DialogDescription className="text-slate-500 text-base">
                  Create or update a primary AIP entry for a department, sector, and program classification.
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
          </div>

          {/* Scrollable Form Body */}
          <div className="overflow-y-auto max-h-[calc(88vh-160px)] p-6 space-y-8">
            
            {/* SECTION 1: CLASSIFICATION DETAILS */}
            <section className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="bg-slate-50/80 border-b border-slate-100 px-5 py-3 flex items-center gap-2">
                <Layers3 className="h-4 w-4 text-slate-500" />
                <h3 className="font-semibold text-slate-800">Classification Details</h3>
              </div>
              
              <div className="p-5 flex flex-col xl:flex-row gap-8">
                <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="space-y-2 lg:col-span-2">
                    <Label htmlFor="department" className="text-slate-700 font-medium">Department <span className="text-red-500">*</span></Label>
                    <Select value={formData.department} onValueChange={(val) => handleChange("department", val)}>
                      <SelectTrigger id="department" className={`h-11 ${errors.department ? "border-red-500 ring-red-500" : ""}`}>
                        <SelectValue placeholder="Select department" />
                      </SelectTrigger>
                      <SelectContent>
                        {departments.map((dept) => (
                          <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.department && <p className="text-xs text-red-500 font-medium">{errors.department}</p>}
                  </div>

                  <div className="space-y-2 lg:col-span-2">
                    <Label htmlFor="sector" className="text-slate-700 font-medium">Sector <span className="text-red-500">*</span></Label>
                    <Select value={formData.sector} onValueChange={(val) => handleChange("sector", val)}>
                      <SelectTrigger id="sector" className={`h-11 ${errors.sector ? "border-red-500 ring-red-500" : ""}`}>
                        <SelectValue placeholder="Select sector" />
                      </SelectTrigger>
                      <SelectContent>
                        {sectors.map((sector) => (
                          <SelectItem key={sector} value={sector}>{sector}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.sector && <p className="text-xs text-red-500 font-medium">{errors.sector}</p>}
                  </div>

                  <div className="space-y-2 lg:col-span-2">
                    <Label htmlFor="subSector" className="text-slate-700 font-medium">Sub-sector <span className="text-red-500">*</span></Label>
                    <Select 
                      value={formData.subSector} 
                      onValueChange={(val) => handleChange("subSector", val)}
                      disabled={!formData.sector}
                    >
                      <SelectTrigger id="subSector" className={`h-11 ${errors.subSector ? "border-red-500 ring-red-500" : ""}`}>
                        <SelectValue placeholder={formData.sector ? "Select sub-sector" : "Select a sector first"} />
                      </SelectTrigger>
                      <SelectContent>
                        {availableSubSectors.map((sub) => (
                          <SelectItem key={sub} value={sub}>{sub}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.subSector && <p className="text-xs text-red-500 font-medium">{errors.subSector}</p>}
                  </div>

                  <div className="space-y-2 lg:col-span-2">
                    <Label htmlFor="aipCode" className="text-slate-700 font-medium">AIP Code <span className="text-red-500">*</span></Label>
                    <div className="relative">
                      <Hash className="absolute left-3 top-3.5 h-4 w-4 text-slate-400" />
                      <Input 
                        id="aipCode" 
                        value={formData.aipCode} 
                        onChange={(e) => handleChange("aipCode", e.target.value)}
                        placeholder="e.g. 1000-000-2-01-01-000-000"
                        className={`pl-9 h-11 font-mono text-slate-700 ${errors.aipCode ? "border-red-500 ring-red-500" : ""}`}
                      />
                    </div>
                    {errors.aipCode ? (
                      <p className="text-xs text-red-500 font-medium">{errors.aipCode}</p>
                    ) : (
                      <p className="text-xs text-slate-500">Use the official AIP master code format.</p>
                    )}
                  </div>
                </div>

                {/* Live Summary Preview Card */}
                <div className="w-full xl:w-80 bg-slate-50 border border-slate-200 rounded-xl p-5 shrink-0 flex flex-col">
                  <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4 flex items-center gap-1.5">
                    <Info className="h-3.5 w-3.5" />
                    Classification Preview
                  </h4>
                  <div className="space-y-4 flex-1">
                    <div>
                      <span className="text-xs text-slate-500 block mb-1">Department</span>
                      <span className="text-sm font-medium text-slate-900 line-clamp-2">
                        {formData.department || <span className="text-slate-400 italic">Not selected</span>}
                      </span>
                    </div>
                    <div>
                      <span className="text-xs text-slate-500 block mb-1">Sector</span>
                      <span className="text-sm font-medium text-slate-900 line-clamp-2">
                        {formData.sector || <span className="text-slate-400 italic">Not selected</span>}
                      </span>
                    </div>
                    <div>
                      <span className="text-xs text-slate-500 block mb-1">Sub-sector</span>
                      <span className="text-sm font-medium text-slate-900 line-clamp-2">
                        {formData.subSector || <span className="text-slate-400 italic">Not selected</span>}
                      </span>
                    </div>
                  </div>
                  <div className="pt-4 mt-4 border-t border-slate-200">
                    <span className="text-xs text-slate-500 block mb-1">AIP Code</span>
                    <span className="text-base font-bold text-indigo-700 font-mono break-all">
                      {formData.aipCode || <span className="text-slate-400 italic font-sans text-sm font-normal">Not generated</span>}
                    </span>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 2: PROGRAM DETAILS */}
            <section className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="bg-slate-50/80 border-b border-slate-100 px-5 py-3 flex items-center gap-2">
                <FileText className="h-4 w-4 text-slate-500" />
                <h3 className="font-semibold text-slate-800">Program Details</h3>
              </div>
              <div className="p-5">
                <div className="space-y-2">
                  <Label htmlFor="projectProgramActivity" className="text-slate-700 font-medium">Project / Program / Activity <span className="text-red-500">*</span></Label>
                  <Textarea 
                    id="projectProgramActivity" 
                    value={formData.projectProgramActivity} 
                    onChange={(e) => handleChange("projectProgramActivity", e.target.value)}
                    placeholder="Enter the official office, project, or program title..."
                    className={`min-h-[160px] text-base resize-y p-4 ${errors.projectProgramActivity ? "border-red-500 ring-red-500" : ""}`}
                  />
                  {errors.projectProgramActivity ? (
                    <p className="text-xs text-red-500 font-medium">{errors.projectProgramActivity}</p>
                  ) : (
                    <p className="text-xs text-slate-500">Enter the official office, project, or program title.</p>
                  )}
                </div>
              </div>
            </section>

          </div>

          {/* Sticky Footer */}
          <div className="sticky bottom-0 z-20 bg-white border-t border-slate-200 px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
            <p className="text-sm text-slate-500 flex items-center gap-1.5">
              <Info className="h-4 w-4 text-slate-400" />
              Review classification details before saving this AIP master record.
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
                onClick={handleSave} 
                className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white min-w-[140px]"
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
                    Save Main AIP
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
