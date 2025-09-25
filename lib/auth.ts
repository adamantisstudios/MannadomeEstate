import { supabase } from "./supabaseClient" // Use consistent supabase client
import type { AdminUser } from "./database"

export interface AuthSession {
  user: AdminUser
  token: string
  expires: string
}

function isClientSide(): boolean {
  return typeof window !== "undefined"
}

export async function signIn(email: string, password: string): Promise<AuthSession | null> {
  try {
    console.log("[v0] Attempting sign in for:", email)

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      console.error("[v0] Authentication error:", error.message)
      console.error("[v0] Error details:", error)

      if (error.message === "Invalid login credentials") {
        console.error("[v0] This means either:")
        console.error("[v0] 1. The user doesn't exist in Supabase Auth")
        console.error("[v0] 2. The password is incorrect")
        console.error("[v0] 3. The user exists but is not confirmed")
      }

      return null
    }

    console.log("[v0] Supabase auth successful, user:", data.user?.email)
    console.log("[v0] Fetching admin user from admin_users table")

    const { data: adminData, error: adminError } = await supabase
      .from("admin_users")
      .select("*")
      .eq("email", email)
      .maybeSingle()

    if (adminError) {
      console.error("[v0] Error fetching admin user:", adminError)
      return null
    }

    if (!adminData) {
      console.log("[v0] No admin user found in admin_users table, creating one")
      const { data: newAdminData, error: createError } = await supabase
        .from("admin_users")
        .insert({
          auth_user_id: data.user?.id,
          email: email,
          full_name: "Admin User",
          role: "super_admin",
          is_active: true,
        })
        .select()
        .single()

      if (createError) {
        console.error("[v0] Error creating admin user:", createError)
        return null
      }

      console.log("[v0] Admin user created:", newAdminData)

      const session: AuthSession = {
        user: newAdminData,
        token: data.session?.access_token || "",
        expires: data.session?.expires_at ? new Date(data.session.expires_at * 1000).toISOString() : "",
      }

      if (isClientSide()) {
        localStorage.setItem("admin_session", JSON.stringify(session))
        // Wait a bit to ensure localStorage write is complete
        await new Promise((resolve) => setTimeout(resolve, 100))
        console.log("[v0] Session stored successfully")
      }
      return session
    }

    console.log("[v0] Admin user found:", adminData)

    const session: AuthSession = {
      user: adminData,
      token: data.session?.access_token || "",
      expires: data.session?.expires_at ? new Date(data.session.expires_at * 1000).toISOString() : "",
    }

    if (isClientSide()) {
      localStorage.setItem("admin_session", JSON.stringify(session))
      // Wait a bit to ensure localStorage write is complete
      await new Promise((resolve) => setTimeout(resolve, 100))
      console.log("[v0] Session stored successfully")
    }

    return session
  } catch (error) {
    console.error("[v0] Sign in error:", error)
    return null
  }
}

export async function signUp(email: string, password: string): Promise<AuthSession | null> {
  try {
    console.log("[v0] Attempting sign up for:", email)

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: undefined, // Skip email confirmation for admin
      },
    })

    if (error) {
      console.error("[v0] Sign up error:", error.message)
      return null
    }

    if (!data.user) {
      console.error("[v0] No user returned from sign up")
      return null
    }

    console.log("[v0] User created in Supabase Auth:", data.user.email)

    // Create admin user record
    const { data: adminData, error: adminError } = await supabase
      .from("admin_users")
      .insert({
        auth_user_id: data.user.id,
        email: email,
        full_name: "Real Estate Admin",
        role: "super_admin",
        is_active: true,
      })
      .select()
      .single()

    if (adminError) {
      console.error("[v0] Error creating admin user record:", adminError)
      return null
    }

    console.log("[v0] Admin user record created:", adminData)

    // If user needs confirmation, return null but log success
    if (!data.session) {
      console.log("[v0] User created but needs email confirmation")
      return null
    }

    const session: AuthSession = {
      user: adminData,
      token: data.session.access_token,
      expires: new Date(data.session.expires_at * 1000).toISOString(),
    }

    if (isClientSide()) {
      localStorage.setItem("admin_session", JSON.stringify(session))
    }
    return session
  } catch (error) {
    console.error("[v0] Sign up error:", error)
    return null
  }
}

export async function signOut(): Promise<void> {
  await supabase.auth.signOut()
  if (isClientSide()) {
    localStorage.removeItem("admin_session")
  }
}

export function getSession(): AuthSession | null {
  if (!isClientSide()) {
    console.log("[v0] getSession called on server side, returning null")
    return null
  }

  for (let i = 0; i < 3; i++) {
    const session = localStorage.getItem("admin_session")
    if (session) {
      try {
        return JSON.parse(session)
      } catch {
        return null
      }
    }
    // If no session found, wait a bit and try again
    if (i < 2) {
      // Synchronous wait for localStorage
      const start = Date.now()
      while (Date.now() - start < 50) {
        // Small blocking wait
      }
    }
  }
  return null
}

export function isAuthenticated(): boolean {
  console.log("[v0] Checking authentication status")

  if (!isClientSide()) {
    console.log("[v0] isAuthenticated called on server side, returning false")
    return false
  }

  const session = getSession()

  if (!session) {
    console.log("[v0] No session found in localStorage")
    return false
  }

  console.log("[v0] Session found:", {
    userEmail: session.user?.email,
    expires: session.expires,
    currentTime: new Date().toISOString(),
  })

  try {
    const expirationDate = new Date(session.expires)
    const currentDate = new Date()
    const isValid = expirationDate > currentDate

    console.log("[v0] Session expiration check:", {
      expirationDate: expirationDate.toISOString(),
      currentDate: currentDate.toISOString(),
      isValid: isValid,
      timeUntilExpiry: expirationDate.getTime() - currentDate.getTime(),
    })

    return isValid
  } catch (error) {
    console.error("[v0] Error checking session expiration:", error)
    return false
  }
}

export async function requireAuth(): Promise<AdminUser> {
  const session = getSession()
  if (!session || !isAuthenticated()) {
    throw new Error("Authentication required")
  }
  return session.user
}

export async function getCurrentUser(): Promise<AdminUser | null> {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) return null

    const { data: adminData, error } = await supabase
      .from("admin_users")
      .select("*")
      .eq("email", user.email)
      .maybeSingle()

    if (error) {
      console.error("Error fetching current admin user:", error)
      return null
    }

    return adminData
  } catch (error) {
    console.error("Error getting current user:", error)
    return null
  }
}
