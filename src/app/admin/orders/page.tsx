import { requireAdmin } from "@/lib/admin-auth";
import { fetchAdminOrders } from "@/lib/db-queries";
import { formatPrice } from "@/lib/utils";
import { AdminPageHeader, AdminTable } from "@/components/admin/admin-ui";
import { Badge } from "@/components/ui/badge";
import { OrderStatusSelect } from "./order-status-select";

const STATUS_COLORS: Record<string, "default" | "secondary" | "accent" | "sale"> = {
  PENDING: "sale",
  CONFIRMED: "default",
  PROCESSING: "default",
  SHIPPED: "secondary",
  DELIVERED: "accent",
  CANCELLED: "sale",
  REFUNDED: "sale",
};

export default async function AdminOrdersPage() {
  await requireAdmin();
  const orders = await fetchAdminOrders();

  return (
    <div>
      <AdminPageHeader
        title="Orders"
        description={`${orders.length} total orders`}
      />

      <AdminTable
        data={orders}
        emptyMessage="No orders yet"
        columns={[
          {
            key: "orderNumber",
            header: "Order",
            render: (o) => (
              <span className="font-semibold text-charcoal">{o.orderNumber}</span>
            ),
          },
          {
            key: "customer",
            header: "Customer",
            className: "hidden sm:table-cell",
            render: (o) => (
              <div>
                <p className="text-charcoal">{o.user?.name ?? "Guest"}</p>
                <p className="text-xs text-muted">{o.user?.email ?? o.guestEmail}</p>
              </div>
            ),
          },
          {
            key: "total",
            header: "Total",
            render: (o) => (
              <span className="font-semibold">{formatPrice(Number(o.total))}</span>
            ),
          },
          {
            key: "payment",
            header: "Payment",
            className: "hidden md:table-cell",
            render: (o) => (
              <div className="space-y-1">
                <Badge variant={o.paymentStatus === "PAID" ? "accent" : "sale"}>
                  {o.paymentStatus}
                </Badge>
                {o.paymentMethod && (
                  <p className="text-xs text-muted">{o.paymentMethod}</p>
                )}
              </div>
            ),
          },
          {
            key: "status",
            header: "Status",
            render: (o) => (
              <div className="flex items-center gap-2">
                <Badge variant={STATUS_COLORS[o.status] ?? "default"}>{o.status}</Badge>
                <OrderStatusSelect orderId={o.id} currentStatus={o.status} />
              </div>
            ),
          },
          {
            key: "date",
            header: "Date",
            className: "hidden lg:table-cell",
            render: (o) => (
              <span className="text-muted">
                {new Date(o.createdAt).toLocaleDateString("en-IN")}
              </span>
            ),
          },
        ]}
      />
    </div>
  );
}
