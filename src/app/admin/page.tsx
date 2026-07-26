import { requireAdmin } from "@/lib/admin-auth";
import { fetchAdminStats } from "@/lib/db-queries";
import { formatPrice } from "@/lib/utils";
import { AdminPageHeader, StatCard } from "@/components/admin/admin-ui";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export default async function AdminDashboard() {
  await requireAdmin();
  const stats = await fetchAdminStats();

  return (
    <div>
      <AdminPageHeader
        title="Dashboard Overview"
        description="Welcome back! Here's what's happening with DayCrunch."
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard label="Total Revenue" value={formatPrice(stats.revenue)} change="Paid orders" />
        <StatCard label="Orders" value={String(stats.orderCount)} />
        <StatCard label="Products" value={String(stats.productCount)} />
        <StatCard label="Customers" value={String(stats.customerCount)} />
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-charcoal">Recent Orders</h2>
            <Link href="/admin/orders" className="text-sm text-sunset font-semibold hover:underline">
              View all
            </Link>
          </div>
          {stats.recentOrders.length === 0 ? (
            <p className="text-sm text-muted py-4">No orders yet</p>
          ) : (
            <div className="space-y-3">
              {stats.recentOrders.map((order) => (
                <div
                  key={order.id}
                  className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0"
                >
                  <div>
                    <p className="text-sm font-semibold text-charcoal">{order.orderNumber}</p>
                    <p className="text-xs text-muted">
                      {order.user?.name ?? order.guestEmail ?? "Guest"}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold">{formatPrice(Number(order.total))}</p>
                    <Badge variant="accent" className="text-[10px]">{order.status}</Badge>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-white rounded-2xl p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-charcoal">Low Stock Alerts</h2>
            <Link href="/admin/products" className="text-sm text-sunset font-semibold hover:underline">
              Manage
            </Link>
          </div>
          {stats.lowStock.length === 0 ? (
            <p className="text-sm text-muted py-4">All products well stocked</p>
          ) : (
            <div className="space-y-3">
              {stats.lowStock.map((item) => (
                <div key={item.id} className="flex items-center justify-between py-2">
                  <p className="text-sm text-charcoal">{item.name}</p>
                  <span className="text-xs font-semibold text-sunset bg-sunset/10 px-2 py-1 rounded-full">
                    {item.stock} left
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
