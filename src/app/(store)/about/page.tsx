import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { BRAND } from "@/lib/constants";
import { Heart, Leaf, Award, Users } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about DayCrunch — India's premium healthy snacking brand.",
};

export default function AboutPage() {
  return (
    <div>
      <section className="bg-gradient-to-br from-plum to-sunset text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl sm:text-5xl font-black">Our Story</h1>
          <p className="mt-4 text-white/80 text-lg max-w-2xl mx-auto">
            We believe healthy snacking shouldn&apos;t be boring. DayCrunch was born from a simple idea:
            make premium, nutritious snacks that people actually love to eat.
          </p>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-black text-charcoal">
                Crunch Better. Live Better.
              </h2>
              <p className="mt-4 text-muted leading-relaxed">
                Founded in Mumbai, DayCrunch is on a mission to transform how India snacks.
                We source the finest dates from the Middle East, premium nuts from California,
                and craft dark chocolates that satisfy without guilt.
              </p>
              <p className="mt-4 text-muted leading-relaxed">
                Every product is freshly packed, beautifully presented, and delivered with care.
                Whether you&apos;re fueling a workout, powering through a workday, or gifting
                someone special — DayCrunch has you covered.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: Heart, label: "50K+ Happy Customers", color: "text-sunset" },
                { icon: Leaf, label: "100% Natural", color: "text-pistachio" },
                { icon: Award, label: "Premium Quality", color: "text-plum" },
                { icon: Users, label: "Pan-India Delivery", color: "text-golden" },
              ].map((stat) => (
                <div key={stat.label} className="bg-soft-beige rounded-2xl p-6 text-center">
                  <stat.icon className={`h-8 w-8 ${stat.color} mx-auto mb-2`} />
                  <p className="text-sm font-semibold text-charcoal">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-soft-beige">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-black text-charcoal mb-8">Our Values</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { title: "Quality First", desc: "We never compromise on ingredient quality or freshness." },
              { title: "Transparency", desc: "Clear nutrition info, honest sourcing, no hidden ingredients." },
              { title: "Sustainability", desc: "Eco-friendly packaging and responsible sourcing practices." },
            ].map((value) => (
              <div key={value.title} className="bg-white rounded-2xl p-8">
                <h3 className="font-bold text-lg text-charcoal">{value.title}</h3>
                <p className="text-muted text-sm mt-2">{value.desc}</p>
              </div>
            ))}
          </div>
          <Button asChild size="lg" className="mt-10">
            <Link href="/shop">Shop Our Collection</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
