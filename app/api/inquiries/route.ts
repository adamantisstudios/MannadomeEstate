import { type NextRequest, NextResponse } from "next/server"
import { getInquiries, createInquiry } from "@/lib/database"

export async function GET() {
  try {
    const inquiries = await getInquiries()
    return NextResponse.json(inquiries)
  } catch (error) {
    console.error("Error fetching inquiries:", error)
    return NextResponse.json({ error: "Failed to fetch inquiries" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate required fields
    const requiredFields = ["full_name", "email", "message"]
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json({ error: `Missing required field: ${field}` }, { status: 400 })
      }
    }

    const inquiry = await createInquiry({
      ...body,
      status: "new",
    })

    return NextResponse.json(inquiry, { status: 201 })
  } catch (error) {
    console.error("Error creating inquiry:", error)
    return NextResponse.json({ error: "Failed to create inquiry" }, { status: 500 })
  }
}
