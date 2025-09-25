import Link from "next/link"
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react"

const footerLinks = {
  company: [
    { name: "About Us", href: "/about" },
    { name: "Our Team", href: "/about#team" },
    { name: "Careers", href: "/careers" },
    { name: "News & Updates", href: "/news" },
  ],
  services: [
    { name: "Buy Property", href: "/properties" },
    {
      name: "Sell Property",
      href: "https://wa.me/233200694805?text=Hi%2C%20I%20would%20like%20to%20get%20a%20free%20property%20valuation%20for%20my%20property.%20Please%20contact%20me%20to%20discuss%20further.",
    },
    { name: "Property Management", href: "/management" },
    { name: "Investment Advice", href: "/investment" },
  ],
  resources: [
    { name: "Property Guides", href: "/guides" },
    { name: "Market Reports", href: "/reports" },
    { name: "Financing Options", href: "/financing" },
    { name: "Legal Services", href: "/legal" },
  ],
  support: [
    { name: "Contact Us", href: "/contact" },
    { name: "FAQ", href: "/faq" },
    { name: "Support Center", href: "/support" },
    { name: "Privacy Policy", href: "/privacy" },
  ],
}

const socialLinks = [
  { icon: Facebook, href: "https://facebook.com/mannadomeestate", label: "Facebook" },
  { icon: Twitter, href: "https://twitter.com/mannadomeestate", label: "Twitter" },
  { icon: Instagram, href: "https://instagram.com/mannadomeestate", label: "Instagram" },
  { icon: Linkedin, href: "https://linkedin.com/company/mannadomeestate", label: "LinkedIn" },
]

export default function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
            {/* Company Info */}
            <div className="lg:col-span-2">
              <Link href="/" className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-primary-foreground rounded-lg flex items-center justify-center">
                  <span className="text-primary font-bold text-lg">M</span>
                </div>
                <span className="font-bold text-xl">Mannadome Estate</span>
              </Link>
              <p className="text-primary-foreground/80 mb-6 font-[family-name:var(--font-body)] text-pretty">
                Ghana's premier real estate company, connecting families with their dream homes for over 15 years. Your
                trusted partner in luxury property investments.
              </p>
              <div className="space-y-2 text-sm">
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-2" />
                  <span>123 Independence Avenue, East Legon, Accra</span>
                </div>
                <div className="flex items-center">
                  <Phone className="w-4 h-4 mr-2" />
                  <span>+233 20 069 4805</span>
                </div>
                <div className="flex items-center">
                  <Mail className="w-4 h-4 mr-2" />
                  <span>info.mannadomeestate@gmail.com</span>
                </div>
              </div>
            </div>

            {/* Footer Links */}
            <div>
              <h3 className="font-semibold text-lg mb-4">Company</h3>
              <ul className="space-y-2">
                {footerLinks.company.map((link, index) => (
                  <li key={index}>
                    <Link
                      href={link.href}
                      className="text-primary-foreground/80 hover:text-primary-foreground transition-colors text-sm font-[family-name:var(--font-body)]"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-4">Services</h3>
              <ul className="space-y-2">
                {footerLinks.services.map((link, index) => (
                  <li key={index}>
                    {link.name === "Sell Property" ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary-foreground/80 hover:text-primary-foreground transition-colors text-sm font-[family-name:var(--font-body)]"
                      >
                        {link.name}
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className="text-primary-foreground/80 hover:text-primary-foreground transition-colors text-sm font-[family-name:var(--font-body)]"
                      >
                        {link.name}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-4">Resources</h3>
              <ul className="space-y-2">
                {footerLinks.resources.map((link, index) => (
                  <li key={index}>
                    <Link
                      href={link.href}
                      className="text-primary-foreground/80 hover:text-primary-foreground transition-colors text-sm font-[family-name:var(--font-body)]"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-4">Support</h3>
              <ul className="space-y-2">
                {footerLinks.support.map((link, index) => (
                  <li key={index}>
                    <Link
                      href={link.href}
                      className="text-primary-foreground/80 hover:text-primary-foreground transition-colors text-sm font-[family-name:var(--font-body)]"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-primary-foreground/20 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-primary-foreground/80 font-[family-name:var(--font-body)]">
              © 2025 Mannadome Estate. All rights reserved. | Licensed Real Estate Company
            </div>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-10 h-10 bg-primary-foreground/10 hover:bg-primary-foreground/20 rounded-lg transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
