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
import { obligationRequests } from "@/src/data/mockData"
import { formatCurrency } from "@/src/lib/utils"
import { 
  Search, 
  Plus, 
  Filter, 
  Download, 
  MoreHorizontal,
  FileText,
  CheckCircle2,
  Clock,
  Ban,
  Send,
  Wallet
} from "lucide-react"

export function ObligationRequests() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">Obligation Requests</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Manage, approve, and track obligation requests</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="gap-2 dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-800">
            <Download className="h-4 w-4" />
            Export List
          </Button>
          <Button variant="outline" className="gap-2 dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-800">
            <FileText className="h-4 w-4" />
            Batch OBR
          </Button>
          <Button className="gap-2 dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:text-white">
            <Plus className="h-4 w-4" />
            New Request
          </Button>
        </div>
      </div>

      {/* Request Summary Strip */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <Card className="dark:border-slate-800">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Pending</p>
              <p className="text-xl font-bold text-slate-900 dark:text-slate-100 mt-1">12</p>
            </div>
            <div className="h-10 w-10 rounded-full bg-amber-100 dark:bg-amber-500/10 flex items-center justify-center text-amber-600 dark:text-amber-400">
              <Clock className="h-5 w-5" />
            </div>
          </CardContent>
        </Card>
        <Card className="dark:border-slate-800">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Approved</p>
              <p className="text-xl font-bold text-slate-900 dark:text-slate-100 mt-1">45</p>
            </div>
            <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-500/10 flex items-center justify-center text-blue-600 dark:text-blue-400">
              <CheckCircle2 className="h-5 w-5" />
            </div>
          </CardContent>
        </Card>
        <Card className="dark:border-slate-800">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Released</p>
              <p className="text-xl font-bold text-slate-900 dark:text-slate-100 mt-1">128</p>
            </div>
            <div className="h-10 w-10 rounded-full bg-indigo-100 dark:bg-indigo-500/10 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
              <Send className="h-5 w-5" />
            </div>
          </CardContent>
        </Card>
        <Card className="dark:border-slate-800">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Disbursed</p>
              <p className="text-xl font-bold text-slate-900 dark:text-slate-100 mt-1">89</p>
            </div>
            <div className="h-10 w-10 rounded-full bg-emerald-100 dark:bg-emerald-500/10 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
              <Wallet className="h-5 w-5" />
            </div>
          </CardContent>
        </Card>
        <Card className="dark:border-slate-800">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Cancelled</p>
              <p className="text-xl font-bold text-slate-900 dark:text-slate-100 mt-1">3</p>
            </div>
            <div className="h-10 w-10 rounded-full bg-red-100 dark:bg-red-500/10 flex items-center justify-center text-red-600 dark:text-red-400">
              <Ban className="h-5 w-5" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Card */}
      <Card className="dark:border-slate-800">
        <CardHeader className="border-b border-slate-100 dark:border-slate-800 pb-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-2 w-full md:max-w-md">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-500 dark:text-slate-400" />
                <Input
                  type="search"
                  placeholder="Search OBR No, Payee, or Particulars..."
                  className="pl-9 dark:bg-slate-950 dark:border-slate-800 dark:text-slate-100 dark:placeholder:text-slate-600"
                />
              </div>
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
                <TableHead className="w-[50px]"></TableHead>
                <TableHead className="w-[120px] dark:text-slate-400">Date</TableHead>
                <TableHead className="w-[150px] dark:text-slate-400">OBR No.</TableHead>
                <TableHead className="dark:text-slate-400">Payee / Particulars</TableHead>
                <TableHead className="dark:text-slate-400">Account Code</TableHead>
                <TableHead className="text-right dark:text-slate-400">Amount</TableHead>
                <TableHead className="text-center dark:text-slate-400">Status</TableHead>
                <TableHead className="w-[80px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {obligationRequests.map((item) => (
                <TableRow key={item.id} className="dark:border-slate-800 dark:hover:bg-slate-800/50">
                  <TableCell>
                    <input type="checkbox" className="rounded border-slate-300 dark:border-slate-700 dark:bg-slate-900 text-emerald-600 focus:ring-emerald-600" />
                  </TableCell>
                  <TableCell className="text-slate-600 dark:text-slate-400 text-xs">
                    {item.date}
                  </TableCell>
                  <TableCell className="font-mono text-xs font-medium text-slate-900 dark:text-slate-100">
                    {item.obrNo}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-300 font-semibold text-xs flex-shrink-0">
                        {item.payee.substring(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-slate-900 dark:text-slate-100 line-clamp-1">{item.payee}</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1">{item.particulars}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="font-mono text-xs text-slate-600 dark:text-slate-400">
                    {item.accountCode}
                  </TableCell>
                  <TableCell className="text-right font-medium dark:text-slate-100">
                    {formatCurrency(item.amount)}
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge variant={
                      item.status === 'approved' ? 'success' : 
                      item.status === 'pending' ? 'warning' : 
                      item.status === 'released' ? 'default' : 'secondary'
                    } className="capitalize">
                      {item.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center justify-end gap-2">
                      {item.pdfAvailable && (
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 dark:hover:bg-slate-800">
                          <FileText className="h-4 w-4" />
                        </Button>
                      )}
                      <Button variant="ghost" size="icon" className="h-8 w-8 dark:text-slate-400 dark:hover:text-slate-100 dark:hover:bg-slate-800">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
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


