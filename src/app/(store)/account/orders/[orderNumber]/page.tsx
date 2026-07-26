import { Suspense } from "react";
import { OrderDetailClient } from "./order-detail-client";

interface Props {
  params: Promise<{ orderNumber: string }>;
}

export default async function OrderDetailPage({ params }: Props) {
  const { orderNumber } = await params;

  return (
    <Suspense
      fallback={
        <div className="container mx-auto px-4 py-16 text-center text-muted">
          Loading order details...
        </div>
      }
    >
      <OrderDetailClient orderNumber={orderNumber} />
    </Suspense>
  );
}
