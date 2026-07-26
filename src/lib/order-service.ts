import type { PaymentMethod } from "@prisma/client";
import { db } from "@/lib/db";
import { FREE_SHIPPING_THRESHOLD, TAX_RATE } from "@/lib/constants";
import { generateOrderNumber } from "@/lib/utils";

export interface CheckoutItem {
  productId: string;
  variantId?: string;
  quantity: number;
}

export interface CheckoutCustomer {
  name: string;
  email: string;
  phone: string;
  line1: string;
  line2?: string;
  city: string;
  state: string;
  pincode: string;
}

interface PreparedOrderItem {
  productId: string;
  variantId?: string;
  name: string;
  sku: string;
  price: number;
  quantity: number;
  total: number;
}

export async function createCheckoutOrder(params: {
  items: CheckoutItem[];
  customer: CheckoutCustomer;
  couponCode?: string | null;
  paymentMethod: PaymentMethod;
  userId?: string | null;
}) {
  const { items, customer, couponCode, paymentMethod, userId } = params;

  if (!items.length) {
    throw new Error("Your cart is empty");
  }

  const productIds = [...new Set(items.map((item) => item.productId).filter(Boolean))];

  if (!productIds.length) {
    throw new Error("Invalid cart items. Please refresh and try again.");
  }

  const products = await db.product.findMany({
    where: { id: { in: productIds }, isActive: true },
    include: { variants: { where: { isActive: true } } },
  });

  if (products.length !== productIds.length) {
    throw new Error("One or more products in your cart are no longer available");
  }

  const orderItems: PreparedOrderItem[] = [];
  let subtotal = 0;

  for (const item of items) {
    const product = products.find((p) => p.id === item.productId);
    if (!product) {
      throw new Error("Product not found");
    }

    let price = Number(product.basePrice);
    let name = product.name;
    let sku = product.sku;
    let variantId: string | undefined;
    let stock = product.stock;

    if (item.variantId) {
      const variant = product.variants.find((v) => v.id === item.variantId);
      if (!variant) {
        throw new Error(`Variant not found for ${product.name}`);
      }
      price = Number(variant.price);
      name = `${product.name} — ${variant.name}`;
      sku = variant.sku;
      variantId = variant.id;
      stock = variant.stock;
    }

    if (stock < item.quantity) {
      throw new Error(`${name} does not have enough stock`);
    }

    const lineTotal = price * item.quantity;
    subtotal += lineTotal;
    orderItems.push({
      productId: product.id,
      variantId,
      name,
      sku,
      price,
      quantity: item.quantity,
      total: lineTotal,
    });
  }

  let discount = 0;
  let validatedCouponCode: string | undefined;

  if (couponCode) {
    const coupon = await db.coupon.findFirst({
      where: { code: couponCode.toUpperCase(), isActive: true },
    });

    if (coupon) {
      if (coupon.expiresAt && coupon.expiresAt < new Date()) {
        throw new Error("Coupon has expired");
      }
      if (coupon.maxUses && coupon.usedCount >= coupon.maxUses) {
        throw new Error("Coupon usage limit reached");
      }
      if (coupon.minOrderValue && subtotal < Number(coupon.minOrderValue)) {
        throw new Error(
          `Minimum order value for this coupon is ₹${Number(coupon.minOrderValue)}`,
        );
      }

      discount =
        coupon.discountType === "PERCENTAGE"
          ? Math.round(subtotal * (Number(coupon.discountValue) / 100))
          : Number(coupon.discountValue);
      validatedCouponCode = coupon.code;
    }
  }

  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : 99;
  const tax = Math.round(subtotal * TAX_RATE);
  const total = subtotal - discount + shipping + tax;
  const orderNumber = generateOrderNumber();
  const isCod = paymentMethod === "COD";

  const order = await db.$transaction(async (tx) => {
    const created = await tx.order.create({
      data: {
        orderNumber,
        userId: userId ?? undefined,
        guestEmail: customer.email,
        guestPhone: customer.phone,
        status: isCod ? "CONFIRMED" : "PENDING",
        paymentStatus: "PENDING",
        paymentMethod,
        subtotal,
        discount,
        shipping,
        tax,
        total,
        couponCode: validatedCouponCode,
        shippingName: customer.name,
        shippingPhone: customer.phone,
        shippingLine1: customer.line1,
        shippingLine2: customer.line2 || undefined,
        shippingCity: customer.city,
        shippingState: customer.state,
        shippingPincode: customer.pincode,
        items: {
          create: orderItems.map((item) => ({
            productId: item.productId,
            variantId: item.variantId,
            name: item.name,
            sku: item.sku,
            price: item.price,
            quantity: item.quantity,
            total: item.total,
          })),
        },
      },
    });

    for (const item of items) {
      if (item.variantId) {
        await tx.productVariant.update({
          where: { id: item.variantId },
          data: { stock: { decrement: item.quantity } },
        });
      } else {
        await tx.product.update({
          where: { id: item.productId },
          data: { stock: { decrement: item.quantity } },
        });
      }
    }

    if (validatedCouponCode) {
      await tx.coupon.update({
        where: { code: validatedCouponCode },
        data: { usedCount: { increment: 1 } },
      });
    }

    return created;
  });

  return {
    order,
    orderNumber,
    subtotal,
    discount,
    shipping,
    tax,
    total,
  };
}

export async function confirmOrderPayment(
  orderNumber: string,
  razorpayPaymentId: string,
  razorpayOrderId?: string,
) {
  return db.order.update({
    where: { orderNumber },
    data: {
      paymentStatus: "PAID",
      status: "CONFIRMED",
      razorpayPaymentId,
      razorpayOrderId,
    },
  });
}

export async function markDemoOrderPaid(orderNumber: string) {
  return db.order.update({
    where: { orderNumber },
    data: {
      paymentStatus: "PAID",
      status: "CONFIRMED",
    },
  });
}
