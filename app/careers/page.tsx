import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MapPin, Clock, Users, TrendingUp } from "lucide-react"

const jobOpenings = [
  {
    title: "Senior Real Estate Agent",
    department: "Sales",
    location: "East Legon, Accra",
    type: "Full-time",
    description:
      "Join our dynamic sales team and help clients find their dream properties. Minimum 3 years experience required.",
  },
  {
    title: "Property Manager",
    department: "Operations",
    location: "East Legon, Accra",
    type: "Full-time",
    description: "Oversee property maintenance, tenant relations, and ensure optimal property performance.",
  },
  {
    title: "Marketing Specialist",
    department: "Marketing",
    location: "East Legon, Accra",
    type: "Full-time",
    description: "Drive our digital marketing efforts and create compelling property marketing campaigns.",
  },
]

const benefits = [
  {
    icon: TrendingUp,
    title: "Competitive Commission",
    description: "Industry-leading commission structure with performance bonuses",
  },
  {
    icon: Users,
    title: "Professional Development",
    description: "Continuous training and career advancement opportunities",
  },
  {
    icon: MapPin,
    title: "Prime Location",
    description: "Work from our modern office in the heart of East Legon",
  },
  {
    icon: Clock,
    title: "Flexible Schedule",
    description: "Work-life balance with flexible working arrangements",
  },
]

export default function CareersPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary/10 to-primary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-8">
            <img
              src="/images/careers-hero.jpg"
              alt="Join our team at Mannadome Estate"
              className="w-full max-w-2xl mx-auto h-64 object-cover rounded-lg shadow-lg"
            />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 text-balance">
            Join Our Team at Mannadome Estate
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
            Build your career with Ghana's leading real estate company. We're looking for passionate professionals to
            join our growing team.
          </p>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Why Work With Us?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We offer competitive benefits and a supportive work environment that helps you thrive.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <Card key={index} className="text-center">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <benefit.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{benefit.title}</h3>
                  <p className="text-sm text-muted-foreground">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Job Openings */}
      <section className="py-16 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Current Openings</h2>
            <p className="text-muted-foreground">Explore exciting career opportunities with us.</p>
          </div>
          <div className="space-y-6">
            {jobOpenings.map((job, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                      <CardTitle className="text-xl">{job.title}</CardTitle>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mt-2">
                        <span>{job.department}</span>
                        <span>•</span>
                        <span>{job.location}</span>
                        <span>•</span>
                        <span>{job.type}</span>
                      </div>
                    </div>
                    <Button asChild>
                      <a
                        href={`https://wa.me/233200694805?text=Hi%2C%20I%20am%20interested%20in%20the%20${encodeURIComponent(job.title)}%20position.%20Please%20send%20me%20more%20details.`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Apply Now
                      </a>
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{job.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">Don't See a Perfect Match?</h2>
          <p className="text-muted-foreground mb-8">
            We're always looking for talented individuals. Send us your resume and we'll keep you in mind for future
            opportunities.
          </p>
          <Button size="lg" asChild>
            <a
              href={`https://wa.me/233200694805?text=Hi%2C%20I%20would%20like%20to%20submit%20my%20resume%20for%20future%20career%20opportunities%20at%20Mannadome%20Estate.`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Send Resume
            </a>
          </Button>
        </div>
      </section>
    </div>
  )
}
