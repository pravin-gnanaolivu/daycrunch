"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Star,
  Heart,
  ShoppingBag,
  Truck,
  Shield,
  Minus,
  Plus,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ProductCard } from "@/components/product/product-card";
import { ProductImage } from "@/components/ui/product-image";
import { formatPrice, calculateDiscount, cn } from "@/lib/utils";
import { MOCK_REVIEWS } from "@/lib/mock-data";
import { useCartStore } from "@/store/cart-store";
import { useWishlistStore } from "@/store/wishlist-store";
import { useRecentlyViewedStore } from "@/store/recently-viewed-store";
import type { Product } from "@/types";
import { toast } from "sonner";

function getImageUrl(img: string | { url?: string } | undefined): string {
  if (!img) return "";
  return typeof img === "string" ? img : img.url ?? "";
}

function getCategoryName(product: Product & { category?: Product["category"] | { name?: string } }) {
  return typeof product.category === "string"
    ? product.category
    : product.category?.name ?? "";
}

function getCategorySlug(product: Product) {
  return product.categorySlug ?? (typeof product.category === "object" && product.category && "slug" in product.category
    ? (product.category as { slug?: string }).slug
    : undefined);
}

interface ProductPageClientProps {
  initialProduct: Product;
  relatedProducts?: Product[];
}

export function ProductPageClient({
  initialProduct,
  relatedProducts = [],
}: ProductPageClientProps) {
  const [product] = useState(initialProduct);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState(product.variants?.[0] ?? null);
  const [quantity, setQuantity] = useState(1);

  const addToCart = useCartStore((s) => s.addItem);
  const { toggleItem, hasItem } = useWishlistStore();
  const addRecentlyViewed = useRecentlyViewedStore((s) => s.addItem);

  useEffect(() => {
    addRecentlyViewed(product.id);
  }, [product.id, addRecentlyViewed]);

  const images = product.images ?? [];
  const primaryImage = getImageUrl(images[selectedImage]);
  const basePrice = Number(product.basePrice ?? product.price ?? 0);
  const compareAt = product.compareAtPrice ? Number(product.compareAtPrice) : undefined;
  const price = selectedVariant?.price ?? basePrice;
  const discount = calculateDiscount(Number(price), compareAt);
  const isWishlisted = hasItem(product.id);
  const categorySlug = getCategorySlug(product);
  const categoryName = getCategoryName(product);
  const reviewCount = product.reviewCount ?? 0;

  const isAvailable =
    product.isActive !== false && (product.stock ?? 0) > 0;

  const handleAddToCart = () => {
    if (!isAvailable) {
      toast.error("This product is currently unavailable");
      return;
    }

    addToCart({
      productId: product.id,
      variantId: selectedVariant?.id,
      name: `${product.name}${selectedVariant ? ` — ${selectedVariant.name}` : ""}`,
      slug: product.slug,
      price: Number(price),
      image: primaryImage,
      quantity,
      weight: selectedVariant?.weight,
    });
    toast.success("Added to cart!");
  };

  const handleBuyNow = () => {
    handleAddToCart();
    window.location.href = "/checkout";
  };

  return (
    <>
      <div className="container mx-auto px-4 py-8 lg:py-12">
        <nav className="flex items-center gap-2 text-sm text-muted mb-8">
          <Link href="/" className="hover:text-sunset">
            Home
          </Link>
          <ChevronRight className="h-3 w-3" />
          <Link href="/shop" className="hover:text-sunset">
            Shop
          </Link>
          <ChevronRight className="h-3 w-3" />
          {categorySlug ? (
            <Link href={`/shop/${categorySlug}`} className="hover:text-sunset">
              {categoryName}
            </Link>
          ) : (
            <span>{categoryName}</span>
          )}
          <ChevronRight className="h-3 w-3" />
          <span className="text-charcoal font-medium truncate">
            {product.name}
          </span>
        </nav>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          <div>
            <div className="relative aspect-square rounded-3xl overflow-hidden bg-soft-beige mb-4">
              <ProductImage
                src={primaryImage}
                alt={product.name}
                size="detail"
                priority
              />
              {product.isBestSeller && (
                <Badge variant="sale" className="absolute top-4 left-4">
                  Best Seller
                </Badge>
              )}
            </div>
            {images.length > 1 && (
              <div className="flex gap-3">
                {images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={cn(
                      "relative w-20 h-20 rounded-xl overflow-hidden border-2 transition-colors",
                      selectedImage === i
                        ? "border-sunset"
                        : "border-transparent",
                    )}
                  >
                    <ProductImage
                      src={getImageUrl(img)}
                      alt=""
                      size="thumb"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div>
            <p className="text-sm font-medium text-muted uppercase tracking-wider">
              {categoryName}
            </p>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-charcoal mt-1">
              {product.name}
            </h1>

            <div className="flex items-center gap-3 mt-4">
              <div className="flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={cn(
                      "h-4 w-4",
                      i < Math.floor(product.rating ?? 0)
                        ? "fill-golden text-golden"
                        : "text-gray-200",
                    )}
                  />
                ))}
              </div>
              <span className="text-sm text-muted">
                {product.rating ?? 0} ({reviewCount} reviews)
              </span>
            </div>

            <div className="flex items-baseline gap-3 mt-6">
              <span className="text-3xl font-black text-charcoal">
                {formatPrice(Number(price))}
              </span>
              {compareAt && (
                <>
                  <span className="text-lg text-muted line-through">
                    {formatPrice(compareAt)}
                  </span>
                  {discount > 0 && (
                    <Badge variant="default">{discount}% OFF</Badge>
                  )}
                </>
              )}
            </div>

            <p className="mt-4 text-muted leading-relaxed">
              {product.shortDescription}
            </p>

            {product.variants && product.variants.length > 0 && (
              <div className="mt-6">
                <p className="text-sm font-semibold text-charcoal mb-3">
                  Select Size
                </p>
                <div className="flex flex-wrap gap-2">
                  {product.variants.map((variant) => (
                    <button
                      key={variant.id}
                      onClick={() => setSelectedVariant(variant)}
                      className={cn(
                        "px-4 py-2 rounded-xl border-2 text-sm font-medium transition-colors",
                        selectedVariant?.id === variant.id
                          ? "border-sunset bg-sunset/5 text-sunset"
                          : "border-gray-200 text-charcoal hover:border-sunset/50",
                      )}
                    >
                      {variant.name} — {formatPrice(Number(variant.price))}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-6 flex items-center gap-4">
              <div className="flex items-center border-2 border-gray-200 rounded-xl">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-3 hover:bg-soft-beige transition-colors"
                  aria-label="Decrease quantity"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="px-4 font-semibold">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-3 hover:bg-soft-beige transition-colors"
                  aria-label="Increase quantity"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
              <Button
                variant="outline"
                size="icon"
                onClick={() => toggleItem(product.id)}
              >
                <Heart
                  className={cn(
                    "h-5 w-5",
                    isWishlisted && "fill-sunset text-sunset",
                  )}
                />
              </Button>
            </div>

            {!isAvailable && (
              <p className="mt-4 text-sm font-semibold text-sunset">
                This product is currently unavailable
              </p>
            )}

            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <Button size="lg" className="flex-1" onClick={handleAddToCart} disabled={!isAvailable}>
                <ShoppingBag className="h-5 w-5" />
                {isAvailable ? "Add to Cart" : "Unavailable"}
              </Button>
              <Button
                size="lg"
                variant="secondary"
                className="flex-1"
                onClick={handleBuyNow}
                disabled={!isAvailable}
              >
                Buy Now
              </Button>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <div className="flex items-center gap-2 text-sm text-muted">
                <Truck className="h-4 w-4 text-pistachio" />
                Free shipping above ₹999
              </div>
              <div className="flex items-center gap-2 text-sm text-muted">
                <Shield className="h-4 w-4 text-pistachio" />
                100% quality guaranteed
              </div>
            </div>

            {(product.stock ?? 0) <= (product.stock ?? 0) * 0.2 && (product.stock ?? 0) > 0 && (
              <p className="mt-4 text-sm font-semibold text-sunset">
                Only {product.stock} left in stock!
              </p>
            )}
          </div>
        </div>

        <div className="mt-16 grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl p-6 border border-gray-100">
            <h3 className="font-bold text-lg text-charcoal mb-4">
              Product Details
            </h3>
            <p className="text-muted leading-relaxed">{product.description}</p>
            {product.ingredients && (
              <div className="mt-4">
                <h4 className="font-semibold text-charcoal text-sm">
                  Ingredients
                </h4>
                <p className="text-muted text-sm mt-1">{product.ingredients}</p>
              </div>
            )}
            {product.benefits && (
              <div className="mt-4">
                <h4 className="font-semibold text-charcoal text-sm">
                  Benefits
                </h4>
                <p className="text-muted text-sm mt-1">{product.benefits}</p>
              </div>
            )}
            {product.storageInfo && (
              <div className="mt-4">
                <h4 className="font-semibold text-charcoal text-sm">Storage</h4>
                <p className="text-muted text-sm mt-1">{product.storageInfo}</p>
              </div>
            )}
          </div>

          {product.nutritionInfo && (
            <div className="bg-white rounded-2xl p-6 border border-gray-100">
              <h3 className="font-bold text-lg text-charcoal mb-4">
                Nutrition Info
              </h3>
              <div className="space-y-3">
                {Object.entries(
                  product.nutritionInfo as Record<string, string>,
                ).map(([key, value]) => (
                  <div
                    key={key}
                    className="flex justify-between py-2 border-b border-gray-50"
                  >
                    <span className="text-sm text-muted capitalize">{key}</span>
                    <span className="text-sm font-semibold text-charcoal">
                      {value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="mt-16">
          <h2 className="text-2xl font-black text-charcoal mb-6">
            Customer Reviews
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {MOCK_REVIEWS.slice(0, 4).map((review) => (
              <div
                key={review.id}
                className="bg-white rounded-2xl p-6 border border-gray-100"
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex">
                    {Array.from({ length: review.rating }).map((_, i) => (
                      <Star
                        key={i}
                        className="h-3 w-3 fill-golden text-golden"
                      />
                    ))}
                  </div>
                  {review.verified && (
                    <Badge variant="accent" className="text-[10px]">
                      Verified
                    </Badge>
                  )}
                </div>
                <h4 className="font-semibold text-charcoal">{review.title}</h4>
                <p className="text-sm text-muted mt-1">{review.comment}</p>
                <p className="text-xs text-muted mt-3">— {review.author}</p>
              </div>
            ))}
          </div>
        </div>

        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-black text-charcoal mb-6">
              You May Also Like
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
