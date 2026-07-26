import Link from "next/link";
import { ADMIN_NAV } from "@/lib/admin-nav";
import { Logo } from "@/components/brand/logo";
import { ArrowLeft } from "lucide-react";
import { AdminSidebar } from "./admin-sidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-soft-beige flex">
      <aside className="w-64 bg-charcoal text-white flex-shrink-0 hidden lg:flex lg:flex-col">
        <div className="p-6 border-b border-white/10">
          <Logo size="sm" />
          <p className="text-xs text-gray-400 mt-2">Admin Panel</p>
        </div>
        <AdminSidebar />
        <div className="p-4 border-t border-white/10 mt-auto">
          <Link
            href="/"
            className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Store
          </Link>
        </div>
      </aside>

      <main className="flex-1 p-6 lg:p-8 overflow-auto">{children}</main>
    </div>
  );
}

export { ADMIN_NAV };
