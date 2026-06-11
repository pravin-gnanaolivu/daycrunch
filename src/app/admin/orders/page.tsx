import { Badge } from "@/components/ui/badge";

const ORDERS = [
  { id: "DC-LM2K-A3F7", customer: "Priya Sharma", email: "priya@email.com", total: 1299, status: "DELIVERED", date: "2026-06-10" },
  { id: "DC-LM1J-B2E6", customer: "Rahul Mehta", email: "rahul@email.com", total: 849, status: "SHIPPED", date: "2026-06-09" },
  { id: "DC-LM1H-C1D5", customer: "Ananya Patel", email: "ananya@email.com", total: 2499, status: "PROCESSING", date: "2026-06-08" },
  { id: "DC-LM1G-D0C4", customer: "Vikram Singh", email: "vikram@email.com", total: 449, status: "CONFIRMED", date: "2026-06-08" },
  { id: "DC-LM1F-E9B3", customer: "Sneha Reddy", email: "sneha@email.com", total: 1999, status: "PENDING", date: "2026-06-07" },
];

const STATUS_COLORS: Record<string, "default" | "secondary" | "accent" | "sale"> = {
  PENDING: "sale",
  CONFIRMED: "default",
  PROCESSING: "default",
  SHIPPED: "secondary",
  DELIVERED: "accent",
};

export default function AdminOrdersPage() {
  return (
    <div>
      <h1 className="text-2xl font-black text-charcoal mb-6">Orders</h1>
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-soft-beige">
            <tr>
              <th className="text-left p-4 font-semibold">Order</th>
              <th className="text-left p-4 font-semibold hidden sm:table-cell">Customer</th>
              <th className="text-left p-4 font-semibold">Total</th>
              <th className="text-left p-4 font-semibold">Status</th>
              <th className="text-left p-4 font-semibold hidden md:table-cell">Date</th>
            </tr>
          </thead>
          <tbody>
            {ORDERS.map((order) => (
              <tr key={order.id} className="border-t border-gray-50 hover:bg-soft-beige/50 cursor-pointer">
                <td className="p-4 font-semibold text-charcoal">{order.id}</td>
                <td className="p-4 hidden sm:table-cell">
                  <p className="text-charcoal">{order.customer}</p>
                  <p className="text-xs text-muted">{order.email}</p>
                </td>
                <td className="p-4 font-semibold">₹{order.total}</td>
                <td className="p-4">
                  <Badge variant={STATUS_COLORS[order.status] ?? "default"}>
                    {order.status}
                  </Badge>
                </td>
                <td className="p-4 text-muted hidden md:table-cell">{order.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
