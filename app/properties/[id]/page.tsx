import Navigation from "@/components/navigation"
import PropertyDetails from "@/components/property-details"
import RelatedProperties from "@/components/related-properties"
import Footer from "@/components/footer"

interface PropertyPageProps {
  params: Promise<{
    id: string
  }>
}

export default async function PropertyPage({ params }: PropertyPageProps) {
  const { id } = await params

  return (
    <main className="min-h-screen">
      <Navigation />
      <PropertyDetails propertyId={id} />
      <RelatedProperties currentPropertyId={id} />
      <Footer />
    </main>
  )
}
