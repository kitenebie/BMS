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
import { Badge } from "@/src/components/ui/badge"
import { Input } from "@/src/components/ui/input"
import { Label } from "@/src/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/src/components/ui/select"
import { aipMainList, annualBudgetList, departments, expenseTypes, fundTypes } from "@/src/data/mockData"
import { formatCurrency } from "@/src/lib/utils"

type SupplementalEntry = {
  id: string
  aipId: string
  fundType: string
  expenseType: string
  responsibleOffice: string
  accountCode: string
  subAccount: string
  amount: string
}

function createEntry(index: number): SupplementalEntry {
  return {
    id: `supp-${Date.now()}-${index}`,
    aipId: "",
    fundType: "",
    expenseType: "",
    responsibleOffice: "",
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

export function SupplementalModal({
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
  const [description, setDescription] = useState("")
  const [entries, setEntries] = useState<SupplementalEntry[]>([createEntry(0)])

  const addEntry = () => setEntries((prev) => [...prev, createEntry(prev.length)])
  const removeEntry = (entryId: string) => {
    setEntries((prev) => (prev.length > 1 ? prev.filter((entry) => entry.id !== entryId) : prev))
  }

  const updateEntry = (id: string, patch: Partial<SupplementalEntry>) => {
    setEntries((prev) => prev.map((entry) => (entry.id === id ? { ...entry, ...patch } : entry)))
  }

  const reset = () => {
    setEntryDate(today)
    setDescription("")
    setEntries([createEntry(0)])
  }

  const handleSave = () => {
    toast.success("Supplemental request saved (mock).")
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
            <DialogTitle className="text-2xl font-bold text-slate-900 dark:text-slate-100">
              Supplemental
            </DialogTitle>
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
          <DialogDescription className="text-slate-500 dark:text-slate-400 text-base mt-1">
            Add supplemental allocations with required office and classification details.
          </DialogDescription>
        </DialogStickyHeader>

        <div className="overflow-y-auto max-h-[calc(92vh-168px)] p-6 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-4">
            <div className="space-y-2">
              <Label>Entry Date</Label>
              <Input type="date" value={entryDate} onChange={(e) => setEntryDate(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Description (optional)</Label>
              <Input value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Enter description" />
            </div>
          </div>

          <div className="space-y-4">
            {entries.map((entry, index) => {
              const remaining = getRemaining(entry.accountCode)
              return (
                <div
                  key={entry.id}
                  className="rounded-2xl border border-slate-300/70 dark:border-white/[0.08] bg-[#F0F0F0]/60 dark:bg-[#12121a]/50 shadow-sm overflow-hidden"
                >
                  <div className="px-5 py-4 border-b border-slate-300/70 dark:border-white/[0.06] bg-slate-50/60 dark:bg-white/[0.03] flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="font-medium">
                        Entry #{index + 1}
                      </Badge>
                      <div className="font-semibold text-slate-900 dark:text-slate-100">Supplemental</div>
                    </div>
                    {entries.length > 1 ? (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 px-2 text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-500/10"
                        onClick={() => removeEntry(entry.id)}
                      >
                        <Trash2 className="h-4 w-4 mr-1" />
                        Remove
                      </Button>
                    ) : null}
                  </div>

                  <div className="p-5 grid grid-cols-1 lg:grid-cols-12 gap-4">
                    <div className="space-y-2 lg:col-span-9">
                      <Label>Annual Investment Plan</Label>
                      <Select value={entry.aipId} onValueChange={(val) => updateEntry(entry.id, { aipId: val })}>
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
                    <div className="space-y-2 lg:col-span-3">
                      <Label>Remaining Allotment (AIP)</Label>
                      <Input readOnly placeholder="—" className="bg-slate-100/70 dark:bg-white/[0.04]" />
                    </div>

                    <div className="space-y-2 lg:col-span-4">
                      <Label>Fund Type</Label>
                      <Select value={entry.fundType} onValueChange={(val) => updateEntry(entry.id, { fundType: val })}>
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
                    <div className="space-y-2 lg:col-span-4">
                      <Label>Expense Type</Label>
                      <Select value={entry.expenseType} onValueChange={(val) => updateEntry(entry.id, { expenseType: val })}>
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
                    <div className="space-y-2 lg:col-span-4">
                      <Label>Responsible Office</Label>
                      <Select
                        value={entry.responsibleOffice}
                        onValueChange={(val) => updateEntry(entry.id, { responsibleOffice: val })}
                      >
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

                    <div className="space-y-2 lg:col-span-3">
                      <Label>Account Code</Label>
                      <Select value={entry.accountCode} onValueChange={(val) => updateEntry(entry.id, { accountCode: val })}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select an Account Code" />
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
                    <div className="space-y-2 lg:col-span-3">
                      <Label>Sub-Account (optional)</Label>
                      <Input
                        value={entry.subAccount}
                        onChange={(e) => updateEntry(entry.id, { subAccount: e.target.value })}
                        placeholder="Select Sub-Account"
                      />
                    </div>
                    <div className="space-y-2 lg:col-span-3">
                      <Label>Remaining Budget</Label>
                      <Input
                        readOnly
                        value={remaining === null ? "" : formatCurrency(remaining)}
                        placeholder="—"
                        className="bg-slate-100/70 dark:bg-white/[0.04]"
                      />
                    </div>
                    <div className="space-y-2 lg:col-span-3">
                      <Label>Amount</Label>
                      <Input
                        value={entry.amount}
                        onChange={(e) => updateEntry(entry.id, { amount: e.target.value })}
                        placeholder="0.00"
                        inputMode="decimal"
                        className="text-right"
                      />
                    </div>
                  </div>
                </div>
              )
            })}

            <Button
              variant="outline"
              className="w-full border-dashed border-2 h-12 text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300 hover:border-slate-300 dark:hover:border-white/[0.22]"
              onClick={addEntry}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Another Supplemental Entry
            </Button>
          </div>
        </div>

        <DialogStickyFooter className="px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
            <Info className="h-4 w-4 text-slate-400 dark:text-slate-500" />
            {entries.length} supplemental entr{entries.length === 1 ? "y" : "ies"} will be created.
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
