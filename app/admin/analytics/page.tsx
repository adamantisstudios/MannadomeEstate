"use client"

import { useState, useEffect } from "react"
import { AdminHeader } from "@/components/admin-header"
import { AdminSidebar } from "@/components/admin-sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import { Building, MessageSquare, DollarSign, Star } from "lucide-react"
import { supabase } from "@/lib/supabaseClient"

interface AnalyticsData {
  totalProperties: number
  availableProperties: number
  soldProperties: number
  totalInquiries: number
  newInquiries: number
  totalTestimonials: number
  averageRating: number
  totalRevenue: number
  monthlyData: Array<{
    month: string
    properties: number
    inquiries: number
    revenue: number
  }>
  propertyTypeData: Array<{
    name: string
    value: number
    color: string
  }>
  statusData: Array<{
    name: string
    value: number
    color: string
  }>
}

export default function AdminAnalyticsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [timeRange, setTimeRange] = useState("6months")
  const [analytics, setAnalytics] = useState<AnalyticsData>({
    totalProperties: 0,
    availableProperties: 0,
    soldProperties: 0,
    totalInquiries: 0,
    newInquiries: 0,
    totalTestimonials: 0,
    averageRating: 0,
    totalRevenue: 0,
    monthlyData: [],
    propertyTypeData: [],
    statusData: [],
  })
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchAnalytics()
  }, [timeRange])

  const fetchAnalytics = async () => {
    try {
      console.log("[v0] Fetching analytics data")

      // Fetch properties data
      const { data: properties, error: propertiesError } = await supabase.from("properties").select("*")

      if (propertiesError) {
        console.error("[v0] Error fetching properties:", propertiesError)
      }

      // Fetch inquiries data
      const { data: inquiries, error: inquiriesError } = await supabase.from("inquiries").select("*")

      if (inquiriesError) {
        console.error("[v0] Error fetching inquiries:", inquiriesError)
      }

      // Fetch testimonials data
      const { data: testimonials, error: testimonialsError } = await supabase.from("testimonials").select("*")

      if (testimonialsError) {
        console.error("[v0] Error fetching testimonials:", testimonialsError)
      }

      // Process the data
      const propertiesData = properties || []
      const inquiriesData = inquiries || []
      const testimonialsData = testimonials || []

      // Calculate basic stats
      const totalProperties = propertiesData.length
      const availableProperties = propertiesData.filter((p) => p.status === "available").length
      const soldProperties = propertiesData.filter((p) => p.status === "sold").length
      const totalInquiries = inquiriesData.length
      const newInquiries = inquiriesData.filter((i) => i.status === "new").length
      const totalTestimonials = testimonialsData.length
      const averageRating =
        testimonialsData.length > 0
          ? testimonialsData.reduce((sum, t) => sum + t.rating, 0) / testimonialsData.length
          : 0
      const totalRevenue = propertiesData.filter((p) => p.status === "sold").reduce((sum, p) => sum + (p.price || 0), 0)

      // Generate monthly data (mock data for demonstration)
      const monthlyData = [
        { month: "Jan", properties: 4, inquiries: 12, revenue: 850000 },
        { month: "Feb", properties: 6, inquiries: 18, revenue: 1200000 },
        { month: "Mar", properties: 3, inquiries: 15, revenue: 650000 },
        { month: "Apr", properties: 8, inquiries: 22, revenue: 1800000 },
        { month: "May", properties: 5, inquiries: 19, revenue: 1100000 },
        { month: "Jun", properties: 7, inquiries: 25, revenue: 1500000 },
      ]

      // Property type distribution
      const propertyTypes = propertiesData.reduce(
        (acc, property) => {
          const type = property.property_type || "Other"
          acc[type] = (acc[type] || 0) + 1
          return acc
        },
        {} as Record<string, number>,
      )

      const propertyTypeData = Object.entries(propertyTypes).map(([name, value], index) => ({
        name,
        value,
        color: ["#10b981", "#3b82f6", "#f59e0b", "#ef4444", "#8b5cf6"][index % 5],
      }))

      // Status distribution
      const statusCounts = propertiesData.reduce(
        (acc, property) => {
          const status = property.status || "unknown"
          acc[status] = (acc[status] || 0) + 1
          return acc
        },
        {} as Record<string, number>,
      )

      const statusData = Object.entries(statusCounts).map(([name, value], index) => ({
        name: name.charAt(0).toUpperCase() + name.slice(1),
        value,
        color: name === "available" ? "#10b981" : name === "pending" ? "#f59e0b" : "#ef4444",
      }))

      setAnalytics({
        totalProperties,
        availableProperties,
        soldProperties,
        totalInquiries,
        newInquiries,
        totalTestimonials,
        averageRating,
        totalRevenue,
        monthlyData,
        propertyTypeData,
        statusData,
      })

      console.log("[v0] Analytics data processed successfully")
    } catch (error) {
      console.error("[v0] Error fetching analytics:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const formatCurrency = (amount: number) => {
    return `¢${amount.toLocaleString()}`
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <AdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <div className="lg:ml-64">
          <AdminHeader onMenuToggle={() => setSidebarOpen(!sidebarOpen)} />
          <main className="p-6">
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600 mx-auto"></div>
              <p className="mt-2 text-gray-600">Loading analytics...</p>
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
              <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
              <p className="text-gray-600">Track your business performance and insights</p>
            </div>
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-40 mt-4 sm:mt-0">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1month">Last Month</SelectItem>
                <SelectItem value="3months">Last 3 Months</SelectItem>
                <SelectItem value="6months">Last 6 Months</SelectItem>
                <SelectItem value="1year">Last Year</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Properties</CardTitle>
                <Building className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{analytics.totalProperties}</div>
                <p className="text-xs text-muted-foreground">
                  {analytics.availableProperties} available, {analytics.soldProperties} sold
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Inquiries</CardTitle>
                <MessageSquare className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{analytics.totalInquiries}</div>
                <p className="text-xs text-muted-foreground">{analytics.newInquiries} new this month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Customer Rating</CardTitle>
                <Star className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{analytics.averageRating.toFixed(1)}</div>
                <p className="text-xs text-muted-foreground">From {analytics.totalTestimonials} testimonials</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{formatCurrency(analytics.totalRevenue)}</div>
                <p className="text-xs text-muted-foreground">From sold properties</p>
              </CardContent>
            </Card>
          </div>

          {/* Charts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Monthly Trends */}
            <Card>
              <CardHeader>
                <CardTitle>Monthly Trends</CardTitle>
                <CardDescription>Properties sold and inquiries over time</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={analytics.monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="properties" stroke="#10b981" name="Properties" />
                    <Line type="monotone" dataKey="inquiries" stroke="#3b82f6" name="Inquiries" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Revenue Trend */}
            <Card>
              <CardHeader>
                <CardTitle>Revenue Trend</CardTitle>
                <CardDescription>Monthly revenue from property sales</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={analytics.monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(value) => [formatCurrency(Number(value)), "Revenue"]} />
                    <Area type="monotone" dataKey="revenue" stroke="#10b981" fill="#10b981" fillOpacity={0.3} />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Property Types Distribution */}
            <Card>
              <CardHeader>
                <CardTitle>Property Types</CardTitle>
                <CardDescription>Distribution of property types</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={analytics.propertyTypeData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {analytics.propertyTypeData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Property Status */}
            <Card>
              <CardHeader>
                <CardTitle>Property Status</CardTitle>
                <CardDescription>Current status of all properties</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={analytics.statusData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" fill="#10b981" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
