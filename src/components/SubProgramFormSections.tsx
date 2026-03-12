import React from "react"
import { UseFormReturn } from "react-hook-form"
import { z } from "zod"
import { Input } from "@/src/components/ui/input"
import { Label } from "@/src/components/ui/label"
import { Textarea } from "@/src/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/src/components/ui/select"
import { Card, CardContent } from "@/src/components/ui/card"
import { formatCurrency } from "@/src/lib/utils"
import { 
  Building2, 
  Layers3, 
  CalendarDays, 
  Wallet, 
  BadgeCent, 
  ClipboardList, 
  Target,
  FilePlus
} from "lucide-react"

export const subProgramSchema = z.object({
  aipCode: z.string().min(1, "AIP Code is required"),
  department: z.string().min(1, "Department is required"),
  sector: z.string().min(1, "Sector is required"),
  subSector: z.string().min(1, "Sub-sector is required"),
  dateStarted: z.string().min(1, "Date Started is required"),
  dateCompleted: z.string().min(1, "Date Completed is required"),
  serviceType: z.string().min(1, "Service Type is required"),
  fundType: z.string().min(1, "Fund Type is required"),
  expenseType: z.string().min(1, "Expense Type is required"),
  amount: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
    message: "Amount must be greater than zero",
  }),
  ccTypologyCode: z.string().optional(),
  ccAmount: z.string().optional(),
  projectProgramActivity: z.string().min(1, "Project/Program/Activity is required"),
  expectedOutput: z.string().min(1, "Expected Output is required"),
}).refine((data) => {
  if (data.dateStarted && data.dateCompleted) {
    return new Date(data.dateCompleted) >= new Date(data.dateStarted)
  }
  return true
}, {
  message: "Date Completed cannot be earlier than Date Started",
  path: ["dateCompleted"],
})

export type SubProgramFormValues = z.infer<typeof subProgramSchema>

interface FormSectionProps {
  form: UseFormReturn<SubProgramFormValues>
  serviceTypes: string[]
  expenseTypes: string[]
  fundTypes: string[]
  ccTypologyCodes: string[]
}

export function SubProgramFormSections({
  form,
  serviceTypes,
  expenseTypes,
  fundTypes,
  ccTypologyCodes,
}: FormSectionProps) {
  const { register, formState: { errors }, setValue, watch } = form

  const amount = watch("amount")
  const ccAmount = watch("ccAmount")

  return (
    <div className="space-y-10 py-4">
      
      {/* SECTION 1: PROGRAM CLASSIFICATION */}
      <section className="space-y-6">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
          <div className="bg-indigo-100 p-1.5 rounded-md">
            <FilePlus className="h-5 w-5 text-indigo-600" />
          </div>
          <h3 className="text-lg font-semibold text-slate-900">1. Program Classification</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="space-y-2">
            <Label htmlFor="aipCode" className="text-slate-700">AIP Code <span className="text-red-500">*</span></Label>
            <Input 
              id="aipCode" 
              {...register("aipCode")} 
              className={`font-mono bg-slate-50 ${errors.aipCode ? "border-red-500 focus-visible:ring-red-500" : ""}`}
            />
            {errors.aipCode && <p className="text-xs text-red-500 mt-1">{errors.aipCode.message}</p>}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="department" className="text-slate-700">Department</Label>
            <div className="relative">
              <Building2 className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
              <Input 
                id="department" 
                {...register("department")} 
                readOnly 
                className="pl-9 bg-slate-100 text-slate-600 border-slate-200 cursor-not-allowed"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="sector" className="text-slate-700">Sector</Label>
            <div className="relative">
              <Layers3 className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
              <Input 
                id="sector" 
                {...register("sector")} 
                readOnly 
                className="pl-9 bg-slate-100 text-slate-600 border-slate-200 cursor-not-allowed"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="subSector" className="text-slate-700">Sub-sector <span className="text-red-500">*</span></Label>
            <Input 
              id="subSector" 
              {...register("subSector")} 
              placeholder="Enter sub-sector"
              className={errors.subSector ? "border-red-500 focus-visible:ring-red-500" : ""}
            />
            {errors.subSector && <p className="text-xs text-red-500 mt-1">{errors.subSector.message}</p>}
          </div>
        </div>
        <p className="text-sm text-slate-500 italic">Classification inherited from the selected program.</p>
      </section>

      {/* SECTION 2: TIMELINE & SERVICE DETAILS */}
      <section className="space-y-6">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
          <div className="bg-blue-100 p-1.5 rounded-md">
            <CalendarDays className="h-5 w-5 text-blue-600" />
          </div>
          <h3 className="text-lg font-semibold text-slate-900">2. Timeline & Service Details</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="dateStarted" className="text-slate-700">Date Started <span className="text-red-500">*</span></Label>
              <Input 
                id="dateStarted" 
                type="date"
                {...register("dateStarted")} 
                className={errors.dateStarted ? "border-red-500 focus-visible:ring-red-500" : ""}
              />
              {errors.dateStarted && <p className="text-xs text-red-500 mt-1">{errors.dateStarted.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="dateCompleted" className="text-slate-700">Date Completed <span className="text-red-500">*</span></Label>
              <Input 
                id="dateCompleted" 
                type="date"
                {...register("dateCompleted")} 
                className={errors.dateCompleted ? "border-red-500 focus-visible:ring-red-500" : ""}
              />
              {errors.dateCompleted && <p className="text-xs text-red-500 mt-1">{errors.dateCompleted.message}</p>}
            </div>
            <p className="text-xs text-slate-500 italic">Program dates should fall within the selected fiscal year.</p>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="serviceType" className="text-slate-700">Service Type <span className="text-red-500">*</span></Label>
            <Select onValueChange={(val) => setValue("serviceType", val)} defaultValue={watch("serviceType")}>
              <SelectTrigger className={errors.serviceType ? "border-red-500 focus:ring-red-500" : ""}>
                <SelectValue placeholder="Select service type" />
              </SelectTrigger>
              <SelectContent>
                {serviceTypes.map(type => (
                  <SelectItem key={type} value={type}>{type}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.serviceType && <p className="text-xs text-red-500 mt-1">{errors.serviceType.message}</p>}
          </div>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fundType" className="text-slate-700">Fund Type <span className="text-red-500">*</span></Label>
              <Select onValueChange={(val) => setValue("fundType", val)} defaultValue={watch("fundType")}>
                <SelectTrigger className={errors.fundType ? "border-red-500 focus:ring-red-500" : ""}>
                  <SelectValue placeholder="Select fund type" />
                </SelectTrigger>
                <SelectContent>
                  {fundTypes.map(type => (
                    <SelectItem key={type} value={type}>{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.fundType && <p className="text-xs text-red-500 mt-1">{errors.fundType.message}</p>}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="expenseType" className="text-slate-700">Expense Type <span className="text-red-500">*</span></Label>
              <Select onValueChange={(val) => setValue("expenseType", val)} defaultValue={watch("expenseType")}>
                <SelectTrigger className={errors.expenseType ? "border-red-500 focus:ring-red-500" : ""}>
                  <SelectValue placeholder="Select expense type" />
                </SelectTrigger>
                <SelectContent>
                  {expenseTypes.map(type => (
                    <SelectItem key={type} value={type}>{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.expenseType && <p className="text-xs text-red-500 mt-1">{errors.expenseType.message}</p>}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: FINANCIAL INFORMATION */}
      <section className="space-y-6">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
          <div className="bg-emerald-100 p-1.5 rounded-md">
            <Wallet className="h-5 w-5 text-emerald-600" />
          </div>
          <h3 className="text-lg font-semibold text-slate-900">3. Financial Information</h3>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <Label htmlFor="amount" className="text-slate-700">Amount <span className="text-red-500">*</span></Label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-slate-500 font-medium">₱</span>
                <Input 
                  id="amount" 
                  type="number"
                  {...register("amount")} 
                  className={`pl-8 text-right font-mono ${errors.amount ? "border-red-500 focus-visible:ring-red-500" : ""}`}
                  placeholder="0.00"
                />
              </div>
              {errors.amount && <p className="text-xs text-red-500 mt-1">{errors.amount.message}</p>}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="ccTypologyCode" className="text-slate-700">CC Typology Code</Label>
              <Select onValueChange={(val) => setValue("ccTypologyCode", val)} defaultValue={watch("ccTypologyCode")}>
                <SelectTrigger>
                  <SelectValue placeholder="Select CC code" />
                </SelectTrigger>
                <SelectContent>
                  {ccTypologyCodes.map(code => (
                    <SelectItem key={code} value={code}>{code}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="ccAmount" className="text-slate-700">CC Amount</Label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-slate-500 font-medium">₱</span>
                <Input 
                  id="ccAmount" 
                  type="number"
                  {...register("ccAmount")} 
                  className="pl-8 text-right font-mono"
                  placeholder="0.00"
                />
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-1">
            <Card className="bg-slate-50 border-slate-200 shadow-sm h-full">
              <CardContent className="p-4 flex flex-col justify-center h-full space-y-4">
                <h4 className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                  <BadgeCent className="h-4 w-4 text-emerald-600" />
                  Financial Summary
                </h4>
                <div>
                  <p className="text-xs text-slate-500 mb-1">Total Program Amount</p>
                  <p className="text-lg font-bold text-slate-900 font-mono">
                    {amount && !isNaN(Number(amount)) ? formatCurrency(Number(amount)) : "₱ 0.00"}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 mb-1">CC Allocation</p>
                  <p className="text-sm font-semibold text-slate-700 font-mono">
                    {ccAmount && !isNaN(Number(ccAmount)) ? formatCurrency(Number(ccAmount)) : "₱ 0.00"}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* SECTION 4: PROGRAM DESCRIPTION */}
      <section className="space-y-6">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
          <div className="bg-amber-100 p-1.5 rounded-md">
            <ClipboardList className="h-5 w-5 text-amber-600" />
          </div>
          <h3 className="text-lg font-semibold text-slate-900">4. Program Description</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="projectProgramActivity" className="text-slate-700">Project / Program / Activity <span className="text-red-500">*</span></Label>
            <Textarea 
              id="projectProgramActivity" 
              {...register("projectProgramActivity")} 
              className={`min-h-[120px] resize-y ${errors.projectProgramActivity ? "border-red-500 focus-visible:ring-red-500" : ""}`}
              placeholder="Provide the official project or activity description."
            />
            {errors.projectProgramActivity && <p className="text-xs text-red-500 mt-1">{errors.projectProgramActivity.message}</p>}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="expectedOutput" className="text-slate-700">Expected Output <span className="text-red-500">*</span></Label>
            <Textarea 
              id="expectedOutput" 
              {...register("expectedOutput")} 
              className={`min-h-[120px] resize-y ${errors.expectedOutput ? "border-red-500 focus-visible:ring-red-500" : ""}`}
              placeholder="Describe measurable results expected from this program."
            />
            {errors.expectedOutput && <p className="text-xs text-red-500 mt-1">{errors.expectedOutput.message}</p>}
          </div>
        </div>
      </section>
      
    </div>
  )
}
