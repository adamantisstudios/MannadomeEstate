"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { AdminHeader } from "@/components/admin-header"
import { AdminSidebar } from "@/components/admin-sidebar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ArrowLeft, X, Plus, Trash2 } from "lucide-react"
import Link from "next/link"

interface EditPropertyPageProps {
  params: Promise<{ id: string }>
}

export default function EditPropertyPage({ params }: EditPropertyPageProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [propertyId, setPropertyId] = useState<string>("")
  const router = useRouter()

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    location: "",
    property_type: "",
    bedrooms: "",
    bathrooms: "",
    square_feet: "",
    lot_size: "",
    year_built: "",
    status: "available",
    featured: false,
    agent_name: "",
    agent_phone: "",
    agent_email: "",
  })

  const [images, setImages] = useState<string[]>([])
  const [amenities, setAmenities] = useState<string[]>([])
  const [newAmenity, setNewAmenity] = useState("")

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
          throw new Error("Property not found")
        }

        const property = await response.json()
        console.log("[v0] Property loaded:", property.title)

        setFormData({
          title: property.title || "",
          description: property.description || "",
          price: property.price?.toString() || "",
          location: property.location || "",
          property_type: property.property_type || "",
          bedrooms: property.bedrooms?.toString() || "",
          bathrooms: property.bathrooms?.toString() || "",
          square_feet: property.square_feet?.toString() || "",
          lot_size: property.lot_size?.toString() || "",
          year_built: property.year_built?.toString() || "",
          status: property.status || "available",
          featured: property.featured || false,
          agent_name: property.agent_name || "",
          agent_phone: property.agent_phone || "",
          agent_email: property.agent_email || "",
        })

        setImages(property.images || [])
        setAmenities(property.amenities || [])
      } catch (err) {
        console.error("[v0] Error loading property:", err)
        setError("Failed to load property")
      }
    }

    loadProperty()
  }, [propertyId])

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const addAmenity = () => {
    if (newAmenity.trim() && !amenities.includes(newAmenity.trim())) {
      setAmenities((prev) => [...prev, newAmenity.trim()])
      setNewAmenity("")
    }
  }

  const removeAmenity = (amenity: string) => {
    setAmenities((prev) => prev.filter((a) => a !== amenity))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")
    setSuccess("")

    try {
      // Replace with actual API call
      console.log("Updating property:", propertyId, { ...formData, images, amenities })

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      setSuccess("Property updated successfully!")
    } catch (err) {
      setError("Failed to update property. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this property? This action cannot be undone.")) {
      return
    }

    setIsDeleting(true)
    try {
      console.log("[v0] Deleting property:", propertyId)

      const response = await fetch(`/api/properties/${propertyId}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to delete property")
      }

      console.log("[v0] Property deleted successfully")
      router.push("/admin/properties")
    } catch (err) {
      console.error("[v0] Error deleting property:", err)
      setError("Failed to delete property. Please try again.")
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="lg:ml-64">
        <AdminHeader onMenuToggle={() => setSidebarOpen(!sidebarOpen)} />

        <main className="p-6">
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-4">
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/admin/properties">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Properties
                  </Link>
                </Button>
              </div>
              <Button variant="destructive" onClick={handleDelete} disabled={isDeleting}>
                <Trash2 className="h-4 w-4 mr-2" />
                {isDeleting ? "Deleting..." : "Delete Property"}
              </Button>
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Edit Property</h1>
            <p className="text-gray-600">Update property information</p>
          </div>

          {error && (
            <Alert variant="destructive" className="mb-6">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {success && (
            <Alert className="mb-6 border-green-200 bg-green-50">
              <AlertDescription className="text-green-800">{success}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="title">Property Title *</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => handleInputChange("title", e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="price">Price (¢) *</Label>
                    <Input
                      id="price"
                      type="number"
                      value={formData.price}
                      onChange={(e) => handleInputChange("price", e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                    rows={4}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="location">Location *</Label>
                    <Input
                      id="location"
                      value={formData.location}
                      onChange={(e) => handleInputChange("location", e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="property_type">Property Type *</Label>
                    <Select
                      value={formData.property_type}
                      onValueChange={(value) => handleInputChange("property_type", value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="house">House</SelectItem>
                        <SelectItem value="apartment">Apartment</SelectItem>
                        <SelectItem value="villa">Villa</SelectItem>
                        <SelectItem value="townhouse">Townhouse</SelectItem>
                        <SelectItem value="penthouse">Penthouse</SelectItem>
                        <SelectItem value="land">Land</SelectItem>
                        <SelectItem value="student_hostel">Student Hostel</SelectItem>
                        <SelectItem value="furnished_apartment">Furnished Apartment</SelectItem>
                        <SelectItem value="hostel_room">Hostel Room</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Property Details */}
            <Card>
              <CardHeader>
                <CardTitle>Property Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <Label htmlFor="bedrooms">Bedrooms</Label>
                    <Input
                      id="bedrooms"
                      type="number"
                      value={formData.bedrooms}
                      onChange={(e) => handleInputChange("bedrooms", e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="bathrooms">Bathrooms</Label>
                    <Input
                      id="bathrooms"
                      type="number"
                      value={formData.bathrooms}
                      onChange={(e) => handleInputChange("bathrooms", e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="square_feet">Square Feet</Label>
                    <Input
                      id="square_feet"
                      type="number"
                      value={formData.square_feet}
                      onChange={(e) => handleInputChange("square_feet", e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="year_built">Year Built</Label>
                    <Input
                      id="year_built"
                      type="number"
                      value={formData.year_built}
                      onChange={(e) => handleInputChange("year_built", e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="lot_size">Lot Size</Label>
                    <Input
                      id="lot_size"
                      value={formData.lot_size}
                      onChange={(e) => handleInputChange("lot_size", e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="status">Status</Label>
                    <Select value={formData.status} onValueChange={(value) => handleInputChange("status", value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="available">Available</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="sold">Sold</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="featured"
                    checked={formData.featured}
                    onCheckedChange={(checked) => handleInputChange("featured", checked as boolean)}
                  />
                  <Label htmlFor="featured">Featured Property</Label>
                </div>
              </CardContent>
            </Card>

            {/* Amenities */}
            <Card>
              <CardHeader>
                <CardTitle>Amenities</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    value={newAmenity}
                    onChange={(e) => setNewAmenity(e.target.value)}
                    placeholder="Add amenity"
                    onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addAmenity())}
                  />
                  <Button type="button" onClick={addAmenity} variant="outline">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>

                <div className="flex flex-wrap gap-2">
                  {amenities.map((amenity) => (
                    <Badge key={amenity} variant="secondary" className="flex items-center gap-1">
                      {amenity}
                      <button type="button" onClick={() => removeAmenity(amenity)} className="ml-1 hover:text-red-600">
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Property Images */}
            <Card>
              <CardHeader>
                <CardTitle>Property Images</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {images && images.length > 0 && (
                  <div>
                    <Label>Current Images</Label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-2">
                      {images.map((image, index) => (
                        <div key={index} className="relative">
                          <img
                            src={image || "/placeholder.svg?height=120&width=180&query=property"}
                            alt={`Property image ${index + 1}`}
                            className="w-full h-24 object-cover rounded-md border"
                          />
                          <Button
                            type="button"
                            variant="destructive"
                            size="sm"
                            className="absolute top-1 right-1 h-6 w-6 p-0"
                            onClick={() => setImages((prev) => prev.filter((_, i) => i !== index))}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div>
                  <Label htmlFor="new-images">Add New Images</Label>
                  <Input
                    id="new-images"
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={(e) => {
                      const files = Array.from(e.target.files || [])
                      // Handle file upload logic here
                      console.log("[v0] Files selected:", files.length)
                    }}
                  />
                  <p className="text-sm text-muted-foreground mt-1">Select multiple images to add to this property</p>
                </div>
              </CardContent>
            </Card>

            {/* Agent Information */}
            <Card>
              <CardHeader>
                <CardTitle>Agent Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="agent_name">Agent Name</Label>
                    <Input
                      id="agent_name"
                      value={formData.agent_name}
                      onChange={(e) => handleInputChange("agent_name", e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="agent_phone">Agent Phone</Label>
                    <Input
                      id="agent_phone"
                      value={formData.agent_phone}
                      onChange={(e) => handleInputChange("agent_phone", e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="agent_email">Agent Email</Label>
                    <Input
                      id="agent_email"
                      type="email"
                      value={formData.agent_email}
                      onChange={(e) => handleInputChange("agent_email", e.target.value)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Submit Buttons */}
            <div className="flex gap-4">
              <Button type="submit" disabled={isLoading} className="bg-emerald-600 hover:bg-emerald-700">
                {isLoading ? "Updating..." : "Update Property"}
              </Button>
              <Button type="button" variant="outline" asChild>
                <Link href="/admin/properties">Cancel</Link>
              </Button>
            </div>
          </form>
        </main>
      </div>
    </div>
  )
}
