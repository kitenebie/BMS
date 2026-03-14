import { motion } from "framer-motion"
import { 
  Card, 
  CardContent, 
  CardHeader, 
} from "@/src/components/ui/card"
import { Button } from "@/src/components/ui/button"
import { Input } from "@/src/components/ui/input"
import { Badge } from "@/src/components/ui/badge"
import { DataTable, type DataTableColumn } from "@/src/components/ui/data-table"
import { Checkbox } from "@/src/components/ui/checkbox"
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
  const columns: Array<DataTableColumn<(typeof obligationRequests)[number]>> = [
    {
      id: "select",
      header: "",
      headerClassName: "w-[50px]",
      cell: () => <Checkbox />,
    },
    {
      id: "date",
      header: "Date",
      headerClassName: "w-[120px]",
      cell: (row) => <span className="text-slate-500 dark:text-slate-400 text-xs">{row.date}</span>,
    },
    {
      id: "obrNo",
      header: "OBR No.",
      headerClassName: "w-[150px]",
      cell: (row) => <span className="font-mono text-xs font-medium text-slate-900 dark:text-white">{row.obrNo}</span>,
    },
    {
      id: "payee",
      header: "Payee / Particulars",
      cell: (row) => (
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-xl bg-slate-200 dark:bg-gradient-to-br dark:from-[#2a2a3a] dark:to-[#1a1a24] border border-slate-300/70 dark:border-white/[0.1] flex items-center justify-center text-slate-700 dark:text-slate-300 font-semibold text-xs flex-shrink-0">
            {row.payee.substring(0, 2).toUpperCase()}
          </div>
          <div>
            <p className="text-sm font-medium text-slate-900 dark:text-white line-clamp-1">{row.payee}</p>
            <p className="text-xs text-slate-500 line-clamp-1">{row.particulars}</p>
          </div>
        </div>
      ),
    },
    {
      id: "accountCode",
      header: "Account Code",
      cell: (row) => <span className="font-mono text-xs text-slate-500 dark:text-slate-400">{row.accountCode}</span>,
    },
    {
      id: "amount",
      header: "Amount",
      headerClassName: "text-right",
      cellClassName: "text-right",
      cell: (row) => <span className="font-medium text-slate-900 dark:text-white">{formatCurrency(row.amount)}</span>,
    },
    {
      id: "status",
      header: "Status",
      headerClassName: "text-center",
      cellClassName: "text-center",
      cell: (row) => (
        <Badge
          variant={
            row.status === "approved" ? "success" : row.status === "pending" ? "warning" : row.status === "released" ? "default" : "secondary"
          }
          className="capitalize"
        >
          {row.status}
        </Badge>
      ),
    },
    {
      id: "actions",
      header: "",
      headerClassName: "w-[80px]",
      cell: (row) => (
        <div className="flex items-center justify-end gap-2">
          {row.pdfAvailable ? (
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <FileText className="h-4 w-4" />
            </Button>
          ) : null}
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
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
            Obligation Requests
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">Manage, approve, and track obligation requests</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Export List
          </Button>
          <Button variant="outline" className="gap-2">
            <FileText className="h-4 w-4" />
            Batch OBR
          </Button>
          <Button className="gap-2 bg-gradient-to-r from-[#00ff88] to-[#00cc6a] text-[#0a0a0f] font-semibold">
            <Plus className="h-4 w-4" />
            New Request
          </Button>
        </div>
      </motion.div>

      {/* Request Summary Strip */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card>
            <CardContent className="p-4 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Pending</p>
                <p className="text-xl font-bold text-slate-900 dark:text-white mt-1">12</p>
              </div>
              <div className="h-10 w-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-500 dark:text-amber-400">
                <Clock className="h-5 w-5" />
              </div>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          <Card>
            <CardContent className="p-4 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Approved</p>
                <p className="text-xl font-bold text-slate-900 dark:text-white mt-1">45</p>
              </div>
              <div className="h-10 w-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500 dark:text-blue-400">
                <CheckCircle2 className="h-5 w-5" />
              </div>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card>
            <CardContent className="p-4 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Released</p>
                <p className="text-xl font-bold text-slate-900 dark:text-white mt-1">128</p>
              </div>
              <div className="h-10 w-10 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-500 dark:text-indigo-400">
                <Send className="h-5 w-5" />
              </div>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
        >
          <Card>
            <CardContent className="p-4 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Disbursed</p>
                <p className="text-xl font-bold text-slate-900 dark:text-white mt-1">89</p>
              </div>
              <div className="h-10 w-10 rounded-xl bg-[#00ff88]/10 flex items-center justify-center text-[#00ff88]">
                <Wallet className="h-5 w-5" />
              </div>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Card>
            <CardContent className="p-4 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Cancelled</p>
                <p className="text-xl font-bold text-slate-900 dark:text-white mt-1">3</p>
              </div>
              <div className="h-10 w-10 rounded-xl bg-red-500/10 flex items-center justify-center text-red-500 dark:text-red-400">
                <Ban className="h-5 w-5" />
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Main Content Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.35 }}
      >
        <Card>
          <CardHeader className="border-b border-slate-300/70 dark:border-white/[0.06] pb-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-2 w-full md:max-w-md">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
                  <Input
                    type="search"
                    placeholder="Search OBR No, Payee, or Particulars..."
                    className="pl-10"
                  />
                </div>
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
            data={obligationRequests}
            columns={columns}
            rowKey={(row) => row.id}
            emptyState={{ message: "No obligation requests found" }}
          />
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
