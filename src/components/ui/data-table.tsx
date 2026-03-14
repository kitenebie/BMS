import * as React from "react"
import { cn } from "@/src/lib/utils"
import { Table, TableBody, TableCaption, TableCell, TableEmpty, TableHead, TableHeader, TableRow } from "./table"

export type DataTableEmptyState = {
  message?: string
  actionLabel?: string
  onAction?: () => void
}

export type DataTableColumn<TData> = {
  id: string
  header: React.ReactNode
  cell: (row: TData) => React.ReactNode
  headerClassName?: string
  cellClassName?: string
}

export type DataTableProps<TData> = {
  data: TData[]
  columns: Array<DataTableColumn<TData>>
  rowKey: (row: TData) => string
  caption?: string
  emptyState?: DataTableEmptyState
  getRowClassName?: (row: TData) => string | undefined
  stickyHeader?: boolean
}

export function DataTable<TData>({
  data,
  columns,
  rowKey,
  caption,
  emptyState,
  getRowClassName,
  stickyHeader = true,
}: DataTableProps<TData>) {
  return (
    <Table>
      {caption ? <TableCaption>{caption}</TableCaption> : null}
      <TableHeader className={cn(stickyHeader && "sticky top-0 z-10")}>
        <TableRow className="hover:bg-transparent">
          {columns.map((column) => (
            <TableHead key={column.id} className={column.headerClassName}>
              {column.header}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.length > 0 ? (
          data.map((row) => (
            <TableRow key={rowKey(row)} className={getRowClassName?.(row)}>
              {columns.map((column) => (
                <TableCell key={column.id} className={column.cellClassName}>
                  {column.cell(row)}
                </TableCell>
              ))}
            </TableRow>
          ))
        ) : (
          <TableEmpty
            message={emptyState?.message}
            actionLabel={emptyState?.actionLabel}
            onAction={emptyState?.onAction}
          />
        )}
      </TableBody>
    </Table>
  )
}

