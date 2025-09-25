"use client"

import { useState, useEffect } from "react"
import { AdminHeader } from "@/components/admin-header"
import { AdminSidebar } from "@/components/admin-sidebar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus, Search, Eye, Edit, Trash2, MapPin, Bed, Bath, Square } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

// Interface for real property data
interface Property {
  id: string
  title: string
  description: string
  price: number
  location: string
  property_type: string
  bedrooms: number
  bathrooms: number
  square_feet: number
  status: string
  featured: boolean
  images: string[]
  created_at: string
}

export default function AdminPropertiesPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")
  // State for real properties data and loading
  const [properties, setProperties] = useState<Property[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")

  // useEffect to load real properties from database
  useEffect(() => {
    const loadProperties = async () => {
      try {
        console.log("[v0] Loading properties from database")
        const response = await fetch("/api/properties")

        if (!response.ok) {
          throw new Error("Failed to load properties")
        }

        const data = await response.json()
        console.log("[v0] Properties loaded:", data.length)
        setProperties(data)
      } catch (err) {
        console.error("[v0] Error loading properties:", err)
        setError("Failed to load properties")
      } finally {
        setIsLoading(false)
      }
    }

    loadProperties()
  }, [])

  const handleDeleteProperty = async (propertyId: string) => {
    if (!confirm("Are you sure you want to delete this property?")) {
      return
    }

    try {
      console.log("[v0] Deleting property:", propertyId)
      const response = await fetch(`/api/properties/${propertyId}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error("Failed to delete property")
      }

      console.log("[v0] Property deleted successfully")
      // Remove the property from the local state
      setProperties(properties.filter((p) => p.id !== propertyId))
    } catch (err) {
      console.error("[v0] Error deleting property:", err)
      alert("Failed to delete property. Please try again.")
    }
  }

  const filteredProperties = properties.filter((property) => {
    const matchesSearch =
      property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.location.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || property.status === statusFilter
    const matchesType = typeFilter === "all" || property.property_type.toLowerCase() === typeFilter.toLowerCase()

    return matchesSearch && matchesStatus && matchesType
  })

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <AdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <div className="lg:ml-64">
          <AdminHeader onMenuToggle={() => setSidebarOpen(!sidebarOpen)} />
          <main className="p-6">
            <div className="text-center py-12">
              <p className="text-gray-500">Loading properties...</p>
            </div>
          </main>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <AdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <div className="lg:ml-64">
          <AdminHeader onMenuToggle={() => setSidebarOpen(!sidebarOpen)} />
          <main className="p-6">
            <div className="text-center py-12">
              <p className="text-red-500">{error}</p>
              <Button onClick={() => window.location.reload()} className="mt-4">
                Retry
              </Button>
            </div>
          </main>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="lg:ml-64">
        <AdminHeader onMenuToggle={() => setSidebarOpen(!sidebarOpen)} />

        <main className="p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Properties</h1>
              <p className="text-gray-600">Manage your property listings</p>
            </div>
            <Button asChild className="mt-4 sm:mt-0">
              <Link href="/admin/properties/new">
                <Plus className="h-4 w-4 mr-2" />
                Add Property
              </Link>
            </Button>
          </div>

          {/* Filters */}
          <Card className="mb-6">
            <CardContent className="pt-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Search properties..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-full sm:w-40">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="available">Available</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="sold">Sold</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger className="w-full sm:w-40">
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="house">House</SelectItem>
                    <SelectItem value="villa">Villa</SelectItem>
                    <SelectItem value="apartment">Apartment</SelectItem>
                    <SelectItem value="land">Land</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Properties Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProperties.map((property) => (
              <Card key={property.id} className="overflow-hidden">
                <div className="relative h-48">
                  <Image
                    src={property.images[0] || "/placeholder.svg"}
                    alt={property.title}
                    fill
                    className="object-cover"
                  />
                  {property.featured && <Badge className="absolute top-2 left-2 bg-emerald-600">Featured</Badge>}
                  <Badge
                    className={`absolute top-2 right-2 ${
                      property.status === "available"
                        ? "bg-green-600"
                        : property.status === "pending"
                          ? "bg-yellow-600"
                          : "bg-gray-600"
                    }`}
                  >
                    {property.status}
                  </Badge>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-lg mb-2">{property.title}</h3>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">{property.description}</p>

                  <div className="flex items-center text-gray-500 text-sm mb-2">
                    <MapPin className="h-4 w-4 mr-1" />
                    {property.location}
                  </div>

                  <div className="flex items-center gap-4 text-gray-500 text-sm mb-3">
                    <div className="flex items-center">
                      <Bed className="h-4 w-4 mr-1" />
                      {property.bedrooms}
                    </div>
                    <div className="flex items-center">
                      <Bath className="h-4 w-4 mr-1" />
                      {property.bathrooms}
                    </div>
                    <div className="flex items-center">
                      <Square className="h-4 w-4 mr-1" />
                      {property.square_feet} sq ft
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-emerald-600">¢{property.price.toLocaleString()}</span>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="sm" asChild>
                        <Link href={`/admin/properties/${property.id}`}>
                          <Eye className="h-4 w-4" />
                        </Link>
                      </Button>
                      <Button variant="ghost" size="sm" asChild>
                        <Link href={`/admin/properties/${property.id}/edit`}>
                          <Edit className="h-4 w-4" />
                        </Link>
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => handleDeleteProperty(property.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredProperties.length === 0 && !isLoading && (
            <div className="text-center py-12">
              <p className="text-gray-500">No properties found matching your criteria.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
