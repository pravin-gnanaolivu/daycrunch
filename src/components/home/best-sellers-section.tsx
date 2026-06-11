import Link from "next/link";
import { ProductCard } from "@/components/product/product-card";
import { Button } from "@/components/ui/button";
import { fetchBestSellers } from "@/lib/db-queries";
import { ArrowRight } from "lucide-react";

interface BestSellersSectionProps {
  title?: string;
  subtitle?: string;
}

export async function BestSellersSection({
  title = "Best Sellers",
  subtitle = "Our most loved snacks, chosen by thousands of happy customers",
}: BestSellersSectionProps) {
  const { products } = await fetchBestSellers(4);

  if (!products || products.length === 0) {
    return null;
  }

  return (
    <section className="py-16 lg:py-24 bg-soft-beige">
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <h2 className="text-3xl sm:text-4xl font-black text-charcoal">
              {title}
            </h2>
            <p className="mt-3 text-muted text-lg max-w-xl">{subtitle}</p>
          </div>
          <Button asChild variant="outline">
            <Link href="/shop?sort=bestseller">
              View All
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
          {products.map((product: any) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
