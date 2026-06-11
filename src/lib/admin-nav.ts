import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  Tag,
  Image as ImageIcon,
  FileText,
  Settings,
  BarChart3,
  Layers,
} from "lucide-react";

export const ADMIN_NAV = [
  { href: "/admin", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/admin/products", icon: Package, label: "Products" },
  { href: "/admin/categories", icon: Layers, label: "Categories" },
  { href: "/admin/orders", icon: ShoppingCart, label: "Orders" },
  { href: "/admin/customers", icon: Users, label: "Customers" },
  { href: "/admin/coupons", icon: Tag, label: "Coupons" },
  { href: "/admin/banners", icon: ImageIcon, label: "Banners" },
  { href: "/admin/media", icon: ImageIcon, label: "Media" },
  { href: "/admin/blog", icon: FileText, label: "Blog" },
  { href: "/admin/analytics", icon: BarChart3, label: "Analytics" },
  { href: "/admin/settings", icon: Settings, label: "Settings" },
];
