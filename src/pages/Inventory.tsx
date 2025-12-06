import { useState } from "react";
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
import { Search, Filter, Grid, List, Heart, Gauge, Calendar, MapPin, X } from "lucide-react";

interface Car {
  id: string;
  title: string;
  make: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  location: string;
  image: string;
  featured?: boolean;
  auction?: boolean;
  transmission: string;
  fuelType: string;
}

const allCars: Car[] = [
  {
    id: "1",
    title: "Ferrari SF90 Stradale",
    make: "Ferrari",
    model: "SF90 Stradale",
    year: 2023,
    price: 825000,
    mileage: 1200,
    location: "Beverly Hills, CA",
    image: "https://images.unsplash.com/photo-1592198084033-aade902d1aae?q=80&w=2670",
    featured: true,
    transmission: "Automatic",
    fuelType: "Hybrid",
  },
  {
    id: "2",
    title: "Lamborghini Huracán EVO",
    make: "Lamborghini",
    model: "Huracán EVO",
    year: 2022,
    price: 389000,
    mileage: 3500,
    location: "Miami, FL",
    image: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?q=80&w=2574",
    transmission: "Automatic",
    fuelType: "Petrol",
  },
  {
    id: "3",
    title: "Porsche 911 GT3 RS",
    make: "Porsche",
    model: "911 GT3 RS",
    year: 2024,
    price: 295000,
    mileage: 850,
    location: "New York, NY",
    image: "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?q=80&w=2670",
    auction: true,
    transmission: "Manual",
    fuelType: "Petrol",
  },
  {
    id: "4",
    title: "Rolls-Royce Phantom",
    make: "Rolls-Royce",
    model: "Phantom",
    year: 2023,
    price: 475000,
    mileage: 2100,
    location: "Las Vegas, NV",
    image: "https://images.unsplash.com/photo-1563720360172-67b8f3dce741?q=80&w=2574",
    transmission: "Automatic",
    fuelType: "Petrol",
  },
  {
    id: "5",
    title: "McLaren 720S Spider",
    make: "McLaren",
    model: "720S Spider",
    year: 2022,
    price: 345000,
    mileage: 4200,
    location: "Scottsdale, AZ",
    image: "https://images.unsplash.com/photo-1621135802920-133df287f89c?q=80&w=2574",
    transmission: "Automatic",
    fuelType: "Petrol",
  },
  {
    id: "6",
    title: "Bentley Continental GT",
    make: "Bentley",
    model: "Continental GT",
    year: 2023,
    price: 265000,
    mileage: 1800,
    location: "Chicago, IL",
    image: "https://images.unsplash.com/photo-1580274455191-1c62238fa333?q=80&w=2564",
    featured: true,
    transmission: "Automatic",
    fuelType: "Petrol",
  },
  {
    id: "7",
    title: "Aston Martin DBS Superleggera",
    make: "Aston Martin",
    model: "DBS Superleggera",
    year: 2022,
    price: 335000,
    mileage: 2800,
    location: "San Francisco, CA",
    image: "https://images.unsplash.com/photo-1596468138838-6c1a59d39f8d?q=80&w=2574",
    transmission: "Automatic",
    fuelType: "Petrol",
  },
  {
    id: "8",
    title: "Bugatti Chiron Sport",
    make: "Bugatti",
    model: "Chiron Sport",
    year: 2021,
    price: 3250000,
    mileage: 500,
    location: "Monaco",
    image: "https://images.unsplash.com/photo-1566024164372-0281f1133aa6?q=80&w=2574",
    featured: true,
    transmission: "Automatic",
    fuelType: "Petrol",
  },
];

const makes = ["All Makes", "Ferrari", "Lamborghini", "Porsche", "Rolls-Royce", "Bentley", "McLaren", "Aston Martin", "Bugatti"];

const Inventory = () => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMake, setSelectedMake] = useState("All Makes");
  const [priceRange, setPriceRange] = useState([0, 5000000]);
  const [showFilters, setShowFilters] = useState(false);

  const filteredCars = allCars.filter((car) => {
    const matchesSearch = car.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      car.make.toLowerCase().includes(searchQuery.toLowerCase()) ||
      car.model.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesMake = selectedMake === "All Makes" || car.make === selectedMake;
    const matchesPrice = car.price >= priceRange[0] && car.price <= priceRange[1];
    return matchesSearch && matchesMake && matchesPrice;
  });

  return (
    <Layout>
      {/* Hero */}
      <section className="pt-12 pb-8 bg-gradient-to-b from-card to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">
              Explore Our <span className="text-primary">Collection</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Browse through our meticulously curated inventory of the world's most prestigious automobiles.
            </p>
          </div>
        </div>
      </section>

      {/* Filters & Content */}
      <section className="py-8 bg-background">
        <div className="container mx-auto px-4">
          {/* Search Bar */}
          <div className="flex flex-col lg:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Search by make, model, or keyword..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-12 bg-card border-border"
              />
            </div>
            <div className="flex gap-3">
              <Button
                variant="outline"
                className="h-12 gap-2"
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter className="h-4 w-4" />
                Filters
              </Button>
              <div className="flex border border-border rounded-lg overflow-hidden">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-3 ${viewMode === "grid" ? "bg-primary text-primary-foreground" : "bg-card text-muted-foreground hover:text-foreground"}`}
                >
                  <Grid className="h-5 w-5" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-3 ${viewMode === "list" ? "bg-primary text-primary-foreground" : "bg-card text-muted-foreground hover:text-foreground"}`}
                >
                  <List className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Expanded Filters */}
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
                      {makes.map((make) => (
                        <SelectItem key={make} value={make}>
                          {make}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Year</label>
                  <Select>
                    <SelectTrigger className="bg-secondary border-border">
                      <SelectValue placeholder="All Years" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Years</SelectItem>
                      <SelectItem value="2024">2024</SelectItem>
                      <SelectItem value="2023">2023</SelectItem>
                      <SelectItem value="2022">2022</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="md:col-span-2">
                  <label className="text-sm font-medium mb-2 block">
                    Price Range: ${priceRange[0].toLocaleString()} - ${priceRange[1].toLocaleString()}
                  </label>
                  <Slider
                    value={priceRange}
                    onValueChange={setPriceRange}
                    max={5000000}
                    step={50000}
                    className="mt-4"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Results Count */}
          <div className="flex items-center justify-between mb-6">
            <p className="text-muted-foreground">
              Showing <span className="text-foreground font-medium">{filteredCars.length}</span> vehicles
            </p>
            <Select defaultValue="newest">
              <SelectTrigger className="w-48 bg-card border-border">
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

          {/* Cars Grid */}
          <div className={`grid gap-6 ${viewMode === "grid" ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"}`}>
            {filteredCars.map((car) => (
              <div
                key={car.id}
                className={`group glass-card rounded-2xl overflow-hidden luxury-border transition-all duration-500 hover:gold-glow ${
                  viewMode === "list" ? "flex" : ""
                }`}
              >
                {/* Image */}
                <div className={`relative overflow-hidden ${viewMode === "list" ? "w-80 flex-shrink-0" : "aspect-[4/3]"}`}>
                  <img
                    src={car.image}
                    alt={car.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent" />
                  
                  <div className="absolute top-4 left-4 flex gap-2">
                    {car.featured && (
                      <Badge className="bg-primary text-primary-foreground">Featured</Badge>
                    )}
                    {car.auction && (
                      <Badge variant="secondary" className="bg-destructive/90 text-destructive-foreground">
                        Live Auction
                      </Badge>
                    )}
                  </div>

                  <button className="absolute top-4 right-4 p-2 rounded-full bg-background/50 backdrop-blur-sm border border-border/50 text-foreground/70 hover:text-primary hover:border-primary/50 transition-colors">
                    <Heart className="h-5 w-5" />
                  </button>
                </div>

                {/* Content */}
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

                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-sm text-muted-foreground">Price</span>
                      <div className="text-2xl font-display font-bold text-primary">
                        ${car.price.toLocaleString()}
                      </div>
                    </div>
                    <Link to={`/vehicle/${car.id}`}>
                      <Button variant="outline" size="sm" className="border-primary/30 hover:bg-primary hover:text-primary-foreground">
                        View Details
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-12">
            <Button variant="outline" size="lg" className="border-primary/30 hover:bg-primary hover:text-primary-foreground">
              Load More Vehicles
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Inventory;
