import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import { Logo } from "@/components/ui/Logo";

const footerLinks = {
  inventory: [
    { label: "Browse All Cars", href: "/inventory" },
    { label: "Sedans", href: "/inventory?type=sedan" },
    { label: "SUVs & Crossovers", href: "/inventory?type=suv" },
    { label: "Trucks", href: "/inventory?type=truck" },
    { label: "Specials", href: "/inventory?type=specials" },
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
    { label: "Privacy Policy", href: "/contact" },
    { label: "Terms of Service", href: "/contact" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-card border-t border-white/[0.04] relative">
      {/* Gold top divider */}
      <div className="h-[1px] bg-gradient-to-r from-transparent via-champagne/30 to-transparent" />

      {/* Main Footer */}
      <div className="container mx-auto px-4 py-10 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 md:gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-3 mb-6 group">
              <Logo variant="footer" className="h-16 w-auto transition-all duration-500 group-hover:scale-105" />
            </Link>
            <p className="text-muted-foreground mb-6 max-w-sm leading-relaxed">
              We provide quality service to our clients who are looking to purchase a new car 
              without the hassle of ever having to step foot at a car dealership. Wholesale 
              pricing on all makes and models!
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-muted-foreground group">
                <MapPin className="h-5 w-5 text-champagne/70 group-hover:text-champagne transition-colors duration-300" />
                <span>New Jersey, USA</span>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground group">
                <Phone className="h-5 w-5 text-champagne/70 group-hover:text-champagne transition-colors duration-300" />
                <span>Contact us for details</span>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground group">
                <Mail className="h-5 w-5 text-champagne/70 group-hover:text-champagne transition-colors duration-300" />
                <span>info@jerseyautolease.com</span>
              </div>
            </div>
          </div>

          {/* Inventory Links */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-4 text-foreground relative inline-block">
              Inventory
              <span className="absolute -bottom-1 left-0 w-8 h-[1px] bg-champagne/50" />
            </h4>
            <ul className="space-y-3 mt-4">
              {footerLinks.inventory.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-muted-foreground hover:text-champagne transition-colors duration-300 text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Links */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-4 text-foreground relative inline-block">
              Services
              <span className="absolute -bottom-1 left-0 w-8 h-[1px] bg-champagne/50" />
            </h4>
            <ul className="space-y-3 mt-4">
              {footerLinks.services.filter((l) => l.href !== "/inspection").map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-muted-foreground hover:text-champagne transition-colors duration-300 text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-4 text-foreground relative inline-block">
              Company
              <span className="absolute -bottom-1 left-0 w-8 h-[1px] bg-champagne/50" />
            </h4>
            <ul className="space-y-3 mt-4">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-muted-foreground hover:text-champagne transition-colors duration-300 text-sm"
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
      <div className="border-t border-white/[0.04]">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-6">
              <p className="text-sm text-muted-foreground">
                &copy; 2026 <span className="text-champagne/80">JERSEY AUTO LEASE</span>. All Rights Reserved.
              </p>
              <div className="hidden md:flex items-center gap-4">
                {footerLinks.legal.map((link) => (
                  <Link
                    key={link.label}
                    to={link.href}
                    className="text-sm text-muted-foreground hover:text-champagne transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-2">
              {[
                { icon: Facebook, label: "Facebook" },
                { icon: Instagram, label: "Instagram" },
                { icon: Twitter, label: "Twitter" },
                { icon: Youtube, label: "YouTube" },
              ].map(({ icon: Icon, label }) => (
                <span
                  key={label}
                  className="p-2.5 text-muted-foreground hover:text-champagne hover:bg-champagne/5 rounded-full transition-all duration-300 cursor-pointer"
                  aria-label={label}
                >
                  <Icon className="h-4 w-4" />
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
