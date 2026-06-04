import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ProtectedAdminRoute } from "@/components/auth/ProtectedAdminRoute";

const Index = lazy(() => import("./pages/Index"));
const Inventory = lazy(() => import("./pages/Inventory"));
const Auctions = lazy(() => import("./pages/Auctions"));
const AuctionDetail = lazy(() => import("./pages/AuctionDetail"));
const Sell = lazy(() => import("./pages/Sell"));
const Financing = lazy(() => import("./pages/Financing"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const VehicleDetail = lazy(() => import("./pages/VehicleDetail"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));
const AdminLogin = lazy(() => import("./pages/AdminLogin"));
const StaticPage = lazy(() => import("./pages/StaticPage"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Suspense
          fallback={
            <div className="min-h-screen bg-background flex items-center justify-center text-muted-foreground">
              Loading Jersey Auto Lease...
            </div>
          }
        >
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/auctions" element={<Auctions />} />
            <Route path="/auction/:id" element={<AuctionDetail />} />
            <Route path="/sell" element={<Sell />} />
            <Route path="/financing" element={<Financing />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/vehicle/:id" element={<VehicleDetail />} />
            <Route path="/privacy" element={<StaticPage kind="privacy" />} />
            <Route path="/terms" element={<StaticPage kind="terms" />} />
            <Route path="/inspection" element={<StaticPage kind="inspection" />} />
            <Route path="/specials" element={<StaticPage kind="specials" />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route
              path="/admin"
              element={
                <ProtectedAdminRoute>
                  <AdminDashboard />
                </ProtectedAdminRoute>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
