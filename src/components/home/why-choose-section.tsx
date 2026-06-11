import { Award, Leaf, Heart, Truck } from "lucide-react";
import { BENEFITS } from "@/lib/constants";

const ICONS = { Award, Leaf, Heart, Truck } as const;

export function WhyChooseSection() {
  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-black text-charcoal">
            Why Choose DayCrunch?
          </h2>
          <p className="mt-3 text-muted text-lg max-w-xl mx-auto">
            We&apos;re not just another dry fruits store — we&apos;re your daily wellness partner
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {BENEFITS.map((benefit, i) => {
            const Icon = ICONS[benefit.icon as keyof typeof ICONS];
            const colors = ["bg-sunset/10 text-sunset", "bg-pistachio/10 text-pistachio", "bg-plum/10 text-plum", "bg-golden/20 text-golden"];
            return (
              <div
                key={benefit.title}
                className="text-center p-6 lg:p-8 rounded-3xl bg-soft-beige hover:bg-white border border-transparent hover:border-gray-100 hover:shadow-lg transition-all duration-300"
              >
                <div className={`inline-flex p-4 rounded-2xl ${colors[i]} mb-4`}>
                  <Icon className="h-7 w-7" />
                </div>
                <h3 className="font-bold text-lg text-charcoal mb-2">{benefit.title}</h3>
                <p className="text-sm text-muted leading-relaxed">{benefit.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
