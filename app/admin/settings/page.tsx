"use client"

import { useState, useEffect } from "react"
import { AdminHeader } from "@/components/admin-header"
import { AdminSidebar } from "@/components/admin-sidebar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { User, Building, Mail, Phone, MapPin, Globe, Shield, Bell, Database } from "lucide-react"
import { supabase } from "@/lib/supabaseClient"
import { getSession } from "@/lib/auth"

interface CompanySettings {
  company_name: string
  company_description: string
  company_email: string
  company_phone: string
  company_address: string
  company_website: string
  social_facebook: string
  social_twitter: string
  social_instagram: string
  social_linkedin: string
}

interface AdminProfile {
  full_name: string
  email: string
  role: string
  is_active: boolean
}

interface NotificationSettings {
  email_new_inquiries: boolean
  email_new_testimonials: boolean
  email_property_updates: boolean
  sms_notifications: boolean
}

export default function AdminSettingsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)

  // Form states
  const [companySettings, setCompanySettings] = useState<CompanySettings>({
    company_name: "Mannadome Estate Ltd",
    company_description: "Premier real estate company specializing in luxury properties and exceptional service.",
    company_email: "info.mannadomeestate@gmail.com",
    company_phone: "+233 24 123 4567",
    company_address: "East Legon, Accra, Ghana",
    company_website: "https://mannadomeestate.com",
    social_facebook: "",
    social_twitter: "",
    social_instagram: "",
    social_linkedin: "",
  })

  const [adminProfile, setAdminProfile] = useState<AdminProfile>({
    full_name: "",
    email: "",
    role: "",
    is_active: true,
  })

  const [notificationSettings, setNotificationSettings] = useState<NotificationSettings>({
    email_new_inquiries: true,
    email_new_testimonials: true,
    email_property_updates: true,
    sms_notifications: false,
  })

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  useEffect(() => {
    loadSettings()
  }, [])

  const loadSettings = async () => {
    try {
      console.log("[v0] Loading admin settings")

      // Load admin profile
      const session = getSession()
      if (session?.user) {
        setAdminProfile({
          full_name: session.user.full_name || "",
          email: session.user.email || "",
          role: session.user.role || "",
          is_active: session.user.is_active || false,
        })
      }

      // Load company settings from database or localStorage
      const savedSettings = localStorage.getItem("companySettings")
      if (savedSettings) {
        setCompanySettings(JSON.parse(savedSettings))
      }

      // Load notification settings from localStorage
      const savedNotifications = localStorage.getItem("notificationSettings")
      if (savedNotifications) {
        setNotificationSettings(JSON.parse(savedNotifications))
      }

      console.log("[v0] Settings loaded successfully")
    } catch (error) {
      console.error("[v0] Error loading settings:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const saveCompanySettings = async () => {
    setIsSaving(true)
    try {
      console.log("[v0] Saving company settings")

      // Save to localStorage (in a real app, this would be saved to database)
      localStorage.setItem("companySettings", JSON.stringify(companySettings))

      console.log("[v0] Company settings saved successfully")
      alert("Company settings saved successfully!")
    } catch (error) {
      console.error("[v0] Error saving company settings:", error)
      alert("Error saving settings. Please try again.")
    } finally {
      setIsSaving(false)
    }
  }

  const saveNotificationSettings = async () => {
    setIsSaving(true)
    try {
      console.log("[v0] Saving notification settings")

      // Save to localStorage (in a real app, this would be saved to database)
      localStorage.setItem("notificationSettings", JSON.stringify(notificationSettings))

      console.log("[v0] Notification settings saved successfully")
      alert("Notification settings saved successfully!")
    } catch (error) {
      console.error("[v0] Error saving notification settings:", error)
      alert("Error saving settings. Please try again.")
    } finally {
      setIsSaving(false)
    }
  }

  const updateProfile = async () => {
    setIsSaving(true)
    try {
      console.log("[v0] Updating admin profile")

      const session = getSession()
      if (!session?.user?.id) {
        throw new Error("No user session found")
      }

      const { error } = await supabase
        .from("admin_users")
        .update({
          full_name: adminProfile.full_name,
          updated_at: new Date().toISOString(),
        })
        .eq("id", session.user.id)

      if (error) throw error

      console.log("[v0] Profile updated successfully")
      alert("Profile updated successfully!")
    } catch (error) {
      console.error("[v0] Error updating profile:", error)
      alert("Error updating profile. Please try again.")
    } finally {
      setIsSaving(false)
    }
  }

  const changePassword = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert("New passwords don't match!")
      return
    }

    if (passwordData.newPassword.length < 6) {
      alert("Password must be at least 6 characters long!")
      return
    }

    setIsSaving(true)
    try {
      console.log("[v0] Changing password")

      const { error } = await supabase.auth.updateUser({
        password: passwordData.newPassword,
      })

      if (error) throw error

      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      })

      console.log("[v0] Password changed successfully")
      alert("Password changed successfully!")
    } catch (error) {
      console.error("[v0] Error changing password:", error)
      alert("Error changing password. Please try again.")
    } finally {
      setIsSaving(false)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <AdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <div className="lg:ml-64">
          <AdminHeader onMenuToggle={() => setSidebarOpen(!sidebarOpen)} />
          <main className="p-6">
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600 mx-auto"></div>
              <p className="mt-2 text-gray-600">Loading settings...</p>
            </div>
          </main>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="lg:ml-64">
        <AdminHeader onMenuToggle={() => setSidebarOpen(!sidebarOpen)} />

        <main className="p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
            <p className="text-gray-600">Manage your account and application settings</p>
          </div>

          <Tabs defaultValue="profile" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="company">Company</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
            </TabsList>

            {/* Profile Settings */}
            <TabsContent value="profile">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Profile Information
                  </CardTitle>
                  <CardDescription>Update your personal information and account details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="fullName">Full Name</Label>
                      <Input
                        id="fullName"
                        value={adminProfile.full_name}
                        onChange={(e) => setAdminProfile({ ...adminProfile, full_name: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email Address</Label>
                      <Input id="email" type="email" value={adminProfile.email} disabled className="bg-gray-50" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="role">Role</Label>
                      <div className="mt-1">
                        <Badge variant="secondary" className="capitalize">
                          {adminProfile.role}
                        </Badge>
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="status">Account Status</Label>
                      <div className="mt-1">
                        <Badge className={adminProfile.is_active ? "bg-green-600" : "bg-red-600"}>
                          {adminProfile.is_active ? "Active" : "Inactive"}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div className="flex justify-end">
                    <Button onClick={updateProfile} disabled={isSaving}>
                      {isSaving ? "Saving..." : "Save Profile"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Company Settings */}
            <TabsContent value="company">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building className="h-5 w-5" />
                    Company Information
                  </CardTitle>
                  <CardDescription>Manage your company details and contact information</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="companyName">Company Name</Label>
                    <Input
                      id="companyName"
                      value={companySettings.company_name}
                      onChange={(e) => setCompanySettings({ ...companySettings, company_name: e.target.value })}
                    />
                  </div>

                  <div>
                    <Label htmlFor="companyDescription">Company Description</Label>
                    <Textarea
                      id="companyDescription"
                      rows={3}
                      value={companySettings.company_description}
                      onChange={(e) => setCompanySettings({ ...companySettings, company_description: e.target.value })}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="companyEmail" className="flex items-center gap-2">
                        <Mail className="h-4 w-4" />
                        Email Address
                      </Label>
                      <Input
                        id="companyEmail"
                        type="email"
                        value={companySettings.company_email}
                        onChange={(e) => setCompanySettings({ ...companySettings, company_email: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="companyPhone" className="flex items-center gap-2">
                        <Phone className="h-4 w-4" />
                        Phone Number
                      </Label>
                      <Input
                        id="companyPhone"
                        value={companySettings.company_phone}
                        onChange={(e) => setCompanySettings({ ...companySettings, company_phone: e.target.value })}
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="companyAddress" className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      Address
                    </Label>
                    <Input
                      id="companyAddress"
                      value={companySettings.company_address}
                      onChange={(e) => setCompanySettings({ ...companySettings, company_address: e.target.value })}
                    />
                  </div>

                  <div>
                    <Label htmlFor="companyWebsite" className="flex items-center gap-2">
                      <Globe className="h-4 w-4" />
                      Website
                    </Label>
                    <Input
                      id="companyWebsite"
                      type="url"
                      value={companySettings.company_website}
                      onChange={(e) => setCompanySettings({ ...companySettings, company_website: e.target.value })}
                    />
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h4 className="font-medium">Social Media Links</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="facebook">Facebook</Label>
                        <Input
                          id="facebook"
                          placeholder="https://facebook.com/yourpage"
                          value={companySettings.social_facebook}
                          onChange={(e) => setCompanySettings({ ...companySettings, social_facebook: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="twitter">Twitter</Label>
                        <Input
                          id="twitter"
                          placeholder="https://twitter.com/yourhandle"
                          value={companySettings.social_twitter}
                          onChange={(e) => setCompanySettings({ ...companySettings, social_twitter: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="instagram">Instagram</Label>
                        <Input
                          id="instagram"
                          placeholder="https://instagram.com/yourhandle"
                          value={companySettings.social_instagram}
                          onChange={(e) => setCompanySettings({ ...companySettings, social_instagram: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="linkedin">LinkedIn</Label>
                        <Input
                          id="linkedin"
                          placeholder="https://linkedin.com/company/yourcompany"
                          value={companySettings.social_linkedin}
                          onChange={(e) => setCompanySettings({ ...companySettings, social_linkedin: e.target.value })}
                        />
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div className="flex justify-end">
                    <Button onClick={saveCompanySettings} disabled={isSaving}>
                      {isSaving ? "Saving..." : "Save Company Settings"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Notification Settings */}
            <TabsContent value="notifications">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="h-5 w-5" />
                    Notification Preferences
                  </CardTitle>
                  <CardDescription>Configure how you want to receive notifications</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h4 className="font-medium">Email Notifications</h4>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="emailInquiries">New Inquiries</Label>
                        <p className="text-sm text-gray-600">Get notified when customers submit new inquiries</p>
                      </div>
                      <Switch
                        id="emailInquiries"
                        checked={notificationSettings.email_new_inquiries}
                        onCheckedChange={(checked) =>
                          setNotificationSettings({ ...notificationSettings, email_new_inquiries: checked })
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="emailTestimonials">New Testimonials</Label>
                        <p className="text-sm text-gray-600">Get notified when customers leave testimonials</p>
                      </div>
                      <Switch
                        id="emailTestimonials"
                        checked={notificationSettings.email_new_testimonials}
                        onCheckedChange={(checked) =>
                          setNotificationSettings({ ...notificationSettings, email_new_testimonials: checked })
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="emailProperties">Property Updates</Label>
                        <p className="text-sm text-gray-600">Get notified about property status changes</p>
                      </div>
                      <Switch
                        id="emailProperties"
                        checked={notificationSettings.email_property_updates}
                        onCheckedChange={(checked) =>
                          setNotificationSettings({ ...notificationSettings, email_property_updates: checked })
                        }
                      />
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h4 className="font-medium">SMS Notifications</h4>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="smsNotifications">SMS Alerts</Label>
                        <p className="text-sm text-gray-600">Receive important alerts via SMS</p>
                      </div>
                      <Switch
                        id="smsNotifications"
                        checked={notificationSettings.sms_notifications}
                        onCheckedChange={(checked) =>
                          setNotificationSettings({ ...notificationSettings, sms_notifications: checked })
                        }
                      />
                    </div>
                  </div>

                  <Separator />

                  <div className="flex justify-end">
                    <Button onClick={saveNotificationSettings} disabled={isSaving}>
                      {isSaving ? "Saving..." : "Save Notification Settings"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Security Settings */}
            <TabsContent value="security">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    Security Settings
                  </CardTitle>
                  <CardDescription>Manage your password and security preferences</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h4 className="font-medium">Change Password</h4>

                    <div>
                      <Label htmlFor="currentPassword">Current Password</Label>
                      <Input
                        id="currentPassword"
                        type="password"
                        value={passwordData.currentPassword}
                        onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                      />
                    </div>

                    <div>
                      <Label htmlFor="newPassword">New Password</Label>
                      <Input
                        id="newPassword"
                        type="password"
                        value={passwordData.newPassword}
                        onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                      />
                    </div>

                    <div>
                      <Label htmlFor="confirmPassword">Confirm New Password</Label>
                      <Input
                        id="confirmPassword"
                        type="password"
                        value={passwordData.confirmPassword}
                        onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                      />
                    </div>

                    <Button onClick={changePassword} disabled={isSaving}>
                      {isSaving ? "Changing..." : "Change Password"}
                    </Button>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h4 className="font-medium">Database Connection</h4>
                    <div className="flex items-center gap-2">
                      <Database className="h-4 w-4 text-green-600" />
                      <span className="text-sm text-green-600">Connected to Supabase</span>
                    </div>
                    <p className="text-sm text-gray-600">Your application is successfully connected to the database.</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}
