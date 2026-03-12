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
  CheckCircle2,
  Plus,
  Trash2
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

export type MainAIPEntry = {
  id: string
  department: string
  sector: string
  subSector: string
  aipCode: string
  projectProgramActivity: string
}

const createEmptyEntry = (): MainAIPEntry => ({
  id: Math.random().toString(36).substr(2, 9),
  department: "",
  sector: "",
  subSector: "",
  aipCode: "",
  projectProgramActivity: "",
})

interface MainAnnualInvestmentPlanModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  showRepeater?: boolean
}

export function MainAnnualInvestmentPlanModal({ 
  open, 
  onOpenChange,
  showRepeater = true,
}: MainAnnualInvestmentPlanModalProps) {
  const [entries, setEntries] = useState<MainAIPEntry[]>([createEmptyEntry()])
  const [errors, setErrors] = useState<Record<string, Record<string, string>>>({})
  const [isDirty, setIsDirty] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showConfirmClose, setShowConfirmClose] = useState(false)

  // Initialize form
  useEffect(() => {
    if (open) {
      setEntries([createEmptyEntry()])
      setErrors({})
      setIsDirty(false)
    }
  }, [open])

  const handleEntryChange = (entryId: string, field: keyof MainAIPEntry, value: string) => {
    setEntries(prev => prev.map(entry => {
      if (entry.id !== entryId) return entry
      
      let updatedEntry = { ...entry, [field]: value }
      
      // Reset sub-sector if sector changes
      if (field === "sector") {
        updatedEntry.subSector = ""
      }
      
      // Auto-generate AIP Code hint based on department (mock logic)
      if (field === "department" && !entry.aipCode) {
        const deptCode = value.split(" | ")[0]
        if (deptCode) {
          updatedEntry.aipCode = `1000-000-${deptCode}-000-000`
        }
      }
      
      return updatedEntry
    }))
    setIsDirty(true)
    
    // Clear error for this field
    if (errors[entryId]?.[field]) {
      setErrors(prev => ({
        ...prev,
        [entryId]: {
          ...prev[entryId],
          [field]: ""
        }
      }))
    }
  }

  const addEntry = () => {
    setEntries(prev => [...prev, createEmptyEntry()])
    setIsDirty(true)
  }

  const removeEntry = (entryId: string) => {
    if (entries.length > 1) {
      setEntries(prev => prev.filter(entry => entry.id !== entryId))
      setIsDirty(true)
    }
  }

  const validateEntry = (entry: MainAIPEntry): Record<string, string> => {
    const entryErrors: Record<string, string> = {}
    
    if (!entry.department) entryErrors.department = "Department is required"
    if (!entry.sector) entryErrors.sector = "Sector is required"
    if (!entry.subSector) entryErrors.subSector = "Sub-sector is required"
    if (!entry.aipCode) {
      entryErrors.aipCode = "AIP Code is required"
    } else if (!/^[0-9-]+$/.test(entry.aipCode)) {
      entryErrors.aipCode = "AIP Code format is invalid"
    }
    if (!entry.projectProgramActivity.trim()) {
      entryErrors.projectProgramActivity = "Project / Program / Activity is required"
    }
    
    return entryErrors
  }

  const validateForm = () => {
    const allErrors: Record<string, Record<string, string>> = {}
    let hasErrors = false
    
    entries.forEach(entry => {
      const entryErrors = validateEntry(entry)
      if (Object.keys(entryErrors).length > 0) {
        allErrors[entry.id] = entryErrors
        hasErrors = true
      }
    })
    
    setErrors(allErrors)
    return !hasErrors
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
      toast.success(`${entries.length} Main AIP(s) saved successfully`)
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

  const getAvailableSubSectors = (sector: string) => {
    return subSectorsBySector[sector] || []
  }

  const getEntrySummary = (entry: MainAIPEntry) => {
    return {
      department: entry.department || "Not selected",
      sector: entry.sector || "Not selected",
      subSector: entry.subSector || "Not selected",
      aipCode: entry.aipCode || "Not generated",
    }
  }

  return (
    <>
      <Dialog open={open} onOpenChange={(val) => {
        if (!val) handleCloseClick()
      }}>
        <DialogContent 
          className="max-w-[1400px] w-[95vw] p-0 overflow-hidden gap-0 rounded-2xl bg-slate-50/50"
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
                  Create primary AIP entries for departments, sectors, and program classifications.
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

          {/* Scrollable Form Body - Repeater */}
          <div className="overflow-y-auto max-h-[calc(90vh-180px)] p-6 space-y-2">
            {entries.map((entry, index) => {
              const summary = getEntrySummary(entry)
              return (
                <div key={entry.id} className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                  {/* Entry Header */}
                  <div className="bg-slate-50/80 border-b border-slate-100 px-5 py-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-slate-800">AIP Entry #{index + 1}</span>
                    </div>
                    {entries.length > 1 && showRepeater && (
                      <Button 
                        variant="ghost" 
                        size="sm"
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        onClick={() => removeEntry(entry.id)}
                      >
                        <Trash2 className="h-4 w-4 mr-1" />
                        Remove
                      </Button>
                    )}
                  </div>

                  <div className="p-5 space-y-6">
                    {/* Classification Details */}
                    <div className="flex flex-col xl:flex-row gap-8">
                      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="space-y-2 lg:col-span-2">
                          <Label htmlFor={`department-${entry.id}`} className="text-slate-700 font-medium">
                            Department <span className="text-red-500">*</span>
                          </Label>
                          <Select 
                            value={entry.department} 
                            onValueChange={(val) => handleEntryChange(entry.id, "department", val)}
                          >
                            <SelectTrigger id={`department-${entry.id}`} className={`h-11 ${errors[entry.id]?.department ? "border-red-500 ring-red-500" : ""}`}>
                              <SelectValue placeholder="Select department" />
                            </SelectTrigger>
                            <SelectContent>
                              {departments.map((dept) => (
                                <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          {errors[entry.id]?.department && <p className="text-xs text-red-500 font-medium">{errors[entry.id].department}</p>}
                        </div>

                        <div className="space-y-2 lg:col-span-2">
                          <Label htmlFor={`sector-${entry.id}`} className="text-slate-700 font-medium">
                            Sector <span className="text-red-500">*</span>
                          </Label>
                          <Select 
                            value={entry.sector} 
                            onValueChange={(val) => handleEntryChange(entry.id, "sector", val)}
                          >
                            <SelectTrigger id={`sector-${entry.id}`} className={`h-11 ${errors[entry.id]?.sector ? "border-red-500 ring-red-500" : ""}`}>
                              <SelectValue placeholder="Select sector" />
                            </SelectTrigger>
                            <SelectContent>
                              {sectors.map((sector) => (
                                <SelectItem key={sector} value={sector}>{sector}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          {errors[entry.id]?.sector && <p className="text-xs text-red-500 font-medium">{errors[entry.id].sector}</p>}
                        </div>

                        <div className="space-y-2 lg:col-span-2">
                          <Label htmlFor={`subSector-${entry.id}`} className="text-slate-700 font-medium">
                            Sub-sector <span className="text-red-500">*</span>
                          </Label>
                          <Select 
                            value={entry.subSector} 
                            onValueChange={(val) => handleEntryChange(entry.id, "subSector", val)}
                            disabled={!entry.sector}
                          >
                            <SelectTrigger id={`subSector-${entry.id}`} className={`h-11 ${errors[entry.id]?.subSector ? "border-red-500 ring-red-500" : ""}`}>
                              <SelectValue placeholder={entry.sector ? "Select sub-sector" : "Select a sector first"} />
                            </SelectTrigger>
                            <SelectContent>
                              {getAvailableSubSectors(entry.sector).map((sub) => (
                                <SelectItem key={sub} value={sub}>{sub}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          {errors[entry.id]?.subSector && <p className="text-xs text-red-500 font-medium">{errors[entry.id].subSector}</p>}
                        </div>

                        <div className="space-y-2 lg:col-span-2">
                          <Label htmlFor={`aipCode-${entry.id}`} className="text-slate-700 font-medium">
                            AIP Code <span className="text-red-500">*</span>
                          </Label>
                          <div className="relative">
                            <Hash className="absolute left-3 top-3.5 h-4 w-4 text-slate-400" />
                            <Input 
                              id={`aipCode-${entry.id}`}
                              value={entry.aipCode}
                              onChange={(e) => handleEntryChange(entry.id, "aipCode", e.target.value)}
                              placeholder="e.g. 1000-000-2-01-01-000-000"
                              className={`pl-9 h-11 font-mono text-slate-700 ${errors[entry.id]?.aipCode ? "border-red-500 ring-red-500" : ""}`}
                            />
                          </div>
                          {errors[entry.id]?.aipCode ? (
                            <p className="text-xs text-red-500 font-medium">{errors[entry.id].aipCode}</p>
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
                              {summary.department}
                            </span>
                          </div>
                          <div>
                            <span className="text-xs text-slate-500 block mb-1">Sector</span>
                            <span className="text-sm font-medium text-slate-900 line-clamp-2">
                              {summary.sector}
                            </span>
                          </div>
                          <div>
                            <span className="text-xs text-slate-500 block mb-1">Sub-sector</span>
                            <span className="text-sm font-medium text-slate-900 line-clamp-2">
                              {summary.subSector}
                            </span>
                          </div>
                        </div>
                        <div className="pt-4 mt-4 border-t border-slate-200">
                          <span className="text-xs text-slate-500 block mb-1">AIP Code</span>
                          <span className="text-base font-bold text-indigo-700 font-mono break-all">
                            {summary.aipCode}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Program Details */}
                    <div className="space-y-2">
                      <Label htmlFor={`projectProgramActivity-${entry.id}`} className="text-slate-700 font-medium">
                        Project / Program / Activity <span className="text-red-500">*</span>
                      </Label>
                      <Textarea 
                        id={`projectProgramActivity-${entry.id}`}
                        value={entry.projectProgramActivity}
                        onChange={(e) => handleEntryChange(entry.id, "projectProgramActivity", e.target.value)}
                        placeholder="Enter the official office, project, or program title..."
                        className={`min-h-[120px] text-base resize-y p-4 ${errors[entry.id]?.projectProgramActivity ? "border-red-500 ring-red-500" : ""}`}
                      />
                      {errors[entry.id]?.projectProgramActivity ? (
                        <p className="text-xs text-red-500 font-medium">{errors[entry.id].projectProgramActivity}</p>
                      ) : (
                        <p className="text-xs text-slate-500">Enter the official office, project, or program title.</p>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}

            {/* Add Another Entry Button (only shown when repeater is enabled) */}
            {showRepeater && (
              <Button 
                variant="outline" 
                className="w-full border-dashed border-2 h-12 text-slate-500 hover:text-slate-700 hover:border-slate-300"
                onClick={addEntry}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Another AIP Entry
              </Button>
            )}
          </div>

          {/* Sticky Footer */}
          <div className="sticky bottom-0 z-20 bg-white border-t border-slate-200 px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
            <p className="text-sm text-slate-500 flex items-center gap-1.5">
              <Info className="h-4 w-4 text-slate-400" />
              {entries.length} AIP master record(s) will be created.
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
                    Save {entries.length > 1 ? `${entries.length} AIPs` : 'Main AIP'}
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
