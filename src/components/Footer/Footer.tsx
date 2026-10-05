import { ArrowUp, MessageCircle, Phone } from 'lucide-react'
import { BrandLogo } from '@/components/Brand/Brand'
import { SECTION_IDS } from '@/components/Header/Header'
import { useLocale } from '@/i18n/LocaleProvider'
import { SUPPORT_PHONE, SUPPORT_PHONE_HREF, whatsappUrl } from '@/lib/contact'

/** Only real information: the logo, what RCH is, the page's sections, the support line and the developer credit. */
export function Footer() {
  const { c } = useLocale()
  const year = new Date().getFullYear()
  const links = [
    { href: `#${SECTION_IDS.top}`, label: c.nav.home },
    { href: `#${SECTION_IDS.how}`, label: c.nav.how },
    { href: `#${SECTION_IDS.features}`, label: c.nav.features },
    { href: `#${SECTION_IDS.about}`, label: c.nav.about },
  ]

  return (
    <footer className="on-night bg-night text-white">
      <div className="shell grid grid-cols-1 gap-12 border-t border-white/10 py-16 md:grid-cols-12 md:gap-8">
        <div className="md:col-span-5">
          <BrandLogo className="w-40" />
          <p className="mt-6 max-w-md text-[15px] leading-7 text-white/60">{c.footer.about}</p>
        </div>

        <nav aria-label={c.footer.navTitle} className="md:col-span-3">
          <h2 className="text-[13px] font-semibold text-white/45">{c.footer.navTitle}</h2>
          <ul className="mt-4 flex flex-col gap-2.5">
            {links.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="rounded text-[15px] text-white/75 transition-colors hover:text-white">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="md:col-span-4">
          <h2 className="text-[13px] font-semibold text-white/45">{c.footer.contactTitle}</h2>
          <ul className="mt-4 flex flex-col gap-2.5 text-[15px]">
            <li>
              <a href={SUPPORT_PHONE_HREF} className="inline-flex items-center gap-2 rounded text-white/75 transition-colors hover:text-white">
                <Phone className="size-4" aria-hidden />
                <span className="sr-only">{c.footer.support}: </span>
                <span className="num ltr">{SUPPORT_PHONE}</span>
              </a>
            </li>
            <li>
              <a
                href={whatsappUrl(c.cta.whatsappMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded text-white/75 transition-colors hover:text-white"
              >
                <MessageCircle className="size-4" aria-hidden />
                {c.footer.whatsapp}
              </a>
            </li>
          </ul>
          <p className="mt-6 text-[13px] leading-6 text-white/45">{c.footer.poweredBy}</p>
        </div>
      </div>

      <div className="shell flex flex-col gap-3 border-t border-white/10 py-6 text-[13px] text-white/45 sm:flex-row sm:items-center sm:justify-between">
        <p>
          © <span className="num">{year}</span> {c.brand.name} — {c.brand.fullName}. {c.footer.rights}
        </p>
        <p>{c.footer.sampleNote}</p>
        <a href={`#${SECTION_IDS.top}`} className="inline-flex items-center gap-1.5 self-start rounded text-white/60 transition-colors hover:text-white sm:self-auto">
          <ArrowUp className="size-4" aria-hidden />
          {c.footer.backToTop}
        </a>
      </div>
    </footer>
  )
}
