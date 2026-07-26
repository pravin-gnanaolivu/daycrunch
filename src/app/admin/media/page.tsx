import { requireAdmin } from "@/lib/admin-auth";
import { fetchAdminMedia } from "@/lib/db-queries";
import { AdminPageHeader } from "@/components/admin/admin-ui";
import { Badge } from "@/components/ui/badge";
import { DeleteMediaButton } from "./delete-media-button";
import { MediaUploadButton } from "./media-upload-button";

function formatBytes(bytes: number | null) {
  if (!bytes) return "—";
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export default async function AdminMediaPage() {
  await requireAdmin();
  const media = await fetchAdminMedia();

  return (
    <div>
      <AdminPageHeader
        title="Media Library"
        description={`${media.length} uploaded files`}
        action={<MediaUploadButton />}
      />

      {media.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center">
          <p className="text-muted mb-4">No media uploaded yet</p>
          <MediaUploadButton />
          <p className="text-sm text-muted mt-4">
            Uploads are stored locally by default. Add Cloudinary credentials to .env.local for CDN delivery.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {media.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl border border-gray-100 overflow-hidden group"
            >
              <div className="aspect-square bg-soft-beige flex items-center justify-center overflow-hidden">
                {item.type === "image" ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={item.url}
                    alt={item.filename}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-3xl">🎬</span>
                )}
              </div>
              <div className="p-3">
                <p className="text-xs font-semibold text-charcoal truncate">{item.filename}</p>
                <div className="flex items-center justify-between mt-1">
                  <Badge variant="outline" className="text-[10px]">{item.type}</Badge>
                  <span className="text-[10px] text-muted">{formatBytes(item.size)}</span>
                </div>
                <DeleteMediaButton id={item.id} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
