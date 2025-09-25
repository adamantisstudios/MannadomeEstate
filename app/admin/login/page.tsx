"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Eye, EyeOff, Building2 } from "lucide-react"
import { supabase } from "@/lib/supabaseClient"
import { signIn, signUp } from "@/lib/auth"

export default function AdminLoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [mode, setMode] = useState<"login" | "signup">("login")
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      console.log(`[v0] ${mode} attempt started for:`, email)

      let session
      if (mode === "signup") {
        session = await signUp(email, password)
        if (session) {
          console.log("[v0] Signup successful, redirecting to dashboard")
          router.push("/admin/dashboard")
          return
        } else {
          setError("Failed to create admin account. Please try again.")
          return
        }
      } else {
        session = await signIn(email, password)
      }

      console.log(`[v0] ${mode} result:`, session ? "Success" : "Failed")

      if (!session) {
        setError("Invalid email or password")
        return
      }

      // Step 2: Fetch admin user from admin_users table
      const { data: adminUser, error: adminError } = await supabase
        .from("admin_users")
        .select("*")
        .eq("email", email)
        .maybeSingle() // Safe if row is missing

      if (adminError) {
        console.error("[v0] Error fetching admin user:", adminError)
        setError("Login failed. Could not fetch admin user.")
        return
      }

      if (!adminUser || !adminUser.is_active) {
        console.log("[v0] Login failed - user inactive or missing")
        setError("Invalid credentials or inactive admin account")
        return
      }

      // Step 3: Save session and redirect
      localStorage.setItem("admin_session", JSON.stringify(session))
      console.log("[v0] Login successful, redirecting to dashboard")
      router.push("/admin/dashboard")
    } catch (err) {
      console.error(`[v0] ${mode} error:`, err)
      setError(`${mode === "login" ? "Login" : "Signup"} failed. Please try again.`)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-emerald-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-emerald-600 p-3 rounded-full">
              <Building2 className="h-8 w-8 text-white" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-gray-900">
            {mode === "login" ? "Admin Login" : "Create Admin Account"}
          </CardTitle>
          <CardDescription className="text-gray-600">
            {mode === "login" ? "Sign in to access the admin dashboard" : "Create your admin account to get started"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your admin email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700" disabled={isLoading}>
              {isLoading
                ? mode === "login"
                  ? "Signing in..."
                  : "Creating account..."
                : mode === "login"
                  ? "Sign In"
                  : "Create Admin Account"}
            </Button>
          </form>

          <div className="mt-4 text-center">
            <button
              type="button"
              onClick={() => setMode(mode === "login" ? "signup" : "login")}
              className="text-sm text-emerald-600 hover:text-emerald-700 underline"
            >
              {mode === "login"
                ? "Need to create an admin account? Sign up here"
                : "Already have an account? Sign in here"}
            </button>
          </div>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              {mode === "login"
                ? "Enter your admin credentials to access the dashboard"
                : "Create the first admin account for your real estate platform"}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
