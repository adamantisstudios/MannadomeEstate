"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Home, Search, FileText, Users, Shield, TrendingUp } from "lucide-react"
import Link from "next/link"
import { useParallax, useScrollAnimation } from "@/hooks/use-parallax"
import { useState } from "react"

const services = [
  {
    icon: Search,
    title: "Property Search",
    description: "Find your perfect property with our advanced search tools and expert guidance.",
    features: ["Advanced filtering", "Location mapping", "Price comparison", "Virtual tours"],
    link: "/properties",
    color: "from-accent/20 to-accent/5",
    iconBg: "bg-accent/10 group-hover:bg-accent/20",
    iconColor: "text-accent",
  },
  {
    icon: Home,
    title: "Property Management",
    description: "Comprehensive property management services for landlords and investors.",
    features: ["Tenant screening", "Rent collection", "Maintenance coordination", "Financial reporting"],
    link: "https://wa.me/233200694805?text=Hello%2C%20I%27m%20interested%20in%20your%20property%20management%20services.%20Please%20provide%20more%20information.",
    color: "from-primary/20 to-primary/5",
    iconBg: "bg-primary/10 group-hover:bg-primary/20",
    iconColor: "text-primary",
  },
  {
    icon: FileText,
    title: "Legal Services",
    description: "Complete legal support for all your real estate transactions and documentation.",
    features: ["Contract review", "Title verification", "Legal documentation", "Dispute resolution"],
    link: "/legal",
    color: "from-secondary/20 to-secondary/5",
    iconBg: "bg-secondary/10 group-hover:bg-secondary/20",
    iconColor: "text-secondary",
  },
  {
    icon: TrendingUp,
    title: "Investment Advisory",
    description: "Expert advice on real estate investments and market opportunities.",
    features: ["Market analysis", "ROI calculations", "Investment strategies", "Portfolio management"],
    link: "https://wa.me/233200694805?text=Hello%2C%20I%27m%20interested%20in%20your%20investment%20advisory%20services.%20Please%20provide%20more%20information.",
    color: "from-accent/20 to-accent/5",
    iconBg: "bg-accent/10 group-hover:bg-accent/20",
    iconColor: "text-accent",
  },
  {
    icon: Shield,
    title: "Property Insurance",
    description: "Protect your investment with comprehensive property insurance solutions.",
    features: ["Coverage options", "Risk assessment", "Claims support", "Policy management"],
    link: "https://wa.me/233200694805?text=Hello%2C%20I%27m%20interested%20in%20your%20property%20insurance%20services.%20Please%20provide%20more%20information.",
    color: "from-primary/20 to-primary/5",
    iconBg: "bg-primary/10 group-hover:bg-primary/20",
    iconColor: "text-primary",
  },
  {
    icon: Users,
    title: "Consultation Services",
    description: "Personalized consultation for buyers, sellers, and investors.",
    features: ["Market insights", "Property valuation", "Negotiation support", "Strategic planning"],
    link: "/contact",
    color: "from-secondary/20 to-secondary/5",
    iconBg: "bg-secondary/10 group-hover:bg-secondary/20",
    iconColor: "text-secondary",
  },
]

export default function ServicesSection() {
  const parallaxOffset = useParallax(0.3)
  const { isVisible: headerVisible, setElement: setHeaderElement } = useScrollAnimation()
  const { isVisible: cardsVisible, setElement: setCardsElement } = useScrollAnimation()
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)

  return (
    <section className="py-20 bg-gradient-to-br from-muted/30 to-background relative overflow-hidden">
      <div className="absolute inset-0 opacity-5" style={{ transform: `translateY(${parallaxOffset}px)` }}>
        <div className="absolute top-20 left-10 w-32 h-32 bg-accent rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-48 h-48 bg-primary rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div
          ref={setHeaderElement}
          className={`text-center mb-16 transition-all duration-1000 ease-out ${
            headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="mb-8 relative">
            <div
              className="relative overflow-hidden rounded-lg shadow-lg hover-lift"
              style={{ transform: `translateY(${parallaxOffset * 0.5}px)` }}
            >
              <img
                src="/images/luxury-residential-development-east-legon.png"
                alt="Our Premium Services"
                className="w-full max-w-2xl mx-auto h-64 object-cover transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent"></div>
            </div>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance font-heading">
            Our Premium Services
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
            From property search to investment advisory, we provide comprehensive real estate services tailored to your
            unique needs and goals.
          </p>
        </div>

        <div ref={setCardsElement} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card
              key={index}
              className={`group hover-lift hover-glow transition-all duration-500 border-accent/20 bg-gradient-to-br ${service.color} backdrop-blur-sm ${
                cardsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{
                transitionDelay: `${index * 100}ms`,
                transform: hoveredCard === index ? "translateY(-8px) scale(1.02)" : undefined,
              }}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <CardHeader>
                <div
                  className={`w-12 h-12 ${service.iconBg} rounded-lg flex items-center justify-center mb-4 transition-all duration-300 hover:rotate-6`}
                >
                  <service.icon className={`w-6 h-6 ${service.iconColor}`} />
                </div>
                <CardTitle className="text-xl font-semibold text-foreground font-heading">{service.title}</CardTitle>
                <CardDescription className="text-muted-foreground">{service.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-sm text-muted-foreground">
                      <div className="w-1.5 h-1.5 bg-accent rounded-full mr-3 transition-all duration-300 group-hover:scale-150"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button
                  asChild
                  variant="outline"
                  className="w-full group-hover:bg-accent/10 group-hover:border-accent/50 bg-transparent border-accent/30 text-foreground hover:text-accent transition-all duration-300"
                >
                  {service.link.startsWith("http") ? (
                    <a href={service.link} target="_blank" rel="noopener noreferrer">
                      Learn More
                    </a>
                  ) : (
                    <Link href={service.link}>Learn More</Link>
                  )}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div
          className={`text-center mt-12 transition-all duration-1000 ease-out delay-700 ${
            cardsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <Button asChild size="lg" className="hover-lift bg-accent hover:bg-accent/90 text-accent-foreground">
            <Link href="/contact">Get Started Today</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
