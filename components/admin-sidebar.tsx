"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Home, Building, MessageSquare, Users, BarChart3, Settings, MapPin, Building2, Hotel, Bed } from "lucide-react"

const navigation = [
  { name: "Dashboard", href: "/admin/dashboard", icon: Home },
  { name: "Properties", href: "/admin/properties", icon: Building },
  { name: "Inquiries", href: "/admin/inquiries", icon: MessageSquare },
  { name: "Testimonials", href: "/admin/testimonials", icon: Users },
  { name: "Analytics", href: "/admin/analytics", icon: BarChart3 },
  { name: "Settings", href: "/admin/settings", icon: Settings },
]

const propertyTypes = [
  { name: "Houses & Villas", href: "/admin/properties?type=house", icon: Building },
  { name: "Apartments", href: "/admin/properties?type=apartment", icon: Building2 },
  { name: "Land", href: "/admin/properties?type=land", icon: MapPin },
  { name: "Student Hostels", href: "/admin/properties?type=student_hostel", icon: Hotel },
  { name: "Hostel Rooms", href: "/admin/properties?type=hostel_room", icon: Bed },
]

interface AdminSidebarProps {
  isOpen?: boolean
  onClose?: () => void
}

export function AdminSidebar({ isOpen = true, onClose }: AdminSidebarProps) {
  const pathname = usePathname()

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" onClick={onClose} />}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 z-50 h-full w-64 bg-gray-900 text-white transform transition-transform duration-200 ease-in-out lg:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="p-6">
          <h2 className="text-lg font-semibold text-gray-100">Admin Panel</h2>
        </div>

        <nav className="px-4 space-y-1">
          {navigation.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={onClose}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                  isActive ? "bg-emerald-600 text-white" : "text-gray-300 hover:bg-gray-800 hover:text-white",
                )}
              >
                <item.icon className="h-5 w-5" />
                {item.name}
              </Link>
            )
          })}

          <div className="pt-4 mt-4 border-t border-gray-700">
            <p className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Property Types</p>
            {propertyTypes.map((item) => {
              const isActive = pathname.includes(item.href)
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={onClose}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                    isActive ? "bg-emerald-600 text-white" : "text-gray-300 hover:bg-gray-800 hover:text-white",
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  {item.name}
                </Link>
              )
            })}
          </div>
        </nav>
      </aside>
    </>
  )
}
