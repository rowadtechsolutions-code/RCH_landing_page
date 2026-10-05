import { useRef } from 'react'
import { useInView } from '@/hooks/useInView'
import { cn } from '@/lib/cn'

/**
 * The roof line from the RCH logo, used as the site's connecting thread between sections.
 * It draws itself once when it enters the viewport.
 */
export function FlowLine({ className, tone = 'light' }: { className?: string; tone?: 'light' | 'dark' }) {
  const ref = useRef<SVGSVGElement>(null)
  const inView = useInView(ref)
  const stroke = tone === 'dark' ? 'rgb(255 255 255 / 0.16)' : 'rgb(37 99 235 / 0.22)'
  return (
    <svg ref={ref} viewBox="0 0 1200 160" fill="none" preserveAspectRatio="none" aria-hidden className={cn('pointer-events-none block w-full', className)}>
      <path
        d="M0 128C150 128 260 118 360 92C470 62 560 22 700 22C840 22 930 70 1010 98C1080 122 1140 128 1200 128"
        stroke={stroke}
        strokeWidth="2"
        strokeLinecap="round"
        pathLength={1}
        strokeDasharray="1"
        strokeDashoffset={inView ? 0 : 1}
        style={{ transition: 'stroke-dashoffset 2.2s var(--ease-out-soft)' }}
      />
      <path
        d="M560 46C620 30 660 24 700 22C760 20 810 30 860 46"
        stroke="var(--color-accent)"
        strokeWidth="3"
        strokeLinecap="round"
        pathLength={1}
        strokeDasharray="1"
        strokeDashoffset={inView ? 0 : 1}
        style={{ transition: 'stroke-dashoffset 1.4s var(--ease-out-soft) 0.9s' }}
      />
    </svg>
  )
}
