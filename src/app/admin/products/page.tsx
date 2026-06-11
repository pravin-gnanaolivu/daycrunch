import { Button } from "@/components/ui/button";
import { Plus, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { fetchProducts } from "@/lib/db-queries";
import { formatPrice } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

export default async function AdminProductsPage() {
  const { products } = await fetchProducts({ limit: 1000 });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-black text-charcoal">Products</h1>
        <Button>
          <Plus className="h-4 w-4" />
          Add Product
        </Button>
      </div>

      <div className="relative mb-6 max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted" />
        <Input placeholder="Search products..." className="pl-10" />
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-soft-beige">
            <tr>
              <th className="text-left p-4 font-semibold text-charcoal">
                Product
              </th>
              <th className="text-left p-4 font-semibold text-charcoal hidden sm:table-cell">
                Category
              </th>
              <th className="text-left p-4 font-semibold text-charcoal">
                Price
              </th>
              <th className="text-left p-4 font-semibold text-charcoal hidden md:table-cell">
                Stock
              </th>
              <th className="text-left p-4 font-semibold text-charcoal hidden md:table-cell">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {products?.map((product: any) => (
              <tr
                key={product.id}
                className="border-t border-gray-50 hover:bg-soft-beige/50"
              >
                <td className="p-4">
                  <p className="font-semibold text-charcoal">{product.name}</p>
                  <p className="text-xs text-muted">{product.sku}</p>
                </td>
                <td className="p-4 text-muted hidden sm:table-cell">
                  {product.category?.name}
                </td>
                <td className="p-4 font-semibold">
                  {formatPrice(Number(product.basePrice))}
                </td>
                <td className="p-4 hidden md:table-cell">{product.stock}</td>
                <td className="p-4 hidden md:table-cell">
                  <Badge variant={product.stock > 10 ? "accent" : "default"}>
                    {product.stock > 10 ? "In Stock" : "Low Stock"}
                  </Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
