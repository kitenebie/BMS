import { useEffect, useMemo, useState } from "react"
import { X } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/src/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogStickyFooter,
  DialogStickyHeader,
  DialogTitle,
} from "@/src/components/ui/dialog"
import { Input } from "@/src/components/ui/input"
import { Label } from "@/src/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/src/components/ui/select"
import { aipMainList, annualBudgetList, accountScopes, departments, expenseTypes, fundTypes } from "@/src/data/mockData"
import { cn, formatCurrency } from "@/src/lib/utils"

type AnnualBudgetRow = (typeof annualBudgetList)[number]

function getAipKey(aipCode: string) {
  return aipCode.split("-").slice(0, 5).join("-")
}

function getAipRemainingAllotment(aipCode: string, rows: AnnualBudgetRow[], rowId: string, nextBudget: number) {
  if (!aipCode) return null
  const key = getAipKey(aipCode)
  const aipMain = aipMainList.find((item) => getAipKey(item.aipCode) === key)
  if (!aipMain) return null

  const totalAllocated = rows.reduce((acc, row) => {
    if (row.id === rowId) return acc + nextBudget
    if (getAipKey(row.aipCode) !== key) return acc
    return acc + row.annualBudget
  }, 0)

  return aipMain.totalAmount - totalAllocated
}

export function EditAnnualBudgetEntryModal({
  open,
  onOpenChange,
  rows,
  row,
  onSave,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  rows: AnnualBudgetRow[]
  row: AnnualBudgetRow | null
  onSave: (next: AnnualBudgetRow) => void
}) {
  const aipOptions = useMemo(() => {
    const extra = row?.aipCode && !aipMainList.some((item) => item.aipCode === row.aipCode)
      ? [{ id: "__current__", aipCode: row.aipCode, ppa: "Current selection", totalAmount: 0, totalLep: 0, status: "active" as const }]
      : []
    return [...extra, ...aipMainList]
  }, [row?.aipCode])

  const [aipCode, setAipCode] = useState("")
  const [fundType, setFundType] = useState("")
  const [expenseType, setExpenseType] = useState("")
  const [department, setDepartment] = useState("")
  const [accountCode, setAccountCode] = useState("")
  const [accountScope, setAccountScope] = useState("")
  const [budget, setBudget] = useState("")

  useEffect(() => {
    if (!row) return
    setAipCode(row.aipCode ?? "")
    setFundType(row.fundType ?? "")
    setExpenseType(row.expenseType ?? "")
    setDepartment(row.department ?? "")
    setAccountCode(row.accountCode ?? "")
    setAccountScope(row.accountScope ?? "")
    setBudget(String(row.annualBudget ?? ""))
  }, [row])

  const parsedBudget = Number.isFinite(Number(budget)) ? Number(budget) : 0
  const remainingAllotment = useMemo(() => {
    if (!row) return null
    return getAipRemainingAllotment(aipCode, rows, row.id, parsedBudget)
  }, [aipCode, parsedBudget, row, rows])

  const canSave = Boolean(aipCode && fundType && expenseType && department && accountCode && accountScope && parsedBudget >= 0)

  const handleSave = () => {
    if (!row) return
    if (!canSave) {
      toast.error("Please complete the required fields.")
      return
    }

    const next: AnnualBudgetRow = {
      ...row,
      aipCode,
      fundType,
      expenseType,
      department,
      accountCode,
      accountScope,
      annualBudget: parsedBudget,
      remaining: parsedBudget - row.obligated,
      status: parsedBudget - row.obligated < 0 ? "over-obligated" : "healthy",
    }

    onSave(next)
    toast.success("Budget entry updated (mock).")
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[980px] w-[95vw] p-0 gap-0 overflow-hidden" hideCloseButton>
        <DialogStickyHeader className="px-6 py-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <DialogTitle>Edit Budget Entry</DialogTitle>
              <DialogDescription className="mt-1">
                Update classification fields and budget allocation for this account code.
              </DialogDescription>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 rounded-full"
              onClick={() => onOpenChange(false)}
              aria-label="Close"
              title="Close"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
        </DialogStickyHeader>

        <div className="px-6 py-5 max-h-[70vh] overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-3">
              <Label>Annual Investment Plan</Label>
              <Select value={aipCode} onValueChange={setAipCode}>
                <SelectTrigger>
                  <SelectValue placeholder="Select AIP" />
                </SelectTrigger>
                <SelectContent>
                  {aipOptions.map((item) => (
                    <SelectItem key={item.id} value={item.aipCode}>
                      {item.aipCode} — {item.ppa}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Fund Type</Label>
              <Select value={fundType} onValueChange={setFundType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Fund Type" />
                </SelectTrigger>
                <SelectContent>
                  {fundTypes.map((item) => (
                    <SelectItem key={item} value={item}>
                      {item}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Expense Type</Label>
              <Select value={expenseType} onValueChange={setExpenseType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Expense Type" />
                </SelectTrigger>
                <SelectContent>
                  {expenseTypes.map((item) => (
                    <SelectItem key={item} value={item}>
                      {item}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Department</Label>
              <Select value={department} onValueChange={setDepartment}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Department" />
                </SelectTrigger>
                <SelectContent>
                  {departments.map((item) => (
                    <SelectItem key={item} value={item}>
                      {item}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Account Code</Label>
              <Select value={accountCode} onValueChange={setAccountCode}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Account Code" />
                </SelectTrigger>
                <SelectContent>
                  {Array.from(new Set(rows.map((r) => r.accountCode))).map((code) => (
                    <SelectItem key={code} value={code}>
                      {code}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Account Scope</Label>
              <Select value={accountScope} onValueChange={setAccountScope}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Account Scope" />
                </SelectTrigger>
                <SelectContent>
                  {accountScopes.map((item) => (
                    <SelectItem key={item} value={item}>
                      {item}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="md:col-span-3">
              <div className="rounded-2xl border border-slate-300/70 dark:border-white/[0.08] bg-slate-50/70 dark:bg-[#12121a]/40 p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="rounded-xl border border-slate-300/70 dark:border-white/[0.08] bg-[#F0F0F0]/80 dark:bg-white/[0.03] p-4">
                    <div className="text-xs font-medium text-slate-600 dark:text-slate-400">
                      Remaining Allotment (AIP)
                    </div>
                    <div
                      className={cn(
                        "mt-1 text-lg font-semibold",
                        typeof remainingAllotment === "number" && remainingAllotment < 0
                          ? "text-red-600 dark:text-red-400"
                          : "text-slate-900 dark:text-slate-100"
                      )}
                    >
                      {typeof remainingAllotment === "number" ? formatCurrency(remainingAllotment) : "—"}
                    </div>
                  </div>

                  <div>
                    <Label>Budget</Label>
                    <Input
                      type="number"
                      inputMode="decimal"
                      min={0}
                      value={budget}
                      onChange={(e) => setBudget(e.target.value)}
                      placeholder="0.00"
                    />
                    <div className="mt-2 text-xs text-slate-500 dark:text-slate-400">
                      Current obligated: {row ? formatCurrency(row.obligated) : "—"} • Remaining after save:{" "}
                      {row ? formatCurrency(parsedBudget - row.obligated) : "—"}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <DialogStickyFooter className="px-6 py-4">
          <div className="flex items-center justify-end gap-3">
            <Button variant="tab" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button
              className="bg-gradient-to-r from-[#00ff88] to-[#00cc6a] text-[#0a0a0f] font-semibold"
              disabled={!canSave}
              onClick={handleSave}
            >
              Save
            </Button>
          </div>
        </DialogStickyFooter>
      </DialogContent>
    </Dialog>
  )
}

