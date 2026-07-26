import { requireAdmin } from "@/lib/admin-auth";
import { fetchAdminCustomers } from "@/lib/db-queries";
import { AdminPageHeader, AdminTable } from "@/components/admin/admin-ui";
import { Badge } from "@/components/ui/badge";

export default async function AdminCustomersPage() {
  await requireAdmin();
  const customers = await fetchAdminCustomers();

  return (
    <div>
      <AdminPageHeader
        title="Customers"
        description={`${customers.length} registered customers`}
      />

      <AdminTable
        data={customers}
        emptyMessage="No customers yet"
        columns={[
          {
            key: "name",
            header: "Customer",
            render: (c) => (
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-gradient-to-br from-sunset to-plum flex items-center justify-center text-white text-xs font-bold">
                  {(c.name ?? c.email).charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="font-semibold text-charcoal">{c.name ?? "—"}</p>
                  <p className="text-xs text-muted">{c.email}</p>
                </div>
              </div>
            ),
          },
          {
            key: "phone",
            header: "Phone",
            className: "hidden sm:table-cell",
            render: (c) => <span className="text-muted">{c.phone ?? "—"}</span>,
          },
          {
            key: "orders",
            header: "Orders",
            render: (c) => c._count.orders,
          },
          {
            key: "joined",
            header: "Joined",
            className: "hidden md:table-cell",
            render: (c) => (
              <span className="text-muted">
                {new Date(c.createdAt).toLocaleDateString("en-IN")}
              </span>
            ),
          },
          {
            key: "role",
            header: "Role",
            render: () => <Badge variant="outline">Customer</Badge>,
          },
        ]}
      />
    </div>
  );
}
