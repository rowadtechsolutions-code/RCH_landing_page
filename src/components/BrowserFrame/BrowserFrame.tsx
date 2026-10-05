import type { ReactNode } from 'react'
import { Lock } from 'lucide-react'
import { useLocale } from '@/i18n/LocaleProvider'
import { cn } from '@/lib/cn'

interface BrowserFrameProps {
  children: ReactNode
  className?: string
  /** Dark chrome for frames sitting on the night stage. */
  tone?: 'light' | 'dark'
  /** Accessible description of what the frame shows. */
  label?: string
}

/**
 * A quiet desktop-browser frame for product fragments. Every frame carries the "sample data" caption,
 * so illustrative numbers are never read as real figures.
 */
export function BrowserFrame({ children, className, tone = 'light', label }: BrowserFrameProps) {
  const { c } = useLocale()
  const dark = tone === 'dark'
  return (
    <figure
      role="img"
      aria-label={label ? `${label} — ${c.ui.sampleData}` : c.ui.sampleData}
      className={cn(
        'relative overflow-hidden rounded-[18px] ring-1',
        dark ? 'bg-night-2 ring-white/10' : 'bg-surface ring-black/[0.07]',
        'shadow-[var(--shadow-float)]',
        className,
      )}
    >
      <div className={cn('flex h-10 items-center gap-3 border-b px-4', dark ? 'border-white/[0.07] bg-white/[0.03]' : 'border-line bg-sunken')} aria-hidden>
        <div className="flex gap-1.5" dir="ltr">
          <span className="size-2.5 rounded-full bg-[#ff5f57]/80" />
          <span className="size-2.5 rounded-full bg-[#febc2e]/80" />
          <span className="size-2.5 rounded-full bg-[#28c840]/80" />
        </div>
        <div
          className={cn(
            'mx-auto flex h-6 min-w-0 items-center gap-1.5 rounded-md px-3 text-[11px] font-medium',
            dark ? 'bg-white/[0.06] text-white/55' : 'bg-white text-muted ring-1 ring-line',
          )}
        >
          <Lock className="size-3" strokeWidth={2.2} />
          <span className="truncate">{c.brand.name} · {c.brand.fullName}</span>
        </div>
        <span
          className={cn(
            'shrink-0 rounded-full px-2 py-0.5 text-[10.5px] font-medium',
            dark ? 'bg-accent/15 text-accent' : 'bg-amber-50 text-amber-800 ring-1 ring-amber-600/15',
          )}
        >
          {c.ui.sampleData}
        </span>
      </div>
      <div aria-hidden className="relative">{children}</div>
    </figure>
  )
}
