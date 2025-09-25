"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react"
import type { Testimonial } from "@/lib/database"

export default function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await fetch("/api/testimonials?featured=true")
        if (!response.ok) {
          throw new Error("Failed to fetch testimonials")
        }
        const data = await response.json()
        setTestimonials(data)
      } catch (error) {
        console.error("Error fetching testimonials:", error)
        setTestimonials([
          {
            id: "1",
            client_name: "Kwame Asante",
            client_image: "/images/client-1.jpg",
            rating: 5,
            testimonial:
              "Mannadome Estate helped me find the perfect commercial property for my business. Their professionalism and market knowledge are unmatched. As a business owner, I appreciate their attention to detail and transparency in every transaction.",
            property_type: "Commercial Property",
            featured: true,
            created_at: "2024-01-15",
          },
          {
            id: "2",
            client_name: "Akosua Mensah",
            client_image: "/images/client-2.jpg",
            rating: 5,
            testimonial:
              "As a first-time homebuyer, I was nervous about the process. The team at Mannadome Estate guided me every step of the way. Their expertise made what seemed overwhelming into a smooth and exciting journey to homeownership.",
            property_type: "Family Home",
            featured: true,
            created_at: "2024-01-14",
          },
          {
            id: "3",
            client_name: "Kofi Boateng",
            client_image: "/images/client-3.jpg",
            rating: 5,
            testimonial:
              "I have been investing in real estate for over 10 years, and Mannadome Estate consistently delivers quality properties with excellent returns. Their market analysis and investment advice have been invaluable to my portfolio growth.",
            property_type: "Investment Property",
            featured: true,
            created_at: "2024-01-13",
          },
          {
            id: "4",
            client_name: "Ama Osei",
            client_image: "/images/client-4.jpg",
            rating: 5,
            testimonial:
              "The customer service is exceptional. They found me a beautiful family home in East Legon within my budget. The entire team was patient, professional, and truly cared about finding the right property for my family.",
            property_type: "Villa",
            featured: true,
            created_at: "2024-01-12",
          },
          {
            id: "5",
            client_name: "Yaw Oppong",
            client_image: "/images/client-5.jpg",
            rating: 5,
            testimonial:
              "Professional, reliable, and trustworthy. Mannadome Estate sold my property quickly and at a great price. Their marketing strategy and negotiation skills are top-notch. I will definitely use their services again.",
            property_type: "Luxury Apartment",
            featured: true,
            created_at: "2024-01-11",
          },
          {
            id: "6",
            client_name: "Efua Adjei",
            client_image: "/images/client-6.jpg",
            rating: 5,
            testimonial:
              "Their market reports and property valuations are always accurate. As a business owner, I appreciate their attention to detail and transparency. Mannadome Estate has become my trusted partner for all real estate needs.",
            property_type: "Commercial Building",
            featured: true,
            created_at: "2024-01-10",
          },
        ])
      } finally {
        setIsLoading(false)
      }
    }

    fetchTestimonials()
  }, [])

  const scrollToIndex = (index: number) => {
    setCurrentIndex(index)
    if (scrollContainerRef.current) {
      const cardWidth = 384 // w-96 = 384px
      const gap = 32 // gap-8 = 32px
      const scrollPosition = index * (cardWidth + gap)
      scrollContainerRef.current.scrollTo({
        left: scrollPosition,
        behavior: "smooth",
      })
    }
  }

  const nextTestimonial = () => {
    const nextIndex = (currentIndex + 1) % testimonials.length
    scrollToIndex(nextIndex)
  }

  const prevTestimonial = () => {
    const prevIndex = (currentIndex - 1 + testimonials.length) % testimonials.length
    scrollToIndex(prevIndex)
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star key={i} className={`w-4 h-4 ${i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} />
    ))
  }

  if (isLoading) {
    return (
      <section className="py-16 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
            <p className="mt-2 text-muted-foreground">Loading testimonials...</p>
          </div>
        </div>
      </section>
    )
  }

  if (testimonials.length === 0) {
    return null
  }

  return (
    <section className="py-16 bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="mb-8">
            <img
              src="/images/testimonials-hero.jpg"
              alt="Happy Clients"
              className="w-full max-w-2xl mx-auto h-48 object-cover rounded-lg shadow-lg"
            />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">What Our Clients Say</h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-6"></div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-[family-name:var(--font-body)]">
            Hear from our satisfied clients about their experience with Mannadome Estate
          </p>
        </div>

        <div className="relative">
          {/* Testimonials Container */}
          <div
            ref={scrollContainerRef}
            className="flex gap-8 overflow-x-auto scrollbar-hide pb-8"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {testimonials.map((testimonial) => (
              <Card
                key={testimonial.id}
                className="flex-shrink-0 w-96 group hover:shadow-lg transition-all duration-300"
              >
                <CardContent className="p-8 h-full flex flex-col">
                  <div className="flex items-center mb-6">
                    <img
                      src={testimonial.client_image || "/images/client-placeholder.jpg"}
                      alt={testimonial.client_name}
                      className="w-16 h-16 rounded-full object-cover mr-4"
                    />
                    <div>
                      <h3 className="font-semibold text-lg text-foreground">{testimonial.client_name}</h3>
                      <p className="text-muted-foreground text-sm mb-2">{testimonial.property_type} Owner</p>
                      <div className="flex">{renderStars(testimonial.rating)}</div>
                    </div>
                  </div>
                  <div className="flex-1">
                    <Quote className="w-8 h-8 text-primary/20 mb-4" />
                    <p className="text-muted-foreground italic font-[family-name:var(--font-body)] text-pretty leading-relaxed">
                      {testimonial.testimonial}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-center mt-8 space-x-4">
            <Button
              variant="outline"
              size="sm"
              onClick={prevTestimonial}
              className="rounded-full w-12 h-12 p-0 bg-transparent"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={nextTestimonial}
              className="rounded-full w-12 h-12 p-0 bg-transparent"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-6 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollToIndex(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentIndex ? "bg-primary" : "bg-muted-foreground/30"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
