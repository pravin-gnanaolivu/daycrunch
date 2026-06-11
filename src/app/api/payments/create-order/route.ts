import { NextResponse } from "next/server";
import { generateOrderNumber } from "@/lib/utils";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { amount, customer, items } = body;

    if (!amount || !customer || !items?.length) {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }

    const orderNumber = generateOrderNumber();

    if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
      return NextResponse.json({
        demo: true,
        orderNumber,
        message: "Demo mode — Razorpay not configured",
      });
    }

    const { getRazorpay } = await import("@/lib/razorpay");
    const razorpay = getRazorpay();
    const order = await razorpay.orders.create({
      amount: Math.round(amount * 100),
      currency: "INR",
      receipt: orderNumber,
      notes: {
        customer_email: customer.email,
        customer_phone: customer.phone,
      },
    });

    return NextResponse.json({
      orderId: order.id,
      orderNumber,
      amount: order.amount,
      keyId: process.env.RAZORPAY_KEY_ID,
    });
  } catch (error) {
    console.error("Payment order creation failed:", error);
    return NextResponse.json(
      { error: "Failed to create payment order" },
      { status: 500 }
    );
  }
}
