import { FormEvent, useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Calendar, Filter, Gauge, Grid, Heart, List, MapPin, Search, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Layout } from "@/components/layout/Layout";
import { getVehicles } from "@/lib/repository";
import { vehicleMakes, type Vehicle } from "@/lib/business-data";

const vehicleTypes = [
  { label: "All Types", value: "all" },
  { label: "Sedans", value: "sedan" },
  { label: "SUVs", value: "suv" },
  { label: "Crossovers", value: "crossover" },
  { label: "Trucks", value: "truck" },
  { label: "Luxury", value: "luxury" },
];

function parseNumber(value: string | null, fallback: number) {
  if (value === null || value === "") {
    return fallback;
  }

  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

const Inventory = () => {
  const [params, setParams] = useSearchParams();
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState(params.get("search") ?? "");
  const [selectedMake, setSelectedMake] = useState(params.get("make") ?? "all");
  const [selectedType, setSelectedType] = useState(params.get("type") ?? "all");
  const [priceRange, setPriceRange] = useState([
    parseNumber(params.get("minPrice"), 0),
    parseNumber(params.get("maxPrice"), 100000),
  ]);
  const [sort, setSort] = useState(params.get("sort") ?? "newest");
  const [showFilters, setShowFilters] = useState(Boolean(params.toString()));
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(6);

  const activeFilters = useMemo(
    () => ({
      search: params.get("search") ?? undefined,
      make: params.get("make") ?? undefined,
      type: params.get("type") ?? undefined,
      minPrice: parseNumber(params.get("minPrice"), 0),
      maxPrice: parseNumber(params.get("maxPrice"), 100000),
      sort: params.get("sort") ?? "newest",
    }),
    [params],
  );

  useEffect(() => {
    setSearchQuery(params.get("search") ?? "");
    setSelectedMake(params.get("make") ?? "all");
    setSelectedType(params.get("type") ?? "all");
    setPriceRange([parseNumber(params.get("minPrice"), 0), parseNumber(params.get("maxPrice"), 100000)]);
    setSort(params.get("sort") ?? "newest");
  }, [params]);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    getVehicles(activeFilters).then((list) => {
      if (mounted) {
        setVehicles(list);
        setVisibleCount(6);
        setLoading(false);
      }
    });
    return () => {
      mounted = false;
    };
  }, [activeFilters]);

  const applyFilters = (event?: FormEvent) => {
    event?.preventDefault();
    const next = new URLSearchParams();
    if (searchQuery.trim()) next.set("search", searchQuery.trim());
    if (selectedMake !== "all") next.set("make", selectedMake);
    if (selectedType !== "all") next.set("type", selectedType);
    if (priceRange[0] > 0) next.set("minPrice", String(priceRange[0]));
    if (priceRange[1] < 100000) next.set("maxPrice", String(priceRange[1]));
    if (sort !== "newest") next.set("sort", sort);
    setParams(next);
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedMake("all");
    setSelectedType("all");
    setPriceRange([0, 100000]);
    setSort("newest");
    setParams(new URLSearchParams());
  };

  const visibleVehicles = vehicles.slice(0, visibleCount);

  return (
    <Layout>
      <section className="pt-12 pb-8 bg-gradient-to-b from-card to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">
              New Jersey <span className="text-primary">Inventory Desk</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Compare broker-sourced lease and purchase options from partner dealers without stepping into a showroom.
            </p>
          </div>
        </div>
      </section>

      <section className="py-8 bg-background">
        <div className="container mx-auto px-4">
          <form onSubmit={applyFilters} className="flex flex-col lg:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Search by make, model, stock number, or city..."
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                className="pl-12 h-12 bg-card border-border"
              />
            </div>
            <div className="flex flex-wrap gap-3">
              <Button type="submit" className="h-12 bg-primary text-primary-foreground">
                Search
              </Button>
              <Button type="button" variant="outline" className="h-12 gap-2" onClick={() => setShowFilters(!showFilters)}>
                <Filter className="h-4 w-4" />
                Filters
              </Button>
              <div className="flex border border-border rounded-lg overflow-hidden">
                <button
                  type="button"
                  aria-label="Grid view"
                  onClick={() => setViewMode("grid")}
                  className={`p-3 ${viewMode === "grid" ? "bg-primary text-primary-foreground" : "bg-card text-muted-foreground hover:text-foreground"}`}
                >
                  <Grid className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  aria-label="List view"
                  onClick={() => setViewMode("list")}
                  className={`p-3 ${viewMode === "list" ? "bg-primary text-primary-foreground" : "bg-card text-muted-foreground hover:text-foreground"}`}
                >
                  <List className="h-5 w-5" />
                </button>
              </div>
            </div>
          </form>

          {showFilters && (
            <div className="glass-card rounded-xl p-6 mb-8 animate-fade-in">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div>
                  <label className="text-sm font-medium mb-2 block">Make</label>
                  <Select value={selectedMake} onValueChange={setSelectedMake}>
                    <SelectTrigger className="bg-secondary border-border">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Makes</SelectItem>
                      {vehicleMakes.map((make) => (
                        <SelectItem key={make} value={make}>
                          {make}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Vehicle Type</label>
                  <Select value={selectedType} onValueChange={setSelectedType}>
                    <SelectTrigger className="bg-secondary border-border">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {vehicleTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="md:col-span-2">
                  <label className="text-sm font-medium mb-2 block">
                    Price Range: ${priceRange[0].toLocaleString()} - ${priceRange[1].toLocaleString()}
                  </label>
                  <Slider value={priceRange} onValueChange={setPriceRange} max={100000} step={2500} className="mt-4" />
                </div>
              </div>
              <div className="flex flex-wrap gap-3 mt-6">
                <Button type="button" onClick={() => applyFilters()} className="bg-primary text-primary-foreground">
                  Apply Filters
                </Button>
                <Button type="button" variant="outline" onClick={clearFilters} className="gap-2">
                  <X className="h-4 w-4" />
                  Clear
                </Button>
              </div>
            </div>
          )}

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <p className="text-muted-foreground">
              {loading ? "Loading inventory..." : "Showing "}
              {!loading && <span className="text-foreground font-medium">{vehicles.length}</span>} vehicles
            </p>
            <Select
              value={sort}
              onValueChange={(value) => {
                setSort(value);
                const next = new URLSearchParams(params);
                if (value === "newest") next.delete("sort");
                else next.set("sort", value);
                setParams(next);
              }}
            >
              <SelectTrigger className="w-full sm:w-48 bg-card border-border">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="mileage">Lowest Mileage</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {!loading && vehicles.length === 0 && (
            <div className="text-center py-16 glass-card rounded-2xl">
              <h2 className="text-2xl font-display font-bold mb-2">No matching vehicles</h2>
              <p className="text-muted-foreground mb-6">Try a wider price range or request a custom broker quote.</p>
              <Link to="/contact">
                <Button className="bg-primary text-primary-foreground">Request a Custom Quote</Button>
              </Link>
            </div>
          )}

          <div className={`grid gap-6 ${viewMode === "grid" ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"}`}>
            {visibleVehicles.map((car) => (
              <div
                key={car.id}
                className={`group glass-card rounded-2xl overflow-hidden luxury-border transition-all duration-500 hover:gold-glow ${
                  viewMode === "list" ? "md:flex" : ""
                }`}
              >
                <div className={`relative overflow-hidden ${viewMode === "list" ? "md:w-80 flex-shrink-0 aspect-[4/3]" : "aspect-[4/3]"}`}>
                  <img
                    src={car.image}
                    alt={car.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent" />
                  <div className="absolute top-4 left-4 flex gap-2">
                    {car.featured && <Badge className="bg-primary text-primary-foreground">Featured</Badge>}
                    {car.monthlyPayment && <Badge variant="secondary">${car.monthlyPayment}/mo est.</Badge>}
                  </div>
                  <button
                    type="button"
                    aria-label={`Save ${car.title}`}
                    className="absolute top-4 right-4 p-2 rounded-full bg-background/50 backdrop-blur-sm border border-border/50 text-foreground/70 hover:text-primary hover:border-primary/50 transition-colors"
                  >
                    <Heart className="h-5 w-5" />
                  </button>
                </div>

                <div className="p-6 flex-1">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                        {car.title}
                      </h3>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="h-3.5 w-3.5" />
                        {car.location}
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-4 mb-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="h-4 w-4 text-primary" />
                      {car.year}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Gauge className="h-4 w-4 text-primary" />
                      {car.mileage.toLocaleString()} mi
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <span className="text-sm text-muted-foreground">Price</span>
                      <div className="text-2xl font-display font-bold text-primary">${car.price.toLocaleString()}</div>
                    </div>
                    <Link to={`/vehicle/${car.slug}`}>
                      <Button variant="outline" size="sm" className="border-primary/30 hover:bg-primary hover:text-primary-foreground">
                        View Details
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {visibleCount < vehicles.length && (
            <div className="text-center mt-12">
              <Button
                type="button"
                variant="outline"
                size="lg"
                onClick={() => setVisibleCount((count) => count + 6)}
                className="border-primary/30 hover:bg-primary hover:text-primary-foreground"
              >
                Load More Vehicles
              </Button>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Inventory;
