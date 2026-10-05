import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { ar, type Content } from '@/content/ar'
import { en } from '@/content/en'

type Locale = 'ar' | 'en'

const STORAGE_KEY = 'rch-site:locale'
const dictionaries: Record<Locale, Content> = { ar, en }

interface LocaleContextValue {
  c: Content
  locale: Locale
  setLocale: (locale: Locale) => void
}

const LocaleContext = createContext<LocaleContextValue | null>(null)

function readStoredLocale(): Locale {
  try {
    return localStorage.getItem(STORAGE_KEY) === 'en' ? 'en' : 'ar'
  } catch {
    return 'ar'
  }
}

/** Arabic first. The choice is remembered per browser; the document's lang/dir/title follow it. */
export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(readStoredLocale)
  const c = dictionaries[locale]

  useEffect(() => {
    const root = document.documentElement
    root.lang = c.locale
    root.dir = c.dir
    document.title = c.meta.title
    document.querySelector('meta[name="description"]')?.setAttribute('content', c.meta.description)
  }, [c])

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next)
    try {
      localStorage.setItem(STORAGE_KEY, next)
    } catch {
      /* storage unavailable: the switch still applies for this visit */
    }
  }, [])

  const value = useMemo(() => ({ c, locale, setLocale }), [c, locale, setLocale])
  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
}

export function useLocale(): LocaleContextValue {
  const ctx = useContext(LocaleContext)
  if (!ctx) throw new Error('useLocale must be used inside LocaleProvider')
  return ctx
}
