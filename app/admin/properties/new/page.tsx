"use client"

import type React from "react"

import { useState } from "react"
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
import { ArrowLeft, Upload, X, Plus } from "lucide-react"
import Link from "next/link"

export default function NewPropertyPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const router = useRouter()

  // Form state
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
  const [imageFiles, setImageFiles] = useState<File[]>([])

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

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    if (files.length > 0) {
      setImageFiles((prev) => [...prev, ...files])

      // Create preview URLs
      files.forEach((file) => {
        const reader = new FileReader()
        reader.onload = (e) => {
          const result = e.target?.result as string
          setImages((prev) => [...prev, result])
        }
        reader.readAsDataURL(file)
      })
    }
  }

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index))
    setImageFiles((prev) => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")
    setSuccess("")

    try {
      const propertyData = {
        title: formData.title?.trim() || "New Property",
        description: formData.description?.trim() || "Property description",
        price: Number(formData.price) || 0,
        location: formData.location?.trim() || "Location TBD",
        property_type: formData.property_type?.toLowerCase() || "house", // Ensure lowercase
        bedrooms: Number(formData.bedrooms) || 0,
        bathrooms: Number(formData.bathrooms) || 0,
        square_feet: Number(formData.square_feet) || 0,
        lot_size: formData.lot_size?.trim() || "0",
        year_built: Number(formData.year_built) || new Date().getFullYear(),
        status: (formData.status as "available" | "sold" | "pending") || "available",
        featured: Boolean(formData.featured),
        agent_name: formData.agent_name?.trim() || "John Ambrose",
        agent_phone: formData.agent_phone?.trim() || "+233200694805",
        agent_email: formData.agent_email?.trim() || "info.mannadomeestate@gmail.com",
        images: images.length > 0 ? images : ["/modern-house.png"],
        amenities: amenities.length > 0 ? amenities : [],
      }

      console.log("[v0] Creating property with data:", propertyData)

      const response = await fetch("/api/properties", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(propertyData),
      })

      const responseData = await response.json()
      console.log("[v0] API response:", responseData)

      if (!response.ok) {
        const errorMessage = responseData.message || responseData.error || "Failed to create property"
        console.error("[v0] API error response:", responseData)
        throw new Error(errorMessage)
      }

      console.log("[v0] Property created successfully:", responseData)
      setSuccess("Property created successfully!")

      setFormData({
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
      setImages([])
      setAmenities([])
      setImageFiles([])

      setTimeout(() => {
        router.push("/admin/properties")
      }, 2000)
    } catch (err) {
      console.error("[v0] Error creating property:", err)
      const errorMessage = err instanceof Error ? err.message : "Failed to create property. Please try again."
      setError(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="lg:ml-64">
        <AdminHeader onMenuToggle={() => setSidebarOpen(!sidebarOpen)} />

        <main className="p-6">
          <div className="mb-6">
            <div className="flex items-center gap-4 mb-2">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/admin/properties">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Properties
                </Link>
              </Button>
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Add New Property</h1>
            <p className="text-gray-600">Create a new property listing</p>
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
                      placeholder="e.g., Luxury Lakefront Villa"
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
                      placeholder="850000"
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
                    placeholder="Describe the property features, location, and highlights..."
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
                      placeholder="e.g., East Legon, Accra"
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
                        <SelectValue placeholder="Select type" />
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
                      placeholder="4"
                    />
                  </div>
                  <div>
                    <Label htmlFor="bathrooms">Bathrooms</Label>
                    <Input
                      id="bathrooms"
                      type="number"
                      value={formData.bathrooms}
                      onChange={(e) => handleInputChange("bathrooms", e.target.value)}
                      placeholder="3"
                    />
                  </div>
                  <div>
                    <Label htmlFor="square_feet">Square Feet</Label>
                    <Input
                      id="square_feet"
                      type="number"
                      value={formData.square_feet}
                      onChange={(e) => handleInputChange("square_feet", e.target.value)}
                      placeholder="3500"
                    />
                  </div>
                  <div>
                    <Label htmlFor="year_built">Year Built</Label>
                    <Input
                      id="year_built"
                      type="number"
                      value={formData.year_built}
                      onChange={(e) => handleInputChange("year_built", e.target.value)}
                      placeholder="2022"
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
                      placeholder="0.5 acres"
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
                    placeholder="Add amenity (e.g., Swimming Pool)"
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
                      placeholder="Kwame Asante"
                    />
                  </div>
                  <div>
                    <Label htmlFor="agent_phone">Agent Phone</Label>
                    <Input
                      id="agent_phone"
                      value={formData.agent_phone}
                      onChange={(e) => handleInputChange("agent_phone", e.target.value)}
                      placeholder="+233 24 123 4567"
                    />
                  </div>
                  <div>
                    <Label htmlFor="agent_email">Agent Email</Label>
                    <Input
                      id="agent_email"
                      type="email"
                      value={formData.agent_email}
                      onChange={(e) => handleInputChange("agent_email", e.target.value)}
                      placeholder="kwame@lakesideestate.com"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Images */}
            <Card>
              <CardHeader>
                <CardTitle>Property Images</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      id="image-upload"
                    />
                    <label htmlFor="image-upload" className="cursor-pointer">
                      <Upload className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                      <p className="text-gray-600">Click to upload property images</p>
                      <p className="text-sm text-gray-500">Supports JPG, PNG, WebP (Max 5MB each)</p>
                    </label>
                  </div>

                  {/* Image Previews */}
                  {images.length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {images.map((image, index) => (
                        <div key={index} className="relative group">
                          <img
                            src={image || "/placeholder.svg"}
                            alt={`Preview ${index + 1}`}
                            className="w-full h-24 object-cover rounded-lg"
                          />
                          <button
                            type="button"
                            onClick={() => removeImage(index)}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Submit Buttons */}
            <div className="flex gap-4">
              <Button type="submit" disabled={isLoading} className="bg-emerald-600 hover:bg-emerald-700">
                {isLoading ? "Creating..." : "Create Property"}
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
