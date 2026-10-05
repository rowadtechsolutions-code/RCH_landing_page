import markUrl from '@/assets/brand/rch-mark.png'
import markOnDarkUrl from '@/assets/brand/rch-mark-on-dark.png'
import logoOnDarkUrl from '@/assets/brand/rch-logo-on-blue.png'
import { useLocale } from '@/i18n/LocaleProvider'
import { cn } from '@/lib/cn'

/** The RCH mark (roof line + letters). `onDark` uses the reversed artwork cropped from the official reversed logo. */
export function BrandMark({ onDark = false, className, decorative = false }: { onDark?: boolean; className?: string; decorative?: boolean }) {
  const { c } = useLocale()
  return (
    <img
      src={onDark ? markOnDarkUrl : markUrl}
      width={onDark ? 640 : 360}
      height={onDark ? 288 : 160}
      alt={decorative ? '' : `${c.brand.name} — ${c.brand.fullName}`}
      draggable={false}
      className={cn('h-8 w-auto select-none', className)}
    />
  )
}

/** The full reversed logo (white with the orange arc) with its English and Arabic lines, untouched — for dark sections. */
export function BrandLogo({ className }: { className?: string }) {
  const { c } = useLocale()
  return (
    <img
      src={logoOnDarkUrl}
      width={640}
      height={466}
      loading="lazy"
      decoding="async"
      alt={`${c.brand.name} — ${c.brand.fullName} — ${c.brand.tagline}`}
      draggable={false}
      className={cn('h-auto select-none', className)}
    />
  )
}
