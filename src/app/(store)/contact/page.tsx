import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BRAND } from "@/lib/constants";
import { Mail, Phone, MapPin, MessageCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with the DayCrunch team.",
};

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-8 lg:py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl sm:text-4xl font-black text-charcoal">Get in Touch</h1>
        <p className="mt-2 text-muted text-lg">We&apos;d love to hear from you</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
        <div className="space-y-6">
          {[
            { icon: Mail, label: "Email", value: BRAND.email, href: `mailto:${BRAND.email}` },
            { icon: Phone, label: "Phone", value: BRAND.phone, href: `tel:${BRAND.phone}` },
            { icon: MessageCircle, label: "WhatsApp", value: "Chat with us", href: `https://wa.me/${BRAND.whatsapp}` },
            { icon: MapPin, label: "Address", value: BRAND.address },
          ].map((item) => (
            <div key={item.label} className="flex items-start gap-4">
              <div className="p-3 rounded-xl bg-sunset/10">
                <item.icon className="h-5 w-5 text-sunset" />
              </div>
              <div>
                <p className="font-semibold text-charcoal">{item.label}</p>
                {item.href ? (
                  <a href={item.href} className="text-muted hover:text-sunset transition-colors">
                    {item.value}
                  </a>
                ) : (
                  <p className="text-muted">{item.value}</p>
                )}
              </div>
            </div>
          ))}
        </div>

        <form className="bg-white rounded-3xl p-8 border border-gray-100 space-y-4">
          <div>
            <Label htmlFor="contact-name">Name</Label>
            <Input id="contact-name" name="name" required className="mt-1" />
          </div>
          <div>
            <Label htmlFor="contact-email">Email</Label>
            <Input id="contact-email" name="email" type="email" required className="mt-1" />
          </div>
          <div>
            <Label htmlFor="subject">Subject</Label>
            <Input id="subject" name="subject" required className="mt-1" />
          </div>
          <div>
            <Label htmlFor="message">Message</Label>
            <textarea
              id="message"
              name="message"
              rows={5}
              required
              className="mt-1 flex w-full rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sunset"
            />
          </div>
          <Button type="submit" size="lg" className="w-full">
            Send Message
          </Button>
        </form>
      </div>
    </div>
  );
}
