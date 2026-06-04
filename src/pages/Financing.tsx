import { FormEvent, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Calculator, DollarSign, Percent, Clock, Info } from "lucide-react";
import { createFinanceApplication } from "@/lib/repository";
import { useToast } from "@/hooks/use-toast";

const Financing = () => {
  const [params] = useSearchParams();
  const initialPrice = Number(params.get("price")) || 35000;
  const [vehiclePrice, setVehiclePrice] = useState(initialPrice);
  const [downPayment, setDownPayment] = useState(Math.min(5000, initialPrice));
  const [loanTerm, setLoanTerm] = useState(60);
  const [interestRate, setInterestRate] = useState(6.5);
  const [contact, setContact] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    vehicle: params.get("vehicle") ?? "",
  });
  const [submitting, setSubmitting] = useState(false);
  const { toast } = useToast();

  const loanAmount = vehiclePrice - downPayment;
  const monthlyRate = interestRate / 100 / 12;
  const monthlyPayment = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, loanTerm)) / (Math.pow(1 + monthlyRate, loanTerm) - 1);
  const totalInterest = (monthlyPayment * loanTerm) - loanAmount;
  const totalCost = vehiclePrice + totalInterest;

  useEffect(() => {
    if (downPayment > vehiclePrice) setDownPayment(vehiclePrice);
  }, [downPayment, vehiclePrice]);

  const updateContact = (field: keyof typeof contact, value: string) => {
    setContact((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!contact.firstName.trim() || !contact.email.trim()) {
      toast({
        title: "Missing contact details",
        description: "First name and email are required to request financing.",
        variant: "destructive",
      });
      return;
    }

    setSubmitting(true);
    const result = await createFinanceApplication({
      first_name: contact.firstName.trim(),
      last_name: contact.lastName.trim() || undefined,
      email: contact.email.trim(),
      phone: contact.phone.trim() || undefined,
      vehicle_price: vehiclePrice,
      down_payment: downPayment,
      loan_term_months: loanTerm,
      interest_rate: interestRate,
      requested_vehicle: contact.vehicle.trim() || undefined,
      metadata: {
        estimated_monthly_payment: Number.isNaN(monthlyPayment) ? 0 : Math.round(monthlyPayment),
      },
    });

    setSubmitting(false);
    toast({
      title: result.persisted ? "Finance request submitted" : "Finance request captured for demo",
      description: result.persisted
        ? "The request is now available to staff in Supabase."
        : "Supabase is not reachable yet, so this ran in demo fallback mode.",
    });
  };

  return (
    <Layout>
      {/* Hero */}
      <section className="pt-12 pb-8 bg-gradient-to-b from-card to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-4">
              <Calculator className="h-8 w-8 text-primary" />
              <h1 className="text-4xl md:text-5xl font-display font-bold">
                Financing <span className="text-primary">Calculator</span>
              </h1>
            </div>
            <p className="text-lg text-muted-foreground">
              Estimate your monthly payments and explore financing options for your luxury vehicle purchase.
            </p>
          </div>
        </div>
      </section>

      {/* Calculator */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          <form onSubmit={handleSubmit} className="grid lg:grid-cols-2 gap-12">
            {/* Input Section */}
            <div className="glass-card rounded-2xl p-8">
              <h2 className="text-2xl font-display font-bold mb-8">Loan Details</h2>

              {/* Vehicle Price */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <label className="text-sm font-medium flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-primary" />
                    Vehicle Price
                  </label>
                  <span className="text-lg font-bold text-primary">
                    ${vehiclePrice.toLocaleString()}
                  </span>
                </div>
                <Slider
                  value={[vehiclePrice]}
                  onValueChange={(v) => setVehiclePrice(v[0])}
                  min={15000}
                  max={100000}
                  step={1000}
                  className="mb-2"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>$15,000</span>
                  <span>$100,000</span>
                </div>
              </div>

              {/* Down Payment */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <label className="text-sm font-medium flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-primary" />
                    Down Payment
                  </label>
                  <span className="text-lg font-bold text-primary">
                    ${downPayment.toLocaleString()} ({((downPayment / vehiclePrice) * 100).toFixed(0)}%)
                  </span>
                </div>
                <Slider
                  value={[downPayment]}
                  onValueChange={(v) => setDownPayment(v[0])}
                  min={0}
                  max={vehiclePrice}
                  step={5000}
                  className="mb-2"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>$0</span>
                  <span>${vehiclePrice.toLocaleString()}</span>
                </div>
              </div>

              {/* Loan Term */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <label className="text-sm font-medium flex items-center gap-2">
                    <Clock className="h-4 w-4 text-primary" />
                    Loan Term
                  </label>
                  <span className="text-lg font-bold text-primary">
                    {loanTerm} months ({(loanTerm / 12).toFixed(1)} years)
                  </span>
                </div>
                <Slider
                  value={[loanTerm]}
                  onValueChange={(v) => setLoanTerm(v[0])}
                  min={12}
                  max={84}
                  step={12}
                  className="mb-2"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>12 months</span>
                  <span>84 months</span>
                </div>
              </div>

              {/* Interest Rate */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <label className="text-sm font-medium flex items-center gap-2">
                    <Percent className="h-4 w-4 text-primary" />
                    Interest Rate (APR)
                  </label>
                  <span className="text-lg font-bold text-primary">
                    {interestRate.toFixed(1)}%
                  </span>
                </div>
                <Slider
                  value={[interestRate]}
                  onValueChange={(v) => setInterestRate(v[0])}
                  min={2}
                  max={15}
                  step={0.1}
                  className="mb-2"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>2%</span>
                  <span>15%</span>
                </div>
              </div>

              <div className="border-t border-border pt-8">
                <h3 className="text-lg font-semibold mb-4">Applicant Contact</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="financeFirstName" className="text-sm font-medium mb-2 block">
                      First Name *
                    </label>
                    <Input
                      id="financeFirstName"
                      required
                      value={contact.firstName}
                      onChange={(event) => updateContact("firstName", event.target.value)}
                      className="bg-secondary border-border"
                    />
                  </div>
                  <div>
                    <label htmlFor="financeLastName" className="text-sm font-medium mb-2 block">
                      Last Name
                    </label>
                    <Input
                      id="financeLastName"
                      value={contact.lastName}
                      onChange={(event) => updateContact("lastName", event.target.value)}
                      className="bg-secondary border-border"
                    />
                  </div>
                  <div>
                    <label htmlFor="financeEmail" className="text-sm font-medium mb-2 block">
                      Email *
                    </label>
                    <Input
                      id="financeEmail"
                      type="email"
                      required
                      value={contact.email}
                      onChange={(event) => updateContact("email", event.target.value)}
                      className="bg-secondary border-border"
                    />
                  </div>
                  <div>
                    <label htmlFor="financePhone" className="text-sm font-medium mb-2 block">
                      Phone
                    </label>
                    <Input
                      id="financePhone"
                      value={contact.phone}
                      onChange={(event) => updateContact("phone", event.target.value)}
                      className="bg-secondary border-border"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="financeVehicle" className="text-sm font-medium mb-2 block">
                      Requested Vehicle
                    </label>
                    <Input
                      id="financeVehicle"
                      value={contact.vehicle}
                      onChange={(event) => updateContact("vehicle", event.target.value)}
                      placeholder="Optional vehicle of interest"
                      className="bg-secondary border-border"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Results Section */}
            <div>
              <div className="glass-card rounded-2xl p-8 mb-6 gold-glow">
                <h2 className="text-lg font-medium text-muted-foreground mb-2">Estimated Monthly Payment</h2>
                <div className="text-5xl font-display font-bold text-primary mb-4">
                  ${isNaN(monthlyPayment) ? "0" : monthlyPayment.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                  <span className="text-lg text-muted-foreground font-normal">/month</span>
                </div>
              </div>

              {/* Breakdown */}
              <div className="glass-card rounded-2xl p-8">
                <h3 className="text-lg font-semibold mb-6">Loan Breakdown</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between py-3 border-b border-border">
                    <span className="text-muted-foreground">Vehicle Price</span>
                    <span className="font-semibold">${vehiclePrice.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between py-3 border-b border-border">
                    <span className="text-muted-foreground">Down Payment</span>
                    <span className="font-semibold text-green-500">-${downPayment.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between py-3 border-b border-border">
                    <span className="text-muted-foreground">Loan Amount</span>
                    <span className="font-semibold">${loanAmount.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between py-3 border-b border-border">
                    <span className="text-muted-foreground">Total Interest</span>
                    <span className="font-semibold text-destructive">
                      ${isNaN(totalInterest) ? "0" : totalInterest.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                    </span>
                  </div>
                  <div className="flex items-center justify-between py-3">
                    <span className="font-semibold">Total Cost</span>
                    <span className="text-xl font-bold text-primary">
                      ${isNaN(totalCost) ? "0" : totalCost.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                    </span>
                  </div>
                </div>
              </div>

              {/* Disclaimer */}
              <div className="flex items-start gap-3 mt-6 p-4 rounded-xl bg-secondary/50">
                <Info className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <p className="text-xs text-muted-foreground">
                  This calculator provides estimates for informational purposes only. Actual rates and terms 
                  may vary based on credit history, lender requirements, and other factors. Contact our 
                  financing team for personalized quotes.
                </p>
              </div>

              <Button type="submit" disabled={submitting} className="w-full mt-6 bg-primary text-primary-foreground hover:bg-primary/90">
                {submitting ? "Submitting..." : "Request Financing Quote"}
              </Button>
            </div>
          </form>
        </div>
      </section>
    </Layout>
  );
};

export default Financing;
