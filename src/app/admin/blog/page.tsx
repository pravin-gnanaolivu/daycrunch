import { requireAdmin } from "@/lib/admin-auth";
import { fetchAdminBlogPosts } from "@/lib/db-queries";
import { AdminPageHeader, AdminTable } from "@/components/admin/admin-ui";
import { Badge } from "@/components/ui/badge";
import { BlogToggle } from "./blog-toggle";
import { CreateBlogForm } from "./create-blog-form";

export default async function AdminBlogPage() {
  await requireAdmin();
  const posts = await fetchAdminBlogPosts();

  return (
    <div>
      <AdminPageHeader
        title="Blog Posts"
        description={`${posts.length} articles`}
        action={<CreateBlogForm />}
      />

      <AdminTable
        data={posts}
        emptyMessage="No blog posts yet"
        columns={[
          {
            key: "title",
            header: "Title",
            render: (p) => (
              <div>
                <p className="font-semibold text-charcoal">{p.title}</p>
                <p className="text-xs text-muted">/{p.slug}</p>
              </div>
            ),
          },
          {
            key: "author",
            header: "Author",
            className: "hidden sm:table-cell",
            render: (p) => <span className="text-muted">{p.author ?? "—"}</span>,
          },
          {
            key: "status",
            header: "Status",
            render: (p) => (
              <Badge variant={p.isPublished ? "accent" : "sale"}>
                {p.isPublished ? "Published" : "Draft"}
              </Badge>
            ),
          },
          {
            key: "date",
            header: "Date",
            className: "hidden md:table-cell",
            render: (p) => (
              <span className="text-muted">
                {p.publishedAt
                  ? new Date(p.publishedAt).toLocaleDateString("en-IN")
                  : "—"}
              </span>
            ),
          },
          {
            key: "toggle",
            header: "Publish",
            render: (p) => <BlogToggle id={p.id} isPublished={p.isPublished} />,
          },
        ]}
      />
    </div>
  );
}
