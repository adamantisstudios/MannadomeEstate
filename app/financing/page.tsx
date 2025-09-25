import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, Calculator, CreditCard, Home, TrendingUp } from "lucide-react"

const financingOptions = [
  {
    icon: Home,
    title: "Mortgage Loans",
    description: "Traditional home loans with competitive interest rates",
    features: [
      "Up to 30-year terms",
      "Fixed or variable rates",
      "Down payment as low as 10%",
      "Quick approval process",
    ],
    rate: "From 12% APR",
  },
  {
    icon: CreditCard,
    title: "Construction Financing",
    description: "Specialized loans for building your dream home",
    features: [
      "Flexible draw schedule",
      "Interest-only payments during construction",
      "Convert to permanent mortgage",
      "Expert project oversight",
    ],
    rate: "From 14% APR",
  },
  {
    icon: TrendingUp,
    title: "Investment Property Loans",
    description: "Financing solutions for real estate investors",
    features: [
      "Multiple property financing",
      "Rental income consideration",
      "Portfolio lending options",
      "Competitive investor rates",
    ],
    rate: "From 15% APR",
  },
]

const lenders = [
  {
    name: "Ghana Commercial Bank",
    logo: "/ghana-commercial-bank-logo.png",
    specialties: ["First-time homebuyers", "Competitive rates"],
  },
  {
    name: "Ecobank Ghana",
    logo: "/ecobank-ghana-logo.png",
    specialties: ["Quick approvals", "Flexible terms"],
  },
  {
    name: "Standard Chartered Bank",
    logo: "/standard-chartered-bank-logo.png",
    specialties: ["Premium banking", "Large loan amounts"],
  },
  {
    name: "Absa Bank Ghana",
    logo: "/absa-bank-ghana-logo.png",
    specialties: ["Construction loans", "Investment properties"],
  },
]

export default function FinancingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary/10 to-primary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-8">
            <img
              src="/images/financing-options-hero.jpg"
              alt="Flexible financing solutions for property purchases"
              className="w-full max-w-2xl mx-auto h-64 object-cover rounded-lg shadow-lg"
            />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 text-balance">Financing Options</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
            Explore flexible financing solutions to make your property dreams a reality. We work with Ghana's leading
            financial institutions.
          </p>
        </div>
      </section>

      {/* Financing Options */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Choose Your Financing Path</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Whether you're buying your first home or expanding your investment portfolio, we have financing solutions
              for you.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {financingOptions.map((option, index) => (
              <Card key={index} className="relative">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <option.icon className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{option.title}</CardTitle>
                  <p className="text-muted-foreground">{option.description}</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 mb-6">
                    {option.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-primary mr-2 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary mb-4">{option.rate}</div>
                    <Button className="w-full" asChild>
                      <a
                        href={`https://wa.me/233200694805?text=Hi%2C%20I%20am%20interested%20in%20${encodeURIComponent(option.title)}%20financing%20options.%20Please%20provide%20more%20details.`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Get Pre-Qualified
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Partner Lenders */}
      <section className="py-16 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Our Partner Lenders</h2>
            <p className="text-muted-foreground">
              We work with Ghana's most trusted financial institutions to secure the best rates for our clients.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {lenders.map((lender, index) => (
              <Card key={index} className="text-center">
                <CardContent className="p-6">
                  <div className="h-16 flex items-center justify-center mb-4">
                    <img
                      src={lender.logo || "/placeholder.svg"}
                      alt={`${lender.name} logo`}
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{lender.name}</h3>
                  <div className="space-y-1">
                    {lender.specialties.map((specialty, specialtyIndex) => (
                      <span
                        key={specialtyIndex}
                        className="inline-block text-xs bg-primary/10 text-primary px-2 py-1 rounded-full mr-1"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Mortgage Calculator */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card>
            <CardHeader className="text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Calculator className="w-6 h-6 text-primary" />
              </div>
              <CardTitle className="text-2xl">Mortgage Calculator</CardTitle>
              <p className="text-muted-foreground">
                Get an estimate of your monthly mortgage payments and see what you can afford.
              </p>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-muted-foreground mb-6">
                Contact our financing specialists for a personalized mortgage calculation based on current rates and
                your financial situation.
              </p>
              <Button size="lg" asChild>
                <a
                  href={`https://wa.me/233200694805?text=Hi%2C%20I%20would%20like%20to%20calculate%20my%20mortgage%20payments%20and%20discuss%20financing%20options.`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Calculate My Mortgage
                </a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}
