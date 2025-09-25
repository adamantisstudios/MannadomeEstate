"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Bed, Bath, Square, Heart, ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"
import type { Property } from "@/lib/database"
import { useScrollAnimation, useParallax } from "@/hooks/use-parallax"

export default function PropertyListings() {
  const [properties, setProperties] = useState<Property[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")
  const [currentSlide, setCurrentSlide] = useState(0)
  const [hoveredProperty, setHoveredProperty] = useState<string | null>(null)
  const [likedProperties, setLikedProperties] = useState<Set<string>>(new Set())

  const parallaxOffset = useParallax(0.2)
  const { isVisible: headerVisible, setElement: setHeaderElement } = useScrollAnimation()
  const { isVisible: cardsVisible, setElement: setCardsElement } = useScrollAnimation()

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await fetch("/api/properties?status=available&featured=true")
        if (!response.ok) {
          throw new Error("Failed to fetch properties")
        }
        const data = await response.json()
        setProperties(data.slice(0, 6))
      } catch (err) {
        console.error("Error fetching properties:", err)
        setError("Failed to load properties")
        setProperties([
          {
            id: "1",
            title: "Luxury Villa with Lake View",
            description: "Stunning villa with panoramic lake views",
            location: "East Legon, Accra",
            price: 450000,
            bedrooms: 4,
            bathrooms: 3,
            square_feet: 3200,
            property_type: "Villa",
            status: "available",
            featured: true,
            images: ["/images/property-villa-1.jpg", "/images/property-villa-2.jpg"],
            amenities: [],
            agent_name: "Kwame Asante",
            agent_phone: "+233 24 123 4567",
            agent_email: "kwame@lakesideestate.com",
            lot_size: "0.5 acres",
            year_built: 2022,
            created_at: "2024-01-15",
            updated_at: "2024-01-15",
          },
          {
            id: "2",
            title: "Modern Family House",
            description: "Beautiful family home in quiet neighborhood",
            location: "Airport Residential, Accra",
            price: 280000,
            bedrooms: 3,
            bathrooms: 2,
            square_feet: 2400,
            property_type: "House",
            status: "available",
            featured: false,
            images: ["/images/property-house-1.jpg", "/images/property-house-2.jpg"],
            amenities: [],
            agent_name: "Akosua Mensah",
            agent_phone: "+233 24 234 5678",
            agent_email: "akosua@lakesideestate.com",
            lot_size: "0.25 acres",
            year_built: 2020,
            created_at: "2024-01-14",
            updated_at: "2024-01-14",
          },
          {
            id: "3",
            title: "Executive Apartment",
            description: "Luxury apartment in prime location",
            location: "Cantonments, Accra",
            price: 180000,
            bedrooms: 2,
            bathrooms: 2,
            square_feet: 1800,
            property_type: "Apartment",
            status: "available",
            featured: true,
            images: ["/images/property-apartment-1.jpg", "/images/property-apartment-2.jpg"],
            amenities: [],
            agent_name: "Kofi Mensah",
            agent_phone: "+233 24 345 6789",
            agent_email: "kofi@lakesideestate.com",
            lot_size: "N/A",
            year_built: 2021,
            created_at: "2024-01-13",
            updated_at: "2024-01-13",
          },
          {
            id: "4",
            title: "Penthouse Suite",
            description: "Exclusive penthouse with city views",
            location: "Ridge, Accra",
            price: 650000,
            bedrooms: 3,
            bathrooms: 3,
            square_feet: 2800,
            property_type: "Penthouse",
            status: "available",
            featured: true,
            images: ["/images/property-penthouse-1.jpg"],
            amenities: [],
            agent_name: "Ama Osei",
            agent_phone: "+233 24 456 7890",
            agent_email: "ama@lakesideestate.com",
            lot_size: "N/A",
            year_built: 2023,
            created_at: "2024-01-12",
            updated_at: "2024-01-12",
          },
          {
            id: "5",
            title: "Garden Townhouse",
            description: "Spacious townhouse with private garden",
            location: "Tema, Greater Accra",
            price: 320000,
            bedrooms: 4,
            bathrooms: 3,
            square_feet: 2600,
            property_type: "Townhouse",
            status: "available",
            featured: false,
            images: ["/images/property-townhouse-1.jpg"],
            amenities: [],
            agent_name: "Yaw Boateng",
            agent_phone: "+233 24 567 8901",
            agent_email: "yaw@lakesideestate.com",
            lot_size: "0.3 acres",
            year_built: 2021,
            created_at: "2024-01-11",
            updated_at: "2024-01-11",
          },
          {
            id: "6",
            title: "Beachfront Condo",
            description: "Stunning oceanfront condominium",
            location: "Labadi, Accra",
            price: 420000,
            bedrooms: 2,
            bathrooms: 2,
            square_feet: 1900,
            property_type: "Condo",
            status: "available",
            featured: true,
            images: ["/images/property-condo-1.jpg"],
            amenities: [],
            agent_name: "Efua Asante",
            agent_phone: "+233 24 678 9012",
            agent_email: "efua@lakesideestate.com",
            lot_size: "N/A",
            year_built: 2022,
            created_at: "2024-01-10",
            updated_at: "2024-01-10",
          },
        ])
      } finally {
        setIsLoading(false)
      }
    }

    fetchProperties()
  }, [])

  const toggleLike = (propertyId: string) => {
    setLikedProperties((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(propertyId)) {
        newSet.delete(propertyId)
      } else {
        newSet.add(propertyId)
      }
      return newSet
    })
  }

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % Math.ceil(properties.length / 3))
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + Math.ceil(properties.length / 3)) % Math.ceil(properties.length / 3))
  }

  if (isLoading) {
    return (
      <section className="py-16 bg-gradient-to-br from-background to-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent mx-auto"></div>
            <p className="mt-2 text-muted-foreground">Loading properties...</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 bg-gradient-to-br from-background to-muted/30 relative overflow-hidden">
      <div className="absolute inset-0 opacity-5" style={{ transform: `translateY(${parallaxOffset}px)` }}>
        <div className="absolute top-20 right-20 w-32 h-32 bg-accent rounded-full blur-3xl"></div>
        <div className="absolute bottom-40 left-20 w-24 h-24 bg-primary rounded-full blur-2xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div
          ref={setHeaderElement}
          className={`text-center mb-12 transition-all duration-1000 ease-out ${
            headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="mb-8 relative">
            <div
              className="relative overflow-hidden rounded-lg shadow-lg hover-lift"
              style={{ transform: `translateY(${parallaxOffset * 0.3}px)` }}
            >
              <img
                src="/images/Featured.jpg"
                alt="Featured Properties"
                className="w-full max-w-3xl mx-auto h-48 object-cover transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent"></div>
            </div>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 font-heading">Featured Properties</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-[family-name:var(--font-body)]">
            Explore our carefully curated selection of premium properties across Ghana's most desirable locations
          </p>
        </div>

        {error && (
          <div className="text-center mb-8">
            <p className="text-destructive">{error}</p>
          </div>
        )}

        <div className="relative">
          <div className="flex items-center justify-between mb-6">
            <div className="flex space-x-2">
              {Array.from({ length: Math.ceil(properties.length / 3) }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    currentSlide === index ? "bg-accent scale-125" : "bg-muted-foreground/30 hover:bg-accent/50"
                  }`}
                />
              ))}
            </div>
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={prevSlide}
                className="hover-lift border-accent/30 hover:border-accent hover:bg-accent/10 bg-transparent"
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={nextSlide}
                className="hover-lift border-accent/30 hover:border-accent hover:bg-accent/10 bg-transparent"
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div className="overflow-hidden">
            <div
              ref={setCardsElement}
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {Array.from({ length: Math.ceil(properties.length / 3) }).map((_, slideIndex) => (
                <div key={slideIndex} className="w-full flex-shrink-0">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {properties.slice(slideIndex * 3, (slideIndex + 1) * 3).map((property, index) => (
                      <Card
                        key={property.id}
                        className={`group hover-lift hover-glow transition-all duration-500 overflow-hidden border-accent/20 bg-gradient-to-br from-card to-card/50 backdrop-blur-sm ${
                          cardsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                        }`}
                        style={{
                          transitionDelay: `${index * 150}ms`,
                          transform: hoveredProperty === property.id ? "translateY(-8px) scale(1.02)" : undefined,
                        }}
                        onMouseEnter={() => setHoveredProperty(property.id)}
                        onMouseLeave={() => setHoveredProperty(null)}
                      >
                        <div className="relative overflow-hidden">
                          <img
                            src={property.images[0] || "/images/property-placeholder.jpg"}
                            alt={property.title}
                            className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                          <div className="absolute top-4 left-4 flex gap-2">
                            {property.featured && (
                              <Badge className="bg-accent text-accent-foreground hover:bg-accent/90">Featured</Badge>
                            )}
                            <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                              {property.property_type}
                            </Badge>
                          </div>
                          <Button
                            size="sm"
                            variant="ghost"
                            className={`absolute top-4 right-4 bg-background/80 hover:bg-background transition-all duration-300 ${
                              likedProperties.has(property.id) ? "text-red-500" : "text-muted-foreground"
                            }`}
                            onClick={() => toggleLike(property.id)}
                          >
                            <Heart
                              className={`w-4 h-4 transition-all duration-300 ${
                                likedProperties.has(property.id) ? "fill-current scale-110" : ""
                              }`}
                            />
                          </Button>
                        </div>

                        <CardContent className="p-6">
                          <div className="flex items-center text-sm text-muted-foreground mb-2">
                            <MapPin className="w-4 h-4 mr-1 text-accent" />
                            {property.location}
                          </div>
                          <h3 className="text-xl font-semibold text-foreground mb-2 text-balance font-heading">
                            {property.title}
                          </h3>
                          <div className="text-2xl font-bold gradient-text mb-4">
                            ¢{property.price.toLocaleString()}
                          </div>

                          <div className="flex items-center justify-between text-sm text-muted-foreground">
                            <div className="flex items-center hover:text-accent transition-colors duration-300">
                              <Bed className="w-4 h-4 mr-1" />
                              {property.bedrooms} beds
                            </div>
                            <div className="flex items-center hover:text-accent transition-colors duration-300">
                              <Bath className="w-4 h-4 mr-1" />
                              {property.bathrooms} baths
                            </div>
                            <div className="flex items-center hover:text-accent transition-colors duration-300">
                              <Square className="w-4 h-4 mr-1" />
                              {property.square_feet} sq ft
                            </div>
                          </div>
                        </CardContent>

                        <CardFooter className="p-6 pt-0">
                          <Button
                            className="w-full hover-lift bg-transparent border-accent/30 text-foreground hover:bg-accent/10 hover:border-accent"
                            variant="outline"
                            asChild
                          >
                            <Link href={`/properties/${property.id}`}>View Details</Link>
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div
          className={`text-center mt-12 transition-all duration-1000 ease-out delay-500 ${
            cardsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <Button size="lg" asChild className="hover-lift bg-accent hover:bg-accent/90 text-accent-foreground">
            <Link href="/properties">View All Properties</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
