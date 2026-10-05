import { CarFront } from 'lucide-react'
import { Badge } from '@/components/Badge/Badge'
import { BrandMark } from '@/components/Brand/Brand'
import { useLocale } from '@/i18n/LocaleProvider'
import { money } from '@/lib/format'
import { MAIN_CONTRACT } from '@/content/sampleNumbers'

/** The answer to the scattered scraps: the same contract as one RCH record — vehicle, renter, status, payment, office due. */
export function UnifiedRecord() {
  const { c } = useLocale()
  const [camry] = c.sample.vehicles
  const [salem] = c.sample.renters
  const items = [
    { label: c.ui.contractValue, value: money(MAIN_CONTRACT.total, c) },
    { label: c.ui.paid, value: money(MAIN_CONTRACT.paid, c) },
    { label: c.ui.partnerDue, value: money(MAIN_CONTRACT.total * (1 - MAIN_CONTRACT.commissionRate), c), strong: true },
  ]

  return (
    <div className="w-full max-w-[680px] rounded-[22px] bg-surface p-2 shadow-[var(--shadow-float)] ring-1 ring-black/[0.06]" role="img" aria-label={`${c.problem.unifiedLabel} — ${c.ui.sampleData}`}>
      <div className="flex items-center justify-between gap-3 px-3 pt-2 pb-3" aria-hidden>
        <div className="flex items-center gap-2.5">
          <BrandMark className="h-6" decorative />
          <span className="text-[13px] font-semibold text-ink-soft">{c.problem.unifiedLabel}</span>
        </div>
        <span className="rounded-full bg-amber-50 px-2 py-0.5 text-[10.5px] font-medium text-amber-800 ring-1 ring-amber-600/15">{c.ui.sampleData}</span>
      </div>
      <div className="rounded-2xl bg-sunken p-4 ring-1 ring-line sm:p-5" aria-hidden>
        <div className="flex items-center gap-3">
          <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-brand/10 text-brand">
            <CarFront className="size-5" strokeWidth={1.8} />
          </span>
          <div className="min-w-0 flex-1">
            <div className="truncate text-[15px] leading-6 font-bold text-ink">{camry.name}</div>
            <div className="truncate text-[13px] text-muted">
              {salem} · <span className="num ltr">{camry.plate}</span>
            </div>
          </div>
          <Badge tone="blue">{c.ui.rentalStatus.active}</Badge>
        </div>
        <div className="mt-4 grid grid-cols-3 gap-2 border-t border-line pt-4">
          {items.map((it) => (
            <div key={it.label} className="min-w-0">
              <div className="truncate text-[12px] text-muted">{it.label}</div>
              <div className={`num truncate text-[14px] font-bold sm:text-[15px] ${it.strong ? 'text-brand' : 'text-ink'}`}>{it.value}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
