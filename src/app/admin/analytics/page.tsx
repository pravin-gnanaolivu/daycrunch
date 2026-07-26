import { requireAdmin } from "@/lib/admin-auth";
import { fetchAnalytics, fetchAdminStats } from "@/lib/db-queries";
import { formatPrice } from "@/lib/utils";
import { AdminPageHeader, StatCard } from "@/components/admin/admin-ui";
import { Badge } from "@/components/ui/badge";

export default async function AdminAnalyticsPage() {
  await requireAdmin();
  const [analytics, stats] = await Promise.all([
    fetchAnalytics(),
    fetchAdminStats(),
  ]);

  const totalOrders = analytics.ordersByStatus.reduce(
    (sum, s) => sum + s._count.id,
    0
  );

  return (
    <div>
      <AdminPageHeader
        title="Analytics"
        description="Store performance overview"
      />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <StatCard label="Total Revenue" value={formatPrice(stats.revenue)} />
        <StatCard label="Total Orders" value={String(stats.orderCount)} />
        <StatCard label="Avg Order Value" value={
          stats.orderCount > 0
            ? formatPrice(Math.round(stats.revenue / stats.orderCount))
            : "₹0"
        } />
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl p-6 border border-gray-100">
          <h2 className="font-bold text-charcoal mb-4">Orders by Status</h2>
          {analytics.ordersByStatus.length === 0 ? (
            <p className="text-sm text-muted">No order data yet</p>
          ) : (
            <div className="space-y-3">
              {analytics.ordersByStatus.map((item) => {
                const pct = totalOrders > 0
                  ? Math.round((item._count.id / totalOrders) * 100)
                  : 0;
                return (
                  <div key={item.status}>
                    <div className="flex items-center justify-between mb-1">
                      <Badge variant="outline">{item.status}</Badge>
                      <span className="text-sm font-semibold">
                        {item._count.id} ({pct}%)
                      </span>
                    </div>
                    <div className="h-2 bg-soft-beige rounded-full overflow-hidden">
                      <div
                        className="h-full bg-sunset rounded-full transition-all"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <div className="bg-white rounded-2xl p-6 border border-gray-100">
          <h2 className="font-bold text-charcoal mb-4">Top Products</h2>
          {analytics.topProducts.length === 0 ? (
            <p className="text-sm text-muted">No sales data yet</p>
          ) : (
            <div className="space-y-3">
              {analytics.topProducts.map((item, i) => (
                <div
                  key={item.productId}
                  className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-bold text-muted w-5">{i + 1}</span>
                    <span className="text-sm text-charcoal">{item.name}</span>
                  </div>
                  <span className="text-sm font-semibold text-sunset">
                    {item._sum.quantity} sold
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-white rounded-2xl p-6 border border-gray-100 lg:col-span-2">
          <h2 className="font-bold text-charcoal mb-4">Revenue (Last 30 Days)</h2>
          {analytics.recentRevenue.length === 0 ? (
            <p className="text-sm text-muted">No revenue data yet</p>
          ) : (
            <div className="grid grid-cols-7 sm:grid-cols-14 gap-1">
              {analytics.recentRevenue.slice(-14).map((order, i) => {
                const max = Math.max(
                  ...analytics.recentRevenue.map((o) => Number(o.total))
                );
                const height = max > 0 ? (Number(order.total) / max) * 100 : 0;
                return (
                  <div key={i} className="flex flex-col items-center gap-1">
                    <div className="w-full h-24 flex items-end">
                      <div
                        className="w-full bg-plum/80 rounded-t"
                        style={{ height: `${Math.max(height, 4)}%` }}
                        title={formatPrice(Number(order.total))}
                      />
                    </div>
                    <span className="text-[9px] text-muted">
                      {new Date(order.createdAt).getDate()}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
