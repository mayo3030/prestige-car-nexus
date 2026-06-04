import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Heart,
  Share2,
  MapPin,
  Calendar,
  Gauge,
  Fuel,
  Settings,
  Shield,
  Phone,
  Mail,
  ChevronLeft,
  ChevronRight,
  Check,
  FileText,
  Truck,
  Fuel as FuelIcon,
  Car,
} from "lucide-react";
import { getCarById, initCarStore } from "@/lib/carStore";

const VehicleDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [currentImage, setCurrentImage] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);

  initCarStore();
  const vehicle = id ? getCarById(id) : null;

  const allImages = vehicle?.images?.length ? vehicle.images : vehicle?.image ? [vehicle.image] : [];
  const hasMultipleImages = allImages.length > 1;

  const nextImage = () => {
    if (!hasMultipleImages) return;
    setCurrentImage((prev) => (prev + 1) % allImages.length);
  };

  const prevImage = () => {
    if (!hasMultipleImages) return;
    setCurrentImage((prev) => (prev - 1 + allImages.length) % allImages.length);
  };

  if (!vehicle) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-24 text-center">
          <Car className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
          <h1 className="text-4xl font-display font-bold mb-4">Vehicle Not Found</h1>
          <p className="text-muted-foreground mb-8">
            The vehicle listing #{id} does not exist or is no longer available.
          </p>
          <Link to="/inventory">
            <Button>Browse Inventory</Button>
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="bg-background">
        <div className="container mx-auto px-4 py-8">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
            <Link to="/" className="hover:text-primary">Home</Link>
            <span>/</span>
            <Link to="/inventory" className="hover:text-primary">Inventory</Link>
            <span>/</span>
            <span className="text-foreground">{vehicle.title}</span>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Images & Details */}
            <div className="lg:col-span-2">
              {/* Image Gallery */}
              <div className="relative rounded-2xl overflow-hidden mb-4">
                <div className="aspect-[16/10] bg-black/40">
                  <img
                    src={allImages[currentImage]}
                    alt={vehicle.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "https://placehold.co/800x500/1a1a1a/ffffff?text=No+Image";
                    }}
                  />
                </div>
                {hasMultipleImages && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-background/80 backdrop-blur-sm border border-border hover:bg-background transition-colors"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-background/80 backdrop-blur-sm border border-border hover:bg-background transition-colors"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  </>
                )}
                <div className="absolute top-4 left-4 flex gap-2">
                  {vehicle.featured && <Badge className="bg-gradient-to-r from-champagne to-gold text-black border-0">Featured</Badge>}
                  {vehicle.auction && <Badge className="bg-red-500/90 text-white border-0">Live Auction</Badge>}
                </div>
              </div>

              {/* Thumbnail Gallery */}
              {hasMultipleImages && (
                <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
                  {allImages.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentImage(idx)}
                      className={`flex-shrink-0 w-24 h-16 rounded-lg overflow-hidden border-2 transition-colors ${
                        currentImage === idx ? "border-primary" : "border-transparent hover:border-primary/50"
                      }`}
                    >
                      <img
                        src={img}
                        alt=""
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = "https://placehold.co/160x100/1a1a1a/ffffff?text=N/A";
                        }}
                      />
                    </button>
                  ))}
                </div>
              )}

              {/* Details Tabs */}
              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="w-full justify-start bg-card border border-border mb-6">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  {vehicle.features?.length > 0 && <TabsTrigger value="features">Features</TabsTrigger>}
                </TabsList>

                <TabsContent value="overview" className="space-y-6">
                  {/* Description */}
                  {vehicle.description && (
                    <div className="glass-card rounded-2xl p-6">
                      <h2 className="text-xl font-semibold mb-4">Description</h2>
                      <p className="text-muted-foreground whitespace-pre-line">
                        {vehicle.description}
                      </p>
                    </div>
                  )}

                  {/* Specifications */}
                  <div className="glass-card rounded-2xl p-6">
                    <h2 className="text-xl font-semibold mb-4">Specifications</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {[
                        ...(vehicle.engine ? [{ label: "Engine", value: vehicle.engine }] : []),
                        ...(vehicle.horsepower ? [{ label: "Horsepower", value: vehicle.horsepower }] : []),
                        ...(vehicle.transmission ? [{ label: "Transmission", value: vehicle.transmission }] : []),
                        ...(vehicle.drivetrain ? [{ label: "Drivetrain", value: vehicle.drivetrain }] : []),
                        ...(vehicle.exteriorColor ? [{ label: "Exterior Color", value: vehicle.exteriorColor }] : []),
                        ...(vehicle.interiorColor ? [{ label: "Interior Color", value: vehicle.interiorColor }] : []),
                        ...(vehicle.fuelType ? [{ label: "Fuel Type", value: vehicle.fuelType }] : []),
                        ...(vehicle.bodyStyle ? [{ label: "Body Style", value: vehicle.bodyStyle }] : []),
                        ...(vehicle.mpg ? [{ label: "MPG", value: vehicle.mpg }] : []),
                      ].map((spec) => (
                        <div key={spec.label} className="p-4 rounded-xl bg-secondary/50">
                          <div className="text-xs text-muted-foreground mb-1">{spec.label}</div>
                          <div className="font-medium">{spec.value}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>

                {vehicle.features?.length > 0 && (
                  <TabsContent value="features">
                    <div className="glass-card rounded-2xl p-6">
                      <h2 className="text-xl font-semibold mb-4">Features & Options</h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {vehicle.features.map((feature) => (
                          <div key={feature} className="flex items-center gap-3">
                            <Check className="h-5 w-5 text-primary flex-shrink-0" />
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </TabsContent>
                )}
              </Tabs>

              {/* VIN + History Info */}
              <div className="glass-card rounded-2xl p-6 mt-6">
                <div className="flex items-center gap-3 mb-4">
                  <Shield className="h-5 w-5 text-primary" />
                  <h3 className="font-semibold">Vehicle Information</h3>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {vehicle.vin && (
                    <div>
                      <div className="text-xs text-muted-foreground mb-0.5">VIN</div>
                      <div className="text-sm font-medium font-mono">{vehicle.vin}</div>
                    </div>
                  )}
                  <div>
                    <div className="text-xs text-muted-foreground mb-0.5">Year</div>
                    <div className="text-sm font-medium">{vehicle.year}</div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground mb-0.5">Mileage</div>
                    <div className="text-sm font-medium">{vehicle.mileage.toLocaleString()} mi</div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground mb-0.5">Location</div>
                    <div className="text-sm font-medium">{vehicle.location}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Pricing & Actions */}
            <div className="lg:col-span-1">
              <div className="sticky top-28">
                {/* Price Card */}
                <div className="glass-card rounded-2xl p-6 mb-6 gold-glow">
                  <div className="flex items-center justify-between mb-4">
                    <h1 className="text-2xl font-display font-bold">{vehicle.title}</h1>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setIsWishlisted(!isWishlisted)}
                        className={`p-2 rounded-full border transition-colors ${
                          isWishlisted
                            ? "bg-primary text-primary-foreground border-primary"
                            : "border-border hover:border-primary"
                        }`}
                      >
                        <Heart className={`h-5 w-5 ${isWishlisted ? "fill-current" : ""}`} />
                      </button>
                      <button className="p-2 rounded-full border border-border hover:border-primary transition-colors">
                        <Share2 className="h-5 w-5" />
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-3 mb-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1.5">
                      <MapPin className="h-4 w-4 text-primary" />
                      {vehicle.location}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Calendar className="h-4 w-4 text-primary" />
                      {vehicle.year}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Gauge className="h-4 w-4 text-primary" />
                      {vehicle.mileage.toLocaleString()} mi
                    </div>
                  </div>

                  <div className="mb-6">
                    <span className="text-sm text-muted-foreground">Price</span>
                    <div className="text-4xl font-display font-bold text-primary">
                      ${vehicle.price.toLocaleString()}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 gap-2">
                      <Phone className="h-4 w-4" />
                      Contact Seller
                    </Button>
                    <Button variant="outline" className="w-full gap-2">
                      <Mail className="h-4 w-4" />
                      Request More Info
                    </Button>
                    <Link to="/financing" className="block">
                      <Button variant="outline" className="w-full gap-2">
                        Calculate Payments
                      </Button>
                    </Link>
                  </div>
                </div>

                {/* Seller Info */}
                <div className="glass-card rounded-2xl p-6 mb-6">
                  <h3 className="font-semibold mb-4">Seller Information</h3>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <Settings className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <div className="font-medium">Jersey Auto Lease</div>
                      <div className="text-sm text-muted-foreground">
                        Newark, NJ
                      </div>
                    </div>
                  </div>
                  <Badge variant="secondary" className="mb-4">Verified Dealer</Badge>
                </div>

                {/* Shipping */}
                <div className="glass-card rounded-2xl p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <Truck className="h-5 w-5 text-primary" />
                    <h3 className="font-semibold">Free Delivery</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Free home delivery across New Jersey and surrounding states. Enclosed transport available nationwide on request.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default VehicleDetail;
