import { Shield, Heart, Lightbulb, Handshake } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const values = [
  {
    icon: Shield,
    title: "Trust & Integrity",
    description:
      "We build lasting relationships through honest, transparent dealings and unwavering ethical standards.",
  },
  {
    icon: Heart,
    title: "Client-Centered Service",
    description:
      "Your dreams and needs are at the heart of everything we do, ensuring personalized attention and care.",
  },
  {
    icon: Lightbulb,
    title: "Innovation & Excellence",
    description:
      "We embrace modern technology and innovative approaches to deliver exceptional real estate experiences.",
  },
  {
    icon: Handshake,
    title: "Community Partnership",
    description: "We're committed to contributing to Ghana's growth and supporting local communities through our work.",
  },
]

export default function CompanyValues() {
  return (
    <section className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Our Core Values</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-[family-name:var(--font-body)]">
            The principles that guide our work and define our commitment to excellence
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {values.map((value, index) => (
            <Card key={index} className="group hover:shadow-lg transition-all duration-300">
              <CardContent className="p-8">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                      <value.icon className="w-6 h-6 text-primary" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-3">{value.title}</h3>
                    <p className="text-muted-foreground font-[family-name:var(--font-body)] text-pretty">
                      {value.description}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
