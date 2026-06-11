"use client";

import { ProductCard } from "@/components/product/product-card";
import type { Product } from "@/types";

interface CategoryShopClientProps {
  category: {
    name: string;
    slug: string;
    description: string;
    emoji: string;
    color: string;
  };
  products: Product[];
}

export function CategoryShopClient({ category, products }: CategoryShopClientProps) {
  return (
    <div className="container mx-auto px-4 py-8 lg:py-12">
      <div className="mb-8 text-center">
        <span className="text-5xl">{category.emoji}</span>
        <h1 className="text-3xl sm:text-4xl font-black text-charcoal mt-4">
          {category.name}
        </h1>
        <p className="mt-2 text-muted text-lg max-w-xl mx-auto">
          {category.description}
        </p>
        <p className="mt-1 text-sm text-muted">{products.length} products</p>
      </div>

      {products.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-xl font-semibold text-charcoal">Coming Soon</p>
          <p className="text-muted mt-2">New products in this category are on the way!</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
