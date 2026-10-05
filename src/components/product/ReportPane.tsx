import type { ReactNode } from 'react'
import { CalendarRange, Check, Download, FileSpreadsheet, Building2 } from 'lucide-react'
import { Badge } from '@/components/Badge/Badge'
import { useLocale } from '@/i18n/LocaleProvider'
import { cn } from '@/lib/cn'
import { money } from '@/lib/format'
import { PaneHeader, Panel } from './parts'
import { MAIN_CONTRACT, OTHER_CONTRACTS } from '@/content/sampleNumbers'

const ROWS = [
  { renter: 0, vehicle: 0, amount: MAIN_CONTRACT.total, status: 'active' },
  { renter: 1, vehicle: 1, amount: OTHER_CONTRACTS.completedA, status: 'completed' },
  { renter: 2, vehicle: 3, amount: OTHER_CONTRACTS.open, status: 'open' },
  { renter: 3, vehicle: 2, amount: OTHER_CONTRACTS.completedB, status: 'completed' },
] as const

const TONE = { active: 'blue', completed: 'green', open: 'violet' } as const

/** Report table with office/period filters; when active, the Excel export completes and the file appears. */
export function ReportPane({ active }: { active: boolean }) {
  const { c } = useLocale()

  return (
    <div className="relative flex h-full flex-col gap-4 p-5 sm:p-6">
      <PaneHeader
        title={c.ui.reportsTitle}
        subtitle={c.ui.reportsSubtitle}
        aside={
          <span
            className={cn(
              'inline-flex h-9 shrink-0 items-center gap-1.5 rounded-lg px-3 text-[13px] font-semibold text-white transition-colors duration-500',
              active ? 'bg-emerald-600 delay-700' : 'bg-brand',
            )}
          >
            {active ? <Check className="size-4" strokeWidth={2.4} /> : <Download className="size-4" strokeWidth={2.2} />}
            {c.ui.exportRentals}
          </span>
        }
      />

      <div className="flex flex-wrap gap-2">
        <Chip icon={<Building2 className="size-3.5" />}>{c.ui.filterOffice}</Chip>
        <Chip icon={<CalendarRange className="size-3.5" />}>{c.ui.filterPeriod}</Chip>
      </div>

      <Panel className="overflow-hidden">
        <table className="w-full table-fixed text-[13px]">
          <thead className="bg-sunken text-[12px] text-muted">
            <tr>
              <th className="w-[38%] px-3.5 py-2.5 text-start font-medium">{c.ui.renter}</th>
              <th className="hidden px-2 py-2.5 text-start font-medium sm:table-cell">{c.ui.vehicle}</th>
              <th className="px-2 py-2.5 text-start font-medium">{c.ui.status}</th>
              <th className="px-3.5 py-2.5 text-end font-medium">{c.ui.contractValue}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {ROWS.map((r) => (
              <tr key={r.renter}>
                <td className="truncate px-3.5 py-3 font-medium text-ink">{c.sample.renters[r.renter]}</td>
                <td className="hidden truncate px-2 py-3 text-ink-soft sm:table-cell">{c.sample.vehicles[r.vehicle].name}</td>
                <td className="px-2 py-3">
                  <Badge tone={TONE[r.status]}>{c.ui.rentalStatus[r.status]}</Badge>
                </td>
                <td className="num truncate px-3.5 py-3 text-end font-semibold text-ink">{money(r.amount, c)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Panel>

      <div
        className={cn(
          'absolute bottom-5 flex items-center gap-3 rounded-xl bg-surface p-3 pe-4 shadow-[var(--shadow-float)] ring-1 ring-line transition-[opacity,transform] duration-700 ease-[var(--ease-out-soft)] end-5',
          active ? 'translate-y-0 opacity-100 delay-1000' : 'translate-y-4 opacity-0',
        )}
      >
        <span className="flex size-10 items-center justify-center rounded-lg bg-emerald-600 text-white">
          <FileSpreadsheet className="size-5" strokeWidth={1.9} />
        </span>
        <div className="min-w-0">
          <div className="text-[13px] font-semibold text-ink">{c.ui.exportFile}</div>
          <div className="text-[12px] text-emerald-700">{c.ui.exported}</div>
        </div>
      </div>
    </div>
  )
}

function Chip({ icon, children }: { icon: ReactNode; children: ReactNode }) {
  return (
    <span className="inline-flex h-8 items-center gap-1.5 rounded-full bg-surface px-3 text-[12.5px] font-medium text-ink-soft ring-1 ring-line-strong">
      {icon}
      {children}
    </span>
  )
}
