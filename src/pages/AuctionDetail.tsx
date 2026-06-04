import { useParams, Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Gavel, ArrowLeft } from "lucide-react";

const auctionData: Record<string, {
  title: string;
  image: string;
  currentBid: number;
  bids: number;
  endTime: string;
  description: string;
}> = {
  "1": {
    title: "Ferrari SF90 Stradale",
    image: "https://images.unsplash.com/photo-1592198084033-aade902d1aae?q=80&w=2670",
    currentBid: 725000,
    bids: 14,
    endTime: "2 days",
    description: "2023 Ferrari SF90 Stradale in pristine condition. Less than 1,200 miles. Hybrid V8 engine producing 986 hp. A true masterpiece of automotive engineering."
  },
  "2": {
    title: "Lamborghini Huracán EVO",
    image: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?q=80&w=2670",
    currentBid: 345000,
    bids: 8,
    endTime: "5 days",
    description: "2024 Lamborghini Huracán EVO with all optional packages. 631 hp V10 engine. Less than 500 miles."
  }
};

export default function AuctionDetail() {
  const { id } = useParams();
  const auction = id ? auctionData[id] : null;

  if (!auction) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-3xl font-bold mb-4">Auction Not Found</h1>
          <p className="text-muted-foreground mb-8">This auction listing is no longer available.</p>
          <Link to="/auctions">
            <Button><ArrowLeft className="mr-2 h-4 w-4" />Back to Auctions</Button>
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-20">
        <Link to="/auctions" className="inline-flex items-center text-muted-foreground hover:text-foreground mb-6 transition-colors">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Auctions
        </Link>
        
        <div className="grid lg:grid-cols-2 gap-8">
          <div>
            <div className="rounded-xl overflow-hidden">
              <img src={auction.image} alt={auction.title} className="w-full h-[400px] object-cover" />
            </div>
          </div>
          
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">{auction.title}</h1>
              <p className="text-muted-foreground">{auction.description}</p>
            </div>
            
            <Card>
              <CardContent className="p-6 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Current Bid</span>
                  <span className="text-3xl font-bold text-primary">${auction.currentBid.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground flex items-center gap-1"><Gavel className="h-4 w-4" /> {auction.bids} bids</span>
                  <span className="text-muted-foreground flex items-center gap-1"><Clock className="h-4 w-4" /> Ends in {auction.endTime}</span>
                </div>
                <Button className="w-full" size="lg">Place Bid</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
}
