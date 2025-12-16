import { useState, useEffect } from "react";
import { 
  MessageSquare, 
  Ticket, 
  Users, 
  TrendingUp, 
  Clock, 
  AlertTriangle,
  RefreshCw,
  ChevronRight,
  Phone,
  Mail,
  ExternalLink
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

const API_URL = "https://8080-i9sqsgvlxjpy7al0ynwz7-d0b9e1e2.sandbox.novita.ai";

interface DashboardStats {
  active_conversations: number;
  open_tickets: number;
  urgent_tickets: number;
  total_customers: number;
  tickets_by_status: Record<string, number>;
  tickets_by_priority: Record<string, number>;
}

interface Conversation {
  id: string;
  customer_name: string;
  last_message: string;
  updated_at: string;
  status: string;
}

interface TicketItem {
  id: string;
  subject: string;
  customer_name: string;
  status: string;
  priority: string;
  created_at: string;
}

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  created_at: string;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [tickets, setTickets] = useState<TicketItem[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  const { toast } = useToast();

  const fetchData = async () => {
    setLoading(true);
    try {
      const [statsRes, convRes, ticketsRes, customersRes] = await Promise.all([
        fetch(`${API_URL}/api/dashboard/stats`),
        fetch(`${API_URL}/api/conversations`),
        fetch(`${API_URL}/api/tickets`),
        fetch(`${API_URL}/api/customers`),
      ]);

      if (statsRes.ok) {
        const statsData = await statsRes.json();
        setStats(statsData);
      }

      if (convRes.ok) {
        const convData = await convRes.json();
        setConversations(Array.isArray(convData) ? convData : convData.conversations || []);
      }

      if (ticketsRes.ok) {
        const ticketsData = await ticketsRes.json();
        setTickets(Array.isArray(ticketsData) ? ticketsData : ticketsData.tickets || []);
      }

      if (customersRes.ok) {
        const customersData = await customersRes.json();
        setCustomers(Array.isArray(customersData) ? customersData : customersData.customers || []);
      }
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      toast({
        title: "Error",
        description: "Failed to load dashboard data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    
    // WebSocket for real-time updates
    let ws: WebSocket | null = null;
    try {
      ws = new WebSocket(`wss://8080-i9sqsgvlxjpy7al0ynwz7-d0b9e1e2.sandbox.novita.ai/ws/dashboard`);
      ws.onmessage = (e) => {
        const data = JSON.parse(e.data);
        if (data.type === 'stats') {
          setStats(data.data);
        } else if (data.type === 'new_ticket' || data.type === 'new_message') {
          fetchData();
        }
      };
      ws.onerror = () => {
        console.log("WebSocket connection failed, using polling instead");
      };
    } catch {
      console.log("WebSocket not available");
    }

    return () => {
      if (ws) ws.close();
    };
  }, []);

  const getPriorityColor = (priority: string) => {
    switch (priority?.toLowerCase()) {
      case 'urgent':
      case 'high':
        return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'medium':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      default:
        return 'bg-green-500/20 text-green-400 border-green-500/30';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'open':
      case 'new':
        return 'bg-primary/20 text-primary border-primary/30';
      case 'in_progress':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'closed':
      case 'resolved':
        return 'bg-muted text-muted-foreground border-muted';
      default:
        return 'bg-muted text-muted-foreground border-muted';
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border/50 bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Admin Dashboard
            </h1>
            <p className="text-sm text-muted-foreground">Jersey Auto Lease CRM</p>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={fetchData}
            disabled={loading}
            className="gap-2"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20 hover:border-primary/40 transition-colors">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Active Conversations</p>
                  <p className="text-3xl font-bold text-primary">{stats?.active_conversations ?? 0}</p>
                </div>
                <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center">
                  <MessageSquare className="h-6 w-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-500/10 to-blue-500/5 border-blue-500/20 hover:border-blue-500/40 transition-colors">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Open Tickets</p>
                  <p className="text-3xl font-bold text-blue-400">{stats?.open_tickets ?? 0}</p>
                </div>
                <div className="h-12 w-12 rounded-full bg-blue-500/20 flex items-center justify-center">
                  <Ticket className="h-6 w-6 text-blue-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-red-500/10 to-red-500/5 border-red-500/20 hover:border-red-500/40 transition-colors">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Urgent Tickets</p>
                  <p className="text-3xl font-bold text-red-400">{stats?.urgent_tickets ?? 0}</p>
                </div>
                <div className="h-12 w-12 rounded-full bg-red-500/20 flex items-center justify-center">
                  <AlertTriangle className="h-6 w-6 text-red-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-500/10 to-green-500/5 border-green-500/20 hover:border-green-500/40 transition-colors">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Customers</p>
                  <p className="text-3xl font-bold text-green-400">{stats?.total_customers ?? 0}</p>
                </div>
                <div className="h-12 w-12 rounded-full bg-green-500/20 flex items-center justify-center">
                  <Users className="h-6 w-6 text-green-400" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="bg-card border border-border/50">
            <TabsTrigger value="overview" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Overview
            </TabsTrigger>
            <TabsTrigger value="conversations" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Conversations
            </TabsTrigger>
            <TabsTrigger value="tickets" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Tickets
            </TabsTrigger>
            <TabsTrigger value="customers" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Customers
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {/* Recent Conversations */}
              <Card className="border-border/50">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <MessageSquare className="h-5 w-5 text-primary" />
                    Recent Conversations
                  </CardTitle>
                  <Button variant="ghost" size="sm" onClick={() => setActiveTab("conversations")}>
                    View All <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[300px]">
                    {conversations.length === 0 ? (
                      <p className="text-muted-foreground text-center py-8">No conversations yet</p>
                    ) : (
                      <div className="space-y-3">
                        {conversations.slice(0, 5).map((conv) => (
                          <div key={conv.id} className="p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                            <div className="flex items-center justify-between mb-1">
                              <span className="font-medium">{conv.customer_name || 'Unknown'}</span>
                              <Badge variant="outline" className={getStatusColor(conv.status)}>
                                {conv.status || 'active'}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground line-clamp-1">{conv.last_message || 'No messages'}</p>
                            <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {formatDate(conv.updated_at)}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
                  </ScrollArea>
                </CardContent>
              </Card>

              {/* Recent Tickets */}
              <Card className="border-border/50">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Ticket className="h-5 w-5 text-blue-400" />
                    Recent Tickets
                  </CardTitle>
                  <Button variant="ghost" size="sm" onClick={() => setActiveTab("tickets")}>
                    View All <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[300px]">
                    {tickets.length === 0 ? (
                      <p className="text-muted-foreground text-center py-8">No tickets yet</p>
                    ) : (
                      <div className="space-y-3">
                        {tickets.slice(0, 5).map((ticket) => (
                          <div key={ticket.id} className="p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                            <div className="flex items-center justify-between mb-1">
                              <span className="font-medium line-clamp-1">{ticket.subject || 'No subject'}</span>
                              <Badge variant="outline" className={getPriorityColor(ticket.priority)}>
                                {ticket.priority || 'normal'}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">{ticket.customer_name || 'Unknown customer'}</p>
                            <div className="flex items-center justify-between mt-1">
                              <Badge variant="outline" className={getStatusColor(ticket.status)}>
                                {ticket.status || 'new'}
                              </Badge>
                              <p className="text-xs text-muted-foreground flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {formatDate(ticket.created_at)}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </ScrollArea>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Conversations Tab */}
          <TabsContent value="conversations">
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-primary" />
                  All Conversations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[500px]">
                  {conversations.length === 0 ? (
                    <p className="text-muted-foreground text-center py-8">No conversations yet</p>
                  ) : (
                    <div className="space-y-3">
                      {conversations.map((conv) => (
                        <div key={conv.id} className="p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors border border-border/30">
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-semibold text-lg">{conv.customer_name || 'Unknown'}</span>
                            <Badge variant="outline" className={getStatusColor(conv.status)}>
                              {conv.status || 'active'}
                            </Badge>
                          </div>
                          <p className="text-muted-foreground">{conv.last_message || 'No messages'}</p>
                          <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {formatDate(conv.updated_at)}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tickets Tab */}
          <TabsContent value="tickets">
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Ticket className="h-5 w-5 text-blue-400" />
                  All Tickets
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[500px]">
                  {tickets.length === 0 ? (
                    <p className="text-muted-foreground text-center py-8">No tickets yet</p>
                  ) : (
                    <div className="space-y-3">
                      {tickets.map((ticket) => (
                        <div key={ticket.id} className="p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors border border-border/30">
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-semibold text-lg">{ticket.subject || 'No subject'}</span>
                            <div className="flex gap-2">
                              <Badge variant="outline" className={getPriorityColor(ticket.priority)}>
                                {ticket.priority || 'normal'}
                              </Badge>
                              <Badge variant="outline" className={getStatusColor(ticket.status)}>
                                {ticket.status || 'new'}
                              </Badge>
                            </div>
                          </div>
                          <p className="text-muted-foreground">{ticket.customer_name || 'Unknown customer'}</p>
                          <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            Created: {formatDate(ticket.created_at)}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Customers Tab */}
          <TabsContent value="customers">
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-green-400" />
                  All Customers
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[500px]">
                  {customers.length === 0 ? (
                    <p className="text-muted-foreground text-center py-8">No customers yet</p>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {customers.map((customer) => (
                        <div key={customer.id} className="p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors border border-border/30">
                          <div className="flex items-center gap-3 mb-3">
                            <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
                              <span className="text-primary font-semibold">
                                {customer.name?.charAt(0)?.toUpperCase() || '?'}
                              </span>
                            </div>
                            <div>
                              <p className="font-semibold">{customer.name || 'Unknown'}</p>
                              <p className="text-xs text-muted-foreground">
                                Customer since {formatDate(customer.created_at)}
                              </p>
                            </div>
                          </div>
                          <div className="space-y-1 text-sm">
                            {customer.email && (
                              <p className="flex items-center gap-2 text-muted-foreground">
                                <Mail className="h-4 w-4" />
                                {customer.email}
                              </p>
                            )}
                            {customer.phone && (
                              <p className="flex items-center gap-2 text-muted-foreground">
                                <Phone className="h-4 w-4" />
                                {customer.phone}
                              </p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
