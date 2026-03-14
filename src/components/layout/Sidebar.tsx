import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { cn } from "@/src/lib/utils"
import { motion, AnimatePresence } from "motion/react"
import { 
  LayoutDashboard, 
  FileText, 
  Briefcase, 
  CreditCard, 
  Settings, 
  Users, 
  FileBox,
  Building2,
  UserCircle,
  ChevronLeft,
  ChevronRight
} from "lucide-react"

const navItems = [
  { name: "Dashboard", href: "/app", icon: LayoutDashboard },
  { name: "A.I.P", href: "/app/aip", icon: FileText },
  { name: "Annual Budget", href: "/app/budget", icon: Briefcase },
  { name: "Obligation Requests", href: "/app/obligations", icon: CreditCard },
]

const encodingItems = [
  { name: "Sub-Account Codes", href: "/app/sub-accounts", icon: FileBox },
  { name: "Claimant Payees", href: "/app/payees", icon: UserCircle },
  { name: "Departments", href: "/app/departments", icon: Building2 },
  { name: "Requesting Officers", href: "/app/officers", icon: Users },
  { name: "PDF Settings", href: "/app/pdf-settings", icon: FileText },
  { name: "Users", href: "/app/users", icon: Users },
  { name: "Settings", href: "/app/settings", icon: Settings },
]

export function Sidebar() {
  const location = useLocation()
  const [collapsed, setCollapsed] = useState(false)

  return (
    <motion.aside
      initial={false}
      animate={{ width: collapsed ? 80 : 260 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="flex h-full flex-col border-r border-slate-300/70 dark:border-white/[0.06] bg-[#F0F0F0]/70 dark:bg-[#0a0a0f]/80 backdrop-blur-xl relative z-20"
    >
      {/* Gradient accent line */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-[#00ff88] via-[#00d4ff] to-[#a855f7] opacity-50" />
      
      {/* Logo */}
      <div className="flex h-16 items-center justify-between px-4 border-b border-slate-300/70 dark:border-white/[0.06]">
        <Link to="/" className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-[#00ff88] to-[#00cc6a] flex items-center justify-center shadow-[0_0_20px_rgba(0,255,136,0.3)]">
            <Briefcase size={20} className="text-[#0a0a0f]" />
          </div>
          <AnimatePresence mode="wait">
            {!collapsed && (
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="font-bold text-xl bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-300 bg-clip-text text-transparent"
              >
                BMSO
              </motion.span>
            )}
          </AnimatePresence>
        </Link>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1.5 rounded-lg text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/[0.06] transition-colors"
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>
      
      {/* Navigation */}
      <div className="flex-1 overflow-y-auto py-4 px-3">
        <nav className="space-y-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.href
            return (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200 relative group",
                  isActive 
                    ? "bg-gradient-to-r from-[#00ff88]/10 to-transparent text-[#00ff88]" 
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/70 dark:hover:bg-white/[0.04]"
                )}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 rounded-r-full bg-[#00ff88]"
                  />
                )}
                <item.icon
                  className={cn(
                    "h-5 w-5 flex-shrink-0",
                    isActive ? "text-[#00ff88]" : "text-slate-500 group-hover:text-slate-900 dark:group-hover:text-white"
                  )}
                />
                <AnimatePresence mode="wait">
                  {!collapsed && (
                    <motion.span
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                    >
                      {item.name}
                    </motion.span>
                  )}
                </AnimatePresence>
              </Link>
            )
          })}
        </nav>

        <div className="mt-8">
          <AnimatePresence mode="wait">
            {!collapsed && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="px-3 text-xs font-semibold uppercase tracking-widest text-slate-500 mb-2"
              >
                Encoding
              </motion.div>
            )}
          </AnimatePresence>
          <nav className="space-y-1">
            {encodingItems.map((item) => {
              const isActive = location.pathname === item.href
              return (
                <Link
                  key={item.name}
                  to={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200 relative group",
                  isActive 
                    ? "bg-gradient-to-r from-[#00ff88]/10 to-transparent text-[#00ff88]" 
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/70 dark:hover:bg-white/[0.04]"
                )}
              >
                  {isActive && (
                    <motion.div
                      layoutId="activeNav2"
                      className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 rounded-r-full bg-[#00ff88]"
                    />
                  )}
                  <item.icon
                    className={cn(
                      "h-5 w-5 flex-shrink-0",
                      isActive ? "text-[#00ff88]" : "text-slate-500 group-hover:text-slate-900 dark:group-hover:text-white"
                    )}
                  />
                  <AnimatePresence mode="wait">
                    {!collapsed && (
                      <motion.span
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                      >
                        {item.name}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </Link>
              )
            })}
          </nav>
        </div>
      </div>
      
      {/* User profile */}
      <div className="border-t border-slate-300/70 dark:border-white/[0.06] p-3">
        <div className={cn(
          "flex items-center gap-3 rounded-xl px-3 py-2.5 hover:bg-slate-100/70 dark:hover:bg-white/[0.04] cursor-pointer transition-colors",
          collapsed && "justify-center"
        )}>
          <div className="h-10 w-10 rounded-xl bg-slate-200 dark:bg-gradient-to-br dark:from-[#2a2a3a] dark:to-[#1a1a24] border border-slate-300/70 dark:border-white/[0.1] flex items-center justify-center text-slate-700 dark:text-slate-300 font-semibold">
            AD
          </div>
          <AnimatePresence mode="wait">
            {!collapsed && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="flex-1 overflow-hidden"
              >
                <p className="truncate text-sm font-medium text-slate-900 dark:text-white">Admin User</p>
                <p className="truncate text-xs text-slate-500">admin@bmso.gov</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.aside>
  )
}
