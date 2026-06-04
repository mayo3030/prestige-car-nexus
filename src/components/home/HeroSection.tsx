import { useState } from "react";
import { Search, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { vehicleMakes } from "@/lib/business-data";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const priceRanges = [
  { label: "Under $30K", value: "0-30000" },
  { label: "$30K - $40K", value: "30000-40000" },
  { label: "$40K - $50K", value: "40000-50000" },
  { label: "$50K+", value: "50000-100000" },
];

export function HeroSection() {
  const [searchType, setSearchType] = useState<"buy" | "lease">("buy");
  const [make, setMake] = useState("all");
  const [modelQuery, setModelQuery] = useState("");
  const [priceRange, setPriceRange] = useState("all");
  const navigate = useNavigate();

  const handleSearch = () => {
    const params = new URLSearchParams();
    params.set("mode", searchType);
    if (make !== "all") params.set("make", make);
    if (modelQuery.trim()) params.set("search", modelQuery.trim());
    if (priceRange !== "all") {
      const [minPrice, maxPrice] = priceRange.split("-");
      params.set("minPrice", minPrice);
      params.set("maxPrice", maxPrice);
    }
    navigate(`/inventory?${params.toString()}`);
  };

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden gradient-hero">
      {/* Background Image */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=2583')] bg-cover bg-center opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/50" />
      </div>

      {/* Decorative Glow - reduced blur for better performance */}
      <div className="absolute top-1/3 left-0 w-[500px] h-[500px] bg-primary/15 rounded-full blur-[80px] opacity-50" />
      <div className="absolute bottom-0 right-1/4 w-[300px] h-[300px] bg-cyan/10 rounded-full blur-[60px] opacity-40" />

      {/* Content */}
      <div className="relative container mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="max-w-xl">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold mb-6 animate-fade-in-up leading-tight">
              Cars For Your{" "}
              <span className="text-gradient">Budget.</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground mb-8 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
              <strong className="text-foreground">Brokered lease deals without the showroom pressure.</strong>{" "}
              Compare New Jersey partner-dealer offers, get approval guidance, and schedule home delivery from one place.
            </p>

            <div className="flex flex-wrap gap-4 mb-10 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
              <Link to="/financing">
                <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2 rounded-full px-8">
                  Get Approved
                  <CheckCircle className="h-5 w-5" />
                </Button>
              </Link>
              <Link to="/inventory">
                <Button size="lg" variant="outline" className="rounded-full px-8 border-primary/30 hover:bg-primary hover:text-primary-foreground">
                  Browse Inventory
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-8 animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
              <div>
                <div className="text-3xl md:text-4xl font-display font-bold text-primary">24h</div>
                <div className="text-sm text-muted-foreground">Quote Turnaround</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-display font-bold text-primary">NJ</div>
                <div className="text-sm text-muted-foreground">Partner Dealer Network</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-display font-bold text-primary">0</div>
                <div className="text-sm text-muted-foreground">Dealership Visits Required</div>
              </div>
            </div>
          </div>

          {/* Right - Search Box */}
          <div className="animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
            <div className="glass-card rounded-3xl p-8 coral-glow">
              <h2 className="text-2xl font-display font-bold mb-6">Find Your Perfect Car</h2>
              
              {/* Tabs */}
              <div className="flex gap-2 mb-6">
                <button
                  onClick={() => setSearchType("buy")}
                  className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all ${
                    searchType === "buy"
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Buy
                </button>
                <button
                  onClick={() => setSearchType("lease")}
                  className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all ${
                    searchType === "lease"
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Lease
                </button>
              </div>

              {/* Search Fields */}
              <div className="space-y-4">
                <Select value={make} onValueChange={setMake}>
                  <SelectTrigger className="h-12 bg-secondary border-border rounded-xl">
                    <SelectValue placeholder="Select Make" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Makes</SelectItem>
                    {vehicleMakes.map((vehicleMake) => (
                      <SelectItem key={vehicleMake} value={vehicleMake}>
                        {vehicleMake}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Input
                  value={modelQuery}
                  onChange={(event) => setModelQuery(event.target.value)}
                  placeholder="Model or keyword"
                  className="h-12 bg-secondary border-border rounded-xl"
                />

                <Select value={priceRange} onValueChange={setPriceRange}>
                  <SelectTrigger className="h-12 bg-secondary border-border rounded-xl">
                    <SelectValue placeholder="Price Range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Prices</SelectItem>
                    {priceRanges.map((range) => (
                      <SelectItem key={range.value} value={range.value}>
                        {range.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Button
                  type="button"
                  onClick={handleSearch}
                  className="w-full h-12 bg-primary text-primary-foreground hover:bg-primary/90 gap-2 rounded-xl"
                >
                  <Search className="h-5 w-5" />
                  Search Vehicles
                </Button>
              </div>

              {/* Highlights */}
              <div className="mt-6 pt-6 border-t border-border">
                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    Wholesale Pricing
                  </span>
                  <span className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    Free Delivery
                  </span>
                  <span className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    No Dealership Visit
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
