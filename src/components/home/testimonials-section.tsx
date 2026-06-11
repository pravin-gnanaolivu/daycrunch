import { Star } from "lucide-react";
import { MOCK_TESTIMONIALS } from "@/lib/mock-data";

export function TestimonialsSection() {
  return (
    <section className="py-16 lg:py-24 bg-soft-beige">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-black text-charcoal">
            Loved by Thousands
          </h2>
          <p className="mt-3 text-muted text-lg">
            Real stories from our crunchy community
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {MOCK_TESTIMONIALS.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-golden text-golden" />
                ))}
              </div>
              <p className="text-charcoal leading-relaxed mb-6">
                &ldquo;{testimonial.comment}&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-sunset to-plum flex items-center justify-center text-white font-bold text-sm">
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold text-charcoal text-sm">{testimonial.name}</p>
                  <p className="text-xs text-muted">{testimonial.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
