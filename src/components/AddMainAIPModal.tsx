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
  Minus,
  Calendar,
  Banknote,
  ChevronDown
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

const serviceTypes = [
  "Administrative",
  "Support",
  "Utility",
  "Health",
  "Education",
  "Infrastructure",
  "Public Safety",
]

const fundTypes = [
  "General Fund",
  "Special Education Fund",
  "Trust Fund",
]

const expenseTypes = [
  "Maintenance and Other Operating Expenses",
  "Personal Services",
  "Capital Outlay",
]

const ccTypologyCodes = [
  "CC-001",
  "CC-002",
  "CC-003",
  "CC-004",
  "CC-005",
]

// Default AIP block structure
const createDefaultAipBlock = (index: number) => ({
  id: `aip-${Date.now()}-${index}`,
  selectAip: "",
  aipCode: "",
  department: "",
  sector: "",
  subSector: "",
  dateStarted: "2025-01-01",
  dateCompleted: "2025-12-31",
  serviceType: "",
  fundType: "",
  expenseType: "",
  amount: "",
  ccTypologyCode: "",
  ccAmount: "",
  programActivity: "",
  expectedOutput: "",
})

interface AddMainAIPModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function AddMainAIPModal({ 
  open, 
  onOpenChange,
}: AddMainAIPModalProps) {
  const [aipBlocks, setAipBlocks] = useState([createDefaultAipBlock(0)])
  const [errors, setErrors] = useState<Record<string, Record<string, string>>>({})
  const [isDirty, setIsDirty] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showConfirmClose, setShowConfirmClose] = useState(false)

  // Initialize form when modal opens
  useEffect(() => {
    if (open) {
      setAipBlocks([createDefaultAipBlock(0)])
      setErrors({})
      setIsDirty(false)
    }
  }, [open])

  const addAipBlock = () => {
    setAipBlocks(prev => [...prev, createDefaultAipBlock(prev.length)])
    setIsDirty(true)
  }

  const removeAipBlock = (index: number) => {
    if (aipBlocks.length > 1) {
      setAipBlocks(prev => prev.filter((_, i) => i !== index))
      // Also remove errors for this block
      setErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors[index]
        return newErrors
      })
      setIsDirty(true)
    }
  }

  const handleChange = (blockIndex: number, field: string, value: string) => {
    setAipBlocks(prev => {
      const newBlocks = [...prev]
      const block = { ...newBlocks[blockIndex] }
      
      // Reset sub-sector if sector changes
      if (field === "sector") {
        block.subSector = ""
      }
      
      // Auto-generate AIP Code hint based on department
      if (field === "department" && !block.aipCode) {
        const deptCode = value.split(" | ")[0]
        if (deptCode) {
          block.aipCode = `1000-000-${deptCode}-000-000`
        }
      }
      
      (block as any)[field] = value
      newBlocks[blockIndex] = block
      return newBlocks
    })
    setIsDirty(true)
    
    // Clear error for this field
    if (errors[blockIndex]?.[field]) {
      setErrors(prev => ({
        ...prev,
        [blockIndex]: {
          ...prev[blockIndex],
          [field]: ""
        }
      }))
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, Record<string, string>> = {}
    let hasErrors = false

    aipBlocks.forEach((block, index) => {
      const blockErrors: Record<string, string> = {}

      // Required fields validation
      if (!block.aipCode.trim()) {
        blockErrors.aipCode = "AIP Code is required"
      }
      
      if (!block.department) {
        blockErrors.department = "Department is required"
      }
      
      if (!block.sector) {
        blockErrors.sector = "Sector is required"
      }
      
      if (!block.amount.trim()) {
        blockErrors.amount = "Amount is required"
      } else if (isNaN(Number(block.amount)) || Number(block.amount) < 0) {
        blockErrors.amount = "Amount must be a valid number >= 0"
      }
      
      if (!block.programActivity.trim()) {
        blockErrors.programActivity = "Project / Program / Activity is required"
      }

      // Date validation: Date Completed >= Date Started
      if (block.dateStarted && block.dateCompleted) {
        if (new Date(block.dateCompleted) < new Date(block.dateStarted)) {
          blockErrors.dateCompleted = "Date Completed must be >= Date Started"
        }
      }

      // CC Amount validation if CC Typology Code is set
      if (block.ccTypologyCode && block.ccAmount) {
        if (isNaN(Number(block.ccAmount)) || Number(block.ccAmount) < 0) {
          blockErrors.ccAmount = "CC Amount must be a valid number >= 0"
        }
      }

      if (Object.keys(blockErrors).length > 0) {
        newErrors[index] = blockErrors
        hasErrors = true
      }
    })

    setErrors(newErrors)
    return !hasErrors
  }

  const handleSave = () => {
    if (!validateForm()) {
      toast.error("Please fix the errors in the form")
      return
    }

    setIsSubmitting(true)
    
    // Prepare data for submission
    const submitData = aipBlocks.map(block => ({
      aip_code: block.aipCode,
      department: block.department,
      sector: block.sector,
      sub_sector: block.subSector,
      date_started: block.dateStarted,
      date_completed: block.dateCompleted,
      service_type: block.serviceType,
      fund_type: block.fundType,
      expense_type: block.expenseType,
      amount: Number(block.amount),
      cc_typology_code: block.ccTypologyCode || null,
      cc_amount: block.ccAmount ? Number(block.ccAmount) : null,
      program_activity: block.programActivity,
      expected_output: block.expectedOutput || null,
    }))

    console.log("Submitting AIP data:", submitData)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setIsDirty(false)
      toast.success(`${aipBlocks.length} AIP(s) saved successfully`)
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
    return sector ? subSectorsBySector[sector] || [] : []
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
                  <DialogTitle className="text-2xl font-bold text-slate-900">Add New AIP</DialogTitle>
                </div>
                <DialogDescription className="text-slate-500 text-base">
                  Add one or more Annual Investment Program entries with complete details.
                </DialogDescription>
              </div>
              <div className="flex items-center gap-2">
                {/* Add AIP Section Button */}
                <Button 
                  variant="outline" 
                  size="sm"
                  className="gap-1.5 text-green-700 border-green-600 hover:bg-green-50 hover:text-green-800"
                  onClick={addAipBlock}
                >
                  <Plus className="h-4 w-4" />
                  Add AIP Section
                </Button>
                {/* Remove AIP Section Button */}
                {aipBlocks.length > 1 && (
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="gap-1.5 text-red-700 border-red-600 hover:bg-red-50 hover:text-red-800"
                    onClick={() => removeAipBlock(aipBlocks.length - 1)}
                  >
                    <Minus className="h-4 w-4" />
                    Remove AIP Section
                  </Button>
                )}
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8 rounded-full text-slate-500 hover:bg-slate-100 hover:text-slate-900 ml-2"
                  onClick={handleCloseClick}
                >
                  <X className="h-5 w-5" />
                  <span className="sr-only">Close</span>
                </Button>
              </div>
            </div>
          </div>

          {/* Scrollable Form Body */}
          <div className="overflow-y-auto max-h-[calc(88vh-160px)] p-6 space-y-6">
            {aipBlocks.map((block, blockIndex) => (
              <div 
                key={block.id} 
                className={`bg-white rounded-xl border shadow-sm overflow-hidden ${blockIndex > 0 ? 'border-indigo-200 ring-1 ring-indigo-100' : 'border-slate-200'}`}
              >
                {/* AIP Block Header */}
                {aipBlocks.length > 1 && (
                  <div className="bg-indigo-50 border-b border-indigo-100 px-5 py-2.5 flex items-center justify-between">
                    <span className="text-sm font-semibold text-indigo-800 flex items-center gap-2">
                      <Badge variant="secondary" className="bg-indigo-100 text-indigo-700">
                        AIP #{blockIndex + 1}
                      </Badge>
                    </span>
                    {aipBlocks.length > 1 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 px-2 text-red-600 hover:text-red-700 hover:bg-red-50"
                        onClick={() => removeAipBlock(blockIndex)}
                      >
                        <Minus className="h-3.5 w-3.5" />
                        <span className="ml-1 text-xs">Remove</span>
                      </Button>
                    )}
                  </div>
                )}

                <div className="p-5 space-y-6">
                  {/* SECTION: Select AIP */}
                  <section>
                    <h3 className="text-sm font-semibold text-slate-800 mb-3 flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-indigo-600" />
                      Select AIP
                    </h3>
                    <div className="max-w-md">
                      <Label htmlFor={`select-aip-${blockIndex}`} className="text-slate-700 font-medium">
                        Select AIP for:
                      </Label>
                      <Select 
                        value={block.selectAip} 
                        onValueChange={(val) => handleChange(blockIndex, "selectAip", val)}
                      >
                        <SelectTrigger 
                          id={`select-aip-${blockIndex}`} 
                          className="h-11 mt-1.5"
                        >
                          <SelectValue placeholder="Select AIP" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="new">+ Create New AIP</SelectItem>
                          {departments.map((dept) => (
                            <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </section>

                  {/* SECTION: AIP Information */}
                  <section className="space-y-5">
                    <h3 className="text-sm font-semibold text-slate-800 flex items-center gap-2 pb-2 border-b border-slate-100">
                      <Layers3 className="h-4 w-4 text-indigo-600" />
                      AIP Information
                    </h3>

                    {/* ROW 1: AIP Code, Department, Sector, Sub-sector */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor={`aip-code-${blockIndex}`} className="text-slate-700 font-medium">
                          AIP Code <span className="text-red-500">*</span>
                        </Label>
                        <div className="relative">
                          <Hash className="absolute left-3 top-3.5 h-4 w-4 text-slate-400" />
                          <Input 
                            id={`aip-code-${blockIndex}`}
                            value={block.aipCode}
                            onChange={(e) => handleChange(blockIndex, "aipCode", e.target.value)}
                            placeholder="Enter an AIP Code"
                            className={`pl-9 h-11 font-mono text-slate-700 ${errors[blockIndex]?.aipCode ? "border-red-500 ring-red-500" : ""}`}
                          />
                        </div>
                        {errors[blockIndex]?.aipCode && (
                          <p className="text-xs text-red-500 font-medium">{errors[blockIndex].aipCode}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor={`department-${blockIndex}`} className="text-slate-700 font-medium">
                          Department <span className="text-red-500">*</span>
                        </Label>
                        <Select 
                          value={block.department} 
                          onValueChange={(val) => handleChange(blockIndex, "department", val)}
                        >
                          <SelectTrigger 
                            id={`department-${blockIndex}`} 
                            className={`h-11 ${errors[blockIndex]?.department ? "border-red-500 ring-red-500" : ""}`}
                          >
                            <SelectValue placeholder="Select department" />
                          </SelectTrigger>
                          <SelectContent>
                            {departments.map((dept) => (
                              <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {errors[blockIndex]?.department && (
                          <p className="text-xs text-red-500 font-medium">{errors[blockIndex].department}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor={`sector-${blockIndex}`} className="text-slate-700 font-medium">
                          Sector <span className="text-red-500">*</span>
                        </Label>
                        <Select 
                          value={block.sector} 
                          onValueChange={(val) => handleChange(blockIndex, "sector", val)}
                        >
                          <SelectTrigger 
                            id={`sector-${blockIndex}`} 
                            className={`h-11 ${errors[blockIndex]?.sector ? "border-red-500 ring-red-500" : ""}`}
                          >
                            <SelectValue placeholder="Select sector" />
                          </SelectTrigger>
                          <SelectContent>
                            {sectors.map((sector) => (
                              <SelectItem key={sector} value={sector}>{sector}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {errors[blockIndex]?.sector && (
                          <p className="text-xs text-red-500 font-medium">{errors[blockIndex].sector}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor={`sub-sector-${blockIndex}`} className="text-slate-700 font-medium">
                          Sub-sector
                        </Label>
                        <Select 
                          value={block.subSector} 
                          onValueChange={(val) => handleChange(blockIndex, "subSector", val)}
                          disabled={!block.sector}
                        >
                          <SelectTrigger 
                            id={`sub-sector-${blockIndex}`} 
                            className="h-11"
                          >
                            <SelectValue placeholder={block.sector ? "Select sub-sector" : "Select sector first"} />
                          </SelectTrigger>
                          <SelectContent>
                            {getAvailableSubSectors(block.sector).map((sub) => (
                              <SelectItem key={sub} value={sub}>{sub}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {/* ROW 2: Date Started, Date Completed, Service Type, Fund Type */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor={`date-started-${blockIndex}`} className="text-slate-700 font-medium">
                          Date Started
                        </Label>
                        <div className="relative">
                          <Calendar className="absolute left-3 top-3.5 h-4 w-4 text-slate-400" />
                          <Input 
                            id={`date-started-${blockIndex}`}
                            type="date"
                            value={block.dateStarted}
                            onChange={(e) => handleChange(blockIndex, "dateStarted", e.target.value)}
                            className="pl-9 h-11"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor={`date-completed-${blockIndex}`} className="text-slate-700 font-medium">
                          Date Completed
                        </Label>
                        <div className="relative">
                          <Calendar className="absolute left-3 top-3.5 h-4 w-4 text-slate-400" />
                          <Input 
                            id={`date-completed-${blockIndex}`}
                            type="date"
                            value={block.dateCompleted}
                            onChange={(e) => handleChange(blockIndex, "dateCompleted", e.target.value)}
                            className={`pl-9 h-11 ${errors[blockIndex]?.dateCompleted ? "border-red-500 ring-red-500" : ""}`}
                          />
                        </div>
                        {errors[blockIndex]?.dateCompleted && (
                          <p className="text-xs text-red-500 font-medium">{errors[blockIndex].dateCompleted}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor={`service-type-${blockIndex}`} className="text-slate-700 font-medium">
                          Service Type
                        </Label>
                        <Select 
                          value={block.serviceType} 
                          onValueChange={(val) => handleChange(blockIndex, "serviceType", val)}
                        >
                          <SelectTrigger id={`service-type-${blockIndex}`} className="h-11">
                            <SelectValue placeholder="Select service" />
                          </SelectTrigger>
                          <SelectContent>
                            {serviceTypes.map((service) => (
                              <SelectItem key={service} value={service}>{service}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor={`fund-type-${blockIndex}`} className="text-slate-700 font-medium">
                          Fund Type
                        </Label>
                        <Select 
                          value={block.fundType} 
                          onValueChange={(val) => handleChange(blockIndex, "fundType", val)}
                        >
                          <SelectTrigger id={`fund-type-${blockIndex}`} className="h-11">
                            <SelectValue placeholder="Select funds" />
                          </SelectTrigger>
                          <SelectContent>
                            {fundTypes.map((fund) => (
                              <SelectItem key={fund} value={fund}>{fund}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {/* ROW 3: Expense Type, Amount, CC Typology Code, CC Amount */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor={`expense-type-${blockIndex}`} className="text-slate-700 font-medium">
                          Expense Type
                        </Label>
                        <Select 
                          value={block.expenseType} 
                          onValueChange={(val) => handleChange(blockIndex, "expenseType", val)}
                        >
                          <SelectTrigger id={`expense-type-${blockIndex}`} className="h-11">
                            <SelectValue placeholder="Select expense type" />
                          </SelectTrigger>
                          <SelectContent>
                            {expenseTypes.map((expense) => (
                              <SelectItem key={expense} value={expense}>{expense}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor={`amount-${blockIndex}`} className="text-slate-700 font-medium">
                          Amount <span className="text-red-500">*</span>
                        </Label>
                        <div className="relative">
                          <Banknote className="absolute left-3 top-3.5 h-4 w-4 text-slate-400" />
                          <Input 
                            id={`amount-${blockIndex}`}
                            type="number"
                            min="0"
                            step="0.01"
                            value={block.amount}
                            onChange={(e) => handleChange(blockIndex, "amount", e.target.value)}
                            placeholder="Enter AIP Amount"
                            className={`pl-9 h-11 font-mono text-slate-700 ${errors[blockIndex]?.amount ? "border-red-500 ring-red-500" : ""}`}
                          />
                        </div>
                        {errors[blockIndex]?.amount && (
                          <p className="text-xs text-red-500 font-medium">{errors[blockIndex].amount}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor={`cc-typology-${blockIndex}`} className="text-slate-700 font-medium">
                          CC Typology Code
                        </Label>
                        <Select 
                          value={block.ccTypologyCode} 
                          onValueChange={(val) => handleChange(blockIndex, "ccTypologyCode", val)}
                        >
                          <SelectTrigger id={`cc-typology-${blockIndex}`} className="h-11">
                            <SelectValue placeholder="Select CC Typology" />
                          </SelectTrigger>
                          <SelectContent>
                            {ccTypologyCodes.map((code) => (
                              <SelectItem key={code} value={code}>{code}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor={`cc-amount-${blockIndex}`} className="text-slate-700 font-medium">
                          CC Amount
                        </Label>
                        <div className="relative">
                          <Banknote className="absolute left-3 top-3.5 h-4 w-4 text-slate-400" />
                          <Input 
                            id={`cc-amount-${blockIndex}`}
                            type="number"
                            min="0"
                            step="0.01"
                            value={block.ccAmount}
                            onChange={(e) => handleChange(blockIndex, "ccAmount", e.target.value)}
                            placeholder="Enter CC Amount"
                            className={`pl-9 h-11 font-mono text-slate-700 ${errors[blockIndex]?.ccAmount ? "border-red-500 ring-red-500" : ""}`}
                          />
                        </div>
                        {errors[blockIndex]?.ccAmount && (
                          <p className="text-xs text-red-500 font-medium">{errors[blockIndex].ccAmount}</p>
                        )}
                      </div>
                    </div>

                    {/* ROW 4: Project/Program/Activity, Expected Output */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor={`program-activity-${blockIndex}`} className="text-slate-700 font-medium">
                          Project / Program / Activity <span className="text-red-500">*</span>
                        </Label>
                        <Textarea 
                          id={`program-activity-${blockIndex}`}
                          value={block.programActivity}
                          onChange={(e) => handleChange(blockIndex, "programActivity", e.target.value)}
                          placeholder="..."
                          rows={3}
                          className={`resize-y p-3 ${errors[blockIndex]?.programActivity ? "border-red-500 ring-red-500" : ""}`}
                        />
                        {errors[blockIndex]?.programActivity && (
                          <p className="text-xs text-red-500 font-medium">{errors[blockIndex].programActivity}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor={`expected-output-${blockIndex}`} className="text-slate-700 font-medium">
                          Expected Output
                        </Label>
                        <Textarea 
                          id={`expected-output-${blockIndex}`}
                          value={block.expectedOutput}
                          onChange={(e) => handleChange(blockIndex, "expectedOutput", e.target.value)}
                          placeholder="..."
                          rows={3}
                          className="resize-y p-3"
                        />
                      </div>
                    </div>
                  </section>
                </div>
              </div>
            ))}
          </div>

          {/* Sticky Footer */}
          <div className="sticky bottom-0 z-20 bg-white border-t border-slate-200 px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
            <p className="text-sm text-slate-500 flex items-center gap-1.5">
              <Info className="h-4 w-4 text-slate-400" />
              {aipBlocks.length} AIP block(s) ready to save
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
                    Save ✓
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
