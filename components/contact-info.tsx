import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Phone, Mail, Clock, Facebook, Twitter, Instagram, Linkedin } from "lucide-react"

const contactDetails = [
  {
    icon: MapPin,
    title: "Office Address",
    details: ["123 Independence Avenue", "East Legon, Accra", "Ghana"],
  },
  {
    icon: Phone,
    title: "Phone Numbers",
    details: ["+233 20 069 4805"],
  },
  {
    icon: Mail,
    title: "Email Addresses",
    details: ["info.mannadomeestate@gmail.com"],
  },
  {
    icon: Clock,
    title: "Business Hours",
    details: ["Monday - Friday: 8:00 AM - 6:00 PM", "Saturday: 9:00 AM - 4:00 PM", "Sunday: Closed"],
  },
]

const socialLinks = [
  { icon: Facebook, href: "https://facebook.com/mannadomeestate", label: "Facebook" },
  { icon: Twitter, href: "https://twitter.com/mannadomeestate", label: "Twitter" },
  { icon: Instagram, href: "https://instagram.com/mannadomeestate", label: "Instagram" },
  { icon: Linkedin, href: "https://linkedin.com/company/mannadomeestate", label: "LinkedIn" },
]

export default function ContactInfo() {
  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-foreground">Contact Information</CardTitle>
          <p className="text-muted-foreground font-[family-name:var(--font-body)]">
            Get in touch with us through any of these channels.
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          {contactDetails.map((item, index) => (
            <div key={index} className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg">
                  <item.icon className="w-6 h-6 text-primary" />
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
                <div className="space-y-1">
                  {item.details.map((detail, detailIndex) => (
                    <p key={detailIndex} className="text-muted-foreground text-sm font-[family-name:var(--font-body)]">
                      {detail}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-bold text-foreground">Follow Us</CardTitle>
          <p className="text-muted-foreground font-[family-name:var(--font-body)]">
            Stay connected with us on social media for the latest updates.
          </p>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-4">
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 hover:bg-primary/20 rounded-lg transition-colors"
                aria-label={social.label}
              >
                <social.icon className="w-6 h-6 text-primary" />
              </a>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-bold text-foreground">Visit Our Office</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
            <div className="text-center">
              <MapPin className="w-12 h-12 text-primary mx-auto mb-2" />
              <p className="text-muted-foreground font-[family-name:var(--font-body)]">Interactive Map</p>
              <p className="text-sm text-muted-foreground">123 Independence Avenue, East Legon</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
