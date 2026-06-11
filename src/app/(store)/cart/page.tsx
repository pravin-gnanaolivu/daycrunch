"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCartStore } from "@/store/cart-store";
import { formatPrice } from "@/lib/utils";
import { FREE_SHIPPING_THRESHOLD, TAX_RATE } from "@/lib/constants";

export default function CartPage() {
  const { items, updateQuantity, removeItem, getSubtotal, couponCode, couponDiscount, applyCoupon } =
    useCartStore();

  const subtotal = getSubtotal();
  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : 99;
  const tax = Math.round(subtotal * TAX_RATE);
  const total = subtotal - couponDiscount + shipping + tax;

  const handleApplyCoupon = () => {
    const input = document.getElementById("coupon-input") as HTMLInputElement;
    const code = input?.value.trim().toUpperCase();
    if (code === "CRUNCH10") {
      applyCoupon(code, Math.round(subtotal * 0.1));
    } else if (code === "WELCOME50") {
      applyCoupon(code, 50);
    }
  };

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <ShoppingBag className="h-16 w-16 text-muted mx-auto mb-4" />
        <h1 className="text-2xl font-black text-charcoal">Your cart is empty</h1>
        <p className="text-muted mt-2 mb-6">Add some crunchy goodness to get started!</p>
        <Button asChild size="lg">
          <Link href="/shop">Start Shopping</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 lg:py-12">
      <h1 className="text-3xl font-black text-charcoal mb-8">Shopping Cart</h1>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <div
              key={`${item.productId}-${item.variantId}`}
              className="flex gap-4 bg-white rounded-2xl p-4 border border-gray-100"
            >
              <Link
                href={`/product/${item.slug}`}
                className="relative w-24 h-24 rounded-xl overflow-hidden bg-soft-beige flex-shrink-0"
              >
                <Image src={item.image} alt={item.name} fill className="object-cover" sizes="96px" />
              </Link>
              <div className="flex-1 min-w-0">
                <Link
                  href={`/product/${item.slug}`}
                  className="font-semibold text-charcoal hover:text-sunset line-clamp-2"
                >
                  {item.name}
                </Link>
                {item.weight && (
                  <p className="text-xs text-muted mt-0.5">{item.weight}</p>
                )}
                <p className="font-bold text-charcoal mt-2">{formatPrice(item.price)}</p>
                <div className="flex items-center gap-3 mt-3">
                  <div className="flex items-center border border-gray-200 rounded-lg">
                    <button
                      onClick={() =>
                        updateQuantity(item.productId, item.quantity - 1, item.variantId)
                      }
                      className="p-1.5 hover:bg-soft-beige"
                    >
                      <Minus className="h-3 w-3" />
                    </button>
                    <span className="px-3 text-sm font-semibold">{item.quantity}</span>
                    <button
                      onClick={() =>
                        updateQuantity(item.productId, item.quantity + 1, item.variantId)
                      }
                      className="p-1.5 hover:bg-soft-beige"
                    >
                      <Plus className="h-3 w-3" />
                    </button>
                  </div>
                  <button
                    onClick={() => removeItem(item.productId, item.variantId)}
                    className="p-1.5 text-muted hover:text-sunset"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <p className="font-bold text-charcoal hidden sm:block">
                {formatPrice(item.price * item.quantity)}
              </p>
            </div>
          ))}
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl p-6 border border-gray-100 sticky top-24">
            <h2 className="font-bold text-lg text-charcoal mb-4">Order Summary</h2>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted">Subtotal</span>
                <span className="font-semibold">{formatPrice(subtotal)}</span>
              </div>
              {couponDiscount > 0 && (
                <div className="flex justify-between text-pistachio">
                  <span>Coupon ({couponCode})</span>
                  <span>-{formatPrice(couponDiscount)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-muted">Shipping</span>
                <span className="font-semibold">
                  {shipping === 0 ? "FREE" : formatPrice(shipping)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted">Tax (GST)</span>
                <span className="font-semibold">{formatPrice(tax)}</span>
              </div>
              <div className="border-t border-gray-100 pt-3 flex justify-between text-base">
                <span className="font-bold text-charcoal">Total</span>
                <span className="font-black text-charcoal">{formatPrice(total)}</span>
              </div>
            </div>

            {subtotal < FREE_SHIPPING_THRESHOLD && (
              <p className="text-xs text-muted mt-3">
                Add {formatPrice(FREE_SHIPPING_THRESHOLD - subtotal)} more for free shipping!
              </p>
            )}

            <div className="mt-4 flex gap-2">
              <Input id="coupon-input" placeholder="Coupon code" className="flex-1" />
              <Button variant="outline" size="sm" onClick={handleApplyCoupon}>
                Apply
              </Button>
            </div>

            <Button asChild size="lg" className="w-full mt-6">
              <Link href="/checkout">
                Proceed to Checkout
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>

            <Button asChild variant="ghost" className="w-full mt-2">
              <Link href="/shop">Continue Shopping</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
