import { sumDataset, type YearlyCategoryAmounts } from "@/src/lib/financialPlanning"

export const aipAllocationByYear: YearlyCategoryAmounts[] = [
  { year: 2022, PS: 120_000_000, MOOE: 300_000_000, CO: 500_000_000 },
  { year: 2023, PS: 150_000_000, MOOE: 350_000_000, CO: 450_000_000 },
  { year: 2024, PS: 170_000_000, MOOE: 420_000_000, CO: 600_000_000 },
  { year: 2025, PS: 220_000_000, MOOE: 900_000_000, CO: 1_100_000_000 },
  { year: 2026, PS: 240_000_000, MOOE: 780_000_000, CO: 850_000_000 },
  { year: 2027, PS: 260_000_000, MOOE: 820_000_000, CO: 700_000_000 },
  { year: 2028, PS: 280_000_000, MOOE: 860_000_000, CO: 650_000_000 },
]

export const lepBudgetByYear: YearlyCategoryAmounts[] = [
  { year: 2022, PS: 130_000_000, MOOE: 310_000_000, CO: 480_000_000 },
  { year: 2023, PS: 155_000_000, MOOE: 360_000_000, CO: 435_000_000 },
  { year: 2024, PS: 175_000_000, MOOE: 430_000_000, CO: 585_000_000 },
  { year: 2025, PS: 230_000_000, MOOE: 920_000_000, CO: 1_070_000_000 },
  { year: 2026, PS: 250_000_000, MOOE: 800_000_000, CO: 820_000_000 },
  { year: 2027, PS: 270_000_000, MOOE: 840_000_000, CO: 670_000_000 },
  { year: 2028, PS: 290_000_000, MOOE: 880_000_000, CO: 620_000_000 },
]

export const obligationsByYear: YearlyCategoryAmounts[] = [
  { year: 2022, PS: 110_000_000, MOOE: 210_000_000, CO: 320_000_000 },
  { year: 2023, PS: 120_000_000, MOOE: 250_000_000, CO: 300_000_000 },
  { year: 2024, PS: 140_000_000, MOOE: 320_000_000, CO: 410_000_000 },
  { year: 2025, PS: 190_000_000, MOOE: 720_000_000, CO: 820_000_000 },
  { year: 2026, PS: 210_000_000, MOOE: 600_000_000, CO: 620_000_000 },
  { year: 2027, PS: 230_000_000, MOOE: 640_000_000, CO: 500_000_000 },
  { year: 2028, PS: 250_000_000, MOOE: 670_000_000, CO: 450_000_000 },
]

// Backwards-compatible aliases (used by older dashboard charts)
export const budgetTrend = aipAllocationByYear
export const obligationTrend = obligationsByYear

const totalAip = sumDataset(aipAllocationByYear)
const totalLep = sumDataset(lepBudgetByYear)
const totalObligations = sumDataset(obligationsByYear)

export const dashboardStats = {
  totalAip,
  totalLep,
  totalObligations,
  remainingBudget: totalLep - totalObligations,
  utilizationRate: totalLep > 0 ? Number(((totalObligations / totalLep) * 100).toFixed(2)) : 0,
}

export const aipMainList = [
  {
    id: "AIP-001",
    aipCode: "1000-000-2-01-01-000-000",
    ppa: "Office of the City Assessor",
    sector: "General Public Services",
    totalAmount: 875614951.9,
    totalLep: 875614951.9,
    status: "active",
  },
  {
    id: "AIP-002",
    aipCode: "1000-000-2-01-02-000-000",
    ppa: "Office of the City Accountant",
    sector: "General Public Services",
    totalAmount: 7091550.7,
    totalLep: 7091550.7,
    status: "active",
  },
  {
    id: "AIP-003",
    aipCode: "1000-000-2-01-03-000-000",
    ppa: "Office of the City Budget Officer",
    sector: "General Public Services",
    totalAmount: 40226557.97,
    totalLep: 40226557.97,
    status: "active",
  },
  {
    id: "AIP-004",
    aipCode: "1000-000-2-01-05-000-000",
    ppa: "Office of the City Planning and Development Coordinator",
    sector: "Economic Services",
    totalAmount: 34075506.7,
    totalLep: 34075506.7,
    status: "active",
  },
];

export const aipProgramList = [
  {
    id: "PROG-001",
    aipCode: "1000-000-2-01-01-001-002",
    program: "Purchase of Maintenance Supplies",
    implementingOffice: "OCM",
    amount: 3500000,
    lep: 2100000,
    obligated: 1500000,
    fundType: "General Fund",
    expenseType: "MOOE",
    serviceType: "Support",
  },
  {
    id: "PROG-002",
    aipCode: "1000-000-2-01-01-001-002",
    program: "Purchase of Other Supplies & Materials",
    implementingOffice: "OCM",
    amount: 4800000,
    lep: 3500000,
    obligated: 2200000,
    fundType: "General Fund",
    expenseType: "MOOE",
    serviceType: "Support",
  },
  {
    id: "PROG-003",
    aipCode: "1000-000-2-01-01-001-002",
    program: "Payment for Water Bills",
    implementingOffice: "OCM",
    amount: 1200000,
    lep: 950000,
    obligated: 640000,
    fundType: "General Fund",
    expenseType: "MOOE",
    serviceType: "Utility",
  },
];

export const annualBudgetList = [
  {
    id: "BUD-001",
    aipCode: "1000-000-2-01-01-001",
    continuingAppropriation: false,
    ppa: "School Buildings",
    fundType: "Special Education Fund",
    expenseType: "CO",
    department: "Local School Board - Elementary",
    accountCode: "1-07-04-020",
    subAccount: "",
    accountScope: "Project Level",
    annualBudget: 35000000,
    obligated: 139580280.67,
    remaining: -104580280.67,
    status: "over-obligated",
  },
  {
    id: "BUD-002",
    aipCode: "1000-000-2-01-01-002",
    continuingAppropriation: false,
    ppa: "Information and Communication Technology Equipment",
    fundType: "Special Education Fund",
    expenseType: "CO",
    department: "Local School Board - Elementary",
    accountCode: "1-07-05-030",
    subAccount: "",
    accountScope: "Project Level",
    annualBudget: 20000000,
    obligated: 50575225,
    remaining: -30575225,
    status: "over-obligated",
  },
  {
    id: "BUD-003",
    aipCode: "1000-000-2-01-01-003",
    continuingAppropriation: false,
    ppa: "Technical and Scientific Equipment",
    fundType: "Special Education Fund",
    expenseType: "CO",
    department: "Local School Board - Elementary",
    accountCode: "1-07-05-140",
    subAccount: "",
    accountScope: "Project Level",
    annualBudget: 20000000,
    obligated: 3942500,
    remaining: 16057500,
    status: "healthy",
  },
  {
    id: "BUD-004",
    aipCode: "1000-000-2-01-01-004",
    continuingAppropriation: false,
    ppa: "Other Machinery and Equipment",
    fundType: "Special Education Fund",
    expenseType: "CO",
    department: "Local School Board - Elementary",
    accountCode: "1-07-05-990",
    subAccount: "",
    accountScope: "Project Level",
    annualBudget: 5000000,
    obligated: 25769893.01,
    remaining: -20769893.01,
    status: "over-obligated",
  },
  {
    id: "BUD-005",
    aipCode: "1000-000-2-03-009-001",
    continuingAppropriation: false,
    ppa: "Salaries and Wages - Casual/Contractual",
    fundType: "Special Education Fund",
    expenseType: "PS",
    department: "Local School Board - Elementary",
    accountCode: "5-01-01-020",
    subAccount: "",
    accountScope: "Department Level",
    annualBudget: 13236000,
    obligated: 10098160.65,
    remaining: 3137839.35,
    status: "healthy",
  },
];

export const realignmentHistoryList = [
  {
    id: "RLN-001",
    entryDate: "2026-03-05",
    fundType: "General Fund",
    expenseType: "MOOE",
    responsibleOffice: "Office of the Treasurer",
    description: "Re-align operating allocations to cover urgent repairs.",
    totalAmount: 1250000,
    fromLines: 2,
    toLines: 2,
    status: "posted" as const,
  },
  {
    id: "RLN-002",
    entryDate: "2026-03-09",
    fundType: "Special Education Fund",
    expenseType: "CO",
    responsibleOffice: "Local School Board - Elementary",
    description: "Re-align infrastructure funds for classroom improvements.",
    totalAmount: 5000000,
    fromLines: 1,
    toLines: 1,
    status: "posted" as const,
  },
  {
    id: "RLN-003",
    entryDate: "2026-03-11",
    fundType: "Trust Fund",
    expenseType: "PS",
    responsibleOffice: "Office of the Mayor",
    description: "Re-align personnel services to match staffing adjustments.",
    totalAmount: 325000,
    fromLines: 1,
    toLines: 1,
    status: "rolled-back" as const,
  },
]

export const supplementalHistoryList = [
  {
    id: "SUP-001",
    entryDate: "2026-03-06",
    description: "Supplemental allocation for emergency procurement.",
    totalAmount: 800000,
    entries: 2,
    status: "posted" as const,
  },
  {
    id: "SUP-002",
    entryDate: "2026-03-10",
    description: "Supplemental allocation to support additional program needs.",
    totalAmount: 1500000,
    entries: 3,
    status: "posted" as const,
  },
  {
    id: "SUP-003",
    entryDate: "2026-03-12",
    description: "Supplemental entry (duplicate) — rolled back.",
    totalAmount: 250000,
    entries: 1,
    status: "rolled-back" as const,
  },
]

export const obligationRequests = [
  {
    id: "OBR-001",
    date: "2026-01-10",
    obrNo: "15134-01-25-101",
    payee: "Ericson Tapay General Merchandise",
    particulars: "Tokens",
    aip: "1000-000-2-01-12-004-003",
    accountCode: "5-02-02-010",
    amount: 125000,
    status: "approved",
    pdfAvailable: true,
  },
  {
    id: "OBR-002",
    date: "2026-01-09",
    obrNo: "15467-01-26-101",
    payee: "PLDT Inc",
    particulars: "Telephone bill",
    aip: "1000-000-2-01-01-001-002",
    accountCode: "5-02-05-020",
    amount: 86500,
    status: "released",
    pdfAvailable: true,
  },
  {
    id: "OBR-003",
    date: "2026-01-07",
    obrNo: "15357-01-26-101",
    payee: "Norma Caro et al",
    particulars: "Overtime",
    aip: "1000-000-2-01-01-001-001",
    accountCode: "5-01-02-130",
    amount: 240000,
    status: "pending",
    pdfAvailable: true,
  },
];

export const subAccountCodes = [
  {
    id: "SUB-001",
    accountCode: "5-01-02-990 OTHER BONUSES AND ALLOWANCE",
    code: "3",
    description: "MEDICAL ALLOWANCE",
    status: "active",
  },
  {
    id: "SUB-002",
    accountCode: "5-01-02-990 OTHER BONUSES AND ALLOWANCE",
    code: "2",
    description: "PRODUCTIVITY ENHANCEMENT INCENTIVES",
    status: "active",
  },
  {
    id: "SUB-003",
    accountCode: "5-01-02-990 OTHER BONUSES AND ALLOWANCE",
    code: "1",
    description: "MID-YEAR BONUS",
    status: "active",
  },
  {
    id: "SUB-004",
    accountCode: "5-01-04-990 OTHER PERSONNEL BENEFITS",
    code: "03",
    description: "LOYALTY PAY",
    status: "active",
  },
  {
    id: "SUB-005",
    accountCode: "5-01-04-990 OTHER PERSONNEL BENEFITS",
    code: "02",
    description: "PERFORMANCE BASED BONUS",
    status: "active",
  },
  {
    id: "SUB-006",
    accountCode: "5-01-04-990 OTHER PERSONNEL BENEFITS",
    code: "01",
    description: "MONETIZATION OF LEAVE CREDITS",
    status: "active",
  },
];

export const departments = [
  "Office of the City Assessor",
  "Office of the City Accountant",
  "Office of the City Budget Officer",
  "Office of the City Planning and Development Coordinator",
  "Local School Board - Elementary",
  "Office of the Mayor",
  "Office of the Treasurer",
];

export const sectors = [
  "General Public Services",
  "Economic Services",
  "Social Services",
  "Environmental Services",
];

export const subSectors = [
  "Administrative Governance",
  "Education",
  "Infrastructure",
  "Utilities",
  "Health Services",
];

export const fundTypes = [
  "General Fund",
  "Special Education Fund",
  "Trust Fund",
];

export const expenseTypes = [
  "PS",
  "MOOE",
  "CO",
];

export const accountScopes = [
  "Department Level",
  "Program Level",
  "Project Level",
];
