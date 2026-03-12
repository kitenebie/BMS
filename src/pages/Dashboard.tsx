import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/src/components/ui/card"
import { Button } from "@/src/components/ui/button"
import { 
  dashboardStats, 
  budgetTrend, 
  obligationTrend, 
  obligationRequests, 
  annualBudgetList 
} from "@/src/data/mockData"
import { formatCurrency, formatNumber } from "@/src/lib/utils"
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Legend,
  PieChart,
  Pie,
  Cell
} from "recharts"
import { 
  Wallet, 
  TrendingUp, 
  FileText, 
  Building2, 
  Plus, 
  FileSpreadsheet,
  ArrowRight
} from "lucide-react"

const COLORS = ['#16A34A', '#2563EB', '#F59E0B', '#EF4444'];

export function Dashboard() {
  return (
    <div className="space-y-8">
      {/* Hero Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Budget Management System</h1>
          <p className="text-slate-500 mt-1">Financial overview, allocations, obligations, and utilization trends</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="gap-2">
            <FileSpreadsheet className="h-4 w-4" />
            Generate Report
          </Button>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            New Obligation
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-l-4 border-l-green-600">
          <CardContent className="p-6">
            <div className="flex items-center justify-between space-y-0 pb-2">
              <p className="text-sm font-medium text-slate-500">Total AIP</p>
              <FileText className="h-4 w-4 text-slate-400" />
            </div>
            <div className="text-2xl font-bold text-slate-900">{formatCurrency(dashboardStats.totalAip)}</div>
            <p className="text-xs text-green-600 mt-1 flex items-center gap-1 font-medium">
              <TrendingUp className="h-3 w-3" /> +12.5% from last year
            </p>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-blue-600">
          <CardContent className="p-6">
            <div className="flex items-center justify-between space-y-0 pb-2">
              <p className="text-sm font-medium text-slate-500">Total Obligations</p>
              <Wallet className="h-4 w-4 text-slate-400" />
            </div>
            <div className="text-2xl font-bold text-slate-900">{formatCurrency(dashboardStats.totalObligations)}</div>
            <p className="text-xs text-slate-500 mt-1">
              {dashboardStats.utilizationRate}% utilization rate
            </p>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-amber-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between space-y-0 pb-2">
              <p className="text-sm font-medium text-slate-500">Remaining Budget</p>
              <TrendingUp className="h-4 w-4 text-slate-400" />
            </div>
            <div className="text-2xl font-bold text-slate-900">{formatCurrency(dashboardStats.remainingBudget)}</div>
            <p className="text-xs text-slate-500 mt-1">
              Available for allocation
            </p>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-purple-600">
          <CardContent className="p-6">
            <div className="flex items-center justify-between space-y-0 pb-2">
              <p className="text-sm font-medium text-slate-500">Departments</p>
              <Building2 className="h-4 w-4 text-slate-400" />
            </div>
            <div className="text-2xl font-bold text-slate-900">{dashboardStats.departmentCount}</div>
            <p className="text-xs text-slate-500 mt-1">
              Active departments covered
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Analytics Row */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle>Budget vs Obligations</CardTitle>
            <CardDescription>
              Annual comparison of allocated budget and actual obligations
            </CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={budgetTrend.map((b, i) => ({
                    year: b.year,
                    budget: b.ps + b.mooe + b.co,
                    obligation: obligationTrend[i].ps + obligationTrend[i].mooe + obligationTrend[i].co
                  }))}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                  <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{ fill: '#64748B' }} />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#64748B' }}
                    tickFormatter={(value) => `₱${(value / 1000000).toFixed(0)}M`}
                  />
                  <Tooltip 
                    formatter={(value: number) => formatCurrency(value)}
                    cursor={{ fill: '#F8FAFC' }}
                    contentStyle={{ borderRadius: '8px', border: '1px solid #E2E8F0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  />
                  <Legend iconType="circle" />
                  <Bar dataKey="budget" name="Total Budget" fill="#16A34A" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="obligation" name="Total Obligations" fill="#2563EB" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Budget Composition</CardTitle>
            <CardDescription>
              Breakdown by expense type for FY 2026
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={[
                      { name: 'PS', value: 6000000 },
                      { name: 'MOOE', value: 280000000 },
                      { name: 'CO', value: 260000000 }
                    ]}
                    cx="50%"
                    cy="50%"
                    innerRadius={80}
                    outerRadius={110}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {[0, 1, 2].map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value: number) => formatCurrency(value)} />
                  <Legend iconType="circle" verticalAlign="bottom" height={36}/>
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Activity / Alerts Section */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Recent Obligations</CardTitle>
              <CardDescription>Latest requests pending approval</CardDescription>
            </div>
            <Button variant="ghost" size="sm" className="text-green-600 gap-1">
              View All <ArrowRight className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {obligationRequests.slice(0, 3).map((req) => (
                <div key={req.id} className="flex items-center justify-between border-b border-slate-100 pb-4 last:border-0 last:pb-0">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 font-semibold">
                      {req.payee.substring(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-900">{req.payee}</p>
                      <p className="text-xs text-slate-500">{req.particulars} • {req.obrNo}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-slate-900">{formatCurrency(req.amount)}</p>
                    <p className={`text-xs font-medium capitalize ${
                      req.status === 'approved' ? 'text-green-600' : 
                      req.status === 'pending' ? 'text-amber-500' : 'text-blue-600'
                    }`}>
                      {req.status}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Budget Alerts</CardTitle>
              <CardDescription>Items requiring attention</CardDescription>
            </div>
            <Button variant="ghost" size="sm" className="text-green-600 gap-1">
              View All <ArrowRight className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {annualBudgetList.filter(b => b.status === 'over-obligated').slice(0, 3).map((budget) => (
                <div key={budget.id} className="flex items-start justify-between border-b border-slate-100 pb-4 last:border-0 last:pb-0">
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 h-2 w-2 rounded-full bg-red-500 flex-shrink-0"></div>
                    <div>
                      <p className="text-sm font-medium text-slate-900 line-clamp-1">{budget.ppa}</p>
                      <p className="text-xs text-slate-500">{budget.department}</p>
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-sm font-bold text-red-600">{formatCurrency(budget.remaining)}</p>
                    <p className="text-xs text-slate-500">Over-obligated</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
