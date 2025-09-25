// Database utility functions - will be connected to Supabase later
import { supabase } from "./supabaseClient"

export interface Property {
  id: string
  title: string
  description: string
  price: number
  location: string
  property_type: string
  bedrooms: number
  bathrooms: number
  square_feet: number
  lot_size: string
  year_built: number
  status: "available" | "sold" | "pending"
  featured: boolean
  images: string[]
  amenities: string[]
  agent_name: string
  agent_phone: string
  agent_email: string
  created_at: string
  updated_at: string
}

export interface AdminUser {
  id: string
  email: string
  full_name: string
  role: string
  created_at: string
}

export interface PropertyInquiry {
  id: string
  property_id: string
  full_name: string
  email: string
  phone?: string
  message: string
  inquiry_type: string
  status: "new" | "contacted" | "closed"
  created_at: string
  property?: {
    title: string
    location: string
  }
}

export interface Testimonial {
  id: string
  name: string
  content: string
  rating: number
  featured: boolean
  created_at: string
  updated_at?: string
}

export async function getProperties(filters?: {
  type?: string
  minPrice?: number
  maxPrice?: number
  bedrooms?: number
  location?: string
  status?: string
}): Promise<Property[]> {
  console.log("[v0] Fetching properties with filters:", filters)

  let query = supabase.from("properties").select("*")

  if (filters?.type) {
    query = query.eq("property_type", filters.type)
  }
  if (filters?.minPrice) {
    query = query.gte("price", filters.minPrice)
  }
  if (filters?.maxPrice) {
    query = query.lte("price", filters.maxPrice)
  }
  if (filters?.bedrooms) {
    query = query.eq("bedrooms", filters.bedrooms)
  }
  if (filters?.location) {
    query = query.ilike("location", `%${filters.location}%`)
  }
  if (filters?.status) {
    query = query.eq("status", filters.status)
  }

  const { data, error } = await query.order("created_at", { ascending: false })

  if (error) {
    console.error("[v0] Error fetching properties:", error)
    return []
  }

  console.log("[v0] Properties fetched successfully:", data?.length || 0, "properties")
  return data || []
}

export async function getProperty(id: string): Promise<Property | null> {
  console.log("[v0] Fetching property with ID:", id)

  const { data, error } = await supabase.from("properties").select("*").eq("id", id).single()

  if (error) {
    console.error("[v0] Error fetching property:", error)
    return null
  }

  console.log("[v0] Property fetched successfully:", data?.title)
  return data
}

export async function createProperty(property: Omit<Property, "id" | "created_at" | "updated_at">): Promise<Property> {
  console.log("[v0] Creating property:", property.title)

  try {
    const safeProperty = {
      title: property.title || "Untitled Property",
      description: property.description || "Property description",
      price: Number(property.price) || 0,
      location: property.location || "Location TBD",
      property_type: property.property_type?.toLowerCase() || "house",
      bedrooms: Number(property.bedrooms) || 0,
      bathrooms: Number(property.bathrooms) || 0,
      square_feet: Number(property.square_feet) || 0, // Keep exact field name
      lot_size: String(property.lot_size || "0"), // Preserve as string
      year_built: Number(property.year_built) || new Date().getFullYear(),
      status: property.status || "available",
      featured: Boolean(property.featured),
      images: Array.isArray(property.images) ? property.images : ["/modern-house.png"],
      amenities: Array.isArray(property.amenities) ? property.amenities : [],
      agent_name: property.agent_name || "John Ambrose",
      agent_phone: property.agent_phone || "+233200694805",
      agent_email: property.agent_email || "info.mannadomeestate@gmail.com",
    }

    console.log("[v0] Exact property data being inserted:", safeProperty)

    const { data, error } = await supabase.from("properties").insert([safeProperty]).select().single()

    if (error) {
      console.error("[v0] Supabase error creating property:", error)
      console.error("[v0] Error details:", {
        message: error.message,
        details: error.details,
        hint: error.hint,
        code: error.code,
      })
      throw new Error(`Database error: ${error.message}`)
    }

    console.log("[v0] Property created successfully with exact data:", data.id)
    console.log("[v0] Returned property data:", JSON.stringify(data, null, 2))
    return data
  } catch (error) {
    console.error("[v0] Error in createProperty function:", error)
    throw error
  }
}

export async function updateProperty(id: string, updates: Partial<Property>): Promise<Property> {
  const { data, error } = await supabase
    .from("properties")
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq("id", id)
    .select()
    .single()

  if (error) {
    console.error("Error updating property:", error)
    throw new Error("Failed to update property")
  }

  return data
}

export async function deleteProperty(id: string): Promise<void> {
  const { error } = await supabase.from("properties").delete().eq("id", id)

  if (error) {
    console.error("Error deleting property:", error)
    throw new Error("Failed to delete property")
  }
}

export async function createInquiry(inquiry: Omit<PropertyInquiry, "id" | "created_at">): Promise<PropertyInquiry> {
  const { data, error } = await supabase.from("property_inquiries").insert([inquiry]).select().single()

  if (error) {
    console.error("Error creating inquiry:", error)
    throw new Error("Failed to create inquiry")
  }

  return data
}

export async function getInquiries(): Promise<PropertyInquiry[]> {
  const { data, error } = await supabase
    .from("property_inquiries")
    .select(`
      id,
      property_id,
      full_name,
      email,
      phone,
      message,
      inquiry_type,
      status,
      created_at
    `)
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching inquiries:", error)
    return []
  }

  const inquiriesWithProperties = await Promise.all(
    (data || []).map(async (inquiry) => {
      if (inquiry.property_id) {
        const { data: property } = await supabase
          .from("properties")
          .select("title, location")
          .eq("id", inquiry.property_id)
          .single()

        return {
          ...inquiry,
          property: property || null,
        }
      }
      return {
        ...inquiry,
        property: null,
      }
    }),
  )

  return inquiriesWithProperties
}

export async function authenticateAdmin(email: string, password: string): Promise<AdminUser | null> {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    console.error("Authentication error:", error)
    return null
  }

  // Get admin user details
  const { data: adminData, error: adminError } = await supabase
    .from("admin_users")
    .select("*")
    .eq("email", email)
    .single()

  if (adminError) {
    console.error("Error fetching admin user:", adminError)
    return null
  }

  return adminData
}

export async function getTestimonials(featured?: boolean): Promise<Testimonial[]> {
  console.log("[v0] Fetching testimonials, featured:", featured)

  let query = supabase.from("testimonials").select("*")

  if (featured !== undefined) {
    query = query.eq("featured", featured)
  }

  const { data, error } = await query.order("created_at", { ascending: false })

  if (error) {
    console.error("[v0] Error fetching testimonials:", error)
    return []
  }

  console.log("[v0] Testimonials fetched successfully:", data?.length || 0, "testimonials")
  return data || []
}

export async function uploadOptimizedImage(file: File, bucket = "property-images"): Promise<string | null> {
  try {
    // Create canvas for image compression
    const canvas = document.createElement("canvas")
    const ctx = canvas.getContext("2d")
    const img = new Image()

    return new Promise((resolve) => {
      img.onload = async () => {
        // Calculate new dimensions (max 1200px width, maintain aspect ratio)
        const maxWidth = 1200
        const ratio = Math.min(maxWidth / img.width, maxWidth / img.height)
        canvas.width = img.width * ratio
        canvas.height = img.height * ratio

        // Draw and compress image
        ctx?.drawImage(img, 0, 0, canvas.width, canvas.height)

        canvas.toBlob(
          async (blob) => {
            if (!blob) {
              resolve(null)
              return
            }

            const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.jpg`

            const { data, error } = await supabase.storage.from(bucket).upload(fileName, blob, {
              contentType: "image/jpeg",
              upsert: false,
            })

            if (error) {
              console.error("Error uploading image:", error)
              resolve(null)
              return
            }

            const {
              data: { publicUrl },
            } = supabase.storage.from(bucket).getPublicUrl(fileName)

            resolve(publicUrl)
          },
          "image/jpeg",
          0.8,
        ) // 80% quality
      }

      img.src = URL.createObjectURL(file)
    })
  } catch (error) {
    console.error("Error optimizing image:", error)
    return null
  }
}

export async function getDashboardStats() {
  try {
    console.log("[v0] Fetching dashboard statistics")

    const [propertiesResult, inquiriesResult, testimonialsResult] = await Promise.all([
      supabase.from("properties").select("status", { count: "exact" }),
      supabase.from("property_inquiries").select("status", { count: "exact" }),
      supabase.from("testimonials").select("rating", { count: "exact" }),
    ])

    const totalProperties = propertiesResult.count || 0
    const totalInquiries = inquiriesResult.count || 0
    const totalTestimonials = testimonialsResult.count || 0

    // Get properties by status
    const { data: statusData } = await supabase.from("properties").select("status")

    const availableProperties = statusData?.filter((p) => p.status === "available").length || 0
    const soldProperties = statusData?.filter((p) => p.status === "sold").length || 0
    const pendingProperties = statusData?.filter((p) => p.status === "pending").length || 0

    // Get new inquiries this month
    const startOfMonth = new Date()
    startOfMonth.setDate(1)
    startOfMonth.setHours(0, 0, 0, 0)

    const { count: newInquiries } = await supabase
      .from("property_inquiries")
      .select("*", { count: "exact", head: true })
      .gte("created_at", startOfMonth.toISOString())

    const stats = {
      totalProperties,
      availableProperties,
      soldProperties,
      pendingProperties,
      totalInquiries,
      newInquiries: newInquiries || 0,
      totalTestimonials,
    }

    console.log("[v0] Dashboard stats fetched:", stats)
    return stats
  } catch (error) {
    console.error("[v0] Error fetching dashboard stats:", error)
    return {
      totalProperties: 0,
      availableProperties: 0,
      soldProperties: 0,
      pendingProperties: 0,
      totalInquiries: 0,
      newInquiries: 0,
      totalTestimonials: 0,
    }
  }
}
