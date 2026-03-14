export type ExpenseCategory = "PS" | "MOOE" | "CO"

export const EXPENSE_CATEGORIES: ExpenseCategory[] = ["PS", "MOOE", "CO"]

export type YearlyCategoryAmounts = {
  year: number
  PS: number
  MOOE: number
  CO: number
}

export function fillYearRange(
  data: YearlyCategoryAmounts[],
  startYear: number,
  endYear: number,
): YearlyCategoryAmounts[] {
  const byYear = new Map<number, YearlyCategoryAmounts>(data.map((row) => [row.year, row]))

  const filled: YearlyCategoryAmounts[] = []
  for (let year = startYear; year <= endYear; year++) {
    filled.push(byYear.get(year) ?? { year, PS: 0, MOOE: 0, CO: 0 })
  }
  return filled
}

export function sumYear(row: YearlyCategoryAmounts): number {
  return row.PS + row.MOOE + row.CO
}

export function sumDataset(data: YearlyCategoryAmounts[]): number {
  return data.reduce((acc, row) => acc + sumYear(row), 0)
}

export function categoryTotals(data: YearlyCategoryAmounts[]): Record<ExpenseCategory, number> {
  return data.reduce(
    (acc, row) => {
      acc.PS += row.PS
      acc.MOOE += row.MOOE
      acc.CO += row.CO
      return acc
    },
    { PS: 0, MOOE: 0, CO: 0 },
  )
}

export function peakYearByTotal(data: YearlyCategoryAmounts[]): { year: number; total: number } | null {
  if (data.length === 0) return null

  let best = { year: data[0].year, total: sumYear(data[0]) }
  for (const row of data.slice(1)) {
    const total = sumYear(row)
    if (total > best.total) best = { year: row.year, total }
  }
  return best
}

export function dominantCategoryOverall(data: YearlyCategoryAmounts[]): ExpenseCategory {
  const totals = categoryTotals(data)
  const entries: Array<[ExpenseCategory, number]> = [
    ["PS", totals.PS],
    ["MOOE", totals.MOOE],
    ["CO", totals.CO],
  ]
  entries.sort((a, b) => b[1] - a[1])
  return entries[0][0]
}

