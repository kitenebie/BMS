import { useMemo, useState } from "react"
import { motion } from "framer-motion"
import { toast } from "sonner"
import { 
  Card, 
  CardContent, 
  CardHeader, 
} from "@/src/components/ui/card"
import { Button } from "@/src/components/ui/button"
import { Input } from "@/src/components/ui/input"
import { Badge } from "@/src/components/ui/badge"
import { DataTable, type DataTableColumn } from "@/src/components/ui/data-table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu"
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/src/components/ui/select"
import { annualBudgetList, aipMainList, fundTypes, expenseTypes, departments, accountScopes, realignmentHistoryList, supplementalHistoryList } from "@/src/data/mockData"
import { cn, formatCurrency } from "@/src/lib/utils"
import { RealignmentModal } from "@/src/components/budget/RealignmentModal"
import { SupplementalModal } from "@/src/components/budget/SupplementalModal"
import { EditAnnualBudgetEntryModal } from "@/src/components/budget/EditAnnualBudgetEntryModal"
import { 
  Search, 
  Plus, 
  Filter, 
  MoreHorizontal,
  ArrowRightLeft,
  FilePlus,
  RefreshCcw,
  FileBarChart,
  AlertCircle,
  Pencil,
  Trash2,
  RotateCcw
} from "lucide-react"

type AnnualBudgetTab = "annual" | "realignment" | "supplemental"

export function AnnualBudget() {
  const [activeTab, setActiveTab] = useState<AnnualBudgetTab>("annual")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isRealignmentOpen, setIsRealignmentOpen] = useState(false)
  const [isSupplementalOpen, setIsSupplementalOpen] = useState(false)
  const [tableRows, setTableRows] = useState(() => annualBudgetList)
  const [annualSearch, setAnnualSearch] = useState("")
  const [editRow, setEditRow] = useState<(typeof annualBudgetList)[number] | null>(null)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [deleteRow, setDeleteRow] = useState<(typeof annualBudgetList)[number] | null>(null)

  const [realignmentHistoryRows, setRealignmentHistoryRows] = useState(() => realignmentHistoryList)
  const [supplementalHistoryRows, setSupplementalHistoryRows] = useState(() => supplementalHistoryList)
  const [realignmentSearch, setRealignmentSearch] = useState("")
  const [supplementalSearch, setSupplementalSearch] = useState("")
  const [rollbackTarget, setRollbackTarget] = useState<
    | { kind: "realignment"; row: (typeof realignmentHistoryList)[number] }
    | { kind: "supplemental"; row: (typeof supplementalHistoryList)[number] }
    | null
  >(null)

  const [budgetMappings, setBudgetMappings] = useState([{
    department: '',
    accountCode: '',
    accountScope: '',
    budgetAmount: ''
  }]);

  const handleBudgetMappingChange = (index: number, field: string, value: string) => {
    setBudgetMappings(prev => {
      const newMappings = [...prev];
      newMappings[index][field] = value;
      return newMappings;
    });
  };

  const addBudgetMapping = () => {
    setBudgetMappings(prev => [...prev, {
      department: '',
      accountCode: '',
      accountScope: '',
      budgetAmount: ''
    }]);
  };

  const removeBudgetMapping = (index: number) => {
    if (budgetMappings.length > 1) {
      setBudgetMappings(prev => prev.filter((_, i) => i !== index));
    }
  };

  const totalBudget = useMemo(() => tableRows.reduce((acc, curr) => acc + curr.annualBudget, 0), [tableRows])
  const totalObligated = useMemo(() => tableRows.reduce((acc, curr) => acc + curr.obligated, 0), [tableRows])
  const remaining = useMemo(() => tableRows.reduce((acc, curr) => acc + curr.remaining, 0), [tableRows])
  const overObligatedCount = useMemo(() => tableRows.filter(b => b.status === 'over-obligated').length, [tableRows])

  const handleEdit = (row: (typeof annualBudgetList)[number]) => {
    setEditRow(row)
    setIsEditOpen(true)
  }

  const handleDeleteConfirm = () => {
    if (!deleteRow) return
    setTableRows((prev) => prev.filter((row) => row.id !== deleteRow.id))
    toast.success("Budget entry deleted (mock).")
    setDeleteRow(null)
  }

  const filteredAnnualRows = useMemo(() => {
    const q = annualSearch.trim().toLowerCase()
    if (!q) return tableRows
    return tableRows.filter((row) => {
      return [
        row.accountCode,
        row.ppa,
        row.fundType,
        row.expenseType,
        row.department,
        row.aipCode,
      ]
        .filter(Boolean)
        .some((val) => String(val).toLowerCase().includes(q))
    })
  }, [annualSearch, tableRows])

  const filteredRealignmentHistoryRows = useMemo(() => {
    const q = realignmentSearch.trim().toLowerCase()
    if (!q) return realignmentHistoryRows
    return realignmentHistoryRows.filter((row) => {
      return [
        row.id,
        row.entryDate,
        row.fundType,
        row.expenseType,
        row.responsibleOffice,
        row.description,
        row.status,
      ]
        .filter(Boolean)
        .some((val) => String(val).toLowerCase().includes(q))
    })
  }, [realignmentHistoryRows, realignmentSearch])

  const filteredSupplementalHistoryRows = useMemo(() => {
    const q = supplementalSearch.trim().toLowerCase()
    if (!q) return supplementalHistoryRows
    return supplementalHistoryRows.filter((row) => {
      return [row.id, row.entryDate, row.description, row.status]
        .filter(Boolean)
        .some((val) => String(val).toLowerCase().includes(q))
    })
  }, [supplementalHistoryRows, supplementalSearch])

  const realignmentColumns: Array<DataTableColumn<(typeof realignmentHistoryList)[number]>> = [
    {
      id: "id",
      header: "Reference No.",
      headerClassName: "w-[140px]",
      cellClassName: "font-mono text-xs font-medium text-slate-900 dark:text-white",
      cell: (row) => row.id,
    },
    {
      id: "entryDate",
      header: "Entry Date",
      headerClassName: "w-[140px]",
      cellClassName: "text-slate-600 dark:text-slate-300 text-sm",
      cell: (row) => row.entryDate,
    },
    {
      id: "classification",
      header: "Classification",
      cellClassName: "text-slate-700 dark:text-slate-200",
      cell: (row) => (
        <div className="space-y-0.5">
          <div className="font-medium">{row.fundType}</div>
          <div className="text-xs text-slate-500 dark:text-slate-400">{row.expenseType}</div>
        </div>
      ),
    },
    {
      id: "office",
      header: "Responsible Office",
      cellClassName: "text-slate-600 dark:text-slate-400 text-sm",
      cell: (row) => row.responsibleOffice,
    },
    {
      id: "lines",
      header: "Lines",
      headerClassName: "w-[120px] text-center",
      cellClassName: "text-center text-slate-600 dark:text-slate-400",
      cell: (row) => `${row.fromLines} → ${row.toLines}`,
    },
    {
      id: "amount",
      header: "Total Amount",
      headerClassName: "text-right w-[160px]",
      cellClassName: "text-right font-medium text-slate-900 dark:text-white",
      cell: (row) => formatCurrency(row.totalAmount),
    },
    {
      id: "status",
      header: "Status",
      headerClassName: "w-[140px]",
      cell: (row) => (
        <Badge variant={row.status === "rolled-back" ? "secondary" : "success"}>
          {row.status === "rolled-back" ? "Rolled Back" : "Posted"}
        </Badge>
      ),
    },
    {
      id: "actions",
      header: "",
      headerClassName: "w-[80px]",
      cellClassName: "text-right",
      cell: (row) => (
        <div className="flex justify-end">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="tab" size="icon" className="h-8 w-8" aria-label="Row actions">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-44">
              <DropdownMenuItem
                disabled={row.status === "rolled-back"}
                onClick={() => setRollbackTarget({ kind: "realignment", row })}
                className="gap-2 cursor-pointer"
              >
                <RotateCcw className="h-4 w-4 text-slate-500 dark:text-slate-400" />
                RollBack
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ),
    },
  ]

  const supplementalColumns: Array<DataTableColumn<(typeof supplementalHistoryList)[number]>> = [
    {
      id: "id",
      header: "Reference No.",
      headerClassName: "w-[140px]",
      cellClassName: "font-mono text-xs font-medium text-slate-900 dark:text-white",
      cell: (row) => row.id,
    },
    {
      id: "entryDate",
      header: "Entry Date",
      headerClassName: "w-[140px]",
      cellClassName: "text-slate-600 dark:text-slate-300 text-sm",
      cell: (row) => row.entryDate,
    },
    {
      id: "description",
      header: "Description",
      cellClassName: "text-slate-700 dark:text-slate-200",
      cell: (row) => row.description,
    },
    {
      id: "entries",
      header: "Entries",
      headerClassName: "w-[120px] text-center",
      cellClassName: "text-center text-slate-600 dark:text-slate-400",
      cell: (row) => row.entries,
    },
    {
      id: "amount",
      header: "Total Amount",
      headerClassName: "text-right w-[160px]",
      cellClassName: "text-right font-medium text-slate-900 dark:text-white",
      cell: (row) => formatCurrency(row.totalAmount),
    },
    {
      id: "status",
      header: "Status",
      headerClassName: "w-[140px]",
      cell: (row) => (
        <Badge variant={row.status === "rolled-back" ? "secondary" : "success"}>
          {row.status === "rolled-back" ? "Rolled Back" : "Posted"}
        </Badge>
      ),
    },
    {
      id: "actions",
      header: "",
      headerClassName: "w-[80px]",
      cellClassName: "text-right",
      cell: (row) => (
        <div className="flex justify-end">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="tab" size="icon" className="h-8 w-8" aria-label="Row actions">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-44">
              <DropdownMenuItem
                disabled={row.status === "rolled-back"}
                onClick={() => setRollbackTarget({ kind: "supplemental", row })}
                className="gap-2 cursor-pointer"
              >
                <RotateCcw className="h-4 w-4 text-slate-500 dark:text-slate-400" />
                RollBack
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ),
    },
  ]

  const columns: Array<DataTableColumn<(typeof annualBudgetList)[number]>> = [
    {
      id: "accountCode",
      header: "Account Code",
      headerClassName: "w-[150px]",
      cellClassName: "font-mono text-xs font-medium text-slate-900 dark:text-white",
      cell: (row) => row.accountCode,
    },
    {
      id: "ppa",
      header: "PPA / Description",
      cellClassName: "font-medium text-slate-900 dark:text-slate-200",
      cell: (row) => (
        <>
          {row.ppa}
          <div className="text-xs font-normal text-slate-500 mt-0.5">
            {row.fundType} • {row.expenseType}
          </div>
        </>
      ),
    },
    {
      id: "department",
      header: "Department",
      cellClassName: "text-slate-600 dark:text-slate-400 text-xs",
      cell: (row) => row.department,
    },
    {
      id: "annualBudget",
      header: "Annual Budget",
      headerClassName: "text-right",
      cellClassName: "text-right font-medium text-slate-900 dark:text-white",
      cell: (row) => formatCurrency(row.annualBudget),
    },
    {
      id: "obligated",
      header: "Obligated",
      headerClassName: "text-right",
      cellClassName: "text-right text-slate-600 dark:text-slate-400",
      cell: (row) => formatCurrency(row.obligated),
    },
    {
      id: "remaining",
      header: "Remaining",
      headerClassName: "text-right",
      cellClassName: "text-right font-medium",
      cell: (row) => (
        <span
          className={
            row.remaining < 0 ? "text-red-500 dark:text-red-400" : "text-emerald-700 dark:text-[#00ff88]"
          }
        >
          {formatCurrency(row.remaining)}
        </span>
      ),
    },
    {
      id: "actions",
      header: "",
      headerClassName: "w-[80px]",
      cellClassName: "text-right",
      cell: (row) => (
        <div className="flex justify-end">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="tab" size="icon" className="h-8 w-8" aria-label="Row actions">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40">
              <DropdownMenuItem onClick={() => handleEdit(row)} className="gap-2 cursor-pointer">
                <Pencil className="h-4 w-4 text-slate-500 dark:text-slate-400" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => setDeleteRow(row)}
                className="gap-2 cursor-pointer text-red-600 focus:text-red-600 focus:bg-red-50 dark:text-red-400 dark:focus:text-red-300 dark:focus:bg-red-950/50"
              >
                <Trash2 className="h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ),
    },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-slate-900 via-slate-700 to-slate-500 dark:from-white dark:via-slate-200 dark:to-slate-400 bg-clip-text text-transparent">
            Annual Budget
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">Manage budget allocations and track obligations</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Button
            variant="outline"
            className="gap-2 bg-emerald-500/10 text-emerald-700 border border-emerald-500/20 hover:bg-emerald-500/20 hover:text-emerald-800 dark:border-emerald-500/30 dark:hover:bg-emerald-500/20 dark:hover:text-emerald-300"
            onClick={() => setIsRealignmentOpen(true)}
          >
            <ArrowRightLeft className="h-4 w-4" />
            Realignment
          </Button>
          <Button
            variant="outline"
            className="gap-2 bg-orange-500/10 text-orange-700 border border-orange-500/20 hover:bg-orange-500/20 hover:text-orange-800 dark:border-orange-500/30 dark:hover:bg-orange-500/20 dark:hover:text-orange-300"
            onClick={() => setIsSupplementalOpen(true)}
          >
            <FilePlus className="h-4 w-4" />
            Supplemental
          </Button>
          <Button
            variant="outline"
            className="gap-2 bg-blue-500/10 text-blue-700 border border-blue-500/20 hover:bg-blue-500/20 hover:text-blue-800 dark:border-blue-500/30 dark:hover:bg-blue-500/20 dark:hover:text-blue-300"
          >
            <RefreshCcw className="h-4 w-4" />
            Continuing Appr.
          </Button>
          <Button
            variant="outline"
            className="gap-2 bg-purple-500/10 text-purple-700 border border-purple-500/20 hover:bg-purple-500/20 hover:text-purple-800 dark:border-purple-500/30 dark:hover:bg-purple-500/20 dark:hover:text-purple-300"
          >
            <FileBarChart className="h-4 w-4" />
            Reports
          </Button>
          <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2 bg-gradient-to-r from-[#00ff88] to-[#00cc6a] text-[#0a0a0f] font-semibold">
                <Plus className="h-4 w-4" />
                Add Account Code
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-[80%] max-h-[90vh]">
              <DialogHeader className="border-b border-slate-300/70 dark:border-white/[0.06] pb-4">
                <DialogTitle>Add Account Code</DialogTitle>
                <DialogDescription>Map a new budget account code to an existing AIP.</DialogDescription>
              </DialogHeader>
              <div className="flex grid gap-4 grid-cols-3 py-2 w-full h-full overflow-y-auto">
                {/* AIP and Type Selection */}
                <Card className="h-full">
                  <CardHeader className="pb-3 border-b border-slate-300/70 dark:border-white/[0.06] bg-slate-50/70 dark:bg-[#12121a]/40">
                    <h3 className="font-semibold text-sm text-slate-900 dark:text-white">1. AIP and Type Selection</h3>
                  </CardHeader>
                  <CardContent className="pt-4 space-y-6">
                    <div className="space-y-2">
                      <Label>Annual Investment Plan</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select AIP" />
                        </SelectTrigger>
                        <SelectContent>
                          {aipMainList.map((a) => (
                            <SelectItem key={a.id} value={a.id}>
                              {a.aipCode} - {a.ppa}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Fund Type</Label>
                      <Select>
                        <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                        <SelectContent>
                          {fundTypes.map((f) => (
                            <SelectItem key={f} value={f}>
                              {f}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Expense Type</Label>
                      <Select>
                        <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                        <SelectContent>
                          {expenseTypes.map((e) => (
                            <SelectItem key={e} value={e}>
                              {e}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="mt-2 p-3 bg-orange-500/10 border border-orange-500/20 rounded-xl flex items-center justify-between">
                      <span className="text-sm font-medium text-orange-600 dark:text-orange-400">Remaining Allotment</span>
                      <span className="text-lg font-bold text-orange-600 dark:text-orange-400">₱ 0.00</span>
                    </div>
                  </CardContent>
                </Card>
                
                {/* Budget Mapping */}
                <Card className="h-full col-span-2">
                  <CardHeader className="pb-3 border-b border-slate-300/70 dark:border-white/[0.06] bg-slate-50/70 dark:bg-[#12121a]/40">
                    <h3 className="font-semibold text-sm text-slate-900 dark:text-white">2. Budget Mapping</h3>
                    <div className="flex items-center justify-center mt-3">
                      <Button
                        variant="outline"
                        className="bg-emerald-500/10 hover:bg-emerald-500/20 hover:text-emerald-800 text-emerald-700 border border-emerald-500/20 w-full dark:border-emerald-500/30 dark:hover:bg-emerald-500/20 dark:hover:text-emerald-300"
                        onClick={addBudgetMapping}
                      >
                        <Plus className="mr-2 h-4 w-4" />
                        Add Another Budget Mapping
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <div className="grid gap-4 grid-cols-2 max-h-[500px] overflow-y-auto">
                      {budgetMappings.map((mapping, index) => (
                        <div key={index} className="border rounded-xl border-slate-300/70 dark:border-white/[0.06]">
                          <div className="flex items-center p-4 justify-between mb-2 pb-3 border-b border-slate-300/70 dark:border-white/[0.06] bg-slate-50/70 dark:bg-[#12121a]/40">
                            <h4 className="font-semibold text-sm text-slate-900 dark:text-white">Budget Mapping {index + 1}</h4>
                            {budgetMappings.length > 1 && (
                              <Button variant="ghost" size="icon" onClick={() => removeBudgetMapping(index)}>
                                <Trash2 className="h-6 w-6 text-red-500 dark:text-red-400" />
                              </Button>
                            )}
                          </div>
                          <div className="grid gap-4 px-4 pb-4">
                            <div className="space-y-2">
                              <Label>Department</Label>
                              <Select
                                value={mapping.department}
                                onValueChange={(value) => handleBudgetMappingChange(index, 'department', value)}
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Select Department" />
                                </SelectTrigger>
                                <SelectContent>
                                  {departments.map((d) => (
                                    <SelectItem key={d} value={d}>
                                      {d}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="space-y-2">
                              <Label>Account Code</Label>
                              <Input
                                value={mapping.accountCode}
                                onChange={(e) => handleBudgetMappingChange(index, 'accountCode', e.target.value)}
                                placeholder="e.g. 5-02-01-010"
                                className="font-mono"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label>Account Scope</Label>
                              <Select
                                value={mapping.accountScope}
                                onValueChange={(value) => handleBudgetMappingChange(index, 'accountScope', value)}
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Select Scope" />
                                </SelectTrigger>
                                <SelectContent>
                                  {accountScopes.map((s) => (
                                    <SelectItem key={s} value={s}>
                                      {s}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="space-y-2">
                              <Label>Budget Amount (₱)</Label>
                              <div className="relative">
                                <span className="absolute left-3 top-2.5 text-slate-500">₱</span>
                                <Input
                                  type="number"
                                  value={mapping.budgetAmount}
                                  onChange={(e) => handleBudgetMappingChange(index, 'budgetAmount', e.target.value)}
                                  placeholder="0.00"
                                  className="pl-8 text-lg font-medium"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
              <DialogFooter className="items-center mt-4 border-t border-slate-300/70 dark:border-white/[0.06] p-4 justify-between sm:justify-between">
                <div className="flex items-center text-amber-600 dark:text-amber-400 text-sm gap-1.5">
                  <AlertCircle className="h-4 w-4" />
                  <span>Please verify remaining allotment before saving.</span>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" onClick={() => setIsModalOpen(false)}>
                    Cancel
                  </Button>
                  <Button className="bg-gradient-to-r from-[#00ff88] to-[#00cc6a] text-[#0a0a0f] font-semibold">Save Account Code</Button>
                </div>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </motion.div>

      <div className="flex flex-wrap items-center gap-2">
        <Button
          variant="tab"
          size="sm"
          onClick={() => setActiveTab("annual")}
          className={cn(
            activeTab === "annual" &&
              "bg-gradient-to-r from-[#00ff88]/18 to-[#00cc6a]/8 text-emerald-700 border-[#00ff88]/35 dark:text-[#00ff88] dark:border-[#00ff88]/35"
          )}
        >
          Annual Budget
        </Button>
        <Button
          variant="tab"
          size="sm"
          onClick={() => setActiveTab("realignment")}
          className={cn(
            activeTab === "realignment" &&
              "bg-gradient-to-r from-[#00ff88]/18 to-[#00cc6a]/8 text-emerald-700 border-[#00ff88]/35 dark:text-[#00ff88] dark:border-[#00ff88]/35"
          )}
        >
          Realignment History
        </Button>
        <Button
          variant="tab"
          size="sm"
          onClick={() => setActiveTab("supplemental")}
          className={cn(
            activeTab === "supplemental" &&
              "bg-gradient-to-r from-[#00ff88]/18 to-[#00cc6a]/8 text-emerald-700 border-[#00ff88]/35 dark:text-[#00ff88] dark:border-[#00ff88]/35"
          )}
        >
          Supplemental History
        </Button>
      </div>

      <RealignmentModal open={isRealignmentOpen} onOpenChange={setIsRealignmentOpen} />
      <SupplementalModal open={isSupplementalOpen} onOpenChange={setIsSupplementalOpen} />
      <EditAnnualBudgetEntryModal
        open={isEditOpen}
        onOpenChange={(open) => {
          setIsEditOpen(open)
          if (!open) setEditRow(null)
        }}
        rows={tableRows}
        row={editRow}
        onSave={(next) => setTableRows((prev) => prev.map((row) => (row.id === next.id ? next : row)))}
      />

      <Dialog
        open={Boolean(deleteRow)}
        onOpenChange={(open) => {
          if (!open) setDeleteRow(null)
        }}
      >
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Delete entry?</DialogTitle>
            <DialogDescription>
              This will remove the annual budget record for{" "}
              <span className="font-medium text-slate-900 dark:text-slate-100">{deleteRow?.accountCode}</span>.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="tab" onClick={() => setDeleteRow(null)}>
              Cancel
            </Button>
            <Button className="bg-red-600 hover:bg-red-700 text-white" onClick={handleDeleteConfirm}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog
        open={Boolean(rollbackTarget)}
        onOpenChange={(open) => {
          if (!open) setRollbackTarget(null)
        }}
      >
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>RollBack record?</DialogTitle>
            <DialogDescription>
              This will mark{" "}
              <span className="font-medium text-slate-900 dark:text-slate-100">
                {rollbackTarget?.row.id}
              </span>{" "}
              as rolled back (mock).
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="tab" onClick={() => setRollbackTarget(null)}>
              Cancel
            </Button>
            <Button
              className="bg-gradient-to-r from-[#00ff88] to-[#00cc6a] text-[#0a0a0f] font-semibold"
              onClick={() => {
                if (!rollbackTarget) return
                if (rollbackTarget.kind === "realignment") {
                  setRealignmentHistoryRows((prev) =>
                    prev.map((row) =>
                      row.id === rollbackTarget.row.id ? { ...row, status: "rolled-back" as const } : row
                    )
                  )
                } else {
                  setSupplementalHistoryRows((prev) =>
                    prev.map((row) =>
                      row.id === rollbackTarget.row.id ? { ...row, status: "rolled-back" as const } : row
                    )
                  )
                }
                toast.success("Record rolled back (mock).")
                setRollbackTarget(null)
              }}
            >
              RollBack
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Main Content Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        {activeTab === "annual" ? (
          <Card>
            <CardHeader className="border-b border-slate-300/70 dark:border-white/[0.06] pb-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="relative w-full md:max-w-sm">
                  <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
                  <Input
                    type="search"
                    placeholder="Search by code, PPA, or department..."
                    className="pl-10"
                    value={annualSearch}
                    onChange={(e) => setAnnualSearch(e.target.value)}
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" className="gap-2">
                    <Filter className="h-4 w-4" />
                    Filters
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <DataTable
                data={filteredAnnualRows}
                columns={columns}
                rowKey={(row) => row.id}
                getRowClassName={(row) =>
                  row.status === "over-obligated" ? "bg-red-500/5 dark:bg-red-500/10" : undefined
                }
                emptyState={{ message: "No annual budget entries found." }}
              />
            </CardContent>
          </Card>
        ) : activeTab === "realignment" ? (
          <Card>
            <CardHeader className="border-b border-slate-300/70 dark:border-white/[0.06] pb-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="relative w-full md:max-w-sm">
                  <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
                  <Input
                    type="search"
                    placeholder="Search realignment records..."
                    className="pl-10"
                    value={realignmentSearch}
                    onChange={(e) => setRealignmentSearch(e.target.value)}
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">{filteredRealignmentHistoryRows.length} record(s)</Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <DataTable
                data={filteredRealignmentHistoryRows}
                columns={realignmentColumns}
                rowKey={(row) => row.id}
                emptyState={{ message: "No realignment history records found." }}
              />
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardHeader className="border-b border-slate-300/70 dark:border-white/[0.06] pb-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="relative w-full md:max-w-sm">
                  <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
                  <Input
                    type="search"
                    placeholder="Search supplemental records..."
                    className="pl-10"
                    value={supplementalSearch}
                    onChange={(e) => setSupplementalSearch(e.target.value)}
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">{filteredSupplementalHistoryRows.length} record(s)</Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <DataTable
                data={filteredSupplementalHistoryRows}
                columns={supplementalColumns}
                rowKey={(row) => row.id}
                emptyState={{ message: "No supplemental history records found." }}
              />
            </CardContent>
          </Card>
        )}
      </motion.div>
    </div>
  )
}
