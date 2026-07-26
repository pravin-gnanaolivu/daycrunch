import { requireAdmin } from "@/lib/admin-auth";
import { fetchAdminBanners } from "@/lib/db-queries";
import { AdminPageHeader, AdminTable } from "@/components/admin/admin-ui";
import { Badge } from "@/components/ui/badge";
import { BannerToggle } from "./banner-toggle";
import { CreateBannerForm } from "./create-banner-form";

export default async function AdminBannersPage() {
  await requireAdmin();
  const banners = await fetchAdminBanners();

  return (
    <div>
      <AdminPageHeader
        title="Banners"
        description={`${banners.length} promotional banners`}
        action={<CreateBannerForm />}
      />

      <AdminTable
        data={banners}
        emptyMessage="No banners yet"
        columns={[
          {
            key: "title",
            header: "Banner",
            render: (b) => (
              <div>
                <p className="font-semibold text-charcoal">{b.title}</p>
                {b.subtitle && <p className="text-xs text-muted">{b.subtitle}</p>}
              </div>
            ),
          },
          {
            key: "position",
            header: "Position",
            className: "hidden sm:table-cell",
            render: (b) => <Badge variant="outline">{b.position}</Badge>,
          },
          {
            key: "link",
            header: "Link",
            className: "hidden md:table-cell",
            render: (b) => (
              <span className="text-muted text-sm truncate max-w-[150px] block">
                {b.link ?? "—"}
              </span>
            ),
          },
          {
            key: "sort",
            header: "Order",
            className: "hidden sm:table-cell",
            render: (b) => b.sortOrder,
          },
          {
            key: "status",
            header: "Status",
            render: (b) => (
              <Badge variant={b.isActive ? "accent" : "sale"}>
                {b.isActive ? "Active" : "Inactive"}
              </Badge>
            ),
          },
          {
            key: "toggle",
            header: "Active",
            render: (b) => <BannerToggle id={b.id} isActive={b.isActive} />,
          },
        ]}
      />
    </div>
  );
}
