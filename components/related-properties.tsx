import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Bed, Bath, Square } from "lucide-react"

interface RelatedPropertiesProps {
  currentPropertyId: string
}

const relatedProperties = [
  {
    id: "2",
    title: "Modern Family House",
    location: "Airport Residential, Accra",
    price: "¢280,000", // Changed from $ to ¢
    bedrooms: 3,
    bathrooms: 2,
    area: "2,400 sq ft",
    image: "/modern-family-house-ghana.png",
    type: "House",
  },
  {
    id: "3",
    title: "Executive Apartment",
    location: "Cantonments, Accra",
    price: "¢180,000", // Changed from $ to ¢
    bedrooms: 2,
    bathrooms: 2,
    area: "1,800 sq ft",
    image: "/executive-apartment-ghana.png",
    type: "Apartment",
  },
  {
    id: "6",
    title: "Penthouse Suite",
    location: "Ridge, Accra",
    price: "¢380,000", // Changed from $ to ¢
    bedrooms: 3,
    bathrooms: 2,
    area: "2,800 sq ft",
    image: "/penthouse-suite-ghana.png",
    type: "Penthouse",
  },
]

export default function RelatedProperties({ currentPropertyId }: RelatedPropertiesProps) {
  const filteredProperties = relatedProperties.filter((property) => property.id !== currentPropertyId)

  return (
    <section className="py-16 bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Similar Properties</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-[family-name:var(--font-body)]">
            Explore other properties that might interest you
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProperties.map((property) => (
            <Card key={property.id} className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
              <div className="relative">
                <img
                  src={property.image || "/placeholder.svg"}
                  alt={property.title}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <Badge variant="secondary">{property.type}</Badge>
                </div>
              </div>

              <CardContent className="p-6">
                <div className="flex items-center text-sm text-muted-foreground mb-2">
                  <MapPin className="w-4 h-4 mr-1" />
                  {property.location}
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2 text-balance">{property.title}</h3>
                <div className="text-2xl font-bold text-primary mb-4">{property.price}</div>

                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <Bed className="w-4 h-4 mr-1" />
                    {property.bedrooms} beds
                  </div>
                  <div className="flex items-center">
                    <Bath className="w-4 h-4 mr-1" />
                    {property.bathrooms} baths
                  </div>
                  <div className="flex items-center">
                    <Square className="w-4 h-4 mr-1" />
                    {property.area}
                  </div>
                </div>
              </CardContent>

              <CardFooter className="p-6 pt-0">
                <Link href={`/properties/${property.id}`} className="w-full">
                  <Button className="w-full bg-transparent" variant="outline">
                    View Details
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
