"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/admin-auth";
import { slugify } from "@/lib/utils";

import { generateTrackingNumber } from "@/lib/order-tracking";

export async function updateOrderStatus(orderId: string, status: string) {
  await requireAdmin();

  const updateData: {
    status: "PENDING" | "CONFIRMED" | "PROCESSING" | "SHIPPED" | "DELIVERED" | "CANCELLED" | "REFUNDED";
    trackingNumber?: string;
    paymentStatus?: "PAID";
  } = {
    status: status as "PENDING" | "CONFIRMED" | "PROCESSING" | "SHIPPED" | "DELIVERED" | "CANCELLED" | "REFUNDED",
  };

  if (status === "SHIPPED") {
    const order = await db.order.findUnique({ where: { id: orderId } });
    if (order && !order.trackingNumber) {
      updateData.trackingNumber = generateTrackingNumber();
    }
  }

  if (status === "DELIVERED") {
    const order = await db.order.findUnique({ where: { id: orderId } });
    if (order?.paymentMethod === "COD" && order.paymentStatus === "PENDING") {
      updateData.paymentStatus = "PAID";
    }
  }

  await db.order.update({
    where: { id: orderId },
    data: updateData,
  });
  revalidatePath("/admin/orders");
}

export async function toggleCategoryActive(id: string, isActive: boolean) {
  await requireAdmin();
  await db.category.update({ where: { id }, data: { isActive } });
  revalidatePath("/admin/categories");
}

export async function toggleCouponActive(id: string, isActive: boolean) {
  await requireAdmin();
  await db.coupon.update({ where: { id }, data: { isActive } });
  revalidatePath("/admin/coupons");
}

export async function toggleBannerActive(id: string, isActive: boolean) {
  await requireAdmin();
  await db.banner.update({ where: { id }, data: { isActive } });
  revalidatePath("/admin/banners");
}

export async function toggleBlogPublished(id: string, isPublished: boolean) {
  await requireAdmin();
  await db.blogPost.update({
    where: { id },
    data: { isPublished, publishedAt: isPublished ? new Date() : null },
  });
  revalidatePath("/admin/blog");
}

export async function deleteMedia(id: string) {
  await requireAdmin();
  await db.media.delete({ where: { id } });
  revalidatePath("/admin/media");
}

export async function createCategory(data: {
  name: string;
  description?: string;
  sortOrder?: number;
}) {
  await requireAdmin();
  const slug = slugify(data.name);
  await db.category.create({
    data: {
      name: data.name,
      slug,
      description: data.description,
      sortOrder: data.sortOrder ?? 0,
    },
  });
  revalidatePath("/admin/categories");
}

export async function createCoupon(data: {
  code: string;
  description?: string;
  discountType: string;
  discountValue: number;
  minOrderValue?: number;
  maxUses?: number;
}) {
  await requireAdmin();
  await db.coupon.create({ data });
  revalidatePath("/admin/coupons");
}

export async function createBanner(data: {
  title: string;
  subtitle?: string;
  image: string;
  link?: string;
  position?: string;
}) {
  await requireAdmin();
  await db.banner.create({ data });
  revalidatePath("/admin/banners");
}

export async function createBlogPost(data: {
  title: string;
  excerpt?: string;
  content: string;
  coverImage?: string;
  author?: string;
  isPublished?: boolean;
}) {
  await requireAdmin();
  const slug = slugify(data.title);
  await db.blogPost.create({
    data: {
      ...data,
      slug,
      publishedAt: data.isPublished ? new Date() : null,
    },
  });
  revalidatePath("/admin/blog");
}

export async function upsertSetting(key: string, value: string) {
  await requireAdmin();
  await db.siteSetting.upsert({
    where: { key },
    update: { value },
    create: { key, value },
  });
  revalidatePath("/admin/settings");
}

export async function toggleProductActive(id: string, isActive: boolean) {
  await requireAdmin();
  await db.product.update({ where: { id }, data: { isActive } });
  revalidatePath("/admin/products");
  revalidatePath("/shop");
  revalidatePath("/");
}

export async function createProduct(data: {
  name: string;
  sku: string;
  categoryId: string;
  basePrice: number;
  compareAtPrice?: number;
  stock: number;
  description: string;
  shortDescription?: string;
  ingredients?: string;
  benefits?: string;
  storageInfo?: string;
  imageUrl?: string;
  isActive?: boolean;
  isFeatured?: boolean;
  isBestSeller?: boolean;
  isNew?: boolean;
}) {
  await requireAdmin();

  const slug = slugify(data.name);
  const existing = await db.product.findFirst({
    where: { OR: [{ slug }, { sku: data.sku }] },
  });
  if (existing) {
    throw new Error("A product with this name or SKU already exists");
  }

  await db.product.create({
    data: {
      name: data.name,
      slug,
      sku: data.sku,
      categoryId: data.categoryId,
      basePrice: data.basePrice,
      compareAtPrice: data.compareAtPrice,
      stock: data.stock,
      description: data.description,
      shortDescription: data.shortDescription,
      ingredients: data.ingredients,
      benefits: data.benefits,
      storageInfo: data.storageInfo,
      isActive: data.isActive ?? true,
      isFeatured: data.isFeatured ?? false,
      isBestSeller: data.isBestSeller ?? false,
      isNew: data.isNew ?? false,
      ...(data.imageUrl && {
        images: {
          create: [{ url: data.imageUrl, isPrimary: true, sortOrder: 0 }],
        },
      }),
    },
  });

  revalidatePath("/admin/products");
  revalidatePath("/shop");
  revalidatePath("/");
}

export async function updateProduct(
  id: string,
  data: {
    name: string;
    sku: string;
    categoryId: string;
    basePrice: number;
    compareAtPrice?: number;
    stock: number;
    description: string;
    shortDescription?: string;
    ingredients?: string;
    benefits?: string;
    storageInfo?: string;
    imageUrl?: string;
    isActive?: boolean;
    isFeatured?: boolean;
    isBestSeller?: boolean;
    isNew?: boolean;
  }
) {
  await requireAdmin();

  const slug = slugify(data.name);
  const conflict = await db.product.findFirst({
    where: {
      OR: [{ slug }, { sku: data.sku }],
      NOT: { id },
    },
  });
  if (conflict) {
    throw new Error("A product with this name or SKU already exists");
  }

  await db.product.update({
    where: { id },
    data: {
      name: data.name,
      slug,
      sku: data.sku,
      categoryId: data.categoryId,
      basePrice: data.basePrice,
      compareAtPrice: data.compareAtPrice ?? null,
      stock: data.stock,
      description: data.description,
      shortDescription: data.shortDescription,
      ingredients: data.ingredients,
      benefits: data.benefits,
      storageInfo: data.storageInfo,
      isActive: data.isActive ?? true,
      isFeatured: data.isFeatured ?? false,
      isBestSeller: data.isBestSeller ?? false,
      isNew: data.isNew ?? false,
    },
  });

  if (data.imageUrl) {
    const primary = await db.productImage.findFirst({
      where: { productId: id, isPrimary: true },
    });
    if (primary) {
      await db.productImage.update({
        where: { id: primary.id },
        data: { url: data.imageUrl },
      });
    } else {
      await db.productImage.create({
        data: { productId: id, url: data.imageUrl, isPrimary: true, sortOrder: 0 },
      });
    }
  }

  revalidatePath("/admin/products");
  revalidatePath("/shop");
  revalidatePath(`/product/${slug}`);
}
