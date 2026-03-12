import { Bell, Search } from "lucide-react"
import { Input } from "@/src/components/ui/input"

export function Topbar() {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-slate-200 bg-white px-6">
      <div className="flex flex-1 items-center gap-4">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-500" />
          <Input
            type="search"
            placeholder="Search accounts, AIPs, or obligations..."
            className="w-full bg-slate-50 pl-9 border-slate-200 focus-visible:ring-green-600"
          />
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 text-sm font-medium text-slate-600 bg-slate-100 px-3 py-1.5 rounded-md">
          <span>FY:</span>
          <select className="bg-transparent border-none outline-none font-semibold text-slate-900 cursor-pointer">
            <option>2026</option>
            <option>2025</option>
            <option>2024</option>
          </select>
        </div>
        <button className="relative rounded-full p-2 text-slate-500 hover:bg-slate-100 transition-colors">
          <Bell className="h-5 w-5" />
          <span className="absolute right-1.5 top-1.5 flex h-2 w-2 rounded-full bg-red-500"></span>
        </button>
      </div>
    </header>
  )
}
