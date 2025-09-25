export default function AboutHero() {
  return (
    <section className="py-20 bg-gradient-to-br from-primary/5 to-accent/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 text-balance">
              About <span className="text-primary">Mannadome Estate Ltd</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-6 font-[family-name:var(--font-body)] text-pretty">
              For over 15 years, Mannadome Estate Ltd has been Ghana's premier real estate company, connecting families with
              their dream homes and helping investors discover exceptional opportunities across the country's most
              prestigious locations.
            </p>
            <p className="text-lg text-muted-foreground mb-8 font-[family-name:var(--font-body)] text-pretty">
              Our commitment to excellence, deep local knowledge, and personalized service has made us the trusted
              choice for discerning clients seeking luxury properties in Ghana.
            </p>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <div className="text-3xl font-bold text-primary mb-2">500+</div>
                <div className="text-muted-foreground font-[family-name:var(--font-body)]">Properties Sold</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary mb-2">15+</div>
                <div className="text-muted-foreground font-[family-name:var(--font-body)]">Years Experience</div>
              </div>
            </div>
          </div>
          <div className="relative">
            <img
              src="/images/luxury-residential-development-east-legon.jpg"
              alt="Mannadome Estate Ltd office building"
              className="w-full h-96 object-cover rounded-lg shadow-lg"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent rounded-lg"></div>
          </div>
        </div>
      </div>
    </section>
  )
}
