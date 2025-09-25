"use client"

import { MessageCircle } from "lucide-react"
import { useState, useEffect } from "react"

export default function WhatsAppFloat() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 2000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <a
      href="https://wa.me/233200694805?text=Hi%2C%20I%20would%20like%20to%20inquire%20about%20your%20real%20estate%20services."
      target="_blank"
      rel="noopener noreferrer"
      className={`fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition-all duration-500 hover:scale-110 hover:shadow-2xl group ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-16 opacity-0"
      }`}
      aria-label="Contact us on WhatsApp"
    >
      <div className="absolute inset-0 bg-green-400 rounded-full animate-ping opacity-75 group-hover:opacity-0 transition-opacity duration-300"></div>
      <MessageCircle className="w-6 h-6 relative z-10 transition-transform duration-300 group-hover:rotate-12" />

      <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-gray-900 text-white text-sm px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap pointer-events-none">
        Chat with us on WhatsApp
        <div className="absolute left-full top-1/2 -translate-y-1/2 border-4 border-transparent border-l-gray-900"></div>
      </div>
    </a>
  )
}
