import * as React from "react"
import { cn } from "@/src/lib/utils"
import { ChevronUp, ChevronDown } from "lucide-react"

// Table Container
const Table = React.forwardRef<HTMLTableElement, React.HTMLAttributes<HTMLTableElement>>(
  ({ className, ...props }, ref) => (
    <div className="relative w-full overflow-hidden rounded-2xl border border-slate-300/70 dark:border-white/[0.08] bg-[#F0F0F0]/70 dark:bg-[#12121a]/50 backdrop-blur-xl">
      <div className="overflow-auto max-h-[600px] scrollbar-thin scrollbar-thumb-slate-300/70 dark:scrollbar-thumb-white/[0.1] scrollbar-track-transparent">
        <table ref={ref} className={cn("w-full caption-bottom text-sm", className)} {...props} />
      </div>
    </div>
  )
)
Table.displayName = "Table"

// Table Header with sticky positioning and sort indicators
const TableHeader = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(
  ({ className, ...props }, ref) => (
    <thead 
      ref={ref} 
      className={cn(
        "sticky top-0 z-20 bg-gradient-to-b from-[#F0F0F0] via-slate-50 to-slate-100 dark:from-[#1a1a28] dark:via-[#15151f] dark:to-[#12121a] backdrop-blur-xl",
        "[&_tr]:border-b [&_tr]:border-slate-300/70 dark:[&_tr]:border-white/[0.06]",
        className
      )} 
      {...props} 
    />
  )
)
TableHeader.displayName = "TableHeader"

// Table Body
const TableBody = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(
  ({ className, ...props }, ref) => (
    <tbody ref={ref} className={cn("[&_tr:last-child]:border-0", className)} {...props} />
  )
)
TableBody.displayName = "TableBody"

// Table Row with enhanced hover states
const TableRow = React.forwardRef<HTMLTableRowElement, React.HTMLAttributes<HTMLTableRowElement>>(
  ({ className, ...props }, ref) => (
    <tr 
      ref={ref} 
      className={cn(
        "border-b border-slate-300/70 dark:border-white/[0.04] transition-all duration-200",
        "hover:bg-gradient-to-r hover:from-[#00ff88]/5 hover:to-transparent hover:border-l-2 hover:border-l-[#00ff88]",
        "data-[state=selected]:bg-[#00ff88]/10 data-[state=selected]:border-l-2 data-[state=selected]:border-l-[#00ff88]",
        className
      )} 
      {...props} 
    />
  )
)
TableRow.displayName = "TableRow"

// Table Head with sortable indicators
interface TableHeadProps extends React.ThHTMLAttributes<HTMLTableCellElement> {
  sortable?: boolean
  sortDirection?: "asc" | "desc" | null
  onSort?: () => void
}

const TableHead = React.forwardRef<HTMLTableCellElement, TableHeadProps>(
  ({ className, sortable, sortDirection, onSort, children, ...props }, ref) => (
    <th 
      ref={ref} 
      className={cn(
        "h-14 px-5 text-left align-middle font-bold text-xs uppercase tracking-widest text-slate-600 dark:text-slate-400",
        "border-b border-slate-300/70 dark:border-white/[0.08] bg-transparent",
        "transition-colors duration-150",
        sortable && "cursor-pointer select-none hover:text-[#00ff88] hover:bg-slate-50 dark:hover:bg-white/[0.02]",
        "[&:has([role=checkbox])]:pr-0",
        className
      )}
      onClick={sortable ? onSort : undefined}
      {...props}
    >
      <div className="flex items-center gap-2">
        <span>{children}</span>
        {sortable && (
          <span className="flex flex-col">
            <ChevronUp 
              size={12} 
              className={cn(
                "-mb-1",
                sortDirection === "asc" ? "text-[#00ff88]" : "text-slate-300 dark:text-slate-600"
              )} 
            />
            <ChevronDown 
              size={12} 
              className={cn(
                "-mt-1",
                sortDirection === "desc" ? "text-[#00ff88]" : "text-slate-300 dark:text-slate-600"
              )} 
            />
          </span>
        )}
      </div>
    </th>
  )
)
TableHead.displayName = "TableHead"

// Table Cell with enhanced styling
const TableCell = React.forwardRef<HTMLTableCellElement, React.TdHTMLAttributes<HTMLTableCellElement>>(
  ({ className, ...props }, ref) => (
    <td 
      ref={ref} 
      className={cn(
        "p-4 align-middle text-slate-800 dark:text-slate-300 text-sm",
        "[&:has([role=checkbox])]:pr-0",
        className
      )} 
      {...props} 
    />
  )
)
TableCell.displayName = "TableCell"

// Table Caption
const TableCaption = React.forwardRef<HTMLTableCaptionElement, React.HTMLAttributes<HTMLTableCaptionElement>>(
  ({ className, ...props }, ref) => (
    <caption 
      ref={ref} 
      className={cn(
        "mt-4 text-sm text-slate-500 border-t border-slate-300/70 dark:border-white/[0.06] pt-4 px-4",
        className
      )} 
      {...props} 
    />
  )
)
TableCaption.displayName = "TableCaption"

// Table Footer with pagination and summary
interface TableFooterProps extends React.HTMLAttributes<HTMLTableSectionElement> {
  showPagination?: boolean
  currentPage?: number
  totalPages?: number
  totalItems?: number
  pageSize?: number
  onPageChange?: (page: number) => void
  onPageSizeChange?: (size: number) => void
}

const TableFooter = React.forwardRef<HTMLTableSectionElement, TableFooterProps>(
  ({ className, showPagination, currentPage, totalPages, totalItems, pageSize, onPageChange, onPageSizeChange, children, ...props }, ref) => (
    <tfoot
      ref={ref}
      className={cn(
        "border-t border-slate-300/70 dark:border-white/[0.08] bg-gradient-to-b from-[#F0F0F0] via-slate-50 to-slate-100 dark:from-[#12121a]/80 dark:to-[#0a0a0f]/90 backdrop-blur-xl",
        className
      )}
      {...props}
    >
      <tr>
        <td colSpan={100} className="px-5 py-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Summary Info */}
            <div className="flex items-center gap-4 text-sm text-slate-600 dark:text-slate-400">
              {totalItems !== undefined && (
                <span>
                  Showing{" "}
                  <span className="text-slate-900 dark:text-white font-medium">
                    {((currentPage || 1) - 1) * (pageSize || 10) + 1}
                  </span>{" "}
                  to{" "}
                  <span className="text-slate-900 dark:text-white font-medium">
                    {Math.min((currentPage || 1) * (pageSize || 10), totalItems)}
                  </span>{" "}
                  of <span className="text-slate-900 dark:text-white font-medium">{totalItems}</span> entries
                </span>
              )}
            </div>
            
            {/* Pagination Controls */}
            {showPagination && (
              <div className="flex items-center gap-2">
                <span className="text-sm text-slate-600 dark:text-slate-400 mr-2">
                  Page <span className="text-slate-900 dark:text-white font-medium">{currentPage}</span> of{" "}
                  <span className="text-slate-900 dark:text-white font-medium">{totalPages}</span>
                </span>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => onPageChange?.(1)}
                    disabled={currentPage === 1}
                    className="p-2 rounded-lg text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/[0.06] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                    aria-label="First page"
                  >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M11 4L7 8L11 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M13 4L9 8L13 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                  <button
                    onClick={() => onPageChange?.((currentPage || 1) - 1)}
                    disabled={currentPage === 1}
                    className="p-2 rounded-lg text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/[0.06] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                    aria-label="Previous page"
                  >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M10 4L6 8L10 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                  
                  {/* Page indicators */}
                  {Array.from({ length: Math.min(5, totalPages || 1) }).map((_, i) => {
                    let pageNum = i + 1
                    const current = currentPage || 1
                    const pages = totalPages || 1
                    
                    if (pages > 5) {
                      if (current > 2 && current < pages - 2) {
                        pageNum = current - 2 + i
                      } else if (current >= pages - 2) {
                        pageNum = pages - 5 + i
                      }
                    }
                    
                    return (
                      <button
                        key={pageNum}
                        onClick={() => onPageChange?.(pageNum)}
                        className={cn(
                          "w-8 h-8 rounded-lg text-sm font-medium transition-colors",
                          currentPage === pageNum 
                            ? "bg-[#00ff88] text-[#0a0a0f]" 
                            : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/[0.06]"
                        )}
                      >
                        {pageNum}
                      </button>
                    )
                  })}
                  
                  <button
                    onClick={() => onPageChange?.((currentPage || 1) + 1)}
                    disabled={currentPage === totalPages}
                    className="p-2 rounded-lg text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/[0.06] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                    aria-label="Next page"
                  >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                  <button
                    onClick={() => onPageChange?.(totalPages || 1)}
                    disabled={currentPage === totalPages}
                    className="p-2 rounded-lg text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/[0.06] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                    aria-label="Last page"
                  >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M5 4L9 8L5 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M3 4L7 8L3 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                </div>
              </div>
            )}
            
            {/* Custom footer content */}
            {children}
          </div>
        </td>
      </tr>
    </tfoot>
  )
)
TableFooter.displayName = "TableFooter"

// Empty state component
interface TableEmptyProps {
  message?: string
  actionLabel?: string
  onAction?: () => void
}

const TableEmpty = ({ message = "No data available", actionLabel, onAction }: TableEmptyProps) => (
  <tr>
    <td colSpan={100} className="h-48 text-center py-12">
      <div className="flex flex-col items-center justify-center">
        <div className="w-16 h-16 rounded-2xl bg-slate-50 border border-slate-300/70 dark:bg-white/[0.02] dark:border-white/[0.06] flex items-center justify-center mb-4">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" className="text-slate-500">
            <path d="M9 17H5a2 2 0 00-2 2 2 2 0 002 2h2a2 2 0 002-2zm12-2h-4a2 2 0 00-2 2 2 2 0 002 2h2a2 2 0 002-2zM5 3a2 2 0 00-2 2 2 2 0 002 2h2a2 2 0 002-2zm12 0a2 2 0 00-2 2 2 2 0 002 2h2a2 2 0 002-2z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <p className="text-slate-600 dark:text-slate-400 mb-4">{message}</p>
        {actionLabel && onAction && (
          <button
            onClick={onAction}
            className="px-4 py-2 rounded-xl bg-[#00ff88]/10 text-[#00ff88] border border-[#00ff88]/20 hover:bg-[#00ff88]/20 transition-colors text-sm font-medium"
          >
            {actionLabel}
          </button>
        )}
      </div>
    </td>
  </tr>
)

export { Table, TableHeader, TableBody, TableRow, TableHead, TableCell, TableCaption, TableFooter, TableEmpty }
