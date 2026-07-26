import { requireAdmin } from "@/lib/admin-auth";
import { fetchAdminCoupons } from "@/lib/db-queries";
import { formatPrice } from "@/lib/utils";
import { AdminPageHeader, AdminTable } from "@/components/admin/admin-ui";
import { Badge } from "@/components/ui/badge";
import { CouponToggle } from "./coupon-toggle";
import { CreateCouponForm } from "./create-coupon-form";

export default async function AdminCouponsPage() {
  await requireAdmin();
  const coupons = await fetchAdminCoupons();

  return (
    <div>
      <AdminPageHeader
        title="Coupons"
        description={`${coupons.length} discount codes`}
        action={<CreateCouponForm />}
      />

      <AdminTable
        data={coupons}
        emptyMessage="No coupons yet"
        columns={[
          {
            key: "code",
            header: "Code",
            render: (c) => (
              <span className="font-mono font-bold text-plum">{c.code}</span>
            ),
          },
          {
            key: "description",
            header: "Description",
            className: "hidden md:table-cell",
            render: (c) => <span className="text-muted text-sm">{c.description}</span>,
          },
          {
            key: "discount",
            header: "Discount",
            render: (c) =>
              c.discountType === "PERCENTAGE"
                ? `${Number(c.discountValue)}%`
                : formatPrice(Number(c.discountValue)),
          },
          {
            key: "min",
            header: "Min Order",
            className: "hidden sm:table-cell",
            render: (c) =>
              c.minOrderValue ? formatPrice(Number(c.minOrderValue)) : "—",
          },
          {
            key: "uses",
            header: "Uses",
            render: (c) => (
              <span>
                {c.usedCount}
                {c.maxUses ? ` / ${c.maxUses}` : ""}
              </span>
            ),
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
            render: (c) => <CouponToggle id={c.id} isActive={c.isActive} />,
          },
        ]}
      />
    </div>
  );
}
