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
import { subAccountCodes } from "@/src/data/mockData"
import { 
  Search, 
  Plus, 
  Filter, 
  Download, 
  Upload,
  MoreHorizontal
} from "lucide-react"

export function SubAccountCodes() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">Sub-Account Codes</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Manage and configure sub-account classifications</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="gap-2 dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-800">
            <Upload className="h-4 w-4" />
            Import
          </Button>
          <Button variant="outline" className="gap-2 dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-800">
            <Download className="h-4 w-4" />
            Export
          </Button>
          <Button className="gap-2 dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:text-white">
            <Plus className="h-4 w-4" />
            Add Code
          </Button>
        </div>
      </div>

      {/* Main Content Card */}
      <Card className="dark:border-slate-800">
        <CardHeader className="border-b border-slate-100 dark:border-slate-800 pb-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="relative w-full md:max-w-md">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-500 dark:text-slate-400" />
              <Input
                type="search"
                placeholder="Search by code or description..."
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
                <TableHead className="w-[100px] dark:text-slate-400">Code</TableHead>
                <TableHead className="dark:text-slate-400">Description</TableHead>
                <TableHead className="dark:text-slate-400">Parent Account Code</TableHead>
                <TableHead className="w-[100px] dark:text-slate-400">Status</TableHead>
                <TableHead className="w-[80px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {subAccountCodes.map((item) => (
                <TableRow key={item.id} className="dark:border-slate-800 dark:hover:bg-slate-800/50">
                  <TableCell className="font-mono font-medium text-slate-900 dark:text-slate-100">
                    {item.code}
                  </TableCell>
                  <TableCell className="font-medium text-slate-900 dark:text-slate-100">
                    {item.description}
                  </TableCell>
                  <TableCell className="font-mono text-xs text-slate-600 dark:text-slate-400">
                    {item.accountCode}
                  </TableCell>
                  <TableCell>
                    <Badge variant={item.status === 'active' ? 'success' : 'secondary'} className="capitalize">
                      {item.status}
                    </Badge>
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
