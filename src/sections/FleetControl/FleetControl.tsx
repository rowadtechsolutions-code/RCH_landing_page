import { useLayoutEffect, useRef, type CSSProperties } from 'react'
import { MoveHorizontal } from 'lucide-react'
import { BrowserFrame } from '@/components/BrowserFrame/BrowserFrame'
import { SECTION_IDS } from '@/components/Header/Header'
import { Reveal, RevealLines } from '@/components/Reveal/Reveal'
import { useCinematic } from '@/hooks/useMediaQuery'
import { useScrollProgress } from '@/hooks/useScrollProgress'
import { useLocale } from '@/i18n/LocaleProvider'
import { cn } from '@/lib/cn'
import { FleetTimeline } from './FleetTimeline'
import styles from './FleetControl.module.css'

const LEGEND = [
  { key: 'completed', swatch: 'bg-emerald-100 ring-1 ring-emerald-600/30' },
  { key: 'active', swatch: 'bg-sky-500' },
  { key: 'open', swatch: 'bg-violet-500' },
  { key: 'extension', swatch: 'bg-accent' },
  { key: 'overdue', swatch: 'bg-rose-500' },
] as const

/**
 * «كل تفاصيل أسطولك تحت السيطرة»: every vehicle's contracts on one timeline. On wide screens the timeline glides
 * sideways as the section scrolls by; on phones it is a swipeable strip.
 */
export function FleetControl() {
  const { c } = useLocale()
  const cinematic = useCinematic()
  const sectionRef = useRef<HTMLElement>(null)
  const viewportRef = useRef<HTMLDivElement>(null)
  useScrollProgress(sectionRef, { mode: 'pass', enabled: cinematic })

  // How far the timeline is wider than its window: the distance the scroll-linked glide covers.
  useLayoutEffect(() => {
    const vp = viewportRef.current
    const section = sectionRef.current
    if (!vp || !section || !cinematic) return
    const update = () => section.style.setProperty('--overflow', `${Math.max(0, vp.scrollWidth - vp.clientWidth)}px`)
    update()
    const ro = new ResizeObserver(update)
    ro.observe(vp)
    return () => ro.disconnect()
  }, [cinematic])

  return (
    <section
      ref={sectionRef}
      id={SECTION_IDS.features}
      aria-labelledby="control-title"
      className={cn('on-night relative overflow-hidden bg-night py-[var(--section-y)] text-white', styles.section)}
    >
      <div className={styles.glow} aria-hidden />
      <div className="shell relative">
        <div className="grid grid-cols-1 items-end gap-6 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Reveal as="p" className="eyebrow text-white/65">
              {c.control.eyebrow}
            </Reveal>
            <RevealLines id="control-title" lines={c.control.titleLines} className="t-h2 mt-4" lastLineClassName="text-white/55" />
          </div>
          <Reveal as="p" index={1} className="t-lead text-white/70 lg:col-span-5">
            {c.control.body}
          </Reveal>
        </div>

        <Reveal variant="scale" className="mt-14 md:mt-16">
          <BrowserFrame label={c.control.timelineLabel}>
            <div
              ref={viewportRef}
              className={cn(cinematic ? 'overflow-hidden' : 'overflow-x-auto overscroll-x-contain', styles.viewport)}
              tabIndex={cinematic ? undefined : 0}
              aria-label={cinematic ? undefined : c.control.swipeHint}
            >
              <div className={cinematic ? styles.glide : undefined} style={{ '--sign': c.dir === 'rtl' ? 1 : -1 } as CSSProperties}>
                <FleetTimeline />
              </div>
            </div>
          </BrowserFrame>
        </Reveal>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            {LEGEND.map((l) => (
              <li key={l.key} className="flex items-center gap-2 text-[14px] text-white/75">
                <span className={cn('h-2.5 w-5 rounded-full', l.swatch)} aria-hidden />
                {c.control.legend[l.key]}
              </li>
            ))}
            <li className="flex items-center gap-2 text-[14px] text-white/75">
              <span className="h-4 w-0.5 rounded-full bg-brand" aria-hidden />
              {c.control.today}
            </li>
          </ul>
          {!cinematic && (
            <p className="flex items-center gap-2 text-[13px] text-white/55">
              <MoveHorizontal className="size-4" aria-hidden />
              {c.control.swipeHint}
            </p>
          )}
        </div>

        <ol className="mt-16 grid grid-cols-1 gap-10 border-t border-white/10 pt-10 md:mt-20 md:grid-cols-3 md:gap-8">
          {c.control.facts.map((f, i) => (
            <Reveal as="li" key={f.title} index={i}>
              <span className="num text-[13px] font-semibold text-accent">0{i + 1}</span>
              <h3 className="mt-3 text-[22px] leading-snug font-bold">{f.title}</h3>
              <p className="t-body mt-2 text-white/65">{f.body}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}
