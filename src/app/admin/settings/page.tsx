import { requireAdmin } from "@/lib/admin-auth";
import { fetchAdminSettings } from "@/lib/db-queries";
import { AdminPageHeader } from "@/components/admin/admin-ui";
import { SettingsForm } from "./settings-form";
import { BRAND } from "@/lib/constants";

const DEFAULT_SETTINGS = [
  { key: "store_name", value: BRAND.name, label: "Store Name" },
  { key: "store_tagline", value: BRAND.tagline, label: "Tagline" },
  { key: "store_email", value: BRAND.email, label: "Contact Email" },
  { key: "store_phone", value: BRAND.phone, label: "Phone Number" },
  { key: "whatsapp_number", value: BRAND.whatsapp, label: "WhatsApp Number" },
  { key: "free_shipping_threshold", value: "999", label: "Free Shipping Threshold (₹)" },
  { key: "tax_rate", value: "0.05", label: "Tax Rate (GST)" },
  { key: "announcement_1", value: "Free Shipping Above ₹999", label: "Announcement 1" },
  { key: "announcement_2", value: "Freshly Packed Every Day", label: "Announcement 2" },
  { key: "announcement_3", value: "Premium Quality Guaranteed", label: "Announcement 3" },
];

export default async function AdminSettingsPage() {
  await requireAdmin();
  const dbSettings = await fetchAdminSettings();

  const settingsMap = new Map(dbSettings.map((s) => [s.key, s.value]));
  const settings = DEFAULT_SETTINGS.map((s) => ({
    ...s,
    value: settingsMap.get(s.key) ?? s.value,
  }));

  return (
    <div>
      <AdminPageHeader
        title="Settings"
        description="Manage store configuration"
      />
      <SettingsForm settings={settings} />
    </div>
  );
}
