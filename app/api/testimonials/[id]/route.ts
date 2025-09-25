import { type NextRequest, NextResponse } from "next/server"
import { supabase } from "@/lib/supabaseClient"

interface RouteParams {
  params: { id: string }
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { data, error } = await supabase.from("testimonials").select("*").eq("id", params.id).single()

    if (error) {
      return NextResponse.json({ error: "Testimonial not found" }, { status: 404 })
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error("Error fetching testimonial:", error)
    return NextResponse.json({ error: "Failed to fetch testimonial" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    const body = await request.json()

    const { data, error } = await supabase
      .from("testimonials")
      .update({
        name: body.name || body.client_name, // Support both field names for compatibility
        content: body.content,
        rating: body.rating,
        featured: body.featured,
        updated_at: new Date().toISOString(),
      })
      .eq("id", params.id)
      .select()
      .single()

    if (error) {
      console.error("Error updating testimonial:", error)
      return NextResponse.json({ error: "Failed to update testimonial" }, { status: 500 })
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error("Error updating testimonial:", error)
    return NextResponse.json({ error: "Failed to update testimonial" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const { error } = await supabase.from("testimonials").delete().eq("id", params.id)

    if (error) {
      console.error("Error deleting testimonial:", error)
      return NextResponse.json({ error: "Failed to delete testimonial" }, { status: 500 })
    }

    return NextResponse.json({ message: "Testimonial deleted successfully" })
  } catch (error) {
    console.error("Error deleting testimonial:", error)
    return NextResponse.json({ error: "Failed to delete testimonial" }, { status: 500 })
  }
}
