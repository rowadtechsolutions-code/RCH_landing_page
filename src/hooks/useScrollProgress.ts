import { useEffect, useRef, type RefObject } from 'react'
import { clamp01, subscribeScroll } from '@/lib/scrollLoop'

/**
 * - `sticky`: 0 when the section's top reaches the viewport top, 1 when its bottom reaches the viewport bottom
 *   (the range during which a sticky child is pinned).
 * - `pass`: 0 when the section's top enters from below, 1 when its bottom leaves at the top.
 * - `enter`: 0 when the top enters from below, 1 when the top reaches the viewport top.
 */
export type ProgressMode = 'sticky' | 'pass' | 'enter'

function measure(el: HTMLElement, mode: ProgressMode): number {
  const rect = el.getBoundingClientRect()
  const vh = window.innerHeight
  if (mode === 'sticky') return clamp01(-rect.top / Math.max(1, rect.height - vh))
  if (mode === 'enter') return clamp01((vh - rect.top) / vh)
  return clamp01((vh - rect.top) / (rect.height + vh))
}

/**
 * Writes the section's scroll progress to the `--p` custom property (no React re-render) and optionally reports it.
 * Disabled when `enabled` is false — e.g. on phones or under reduced motion — leaving `--p` at its CSS default.
 */
export function useScrollProgress(
  ref: RefObject<HTMLElement | null>,
  { mode = 'pass', enabled = true, onProgress }: { mode?: ProgressMode; enabled?: boolean; onProgress?: (p: number) => void } = {},
) {
  const callback = useRef(onProgress)
  callback.current = onProgress

  useEffect(() => {
    const el = ref.current
    if (!el || !enabled) return
    let last = -1
    const unsubscribe = subscribeScroll(() => {
      const p = measure(el, mode)
      if (Math.abs(p - last) < 0.0005) return
      last = p
      el.style.setProperty('--p', p.toFixed(4))
      callback.current?.(p)
    })
    return () => {
      unsubscribe()
      el.style.removeProperty('--p')
    }
  }, [ref, mode, enabled])
}
