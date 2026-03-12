import { useState } from "react"
import { 
  Card, 
  CardContent, 
  CardHeader, 
} from "@/src/components/ui/card"
import { Button } from "@/src/components/ui/button"
import { Input } from "@/src/components/ui/input"
import { Badge } from "@/src/components/ui/badge"
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/src/components/ui/table"
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/src/components/ui/dialog"
import { Label } from "@/src/components/ui/label"
import { Textarea } from "@/src/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/src/components/ui/select"
import { aipMainList, aipProgramList, departments, sectors, subSectors, fundTypes, expenseTypes } from "@/src/data/mockData"
import { formatCurrency } from "@/src/lib/utils"
import { 
  Search, 
  Plus, 
  Filter, 
  Download, 
  MoreHorizontal,
} from "lucide-react"
import { AipMainTable } from "@/src/components/AipMainTable"
import { MainAnnualInvestmentPlanModal } from "@/src/components/MainAnnualInvestmentPlanModal"
import { AipProgramTable } from "@/src/components/AipProgramTable"

export function AIP() {
  const [activeTab, setActiveTab] = useState<"main" | "program">("main")
  const [isMainModalOpen, setIsMainModalOpen] = useState(false)
  const [isProgramModalOpen, setIsProgramModalOpen] = useState(false)

  // Mock selected AIP for the Add Program modal
  const selectedAip = {
    aipCode: "1000-000-2-01-01-000-000",
    office: "OFFICE OF THE CITY MAYOR (OCM)",
    departmentCode: "2-01-001",
    sector: "1000"
  }

  return (
    <div className="space-y-6">
      {activeTab === "main" && (
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">Annual Investment Plan</h1>
            <p className="text-slate-500 mt-1">Manage and track AIP allocations and programs</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" className="gap-2">
              <Download className="h-4 w-4" />
              Export
            </Button>
            <Button className="gap-2" onClick={() => setIsMainModalOpen(true)}>
              <Plus className="h-4 w-4" />
              Add Main AIP
            </Button>
            <MainAnnualInvestmentPlanModal 
              open={isMainModalOpen} 
              onOpenChange={setIsMainModalOpen}
            />
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className="flex space-x-1 rounded-lg bg-slate-100 p-1 w-fit">
        <button
          onClick={() => setActiveTab("main")}
          className={`rounded-md px-4 py-2 text-sm font-medium transition-all ${
            activeTab === "main" 
              ? "bg-white text-slate-900 shadow-sm" 
              : "text-slate-600 hover:text-slate-900"
          }`}
        >
          Main AIP
        </button>
        <button
          onClick={() => setActiveTab("program")}
          className={`rounded-md px-4 py-2 text-sm font-medium transition-all ${
            activeTab === "program" 
              ? "bg-white text-slate-900 shadow-sm" 
              : "text-slate-600 hover:text-slate-900"
          }`}
        >
          AIP Program
        </button>
      </div>

      {activeTab === "main" && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4 flex flex-col justify-center">
              <p className="text-sm font-medium text-slate-500">Total Programs</p>
              <p className="text-xl font-bold text-slate-900 mt-1">
                {aipMainList.length}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 flex flex-col justify-center">
              <p className="text-sm font-medium text-slate-500">Total Amount</p>
              <p className="text-xl font-bold text-slate-900 mt-1">
                {formatCurrency(aipMainList.reduce((acc, curr) => acc + curr.totalAmount, 0))}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 flex flex-col justify-center">
              <p className="text-sm font-medium text-slate-500">Total LEP</p>
              <p className="text-xl font-bold text-slate-900 mt-1">
                {formatCurrency(aipMainList.reduce((acc, curr) => acc + curr.totalLep, 0))}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 flex flex-col justify-center">
              <p className="text-sm font-medium text-slate-500">Total Obligated</p>
              <p className="text-xl font-bold text-slate-900 mt-1">
                {formatCurrency(aipProgramList.reduce((acc, curr) => acc + curr.obligated, 0))}
              </p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Main Content Card */}
      {activeTab === "main" ? (
        <AipMainTable />
      ) : (
        <AipProgramTable />
      )}
    </div>
  )
}
