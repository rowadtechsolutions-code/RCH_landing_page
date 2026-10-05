import { BarChart3, Building2, CarFront, FileText, LayoutGrid, Settings } from 'lucide-react'
import { BrandMark } from '@/components/Brand/Brand'
import { Badge, vehicleBar, vehicleTone, type VehicleStatus } from '@/components/Badge/Badge'
import { useLocale } from '@/i18n/LocaleProvider'
import { cn } from '@/lib/cn'
import { money } from '@/lib/format'
import { MAIN_CONTRACT, OTHER_CONTRACTS } from '@/content/sampleNumbers'

/** Design size used by ScaledStage. */
export const DASHBOARD_SIZE = { width: 1180, height: 680 } as const

const NAV_ICONS = [LayoutGrid, Building2, CarFront, FileText, BarChart3, Settings]

/** Sample fleet composition for the overview (labelled as sample data by the frame). */
const FLEET: Record<VehicleStatus, number> = { available: 9, rented: 13, maintenance: 2, inactive: 1 }

/**
 * The overview screen of the app, recomposed: sidebar with the real navigation, the real page title and
 * key-number tiles, fleet status and current rentals.
 */
export function DashboardMock() {
  const { c } = useLocale()
  const total = Object.values(FLEET).reduce((a, b) => a + b, 0)
  const tiles = [
    { label: c.ui.totalVehicles, value: total },
    { label: c.ui.availableVehicles, value: FLEET.available, tone: 'text-emerald-600' },
    { label: c.ui.rentedVehicles, value: FLEET.rented, tone: 'text-sky-600' },
    { label: c.ui.activeRentals, value: FLEET.rented, tone: 'text-brand' },
  ]
  const rentals = [
    { r: 0, v: 0, badge: <Badge tone="blue">{c.ui.endsIn}</Badge>, amount: MAIN_CONTRACT.total },
    { r: 2, v: 3, badge: <Badge tone="violet">{c.ui.rentalStatus.open}</Badge>, amount: OTHER_CONTRACTS.open },
    { r: 4, v: 1, badge: <Badge tone="red">{c.ui.rentalStatus.overdue}</Badge>, amount: OTHER_CONTRACTS.overdue },
  ]

  return (
    <div className="flex h-full bg-canvas text-ink">
      <aside className="flex w-[220px] shrink-0 flex-col gap-1 border-line bg-surface p-4 ltr:border-r rtl:border-l">
        <BrandMark className="mb-6 h-9 self-start" decorative />
        {c.ui.nav.map((label, i) => {
          const Icon = NAV_ICONS[i]
          return (
            <div key={label} className={cn('flex h-10 items-center gap-2.5 rounded-lg px-3 text-[14px]', i === 0 ? 'bg-brand/[0.08] font-semibold text-brand' : 'text-ink-soft')}>
              <Icon className="size-[18px]" strokeWidth={1.9} />
              {label}
            </div>
          )
        })}
      </aside>

      <div className="flex min-w-0 flex-1 flex-col gap-5 p-7">
        <div>
          <div className="text-[24px] leading-9 font-bold">{c.ui.dashboardTitle}</div>
          <div className="text-[14px] text-muted">{c.ui.dashboardSubtitle}</div>
        </div>

        <div className="grid grid-cols-4 gap-4">
          {tiles.map((t) => (
            <div key={t.label} className="rounded-xl bg-surface p-4 ring-1 ring-line">
              <div className="text-[13px] text-muted">{t.label}</div>
              <div className={cn('num mt-1 text-[30px] leading-tight font-bold', t.tone)}>{t.value}</div>
            </div>
          ))}
        </div>

        <div className="grid min-h-0 flex-1 grid-cols-[1fr_1.5fr] gap-4">
          <div className="rounded-xl bg-surface p-5 ring-1 ring-line">
            <div className="mb-4 text-[15px] font-semibold">{c.ui.fleetStatus}</div>
            <div className="flex h-3 gap-1 overflow-hidden rounded-full" dir="ltr">
              {(Object.keys(FLEET) as VehicleStatus[]).map((s) => (
                <div key={s} className={cn('rounded-full', vehicleBar[s])} style={{ flexGrow: FLEET[s], flexBasis: 0 }} />
              ))}
            </div>
            <ul className="mt-5 flex flex-col gap-3">
              {(Object.keys(FLEET) as VehicleStatus[]).map((s) => (
                <li key={s} className="flex items-center justify-between text-[14px]">
                  <Badge tone={vehicleTone[s]}>{c.ui.vehicleStatus[s]}</Badge>
                  <span className="num font-semibold">{FLEET[s]}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-xl bg-surface p-5 ring-1 ring-line">
            <div className="mb-3 text-[15px] font-semibold">{c.ui.currentRentals}</div>
            <ul className="divide-y divide-line">
              {rentals.map((row) => (
                <li key={row.r} className="flex items-center gap-3 py-3">
                  <span className="flex size-9 items-center justify-center rounded-lg bg-zinc-100 text-ink-soft">
                    <CarFront className="size-[18px]" strokeWidth={1.8} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-[14px] font-semibold">{c.sample.renters[row.r]}</div>
                    <div className="truncate text-[12.5px] text-muted">{c.sample.vehicles[row.v].name}</div>
                  </div>
                  {row.badge}
                  <span className="num w-[110px] text-end text-[14px] font-semibold">{money(row.amount, c)}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

