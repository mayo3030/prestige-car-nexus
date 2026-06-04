import { useState, useEffect } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "react-router-dom";
import { Clock, Gavel, Users, TrendingUp, Heart, MapPin, Calendar, Gauge } from "lucide-react";

interface Auction {
  id: string;
  title: string;
  make: string;
  model: string;
  year: number;
  currentBid: number;
  startingBid: number;
  bids: number;
  watchers: number;
  endTime: Date;
  location: string;
  image: string;
  status: "live" | "upcoming" | "ended";
  mileage: number;
}

const auctions: Auction[] = [
  {
    id: "1",
    title: "2026 Honda Civic Type R",
    make: "Honda",
    model: "Civic Type R",
    year: 2026,
    currentBid: 28500,
    startingBid: 24000,
    bids: 12,
    watchers: 87,
    endTime: new Date(Date.now() + 2 * 60 * 60 * 1000),
    location: "Newark, NJ",
    image: "https://images.unsplash.com/photo-1611564494260-6f21b1af1e4f?q=80&w=2670",
    status: "live",
    mileage: 150,
  },
  {
    id: "2",
    title: "2026 Mazda MX-5 Miata RF",
    make: "Mazda",
    model: "MX-5 Miata",
    year: 2026,
    currentBid: 32500,
    startingBid: 28000,
    bids: 8,
    watchers: 64,
    endTime: new Date(Date.now() + 5 * 60 * 60 * 1000),
    location: "Morristown, NJ",
    image: "https://images.unsplash.com/photo-1551830820-330a71b99659?q=80&w=2670",
    status: "live",
    mileage: 80,
  },
  {
    id: "3",
    title: "2026 Toyota Supra GR",
    make: "Toyota",
    model: "GR Supra",
    year: 2026,
    currentBid: 0,
    startingBid: 45000,
    bids: 0,
    watchers: 112,
    endTime: new Date(Date.now() + 24 * 60 * 60 * 1000),
    location: "Princeton, NJ",
    image: "https://images.unsplash.com/photo-1621007947382-bb3c39934e3f?q=80&w=2670",
    status: "upcoming",
    mileage: 10,
  },
  {
    id: "4",
    title: "2026 Honda Pilot Elite",
    make: "Honda",
    model: "Pilot",
    year: 2026,
    currentBid: 41500,
    startingBid: 38000,
    bids: 6,
    watchers: 45,
    endTime: new Date(Date.now() - 2 * 60 * 60 * 1000),
    location: "Edison, NJ",
    image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=2670",
    status: "ended",
    mileage: 200,
  },
];

function CountdownTimer({ endTime }: { endTime: Date }) {
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const diff = endTime.getTime() - now.getTime();
      
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

function AuctionCard({ auction }: { auction: Auction }) {
  const isLive = auction.status === "live";
  const isUpcoming = auction.status === "upcoming";

  return (
    <div className="group glass-card rounded-2xl overflow-hidden luxury-border transition-all duration-500 hover:gold-glow">
      {/* Image */}
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={auction.image}
          alt={auction.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
        
        {/* Status Badge */}
        <div className="absolute top-4 left-4">
          {isLive && (
            <Badge className="bg-destructive text-destructive-foreground animate-pulse gap-1.5">
              <span className="w-2 h-2 rounded-full bg-white" />
              LIVE
            </Badge>
          )}
          {isUpcoming && (
            <Badge className="bg-primary text-primary-foreground">Upcoming</Badge>
          )}
          {auction.status === "ended" && (
            <Badge variant="secondary">Ended</Badge>
          )}
        </div>

        <button className="absolute top-4 right-4 p-2 rounded-full bg-background/50 backdrop-blur-sm border border-border/50 text-foreground/70 hover:text-primary hover:border-primary/50 transition-colors">
          <Heart className="h-5 w-5" />
        </button>

        {/* Timer */}
        {isLive && (
          <div className="absolute bottom-4 left-4 right-4">
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-background/80 backdrop-blur-sm border border-border/50">
              <Clock className="h-4 w-4 text-destructive" />
              <span className="text-sm font-medium">Ends in:</span>
              <span className="text-sm font-bold text-destructive">
                <CountdownTimer endTime={auction.endTime} />
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
              {auction.title}
            </h3>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="h-3.5 w-3.5" />
              {auction.location}
            </div>
          </div>
        </div>

        <div className="flex gap-4 mb-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <Calendar className="h-4 w-4 text-primary" />
            {auction.year}
          </div>
          <div className="flex items-center gap-1.5">
            <Gauge className="h-4 w-4 text-primary" />
            {auction.mileage.toLocaleString()} mi
          </div>
        </div>

        {/* Bid Info */}
        <div className="grid grid-cols-3 gap-4 mb-4 p-4 rounded-xl bg-secondary/50">
          <div className="text-center">
            <div className="text-xs text-muted-foreground mb-1">Current Bid</div>
            <div className="font-bold text-primary">
              ${auction.currentBid > 0 ? auction.currentBid.toLocaleString() : "—"}
            </div>
          </div>
          <div className="text-center border-x border-border">
            <div className="text-xs text-muted-foreground mb-1">Bids</div>
            <div className="font-bold flex items-center justify-center gap-1">
              <Gavel className="h-3.5 w-3.5 text-primary" />
              {auction.bids}
            </div>
          </div>
          <div className="text-center">
            <div className="text-xs text-muted-foreground mb-1">Watching</div>
            <div className="font-bold flex items-center justify-center gap-1">
              <Users className="h-3.5 w-3.5 text-primary" />
              {auction.watchers}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <Link to={`/auction/${auction.id}`} className="flex-1">
            <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
              {isLive ? "Place Bid" : isUpcoming ? "Set Reminder" : "View Results"}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

const Auctions = () => {
  const liveAuctions = auctions.filter((a) => a.status === "live");
  const upcomingAuctions = auctions.filter((a) => a.status === "upcoming");
  const endedAuctions = auctions.filter((a) => a.status === "ended");

  return (
    <Layout>
      {/* Hero */}
      <section className="pt-12 pb-8 bg-gradient-to-b from-card to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-4">
              <Gavel className="h-8 w-8 text-primary" />
              <h1 className="text-4xl md:text-5xl font-display font-bold">
                Live <span className="text-primary">Auctions</span>
              </h1>
            </div>
            <p className="text-lg text-muted-foreground">
              Bid on exclusive vehicles in real-time. Each auction features verified vehicles 
              with comprehensive inspection reports.
            </p>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap gap-8 mt-8">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-destructive/10 flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-destructive" />
              </div>
              <div>
                <div className="text-2xl font-bold">{liveAuctions.length}</div>
                <div className="text-sm text-muted-foreground">Live Now</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <Clock className="h-6 w-6 text-primary" />
              </div>
              <div>
                <div className="text-2xl font-bold">{upcomingAuctions.length}</div>
                <div className="text-sm text-muted-foreground">Upcoming</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Auctions */}
      <section className="py-8 bg-background">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="live" className="w-full">
            <TabsList className="mb-8 bg-card border border-border">
              <TabsTrigger value="live" className="gap-2">
                <span className="w-2 h-2 rounded-full bg-destructive animate-pulse" />
                Live ({liveAuctions.length})
              </TabsTrigger>
              <TabsTrigger value="upcoming">Upcoming ({upcomingAuctions.length})</TabsTrigger>
              <TabsTrigger value="ended">Ended ({endedAuctions.length})</TabsTrigger>
            </TabsList>

            <TabsContent value="live">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {liveAuctions.map((auction) => (
                  <AuctionCard key={auction.id} auction={auction} />
                ))}
              </div>
              {liveAuctions.length === 0 && (
                <div className="text-center py-16">
                  <Gavel className="h-16 w-16 text-muted-foreground/30 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">No Live Auctions</h3>
                  <p className="text-muted-foreground">Check back soon for upcoming auctions.</p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="upcoming">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {upcomingAuctions.map((auction) => (
                  <AuctionCard key={auction.id} auction={auction} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="ended">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {endedAuctions.map((auction) => (
                  <AuctionCard key={auction.id} auction={auction} />
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
