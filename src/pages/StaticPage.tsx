import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const pageContent = {
  privacy: {
    title: "Privacy Policy",
    eyebrow: "Legal",
    body:
      "Jersey Auto Lease collects only the information needed to respond to inquiries, prepare quotes, process finance requests, and coordinate vehicle delivery. Customer data is stored in Supabase with role-based access for staff accounts.",
    bullets: [
      "Lead and finance data is used only for dealership brokerage and customer support.",
      "Staff access is restricted through Supabase authentication and role policies.",
      "Customers may request data updates or deletion by contacting Jersey Auto Lease.",
    ],
  },
  terms: {
    title: "Terms of Service",
    eyebrow: "Legal",
    body:
      "Vehicle availability, pricing, lease terms, approvals, and incentives can change before final dealer confirmation. Jersey Auto Lease acts as a broker and concierge partner, not a lender or manufacturer.",
    bullets: [
      "Displayed payments are estimates until confirmed by a partner dealer or lender.",
      "Finance decisions are subject to lender review, credit history, and required documentation.",
      "Delivery timing depends on vehicle availability, paperwork completion, and customer location.",
    ],
  },
  inspection: {
    title: "Vehicle Inspection",
    eyebrow: "Broker Process",
    body:
      "Every sourced vehicle goes through a broker review before delivery. New vehicles are confirmed against dealer window stickers, and pre-owned vehicles receive history and condition checks before client approval.",
    bullets: [
      "VIN, mileage, equipment, and title status are reviewed before paperwork.",
      "Clients receive condition notes and available vehicle history records.",
      "Delivery is scheduled only after the final deal sheet is approved.",
    ],
  },
  specials: {
    title: "Current Specials",
    eyebrow: "Lease Desk",
    body:
      "Jersey Auto Lease tracks rotating partner-dealer programs across New Jersey. Specials are reviewed daily and converted into customer quotes after credit, mileage, term, and delivery requirements are confirmed.",
    bullets: [
      "Sedan, SUV, truck, and luxury programs are monitored by broker staff.",
      "Quotes are tailored to term length, down payment, mileage, and approval profile.",
      "Customers can request a same-day quote from the inventory or contact pages.",
    ],
  },
};

type StaticPageKind = keyof typeof pageContent;

interface StaticPageProps {
  kind: StaticPageKind;
}

export default function StaticPage({ kind }: StaticPageProps) {
  const content = pageContent[kind];

  return (
    <Layout>
      <section className="py-16 bg-gradient-to-b from-card to-background">
        <div className="container mx-auto px-4 max-w-3xl">
          <span className="text-primary text-sm font-medium uppercase tracking-wider">{content.eyebrow}</span>
          <h1 className="text-4xl md:text-5xl font-display font-bold mt-3 mb-5">{content.title}</h1>
          <p className="text-lg text-muted-foreground">{content.body}</p>
        </div>
      </section>
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="glass-card rounded-2xl p-8">
            <ul className="space-y-4">
              {content.bullets.map((item) => (
                <li key={item} className="flex gap-3 text-muted-foreground">
                  <span className="mt-2 h-2 w-2 rounded-full bg-primary flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <Link to="/contact">
                <Button className="bg-primary text-primary-foreground">Contact Jersey Auto Lease</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
