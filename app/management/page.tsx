import type { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Building, Shield, Wrench, BarChart3 } from "lucide-react"

export const metadata: Metadata = {
  title: "Property Management Services | Mannadome Estate Ltd Ghana",
  description:
    "Professional property management services in Ghana to maximize your investment returns with Mannadome Estate Ltd.",
}

export default function PropertyManagementPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-emerald-50 to-emerald-100 py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="mb-8">
            <img
              src="/images/property-management-hero.jpg"
              alt="Professional property management services"
              className="w-full max-w-2xl mx-auto h-64 object-cover rounded-lg shadow-lg"
            />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-emerald-900 mb-6">Property Management</h1>
          <p className="text-xl text-emerald-700 mb-8 max-w-2xl mx-auto">
            Professional property management services in Ghana to maximize your investment returns with Mannadome Estate
            Ltd.
          </p>
          <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700">
            Get Management Quote
          </Button>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Management Services</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card>
              <CardHeader>
                <Building className="h-12 w-12 text-emerald-600 mb-4" />
                <CardTitle>Tenant Management</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Complete tenant screening, placement, and ongoing relationship management.
                </CardDescription>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <Shield className="h-12 w-12 text-emerald-600 mb-4" />
                <CardTitle>Property Security</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>24/7 security monitoring and emergency response services.</CardDescription>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <Wrench className="h-12 w-12 text-emerald-600 mb-4" />
                <CardTitle>Maintenance</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>Regular maintenance, repairs, and property upkeep services.</CardDescription>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <BarChart3 className="h-12 w-12 text-emerald-600 mb-4" />
                <CardTitle>Financial Reporting</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>Detailed financial reports and investment performance tracking.</CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}
