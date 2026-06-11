import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { fetchAllProducts, fetchProductBySlug } from "@/lib/db-queries";
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

  const primaryImageUrl =
    typeof product.images?.[0] === "string"
      ? product.images[0]
      : product.images?.[0]?.url;

  return {
    title: product.name,
    description: product.shortDescription || product.description,
    openGraph: {
      title: product.name,
      description: product.shortDescription || product.description,
      images: primaryImageUrl ? [{ url: primaryImageUrl }] : [],
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = await fetchProductBySlug(slug);
  if (!product) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: product.images?.map((img: any) => img.url || img),
    sku: product.sku,
    brand: { "@type": "Brand", name: "DayCrunch" },
    offers: {
      "@type": "Offer",
      price: product.basePrice,
      priceCurrency: "INR",
      availability:
        product.stock > 0
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
      <ProductPageClient slug={slug} />
    </>
  );
}
