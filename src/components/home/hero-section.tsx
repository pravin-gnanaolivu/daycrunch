"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-cream via-soft-beige to-cream min-h-[85vh] flex items-center">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-sunset/10 blur-3xl" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-plum/10 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-pistachio/5 blur-3xl" />
      </div>

      <div className="container mx-auto px-4 py-16 lg:py-24 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 text-sm font-medium text-plum mb-6 shadow-sm">
              <Sparkles className="h-4 w-4 text-golden" />
              India&apos;s Premium Healthy Snacking Brand
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black text-charcoal leading-[1.1] tracking-tight">
              Healthy Snacking{" "}
              <span className="text-sunset">Made</span>{" "}
              <span className="text-plum">Delicious</span>
            </h1>

            <p className="mt-6 text-lg sm:text-xl text-muted max-w-lg leading-relaxed">
              Premium Dates, Nuts, Dry Fruits & Chocolates Delivered Fresh.
              Crunch Better. Live Better.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Button asChild size="lg">
                <Link href="/shop">
                  Shop Now
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/gift-boxes">Explore Gift Boxes</Link>
              </Button>
            </div>

            <div className="mt-10 flex items-center gap-8">
              <div>
                <p className="text-2xl font-black text-charcoal">50K+</p>
                <p className="text-sm text-muted">Happy Customers</p>
              </div>
              <div className="h-10 w-px bg-gray-200" />
              <div>
                <p className="text-2xl font-black text-charcoal">4.8★</p>
                <p className="text-sm text-muted">Average Rating</p>
              </div>
              <div className="h-10 w-px bg-gray-200" />
              <div>
                <p className="text-2xl font-black text-charcoal">100%</p>
                <p className="text-sm text-muted">Natural Ingredients</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative hidden lg:block"
          >
            <div className="relative w-full aspect-square max-w-lg mx-auto">
              <div className="absolute inset-0 rounded-[3rem] bg-gradient-to-br from-sunset/20 to-plum/20 rotate-6" />
              <div className="absolute inset-4 rounded-[2.5rem] bg-gradient-to-br from-golden/30 to-pistachio/30 -rotate-3" />
              <div className="absolute inset-8 rounded-[2rem] bg-white shadow-2xl flex items-center justify-center overflow-hidden">
                <div className="text-center p-8">
                  <div className="text-8xl mb-4">🥜</div>
                  <p className="text-2xl font-black">
                    <span className="text-plum">DAY</span>
                    <span className="text-sunset">CRUNCH</span>
                  </p>
                  <p className="text-muted mt-2">Premium Healthy Snacking</p>
                </div>
              </div>

              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 3 }}
                className="absolute -top-4 -right-4 bg-white rounded-2xl shadow-lg p-4"
              >
                <span className="text-3xl">🌴</span>
                <p className="text-xs font-bold mt-1">Premium Dates</p>
              </motion.div>

              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 3.5 }}
                className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-lg p-4"
              >
                <span className="text-3xl">🍫</span>
                <p className="text-xs font-bold mt-1">Dark Chocolate</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
