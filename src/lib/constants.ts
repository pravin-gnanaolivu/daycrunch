export const BRAND = {
  name: "DAYCRUNCH",
  tagline: "Crunch Better. Live Better.",
  description:
    "Premium dates, nuts, dry fruits, dark chocolates & healthy snack packs delivered fresh across India.",
  email: "hello@daycrunch.in",
  phone: "+91 98765 43210",
  whatsapp: "919876543210",
  address: "Mumbai, Maharashtra, India",
} as const;

export const COLORS = {
  sunsetOrange: "#FF6B35",
  deepPlum: "#5B2A86",
  pistachioGreen: "#7BC043",
  goldenYellow: "#FFC857",
  creamWhite: "#FFF8F0",
  softBeige: "#F8F4EE",
  darkCharcoal: "#1F2937",
  mutedText: "#6B7280",
} as const;

export const ANNOUNCEMENTS = [
  "Free Shipping Above ₹999",
  "Freshly Packed Every Day",
  "Premium Quality Guaranteed",
] as const;

export const CATEGORIES = [
  {
    name: "Dates",
    slug: "dates",
    description: "Premium Medjool, Ajwa & more",
    emoji: "🌴",
    color: "#FF6B35",
  },
  {
    name: "Nuts",
    slug: "nuts",
    description: "Almonds, Cashews, Walnuts & more",
    emoji: "🥜",
    color: "#5B2A86",
  },
  {
    name: "Dry Fruits",
    slug: "dry-fruits",
    description: "Raisins, Apricots, Figs & more",
    emoji: "🍇",
    color: "#7BC043",
  },
  {
    name: "Dark Chocolates",
    slug: "dark-chocolates",
    description: "70%+ cacao indulgence",
    emoji: "🍫",
    color: "#5B2A86",
  },
  {
    name: "Gift Boxes",
    slug: "gift-boxes",
    description: "Curated hampers for every occasion",
    emoji: "🎁",
    color: "#FFC857",
  },
] as const;

export const BENEFITS = [
  {
    title: "Premium Quality",
    description: "Handpicked ingredients sourced from the finest farms worldwide.",
    icon: "Award",
  },
  {
    title: "Freshly Packed",
    description: "Every order packed fresh to preserve maximum nutrition and crunch.",
    icon: "Leaf",
  },
  {
    title: "Rich Nutrition",
    description: "Power-packed with vitamins, minerals, and natural energy.",
    icon: "Heart",
  },
  {
    title: "Fast Delivery",
    description: "Pan-India delivery with real-time order tracking.",
    icon: "Truck",
  },
] as const;

export const FREE_SHIPPING_THRESHOLD = 999;
export const TAX_RATE = 0.05;
