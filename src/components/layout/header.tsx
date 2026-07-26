"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import {
  Search,
  Heart,
  ShoppingBag,
  User,
  Menu,
  X,
  ChevronRight,
} from "lucide-react";
import { Logo } from "@/components/brand/logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCartStore } from "@/store/cart-store";
import { useWishlistStore } from "@/store/wishlist-store";
import { CATEGORIES } from "@/lib/constants";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "/shop", label: "Shop" },
  { href: "/gift-boxes", label: "Gift Boxes" },
  { href: "/corporate", label: "Corporate" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Blog" },
];

export function Header() {
  const [mounted, setMounted] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const cartCount = useCartStore((s) => s.getItemCount());
  const wishlistCount = useWishlistStore((s) => s.getCount());

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [mobileOpen]);

  return (
    <>
    <header className="bg-cream/95 backdrop-blur-md border-b border-gray-100">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 lg:h-18 gap-4">
          <button
            className="lg:hidden p-2 -ml-2 text-charcoal"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>

          <Logo size="md" />

          <nav className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-charcoal hover:text-sunset transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-1 sm:gap-2">
            <button
              className="p-2 text-charcoal hover:text-sunset transition-colors"
              onClick={() => setSearchOpen(!searchOpen)}
              aria-label="Search"
            >
              <Search className="h-5 w-5" />
            </button>
            <Link
              href="/wishlist"
              className="relative p-2 text-charcoal hover:text-sunset transition-colors"
              aria-label="Wishlist"
            >
              <Heart className="h-5 w-5" />
              {mounted && wishlistCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 h-4 w-4 rounded-full bg-sunset text-white text-[10px] font-bold flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </Link>
            <Link
              href="/cart"
              className="relative p-2 text-charcoal hover:text-sunset transition-colors"
              aria-label="Cart"
            >
              <ShoppingBag className="h-5 w-5" />
              {mounted && cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 h-4 w-4 rounded-full bg-sunset text-white text-[10px] font-bold flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
            <Link
              href="/account"
              className="hidden sm:block p-2 text-charcoal hover:text-sunset transition-colors"
              aria-label="Account"
            >
              <User className="h-5 w-5" />
            </Link>
          </div>
        </div>

        {searchOpen && (
          <div className="pb-4 animate-in fade-in slide-in-from-top-2 duration-200">
            <form action="/shop" method="GET" className="flex gap-2">
              <Input
                name="q"
                placeholder="Search dates, nuts, chocolates..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1"
                autoFocus
              />
              <Button type="submit" size="default">
                Search
              </Button>
            </form>
          </div>
        )}
      </div>
    </header>

    <div
      className={cn(
        "lg:hidden fixed inset-0 z-[100] transition-opacity duration-300",
        mobileOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0",
      )}
      role="dialog"
      aria-modal="true"
      aria-label="Navigation menu"
      aria-hidden={!mobileOpen}
    >
      <div
        className="absolute inset-0 bg-charcoal/50 backdrop-blur-[2px]"
        aria-hidden="true"
        onClick={() => setMobileOpen(false)}
      />

      <div
        className={cn(
          "absolute inset-y-0 left-0 flex w-full max-w-[340px] flex-col bg-cream shadow-[8px_0_32px_rgba(91,42,134,0.15)] transition-transform duration-300 ease-out",
          mobileOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex h-16 shrink-0 items-center justify-between border-b border-plum/10 px-4">
          <Logo
            size="sm"
            onClick={() => setMobileOpen(false)}
          />
          <button
            type="button"
            className="rounded-full p-2 text-charcoal transition-colors hover:bg-white/80"
            onClick={() => setMobileOpen(false)}
            aria-label="Close menu"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="flex min-h-0 flex-1 flex-col overflow-y-auto overscroll-y-contain touch-pan-y">
          <nav className="space-y-1 px-4 pt-5">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center justify-between rounded-xl px-4 py-3.5 text-[15px] font-semibold text-charcoal transition-colors hover:bg-white active:bg-white/80"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
                <ChevronRight className="h-4 w-4 shrink-0 text-plum/35" />
              </Link>
            ))}
          </nav>

          <div className="mt-6 px-4">
            <p className="mb-3 px-1 text-[11px] font-bold uppercase tracking-widest text-plum/70">
              Shop by category
            </p>
            <div className="grid grid-cols-2 gap-2.5">
              {CATEGORIES.map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/shop/${cat.slug}`}
                  className="flex flex-col gap-1 rounded-xl border border-plum/8 bg-white px-3 py-3 transition-colors hover:border-sunset/35 hover:shadow-sm"
                  onClick={() => setMobileOpen(false)}
                >
                  <span className="text-xl leading-none">{cat.emoji}</span>
                  <span className="text-sm font-semibold leading-tight text-charcoal">
                    {cat.name}
                  </span>
                </Link>
              ))}
            </div>
          </div>

          <div className="mt-auto px-4 py-6">
            <Link
              href="/account"
              className="flex w-full items-center justify-center gap-2 rounded-full bg-plum py-3.5 text-sm font-semibold text-white transition-colors hover:bg-plum/90"
              onClick={() => setMobileOpen(false)}
            >
              <User className="h-4 w-4" />
              My Account
            </Link>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
