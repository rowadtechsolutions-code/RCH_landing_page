/** Real company contact details — the same support line the RCH app shows in its sidebar. */
export const SUPPORT_PHONE = '+968 7768 5747'
export const SUPPORT_PHONE_HREF = `tel:${SUPPORT_PHONE.replace(/\s/g, '')}`

/** wa.me link that opens WhatsApp on the support number with a prefilled, localised opener. */
export function whatsappUrl(message: string): string {
  return `https://wa.me/${SUPPORT_PHONE.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`
}
