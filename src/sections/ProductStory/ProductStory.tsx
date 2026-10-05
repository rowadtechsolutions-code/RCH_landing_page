import { useCallback, useRef, useState, type ComponentType, type CSSProperties } from 'react'
import { Check } from 'lucide-react'
import { BrowserFrame } from '@/components/BrowserFrame/BrowserFrame'
import { SECTION_IDS } from '@/components/Header/Header'
import { Reveal, RevealLines } from '@/components/Reveal/Reveal'
import { CalcPane } from '@/components/product/CalcPane'
import { ContractPane } from '@/components/product/ContractPane'
import { FleetPane } from '@/components/product/FleetPane'
import { PaymentsPane } from '@/components/product/PaymentsPane'
import { ReportPane } from '@/components/product/ReportPane'
import { useInView } from '@/hooks/useInView'
import { useCinematic } from '@/hooks/useMediaQuery'
import { useScrollProgress } from '@/hooks/useScrollProgress'
import { useLocale } from '@/i18n/LocaleProvider'
import { cn } from '@/lib/cn'
import type { Content } from '@/content/ar'
import styles from './ProductStory.module.css'

type Chapter = Content['story']['chapters'][number]

const PANES: Record<string, ComponentType<{ active: boolean }>> = {
  fleet: FleetPane,
  contracts: ContractPane,
  payments: PaymentsPane,
  calc: CalcPane,
  reports: ReportPane,
}

/**
 * The walk through the product: fleet → contracts → extensions & payments → commissions & dues → reports.
 * Wide screens: one product frame stays pinned and morphs between chapters as the text advances.
 * Phones / reduced motion: each chapter is a block with its own frame.
 */
export function ProductStory() {
  const { c } = useLocale()
  const cinematic = useCinematic()

  return (
    <section id={SECTION_IDS.how} aria-labelledby="story-title" className="relative bg-canvas pt-[var(--section-y)]">
      <div className="shell">
        <Reveal as="p" className="eyebrow text-brand">
          {c.story.eyebrow}
        </Reveal>
        <RevealLines id="story-title" lines={[c.story.title]} className="t-h2 mt-4 max-w-3xl" />
      </div>

      {cinematic ? <StoryPinned chapters={c.story.chapters} /> : <StoryStacked chapters={c.story.chapters} />}

      <div className="shell pt-[calc(var(--section-y)*0.6)] pb-[var(--section-y)] text-center">
        <RevealLines lines={[c.story.finale]} as="p" className="t-h2 text-ink" />
      </div>
    </section>
  )
}

function StoryPinned({ chapters }: { chapters: readonly Chapter[] }) {
  const { c } = useLocale()
  const ref = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)
  const count = chapters.length

  const onProgress = useCallback((p: number) => setActive(Math.min(count - 1, Math.floor(p * count))), [count])
  useScrollProgress(ref, { mode: 'sticky', onProgress })

  /** Rail buttons jump to the middle of the chapter's scroll range. */
  const goTo = (i: number) => {
    const el = ref.current
    if (!el) return
    const range = el.offsetHeight - window.innerHeight
    const top = el.getBoundingClientRect().top + window.scrollY
    window.scrollTo({ top: top + ((i + 0.5) / count) * range, behavior: 'smooth' })
  }

  return (
    <div ref={ref} className="relative" style={{ height: `${count * 90 + 100}vh` }}>
      <div className="sticky top-0 flex h-screen items-center">
        <div className="shell grid w-full grid-cols-12 items-center gap-10 pt-[var(--header-h)]">
          <div className="col-span-5">
            <ol className="mb-10 flex flex-col gap-1" aria-label={c.story.progressLabel}>
              {chapters.map((ch, i) => (
                <li key={ch.id}>
                  <button
                    type="button"
                    onClick={() => goTo(i)}
                    aria-current={i === active ? 'step' : undefined}
                    className={cn(
                      'group flex w-full cursor-pointer items-center gap-3 rounded-lg py-1.5 text-start text-[15px] transition-colors',
                      i === active ? 'font-semibold text-ink' : 'text-faint hover:text-ink-soft',
                    )}
                  >
                    <span className="num w-6 text-[13px]">0{i + 1}</span>
                    <span className="relative h-px w-10 overflow-hidden bg-line-strong">
                      <span
                        className={cn('absolute inset-0 bg-brand transition-transform duration-700 ease-[var(--ease-out-soft)] ltr:origin-left rtl:origin-right', i <= active ? 'scale-x-100' : 'scale-x-0')}
                      />
                    </span>
                    {ch.label}
                  </button>
                </li>
              ))}
            </ol>

            <div className="relative min-h-[340px]">
              {chapters.map((ch, i) => (
                <div
                  key={ch.id}
                  aria-hidden={i !== active}
                  className={cn('absolute inset-x-0 top-0', styles.chapter, i === active ? styles.chapterIn : i < active ? styles.chapterPast : '')}
                >
                  <ChapterText chapter={ch} index={i} />
                </div>
              ))}
            </div>
          </div>

          <div className="col-span-7">
            <BrowserFrame label={chapters[active].title}>
              <div className={cn('relative', styles.paneBox)}>
                {chapters.map((ch, i) => {
                  const Pane = PANES[ch.id]
                  return (
                    <div key={ch.id} className={cn('absolute inset-0', styles.pane, i === active ? styles.paneIn : i < active ? styles.panePast : '')}>
                      <Pane active={i === active} />
                    </div>
                  )
                })}
              </div>
            </BrowserFrame>
          </div>
        </div>
      </div>
    </div>
  )
}

function StoryStacked({ chapters }: { chapters: readonly Chapter[] }) {
  return (
    <ol className="shell mt-14 flex flex-col gap-20 md:gap-28">
      {chapters.map((ch, i) => (
        <StackedChapter key={ch.id} chapter={ch} index={i} />
      ))}
    </ol>
  )
}

function StackedChapter({ chapter, index }: { chapter: Chapter; index: number }) {
  const frameRef = useRef<HTMLDivElement>(null)
  const inView = useInView(frameRef)
  const Pane = PANES[chapter.id]
  return (
    <li className="grid grid-cols-1 items-center gap-8 md:grid-cols-2 md:gap-12">
      <Reveal>
        <ChapterText chapter={chapter} index={index} />
      </Reveal>
      <div ref={frameRef} className={cn(index % 2 === 1 && 'md:order-first')}>
        <Reveal variant="scale">
          <BrowserFrame label={chapter.title}>
            <div className={styles.paneBoxStacked}>
              <Pane active={inView} />
            </div>
          </BrowserFrame>
        </Reveal>
      </div>
    </li>
  )
}

function ChapterText({ chapter, index }: { chapter: Chapter; index: number }) {
  return (
    <div>
      <div className="flex items-center gap-3 text-[14px] font-semibold text-brand">
        <span className="num flex size-8 items-center justify-center rounded-full bg-brand/10 text-[13px]">0{index + 1}</span>
        {chapter.label}
      </div>
      <h3 className="t-h3 mt-4 text-ink">{chapter.title}</h3>
      <p className="t-body mt-3 max-w-md text-ink-soft">{chapter.body}</p>
      <ul className="mt-6 flex flex-col gap-2.5">
        {chapter.points.map((pt, i) => (
          <li key={pt} className="flex items-start gap-2.5 text-[15px] leading-7 text-ink" style={{ '--i': i } as CSSProperties}>
            <span className="mt-1.5 flex size-[18px] shrink-0 items-center justify-center rounded-full bg-accent/15 text-amber-700">
              <Check className="size-3" strokeWidth={3} />
            </span>
            {pt}
          </li>
        ))}
      </ul>
    </div>
  )
}
