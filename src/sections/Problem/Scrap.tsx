import type { ReactNode } from 'react'
import { Calculator, FileSpreadsheet, Folder, MessageCircle, NotebookPen } from 'lucide-react'
import { cn } from '@/lib/cn'

export type ScrapKind = 'sheet' | 'chat' | 'note' | 'files' | 'calc'

/**
 * One of the places an office's information ends up today. Each scrap is drawn in the material it comes from
 * (a spreadsheet, a chat bubble, a notebook page, a file stack, a calculator) — no brand logos of those tools.
 */
export function Scrap({ kind, label, text, className }: { kind: ScrapKind; label: string; text: string; className?: string }) {
  const base = 'w-[min(78vw,270px)] rounded-2xl p-3.5 shadow-[var(--shadow-soft)] ring-1'

  if (kind === 'sheet')
    return (
      <div className={cn(base, 'bg-white ring-black/[0.06]', className)}>
        <Head icon={<FileSpreadsheet className="size-4" />} iconClass="bg-emerald-600 text-white" label={label} />
        <div className="ltr truncate text-[13px] font-medium text-ink">{text}</div>
        <div className="mt-2.5 grid grid-cols-3 gap-px overflow-hidden rounded-md bg-line text-[11px]" dir="ltr">
          {['48', '24', '#REF!', '16', '—', '88?'].map((v) => (
            <span key={v} className={cn('bg-white px-2 py-1.5 font-mono', v === '#REF!' && 'bg-rose-50 text-rose-600')}>
              {v}
            </span>
          ))}
        </div>
      </div>
    )

  if (kind === 'chat')
    return (
      <div className={cn(base, 'bg-[#f0f2ef] ring-black/[0.05]', className)}>
        <Head icon={<MessageCircle className="size-4" />} iconClass="bg-emerald-500 text-white" label={label} />
        <div className="relative max-w-[92%] rounded-xl rounded-ss-sm bg-white px-3 py-2 text-[14px] leading-6 text-ink shadow-sm">
          {text}
          <span className="num ms-2 align-bottom text-[10.5px] text-muted">11:42</span>
        </div>
      </div>
    )

  if (kind === 'note')
    return (
      <div
        className={cn(base, 'bg-[#fff8e6] ring-amber-900/10', className)}
        style={{ backgroundImage: 'repeating-linear-gradient(to bottom, transparent 0 25px, rgb(180 140 60 / 0.18) 25px 26px)' }}
      >
        <Head icon={<NotebookPen className="size-4" />} iconClass="bg-amber-500 text-white" label={label} />
        <div className="text-[15px] leading-[26px] text-amber-950/85">{text}</div>
      </div>
    )

  if (kind === 'files')
    return (
      <div className={cn('relative', className)}>
        <div className="absolute inset-0 translate-x-2 -translate-y-2 rotate-2 rounded-2xl bg-white/70 ring-1 ring-black/[0.05]" aria-hidden />
        <div className="absolute inset-0 translate-x-1 -translate-y-1 rotate-1 rounded-2xl bg-white/85 ring-1 ring-black/[0.05]" aria-hidden />
        <div className={cn(base, 'relative bg-white ring-black/[0.06]')}>
          <Head icon={<Folder className="size-4" />} iconClass="bg-sky-600 text-white" label={label} />
          <div className="truncate text-[14px] font-medium text-ink">{text}</div>
        </div>
      </div>
    )

  return (
    <div className={cn(base, 'bg-[#1f2430] ring-white/10', className)}>
      <Head icon={<Calculator className="size-4" />} iconClass="bg-white/15 text-white" label={label} dark />
      <div className="rounded-lg bg-[#c9d4c0] px-3 py-2 text-end text-[20px] font-semibold text-[#253024]">{text}</div>
    </div>
  )
}

function Head({ icon, iconClass, label, dark = false }: { icon: ReactNode; iconClass: string; label: string; dark?: boolean }) {
  return (
    <div className="mb-2.5 flex items-center gap-2">
      <span className={cn('flex size-6 items-center justify-center rounded-md', iconClass)}>{icon}</span>
      <span className={cn('text-[12.5px] font-semibold', dark ? 'text-white/70' : 'text-muted')}>{label}</span>
    </div>
  )
}
