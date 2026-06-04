import { ArrowRight, Car, CreditCard, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export function CTASection() {
  return (
    <section className="py-12 md:py-20 bg-background relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-champagne/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gold/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Sell Your Car CTA */}
          <div className="relative p-10 rounded-3xl bg-gradient-to-br from-champagne/[0.07] via-card to-card border border-champagne/20 overflow-hidden group reveal">
            <div className="absolute top-0 right-0 w-64 h-64 bg-champagne/10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2" />
            
            <div className="relative">
              <div className="w-16 h-16 rounded-2xl bg-champagne/10 flex items-center justify-center mb-6">
                <Car className="h-8 w-8 text-champagne" />
              </div>
              
              <h3 className="text-2xl md:text-3xl font-display font-bold mb-4">
                Sell Your Vehicle
              </h3>
              
              <p className="text-muted-foreground mb-8 max-w-md">
                List your vehicle with us and reach thousands of buyers. 
                We handle everything from photos to final sale.
              </p>
              
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-3 text-foreground/90">
                  <CheckCircle className="h-5 w-5 text-champagne" />
                  Free vehicle valuation
                </li>
                <li className="flex items-center gap-3 text-foreground/90">
                  <CheckCircle className="h-5 w-5 text-champagne" />
                  Wide network of buyers
                </li>
                <li className="flex items-center gap-3 text-foreground/90">
                  <CheckCircle className="h-5 w-5 text-champagne" />
                  Secure transaction process
                </li>
              </ul>
              
              <Link to="/sell">
                <Button size="lg" className="bg-gradient-to-r from-champagne to-gold text-black hover:opacity-90 gap-2 rounded-full font-semibold shadow-lg shadow-champagne/20">
                  Start Selling
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Get Approved CTA */}
          <div className="relative p-10 rounded-3xl bg-card border border-white/[0.06] overflow-hidden group reveal reveal-delay-1">
            <div className="absolute top-0 right-0 w-64 h-64 bg-secondary rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2" />
            
            <div className="relative">
              <div className="w-16 h-16 rounded-2xl bg-champagne/10 flex items-center justify-center mb-6">
                <CreditCard className="h-8 w-8 text-champagne" />
              </div>
              
              <h3 className="text-2xl md:text-3xl font-display font-bold mb-4">
                Get Credit Approved
              </h3>
              
              <p className="text-muted-foreground mb-8 max-w-md">
                Bad credit? No credit? No problem! We work with all credit situations 
                and offer alternative down payment options.
              </p>
              
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-3 text-foreground/90">
                  <CheckCircle className="h-5 w-5 text-champagne" />
                  Quick approval process
                </li>
                <li className="flex items-center gap-3 text-foreground/90">
                  <CheckCircle className="h-5 w-5 text-champagne" />
                  Alternative down payments
                </li>
                <li className="flex items-center gap-3 text-foreground/90">
                  <CheckCircle className="h-5 w-5 text-champagne" />
                  All credit types welcome
                </li>
              </ul>
              
              <Link to="/financing">
                <Button size="lg" variant="outline" className="border-champagne/30 text-champagne hover:bg-champagne hover:text-black gap-2 rounded-full transition-all duration-300">
                  Apply Now
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
