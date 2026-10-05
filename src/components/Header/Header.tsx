import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { Globe, Menu, MessageCircle, Phone, X } from 'lucide-react'
import { BrandMark } from '@/components/Brand/Brand'
import { ButtonLink } from '@/components/Button/Button'
import { useLocale } from '@/i18n/LocaleProvider'
import { SUPPORT_PHONE, SUPPORT_PHONE_HREF, whatsappUrl } from '@/lib/contact'
import { cn } from '@/lib/cn'
import { subscribeScroll } from '@/lib/scrollLoop'

export const SECTION_IDS = { top: 'top', how: 'how', features: 'features', about: 'about' } as const

/**
 * Floating header: transparent over the hero, a condensed dark glass bar once the page scrolls,
 * tucked away while scrolling down and back on scroll up.
 */
export function Header() {
  const { c, setLocale } = useLocale()
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [open, setOpen] = useState(false)
  const lastY = useRef(0)

  useEffect(
    () =>
      subscribeScroll(() => {
        const y = window.scrollY
        setScrolled(y > 24)
        setHidden(y > 480 && y > lastY.current + 4)
        if (Math.abs(y - lastY.current) > 4) lastY.current = y
      }),
    [],
  )

  const links = [
    { href: `#${SECTION_IDS.how}`, label: c.nav.how },
    { href: `#${SECTION_IDS.features}`, label: c.nav.features },
    { href: `#${SECTION_IDS.about}`, label: c.nav.about },
  ]
  const switchLocale = () => setLocale(c.nav.switchToLang as 'ar' | 'en')

  return (
    <>
      <a
        href="#main"
        className="fixed top-3 z-[60] -translate-y-24 rounded-full bg-white px-4 py-2 text-sm font-semibold text-night shadow-lg focus:translate-y-0 ltr:left-3 rtl:right-3"
      >
        {c.nav.skip}
      </a>

      <header
        className={cn(
          'on-night fixed inset-x-0 top-0 z-50 transition-transform duration-500 ease-[var(--ease-out-soft)]',
          hidden && !open ? '-translate-y-full' : 'translate-y-0',
        )}
      >
        <div className="shell intro-header pt-3 md:pt-4">
          <div
            className={cn(
              'flex h-[var(--header-h)] items-center gap-3 rounded-full transition-[background-color,box-shadow,padding] duration-500 ease-[var(--ease-out-soft)] md:gap-6',
              scrolled ? 'bg-night/80 px-3 shadow-[0_10px_40px_-12px_rgb(0_0_0/0.5)] ring-1 ring-white/10 backdrop-blur-xl md:px-5' : 'px-1',
            )}
          >
            <a href={`#${SECTION_IDS.top}`} className="flex shrink-0 items-center rounded-lg" aria-label={`${c.brand.name} — ${c.nav.home}`}>
              <BrandMark onDark decorative className="h-8 md:h-9" />
            </a>

            <nav aria-label={c.nav.primaryNav} className="hidden flex-1 justify-center lg:flex">
              <ul className="flex items-center gap-1">
                {links.map((l) => (
                  <li key={l.href}>
                    <a href={l.href} className="rounded-full px-4 py-2 text-[15px] font-medium text-white/75 transition-colors hover:bg-white/[0.06] hover:text-white">
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="ms-auto flex items-center gap-1.5 md:gap-2 lg:ms-0">
              <button
                type="button"
                onClick={switchLocale}
                lang={c.nav.switchToLang}
                className="hidden h-10 cursor-pointer items-center gap-1.5 rounded-full px-3 text-[14px] font-medium text-white/75 transition-colors hover:bg-white/[0.06] hover:text-white lg:inline-flex"
              >
                <Globe className="size-4" aria-hidden />
                {c.nav.switchTo}
              </button>
              <ButtonLink href={whatsappUrl(c.cta.whatsappMessage)} variant="light" className="h-10 px-4 text-[14px] md:h-11 md:px-5">
                {c.cta.contact}
              </ButtonLink>
              <button
                type="button"
                onClick={() => setOpen(true)}
                aria-expanded={open}
                aria-controls="mobile-menu"
                aria-label={c.nav.menu}
                className="flex size-10 cursor-pointer items-center justify-center rounded-full text-white ring-1 ring-white/20 transition-colors hover:bg-white/[0.08] lg:hidden"
              >
                <Menu className="size-5" strokeWidth={2} />
              </button>
            </div>
          </div>
        </div>
      </header>

      <MobileMenu open={open} onClose={() => setOpen(false)} links={links} onSwitchLocale={switchLocale} />
    </>
  )
}

interface MobileMenuProps {
  open: boolean
  onClose: () => void
  links: { href: string; label: string }[]
  onSwitchLocale: () => void
}

/** Full-screen sheet with large, staggered links. Escape closes it; page scroll is locked while open. */
function MobileMenu({ open, onClose, links, onSwitchLocale }: MobileMenuProps) {
  const { c } = useLocale()
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    // After the sheet stops being inert/invisible, move focus into it.
    const focusTimer = window.setTimeout(() => closeRef.current?.focus(), 60)
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      window.clearTimeout(focusTimer)
      window.removeEventListener('keydown', onKey)
    }
  }, [open, onClose])

  return (
    <div
      id="mobile-menu"
      role="dialog"
      aria-modal="true"
      aria-label={c.nav.menu}
      inert={!open}
      className={cn(
        'on-night fixed inset-0 z-[70] flex flex-col bg-night text-white transition-[opacity,visibility] duration-500 ease-[var(--ease-out-soft)] lg:hidden',
        open ? 'visible opacity-100' : 'invisible opacity-0',
      )}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(80%_50%_at_50%_0%,rgb(37_99_235/0.28),transparent_70%)]" aria-hidden />
      <div className="shell relative flex h-[calc(var(--header-h)+12px)] items-center justify-between pt-3">
        <BrandMark onDark decorative className="h-8" />
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label={c.nav.close}
          className="flex size-10 cursor-pointer items-center justify-center rounded-full ring-1 ring-white/20 transition-colors hover:bg-white/[0.08]"
        >
          <X className="size-5" strokeWidth={2} />
        </button>
      </div>

      <nav aria-label={c.nav.primaryNav} className="shell relative flex flex-1 flex-col justify-center">
        <ol className="flex flex-col">
          {links.map((l, i) => (
            <li
              key={l.href}
              className={cn('border-b border-white/10 transition-[opacity,transform] duration-700 ease-[var(--ease-out-soft)]', open ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0')}
              style={{ transitionDelay: open ? `${120 + i * 80}ms` : '0ms' } as CSSProperties}
            >
              <a href={l.href} onClick={onClose} className="flex items-baseline gap-4 py-5 text-[30px] leading-tight font-bold xs:text-[34px]">
                <span className="num text-[13px] font-medium text-accent">0{i + 1}</span>
                {l.label}
              </a>
            </li>
          ))}
        </ol>
      </nav>

      <div className="shell relative flex flex-col gap-3 pb-[max(24px,env(safe-area-inset-bottom))]">
        <ButtonLink href={whatsappUrl(c.cta.whatsappMessage)} variant="primary" size="lg" icon={<MessageCircle className="size-5" aria-hidden />}>
          {c.cta.contact}
        </ButtonLink>
        <div className="flex items-center justify-between gap-3">
          <a href={SUPPORT_PHONE_HREF} className="inline-flex items-center gap-2 rounded-lg py-2 text-[15px] text-white/75">
            <Phone className="size-4" aria-hidden />
            <span className="num ltr">{SUPPORT_PHONE}</span>
          </a>
          <button type="button" onClick={onSwitchLocale} lang={c.nav.switchToLang} className="inline-flex cursor-pointer items-center gap-1.5 rounded-full px-3 py-2 text-[15px] text-white/75 ring-1 ring-white/15">
            <Globe className="size-4" aria-hidden />
            {c.nav.switchTo}
          </button>
        </div>
      </div>
    </div>
  )
}
