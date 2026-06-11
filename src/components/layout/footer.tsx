import Link from "next/link";
import { Share2, Globe, Mail, Phone, MapPin } from "lucide-react";
import { Logo } from "@/components/brand/logo";
import { BRAND, CATEGORIES } from "@/lib/constants";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const FOOTER_LINKS = {
  shop: [
    { href: "/shop", label: "All Products" },
    { href: "/shop/dates", label: "Dates" },
    { href: "/shop/nuts", label: "Nuts" },
    { href: "/shop/dry-fruits", label: "Dry Fruits" },
    { href: "/shop/dark-chocolates", label: "Dark Chocolates" },
    { href: "/gift-boxes", label: "Gift Boxes" },
  ],
  company: [
    { href: "/about", label: "About Us" },
    { href: "/corporate", label: "Corporate Orders" },
    { href: "/blog", label: "Blog" },
    { href: "/faq", label: "FAQ" },
    { href: "/contact", label: "Contact" },
  ],
  support: [
    { href: "/account/orders", label: "Track Order" },
    { href: "/faq", label: "Shipping & Returns" },
    { href: "/contact", label: "Help Center" },
    { href: "/account", label: "My Account" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-charcoal text-white mt-auto">
      <div className="container mx-auto px-4 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          <div className="lg:col-span-2">
            <Logo size="lg" showTagline />
            <p className="mt-4 text-gray-400 text-sm leading-relaxed max-w-sm">
              {BRAND.description}
            </p>
            <div className="flex gap-4 mt-6">
              <a
                href="https://instagram.com/daycrunch"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-white/10 hover:bg-sunset transition-colors"
                aria-label="Instagram"
              >
                <Share2 className="h-5 w-5" />
              </a>
              <a
                href="https://facebook.com/daycrunch"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-white/10 hover:bg-sunset transition-colors"
                aria-label="Facebook"
              >
                <Globe className="h-5 w-5" />
              </a>
              <a
                href={`https://wa.me/${BRAND.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-white/10 hover:bg-pistachio transition-colors"
                aria-label="WhatsApp"
              >
                <Phone className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-sm uppercase tracking-wider mb-4">Shop</h4>
            <ul className="space-y-2.5">
              {FOOTER_LINKS.shop.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-sunset transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-sm uppercase tracking-wider mb-4">Company</h4>
            <ul className="space-y-2.5">
              {FOOTER_LINKS.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-sunset transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-sm uppercase tracking-wider mb-4">
              Stay Crunchy
            </h4>
            <p className="text-sm text-gray-400 mb-4">
              Get exclusive offers, recipes & wellness tips.
            </p>
            <form className="flex flex-col gap-2">
              <Input
                type="email"
                placeholder="Your email"
                className="bg-white/10 border-white/20 text-white placeholder:text-gray-500"
              />
              <Button variant="default" size="sm" className="w-full">
                Subscribe
              </Button>
            </form>
            <div className="mt-6 space-y-2 text-sm text-gray-400">
              <a href={`mailto:${BRAND.email}`} className="flex items-center gap-2 hover:text-sunset">
                <Mail className="h-4 w-4" />
                {BRAND.email}
              </a>
              <p className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                {BRAND.address}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} DayCrunch. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-gray-500">
            <Link href="/privacy" className="hover:text-sunset">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-sunset">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
