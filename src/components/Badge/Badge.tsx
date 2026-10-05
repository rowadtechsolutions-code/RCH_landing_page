import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

/** Same tones as the product's status badges, so statuses read identically on the site and in the app. */
export type Tone = 'green' | 'blue' | 'amber' | 'violet' | 'gray' | 'red'

const tones: Record<Tone, { box: string; dot: string }> = {
  green: { box: 'bg-emerald-50 text-emerald-800 ring-emerald-600/15', dot: 'bg-emerald-500' },
  blue: { box: 'bg-sky-50 text-sky-800 ring-sky-600/15', dot: 'bg-sky-500' },
  amber: { box: 'bg-amber-50 text-amber-800 ring-amber-600/20', dot: 'bg-amber-500' },
  violet: { box: 'bg-violet-50 text-violet-800 ring-violet-600/15', dot: 'bg-violet-500' },
  gray: { box: 'bg-zinc-100 text-zinc-700 ring-zinc-500/15', dot: 'bg-zinc-400' },
  red: { box: 'bg-rose-50 text-rose-800 ring-rose-600/15', dot: 'bg-rose-500' },
}

export const vehicleTone = { available: 'green', rented: 'blue', maintenance: 'amber', inactive: 'gray' } as const satisfies Record<string, Tone>
export type VehicleStatus = keyof typeof vehicleTone

export function Badge({ tone = 'gray', children, className }: { tone?: Tone; children: ReactNode; className?: string }) {
  return (
    <span className={cn('inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-xs font-medium whitespace-nowrap ring-1 ring-inset', tones[tone].box, className)}>
      <span className={cn('size-1.5 rounded-full', tones[tone].dot)} aria-hidden />
      {children}
    </span>
  )
}

/** Solid colour per vehicle status, for bars and dots. */
export const vehicleBar: Record<VehicleStatus, string> = { available: 'bg-emerald-500', rented: 'bg-sky-500', maintenance: 'bg-amber-500', inactive: 'bg-zinc-300' }
