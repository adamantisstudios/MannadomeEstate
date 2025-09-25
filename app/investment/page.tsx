import type { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, PieChart, Calculator, Target } from "lucide-react"

export const metadata: Metadata = {
  title: "Investment Advice | Mannadome Estate Ltd - Property Investment Ghana",
  description:
    "Expert real estate investment advice in Ghana to help you build wealth through property with Mannadome Estate Ltd.",
}

export default function InvestmentAdvicePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-emerald-50 to-emerald-100 py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="mb-8">
            <img
              src="/images/investment-advice-hero.jpg"
              alt="Expert real estate investment advice"
              className="w-full max-w-2xl mx-auto h-64 object-cover rounded-lg shadow-lg"
            />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-emerald-900 mb-6">Investment Advice</h1>
          <p className="text-xl text-emerald-700 mb-8 max-w-2xl mx-auto">
            Expert real estate investment advice in Ghana to help you build wealth and achieve your financial goals
            through property with Mannadome Estate Ltd.
          </p>
          <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700">
            Schedule Consultation
          </Button>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Investment Services</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card>
              <CardHeader>
                <TrendingUp className="h-12 w-12 text-emerald-600 mb-4" />
                <CardTitle>Market Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  In-depth market research and trend analysis for informed investment decisions.
                </CardDescription>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <PieChart className="h-12 w-12 text-emerald-600 mb-4" />
                <CardTitle>Portfolio Planning</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>Strategic portfolio diversification and risk management planning.</CardDescription>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <Calculator className="h-12 w-12 text-emerald-600 mb-4" />
                <CardTitle>ROI Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>Detailed return on investment calculations and financial projections.</CardDescription>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <Target className="h-12 w-12 text-emerald-600 mb-4" />
                <CardTitle>Goal Setting</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Personalized investment strategies aligned with your financial objectives.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}
