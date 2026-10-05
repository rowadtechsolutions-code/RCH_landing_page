import type { Content } from '@/content/ar'

/** Omani rial amounts use three decimals, as in the product. */
export function money(value: number, c: Content): string {
  const n = value.toLocaleString('en-US', { minimumFractionDigits: 3, maximumFractionDigits: 3 })
  return c.locale === 'ar' ? `${n} ${c.ui.currency}` : `${c.ui.currency} ${n}`
}
