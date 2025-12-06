import { useState } from "react";
import { Search, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const makes = ["Ferrari", "Lamborghini", "Porsche", "Rolls-Royce", "Bentley", "McLaren", "Aston Martin", "Bugatti"];
const priceRanges = [
  { label: "Under $100K", value: "0-100000" },
  { label: "$100K - $250K", value: "100000-250000" },
  { label: "$250K - $500K", value: "250000-500000" },
  { label: "$500K - $1M", value: "500000-1000000" },
  { label: "$1M+", value: "1000000+" },
];

export function HeroSection() {
  const [searchType, setSearchType] = useState<"buy" | "auction">("buy");

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1544636331-e26879cd4d9b?q=80&w=2574')] bg-cover bg-center opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/50" />
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />

      {/* Content */}
      <div className="relative container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8 animate-fade-in">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-sm text-primary font-medium">The Premier Luxury Auto Marketplace</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold mb-6 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
            <span className="text-foreground">Discover Your</span>
            <br />
            <span className="luxury-text-gradient">Dream Machine</span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            Curated collection of the world's finest automobiles. Buy, sell, or bid on 
            exceptional vehicles with our white-glove concierge service.
          </p>

          {/* Search Box */}
          <div className="glass-card rounded-2xl p-6 max-w-3xl mx-auto gold-glow animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
            {/* Tabs */}
            <div className="flex gap-2 mb-6">
              <button
                onClick={() => setSearchType("buy")}
                className={`px-6 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  searchType === "buy"
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-muted-foreground hover:text-foreground"
                }`}
              >
                Buy Now
              </button>
              <button
                onClick={() => setSearchType("auction")}
                className={`px-6 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  searchType === "auction"
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-muted-foreground hover:text-foreground"
                }`}
              >
                Auctions
              </button>
            </div>

            {/* Search Fields */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Select>
                <SelectTrigger className="h-12 bg-secondary border-border">
                  <SelectValue placeholder="Select Make" />
                </SelectTrigger>
                <SelectContent>
                  {makes.map((make) => (
                    <SelectItem key={make} value={make.toLowerCase()}>
                      {make}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select>
                <SelectTrigger className="h-12 bg-secondary border-border">
                  <SelectValue placeholder="Select Model" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Models</SelectItem>
                </SelectContent>
              </Select>

              <Select>
                <SelectTrigger className="h-12 bg-secondary border-border">
                  <SelectValue placeholder="Price Range" />
                </SelectTrigger>
                <SelectContent>
                  {priceRanges.map((range) => (
                    <SelectItem key={range.value} value={range.value}>
                      {range.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Button className="h-12 bg-primary text-primary-foreground hover:bg-primary/90 gap-2">
                <Search className="h-4 w-4" />
                Search
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 mt-12 animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-display font-bold text-primary">2,500+</div>
              <div className="text-sm text-muted-foreground">Premium Vehicles</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-display font-bold text-primary">$2.5B+</div>
              <div className="text-sm text-muted-foreground">Total Sales</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-display font-bold text-primary">15K+</div>
              <div className="text-sm text-muted-foreground">Happy Clients</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-display font-bold text-primary">50+</div>
              <div className="text-sm text-muted-foreground">Countries Served</div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float">
          <ChevronDown className="h-8 w-8 text-primary/50" />
        </div>
      </div>
    </section>
  );
}
