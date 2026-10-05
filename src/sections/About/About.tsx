import { Building2, Phone } from 'lucide-react'
import { BrandMark } from '@/components/Brand/Brand'
import { SECTION_IDS } from '@/components/Header/Header'
import { Reveal, RevealLines } from '@/components/Reveal/Reveal'
import { useLocale } from '@/i18n/LocaleProvider'
import { SUPPORT_PHONE, SUPPORT_PHONE_HREF } from '@/lib/contact'

/** Who stands behind RCH: the product, its developer (Rowad Technical Solutions) and the support line. */
export function About() {
  const { c } = useLocale()
  return (
    <section id={SECTION_IDS.about} aria-labelledby="about-title" className="border-t border-line bg-surface py-[var(--section-y)]">
      <div className="shell grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-7">
          <Reveal as="p" className="eyebrow text-brand">
            {c.about.eyebrow}
          </Reveal>
          <RevealLines id="about-title" lines={c.about.titleLines} className="t-h2 mt-4" lastLineClassName="text-brand" />
          <Reveal as="p" index={1} className="t-lead mt-6 max-w-2xl text-ink-soft">
            {c.about.body}
          </Reveal>
        </div>

        <Reveal variant="scale" index={1} className="self-end lg:col-span-5">
          <div className="rounded-[22px] bg-night p-6 text-white shadow-[var(--shadow-float)] sm:p-7">
            <div className="flex items-center justify-between gap-4">
              <BrandMark onDark className="h-9" />
              <span className="text-[12.5px] text-white/50">{c.brand.tagline}</span>
            </div>
            <div className="mt-8 border-t border-white/10 pt-6">
              <div className="text-[13px] text-white/50">{c.about.companyLabel}</div>
              <div className="mt-2 flex items-center gap-3">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-white/[0.08] text-accent">
                  <Building2 className="size-5" strokeWidth={1.8} aria-hidden />
                </span>
                <span className="text-[20px] leading-snug font-bold">{c.about.company}</span>
              </div>
              <p className="mt-4 text-[15px] leading-7 text-white/65">{c.about.companyNote}</p>
            </div>
            <a
              href={SUPPORT_PHONE_HREF}
              className="mt-6 flex items-center justify-between gap-3 rounded-xl bg-white/[0.06] px-4 py-3 ring-1 ring-white/10 transition-colors hover:bg-white/[0.1]"
            >
              <span className="flex items-center gap-2 text-[14px] text-white/70">
                <Phone className="size-4" aria-hidden />
                {c.about.supportLabel}
              </span>
              <span className="num ltr text-[15px] font-semibold">{SUPPORT_PHONE}</span>
            </a>
          </div>
        </Reveal>
      </div>

      <ol className="shell mt-16 grid grid-cols-1 gap-10 md:mt-20 md:grid-cols-3 md:gap-8">
        {c.about.principles.map((p, i) => (
          <Reveal as="li" key={p.title} index={i} className="border-t border-line-strong pt-6">
            <span className="num text-[13px] font-semibold text-accent">0{i + 1}</span>
            <h3 className="mt-3 text-[21px] leading-snug font-bold text-ink">{p.title}</h3>
            <p className="t-body mt-2 text-ink-soft">{p.body}</p>
          </Reveal>
        ))}
      </ol>
    </section>
  )
}
