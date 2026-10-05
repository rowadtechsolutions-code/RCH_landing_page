/**
 * Illustrative amounts (OMR) shown inside product frames — one main contract reused everywhere so the panes agree.
 * Contract #1042: 6 days at 8.000 a day, extended by 3 days and then 2 days.
 */
const DAILY = 8

export const MAIN_CONTRACT = {
  days: 6,
  original: 6 * DAILY,
  extensions: [3 * DAILY, 2 * DAILY] as const,
  get total() {
    return this.original + this.extensions[0] + this.extensions[1]
  },
  paid: 50,
  /** The latest payment, shown in the "payment recorded" toast. */
  lastPayment: 20,
  commissionRate: 0.1,
}

/** Other contracts on the dashboard / report tables. */
export const OTHER_CONTRACTS = { open: 75, overdue: 60, completedA: 55, completedB: 100 }

/** Month totals per partner office (sums of several contracts) and each office's commission rate. */
export const OFFICE_TOTALS = [
  { total: 420, rate: 0.1 },
  { total: 310, rate: 0.12 },
  { total: 190, rate: 0.08 },
] as const
