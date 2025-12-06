import { Layout } from "@/components/layout/Layout";
import { Shield, Users, Globe, Award, CheckCircle } from "lucide-react";

const stats = [
  { value: "$2.5B+", label: "Total Sales Volume" },
  { value: "15,000+", label: "Vehicles Sold" },
  { value: "50+", label: "Countries Served" },
  { value: "98%", label: "Customer Satisfaction" },
];

const values = [
  {
    icon: Shield,
    title: "Trust & Transparency",
    description: "Every vehicle is thoroughly inspected and verified. We provide complete history reports and honest assessments.",
  },
  {
    icon: Users,
    title: "White-Glove Service",
    description: "Our dedicated concierge team guides you through every step, from initial inquiry to final delivery.",
  },
  {
    icon: Globe,
    title: "Global Network",
    description: "Access to an exclusive worldwide network of collectors, dealers, and enthusiasts across 50+ countries.",
  },
  {
    icon: Award,
    title: "Excellence in Everything",
    description: "We set the standard for luxury automotive transactions with meticulous attention to detail.",
  },
];

const team = [
  {
    name: "Alexander Sterling",
    role: "Founder & CEO",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400",
  },
  {
    name: "Victoria Chen",
    role: "Chief Operations Officer",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400",
  },
  {
    name: "Marcus Wright",
    role: "Head of Acquisitions",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=400",
  },
  {
    name: "Isabella Romano",
    role: "Director of Client Relations",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=400",
  },
];

const About = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="pt-12 pb-20 bg-gradient-to-b from-card to-background relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        </div>
        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl mx-auto text-center">
            <span className="text-primary text-sm font-medium uppercase tracking-wider">
              Our Story
            </span>
            <h1 className="text-4xl md:text-5xl font-display font-bold mt-4 mb-6">
              Redefining the Luxury <span className="text-primary">Automotive Experience</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Founded by passionate collectors, Prestige Motors has grown into the world's premier 
              marketplace for luxury and exotic automobiles, connecting discerning buyers with 
              exceptional vehicles.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl md:text-4xl font-display font-bold text-primary mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-primary text-sm font-medium uppercase tracking-wider">
                Our Mission
              </span>
              <h2 className="text-3xl md:text-4xl font-display font-bold mt-4 mb-6">
                Where Passion Meets Precision
              </h2>
              <p className="text-muted-foreground mb-6">
                At Prestige Motors, we believe that acquiring a luxury vehicle should be as 
                extraordinary as the automobile itself. Every interaction is crafted to deliver 
                an unparalleled experience worthy of the world's finest marques.
              </p>
              <ul className="space-y-3">
                {[
                  "Curated selection of verified premium vehicles",
                  "Comprehensive 150-point inspection process",
                  "Secure, transparent transactions",
                  "Worldwide shipping and logistics",
                  "Dedicated concierge support",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=2670"
                  alt="Luxury Car Showroom"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-8 -left-8 w-48 h-48 rounded-2xl overflow-hidden border-4 border-background">
                <img
                  src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=400"
                  alt="Detail"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-primary text-sm font-medium uppercase tracking-wider">
              Our Values
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-bold mt-4">
              What Drives Us
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value) => (
              <div
                key={value.title}
                className="p-8 rounded-2xl bg-card border border-border hover:border-primary/50 transition-colors"
              >
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                  <value.icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                <p className="text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-primary text-sm font-medium uppercase tracking-wider">
              Leadership
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-bold mt-4">
              Meet Our Team
            </h2>
            <p className="text-muted-foreground mt-4">
              Passionate experts dedicated to delivering exceptional experiences.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member) => (
              <div key={member.name} className="text-center group">
                <div className="aspect-square rounded-2xl overflow-hidden mb-4 relative">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <h3 className="text-lg font-semibold">{member.name}</h3>
                <p className="text-sm text-muted-foreground">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
