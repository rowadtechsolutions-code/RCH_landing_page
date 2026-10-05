import { useLayoutEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react'
import { cn } from '@/lib/cn'

interface ScaledStageProps {
  /** Design size of the composition, in CSS pixels. */
  width: number
  height: number
  children: ReactNode
  className?: string
}

/**
 * Renders a composition at a fixed design size and scales it uniformly to the available width.
 * The UI keeps its exact proportions at every breakpoint (no reflow, no stretching) and stays crisp, since it is DOM.
 */
export function ScaledStage({ width, height, children, className }: ScaledStageProps) {
  const outer = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(1)

  useLayoutEffect(() => {
    const el = outer.current
    if (!el) return
    const update = () => setScale(Math.min(1, el.clientWidth / width))
    update()
    const ro = new ResizeObserver(update)
    ro.observe(el)
    return () => ro.disconnect()
  }, [width])

  return (
    <div ref={outer} className={cn('relative w-full', className)} style={{ height: height * scale }}>
      <div
        className="absolute top-0 origin-top-left ltr:left-0 rtl:right-0 rtl:origin-top-right"
        style={{ width, height, transform: `scale(${scale})` } as CSSProperties}
      >
        {children}
      </div>
    </div>
  )
}
