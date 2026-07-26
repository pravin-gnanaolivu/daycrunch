import { NextResponse } from "next/server";
import type { PaymentMethod } from "@prisma/client";
import { auth } from "@/lib/auth";
import {
  createCheckoutOrder,
  markDemoOrderPaid,
  type CheckoutCustomer,
  type CheckoutItem,
} from "@/lib/order-service";
import { getDbErrorMessage, isDbConnectionError } from "@/lib/db-errors";

const VALID_METHODS: PaymentMethod[] = ["UPI", "CARD", "COD"];

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      customer,
      items,
      couponCode,
      paymentMethod = "UPI",
    } = body as {
      customer: CheckoutCustomer;
      items: CheckoutItem[];
      couponCode?: string | null;
      paymentMethod?: PaymentMethod;
    };

    if (!customer?.email || !customer?.phone || !customer?.name || !items?.length) {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }

    if (!VALID_METHODS.includes(paymentMethod)) {
      return NextResponse.json({ error: "Invalid payment method" }, { status: 400 });
    }

    const session = await auth();
    const userId = session?.user?.id ?? null;

    const { orderNumber, total } = await createCheckoutOrder({
      items,
      customer,
      couponCode,
      paymentMethod,
      userId,
    });

    if (paymentMethod === "COD") {
      return NextResponse.json({
        success: true,
        orderNumber,
        paymentMethod: "COD",
      });
    }

    const hasRazorpay =
      process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET;

    if (!hasRazorpay) {
      await markDemoOrderPaid(orderNumber);
      return NextResponse.json({
        demo: true,
        orderNumber,
        paymentMethod,
        message: "Demo mode — Razorpay not configured",
      });
    }

    const { getRazorpay } = await import("@/lib/razorpay");
    const razorpay = getRazorpay();
    const razorpayOrder = await razorpay.orders.create({
      amount: Math.round(Number(total) * 100),
      currency: "INR",
      receipt: orderNumber,
      notes: {
        customer_email: customer.email,
        customer_phone: customer.phone,
        payment_method: paymentMethod,
      },
    });

    const { db } = await import("@/lib/db");
    await db.order.update({
      where: { orderNumber },
      data: { razorpayOrderId: razorpayOrder.id },
    });

    return NextResponse.json({
      orderId: razorpayOrder.id,
      orderNumber,
      amount: razorpayOrder.amount,
      keyId: process.env.RAZORPAY_KEY_ID,
      paymentMethod,
    });
  } catch (error) {
    console.error("Payment order creation failed:", error);
    const message = getDbErrorMessage(error);
    return NextResponse.json(
      { error: message },
      { status: isDbConnectionError(error) ? 503 : 400 },
    );
  }
}
