"use client";

import { ToggleSwitch } from "@/components/admin/toggle-switch";
import { toggleCategoryActive } from "@/lib/admin-actions";

export function CategoryToggle({ id, isActive }: { id: string; isActive: boolean }) {
  return (
    <ToggleSwitch
      checked={isActive}
      label="Toggle category"
      onChange={(checked) => toggleCategoryActive(id, checked)}
    />
  );
}
