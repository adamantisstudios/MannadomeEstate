"use client"

import { useState, useEffect } from "react"
import { AdminHeader } from "@/components/admin-header"
import { AdminSidebar } from "@/components/admin-sidebar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { MapPin, Bed, Bath, Square, ArrowLeft, Edit, Trash2, Calendar, ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

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
  amenities: string[]
  agent_name: string
  agent_phone: string
  agent_email: string
  year_built: number
  created_at: string
}

interface AdminPropertyDetailPageProps {
  params: Promise<{
    id: string
  }>
}

export default function AdminPropertyDetailPage({ params }: AdminPropertyDetailPageProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [property, setProperty] = useState<Property | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")
  const [propertyId, setPropertyId] = useState<string>("")
  const router = useRouter()

  useEffect(() => {
    const getParams = async () => {
      const resolvedParams = await params
      setPropertyId(resolvedParams.id)
    }
    getParams()
  }, [params])

  useEffect(() => {
    if (!propertyId) return

    const loadProperty = async () => {
      try {
        console.log("[v0] Loading property:", propertyId)
        const response = await fetch(`/api/properties/${propertyId}`)

        if (!response.ok) {
          throw new Error("Failed to load property")
        }

        const data = await response.json()
        console.log("[v0] Property loaded:", data.title)
        setProperty(data)
      } catch (err) {
        console.error("[v0] Error loading property:", err)
        setError("Failed to load property")
      } finally {
        setIsLoading(false)
      }
    }

    loadProperty()
  }, [propertyId])

  const handleDeleteProperty = async () => {
    if (!property || !confirm("Are you sure you want to delete this property?")) {
      return
    }

    try {
      console.log("[v0] Deleting property:", property.id)
      const response = await fetch(`/api/properties/${property.id}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error("Failed to delete property")
      }

      console.log("[v0] Property deleted successfully")
      router.push("/admin/properties")
    } catch (err) {
      console.error("[v0] Error deleting property:", err)
      alert("Failed to delete property. Please try again.")
    }
  }

  const nextImage = () => {
    if (property && property.images.length > 0) {
      setCurrentImageIndex((prev) => (prev + 1) % property.images.length)
    }
  }

  const prevImage = () => {
    if (property && property.images.length > 0) {
      setCurrentImageIndex((prev) => (prev - 1 + property.images.length) % property.images.length)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <AdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <div className="lg:ml-64">
          <AdminHeader onMenuToggle={() => setSidebarOpen(!sidebarOpen)} />
          <main className="p-6">
            <div className="text-center py-12">
              <p className="text-gray-500">Loading property...</p>
            </div>
          </main>
        </div>
      </div>
    )
  }

  if (error || !property) {
    return (
      <div className="min-h-screen bg-gray-50">
        <AdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <div className="lg:ml-64">
          <AdminHeader onMenuToggle={() => setSidebarOpen(!sidebarOpen)} />
          <main className="p-6">
            <div className="text-center py-12">
              <p className="text-red-500">{error || "Property not found"}</p>
              <Button asChild className="mt-4">
                <Link href="/admin/properties">Back to Properties</Link>
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
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <Button variant="ghost" asChild>
                <Link href="/admin/properties">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Properties
                </Link>
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{property.title}</h1>
                <p className="text-gray-600">Property Details</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button asChild>
                <Link href={`/admin/properties/${property.id}/edit`}>
                  <Edit className="h-4 w-4 mr-2" />
                  Edit
                </Link>
              </Button>
              <Button variant="destructive" onClick={handleDeleteProperty}>
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Image Gallery */}
              {property.images && property.images.length > 0 && (
                <Card>
                  <CardContent className="p-6">
                    <div className="relative">
                      <div className="relative h-96 rounded-lg overflow-hidden">
                        <img
                          src={property.images[currentImageIndex] || "/placeholder.svg"}
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
                              <img src={image || "/placeholder.svg"} alt="" className="w-full h-full object-cover" />
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Property Info */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        {property.featured && <Badge className="bg-emerald-600">Featured</Badge>}
                        <Badge variant="secondary">{property.property_type}</Badge>
                        <Badge
                          className={
                            property.status === "available"
                              ? "bg-green-600"
                              : property.status === "pending"
                                ? "bg-yellow-600"
                                : "bg-gray-600"
                          }
                        >
                          {property.status}
                        </Badge>
                      </div>
                      <div className="flex items-center text-gray-500 mb-2">
                        <MapPin className="w-5 h-5 mr-2" />
                        {property.location}
                      </div>
                      <div className="text-3xl font-bold text-emerald-600">¢{property.price.toLocaleString()}</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <Bed className="w-6 h-6 mx-auto mb-2 text-emerald-600" />
                      <div className="font-semibold">{property.bedrooms}</div>
                      <div className="text-sm text-gray-500">Bedrooms</div>
                    </div>
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <Bath className="w-6 h-6 mx-auto mb-2 text-emerald-600" />
                      <div className="font-semibold">{property.bathrooms}</div>
                      <div className="text-sm text-gray-500">Bathrooms</div>
                    </div>
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <Square className="w-6 h-6 mx-auto mb-2 text-emerald-600" />
                      <div className="font-semibold">{property.square_feet}</div>
                      <div className="text-sm text-gray-500">Sq Ft</div>
                    </div>
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <Calendar className="w-6 h-6 mx-auto mb-2 text-emerald-600" />
                      <div className="font-semibold">{property.year_built || "N/A"}</div>
                      <div className="text-sm text-gray-500">Year Built</div>
                    </div>
                  </div>

                  <Separator className="my-6" />

                  <div>
                    <h2 className="text-xl font-semibold mb-4">Description</h2>
                    <p className="text-gray-600 leading-relaxed">{property.description}</p>
                  </div>

                  {property.amenities && property.amenities.length > 0 && (
                    <>
                      <Separator className="my-6" />
                      <div>
                        <h2 className="text-xl font-semibold mb-4">Amenities</h2>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                          {property.amenities.map((amenity, index) => (
                            <div key={index} className="flex items-center p-3 bg-gray-50 rounded-lg">
                              <div className="w-2 h-2 bg-emerald-600 rounded-full mr-3" />
                              <span className="text-sm">{amenity}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Agent Contact */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Agent Information</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Name:</span>
                      <span className="font-medium">{property.agent_name || "N/A"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Phone:</span>
                      <span className="font-medium">{property.agent_phone || "N/A"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Email:</span>
                      <span className="font-medium">{property.agent_email || "N/A"}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Property Details */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Property Details</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Property ID:</span>
                      <span className="font-medium">{property.id}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Type:</span>
                      <span className="font-medium">{property.property_type}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Status:</span>
                      <span className="font-medium">{property.status}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Created:</span>
                      <span className="font-medium">{new Date(property.created_at).toLocaleDateString()}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
