"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, MapPin, Home, X, Filter } from "lucide-react"

interface PropertySearchProps {
  onFiltersChange?: (filters: any) => void
}

export default function PropertySearch({ onFiltersChange }: PropertySearchProps) {
  const [filters, setFilters] = useState({
    location: "",
    propertyType: "",
    priceRange: "",
    bedrooms: "",
    bathrooms: "",
    furnishedStatus: "",
    listingType: "",
  })

  const [activeFilters, setActiveFilters] = useState<string[]>([])

  const handleFilterChange = (key: string, value: string) => {
    const newFilters = { ...filters, [key]: value }
    setFilters(newFilters)

    if (onFiltersChange) {
      onFiltersChange(newFilters)
    }

    if (value && !activeFilters.includes(`${key}: ${value}`)) {
      setActiveFilters((prev) => [...prev, `${key}: ${value}`])
    } else if (!value) {
      // Remove filter from active filters if value is empty
      setActiveFilters((prev) => prev.filter((filter) => !filter.startsWith(`${key}:`)))
    }
  }

  const removeFilter = (filterToRemove: string) => {
    setActiveFilters((prev) => prev.filter((filter) => filter !== filterToRemove))
    const [key] = filterToRemove.split(": ")
    const newFilters = { ...filters, [key]: "" }
    setFilters(newFilters)

    if (onFiltersChange) {
      onFiltersChange(newFilters)
    }
  }

  const clearAllFilters = () => {
    const clearedFilters = {
      location: "",
      propertyType: "",
      priceRange: "",
      bedrooms: "",
      bathrooms: "",
      furnishedStatus: "",
      listingType: "",
    }
    setFilters(clearedFilters)
    setActiveFilters([])

    if (onFiltersChange) {
      onFiltersChange(clearedFilters)
    }
  }

  return (
    <div className="space-y-6">
      <Card className="bg-card/95 backdrop-blur">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <Input
                placeholder="Location"
                className="pl-10 h-12"
                value={filters.location}
                onChange={(e) => handleFilterChange("location", e.target.value)}
              />
            </div>
            <div className="relative">
              <Home className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <select
                className="w-full h-12 pl-10 pr-4 rounded-md border border-input bg-background text-foreground"
                value={filters.propertyType}
                onChange={(e) => handleFilterChange("propertyType", e.target.value)}
              >
                <option value="">Property Type</option>
                <option value="House">House</option>
                <option value="Apartment">Apartment</option>
                <option value="Villa">Villa</option>
                <option value="Townhouse">Townhouse</option>
                <option value="Penthouse">Penthouse</option>
                <option value="Land">Land</option>
                <option value="Student Hostel">Student Hostel</option>
                <option value="Furnished Apartment">Furnished Apartment</option>
                <option value="Hostel Room">Hostel Room</option>
              </select>
            </div>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5">
                ¢
              </span>
              <select
                className="w-full h-12 pl-10 pr-4 rounded-md border border-input bg-background text-foreground"
                value={filters.priceRange}
                onChange={(e) => handleFilterChange("priceRange", e.target.value)}
              >
                <option value="">Price Range</option>
                <option value="¢50k - ¢100k">¢50k - ¢100k</option>
                <option value="¢100k - ¢250k">¢100k - ¢250k</option>
                <option value="¢250k - ¢500k">¢250k - ¢500k</option>
                <option value="¢500k+">¢500k+</option>
              </select>
            </div>
            <div className="relative">
              <select
                className="w-full h-12 px-4 rounded-md border border-input bg-background text-foreground"
                value={filters.bedrooms}
                onChange={(e) => handleFilterChange("bedrooms", e.target.value)}
              >
                <option value="">Bedrooms</option>
                <option value="1+">1+</option>
                <option value="2+">2+</option>
                <option value="3+">3+</option>
                <option value="4+">4+</option>
                <option value="5+">5+</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <select
                className="w-full h-12 px-4 rounded-md border border-input bg-background text-foreground"
                value={filters.furnishedStatus}
                onChange={(e) => handleFilterChange("furnishedStatus", e.target.value)}
              >
                <option value="">Furnished Status</option>
                <option value="Furnished">Furnished</option>
                <option value="Unfurnished">Unfurnished</option>
                <option value="Semi-Furnished">Semi-Furnished</option>
              </select>
            </div>
            <div className="relative">
              <select
                className="w-full h-12 px-4 rounded-md border border-input bg-background text-foreground"
                value={filters.listingType}
                onChange={(e) => handleFilterChange("listingType", e.target.value)}
              >
                <option value="">Listing Type</option>
                <option value="For Sale">For Sale</option>
                <option value="For Rent">For Rent</option>
              </select>
            </div>
            <Button size="lg" className="h-12">
              <Search className="w-5 h-5 mr-2" />
              Search
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Active Filters */}
      {activeFilters.length > 0 && (
        <div className="flex flex-wrap gap-2 items-center">
          <Filter className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">Active filters:</span>
          {activeFilters.map((filter, index) => (
            <Badge key={index} variant="secondary" className="flex items-center gap-1">
              {filter}
              <X className="w-3 h-3 cursor-pointer hover:text-destructive" onClick={() => removeFilter(filter)} />
            </Badge>
          ))}
          <Button variant="ghost" size="sm" onClick={clearAllFilters} className="text-xs">
            Clear all
          </Button>
        </div>
      )}
    </div>
  )
}
