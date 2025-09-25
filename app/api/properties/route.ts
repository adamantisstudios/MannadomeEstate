import { type NextRequest, NextResponse } from "next/server"
import { getProperties, createProperty } from "@/lib/database"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)

    const filters = {
      type: searchParams.get("type") || undefined,
      minPrice: searchParams.get("minPrice") ? Number(searchParams.get("minPrice")) : undefined,
      maxPrice: searchParams.get("maxPrice") ? Number(searchParams.get("maxPrice")) : undefined,
      bedrooms: searchParams.get("bedrooms") ? Number(searchParams.get("bedrooms")) : undefined,
      location: searchParams.get("location") || undefined,
      status: searchParams.get("status") || undefined,
    }

    const properties = await getProperties(filters)
    return NextResponse.json(properties)
  } catch (error) {
    console.error("Error fetching properties:", error)
    return NextResponse.json({ error: "Failed to fetch properties" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    console.log("[v0] Property creation API called")
    const body = await request.json()
    console.log("[v0] Request body:", body)

    // Basic validation for absolutely required fields only
    if (!body.title?.trim()) {
      console.log("[v0] Missing title, using default")
      body.title = "New Property"
    }

    console.log("[v0] Calling createProperty with data:", body)
    const property = await createProperty(body)

    console.log("[v0] Property created successfully:", property.id)
    return NextResponse.json(property, { status: 201 })
  } catch (error) {
    console.error("[v0] API Error creating property:", error)

    const errorMessage = error instanceof Error ? error.message : "Unknown error occurred"
    const errorDetails = {
      error: "Failed to create property",
      message: errorMessage,
      timestamp: new Date().toISOString(),
    }

    console.error("[v0] Returning error response:", errorDetails)
    return NextResponse.json(errorDetails, { status: 500 })
  }
}
