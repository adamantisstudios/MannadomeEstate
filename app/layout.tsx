import type React from "react"
import type { Metadata } from "next"
import { Playfair_Display, Source_Sans_3 as Source_Sans_Pro } from "next/font/google"
import HeaderBanner from "@/components/header-banner"
import ConditionalWhatsApp from "@/components/conditional-whatsapp"
import "./globals.css"

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair",
  weight: ["400", "700"],
})

const sourceSans = Source_Sans_Pro({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-source-sans",
  weight: ["300", "400", "600", "700"],
})

export const metadata: Metadata = {
  title: "Mannadome Estate Ltd | Real Estate, Property Sales & Management in Ghana",
  description:
    "Trusted real estate company in Ghana specializing in land sales, houses, rentals, apartments, and estate management services across Accra and nationwide.",
  keywords: [
    "real estate Ghana",
    "property for sale Ghana",
    "houses for rent Accra",
    "land for sale Accra",
    "property management Ghana",
    "apartments Accra",
    "real estate companies in Ghana",
    "affordable housing Ghana",
    "Mannadome Estate Ltd",
    "property investment Ghana",
  ],
  authors: [{ name: "Mannadome Estate Ltd" }],
  creator: "Mannadome Estate Ltd",
  publisher: "Mannadome Estate Ltd",
  robots: "index, follow",
  openGraph: {
    title: "Mannadome Estate Ltd | Real Estate in Ghana",
    description: "Reliable property sales, rentals, and estate management in Accra and nationwide.",
    url: "https://mannadomeestate.com",
    siteName: "Mannadome Estate Ltd",
    type: "website",
    locale: "en_GH",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mannadome Estate Ltd | Real Estate in Ghana",
    description: "Affordable land, property sales, rentals, and estate management in Ghana.",
    creator: "@mannadomeestate",
  },
  alternates: {
    canonical: "https://mannadomeestate.com",
  },
  generator: "v0.app",
}

const structuredData = {
  "@context": "https://schema.org",
  "@type": "RealEstateAgent",
  name: "Mannadome Estate Ltd",
  url: "https://mannadomeestate.com",
  description:
    "Mannadome Estate Ltd is a Ghanaian real estate company offering land sales, rentals, and property management across Accra and nationwide.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Accra",
    addressRegion: "Greater Accra",
    addressCountry: "GH",
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+233200694805",
    contactType: "Customer Service",
  },
  sameAs: [
    "https://facebook.com/mannadomeestate",
    "https://instagram.com/mannadomeestate",
    "https://linkedin.com/company/mannadomeestate",
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      </head>
      <body className={`font-sans ${playfair.variable} ${sourceSans.variable} antialiased`}>
        <HeaderBanner />
        {children}
        <ConditionalWhatsApp />
      </body>
    </html>
  )
}
