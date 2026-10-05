import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

/** Building blocks shared by the product fragments, styled like the RCH app's own surfaces. */

export function PaneHeader({ title, subtitle, aside }: { title: string; subtitle?: string; aside?: ReactNode }) {
  return (
    <div className="flex items-start justify-between gap-3">
      <div className="min-w-0">
        <div className="text-[17px] leading-7 font-bold text-ink">{title}</div>
        {subtitle && <div className="text-[13px] leading-6 text-muted">{subtitle}</div>}
      </div>
      {aside}
    </div>
  )
}

export function Panel({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn('rounded-xl bg-surface ring-1 ring-line', className)}>{children}</div>
}

export function Field({ label, value, className, valueClassName }: { label: string; value: ReactNode; className?: string; valueClassName?: string }) {
  return (
    <div className={cn('min-w-0', className)}>
      <div className="text-[12px] leading-5 text-muted">{label}</div>
      <div className={cn('truncate text-[14px] leading-6 font-semibold text-ink', valueClassName)}>{value}</div>
    </div>
  )
}

/** Thin progress bar; the fill grows when `active` (CSS transition on transform). */
export function Meter({ value, active, className, fillClassName }: { value: number; active: boolean; className?: string; fillClassName?: string }) {
  return (
    <div className={cn('h-2 overflow-hidden rounded-full bg-zinc-100', className)}>
      <div
        className={cn('h-full rounded-full bg-brand transition-transform duration-[1200ms] ease-[var(--ease-out-soft)] ltr:origin-left rtl:origin-right', fillClassName)}
        style={{ transform: `scaleX(${active ? value : 0.04})` }}
      />
    </div>
  )
}
