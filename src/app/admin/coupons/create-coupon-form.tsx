"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";
import { createCoupon } from "@/lib/admin-actions";

export function CreateCouponForm() {
  const [open, setOpen] = useState(false);
  const [pending, startTransition] = useTransition();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    startTransition(async () => {
      await createCoupon({
        code: (fd.get("code") as string).toUpperCase(),
        description: (fd.get("description") as string) || undefined,
        discountType: fd.get("discountType") as string,
        discountValue: Number(fd.get("discountValue")),
        minOrderValue: fd.get("minOrderValue")
          ? Number(fd.get("minOrderValue"))
          : undefined,
      });
      setOpen(false);
    });
  };

  if (!open) {
    return (
      <Button onClick={() => setOpen(true)}>
        <Plus className="h-4 w-4" />
        Add Coupon
      </Button>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-wrap gap-2 items-end">
      <Input name="code" placeholder="CODE" required className="w-28 uppercase" />
      <Input name="description" placeholder="Description" className="w-36" />
      <select
        name="discountType"
        className="h-11 rounded-xl border border-gray-200 px-3 text-sm"
      >
        <option value="PERCENTAGE">Percentage</option>
        <option value="FIXED">Fixed ₹</option>
      </select>
      <Input name="discountValue" type="number" placeholder="Value" required className="w-20" />
      <Input name="minOrderValue" type="number" placeholder="Min ₹" className="w-20" />
      <Button type="submit" size="sm" disabled={pending}>
        {pending ? "Saving..." : "Save"}
      </Button>
      <Button type="button" variant="ghost" size="sm" onClick={() => setOpen(false)}>
        Cancel
      </Button>
    </form>
  );
}
