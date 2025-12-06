import { Link } from "react-router-dom";
import { ArrowRight, Heart, Gauge, Calendar, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

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
}

const featuredCars: Car[] = [
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
  },
];

function CarCard({ car }: { car: Car }) {
  return (
    <div className="group relative glass-card rounded-2xl overflow-hidden luxury-border transition-all duration-500 hover:gold-glow">
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={car.image}
          alt={car.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent" />
        
        {/* Badges */}
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

        {/* Wishlist Button */}
        <button className="absolute top-4 right-4 p-2 rounded-full bg-background/50 backdrop-blur-sm border border-border/50 text-foreground/70 hover:text-primary hover:border-primary/50 transition-colors">
          <Heart className="h-5 w-5" />
        </button>
      </div>

      {/* Content */}
      <div className="p-6">
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

        {/* Specs */}
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

        {/* Price */}
        <div className="flex items-center justify-between">
          <div>
            <span className="text-sm text-muted-foreground">Price</span>
            <div className="text-2xl font-display font-bold text-primary">
              ${car.price.toLocaleString()}
            </div>
          </div>
          <Link to={`/vehicle/${car.id}`}>
            <Button variant="outline" size="sm" className="gap-1.5 border-primary/30 hover:bg-primary hover:text-primary-foreground">
              View Details
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export function FeaturedCars() {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="text-primary text-sm font-medium uppercase tracking-wider">
              Featured Collection
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-bold mt-2">
              Exceptional Automobiles
            </h2>
            <p className="text-muted-foreground mt-2 max-w-xl">
              Hand-picked selection of the world's most desirable vehicles, 
              each one meticulously inspected and verified.
            </p>
          </div>
          <Link to="/inventory">
            <Button variant="outline" className="gap-2 border-primary/30 hover:bg-primary hover:text-primary-foreground">
              View All Inventory
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredCars.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>
      </div>
    </section>
  );
}
