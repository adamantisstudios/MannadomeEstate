"use client"

import { useEffect, useState } from "react"
import { TrendingUp, Users, Home, Award, MapPin, Calendar } from "lucide-react"
import { useScrollAnimation, useParallax } from "@/hooks/use-parallax"

const statistics = [
  {
    icon: Home,
    value: 500,
    suffix: "+",
    label: "Properties Sold",
    description: "Successfully completed transactions",
    color: "from-accent/20 to-accent/5",
    iconBg: "bg-accent/20",
    iconColor: "text-accent",
  },
  {
    icon: Users,
    value: 200,
    suffix: "+",
    label: "Happy Clients",
    description: "Satisfied customers served",
    color: "from-primary/20 to-primary/5",
    iconBg: "bg-primary/20",
    iconColor: "text-primary",
  },
  {
    icon: Calendar,
    value: 15,
    suffix: "+",
    label: "Years Experience",
    description: "In Ghana's real estate market",
    color: "from-secondary/20 to-secondary/5",
    iconBg: "bg-secondary/20",
    iconColor: "text-secondary",
  },
  {
    icon: MapPin,
    value: 50,
    suffix: "+",
    label: "Locations",
    description: "Areas covered across Ghana",
    color: "from-accent/20 to-accent/5",
    iconBg: "bg-accent/20",
    iconColor: "text-accent",
  },
  {
    icon: TrendingUp,
    value: 50,
    suffix: "M+",
    label: "Property Value",
    description: "Total value of properties sold",
    prefix: "¢",
    color: "from-primary/20 to-primary/5",
    iconBg: "bg-primary/20",
    iconColor: "text-primary",
  },
  {
    icon: Award,
    value: 25,
    suffix: "+",
    label: "Awards Won",
    description: "Industry recognition received",
    color: "from-secondary/20 to-secondary/5",
    iconBg: "bg-secondary/20",
    iconColor: "text-secondary",
  },
]

function CountUpAnimation({
  value,
  duration = 2000,
  isVisible,
}: { value: number; duration?: number; isVisible: boolean }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!isVisible) return

    let startTime: number
    let animationFrame: number

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime
      const progress = Math.min((currentTime - startTime) / duration, 1)

      setCount(Math.floor(progress * value))

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      }
    }

    animationFrame = requestAnimationFrame(animate)

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame)
      }
    }
  }, [value, duration, isVisible])

  return <span>{count}</span>
}

export default function StatisticsSection() {
  const parallaxOffset = useParallax(0.2)
  const { isVisible, setElement } = useScrollAnimation()

  return (
    <section className="py-16 bg-gradient-to-br from-primary to-primary/90 text-primary-foreground relative overflow-hidden">
      <div className="absolute inset-0 opacity-10" style={{ transform: `translateY(${parallaxOffset}px)` }}>
        <div className="absolute top-10 left-20 w-24 h-24 bg-accent rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-32 h-32 bg-secondary rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-40 h-40 bg-accent/50 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div
          ref={setElement}
          className={`text-center mb-12 transition-all duration-1000 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-heading">Our Success in Numbers</h2>
          <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto font-[family-name:var(--font-body)]">
            These numbers reflect our commitment to excellence and the trust our clients place in us
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {statistics.map((stat, index) => (
            <div
              key={index}
              className={`text-center group hover-lift transition-all duration-500 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="bg-primary-foreground/10 backdrop-blur-sm rounded-lg p-6 hover:bg-primary-foreground/20 transition-all duration-300 border border-primary-foreground/20">
                <div
                  className={`inline-flex items-center justify-center w-16 h-16 ${stat.iconBg} rounded-full mb-4 transition-all duration-300 group-hover:scale-110`}
                >
                  <stat.icon className={`w-8 h-8 ${stat.iconColor}`} />
                </div>
                <div className="text-4xl font-bold mb-2 gradient-text">
                  {stat.prefix && <span>{stat.prefix}</span>}
                  <CountUpAnimation value={stat.value} isVisible={isVisible} />
                  <span>{stat.suffix}</span>
                </div>
                <div className="text-xl font-semibold mb-1 font-heading">{stat.label}</div>
                <div className="text-sm text-primary-foreground/80 font-[family-name:var(--font-body)]">
                  {stat.description}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
