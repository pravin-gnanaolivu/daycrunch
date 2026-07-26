"use client";

import Link from "next/link";
import { Check, Circle, Package, Truck } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  getTrackingSteps,
  type OrderStatus,
} from "@/lib/order-tracking";

interface OrderTrackingProps {
  status: OrderStatus;
  trackingNumber?: string | null;
  className?: string;
}

export function OrderTracking({
  status,
  trackingNumber,
  className,
}: OrderTrackingProps) {
  const steps = getTrackingSteps(status);
  const isShipped = ["SHIPPED", "DELIVERED"].includes(status);

  return (
    <div className={cn("bg-white rounded-2xl border border-gray-100 p-6", className)}>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-bold text-lg text-charcoal">Order Tracking</h2>
        {isShipped && trackingNumber && (
          <div className="text-right">
            <p className="text-xs text-muted uppercase tracking-wide">Tracking ID</p>
            <p className="font-mono font-semibold text-charcoal text-sm">{trackingNumber}</p>
          </div>
        )}
      </div>

      {isShipped && trackingNumber && (
        <div className="mb-6 p-4 rounded-xl bg-soft-beige flex items-start gap-3">
          <Truck className="h-5 w-5 text-sunset flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-charcoal text-sm">In transit</p>
            <p className="text-sm text-muted mt-1">
              Use tracking ID <span className="font-mono font-medium text-charcoal">{trackingNumber}</span> to track your shipment with the courier partner.
            </p>
          </div>
        </div>
      )}

      <div className="space-y-0">
        {steps.map((step, index) => (
          <div key={step.key} className="flex gap-4">
            <div className="flex flex-col items-center">
              <div
                className={cn(
                  "flex h-8 w-8 items-center justify-center rounded-full border-2",
                  step.completed
                    ? step.current
                      ? "border-sunset bg-sunset text-white"
                      : "border-pistachio bg-pistachio text-white"
                    : "border-gray-200 bg-white text-gray-300",
                )}
              >
                {step.completed ? (
                  step.current && status === "DELIVERED" ? (
                    <Check className="h-4 w-4" />
                  ) : step.completed && !step.current ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    <Package className="h-4 w-4" />
                  )
                ) : (
                  <Circle className="h-3 w-3" />
                )}
              </div>
              {index < steps.length - 1 && (
                <div
                  className={cn(
                    "w-0.5 flex-1 min-h-[2rem] my-1",
                    step.completed && steps[index + 1]?.completed
                      ? "bg-pistachio"
                      : "bg-gray-200",
                  )}
                />
              )}
            </div>

            <div className={cn("pb-6", index === steps.length - 1 && "pb-0")}>
              <p
                className={cn(
                  "font-semibold text-sm",
                  step.current ? "text-sunset" : step.completed ? "text-charcoal" : "text-muted",
                )}
              >
                {step.label}
              </p>
              <p className="text-sm text-muted mt-0.5">{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function OrderTrackingCompact({
  status,
  trackingNumber,
}: {
  status: OrderStatus;
  trackingNumber?: string | null;
}) {
  const steps = getTrackingSteps(status);
  const current = steps.find((s) => s.current);

  return (
    <div className="text-sm">
      <p className="font-semibold text-charcoal">{current?.label ?? status}</p>
      <p className="text-muted">{current?.description}</p>
      {trackingNumber && (
        <Link
          href="#tracking"
          className="inline-block mt-1 text-sunset font-medium hover:underline"
        >
          Track: {trackingNumber}
        </Link>
      )}
    </div>
  );
}
