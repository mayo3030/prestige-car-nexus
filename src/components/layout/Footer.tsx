import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import logo from "@/assets/jersey-auto-lease-logo.png";

const footerLinks = {
  inventory: [
    { label: "Browse All Cars", href: "/inventory" },
    { label: "Sedans", href: "/inventory?type=sedan" },
    { label: "SUVs & Crossovers", href: "/inventory?type=suv" },
    { label: "Trucks", href: "/inventory?type=truck" },
    { label: "Specials", href: "/specials" },
  ],
  services: [
    { label: "Sell Your Car", href: "/sell" },
    { label: "Auctions", href: "/auctions" },
    { label: "Financing", href: "/financing" },
    { label: "Credit Application", href: "/financing" },
    { label: "Vehicle Inspection", href: "/inspection" },
  ],
  company: [
    { label: "About Us", href: "/about" },
    { label: "Contact Us", href: "/contact" },
    { label: "Specials", href: "/specials" },
    { label: "Inventory", href: "/inventory" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-card border-t border-border">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-3 mb-6">
              <img src={logo} alt="Jersey Auto Lease" className="h-14 w-auto" />
            </Link>
            <p className="text-muted-foreground mb-6 max-w-sm">
              We provide quality service to our clients who are looking to purchase a new car 
              without the hassle of ever having to step foot at a car dealership. Wholesale 
              pricing on all makes and models!
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-muted-foreground">
                <MapPin className="h-5 w-5 text-primary" />
                <span>New Jersey, USA</span>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground">
                <Phone className="h-5 w-5 text-primary" />
                <span>Contact us for details</span>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground">
                <Mail className="h-5 w-5 text-primary" />
                <span>info@jerseyautolease.com</span>
              </div>
            </div>
          </div>

          {/* Inventory Links */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-4">Inventory</h4>
            <ul className="space-y-3">
              {footerLinks.inventory.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Links */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-4">Services</h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-4">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-border">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-6">
              <p className="text-sm text-muted-foreground">
                © 2024 Jersey Auto Lease. All rights reserved.
              </p>
              <div className="hidden md:flex items-center gap-4">
                {footerLinks.legal.map((link) => (
                  <Link
                    key={link.label}
                    to={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-4">
              <a
                href="/contact"
                className="p-2 text-muted-foreground hover:text-primary transition-colors"
                aria-label="Ask about Facebook updates"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="/contact"
                className="p-2 text-muted-foreground hover:text-primary transition-colors"
                aria-label="Ask about Instagram updates"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="/contact"
                className="p-2 text-muted-foreground hover:text-primary transition-colors"
                aria-label="Ask about Twitter updates"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="/contact"
                className="p-2 text-muted-foreground hover:text-primary transition-colors"
                aria-label="Ask about YouTube updates"
              >
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
