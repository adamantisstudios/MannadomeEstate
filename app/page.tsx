import Navigation from "@/components/navigation"
import HeroSection from "@/components/hero-section"
import PropertyListings from "@/components/property-listings"
import TestimonialsSection from "@/components/testimonials-section"
import StatisticsSection from "@/components/statistics-section"
import ServicesSection from "@/components/services-section"
import AboutSection from "@/components/about-section"
import ContactSection from "@/components/contact-section"
import Footer from "@/components/footer"
import WhatsAppFloat from "@/components/whatsapp-float"

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <HeroSection />
      <PropertyListings />
      <ServicesSection />
      <AboutSection />
      <TestimonialsSection />
      <StatisticsSection />
      <ContactSection />
      <Footer />
      <WhatsAppFloat />
    </main>
  )
}
