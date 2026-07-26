import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get("email");
    const session = await auth();

    let orders;

    if (session?.user?.id) {
      orders = await db.order.findMany({
        where: { userId: session.user.id },
        include: {
          items: {
            include: {
              product: { include: { images: { take: 1 } } },
            },
          },
        },
        orderBy: { createdAt: "desc" },
      });
    } else if (email) {
      orders = await db.order.findMany({
        where: { guestEmail: email.toLowerCase() },
        include: {
          items: {
            include: {
              product: { include: { images: { take: 1 } } },
            },
          },
        },
        orderBy: { createdAt: "desc" },
      });
    } else {
      return NextResponse.json({ orders: [] });
    }

    return NextResponse.json({
      orders: orders.map((order) => ({
        id: order.id,
        orderNumber: order.orderNumber,
        status: order.status,
        paymentStatus: order.paymentStatus,
        paymentMethod: order.paymentMethod,
        total: Number(order.total),
        trackingNumber: order.trackingNumber,
        createdAt: order.createdAt.toISOString(),
        items: order.items.map((item) => ({
          name: item.name,
          quantity: item.quantity,
          price: Number(item.price),
          total: Number(item.total),
          image: item.product.images[0]?.url ?? null,
        })),
      })),
    });
  } catch (error) {
    console.error("Failed to fetch orders:", error);
    return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 });
  }
}
