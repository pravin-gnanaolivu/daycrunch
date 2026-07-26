import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { fetchAllProducts, fetchProductBySlug, fetchProductsByCategory } from "@/lib/db-queries";
import { MOCK_PRODUCTS } from "@/lib/mock-data";
import { ProductPageClient } from "./product-client";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  try {
    const products = await fetchAllProducts();
    return products.map((p: any) => ({ slug: p.slug }));
  } catch {
    // Fallback to mock data if database fails
    return MOCK_PRODUCTS.map((p) => ({ slug: p.slug }));
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await fetchProductBySlug(slug);
  if (!product) return { title: "Product Not Found" };

  const primaryImageUrl = product.images?.[0];
  const imageUrl = typeof primaryImageUrl === "string" ? primaryImageUrl : undefined;

  const description = product.shortDescription || product.description || "";

  return {
    title: product.name,
    description,
    openGraph: {
      title: product.name,
      description,
      images: imageUrl ? [{ url: imageUrl }] : [],
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = await fetchProductBySlug(slug);
  if (!product) notFound();

  const relatedProducts = product.categorySlug
    ? (await fetchProductsByCategory(product.categorySlug))
        .filter((p) => p.id !== product.id)
        .slice(0, 4)
    : [];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: product.images,
    sku: product.sku,
    brand: { "@type": "Brand", name: "DayCrunch" },
    offers: {
      "@type": "Offer",
      price: product.price,
      priceCurrency: "INR",
      availability:
        (product.stock ?? 0) > 0
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: product.rating,
      reviewCount: product.reviewCount,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProductPageClient
        initialProduct={product}
        relatedProducts={relatedProducts}
      />
    </>
  );
}
