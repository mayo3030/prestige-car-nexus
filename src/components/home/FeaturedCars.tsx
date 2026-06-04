import { Link } from "react-router-dom";
import { ArrowRight, Heart, Gauge, Calendar, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";
import { Car, getFeaturedCars, initCarStore } from "@/lib/carStore";

function CarCard({ car, index }: { car: Car; index: number }) {
  return (
    <div 
      className="group relative glass-card rounded-2xl overflow-hidden luxury-border transition-all duration-500 card-hover reveal"
      style={{ animationDelay: `${0.1 * index}s` }}
    >
      {/* Glow on hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-t from-champagne/[0.03] to-transparent" />
      </div>

      {/* Image with zoom */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={car.image}
          alt={car.title}
          data-ci-make={car.make}
          data-ci-model={car.model}
          data-ci-year={car.year}
          className="w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-110"
        />
        
        {/* Premium gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
        
        {/* Hover overlay with quick specs */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
          <div className="text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
            <div className="flex items-center gap-3 text-sm">
              <span className="flex items-center gap-1">
                <Calendar className="h-3.5 w-3.5" /> {car.year}
              </span>
              <span className="flex items-center gap-1">
                <Gauge className="h-3.5 w-3.5" /> {car.mileage.toLocaleString()} mi
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="h-3.5 w-3.5" /> {car.location}
              </span>
            </div>
          </div>
        </div>
        
        {/* Badges */}
        <div className="absolute top-4 left-4 flex gap-2">
          {car.featured && (
            <Badge className="bg-gradient-to-r from-champagne to-gold text-black font-medium border-0">
              Featured
            </Badge>
          )}
          {car.goodRate && (
            <Badge className="bg-champagne/20 backdrop-blur-sm text-champagne border border-champagne/30 font-medium">
              Good Rate
            </Badge>
          )}
        </div>

        {/* Wishlist Button */}
        <button className="absolute top-4 right-4 p-2 rounded-full bg-black/30 backdrop-blur-sm border border-white/10 text-white/70 hover:text-champagne hover:border-champagne/50 transition-all duration-300">
          <Heart className="h-5 w-5" />
        </button>
      </div>

      {/* Content */}
      <div className="p-4 md:p-6">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="text-base md:text-lg font-semibold text-foreground group-hover:text-champagne transition-colors duration-300">
              {car.title}
            </h3>
            <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
              <span className="text-champagne/80 font-medium">{car.make}</span>
              <span className="text-white/20">·</span>
              <span>{car.model}</span>
            </div>
            <div className="flex items-center gap-2 text-xs md:text-sm text-muted-foreground mt-1">
              <MapPin className="h-3 w-3 md:h-3.5 md:w-3.5" />
              {car.location}
            </div>
          </div>
        </div>

        {/* Specs */}
        <div className="flex gap-3 md:gap-4 mb-3 md:mb-4 text-xs md:text-sm text-muted-foreground">
          <div className="flex items-center gap-1 md:gap-1.5">
            <Calendar className="h-3.5 w-3.5 md:h-4 md:w-4 text-champagne/70" />
            {car.year}
          </div>
          <div className="flex items-center gap-1 md:gap-1.5">
            <Gauge className="h-3.5 w-3.5 md:h-4 md:w-4 text-champagne/70" />
            {car.mileage.toLocaleString()} mi
          </div>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between pt-3 md:pt-4 border-t border-white/[0.06]">
          <div>
            <span className="text-[10px] md:text-xs text-muted-foreground uppercase tracking-wider">Price</span>
            <div className="text-lg md:text-2xl font-numbers font-bold text-champagne">
              ${car.price.toLocaleString()}
            </div>
          </div>
          <Link to={`/vehicle/${car.id}`}>
            <Button variant="outline" size="sm" className="gap-1.5 border-champagne/30 text-champagne hover:bg-champagne hover:text-black rounded-full transition-all duration-300 text-xs md:text-sm px-3 md:px-4">
              View Details
              <ArrowRight className="h-3 w-3 md:h-4 md:w-4" />
            </Button>
          </Link>
        </div>
      </div>

      {/* Bottom gold accent on hover */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-champagne/40 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
    </div>
  );
}

export function FeaturedCars() {
  const [cars, setCars] = useState<Car[]>([]);

  useEffect(() => {
    initCarStore();
    setCars(getFeaturedCars());
  }, []);

  return (
    <section className="py-12 md:py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 md:gap-6 mb-8 md:mb-12 reveal">
          <div>
            <span className="inline-flex items-center gap-2 text-champagne text-xs md:text-sm font-medium uppercase tracking-[0.15em]">
              <span className="w-6 md:w-8 h-[1px] bg-champagne/50" />
              Featured Collection
              <span className="w-6 md:w-8 h-[1px] bg-champagne/50" />
            </span>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-display font-bold mt-2 md:mt-3">
              Wholesale Pricing on{" "}
              <span className="text-gradient">All Makes &amp; Models</span>
            </h2>
            <p className="text-muted-foreground mt-2 md:mt-3 max-w-xl text-sm md:text-lg">
              Browse our selection of quality vehicles with free home delivery. 
              Never step foot into a dealership!
            </p>
          </div>
          <Link to="/inventory" className="w-full sm:w-auto">
            <Button variant="outline" className="w-full sm:w-auto gap-2 border-champagne/30 text-champagne hover:bg-champagne hover:text-black rounded-full transition-all duration-300 text-sm">
              View All Inventory
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>

        {/* Gold divider */}
        <div className="gold-divider mb-12" />

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cars.map((car, index) => (
            <CarCard key={car.id} car={car} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
