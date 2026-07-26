import { requireAdmin } from "@/lib/admin-auth";
import { fetchAdminCategories } from "@/lib/db-queries";
import { AdminPageHeader, AdminTable } from "@/components/admin/admin-ui";
import { Badge } from "@/components/ui/badge";
import { CategoryToggle } from "./category-toggle";
import { CreateCategoryForm } from "./create-category-form";

export default async function AdminCategoriesPage() {
  await requireAdmin();
  const categories = await fetchAdminCategories();

  return (
    <div>
      <AdminPageHeader
        title="Categories"
        description={`${categories.length} product categories`}
        action={<CreateCategoryForm />}
      />

      <AdminTable
        data={categories}
        emptyMessage="No categories yet"
        columns={[
          {
            key: "name",
            header: "Name",
            render: (c) => (
              <div>
                <p className="font-semibold text-charcoal">{c.name}</p>
                <p className="text-xs text-muted">/{c.slug}</p>
              </div>
            ),
          },
          {
            key: "description",
            header: "Description",
            className: "hidden md:table-cell",
            render: (c) => (
              <span className="text-muted text-sm line-clamp-1">{c.description}</span>
            ),
          },
          {
            key: "products",
            header: "Products",
            render: (c) => c._count.products,
          },
          {
            key: "sort",
            header: "Order",
            className: "hidden sm:table-cell",
            render: (c) => c.sortOrder,
          },
          {
            key: "status",
            header: "Status",
            render: (c) => (
              <Badge variant={c.isActive ? "accent" : "sale"}>
                {c.isActive ? "Active" : "Inactive"}
              </Badge>
            ),
          },
          {
            key: "toggle",
            header: "Active",
            render: (c) => <CategoryToggle id={c.id} isActive={c.isActive} />,
          },
        ]}
      />
    </div>
  );
}
