"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import { isAuthenticated, getSession } from "@/lib/auth"
import type { AdminUser } from "@/lib/database"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [user, setUser] = useState<AdminUser | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const checkAuth = async () => {
      if (pathname === "/admin/login") {
        setIsLoading(false)
        return
      }

      await new Promise((resolve) => setTimeout(resolve, 100))

      if (!isAuthenticated()) {
        console.log("[v0] Authentication check failed, redirecting to login")
        router.push("/admin/login")
        return
      }

      const session = getSession()
      if (session) {
        console.log("[v0] Authentication successful, user:", session.user.email)
        setUser(session.user)
      } else {
        console.log("[v0] No session found, redirecting to login")
        router.push("/admin/login")
        return
      }
      setIsLoading(false)
    }

    checkAuth()
  }, [pathname, router])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  return <>{children}</>
}
