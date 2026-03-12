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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/src/components/ui/select"
import { annualBudgetList, aipMainList, fundTypes, expenseTypes, departments, accountScopes } from "@/src/data/mockData"
import { formatCurrency } from "@/src/lib/utils"
import { 
  Search, 
  Plus, 
  Filter, 
  MoreHorizontal,
  ArrowRightLeft,
  FilePlus,
  RefreshCcw,
  FileBarChart,
  AlertCircle
} from "lucide-react"

export function AnnualBudget() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const totalBudget = annualBudgetList.reduce((acc, curr) => acc + curr.annualBudget, 0)
  const totalObligated = annualBudgetList.reduce((acc, curr) => acc + curr.obligated, 0)
  const remaining = annualBudgetList.reduce((acc, curr) => acc + curr.remaining, 0)
  const overObligatedCount = annualBudgetList.filter(b => b.status === 'over-obligated').length

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Annual Budget</h1>
          <p className="text-slate-500 mt-1">Manage budget allocations and track obligations</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Button variant="outline" className="gap-2">
            <ArrowRightLeft className="h-4 w-4" />
            Realignment
          </Button>
          <Button variant="outline" className="gap-2">
            <FilePlus className="h-4 w-4" />
            Supplemental
          </Button>
          <Button variant="outline" className="gap-2">
            <RefreshCcw className="h-4 w-4" />
            Continuing Appr.
          </Button>
          <Button variant="outline" className="gap-2">
            <FileBarChart className="h-4 w-4" />
            Reports
          </Button>
          <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Add Account Code
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl">
              <DialogHeader>
                <DialogTitle>Add Account Code</DialogTitle>
                <DialogDescription>
                  Map a new budget account code to an existing AIP.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-6 py-4">
                {/* AIP and Type Selection */}
                <Card>
                  <CardHeader className="pb-3 border-b border-slate-100">
                    <h3 className="font-semibold text-sm">1. AIP and Type Selection</h3>
                  </CardHeader>
                  <CardContent className="pt-4 grid gap-4 md:grid-cols-2">
                    <div className="space-y-2 md:col-span-2">
                      <Label>Annual Investment Plan</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select AIP" />
                        </SelectTrigger>
                        <SelectContent>
                          {aipMainList.map(a => <SelectItem key={a.id} value={a.id}>{a.aipCode} - {a.ppa}</SelectItem>)}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Fund Type</Label>
                      <Select>
                        <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                        <SelectContent>
                          {fundTypes.map(f => <SelectItem key={f} value={f}>{f}</SelectItem>)}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Expense Type</Label>
                      <Select>
                        <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                        <SelectContent>
                          {expenseTypes.map(e => <SelectItem key={e} value={e}>{e}</SelectItem>)}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="md:col-span-2 mt-2 p-3 bg-slate-50 border border-slate-200 rounded-md flex items-center justify-between">
                      <span className="text-sm font-medium text-slate-600">Remaining Allotment</span>
                      <span className="text-lg font-bold text-slate-900">₱ 0.00</span>
                    </div>
                  </CardContent>
                </Card>

                {/* Budget Mapping */}
                <Card>
                  <CardHeader className="pb-3 border-b border-slate-100">
                    <h3 className="font-semibold text-sm">2. Budget Mapping</h3>
                  </CardHeader>
                  <CardContent className="pt-4 grid gap-4 md:grid-cols-2">
                    <div className="space-y-2 md:col-span-2">
                      <Label>Department</Label>
                      <Select>
                        <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                        <SelectContent>
                          {departments.map(d => <SelectItem key={d} value={d}>{d}</SelectItem>)}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Account Code</Label>
                      <Input placeholder="e.g. 5-02-01-010" className="font-mono" />
                    </div>
                    <div className="space-y-2">
                      <Label>Account Scope</Label>
                      <Select>
                        <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                        <SelectContent>
                          {accountScopes.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label>Budget Amount (₱)</Label>
                      <div className="relative">
                        <span className="absolute left-3 top-2.5 text-slate-500">₱</span>
                        <Input type="number" placeholder="0.00" className="pl-8 text-lg font-medium" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              <DialogFooter className="items-center justify-between sm:justify-between">
                <div className="flex items-center text-amber-600 text-sm gap-1.5">
                  <AlertCircle className="h-4 w-4" />
                  <span>Please verify remaining allotment before saving.</span>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" onClick={() => setIsModalOpen(false)}>Cancel</Button>
                  <Button onClick={() => setIsModalOpen(false)}>Save Account Code</Button>
                </div>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Summary Badges */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4 flex flex-col justify-center">
            <p className="text-sm font-medium text-slate-500">Total Budget</p>
            <p className="text-xl font-bold text-slate-900 mt-1">
              {formatCurrency(totalBudget)}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex flex-col justify-center">
            <p className="text-sm font-medium text-slate-500">Total Obligated</p>
            <p className="text-xl font-bold text-slate-900 mt-1">
              {formatCurrency(totalObligated)}
            </p>
          </CardContent>
        </Card>
        <Card className={remaining < 0 ? "border-red-200 bg-red-50" : ""}>
          <CardContent className="p-4 flex flex-col justify-center">
            <p className={`text-sm font-medium ${remaining < 0 ? "text-red-600" : "text-slate-500"}`}>Remaining</p>
            <p className={`text-xl font-bold mt-1 ${remaining < 0 ? "text-red-700" : "text-slate-900"}`}>
              {formatCurrency(remaining)}
            </p>
          </CardContent>
        </Card>
        <Card className={overObligatedCount > 0 ? "border-amber-200 bg-amber-50" : ""}>
          <CardContent className="p-4 flex flex-col justify-center">
            <p className={`text-sm font-medium ${overObligatedCount > 0 ? "text-amber-600" : "text-slate-500"}`}>Over-obligated Items</p>
            <p className={`text-xl font-bold mt-1 ${overObligatedCount > 0 ? "text-amber-700" : "text-slate-900"}`}>
              {overObligatedCount}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex flex-col justify-center">
            <p className="text-sm font-medium text-slate-500">Fund Types</p>
            <p className="text-xl font-bold text-slate-900 mt-1">
              3 Active
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Card */}
      <Card>
        <CardHeader className="border-b border-slate-100 pb-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="relative w-full md:max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-500" />
              <Input
                type="search"
                placeholder="Search by code, PPA, or department..."
                className="pl-9"
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
          <Table>
            <TableHeader className="bg-slate-50">
              <TableRow>
                <TableHead className="w-[150px]">Account Code</TableHead>
                <TableHead>PPA / Description</TableHead>
                <TableHead>Department</TableHead>
                <TableHead className="text-right">Annual Budget</TableHead>
                <TableHead className="text-right">Obligated</TableHead>
                <TableHead className="text-right">Remaining</TableHead>
                <TableHead className="w-[80px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {annualBudgetList.map((item) => (
                <TableRow key={item.id} className={item.status === 'over-obligated' ? 'bg-red-50/50 hover:bg-red-50' : ''}>
                  <TableCell className="font-mono text-xs font-medium text-slate-900">
                    {item.accountCode}
                  </TableCell>
                  <TableCell className="font-medium text-slate-900">
                    {item.ppa}
                    <div className="text-xs font-normal text-slate-500 mt-0.5">
                      {item.fundType} • {item.expenseType}
                    </div>
                  </TableCell>
                  <TableCell className="text-slate-600 text-xs">
                    {item.department}
                  </TableCell>
                  <TableCell className="text-right font-medium">
                    {formatCurrency(item.annualBudget)}
                  </TableCell>
                  <TableCell className="text-right text-slate-600">
                    {formatCurrency(item.obligated)}
                  </TableCell>
                  <TableCell className={`text-right font-medium ${item.remaining < 0 ? 'text-red-600' : 'text-green-600'}`}>
                    {formatCurrency(item.remaining)}
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
