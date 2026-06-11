import { db } from "@/lib/db";
import type { Product, Category } from "@/types";

// Fetch all products with optional filters
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
      ...(options?.bestseller !== undefined && {
        isBestSeller: options.bestseller,
      }),
    };

    const [products, total] = await Promise.all([
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

    return { products, total, count: products.length };
  } catch (error) {
    console.error("Error fetching products:", error);
    return { products: [], total: 0, count: 0 };
  }
}

// Fetch single product by slug
export async function fetchProductBySlug(slug: string) {
  try {
    const product = await db.product.findUnique({
      where: { slug },
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

    return product;
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
}

// Fetch all categories
export async function fetchCategories() {
  try {
    const categories = await db.category.findMany({
      where: { isActive: true },
      include: { _count: { select: { products: true } } },
      orderBy: { sortOrder: "asc" },
    });

    return categories;
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
}

// Fetch products by category
export async function fetchProductsByCategory(categorySlug: string) {
  try {
    const products = await db.product.findMany({
      where: {
        isActive: true,
        category: { slug: categorySlug },
      },
      include: {
        images: { orderBy: { sortOrder: "asc" } },
        category: true,
        variants: { where: { isActive: true } },
        _count: { select: { reviews: true } },
      },
      orderBy: { createdAt: "desc" },
    });

    return products.map((product) => ({
      ...product,
      basePrice: product.basePrice?.toNumber?.() ?? product.basePrice,
      compareAtPrice:
        product.compareAtPrice?.toNumber?.() ?? product.compareAtPrice,
      variants: product.variants.map((variant) => ({
        ...variant,
        price: variant.price?.toNumber?.() ?? variant.price,
      })),
    }));
  } catch (error) {
    console.error("Error fetching category products:", error);
    return [];
  }
}

// Fetch best sellers
export async function fetchBestSellers(limit = 8) {
  return fetchProducts({ bestseller: true, limit });
}

// Fetch featured products
export async function fetchFeaturedProducts(limit = 8) {
  return fetchProducts({ featured: true, limit });
}

// Search products (client-side filtering for now, can be extended to server-side)
export async function searchProducts(query: string) {
  const { products } = await fetchProducts({ limit: 100 });
  const q = query.toLowerCase();
  return products.filter(
    (p: any) =>
      p.name.toLowerCase().includes(q) ||
      p.description?.toLowerCase().includes(q) ||
      p.category?.name.toLowerCase().includes(q),
  );
}

// Get related products
export async function fetchRelatedProducts(product: any, limit = 4) {
  if (!product.categoryId) return [];
  const { products } = await fetchProducts({
    category: product.category?.slug,
    limit: limit + 1,
  });
  return products.filter((p) => p.id !== product.id).slice(0, limit);
}

// Fetch all products for sitemap
export async function fetchAllProducts() {
  const { products } = await fetchProducts({ limit: 1000 });
  return products;
}
