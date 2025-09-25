import { type NextRequest, NextResponse } from "next/server"
import { supabase } from "@/lib/supabaseClient"

interface RouteParams {
  params: { id: string }
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { data, error } = await supabase.from("inquiries").select("*").eq("id", params.id).single()

    if (error) {
      return NextResponse.json({ error: "Inquiry not found" }, { status: 404 })
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error("Error fetching inquiry:", error)
    return NextResponse.json({ error: "Failed to fetch inquiry" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    const body = await request.json()

    const { data, error } = await supabase
      .from("inquiries")
      .update({
        status: body.status,
        updated_at: new Date().toISOString(),
      })
      .eq("id", params.id)
      .select()
      .single()

    if (error) {
      console.error("Error updating inquiry:", error)
      return NextResponse.json({ error: "Failed to update inquiry" }, { status: 500 })
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error("Error updating inquiry:", error)
    return NextResponse.json({ error: "Failed to update inquiry" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const { error } = await supabase.from("inquiries").delete().eq("id", params.id)

    if (error) {
      console.error("Error deleting inquiry:", error)
      return NextResponse.json({ error: "Failed to delete inquiry" }, { status: 500 })
    }

    return NextResponse.json({ message: "Inquiry deleted successfully" })
  } catch (error) {
    console.error("Error deleting inquiry:", error)
    return NextResponse.json({ error: "Failed to delete inquiry" }, { status: 500 })
  }
}
