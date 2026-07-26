"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Package, Search, ArrowRight } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import { getStatusLabel, type OrderStatus } from "@/lib/order-tracking";
import { ORDER_EMAIL_KEY } from "./[orderNumber]/order-detail-client";

interface OrderItem {
  name: string;
  quantity: number;
  price: number;
  total: number;
  image: string | null;
}

interface Order {
  id: string;
  orderNumber: string;
  status: OrderStatus;
  paymentStatus: string;
  paymentMethod: string | null;
  total: number;
  trackingNumber: string | null;
  createdAt: string;
  items: OrderItem[];
}

const PAYMENT_LABELS: Record<string, string> = {
  UPI: "UPI",
  CARD: "Card",
  COD: "Cash on Delivery",
};

function OrdersContent() {
  const searchParams = useSearchParams();
  const emailParam = searchParams.get("email");
  const [email, setEmail] = useState<string | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [lookupOrder, setLookupOrder] = useState("");
  const [lookupEmail, setLookupEmail] = useState("");

  useEffect(() => {
    const stored = localStorage.getItem(ORDER_EMAIL_KEY);
    const resolved = emailParam ?? stored ?? null;
    setEmail(resolved);
    if (resolved) {
      localStorage.setItem(ORDER_EMAIL_KEY, resolved);
    }
  }, [emailParam]);

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const url = email
          ? `/api/orders?email=${encodeURIComponent(email)}`
          : "/api/orders";
        const res = await fetch(url);
        const data = await res.json();
        setOrders(data.orders ?? []);
      } catch {
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [email]);

  const handleEmailLookup = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const value = (fd.get("email") as string).trim();
    if (value) {
      setEmail(value);
      localStorage.setItem(ORDER_EMAIL_KEY, value);
    }
  };

  const handleTrackOrder = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!lookupOrder.trim() || !lookupEmail.trim()) return;
    localStorage.setItem(ORDER_EMAIL_KEY, lookupEmail.trim());
    window.location.href = `/account/orders/${encodeURIComponent(lookupOrder.trim())}?email=${encodeURIComponent(lookupEmail.trim())}`;
  };

  const ordersHref = (orderNumber: string) => {
    const base = `/account/orders/${encodeURIComponent(orderNumber)}`;
    return email ? `${base}?email=${encodeURIComponent(email)}` : base;
  };

  return (
    <div className="container mx-auto px-4 py-8 lg:py-12 max-w-3xl">
      <h1 className="text-3xl font-black text-charcoal mb-2">My Orders</h1>
      <p className="text-muted mb-8">View order history and track deliveries</p>

      {!email && (
        <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-6">
          <h2 className="font-bold text-charcoal mb-2">Find your orders</h2>
          <p className="text-sm text-muted mb-4">
            Enter the email you used at checkout to see your order history.
          </p>
          <form onSubmit={handleEmailLookup} className="flex gap-2">
            <Input
              name="email"
              type="email"
              placeholder="you@email.com"
              required
              className="flex-1"
            />
            <Button type="submit">View Orders</Button>
          </form>
        </div>
      )}

      <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-8">
        <h2 className="font-bold text-charcoal mb-2 flex items-center gap-2">
          <Search className="h-4 w-4 text-sunset" />
          Track a specific order
        </h2>
        <p className="text-sm text-muted mb-4">
          Have an order number? Enter it below with your email to track delivery.
        </p>
        <form onSubmit={handleTrackOrder} className="grid sm:grid-cols-2 gap-3">
          <div>
            <Label htmlFor="lookupOrder" className="sr-only">
              Order number
            </Label>
            <Input
              id="lookupOrder"
              value={lookupOrder}
              onChange={(e) => setLookupOrder(e.target.value)}
              placeholder="Order number e.g. DC-..."
              required
            />
          </div>
          <div>
            <Label htmlFor="lookupEmail" className="sr-only">
              Email
            </Label>
            <Input
              id="lookupEmail"
              type="email"
              value={lookupEmail}
              onChange={(e) => setLookupEmail(e.target.value)}
              placeholder="Email used at checkout"
              required
            />
          </div>
          <Button type="submit" className="sm:col-span-2">
            Track Order
          </Button>
        </form>
      </div>

      {loading ? (
        <div className="text-center py-12 text-muted">Loading orders...</div>
      ) : orders.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-2xl border border-gray-100">
          <Package className="h-12 w-12 text-muted mx-auto mb-4" />
          <p className="text-charcoal font-semibold">No orders yet</p>
          <p className="text-muted text-sm mt-1">
            {email
              ? "No orders found for this email"
              : "Sign in or enter your email above to view orders"}
          </p>
          <Button asChild className="mt-6">
            <Link href="/shop">Start Shopping</Link>
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <Link
              key={order.id}
              href={ordersHref(order.orderNumber)}
              className="block bg-white rounded-2xl border border-gray-100 p-6 hover:border-sunset/30 hover:shadow-md transition-all group"
            >
              <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                <div>
                  <p className="font-bold text-charcoal group-hover:text-sunset transition-colors">
                    {order.orderNumber}
                  </p>
                  <p className="text-sm text-muted">
                    {new Date(order.createdAt).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
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

              {order.trackingNumber && (
                <p className="text-sm text-muted mb-3">
                  Tracking:{" "}
                  <span className="font-mono font-medium text-charcoal">
                    {order.trackingNumber}
                  </span>
                </p>
              )}

              <div className="space-y-2 text-sm border-t border-gray-100 pt-4">
                {order.items.slice(0, 3).map((item, i) => (
                  <div key={i} className="flex justify-between">
                    <span className="text-muted truncate mr-2">
                      {item.name} × {item.quantity}
                    </span>
                    <span className="font-semibold flex-shrink-0">
                      {formatPrice(item.total)}
                    </span>
                  </div>
                ))}
                {order.items.length > 3 && (
                  <p className="text-xs text-muted">+{order.items.length - 3} more items</p>
                )}
              </div>

              <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-100">
                <span className="font-semibold text-charcoal">Total</span>
                <div className="flex items-center gap-2">
                  <span className="font-black text-lg">{formatPrice(order.total)}</span>
                  <ArrowRight className="h-4 w-4 text-sunset opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default function OrdersPage() {
  return (
    <Suspense fallback={<div className="container mx-auto px-4 py-12">Loading...</div>}>
      <OrdersContent />
    </Suspense>
  );
}
