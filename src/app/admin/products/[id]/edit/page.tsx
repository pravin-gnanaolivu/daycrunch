import { notFound } from "next/navigation";
import { requireAdmin } from "@/lib/admin-auth";
import { fetchAdminCategories, fetchAdminProductById } from "@/lib/db-queries";
import { ProductForm } from "../../product-form";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function EditProductPage({ params }: Props) {
  await requireAdmin();
  const { id } = await params;
  const [product, categories] = await Promise.all([
    fetchAdminProductById(id),
    fetchAdminCategories(),
  ]);

  if (!product) notFound();

  return <ProductForm categories={categories} product={product} />;
}
