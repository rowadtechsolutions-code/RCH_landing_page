import type { AnchorHTMLAttributes, ReactNode } from 'react'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { useLocale } from '@/i18n/LocaleProvider'
import { cn } from '@/lib/cn'

type Variant = 'primary' | 'light' | 'ghost' | 'ghostLight'
type Size = 'md' | 'lg'

const variants: Record<Variant, string> = {
  primary: 'bg-brand text-white hover:bg-brand-strong shadow-[0_10px_30px_-12px_rgb(37_99_235/0.7)]',
  light: 'bg-white text-night hover:bg-brand-soft',
  ghost: 'text-ink ring-1 ring-inset ring-line-strong hover:ring-ink/40 hover:bg-white',
  ghostLight: 'text-white ring-1 ring-inset ring-white/25 hover:ring-white/50 hover:bg-white/[0.06]',
}

const sizes: Record<Size, string> = {
  md: 'h-11 px-5 text-[15px] gap-2',
  lg: 'h-14 px-7 text-base gap-2.5',
}

interface ButtonLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: Variant
  size?: Size
  /** Shows a direction-aware arrow that nudges forward on hover. */
  arrow?: boolean
  icon?: ReactNode
}

/** Every call to action on the site is a link (anchor or WhatsApp), so the button is an anchor. */
export function ButtonLink({ variant = 'primary', size = 'md', arrow = false, icon, className, children, ...rest }: ButtonLinkProps) {
  const { c } = useLocale()
  const Arrow = c.dir === 'rtl' ? ArrowLeft : ArrowRight
  const external = rest.href?.startsWith('http')
  return (
    <a
      {...rest}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      className={cn(
        'group/btn inline-flex shrink-0 cursor-pointer items-center justify-center rounded-full font-semibold whitespace-nowrap transition-[background-color,box-shadow,color,transform] duration-300 ease-[var(--ease-out-soft)] active:scale-[0.97]',
        variants[variant],
        sizes[size],
        className,
      )}
    >
      {icon}
      <span>{children}</span>
      {arrow && (
        <Arrow
          aria-hidden
          className="size-[1.1em] transition-transform duration-300 ease-[var(--ease-out-soft)] ltr:group-hover/btn:translate-x-1 rtl:group-hover/btn:-translate-x-1"
          strokeWidth={2.2}
        />
      )}
    </a>
  )
}
