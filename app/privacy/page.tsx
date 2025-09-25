import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Privacy Policy | Mannadome Estate Ltd Ghana",
  description:
    "Mannadome Estate Ltd privacy policy and data protection practices for our real estate services in Ghana.",
}

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-emerald-50 to-emerald-100 py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="mb-8">
            <img
              src="/images/privacy-policy-hero.jpg"
              alt="Privacy policy and data protection"
              className="w-full max-w-2xl mx-auto h-64 object-cover rounded-lg shadow-lg"
            />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-emerald-900 mb-6">Privacy Policy</h1>
          <p className="text-xl text-emerald-700 mb-8 max-w-2xl mx-auto">
            Your privacy is important to us. Learn how we collect, use, and protect your information.
          </p>
        </div>
      </section>

      {/* Privacy Policy Content */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="prose prose-emerald max-w-none">
            <h2>Information We Collect</h2>
            <p>
              We collect information you provide directly to us, such as when you create an account, make an inquiry, or
              contact us for services. This may include your name, email address, phone number, and property
              preferences.
            </p>

            <h2>How We Use Your Information</h2>
            <p>
              We use the information we collect to provide, maintain, and improve our services, communicate with you,
              and send you relevant property listings and market updates.
            </p>

            <h2>Information Sharing</h2>
            <p>
              We do not sell, trade, or otherwise transfer your personal information to third parties without your
              consent, except as described in this policy or as required by law.
            </p>

            <h2>Data Security</h2>
            <p>
              We implement appropriate security measures to protect your personal information against unauthorized
              access, alteration, disclosure, or destruction.
            </p>

            <h2>Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us through our contact page or email
              us directly.
            </p>

            <p className="text-sm text-muted-foreground mt-8">Last updated: January 2025</p>
          </div>
        </div>
      </section>
    </div>
  )
}
