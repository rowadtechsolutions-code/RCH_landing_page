import { useRef, type CSSProperties, type ReactNode } from 'react'
import { CarFront, CheckCircle2, Infinity as InfinityIcon, MessageCircle } from 'lucide-react'
import { Badge } from '@/components/Badge/Badge'
import { BrowserFrame } from '@/components/BrowserFrame/BrowserFrame'
import { ButtonLink } from '@/components/Button/Button'
import { SECTION_IDS } from '@/components/Header/Header'
import { ScaledStage } from '@/components/ScaledStage/ScaledStage'
import { DASHBOARD_SIZE, DashboardMock } from '@/components/product/DashboardMock'
import { useMediaQuery, useReducedMotion } from '@/hooks/useMediaQuery'
import { useScrollProgress } from '@/hooks/useScrollProgress'
import { useLocale } from '@/i18n/LocaleProvider'
import { whatsappUrl } from '@/lib/contact'
import { cn } from '@/lib/cn'
import { money } from '@/lib/format'
import styles from './Hero.module.css'
import { MAIN_CONTRACT, OFFICE_TOTALS } from '@/content/sampleNumbers'

/**
 * The stage: headline → text → actions → the product rising in perspective → four fragments of the system
 * (vehicle, open contract, payment, office due) arriving one by one. The product flattens as the page scrolls.
 */
export function Hero() {
  const { c } = useLocale()
  const officeDue = OFFICE_TOTALS.reduce((sum, o) => sum + o.total * (1 - o.rate), 0)
  const stageRef = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  const tablet = useMediaQuery('(min-width: 768px)')
  useScrollProgress(stageRef, { mode: 'enter', enabled: !reduced })

  return (
    <section id={SECTION_IDS.top} className={cn('on-night relative isolate overflow-hidden bg-night text-white', styles.hero)}>
      <div className={styles.glow} aria-hidden />
      <svg className={styles.roof} viewBox="0 0 1440 520" fill="none" preserveAspectRatio="xMidYMid slice" aria-hidden>
        <path d="M-40 420C180 420 330 400 470 340C610 280 720 190 900 190C1080 190 1180 300 1290 350C1370 386 1420 400 1480 404" stroke="white" strokeOpacity="0.07" strokeWidth="1.5" />
        <path d="M-40 470C200 468 360 446 500 392C650 334 760 250 920 250C1080 250 1190 346 1300 392C1380 426 1430 440 1480 442" stroke="white" strokeOpacity="0.04" strokeWidth="1" />
      </svg>

      <div className="shell relative pt-[calc(var(--header-h)+72px)] text-center md:pt-[calc(var(--header-h)+96px)]">
        <p className="intro eyebrow justify-center text-white/70" style={{ '--i': 0 } as CSSProperties}>
          {c.hero.eyebrow}
        </p>

        <h1 className="t-display mx-auto mt-5 max-w-5xl">
          {c.hero.titleLines.map((line, i) => (
            <span key={line} className="line-mask intro-line" style={{ '--i': i + 1 } as CSSProperties}>
              <span className={i === 0 ? 'text-white/65' : 'text-white'}>{line}</span>
            </span>
          ))}
        </h1>

        <p className="intro t-lead mx-auto mt-6 max-w-xl text-white/70" style={{ '--i': 3 } as CSSProperties}>
          {c.hero.body}
        </p>

        <div className="intro mt-9 flex flex-col items-center justify-center gap-3 xs:flex-row" style={{ '--i': 4 } as CSSProperties}>
          <ButtonLink href={`#${SECTION_IDS.how}`} size="lg" arrow className="w-full xs:w-auto">
            {c.cta.discover}
          </ButtonLink>
          <ButtonLink href={whatsappUrl(c.cta.whatsappMessage)} variant="ghostLight" size="lg" icon={<MessageCircle className="size-5" aria-hidden />} className="w-full xs:w-auto">
            {c.cta.contact}
          </ButtonLink>
        </div>
      </div>

      <div ref={stageRef} className={cn('shell relative mt-16 md:mt-20', styles.stageWrap)}>
        <div className="intro-stage relative mx-auto max-w-[1180px]">
          <div className={styles.stage}>
            <BrowserFrame label={c.hero.frameLabel}>
              <ScaledStage width={DASHBOARD_SIZE.width} height={DASHBOARD_SIZE.height}>
                <DashboardMock />
              </ScaledStage>
            </BrowserFrame>
          </div>

          <Floater index={0} depth={1.2} className="-top-[7%] start-[3%] md:top-[34%] md:-start-[3%]">
            <div className="flex items-center gap-3">
              <span className="flex size-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
                <CarFront className="size-5" strokeWidth={1.8} />
              </span>
              <div className="min-w-0">
                <div className="text-[14px] leading-6 font-semibold text-ink">{c.sample.vehicles[1].name}</div>
                <Badge tone="green">{c.ui.vehicleStatus.available}</Badge>
              </div>
            </div>
          </Floater>

          {tablet && (
            <Floater index={1} depth={0.7} className="top-[14%] -end-[4%]">
              <div className="flex items-center gap-3">
                <span className="flex size-10 items-center justify-center rounded-xl bg-violet-50 text-violet-700">
                  <InfinityIcon className="size-5" strokeWidth={2} />
                </span>
                <div className="min-w-0">
                  <div className="text-[14px] leading-6 font-semibold text-ink">{c.ui.openContract}</div>
                  <div className="text-[12.5px] text-muted">{c.sample.renters[2]}</div>
                </div>
              </div>
            </Floater>
          )}

          <Floater index={2} depth={1.6} className="-bottom-[2%] end-[3%] md:end-auto md:bottom-[18%] md:start-[4%]">
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="size-5 text-emerald-600" strokeWidth={2.2} />
              <span className="text-[14px] font-semibold text-ink">{c.ui.paymentRecorded}</span>
              <span className="num text-[14px] font-bold text-brand">+{money(MAIN_CONTRACT.lastPayment, c)}</span>
            </div>
          </Floater>

          {tablet && (
            <Floater index={3} depth={1} className="bottom-[30%] w-[250px] -end-[2%]">
              <div className="text-[12.5px] text-muted">{c.ui.partnerDue}</div>
              <div className="num text-[20px] leading-8 font-bold text-ink">{money(officeDue, c)}</div>
              <div className="mt-2 flex h-1.5 overflow-hidden rounded-full">
                <span className="h-full flex-[0.9] bg-brand" />
                <span className="h-full flex-[0.1] bg-accent" />
              </div>
            </Floater>
          )}
        </div>
      </div>
    </section>
  )
}

interface FloaterProps {
  index: number
  /** Parallax strength relative to the product frame. */
  depth: number
  className?: string
  children: ReactNode
}

/** A fragment of the system hovering around the product: enters in sequence, drifts gently, moves with scroll. */
function Floater({ index, depth, className, children }: FloaterProps) {
  return (
    <div className={cn('absolute z-10', styles.floater, className)} style={{ '--depth': depth } as CSSProperties} aria-hidden>
      <div className="intro-pop" style={{ '--i': index } as CSSProperties}>
        <div className="drift rounded-2xl bg-white/95 p-3 shadow-[var(--shadow-float)] ring-1 ring-black/5 backdrop-blur md:p-3.5" style={{ '--i': index } as CSSProperties}>
          {children}
        </div>
      </div>
    </div>
  )
}
