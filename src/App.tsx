/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Toaster } from "sonner"
import { ThemeProvider, useTheme } from "next-themes"
import { AppLayout } from "./components/layout/AppLayout"
import { Dashboard } from "./pages/Dashboard"
import { AIP } from "./pages/AIP"
import { AnnualBudget } from "./pages/AnnualBudget"
import { ObligationRequests } from "./pages/ObligationRequests"
import { SubAccountCodes } from "./pages/SubAccountCodes"

function ThemedToaster() {
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === "dark"

  return (
    <Toaster
      position="top-right"
      richColors
      theme={isDark ? "dark" : "light"}
      toastOptions={{
        style: isDark
          ? {
              background: "linear-gradient(135deg, #1a1a24 0%, #12121a 100%)",
              border: "1px solid rgba(255, 255, 255, 0.08)",
              backdropFilter: "blur(16px)",
              boxShadow: "0 8px 32px rgba(0, 0, 0, 0.4)",
            }
          : {
              background: "linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(248,250,252,0.92) 100%)",
              border: "1px solid rgba(15, 23, 42, 0.10)",
              backdropFilter: "blur(16px)",
              boxShadow: "0 12px 32px rgba(15, 23, 42, 0.14)",
            },
        className: "font-sans",
      }}
    />
  )
}

export default function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
      <BrowserRouter>
        <ThemedToaster />
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/app" element={<Dashboard />} />
            <Route path="/app/aip" element={<AIP />} />
            <Route path="/app/budget" element={<AnnualBudget />} />
            <Route path="/app/obligations" element={<ObligationRequests />} />
            <Route path="/app/sub-accounts" element={<SubAccountCodes />} />
            {/* Placehold/apper routes for other nav items */}
            <Route path="/app/payees" element={<div className="p-8 text-slate-500 dark:text-slate-400">Claimant Payees (Coming Soon)</div>} />
            <Route path="/app/departments" element={<div className="p-8 text-slate-500 dark:text-slate-400">Departments (Coming Soon)</div>} />
            <Route path="/app/officers" element={<div className="p-8 text-slate-500 dark:text-slate-400">Requesting Officers (Coming Soon)</div>} />
            <Route path="/app/pdf-settings" element={<div className="p-8 text-slate-500 dark:text-slate-400">PDF Settings (Coming Soon)</div>} />
            <Route path="/app/users" element={<div className="p-8 text-slate-500 dark:text-slate-400">Users (Coming Soon)</div>} />
            <Route path="/app/settings" element={<div className="p-8 text-slate-500 dark:text-slate-400">Settings (Coming Soon)</div>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}
