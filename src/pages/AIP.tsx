import { useState } from "react"
import { motion } from "framer-motion"
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
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between"
        >
          <div>
            <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-green-400 via-green-300 to-amber-300 bg-clip-text text-transparent">
              A.I.P Main
            </h1>
            <p className="text-slate-600 dark:text-slate-400 mt-1">This is your Main Annual Investment Plan Table.</p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              className="gap-2 bg-gradient-to-r from-green-500 to-emerald-500 hover:shadow-green-500/30 shadow-green-xs hover:from-green-600 hover:to-emerald-600 text-white font-semibold"
              onClick={() => setIsMainModalOpen(true)}
            >
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
        </motion.div>
      )}

      {activeTab === "program" && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between"
        >
          <div>
            <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-orange-400 via-orange-300 to-amber-300 bg-clip-text text-transparent">
              A.I.P Program
            </h1>
            <p className="text-slate-600 dark:text-slate-400 mt-1">This is your Annual Investment Plan Program Table.</p>
          </div>
          <div className="flex items-center gap-2">
            <Button className="gap-2 bg-gradient-to-r from-orange-500 to-amber-500 hover:shadow-orange-500/30 shadow-orange-xs hover:from-orange-600 hover:to-amber-600 text-white font-semibold" onClick={() => setIsProgramModalOpen(true)}>
              <Plus className="h-4 w-4" />
              Add Program
            </Button>
          </div>
        </motion.div>
      )}

      {/* Tabs */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <div className="flex space-x-1 rounded-xl bg-slate-100/70 dark:bg-[#1a1a24]/60 border border-slate-300/70 dark:border-white/[0.06] p-1 w-fit backdrop-blur-sm">
          <Button
            onClick={() => setActiveTab("main")}
            variant="tab"
            className={`h-auto px-5 py-2.5 text-sm transition-all ${
              activeTab === "main" 
                ? "bg-gradient-to-r from-[#00ff88]/18 to-[#00cc6a]/8 text-emerald-700 border-[#00ff88]/35 dark:text-[#00ff88]"
                : ""
            }`}
          >
            Main AIP
          </Button>
          <Button
            onClick={() => setActiveTab("program")}
            variant="tab"
            className={`hover:shadow-[0_0_20px_rgba(255, 136, 0, 0.4)] hover:from-amber-500/18 hover:to-amber-500/8 active:scale-[0.98] text-sm transition-all ${
              activeTab === "program" 
                ? "bg-gradient-to-r from-orange-500/18 to-amber-500/8 text-orange-700 border-orange-500/35 dark:text-orange-300"
                : ""
            }`}
          >
            AIP Program
          </Button>
        </div>
      </motion.div>

      {/* Main Content Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {activeTab === "main" ? (
          <AipMainTable />
        ) : (
          <AipProgramTable 
            isProgramModalOpen={isProgramModalOpen}
            onProgramModalChange={setIsProgramModalOpen}
          />
        )}
      </motion.div>

      {/* Modals */}
      {activeTab === "program" && (
        <>
          {/* Modal is rendered in AipProgramTable via props */}
        </>
      )}
    </div>
  )
}
