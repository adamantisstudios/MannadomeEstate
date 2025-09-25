import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { MessageCircle, Phone, Mail, Clock, HelpCircle, FileText, Users, Settings } from "lucide-react"

const supportCategories = [
  {
    icon: HelpCircle,
    title: "General Inquiries",
    description: "Questions about our services, properties, or processes",
    examples: ["Property availability", "Service information", "General questions"],
  },
  {
    icon: FileText,
    title: "Documentation Support",
    description: "Help with property documents and paperwork",
    examples: ["Document requirements", "Application status", "Legal documentation"],
  },
  {
    icon: Users,
    title: "Account Management",
    description: "Assistance with your client account and preferences",
    examples: ["Profile updates", "Saved properties", "Communication preferences"],
  },
  {
    icon: Settings,
    title: "Technical Support",
    description: "Website issues and technical difficulties",
    examples: ["Website navigation", "Search problems", "Mobile app issues"],
  },
]

const contactMethods = [
  {
    icon: MessageCircle,
    title: "WhatsApp Support",
    description: "Instant messaging support",
    details: "+233 20 069 4805",
    availability: "24/7 Available",
    action: "Chat Now",
    href: "https://wa.me/233200694805?text=Hi%2C%20I%20need%20support%20with%20my%20property%20inquiry.",
  },
  {
    icon: Phone,
    title: "Phone Support",
    description: "Direct phone assistance",
    details: "+233 20 069 4805",
    availability: "Mon-Fri 8AM-6PM",
    action: "Call Now",
    href: "tel:+233200694805",
  },
  {
    icon: Mail,
    title: "Email Support",
    description: "Detailed email assistance",
    details: "info.mannadomeestate@gmail.com",
    availability: "Response within 24hrs",
    action: "Send Email",
    href: "mailto:info.mannadomeestate@gmail.com",
  },
]

const faqs = [
  {
    question: "How do I schedule a property viewing?",
    answer:
      "You can schedule a property viewing by contacting us via WhatsApp, phone, or through the property listing page. Our team will coordinate a convenient time for you.",
  },
  {
    question: "What documents do I need to buy a property?",
    answer:
      "Typically, you'll need a valid ID, proof of income, bank statements, and pre-approval letter if using financing. Our legal team will guide you through all requirements.",
  },
  {
    question: "Do you offer property management services?",
    answer:
      "Yes, we provide comprehensive property management services including tenant screening, rent collection, maintenance coordination, and regular property inspections.",
  },
  {
    question: "How long does the property buying process take?",
    answer:
      "The timeline varies depending on financing and legal requirements, but typically ranges from 30-90 days from offer acceptance to closing.",
  },
  {
    question: "Can you help with property financing?",
    answer:
      "We work with multiple financial institutions to help you secure the best financing options for your property purchase.",
  },
]

export default function SupportPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary/10 to-primary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-8">
            <img
              src="/images/support-center-hero.jpg"
              alt="Professional customer support services"
              className="w-full max-w-2xl mx-auto h-64 object-cover rounded-lg shadow-lg"
            />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 text-balance">Support Center</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
            We're here to help! Get assistance with your property inquiries, documentation, or any questions about our
            services.
          </p>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Get in Touch</h2>
            <p className="text-muted-foreground">Choose your preferred way to reach our support team.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {contactMethods.map((method, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <method.icon className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{method.title}</CardTitle>
                  <p className="text-muted-foreground">{method.description}</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 mb-6">
                    <p className="font-medium text-foreground">{method.details}</p>
                    <p className="text-sm text-muted-foreground">{method.availability}</p>
                  </div>
                  <Button className="w-full" asChild>
                    <a
                      href={method.href}
                      target={method.href.startsWith("http") ? "_blank" : undefined}
                      rel={method.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    >
                      {method.action}
                    </a>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Support Categories */}
      <section className="py-16 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">How Can We Help?</h2>
            <p className="text-muted-foreground">Select the category that best describes your inquiry.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {supportCategories.map((category, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader className="text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <category.icon className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{category.title}</CardTitle>
                  <p className="text-muted-foreground text-sm">{category.description}</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-1">
                    {category.examples.map((example, exampleIndex) => (
                      <p key={exampleIndex} className="text-xs text-muted-foreground">
                        • {example}
                      </p>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Frequently Asked Questions</h2>
            <p className="text-muted-foreground">Find quick answers to common questions.</p>
          </div>
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-lg">{faq.question}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-16 bg-muted/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Still Need Help?</CardTitle>
              <p className="text-muted-foreground">
                Send us a detailed message and we'll get back to you as soon as possible.
              </p>
            </CardHeader>
            <CardContent>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="support-name">Full Name</Label>
                    <Input id="support-name" placeholder="Your full name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="support-email">Email Address</Label>
                    <Input id="support-email" type="email" placeholder="your.email@example.com" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="support-subject">Subject</Label>
                  <Input id="support-subject" placeholder="Brief description of your inquiry" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="support-message">Message</Label>
                  <Textarea
                    id="support-message"
                    rows={5}
                    placeholder="Please provide detailed information about your inquiry or issue..."
                  />
                </div>
                <Button size="lg" className="w-full" asChild>
                  <a
                    href={`https://wa.me/233200694805?text=Hi%2C%20I%20need%20support%20with%20the%20following%20inquiry%3A%0A%0A[Please%20describe%20your%20issue%20here]`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Send Support Request
                  </a>
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Business Hours */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Card>
            <CardContent className="p-8">
              <Clock className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-foreground mb-4">Support Hours</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Phone Support</h4>
                  <p className="text-muted-foreground">Monday - Friday: 8:00 AM - 6:00 PM</p>
                  <p className="text-muted-foreground">Saturday: 9:00 AM - 4:00 PM</p>
                  <p className="text-muted-foreground">Sunday: Closed</p>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">WhatsApp Support</h4>
                  <p className="text-muted-foreground">Available 24/7</p>
                  <p className="text-muted-foreground">Instant responses during business hours</p>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Email Support</h4>
                  <p className="text-muted-foreground">Response within 24 hours</p>
                  <p className="text-muted-foreground">Detailed assistance available</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}
