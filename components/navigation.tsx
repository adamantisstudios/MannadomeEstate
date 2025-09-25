"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X, Phone, Mail } from "lucide-react"

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 border-b border-border transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 hover-lift">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center transition-all duration-300 hover:bg-accent">
              <img
                src="/logo-placeholder.png"
                alt="Mannadome Estate Ltd Logo"
                className="w-6 h-6 object-contain"
                onError={(e) => {
                  e.currentTarget.style.display = "none"
                  e.currentTarget.nextElementSibling.style.display = "flex"
                }}
              />
              <span className="text-primary-foreground font-bold text-lg hidden">M</span>
            </div>
            <span className="font-bold text-xl text-foreground gradient-text">Mannadome Estate Ltd</span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-foreground hover:text-accent transition-all duration-300 relative group">
              Home
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link
              href="/about"
              className="text-foreground hover:text-accent transition-all duration-300 relative group"
            >
              About
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link
              href="/properties"
              className="text-foreground hover:text-accent transition-all duration-300 relative group"
            >
              Properties
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link
              href="/contact"
              className="text-foreground hover:text-accent transition-all duration-300 relative group"
            >
              Contact
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <div className="flex items-center space-x-1 hover:text-accent transition-colors duration-300">
                <Phone className="w-4 h-4" />
                <span>+233 20 069 4805</span>
              </div>
              <div className="flex items-center space-x-1 hover:text-accent transition-colors duration-300">
                <Mail className="w-4 h-4" />
                <span>info.mannadomeestate@gmail.com</span>
              </div>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button variant="ghost" size="sm" onClick={() => setIsMenuOpen(!isMenuOpen)} className="hover-lift">
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>

        <div
          className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${
            isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-card border-t border-border">
            <Link
              href="/"
              className="block px-3 py-2 text-foreground hover:text-accent hover:bg-muted/50 rounded-md transition-all duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/about"
              className="block px-3 py-2 text-foreground hover:text-accent hover:bg-muted/50 rounded-md transition-all duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link
              href="/properties"
              className="block px-3 py-2 text-foreground hover:text-accent hover:bg-muted/50 rounded-md transition-all duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              Properties
            </Link>
            <Link
              href="/contact"
              className="block px-3 py-2 text-foreground hover:text-accent hover:bg-muted/50 rounded-md transition-all duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
            <div className="px-3 py-2 space-y-2 text-sm text-muted-foreground border-t border-border mt-2">
              <div className="flex items-center space-x-2 hover:text-accent transition-colors duration-300">
                <Phone className="w-4 h-4" />
                <span>+233 20 069 4805</span>
              </div>
              <div className="flex items-center space-x-2 hover:text-accent transition-colors duration-300">
                <Mail className="w-4 h-4" />
                <span>info.mannadomeestate@gmail.com</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
