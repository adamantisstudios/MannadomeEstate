import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Linkedin, Mail, Phone, Quote } from "lucide-react"

export default function CEOSpotlight() {
  return (
    <section className="py-16 bg-gradient-to-br from-primary/5 to-accent/5">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Leadership Message</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">From our Founder & CEO</p>
        </div>

        <Card className="overflow-hidden shadow-xl">
          <CardContent className="p-0">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
              <div className="relative h-64 lg:h-full">
                <img
                  src="/images/ceoimage.jpg"
                  alt="Dan-Dzide John Ambrose, CEO of Mannadome Estate"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>

              <div className="p-8 lg:p-12 flex flex-col justify-center">
                <Quote className="w-8 h-8 text-primary mb-4" />
                <blockquote className="text-lg text-muted-foreground mb-6 italic leading-relaxed">
                  "At Mannadome Estate, we believe that everyone deserves access to quality housing. Our mission is to
                  create sustainable, affordable, and beautiful properties that not only meet the needs of today but
                  also contribute to the growth and development of our communities."
                </blockquote>

                <div className="border-t pt-6">
                  <h3 className="text-2xl font-bold text-foreground mb-2">Dan-Dzide John Ambrose</h3>
                  <p className="text-primary font-semibold mb-3">Founder & Chief Executive Officer</p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    <Badge variant="secondary">15+ Years Experience</Badge>
                    <Badge variant="outline">Real Estate Development</Badge>
                    <Badge variant="outline">Community Building</Badge>
                  </div>

                  <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
                    With over 15 years of experience in real estate development, Dan-Dzide has led numerous successful
                    projects across Ghana. His commitment to excellence and community development has positioned
                    Mannadome Estate as a trusted name in the industry.
                  </p>

                  <div className="flex gap-3">
                    <a
                      href="mailto:ceo@mannadome.com"
                      className="inline-flex items-center justify-center w-10 h-10 bg-primary hover:bg-primary/90 rounded-full transition-colors"
                    >
                      <Mail className="w-4 h-4 text-primary-foreground" />
                    </a>
                    <a
                      href="tel:+233241234567"
                      className="inline-flex items-center justify-center w-10 h-10 bg-primary hover:bg-primary/90 rounded-full transition-colors"
                    >
                      <Phone className="w-4 h-4 text-primary-foreground" />
                    </a>
                    <a
                      href="https://linkedin.com/in/dan-dzide-john-ambrose"
                      className="inline-flex items-center justify-center w-10 h-10 bg-primary hover:bg-primary/90 rounded-full transition-colors"
                    >
                      <Linkedin className="w-4 h-4 text-primary-foreground" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
