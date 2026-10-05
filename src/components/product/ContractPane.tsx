import type { ReactNode } from 'react'
import { AlertCircle, CalendarDays, Infinity as InfinityIcon } from 'lucide-react'
import { Badge } from '@/components/Badge/Badge'
import { useLocale } from '@/i18n/LocaleProvider'
import { cn } from '@/lib/cn'
import { money } from '@/lib/format'
import { Field, PaneHeader, Panel } from './parts'
import { MAIN_CONTRACT } from '@/content/sampleNumbers'

/**
 * A fixed-term contract, an open contract, and a new rental the system refuses because its dates overlap
 * (the conflict message is the app's own wording).
 */
export function ContractPane({ active }: { active: boolean }) {
  const { c } = useLocale()
  const [camry, , , sportage] = c.sample.vehicles
  const [salem, , khalid] = c.sample.renters

  return (
    <div className="flex h-full flex-col gap-4 p-5 sm:p-6">
      <PaneHeader title={`${c.ui.rentalTitle} #1042`} subtitle={camry.office} aside={<Badge tone="blue">{c.ui.rentalStatus.active}</Badge>} />

      <Panel className="grid grid-cols-2 gap-x-4 gap-y-3 p-4 sm:grid-cols-3">
        <Field label={c.ui.renter} value={salem} />
        <Field label={c.ui.vehicle} value={camry.name} />
        <Field label={c.ui.days} value={<span className="num">{MAIN_CONTRACT.days}</span>} />
        <Field label={c.ui.from} value={<span className="num ltr">{c.sample.dates.start}</span>} />
        <Field label={c.ui.to} value={<span className="num ltr">{c.sample.dates.end}</span>} />
        <Field label={c.ui.contractValue} value={<span className="num">{money(MAIN_CONTRACT.original, c)}</span>} valueClassName="text-brand" />
      </Panel>

      <Panel className="flex items-center gap-3 p-4">
        <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-violet-50 text-violet-700">
          <InfinityIcon className="size-[18px]" strokeWidth={2} />
        </span>
        <div className="min-w-0 flex-1">
          <div className="truncate text-[14px] leading-6 font-semibold text-ink">
            {c.ui.openContract} · {sportage.name}
          </div>
          <div className="truncate text-[12px] leading-5 text-muted">
            {khalid} — {c.ui.openContractNoEnd}
          </div>
        </div>
        <Badge tone="violet">{c.ui.rentalStatus.open}</Badge>
      </Panel>

      <Panel className="p-4">
        <div className="mb-3 text-[13px] font-semibold text-ink">{c.ui.newRental}</div>
        <div className="grid grid-cols-[1.4fr_1fr_1fr] gap-2">
          <FakeInput>{camry.name}</FakeInput>
          <FakeInput invalid={active}>
            <CalendarDays className="size-3.5 shrink-0 text-muted" />
            <span className="num ltr">14/10</span>
          </FakeInput>
          <FakeInput invalid={active}>
            <CalendarDays className="size-3.5 shrink-0 text-muted" />
            <span className="num ltr">16/10</span>
          </FakeInput>
        </div>
        <div
          className={cn(
            'grid transition-[grid-template-rows,opacity] duration-500 ease-[var(--ease-out-soft)]',
            active ? 'mt-3 grid-rows-[1fr] opacity-100 delay-500' : 'grid-rows-[0fr] opacity-0',
          )}
        >
          <div className="overflow-hidden">
            <div className="flex items-start gap-2 rounded-lg bg-rose-50 px-3 py-2.5 text-[12.5px] leading-6 text-rose-800 ring-1 ring-rose-600/15">
              <AlertCircle className="mt-1 size-4 shrink-0" strokeWidth={2} />
              <span>{c.ui.conflict}</span>
            </div>
          </div>
        </div>
      </Panel>
    </div>
  )
}

function FakeInput({ children, invalid = false }: { children: ReactNode; invalid?: boolean }) {
  return (
    <div
      className={cn(
        'flex h-10 min-w-0 items-center gap-1.5 truncate rounded-lg bg-surface px-3 text-[13px] text-ink ring-1 transition-shadow duration-500',
        invalid ? 'ring-rose-400 shadow-[0_0_0_3px_rgb(244_63_94/0.12)]' : 'ring-line-strong',
      )}
    >
      {children}
    </div>
  )
}
