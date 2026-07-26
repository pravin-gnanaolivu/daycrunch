"use client";

import { useTransition } from "react";
import { Trash2 } from "lucide-react";
import { deleteMedia } from "@/lib/admin-actions";

export function DeleteMediaButton({ id }: { id: string }) {
  const [pending, startTransition] = useTransition();

  return (
    <button
      onClick={() => {
        if (confirm("Delete this file?")) {
          startTransition(() => deleteMedia(id));
        }
      }}
      disabled={pending}
      className="mt-2 text-xs text-sunset hover:underline flex items-center gap-1 disabled:opacity-50"
    >
      <Trash2 className="h-3 w-3" />
      Delete
    </button>
  );
}
