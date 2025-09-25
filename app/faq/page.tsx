import type { Metadata } from "next"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export const metadata: Metadata = {
  title: "FAQ | Mannadome Estate Ltd - Real Estate Questions Ghana",
  description:
    "Frequently asked questions about Mannadome Estate's real estate services in Ghana including property sales, rentals, and management.",
}

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-emerald-50 to-emerald-100 py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="mb-8">
            <img
              src="/images/faq-hero.jpg"
              alt="Frequently asked questions about real estate"
              className="w-full max-w-2xl mx-auto h-64 object-cover rounded-lg shadow-lg"
            />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-emerald-900 mb-6">Frequently Asked Questions</h1>
          <p className="text-xl text-emerald-700 mb-8 max-w-2xl mx-auto">
            Find answers to common questions about our real estate services and processes.
          </p>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem value="item-1">
              <AccordionTrigger>How do I get started with buying a property?</AccordionTrigger>
              <AccordionContent>
                Start by getting pre-approved for financing, then browse our property listings or contact our team for
                personalized recommendations based on your needs and budget.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>What documents do I need to sell my property?</AccordionTrigger>
              <AccordionContent>
                You'll need property deeds, recent tax assessments, utility bills, and any relevant permits or
                certificates. Our team will provide a complete checklist during consultation.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>How long does the buying process typically take?</AccordionTrigger>
              <AccordionContent>
                The process usually takes 30-60 days from offer acceptance to closing, depending on financing,
                inspections, and other factors. We'll keep you informed throughout.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger>Do you offer property management services?</AccordionTrigger>
              <AccordionContent>
                Yes, we provide comprehensive property management including tenant screening, rent collection,
                maintenance coordination, and financial reporting for property owners.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-5">
              <AccordionTrigger>What are your commission rates?</AccordionTrigger>
              <AccordionContent>
                Our commission rates are competitive and vary based on the type of service and property value. Contact
                us for a detailed quote tailored to your specific needs.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-6">
              <AccordionTrigger>Can you help with investment properties?</AccordionTrigger>
              <AccordionContent>
                We specialize in investment properties and can help you analyze potential returns, find suitable
                properties, and develop investment strategies.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>
    </div>
  )
}
