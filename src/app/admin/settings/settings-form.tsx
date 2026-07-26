"use client";

import { useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { upsertSetting } from "@/lib/admin-actions";
import { toast } from "sonner";

interface Setting {
  key: string;
  value: string;
  label: string;
}

export function SettingsForm({ settings }: { settings: Setting[] }) {
  const [pending, startTransition] = useTransition();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    startTransition(async () => {
      for (const setting of settings) {
        const value = fd.get(setting.key) as string;
        if (value !== null) {
          await upsertSetting(setting.key, value);
        }
      }
      toast.success("Settings saved!");
    });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-gray-100 p-6 max-w-2xl space-y-5">
      {settings.map((setting) => (
        <div key={setting.key}>
          <Label htmlFor={setting.key}>{setting.label}</Label>
          <Input
            id={setting.key}
            name={setting.key}
            defaultValue={setting.value}
            className="mt-1"
          />
        </div>
      ))}
      <Button type="submit" disabled={pending}>
        {pending ? "Saving..." : "Save Settings"}
      </Button>
    </form>
  );
}
