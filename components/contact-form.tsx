"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Send, CheckCircle } from "lucide-react"

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    propertyType: "",
    budget: "",
  })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const formatWhatsAppMessage = (data: typeof formData) => {
    const message = `*New Contact Form Submission*

*Name:* ${data.name}
*Email:* ${data.email}
*Phone:* ${data.phone || "Not provided"}
*Subject:* ${data.subject}
*Property Type:* ${data.propertyType || "Not specified"}
*Budget Range:* ${data.budget || "Not specified"}

*Message:*
${data.message}

---
Sent from Mannadome Estate website contact form`

    return encodeURIComponent(message)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      // Save to database
      const response = await fetch("/api/inquiries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          full_name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: formData.message,
          inquiry_type: formData.subject || "general",
          property_id: null, // General inquiry, not property-specific
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to send message")
      }

      const whatsappMessage = formatWhatsAppMessage(formData)
      const whatsappUrl = `https://wa.me/233200694805?text=${whatsappMessage}`

      // Open WhatsApp in new tab
      window.open(whatsappUrl, "_blank")

      setIsSubmitted(true)

      setTimeout(() => {
        setIsSubmitted(false)
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
          propertyType: "",
          budget: "",
        })
      }, 3000)
    } catch (err) {
      console.error("Error submitting form:", err)
      setError("Failed to send message. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  if (isSubmitted) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <CheckCircle className="w-16 h-16 text-primary mx-auto mb-4" />
          <h3 className="text-2xl font-semibold text-foreground mb-2">Message Sent Successfully!</h3>
          <p className="text-muted-foreground font-[family-name:var(--font-body)]">
            Thank you for contacting us. Your message has been sent to our WhatsApp and we'll get back to you within 24
            hours.
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-foreground">Send us a Message</CardTitle>
        <p className="text-muted-foreground font-[family-name:var(--font-body)]">
          Fill out the form below and we'll get back to you as soon as possible.
        </p>
      </CardHeader>
      <CardContent>
        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name *</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your full name"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address *</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your.email@example.com"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+233 20 069 4805"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="subject">Subject *</Label>
              <select
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-md border border-input bg-background text-foreground"
                required
              >
                <option value="">Select a subject</option>
                <option value="property-inquiry">Property Inquiry</option>
                <option value="viewing-request">Viewing Request</option>
                <option value="selling-property">Selling Property</option>
                <option value="investment-advice">Investment Advice</option>
                <option value="general-inquiry">General Inquiry</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="propertyType">Property Type</Label>
              <select
                id="propertyType"
                name="propertyType"
                value={formData.propertyType}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-md border border-input bg-background text-foreground"
              >
                <option value="">Select property type</option>
                <option value="house">House</option>
                <option value="apartment">Apartment</option>
                <option value="villa">Villa</option>
                <option value="townhouse">Townhouse</option>
                <option value="penthouse">Penthouse</option>
                <option value="land">Land</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="budget">Budget Range</Label>
              <select
                id="budget"
                name="budget"
                value={formData.budget}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-md border border-input bg-background text-foreground"
              >
                <option value="">Select budget range</option>
                <option value="50k-100k">$50k - $100k</option>
                <option value="100k-250k">$100k - $250k</option>
                <option value="250k-500k">$250k - $500k</option>
                <option value="500k-1m">$500k - $1M</option>
                <option value="1m+">$1M+</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Message *</Label>
            <Textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Tell us about your requirements, preferred location, or any specific questions you have..."
              rows={5}
              required
            />
          </div>

          <Button type="submit" size="lg" className="w-full" disabled={isLoading}>
            {isLoading ? (
              "Sending..."
            ) : (
              <>
                <Send className="w-5 h-5 mr-2" />
                Send Message
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
