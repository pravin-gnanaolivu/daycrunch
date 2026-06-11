import type { Metadata } from "next";
import Link from "next/link";
import { BestSellersSection } from "@/components/home/best-sellers-section";
import { Button } from "@/components/ui/button";
import { Gift, Sparkles, Heart } from "lucide-react";

export const metadata: Metadata = {
  title: "Gift Boxes & Hampers",
  description: "Premium healthy gift hampers for festivals, weddings, and corporate gifting.",
};

const GIFT_TYPES = [
  {
    icon: Sparkles,
    title: "Festival Hampers",
    description: "Diwali, Rakhi, Christmas & New Year — celebrate with health.",
    price: "From ₹999",
  },
  {
    icon: Heart,
    title: "Wedding Favors",
    description: "Elegant gift boxes for wedding guests and return gifts.",
    price: "From ₹499",
  },
  {
    icon: Gift,
    title: "Birthday Boxes",
    description: "Curated snack boxes that make birthdays extra special.",
    price: "From ₹799",
  },
];

export default function GiftBoxesPage() {
  return (
    <div>
      <section className="bg-gradient-to-br from-golden/30 via-cream to-sunset/20 py-16 lg:py-24">
        <div className="container mx-auto px-4 text-center">
          <span className="text-5xl">🎁</span>
          <h1 className="text-4xl sm:text-5xl font-black text-charcoal mt-4">
            Gift Boxes & Hampers
          </h1>
          <p className="mt-4 text-muted text-lg max-w-2xl mx-auto">
            Premium healthy gift hampers that leave a lasting impression.
            Perfect for festivals, weddings, birthdays & corporate gifting.
          </p>
          <Button asChild size="lg" className="mt-8">
            <Link href="/shop/gift-boxes">Shop Gift Boxes</Link>
          </Button>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            {GIFT_TYPES.map((type) => (
              <div key={type.title} className="bg-white rounded-3xl p-8 border border-gray-100 hover:shadow-lg transition-shadow text-center">
                <type.icon className="h-10 w-10 text-sunset mx-auto mb-4" />
                <h3 className="font-bold text-xl text-charcoal">{type.title}</h3>
                <p className="text-muted text-sm mt-2">{type.description}</p>
                <p className="text-sunset font-bold mt-4">{type.price}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <BestSellersSection title="Popular Gift Boxes" subtitle="Our most gifted hampers" />
    </div>
  );
}
