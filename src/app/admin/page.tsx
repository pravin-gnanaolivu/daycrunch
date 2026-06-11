const STATS = [
  { label: "Total Revenue", value: "₹12,45,890", change: "+12.5%" },
  { label: "Orders", value: "1,234", change: "+8.2%" },
  { label: "Products", value: "48", change: "+3" },
  { label: "Customers", value: "5,678", change: "+15.3%" },
];

export default function AdminDashboard() {
  return (
    <div>
      <h1 className="text-2xl font-black text-charcoal mb-6">Dashboard Overview</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {STATS.map((stat) => (
          <div key={stat.label} className="bg-white rounded-2xl p-6 border border-gray-100">
            <p className="text-sm text-muted">{stat.label}</p>
            <p className="text-2xl font-black text-charcoal mt-1">{stat.value}</p>
            <p className="text-xs text-pistachio font-semibold mt-1">{stat.change}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl p-6 border border-gray-100">
          <h2 className="font-bold text-charcoal mb-4">Recent Orders</h2>
          <div className="space-y-3">
            {[
              { id: "DC-001", customer: "Priya S.", amount: "₹1,299", status: "Delivered" },
              { id: "DC-002", customer: "Rahul M.", amount: "₹849", status: "Shipped" },
              { id: "DC-003", customer: "Ananya P.", amount: "₹2,499", status: "Processing" },
            ].map((order) => (
              <div key={order.id} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                <div>
                  <p className="text-sm font-semibold text-charcoal">{order.id}</p>
                  <p className="text-xs text-muted">{order.customer}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold">{order.amount}</p>
                  <p className="text-xs text-pistachio">{order.status}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-gray-100">
          <h2 className="font-bold text-charcoal mb-4">Low Stock Alerts</h2>
          <div className="space-y-3">
            {[
              { name: "Premium Medjool Dates", stock: 8 },
              { name: "Festive Gift Hamper", stock: 5 },
              { name: "Ajwa Dates Premium", stock: 12 },
            ].map((item) => (
              <div key={item.name} className="flex items-center justify-between py-2">
                <p className="text-sm text-charcoal">{item.name}</p>
                <span className="text-xs font-semibold text-sunset bg-sunset/10 px-2 py-1 rounded-full">
                  {item.stock} left
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
