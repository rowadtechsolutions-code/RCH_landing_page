import { CarFront, RefreshCw } from 'lucide-react'
import { Badge, vehicleBar, vehicleTone, type VehicleStatus } from '@/components/Badge/Badge'
import { useLocale } from '@/i18n/LocaleProvider'
import { cn } from '@/lib/cn'
import { PaneHeader } from './parts'

const ORDER: VehicleStatus[] = ['available', 'rented', 'maintenance', 'inactive']
/** The vehicle that receives a new contract while the pane is on screen. */
const FLIPPING = 1

/**
 * Vehicles list. When active, one available vehicle gets a contract and its status flips to "rented" by itself —
 * the point of the chapter: status follows contracts.
 */
export function FleetPane({ active }: { active: boolean }) {
  const { c } = useLocale()
  const vehicles = c.sample.vehicles.map((v, i) => ({ ...v, status: (active && i === FLIPPING ? 'rented' : v.status) as VehicleStatus }))
  const counts = ORDER.map((s) => ({ s, n: vehicles.filter((v) => v.status === s).length }))

  return (
    <div className="flex h-full flex-col gap-4 p-5 sm:p-6">
      <PaneHeader
        title={c.ui.vehicles}
        subtitle={c.ui.fleetStatus}
        aside={
          <span
            className={cn(
              'inline-flex items-center gap-1.5 rounded-full bg-sky-50 px-2.5 py-1 text-[12px] font-medium text-sky-800 ring-1 ring-sky-600/15 transition-opacity duration-500',
              active ? 'opacity-100 delay-700' : 'opacity-0',
            )}
          >
            <RefreshCw className={cn('size-3.5', active && 'animate-[spin_1.2s_ease-in-out_1]')} strokeWidth={2.2} />
            {c.ui.autoUpdated}
          </span>
        }
      />

      <div className="flex h-2.5 gap-1 overflow-hidden rounded-full" dir="ltr">
        {counts.map(({ s, n }) => (
          <div key={s} className={cn('rounded-full transition-[flex-grow] duration-700 ease-[var(--ease-out-soft)]', vehicleBar[s])} style={{ flexGrow: n, flexBasis: 0 }} />
        ))}
      </div>
      <div className="flex flex-wrap gap-x-4 gap-y-1.5">
        {counts.map(({ s, n }) => (
          <span key={s} className="inline-flex items-center gap-1.5 text-[12.5px] text-ink-soft">
            <span className={cn('size-2 rounded-full', vehicleBar[s])} />
            {c.ui.vehicleStatus[s]}
            <span className="num font-semibold text-ink">{n}</span>
          </span>
        ))}
      </div>

      <ul className="flex flex-col divide-y divide-line overflow-hidden rounded-xl bg-surface ring-1 ring-line">
        {vehicles.map((v, i) => (
          <li key={v.plate} className={cn('flex items-center gap-3 px-3.5 py-3 transition-colors duration-700', active && i === FLIPPING && 'bg-sky-50/60')}>
            <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-zinc-100 text-ink-soft">
              <CarFront className="size-[18px]" strokeWidth={1.8} />
            </span>
            <div className="min-w-0 flex-1">
              <div className="truncate text-[14px] leading-6 font-semibold text-ink">{v.name}</div>
              <div className="truncate text-[12px] leading-5 text-muted">
                <span className="ltr num">{v.plate}</span> · {v.office}
              </div>
            </div>
            <Badge tone={vehicleTone[v.status]}>{c.ui.vehicleStatus[v.status]}</Badge>
          </li>
        ))}
      </ul>
    </div>
  )
}
