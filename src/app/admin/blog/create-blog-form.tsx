"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";
import { createBlogPost } from "@/lib/admin-actions";

export function CreateBlogForm() {
  const [open, setOpen] = useState(false);
  const [pending, startTransition] = useTransition();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    startTransition(async () => {
      await createBlogPost({
        title: fd.get("title") as string,
        excerpt: (fd.get("excerpt") as string) || undefined,
        content: fd.get("content") as string,
        author: (fd.get("author") as string) || "DayCrunch Team",
        isPublished: fd.get("isPublished") === "on",
      });
      setOpen(false);
    });
  };

  if (!open) {
    return (
      <Button onClick={() => setOpen(true)}>
        <Plus className="h-4 w-4" />
        New Post
      </Button>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-gray-100 p-6 space-y-4 w-full max-w-lg">
      <Input name="title" placeholder="Post title" required />
      <Input name="excerpt" placeholder="Short excerpt" />
      <textarea
        name="content"
        placeholder="Post content..."
        required
        rows={4}
        className="flex w-full rounded-xl border border-gray-200 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sunset"
      />
      <Input name="author" placeholder="Author" defaultValue="DayCrunch Team" />
      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" name="isPublished" />
        Publish immediately
      </label>
      <div className="flex gap-2">
        <Button type="submit" disabled={pending}>
          {pending ? "Saving..." : "Create Post"}
        </Button>
        <Button type="button" variant="ghost" onClick={() => setOpen(false)}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
