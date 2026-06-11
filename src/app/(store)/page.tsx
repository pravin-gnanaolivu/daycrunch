import { HeroSection } from "@/components/home/hero-section";
import { CategoriesSection } from "@/components/home/categories-section";
import { BestSellersSection } from "@/components/home/best-sellers-section";
import { WhyChooseSection } from "@/components/home/why-choose-section";
import { GiftingSection } from "@/components/home/gifting-section";
import { TestimonialsSection } from "@/components/home/testimonials-section";
import {
  InstagramSection,
  NewsletterSection,
  LifestyleSection,
  TrustBadges,
} from "@/components/home/more-sections";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <TrustBadges />
      <CategoriesSection />
      <BestSellersSection />
      <WhyChooseSection />
      <LifestyleSection />
      <GiftingSection />
      <TestimonialsSection />
      <InstagramSection />
      <NewsletterSection />
    </>
  );
}
