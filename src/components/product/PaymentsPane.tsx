import { CalendarClock, CheckCircle2, Plus } from 'lucide-react'
import { Badge } from '@/components/Badge/Badge'
import { useLocale } from '@/i18n/LocaleProvider'
import { cn } from '@/lib/cn'
import { money } from '@/lib/format'
import { Meter, PaneHeader, Panel } from './parts'
import { MAIN_CONTRACT } from '@/content/sampleNumbers'

const { original: ORIGINAL, extensions: EXTENSIONS, total: TOTAL, paid: PAID, lastPayment } = MAIN_CONTRACT

/** Extension history of one contract and its payment progress (paid vs. remaining). */
export function PaymentsPane({ active }: { active: boolean }) {
  const { c } = useLocale()
  const [camry] = c.sample.vehicles
  const [salem] = c.sample.renters
  const steps = [
    { label: c.ui.originalAmount, meta: `${c.ui.from} ${c.sample.dates.start} ${c.ui.to} ${c.sample.dates.end}`, amount: ORIGINAL, plus: false },
    { label: c.ui.extensionFirst, meta: c.sample.dates.ext1, amount: EXTENSIONS[0], plus: true },
    { label: c.ui.extensionSecond, meta: c.sample.dates.ext2, amount: EXTENSIONS[1], plus: true },
  ]

  return (
    <div className="relative flex h-full flex-col gap-4 p-5 sm:p-6">
      <PaneHeader
        title={c.ui.extensionsTitle}
        subtitle={`${salem} · ${camry.name}`}
        aside={
          <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-2.5 py-1 text-[12px] font-medium text-amber-800 ring-1 ring-amber-600/20">
            <CalendarClock className="size-3.5" strokeWidth={2.2} />
            {c.ui.endsIn}
          </span>
        }
      />

      <Panel className="p-2">
        <ol className="relative">
          {steps.map((s, i) => (
            <li
              key={s.label}
              className={cn(
                'flex items-center gap-3 rounded-lg px-2.5 py-2.5 transition-[opacity,transform] duration-700 ease-[var(--ease-out-soft)]',
                active || i === 0 ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0',
              )}
              style={{ transitionDelay: `${i * 160}ms` }}
            >
              <span className={cn('flex size-8 shrink-0 items-center justify-center rounded-full text-[12px] font-bold', s.plus ? 'bg-accent/15 text-amber-700' : 'bg-brand/10 text-brand')}>
                {s.plus ? <Plus className="size-4" strokeWidth={2.4} /> : '1'}
              </span>
              <div className="min-w-0 flex-1">
                <div className="truncate text-[14px] leading-6 font-semibold text-ink">{s.label}</div>
                <div className="truncate text-[12px] leading-5 text-muted ltr:text-left">
                  <span className="num">{s.meta}</span>
                </div>
              </div>
              <span className="num shrink-0 text-[14px] font-semibold text-ink">
                {s.plus ? '+' : ''}
                {money(s.amount, c)}
              </span>
            </li>
          ))}
        </ol>
        <div className="mx-2.5 mt-1 flex items-center justify-between border-t border-dashed border-line-strong px-0 pt-3 pb-1.5">
          <span className="text-[13px] font-semibold text-ink-soft">{c.ui.amountAfterExtension}</span>
          <span className="num text-[16px] font-bold text-brand">{money(TOTAL, c)}</span>
        </div>
      </Panel>

      <Panel className="p-4">
        <div className="mb-2.5 flex items-center justify-between">
          <span className="text-[13px] font-semibold text-ink">{c.ui.payment}</span>
          <Badge tone="blue">{c.ui.rentalStatus.active}</Badge>
        </div>
        <Meter value={PAID / TOTAL} active={active} />
        <div className="mt-3 grid grid-cols-2 gap-3">
          <div>
            <div className="text-[12px] text-muted">{c.ui.paid}</div>
            <div className="num text-[15px] font-bold text-ink">{money(PAID, c)}</div>
          </div>
          <div>
            <div className="text-[12px] text-muted">{c.ui.remaining}</div>
            <div className="num text-[15px] font-bold text-amber-700">{money(TOTAL - PAID, c)}</div>
          </div>
        </div>
      </Panel>

      <div
        className={cn(
          'absolute bottom-5 flex items-center gap-2 rounded-xl bg-night px-3.5 py-2.5 text-[13px] font-medium text-white shadow-[var(--shadow-float)] transition-[opacity,transform] duration-700 ease-[var(--ease-out-soft)] end-5',
          active ? 'translate-y-0 opacity-100 delay-1000' : 'translate-y-3 opacity-0',
        )}
      >
        <CheckCircle2 className="size-4 text-emerald-400" strokeWidth={2.2} />
        {c.ui.paymentRecorded}
        <span className="num text-white/70">+{money(lastPayment, c)}</span>
      </div>
    </div>
  )
}
