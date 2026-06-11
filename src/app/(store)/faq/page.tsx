import type { Metadata } from "next";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Frequently asked questions about DayCrunch orders, shipping, and products.",
};

const FAQS = [
  {
    q: "What is DayCrunch?",
    a: "DayCrunch is a premium healthy snacking brand offering dates, nuts, dry fruits, dark chocolates, and curated gift hampers delivered fresh across India.",
  },
  {
    q: "Do you offer free shipping?",
    a: "Yes! We offer free shipping on all orders above ₹999. Orders below ₹999 have a flat shipping fee of ₹99.",
  },
  {
    q: "How fresh are your products?",
    a: "All products are freshly packed upon order. We source directly from premium farms and pack within 24 hours of your order.",
  },
  {
    q: "What payment methods do you accept?",
    a: "We accept UPI, Google Pay, PhonePe, Paytm, debit cards, credit cards, and net banking through our secure Razorpay checkout.",
  },
  {
    q: "Can I track my order?",
    a: "Yes! Once your order is shipped, you'll receive a tracking number via email and SMS. You can also track orders in your account dashboard.",
  },
  {
    q: "Do you offer corporate gifting?",
    a: "Absolutely! We offer custom-branded corporate gift hampers with bulk pricing. Visit our Corporate Orders page or email hello@daycrunch.in.",
  },
  {
    q: "What is your return policy?",
    a: "We offer a 7-day return policy for unopened products. If you receive a damaged product, contact us within 48 hours for a full refund or replacement.",
  },
  {
    q: "Are your products preservative-free?",
    a: "Yes, all DayCrunch products are 100% natural with no artificial preservatives, colors, or flavors.",
  },
];

export default function FAQPage() {
  return (
    <div className="container mx-auto px-4 py-8 lg:py-12 max-w-3xl">
      <h1 className="text-3xl sm:text-4xl font-black text-charcoal text-center mb-2">
        Frequently Asked Questions
      </h1>
      <p className="text-muted text-center mb-10">
        Everything you need to know about DayCrunch
      </p>

      <div className="space-y-4">
        {FAQS.map((faq) => (
          <details
            key={faq.q}
            className="group bg-white rounded-2xl border border-gray-100 overflow-hidden"
          >
            <summary className="flex items-center justify-between p-6 cursor-pointer font-semibold text-charcoal hover:text-sunset transition-colors list-none">
              {faq.q}
              <ChevronDown className="h-5 w-5 text-muted group-open:rotate-180 transition-transform flex-shrink-0 ml-4" />
            </summary>
            <div className="px-6 pb-6 text-muted leading-relaxed">{faq.a}</div>
          </details>
        ))}
      </div>

      <p className="text-center mt-10 text-muted">
        Still have questions?{" "}
        <Link href="/contact" className="text-sunset font-semibold hover:underline">
          Contact us
        </Link>
      </p>
    </div>
  );
}
