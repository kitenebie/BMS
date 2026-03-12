import { useState } from "react"
import { Button } from "@/src/components/ui/button"
import { 
  Plus, 
} from "lucide-react"
import { AipMainTable } from "@/src/components/AipMainTable"
import { MainAnnualInvestmentPlanModal } from "@/src/components/MainAnnualInvestmentPlanModal"
import { AddMainAIPModal } from "@/src/components/AddMainAIPModal"
import { AipProgramTable } from "@/src/components/AipProgramTable"
import { AddAIPSubProgramModal } from "@/src/components/AddAIPSubProgramModal"

export function AIP() {
  const [activeTab, setActiveTab] = useState<"main" | "program">("main")
  const [isMainModalOpen, setIsMainModalOpen] = useState(false)
  const [isAddMainAIPModalOpen, setIsAddMainAIPModalOpen] = useState(false)
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
            <h1 className="text-3xl font-bold tracking-tight text-green-700">A.I.P Main</h1>
            <p className="text-slate-500 mt-1">This is your Main Annual Investment Plan Table.</p>
          </div>
          <div className="flex items-center gap-2">
            <Button className="gap-2" onClick={() => setIsMainModalOpen(true)}>
              <Plus className="h-4 w-4" />
              Add Main AIP
            </Button>
            <MainAnnualInvestmentPlanModal 
              open={isMainModalOpen} 
              onOpenChange={setIsMainModalOpen}
            />
            <AddMainAIPModal
              open={isAddMainAIPModalOpen}
              onOpenChange={setIsAddMainAIPModalOpen}
            />
          </div>
        </div>
      )}

      {activeTab === "program" && (
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-orange-500">AIP Program</h1>
            <p className="text-slate-500 mt-1">This is your Annual Investment Plan Program Table.</p>
          </div>
          <div className="flex items-center gap-2">
            <Button className="gap-2 bg-orange-500 hover:bg-orange-600" onClick={() => setIsProgramModalOpen(true)}>
              <Plus className="h-4 w-4" />
              Add Program
            </Button>
            <AddAIPSubProgramModal
              open={isProgramModalOpen}
              onOpenChange={setIsProgramModalOpen}
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

      {/* Main Content Card */}
      {activeTab === "main" ? (
        <AipMainTable />
      ) : (
        <AipProgramTable 
          isProgramModalOpen={isProgramModalOpen}
          onProgramModalChange={setIsProgramModalOpen}
        />
      )}
    </div>
  )
}
