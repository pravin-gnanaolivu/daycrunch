"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCartStore } from "@/store/cart-store";
import { formatPrice } from "@/lib/utils";
import { FREE_SHIPPING_THRESHOLD, TAX_RATE } from "@/lib/constants";
import { Shield, CreditCard, Loader2 } from "lucide-react";
import { toast } from "sonner";

declare global {
  interface Window {
    Razorpay: new (options: Record<string, unknown>) => { open: () => void };
  }
}

export default function CheckoutPage() {
  const { items, getSubtotal, couponDiscount, clearCart } = useCartStore();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    line1: "",
    line2: "",
    city: "",
    state: "",
    pincode: "",
  });

  const subtotal = getSubtotal();
  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : 99;
  const tax = Math.round(subtotal * TAX_RATE);
  const total = subtotal - couponDiscount + shipping + tax;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/payments/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: total,
          customer: form,
          items,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error ?? "Payment failed");
        setLoading(false);
        return;
      }

      if (data.demo) {
        toast.success("Order placed successfully! (Demo mode)");
        clearCart();
        window.location.href = `/account/orders?success=true&order=${data.orderNumber}`;
        return;
      }

      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => {
        const options = {
          key: data.keyId,
          amount: data.amount,
          currency: "INR",
          name: "DayCrunch",
          description: "Premium Healthy Snacks",
          order_id: data.orderId,
          handler: async (response: {
            razorpay_order_id: string;
            razorpay_payment_id: string;
            razorpay_signature: string;
          }) => {
            const verifyRes = await fetch("/api/payments/verify", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                ...response,
                orderNumber: data.orderNumber,
              }),
            });
            const verifyData = await verifyRes.json();
            if (verifyData.success) {
              clearCart();
              toast.success("Payment successful!");
              window.location.href = `/account/orders?success=true&order=${data.orderNumber}`;
            } else {
              toast.error("Payment verification failed");
            }
          },
          prefill: {
            name: form.name,
            email: form.email,
            contact: form.phone,
          },
          theme: { color: "#FF6B35" },
        };
        const rzp = new window.Razorpay(options);
        rzp.open();
      };
      document.body.appendChild(script);
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-black text-charcoal">Nothing to checkout</h1>
        <p className="text-muted mt-2 mb-6">Your cart is empty</p>
        <Button asChild><Link href="/shop">Shop Now</Link></Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 lg:py-12">
      <h1 className="text-3xl font-black text-charcoal mb-8">Checkout</h1>

      <form onSubmit={handlePayment}>
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl p-6 border border-gray-100">
              <h2 className="font-bold text-lg text-charcoal mb-4">Contact Information</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" name="name" required value={form.name} onChange={handleChange} className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" name="email" type="email" required value={form.email} onChange={handleChange} className="mt-1" />
                </div>
                <div className="sm:col-span-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" name="phone" type="tel" required value={form.phone} onChange={handleChange} className="mt-1" placeholder="+91" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-gray-100">
              <h2 className="font-bold text-lg text-charcoal mb-4">Shipping Address</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <Label htmlFor="line1">Address Line 1</Label>
                  <Input id="line1" name="line1" required value={form.line1} onChange={handleChange} className="mt-1" />
                </div>
                <div className="sm:col-span-2">
                  <Label htmlFor="line2">Address Line 2 (Optional)</Label>
                  <Input id="line2" name="line2" value={form.line2} onChange={handleChange} className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="city">City</Label>
                  <Input id="city" name="city" required value={form.city} onChange={handleChange} className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="state">State</Label>
                  <Input id="state" name="state" required value={form.state} onChange={handleChange} className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="pincode">Pincode</Label>
                  <Input id="pincode" name="pincode" required value={form.pincode} onChange={handleChange} className="mt-1" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-gray-100">
              <h2 className="font-bold text-lg text-charcoal mb-4 flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Payment
              </h2>
              <p className="text-sm text-muted">
                Secure payment via Razorpay — UPI, Cards, Net Banking, Google Pay, PhonePe & Paytm accepted.
              </p>
              <div className="flex items-center gap-2 mt-3 text-sm text-pistachio">
                <Shield className="h-4 w-4" />
                256-bit SSL encrypted checkout
              </div>
            </div>
          </div>

          <div>
            <div className="bg-white rounded-2xl p-6 border border-gray-100 sticky top-24">
              <h2 className="font-bold text-lg text-charcoal mb-4">Order Summary</h2>
              <div className="space-y-2 text-sm max-h-48 overflow-y-auto">
                {items.map((item) => (
                  <div key={`${item.productId}-${item.variantId}`} className="flex justify-between">
                    <span className="text-muted truncate mr-2">
                      {item.name} × {item.quantity}
                    </span>
                    <span className="font-semibold flex-shrink-0">
                      {formatPrice(item.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>
              <div className="border-t border-gray-100 mt-4 pt-4 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted">Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                {couponDiscount > 0 && (
                  <div className="flex justify-between text-pistachio">
                    <span>Discount</span>
                    <span>-{formatPrice(couponDiscount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-muted">Shipping</span>
                  <span>{shipping === 0 ? "FREE" : formatPrice(shipping)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted">Tax</span>
                  <span>{formatPrice(tax)}</span>
                </div>
                <div className="flex justify-between font-black text-base pt-2 border-t">
                  <span>Total</span>
                  <span>{formatPrice(total)}</span>
                </div>
              </div>
              <Button type="submit" size="lg" className="w-full mt-6" disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>Pay {formatPrice(total)}</>
                )}
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
