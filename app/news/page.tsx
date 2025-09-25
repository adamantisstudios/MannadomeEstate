import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, User, ArrowRight } from "lucide-react"
import Link from "next/link"

const newsArticles = [
  {
    id: 1,
    title: "Ghana Real Estate Market Shows Strong Growth in 2025",
    excerpt:
      "The Ghanaian real estate market continues to demonstrate resilience with a 15% increase in property values across Accra's prime locations.",
    category: "Market Update",
    date: "January 15, 2025",
    author: "Mannadome Estate Team",
    image: "/modern-ghana-real-estate-market.png",
  },
  {
    id: 2,
    title: "New Luxury Development Launched in East Legon",
    excerpt:
      "We're excited to announce our latest luxury residential project featuring 50 premium units with world-class amenities.",
    category: "Company News",
    date: "January 10, 2025",
    author: "Mannadome Estate Team",
    image: "/luxury-residential-development-east-legon.png",
  },
  {
    id: 3,
    title: "Investment Opportunities in Ghana's Growing Cities",
    excerpt:
      "Explore the emerging investment hotspots beyond Accra, including Kumasi, Takoradi, and other rapidly developing urban centers.",
    category: "Investment Guide",
    date: "January 5, 2025",
    author: "Mannadome Estate Team",
    image: "/ghana-cities-investment-opportunities.png",
  },
  {
    id: 4,
    title: "Sustainable Building Practices in Modern Ghana",
    excerpt: "How eco-friendly construction methods are shaping the future of real estate development in Ghana.",
    category: "Sustainability",
    date: "December 28, 2024",
    author: "Mannadome Estate Team",
    image: "/sustainable-building-ghana.png",
  },
  {
    id: 5,
    title: "First-Time Homebuyer's Guide to Ghana Real Estate",
    excerpt:
      "Essential tips and insights for navigating your first property purchase in Ghana's dynamic real estate market.",
    category: "Buyer's Guide",
    date: "December 20, 2024",
    author: "Mannadome Estate Team",
    image: "/first-time-home-buyer-ghana.png",
  },
  {
    id: 6,
    title: "Year-End Market Report: 2024 Real Estate Trends",
    excerpt: "A comprehensive analysis of Ghana's real estate performance in 2024 and predictions for the coming year.",
    category: "Market Report",
    date: "December 15, 2024",
    author: "Mannadome Estate Team",
    image: "/ghana-real-estate-trends-2024.png",
  },
]

const categories = [
  "All",
  "Market Update",
  "Company News",
  "Investment Guide",
  "Sustainability",
  "Buyer's Guide",
  "Market Report",
]

export default function NewsPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary/10 to-primary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-8">
            <img
              src="/images/news-hero.jpg"
              alt="Latest real estate news and updates"
              className="w-full max-w-2xl mx-auto h-64 object-cover rounded-lg shadow-lg"
            />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 text-balance">News & Updates</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
            Stay informed with the latest news, market insights, and updates from Ghana's real estate industry.
          </p>
        </div>
      </section>

      {/* News Articles */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 mb-12 justify-center">
            {categories.map((category) => (
              <Badge
                key={category}
                variant="outline"
                className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
              >
                {category}
              </Badge>
            ))}
          </div>

          {/* Articles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {newsArticles.map((article) => (
              <Card key={article.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-video bg-muted">
                  <img
                    src={article.image || "/placeholder.svg"}
                    alt={article.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="secondary">{article.category}</Badge>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4 mr-1" />
                      {article.date}
                    </div>
                  </div>
                  <CardTitle className="text-xl hover:text-primary transition-colors">
                    <Link href={`/news/${article.id}`}>{article.title}</Link>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{article.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <User className="w-4 h-4 mr-1" />
                      {article.author}
                    </div>
                    <Link
                      href={`/news/${article.id}`}
                      className="inline-flex items-center text-primary hover:text-primary/80 transition-colors text-sm font-medium"
                    >
                      Read More
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
