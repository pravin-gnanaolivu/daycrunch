export type OrderStatus =
  | "PENDING"
  | "CONFIRMED"
  | "PROCESSING"
  | "SHIPPED"
  | "DELIVERED"
  | "CANCELLED"
  | "REFUNDED";

export interface TrackingStep {
  key: string;
  label: string;
  description: string;
  completed: boolean;
  current: boolean;
}

const STATUS_ORDER: OrderStatus[] = [
  "PENDING",
  "CONFIRMED",
  "PROCESSING",
  "SHIPPED",
  "DELIVERED",
];

const STEP_META: Record<string, { label: string; description: string }> = {
  PENDING: {
    label: "Order Placed",
    description: "We received your order",
  },
  CONFIRMED: {
    label: "Confirmed",
    description: "Order confirmed and being prepared",
  },
  PROCESSING: {
    label: "Processing",
    description: "Your items are being packed",
  },
  SHIPPED: {
    label: "Shipped",
    description: "Order is on the way",
  },
  DELIVERED: {
    label: "Delivered",
    description: "Order delivered successfully",
  },
};

export function getTrackingSteps(status: OrderStatus): TrackingStep[] {
  if (status === "CANCELLED" || status === "REFUNDED") {
    return [
      {
        key: "PLACED",
        label: "Order Placed",
        description: "We received your order",
        completed: true,
        current: false,
      },
      {
        key: status,
        label: status === "CANCELLED" ? "Cancelled" : "Refunded",
        description:
          status === "CANCELLED"
            ? "This order was cancelled"
            : "Refund has been initiated",
        completed: true,
        current: true,
      },
    ];
  }

  const currentIndex = Math.max(STATUS_ORDER.indexOf(status), 0);

  return STATUS_ORDER.map((step, index) => ({
    key: step,
    label: STEP_META[step].label,
    description: STEP_META[step].description,
    completed: index <= currentIndex,
    current: index === currentIndex,
  }));
}

export function getStatusLabel(status: string): string {
  return status.charAt(0) + status.slice(1).toLowerCase();
}

export function generateTrackingNumber(): string {
  const random = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `DC${Date.now().toString(36).toUpperCase()}${random}`;
}
