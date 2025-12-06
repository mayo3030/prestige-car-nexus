import { Link } from "react-router-dom";
import { ArrowRight, Heart, Gauge, Calendar, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

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
  goodRate?: boolean;
}

const featuredCars: Car[] = [
  {
    id: "1",
    title: "2017 Hyundai Tucson SUV",
    make: "Hyundai",
    model: "Tucson",
    year: 2017,
    price: 18500,
    mileage: 45000,
    location: "New Jersey",
    image: "https://images.unsplash.com/photo-1633695634169-2df5c9b41b86?q=80&w=2671",
    featured: true,
  },
  {
    id: "2",
    title: "2019 Toyota Camry SE",
    make: "Toyota",
    model: "Camry",
    year: 2019,
    price: 22900,
    mileage: 38000,
    location: "New Jersey",
    image: "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?q=80&w=2670",
    goodRate: true,
  },
  {
    id: "3",
    title: "2020 Honda Accord Sport",
    make: "Honda",
    model: "Accord",
    year: 2020,
    price: 26500,
    mileage: 28000,
    location: "New Jersey",
    image: "https://images.unsplash.com/photo-1606611013016-969c19ba27bb?q=80&w=2574",
  },
  {
    id: "4",
    title: "2018 BMW 3 Series",
    make: "BMW",
    model: "3 Series",
    year: 2018,
    price: 28900,
    mileage: 52000,
    location: "New Jersey",
    image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?q=80&w=2670",
    featured: true,
  },
  {
    id: "5",
    title: "2021 Kia Seltos LX",
    make: "Kia",
    model: "Seltos",
    year: 2021,
    price: 24200,
    mileage: 19000,
    location: "New Jersey",
    image: "https://images.unsplash.com/photo-1609521263047-f8f205293f24?q=80&w=2580",
    goodRate: true,
  },
  {
    id: "6",
    title: "2019 Mazda CX-5 Touring",
    make: "Mazda",
    model: "CX-5",
    year: 2019,
    price: 25800,
    mileage: 35000,
    location: "New Jersey",
    image: "https://images.unsplash.com/photo-1612544448445-b8232cff3b6c?q=80&w=2574",
  },
];

function CarCard({ car }: { car: Car }) {
  return (
    <div className="group relative glass-card rounded-2xl overflow-hidden luxury-border transition-all duration-500 card-hover">
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
          {car.goodRate && (
            <Badge variant="secondary" className="bg-cyan text-background">
              Good Rate
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
            <Button variant="outline" size="sm" className="gap-1.5 border-primary/30 hover:bg-primary hover:text-primary-foreground rounded-full">
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
              Wholesale Pricing on All Makes/Models
            </h2>
            <p className="text-muted-foreground mt-2 max-w-xl">
              Browse our selection of quality vehicles with free home delivery. 
              Never step foot into a dealership!
            </p>
          </div>
          <Link to="/inventory">
            <Button variant="outline" className="gap-2 border-primary/30 hover:bg-primary hover:text-primary-foreground rounded-full">
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
