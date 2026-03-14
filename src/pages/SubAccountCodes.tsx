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
  const columns: Array<DataTableColumn<(typeof subAccountCodes)[number]>> = [
    {
      id: "code",
      header: "Code",
      headerClassName: "w-[100px]",
      cell: (row) => <span className="font-mono font-medium text-slate-900 dark:text-white">{row.code}</span>,
    },
    {
      id: "description",
      header: "Description",
      cell: (row) => <span className="font-medium text-slate-900 dark:text-slate-200">{row.description}</span>,
    },
    {
      id: "accountCode",
      header: "Parent Account Code",
      cell: (row) => <span className="font-mono text-xs text-slate-500 dark:text-slate-400">{row.accountCode}</span>,
    },
    {
      id: "status",
      header: "Status",
      headerClassName: "w-[100px]",
      cell: (row) => (
        <Badge variant={row.status === "active" ? "success" : "secondary"} className="capitalize">
          {row.status}
        </Badge>
      ),
    },
    {
      id: "actions",
      header: "",
      headerClassName: "w-[80px]",
      cell: () => (
        <div className="flex items-center justify-end">
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
            Sub-Account Codes
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">Manage and configure sub-account classifications</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="gap-2">
            <Upload className="h-4 w-4" />
            Import
          </Button>
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
          <Button className="gap-2 bg-gradient-to-r from-[#00ff88] to-[#00cc6a] text-[#0a0a0f] font-semibold">
            <Plus className="h-4 w-4" />
            Add Code
          </Button>
        </div>
      </motion.div>

      {/* Main Content Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Card>
          <CardHeader className="border-b border-slate-300/70 dark:border-white/[0.06] pb-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="relative w-full md:max-w-md">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
                <Input
                  type="search"
                  placeholder="Search by code or description..."
                  className="pl-10"
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
              data={subAccountCodes}
              columns={columns}
              rowKey={(row) => row.id}
              emptyState={{ message: "No sub-account codes found" }}
            />
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
