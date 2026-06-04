import { Car, CreditCard, Calculator, Shield, Truck, Headphones } from "lucide-react";
import { Link } from "react-router-dom";

const services = [
  {
    icon: Car,
    title: "Buy Quality Vehicles",
    description: "Browse our curated collection of quality vehicles at wholesale prices from trusted dealerships.",
    href: "/inventory",
  },
  {
    icon: CreditCard,
    title: "Easy Credit Approval",
    description: "Get approved quickly with our streamlined credit application process. Alternative down payments accepted!",
    href: "/financing",
  },
  {
    icon: Calculator,
    title: "Financing Calculator",
    description: "Calculate your monthly payments and explore financing options tailored for your budget.",
    href: "/financing",
  },
  {
    icon: Shield,
    title: "Vehicle Inspections",
    description: "Every vehicle undergoes a comprehensive inspection with detailed history reports for peace of mind.",
    href: "/inspection",
  },
  {
    icon: Truck,
    title: "Free Home Delivery",
    description: "Coordinate delivery to your home after approval, paperwork, and final dealer confirmation.",
    href: "/contact",
  },
  {
    icon: Headphones,
    title: "Expert Brokers",
    description: "Our knowledgeable brokers help you choose the perfect model that fits your lifestyle and needs.",
    href: "/contact",
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
            Never Step Foot Into a Dealership
          </h2>
          <p className="text-muted-foreground mt-4">
            We handle everything from vehicle selection to delivery. 
            Experience hassle-free car buying with Jersey Auto Lease.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <Link
              key={service.title}
              to={service.href}
              className="group p-8 rounded-2xl bg-background border border-border hover:border-primary/50 transition-all duration-300 card-hover"
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
