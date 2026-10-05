import { MessageCircle, Phone } from 'lucide-react'
import { ButtonLink } from '@/components/Button/Button'
import { FlowLine } from '@/components/FlowLine/FlowLine'
import { Reveal, RevealLines } from '@/components/Reveal/Reveal'
import { useLocale } from '@/i18n/LocaleProvider'
import { SUPPORT_PHONE, SUPPORT_PHONE_HREF, whatsappUrl } from '@/lib/contact'

/** The closing stage — mirrors the hero: night, the roof line drawing itself, one question, one action. */
export function FinalCta() {
  const { c } = useLocale()
  return (
    <section aria-labelledby="final-title" className="on-night relative isolate overflow-hidden bg-night pt-[var(--section-y)] text-white">
      <div
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(55%_60%_at_50%_100%,rgb(37_99_235/0.35),transparent_70%)]"
        aria-hidden
      />
      <div className="shell text-center">
        <RevealLines id="final-title" lines={c.final.titleLines} className="t-display mx-auto max-w-5xl" lastLineClassName="text-white/60" />
        <Reveal as="p" index={2} className="t-lead mx-auto mt-6 max-w-xl text-white/70">
          {c.final.body}
        </Reveal>
        <Reveal index={3} className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6">
          <ButtonLink href={whatsappUrl(c.cta.whatsappMessage)} variant="light" size="lg" arrow icon={<MessageCircle className="size-5" aria-hidden />}>
            {c.cta.start}
          </ButtonLink>
          <a href={SUPPORT_PHONE_HREF} className="inline-flex items-center gap-2 rounded-full px-3 py-2 text-[15px] text-white/70 transition-colors hover:text-white">
            <Phone className="size-4" aria-hidden />
            {c.final.callLabel} <span className="num ltr font-semibold text-white">{SUPPORT_PHONE}</span>
          </a>
        </Reveal>
      </div>
      <FlowLine tone="dark" className="mt-20 h-[90px] md:mt-24 md:h-[150px]" />
    </section>
  )
}
