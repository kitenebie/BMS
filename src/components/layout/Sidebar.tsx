import { Link, useLocation } from "react-router-dom"
import { cn } from "@/src/lib/utils"
import { 
  LayoutDashboard, 
  FileText, 
  Briefcase, 
  CreditCard, 
  Settings, 
  Users, 
  FileBox,
  ChevronDown,
  Building2,
  UserCircle
} from "lucide-react"

const navItems = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "A.I.P", href: "/aip", icon: FileText },
  { name: "Annual Budget", href: "/budget", icon: Briefcase },
  { name: "Obligation Requests", href: "/obligations", icon: CreditCard },
]

const encodingItems = [
  { name: "Sub-Account Codes", href: "/sub-accounts", icon: FileBox },
  { name: "Claimant Payees", href: "/payees", icon: UserCircle },
  { name: "Departments", href: "/departments", icon: Building2 },
  { name: "Requesting Officers", href: "/officers", icon: Users },
  { name: "PDF Settings", href: "/pdf-settings", icon: FileText },
  { name: "Users", href: "/users", icon: Users },
  { name: "Settings", href: "/settings", icon: Settings },
]

export function Sidebar() {
  const location = useLocation()

  return (
    <div className="flex h-full w-64 flex-col border-r border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
      <div className="flex h-16 items-center px-6 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-2 font-bold text-xl text-green-700 dark:text-emerald-400">
          <div className="h-8 w-8 rounded bg-green-600 dark:bg-emerald-500 flex items-center justify-center text-white">
            <Briefcase size={18} />
          </div>
          BMSO
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto py-4">
        <nav className="space-y-1 px-3">
          {navItems.map((item) => {
            const isActive = location.pathname === item.href
            return (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  isActive 
                    ? "bg-green-50 text-green-700 dark:bg-emerald-900/30 dark:text-emerald-400" 
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-900 dark:hover:text-slate-100"
                )}
              >
                <item.icon className={cn("h-5 w-5", isActive ? "text-green-600 dark:text-emerald-400" : "text-slate-400 dark:text-slate-500")} />
                {item.name}
              </Link>
            )
          })}
        </nav>

        <div className="mt-8">
          <div className="px-6 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-500 mb-2">
            Encoding
          </div>
          <nav className="space-y-1 px-3">
            {encodingItems.map((item) => {
              const isActive = location.pathname === item.href
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                    isActive 
                      ? "bg-green-50 text-green-700 dark:bg-emerald-900/30 dark:text-emerald-400" 
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-900 dark:hover:text-slate-100"
                  )}
                >
                  <item.icon className={cn("h-5 w-5", isActive ? "text-green-600 dark:text-emerald-400" : "text-slate-400 dark:text-slate-500")} />
                  {item.name}
                </Link>
              )
            })}
          </nav>
        </div>
      </div>
      
      <div className="border-t border-slate-200 dark:border-slate-800 p-4">
        <div className="flex items-center gap-3 rounded-md px-3 py-2 hover:bg-slate-50 dark:hover:bg-slate-900 cursor-pointer transition-colors">
          <div className="h-8 w-8 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-300 font-medium">
            AD
          </div>
          <div className="flex-1 overflow-hidden">
            <p className="truncate text-sm font-medium text-slate-900 dark:text-slate-100">Admin User</p>
            <p className="truncate text-xs text-slate-500 dark:text-slate-400">admin@bmso.gov</p>
          </div>
        </div>
      </div>
    </div>
  )
}
