"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Heart, ShoppingBag, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ProductImage } from "@/components/ui/product-image";
import { formatPrice, calculateDiscount, cn } from "@/lib/utils";
import { useCartStore } from "@/store/cart-store";
import { useWishlistStore } from "@/store/wishlist-store";
import type { Product } from "@/types";
import { toast } from "sonner";

interface ProductCardProps {
  product: Product;
  className?: string;
}

export function ProductCard({ product, className }: ProductCardProps) {
  const [mounted, setMounted] = useState(false);
  const addToCart = useCartStore((s) => s.addItem);
  const { toggleItem, hasItem } = useWishlistStore();

  useEffect(() => {
    setMounted(true);
  }, []);
  const basePrice = Number(product.basePrice || product.price || 0);
  const compareAtPrice = product.compareAtPrice
    ? Number(product.compareAtPrice)
    : undefined;
  const discount = calculateDiscount(basePrice, compareAtPrice);
  const isWishlisted = mounted && hasItem(product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (product.isActive === false) {
      toast.error("This product is currently unavailable");
      return;
    }

    if ((product.stock ?? 0) <= 0) {
      toast.error("This product is out of stock");
      return;
    }
    const imageUrl =
      typeof product.images?.[0] === "string"
        ? product.images[0]
        : product.images?.[0]?.url || "/placeholder.svg";

    addToCart({
      productId: product.id,
      name: product.name,
      slug: product.slug,
      price: basePrice,
      image: imageUrl,
      variantId: product.variants?.[0]?.id,
      weight: product.variants?.[0]?.weight,
    });
    toast.success(`${product.name} added to cart`);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleItem(product.id);
    toast.success(isWishlisted ? "Removed from wishlist" : "Added to wishlist");
  };

  return (
    <Link
      href={`/product/${product.slug}`}
      className={cn(
        "group relative flex flex-col rounded-2xl bg-white border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1",
        className,
      )}
    >
      <div className="relative aspect-square overflow-hidden bg-soft-beige">
        <ProductImage
          src={
            typeof product.images?.[0] === "string"
              ? product.images[0]
              : product.images?.[0]?.url
          }
          alt={product.name}
          size="card"
          className="transition-transform duration-500 group-hover:scale-105"
        />

        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {product.isBestSeller && <Badge variant="sale">Best Seller</Badge>}
          {product.isNew && <Badge variant="accent">New</Badge>}
          {discount > 0 && <Badge variant="default">{discount}% OFF</Badge>}
        </div>

        <button
          onClick={handleWishlist}
          className={cn(
            "absolute top-3 right-3 p-2 rounded-full bg-white/90 backdrop-blur-sm shadow-sm transition-all hover:scale-110",
            isWishlisted && "text-sunset",
          )}
          aria-label="Add to wishlist"
        >
          <Heart className={cn("h-4 w-4", isWishlisted && "fill-current")} />
        </button>

        <div className="absolute bottom-0 inset-x-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <Button
            size="sm"
            className="w-full"
            onClick={handleAddToCart}
            disabled={product.isActive === false || (product.stock ?? 0) <= 0}
          >
            <ShoppingBag className="h-4 w-4" />
            {product.isActive === false
              ? "Unavailable"
              : (product.stock ?? 0) <= 0
                ? "Out of Stock"
                : "Quick Add"}
          </Button>
        </div>
      </div>

      <div className="p-4 flex flex-col flex-1">
        <p className="text-xs font-medium text-muted uppercase tracking-wider mb-1">
          {typeof product.category === "string"
            ? product.category
            : product.category?.name}
        </p>
        <h3 className="font-semibold text-charcoal text-sm sm:text-base line-clamp-2 group-hover:text-sunset transition-colors">
          {product.name}
        </h3>

        <div className="flex items-center gap-1 mt-2">
          <div className="flex">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={cn(
                  "h-3 w-3",
                  i < Math.floor(product.rating || 0)
                    ? "fill-golden text-golden"
                    : "text-gray-200",
                )}
              />
            ))}
          </div>
          <span className="text-xs text-muted">
            ({product.reviewCount || 0})
          </span>
        </div>

        <div className="mt-auto pt-3 flex items-baseline gap-2">
          <span className="text-lg font-bold text-charcoal">
            {formatPrice(basePrice)}
          </span>
          {compareAtPrice && (
            <span className="text-sm text-muted line-through">
              {formatPrice(compareAtPrice)}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
