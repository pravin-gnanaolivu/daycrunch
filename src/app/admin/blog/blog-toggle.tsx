"use client";

import { ToggleSwitch } from "@/components/admin/toggle-switch";
import { toggleBlogPublished } from "@/lib/admin-actions";

export function BlogToggle({ id, isPublished }: { id: string; isPublished: boolean }) {
  return (
    <ToggleSwitch
      checked={isPublished}
      label="Toggle publish"
      onChange={(checked) => toggleBlogPublished(id, checked)}
    />
  );
}
