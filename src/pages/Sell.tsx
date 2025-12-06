import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Camera, Upload, Check, ArrowRight, Shield, Globe, DollarSign } from "lucide-react";

const makes = ["Ferrari", "Lamborghini", "Porsche", "Rolls-Royce", "Bentley", "McLaren", "Aston Martin", "Bugatti", "Mercedes-Benz", "BMW"];
const years = Array.from({ length: 30 }, (_, i) => (2024 - i).toString());

const Sell = () => {
  const [step, setStep] = useState(1);

  return (
    <Layout>
      {/* Hero */}
      <section className="pt-12 pb-16 bg-gradient-to-b from-card to-background relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        </div>
        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">
              Sell Your <span className="text-primary">Luxury Vehicle</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              List your vehicle with us and reach thousands of qualified buyers worldwide. 
              Our expert team handles everything from photography to final sale.
            </p>
          </div>

          {/* Benefits */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Globe className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Global Reach</h3>
                <p className="text-sm text-muted-foreground">
                  Exposure to verified buyers in 50+ countries
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Secure Transactions</h3>
                <p className="text-sm text-muted-foreground">
                  Protected payments with escrow services
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                <DollarSign className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Best Prices</h3>
                <p className="text-sm text-muted-foreground">
                  Competitive market pricing and negotiation support
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Listing Form */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            {/* Progress Steps */}
            <div className="flex items-center justify-between mb-12">
              {[1, 2, 3].map((s) => (
                <div key={s} className="flex items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-colors ${
                      step >= s
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-muted-foreground"
                    }`}
                  >
                    {step > s ? <Check className="h-5 w-5" /> : s}
                  </div>
                  <span className={`ml-3 text-sm font-medium ${step >= s ? "text-foreground" : "text-muted-foreground"}`}>
                    {s === 1 ? "Vehicle Info" : s === 2 ? "Photos & Details" : "Pricing"}
                  </span>
                  {s < 3 && (
                    <div className={`w-24 h-0.5 mx-4 ${step > s ? "bg-primary" : "bg-secondary"}`} />
                  )}
                </div>
              ))}
            </div>

            {/* Step 1: Vehicle Info */}
            {step === 1 && (
              <div className="glass-card rounded-2xl p-8 animate-fade-in">
                <h2 className="text-2xl font-display font-bold mb-6">Vehicle Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Make *</label>
                    <Select>
                      <SelectTrigger className="bg-secondary border-border">
                        <SelectValue placeholder="Select Make" />
                      </SelectTrigger>
                      <SelectContent>
                        {makes.map((make) => (
                          <SelectItem key={make} value={make.toLowerCase()}>
                            {make}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Model *</label>
                    <Input placeholder="e.g., 911 GT3" className="bg-secondary border-border" />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Year *</label>
                    <Select>
                      <SelectTrigger className="bg-secondary border-border">
                        <SelectValue placeholder="Select Year" />
                      </SelectTrigger>
                      <SelectContent>
                        {years.map((year) => (
                          <SelectItem key={year} value={year}>
                            {year}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Mileage *</label>
                    <Input placeholder="e.g., 12,500" className="bg-secondary border-border" />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">VIN</label>
                    <Input placeholder="Vehicle Identification Number" className="bg-secondary border-border" />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Exterior Color</label>
                    <Input placeholder="e.g., Rosso Corsa" className="bg-secondary border-border" />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Interior Color</label>
                    <Input placeholder="e.g., Black Leather" className="bg-secondary border-border" />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Transmission</label>
                    <Select>
                      <SelectTrigger className="bg-secondary border-border">
                        <SelectValue placeholder="Select Transmission" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="automatic">Automatic</SelectItem>
                        <SelectItem value="manual">Manual</SelectItem>
                        <SelectItem value="dct">Dual-Clutch (DCT)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex justify-end mt-8">
                  <Button onClick={() => setStep(2)} className="bg-primary text-primary-foreground gap-2">
                    Continue
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}

            {/* Step 2: Photos & Details */}
            {step === 2 && (
              <div className="glass-card rounded-2xl p-8 animate-fade-in">
                <h2 className="text-2xl font-display font-bold mb-6">Photos & Details</h2>
                
                {/* Photo Upload */}
                <div className="mb-8">
                  <label className="text-sm font-medium mb-4 block">Vehicle Photos *</label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className="aspect-square rounded-xl border-2 border-dashed border-border hover:border-primary/50 transition-colors flex flex-col items-center justify-center gap-2 cursor-pointer bg-secondary/30"
                      >
                        <Camera className="h-8 w-8 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">Add Photo</span>
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    Upload at least 10 high-quality photos. Exterior, interior, engine bay, and any notable features.
                  </p>
                </div>

                {/* Description */}
                <div className="mb-6">
                  <label className="text-sm font-medium mb-2 block">Description *</label>
                  <Textarea
                    placeholder="Describe your vehicle in detail. Include service history, modifications, notable features, and any relevant information for buyers..."
                    className="bg-secondary border-border min-h-[150px]"
                  />
                </div>

                {/* Vehicle History */}
                <div className="mb-6">
                  <label className="text-sm font-medium mb-2 block">Vehicle History Report</label>
                  <div className="flex items-center gap-4 p-4 rounded-xl bg-secondary/50 border border-border">
                    <Upload className="h-6 w-6 text-primary" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">Upload Carfax or AutoCheck Report</p>
                      <p className="text-xs text-muted-foreground">PDF format, max 10MB</p>
                    </div>
                    <Button variant="outline" size="sm">Upload</Button>
                  </div>
                </div>

                <div className="flex justify-between mt-8">
                  <Button variant="outline" onClick={() => setStep(1)}>Back</Button>
                  <Button onClick={() => setStep(3)} className="bg-primary text-primary-foreground gap-2">
                    Continue
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}

            {/* Step 3: Pricing */}
            {step === 3 && (
              <div className="glass-card rounded-2xl p-8 animate-fade-in">
                <h2 className="text-2xl font-display font-bold mb-6">Pricing & Listing Type</h2>
                
                {/* Listing Type */}
                <div className="mb-8">
                  <label className="text-sm font-medium mb-4 block">How would you like to sell?</label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-6 rounded-xl border-2 border-primary bg-primary/5 cursor-pointer">
                      <h3 className="font-semibold mb-2">Fixed Price</h3>
                      <p className="text-sm text-muted-foreground">
                        Set your asking price. Buyers can make offers or purchase directly.
                      </p>
                    </div>
                    <div className="p-6 rounded-xl border border-border hover:border-primary/50 cursor-pointer transition-colors">
                      <h3 className="font-semibold mb-2">Auction</h3>
                      <p className="text-sm text-muted-foreground">
                        Let buyers compete. Set a reserve price and auction duration.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Price */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Asking Price *</label>
                    <div className="relative">
                      <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                      <Input placeholder="0.00" className="bg-secondary border-border pl-12" />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Location *</label>
                    <Input placeholder="City, State/Country" className="bg-secondary border-border" />
                  </div>
                </div>

                {/* Contact Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Your Name *</label>
                    <Input placeholder="Full Name" className="bg-secondary border-border" />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Email *</label>
                    <Input type="email" placeholder="your@email.com" className="bg-secondary border-border" />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Phone</label>
                    <Input placeholder="+1 (555) 000-0000" className="bg-secondary border-border" />
                  </div>
                </div>

                <div className="flex justify-between mt-8">
                  <Button variant="outline" onClick={() => setStep(2)}>Back</Button>
                  <Button className="bg-primary text-primary-foreground gap-2">
                    Submit Listing
                    <Check className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Sell;
