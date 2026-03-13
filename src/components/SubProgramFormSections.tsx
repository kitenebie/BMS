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
  FilePlus,
  Palette,
  Ruler,
  MapPin
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
  // Design section fields
  designType: z.string().optional(),
  designStatus: z.string().optional(),
  architecturalDesign: z.string().optional(),
  technicalSpecs: z.string().optional(),
  location: z.string().optional(),
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
    <div className="space-y-2 py-4">
      
      {/* SECTION 1: PROGRAM CLASSIFICATION */}
      <section className="space-y-2 bg-white dark:bg-slate-900 p-6 rounded-md shadow-sm border border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
          <div className="bg-indigo-100 dark:bg-indigo-500/20 p-1.5 rounded-md">
            <FilePlus className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
          </div>
          <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">1. Program Classification</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="space-y-2">
            <Label htmlFor="aipCode" className="text-slate-700 dark:text-slate-300">AIP Code <span className="text-red-500 dark:text-red-400">*</span></Label>
            <Input 
              id="aipCode" 
              {...register("aipCode")} 
              className={`font-mono bg-slate-50 dark:bg-slate-800/50 ${errors.aipCode ? "border-red-500 focus-visible:ring-red-500" : ""}`}
            />
            {errors.aipCode && <p className="text-xs text-red-500 dark:text-red-400 mt-1">{errors.aipCode.message}</p>}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="department" className="text-slate-700 dark:text-slate-300">Department</Label>
            <div className="relative">
              <Building2 className="absolute left-3 top-2.5 h-4 w-4 text-slate-400 dark:text-slate-500" />
              <Input 
                id="department" 
                {...register("department")} 
                readOnly 
                className="pl-9 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700 cursor-not-allowed"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="sector" className="text-slate-700 dark:text-slate-300">Sector</Label>
            <div className="relative">
              <Layers3 className="absolute left-3 top-2.5 h-4 w-4 text-slate-400 dark:text-slate-500" />
              <Input 
                id="sector" 
                {...register("sector")} 
                readOnly 
                className="pl-9 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700 cursor-not-allowed"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="subSector" className="text-slate-700 dark:text-slate-300">Sub-sector <span className="text-red-500 dark:text-red-400">*</span></Label>
            <Input 
              id="subSector" 
              {...register("subSector")} 
              placeholder="Enter sub-sector"
              className={errors.subSector ? "border-red-500 focus-visible:ring-red-500" : ""}
            />
            {errors.subSector && <p className="text-xs text-red-500 dark:text-red-400 mt-1">{errors.subSector.message}</p>}
          </div>
        </div>
        <p className="text-sm text-slate-500 dark:text-slate-400 italic">Classification inherited from the selected program.</p>
      </section>

      {/* SECTION 2: TIMELINE & SERVICE DETAILS */}
      <section className="space-y-2 bg-white dark:bg-slate-900 p-6 rounded-md shadow-sm border border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-2">
          <div className="bg-blue-100 dark:bg-blue-500/20 p-1.5 rounded-md">
            <CalendarDays className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          </div>
          <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">2. Timeline & Service Details</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="dateStarted" className="text-slate-700 dark:text-slate-300">Date Started <span className="text-red-500 dark:text-red-400">*</span></Label>
              <Input 
                id="dateStarted" 
                type="date"
                {...register("dateStarted")} 
                className={errors.dateStarted ? "border-red-500 focus-visible:ring-red-500" : ""}
              />
              {errors.dateStarted && <p className="text-xs text-red-500 dark:text-red-400 mt-1">{errors.dateStarted.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="dateCompleted" className="text-slate-700 dark:text-slate-300">Date Completed <span className="text-red-500 dark:text-red-400">*</span></Label>
              <Input 
                id="dateCompleted" 
                type="date"
                {...register("dateCompleted")} 
                className={errors.dateCompleted ? "border-red-500 focus-visible:ring-red-500" : ""}
              />
              {errors.dateCompleted && <p className="text-xs text-red-500 dark:text-red-400 mt-1">{errors.dateCompleted.message}</p>}
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 italic">Program dates should fall within the selected fiscal year.</p>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="serviceType" className="text-slate-700 dark:text-slate-300">Service Type <span className="text-red-500 dark:text-red-400">*</span></Label>
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
            {errors.serviceType && <p className="text-xs text-red-500 dark:text-red-400 mt-1">{errors.serviceType.message}</p>}
          </div>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fundType" className="text-slate-700 dark:text-slate-300">Fund Type <span className="text-red-500 dark:text-red-400">*</span></Label>
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
              {errors.fundType && <p className="text-xs text-red-500 dark:text-red-400 mt-1">{errors.fundType.message}</p>}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="expenseType" className="text-slate-700 dark:text-slate-300">Expense Type <span className="text-red-500 dark:text-red-400">*</span></Label>
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
              {errors.expenseType && <p className="text-xs text-red-500 dark:text-red-400 mt-1">{errors.expenseType.message}</p>}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: FINANCIAL INFORMATION */}
      <section className="space-y-2 bg-white dark:bg-slate-900 p-6 rounded-md shadow-sm border border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-2">
          <div className="bg-emerald-100 dark:bg-emerald-500/20 p-1.5 rounded-md">
            <Wallet className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
          </div>
          <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">3. Financial Information</h3>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <Label htmlFor="amount" className="text-slate-700 dark:text-slate-300">Amount <span className="text-red-500 dark:text-red-400">*</span></Label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-slate-500 dark:text-slate-400 font-medium">₱</span>
                <Input 
                  id="amount" 
                  type="number"
                  {...register("amount")} 
                  className={`pl-8 text-right font-mono ${errors.amount ? "border-red-500 focus-visible:ring-red-500" : ""}`}
                  placeholder="0.00"
                />
              </div>
              {errors.amount && <p className="text-xs text-red-500 dark:text-red-400 mt-1">{errors.amount.message}</p>}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="ccTypologyCode" className="text-slate-700 dark:text-slate-300">CC Typology Code</Label>
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
              <Label htmlFor="ccAmount" className="text-slate-700 dark:text-slate-300">CC Amount</Label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-slate-500 dark:text-slate-400 font-medium">₱</span>
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
            <Card className="bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-800 shadow-sm h-full">
              <CardContent className="p-4 flex flex-col justify-center h-full space-y-4">
                <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                  <BadgeCent className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                  Financial Summary
                </h4>
                <div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Total Program Amount</p>
                  <p className="text-lg font-bold text-slate-900 dark:text-slate-100 font-mono">
                    {amount && !isNaN(Number(amount)) ? formatCurrency(Number(amount)) : "₱ 0.00"}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">CC Allocation</p>
                  <p className="text-sm font-semibold text-slate-700 dark:text-slate-300 font-mono">
                    {ccAmount && !isNaN(Number(ccAmount)) ? formatCurrency(Number(ccAmount)) : "₱ 0.00"}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* SECTION 4: PROGRAM DESCRIPTION */}
      <section className="space-y-2 bg-white dark:bg-slate-900 p-6 rounded-md shadow-sm border border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-2">
          <div className="bg-amber-100 dark:bg-amber-500/20 p-1.5 rounded-md">
            <ClipboardList className="h-5 w-5 text-amber-600 dark:text-amber-400" />
          </div>
          <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">4. Program Description</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="projectProgramActivity" className="text-slate-700 dark:text-slate-300">Project / Program / Activity <span className="text-red-500 dark:text-red-400">*</span></Label>
            <Textarea 
              id="projectProgramActivity" 
              {...register("projectProgramActivity")} 
              className={`min-h-[120px] resize-y ${errors.projectProgramActivity ? "border-red-500 focus-visible:ring-red-500" : ""}`}
              placeholder="Provide the official project or activity description."
            />
            {errors.projectProgramActivity && <p className="text-xs text-red-500 dark:text-red-400 mt-1">{errors.projectProgramActivity.message}</p>}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="expectedOutput" className="text-slate-700 dark:text-slate-300">Expected Output <span className="text-red-500 dark:text-red-400">*</span></Label>
            <Textarea 
              id="expectedOutput" 
              {...register("expectedOutput")} 
              className={`min-h-[120px] resize-y ${errors.expectedOutput ? "border-red-500 focus-visible:ring-red-500" : ""}`}
              placeholder="Describe measurable results expected from this program."
            />
            {errors.expectedOutput && <p className="text-xs text-red-500 dark:text-red-400 mt-1">{errors.expectedOutput.message}</p>}
          </div>
        </div>
      </section>

      {/* SECTION 5: DESIGN & PLANNING */}
      <section className="space-y-2 bg-white dark:bg-slate-900 p-6 rounded-md shadow-sm border border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-2">
          <div className="bg-purple-100 dark:bg-purple-500/20 p-1.5 rounded-md">
            <Palette className="h-5 w-5 text-purple-600 dark:text-purple-400" />
          </div>
          <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">5. Design & Planning</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="space-y-2">
            <Label htmlFor="designType" className="text-slate-700 dark:text-slate-300">Design Type</Label>
            <Select onValueChange={(val) => setValue("designType", val)} defaultValue={watch("designType")}>
              <SelectTrigger>
                <SelectValue placeholder="Select design type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="new-construction">New Construction</SelectItem>
                <SelectItem value="renovation">Renovation/Repair</SelectItem>
                <SelectItem value="expansion">Expansion</SelectItem>
                <SelectItem value="reconstruction">Reconstruction</SelectItem>
                <SelectItem value="others">Others</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="designStatus" className="text-slate-700 dark:text-slate-300">Design Status</Label>
            <Select onValueChange={(val) => setValue("designStatus", val)} defaultValue={watch("designStatus")}>
              <SelectTrigger>
                <SelectValue placeholder="Select design status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="planning">Planning</SelectItem>
                <SelectItem value="design-phase">Design Phase</SelectItem>
                <SelectItem value=" bidding">Bidding</SelectItem>
                <SelectItem value="construction">Under Construction</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="not-applicable">Not Applicable</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="location" className="text-slate-700 dark:text-slate-300">Location</Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-2.5 h-4 w-4 text-slate-400 dark:text-slate-500" />
              <Input 
                id="location" 
                {...register("location")} 
                className="pl-9"
                placeholder="Enter project location"
              />
            </div>
          </div>
          
          <div className="lg:col-span-2 space-y-2">
            <Label htmlFor="architecturalDesign" className="text-slate-700 dark:text-slate-300">Architectural Design</Label>
            <Textarea 
              id="architecturalDesign" 
              {...register("architecturalDesign")} 
              className="min-h-[80px] resize-y"
              placeholder="Describe architectural design requirements and specifications..."
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="technicalSpecs" className="text-slate-700 dark:text-slate-300">Technical Specifications</Label>
            <div className="relative">
              <Ruler className="absolute left-3 top-2.5 h-4 w-4 text-slate-400 dark:text-slate-500" />
              <Textarea 
                id="technicalSpecs" 
                {...register("technicalSpecs")} 
                className="pl-9 min-h-[80px] resize-y"
                placeholder="Enter technical specifications..."
              />
            </div>
          </div>
        </div>
      </section>
      
    </div>
  )
}
