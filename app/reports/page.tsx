import type { Metadata } from "next"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BarChart3, TrendingUp, MapPin, Calendar } from "lucide-react"

export const metadata: Metadata = {
  title: "Market Reports | Mannadome Estate Ltd - Ghana Real Estate Analysis",
  description:
    "Latest Ghana real estate market reports and analysis for informed property decisions with Mannadome Estate Ltd.",
}

export default function MarketReportsPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-emerald-50 to-emerald-100 py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="mb-8">
            <img
              src="/images/market-reports-hero.jpg"
              alt="Latest market reports and analysis"
              className="w-full max-w-2xl mx-auto h-64 object-cover rounded-lg shadow-lg"
            />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-emerald-900 mb-6">Market Reports</h1>
          <p className="text-xl text-emerald-700 mb-8 max-w-2xl mx-auto">
            Stay informed with our latest market analysis, trends, and insights for smart real estate decisions.
          </p>
        </div>
      </section>

      {/* Reports Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <BarChart3 className="h-12 w-12 text-emerald-600 mb-4" />
                <CardTitle>Monthly Market Analysis</CardTitle>
                <CardDescription>January 2025</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Comprehensive analysis of property prices, sales volume, and market trends.
                </p>
                <Button variant="outline" size="sm">
                  Download Report
                </Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <TrendingUp className="h-12 w-12 text-emerald-600 mb-4" />
                <CardTitle>Price Trend Report</CardTitle>
                <CardDescription>Q4 2024</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Quarterly price movements and forecasts for different property types.
                </p>
                <Button variant="outline" size="sm">
                  Download Report
                </Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <MapPin className="h-12 w-12 text-emerald-600 mb-4" />
                <CardTitle>Regional Analysis</CardTitle>
                <CardDescription>2024 Annual</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Area-specific market performance and investment opportunities.
                </p>
                <Button variant="outline" size="sm">
                  Download Report
                </Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <Calendar className="h-12 w-12 text-emerald-600 mb-4" />
                <CardTitle>Market Forecast</CardTitle>
                <CardDescription>2025 Outlook</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Predictions and insights for the upcoming year in real estate.
                </p>
                <Button variant="outline" size="sm">
                  Download Report
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}
