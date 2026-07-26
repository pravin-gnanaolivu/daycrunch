import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";

interface RouteParams {
  params: Promise<{ orderNumber: string }>;
}

function serializeOrder(order: Awaited<ReturnType<typeof fetchOrder>>) {
  if (!order) return null;

  return {
    id: order.id,
    orderNumber: order.orderNumber,
    status: order.status,
    paymentStatus: order.paymentStatus,
    paymentMethod: order.paymentMethod,
    subtotal: Number(order.subtotal),
    discount: Number(order.discount),
    shipping: Number(order.shipping),
    tax: Number(order.tax),
    total: Number(order.total),
    couponCode: order.couponCode,
    trackingNumber: order.trackingNumber,
    createdAt: order.createdAt.toISOString(),
    updatedAt: order.updatedAt.toISOString(),
    shippingAddress: {
      name: order.shippingName,
      phone: order.shippingPhone,
      line1: order.shippingLine1,
      line2: order.shippingLine2,
      city: order.shippingCity,
      state: order.shippingState,
      pincode: order.shippingPincode,
    },
    items: order.items.map((item) => ({
      id: item.id,
      name: item.name,
      sku: item.sku,
      quantity: item.quantity,
      price: Number(item.price),
      total: Number(item.total),
      image: item.product.images[0]?.url ?? null,
      slug: item.product.slug,
    })),
  };
}

async function fetchOrder(orderNumber: string) {
  return db.order.findUnique({
    where: { orderNumber },
    include: {
      items: {
        include: {
          product: { include: { images: { take: 1, orderBy: { sortOrder: "asc" } } } },
        },
      },
    },
  });
}

export async function GET(request: Request, { params }: RouteParams) {
  try {
    const { orderNumber } = await params;
    const { searchParams } = new URL(request.url);
    const email = searchParams.get("email")?.toLowerCase();
    const session = await auth();

    const order = await fetchOrder(orderNumber);

    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    const isOwner =
      (session?.user?.id && order.userId === session.user.id) ||
      (email && order.guestEmail?.toLowerCase() === email);

    if (!isOwner) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    return NextResponse.json({ order: serializeOrder(order) });
  } catch (error) {
    console.error("Failed to fetch order:", error);
    return NextResponse.json({ error: "Failed to fetch order" }, { status: 500 });
  }
}
