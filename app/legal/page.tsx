import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Scale, FileText, Shield, Users, CheckCircle, AlertTriangle } from "lucide-react"

const legalServices = [
  {
    icon: FileText,
    title: "Property Documentation",
    description: "Complete documentation services for property transactions",
    services: [
      "Title deed verification",
      "Land certificate processing",
      "Property registration",
      "Document authentication",
    ],
  },
  {
    icon: Scale,
    title: "Legal Due Diligence",
    description: "Comprehensive legal checks to protect your investment",
    services: [
      "Property title searches",
      "Encumbrance verification",
      "Zoning compliance checks",
      "Legal risk assessment",
    ],
  },
  {
    icon: Shield,
    title: "Contract Review & Drafting",
    description: "Professional legal contract services",
    services: [
      "Purchase agreement drafting",
      "Lease agreement preparation",
      "Contract review and negotiation",
      "Legal advisory services",
    ],
  },
  {
    icon: Users,
    title: "Dispute Resolution",
    description: "Expert assistance with property-related disputes",
    services: ["Mediation services", "Legal representation", "Boundary dispute resolution", "Tenant-landlord disputes"],
  },
]

const legalPartners = [
  {
    name: "Akufo-Addo, Prempeh & Co.",
    specialization: "Real Estate Law",
    experience: "25+ years",
    description: "Leading law firm specializing in property transactions and real estate development.",
  },
  {
    name: "Bentsi-Enchill, Letsa & Ankomah",
    specialization: "Property Law",
    experience: "30+ years",
    description: "Renowned for handling complex real estate transactions and property disputes.",
  },
  {
    name: "Kimathi & Partners",
    specialization: "Commercial Real Estate",
    experience: "20+ years",
    description: "Experts in commercial property law and investment structuring.",
  },
]

const legalProcess = [
  {
    step: "1",
    title: "Initial Consultation",
    description: "Discuss your legal needs and property requirements with our legal team.",
  },
  {
    step: "2",
    title: "Document Review",
    description: "Comprehensive review of all property documents and legal requirements.",
  },
  {
    step: "3",
    title: "Legal Due Diligence",
    description: "Thorough investigation of property title, ownership, and legal status.",
  },
  {
    step: "4",
    title: "Documentation & Completion",
    description: "Preparation and execution of all legal documents for property transfer.",
  },
]

export default function LegalPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary/10 to-primary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-8">
            <img
              src="/images/legal-services-hero.jpg"
              alt="Comprehensive legal support for real estate"
              className="w-full max-w-2xl mx-auto h-64 object-cover rounded-lg shadow-lg"
            />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 text-balance">Legal Services</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
            Comprehensive legal support for all your real estate transactions. Our experienced legal partners ensure
            your property investments are secure and compliant.
          </p>
        </div>
      </section>

      {/* Legal Services */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Our Legal Services</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              From property documentation to dispute resolution, we provide comprehensive legal support for all your
              real estate needs.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {legalServices.map((service, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <service.icon className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                  <p className="text-muted-foreground">{service.description}</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {service.services.map((item, itemIndex) => (
                      <div key={itemIndex} className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-primary mr-2 flex-shrink-0" />
                        <span className="text-sm">{item}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Legal Process */}
      <section className="py-16 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Our Legal Process</h2>
            <p className="text-muted-foreground">
              A streamlined approach to ensure your property transactions are legally sound and secure.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {legalProcess.map((process, index) => (
              <Card key={index} className="text-center">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mx-auto mb-4">
                    <span className="text-primary-foreground font-bold text-lg">{process.step}</span>
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{process.title}</h3>
                  <p className="text-sm text-muted-foreground">{process.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Legal Partners */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Our Legal Partners</h2>
            <p className="text-muted-foreground">
              We work with Ghana's most respected law firms to provide you with expert legal representation.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {legalPartners.map((partner, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-lg">{partner.name}</CardTitle>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-primary font-medium">{partner.specialization}</span>
                    <span className="text-muted-foreground">{partner.experience}</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm">{partner.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Important Notice */}
      <section className="py-16 bg-amber-50 border-t border-amber-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="border-amber-200">
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <AlertTriangle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Important Legal Notice</h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    All property transactions in Ghana require proper legal documentation and compliance with local
                    laws. We strongly recommend engaging our legal services to ensure your investment is protected and
                    all legal requirements are met.
                  </p>
                  <Button asChild>
                    <a
                      href={`https://wa.me/233200694805?text=Hi%2C%20I%20need%20legal%20assistance%20for%20my%20property%20transaction.%20Please%20connect%20me%20with%20your%20legal%20team.`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Get Legal Consultation
                    </a>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}
