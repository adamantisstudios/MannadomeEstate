"use client"

import { useState } from "react"
import Navigation from "@/components/navigation"
import PropertySearch from "@/components/property-search"
import PropertyGrid from "@/components/property-grid"
import Footer from "@/components/footer"

export default function PropertiesPage() {
  const [filters, setFilters] = useState({})

  const handleFiltersChange = (newFilters: any) => {
    setFilters(newFilters)
  }

  return (
    <main className="min-h-screen">
      <Navigation />
      <div className="py-8 bg-gradient-to-br from-primary/5 to-accent/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Find Your Perfect Property</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-[family-name:var(--font-body)]">
              Browse our extensive collection of premium properties across Ghana
            </p>
          </div>
          <PropertySearch onFiltersChange={handleFiltersChange} />
        </div>
      </div>
      <PropertyGrid filters={filters} />
      <Footer />
    </main>
  )
}
