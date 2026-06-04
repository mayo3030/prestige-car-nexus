import { FormEvent, useState } from "react";
import { ArrowRight, Check, DollarSign, Globe, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Layout } from "@/components/layout/Layout";
import { vehicleMakes } from "@/lib/business-data";
import { createSellSubmission } from "@/lib/repository";
import { useToast } from "@/hooks/use-toast";

const years = Array.from({ length: 31 }, (_, index) => (new Date().getFullYear() - index).toString());

const initialForm = {
  make: "",
  model: "",
  year: "",
  mileage: "",
  vin: "",
  exteriorColor: "",
  interiorColor: "",
  transmission: "",
  description: "",
  listingType: "fixed_price" as "fixed_price" | "auction",
  askingPrice: "",
  location: "",
  sellerName: "",
  sellerEmail: "",
  sellerPhone: "",
};

const Sell = () => {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const { toast } = useToast();

  const update = (field: keyof typeof form, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const validateStep = (targetStep: number) => {
    if (targetStep === 1) {
      return Boolean(form.make && form.model.trim() && form.year && Number(form.mileage) >= 0);
    }
    if (targetStep === 2) {
      return form.description.trim().length >= 20;
    }
    return Boolean(
      Number(form.askingPrice) > 0 &&
        form.location.trim() &&
        form.sellerName.trim() &&
        form.sellerEmail.trim(),
    );
  };

  const goToStep = (nextStep: number) => {
    if (nextStep > step && !validateStep(step)) {
      toast({
        title: "Required details missing",
        description:
          step === 1
            ? "Make, model, year, and mileage are required."
            : "Add at least 20 characters describing the vehicle.",
        variant: "destructive",
      });
      return;
    }
    setStep(nextStep);
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!validateStep(3)) {
      toast({
        title: "Pricing and contact required",
        description: "Add asking price, location, seller name, and seller email.",
        variant: "destructive",
      });
      return;
    }

    setSubmitting(true);
    const result = await createSellSubmission({
      make: form.make,
      model: form.model.trim(),
      year: Number(form.year),
      mileage: Number(form.mileage),
      vin: form.vin.trim() || undefined,
      exterior_color: form.exteriorColor.trim() || undefined,
      interior_color: form.interiorColor.trim() || undefined,
      transmission: form.transmission || undefined,
      description: form.description.trim(),
      listing_type: form.listingType,
      asking_price: Number(form.askingPrice),
      location: form.location.trim(),
      seller_name: form.sellerName.trim(),
      seller_email: form.sellerEmail.trim(),
      seller_phone: form.sellerPhone.trim() || undefined,
    });
    setSubmitting(false);
    toast({
      title: result.persisted ? "Vehicle submitted" : "Vehicle submitted for demo",
      description: result.persisted
        ? "Staff can now review this vehicle in Supabase."
        : "Supabase is not reachable yet, so this ran in demo fallback mode.",
    });
    setForm(initialForm);
    setStep(1);
  };

  return (
    <Layout>
      <section className="pt-12 pb-16 bg-gradient-to-b from-card to-background relative overflow-hidden">
        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">
              Sell or Trade Your <span className="text-primary">Vehicle</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Submit your vehicle to the Jersey Auto Lease broker desk for valuation, trade-in review, or listing support.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Globe className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Broker Network</h3>
                <p className="text-sm text-muted-foreground">Route your vehicle to relevant New Jersey buyer and dealer channels.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Verified Intake</h3>
                <p className="text-sm text-muted-foreground">Capture VIN, mileage, condition notes, and seller contact details.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                <DollarSign className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Price Review</h3>
                <p className="text-sm text-muted-foreground">Staff can compare your ask against demand, payoff, and trade options.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          <form onSubmit={handleSubmit} className="max-w-3xl mx-auto">
            <div className="grid grid-cols-3 gap-3 mb-10">
              {[1, 2, 3].map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => (item < step ? setStep(item) : goToStep(item))}
                  className={`min-w-0 rounded-xl border p-3 text-left transition-colors ${
                    step >= item ? "border-primary bg-primary/10 text-foreground" : "border-border bg-card text-muted-foreground"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="h-8 w-8 rounded-full bg-background border border-border flex items-center justify-center text-sm">
                      {step > item ? <Check className="h-4 w-4 text-primary" /> : item}
                    </span>
                    <span className="text-sm font-medium truncate">
                      {item === 1 ? "Vehicle" : item === 2 ? "Details" : "Pricing"}
                    </span>
                  </div>
                </button>
              ))}
            </div>

            {step === 1 && (
              <div className="glass-card rounded-2xl p-6 sm:p-8 animate-fade-in">
                <h2 className="text-2xl font-display font-bold mb-6">Vehicle Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Make *</label>
                    <Select value={form.make} onValueChange={(value) => update("make", value)}>
                      <SelectTrigger className="bg-secondary border-border">
                        <SelectValue placeholder="Select Make" />
                      </SelectTrigger>
                      <SelectContent>
                        {vehicleMakes.map((make) => (
                          <SelectItem key={make} value={make}>
                            {make}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label htmlFor="model" className="text-sm font-medium mb-2 block">
                      Model *
                    </label>
                    <Input
                      id="model"
                      required
                      value={form.model}
                      onChange={(event) => update("model", event.target.value)}
                      placeholder="e.g., CR-V EX-L"
                      className="bg-secondary border-border"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Year *</label>
                    <Select value={form.year} onValueChange={(value) => update("year", value)}>
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
                    <label htmlFor="mileage" className="text-sm font-medium mb-2 block">
                      Mileage *
                    </label>
                    <Input
                      id="mileage"
                      required
                      inputMode="numeric"
                      value={form.mileage}
                      onChange={(event) => update("mileage", event.target.value.replace(/\D/g, ""))}
                      placeholder="12500"
                      className="bg-secondary border-border"
                    />
                  </div>
                  <div>
                    <label htmlFor="vin" className="text-sm font-medium mb-2 block">
                      VIN
                    </label>
                    <Input
                      id="vin"
                      value={form.vin}
                      onChange={(event) => update("vin", event.target.value)}
                      placeholder="Vehicle Identification Number"
                      className="bg-secondary border-border"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Transmission</label>
                    <Select value={form.transmission} onValueChange={(value) => update("transmission", value)}>
                      <SelectTrigger className="bg-secondary border-border">
                        <SelectValue placeholder="Select Transmission" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Automatic">Automatic</SelectItem>
                        <SelectItem value="Manual">Manual</SelectItem>
                        <SelectItem value="CVT">CVT</SelectItem>
                        <SelectItem value="Dual-Clutch">Dual-Clutch</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex justify-end mt-8">
                  <Button type="button" onClick={() => goToStep(2)} className="bg-primary text-primary-foreground gap-2">
                    Continue
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="glass-card rounded-2xl p-6 sm:p-8 animate-fade-in">
                <h2 className="text-2xl font-display font-bold mb-6">Condition & Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="exteriorColor" className="text-sm font-medium mb-2 block">
                      Exterior Color
                    </label>
                    <Input
                      id="exteriorColor"
                      value={form.exteriorColor}
                      onChange={(event) => update("exteriorColor", event.target.value)}
                      placeholder="e.g., White"
                      className="bg-secondary border-border"
                    />
                  </div>
                  <div>
                    <label htmlFor="interiorColor" className="text-sm font-medium mb-2 block">
                      Interior Color
                    </label>
                    <Input
                      id="interiorColor"
                      value={form.interiorColor}
                      onChange={(event) => update("interiorColor", event.target.value)}
                      placeholder="e.g., Black"
                      className="bg-secondary border-border"
                    />
                  </div>
                </div>
                <div className="mb-6">
                  <label htmlFor="description" className="text-sm font-medium mb-2 block">
                    Description *
                  </label>
                  <Textarea
                    id="description"
                    required
                    minLength={20}
                    value={form.description}
                    onChange={(event) => update("description", event.target.value)}
                    placeholder="Include service history, payoff status, damage, modifications, notable options, and why you are selling..."
                    className="bg-secondary border-border min-h-[150px]"
                  />
                </div>
                <div className="rounded-xl border border-border bg-secondary/40 p-4 text-sm text-muted-foreground">
                  Staff will request photos and documents after the initial intake is reviewed. This avoids collecting files before a real broker conversation.
                </div>
                <div className="flex justify-between mt-8">
                  <Button type="button" variant="outline" onClick={() => setStep(1)}>
                    Back
                  </Button>
                  <Button type="button" onClick={() => goToStep(3)} className="bg-primary text-primary-foreground gap-2">
                    Continue
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="glass-card rounded-2xl p-6 sm:p-8 animate-fade-in">
                <h2 className="text-2xl font-display font-bold mb-6">Pricing & Contact</h2>
                <div className="mb-8">
                  <label className="text-sm font-medium mb-4 block">How would you like to sell?</label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      { value: "fixed_price", title: "Fixed Price", description: "Staff reviews your asking price and buyer fit." },
                      { value: "auction", title: "Broker Quote Window", description: "Staff compares dealer and buyer offers against your reserve." },
                    ].map((option) => (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => update("listingType", option.value)}
                        className={`p-6 rounded-xl border text-left transition-colors ${
                          form.listingType === option.value ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
                        }`}
                      >
                        <h3 className="font-semibold mb-2">{option.title}</h3>
                        <p className="text-sm text-muted-foreground">{option.description}</p>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div>
                    <label htmlFor="askingPrice" className="text-sm font-medium mb-2 block">
                      Asking Price *
                    </label>
                    <div className="relative">
                      <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                      <Input
                        id="askingPrice"
                        required
                        inputMode="numeric"
                        value={form.askingPrice}
                        onChange={(event) => update("askingPrice", event.target.value.replace(/\D/g, ""))}
                        placeholder="35000"
                        className="bg-secondary border-border pl-12"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="location" className="text-sm font-medium mb-2 block">
                      Location *
                    </label>
                    <Input
                      id="location"
                      required
                      value={form.location}
                      onChange={(event) => update("location", event.target.value)}
                      placeholder="City, NJ"
                      className="bg-secondary border-border"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div>
                    <label htmlFor="sellerName" className="text-sm font-medium mb-2 block">
                      Your Name *
                    </label>
                    <Input
                      id="sellerName"
                      required
                      value={form.sellerName}
                      onChange={(event) => update("sellerName", event.target.value)}
                      placeholder="Full Name"
                      className="bg-secondary border-border"
                    />
                  </div>
                  <div>
                    <label htmlFor="sellerEmail" className="text-sm font-medium mb-2 block">
                      Email *
                    </label>
                    <Input
                      id="sellerEmail"
                      required
                      type="email"
                      value={form.sellerEmail}
                      onChange={(event) => update("sellerEmail", event.target.value)}
                      placeholder="your@email.com"
                      className="bg-secondary border-border"
                    />
                  </div>
                  <div>
                    <label htmlFor="sellerPhone" className="text-sm font-medium mb-2 block">
                      Phone
                    </label>
                    <Input
                      id="sellerPhone"
                      value={form.sellerPhone}
                      onChange={(event) => update("sellerPhone", event.target.value)}
                      placeholder="+1 (555) 000-0000"
                      className="bg-secondary border-border"
                    />
                  </div>
                </div>

                <div className="flex justify-between mt-8">
                  <Button type="button" variant="outline" onClick={() => setStep(2)}>
                    Back
                  </Button>
                  <Button type="submit" disabled={submitting} className="bg-primary text-primary-foreground gap-2">
                    {submitting ? "Submitting..." : "Submit Listing"}
                    <Check className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
          </form>
        </div>
      </section>
    </Layout>
  );
};

export default Sell;
