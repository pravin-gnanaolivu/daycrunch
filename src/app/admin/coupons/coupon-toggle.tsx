"use client";

import { ToggleSwitch } from "@/components/admin/toggle-switch";
import { toggleCouponActive } from "@/lib/admin-actions";

export function CouponToggle({ id, isActive }: { id: string; isActive: boolean }) {
  return (
    <ToggleSwitch
      checked={isActive}
      label="Toggle coupon"
      onChange={(checked) => toggleCouponActive(id, checked)}
    />
  );
}
