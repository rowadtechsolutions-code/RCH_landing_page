import { useState } from 'react'
import { ShieldCheck } from 'lucide-react'
import { Badge } from '@/components/Badge/Badge'
import { Reveal, RevealLines } from '@/components/Reveal/Reveal'
import { useLocale } from '@/i18n/LocaleProvider'
import { cn } from '@/lib/cn'

/**
 * Accounts & access: each account sees its own offices; the administrator enables or disables accounts.
 * The switches work, so the visitor can feel the control (nothing is sent anywhere).
 */
export function Accounts() {
  const { c } = useLocale()
  const [enabled, setEnabled] = useState([true, true, false])

  return (
    <section aria-labelledby="accounts-title" className="bg-canvas py-[var(--section-y)]">
      <div className="shell grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <Reveal as="p" className="eyebrow text-brand">
            {c.accounts.eyebrow}
          </Reveal>
          <RevealLines id="accounts-title" lines={[c.accounts.title]} className="t-h2 mt-4" />
          <Reveal as="p" index={1} className="t-lead mt-5 text-ink-soft">
            {c.accounts.body}
          </Reveal>
        </div>

        <Reveal variant="scale" index={1} className="lg:col-span-7">
          <div className="rounded-[22px] bg-surface p-2 shadow-[var(--shadow-float)] ring-1 ring-black/[0.06]">
            <div className="flex items-center justify-between gap-3 px-3 pt-2 pb-3">
              <div className="flex items-center gap-2.5">
                <span className="flex size-8 items-center justify-center rounded-lg bg-brand/10 text-brand">
                  <ShieldCheck className="size-[18px]" strokeWidth={1.9} aria-hidden />
                </span>
                <span className="text-[15px] font-bold text-ink">{c.accounts.panelTitle}</span>
              </div>
              <span className="text-[12.5px] text-muted">{c.accounts.toggleHint}</span>
            </div>

            <ul className="divide-y divide-line rounded-2xl bg-sunken ring-1 ring-line">
              {c.sample.offices.map((office, i) => {
                const on = enabled[i]
                return (
                  <li key={office} className="flex items-center gap-3 px-4 py-3.5">
                    <span
                      className={cn(
                        'flex size-10 shrink-0 items-center justify-center rounded-full text-[15px] font-bold transition-colors duration-300',
                        on ? 'bg-brand/10 text-brand' : 'bg-zinc-100 text-faint',
                      )}
                      aria-hidden
                    >
                      {office.replace(/^(مكتب ال|Al )/, '').charAt(0)}
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className={cn('truncate text-[15px] font-semibold transition-colors', on ? 'text-ink' : 'text-muted')}>{office}</div>
                      <Badge tone={on ? 'green' : 'gray'} className="mt-0.5">
                        {on ? c.accounts.active : c.accounts.disabled}
                      </Badge>
                    </div>
                    <Switch
                      checked={on}
                      label={`${on ? c.accounts.disable : c.accounts.enable} — ${office}`}
                      onChange={() => setEnabled((prev) => prev.map((v, j) => (j === i ? !v : v)))}
                    />
                  </li>
                )
              })}
            </ul>
            <p className="px-3 pt-3 pb-2 text-[13px] leading-6 text-muted">{c.accounts.note}</p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function Switch({ checked, label, onChange }: { checked: boolean; label: string; onChange: () => void }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={onChange}
      className={cn(
        'relative h-7 w-12 shrink-0 cursor-pointer rounded-full transition-colors duration-300',
        checked ? 'bg-emerald-500' : 'bg-zinc-300',
      )}
    >
      <span
        className={cn(
          'absolute top-0.5 size-6 rounded-full bg-white shadow-sm transition-[inset-inline-start] duration-300 ease-[var(--ease-out-soft)]',
          checked ? 'start-[calc(100%-26px)]' : 'start-0.5',
        )}
      />
    </button>
  )
}
