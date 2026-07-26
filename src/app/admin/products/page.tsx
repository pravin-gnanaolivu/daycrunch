import Link from "next/link";
import { requireAdmin } from "@/lib/admin-auth";
import { fetchAdminProducts } from "@/lib/db-queries";
import { formatPrice } from "@/lib/utils";
import { AdminPageHeader, AdminTable } from "@/components/admin/admin-ui";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plus, Pencil } from "lucide-react";
import { ProductToggle } from "./product-toggle";

export default async function AdminProductsPage() {
  await requireAdmin();
  const products = await fetchAdminProducts();

  return (
    <div>
      <AdminPageHeader
        title="Products"
        description={`${products.length} products in catalog`}
        action={
          <Button asChild>
            <Link href="/admin/products/new">
              <Plus className="h-4 w-4" />
              Add Product
            </Link>
          </Button>
        }
      />

      <AdminTable
        data={products}
        emptyMessage="No products yet. Run npm run db:seed to populate."
        columns={[
          {
            key: "name",
            header: "Product",
            render: (p) => (
              <div>
                <p className="font-semibold text-charcoal">{p.name}</p>
                <p className="text-xs text-muted">{p.sku}</p>
              </div>
            ),
          },
          {
            key: "category",
            header: "Category",
            className: "hidden sm:table-cell",
            render: (p) => <span className="text-muted">{p.category.name}</span>,
          },
          {
            key: "price",
            header: "Price",
            render: (p) => (
              <span className="font-semibold">{formatPrice(Number(p.basePrice))}</span>
            ),
          },
          {
            key: "stock",
            header: "Stock",
            className: "hidden md:table-cell",
            render: (p) => p.stock,
          },
          {
            key: "status",
            header: "Status",
            className: "hidden md:table-cell",
            render: (p) => (
              <Badge variant={p.isActive ? (p.stock > 10 ? "accent" : "default") : "sale"}>
                {!p.isActive ? "Inactive" : p.stock > 10 ? "In Stock" : "Low Stock"}
              </Badge>
            ),
          },
          {
            key: "active",
            header: "Active",
            render: (p) => <ProductToggle id={p.id} isActive={p.isActive} />,
          },
          {
            key: "actions",
            header: "",
            render: (p) => (
              <Button asChild variant="ghost" size="sm">
                <Link href={`/admin/products/${p.id}/edit`}>
                  <Pencil className="h-4 w-4" />
                  Edit
                </Link>
              </Button>
            ),
          },
        ]}
      />
    </div>
  );
}
