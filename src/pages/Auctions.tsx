import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Calendar, Clock, Gauge, Gavel, Heart, MapPin, TrendingUp, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Layout } from "@/components/layout/Layout";
import { getAuctionOpportunities } from "@/lib/repository";
import type { AuctionOpportunity } from "@/lib/business-data";

function CountdownTimer({ endTime }: { endTime: Date }) {
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    const timer = setInterval(() => {
      const diff = endTime.getTime() - Date.now();
      if (diff <= 0) {
        setTimeLeft("Ended");
        clearInterval(timer);
        return;
      }

      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      setTimeLeft(`${hours}h ${minutes}m ${seconds}s`);
    }, 1000);

    return () => clearInterval(timer);
  }, [endTime]);

  return <span>{timeLeft}</span>;
}

function OpportunityCard({ opportunity }: { opportunity: AuctionOpportunity }) {
  const isLive = opportunity.status === "live";
  const isUpcoming = opportunity.status === "upcoming";

  return (
    <div className="group glass-card rounded-2xl overflow-hidden luxury-border transition-all duration-500 hover:gold-glow">
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={opportunity.image}
          alt={opportunity.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
        <div className="absolute top-4 left-4">
          {isLive && (
            <Badge className="bg-destructive text-destructive-foreground animate-pulse gap-1.5">
              <span className="w-2 h-2 rounded-full bg-white" />
              Live Quote Window
            </Badge>
          )}
          {isUpcoming && <Badge className="bg-primary text-primary-foreground">Upcoming</Badge>}
          {opportunity.status === "ended" && <Badge variant="secondary">Ended</Badge>}
        </div>

        <button
          type="button"
          aria-label={`Save ${opportunity.title}`}
          className="absolute top-4 right-4 p-2 rounded-full bg-background/50 backdrop-blur-sm border border-border/50 text-foreground/70 hover:text-primary hover:border-primary/50 transition-colors"
        >
          <Heart className="h-5 w-5" />
        </button>

        {isLive && (
          <div className="absolute bottom-4 left-4 right-4">
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-background/80 backdrop-blur-sm border border-border/50">
              <Clock className="h-4 w-4 text-destructive" />
              <span className="text-sm font-medium">Review closes in:</span>
              <span className="text-sm font-bold text-destructive">
                <CountdownTimer endTime={opportunity.endTime} />
              </span>
            </div>
          </div>
        )}
      </div>

      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
              {opportunity.title}
            </h3>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="h-3.5 w-3.5" />
              {opportunity.location}
            </div>
          </div>
        </div>

        <div className="flex gap-4 mb-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <Calendar className="h-4 w-4 text-primary" />
            {opportunity.year}
          </div>
          <div className="flex items-center gap-1.5">
            <Gauge className="h-4 w-4 text-primary" />
            {opportunity.mileage.toLocaleString()} mi
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-4 p-4 rounded-xl bg-secondary/50">
          <div className="text-center">
            <div className="text-xs text-muted-foreground mb-1">Dealer Quote</div>
            <div className="font-bold text-primary">
              ${opportunity.currentBid > 0 ? opportunity.currentBid.toLocaleString() : "Pending"}
            </div>
          </div>
          <div className="text-center border-x border-border">
            <div className="text-xs text-muted-foreground mb-1">Updates</div>
            <div className="font-bold flex items-center justify-center gap-1">
              <Gavel className="h-3.5 w-3.5 text-primary" />
              {opportunity.bids}
            </div>
          </div>
          <div className="text-center">
            <div className="text-xs text-muted-foreground mb-1">Watching</div>
            <div className="font-bold flex items-center justify-center gap-1">
              <Users className="h-3.5 w-3.5 text-primary" />
              {opportunity.watchers}
            </div>
          </div>
        </div>

        <Link to={`/auction/${opportunity.id}`} className="block">
          <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
            {isLive ? "Request Broker Review" : isUpcoming ? "Set Reminder" : "View Results"}
          </Button>
        </Link>
      </div>
    </div>
  );
}

const Auctions = () => {
  const opportunities = getAuctionOpportunities();
  const live = opportunities.filter((item) => item.status === "live");
  const upcoming = opportunities.filter((item) => item.status === "upcoming");
  const ended = opportunities.filter((item) => item.status === "ended");

  return (
    <Layout>
      <section className="pt-12 pb-8 bg-gradient-to-b from-card to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-4">
              <Gavel className="h-8 w-8 text-primary" />
              <h1 className="text-4xl md:text-5xl font-display font-bold">
                Broker <span className="text-primary">Opportunities</span>
              </h1>
            </div>
            <p className="text-lg text-muted-foreground">
              Track dealer-lane quote windows and limited program reviews monitored by Jersey Auto Lease brokers.
            </p>
          </div>

          <div className="flex flex-wrap gap-8 mt-8">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-destructive/10 flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-destructive" />
              </div>
              <div>
                <div className="text-2xl font-bold">{live.length}</div>
                <div className="text-sm text-muted-foreground">Live Now</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <Clock className="h-6 w-6 text-primary" />
              </div>
              <div>
                <div className="text-2xl font-bold">{upcoming.length}</div>
                <div className="text-sm text-muted-foreground">Upcoming</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-8 bg-background">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="live" className="w-full">
            <TabsList className="mb-8 bg-card border border-border flex flex-wrap h-auto">
              <TabsTrigger value="live" className="gap-2">
                <span className="w-2 h-2 rounded-full bg-destructive animate-pulse" />
                Live ({live.length})
              </TabsTrigger>
              <TabsTrigger value="upcoming">Upcoming ({upcoming.length})</TabsTrigger>
              <TabsTrigger value="ended">Ended ({ended.length})</TabsTrigger>
            </TabsList>

            <TabsContent value="live">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {live.map((opportunity) => (
                  <OpportunityCard key={opportunity.id} opportunity={opportunity} />
                ))}
              </div>
            </TabsContent>
            <TabsContent value="upcoming">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {upcoming.map((opportunity) => (
                  <OpportunityCard key={opportunity.id} opportunity={opportunity} />
                ))}
              </div>
            </TabsContent>
            <TabsContent value="ended">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {ended.map((opportunity) => (
                  <OpportunityCard key={opportunity.id} opportunity={opportunity} />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </Layout>
  );
};

export default Auctions;
