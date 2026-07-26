import { requireAdmin } from "@/lib/admin-auth";
import { fetchAdminCategories } from "@/lib/db-queries";
import { ProductForm } from "../product-form";

export default async function NewProductPage() {
  await requireAdmin();
  const categories = await fetchAdminCategories();

  return <ProductForm categories={categories} />;
}
