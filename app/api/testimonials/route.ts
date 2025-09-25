import { type NextRequest, NextResponse } from "next/server"
import { getTestimonials } from "@/lib/database"
import { supabase } from "@/lib/supabaseClient"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const featured = searchParams.get("featured") === "true"

    const testimonials = await getTestimonials(featured)
    return NextResponse.json(testimonials)
  } catch (error) {
    console.error("Error fetching testimonials:", error)
    return NextResponse.json({ error: "Failed to fetch testimonials" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    if (!body.name && !body.client_name) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 })
    }

    if (!body.content) {
      return NextResponse.json({ error: "Content is required" }, { status: 400 })
    }

    const { data, error } = await supabase
      .from("testimonials")
      .insert([
        {
          name: body.name || body.client_name, // Support both field names for compatibility
          content: body.content,
          rating: body.rating || 5,
          featured: body.featured || false,
        },
      ])
      .select()
      .single()

    if (error) {
      console.error("Error creating testimonial:", error)
      return NextResponse.json({ error: "Failed to create testimonial" }, { status: 500 })
    }

    return NextResponse.json(data, { status: 201 })
  } catch (error) {
    console.error("Error creating testimonial:", error)
    return NextResponse.json({ error: "Failed to create testimonial" }, { status: 500 })
  }
}
