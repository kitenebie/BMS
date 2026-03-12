import { useState, useMemo } from "react"
import { Search, Filter, Copy, RotateCcw, X } from "lucide-react"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/src/components/ui/table"
import { Input } from "@/src/components/ui/input"
import { Button } from "@/src/components/ui/button"
import { Badge } from "@/src/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select"
import { formatCurrency } from "@/src/lib/utils"

import { RowActionMenu } from "./RowActionMenu"
import { TablePagination } from "./TablePagination"
import { DeleteAipDialog } from "./DeleteAipDialog"
import { CloneAipMainModal } from "./CloneAipMainModal"
import { RollbackAipClonesModal } from "./RollbackAipClonesModal"

// Mock Data
const aipMainRows = [
  {
    id: "AIP-001",
    aipCode: "1000-000-2-01-01-000-000",
    ppa: "OFFICE OF THE CITY MAYOR (OCM)",
    sector: "1000",
    totalAmount: 3338490490.29,
    totalLep: 875614951.9,
  },
  {
    id: "AIP-002",
    aipCode: "1000-000-2-01-02-000-000",
    ppa: "OFFICE OF THE CITY VICE-MAYOR (OCVM)",
    sector: "1000",
    totalAmount: 238901550.7,
    totalLep: 7091550.7,
  },
  {
    id: "AIP-003",
    aipCode: "1000-000-2-01-03-000-000",
    ppa: "OFFICE OF THE SANGGUNIANG PANLUNGSOD (SP) MEMBERS",
    sector: "1000",
    totalAmount: 1028770000,
    totalLep: 40226557.97,
  },
  {
    id: "AIP-004",
    aipCode: "1000-000-2-01-05-000-000",
    ppa: "OFFICE OF THE CITY TREASURER",
    sector: "1000",
    totalAmount: 43100000,
    totalLep: 34075506.7,
  },
  {
    id: "AIP-005",
    aipCode: "1000-000-2-01-06-000-000",
    ppa: "OFFICE OF THE CITY ASSESSOR",
    sector: "1000",
    totalAmount: 25367000,
    totalLep: 20543099.43,
  },
  {
    id: "AIP-006",
    aipCode: "1000-000-2-01-07-000-000",
    ppa: "OFFICE OF THE CITY ACCOUNTANT",
    sector: "1000",
    totalAmount: 10424000,
    totalLep: 8265748.48,
  },
  {
    id: "AIP-007",
    aipCode: "1000-000-2-01-08-000-000",
    ppa: "OFFICE OF THE CITY BUDGET OFFICER",
    sector: "1000",
    totalAmount: 7900000,
    totalLep: 17547909.21,
  },
  {
    id: "AIP-008",
    aipCode: "1000-000-2-01-09-000-000",
    ppa: "OFFICE OF THE CITY PLANNING AND DEVELOPMENT COORDINATOR",
    sector: "1000",
    totalAmount: 28935000,
    totalLep: 20659875.24,
  },
  {
    id: "AIP-009",
    aipCode: "1000-000-2-01-12-000-000",
    ppa: "OFFICE OF THE CITY CIVIL REGISTRAR (CCR)",
    sector: "1000",
    totalAmount: 15375000,
    totalLep: 23191278.34,
  },
  {
    id: "AIP-010",
    aipCode: "1000-000-2-01-17-000-000",
    ppa: "OFFICE OF THE CITY GENERAL SERVICES OFFICER (OCGSO)",
    sector: "1000",
    totalAmount: 8750000,
    totalLep: 19147213.86,
  },
  {
    id: "AIP-011",
    aipCode: "1000-000-2-01-18-000-000",
    ppa: "OFFICE OF THE CITY ENGINEERING",
    sector: "1000",
    totalAmount: 54100000,
    totalLep: 32100000,
  },
  {
    id: "AIP-012",
    aipCode: "1000-000-2-01-19-000-000",
    ppa: "OFFICE OF THE CITY HEALTH",
    sector: "1000",
    totalAmount: 67500000,
    totalLep: 45800000,
  },
]

export function AipMainTable() {
  const [searchQuery, setSearchQuery] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  
  // Filter state
  const [showFilters, setShowFilters] = useState(false)
  const [filterSector, setFilterSector] = useState("all")
  const [filterAmount, setFilterAmount] = useState("all")
  
  // Modals state
  const [isCloneModalOpen, setIsCloneModalOpen] = useState(false)
  const [isRollbackModalOpen, setIsRollbackModalOpen] = useState(false)
  
  // Delete dialog state
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [aipToDelete, setAipToDelete] = useState<string | null>(null)

  // Filter data based on search and filters
  const filteredData = useMemo(() => {
    let result = aipMainRows

    if (searchQuery) {
      const lowerQuery = searchQuery.toLowerCase()
      result = result.filter(
        (row) =>
          row.aipCode.toLowerCase().includes(lowerQuery) ||
          row.ppa.toLowerCase().includes(lowerQuery) ||
          row.sector.toLowerCase().includes(lowerQuery)
      )
    }

    if (filterSector !== "all") {
      result = result.filter((row) => row.sector === filterSector)
    }

    if (filterAmount !== "all") {
      result = result.filter((row) => {
        if (filterAmount === "under-10m") return row.totalAmount < 10000000
        if (filterAmount === "10m-50m") return row.totalAmount >= 10000000 && row.totalAmount <= 50000000
        if (filterAmount === "over-50m") return row.totalAmount > 50000000
        return true
      })
    }

    return result
  }, [searchQuery, filterSector, filterAmount])

  // Pagination logic
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * pageSize
    const end = start + pageSize
    return filteredData.slice(start, end)
  }, [filteredData, currentPage, pageSize])

  // Reset to page 1 when search or filters change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
    setCurrentPage(1)
  }

  const handleSectorChange = (value: string) => {
    setFilterSector(value)
    setCurrentPage(1)
  }

  const handleAmountChange = (value: string) => {
    setFilterAmount(value)
    setCurrentPage(1)
  }

  const clearFilters = () => {
    setFilterSector("all")
    setFilterAmount("all")
    setCurrentPage(1)
  }

  const handleDeleteRequest = (id: string) => {
    setAipToDelete(id)
    setIsDeleteDialogOpen(true)
  }

  // Get unique sectors for the dropdown
  const uniqueSectors = Array.from(new Set(aipMainRows.map((row) => row.sector)))

  return (
    <div className="flex flex-col w-full bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      {/* Table Header Controls */}
      <div className="p-4 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white">
        <div className="flex-1 flex items-center gap-3 transition-all min-h-[40px]">
          {!showFilters ? (
            <div className="relative w-full md:max-w-sm animate-in fade-in zoom-in-95 duration-200">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
              <Input
                type="search"
                placeholder="Search by code, PPA, or sector..."
                className="pl-9 h-10 bg-slate-50/50 border-slate-200 focus-visible:ring-green-600"
                value={searchQuery}
                onChange={handleSearchChange}
              />
            </div>
          ) : (
            <div className="flex flex-wrap items-center gap-3 w-full animate-in fade-in slide-in-from-left-2 duration-200">
              <Select value={filterSector} onValueChange={handleSectorChange}>
                <SelectTrigger className="h-10 w-[160px] bg-slate-50/50 border-slate-200">
                  <SelectValue placeholder="Sector" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Sectors</SelectItem>
                  {uniqueSectors.map((sector) => (
                    <SelectItem key={sector} value={sector}>
                      Sector {sector}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={filterAmount} onValueChange={handleAmountChange}>
                <SelectTrigger className="h-10 w-[180px] bg-slate-50/50 border-slate-200">
                  <SelectValue placeholder="Total Amount" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Any Amount</SelectItem>
                  <SelectItem value="under-10m">Under ₱10M</SelectItem>
                  <SelectItem value="10m-50m">₱10M - ₱50M</SelectItem>
                  <SelectItem value="over-50m">Over ₱50M</SelectItem>
                </SelectContent>
              </Select>

              {(filterSector !== "all" || filterAmount !== "all") && (
                <Button 
                  variant="ghost" 
                  onClick={clearFilters} 
                  className="h-10 px-3 text-slate-500 hover:text-slate-900"
                >
                  <X className="h-4 w-4 mr-2" />
                  Clear
                </Button>
              )}
            </div>
          )}
        </div>
        
        <div className="flex items-center gap-2 shrink-0">
          <Button 
            variant={showFilters ? "secondary" : "outline"} 
            size="sm" 
            className={`gap-2 h-10 px-4 transition-colors ${
              showFilters 
                ? "bg-slate-100 text-slate-900 border-transparent" 
                : "text-slate-600 border-slate-200 hover:bg-slate-50 hover:text-slate-900"
            }`}
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter className="h-4 w-4" />
            {showFilters ? "Hide Filters" : "Filters"}
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="gap-2 h-10 px-4 text-slate-600 border-slate-200 hover:bg-slate-50 hover:text-slate-900"
            onClick={() => setIsCloneModalOpen(true)}
          >
            <Copy className="h-4 w-4" />
            Clone AIP
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="gap-2 h-10 px-4 text-amber-600 border-amber-200 bg-amber-50/30 hover:bg-amber-50 hover:text-amber-700"
            onClick={() => setIsRollbackModalOpen(true)}
          >
            <RotateCcw className="h-4 w-4" />
            Rollback
          </Button>
        </div>
      </div>

      {/* Table Content */}
      <div className="overflow-x-auto">
        <Table>
          <TableHeader className="bg-slate-50/80 sticky top-0 z-10">
            <TableRow className="hover:bg-transparent border-b border-slate-200">
              <TableHead className="w-[220px] font-semibold text-slate-700 h-11">AIP Code</TableHead>
              <TableHead className="font-semibold text-slate-700 h-11">PPA / Description</TableHead>
              <TableHead className="font-semibold text-slate-700 h-11">Sector</TableHead>
              <TableHead className="text-right font-semibold text-slate-700 h-11">Total Amount</TableHead>
              <TableHead className="text-right font-semibold text-slate-700 h-11">Total LEP</TableHead>
              <TableHead className="w-[140px] text-right font-semibold text-slate-700 h-11 pr-6">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedData.length > 0 ? (
              paginatedData.map((item, index) => (
                <TableRow 
                  key={item.id} 
                  className={`group transition-colors hover:bg-slate-50/80 ${index !== paginatedData.length - 1 ? 'border-b border-slate-100' : 'border-0'}`}
                >
                  <TableCell className="font-mono text-xs font-medium text-slate-900 py-3">
                    {item.aipCode}
                  </TableCell>
                  <TableCell className="font-medium text-slate-900 py-3 max-w-[300px] truncate" title={item.ppa}>
                    {item.ppa}
                  </TableCell>
                  <TableCell className="py-3">
                    <Badge variant="secondary" className="font-normal text-xs bg-slate-100 text-slate-700 hover:bg-slate-200">
                      {item.sector}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right font-medium text-slate-900 py-3">
                    {formatCurrency(item.totalAmount)}
                  </TableCell>
                  <TableCell className="text-right text-slate-600 py-3">
                    {formatCurrency(item.totalLep)}
                  </TableCell>
                  <TableCell className="py-3 pr-4">
                    <RowActionMenu aipId={item.id} onDeleteRequest={handleDeleteRequest} />
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="h-32 text-center text-slate-500">
                  No AIP records found matching your search.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination Footer */}
      {filteredData.length > 0 && (
        <TablePagination
          totalItems={filteredData.length}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          onPageSizeChange={(size) => {
            setPageSize(size)
            setCurrentPage(1)
          }}
        />
      )}

      {/* Modals */}
      <CloneAipMainModal 
        open={isCloneModalOpen} 
        onOpenChange={setIsCloneModalOpen} 
      />
      
      <RollbackAipClonesModal 
        open={isRollbackModalOpen} 
        onOpenChange={setIsRollbackModalOpen} 
      />
      
      <DeleteAipDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        aipId={aipToDelete}
      />
    </div>
  )
}
