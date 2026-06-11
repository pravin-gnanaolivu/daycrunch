"use client";

import { useState, useMemo, Suspense, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { ProductCard } from "@/components/product/product-card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, SlidersHorizontal } from "lucide-react";

const API_URL = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

function ShopContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") ?? "";
  const initialSort = searchParams.get("sort") ?? "featured";

  const [allProducts, setAllProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState(initialQuery);
  const [sort, setSort] = useState(initialSort);
  const [category, setCategory] = useState<string>("all");
  const [priceRange, setPriceRange] = useState<string>("all");
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [productsRes, categoriesRes] = await Promise.all([
          fetch(`${API_URL}/api/products?limit=1000`),
          fetch(`${API_URL}/api/categories`),
        ]);

        const productsData = await productsRes.json();
        const categoriesData = await categoriesRes.json();

        setAllProducts(productsData.products || []);
        setCategories(categoriesData || []);
      } catch (error) {
        console.error("Error loading products:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const filteredProducts = useMemo(() => {
    let products = [...allProducts];

    if (query) {
      const q = query.toLowerCase();
      products = products.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description?.toLowerCase().includes(q) ||
          p.category?.name.toLowerCase().includes(q),
      );
    }

    if (category !== "all") {
      products = products.filter((p) => p.category?.slug === category);
    }

    if (priceRange === "under-300") {
      products = products.filter((p) => Number(p.basePrice) < 300);
    } else if (priceRange === "300-500") {
      products = products.filter((p) => {
        const price = Number(p.basePrice);
        return price >= 300 && price <= 500;
      });
    } else if (priceRange === "500-1000") {
      products = products.filter((p) => {
        const price = Number(p.basePrice);
        return price > 500 && price <= 1000;
      });
    } else if (priceRange === "above-1000") {
      products = products.filter((p) => Number(p.basePrice) > 1000);
    }

    switch (sort) {
      case "price-low":
        products.sort((a, b) => Number(a.basePrice) - Number(b.basePrice));
        break;
      case "price-high":
        products.sort((a, b) => Number(b.basePrice) - Number(a.basePrice));
        break;
      case "rating":
        products.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      case "bestseller":
        products.sort(
          (a, b) => (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0),
        );
        break;
      case "newest":
        products.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
    }

    return products;
  }, [query, sort, category, priceRange, allProducts]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <p className="text-center">Loading products...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 lg:py-12">
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-black text-charcoal">
          Shop All
        </h1>
        <p className="mt-2 text-muted">
          {filteredProducts.length} premium products
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <aside
          className={`lg:w-64 flex-shrink-0 ${showFilters ? "block" : "hidden lg:block"}`}
        >
          <div className="sticky top-24 space-y-6 bg-white rounded-2xl p-6 border border-gray-100">
            <div>
              <h3 className="font-bold text-charcoal mb-3">Categories</h3>
              <div className="space-y-2">
                <button
                  onClick={() => setCategory("all")}
                  className={`block w-full text-left text-sm py-1.5 px-2 rounded-lg transition-colors ${
                    category === "all"
                      ? "bg-sunset/10 text-sunset font-semibold"
                      : "text-muted hover:text-charcoal"
                  }`}
                >
                  All Products
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat.slug}
                    onClick={() => setCategory(cat.slug)}
                    className={`block w-full text-left text-sm py-1.5 px-2 rounded-lg transition-colors ${
                      category === cat.slug
                        ? "bg-sunset/10 text-sunset font-semibold"
                        : "text-muted hover:text-charcoal"
                    }`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-bold text-charcoal mb-3">Price Range</h3>
              <div className="space-y-2">
                {[
                  { value: "all", label: "All Prices" },
                  { value: "under-300", label: "Under ₹300" },
                  { value: "300-500", label: "₹300 - ₹500" },
                  { value: "500-1000", label: "₹500 - ₹1,000" },
                  { value: "above-1000", label: "Above ₹1,000" },
                ].map((range) => (
                  <button
                    key={range.value}
                    onClick={() => setPriceRange(range.value)}
                    className={`block w-full text-left text-sm py-1.5 px-2 rounded-lg transition-colors ${
                      priceRange === range.value
                        ? "bg-sunset/10 text-sunset font-semibold"
                        : "text-muted hover:text-charcoal"
                    }`}
                  >
                    {range.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </aside>

        <div className="flex-1">
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted" />
              <Input
                placeholder="Search products..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="h-11 rounded-xl border border-gray-200 bg-white px-4 text-sm text-charcoal focus:outline-none focus:ring-2 focus:ring-sunset"
            >
              <option value="featured">Featured</option>
              <option value="bestseller">Best Sellers</option>
              <option value="newest">Newest</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
            <Button
              variant="outline"
              className="lg:hidden"
              onClick={() => setShowFilters(!showFilters)}
            >
              <SlidersHorizontal className="h-4 w-4" />
              Filters
            </Button>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-xl font-semibold text-charcoal">
                No products found
              </p>
              <p className="text-muted mt-2">
                Try adjusting your filters or search query
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 lg:gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense
      fallback={<div className="container mx-auto px-4 py-12">Loading...</div>}
    >
      <ShopContent />
    </Suspense>
  );
}
