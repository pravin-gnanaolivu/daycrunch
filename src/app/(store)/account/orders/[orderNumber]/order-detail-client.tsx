"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { ProductImage } from "@/components/ui/product-image";
import { OrderTracking } from "@/components/order/order-tracking";
import { formatPrice } from "@/lib/utils";
import { getStatusLabel, type OrderStatus } from "@/lib/order-tracking";
import {
  ArrowLeft,
  CheckCircle,
  MapPin,
  CreditCard,
  Package,
} from "lucide-react";

export const ORDER_EMAIL_KEY = "daycrunch-order-email";

const PAYMENT_LABELS: Record<string, string> = {
  UPI: "UPI",
  CARD: "Credit / Debit Card",
  COD: "Cash on Delivery",
};

interface OrderDetail {
  id: string;
  orderNumber: string;
  status: OrderStatus;
  paymentStatus: string;
  paymentMethod: string | null;
  subtotal: number;
  discount: number;
  shipping: number;
  tax: number;
  total: number;
  couponCode: string | null;
  trackingNumber: string | null;
  createdAt: string;
  updatedAt: string;
  shippingAddress: {
    name: string | null;
    phone: string | null;
    line1: string | null;
    line2: string | null;
    city: string | null;
    state: string | null;
    pincode: string | null;
  };
  items: {
    id: string;
    name: string;
    sku: string;
    quantity: number;
    price: number;
    total: number;
    image: string | null;
    slug: string;
  }[];
}

export function OrderDetailClient({ orderNumber }: { orderNumber: string }) {
  const searchParams = useSearchParams();
  const success = searchParams.get("success");
  const emailParam = searchParams.get("email");
  const [order, setOrder] = useState<OrderDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [needsEmail, setNeedsEmail] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(ORDER_EMAIL_KEY);
    const lookupEmail = emailParam ?? stored ?? null;
    setEmail(lookupEmail);
  }, [emailParam]);

  useEffect(() => {
    const fetchOrder = async () => {
      setLoading(true);
      setError(null);

      try {
        const query = email ? `?email=${encodeURIComponent(email)}` : "";
        const res = await fetch(`/api/orders/${encodeURIComponent(orderNumber)}${query}`);
        const data = await res.json();

        if (res.status === 403) {
          setNeedsEmail(true);
          setOrder(null);
          return;
        }

        if (!res.ok) {
          setError(data.error ?? "Failed to load order");
          setOrder(null);
          return;
        }

        setOrder(data.order);
        setNeedsEmail(false);
        if (email) {
          localStorage.setItem(ORDER_EMAIL_KEY, email);
        }
      } catch {
        setError("Failed to load order");
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderNumber, email]);

  const handleLookup = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const lookupEmail = (fd.get("email") as string).trim();
    if (lookupEmail) setEmail(lookupEmail);
  };

  if (needsEmail && !loading) {
    return (
      <div className="container mx-auto px-4 py-8 lg:py-12 max-w-lg">
        <Link
          href="/account/orders"
          className="inline-flex items-center gap-2 text-sm text-muted hover:text-sunset mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to orders
        </Link>

        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <h1 className="text-2xl font-black text-charcoal mb-2">Track Order</h1>
          <p className="text-muted text-sm mb-6">
            Enter the email used at checkout to view order{" "}
            <span className="font-mono font-medium text-charcoal">{orderNumber}</span>
          </p>
          <form onSubmit={handleLookup} className="space-y-4">
            <div>
              <Label htmlFor="email">Email address</Label>
              <Input id="email" name="email" type="email" required className="mt-1" />
            </div>
            <Button type="submit" className="w-full">
              View Order
            </Button>
          </form>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16 text-center text-muted">
        Loading order details...
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="container mx-auto px-4 py-8 lg:py-12 max-w-lg">
        <Link
          href="/account/orders"
          className="inline-flex items-center gap-2 text-sm text-muted hover:text-sunset mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to orders
        </Link>
        <div className="bg-white rounded-2xl border border-gray-100 p-8 text-center">
          <Package className="h-12 w-12 text-muted mx-auto mb-4" />
          <p className="font-semibold text-charcoal">{error ?? "Order not found"}</p>
          <Button asChild className="mt-6">
            <Link href="/account/orders">View all orders</Link>
          </Button>
        </div>
      </div>
    );
  }

  const address = order.shippingAddress;
  const ordersListHref = email
    ? `/account/orders?email=${encodeURIComponent(email)}`
    : "/account/orders";

  return (
    <div className="container mx-auto px-4 py-8 lg:py-12 max-w-4xl">
      <Link
        href={ordersListHref}
        className="inline-flex items-center gap-2 text-sm text-muted hover:text-sunset mb-6"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to orders
      </Link>

      {success && (
        <div className="bg-pistachio/10 border border-pistachio/30 rounded-2xl p-6 mb-8">
          <div className="flex items-start gap-3">
            <CheckCircle className="h-6 w-6 text-pistachio flex-shrink-0 mt-0.5" />
            <div>
              <h2 className="font-bold text-lg text-charcoal">Order placed successfully!</h2>
              <p className="text-muted mt-1">
                Your order {order.orderNumber} has been received. Track its progress below.
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-wrap items-start justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-charcoal">{order.orderNumber}</h1>
          <p className="text-muted mt-1">
            Placed on{" "}
            {new Date(order.createdAt).toLocaleDateString("en-IN", {
              day: "numeric",
              month: "long",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Badge variant="outline">{getStatusLabel(order.status)}</Badge>
          <Badge variant={order.paymentStatus === "PAID" ? "accent" : "sale"}>
            {order.paymentStatus}
          </Badge>
          {order.paymentMethod && (
            <Badge variant="secondary">
              {PAYMENT_LABELS[order.paymentMethod] ?? order.paymentMethod}
            </Badge>
          )}
        </div>
      </div>

      <div className="grid lg:grid-cols-5 gap-6">
        <div className="lg:col-span-3 space-y-6">
          <div id="tracking">
            <OrderTracking status={order.status} trackingNumber={order.trackingNumber} />
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <h2 className="font-bold text-lg text-charcoal mb-4">Items</h2>
            <div className="space-y-4">
              {order.items.map((item) => (
                <div key={item.id} className="flex gap-4">
                  <Link
                    href={`/product/${item.slug}`}
                    className="relative w-16 h-16 rounded-xl overflow-hidden bg-soft-beige flex-shrink-0"
                  >
                    <ProductImage src={item.image} alt={item.name} size="thumb" />
                  </Link>
                  <div className="flex-1 min-w-0">
                    <Link
                      href={`/product/${item.slug}`}
                      className="font-semibold text-charcoal hover:text-sunset line-clamp-2"
                    >
                      {item.name}
                    </Link>
                    <p className="text-xs text-muted mt-0.5">SKU: {item.sku}</p>
                    <p className="text-sm text-muted mt-1">
                      {formatPrice(item.price)} × {item.quantity}
                    </p>
                  </div>
                  <p className="font-semibold text-charcoal">{formatPrice(item.total)}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <h2 className="font-bold text-lg text-charcoal mb-4 flex items-center gap-2">
              <MapPin className="h-5 w-5 text-sunset" />
              Delivery Address
            </h2>
            {address.name && (
              <div className="text-sm space-y-1 text-muted">
                <p className="font-semibold text-charcoal">{address.name}</p>
                <p>{address.line1}</p>
                {address.line2 && <p>{address.line2}</p>}
                <p>
                  {address.city}, {address.state} {address.pincode}
                </p>
                {address.phone && <p className="pt-2">{address.phone}</p>}
              </div>
            )}
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <h2 className="font-bold text-lg text-charcoal mb-4 flex items-center gap-2">
              <CreditCard className="h-5 w-5 text-sunset" />
              Payment Summary
            </h2>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted">Subtotal</span>
                <span>{formatPrice(order.subtotal)}</span>
              </div>
              {order.discount > 0 && (
                <div className="flex justify-between text-pistachio">
                  <span>Discount{order.couponCode ? ` (${order.couponCode})` : ""}</span>
                  <span>-{formatPrice(order.discount)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-muted">Shipping</span>
                <span>{order.shipping === 0 ? "FREE" : formatPrice(order.shipping)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted">Tax</span>
                <span>{formatPrice(order.tax)}</span>
              </div>
              <div className="flex justify-between font-black text-base pt-3 border-t border-gray-100">
                <span>Total</span>
                <span>{formatPrice(order.total)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
