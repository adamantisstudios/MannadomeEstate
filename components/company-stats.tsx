import { TrendingUp, Users, MapPin, Award } from "lucide-react"

const stats = [
  {
    icon: TrendingUp,
    value: "$50M+",
    label: "Properties Sold",
    description: "Total value of properties sold",
  },
  {
    icon: Users,
    value: "200+",
    label: "Happy Clients",
    description: "Satisfied customers served",
  },
  {
    icon: MapPin,
    value: "50+",
    label: "Locations",
    description: "Areas covered across Ghana",
  },
  {
    icon: Award,
    value: "25+",
    label: "Awards Won",
    description: "Industry recognition received",
  },
]

export default function CompanyStats() {
  return (
    <section className="py-16 bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Our Achievements</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-[family-name:var(--font-body)]">
            Numbers that reflect our commitment to excellence and client satisfaction
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center group">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4 group-hover:bg-primary/20 transition-colors">
                <stat.icon className="w-8 h-8 text-primary" />
              </div>
              <div className="text-3xl font-bold text-foreground mb-2">{stat.value}</div>
              <div className="text-lg font-semibold text-foreground mb-1">{stat.label}</div>
              <div className="text-sm text-muted-foreground font-[family-name:var(--font-body)]">
                {stat.description}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
