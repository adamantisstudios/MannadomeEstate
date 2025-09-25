"use client"

import { useState } from "react"
import { X, Phone, Star } from "lucide-react"

export default function HeaderBanner() {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) return null

  return (
    <div className="bg-primary text-primary-foreground py-2 px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/90 to-accent/20"></div>
      <div className="max-w-7xl mx-auto flex items-center justify-center relative z-10">
        <div className="flex items-center space-x-4 text-sm font-medium">
          <div className="flex items-center space-x-1">
            <Star className="w-4 h-4 fill-current" />
            <span>Trusted Real Estate Partner in Ghana</span>
          </div>
          <div className="hidden sm:block w-px h-4 bg-primary-foreground/30"></div>
          <div className="hidden sm:flex items-center space-x-1">
            <Phone className="w-4 h-4" />
            <span>Call Now: +233 20 069 4805</span>
          </div>
          <div className="hidden md:block w-px h-4 bg-primary-foreground/30"></div>
          <div className="hidden md:block">
            <span>🏡 Find Your Dream Property Today!</span>
          </div>
        </div>
        <button
          onClick={() => setIsVisible(false)}
          className="absolute right-4 top-1/2 -translate-y-1/2 hover:bg-primary-foreground/20 rounded-full p-1 transition-colors duration-200"
          aria-label="Close banner"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}
