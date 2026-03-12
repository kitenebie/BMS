/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Toaster } from "sonner"
import { AppLayout } from "./components/layout/AppLayout"
import { Dashboard } from "./pages/Dashboard"
import { AIP } from "./pages/AIP"
import { AnnualBudget } from "./pages/AnnualBudget"
import { ObligationRequests } from "./pages/ObligationRequests"
import { SubAccountCodes } from "./pages/SubAccountCodes"

export default function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-right" richColors />
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/aip" element={<AIP />} />
          <Route path="/budget" element={<AnnualBudget />} />
          <Route path="/obligations" element={<ObligationRequests />} />
          <Route path="/sub-accounts" element={<SubAccountCodes />} />
          {/* Placeholder routes for other nav items */}
          <Route path="/payees" element={<div className="p-8 text-slate-500">Claimant Payees (Coming Soon)</div>} />
          <Route path="/departments" element={<div className="p-8 text-slate-500">Departments (Coming Soon)</div>} />
          <Route path="/officers" element={<div className="p-8 text-slate-500">Requesting Officers (Coming Soon)</div>} />
          <Route path="/pdf-settings" element={<div className="p-8 text-slate-500">PDF Settings (Coming Soon)</div>} />
          <Route path="/users" element={<div className="p-8 text-slate-500">Users (Coming Soon)</div>} />
          <Route path="/settings" element={<div className="p-8 text-slate-500">Settings (Coming Soon)</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
