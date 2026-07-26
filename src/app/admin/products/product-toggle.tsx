"use client";

import { ToggleSwitch } from "@/components/admin/toggle-switch";
import { toggleProductActive } from "@/lib/admin-actions";

export function ProductToggle({ id, isActive }: { id: string; isActive: boolean }) {
  return (
    <ToggleSwitch
      checked={isActive}
      label="Toggle product active"
      onChange={(checked) => toggleProductActive(id, checked)}
    />
  );
}
