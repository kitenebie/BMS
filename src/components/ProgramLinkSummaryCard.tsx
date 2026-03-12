import React from "react"
import { Badge } from "@/src/components/ui/badge"
import { Building2, Layers3, Target } from "lucide-react"

interface ProgramLinkSummaryCardProps {
  aipProgramCode: string
  title: string
  department: string
  sector: string
}

export function ProgramLinkSummaryCard({
  aipProgramCode,
  title,
  department,
  sector,
}: ProgramLinkSummaryCardProps) {
  return (
    <div className="mt-4 rounded-xl bg-slate-50 border border-slate-200 p-4 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-1 h-full bg-indigo-500" />
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <Badge variant="secondary" className="bg-indigo-100 text-indigo-700 hover:bg-indigo-100 font-medium text-xs">
            Linked Program
          </Badge>
          <div className="font-mono text-xs text-slate-500 font-medium bg-white px-2 py-1 rounded border border-slate-200 shadow-sm">
            {aipProgramCode}
          </div>
        </div>
        
        <div>
          <h3 className="font-semibold text-slate-900 text-base">{title}</h3>
          
          <div className="mt-3 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 text-sm text-slate-600">
            <div className="flex items-center gap-2">
              <Building2 className="h-4 w-4 text-slate-400" />
              <span className="truncate max-w-[250px]">{department}</span>
            </div>
            <div className="hidden sm:block w-1 h-1 rounded-full bg-slate-300" />
            <div className="flex items-center gap-2">
              <Layers3 className="h-4 w-4 text-slate-400" />
              <span className="truncate max-w-[300px]">{sector}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
