import { FormEvent, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Clock, Headphones, Mail, MapPin, Phone, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Layout } from "@/components/layout/Layout";
import { createAppointment, createLead } from "@/lib/repository";
import { useToast } from "@/hooks/use-toast";

const subjectLabels: Record<string, string> = {
  buying: "Buying or Leasing a Vehicle",
  selling: "Selling a Vehicle",
  auction: "Broker Opportunity",
  financing: "Financing Options",
  concierge: "Broker Consultation",
  other: "Other",
};

const Contact = () => {
  const [params] = useSearchParams();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    subject: params.get("subject") ?? "buying",
    vehicle: params.get("vehicle") ?? "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    setForm((current) => ({
      ...current,
      subject: params.get("subject") ?? current.subject,
      vehicle: params.get("vehicle") ?? current.vehicle,
    }));
  }, [params]);

  const update = (field: keyof typeof form, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!form.firstName.trim() || !form.email.trim() || !form.subject || !form.message.trim()) {
      toast({
        title: "Missing required details",
        description: "First name, email, topic, and message are required.",
        variant: "destructive",
      });
      return;
    }

    setSubmitting(true);
    const result = await createLead({
      first_name: form.firstName.trim(),
      last_name: form.lastName.trim() || undefined,
      email: form.email.trim(),
      phone: form.phone.trim() || undefined,
      lead_type: form.subject,
      subject: subjectLabels[form.subject] ?? form.subject,
      vehicle_interest: form.vehicle.trim() || undefined,
      message: form.message.trim(),
      priority: form.subject === "financing" ? "high" : "normal",
      metadata: {
        source_url: window.location.href,
      },
    });

    setSubmitting(false);
    toast({
      title: result.persisted ? "Lead captured" : "Lead captured for demo",
      description: result.persisted
        ? "Your request is now in the Jersey Auto Lease staff pipeline."
        : "Supabase is not reachable yet, so this ran in demo fallback mode.",
    });
    setForm((current) => ({ ...current, message: "" }));
  };

  const handleScheduleCall = async () => {
    if (!form.firstName.trim() || !form.email.trim()) {
      toast({
        title: "Add name and email first",
        description: "We need at least your name and email to request a call.",
        variant: "destructive",
      });
      return;
    }

    const result = await createAppointment({
      first_name: form.firstName.trim(),
      last_name: form.lastName.trim() || undefined,
      email: form.email.trim(),
      phone: form.phone.trim() || undefined,
      appointment_type: "broker_call",
      notes: form.vehicle ? `Vehicle interest: ${form.vehicle}` : "Website consultation request",
    });

    toast({
      title: result.persisted ? "Call requested" : "Call request captured for demo",
      description: "A staff member can confirm the time from the admin appointments table.",
    });
  };

  return (
    <Layout>
      <section className="pt-12 pb-8 bg-gradient-to-b from-card to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">
              Get a <span className="text-primary">Broker Quote</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Send your vehicle, lease, finance, or delivery question and route it directly into the Jersey Auto Lease operating pipeline.
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-1">
              <div className="glass-card rounded-2xl p-8 mb-6">
                <h2 className="text-xl font-display font-bold mb-6">Contact Information</h2>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <MapPin className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Service Area</h3>
                      <p className="text-sm text-muted-foreground">
                        New Jersey broker desk
                        <br />
                        Home delivery available statewide
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Phone className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Phone</h3>
                      <p className="text-sm text-muted-foreground">Add verified business phone in production</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Mail className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Email</h3>
                      <p className="text-sm text-muted-foreground">info@jerseyautolease.com</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Clock className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Hours</h3>
                      <p className="text-sm text-muted-foreground">
                        Mon - Fri: 9:00 AM - 7:00 PM
                        <br />
                        Sat: 10:00 AM - 4:00 PM
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="glass-card rounded-2xl p-8 bg-gradient-to-br from-primary/10 to-transparent border-primary/20">
                <div className="flex items-center gap-3 mb-4">
                  <Headphones className="h-6 w-6 text-primary" />
                  <h3 className="font-semibold">Broker Consultation</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  Add your name and email in the form, then request a call so staff can confirm your quote requirements.
                </p>
                <Button
                  type="button"
                  onClick={handleScheduleCall}
                  variant="outline"
                  className="w-full border-primary/30 hover:bg-primary hover:text-primary-foreground"
                >
                  Schedule a Call
                </Button>
              </div>
            </div>

            <div className="lg:col-span-2">
              <div className="glass-card rounded-2xl p-8">
                <h2 className="text-2xl font-display font-bold mb-6">Send Us a Message</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="firstName" className="text-sm font-medium mb-2 block">
                        First Name *
                      </label>
                      <Input
                        id="firstName"
                        name="firstName"
                        required
                        value={form.firstName}
                        onChange={(event) => update("firstName", event.target.value)}
                        placeholder="John"
                        className="bg-secondary border-border"
                      />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="text-sm font-medium mb-2 block">
                        Last Name
                      </label>
                      <Input
                        id="lastName"
                        name="lastName"
                        value={form.lastName}
                        onChange={(event) => update("lastName", event.target.value)}
                        placeholder="Doe"
                        className="bg-secondary border-border"
                      />
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="email" className="text-sm font-medium mb-2 block">
                        Email *
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={form.email}
                        onChange={(event) => update("email", event.target.value)}
                        placeholder="john@example.com"
                        className="bg-secondary border-border"
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="text-sm font-medium mb-2 block">
                        Phone
                      </label>
                      <Input
                        id="phone"
                        name="phone"
                        value={form.phone}
                        onChange={(event) => update("phone", event.target.value)}
                        placeholder="+1 (555) 000-0000"
                        className="bg-secondary border-border"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Subject *</label>
                    <Select value={form.subject} onValueChange={(value) => update("subject", value)}>
                      <SelectTrigger className="bg-secondary border-border">
                        <SelectValue placeholder="Select a topic" />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(subjectLabels).map(([value, label]) => (
                          <SelectItem key={value} value={value}>
                            {label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label htmlFor="vehicle" className="text-sm font-medium mb-2 block">
                      Vehicle of Interest
                    </label>
                    <Input
                      id="vehicle"
                      name="vehicle"
                      value={form.vehicle}
                      onChange={(event) => update("vehicle", event.target.value)}
                      placeholder="e.g., 2024 Honda CR-V EX-L"
                      className="bg-secondary border-border"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="text-sm font-medium mb-2 block">
                      Message *
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      required
                      value={form.message}
                      onChange={(event) => update("message", event.target.value)}
                      placeholder="Tell us what payment, term, mileage, or delivery details you need..."
                      className="bg-secondary border-border min-h-[150px]"
                    />
                  </div>
                  <Button type="submit" disabled={submitting} className="w-full bg-primary text-primary-foreground hover:bg-primary/90 gap-2">
                    <Send className="h-4 w-4" />
                    {submitting ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
