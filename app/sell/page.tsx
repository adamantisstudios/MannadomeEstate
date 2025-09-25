import type { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Home, DollarSign, Users, FileText } from "lucide-react"

export const metadata: Metadata = {
  title: "Sell Your Property | Mannadome Estate Ltd Ghana",
  description:
    "Get the best value for your property in Ghana with Mannadome Estate's expert selling services and market knowledge.",
}

export default function SellPropertyPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-emerald-50 to-emerald-100 py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-emerald-900 mb-6">Sell Your Property</h1>
          <p className="text-xl text-emerald-700 mb-8 max-w-2xl mx-auto">
            Get the best value for your property in Ghana with Mannadome Estate's expert selling services and
            comprehensive market knowledge.
          </p>
          <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700">
            Get Free Property Valuation
          </Button>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Selling Services</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card>
              <CardHeader>
                <Home className="h-12 w-12 text-emerald-600 mb-4" />
                <CardTitle>Property Valuation</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Get accurate market valuation for your property based on current market trends.
                </CardDescription>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <DollarSign className="h-12 w-12 text-emerald-600 mb-4" />
                <CardTitle>Pricing Strategy</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Strategic pricing to maximize your property value and attract serious buyers.
                </CardDescription>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <Users className="h-12 w-12 text-emerald-600 mb-4" />
                <CardTitle>Marketing & Promotion</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>Comprehensive marketing campaigns to reach qualified buyers quickly.</CardDescription>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <FileText className="h-12 w-12 text-emerald-600 mb-4" />
                <CardTitle>Legal Support</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>Complete legal assistance throughout the selling process.</CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-emerald-600 py-16 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Sell Your Property?</h2>
          <p className="text-xl mb-8">Contact Mannadome Estate today for a free consultation and property valuation.</p>
          <Button size="lg" variant="secondary">
            Contact Our Sales Team
          </Button>
        </div>
      </section>
    </div>
  )
}
