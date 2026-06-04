import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, User, Heart, LayoutDashboard, Car } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import logo from "@/assets/jersey-auto-lease-logo.png";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/inventory", label: "Inventory" },
  { href: "/auctions", label: "Auctions" },
  { href: "/sell", label: "Sell Your Car" },
  { href: "/financing", label: "Financing" },
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact Us" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // Track scroll for glass-nav transition
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        scrolled ? "glass-nav" : "bg-transparent"
      )}
    >
      {/* Gold accent line at top */}
      <div className="h-[1px] bg-gradient-to-r from-transparent via-champagne/30 to-transparent" />
      
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-28">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <img 
              src={logo} 
              alt="Jersey Auto Lease" 
              className="h-20 w-auto transition-all duration-500 group-hover:scale-105 drop-shadow-lg"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={cn(
                  "px-4 py-2 text-sm font-medium transition-colors duration-300 relative group",
                  location.pathname === link.href
                    ? "text-champagne"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {link.label}
                {/* Gold underline indicator */}
                <span
                  className={cn(
                    "absolute bottom-0 left-1/2 -translate-x-1/2 h-[1px] bg-gradient-to-r from-champagne/0 via-champagne to-champagne/0 transition-all duration-300",
                    location.pathname === link.href ? "w-3/4" : "w-0 group-hover:w-1/2"
                  )}
                />
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-3">
            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-champagne transition-colors duration-300">
              <Heart className="h-5 w-5" />
            </Button>
            <Link to="/admin">
              <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-champagne transition-colors duration-300" title="Admin Dashboard">
                <LayoutDashboard className="h-5 w-5" />
              </Button>
            </Link>
            <Link to="/admin/inventory">
              <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-champagne transition-colors duration-300" title="Manage Inventory">
                <Car className="h-5 w-5" />
              </Button>
            </Link>
            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-champagne transition-colors duration-300">
              <User className="h-5 w-5" />
            </Button>
            <Link to="/financing">
              <Button className="bg-gradient-to-r from-champagne to-gold text-black hover:opacity-90 px-6 rounded-full font-semibold shadow-lg shadow-champagne/20 animate-gold-glow">
                Get Approved
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 text-foreground"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden bg-background/95 backdrop-blur-xl border-t border-white/[0.06] animate-fade-in">
            <nav className="flex flex-col gap-2 py-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "mx-4 px-4 py-3 text-base font-medium rounded-lg transition-colors duration-300",
                    location.pathname === link.href
                      ? "bg-champagne/10 text-champagne border-l-2 border-champagne"
                      : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                  )}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                to="/admin"
                onClick={() => setIsOpen(false)}
                className="mx-4 px-4 py-3 text-base font-medium rounded-lg text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors duration-300 flex items-center gap-2"
              >
                <LayoutDashboard className="h-5 w-5" />
                Admin Dashboard
              </Link>
              <Link
                to="/admin/inventory"
                onClick={() => setIsOpen(false)}
                className="mx-4 px-4 py-3 text-base font-medium rounded-lg text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors duration-300 flex items-center gap-2"
              >
                <Car className="h-5 w-5" />
                Manage Inventory
              </Link>
              <div className="flex gap-3 mx-4 px-4 pb-4">
                <Button variant="outline" className="flex-1 rounded-full border-champagne/30 text-champagne hover:bg-champagne/10">
                  Sign In
                </Button>
                <Link to="/financing" className="flex-1">
                  <Button className="w-full bg-gradient-to-r from-champagne to-gold text-black rounded-full font-semibold shadow-lg shadow-champagne/20">
                    Get Approved
                  </Button>
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
