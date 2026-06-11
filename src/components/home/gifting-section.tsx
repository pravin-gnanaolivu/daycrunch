import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Gift, Building2, Sparkles } from "lucide-react";

const GIFT_OPTIONS = [
  {
    title: "Festival Gifts",
    description: "Curated hampers for Diwali, Rakhi, Christmas & every celebration",
    icon: Sparkles,
    href: "/gift-boxes",
    color: "from-sunset/20 to-golden/20",
  },
  {
    title: "Corporate Gifts",
    description: "Premium hampers for teams, clients & business partners",
    icon: Building2,
    href: "/corporate",
    color: "from-plum/20 to-sunset/20",
  },
  {
    title: "Premium Hampers",
    description: "Luxury gift boxes for weddings, birthdays & special occasions",
    icon: Gift,
    href: "/gift-boxes",
    color: "from-pistachio/20 to-plum/20",
  },
];

export function GiftingSection() {
  return (
    <section className="py-16 lg:py-24 bg-gradient-to-br from-plum to-plum/90 text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-sunset blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-golden blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-black">
            Gift Health, Gift Happiness
          </h2>
          <p className="mt-3 text-white/70 text-lg max-w-xl mx-auto">
            Premium gift hampers that leave a lasting impression
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {GIFT_OPTIONS.map((option) => (
            <Link
              key={option.title}
              href={option.href}
              className="group p-8 rounded-3xl bg-white/10 backdrop-blur-sm border border-white/10 hover:bg-white/20 transition-all duration-300 hover:-translate-y-1"
            >
              <div className={`inline-flex p-3 rounded-2xl bg-gradient-to-br ${option.color} mb-4`}>
                <option.icon className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-bold text-xl mb-2">{option.title}</h3>
              <p className="text-white/70 text-sm leading-relaxed mb-4">
                {option.description}
              </p>
              <span className="inline-flex items-center gap-1 text-sm font-semibold text-golden group-hover:gap-2 transition-all">
                Explore <ArrowRight className="h-4 w-4" />
              </span>
            </Link>
          ))}
        </div>

        <div className="text-center mt-10">
          <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-plum">
            <Link href="/gift-boxes">
              View All Gift Boxes
              <ArrowRight className="h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
