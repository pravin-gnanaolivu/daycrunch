import { db } from "@/lib/db";
import type { Product } from "@/types";
import type { Prisma } from "@prisma/client";

type DbProduct = Prisma.ProductGetPayload<{
  include: {
    images: true;
    category: true;
    variants: true;
    _count: { select: { reviews: true } };
  };
}>;

export function mapDbProduct(product: DbProduct): Product {
  const primaryImage =
    product.images.find((i) => i.isPrimary)?.url ?? product.images[0]?.url ?? "";
  return {
    id: product.id,
    name: product.name,
    slug: product.slug,
    description: product.description,
    shortDescription: product.shortDescription ?? "",
    category: product.category.name,
    categorySlug: product.category.slug,
    price: Number(product.basePrice),
    compareAtPrice: product.compareAtPrice
      ? Number(product.compareAtPrice)
      : undefined,
    images: product.images.length > 0 ? product.images.map((i) => i.url) : [primaryImage],
    rating: product.rating,
    reviewCount: product._count?.reviews ?? product.reviewCount,
    isBestSeller: product.isBestSeller,
    isNew: product.isNew,
    isFeatured: product.isFeatured,
    isActive: product.isActive,
    stock: product.stock,
    sku: product.sku,
    ingredients: product.ingredients ?? undefined,
    benefits: product.benefits ?? undefined,
    storageInfo: product.storageInfo ?? undefined,
    nutritionInfo: product.nutritionInfo as Record<string, string> | undefined,
    variants: product.variants.map((v) => ({
      id: v.id,
      name: v.name,
      price: Number(v.price),
      weight: v.weight ?? undefined,
      packSize: v.packSize ?? undefined,
      stock: v.stock,
    })),
  };
}

// ─── Storefront queries ───────────────────────────────────────────

export async function fetchProducts(options?: {
  category?: string;
  featured?: boolean;
  bestseller?: boolean;
  limit?: number;
  skip?: number;
}) {
  try {
    const where = {
      isActive: true,
      ...(options?.category && { category: { slug: options.category } }),
      ...(options?.featured !== undefined && { isFeatured: options.featured }),
      ...(options?.bestseller !== undefined && { isBestSeller: options.bestseller }),
    };

    const [rows, total] = await Promise.all([
      db.product.findMany({
        where,
        include: {
          images: { orderBy: { sortOrder: "asc" } },
          category: true,
          variants: { where: { isActive: true } },
          _count: { select: { reviews: true } },
        },
        orderBy: { createdAt: "desc" },
        take: options?.limit,
        skip: options?.skip,
      }),
      db.product.count({ where }),
    ]);

    return { products: rows.map(mapDbProduct), total, count: rows.length };
  } catch (error) {
    console.error("Error fetching products:", error);
    return { products: [] as Product[], total: 0, count: 0 };
  }
}

export async function fetchProductBySlug(slug: string) {
  try {
    const product = await db.product.findFirst({
      where: { slug, isActive: true },
      include: {
        images: { orderBy: { sortOrder: "asc" } },
        videos: { orderBy: { sortOrder: "asc" } },
        category: true,
        variants: { where: { isActive: true } },
        reviews: {
          include: { user: true },
          orderBy: { createdAt: "desc" },
          take: 10,
        },
        _count: { select: { reviews: true } },
      },
    });
    return product ? mapDbProduct(product) : null;
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
}

export async function fetchCategories() {
  try {
    return await db.category.findMany({
      where: { isActive: true },
      include: { _count: { select: { products: true } } },
      orderBy: { sortOrder: "asc" },
    });
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
}

export async function fetchProductsByCategory(categorySlug: string) {
  const { products } = await fetchProducts({ category: categorySlug });
  return products;
}

export async function fetchBestSellers(limit = 8) {
  return fetchProducts({ bestseller: true, limit });
}

export async function fetchFeaturedProducts(limit = 8) {
  return fetchProducts({ featured: true, limit });
}

export async function searchProducts(query: string) {
  try {
    const rows = await db.product.findMany({
      where: {
        isActive: true,
        OR: [
          { name: { contains: query, mode: "insensitive" } },
          { description: { contains: query, mode: "insensitive" } },
          { category: { name: { contains: query, mode: "insensitive" } } },
        ],
      },
      include: {
        images: { orderBy: { sortOrder: "asc" } },
        category: true,
        variants: { where: { isActive: true } },
        _count: { select: { reviews: true } },
      },
      take: 50,
    });
    return rows.map(mapDbProduct);
  } catch (error) {
    console.error("Error searching products:", error);
    return [] as Product[];
  }
}

export async function fetchRelatedProducts(product: Product, limit = 4) {
  const { products } = await fetchProducts({ category: product.categorySlug, limit: limit + 1 });
  return products.filter((p) => p.id !== product.id).slice(0, limit);
}

export async function fetchAllProducts() {
  const { products } = await fetchProducts({ limit: 1000 });
  return products;
}

// ─── Admin queries ────────────────────────────────────────────────

export async function fetchAdminStats() {
  try {
    const [orderCount, productCount, customerCount, revenue, recentOrders, lowStock] =
      await Promise.all([
        db.order.count(),
        db.product.count({ where: { isActive: true } }),
        db.user.count({ where: { role: "USER" } }),
        db.order.aggregate({
          where: { paymentStatus: "PAID" },
          _sum: { total: true },
        }),
        db.order.findMany({
          take: 5,
          orderBy: { createdAt: "desc" },
          include: { user: true },
        }),
        db.product.findMany({
          where: { isActive: true, stock: { lte: 15 } },
          orderBy: { stock: "asc" },
          take: 5,
        }),
      ]);

    return {
      orderCount,
      productCount,
      customerCount,
      revenue: Number(revenue._sum.total ?? 0),
      recentOrders,
      lowStock,
    };
  } catch (error) {
    console.error("Error fetching admin stats:", error);
    return {
      orderCount: 0,
      productCount: 0,
      customerCount: 0,
      revenue: 0,
      recentOrders: [],
      lowStock: [],
    };
  }
}

export async function fetchAdminProductById(id: string) {
  try {
    return await db.product.findUnique({
      where: { id },
      include: {
        category: true,
        images: { orderBy: { sortOrder: "asc" } },
      },
    });
  } catch (error) {
    console.error("Error fetching admin product:", error);
    return null;
  }
}

export async function fetchAdminProducts() {
  try {
    return await db.product.findMany({
      include: {
        category: true,
        images: { where: { isPrimary: true }, take: 1 },
        _count: { select: { variants: true } },
      },
      orderBy: { createdAt: "desc" },
    });
  } catch (error) {
    console.error("Error fetching admin products:", error);
    return [];
  }
}

export async function fetchAdminOrders() {
  try {
    return await db.order.findMany({
      include: { user: true, items: true },
      orderBy: { createdAt: "desc" },
    });
  } catch (error) {
    console.error("Error fetching admin orders:", error);
    return [];
  }
}

export async function fetchAdminCustomers() {
  try {
    return await db.user.findMany({
      where: { role: "USER" },
      include: { _count: { select: { orders: true } } },
      orderBy: { createdAt: "desc" },
    });
  } catch (error) {
    console.error("Error fetching admin customers:", error);
    return [];
  }
}

export async function fetchAdminCategories() {
  try {
    return await db.category.findMany({
      include: { _count: { select: { products: true } } },
      orderBy: { sortOrder: "asc" },
    });
  } catch (error) {
    console.error("Error fetching admin categories:", error);
    return [];
  }
}

export async function fetchAdminCoupons() {
  try {
    return await db.coupon.findMany({
      include: { _count: { select: { usages: true } } },
      orderBy: { createdAt: "desc" },
    });
  } catch (error) {
    console.error("Error fetching admin coupons:", error);
    return [];
  }
}

export async function fetchAdminBanners() {
  try {
    return await db.banner.findMany({ orderBy: { sortOrder: "asc" } });
  } catch (error) {
    console.error("Error fetching admin banners:", error);
    return [];
  }
}

export async function fetchAdminBlogPosts() {
  try {
    return await db.blogPost.findMany({ orderBy: { createdAt: "desc" } });
  } catch (error) {
    console.error("Error fetching admin blog posts:", error);
    return [];
  }
}

export async function fetchAdminMedia() {
  try {
    return await db.media.findMany({ orderBy: { createdAt: "desc" } });
  } catch (error) {
    console.error("Error fetching admin media:", error);
    return [];
  }
}

export async function fetchAdminSettings() {
  try {
    return await db.siteSetting.findMany({ orderBy: { key: "asc" } });
  } catch (error) {
    console.error("Error fetching admin settings:", error);
    return [];
  }
}

export async function fetchAnalytics() {
  try {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const [ordersByStatus, recentRevenue, topProducts] = await Promise.all([
      db.order.groupBy({
        by: ["status"],
        _count: { id: true },
      }),
      db.order.findMany({
        where: { createdAt: { gte: thirtyDaysAgo }, paymentStatus: "PAID" },
        select: { total: true, createdAt: true },
        orderBy: { createdAt: "asc" },
      }),
      db.orderItem.groupBy({
        by: ["productId", "name"],
        _sum: { quantity: true },
        orderBy: { _sum: { quantity: "desc" } },
        take: 5,
      }),
    ]);

    return { ordersByStatus, recentRevenue, topProducts };
  } catch (error) {
    console.error("Error fetching analytics:", error);
    return { ordersByStatus: [], recentRevenue: [], topProducts: [] };
  }
}
