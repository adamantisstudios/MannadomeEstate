"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, MapPin, Home, ChevronLeft, ChevronRight } from "lucide-react"
import { useEffect, useState } from "react"

export default function HeroSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)

  const heroImages = [
    {
      src: "/images/hero-luxury-villa.jpg",
      alt: "Luxury villa with modern architecture",
      title: "Luxury Villas",

    },
    {
      src: "/images/hero-apartment-complex.jpg",
      alt: "Modern apartment complex with city view",
      title: "Premium Apartments",

    },
    {
      src: "/images/hero-family-home.jpg",
      alt: "Beautiful family home with garden",
      title: "Family Homes",

    },
    {
      src: "/images/hero-commercial-property.jpg",
      alt: "Commercial property in business district",
      title: "Commercial Properties",

    },
  ]

  useEffect(() => {
    setIsVisible(true)

    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length)
    }, 5000)

    return () => clearInterval(slideInterval)
  }, [heroImages.length])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroImages.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroImages.length) % heroImages.length)
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  return (
    <section className="relative min-h-[80vh] flex items-center justify-center bg-gradient-to-br from-primary/10 to-accent/5 parallax-container overflow-hidden">
      <div className="absolute inset-0 z-0">
        {heroImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
              index === currentSlide ? "opacity-100 scale-100" : "opacity-0 scale-105"
            }`}
          >
            <img src={image.src || "/placeholder.svg"} alt={image.alt} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-black/40"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
          </div>
        ))}
      </div>

      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-white text-primary p-3 rounded-full transition-all duration-300 hover:scale-110 md:left-8 shadow-lg"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-white text-primary p-3 rounded-full transition-all duration-300 hover:scale-110 md:right-8 shadow-lg"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex space-x-3">
        {heroImages.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide ? "bg-white scale-125 shadow-lg" : "bg-white/50 hover:bg-white/70"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      <div className="absolute top-8 right-8 z-20 bg-white/90 px-4 py-2 rounded-full shadow-lg">
        <div className="text-center">
          <span className="text-primary font-semibold text-sm block">{heroImages[currentSlide].title}</span>
          <span className="text-gray-600 text-xs">{heroImages[currentSlide].caption}</span>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto">
          <h1
            className={`text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 text-balance transition-all duration-1000 ease-out drop-shadow-lg ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <span className="text-white drop-shadow-lg">Mannadome Estate</span>
          </h1>
          <p
            className={`text-base sm:text-lg text-white/90 mb-8 text-pretty font-[family-name:var(--font-body)] transition-all duration-1000 ease-out delay-300 drop-shadow-md ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            Premium real estate in Ghana's finest locations
          </p>

          <div
            className={`bg-white/95 backdrop-blur-sm p-4 sm:p-6 rounded-lg shadow-xl max-w-4xl mx-auto mb-8 hover-glow transition-all duration-1000 ease-out delay-500 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5 transition-colors duration-300" />
                <Input
                  placeholder="Location"
                  className="pl-10 h-12 hover:border-primary/50 focus:border-primary transition-all duration-300 bg-white text-gray-900"
                />
              </div>
              <div className="relative">
                <Home className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5 transition-colors duration-300" />
                <select className="w-full h-12 pl-10 pr-4 rounded-md border border-gray-300 bg-white text-gray-900 hover:border-primary/50 focus:border-primary transition-all duration-300">
                  <option>Property Type</option>
                  <option>House</option>
                  <option>Apartment</option>
                  <option>Villa</option>
                  <option>Townhouse</option>
                  <option>Penthouse</option>
                  <option>Land</option>
                  <option>Student Hostel</option>
                  <option>Furnished Apartment</option>
                  <option>Hostel Room</option>
                </select>
              </div>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5">
                  &#8373;
                </span>
                <select className="w-full h-12 pl-10 pr-4 rounded-md border border-gray-300 bg-white text-gray-900 hover:border-primary/50 focus:border-primary transition-all duration-300">
                  <option>Price Range</option>
                  <option>¢50k - ¢100k</option>
                  <option>¢100k - ¢250k</option>
                  <option>¢250k - ¢500k</option>
                  <option>¢500k+</option>
                </select>
              </div>
              <Button
                size="lg"
                className="h-12 hover-lift bg-primary hover:bg-primary/90 text-white col-span-1 sm:col-span-2 md:col-span-1"
              >
                <Search className="w-5 h-5 mr-2" />
                Search
              </Button>
            </div>
          </div>

          <div
            className={`grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8 text-center transition-all duration-1000 ease-out delay-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <div className="hover-lift">
              <div className="text-2xl sm:text-3xl font-bold text-white mb-2 drop-shadow-lg">500+</div>
              <div className="text-sm sm:text-base text-white/80 font-[family-name:var(--font-body)] drop-shadow-md">
                Properties Listed
              </div>
            </div>
            <div className="hover-lift">
              <div className="text-2xl sm:text-3xl font-bold text-white mb-2 drop-shadow-lg">200+</div>
              <div className="text-sm sm:text-base text-white/80 font-[family-name:var(--font-body)] drop-shadow-md">
                Happy Clients
              </div>
            </div>
            <div className="hover-lift">
              <div className="text-2xl sm:text-3xl font-bold text-white mb-2 drop-shadow-lg">15+</div>
              <div className="text-sm sm:text-base text-white/80 font-[family-name:var(--font-body)] drop-shadow-md">
                Years Experience
              </div>
            </div>
            <div className="hover-lift">
              <div className="text-2xl sm:text-3xl font-bold text-white mb-2 drop-shadow-lg">50+</div>
              <div className="text-sm sm:text-base text-white/80 font-[family-name:var(--font-body)] drop-shadow-md">
                Locations
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
