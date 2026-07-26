"use client";

import { ToggleSwitch } from "@/components/admin/toggle-switch";
import { toggleBannerActive } from "@/lib/admin-actions";

export function BannerToggle({ id, isActive }: { id: string; isActive: boolean }) {
  return (
    <ToggleSwitch
      checked={isActive}
      label="Toggle banner"
      onChange={(checked) => toggleBannerActive(id, checked)}
    />
  );
}
