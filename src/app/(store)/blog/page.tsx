import type { Metadata } from "next";
import Link from "next/link";
import { ProductImage } from "@/components/ui/product-image";
import { MOCK_BLOG_POSTS } from "@/lib/mock-data";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Blog",
  description: "Wellness tips, healthy recipes, and snacking guides from DayCrunch.",
};

export default function BlogPage() {
  return (
    <div className="container mx-auto px-4 py-8 lg:py-12">
      <h1 className="text-3xl sm:text-4xl font-black text-charcoal mb-2">The Crunch Blog</h1>
      <p className="text-muted text-lg mb-10">Wellness tips, recipes & healthy living guides</p>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {MOCK_BLOG_POSTS.map((post) => (
          <Link
            key={post.id}
            href={`/blog/${post.slug}`}
            className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-lg transition-all hover:-translate-y-1"
          >
            <div className="relative aspect-[16/10] bg-soft-beige">
              <ProductImage
                src={post.coverImage}
                alt={post.title}
                size="card"
                className="group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-6">
              <p className="text-xs text-muted">{post.publishedAt}</p>
              <h2 className="font-bold text-lg text-charcoal mt-1 group-hover:text-sunset transition-colors line-clamp-2">
                {post.title}
              </h2>
              <p className="text-sm text-muted mt-2 line-clamp-2">{post.excerpt}</p>
              <span className="inline-flex items-center gap-1 text-sm font-semibold text-sunset mt-4">
                Read More <ArrowRight className="h-3 w-3" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
