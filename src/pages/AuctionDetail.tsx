import { Link, useParams } from "react-router-dom";
import { Calendar, Clock, Gauge, MapPin } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getAuctionOpportunity } from "@/lib/repository";

export default function AuctionDetail() {
  const { id } = useParams();
  const opportunity = id ? getAuctionOpportunity(id) : null;

  if (!opportunity) {
    return (
      <Layout>
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl font-display font-bold mb-4">Auction opportunity not found</h1>
            <Link to="/auctions">
              <Button variant="outline">Back to Opportunities</Button>
            </Link>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="py-10 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="aspect-[16/9] rounded-2xl overflow-hidden mb-6">
                <img src={opportunity.image} alt={opportunity.title} className="w-full h-full object-cover" />
              </div>
              <Badge className="mb-4 bg-primary text-primary-foreground">{opportunity.status}</Badge>
              <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">{opportunity.title}</h1>
              <p className="text-lg text-muted-foreground mb-8">{opportunity.description}</p>
              <div className="grid sm:grid-cols-3 gap-4">
                <div className="glass-card rounded-xl p-4">
                  <MapPin className="h-5 w-5 text-primary mb-2" />
                  <div className="text-sm text-muted-foreground">Location</div>
                  <div className="font-semibold">{opportunity.location}</div>
                </div>
                <div className="glass-card rounded-xl p-4">
                  <Calendar className="h-5 w-5 text-primary mb-2" />
                  <div className="text-sm text-muted-foreground">Year</div>
                  <div className="font-semibold">{opportunity.year}</div>
                </div>
                <div className="glass-card rounded-xl p-4">
                  <Gauge className="h-5 w-5 text-primary mb-2" />
                  <div className="text-sm text-muted-foreground">Mileage</div>
                  <div className="font-semibold">{opportunity.mileage.toLocaleString()} mi</div>
                </div>
              </div>
            </div>
            <aside className="glass-card rounded-2xl p-6 h-fit">
              <div className="flex items-center gap-2 text-muted-foreground mb-2">
                <Clock className="h-4 w-4 text-primary" />
                Broker monitored quote window
              </div>
              <div className="text-sm text-muted-foreground">Current dealer lane quote</div>
              <div className="text-4xl font-display font-bold text-primary mb-4">
                ${opportunity.currentBid > 0 ? opportunity.currentBid.toLocaleString() : "Pending"}
              </div>
              <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="rounded-xl bg-secondary/60 p-3">
                  <div className="text-xs text-muted-foreground">Quote Activity</div>
                  <div className="font-bold">{opportunity.bids}</div>
                </div>
                <div className="rounded-xl bg-secondary/60 p-3">
                  <div className="text-xs text-muted-foreground">Watching</div>
                  <div className="font-bold">{opportunity.watchers}</div>
                </div>
              </div>
              <Link to="/contact">
                <Button className="w-full bg-primary text-primary-foreground">Request Broker Review</Button>
              </Link>
            </aside>
          </div>
        </div>
      </section>
    </Layout>
  );
}
