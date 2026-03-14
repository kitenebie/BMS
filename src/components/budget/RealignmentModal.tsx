import { useMemo, useState } from "react"
import { Info, Plus, Trash2, X } from "lucide-react"
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
import { aipMainList, annualBudgetList, departments, expenseTypes, fundTypes } from "@/src/data/mockData"
import { formatCurrency } from "@/src/lib/utils"

type TransferLine = {
  id: string
  aipId: string
  accountCode: string
  subAccount: string
  amount: string
}

function createLine(side: "from" | "to", index: number): TransferLine {
  return {
    id: `${side}-${Date.now()}-${index}`,
    aipId: "",
    accountCode: "",
    subAccount: "",
    amount: "",
  }
}

function getRemaining(accountCode: string) {
  if (!accountCode) return null
  const match = annualBudgetList.find((row) => row.accountCode === accountCode)
  return match ? match.remaining : null
}

export function RealignmentModal({
  open,
  onOpenChange,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  const today = useMemo(() => {
    const now = new Date()
    const yyyy = now.getFullYear()
    const mm = String(now.getMonth() + 1).padStart(2, "0")
    const dd = String(now.getDate()).padStart(2, "0")
    return `${yyyy}-${mm}-${dd}`
  }, [])

  const [entryDate, setEntryDate] = useState(today)
  const [fundType, setFundType] = useState("")
  const [expenseType, setExpenseType] = useState("")
  const [responsibleOffice, setResponsibleOffice] = useState("")
  const [description, setDescription] = useState("")

  const [transferFrom, setTransferFrom] = useState<TransferLine[]>([createLine("from", 0)])
  const [transferTo, setTransferTo] = useState<TransferLine[]>([createLine("to", 0)])

  const addLine = (side: "from" | "to") => {
    if (side === "from") setTransferFrom((prev) => [...prev, createLine("from", prev.length)])
    else setTransferTo((prev) => [...prev, createLine("to", prev.length)])
  }

  const removeLine = (side: "from" | "to", lineId: string) => {
    if (side === "from") {
      setTransferFrom((prev) => (prev.length > 1 ? prev.filter((line) => line.id !== lineId) : prev))
      return
    }
    setTransferTo((prev) => (prev.length > 1 ? prev.filter((line) => line.id !== lineId) : prev))
  }

  const updateLine = (
    side: "from" | "to",
    id: string,
    patch: Partial<TransferLine>
  ) => {
    const setter = side === "from" ? setTransferFrom : setTransferTo
    setter((prev) => prev.map((line) => (line.id === id ? { ...line, ...patch } : line)))
  }

  const reset = () => {
    setEntryDate(today)
    setFundType("")
    setExpenseType("")
    setResponsibleOffice("")
    setDescription("")
    setTransferFrom([createLine("from", 0)])
    setTransferTo([createLine("to", 0)])
  }

  const handleSave = () => {
    toast.success("Realignment request saved (mock).")
    onOpenChange(false)
    reset()
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(val) => {
        if (!val) reset()
        onOpenChange(val)
      }}
    >
      <DialogContent className="max-w-[1400px] w-[95vw] p-0 gap-0 overflow-hidden" hideCloseButton>
        <DialogStickyHeader className="px-6 py-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <DialogTitle className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                Realignment
              </DialogTitle>
              <DialogDescription className="text-slate-500 dark:text-slate-400 text-base mt-1">
                Move budget allocations between AIP/account codes with full traceability.
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

        <div className="overflow-y-auto max-h-[calc(92vh-168px)] p-6 space-y-6">
          {/* TOP META FIELDS */}
          <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr_1fr_1fr_2fr] gap-4">
            <div className="space-y-2">
              <Label>Entry Date</Label>
              <Input type="date" value={entryDate} onChange={(e) => setEntryDate(e.target.value)} />
            </div>
            <div className="space-y-2">
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
            <div className="space-y-2">
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
            <div className="space-y-2">
              <Label>Responsible Office</Label>
              <Select value={responsibleOffice} onValueChange={setResponsibleOffice}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Responsible Office" />
                </SelectTrigger>
                <SelectContent>
                  {departments.map((dept) => (
                    <SelectItem key={dept} value={dept}>
                      {dept}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Description (optional)</Label>
              <Input
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter description"
              />
            </div>
          </div>

          <p className="text-sm text-slate-500 dark:text-slate-400 text-center">
            Complete the required fields above
          </p>

          {/* TRANSFER PANELS */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <TransferPanel
              title="Transfer from"
              side="from"
              lines={transferFrom}
              onAdd={() => addLine("from")}
              onRemove={(id) => removeLine("from", id)}
              onChange={updateLine}
            />
            <TransferPanel
              title="Transfer to"
              side="to"
              lines={transferTo}
              onAdd={() => addLine("to")}
              onRemove={(id) => removeLine("to", id)}
              onChange={updateLine}
            />
          </div>
        </div>

        <DialogStickyFooter className="px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
            <Info className="h-4 w-4 text-slate-400 dark:text-slate-500" />
            {transferFrom.length} transfer-from line(s) and {transferTo.length} transfer-to line(s) will be created.
          </p>
          <div className="flex items-center justify-end gap-2 w-full sm:w-auto">
            <Button variant="outline" onClick={() => onOpenChange(false)} className="w-full sm:w-auto">
              Cancel
            </Button>
            <Button onClick={handleSave} className="min-w-[140px] w-full sm:w-auto">
              Save
            </Button>
          </div>
        </DialogStickyFooter>
      </DialogContent>
    </Dialog>
  )
}

function TransferPanel({
  title,
  side,
  lines,
  onAdd,
  onRemove,
  onChange,
}: {
  title: string
  side: "from" | "to"
  lines: TransferLine[]
  onAdd: () => void
  onRemove: (id: string) => void
  onChange: (side: "from" | "to", id: string, patch: Partial<TransferLine>) => void
}) {
  return (
    <div className="rounded-2xl border border-slate-300/70 dark:border-white/[0.08] bg-[#F0F0F0]/60 dark:bg-[#12121a]/50 shadow-sm overflow-hidden">
      <div className="px-5 py-4 border-b border-slate-300/70 dark:border-white/[0.06] bg-slate-50/60 dark:bg-white/[0.03] flex items-center justify-between">
        <div className="font-semibold text-slate-900 dark:text-slate-100">{title}</div>
      </div>

      <div className="p-5 space-y-4">
        {lines.map((line, index) => {
          const remaining = getRemaining(line.accountCode)
          return (
            <div
              key={line.id}
              className="rounded-2xl border border-slate-300/70 dark:border-white/[0.08] bg-[#F0F0F0]/70 dark:bg-[#0a0a0f]/20 p-4"
            >
              <div className="flex items-center justify-between gap-3 mb-4">
                <div className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                  Line #{index + 1}
                </div>
                {lines.length > 1 ? (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 px-2 text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-500/10"
                    onClick={() => onRemove(line.id)}
                  >
                    <Trash2 className="h-4 w-4 mr-1" />
                    Remove
                  </Button>
                ) : null}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2 md:col-span-2">
                  <Label>Annual Investment Plan</Label>
                  <Select value={line.aipId} onValueChange={(val) => onChange(side, line.id, { aipId: val })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select AIP" />
                    </SelectTrigger>
                    <SelectContent>
                      {aipMainList.map((aip) => (
                        <SelectItem key={aip.id} value={aip.id}>
                          {aip.aipCode} - {aip.ppa}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Account Code</Label>
                  <Select
                    value={line.accountCode}
                    onValueChange={(val) => onChange(side, line.id, { accountCode: val })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Account Code" />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from(new Set(annualBudgetList.map((row) => row.accountCode))).map((code) => (
                        <SelectItem key={code} value={code}>
                          {code}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Sub-Account (Optional)</Label>
                  <Input
                    value={line.subAccount}
                    onChange={(e) => onChange(side, line.id, { subAccount: e.target.value })}
                    placeholder="Select / Enter sub-account"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Remaining</Label>
                  <Input
                    value={remaining === null ? "" : formatCurrency(remaining)}
                    placeholder="—"
                    readOnly
                    className="bg-slate-100/70 dark:bg-white/[0.04]"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Amount</Label>
                  <Input
                    value={line.amount}
                    onChange={(e) => onChange(side, line.id, { amount: e.target.value })}
                    placeholder="Enter an amount"
                    inputMode="decimal"
                  />
                </div>
              </div>
            </div>
          )
        })}

        <Button
          variant="outline"
          className="w-full border-dashed border-2 h-12 text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300 hover:border-slate-300 dark:hover:border-white/[0.22]"
          onClick={onAdd}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Another Line
        </Button>
      </div>
    </div>
  )
}
