import { motion } from "motion/react"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/src/components/ui/card"
import { Button } from "@/src/components/ui/button"
import {
  aipAllocationByYear,
  lepBudgetByYear,
  obligationsByYear,
  obligationRequests,
  annualBudgetList,
} from "@/src/data/mockData"
import { formatCurrency } from "@/src/lib/utils"
import {
  dominantCategoryOverall,
  fillYearRange,
  peakYearByTotal,
  sumDataset,
  type ExpenseCategory,
  type YearlyCategoryAmounts,
} from "@/src/lib/financialPlanning"
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import {
  Activity,
  ArrowRight,
  Building2,
  FileSpreadsheet,
  FileText,
  Plus,
  TrendingUp,
  Wallet,
} from "lucide-react"

const START_YEAR = 2022
const END_YEAR = 2028

const CATEGORY_COLORS: Record<ExpenseCategory, string> = {
  PS: "#00ff88",
  MOOE: "#00d4ff",
  CO: "#FF7300",
}

const pesoSign = "\u20B1"

function formatPesoCompact(value: number) {
  const abs = Math.abs(value)
  if (abs >= 1_000_000_000) return `${pesoSign}${(value / 1_000_000_000).toFixed(1)}B`
  if (abs >= 1_000_000) return `${pesoSign}${(value / 1_000_000).toFixed(0)}M`
  if (abs >= 1_000) return `${pesoSign}${(value / 1_000).toFixed(0)}K`
  return `${pesoSign}${value}`
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#F0F0F0]/95 dark:bg-[#1a1a24]/95 backdrop-blur-xl border border-slate-300/70 dark:border-white/[0.1] rounded-xl p-3 shadow-xl">
        <p className="text-slate-700 dark:text-slate-300 text-sm mb-1">FY {label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} className="text-sm font-medium" style={{ color: entry.color }}>
            {entry.name}: {formatCurrency(entry.value)}
          </p>
        ))}
      </div>
    )
  }
  return null
}

function ChartInsights({ data }: { data: YearlyCategoryAmounts[] }) {
  const peak = peakYearByTotal(data)
  const dominant = dominantCategoryOverall(data)
  const coYears = data.filter((d) => d.CO > 0).length

  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-slate-600 dark:text-slate-400">
      <span className="inline-flex items-center gap-1">
        <span className="h-1.5 w-1.5 rounded-full bg-slate-400/50 dark:bg-white/30" />
        Peak year: <span className="text-slate-900 dark:text-slate-200">{peak?.year ?? "—"}</span>
      </span>
      <span className="inline-flex items-center gap-1">
        <span className="h-1.5 w-1.5 rounded-full bg-slate-400/50 dark:bg-white/30" />
        Dominant: <span className="text-slate-900 dark:text-slate-200">{dominant}</span>
      </span>
      <span className="inline-flex items-center gap-1">
        <span className="h-1.5 w-1.5 rounded-full bg-slate-400/50 dark:bg-white/30" />
        CO active: <span className="text-slate-900 dark:text-slate-200">{coYears}</span>/{data.length} years
      </span>
    </div>
  )
}

export function Dashboard() {
  const aipSeries = fillYearRange(aipAllocationByYear, START_YEAR, END_YEAR)
  const lepSeries = fillYearRange(lepBudgetByYear, START_YEAR, END_YEAR)
  const obligationsSeries = fillYearRange(obligationsByYear, START_YEAR, END_YEAR)

  const totalAip = sumDataset(aipSeries)
  const totalLep = sumDataset(lepSeries)
  const totalObligations = sumDataset(obligationsSeries)
  const utilizationRate = totalLep > 0 ? (totalObligations / totalLep) * 100 : 0

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-slate-900 via-slate-700 to-slate-500 dark:from-white dark:via-slate-200 dark:to-slate-400 bg-clip-text text-transparent">
            Financial Planning Dashboard
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">
            Yearly budgeting, category distribution, and obligations monitoring
          </p>
        </div>
      </motion.div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card className="relative overflow-hidden border-l-4 border-l-[#00ff88] dark:border-l-[#00ff88]">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#00ff88]/5 rounded-full blur-3xl" />
            <CardContent className="p-6">
              <div className="flex items-center justify-between space-y-0 pb-2">
                <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Total AIP</p>
                <div className="h-10 w-10 rounded-xl bg-[#00ff88]/10 flex items-center justify-center">
                  <FileText className="h-5 w-5 text-[#00ff88]" />
                </div>
              </div>
              <div className="text-3xl font-bold bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
                {formatCurrency(totalAip)}
              </div>
              <p className="text-xs text-[#00ff88] mt-2 flex items-center gap-1 font-medium">
                <TrendingUp className="h-3 w-3" /> Annual Investment Plan allocation (FY {START_YEAR}–{END_YEAR})
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="relative overflow-hidden border-l-4 border-l-amber-500 dark:border-l-amber-500">
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-3xl" />
            <CardContent className="p-6">
              <div className="flex items-center justify-between space-y-0 pb-2">
                <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Total LEP</p>
                <div className="h-10 w-10 rounded-xl bg-amber-500/10 flex items-center justify-center">
                  <TrendingUp className="h-5 w-5 text-amber-500 dark:text-amber-400" />
                </div>
              </div>
              <div className="text-3xl font-bold bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
                {formatCurrency(totalLep)}
              </div>
              <p className="text-xs text-amber-700 dark:text-amber-300 mt-2 flex items-center gap-1 font-medium">
                <TrendingUp className="h-3 w-3" /> Local Expenditure Program budget
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Card className="relative overflow-hidden border-l-4 border-l-[#00d4ff] dark:border-l-[#00d4ff]">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#00d4ff]/5 rounded-full blur-3xl" />
            <CardContent className="p-6">
              <div className="flex items-center justify-between space-y-0 pb-2">
                <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Total Obligations</p>
                <div className="h-10 w-10 rounded-xl bg-[#00d4ff]/10 flex items-center justify-center">
                  <Wallet className="h-5 w-5 text-[#00d4ff]" />
                </div>
              </div>
              <div className="text-3xl font-bold bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
                {formatCurrency(totalObligations)}
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-2">{utilizationRate.toFixed(2)}% of LEP obligated</p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-[#00ff88]" />
                Budget Allocation (PS / MOOE / CO)
              </CardTitle>
              <CardDescription>Grouped bars by year (FY {START_YEAR}–{END_YEAR})</CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
              <div className="h-[340px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={aipSeries} margin={{ top: 20, right: 20, left: 10, bottom: 8 }} barCategoryGap={18}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--recharts-grid)" />
                    <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{ fill: "#64748B" }} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fill: "#64748B" }} tickFormatter={formatPesoCompact} />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend iconType="circle" wrapperStyle={{ color: "var(--recharts-text)" }} />
                    <Bar dataKey="PS" name="PS" fill={CATEGORY_COLORS.PS} radius={[6, 6, 0, 0]} />
                    <Bar dataKey="MOOE" name="MOOE" fill={CATEGORY_COLORS.MOOE} radius={[6, 6, 0, 0]} />
                    <Bar dataKey="CO" name="CO" fill={CATEGORY_COLORS.CO} radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
            <CardFooter className="flex-wrap">
              <ChartInsights data={aipSeries} />
            </CardFooter>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wallet className="h-5 w-5 text-[#00d4ff]" />
                Obligations (Committed to Date)
              </CardTitle>
              <CardDescription>Compare planned budgets (left) vs actual commitments (right)</CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
              <div className="h-[340px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={obligationsSeries} margin={{ top: 20, right: 20, left: 10, bottom: 8 }} barCategoryGap={18}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--recharts-grid)" />
                    <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{ fill: "#64748B" }} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fill: "#64748B" }} tickFormatter={formatPesoCompact} />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend iconType="circle" wrapperStyle={{ color: "var(--recharts-text)" }} />
                    <Bar dataKey="PS" name="PS" fill={CATEGORY_COLORS.PS} radius={[6, 6, 0, 0]} />
                    <Bar dataKey="MOOE" name="MOOE" fill={CATEGORY_COLORS.MOOE} radius={[6, 6, 0, 0]} />
                    <Bar dataKey="CO" name="CO" fill={CATEGORY_COLORS.CO} radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
            <CardFooter className="flex-wrap">
              <ChartInsights data={obligationsSeries} />
            </CardFooter>
          </Card>
        </motion.div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-[#00ff88]" />
                  Recent Obligations
                </CardTitle>
                <CardDescription>Latest requests pending approval</CardDescription>
              </div>
              <Button variant="ghost" size="sm" className="text-[#00ff88] gap-1 hover:text-[#00e676] hover:bg-[#00ff88]/5">
                View All <ArrowRight className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {obligationRequests.slice(0, 3).map((req, index) => (
                  <motion.div
                    key={req.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 + index * 0.1 }}
                    className="flex items-center justify-between border-b border-slate-300/70 dark:border-white/[0.06] pb-4 last:border-0 last:pb-0"
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-xl bg-slate-200 dark:bg-gradient-to-br dark:from-[#2a2a3a] dark:to-[#1a1a24] border border-slate-300/70 dark:border-white/[0.1] flex items-center justify-center text-slate-700 dark:text-slate-300 font-semibold">
                        {req.payee.substring(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-slate-900 dark:text-white">{req.payee}</p>
                        <p className="text-xs text-slate-500">
                          {req.particulars} • {req.obrNo}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-slate-900 dark:text-white">{formatCurrency(req.amount)}</p>
                      <p
                        className={`text-xs font-medium capitalize ${
                          req.status === "approved"
                            ? "text-[#00ff88]"
                            : req.status === "pending"
                              ? "text-amber-500 dark:text-amber-400"
                              : "text-[#00d4ff]"
                        }`}
                      >
                        {req.status}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="h-5 w-5 text-red-500 dark:text-red-400" />
                  Budget Alerts
                </CardTitle>
                <CardDescription>Items requiring attention</CardDescription>
              </div>
              <Button variant="ghost" size="sm" className="text-[#00ff88] gap-1 hover:text-[#00e676] hover:bg-[#00ff88]/5">
                View All <ArrowRight className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {annualBudgetList
                  .filter((b) => b.status === "over-obligated")
                  .slice(0, 3)
                  .map((budget, index) => (
                    <motion.div
                      key={budget.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.8 + index * 0.1 }}
                      className="flex items-start justify-between border-b border-slate-300/70 dark:border-white/[0.06] pb-4 last:border-0 last:pb-0"
                    >
                      <div className="flex items-start gap-3">
                        <div className="mt-0.5 h-2 w-2 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.35)] dark:shadow-[0_0_8px_rgba(239,68,68,0.6)] flex-shrink-0"></div>
                        <div>
                          <p className="text-sm font-medium text-slate-900 dark:text-white line-clamp-1">{budget.ppa}</p>
                          <p className="text-xs text-slate-500">{budget.department}</p>
                        </div>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <p className="text-sm font-bold text-red-500 dark:text-red-400">{formatCurrency(budget.remaining)}</p>
                        <p className="text-xs text-slate-500">Over-obligated</p>
                      </div>
                    </motion.div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
