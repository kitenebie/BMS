export const dashboardStats = {
  totalAip: 6998461961,
  totalLep: 2167155338,
  totalObligations: 1712931037,
  remainingBudget: 4541314301,
  utilizationRate: 24.48,
  departmentCount: 26,
};

export const budgetTrend = [
  { year: 2022, ps: 0, mooe: 0, co: 130000000 },
  { year: 2023, ps: 0, mooe: 0, co: 20000000 },
  { year: 2024, ps: 5000000, mooe: 10000000, co: 130000000 },
  { year: 2025, ps: 580000000, mooe: 910000000, co: 670000000 },
  { year: 2026, ps: 6000000, mooe: 280000000, co: 260000000 },
];

export const obligationTrend = [
  { year: 2022, ps: 0, mooe: 0, co: 0 },
  { year: 2023, ps: 0, mooe: 0, co: 0 },
  { year: 2024, ps: 0, mooe: 0, co: 0 },
  { year: 2025, ps: 380000000, mooe: 820000000, co: 490000000 },
  { year: 2026, ps: 0, mooe: 0, co: 0 },
];

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
    annualBudget: 13236000,
    obligated: 10098160.65,
    remaining: 3137839.35,
    status: "healthy",
  },
];

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
