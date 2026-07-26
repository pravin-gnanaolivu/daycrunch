"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCartStore } from "@/store/cart-store";
import { formatPrice, cn } from "@/lib/utils";
import { FREE_SHIPPING_THRESHOLD, TAX_RATE } from "@/lib/constants";
import {
  Shield,
  Loader2,
  Smartphone,
  CreditCard,
  Banknote,
} from "lucide-react";
import { toast } from "sonner";

type PaymentMethod = "UPI" | "CARD" | "COD";

declare global {
  interface Window {
    Razorpay: new (options: Record<string, unknown>) => { open: () => void };
  }
}

const PAYMENT_OPTIONS: {
  id: PaymentMethod;
  label: string;
  description: string;
  icon: typeof Smartphone;
}[] = [
  {
    id: "UPI",
    label: "UPI",
    description: "Google Pay, PhonePe, Paytm, BHIM",
    icon: Smartphone,
  },
  {
    id: "CARD",
    label: "Credit / Debit Card",
    description: "Visa, Mastercard, RuPay",
    icon: CreditCard,
  },
  {
    id: "COD",
    label: "Cash on Delivery",
    description: "Pay when your order arrives",
    icon: Banknote,
  },
];

function getRazorpayMethodConfig(method: PaymentMethod) {
  if (method === "UPI") {
    return {
      upi: true,
      card: false,
      netbanking: false,
      wallet: false,
      emi: false,
      paylater: false,
    };
  }

  if (method === "CARD") {
    return {
      upi: false,
      card: true,
      netbanking: false,
      wallet: false,
      emi: false,
      paylater: false,
    };
  }

  return undefined;
}

export default function CheckoutPage() {
  const { items, getSubtotal, couponCode, couponDiscount, clearCart } =
    useCartStore();
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("UPI");
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

  const redirectToOrders = (orderNumber: string) => {
    clearCart();
    localStorage.setItem("daycrunch-order-email", form.email);
    const params = new URLSearchParams({
      success: "true",
      email: form.email,
    });
    window.location.href = `/account/orders/${encodeURIComponent(orderNumber)}?${params.toString()}`;
  };

  const openRazorpay = (
    data: {
      keyId: string;
      amount: number;
      orderId: string;
      orderNumber: string;
    },
    method: PaymentMethod,
  ) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => {
      const options: Record<string, unknown> = {
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
            toast.success("Payment successful!");
            redirectToOrders(data.orderNumber);
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
        method: getRazorpayMethodConfig(method),
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    };
    document.body.appendChild(script);
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
          customer: form,
          items: items.map((item) => ({
            productId: item.productId,
            variantId: item.variantId,
            quantity: item.quantity,
          })),
          couponCode,
          paymentMethod,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error ?? "Order failed");
        return;
      }

      if (data.success && data.paymentMethod === "COD") {
        toast.success("Order placed! Pay on delivery.");
        redirectToOrders(data.orderNumber);
        return;
      }

      if (data.demo) {
        toast.success("Order placed successfully! (Demo mode)");
        redirectToOrders(data.orderNumber);
        return;
      }

      openRazorpay(data, paymentMethod);
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const submitLabel =
    paymentMethod === "COD"
      ? `Place Order · ${formatPrice(total)}`
      : `Pay ${formatPrice(total)}`;

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-black text-charcoal">Nothing to checkout</h1>
        <p className="text-muted mt-2 mb-6">Your cart is empty</p>
        <Button asChild>
          <Link href="/shop">Shop Now</Link>
        </Button>
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
              <h2 className="font-bold text-lg text-charcoal mb-4">
                Contact Information
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    name="name"
                    required
                    value={form.name}
                    onChange={handleChange}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    className="mt-1"
                  />
                </div>
                <div className="sm:col-span-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    value={form.phone}
                    onChange={handleChange}
                    className="mt-1"
                    placeholder="+91"
                  />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-gray-100">
              <h2 className="font-bold text-lg text-charcoal mb-4">
                Shipping Address
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <Label htmlFor="line1">Address Line 1</Label>
                  <Input
                    id="line1"
                    name="line1"
                    required
                    value={form.line1}
                    onChange={handleChange}
                    className="mt-1"
                  />
                </div>
                <div className="sm:col-span-2">
                  <Label htmlFor="line2">Address Line 2 (Optional)</Label>
                  <Input
                    id="line2"
                    name="line2"
                    value={form.line2}
                    onChange={handleChange}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    name="city"
                    required
                    value={form.city}
                    onChange={handleChange}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="state">State</Label>
                  <Input
                    id="state"
                    name="state"
                    required
                    value={form.state}
                    onChange={handleChange}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="pincode">Pincode</Label>
                  <Input
                    id="pincode"
                    name="pincode"
                    required
                    value={form.pincode}
                    onChange={handleChange}
                    className="mt-1"
                  />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-gray-100">
              <h2 className="font-bold text-lg text-charcoal mb-4">Payment Method</h2>
              <div className="space-y-3">
                {PAYMENT_OPTIONS.map((option) => {
                  const Icon = option.icon;
                  const selected = paymentMethod === option.id;
                  return (
                    <label
                      key={option.id}
                      className={cn(
                        "flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-colors",
                        selected
                          ? "border-sunset bg-sunset/5"
                          : "border-gray-100 hover:border-gray-200",
                      )}
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        value={option.id}
                        checked={selected}
                        onChange={() => setPaymentMethod(option.id)}
                        className="sr-only"
                      />
                      <div
                        className={cn(
                          "flex h-10 w-10 items-center justify-center rounded-full",
                          selected ? "bg-sunset text-white" : "bg-soft-beige text-charcoal",
                        )}
                      >
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-charcoal">{option.label}</p>
                        <p className="text-sm text-muted">{option.description}</p>
                      </div>
                      <div
                        className={cn(
                          "h-5 w-5 rounded-full border-2 flex items-center justify-center",
                          selected ? "border-sunset" : "border-gray-300",
                        )}
                      >
                        {selected && (
                          <div className="h-2.5 w-2.5 rounded-full bg-sunset" />
                        )}
                      </div>
                    </label>
                  );
                })}
              </div>
              <div className="flex items-center gap-2 mt-4 text-sm text-pistachio">
                <Shield className="h-4 w-4" />
                {paymentMethod === "COD"
                  ? "Pay in cash when your order is delivered"
                  : "256-bit SSL encrypted checkout via Razorpay"}
              </div>
            </div>
          </div>

          <div>
            <div className="bg-white rounded-2xl p-6 border border-gray-100 sticky top-24">
              <h2 className="font-bold text-lg text-charcoal mb-4">Order Summary</h2>
              <div className="space-y-2 text-sm max-h-48 overflow-y-auto">
                {items.map((item) => (
                  <div
                    key={`${item.productId}-${item.variantId}`}
                    className="flex justify-between"
                  >
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
                  submitLabel
                )}
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
