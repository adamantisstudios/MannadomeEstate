"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  MapPin,
  Bed,
  Bath,
  Square,
  Heart,
  Share2,
  Phone,
  Mail,
  Calendar,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"

interface PropertyDetailsProps {
  propertyId: string
}

interface Property {
  id: string
  title: string
  location: string
  price: number
  bedrooms: number
  bathrooms: number
  square_feet: number
  property_type: string
  featured: boolean
  images: string[]
  description: string
  amenities: string[]
  agent_name: string
  agent_phone: string
  agent_email: string
  year_built: number
  status: string
}

export default function PropertyDetails({ propertyId }: PropertyDetailsProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [property, setProperty] = useState<Property | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        console.log("[v0] Fetching property details for ID:", propertyId)
        const response = await fetch(`/api/properties/${propertyId}`)

        if (!response.ok) {
          throw new Error("Property not found")
        }

        const propertyData = await response.json()
        console.log("[v0] Property data loaded:", propertyData.title)
        setProperty(propertyData)
      } catch (err) {
        console.error("[v0] Error fetching property:", err)
        setError("Property not found")
      } finally {
        setLoading(false)
      }
    }

    if (propertyId) {
      fetchProperty()
    }
  }, [propertyId])

  if (loading) {
    return <div className="py-16 text-center">Loading property details...</div>
  }

  if (error || !property) {
    return <div className="py-16 text-center">Property not found</div>
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % property.images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + property.images.length) % property.images.length)
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-GH", {
      style: "currency",
      currency: "GHS",
      minimumFractionDigits: 0,
    }).format(price)
  }

  return (
    <div className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Image Gallery */}
            <div className="relative">
              <div className="relative h-96 rounded-lg overflow-hidden">
                <img
                  src={property.images[currentImageIndex] || "/placeholder.svg?height=400&width=800&query=property"}
                  alt={property.title}
                  className="w-full h-full object-cover"
                />
                {property.images.length > 1 && (
                  <>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-background/80 hover:bg-background"
                      onClick={prevImage}
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-background/80 hover:bg-background"
                      onClick={nextImage}
                    >
                      <ChevronRight className="w-5 h-5" />
                    </Button>
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                      {property.images.map((_, index) => (
                        <button
                          key={index}
                          className={`w-2 h-2 rounded-full ${
                            index === currentImageIndex ? "bg-primary" : "bg-background/60"
                          }`}
                          onClick={() => setCurrentImageIndex(index)}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>
              {property.images.length > 1 && (
                <div className="grid grid-cols-4 gap-2 mt-4">
                  {property.images.slice(0, 4).map((image, index) => (
                    <button
                      key={index}
                      className={`relative h-20 rounded-md overflow-hidden ${
                        index === currentImageIndex ? "ring-2 ring-primary" : ""
                      }`}
                      onClick={() => setCurrentImageIndex(index)}
                    >
                      <img
                        src={image || "/placeholder.svg?height=80&width=120&query=property"}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Property Info */}
            <div>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    {property.featured && <Badge className="bg-primary text-primary-foreground">Featured</Badge>}
                    <Badge variant="secondary">{property.property_type}</Badge>
                    <Badge variant="outline">{property.status}</Badge>
                  </div>
                  <h1 className="text-3xl font-bold text-foreground mb-2 text-balance">{property.title}</h1>
                  <div className="flex items-center text-muted-foreground mb-2">
                    <MapPin className="w-5 h-5 mr-2" />
                    {property.location}
                  </div>
                  <div className="text-3xl font-bold text-primary">{formatPrice(property.price)}</div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Heart className="w-4 h-4 mr-2" />
                    Save
                  </Button>
                  <Button variant="outline" size="sm">
                    <Share2 className="w-4 h-4 mr-2" />
                    Share
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="text-center p-4 bg-card rounded-lg">
                  <Bed className="w-6 h-6 mx-auto mb-2 text-primary" />
                  <div className="font-semibold">{property.bedrooms}</div>
                  <div className="text-sm text-muted-foreground">Bedrooms</div>
                </div>
                <div className="text-center p-4 bg-card rounded-lg">
                  <Bath className="w-6 h-6 mx-auto mb-2 text-primary" />
                  <div className="font-semibold">{property.bathrooms}</div>
                  <div className="text-sm text-muted-foreground">Bathrooms</div>
                </div>
                <div className="text-center p-4 bg-card rounded-lg">
                  <Square className="w-6 h-6 mx-auto mb-2 text-primary" />
                  <div className="font-semibold">{property.square_feet} sq ft</div>
                  <div className="text-sm text-muted-foreground">Area</div>
                </div>
                <div className="text-center p-4 bg-card rounded-lg">
                  <Calendar className="w-6 h-6 mx-auto mb-2 text-primary" />
                  <div className="font-semibold">{property.year_built}</div>
                  <div className="text-sm text-muted-foreground">Year Built</div>
                </div>
              </div>

              <Separator className="my-6" />

              <div>
                <h2 className="text-2xl font-semibold text-foreground mb-4">Description</h2>
                <p className="text-muted-foreground font-[family-name:var(--font-body)] text-pretty leading-relaxed">
                  {property.description}
                </p>
              </div>

              {property.amenities && property.amenities.length > 0 && (
                <>
                  <Separator className="my-6" />
                  <div>
                    <h2 className="text-2xl font-semibold text-foreground mb-4">Amenities</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {property.amenities.map((amenity, index) => (
                        <div key={index} className="flex items-center">
                          <div className="w-2 h-2 bg-primary rounded-full mr-3" />
                          <span className="text-muted-foreground font-[family-name:var(--font-body)]">{amenity}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Agent Contact */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">Contact Agent</h3>
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src="/agent-profile.png"
                    alt={property.agent_name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <div className="font-semibold text-foreground">{property.agent_name}</div>
                    <div className="text-sm text-muted-foreground">Property Consultant</div>
                  </div>
                </div>
                <div className="space-y-3">
                  <Button className="w-full" asChild>
                    <a href={`tel:${property.agent_phone}`}>
                      <Phone className="w-4 h-4 mr-2" />
                      Call Now
                    </a>
                  </Button>
                  <Button variant="outline" className="w-full bg-transparent" asChild>
                    <a href={`mailto:${property.agent_email}`}>
                      <Mail className="w-4 h-4 mr-2" />
                      Send Message
                    </a>
                  </Button>
                  <Button variant="outline" className="w-full bg-transparent">
                    <Calendar className="w-4 h-4 mr-2" />
                    Schedule Viewing
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Property Details */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">Property Details</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Property ID:</span>
                    <span className="font-medium">{property.id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Type:</span>
                    <span className="font-medium capitalize">{property.property_type}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Year Built:</span>
                    <span className="font-medium">{property.year_built}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Status:</span>
                    <span className="font-medium capitalize">{property.status}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
