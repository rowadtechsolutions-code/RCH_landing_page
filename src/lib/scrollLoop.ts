/**
 * One passive scroll/resize listener for the whole page, batched into a single requestAnimationFrame.
 * Sections subscribe instead of each attaching their own listener, so a frame does at most one read pass.
 */
type Listener = () => void

const listeners = new Set<Listener>()
let frame = 0

function flush() {
  frame = 0
  listeners.forEach((fn) => fn())
}

function schedule() {
  if (!frame) frame = requestAnimationFrame(flush)
}

export function subscribeScroll(fn: Listener): () => void {
  if (listeners.size === 0) {
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule, { passive: true })
  }
  listeners.add(fn)
  schedule()
  return () => {
    listeners.delete(fn)
    if (listeners.size === 0) {
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
      cancelAnimationFrame(frame)
      frame = 0
    }
  }
}

export const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v)
