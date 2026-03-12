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
  Info,
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
import { formatCurrency } from "@/src/lib/utils"

interface AddAIPSubProgramModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  selectedAip?: {
    aipCode: string
    office: string
    departmentCode: string
    sector: string
  }
  showRepeater?: boolean
  modalType?: "program" | "subprogram"
  selectedRow?: {
    aipCode: string
    programName: string
  }
}

// Mock data for dropdowns
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

// AIP Main records for selection
const aipMainRecords = [
  { id: "AIP-001", aipCode: "1000-000-2-01-01-000-000", office: "OFFICE OF THE CITY MAYOR (OCM)", department: "2-01-001 | Office of the City Mayor", sector: "GENERAL ADMINISTRATIVE AND SUPPORT SERVICES", subSector: "Executive Governance" },
  { id: "AIP-002", aipCode: "1000-000-2-01-02-000-000", office: "OFFICE OF THE CITY VICE-MAYOR (OCVM)", department: "2-01-002 | Office of the City Vice-Mayor", sector: "GENERAL ADMINISTRATIVE AND SUPPORT SERVICES", subSector: "Executive Governance" },
  { id: "AIP-003", aipCode: "1000-000-2-01-03-000-000", office: "OFFICE OF THE SANGGUNIANG PANLUNGSOD (SP) MEMBERS", department: "2-01-003 | Office of the Sangguniang Panlungsod", sector: "GENERAL ADMINISTRATIVE AND SUPPORT SERVICES", subSector: "Legislative Support" },
  { id: "AIP-004", aipCode: "1000-000-2-01-05-000-000", office: "OFFICE OF THE CITY TREASURER", department: "2-01-005 | Office of the City Treasurer", sector: "GENERAL ADMINISTRATIVE AND SUPPORT SERVICES", subSector: "Finance Administration" },
  { id: "AIP-005", aipCode: "1000-000-2-01-06-000-000", office: "OFFICE OF THE CITY ASSESSOR", department: "2-01-006 | Office of the City Assessor", sector: "GENERAL ADMINISTRATIVE AND SUPPORT SERVICES", subSector: "Finance Administration" },
  { id: "AIP-006", aipCode: "1000-000-2-01-07-000-000", office: "OFFICE OF THE CITY ACCOUNTANT", department: "2-01-007 | Office of the City Accountant", sector: "GENERAL ADMINISTRATIVE AND SUPPORT SERVICES", subSector: "Finance Administration" },
  { id: "AIP-007", aipCode: "1000-000-2-01-08-000-000", office: "OFFICE OF THE CITY BUDGET OFFICER", department: "2-01-008 | Office of the City Budget Officer", sector: "GENERAL ADMINISTRATIVE AND SUPPORT SERVICES", subSector: "Planning and Coordination" },
  { id: "AIP-008", aipCode: "1000-000-2-01-09-000-000", office: "OFFICE OF THE CITY PLANNING AND DEVELOPMENT COORDINATOR", department: "2-01-009 | Office of the City Planning and Development Coordinator", sector: "GENERAL ADMINISTRATIVE AND SUPPORT SERVICES", subSector: "Planning and Coordination" },
  { id: "AIP-009", aipCode: "1000-000-2-01-12-000-000", office: "OFFICE OF THE CITY CIVIL REGISTRAR (CCR)", department: "2-01-012 | Office of the City Civil Registrar", sector: "GENERAL ADMINISTRATIVE AND SUPPORT SERVICES", subSector: "Executive Governance" },
  { id: "AIP-010", aipCode: "1000-000-2-01-17-000-000", office: "OFFICE OF THE CITY GENERAL SERVICES OFFICER (OCGSO)", department: "2-01-017 | Office of the City General Services Officer", sector: "GENERAL ADMINISTRATIVE AND SUPPORT SERVICES", subSector: "Executive Governance" },
  { id: "AIP-011", aipCode: "1000-000-2-01-18-000-000", office: "OFFICE OF THE CITY ENGINEERING", department: "2-01-018 | Office of the City Engineering", sector: "ECONOMIC SERVICES", subSector: "Infrastructure Development" },
  { id: "AIP-012", aipCode: "1000-000-2-01-19-000-000", office: "OFFICE OF THE CITY HEALTH", department: "2-01-019 | Office of the City Health", sector: "SOCIAL SERVICES", subSector: "Health Services" },
]

export type ProgramEntry = {
  id: string
  aipCode: string
  department: string
  sector: string
  subSector: string
  serviceType: string
  fundType: string
  expenseType: string
  amount: string
  ccTypologyCode: string
  ccAmount: string
  ppa: string
  expectedOutput: string
}

const createEmptyProgramEntry = (): ProgramEntry => ({
  id: Math.random().toString(36).substr(2, 9),
  aipCode: "",
  department: "",
  sector: "",
  subSector: "",
  serviceType: "",
  fundType: "",
  expenseType: "",
  amount: "",
  ccTypologyCode: "",
  ccAmount: "",
  ppa: "",
  expectedOutput: "",
})

export function AddAIPSubProgramModal({ open, onOpenChange, selectedAip, showRepeater = true, modalType = "program", selectedRow }: AddAIPSubProgramModalProps) {
  const [selectedAipId, setSelectedAipId] = useState<string>("")
  const [programEntries, setProgramEntries] = useState<ProgramEntry[]>([createEmptyProgramEntry()])
  const [errors, setErrors] = useState<Record<string, Record<string, string>>>({})
  const [isDirty, setIsDirty] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showConfirmClose, setShowConfirmClose] = useState(false)

  // Initialize form when modal opens
  useEffect(() => {
    if (open) {
      if (selectedRow) {
        // Pre-fill with selected row data
        setProgramEntries(prev => prev.map(entry => ({
          ...entry,
          aipCode: selectedRow.aipCode,
          ppa: selectedRow.programName,
        })))
      } else if (selectedAip?.aipCode) {
        // Find the AIP record that matches
        const aipRecord = aipMainRecords.find(a => a.aipCode === selectedAip.aipCode)
        if (aipRecord) {
          setSelectedAipId(aipRecord.id)
        }
      }
      setErrors({})
      setIsDirty(false)
    }
  }, [open, selectedAip, selectedRow])

  const handleAipSelection = (aipId: string) => {
    setSelectedAipId(aipId)
    const aip = aipMainRecords.find(a => a.id === aipId)
    if (aip) {
      // Update all entries with the selected AIP data
      setProgramEntries(prev => prev.map(entry => ({
        ...entry,
        aipCode: aip.aipCode,
        department: aip.department,
        sector: aip.sector,
        subSector: aip.subSector,
      })))
    }
    setIsDirty(true)
  }

  const handleEntryChange = (entryId: string, field: keyof ProgramEntry, value: string) => {
    setProgramEntries(prev => prev.map(entry => {
      if (entry.id !== entryId) return entry
      
      let updatedEntry = { ...entry, [field]: value }
      
      // Reset sub-sector if sector changes
      if (field === "sector") {
        updatedEntry.subSector = ""
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

  const addProgramEntry = () => {
    const newEntry = createEmptyProgramEntry()
    // Pre-fill with selected AIP data if available
    if (selectedAipId) {
      const aip = aipMainRecords.find(a => a.id === selectedAipId)
      if (aip) {
        newEntry.aipCode = aip.aipCode
        newEntry.department = aip.department
        newEntry.sector = aip.sector
        newEntry.subSector = aip.subSector
      }
    }
    setProgramEntries(prev => [...prev, newEntry])
    setIsDirty(true)
  }

  const removeProgramEntry = (entryId: string) => {
    if (programEntries.length > 1) {
      setProgramEntries(prev => prev.filter(entry => entry.id !== entryId))
      setIsDirty(true)
    }
  }

  const validateEntry = (entry: ProgramEntry): Record<string, string> => {
    const entryErrors: Record<string, string> = {}
    
    if (!entry.aipCode) entryErrors.aipCode = "AIP Code is required"
    if (!entry.department) entryErrors.department = "Department is required"
    if (!entry.sector) entryErrors.sector = "Sector is required"
    if (!entry.expenseType) entryErrors.expenseType = "Expense Type is required"
    if (!entry.amount) {
      entryErrors.amount = "Amount is required"
    } else if (parseFloat(entry.amount) <= 0) {
      entryErrors.amount = "Amount must be greater than 0"
    }
    if (!entry.ppa.trim()) entryErrors.ppa = "Project/Program/Activity is required"
    if (!entry.expectedOutput.trim()) entryErrors.expectedOutput = "Expected Output is required"
    
    return entryErrors
  }

  const validateForm = () => {
    const allErrors: Record<string, Record<string, string>> = {}
    let hasErrors = false
    
    programEntries.forEach(entry => {
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
      toast.success(`${programEntries.length} program(s) saved successfully`)
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
          <div className="sticky top-0 z-20 bg-white border-b border-slate-200 px-6 py-4 shadow-sm">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <div className="bg-green-100 p-2 rounded-lg">
                    <FilePlus className="h-5 w-5 text-green-700" />
                  </div>
                  <DialogTitle className="text-2xl font-bold text-slate-900">
                    {modalType === "subprogram" 
                      ? selectedRow 
                        ? `Add Sub-Program for: ${selectedRow.aipCode} | ${selectedRow.programName}`
                        : "Add Sub-Program"
                      : selectedRow 
                        ? `Add Program for: ${selectedRow.aipCode} | ${selectedRow.programName}`
                        : "Add Program"
                    }
                  </DialogTitle>
                  <Badge variant="secondary" className="bg-green-50 text-green-700 hover:bg-green-100 border-green-200 ml-2">
                    <CheckCircle2 className="h-3 w-3 mr-1" />
                    AIP Main Linked
                  </Badge>
                </div>
                <DialogDescription className="text-slate-500 text-base">
                  Create new program entries under the selected AIP Main record.
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

            {/* Select AIP for */}
            {showRepeater && (
            <div className="mt-4 flex items-center gap-4">
              <Label htmlFor="selectAip" className="text-slate-700 font-medium whitespace-nowrap">
                Select AIP for:
              </Label>
              <Select value={selectedAipId} onValueChange={handleAipSelection}>
                <SelectTrigger id="selectAip" className="w-[700px] bg-white">
                  <SelectValue placeholder="Select an AIP Main record..." />
                </SelectTrigger>
                <SelectContent>
                  {aipMainRecords.map((aip) => (
                    <SelectItem key={aip.id} value={aip.id}>
                      {aip.aipCode} - {aip.office}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            )}
          </div>

          {/* Scrollable Form Body - Program Entries Repeater */}
          <div className="overflow-y-auto max-h-[calc(90vh-220px)] p-6 space-y-2">
            {programEntries.map((entry, index) => (
              <div key={entry.id} className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                {/* Entry Header */}
                <div className="bg-slate-50/80 border-b border-slate-100 px-5 py-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-slate-800">Program Entry #{index + 1}</span>
                  </div>
                  {programEntries.length > 1 && showRepeater && (
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      onClick={() => removeProgramEntry(entry.id)}
                    >
                      <Trash2 className="h-4 w-4 mr-1" />
                      Remove
                    </Button>
                  )}
                </div>

                <div className="p-5 space-y-6">
                  {/* Row 1: AIP Code, Department, Sector, Sub-sector */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor={`aipCode-${entry.id}`} className="text-slate-700">
                        AIP Code <span className="text-red-500">*</span>
                      </Label>
                      <Select 
                        value={entry.aipCode} 
                        onValueChange={(val) => {
                          const aip = aipMainRecords.find(a => a.aipCode === val)
                          if (aip) {
                            handleEntryChange(entry.id, "aipCode", aip.aipCode)
                            handleEntryChange(entry.id, "department", aip.department)
                            handleEntryChange(entry.id, "sector", aip.sector)
                            handleEntryChange(entry.id, "subSector", aip.subSector)
                          }
                        }}
                      >
                        <SelectTrigger id={`aipCode-${entry.id}`} className={errors[entry.id]?.aipCode ? "border-red-500 ring-red-500" : ""}>
                          <SelectValue placeholder="Select AIP Code" />
                        </SelectTrigger>
                        <SelectContent>
                          {aipMainRecords.map((aip) => (
                            <SelectItem key={aip.id} value={aip.aipCode}>{aip.aipCode}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors[entry.id]?.aipCode && <p className="text-xs text-red-500 font-medium">{errors[entry.id].aipCode}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`department-${entry.id}`} className="text-slate-700">
                        Department <span className="text-red-500">*</span>
                      </Label>
                      <Select 
                        value={entry.department} 
                        onValueChange={(val) => handleEntryChange(entry.id, "department", val)}
                      >
                        <SelectTrigger id={`department-${entry.id}`} className={errors[entry.id]?.department ? "border-red-500 ring-red-500" : ""}>
                          <SelectValue placeholder="Select Department" />
                        </SelectTrigger>
                        <SelectContent>
                          {departments.map((dept) => (
                            <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors[entry.id]?.department && <p className="text-xs text-red-500 font-medium">{errors[entry.id].department}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`sector-${entry.id}`} className="text-slate-700">
                        Sector <span className="text-red-500">*</span>
                      </Label>
                      <Select 
                        value={entry.sector} 
                        onValueChange={(val) => handleEntryChange(entry.id, "sector", val)}
                      >
                        <SelectTrigger id={`sector-${entry.id}`} className={errors[entry.id]?.sector ? "border-red-500 ring-red-500" : ""}>
                          <SelectValue placeholder="Select Sector" />
                        </SelectTrigger>
                        <SelectContent>
                          {sectors.map((sector) => (
                            <SelectItem key={sector} value={sector}>{sector}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors[entry.id]?.sector && <p className="text-xs text-red-500 font-medium">{errors[entry.id].sector}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`subSector-${entry.id}`} className="text-slate-700">
                        Sub-sector
                      </Label>
                      <Select 
                        value={entry.subSector} 
                        onValueChange={(val) => handleEntryChange(entry.id, "subSector", val)}
                        disabled={!entry.sector}
                      >
                        <SelectTrigger id={`subSector-${entry.id}`}>
                          <SelectValue placeholder={entry.sector ? "Select Sub-sector" : "Select Sector first"} />
                        </SelectTrigger>
                        <SelectContent>
                          {getAvailableSubSectors(entry.sector).map((sub) => (
                            <SelectItem key={sub} value={sub}>{sub}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Row 2: Service Type, Fund Type, Expense Type */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor={`serviceType-${entry.id}`} className="text-slate-700">
                        Service Type
                      </Label>
                      <Select 
                        value={entry.serviceType} 
                        onValueChange={(val) => handleEntryChange(entry.id, "serviceType", val)}
                      >
                        <SelectTrigger id={`serviceType-${entry.id}`}>
                          <SelectValue placeholder="Select Service Type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="general">General Services</SelectItem>
                          <SelectItem value="social">Social Services</SelectItem>
                          <SelectItem value="economic">Economic Services</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`fundType-${entry.id}`} className="text-slate-700">
                        Fund Type
                      </Label>
                      <Select 
                        value={entry.fundType} 
                        onValueChange={(val) => handleEntryChange(entry.id, "fundType", val)}
                      >
                        <SelectTrigger id={`fundType-${entry.id}`}>
                          <SelectValue placeholder="Select Fund Type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="gf">General Fund</SelectItem>
                          <SelectItem value="sef">Special Education Fund</SelectItem>
                          <SelectItem value="tf">Trust Fund</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`expenseType-${entry.id}`} className="text-slate-700">
                        Expense Type <span className="text-red-500">*</span>
                      </Label>
                      <Select 
                        value={entry.expenseType} 
                        onValueChange={(val) => handleEntryChange(entry.id, "expenseType", val)}
                      >
                        <SelectTrigger id={`expenseType-${entry.id}`} className={errors[entry.id]?.expenseType ? "border-red-500 ring-red-500" : ""}>
                          <SelectValue placeholder="Select Expense Type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ps">Personal Services (PS)</SelectItem>
                          <SelectItem value="mooe">MOOE</SelectItem>
                          <SelectItem value="co">Capital Outlay (CO)</SelectItem>
                        </SelectContent>
                      </Select>
                      {errors[entry.id]?.expenseType && <p className="text-xs text-red-500 font-medium">{errors[entry.id].expenseType}</p>}
                    </div>
                  </div>

                  {/* Row 3: Amount, CC Typology Code, CC Amount */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor={`amount-${entry.id}`} className="text-slate-700">
                        Amount <span className="text-red-500">*</span>
                      </Label>
                      <div className="relative">
                        <span className="absolute left-3 top-2.5 text-slate-500 font-medium">₱</span>
                        <Input 
                          id={`amount-${entry.id}`}
                          value={entry.amount}
                          onChange={(e) => {
                            const value = e.target.value.replace(/[^0-9.]/g, "")
                            handleEntryChange(entry.id, "amount", value)
                          }}
                          placeholder="0.00"
                          className={`pl-8 text-right font-mono ${errors[entry.id]?.amount ? "border-red-500 ring-red-500" : ""}`}
                        />
                      </div>
                      {errors[entry.id]?.amount && <p className="text-xs text-red-500 font-medium">{errors[entry.id].amount}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`ccTypologyCode-${entry.id}`} className="text-slate-700">
                        CC Typology Code
                      </Label>
                      <Input 
                        id={`ccTypologyCode-${entry.id}`}
                        value={entry.ccTypologyCode}
                        onChange={(e) => handleEntryChange(entry.id, "ccTypologyCode", e.target.value)}
                        placeholder="Enter code"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`ccAmount-${entry.id}`} className="text-slate-700">
                        CC Amount
                      </Label>
                      <div className="relative">
                        <span className="absolute left-3 top-2.5 text-slate-500 font-medium">₱</span>
                        <Input 
                          id={`ccAmount-${entry.id}`}
                          value={entry.ccAmount}
                          onChange={(e) => {
                            const value = e.target.value.replace(/[^0-9.]/g, "")
                            handleEntryChange(entry.id, "ccAmount", value)
                          }}
                          placeholder="0.00"
                          className="pl-8 text-right font-mono"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Row 4: Project/Program/Activity, Expected Output */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor={`ppa-${entry.id}`} className="text-slate-700">
                        Project/Program/Activity <span className="text-red-500">*</span>
                      </Label>
                      <Textarea 
                        id={`ppa-${entry.id}`}
                        value={entry.ppa}
                        onChange={(e) => handleEntryChange(entry.id, "ppa", e.target.value)}
                        placeholder="Describe the project, program, or activity..."
                        className={`min-h-[100px] resize-y ${errors[entry.id]?.ppa ? "border-red-500 ring-red-500" : ""}`}
                      />
                      {errors[entry.id]?.ppa && <p className="text-xs text-red-500 font-medium">{errors[entry.id].ppa}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`expectedOutput-${entry.id}`} className="text-slate-700">
                        Expected Output <span className="text-red-500">*</span>
                      </Label>
                      <Textarea 
                        id={`expectedOutput-${entry.id}`}
                        value={entry.expectedOutput}
                        onChange={(e) => handleEntryChange(entry.id, "expectedOutput", e.target.value)}
                        placeholder="What are the expected deliverables or outcomes?"
                        className={`min-h-[100px] resize-y ${errors[entry.id]?.expectedOutput ? "border-red-500 ring-red-500" : ""}`}
                      />
                      {errors[entry.id]?.expectedOutput && <p className="text-xs text-red-500 font-medium">{errors[entry.id].expectedOutput}</p>}
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Add Another Program Button */}
            {showRepeater && (
              <Button 
                variant="outline" 
                className="w-full border-dashed border-2 h-12 text-slate-500 hover:text-slate-700 hover:border-slate-300"
                onClick={addProgramEntry}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Another Program Entry
              </Button>
            )}
          </div>

          {/* Sticky Footer */}
          <div className="sticky bottom-0 z-20 bg-white border-t border-slate-200 px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
            <p className="text-sm text-slate-500 flex items-center gap-1.5">
              <Target className="h-4 w-4 text-slate-400" />
              {programEntries.length} program(s) will be created.
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
                    Save {programEntries.length > 1 ? `${programEntries.length} Programs` : 'Program'}
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
