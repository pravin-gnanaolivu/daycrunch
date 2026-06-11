import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Share2 } from "lucide-react";

const INSTAGRAM_POSTS = [
  { id: 1, emoji: "🌴", label: "Medjool Dates" },
  { id: 2, emoji: "🥜", label: "Premium Almonds" },
  { id: 3, emoji: "🍫", label: "Dark Chocolate" },
  { id: 4, emoji: "🎁", label: "Gift Hampers" },
  { id: 5, emoji: "🍇", label: "Dry Fruits" },
  { id: 6, emoji: "💪", label: "Energy Packs" },
];

export function InstagramSection() {
  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-black text-charcoal">
            @daycrunch on Instagram
          </h2>
          <p className="mt-3 text-muted text-lg">
            Join our community of healthy snackers
          </p>
        </div>

        <div className="grid grid-cols-3 md:grid-cols-6 gap-2 lg:gap-4">
          {INSTAGRAM_POSTS.map((post) => (
            <a
              key={post.id}
              href="https://instagram.com/daycrunch"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square rounded-2xl bg-soft-beige overflow-hidden hover:ring-2 hover:ring-sunset transition-all"
            >
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl lg:text-4xl group-hover:scale-110 transition-transform">
                  {post.emoji}
                </span>
              </div>
              <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/40 transition-colors flex items-center justify-center">
                <Share2 className="h-6 w-6 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </a>
          ))}
        </div>

        <div className="text-center mt-8">
          <Button asChild variant="outline">
            <a href="https://instagram.com/daycrunch" target="_blank" rel="noopener noreferrer">
              <Share2 className="h-4 w-4" />
              Follow @daycrunch
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}

export function NewsletterSection() {
  return (
    <section className="py-16 lg:py-20 bg-gradient-to-r from-sunset to-plum">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl sm:text-4xl font-black text-white">
          Stay in the Crunch Loop
        </h2>
        <p className="mt-3 text-white/80 text-lg max-w-lg mx-auto">
          Exclusive offers, wellness tips & new product launches — straight to your inbox.
        </p>
        <form className="mt-8 flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <Input
            type="email"
            placeholder="Enter your email"
            className="flex-1 bg-white/95 border-0 h-12"
            required
          />
          <Button
            type="submit"
            variant="secondary"
            size="lg"
            className="bg-charcoal hover:bg-charcoal/90 text-white"
          >
            Subscribe
          </Button>
        </form>
        <p className="mt-3 text-xs text-white/60">
          No spam. Unsubscribe anytime.
        </p>
      </div>
    </section>
  );
}

export function LifestyleSection() {
  return (
    <section className="py-16 lg:py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <div className="aspect-[4/3] rounded-3xl bg-gradient-to-br from-pistachio/20 via-soft-beige to-sunset/20 flex items-center justify-center">
              <div className="text-center p-8">
                <div className="flex justify-center gap-4 text-5xl mb-4">
                  <span>🥜</span>
                  <span>🌴</span>
                  <span>🍫</span>
                </div>
                <p className="text-2xl font-black text-charcoal">Fuel Your Day</p>
                <p className="text-muted mt-2">Natural energy. Zero guilt.</p>
              </div>
            </div>
          </div>
          <div>
            <h2 className="text-3xl sm:text-4xl font-black text-charcoal">
              Snacking Reimagined for{" "}
              <span className="text-pistachio">Modern India</span>
            </h2>
            <p className="mt-4 text-muted text-lg leading-relaxed">
              Gone are the days of boring dry fruits in plain boxes. DayCrunch brings you
              premium, beautifully packaged healthy snacks that fit your lifestyle — whether
              you&apos;re crushing a workout, powering through a workday, or gifting someone special.
            </p>
            <ul className="mt-6 space-y-3">
              {[
                "No preservatives, no artificial flavors",
                "Sourced from the world's finest farms",
                "Nutritionist-approved snack combinations",
                "Eco-friendly, gift-ready packaging",
              ].map((item) => (
                <li key={item} className="flex items-center gap-3 text-charcoal">
                  <span className="h-2 w-2 rounded-full bg-pistachio flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export function TrustBadges() {
  const badges = [
    { icon: "🔒", label: "Secure Payments" },
    { icon: "🚚", label: "Pan-India Delivery" },
    { icon: "✅", label: "Quality Guaranteed" },
    { icon: "💬", label: "24/7 Support" },
  ];

  return (
    <section className="py-8 bg-soft-beige border-y border-gray-100">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {badges.map((badge) => (
            <div key={badge.label} className="flex items-center justify-center gap-2 py-2">
              <span className="text-xl">{badge.icon}</span>
              <span className="text-sm font-semibold text-charcoal">{badge.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
