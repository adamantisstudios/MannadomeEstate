"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Award, Users, Building, Star } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";

const achievements = [
  {
    icon: Building,
    number: "500+",
    label: "Properties Sold",
    description: "Successfully completed transactions",
  },
  {
    icon: Users,
    number: "1000+",
    label: "Happy Clients",
    description: "Satisfied customers nationwide",
  },
  {
    icon: Award,
    number: "15+",
    label: "Years Experience",
    description: "Proven track record in real estate",
  },
  {
    icon: Star,
    number: "4.9/5",
    label: "Client Rating",
    description: "Average customer satisfaction",
  },
];

const teamMembers = [
  {
    name: "Emmanuel Mannadome",
    role: "CEO & Founder",
    image: "/images/ceoimages.jpeg", // ✅ must be inside public/images/
    description: "15+ years in Ghana real estate market",
    priority: true, // CEO image loads first
  },
  {
    name: "Sarah Asante",
    role: "Head of Sales",
    image: "/images/team-sales-head.png",
    description: "Expert in luxury property sales",
  },
  {
    name: "Kwame Osei",
    role: "Property Manager",
    image: "/images/team-property-manager.png",
    description: "Specialist in property management",
  },
];

export default function AboutSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [achievementsVisible, setAchievementsVisible] = useState(false);
  const [teamVisible, setTeamVisible] = useState(false);

  const sectionRef = useRef<HTMLElement>(null);
  const achievementsRef = useRef<HTMLDivElement>(null);
  const teamRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target === sectionRef.current && entry.isIntersecting) {
            setIsVisible(true);
          }
          if (
            entry.target === achievementsRef.current &&
            entry.isIntersecting
          ) {
            setAchievementsVisible(true);
          }
          if (entry.target === teamRef.current && entry.isIntersecting) {
            setTeamVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    if (achievementsRef.current) observer.observe(achievementsRef.current);
    if (teamRef.current) observer.observe(teamRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-20 bg-gradient-to-br from-background to-muted/30"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* About Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <div
            className={`transition-all duration-1000 ease-out ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-8"
            }`}
          >
            <Badge className="mb-4 bg-accent/10 text-accent hover:bg-accent/20 transition-colors duration-300">
              About Mannadome Estate
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6 text-balance font-heading">
              Ghana&apos;s Premier Real Estate Company
            </h2>
            <p className="text-lg text-muted-foreground mb-6 text-pretty">
              For over 15 years, Mannadome Estate has been at the forefront of
              Ghana&apos;s real estate market, helping thousands of clients find
              their dream homes and make smart property investments.
            </p>
            <p className="text-muted-foreground mb-8">
              We specialize in luxury properties, residential developments, and
              commercial real estate across Ghana&apos;s major cities. Our
              commitment to excellence, transparency, and customer satisfaction
              has made us the trusted choice for discerning property buyers and
              investors.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                asChild
                size="lg"
                className="hover-lift bg-accent hover:bg-accent/90"
              >
                <Link href="/about">Learn More About Us</Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                asChild
                className="hover-lift border-accent text-accent hover:bg-accent hover:text-accent-foreground bg-transparent"
              >
                <Link href="/properties">View Our Properties</Link>
              </Button>
            </div>
          </div>

          <div
            className={`relative transition-all duration-1000 ease-out delay-300 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-8"
            }`}
          >
            <div className="relative hover-lift">
              <Image
                src="/images/about-office.png" // ✅ must be inside public/images/
                alt="Mannadome Estate Office"
                width={600}
                height={500}
                className="rounded-lg shadow-lg transition-transform duration-500"
              />
              <div className="absolute -bottom-6 -left-6 bg-accent text-accent-foreground p-6 rounded-lg shadow-lg hover-glow">
                <div className="text-2xl font-bold">15+</div>
                <div className="text-sm">Years of Excellence</div>
              </div>
            </div>
          </div>
        </div>

        {/* Achievements */}
        <div
          ref={achievementsRef}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20"
        >
          {achievements.map((achievement, index) => (
            <Card
              key={index}
              className={`text-center p-6 hover-lift hover-glow transition-all duration-500 border-accent/20 ${
                achievementsVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <CardContent className="p-0">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-4 transition-colors duration-300 hover:bg-accent/20">
                  <achievement.icon className="w-6 h-6 text-accent" />
                </div>
                <div className="text-2xl font-bold text-foreground mb-1 gradient-text">
                  {achievement.number}
                </div>
                <div className="font-semibold text-foreground mb-2">
                  {achievement.label}
                </div>
                <div className="text-sm text-muted-foreground">
                  {achievement.description}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Team Section */}
        <div
          className={`text-center mb-12 transition-all duration-1000 ease-out ${
            teamVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4 font-heading">
            Meet Our Expert Team
          </h3>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Our experienced professionals are dedicated to providing exceptional
            service and helping you achieve your real estate goals.
          </p>
        </div>

        <div
          ref={teamRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {teamMembers.map((member, index) => (
            <Card
              key={index}
              className={`text-center overflow-hidden hover-lift hover-glow transition-all duration-500 border-accent/20 ${
                teamVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  priority={member.priority || false} // CEO loads first
                  className="object-cover transition-transform duration-500 hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <CardContent className="p-6">
                <h4 className="text-xl font-semibold text-foreground mb-1 font-heading">
                  {member.name}
                </h4>
                <p className="text-accent font-medium mb-3">{member.role}</p>
                <p className="text-muted-foreground text-sm">
                  {member.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
