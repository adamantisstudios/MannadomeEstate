import { type NextRequest, NextResponse } from "next/server"
import { authenticateAdmin } from "@/lib/database"

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 })
    }

    const user = await authenticateAdmin(email, password)

    if (!user) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }

    // Create session token (in production, use proper JWT)
    const session = {
      user,
      token: `session_${Date.now()}_${Math.random()}`,
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // 24 hours
    }

    return NextResponse.json(session)
  } catch (error) {
    console.error("Error during authentication:", error)
    return NextResponse.json({ error: "Authentication failed" }, { status: 500 })
  }
}
