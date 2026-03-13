import { Outlet } from "react-router-dom"
import { Sidebar } from "./Sidebar"
import { Topbar } from "./Topbar"

export function AppLayout() {
  return (
    <div className="flex h-screen w-full bg-slate-50 overflow-hidden font-sans text-slate-900 dark:bg-slate-950 dark:text-slate-100 transition-colors">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Topbar />
        <main className="flex-1 overflow-y-auto p-6 lg:p-8">
          <div className="mx-auto max-w-7xl">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}
