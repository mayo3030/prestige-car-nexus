import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Calendar, Gauge, Heart, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getFeaturedVehicles } from "@/lib/repository";
import type { Vehicle } from "@/lib/business-data";

function CarCard({ car }: { car: Vehicle }) {
  return (
    <div className="group relative glass-card rounded-2xl overflow-hidden luxury-border transition-all duration-500 card-hover">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={car.image}
          alt={car.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent" />
        <div className="absolute top-4 left-4 flex gap-2">
          {car.featured && <Badge className="bg-primary text-primary-foreground">Featured</Badge>}
          {car.monthlyPayment && (
            <Badge variant="secondary" className="bg-cyan text-background">
              ${car.monthlyPayment}/mo est.
            </Badge>
          )}
        </div>
        <button
          type="button"
          aria-label={`Save ${car.title}`}
          className="absolute top-4 right-4 p-2 rounded-full bg-background/50 backdrop-blur-sm border border-border/50 text-foreground/70 hover:text-primary hover:border-primary/50 transition-colors"
        >
          <Heart className="h-5 w-5" />
        </button>
      </div>

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
  const [featuredCars, setFeaturedCars] = useState<Vehicle[]>([]);

  useEffect(() => {
    let mounted = true;
    getFeaturedVehicles(6).then((cars) => {
      if (mounted) setFeaturedCars(cars);
    });
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="text-primary text-sm font-medium uppercase tracking-wider">Featured Lease Desk</span>
            <h2 className="text-3xl md:text-4xl font-display font-bold mt-2">
              Brokered Pricing on New Jersey Inventory
            </h2>
            <p className="text-muted-foreground mt-2 max-w-xl">
              Browse high-demand vehicles with lease and finance support, transparent quote steps, and home delivery.
            </p>
          </div>
          <Link to="/inventory">
            <Button variant="outline" className="gap-2 border-primary/30 hover:bg-primary hover:text-primary-foreground rounded-full">
              View All Inventory
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredCars.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>
      </div>
    </section>
  );
}
