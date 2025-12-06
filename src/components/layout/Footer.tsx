import { Link } from "react-router-dom";
import { Car, Mail, Phone, MapPin, Facebook, Instagram, Twitter, Youtube } from "lucide-react";

const footerLinks = {
  inventory: [
    { label: "Browse All Cars", href: "/inventory" },
    { label: "Luxury Sedans", href: "/inventory?type=sedan" },
    { label: "Sports Cars", href: "/inventory?type=sports" },
    { label: "SUVs & Crossovers", href: "/inventory?type=suv" },
    { label: "Classic Cars", href: "/inventory?type=classic" },
  ],
  services: [
    { label: "Sell Your Car", href: "/sell" },
    { label: "Auctions", href: "/auctions" },
    { label: "Financing", href: "/financing" },
    { label: "Concierge Service", href: "/concierge" },
    { label: "Vehicle Inspection", href: "/inspection" },
  ],
  company: [
    { label: "About Us", href: "/about" },
    { label: "Contact", href: "/contact" },
    { label: "Careers", href: "/careers" },
    { label: "Press", href: "/press" },
    { label: "Blog", href: "/blog" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Cookie Policy", href: "/cookies" },
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
              <Car className="h-8 w-8 text-primary" />
              <div className="flex flex-col">
                <span className="text-xl font-display font-bold tracking-wide">
                  PRESTIGE
                </span>
                <span className="text-[10px] tracking-[0.3em] text-primary uppercase">
                  Motors
                </span>
              </div>
            </Link>
            <p className="text-muted-foreground mb-6 max-w-sm">
              The world's premier marketplace for luxury and exotic automobiles. 
              Experience the art of automotive excellence.
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-muted-foreground">
                <MapPin className="h-5 w-5 text-primary" />
                <span>Beverly Hills, California, USA</span>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground">
                <Phone className="h-5 w-5 text-primary" />
                <span>+1 (888) 555-0123</span>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground">
                <Mail className="h-5 w-5 text-primary" />
                <span>concierge@prestigemotors.com</span>
              </div>
            </div>
          </div>

          {/* Inventory Links */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-4">Inventory</h4>
            <ul className="space-y-3">
              {footerLinks.inventory.map((link) => (
                <li key={link.href}>
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
                <li key={link.href}>
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
                <li key={link.href}>
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
                © 2024 Prestige Motors. All rights reserved.
              </p>
              <div className="hidden md:flex items-center gap-4">
                {footerLinks.legal.map((link) => (
                  <Link
                    key={link.href}
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
                href="#"
                className="p-2 text-muted-foreground hover:text-primary transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="p-2 text-muted-foreground hover:text-primary transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="p-2 text-muted-foreground hover:text-primary transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="p-2 text-muted-foreground hover:text-primary transition-colors"
                aria-label="YouTube"
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
