import Navigation from "@/components/navigation"
import AboutHero from "@/components/about-hero"
import TeamSection from "@/components/team-section"
import CompanyStats from "@/components/company-stats"
import CompanyValues from "@/components/company-values"
import CEOSpotlight from "@/components/ceo-spotlight"
import Footer from "@/components/footer"

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <AboutHero />
      <CompanyStats />
      <CompanyValues />
      <CEOSpotlight />
      <TeamSection />
      <Footer />
    </main>
  )
}
