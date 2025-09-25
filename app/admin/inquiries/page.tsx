"use client"

import { useState, useEffect } from "react"
import { AdminHeader } from "@/components/admin-header"
import { AdminSidebar } from "@/components/admin-sidebar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, Mail, Phone, MessageSquare, Calendar, Trash2 } from "lucide-react"

interface Inquiry {
  id: string
  property_id?: string
  property_title?: string
  full_name: string
  email: string
  phone?: string
  message: string
  inquiry_type: string
  status: string
  created_at: string
  property?: {
    title: string
    location: string
  }
}

export default function AdminInquiriesPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [inquiries, setInquiries] = useState<Inquiry[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchInquiries()
  }, [])

  const fetchInquiries = async () => {
    try {
      console.log("[v0] Fetching inquiries from API")
      const response = await fetch("/api/inquiries")
      if (!response.ok) {
        throw new Error("Failed to fetch inquiries")
      }
      const data = await response.json()
      console.log("[v0] Inquiries fetched successfully:", data.length, "inquiries")
      setInquiries(data)
    } catch (error) {
      console.error("[v0] Error fetching inquiries:", error)
      // Keep mock data as fallback
      setInquiries([
        {
          id: "1",
          property_id: "1",
          property_title: "Luxury Lakefront Villa",
          full_name: "John Doe",
          email: "john@example.com",
          phone: "+233 24 123 4567",
          message: "I'm interested in scheduling a viewing for this beautiful villa. When would be a good time?",
          inquiry_type: "viewing",
          status: "new",
          created_at: "2024-01-15T10:30:00Z",
        },
        {
          id: "2",
          property_id: "2",
          property_title: "Modern Family House",
          full_name: "Jane Smith",
          email: "jane@example.com",
          phone: "+233 24 234 5678",
          message: "Could you provide more information about the neighborhood and nearby schools?",
          inquiry_type: "information",
          status: "contacted",
          created_at: "2024-01-14T14:20:00Z",
        },
        {
          id: "3",
          property_id: "3",
          property_title: "Executive Apartment",
          full_name: "Michael Johnson",
          email: "michael@example.com",
          phone: "+233 24 345 6789",
          message: "I would like to make an offer on this property. Please contact me to discuss terms.",
          inquiry_type: "offer",
          status: "new",
          created_at: "2024-01-13T09:15:00Z",
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  const filteredInquiries = inquiries.filter((inquiry) => {
    const matchesSearch =
      inquiry.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inquiry.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (inquiry.property_title || inquiry.property?.title || "").toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || inquiry.status === statusFilter
    const matchesType = typeFilter === "all" || inquiry.inquiry_type === typeFilter

    return matchesSearch && matchesStatus && matchesType
  })

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const updateInquiryStatus = async (inquiryId: string, newStatus: string) => {
    try {
      console.log(`[v0] Updating inquiry ${inquiryId} to status: ${newStatus}`)
      const response = await fetch(`/api/inquiries/${inquiryId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      })

      if (!response.ok) {
        throw new Error("Failed to update inquiry status")
      }

      console.log("[v0] Inquiry status updated successfully")
      fetchInquiries() // Refresh the list
    } catch (error) {
      console.error("[v0] Error updating inquiry status:", error)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this inquiry?")) return

    try {
      console.log(`[v0] Deleting inquiry ${id}`)
      const response = await fetch(`/api/inquiries/${id}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error("Failed to delete inquiry")
      }

      console.log("[v0] Inquiry deleted successfully")
      fetchInquiries() // Refresh the list
    } catch (error) {
      console.error("[v0] Error deleting inquiry:", error)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="lg:ml-64">
        <AdminHeader onMenuToggle={() => setSidebarOpen(!sidebarOpen)} />

        <main className="p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Inquiries</h1>
            <p className="text-gray-600">Manage customer inquiries and requests</p>
          </div>

          {/* Filters */}
          <Card className="mb-6">
            <CardContent className="pt-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Search inquiries..."
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
                    <SelectItem value="new">New</SelectItem>
                    <SelectItem value="contacted">Contacted</SelectItem>
                    <SelectItem value="closed">Closed</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger className="w-full sm:w-40">
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="viewing">Viewing</SelectItem>
                    <SelectItem value="information">Information</SelectItem>
                    <SelectItem value="offer">Offer</SelectItem>
                    <SelectItem value="general">General</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Inquiries List */}
          {isLoading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600 mx-auto"></div>
              <p className="mt-2 text-gray-600">Loading inquiries...</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredInquiries.map((inquiry) => (
                <Card key={inquiry.id}>
                  <CardContent className="p-6">
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-semibold text-lg">{inquiry.full_name}</h3>
                          <Badge
                            className={`${
                              inquiry.status === "new"
                                ? "bg-blue-100 text-blue-800"
                                : inquiry.status === "contacted"
                                  ? "bg-green-100 text-green-800"
                                  : "bg-gray-100 text-gray-800"
                            }`}
                          >
                            {inquiry.status}
                          </Badge>
                          <Badge variant="outline">{inquiry.inquiry_type}</Badge>
                        </div>

                        <p className="text-sm text-gray-600 mb-2">
                          Property:{" "}
                          <span className="font-medium">
                            {inquiry.property_title || inquiry.property?.title || "General Inquiry"}
                          </span>
                        </p>

                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-sm text-gray-600 mb-3">
                          <div className="flex items-center">
                            <Mail className="h-4 w-4 mr-1" />
                            {inquiry.email}
                          </div>
                          {inquiry.phone && (
                            <div className="flex items-center">
                              <Phone className="h-4 w-4 mr-1" />
                              {inquiry.phone}
                            </div>
                          )}
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-1" />
                            {formatDate(inquiry.created_at)}
                          </div>
                        </div>

                        <div className="bg-gray-50 p-3 rounded-lg">
                          <div className="flex items-start">
                            <MessageSquare className="h-4 w-4 mr-2 mt-0.5 text-gray-500" />
                            <p className="text-sm text-gray-700">{inquiry.message}</p>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col gap-2 lg:ml-4">
                        <Select
                          value={inquiry.status}
                          onValueChange={(value) => updateInquiryStatus(inquiry.id, value)}
                        >
                          <SelectTrigger className="w-full lg:w-32">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="new">New</SelectItem>
                            <SelectItem value="contacted">Contacted</SelectItem>
                            <SelectItem value="closed">Closed</SelectItem>
                          </SelectContent>
                        </Select>

                        <Button variant="outline" size="sm" asChild>
                          <a href={`mailto:${inquiry.email}`}>
                            <Mail className="h-4 w-4 mr-2" />
                            Reply
                          </a>
                        </Button>

                        {inquiry.phone && (
                          <Button variant="outline" size="sm" asChild>
                            <a href={`tel:${inquiry.phone}`}>
                              <Phone className="h-4 w-4 mr-2" />
                              Call
                            </a>
                          </Button>
                        )}

                        <Button variant="ghost" size="sm" onClick={() => handleDelete(inquiry.id)}>
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {!isLoading && filteredInquiries.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">No inquiries found matching your criteria.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
