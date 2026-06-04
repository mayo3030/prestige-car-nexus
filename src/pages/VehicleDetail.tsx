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
} from "lucide-react";

const vehicleData = {
  id: "1",
  title: "Ferrari SF90 Stradale",
  make: "Ferrari",
  model: "SF90 Stradale",
  year: 2023,
  price: 825000,
  mileage: 1200,
  location: "Beverly Hills, CA",
  vin: "WBAWL73589P123456",
  exteriorColor: "Rosso Corsa",
  interiorColor: "Nero Leather",
  transmission: "8-Speed Dual-Clutch",
  fuelType: "Hybrid",
  engine: "4.0L Twin-Turbo V8 + 3 Electric Motors",
  horsepower: "986 hp",
  drivetrain: "All-Wheel Drive",
  images: [
    "https://images.unsplash.com/photo-1592198084033-aade902d1aae?q=80&w=2670",
    "https://images.unsplash.com/photo-1583121274602-3e2820c69888?q=80&w=2670",
    "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?q=80&w=2574",
    "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=2670",
  ],
  description: `This stunning Ferrari SF90 Stradale represents the pinnacle of Ferrari's engineering excellence. The first series-production PHEV (Plug-in Hybrid Electric Vehicle) from Maranello, it combines a turbocharged V8 with three electric motors to produce an astounding 986 horsepower.

Finished in the iconic Rosso Corsa exterior with a beautifully appointed Nero leather interior, this example has been meticulously maintained with full service history at authorized Ferrari dealers.

The SF90 Stradale features Ferrari's most advanced aerodynamics, including the innovative shut-off Gurney and active front vents, contributing to 390kg of downforce at 250 km/h. The interior showcases Ferrari's new HMI concept with a 16" curved HD screen and touch-sensitive steering wheel controls.`,
  features: [
    "Carbon Fiber Racing Seats",
    "Full Carbon Fiber Interior Package",
    "Assetto Fiorano Package",
    "Front Lifting System",
    "Racing Stripe in Nero",
    "Yellow Brake Calipers",
    "360° Parking Cameras",
    "Premium JBL Audio System",
    "Titanium Exhaust System",
    "20\" Forged Wheels",
  ],
  historyReports: {
    accidents: 0,
    owners: 1,
    serviceRecords: 8,
    titleStatus: "Clean",
  },
  seller: {
    name: "Prestige Motors Beverly Hills",
    type: "Dealer",
    rating: 4.9,
    reviews: 234,
    phone: "+1 (310) 555-0123",
    email: "sales@prestigemotors.com",
  },
};

const vehicles: Record<string, typeof vehicleData> = {
  [vehicleData.id]: vehicleData,
};

const VehicleDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [currentImage, setCurrentImage] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const vehicle = id ? (vehicles[id] ?? null) : null;

  const nextImage = () => {
    if (!vehicle) return;
    setCurrentImage((prev) => (prev + 1) % vehicle.images.length);
  };

  const prevImage = () => {
    if (!vehicle) return;
    setCurrentImage((prev) => (prev - 1 + vehicle.images.length) % vehicle.images.length);
  };

  if (!vehicle) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-24 text-center">
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
                <div className="aspect-[16/10]">
                  <img
                    src={vehicle.images[currentImage]}
                    alt={vehicle.title}
                    className="w-full h-full object-cover"
                  />
                </div>
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
                <div className="absolute top-4 left-4">
                  <Badge className="bg-primary text-primary-foreground">Featured</Badge>
                </div>
              </div>

              {/* Thumbnail Gallery */}
              <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
                {vehicle.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentImage(idx)}
                    className={`flex-shrink-0 w-24 h-16 rounded-lg overflow-hidden border-2 transition-colors ${
                      currentImage === idx ? "border-primary" : "border-transparent hover:border-primary/50"
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>

              {/* Details Tabs */}
              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="w-full justify-start bg-card border border-border mb-6">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="features">Features</TabsTrigger>
                  <TabsTrigger value="history">History Report</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-6">
                  <div className="glass-card rounded-2xl p-6">
                    <h2 className="text-xl font-semibold mb-4">Description</h2>
                    <p className="text-muted-foreground whitespace-pre-line">
                      {vehicle.description}
                    </p>
                  </div>

                  <div className="glass-card rounded-2xl p-6">
                    <h2 className="text-xl font-semibold mb-4">Specifications</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {[
                        { label: "Engine", value: vehicle.engine },
                        { label: "Horsepower", value: vehicle.horsepower },
                        { label: "Transmission", value: vehicle.transmission },
                        { label: "Drivetrain", value: vehicle.drivetrain },
                        { label: "Exterior Color", value: vehicle.exteriorColor },
                        { label: "Interior Color", value: vehicle.interiorColor },
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

                <TabsContent value="history">
                  <div className="glass-card rounded-2xl p-6">
                    <div className="flex items-center gap-3 mb-6">
                      <Shield className="h-6 w-6 text-primary" />
                      <h2 className="text-xl font-semibold">Vehicle History Report</h2>
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
                    <Button variant="outline" className="w-full mt-6 gap-2">
                      <FileText className="h-4 w-4" />
                      View Full Report
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
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
                      <div className="font-medium">{vehicle.seller.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {vehicle.seller.rating} ★ ({vehicle.seller.reviews} reviews)
                      </div>
                    </div>
                  </div>
                  <Badge variant="secondary" className="mb-4">Verified {vehicle.seller.type}</Badge>
                </div>

                {/* Shipping */}
                <div className="glass-card rounded-2xl p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <Truck className="h-5 w-5 text-primary" />
                    <h3 className="font-semibold">Shipping Available</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Enclosed transport available worldwide. Contact us for a custom quote.
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
