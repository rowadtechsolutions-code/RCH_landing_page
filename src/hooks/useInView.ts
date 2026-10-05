import { useEffect, useState, type RefObject } from 'react'

type Callback = (entry: IntersectionObserverEntry) => void

/** One shared observer for every reveal on the page. */
const callbacks = new WeakMap<Element, Callback>()
let observer: IntersectionObserver | null = null

function getObserver(): IntersectionObserver {
  observer ??= new IntersectionObserver(
    (entries) => entries.forEach((entry) => callbacks.get(entry.target)?.(entry)),
    { rootMargin: '0px 0px -12% 0px', threshold: 0.01 },
  )
  return observer
}

/** True once the element has entered the viewport (stays true: reveals play once). */
export function useInView(ref: RefObject<Element | null>): boolean {
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el || inView) return
    const obs = getObserver()
    callbacks.set(el, (entry) => {
      if (!entry.isIntersecting) return
      setInView(true)
      obs.unobserve(el)
      callbacks.delete(el)
    })
    obs.observe(el)
    return () => {
      obs.unobserve(el)
      callbacks.delete(el)
    }
  }, [ref, inView])

  return inView
}
