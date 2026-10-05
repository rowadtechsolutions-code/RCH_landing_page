import type { CSSProperties } from 'react'
import { CarFront } from 'lucide-react'
import { useLocale } from '@/i18n/LocaleProvider'
import { cn } from '@/lib/cn'

/** Grid metrics of the timeline, in CSS pixels. */
const DAY = 46
const DAYS = 28
const LABEL_COL = 210
const TODAY = 17

type Kind = 'completed' | 'active' | 'open' | 'extension' | 'overdue'

interface Bar {
  start: number
  len: number
  kind: Kind
  renter?: number
}

/** Sample contracts per vehicle (index into sample.vehicles). No two bars of one vehicle overlap — as in the product. */
const ROWS: { vehicle: number; bars: Bar[] }[] = [
  { vehicle: 0, bars: [{ start: 1, len: 5, kind: 'completed', renter: 3 }, { start: 8, len: 6, kind: 'active', renter: 0 }, { start: 14, len: 3, kind: 'extension' }, { start: 17, len: 2, kind: 'extension' }] },
  { vehicle: 1, bars: [{ start: 2, len: 5, kind: 'completed', renter: 1 }, { start: 19, len: 6, kind: 'active', renter: 4 }] },
  { vehicle: 2, bars: [{ start: 1, len: 4, kind: 'completed', renter: 2 }, { start: 9, len: 6, kind: 'overdue', renter: 4 }] },
  { vehicle: 3, bars: [{ start: 3, len: 6, kind: 'completed', renter: 0 }, { start: 12, len: DAYS - 11, kind: 'open', renter: 2 }] },
  { vehicle: 4, bars: [{ start: 5, len: 4, kind: 'completed', renter: 3 }, { start: 21, len: 5, kind: 'active', renter: 1 }] },
]

const KIND_STYLE: Record<Kind, string> = {
  completed: 'bg-emerald-50 text-emerald-800 ring-emerald-600/20',
  active: 'bg-sky-500 text-white ring-sky-600/30',
  open: 'bg-violet-500 text-white ring-violet-600/30',
  extension: 'bg-accent text-amber-950 ring-amber-600/30',
  overdue: 'bg-rose-500 text-white ring-rose-600/30',
}

/** Overdue bars keep running past their end date up to today (dashed tail), which is what "overdue" means. */
export function FleetTimeline() {
  const { c } = useLocale()
  const width = LABEL_COL + DAY * DAYS

  return (
    <div className="relative bg-surface" style={{ width }} dir={c.dir}>
      {/* Day header */}
      <div className="flex h-11 border-b border-line text-[12px] text-muted">
        <div className="shrink-0 border-line ltr:border-r rtl:border-l" style={{ width: LABEL_COL }} />
        {Array.from({ length: DAYS }, (_, i) => (
          <div key={i} className="num flex shrink-0 items-center justify-center" style={{ width: DAY }}>
            {i + 1 === TODAY ? <span className="rounded-full bg-brand px-2 py-0.5 font-bold text-white">{i + 1}</span> : i + 1}
          </div>
        ))}
      </div>

      {ROWS.map((row) => {
        const v = c.sample.vehicles[row.vehicle]
        return (
          <div key={v.plate} className="relative flex h-[68px] border-b border-line last:border-b-0">
            <div className="flex shrink-0 items-center gap-2.5 border-line px-4 ltr:border-r rtl:border-l" style={{ width: LABEL_COL }}>
              <CarFront className="size-[18px] shrink-0 text-muted" strokeWidth={1.8} />
              <div className="min-w-0">
                <div className="truncate text-[13.5px] font-semibold text-ink">{v.name}</div>
                <div className="num ltr truncate text-[11.5px] text-muted">{v.plate}</div>
              </div>
            </div>
            <div className="relative flex-1 bg-[repeating-linear-gradient(to_right,transparent_0_45px,var(--color-line)_45px_46px)] opacity-100">
              {row.bars.map((b) => (
                <span
                  key={b.start}
                  className={cn(
                    'absolute top-1/2 flex h-9 -translate-y-1/2 items-center truncate rounded-lg px-2.5 text-[12px] font-semibold ring-1 ring-inset',
                    KIND_STYLE[b.kind],
                    b.kind === 'open' && 'ltr:rounded-r-none rtl:rounded-l-none',
                    b.kind === 'extension' && 'justify-center px-0',
                  )}
                  style={{ insetInlineStart: (b.start - 1) * DAY + 3, width: b.len * DAY - 6 } as CSSProperties}
                >
                  {b.kind === 'extension' ? '+' : b.renter !== undefined && c.sample.renters[b.renter]}
                </span>
              ))}
              {row.bars
                .filter((b) => b.kind === 'overdue')
                .map((b) => (
                  <span
                    key={`tail-${b.start}`}
                    className="absolute top-1/2 h-0 -translate-y-1/2 border-t-2 border-dashed border-rose-400"
                    style={{ insetInlineStart: (b.start - 1 + b.len) * DAY - 3, width: (TODAY - b.start - b.len) * DAY + DAY / 2 } as CSSProperties}
                  />
                ))}
            </div>
          </div>
        )
      })}

      {/* Today marker */}
      <div
        className="pointer-events-none absolute top-11 bottom-0 w-0.5 bg-brand/60"
        style={{ insetInlineStart: LABEL_COL + (TODAY - 0.5) * DAY - 1 } as CSSProperties}
        aria-hidden
      />
    </div>
  )
}
