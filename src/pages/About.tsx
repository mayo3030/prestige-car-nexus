import { Layout } from "@/components/layout/Layout";
import { Shield, Users, Globe, Award, CheckCircle, Target, Heart } from "lucide-react";

const stats = [
  { value: "24h", label: "Target Quote Window" },
  { value: "NJ", label: "Broker Service Area" },
  { value: "0", label: "Required Dealer Visits" },
  { value: "1", label: "Centralized Client Pipeline" },
];

const values = [
  {
    icon: Shield,
    title: "Trust & Transparency",
    description: "We provide honest assessments and complete vehicle history reports for every car.",
  },
  {
    icon: Users,
    title: "Customer First",
    description: "We take pride in what we do and value our clients. Your satisfaction is our priority.",
  },
  {
    icon: Globe,
    title: "Wide Network",
    description: "We work with a network of dealerships across the country to find your perfect vehicle.",
  },
  {
    icon: Award,
    title: "Industry Experience",
    description: "With many years in the automobile industry, we know the ins and outs of the business.",
  },
];

const About = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="pt-12 pb-20 gradient-hero relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-glow" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan/5 rounded-full blur-3xl" />
        </div>
        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl mx-auto text-center">
            <span className="text-primary text-sm font-medium uppercase tracking-wider">
              About Us
            </span>
            <h1 className="text-4xl md:text-5xl font-display font-bold mt-4 mb-6">
              We are <span className="text-gradient">Jersey Auto Lease</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              We provide quality service to our clients who are looking to purchase a new car 
              without the hassle of ever having to step foot at a car dealership.
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
                Maintaining Your Business
              </h2>
              <p className="text-muted-foreground mb-6 text-lg">
                For the many years we've been in business, we have been striving to provide 
                our clients the best quality service possible to gain their full satisfaction. 
                And they've shown their appreciation by coming back to us repeatedly.
              </p>
              <p className="text-muted-foreground mb-6">
                With the many years of experience we have in the automobile industry, we know 
                the ins and outs of the business. We work with a network of car dealerships 
                to help you find your preferred model at a WHOLESALE price whether new, lease 
                or pre-owned!
              </p>
              <ul className="space-y-3">
                {[
                  "Wholesale pricing on all makes and models",
                  "Free home delivery on all vehicles",
                  "Never step foot into a dealership",
                  "Alternative down payments approved",
                  "Expert brokers to guide your purchase",
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
                  src="https://images.unsplash.com/photo-1560958089-b8a1929cea89?q=80&w=2671"
                  alt="Car Dealership"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-8 -left-8 w-48 h-48 rounded-2xl overflow-hidden border-4 border-background">
                <img
                  src="https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=400"
                  alt="Happy Customer"
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
                className="p-8 rounded-2xl bg-card border border-border hover:border-primary/50 transition-colors card-hover"
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

      {/* Why Choose Us */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-primary text-sm font-medium uppercase tracking-wider">
              Why Choose Us
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-bold mt-4">
              The Jersey Auto Lease Difference
            </h2>
            <p className="text-muted-foreground mt-4">
              Buying a car is one of the most important and intimidating purchases you can 
              make in your lifetime, and we are here to guide you through it!
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-8">
              <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-6 mx-auto">
                <Target className="h-10 w-10 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Expert Guidance</h3>
              <p className="text-muted-foreground">
                If you are unsure about the car to purchase, our very knowledgeable brokers 
                can help you choose the perfect model that fits your lifestyle and needs.
              </p>
            </div>
            <div className="text-center p-8">
              <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-6 mx-auto">
                <Shield className="h-10 w-10 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Negotiation Experts</h3>
              <p className="text-muted-foreground">
                We do all the negotiations to make sure you are happy with the price and terms. 
                No more stressful dealership experiences.
              </p>
            </div>
            <div className="text-center p-8">
              <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-6 mx-auto">
                <Heart className="h-10 w-10 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Customer Care</h3>
              <p className="text-muted-foreground">
                We take pride in what we do and value our clients. Your satisfaction is our 
                top priority from start to finish.
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
