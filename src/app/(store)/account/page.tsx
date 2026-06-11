import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Package, Heart, MapPin, Settings } from "lucide-react";

const ACCOUNT_LINKS = [
  { href: "/account/orders", icon: Package, label: "My Orders", desc: "Track and manage orders" },
  { href: "/wishlist", icon: Heart, label: "Wishlist", desc: "Saved products" },
  { href: "/account/addresses", icon: MapPin, label: "Addresses", desc: "Manage delivery addresses" },
  { href: "/account/settings", icon: Settings, label: "Settings", desc: "Account preferences" },
];

export default function AccountPage() {
  return (
    <div className="container mx-auto px-4 py-8 lg:py-12 max-w-2xl">
      <h1 className="text-3xl font-black text-charcoal mb-8">My Account</h1>

      <div className="grid gap-4 mb-8">
        {ACCOUNT_LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="flex items-center gap-4 bg-white rounded-2xl p-5 border border-gray-100 hover:border-sunset/30 hover:shadow-md transition-all"
          >
            <div className="p-3 rounded-xl bg-soft-beige">
              <link.icon className="h-5 w-5 text-sunset" />
            </div>
            <div>
              <p className="font-semibold text-charcoal">{link.label}</p>
              <p className="text-sm text-muted">{link.desc}</p>
            </div>
          </Link>
        ))}
      </div>

      <div className="bg-white rounded-2xl p-6 border border-gray-100 text-center">
        <p className="text-muted mb-4">Sign in to access your account</p>
        <div className="flex gap-3 justify-center">
          <Button asChild>
            <Link href="/account/login">Sign In</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/account/register">Create Account</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
