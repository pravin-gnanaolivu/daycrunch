import type { MetadataRoute } from "next";
import { fetchAllProducts } from "@/lib/db-queries";
import { MOCK_PRODUCTS } from "@/lib/mock-data";
import { CATEGORIES } from "@/lib/constants";
import type { Product } from "@/types";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://daycrunch.in";

  const staticPages = [
    "",
    "/shop",
    "/about",
    "/gift-boxes",
    "/corporate",
    "/blog",
    "/faq",
    "/contact",
    "/cart",
  ].map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  const categoryPages = CATEGORIES.map((cat) => ({
    url: `${baseUrl}/shop/${cat.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  let products: Product[] = MOCK_PRODUCTS;
  try {
    products = await fetchAllProducts();
  } catch (error) {
    console.error("Error fetching products for sitemap:", error);
  }

  const productPages = products.map((product: Product) => ({
    url: `${baseUrl}/product/${product.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  return [...staticPages, ...categoryPages, ...productPages];
}
