import Link from "next/link";
import { CATEGORIES } from "@/lib/constants";
import { ArrowRight } from "lucide-react";

export function CategoriesSection() {
  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-black text-charcoal">
            Shop by Category
          </h2>
          <p className="mt-3 text-muted text-lg max-w-xl mx-auto">
            Explore our curated collection of premium healthy snacks
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-6">
          {CATEGORIES.map((category) => (
            <Link
              key={category.slug}
              href={`/shop/${category.slug}`}
              className="group relative flex flex-col items-center p-6 lg:p-8 rounded-3xl bg-soft-beige hover:bg-white border-2 border-transparent hover:border-sunset/20 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
            >
              <span className="text-4xl lg:text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
                {category.emoji}
              </span>
              <h3 className="font-bold text-charcoal text-sm lg:text-base text-center">
                {category.name}
              </h3>
              <p className="text-xs text-muted text-center mt-1 hidden sm:block">
                {category.description}
              </p>
              <ArrowRight className="h-4 w-4 text-sunset mt-3 opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
