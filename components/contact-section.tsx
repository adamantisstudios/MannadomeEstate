"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Phone, Mail, MapPin, Clock } from "lucide-react"
import { useScrollAnimation } from "@/hooks/use-parallax"
import { useState } from "react"

const contactInfo = [
  {
    icon: Phone,
    title: "Call Us",
    details: ["+233 20 069 4805"],
    description: "Mon-Fri 8AM-6PM, Sat 9AM-4PM",
    color: "from-accent/10 to-accent/5",
    iconBg: "bg-accent/10",
    iconColor: "text-accent",
  },
  {
    icon: Mail,
    title: "Email Us",
    details: ["info.mannadomeestate@gmail.com"],
    description: "We'll respond within 24 hours",
    color: "from-primary/10 to-primary/5",
    iconBg: "bg-primary/10",
    iconColor: "text-primary",
  },
  {
    icon: MapPin,
    title: "Visit Us",
    details: ["East Legon, Accra", "Ghana"],
    description: "Our main office location",
    color: "from-secondary/10 to-secondary/5",
    iconBg: "bg-secondary/10",
    iconColor: "text-secondary",
  },
  {
    icon: Clock,
    title: "Office Hours",
    details: ["Mon-Fri: 8AM-6PM", "Sat: 9AM-4PM"],
    description: "Sunday: Closed",
    color: "from-accent/10 to-accent/5",
    iconBg: "bg-accent/10",
    iconColor: "text-accent",
  },
]

export default function ContactSection() {
  const { isVisible: headerVisible, setElement: setHeaderElement } = useScrollAnimation()
  const { isVisible: formVisible, setElement: setFormElement } = useScrollAnimation()
  const { isVisible: infoVisible, setElement: setInfoElement } = useScrollAnimation()
  const [focusedField, setFocusedField] = useState<string | null>(null)

  return (
    <section className="py-20 bg-gradient-to-br from-muted/30 to-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={setHeaderElement}
          className={`text-center mb-16 transition-all duration-1000 ease-out ${
            headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance font-heading">
            Get In Touch With Us
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
            Ready to find your dream property or need expert real estate advice? Contact our team today and let us help
            you achieve your goals.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card
              ref={setFormElement}
              className={`hover-glow border-accent/20 transition-all duration-1000 ease-out ${
                formVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
              }`}
            >
              <CardHeader>
                <CardTitle className="text-2xl font-heading text-foreground">Send Us a Message</CardTitle>
              </CardHeader>
              <CardContent>
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">First Name</label>
                      <Input
                        placeholder="Your first name"
                        className="hover:border-accent/50 focus:border-accent transition-all duration-300"
                        onFocus={() => setFocusedField("firstName")}
                        onBlur={() => setFocusedField(null)}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Last Name</label>
                      <Input
                        placeholder="Your last name"
                        className="hover:border-accent/50 focus:border-accent transition-all duration-300"
                        onFocus={() => setFocusedField("lastName")}
                        onBlur={() => setFocusedField(null)}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Email Address</label>
                      <Input
                        type="email"
                        placeholder="your.email@example.com"
                        className="hover:border-accent/50 focus:border-accent transition-all duration-300"
                        onFocus={() => setFocusedField("email")}
                        onBlur={() => setFocusedField(null)}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Phone Number</label>
                      <Input
                        placeholder="+233 XX XXX XXXX"
                        className="hover:border-accent/50 focus:border-accent transition-all duration-300"
                        onFocus={() => setFocusedField("phone")}
                        onBlur={() => setFocusedField(null)}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Subject</label>
                    <Input
                      placeholder="What can we help you with?"
                      className="hover:border-accent/50 focus:border-accent transition-all duration-300"
                      onFocus={() => setFocusedField("subject")}
                      onBlur={() => setFocusedField(null)}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Message</label>
                    <Textarea
                      rows={5}
                      placeholder="Tell us more about your requirements..."
                      className="hover:border-accent/50 focus:border-accent transition-all duration-300"
                      onFocus={() => setFocusedField("message")}
                      onBlur={() => setFocusedField(null)}
                    />
                  </div>

                  <Button size="lg" className="w-full hover-lift bg-accent hover:bg-accent/90 text-accent-foreground">
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          <div
            ref={setInfoElement}
            className={`space-y-6 transition-all duration-1000 ease-out delay-300 ${
              infoVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
            }`}
          >
            {contactInfo.map((info, index) => (
              <Card
                key={index}
                className={`hover-lift hover-glow transition-all duration-500 border-accent/20 bg-gradient-to-br ${info.color}`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div
                      className={`w-12 h-12 ${info.iconBg} rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-300 hover:scale-110`}
                    >
                      <info.icon className={`w-6 h-6 ${info.iconColor}`} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-semibold text-foreground mb-2 font-heading">{info.title}</h3>
                      {info.details.map((detail, detailIndex) => (
                        <p
                          key={detailIndex}
                          className="text-foreground font-medium break-words break-all sm:break-normal overflow-wrap-anywhere"
                        >
                          {detail}
                        </p>
                      ))}
                      <p className="text-sm text-muted-foreground mt-1">{info.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            <Card className="bg-gradient-to-br from-accent/10 to-accent/5 border-accent/30 hover-glow">
              <CardContent className="p-6 text-center">
                <h3 className="font-semibold text-foreground mb-4 font-heading">Need Immediate Assistance?</h3>
                <div className="space-y-3">
                  <Button asChild className="w-full hover-lift bg-accent hover:bg-accent/90 text-accent-foreground">
                    <a href="tel:+233200694805">Call Now</a>
                  </Button>
                  <Button
                    variant="outline"
                    asChild
                    className="w-full border-accent/50 text-accent hover:bg-accent/10 bg-transparent hover-lift"
                  >
                    <a href="https://wa.me/233200694805" target="_blank" rel="noopener noreferrer">
                      WhatsApp Us
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
