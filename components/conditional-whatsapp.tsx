"use client"

import { usePathname } from "next/navigation"
import WhatsAppFloat from "./whatsapp-float"

export default function ConditionalWhatsApp() {
  const pathname = usePathname()

  // Don't show WhatsApp on contact page or admin pages
  const shouldHideWhatsApp = pathname === "/contact" || pathname.startsWith("/admin")

  if (shouldHideWhatsApp) {
    return null
  }

  return <WhatsAppFloat />
}
