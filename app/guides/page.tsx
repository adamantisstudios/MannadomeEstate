import type { Metadata } from "next"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, FileText, Video, Download } from "lucide-react"

export const metadata: Metadata = {
  title: "Property Guides | Mannadome Estate Ltd - Real Estate Ghana",
  description:
    "Comprehensive guides and resources for buying, selling, and investing in real estate in Ghana with Mannadome Estate Ltd.",
}

export default function PropertyGuidesPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-emerald-50 to-emerald-100 py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="mb-8">
            <img
              src="/images/property-guides-hero.jpg"
              alt="Comprehensive property guides and resources"
              className="w-full max-w-2xl mx-auto h-64 object-cover rounded-lg shadow-lg"
            />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-emerald-900 mb-6">Property Guides</h1>
          <p className="text-xl text-emerald-700 mb-8 max-w-2xl mx-auto">
            Comprehensive guides and resources to help you navigate the real estate market with confidence.
          </p>
        </div>
      </section>

      {/* Guides Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <BookOpen className="h-12 w-12 text-emerald-600 mb-4" />
                <CardTitle>First-Time Buyer's Guide</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Everything you need to know about buying your first property, from financing to closing.
                </CardDescription>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <FileText className="h-12 w-12 text-emerald-600 mb-4" />
                <CardTitle>Seller's Handbook</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Step-by-step guide to selling your property for maximum value in minimum time.
                </CardDescription>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <Video className="h-12 w-12 text-emerald-600 mb-4" />
                <CardTitle>Investment Strategies</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Advanced strategies for building wealth through real estate investments.
                </CardDescription>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <Download className="h-12 w-12 text-emerald-600 mb-4" />
                <CardTitle>Market Reports</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Monthly market analysis and trends to keep you informed about property values.
                </CardDescription>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <BookOpen className="h-12 w-12 text-emerald-600 mb-4" />
                <CardTitle>Legal Guidelines</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Understanding contracts, regulations, and legal requirements in real estate.
                </CardDescription>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <FileText className="h-12 w-12 text-emerald-600 mb-4" />
                <CardTitle>Financing Options</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Complete guide to mortgages, loans, and financing solutions for property purchases.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}
