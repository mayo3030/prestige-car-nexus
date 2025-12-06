import { Car, Gavel, Calculator, Shield, Truck, Headphones } from "lucide-react";
import { Link } from "react-router-dom";

const services = [
  {
    icon: Car,
    title: "Buy Premium Vehicles",
    description: "Browse our curated collection of luxury and exotic automobiles from trusted sellers worldwide.",
    href: "/inventory",
  },
  {
    icon: Gavel,
    title: "Live Auctions",
    description: "Bid on exclusive vehicles in our live auction events with real-time updates and transparent pricing.",
    href: "/auctions",
  },
  {
    icon: Calculator,
    title: "Financing Solutions",
    description: "Calculate your monthly payments and explore financing options tailored for luxury vehicle purchases.",
    href: "/financing",
  },
  {
    icon: Shield,
    title: "Vehicle Inspections",
    description: "Every vehicle undergoes a comprehensive 150-point inspection with detailed history reports.",
    href: "/inspection",
  },
  {
    icon: Truck,
    title: "Global Delivery",
    description: "Secure, enclosed transport to anywhere in the world with real-time tracking and full insurance.",
    href: "/shipping",
  },
  {
    icon: Headphones,
    title: "Concierge Service",
    description: "Dedicated specialists to guide you through every step of your purchase or sale experience.",
    href: "/concierge",
  },
];

export function ServicesSection() {
  return (
    <section className="py-20 bg-card">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-primary text-sm font-medium uppercase tracking-wider">
            Our Services
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-bold mt-2">
            White-Glove Experience
          </h2>
          <p className="text-muted-foreground mt-4">
            From first inquiry to final delivery, we provide an unparalleled 
            luxury experience for discerning automotive enthusiasts.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <Link
              key={service.title}
              to={service.href}
              className="group p-8 rounded-2xl bg-background border border-border hover:border-primary/50 transition-all duration-300 hover:gold-glow"
            >
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                <service.icon className="h-7 w-7 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                {service.title}
              </h3>
              <p className="text-muted-foreground">
                {service.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
