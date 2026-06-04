import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  Calendar,
  Check,
  ChevronLeft,
  ChevronRight,
  FileText,
  Fuel,
  Gauge,
  Heart,
  Mail,
  MapPin,
  Phone,
  Settings,
  Share2,
  Shield,
  Truck,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Layout } from "@/components/layout/Layout";
import { getVehicleById } from "@/lib/repository";
import type { Vehicle } from "@/lib/business-data";

const VehicleDetail = () => {
  const { id } = useParams();
  const [vehicle, setVehicle] = useState<Vehicle | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentImage, setCurrentImage] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    if (!id) {
      setVehicle(null);
      setLoading(false);
      return;
    }

    getVehicleById(id).then((record) => {
      if (mounted) {
        setVehicle(record);
        setCurrentImage(0);
        setLoading(false);
      }
    });

    return () => {
      mounted = false;
    };
  }, [id]);

  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-20 text-center text-muted-foreground">Loading vehicle details...</div>
      </Layout>
    );
  }

  if (!vehicle) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-4xl font-display font-bold mb-4">Vehicle not found</h1>
          <Link to="/inventory">
            <Button variant="outline">Back to Inventory</Button>
          </Link>
        </div>
      </Layout>
    );
  }

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % vehicle.images.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + vehicle.images.length) % vehicle.images.length);
  };

  const contactUrl = `/contact?vehicle=${encodeURIComponent(vehicle.title)}&subject=buying`;

  return (
    <Layout>
      <div className="bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
            <Link to="/" className="hover:text-primary">
              Home
            </Link>
            <span>/</span>
            <Link to="/inventory" className="hover:text-primary">
              Inventory
            </Link>
            <span>/</span>
            <span className="text-foreground">{vehicle.title}</span>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="relative rounded-2xl overflow-hidden mb-4">
                <div className="aspect-[16/10]">
                  <img src={vehicle.images[currentImage]} alt={vehicle.title} className="w-full h-full object-cover" />
                </div>
                <button
                  type="button"
                  aria-label="Previous image"
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-background/80 backdrop-blur-sm border border-border hover:bg-background transition-colors"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  aria-label="Next image"
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-background/80 backdrop-blur-sm border border-border hover:bg-background transition-colors"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
                <div className="absolute top-4 left-4 flex gap-2">
                  {vehicle.featured && <Badge className="bg-primary text-primary-foreground">Featured</Badge>}
                  <Badge variant="secondary">{vehicle.stockNumber}</Badge>
                </div>
              </div>

              <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
                {vehicle.images.map((img, index) => (
                  <button
                    key={img}
                    type="button"
                    aria-label={`Show image ${index + 1}`}
                    onClick={() => setCurrentImage(index)}
                    className={`flex-shrink-0 w-24 h-16 rounded-lg overflow-hidden border-2 transition-colors ${
                      currentImage === index ? "border-primary" : "border-transparent hover:border-primary/50"
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>

              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="w-full justify-start bg-card border border-border mb-6 overflow-x-auto">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="features">Features</TabsTrigger>
                  <TabsTrigger value="history">History Report</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-6">
                  <div className="glass-card rounded-2xl p-6">
                    <h2 className="text-xl font-semibold mb-4">Description</h2>
                    <p className="text-muted-foreground whitespace-pre-line">{vehicle.description}</p>
                  </div>

                  <div className="glass-card rounded-2xl p-6">
                    <h2 className="text-xl font-semibold mb-4">Specifications</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                      {[
                        { label: "Transmission", value: vehicle.transmission },
                        { label: "Fuel Type", value: vehicle.fuelType, icon: Fuel },
                        { label: "Drivetrain", value: vehicle.drivetrain ?? "Ask broker" },
                        { label: "Exterior Color", value: vehicle.exteriorColor ?? "Ask broker" },
                        { label: "Interior Color", value: vehicle.interiorColor ?? "Ask broker" },
                        { label: "VIN", value: vehicle.vin ?? "Available on request" },
                      ].map((spec) => (
                        <div key={spec.label} className="p-4 rounded-xl bg-secondary/50">
                          <div className="text-xs text-muted-foreground mb-1">{spec.label}</div>
                          <div className="font-medium">{spec.value}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="features">
                  <div className="glass-card rounded-2xl p-6">
                    <h2 className="text-xl font-semibold mb-4">Features & Broker Notes</h2>
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

                <TabsContent value="history">
                  <div className="glass-card rounded-2xl p-6">
                    <div className="flex items-center gap-3 mb-6">
                      <Shield className="h-6 w-6 text-primary" />
                      <h2 className="text-xl font-semibold">Vehicle History Snapshot</h2>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="p-4 rounded-xl bg-secondary/50 text-center">
                        <div className="text-2xl font-bold text-primary">{vehicle.historyReports.accidents}</div>
                        <div className="text-sm text-muted-foreground">Accidents</div>
                      </div>
                      <div className="p-4 rounded-xl bg-secondary/50 text-center">
                        <div className="text-2xl font-bold text-primary">{vehicle.historyReports.owners}</div>
                        <div className="text-sm text-muted-foreground">Previous Owners</div>
                      </div>
                      <div className="p-4 rounded-xl bg-secondary/50 text-center">
                        <div className="text-2xl font-bold text-primary">{vehicle.historyReports.serviceRecords}</div>
                        <div className="text-sm text-muted-foreground">Service Records</div>
                      </div>
                      <div className="p-4 rounded-xl bg-secondary/50 text-center">
                        <div className="text-2xl font-bold text-green-500">{vehicle.historyReports.titleStatus}</div>
                        <div className="text-sm text-muted-foreground">Title Status</div>
                      </div>
                    </div>
                    <Link to="/inspection">
                      <Button variant="outline" className="w-full mt-6 gap-2">
                        <FileText className="h-4 w-4" />
                        View Inspection Process
                      </Button>
                    </Link>
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            <div className="lg:col-span-1">
              <div className="sticky top-28">
                <div className="glass-card rounded-2xl p-6 mb-6 gold-glow">
                  <div className="flex items-center justify-between mb-4">
                    <h1 className="text-2xl font-display font-bold">{vehicle.title}</h1>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        aria-label={isWishlisted ? `Remove ${vehicle.title} from saved vehicles` : `Save ${vehicle.title}`}
                        onClick={() => setIsWishlisted(!isWishlisted)}
                        className={`p-2 rounded-full border transition-colors ${
                          isWishlisted ? "bg-primary text-primary-foreground border-primary" : "border-border hover:border-primary"
                        }`}
                      >
                        <Heart className={`h-5 w-5 ${isWishlisted ? "fill-current" : ""}`} />
                      </button>
                      <button
                        type="button"
                        aria-label={`Share ${vehicle.title}`}
                        className="p-2 rounded-full border border-border hover:border-primary transition-colors"
                      >
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
                    <div className="text-4xl font-display font-bold text-primary">${vehicle.price.toLocaleString()}</div>
                    {vehicle.monthlyPayment && (
                      <p className="text-sm text-muted-foreground mt-1">
                        Est. ${vehicle.monthlyPayment}/mo with ${vehicle.downPayment?.toLocaleString() ?? "custom"} down
                      </p>
                    )}
                  </div>

                  <div className="space-y-3">
                    <Link to={contactUrl} className="block">
                      <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 gap-2">
                        <Phone className="h-4 w-4" />
                        Contact Broker
                      </Button>
                    </Link>
                    <Link to={contactUrl} className="block">
                      <Button variant="outline" className="w-full gap-2">
                        <Mail className="h-4 w-4" />
                        Request More Info
                      </Button>
                    </Link>
                    <Link to={`/financing?vehicle=${encodeURIComponent(vehicle.title)}&price=${vehicle.price}`} className="block">
                      <Button variant="outline" className="w-full gap-2">
                        Calculate Payments
                      </Button>
                    </Link>
                  </div>
                </div>

                <div className="glass-card rounded-2xl p-6 mb-6">
                  <h3 className="font-semibold mb-4">Broker Desk</h3>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <Settings className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <div className="font-medium">Jersey Auto Lease</div>
                      <div className="text-sm text-muted-foreground">New Jersey broker support</div>
                    </div>
                  </div>
                  <Badge variant="secondary" className="mb-4">
                    Verified Broker Process
                  </Badge>
                </div>

                <div className="glass-card rounded-2xl p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <Truck className="h-5 w-5 text-primary" />
                    <h3 className="font-semibold">Home Delivery Available</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Delivery timing is confirmed after approval, paperwork, and final dealer availability.
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
