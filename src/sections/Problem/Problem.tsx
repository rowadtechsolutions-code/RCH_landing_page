import { useRef, type CSSProperties } from 'react'
import { ArrowDown } from 'lucide-react'
import { Reveal, RevealLines } from '@/components/Reveal/Reveal'
import { useCinematic } from '@/hooks/useMediaQuery'
import { useScrollProgress } from '@/hooks/useScrollProgress'
import { useLocale } from '@/i18n/LocaleProvider'
import { cn } from '@/lib/cn'
import { Scrap, type ScrapKind } from './Scrap'
import { UnifiedRecord } from './UnifiedRecord'
import styles from './Problem.module.css'

/** Where each scrap floats before converging (offsets from the centre, in viewport units; rotation in degrees). */
const SCATTER = [
  { x: -35, y: 1, r: -7 },
  { x: 34, y: -1, r: 6 },
  { x: -24, y: 21, r: 4 },
  { x: 29, y: 19, r: -5 },
  { x: 0, y: 25, r: 3 },
] as const

/**
 * Editorial problem statement. Wide screens: pinned while the scattered scraps converge into a single RCH record
 * and the headline turns from the problem to the answer. Phones / reduced motion: the same story, stacked.
 */
export function Problem() {
  const cinematic = useCinematic()
  return cinematic ? <ProblemPinned /> : <ProblemStacked />
}

function ProblemPinned() {
  const { c } = useLocale()
  const ref = useRef<HTMLElement>(null)
  useScrollProgress(ref, { mode: 'sticky' })

  return (
    <section ref={ref} aria-labelledby="problem-title" className={cn('relative bg-canvas', styles.pinned)}>
      <div className={styles.sticky}>
        <div className={cn('shell absolute inset-x-0 top-[16vh] text-center', styles.before)}>
          <p className="eyebrow justify-center text-muted">{c.problem.eyebrow}</p>
          <h2 id="problem-title" className="t-h2 mx-auto mt-4 max-w-4xl">
            <span className="block text-ink">{c.problem.titleLines[0]}</span>
            <span className="block text-muted">{c.problem.titleLines[1]}</span>
          </h2>
          <p className="t-lead mx-auto mt-5 max-w-xl text-ink-soft">{c.problem.body}</p>
        </div>

        {c.problem.scraps.map((s, i) => (
          <div
            key={s.kind}
            className={styles.scrap}
            style={{ '--x': `${SCATTER[i].x}vw`, '--y': `${SCATTER[i].y}vh`, '--r': `${SCATTER[i].r}deg`, '--i': i } as CSSProperties}
          >
            <Scrap kind={s.kind as ScrapKind} label={s.label} text={s.text} />
          </div>
        ))}

        <div className={cn('shell absolute inset-x-0 top-[20vh] flex flex-col items-center text-center', styles.after)}>
          <p className="eyebrow justify-center text-brand">{c.problem.afterEyebrow}</p>
          <p className="t-h2 mt-4 text-ink">{c.problem.afterTitle}</p>
          <p className="t-lead mx-auto mt-4 max-w-xl text-ink-soft">{c.problem.afterBody}</p>
          <div className={cn('mt-10 flex w-full justify-center', styles.record)}>
            <UnifiedRecord />
          </div>
        </div>
      </div>
    </section>
  )
}

function ProblemStacked() {
  const { c } = useLocale()
  return (
    <section aria-labelledby="problem-title" className="bg-canvas pt-[calc(var(--section-y)*0.75)] pb-[var(--section-y)]">
      <div className="shell">
        <Reveal as="p" className="eyebrow text-muted">
          {c.problem.eyebrow}
        </Reveal>
        <RevealLines lines={c.problem.titleLines} className="t-h2 mt-4" lastLineClassName="text-muted" />
        <Reveal as="p" index={1} className="t-lead mt-5 max-w-2xl text-ink-soft">
          {c.problem.body}
        </Reveal>

        <ul className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {c.problem.scraps.map((s, i) => (
            <Reveal as="li" key={s.kind} index={i % 2} className={cn('flex', i % 2 ? 'sm:mt-10 sm:justify-end' : '', styles.tilt)}>
              <Scrap kind={s.kind as ScrapKind} label={s.label} text={s.text} className="w-full max-w-[340px] sm:w-auto" />
            </Reveal>
          ))}
        </ul>

        <Reveal className="my-14 flex justify-center text-brand" variant="fade">
          <span className="flex size-12 items-center justify-center rounded-full bg-brand/10">
            <ArrowDown className="size-5" />
          </span>
        </Reveal>

        <div className="text-center">
          <Reveal as="p" className="eyebrow justify-center text-brand">
            {c.problem.afterEyebrow}
          </Reveal>
          <RevealLines lines={[c.problem.afterTitle]} as="p" className="t-h2 mt-3 text-ink" />
          <Reveal as="p" index={1} className="t-lead mx-auto mt-4 max-w-xl text-ink-soft">
            {c.problem.afterBody}
          </Reveal>
          <Reveal variant="scale" index={2} className="mt-10 flex justify-center">
            <UnifiedRecord />
          </Reveal>
        </div>
      </div>
    </section>
  )
}
