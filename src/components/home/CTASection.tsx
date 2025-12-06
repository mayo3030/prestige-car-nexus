import { ArrowRight, Car, Shield } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export function CTASection() {
  return (
    <section className="py-20 bg-background relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Sell Your Car CTA */}
          <div className="relative p-10 rounded-3xl bg-gradient-to-br from-primary/20 via-card to-card border border-primary/30 overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2 group-hover:bg-primary/20 transition-colors" />
            
            <div className="relative">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                <Car className="h-8 w-8 text-primary" />
              </div>
              
              <h3 className="text-2xl md:text-3xl font-display font-bold mb-4">
                Sell Your Luxury Vehicle
              </h3>
              
              <p className="text-muted-foreground mb-8 max-w-md">
                List your vehicle with us and reach thousands of qualified buyers. 
                Our expert team handles photography, marketing, and negotiations.
              </p>
              
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-3 text-foreground/90">
                  <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center">
                    <span className="text-primary text-xs">✓</span>
                  </div>
                  Professional photography included
                </li>
                <li className="flex items-center gap-3 text-foreground/90">
                  <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center">
                    <span className="text-primary text-xs">✓</span>
                  </div>
                  Global exposure to verified buyers
                </li>
                <li className="flex items-center gap-3 text-foreground/90">
                  <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center">
                    <span className="text-primary text-xs">✓</span>
                  </div>
                  Secure transaction management
                </li>
              </ul>
              
              <Link to="/sell">
                <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2">
                  Start Selling
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Concierge Service CTA */}
          <div className="relative p-10 rounded-3xl bg-card border border-border overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-secondary rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2" />
            
            <div className="relative">
              <div className="w-16 h-16 rounded-2xl bg-secondary flex items-center justify-center mb-6">
                <Shield className="h-8 w-8 text-primary" />
              </div>
              
              <h3 className="text-2xl md:text-3xl font-display font-bold mb-4">
                Concierge Service
              </h3>
              
              <p className="text-muted-foreground mb-8 max-w-md">
                Looking for something specific? Our dedicated team will source 
                your dream vehicle and handle every detail of the acquisition.
              </p>
              
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-3 text-foreground/90">
                  <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center">
                    <span className="text-primary text-xs">✓</span>
                  </div>
                  Personalized vehicle sourcing
                </li>
                <li className="flex items-center gap-3 text-foreground/90">
                  <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center">
                    <span className="text-primary text-xs">✓</span>
                  </div>
                  Pre-purchase inspections
                </li>
                <li className="flex items-center gap-3 text-foreground/90">
                  <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center">
                    <span className="text-primary text-xs">✓</span>
                  </div>
                  White-glove delivery worldwide
                </li>
              </ul>
              
              <Link to="/concierge">
                <Button size="lg" variant="outline" className="border-primary/30 hover:bg-primary hover:text-primary-foreground gap-2">
                  Learn More
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
