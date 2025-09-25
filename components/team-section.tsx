import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Linkedin, Mail, Phone } from "lucide-react"

const teamMembers = [
  {
    name: "Dan-Dzide John Ambrose",
    position: "Founder & CEO",
    experience: "15+ years",
    specialization: "Real Estate Development",
    image: "/images/ceo-dan-dzide-john-ambrose.png",
    bio: "Dan-Dzide John Ambrose founded Mannadome Estate with a vision to transform Ghana's real estate landscape. His extensive experience in property development and deep market knowledge have made him a respected leader in the industry, focusing on creating sustainable and affordable housing solutions.",
    contact: {
      email: "ceo@mannadome.com",
      phone: "+233 24 123 4567",
      linkedin: "dan-dzide-john-ambrose",
    },
  },
  
]

export default function TeamSection() {
  return (
    <section className="py-16 bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Meet Our Team</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-[family-name:var(--font-body)]">
            The dedicated professionals who make your real estate dreams a reality
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {teamMembers.map((member, index) => (
            <Card key={index} className="group hover:shadow-lg transition-all duration-300">
              <CardContent className="p-8">
                <div className="flex flex-col sm:flex-row gap-6">
                  <div className="flex-shrink-0">
                    <img
                      src={member.image || "/placeholder.svg"}
                      alt={member.name}
                      className="w-32 h-32 rounded-lg object-cover mx-auto sm:mx-0"
                    />
                  </div>
                  <div className="flex-1 text-center sm:text-left">
                    <h3 className="text-xl font-semibold text-foreground mb-1">{member.name}</h3>
                    <p className="text-primary font-medium mb-2">{member.position}</p>
                    <div className="flex flex-wrap gap-2 justify-center sm:justify-start mb-3">
                      <Badge variant="secondary">{member.experience}</Badge>
                      <Badge variant="outline">{member.specialization}</Badge>
                    </div>
                    <p className="text-muted-foreground text-sm mb-4 font-[family-name:var(--font-body)] text-pretty">
                      {member.bio}
                    </p>
                    <div className="flex gap-3 justify-center sm:justify-start">
                      <a
                        href={`mailto:${member.contact.email}`}
                        className="inline-flex items-center justify-center w-8 h-8 bg-primary/10 hover:bg-primary/20 rounded-full transition-colors"
                      >
                        <Mail className="w-4 h-4 text-primary" />
                      </a>
                      <a
                        href={`tel:${member.contact.phone}`}
                        className="inline-flex items-center justify-center w-8 h-8 bg-primary/10 hover:bg-primary/20 rounded-full transition-colors"
                      >
                        <Phone className="w-4 h-4 text-primary" />
                      </a>
                      <a
                        href={`https://linkedin.com/in/${member.contact.linkedin}`}
                        className="inline-flex items-center justify-center w-8 h-8 bg-primary/10 hover:bg-primary/20 rounded-full transition-colors"
                      >
                        <Linkedin className="w-4 h-4 text-primary" />
                      </a>
                    </div>
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
