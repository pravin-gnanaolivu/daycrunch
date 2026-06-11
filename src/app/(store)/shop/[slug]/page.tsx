import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { fetchProductsByCategory } from "@/lib/db-queries";
import { CATEGORIES } from "@/lib/constants";
import { CategoryShopClient } from "./category-client";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return CATEGORIES.map((cat) => ({ slug: cat.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const category = CATEGORIES.find((c) => c.slug === slug);
  if (!category) return { title: "Category Not Found" };
  return {
    title: `${category.name} — Premium Healthy Snacks`,
    description: category.description,
  };
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const category = CATEGORIES.find((c) => c.slug === slug);
  if (!category) notFound();

  const products = await fetchProductsByCategory(slug);

  return <CategoryShopClient category={category} products={products as any} />;
}
