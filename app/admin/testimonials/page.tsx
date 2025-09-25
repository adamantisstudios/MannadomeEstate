"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { AdminHeader } from "@/components/admin-header"
import { AdminSidebar } from "@/components/admin-sidebar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Plus, Search, Edit, Trash2, Star, User } from "lucide-react"
import { supabase } from "@/lib/supabaseClient"

interface Testimonial {
  id: string
  name: string // Updated from client_name to name to match database schema
  content: string
  rating: number
  featured: boolean
  created_at: string
  updated_at?: string
}

export default function AdminTestimonialsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [featuredFilter, setFeaturedFilter] = useState("all")
  const [isLoading, setIsLoading] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null)

  // Form state
  const [formData, setFormData] = useState({
    client_name: "", // Keep client_name in form for UI, will map to name in API
    content: "",
    rating: 5,
    featured: false,
  })

  useEffect(() => {
    fetchTestimonials()
  }, [])

  const fetchTestimonials = async () => {
    try {
      console.log("[v0] Fetching testimonials for admin")
      const { data, error } = await supabase.from("testimonials").select("*").order("created_at", { ascending: false })

      if (error) {
        console.error("[v0] Error fetching testimonials:", error)
        return
      }

      console.log("[v0] Testimonials fetched successfully:", data?.length || 0, "testimonials")
      setTestimonials(data || [])
    } catch (error) {
      console.error("[v0] Error fetching testimonials:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      if (editingTestimonial) {
        const response = await fetch(`/api/testimonials/${editingTestimonial.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: formData.client_name, // Map client_name to name for API
            content: formData.content,
            rating: formData.rating,
            featured: formData.featured,
          }),
        })

        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.error || "Failed to update testimonial")
        }

        console.log("[v0] Testimonial updated successfully")
      } else {
        const response = await fetch("/api/testimonials", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: formData.client_name, // Map client_name to name for API
            content: formData.content,
            rating: formData.rating,
            featured: formData.featured,
          }),
        })

        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.error || "Failed to create testimonial")
        }

        console.log("[v0] Testimonial created successfully")
      }

      // Reset form and close dialog
      setFormData({
        client_name: "",
        content: "",
        rating: 5,
        featured: false,
      })
      setEditingTestimonial(null)
      setIsDialogOpen(false)
      fetchTestimonials()
    } catch (error) {
      console.error("[v0] Error saving testimonial:", error)
      alert(`Error: ${error.message}`)
    }
  }

  const handleEdit = (testimonial: Testimonial) => {
    setEditingTestimonial(testimonial)
    setFormData({
      client_name: testimonial.name, // Map name to client_name for form
      content: testimonial.content,
      rating: testimonial.rating,
      featured: testimonial.featured,
    })
    setIsDialogOpen(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this testimonial?")) return

    try {
      const response = await fetch(`/api/testimonials/${id}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error("Failed to delete testimonial")
      }

      console.log("[v0] Testimonial deleted successfully")
      fetchTestimonials()
    } catch (error) {
      console.error("[v0] Error deleting testimonial:", error)
    }
  }

  const filteredTestimonials = testimonials.filter((testimonial) => {
    const matchesSearch =
      (testimonial.name?.toLowerCase() || "").includes(searchTerm.toLowerCase()) || // Updated from client_name to name
      (testimonial.content?.toLowerCase() || "").includes(searchTerm.toLowerCase())
    const matchesFeatured =
      featuredFilter === "all" ||
      (featuredFilter === "featured" && testimonial.featured) ||
      (featuredFilter === "not-featured" && !testimonial.featured)

    return matchesSearch && matchesFeatured
  })

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star key={i} className={`h-4 w-4 ${i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} />
    ))
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="lg:ml-64">
        <AdminHeader onMenuToggle={() => setSidebarOpen(!sidebarOpen)} />

        <main className="p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Testimonials</h1>
              <p className="text-gray-600">Manage customer testimonials and reviews</p>
            </div>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button
                  className="mt-4 sm:mt-0"
                  onClick={() => {
                    setEditingTestimonial(null)
                    setFormData({
                      client_name: "",
                      content: "",
                      rating: 5,
                      featured: false,
                    })
                  }}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Testimonial
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>{editingTestimonial ? "Edit Testimonial" : "Add New Testimonial"}</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Client Name</label>
                    <Input
                      value={formData.client_name}
                      onChange={(e) => setFormData({ ...formData, client_name: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Testimonial Content</label>
                    <Textarea
                      value={formData.content}
                      onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                      rows={4}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Rating</label>
                    <Select
                      value={formData.rating.toString()}
                      onValueChange={(value) => setFormData({ ...formData, rating: Number.parseInt(value) })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="5">5 Stars</SelectItem>
                        <SelectItem value="4">4 Stars</SelectItem>
                        <SelectItem value="3">3 Stars</SelectItem>
                        <SelectItem value="2">2 Stars</SelectItem>
                        <SelectItem value="1">1 Star</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="featured"
                      checked={formData.featured}
                      onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                      className="rounded"
                    />
                    <label htmlFor="featured" className="text-sm font-medium">
                      Featured testimonial
                    </label>
                  </div>
                  <div className="flex gap-2 pt-4">
                    <Button type="submit" className="flex-1">
                      {editingTestimonial ? "Update" : "Create"} Testimonial
                    </Button>
                    <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                      Cancel
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          {/* Filters */}
          <Card className="mb-6">
            <CardContent className="pt-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Search testimonials..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <Select value={featuredFilter} onValueChange={setFeaturedFilter}>
                  <SelectTrigger className="w-full sm:w-40">
                    <SelectValue placeholder="Featured" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="featured">Featured</SelectItem>
                    <SelectItem value="not-featured">Not Featured</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Testimonials List */}
          {isLoading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600 mx-auto"></div>
              <p className="mt-2 text-gray-600">Loading testimonials...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTestimonials.map((testimonial) => (
                <Card key={testimonial.id}>
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <User className="h-5 w-5 text-gray-400" />
                        <div>
                          <h3 className="font-semibold">{testimonial.name}</h3> {/* Updated from client_name to name */}
                        </div>
                      </div>
                      {testimonial.featured && <Badge className="bg-emerald-600">Featured</Badge>}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center mb-3">{renderStars(testimonial.rating)}</div>
                    <p className="text-gray-700 text-sm mb-4 line-clamp-4">{testimonial.content}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">
                        {new Date(testimonial.created_at).toLocaleDateString()}
                      </span>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="sm" onClick={() => handleEdit(testimonial)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleDelete(testimonial.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {!isLoading && filteredTestimonials.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">No testimonials found matching your criteria.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
