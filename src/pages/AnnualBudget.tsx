import { useState, useEffect } from "react"
import { Trash2 } from "lucide-react"
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

  const totalBudget = annualBudgetList.reduce((acc, curr) => acc + curr.annualBudget, 0)
  const totalObligated = annualBudgetList.reduce((acc, curr) => acc + curr.obligated, 0)
  const remaining = annualBudgetList.reduce((acc, curr) => acc + curr.remaining, 0)
  const overObligatedCount = annualBudgetList.filter(b => b.status === 'over-obligated').length

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">Annual Budget</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Manage budget allocations and track obligations</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Button variant="outline" className="gap-2 bg-emerald-100 hover:bg-emerald-200 hover:text-emerald-600 text-emerald-700 border border-emerald-300 dark:bg-emerald-500/10 dark:hover:bg-emerald-500/20 dark:text-emerald-400 dark:border-emerald-500/50">
            <ArrowRightLeft className="h-4 w-4" />
            Realignment
          </Button>
          <Button variant="outline" className="gap-2 bg-orange-100 hover:bg-orange-200 hover:text-orange-600 text-orange-700 border border-orange-300 dark:bg-orange-500/10 dark:hover:bg-orange-500/20 dark:text-orange-400 dark:border-orange-500/50">
            <FilePlus className="h-4 w-4" />
            Supplemental
          </Button>
          <Button variant="outline" className="gap-2 bg-blue-100 hover:bg-blue-200 hover:text-blue-600 text-blue-700 border border-blue-300 dark:bg-blue-500/10 dark:hover:bg-blue-500/20 dark:text-blue-400 dark:border-blue-500/50">
            <RefreshCcw className="h-4 w-4" />
            Continuing Appr.
          </Button>
          <Button variant="outline" className="gap-2 bg-purple-100 hover:bg-purple-200 hover:text-purple-600 text-purple-700 border border-purple-300 dark:bg-purple-500/10 dark:hover:bg-purple-500/20 dark:text-purple-400 dark:border-purple-500/50">
            <FileBarChart className="h-4 w-4" />
            Reports
          </Button>
          <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2 dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:text-white">
                <Plus className="h-4 w-4" />
                Add Account Code
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-[80%] max-h-[90vh] dark:bg-slate-950 dark:border-slate-800">
              <DialogHeader className="border-b-2 pb-2 border-slate-200 dark:border-slate-800">
                <DialogTitle className="dark:text-slate-100">Add Account Code</DialogTitle>
                <DialogDescription className="dark:text-slate-400">
                  Map a new budget account code to an existing AIP.
                </DialogDescription>
              </DialogHeader>
               <div className="flex grid gap-4 grid-cols-3 py-2 w-full h-full overflow-y-auto">
                 {/* AIP and Type Selection */}
                 <Card className="h-full dark:border-slate-800">
                   <CardHeader className="pb-3 border-b border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900">
                     <h3 className="font-semibold text-sm dark:text-slate-100">1. AIP and Type Selection</h3>
                   </CardHeader>
                   <CardContent className="pt-4 space-y-6">
                     <div className="space-y-2">
                       <Label className="dark:text-slate-300">Annual Investment Plan</Label>
                       <Select>
                         <SelectTrigger className="dark:bg-slate-950 dark:border-slate-800 dark:text-slate-100">
                           <SelectValue placeholder="Select AIP" />
                         </SelectTrigger>
                         <SelectContent className="dark:bg-slate-950 dark:border-slate-800">
                           {aipMainList.map(a => <SelectItem key={a.id} value={a.id} className="dark:focus:bg-slate-800 dark:focus:text-slate-100">{a.aipCode} - {a.ppa}</SelectItem>)}
                         </SelectContent>
                       </Select>
                     </div>
                     <div className="space-y-2">
                       <Label className="dark:text-slate-300">Fund Type</Label>
                       <Select>
                         <SelectTrigger className="dark:bg-slate-950 dark:border-slate-800 dark:text-slate-100"><SelectValue placeholder="Select" /></SelectTrigger>
                         <SelectContent className="dark:bg-slate-950 dark:border-slate-800">
                           {fundTypes.map(f => <SelectItem key={f} value={f} className="dark:focus:bg-slate-800 dark:focus:text-slate-100">{f}</SelectItem>)}
                         </SelectContent>
                       </Select>
                     </div>
                     <div className="space-y-2">
                       <Label className="dark:text-slate-300">Expense Type</Label>
                       <Select>
                         <SelectTrigger className="dark:bg-slate-950 dark:border-slate-800 dark:text-slate-100"><SelectValue placeholder="Select" /></SelectTrigger>
                         <SelectContent className="dark:bg-slate-950 dark:border-slate-800">
                           {expenseTypes.map(e => <SelectItem key={e} value={e} className="dark:focus:bg-slate-800 dark:focus:text-slate-100">{e}</SelectItem>)}
                         </SelectContent>
                       </Select>
                     </div>
                     <div className="mt-2 p-3 bg-orange-50 dark:bg-orange-500/10 border border-orange-500 dark:border-orange-500/50 rounded-md flex items-center justify-between">
                       <span className="text-sm font-medium text-orange-600 dark:text-orange-400">Remaining Allotment</span>
                       <span className="text-lg font-bold text-orange-600 dark:text-orange-400">₱ 0.00</span>
                     </div>
                   </CardContent>
                 </Card>
                 
                  {/* Budget Mapping */}
                  <Card className="h-full col-span-2 dark:border-slate-800">
                    <CardHeader className="pb-3 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900">
                      <h3 className="font-semibold text-sm dark:text-slate-100">2. Budget Mapping</h3>
                      {/* Add Another Budget Mapping button in first row, second column */}
                        <div className="flex items-center justify-center">
                          <Button variant="outline" className="bg-emerald-100 hover:bg-emerald-200 text-emerald-700 border border-emerald-300 dark:bg-emerald-500/10 dark:hover:bg-emerald-500/20 dark:text-emerald-400 dark:border-emerald-500/50 w-full" onClick={addBudgetMapping}>
                            <Plus className="mr-2 h-4 w-4" />
                            Add Another Budget Mapping
                          </Button>
                        </div>
                    </CardHeader>
                    <CardContent className="pt-4">
                      <div className="grid gap-4 grid-cols-2 max-h-[500px] overflow-y-auto">
                        {/* First row: Budget Mapping 1 in col 1, Add button in col 2 */}
                        <div className="border rounded-lg border-slate-300 dark:border-slate-800">
                          <div className="flex items-center p-4 justify-between mb-2 pb-3 border-b border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900">
                            <h4 className="font-semibold text-sm dark:text-slate-100">Budget Mapping 1</h4>
                            {budgetMappings.length > 1 && (
                              <Button variant="ghost" size="icon" onClick={() => removeBudgetMapping(0)} className="hover:bg-slate-200 dark:hover:bg-slate-800">
                                <Trash2 className="h-6 w-6 text-red-500 dark:text-red-400" />
                              </Button>
                            )}
                          </div>
                          <div className="grid gap-4 px-4 pb-4">
                            <div className="space-y-2">
                              <Label className="dark:text-slate-300">Department</Label>
                              <Select
                                value={budgetMappings[0]?.department ?? ''}
                                onValueChange={(value) => handleBudgetMappingChange(0, 'department', value ?? '')}
                              >
                                <SelectTrigger className="dark:bg-slate-950 dark:border-slate-800 dark:text-slate-100">
                                  <SelectValue placeholder="Select Department" />
                                </SelectTrigger>
                                <SelectContent className="dark:bg-slate-950 dark:border-slate-800">
                                  {departments.map(d => <SelectItem key={d} value={d} className="dark:focus:bg-slate-800 dark:focus:text-slate-100">{d}</SelectItem>)}
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="space-y-2">
                              <Label className="dark:text-slate-300">Account Code</Label>
                              <Input
                                value={budgetMappings[0]?.accountCode ?? ''}
                                onChange={(e) => handleBudgetMappingChange(0, 'accountCode', e.target.value)}
                                placeholder="e.g. 5-02-01-010"
                                className="font-mono dark:bg-slate-950 dark:border-slate-800 dark:text-slate-100 dark:placeholder:text-slate-600"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label className="dark:text-slate-300">Account Scope</Label>
                              <Select
                                value={budgetMappings[0]?.accountScope ?? ''}
                                onValueChange={(value) => handleBudgetMappingChange(0, 'accountScope', value ?? '')}
                              >
                                <SelectTrigger className="dark:bg-slate-950 dark:border-slate-800 dark:text-slate-100">
                                  <SelectValue placeholder="Select Scope" />
                                </SelectTrigger>
                                <SelectContent className="dark:bg-slate-950 dark:border-slate-800">
                                  {accountScopes.map(s => <SelectItem key={s} value={s} className="dark:focus:bg-slate-800 dark:focus:text-slate-100">{s}</SelectItem>)}
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="space-y-2">
                              <Label className="dark:text-slate-300">Budget Amount (₱)</Label>
                              <div className="relative">
                                <span className="absolute left-3 top-2.5 text-slate-500 dark:text-slate-400">₱</span>
                                <Input
                                  type="number"
                                  value={budgetMappings[0]?.budgetAmount ?? ''}
                                  onChange={(e) => handleBudgetMappingChange(0, 'budgetAmount', e.target.value)}
                                  placeholder="0.00"
                                  className="pl-8 text-lg font-medium dark:bg-slate-950 dark:border-slate-800 dark:text-slate-100 dark:placeholder:text-slate-600"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        
                        {/* Additional budget mappings starting from index 1 */}
                        {budgetMappings.slice(1).map((mapping, index) => {
                          const actualIndex = index + 1; // Actual index in budgetMappings array
                          return (
                            <div key={actualIndex} className="border rounded-lg border-slate-300 dark:border-slate-800">
                              <div className="flex items-center p-4 border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900 justify-between mb-2">
                                <h4 className="font-semibold text-sm dark:text-slate-100">Budget Mapping {actualIndex + 1}</h4>
                                {budgetMappings.length > 1 && (
                                  <Button variant="ghost" size="icon" onClick={() => removeBudgetMapping(actualIndex)} className="hover:bg-slate-200 dark:hover:bg-slate-800">
                                    <Trash2 className="h-6 w-6 text-red-500 dark:text-red-400" />
                                  </Button>
                                )}
                              </div>
                              <div className="grid gap-4 px-4 pb-4">
                                <div className="space-y-2">
                                  <Label className="dark:text-slate-300">Department</Label>
                                  <Select
                                    value={mapping.department}
                                    onValueChange={(value) => handleBudgetMappingChange(actualIndex, 'department', value ?? '')}
                                  >
                                    <SelectTrigger className="dark:bg-slate-950 dark:border-slate-800 dark:text-slate-100">
                                      <SelectValue placeholder="Select Department" />
                                    </SelectTrigger>
                                    <SelectContent className="dark:bg-slate-950 dark:border-slate-800">
                                      {departments.map(d => <SelectItem key={d} value={d} className="dark:focus:bg-slate-800 dark:focus:text-slate-100">{d}</SelectItem>)}
                                    </SelectContent>
                                  </Select>
                                </div>
                                <div className="space-y-2">
                                  <Label className="dark:text-slate-300">Account Code</Label>
                                  <Input
                                    value={mapping.accountCode}
                                    onChange={(e) => handleBudgetMappingChange(actualIndex, 'accountCode', e.target.value)}
                                    placeholder="e.g. 5-02-01-010"
                                    className="font-mono dark:bg-slate-950 dark:border-slate-800 dark:text-slate-100 dark:placeholder:text-slate-600"
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label className="dark:text-slate-300">Account Scope</Label>
                                  <Select
                                    value={mapping.accountScope}
                                    onValueChange={(value) => handleBudgetMappingChange(actualIndex, 'accountScope', value ?? '')}
                                  >
                                    <SelectTrigger className="dark:bg-slate-950 dark:border-slate-800 dark:text-slate-100">
                                      <SelectValue placeholder="Select Scope" />
                                    </SelectTrigger>
                                    <SelectContent className="dark:bg-slate-950 dark:border-slate-800">
                                      {accountScopes.map(s => <SelectItem key={s} value={s} className="dark:focus:bg-slate-800 dark:focus:text-slate-100">{s}</SelectItem>)}
                                    </SelectContent>
                                  </Select>
                                </div>
                                <div className="space-y-2">
                                  <Label className="dark:text-slate-300">Budget Amount (₱)</Label>
                                  <div className="relative">
                                    <span className="absolute left-3 top-2.5 text-slate-500 dark:text-slate-400">₱</span>
                                    <Input
                                      type="number"
                                      value={mapping.budgetAmount}
                                      onChange={(e) => handleBudgetMappingChange(actualIndex, 'budgetAmount', e.target.value)}
                                      placeholder="0.00"
                                      className="pl-8 text-lg font-medium dark:bg-slate-950 dark:border-slate-800 dark:text-slate-100 dark:placeholder:text-slate-600"
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </CardContent>
                  </Card>
               </div>
              <DialogFooter className="items-center mt-2 border-t-2 p-2 border-slate-200 dark:border-slate-800 justify-between sm:justify-between">
                <div className="flex items-center text-amber-600 dark:text-amber-500 text-sm gap-1.5">
                  <AlertCircle className="h-4 w-4" />
                  <span>Please verify remaining allotment before saving.</span>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" onClick={() => setIsModalOpen(false)} className="dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-800">Cancel</Button>
                  <Button onClick={() => setIsModalOpen(false)} className="dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:text-white">Save Account Code</Button>
                </div>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Main Content Card */}
      <Card className="dark:border-slate-800">
        <CardHeader className="border-b border-slate-100 dark:border-slate-800 pb-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="relative w-full md:max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-500 dark:text-slate-400" />
              <Input
                type="search"
                placeholder="Search by code, PPA, or department..."
                className="pl-9 dark:bg-slate-950 dark:border-slate-800 dark:text-slate-100 dark:placeholder:text-slate-600"
              />
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="gap-2 dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-800">
                <Filter className="h-4 w-4" />
                Filters
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-slate-50 dark:bg-slate-900/50">
              <TableRow className="dark:border-slate-800">
                <TableHead className="w-[150px] dark:text-slate-400">Account Code</TableHead>
                <TableHead className="dark:text-slate-400">PPA / Description</TableHead>
                <TableHead className="dark:text-slate-400">Department</TableHead>
                <TableHead className="text-right dark:text-slate-400">Annual Budget</TableHead>
                <TableHead className="text-right dark:text-slate-400">Obligated</TableHead>
                <TableHead className="text-right dark:text-slate-400">Remaining</TableHead>
                <TableHead className="w-[80px] dark:text-slate-400"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {annualBudgetList.map((item) => (
                <TableRow key={item.id} className={`${item.status === 'over-obligated' ? 'bg-red-50/50 hover:bg-red-50 dark:bg-red-950/20 dark:hover:bg-red-950/30' : ''} dark:border-slate-800 dark:hover:bg-slate-800/50`}>
                  <TableCell className="font-mono text-xs font-medium text-slate-900 dark:text-slate-100">
                    {item.accountCode}
                  </TableCell>
                  <TableCell className="font-medium text-slate-900 dark:text-slate-100">
                    {item.ppa}
                    <div className="text-xs font-normal text-slate-500 dark:text-slate-400 mt-0.5">
                      {item.fundType} • {item.expenseType}
                    </div>
                  </TableCell>
                  <TableCell className="text-slate-600 dark:text-slate-400 text-xs">
                    {item.department}
                  </TableCell>
                  <TableCell className="text-right font-medium dark:text-slate-100">
                    {formatCurrency(item.annualBudget)}
                  </TableCell>
                  <TableCell className="text-right text-slate-600 dark:text-slate-400">
                    {formatCurrency(item.obligated)}
                  </TableCell>
                  <TableCell className={`text-right font-medium ${item.remaining < 0 ? 'text-red-600 dark:text-red-400' : 'text-emerald-600 dark:text-emerald-400'}`}>
                    {formatCurrency(item.remaining)}
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="icon" className="h-8 w-8 dark:text-slate-400 dark:hover:text-slate-100 dark:hover:bg-slate-800">
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
