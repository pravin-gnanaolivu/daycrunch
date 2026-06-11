"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Package, CheckCircle } from "lucide-react";

function OrdersContent() {
  const searchParams = useSearchParams();
  const success = searchParams.get("success");
  const orderNumber = searchParams.get("order");

  return (
    <div className="container mx-auto px-4 py-8 lg:py-12 max-w-2xl">
      {success && (
        <div className="bg-pistachio/10 border border-pistachio/30 rounded-2xl p-6 mb-8 text-center">
          <CheckCircle className="h-10 w-10 text-pistachio mx-auto mb-2" />
          <h2 className="font-bold text-lg text-charcoal">Order Placed Successfully!</h2>
          {orderNumber && (
            <p className="text-muted mt-1">Order #{orderNumber}</p>
          )}
        </div>
      )}

      <h1 className="text-3xl font-black text-charcoal mb-8">My Orders</h1>

      <div className="text-center py-12 bg-white rounded-2xl border border-gray-100">
        <Package className="h-12 w-12 text-muted mx-auto mb-4" />
        <p className="text-charcoal font-semibold">No orders yet</p>
        <p className="text-muted text-sm mt-1">Your order history will appear here</p>
        <Button asChild className="mt-6">
          <Link href="/shop">Start Shopping</Link>
        </Button>
      </div>
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
