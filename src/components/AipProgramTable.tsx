import React, { useState, useMemo } from "react"
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  flexRender,
  ColumnDef,
  SortingState,
} from "@tanstack/react-table"
import { 
  Search, 
  Plus, 
  Download, 
  MoreHorizontal, 
  PlusCircle, 
  Pencil, 
  Trash2,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  ArrowUpDown
} from "lucide-react"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/src/components/ui/table"
import { Button } from "@/src/components/ui/button"
import { Input } from "@/src/components/ui/input"
import { Badge } from "@/src/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/src/components/ui/tooltip"
import { formatCurrency } from "@/src/lib/utils"
import { AddAIPSubProgramModal } from "@/src/components/AddAIPSubProgramModal"
import { ProgramRowActionMenu } from "@/src/components/ProgramRowActionMenu"

// Mock Data Type
export type Program = {
  id: string
  aipCode: string
  program: string
  implementingOffice: string
  amount: number
  lep: number
  obligated: number
  fundType?: string
  expenseType?: string
  serviceType?: string
}

// Generate more mock data to demonstrate pagination and performance
const generateMockPrograms = (): Program[] => {
  const offices = ["OCM", "CEO", "CBO", "CPO", "CHO", "CSWDO"]
  const programs = [
    "EXECUTIVE MANAGEMENT",
    "Human Resource Management Support & Personnel Administration",
    "Purchase of Maintenance Supplies",
    "Payment for Water Bills",
    "Infrastructure Development Project",
    "Health Services and Medical Supplies",
    "Educational Assistance Program",
    "Disaster Risk Reduction Management",
    "Solid Waste Management Program",
    "Agricultural Support Services"
  ]
  
  return Array.from({ length: 1847 }).map((_, i) => {
    const amount = Math.floor(Math.random() * 200000000) + 1000000
    const lep = amount * (Math.random() * 0.5 + 0.5) // 50% to 100% of amount
    const obligated = lep * (Math.random() * 1.2) // 0% to 120% of lep
    
    return {
      id: `PROG-${i + 1}`,
      aipCode: `1000-000-2-01-01-${String(Math.floor(Math.random() * 999)).padStart(3, '0')}-000`,
      program: programs[Math.floor(Math.random() * programs.length)],
      implementingOffice: offices[Math.floor(Math.random() * offices.length)],
      amount,
      lep,
      obligated,
    }
  })
}

const mockPrograms = generateMockPrograms()

interface AipProgramTableProps {
  isProgramModalOpen?: boolean
  onProgramModalChange?: (open: boolean) => void
}

export function AipProgramTable({ isProgramModalOpen, onProgramModalChange }: AipProgramTableProps) {
  const [data] = useState<Program[]>(mockPrograms)
  const [sorting, setSorting] = useState<SortingState>([])
  const [globalFilter, setGlobalFilter] = useState("")
  const [officeFilter, setOfficeFilter] = useState("all")
  const [isSubProgramModalOpen, setIsSubProgramModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [selectedAipForEdit, setSelectedAipForEdit] = useState<Program | null>(null)
  
  // Mock selected AIP for the Add Program modal
  const selectedAip = {
    aipCode: "1000-000-2-01-01-000-000",
    office: "OFFICE OF THE CITY MAYOR (OCM)",
    departmentCode: "2-01-001",
    sector: "1000",
    program: "EXECUTIVE MANAGEMENT"
  }
  
  const columns = useMemo<ColumnDef<Program>[]>(
    () => [
      {
        accessorKey: "aipCode",
        header: "AIP Code",
        cell: ({ row }) => (
          <div className="font-mono text-xs text-slate-600 dark:text-slate-400 whitespace-nowrap">
            {row.original.aipCode}
          </div>
        ),
      },
      {
        accessorKey: "program",
        header: "Program / Project / Activity",
        cell: ({ row }) => (
          <div className="max-w-[300px] lg:max-w-[400px]">
            <div className="font-medium text-slate-900 dark:text-slate-100 line-clamp-2" title={row.original.program}>
              {row.original.program}
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              General Administration
            </div>
          </div>
        ),
      },
      {
        accessorKey: "implementingOffice",
        header: "Office",
        cell: ({ row }) => (
          <Badge variant="secondary" className="bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700 font-medium">
            {row.original.implementingOffice}
          </Badge>
        ),
      },
      {
        accessorKey: "amount",
        header: () => <div className="text-right">Amount</div>,
        cell: ({ row }) => (
          <div className="text-right font-mono font-medium text-slate-900 dark:text-slate-100">
            {formatCurrency(row.original.amount)}
          </div>
        ),
      },
      {
        accessorKey: "lep",
        header: () => <div className="text-right">LEP</div>,
        cell: ({ row }) => {
          const lep = row.original.lep
          const amount = row.original.amount
          const isGood = lep >= amount * 0.8
          
          return (
            <div className={`text-right font-mono font-medium ${isGood ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-700 dark:text-slate-300'}`}>
              {formatCurrency(lep)}
            </div>
          )
        },
      },
      {
        accessorKey: "obligated",
        header: () => <div className="text-right">Obligated</div>,
        cell: ({ row }) => {
          const obligated = row.original.obligated
          const lep = row.original.lep
          
          let colorClass = "text-slate-700 dark:text-slate-300"
          if (obligated > lep) colorClass = "text-red-600 dark:text-red-400"
          else if (obligated > lep * 0.8) colorClass = "text-amber-600 dark:text-amber-400"
          
          return (
            <div className={`text-right font-mono font-medium ${colorClass}`}>
              {formatCurrency(obligated)}
            </div>
          )
        },
      },
      {
        id: "actions",
        cell: ({ row }) => (
          <ProgramRowActionMenu 
            programId={row.original.id} 
            onAddSubProgram={() => setIsSubProgramModalOpen(true)}
            onEdit={(id) => {
              // Find the program data and open edit modal
              const program = data.find(p => p.id === id)
              if (program) {
                setSelectedAipForEdit(program)
                setIsEditModalOpen(true)
              }
            }}
          />
        ),
      },
    ],
    [data]
  )

  const filteredData = useMemo(() => {
    if (officeFilter === "all") return data
    return data.filter(item => item.implementingOffice === officeFilter)
  }, [data, officeFilter])

  const table = useReactTable({
    data: filteredData,
    columns,
    state: {
      sorting,
      globalFilter,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    initialState: {
      pagination: {
        pageSize: 10,
      },
    },
  })

  const uniqueOffices = useMemo(() => {
    return Array.from(new Set(data.map(item => item.implementingOffice))).sort()
  }, [data])

  return (
    <div className="flex flex-col w-full bg-white dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
      
      {/* 1. GLOBAL TABLE TOOLBAR */}
      <div className="px-4 py-3 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="text-sm text-slate-500 dark:text-slate-400">Show</span>
          <Select
            value={`${table.getState().pagination.pageSize}`}
            onValueChange={(value) => {
              table.setPageSize(Number(value))
            }}
          >
            <SelectTrigger className="h-9 w-[70px] bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800 dark:text-slate-100">
              <SelectValue placeholder={table.getState().pagination.pageSize} />
            </SelectTrigger>
            <SelectContent>
              {[10, 25, 50, 100].map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <span className="text-sm text-slate-500 dark:text-slate-400">entries</span>
        </div>

        <div className="flex-1 max-w-md relative">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400 dark:text-slate-500" />
          <Input
            placeholder="Search AIP code, program name, office..."
            value={globalFilter ?? ""}
            onChange={(e) => setGlobalFilter(e.target.value)}
            className="pl-9 h-9 bg-white dark:bg-slate-950 w-full border-slate-200 dark:border-slate-800 dark:text-slate-100 focus-visible:ring-emerald-500"
          />
        </div>

        <div className="flex items-center gap-3">
          <Select value={officeFilter} onValueChange={setOfficeFilter}>
            <SelectTrigger className="h-9 w-[140px] bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800 dark:text-slate-100">
              <SelectValue placeholder="Office" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Offices</SelectItem>
              {uniqueOffices.map(office => (
                <SelectItem key={office} value={office}>{office}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Select defaultValue="all">
            <SelectTrigger className="h-9 w-[140px] bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800 dark:text-slate-100">
              <SelectValue placeholder="Amount" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Any Amount</SelectItem>
              <SelectItem value="under-1m">Under ₱1M</SelectItem>
              <SelectItem value="1m-10m">₱1M - ₱10M</SelectItem>
              <SelectItem value="over-10m">Over ₱10M</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* 3. TABLE STRUCTURE */}
      <div className="overflow-auto max-h-[600px] relative">
        <Table>
          <TableHeader className="bg-slate-50 dark:bg-slate-900/80 sticky top-0 z-10 shadow-sm">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="hover:bg-slate-50 dark:hover:bg-slate-900/80 border-b-slate-200 dark:border-slate-800">
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className="h-11 font-semibold text-slate-700 dark:text-slate-300 whitespace-nowrap">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className="hover:bg-slate-50/80 dark:hover:bg-slate-900/80 transition-colors group cursor-pointer border-b-slate-100 dark:border-slate-800"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="py-3">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-48 text-center">
                  <div className="flex flex-col items-center justify-center text-slate-500 dark:text-slate-400">
                    <p className="mb-4">No AIP programs found</p>
                    <Button variant="outline" className="gap-2 dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-800">
                      <Plus className="h-4 w-4" />
                      Create First Program
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* 9. PAGINATION */}
      <div className="px-6 py-4 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-sm text-slate-500 dark:text-slate-400">
          Showing <span className="font-medium text-slate-900 dark:text-slate-100">{table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1}</span> to{" "}
          <span className="font-medium text-slate-900 dark:text-slate-100">
            {Math.min(
              (table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize,
              table.getFilteredRowModel().rows.length
            )}
          </span>{" "}
          of <span className="font-medium text-slate-900 dark:text-slate-100">{table.getFilteredRowModel().rows.length}</span> programs
        </div>
        
        <div className="flex items-center gap-1">
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 rounded-md dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-800"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronsLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 rounded-md dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-800"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          
          <div className="flex items-center px-2 gap-1">
            {/* Simple pagination logic for display */}
            {Array.from({ length: Math.min(5, table.getPageCount()) }).map((_, i) => {
              let pageNum = i;
              const currentPage = table.getState().pagination.pageIndex;
              const pageCount = table.getPageCount();
              
              if (pageCount > 5) {
                if (currentPage > 2 && currentPage < pageCount - 2) {
                  pageNum = currentPage - 2 + i;
                } else if (currentPage >= pageCount - 2) {
                  pageNum = pageCount - 5 + i;
                }
              }
              
              return (
                <Button
                  key={pageNum}
                  variant={currentPage === pageNum ? "default" : "ghost"}
                  size="icon"
                  className={`h-8 w-8 rounded-md ${currentPage === pageNum ? "bg-emerald-600 hover:bg-emerald-700 text-white" : "text-slate-600 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100"}`}
                  onClick={() => table.setPageIndex(pageNum)}
                >
                  {pageNum + 1}
                </Button>
              )
            })}
            
            {table.getPageCount() > 5 && table.getState().pagination.pageIndex < table.getPageCount() - 3 && (
              <>
                <span className="px-2 text-slate-400 dark:text-slate-600">...</span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 rounded-md text-slate-600 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100"
                  onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                >
                  {table.getPageCount()}
                </Button>
              </>
            )}
          </div>

          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 rounded-md dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-800"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 rounded-md dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-800"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            <ChevronsRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Modals */}
      {isProgramModalOpen !== undefined && (
        <AddAIPSubProgramModal
          open={isProgramModalOpen}
          onOpenChange={onProgramModalChange || (() => {})}
        />
      )}
      <AddAIPSubProgramModal
        open={isSubProgramModalOpen}
        onOpenChange={setIsSubProgramModalOpen}
        showRepeater={false}
        modalType="subprogram"
        selectedRow={{
          aipCode: selectedAip?.aipCode || "",
          programName: selectedAip?.program || ""
        }}
      />
      {selectedAipForEdit && (
        <AddAIPSubProgramModal
          open={isEditModalOpen}
          onOpenChange={setIsEditModalOpen}
          showRepeater={false}
          modalType="program"
          selectedRow={{
            aipCode: selectedAipForEdit.aipCode,
            programName: selectedAipForEdit.program
          }}
        />
      )}
    </div>
  )
}
