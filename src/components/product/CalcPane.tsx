import { useLocale } from '@/i18n/LocaleProvider'
import { cn } from '@/lib/cn'
import { money } from '@/lib/format'
import { PaneHeader, Panel } from './parts'
import { OFFICE_TOTALS } from '@/content/sampleNumbers'


/** The financial split the product computes automatically, using the app's own formulas. */
export function CalcPane({ active }: { active: boolean }) {
  const { c } = useLocale()
  const rows = OFFICE_TOTALS.map((o, i) => {
    const commission = o.total * o.rate
    return { name: c.sample.offices[i], ...o, commission, due: o.total - commission }
  })
  const total = rows.reduce((s, r) => s + r.total, 0)
  const commission = rows.reduce((s, r) => s + r.commission, 0)
  const due = total - commission
  const commissionShare = commission / total

  return (
    <div className="flex h-full flex-col gap-4 p-5 sm:p-6">
      <PaneHeader title={c.ui.generalTotal} subtitle={c.ui.partnerOffices} />

      <Panel className="p-4">
        <div className="num text-[30px] leading-tight font-bold text-ink">{money(total, c)}</div>
        <div className="mt-4 flex h-3 overflow-hidden rounded-full bg-zinc-100" dir={c.dir}>
          <div className="h-full bg-brand transition-[flex-grow] duration-[1200ms] ease-[var(--ease-out-soft)]" style={{ flexGrow: active ? 1 - commissionShare : 1, flexBasis: 0 }} />
          <div
            className="h-full bg-accent transition-[flex-grow] duration-[1200ms] ease-[var(--ease-out-soft)]"
            style={{ flexGrow: active ? commissionShare : 0, flexBasis: 0 }}
          />
        </div>
        <div className="mt-4 grid grid-cols-2 gap-3">
          <Split color="bg-brand" label={c.ui.partnerDue} value={money(due, c)} />
          <Split color="bg-accent" label={c.ui.operatorCommission} value={money(commission, c)} />
        </div>
      </Panel>

      <Panel className="overflow-hidden">
        <table className="w-full text-[13px]">
          <thead className="bg-sunken text-[12px] text-muted">
            <tr>
              <th className="px-3.5 py-2.5 text-start font-medium">{c.ui.office}</th>
              <th className="px-2 py-2.5 text-start font-medium">{c.ui.commissionRate}</th>
              <th className="px-3.5 py-2.5 text-end font-medium">{c.ui.partnerDue}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {rows.map((r, i) => (
              <tr
                key={r.name}
                className={cn('transition-opacity duration-700', active ? 'opacity-100' : 'opacity-40')}
                style={{ transitionDelay: `${300 + i * 140}ms` }}
              >
                <td className="truncate px-3.5 py-2.5 font-medium text-ink">{r.name}</td>
                <td className="num px-2 py-2.5 text-ink-soft">{Math.round(r.rate * 100)}%</td>
                <td className="num px-3.5 py-2.5 text-end font-semibold text-ink">{money(r.due, c)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Panel>
    </div>
  )
}

function Split({ color, label, value }: { color: string; label: string; value: string }) {
  return (
    <div className="min-w-0">
      <div className="flex items-center gap-1.5 text-[12px] text-muted">
        <span className={cn('size-2 rounded-full', color)} />
        {label}
      </div>
      <div className="num truncate text-[15px] font-bold text-ink">{value}</div>
    </div>
  )
}
