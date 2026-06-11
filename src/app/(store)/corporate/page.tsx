import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Building2, Users, Gift, Truck } from "lucide-react";
import { BRAND } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Corporate Orders",
  description: "Premium corporate gift hampers and bulk orders for teams and clients.",
};

const BENEFITS = [
  { icon: Gift, title: "Custom Branding", desc: "Add your company logo to gift boxes" },
  { icon: Users, title: "Bulk Discounts", desc: "Special pricing for orders above 50 units" },
  { icon: Truck, title: "Pan-India Delivery", desc: "Direct delivery to multiple locations" },
  { icon: Building2, title: "Dedicated Support", desc: "Personal account manager for your orders" },
];

export default function CorporatePage() {
  return (
    <div>
      <section className="bg-charcoal text-white py-16 lg:py-24">
        <div className="container mx-auto px-4 text-center">
          <Building2 className="h-12 w-12 text-sunset mx-auto mb-4" />
          <h1 className="text-4xl sm:text-5xl font-black">Corporate Gifting</h1>
          <p className="mt-4 text-gray-400 text-lg max-w-2xl mx-auto">
            Impress clients and teams with premium healthy gift hampers.
            Custom branding, bulk pricing & pan-India delivery.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {BENEFITS.map((b) => (
              <div key={b.title} className="text-center p-6">
                <b.icon className="h-8 w-8 text-sunset mx-auto mb-3" />
                <h3 className="font-bold text-charcoal">{b.title}</h3>
                <p className="text-sm text-muted mt-1">{b.desc}</p>
              </div>
            ))}
          </div>

          <div className="max-w-2xl mx-auto bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
            <h2 className="text-2xl font-black text-charcoal text-center mb-6">
              Request a Quote
            </h2>
            <form className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="company">Company Name</Label>
                  <Input id="company" name="company" required className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="contact-name">Contact Person</Label>
                  <Input id="contact-name" name="contact-name" required className="mt-1" />
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="corp-email">Email</Label>
                  <Input id="corp-email" name="email" type="email" required className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="corp-phone">Phone</Label>
                  <Input id="corp-phone" name="phone" type="tel" required className="mt-1" />
                </div>
              </div>
              <div>
                <Label htmlFor="quantity">Estimated Quantity</Label>
                <Input id="quantity" name="quantity" placeholder="e.g., 100 hampers" className="mt-1" />
              </div>
              <div>
                <Label htmlFor="requirements">Requirements</Label>
                <textarea
                  id="requirements"
                  name="requirements"
                  rows={4}
                  className="mt-1 flex w-full rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sunset"
                  placeholder="Tell us about your gifting needs..."
                />
              </div>
              <Button type="submit" size="lg" className="w-full">
                Submit Inquiry
              </Button>
            </form>
            <p className="text-center text-sm text-muted mt-4">
              Or reach us directly at{" "}
              <a href={`mailto:${BRAND.email}`} className="text-sunset font-semibold">
                {BRAND.email}
              </a>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
