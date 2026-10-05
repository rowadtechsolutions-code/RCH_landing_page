import { useRef, type CSSProperties, type ElementType, type ReactNode } from 'react'
import { useInView } from '@/hooks/useInView'
import { cn } from '@/lib/cn'

type Variant = 'up' | 'fade' | 'scale'

interface RevealProps {
  as?: ElementType
  variant?: Variant
  /** Position in a stagger sequence (multiplied by --stagger). */
  index?: number
  className?: string
  children: ReactNode
}

/** Fades/slides its content in the first time it enters the viewport. */
export function Reveal({ as: Tag = 'div', variant = 'up', index = 0, className, children }: RevealProps) {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref)
  return (
    <Tag ref={ref} data-reveal={variant === 'up' ? '' : variant} className={cn(inView && 'is-in', className)} style={{ '--i': index } as CSSProperties}>
      {children}
    </Tag>
  )
}

interface RevealLinesProps {
  id?: string
  lines: readonly string[]
  as?: ElementType
  className?: string
  /** Index offset so a heading can continue a stagger started by an eyebrow. */
  start?: number
  /** Optional class for the last line (e.g. the brand-coloured half of a headline). */
  lastLineClassName?: string
}

/** A heading whose lines rise one after another from behind a mask. */
export function RevealLines({ id, lines, as: Tag = 'h2', className, start = 0, lastLineClassName }: RevealLinesProps) {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref)
  return (
    <Tag ref={ref} id={id} className={cn(className, inView && 'is-in')}>
      {lines.map((line, i) => (
        <span key={line} className="line-mask" style={{ '--i': start + i } as CSSProperties}>
          <span className={i === lines.length - 1 ? lastLineClassName : undefined}>{line}</span>
        </span>
      ))}
    </Tag>
  )
}
