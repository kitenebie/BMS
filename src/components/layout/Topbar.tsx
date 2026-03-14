import { Bell, Search } from "lucide-react"
import { Input } from "@/src/components/ui/input"
import { ThemeToggle } from "@/src/components/ThemeToggle"

export function Topbar() {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-slate-300/50 dark:border-white/[0.06] bg-[#F0F0F0]/70 dark:bg-[#0a0a0f]/80 backdrop-blur-xl px-6">
      <div className="flex flex-1 items-center gap-4">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
          <Input
            type="search"
            placeholder="Search accounts, AIPs, or obligations..."
            className="w-full pl-10"
          />
        </div>
      </div>
      <div className="flex items-center gap-4">
        <ThemeToggle />
        <div className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300 bg-[#F0F0F0]/70 dark:bg-[#1a1a24]/60 border border-slate-300/70 dark:border-white/[0.08] px-3 py-2 rounded-xl">
          <span className="text-slate-500 dark:text-slate-500">FY:</span>
          <select className="bg-transparent border-none outline-none font-semibold text-slate-900 dark:text-white cursor-pointer">
            <option className="bg-[#F0F0F0] text-slate-900 dark:bg-[#1a1a24] dark:text-white">2026</option>
            <option className="bg-[#F0F0F0] text-slate-900 dark:bg-[#1a1a24] dark:text-white">2025</option>
            <option className="bg-[#F0F0F0] text-slate-900 dark:bg-[#1a1a24] dark:text-white">2024</option>
          </select>
        </div>
        <button className="relative rounded-xl p-2.5 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/[0.06] transition-colors border border-slate-300/70 dark:border-white/[0.06]">
          <Bell className="h-5 w-5" />
          <span className="absolute right-2 top-2 flex h-2 w-2 rounded-full bg-[#00ff88] shadow-[0_0_8px_rgba(0,255,136,0.6)]"></span>
        </button>
      </div>
    </header>
  )
}
