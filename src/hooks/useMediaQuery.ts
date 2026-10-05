import { useSyncExternalStore } from 'react'

export function useMediaQuery(query: string): boolean {
  return useSyncExternalStore(
    (notify) => {
      const mql = window.matchMedia(query)
      mql.addEventListener('change', notify)
      return () => mql.removeEventListener('change', notify)
    },
    () => window.matchMedia(query).matches,
    () => false,
  )
}

export const useReducedMotion = () => useMediaQuery('(prefers-reduced-motion: reduce)')

/** Desktop storytelling (sticky, scroll-linked) is reserved for wide screens with motion allowed. */
export function useCinematic(): boolean {
  const wide = useMediaQuery('(min-width: 1024px)')
  const reduced = useReducedMotion()
  return wide && !reduced
}
