"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Bed, Bath, Square, Heart, Grid, List, Loader2 } from "lucide-react"
import type { Property } from "@/lib/database"

interface PropertyGridProps {
  filters?: {
    location?: string
    propertyType?: string
    priceRange?: string
    bedrooms?: string
    bathrooms?: string
    furnishedStatus?: string
    listingType?: string
  }
}

export default function PropertyGrid({ filters = {} }: PropertyGridProps) {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [sortBy, setSortBy] = useState("featured")
  const [properties, setProperties] = useState<Property[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        console.log("[v0] Fetching properties from API")
        const response = await fetch("/api/properties")
        if (!response.ok) {
          throw new Error("Failed to fetch properties")
        }
        const data = await response.json()
        console.log("[v0] Properties loaded:", data.length)
        setProperties(data)
      } catch (err) {
        console.error("[v0] Error fetching properties:", err)
        setError("Failed to load properties")
      } finally {
        setLoading(false)
      }
    }

    fetchProperties()
  }, [])

  const filteredProperties = properties.filter((property) => {
    // Location filter
    if (filters.location && !property.location.toLowerCase().includes(filters.location.toLowerCase())) {
      return false
    }

    // Property type filter
    if (filters.propertyType && property.property_type !== filters.propertyType) {
      return false
    }

    // Bedrooms filter
    if (filters.bedrooms) {
      const bedroomCount = Number.parseInt(filters.bedrooms.replace("+", ""))
      if (property.bedrooms < bedroomCount) {
        return false
      }
    }

    // Price range filter
    if (filters.priceRange) {
      const price = property.price
      switch (filters.priceRange) {
        case "¢50k - ¢100k":
          if (price < 50000 || price > 100000) return false
          break
        case "¢100k - ¢250k":
          if (price < 100000 || price > 250000) return false
          break
        case "¢250k - ¢500k":
          if (price < 250000 || price > 500000) return false
          break
        case "¢500k+":
          if (price < 500000) return false
          break
      }
    }

    return true
  })

  const sortedProperties = [...filteredProperties].sort((a, b) => {
    switch (sortBy) {
      case "featured":
        return (b.featured ? 1 : 0) - (a.featured ? 1 : 0)
      case "price-low":
        return a.price - b.price
      case "price-high":
        return b.price - a.price
      case "newest":
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      default:
        return 0
    }
  })

  if (loading) {
    return (
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <span className="ml-2 text-muted-foreground">Loading properties...</span>
          </div>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-12">
            <p className="text-red-600 mb-4">{error}</p>
            <Button onClick={() => window.location.reload()}>Try Again</Button>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with view controls */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-2">Available Properties</h2>
            <p className="text-muted-foreground">{sortedProperties.length} properties found</p>
          </div>
          <div className="flex items-center gap-4">
            <select
              className="px-3 py-2 rounded-md border border-input bg-background text-foreground"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="featured">Featured First</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="newest">Newest First</option>
            </select>
            <div className="flex border border-input rounded-md">
              <Button
                variant={viewMode === "grid" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("grid")}
                className="rounded-r-none"
              >
                <Grid className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("list")}
                className="rounded-l-none"
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Property Grid */}
        <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" : "space-y-6"}>
          {sortedProperties.map((property) => (
            <Card key={property.id} className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
              <div className="relative">
                <img
                  src={property.images?.[0] || "/placeholder.svg?height=400&width=600&query=modern house"}
                  alt={property.title}
                  className={`w-full object-cover group-hover:scale-105 transition-transform duration-300 ${
                    viewMode === "grid" ? "h-64" : "h-48"
                  }`}
                />
                <div className="absolute top-4 left-4 flex gap-2">
                  {property.featured && <Badge className="bg-primary text-primary-foreground">Featured</Badge>}
                  <Badge variant="secondary">{property.property_type}</Badge>
                </div>
                <Button
                  size="sm"
                  variant="ghost"
                  className="absolute top-4 right-4 bg-background/80 hover:bg-background"
                >
                  <Heart className="w-4 h-4" />
                </Button>
              </div>

              <CardContent className="p-6">
                <div className="flex items-center text-sm text-muted-foreground mb-2">
                  <MapPin className="w-4 h-4 mr-1" />
                  {property.location}
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2 text-balance">{property.title}</h3>
                <p className="text-muted-foreground text-sm mb-3 font-[family-name:var(--font-body)]">
                  {property.description}
                </p>
                <div className="text-2xl font-bold text-primary mb-4">¢{property.price.toLocaleString()}</div>

                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <Bed className="w-4 h-4 mr-1" />
                    {property.bedrooms} beds
                  </div>
                  <div className="flex items-center">
                    <Bath className="w-4 h-4 mr-1" />
                    {property.bathrooms} baths
                  </div>
                  <div className="flex items-center">
                    <Square className="w-4 h-4 mr-1" />
                    {property.square_feet} sq ft
                  </div>
                </div>
              </CardContent>

              <CardFooter className="p-6 pt-0">
                <Link href={`/properties/${property.id}`} className="w-full">
                  <Button className="w-full bg-transparent" variant="outline">
                    View Details
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* Empty state */}
        {sortedProperties.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">
              {properties.length === 0 ? "No properties found" : "No properties match your search criteria"}
            </p>
            {properties.length === 0 ? (
              <Link href="/admin/properties/new">
                <Button>Add Your First Property</Button>
              </Link>
            ) : (
              <p className="text-sm text-muted-foreground">Try adjusting your filters</p>
            )}
          </div>
        )}
      </div>
    </section>
  )
}
