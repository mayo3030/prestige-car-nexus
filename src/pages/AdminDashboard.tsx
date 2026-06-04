import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AlertTriangle, Car, ClipboardList, Home, LogOut, MessageSquare, RefreshCw, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getAdminSnapshot, signOutStaff, type AdminRecord, type AdminSnapshot } from "@/lib/repository";
import { useToast } from "@/hooks/use-toast";

const emptySnapshot: AdminSnapshot = {
  activeConversations: 0,
  openTickets: 0,
  urgentTickets: 0,
  totalCustomers: 0,
  leads: [],
  tickets: [],
  sellSubmissions: [],
  financeApplications: [],
};

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(value));
}

function statusColor(status: string) {
  if (["urgent", "high", "new"].includes(status.toLowerCase())) return "border-primary/40 text-primary";
  if (["closed", "resolved", "won"].includes(status.toLowerCase())) return "border-green-500/40 text-green-400";
  return "border-border text-muted-foreground";
}

function RecordList({ records, emptyLabel }: { records: AdminRecord[]; emptyLabel: string }) {
  if (!records.length) {
    return <p className="text-muted-foreground text-center py-10">{emptyLabel}</p>;
  }

  return (
    <div className="space-y-3">
      {records.map((record) => (
        <div key={record.id} className="rounded-xl bg-secondary/50 border border-border p-4">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
            <div>
              <h3 className="font-semibold">{record.title}</h3>
              <p className="text-sm text-muted-foreground">{record.subtitle}</p>
            </div>
            <div className="flex items-center gap-2">
              {record.priority && (
                <Badge variant="outline" className={statusColor(record.priority)}>
                  {record.priority}
                </Badge>
              )}
              <Badge variant="outline" className={statusColor(record.status)}>
                {record.status}
              </Badge>
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-2">{formatDate(record.created_at)}</p>
        </div>
      ))}
    </div>
  );
}

export default function AdminDashboard() {
  const [snapshot, setSnapshot] = useState<AdminSnapshot>(emptySnapshot);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  const loadDashboard = async () => {
    setLoading(true);
    const data = await getAdminSnapshot();
    setSnapshot(data);
    setLoading(false);
  };

  useEffect(() => {
    loadDashboard();
  }, []);

  const handleSignOut = async () => {
    await signOutStaff();
    navigate("/admin/login", { replace: true });
  };

  const handleRefresh = async () => {
    await loadDashboard();
    toast({ title: "Dashboard refreshed", description: "Latest Supabase records loaded." });
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border/50 bg-card/70 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-display font-bold text-primary">Admin Dashboard</h1>
            <p className="text-sm text-muted-foreground">Jersey Auto Lease operating pipeline</p>
          </div>
          <div className="flex items-center gap-2">
            <Link to="/">
              <Button variant="outline" size="sm" className="gap-2">
                <Home className="h-4 w-4" />
                Home
              </Button>
            </Link>
            <Button variant="outline" size="sm" onClick={handleRefresh} disabled={loading} className="gap-2">
              <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
              Refresh
            </Button>
            <Button variant="ghost" size="sm" onClick={handleSignOut} className="gap-2">
              <LogOut className="h-4 w-4" />
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Card className="border-primary/20 bg-primary/5">
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Conversations</p>
                <p className="text-3xl font-bold text-primary">{snapshot.activeConversations}</p>
              </div>
              <MessageSquare className="h-8 w-8 text-primary" />
            </CardContent>
          </Card>
          <Card className="border-blue-500/20 bg-blue-500/5">
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Open Tickets</p>
                <p className="text-3xl font-bold text-blue-400">{snapshot.openTickets}</p>
              </div>
              <ClipboardList className="h-8 w-8 text-blue-400" />
            </CardContent>
          </Card>
          <Card className="border-destructive/20 bg-destructive/5">
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Urgent Tickets</p>
                <p className="text-3xl font-bold text-destructive">{snapshot.urgentTickets}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-destructive" />
            </CardContent>
          </Card>
          <Card className="border-green-500/20 bg-green-500/5">
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Known Customers</p>
                <p className="text-3xl font-bold text-green-400">{snapshot.totalCustomers}</p>
              </div>
              <Users className="h-8 w-8 text-green-400" />
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="leads" className="space-y-4">
          <TabsList className="bg-card border border-border flex flex-wrap h-auto">
            <TabsTrigger value="leads">Leads</TabsTrigger>
            <TabsTrigger value="sell">Sell Submissions</TabsTrigger>
            <TabsTrigger value="finance">Finance</TabsTrigger>
            <TabsTrigger value="tickets">Tickets</TabsTrigger>
          </TabsList>
          <TabsContent value="leads">
            <Card className="border-border/60">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  Website Leads
                </CardTitle>
              </CardHeader>
              <CardContent>
                <RecordList records={snapshot.leads} emptyLabel="No leads yet. Valid contact and vehicle inquiry forms will appear here." />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="sell">
            <Card className="border-border/60">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Car className="h-5 w-5 text-primary" />
                  Sell Submissions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <RecordList records={snapshot.sellSubmissions} emptyLabel="No sell submissions yet." />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="finance">
            <Card className="border-border/60">
              <CardHeader>
                <CardTitle>Finance Applications</CardTitle>
              </CardHeader>
              <CardContent>
                <RecordList records={snapshot.financeApplications} emptyLabel="No finance applications yet." />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="tickets">
            <Card className="border-border/60">
              <CardHeader>
                <CardTitle>Support Tickets</CardTitle>
              </CardHeader>
              <CardContent>
                <RecordList records={snapshot.tickets} emptyLabel="No tickets yet." />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
