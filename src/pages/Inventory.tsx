import { useState, useEffect, useMemo } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Link } from "react-router-dom";
import { Search, Filter, Grid, List, Heart, Gauge, Calendar, MapPin, X, Settings, Fuel as FuelIcon } from "lucide-react";
import { Car, getCars, initCarStore } from "@/lib/carStore";

function CarCard({ car, view }: { car: Car; view: "grid" | "list" }) {
  if (view === "list") {
    return (
      <div className="glass-card rounded-xl overflow-hidden luxury-border transition-all duration-300 hover:border-champagne/30 flex">
        <div className="w-60 shrink-0 relative overflow-hidden">
          <img src={car.image} alt={car.title} data-ci-make={car.make} data-ci-model={car.model} data-ci-year={car.year} className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" onError={(e) => { (e.target as HTMLImageElement).src = "https://placehold.co/400x300/1a1a1a/cccccc?text=No+Image"; }} />
          {car.featured && (
            <Badge className="absolute top-3 left-3 bg-gradient-to-r from-champagne to-gold text-black border-0 text-xs">Featured</Badge>
          )}
        </div>
        <div className="flex-1 p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-start justify-between">
              <div>
                <Link to={`/vehicle/${car.id}`} className="hover:text-champagne transition-colors">
                  <h3 className="text-lg font-semibold">{car.title}</h3>
                </Link>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                  <span className="text-champagne/80 font-medium">{car.make}</span>
                  <span className="text-white/20">·</span>
                  <span>{car.model}</span>
                </div>
              </div>
              <button className="p-2 rounded-full hover:bg-white/5 text-muted-foreground hover:text-champagne transition-colors">
                <Heart className="h-4 w-4" />
              </button>
            </div>
            <div className="flex gap-4 mt-3 text-sm text-muted-foreground">
              <span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5 text-champagne/70" /> {car.year}</span>
              <span className="flex items-center gap-1"><Gauge className="h-3.5 w-3.5 text-champagne/70" /> {car.mileage.toLocaleString()} mi</span>
              <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5 text-champagne/70" /> {car.location}</span>
            </div>
          </div>
          <div className="flex items-center justify-between mt-3 pt-3 border-t border-white/[0.06]">
            <div className="text-xl font-bold text-champagne">${car.price.toLocaleString()}</div>
            <Link to={`/vehicle/${car.id}`}>
              <Button variant="outline" size="sm" className="border-champagne/30 text-champagne hover:bg-champagne hover:text-black rounded-full">
                View Details
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="group glass-card rounded-2xl overflow-hidden luxury-border transition-all duration-300 hover:border-champagne/30 hover:shadow-lg hover:shadow-champagne/5">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img src={car.image} alt={car.title} data-ci-make={car.make} data-ci-model={car.model} data-ci-year={car.year} className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110" onError={(e) => { (e.target as HTMLImageElement).src = "https://placehold.co/800x600/1a1a1a/cccccc?text=No+Image"; }} />
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
        
        {/* Hover overlay with quick specs */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-5">
          <div className="text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
            <div className="flex items-center gap-4 text-xs">
              {car.transmission && <span>{car.transmission}</span>}
              {car.fuelType && <span>{car.fuelType}</span>}
              {car.bodyStyle && <span>{car.bodyStyle}</span>}
            </div>
          </div>
        </div>
        
        <div className="absolute top-3 left-3 flex gap-2">
          {car.featured && <Badge className="bg-gradient-to-r from-champagne to-gold text-black border-0 shadow-lg shadow-champagne/20">Featured</Badge>}
          {car.auction && <Badge className="bg-red-500/90 text-white border-0 shadow-lg">Live Auction</Badge>}
        </div>
        <button className="absolute top-3 right-3 p-2 rounded-full bg-black/30 backdrop-blur-sm border border-white/10 text-white/70 hover:text-champagne hover:border-champagne/50 transition-all duration-300 opacity-0 group-hover:opacity-100">
          <Heart className="h-4 w-4" />
        </button>
      </div>
      <div className="p-5">
        <Link to={`/vehicle/${car.id}`} className="hover:text-champagne transition-colors">
          <h3 className="text-base font-semibold">{car.title}</h3>
        </Link>
        <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
          <span className="text-champagne/80 font-medium">{car.make}</span>
          <span className="text-white/20">·</span>
          <span>{car.model}</span>
        </div>
        <div className="flex gap-3 mt-3 text-xs text-muted-foreground">
          <span className="flex items-center gap-1"><Calendar className="h-3 w-3 text-champagne/70" /> {car.year}</span>
          <span className="flex items-center gap-1"><Gauge className="h-3 w-3 text-champagne/70" /> {car.mileage.toLocaleString()} mi</span>
          <span className="flex items-center gap-1"><MapPin className="h-3 w-3 text-champagne/70" /> {car.location}</span>
        </div>
        
        {/* Additional specs row */}
        {(car.transmission || car.fuelType) && (
          <div className="flex gap-2 mt-2">
            {car.transmission && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-secondary/50 text-[10px] text-muted-foreground">
                <Settings className="h-2.5 w-2.5 text-champagne/70" />
                {car.transmission}
              </span>
            )}
            {car.fuelType && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-secondary/50 text-[10px] text-muted-foreground">
                <FuelIcon className="h-2.5 w-2.5 text-champagne/70" />
                {car.fuelType}
              </span>
            )}
          </div>
        )}
        
        <div className="flex items-center justify-between mt-4 pt-3 border-t border-white/[0.06]">
          <div className="text-lg font-bold text-champagne">${car.price.toLocaleString()}</div>
          <Link to={`/vehicle/${car.id}`}>
            <Button variant="outline" size="sm" className="border-champagne/30 text-champagne hover:bg-champagne hover:text-black rounded-full text-xs transition-all duration-300">
              View Details
            </Button>
          </Link>
        </div>
        
        {/* Bottom gold accent on hover */}
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-champagne/40 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
      </div>
    </div>
  );
}

export default function Inventory() {
  const [cars, setCars] = useState<Car[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [view, setView] = useState<"grid" | "list">("grid");
  const [priceRange, setPriceRange] = useState([0, 120000]);
  const [selectedMake, setSelectedMake] = useState("All Makes");
  const [selectedModel, setSelectedModel] = useState("All Models");
  const [selectedYear, setSelectedYear] = useState("All Years");
  const [sort, setSort] = useState("newest");

  useEffect(() => {
    initCarStore();
    setCars(getCars());
  }, []);

  // Derive distinct makes, models, and years from the cars data
  const makes = useMemo(() => {
    const m = new Set(cars.map(c => c.make));
    return ["All Makes", ...Array.from(m).sort()];
  }, [cars]);

  const models = useMemo(() => {
    let filtered = cars;
    if (selectedMake !== "All Makes") {
      filtered = filtered.filter(c => c.make === selectedMake);
    }
    const m = new Set(filtered.map(c => c.model));
    return ["All Models", ...Array.from(m).sort()];
  }, [cars, selectedMake]);

  const years = useMemo(() => {
    const y = new Set(cars.map(c => String(c.year)));
    return ["All Years", ...Array.from(y).sort((a, b) => Number(b) - Number(a))];
  }, [cars]);

  // Auto-reset model when make changes
  const handleMakeChange = (make: string) => {
    setSelectedMake(make);
    setSelectedModel("All Models");
  };

  const filtered = cars
    .filter((c) => {
      if (selectedMake !== "All Makes" && c.make !== selectedMake) return false;
      if (selectedModel !== "All Models" && c.model !== selectedModel) return false;
      if (selectedYear !== "All Years" && String(c.year) !== selectedYear) return false;
      if (c.price < priceRange[0] || c.price > priceRange[1]) return false;
      if (!searchQuery) return true;
      const q = searchQuery.toLowerCase();
      return (
        c.title.toLowerCase().includes(q) ||
        c.make.toLowerCase().includes(q) ||
        c.model.toLowerCase().includes(q)
      );
    })
    .sort((a, b) => {
      switch (sort) {
        case "newest": return b.year - a.year;
        case "price-low": return a.price - b.price;
        case "price-high": return b.price - a.price;
        case "mileage": return a.mileage - b.mileage;
        default: return 0;
      }
    });

  const clearAll = () => {
    setSelectedMake("All Makes");
    setSelectedModel("All Models");
    setSelectedYear("All Years");
    setPriceRange([0, 120000]);
    setSearchQuery("");
  };

  const hasActiveFilters = selectedMake !== "All Makes" || selectedModel !== "All Models" || selectedYear !== "All Years" || priceRange[0] > 0 || priceRange[1] < 120000 || searchQuery;

  return (
    <Layout>
      <div className="min-h-screen pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-display font-bold">Explore Our Collection</h1>
            <p className="text-muted-foreground mt-2 max-w-xl mx-auto">
              Browse through our meticulously curated inventory of the world's most prestigious automobiles.
            </p>
          </div>

          {/* Search & Filters */}
          <div className="glass-card rounded-2xl p-4 md:p-6 mb-8 luxury-border">
            {/* Row 1: Search + Grid/List */}
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by make, model, or keyword..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 bg-background/50 border-white/10"
                />
              </div>
              <div className="flex gap-1">
                <Button
                  variant={view === "grid" ? "default" : "outline"}
                  size="icon"
                  onClick={() => setView("grid")}
                  className={view === "grid" ? "bg-champagne text-black" : "border-white/10"}
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={view === "list" ? "default" : "outline"}
                  size="icon"
                  onClick={() => setView("list")}
                  className={view === "list" ? "bg-champagne text-black" : "border-white/10"}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Row 2: Make + Model + Year + Sort */}
            <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3">
              <Select value={selectedMake} onValueChange={handleMakeChange}>
                <SelectTrigger className="bg-background/50 border-white/10">
                  <SelectValue placeholder="Make" />
                </SelectTrigger>
                <SelectContent>
                  {makes.map((m) => (
                    <SelectItem key={m} value={m}>
                      {m}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={selectedModel} onValueChange={setSelectedModel}>
                <SelectTrigger className="bg-background/50 border-white/10">
                  <SelectValue placeholder="Model" />
                </SelectTrigger>
                <SelectContent>
                  {models.map((m) => (
                    <SelectItem key={m} value={m}>
                      {m}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={selectedYear} onValueChange={setSelectedYear}>
                <SelectTrigger className="bg-background/50 border-white/10">
                  <SelectValue placeholder="Year" />
                </SelectTrigger>
                <SelectContent>
                  {years.map((y) => (
                    <SelectItem key={y} value={y}>
                      {y}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={sort} onValueChange={setSort}>
                <SelectTrigger className="bg-background/50 border-white/10">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="mileage">Lowest Mileage</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Price Range */}
            <div className="mt-4 pt-4 border-t border-white/[0.06]">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Price Range</span>
                <span className="text-sm text-champagne font-medium">
                  ${priceRange[0].toLocaleString()} — ${priceRange[1].toLocaleString()}
                </span>
              </div>
              <Slider
                value={priceRange}
                onValueChange={setPriceRange}
                max={120000}
                step={5000}
                className="w-full"
              />
            </div>
          </div>

          {/* Results count + clear */}
          <div className="flex items-center justify-between mb-6">
            <p className="text-sm text-muted-foreground">
              Showing {filtered.length} vehicle{filtered.length !== 1 && "s"}
            </p>
            {hasActiveFilters && (
              <Button variant="ghost" size="sm" onClick={clearAll} className="text-xs">
                <X className="h-3 w-3 mr-1" /> Clear All Filters
              </Button>
            )}
          </div>

          {/* Car Grid / List */}
          {view === "grid" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filtered.map((car) => (
                <CarCard key={car.id} car={car} view="grid" />
              ))}
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {filtered.map((car) => (
                <CarCard key={car.id} car={car} view="list" />
              ))}
            </div>
          )}

          {filtered.length === 0 && (
            <div className="text-center py-20">
              <p className="text-muted-foreground">No vehicles match your search criteria.</p>
              {hasActiveFilters && (
                <Button variant="link" onClick={clearAll} className="text-champagne mt-2">
                  Clear all filters
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
