import { useState, useEffect, useRef } from "react";
import { Search, CheckCircle, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { getMakes, getModels } from "@/lib/vehicleData";
import heroLogo from "@/assets/jersey-auto-lease-logo.png";

const priceRanges = [
  { label: "Under $15K", value: "0-15000" },
  { label: "$15K - $25K", value: "15000-25000" },
  { label: "$25K - $40K", value: "25000-40000" },
  { label: "$40K - $60K", value: "40000-60000" },
  { label: "$60K+", value: "60000+" },
];

/** Animated counter */
function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const counted = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !counted.current) {
          counted.current = true;
          const duration = 1500;
          const start = performance.now();
          const step = (now: number) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * target));
            if (progress < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target]);

  return (
    <div ref={ref} className="text-2xl sm:text-3xl md:text-4xl font-numbers font-bold text-champagne">
      {count.toLocaleString()}{suffix}
    </div>
  );
}

export function HeroSection() {
  const [searchType, setSearchType] = useState<"buy" | "lease">("buy");
  const [selectedMake, setSelectedMake] = useState("");
  const [selectedModel, setSelectedModel] = useState("");
  const makes = getMakes();
  const models = selectedMake ? getModels(selectedMake) : [];

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Hero background video */}
      <div className="absolute inset-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
          poster="/images/hero-bg.jpg"
        >
          <source src="/videos/hero-bg.mp4" type="video/mp4" />
        </video>
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/15 to-black/35" />
      </div>
      
      
      {/* Premium animated gradient overlay */}
      <div className="absolute inset-0 gradient-hero opacity-30" />

      {/* Floating light orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="orb orb-1 w-[500px] h-[500px] bg-champagne/8 -top-20 left-[10%]" />
        <div className="orb orb-2 w-[400px] h-[400px] bg-gold/6 top-[40%] -right-[10%]" />
        <div className="orb orb-3 w-[350px] h-[350px] bg-champagne/6 bottom-0 left-[30%]" />
      </div>

      {/* Decorative Glow */}
      <div className="absolute top-1/3 left-0 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-champagne/10 rounded-full blur-[60px] md:blur-[100px]" />
      <div className="hidden md:block absolute bottom-0 right-1/4 w-[300px] h-[300px] bg-gold/10 rounded-full blur-[80px]" />

      {/* Sparkle particles - hidden on mobile for performance */}
      <div className="hidden md:block absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="sparkle"
            style={{
              left: `${15 + i * 10}%`,
              top: `${20 + (i % 3) * 25}%`,
              animationDelay: `${i * 0.4}s`,
              animationDuration: `${2 + (i % 3)}s`,
              width: `${3 + (i % 3)}px`,
              height: `${3 + (i % 3)}px`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative container mx-auto px-4 sm:px-6 py-12 md:py-20">
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Left Content */}
          <div className="max-w-xl">
            <div className="flex items-center gap-3 mb-4 md:mb-5 animate-fade-in-up">
              <img 
                src={heroLogo} 
                alt="Jersey Auto Lease" 
                className="h-10 md:h-12 w-auto opacity-90"
              />
              <Sparkles className="h-3 w-3 md:h-4 md:w-4 text-champagne" />
              <span className="text-champagne text-[10px] md:text-sm uppercase tracking-[0.15em] md:tracking-[0.2em] font-medium">
                Premium Auto Marketplace
              </span>
              <Sparkles className="h-3 w-3 md:h-4 md:w-4 text-champagne" />
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-display font-bold mb-4 md:mb-6 animate-fade-in-up leading-[1.1]">
              Luxury Cars at{" "}
              <span className="text-gradient">Wholesale Prices.</span>
            </h1>

            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-muted-foreground mb-6 md:mb-8 animate-fade-in-up leading-relaxed" style={{ animationDelay: "0.1s" }}>
              <strong className="text-foreground">Never step foot into a dealership.</strong>{" "}
              Browse our curated collection of quality vehicles with free home delivery 
              and wholesale pricing on all makes and models.
            </p>

            <div className="flex flex-col sm:flex-row flex-wrap gap-3 md:gap-4 mb-8 md:mb-10 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
              <Link to="/financing" className="w-full sm:w-auto">
                <Button size="lg" className="w-full sm:w-auto bg-gradient-to-r from-champagne to-champagne-dark text-white hover:brightness-110 gap-2 rounded-full px-6 md:px-8 font-semibold shadow-lg shadow-red-600/30 text-sm md:text-base">
                  Get Approved
                  <CheckCircle className="h-4 w-4 md:h-5 md:w-5" />
                </Button>
              </Link>
              <Link to="/inventory" className="w-full sm:w-auto">
                <Button size="lg" variant="outline" className="w-full sm:w-auto rounded-full px-6 md:px-8 border-red-500/50 text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-all duration-300 text-sm md:text-base">
                  Browse Inventory
                </Button>
              </Link>
            </div>

            {/* Stats with animated counter */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 md:gap-10 animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
              <div className="text-center sm:text-left">
                <AnimatedCounter target={28} suffix="+" />
                <div className="text-[11px] sm:text-xs md:text-sm text-muted-foreground tracking-wide">Cars Available Online</div>
              </div>
              <div className="hidden sm:block w-[1px] h-10 bg-gradient-to-b from-champagne/30 to-transparent self-center" />
              <div className="text-center sm:text-left">
                <AnimatedCounter target={200} />
                <div className="text-[11px] sm:text-xs md:text-sm text-muted-foreground tracking-wide">Dealerships Nationwide</div>
              </div>
              <div className="hidden sm:block w-[1px] h-10 bg-gradient-to-b from-champagne/30 to-transparent self-center" />
              <div className="text-center sm:text-left">
                <AnimatedCounter target={2500} suffix="+" />
                <div className="text-[11px] sm:text-xs md:text-sm text-muted-foreground tracking-wide">Satisfied Customers</div>
              </div>
            </div>
          </div>

          {/* Right - Search Box */}
          <div className="animate-fade-in-up w-full" style={{ animationDelay: "0.4s" }}>
            <div className="glass-card rounded-2xl md:rounded-3xl p-5 sm:p-6 md:p-8 champagne-glow border-champagne/10 max-w-lg mx-auto lg:mx-0 lg:max-w-none">
              <h2 className="text-xl md:text-2xl font-display font-bold mb-4 md:mb-6">Find Your Perfect Car</h2>
              
              {/* Tabs */}
              <div className="flex gap-2 mb-4 md:mb-6">
                <button
                  onClick={() => setSearchType("buy")}
                  className={cn(
                    "px-5 md:px-6 py-2 rounded-full text-xs md:text-sm font-medium transition-all duration-300",
                    searchType === "buy"
                      ? "bg-champagne text-black font-semibold shadow-lg shadow-champagne/20"
                      : "bg-secondary text-muted-foreground hover:text-foreground"
                  )}
                >
                  Buy
                </button>
                <button
                  onClick={() => setSearchType("lease")}
                  className={cn(
                    "px-5 md:px-6 py-2 rounded-full text-xs md:text-sm font-medium transition-all duration-300",
                    searchType === "lease"
                      ? "bg-champagne text-black font-semibold shadow-lg shadow-champagne/20"
                      : "bg-secondary text-muted-foreground hover:text-foreground"
                  )}
                >
                  Lease
                </button>
              </div>

              {/* Search Fields */}
              <div className="space-y-3 md:space-y-4">
                <Select value={selectedMake} onValueChange={(v) => { setSelectedMake(v); setSelectedModel(""); }}>
                  <SelectTrigger className="h-10 md:h-12 bg-secondary border-border rounded-xl text-sm">
                    <SelectValue placeholder="Select Make" />
                  </SelectTrigger>
                  <SelectContent>
                    {makes.map((make) => (
                      <SelectItem key={make} value={make}>
                        {make}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={selectedModel} onValueChange={setSelectedModel} disabled={!selectedMake}>
                  <SelectTrigger className="h-10 md:h-12 bg-secondary border-border rounded-xl text-sm">
                    <SelectValue placeholder={selectedMake ? "Select Model" : "Select Make First"} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Models</SelectItem>
                    {models.map((model) => (
                      <SelectItem key={model} value={model}>
                        {model}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select>
                  <SelectTrigger className="h-10 md:h-12 bg-secondary border-border rounded-xl text-sm">
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

                <Button className="w-full h-10 md:h-12 bg-gradient-to-r from-champagne to-gold text-black hover:opacity-90 gap-2 rounded-xl font-semibold shadow-lg shadow-champagne/20 text-sm md:text-base">
                  <Search className="h-4 w-4 md:h-5 md:w-5" />
                  Search Vehicles
                </Button>
              </div>

              {/* Highlights */}
              <div className="mt-4 md:mt-6 pt-4 md:pt-6 border-t border-white/[0.06]">
                <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs md:text-sm text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <CheckCircle className="h-3.5 w-3.5 text-champagne shrink-0" />
                    <span>Wholesale Pricing</span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <CheckCircle className="h-3.5 w-3.5 text-champagne shrink-0" />
                    <span>Free Delivery</span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <CheckCircle className="h-3.5 w-3.5 text-champagne shrink-0" />
                    <span>No Dealership Visit</span>
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
