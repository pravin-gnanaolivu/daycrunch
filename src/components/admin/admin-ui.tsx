import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface AdminPageHeaderProps {
  title: string;
  description?: string;
  action?: React.ReactNode;
}

export function AdminPageHeader({ title, description, action }: AdminPageHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
      <div>
        <h1 className="text-2xl font-black text-charcoal">{title}</h1>
        {description && <p className="text-sm text-muted mt-1">{description}</p>}
      </div>
      {action}
    </div>
  );
}

interface Column<T> {
  key: string;
  header: string;
  className?: string;
  render: (row: T) => React.ReactNode;
}

interface AdminTableProps<T> {
  columns: Column<T>[];
  data: T[];
  emptyMessage?: string;
}

export function AdminTable<T extends { id: string }>({
  columns,
  data,
  emptyMessage = "No data found",
}: AdminTableProps<T>) {
  if (data.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center">
        <p className="text-muted">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-x-auto">
      <table className="w-full text-sm">
        <thead className="bg-soft-beige">
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                className={cn("text-left p-4 font-semibold text-charcoal", col.className)}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr
              key={row.id}
              className="border-t border-gray-50 hover:bg-soft-beige/50"
            >
              {columns.map((col) => (
                <td key={col.key} className={cn("p-4", col.className)}>
                  {col.render(row)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function StatusBadge({
  status,
  variant,
}: {
  status: string;
  variant?: "default" | "secondary" | "accent" | "sale" | "outline";
}) {
  return <Badge variant={variant ?? "default"}>{status}</Badge>;
}

export function StatCard({
  label,
  value,
  change,
}: {
  label: string;
  value: string;
  change?: string;
}) {
  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-100">
      <p className="text-sm text-muted">{label}</p>
      <p className="text-2xl font-black text-charcoal mt-1">{value}</p>
      {change && <p className="text-xs text-pistachio font-semibold mt-1">{change}</p>}
    </div>
  );
}
