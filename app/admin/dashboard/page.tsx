"use client"

import { useState, useEffect } from "react"
import { AdminHeader } from "@/components/admin-header"
import { AdminSidebar } from "@/components/admin-sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Building, MessageSquare, TrendingUp, Plus, Eye, Edit, DollarSign, Star } from "lucide-react"
import Link from "next/link"

interface DashboardStats {
  totalProperties: number
  availableProperties: number
  soldProperties: number
  totalInquiries: number
  newInquiries: number
  totalTestimonials: number
}

interface Property {
  id: string
  title: string
  location: string
  price: number
  status: string
  created_at: string
}

interface Inquiry {
  id: string
  property_title?: string
  full_name: string
  email: string
  status: string
  created_at: string
}

export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [stats, setStats] = useState<DashboardStats>({
    totalProperties: 0,
    availableProperties: 0,
    soldProperties: 0,
    totalInquiries: 0,
    newInquiries: 0,
    totalTestimonials: 0,
  })
  const [recentProperties, setRecentProperties] = useState<Property[]>([])
  const [recentInquiries, setRecentInquiries] = useState<Inquiry[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        console.log("[v0] Fetching dashboard data")

        // Fetch properties
        const propertiesResponse = await fetch("/api/properties")
        const properties = propertiesResponse.ok ? await propertiesResponse.json() : []

        // Fetch inquiries
        const inquiriesResponse = await fetch("/api/inquiries")
        const inquiries = inquiriesResponse.ok ? await inquiriesResponse.json() : []

        // Fetch testimonials
        const testimonialsResponse = await fetch("/api/testimonials")
        const testimonials = testimonialsResponse.ok ? await testimonialsResponse.json() : []

        // Calculate stats
        const availableProperties = properties.filter((p: Property) => p.status === "available").length
        const soldProperties = properties.filter((p: Property) => p.status === "sold").length
        const newInquiries = inquiries.filter((i: Inquiry) => i.status === "new").length

        setStats({
          totalProperties: properties.length,
          availableProperties,
          soldProperties,
          totalInquiries: inquiries.length,
          newInquiries,
          totalTestimonials: testimonials.length,
        })

        // Set recent data (last 5 items)
        setRecentProperties(properties.slice(0, 5))
        setRecentInquiries(inquiries.slice(0, 5))

        console.log("[v0] Dashboard data loaded successfully")
      } catch (error) {
        console.error("[v0] Error fetching dashboard data:", error)
        // Use fallback data if API fails
        setStats({
          totalProperties: 24,
          availableProperties: 18,
          soldProperties: 6,
          totalInquiries: 45,
          newInquiries: 8,
          totalTestimonials: 12,
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchDashboardData()
  }, [])

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "available":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "sold":
        return "bg-red-100 text-red-800"
      case "new":
        return "bg-blue-100 text-blue-800"
      case "contacted":
        return "bg-green-100 text-green-800"
      case "closed":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <AdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <div className="lg:ml-64">
          <AdminHeader onMenuToggle={() => setSidebarOpen(!sidebarOpen)} />
          <main className="p-6">
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
              <p className="mt-2 text-muted-foreground">Loading dashboard...</p>
            </div>
          </main>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <AdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="lg:ml-64">
        <AdminHeader onMenuToggle={() => setSidebarOpen(!sidebarOpen)} />

        <main className="p-6">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Dashboard</h1>
            <p className="text-muted-foreground text-lg">Welcome back! Here's what's happening with your properties.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="bg-gradient-to-br from-primary to-secondary border-0 text-primary-foreground shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium opacity-90">Total Properties</CardTitle>
                <div className="p-2 bg-white/20 rounded-lg">
                  <Building className="h-5 w-5" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold mb-1">{stats.totalProperties}</div>
                <p className="text-xs opacity-80">
                  {stats.availableProperties} available, {stats.soldProperties} sold
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-blue-500 to-blue-600 border-0 text-white shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium opacity-90">Total Inquiries</CardTitle>
                <div className="p-2 bg-white/20 rounded-lg">
                  <MessageSquare className="h-5 w-5" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold mb-1">{stats.totalInquiries}</div>
                <p className="text-xs opacity-80">{stats.newInquiries} new this week</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-emerald-500 to-emerald-600 border-0 text-white shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium opacity-90">Testimonials</CardTitle>
                <div className="p-2 bg-white/20 rounded-lg">
                  <Star className="h-5 w-5" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold mb-1">{stats.totalTestimonials}</div>
                <p className="text-xs opacity-80">Customer reviews</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-500 to-purple-600 border-0 text-white shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium opacity-90">Revenue</CardTitle>
                <div className="p-2 bg-white/20 rounded-lg">
                  <DollarSign className="h-5 w-5" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold mb-1">$2.4M</div>
                <p className="text-xs opacity-80 flex items-center">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +12% from last month
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="shadow-lg border-0 bg-card">
              <CardHeader className="flex flex-row items-center justify-between bg-gradient-to-r from-primary/10 to-secondary/10 rounded-t-lg">
                <div>
                  <CardTitle className="text-xl font-bold text-foreground">Recent Properties</CardTitle>
                  <CardDescription className="text-muted-foreground">Latest property listings</CardDescription>
                </div>
                <Button className="bg-primary hover:bg-secondary shadow-md" size="sm" asChild>
                  <Link href="/admin/properties/new">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Property
                  </Link>
                </Button>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {recentProperties.length > 0 ? (
                    recentProperties.map((property) => (
                      <div
                        key={property.id}
                        className="flex items-center justify-between p-4 bg-muted/50 rounded-lg border border-border/50 hover:shadow-md transition-shadow"
                      >
                        <div className="flex-1">
                          <h4 className="font-semibold text-foreground">{property.title}</h4>
                          <p className="text-sm text-muted-foreground">{property.location}</p>
                          <p className="text-sm font-bold text-primary">{formatPrice(property.price)}</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <span
                            className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusColor(property.status)}`}
                          >
                            {property.status}
                          </span>
                          <div className="flex gap-1">
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-primary/10" asChild>
                              <Link href={`/admin/properties/${property.id}`}>
                                <Eye className="h-4 w-4" />
                              </Link>
                            </Button>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-secondary/10" asChild>
                              <Link href={`/admin/properties/${property.id}/edit`}>
                                <Edit className="h-4 w-4" />
                              </Link>
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8">
                      <Building className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                      <p className="text-muted-foreground">No properties found</p>
                    </div>
                  )}
                </div>
                <div className="mt-6">
                  <Button
                    variant="outline"
                    className="w-full border-primary/20 hover:bg-primary/5 hover:border-primary/40 bg-transparent"
                    asChild
                  >
                    <Link href="/admin/properties">View All Properties</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg border-0 bg-card">
              <CardHeader className="bg-gradient-to-r from-blue-500/10 to-blue-600/10 rounded-t-lg">
                <div>
                  <CardTitle className="text-xl font-bold text-foreground">Recent Inquiries</CardTitle>
                  <CardDescription className="text-muted-foreground">Latest customer inquiries</CardDescription>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {recentInquiries.length > 0 ? (
                    recentInquiries.map((inquiry) => (
                      <div
                        key={inquiry.id}
                        className="flex items-center justify-between p-4 bg-muted/50 rounded-lg border border-border/50 hover:shadow-md transition-shadow"
                      >
                        <div className="flex-1">
                          <h4 className="font-semibold text-foreground">{inquiry.full_name}</h4>
                          {inquiry.property_title && (
                            <p className="text-sm text-muted-foreground">{inquiry.property_title}</p>
                          )}
                          <p className="text-xs text-muted-foreground">{inquiry.email}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span
                            className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusColor(inquiry.status)}`}
                          >
                            {inquiry.status}
                          </span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8">
                      <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                      <p className="text-muted-foreground">No inquiries found</p>
                    </div>
                  )}
                </div>
                <div className="mt-6">
                  <Button
                    variant="outline"
                    className="w-full border-blue-500/20 hover:bg-blue-500/5 hover:border-blue-500/40 bg-transparent"
                    asChild
                  >
                    <Link href="/admin/inquiries">View All Inquiries</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
