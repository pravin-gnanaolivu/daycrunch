"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";
import { createBanner } from "@/lib/admin-actions";

export function CreateBannerForm() {
  const [open, setOpen] = useState(false);
  const [pending, startTransition] = useTransition();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    startTransition(async () => {
      await createBanner({
        title: fd.get("title") as string,
        subtitle: (fd.get("subtitle") as string) || undefined,
        image: fd.get("image") as string,
        link: (fd.get("link") as string) || undefined,
        position: (fd.get("position") as string) || "homepage",
      });
      setOpen(false);
    });
  };

  if (!open) {
    return (
      <Button onClick={() => setOpen(true)}>
        <Plus className="h-4 w-4" />
        Add Banner
      </Button>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-wrap gap-2 items-end">
      <Input name="title" placeholder="Title" required className="w-36" />
      <Input name="subtitle" placeholder="Subtitle" className="w-36" />
      <Input name="image" placeholder="Image URL" required className="w-48" />
      <Input name="link" placeholder="Link URL" className="w-36" />
      <Button type="submit" size="sm" disabled={pending}>
        {pending ? "Saving..." : "Save"}
      </Button>
      <Button type="button" variant="ghost" size="sm" onClick={() => setOpen(false)}>
        Cancel
      </Button>
    </form>
  );
}
