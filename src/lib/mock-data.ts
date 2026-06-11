import type { Product, Review, BlogPost, Testimonial } from "@/types";

const IMG = (seed: string) =>
  `https://images.unsplash.com/photo-${seed}?w=800&h=800&fit=crop&q=80`;

export const MOCK_PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Premium Medjool Dates",
    slug: "premium-medjool-dates",
    description:
      "Experience the royal taste of premium Medjool dates, handpicked from the finest farms. These soft, caramel-like dates are nature's perfect energy snack — rich in fiber, potassium, and natural sweetness.",
    shortDescription:
      "Soft, caramel-like Medjool dates — nature's perfect energy snack.",
    category: "Dates",
    categorySlug: "dates",
    price: 449,
    compareAtPrice: 549,
    images: [
      IMG("1606312619070-0859f91a7b0f"),
      IMG("1606313564200-8d0c8310a1a0"),
    ],
    rating: 4.8,
    reviewCount: 234,
    isBestSeller: true,
    isNew: false,
    isFeatured: true,
    stock: 150,
    sku: "DC-DT-001",
    ingredients: "100% Premium Medjool Dates",
    benefits:
      "Rich in fiber, potassium, and natural energy. Perfect pre-workout snack.",
    storageInfo: "Store in a cool, dry place. Refrigerate after opening.",
    nutritionInfo: {
      calories: "277 kcal",
      protein: "1.8g",
      fiber: "6.7g",
      sugar: "66g",
    },
    variants: [
      { id: "v1", name: "250g", price: 449, weight: "250g", stock: 80 },
      { id: "v2", name: "500g", price: 799, weight: "500g", stock: 50 },
      { id: "v3", name: "1kg", price: 1499, weight: "1kg", stock: 20 },
    ],
    tags: ["best-seller", "dates", "energy"],
  },
  {
    id: "2",
    name: "California Almonds",
    slug: "california-almonds",
    description:
      "Crunch into premium California almonds — lightly roasted to perfection. Packed with protein, healthy fats, and vitamin E for your daily wellness routine.",
    shortDescription:
      "Premium California almonds, lightly roasted to perfection.",
    category: "Nuts",
    categorySlug: "nuts",
    price: 399,
    compareAtPrice: 499,
    images: [
      IMG("1508747703725-4ce3b7f7a8c4"),
      IMG("1599591156908-0b5a0b5b5b5b"),
    ],
    rating: 4.9,
    reviewCount: 412,
    isBestSeller: true,
    isNew: false,
    isFeatured: true,
    stock: 200,
    sku: "DC-NT-001",
    ingredients: "100% California Almonds",
    benefits: "High in protein, vitamin E, and healthy monounsaturated fats.",
    storageInfo: "Store in airtight container. Best consumed within 6 months.",
    nutritionInfo: {
      calories: "579 kcal",
      protein: "21g",
      fiber: "12g",
      fat: "50g",
    },
    variants: [
      { id: "v4", name: "200g", price: 399, weight: "200g", stock: 100 },
      { id: "v5", name: "500g", price: 899, weight: "500g", stock: 60 },
    ],
    tags: ["best-seller", "nuts", "protein"],
  },
  {
    id: "3",
    name: "70% Dark Chocolate Bark",
    slug: "dark-chocolate-bark",
    description:
      "Indulgent 70% dark chocolate bark loaded with almonds, cranberries, and pistachios. Guilt-free indulgence that satisfies your sweet cravings while nourishing your body.",
    shortDescription:
      "70% dark chocolate with almonds, cranberries & pistachios.",
    category: "Dark Chocolates",
    categorySlug: "dark-chocolates",
    price: 349,
    compareAtPrice: 429,
    images: [IMG("1549009243-0f2d0b5b5b5b"), IMG("1511381938455-4401b45f077e")],
    rating: 4.7,
    reviewCount: 189,
    isBestSeller: true,
    isNew: true,
    isFeatured: true,
    stock: 120,
    sku: "DC-CH-001",
    ingredients: "Dark Chocolate (70% Cacao), Almonds, Cranberries, Pistachios",
    benefits:
      "Antioxidant-rich dark chocolate with nutrient-dense nuts and berries.",
    storageInfo: "Store below 25°C. Avoid direct sunlight.",
    nutritionInfo: {
      calories: "520 kcal",
      protein: "8g",
      fiber: "6g",
      sugar: "28g",
    },
    variants: [
      { id: "v6", name: "100g", price: 349, weight: "100g", stock: 70 },
      { id: "v7", name: "200g", price: 649, weight: "200g", stock: 50 },
    ],
    tags: ["new", "chocolate", "gift-worthy"],
  },
  {
    id: "4",
    name: "Premium Cashew Nuts",
    slug: "premium-cashew-nuts",
    description:
      "Buttery, creamy premium cashews sourced from Goa. Perfect for snacking, cooking, or gifting. Rich in copper, magnesium, and heart-healthy fats.",
    shortDescription: "Buttery, creamy premium cashews from Goa.",
    category: "Nuts",
    categorySlug: "nuts",
    price: 449,
    compareAtPrice: 549,
    images: [
      IMG("1574323347402-4d0b0b5b5b5b"),
      IMG("1508747703725-4ce3b7f7a8c4"),
    ],
    rating: 4.6,
    reviewCount: 156,
    isBestSeller: false,
    isNew: false,
    isFeatured: true,
    stock: 180,
    sku: "DC-NT-002",
    variants: [
      { id: "v8", name: "250g", price: 449, weight: "250g", stock: 90 },
      { id: "v9", name: "500g", price: 849, weight: "500g", stock: 45 },
    ],
    tags: ["nuts", "protein"],
  },
  {
    id: "5",
    name: "Turkish Apricots",
    slug: "turkish-apricots",
    description:
      "Sun-dried Turkish apricots with no added sugar. Naturally sweet, chewy, and packed with vitamin A and iron. A wholesome snack for the whole family.",
    shortDescription: "Sun-dried Turkish apricots — no added sugar.",
    category: "Dry Fruits",
    categorySlug: "dry-fruits",
    price: 299,
    compareAtPrice: 379,
    images: [
      IMG("1606312619070-0859f91a7b0f"),
      IMG("1606313564200-8d0c8310a1a0"),
    ],
    rating: 4.5,
    reviewCount: 98,
    isBestSeller: false,
    isNew: true,
    isFeatured: false,
    stock: 100,
    sku: "DC-DF-001",
    variants: [
      { id: "v10", name: "200g", price: 299, weight: "200g", stock: 60 },
      { id: "v11", name: "500g", price: 699, weight: "500g", stock: 40 },
    ],
    tags: ["new", "dry-fruits"],
  },
  {
    id: "6",
    name: "Festive Gift Hamper",
    slug: "festive-gift-hamper",
    description:
      "A premium curated hamper featuring our best-selling dates, nuts, dark chocolate, and dry fruits. Beautifully packaged — perfect for Diwali, weddings, and corporate gifting.",
    shortDescription:
      "Premium curated hamper for festivals & corporate gifting.",
    category: "Gift Boxes",
    categorySlug: "gift-boxes",
    price: 1999,
    compareAtPrice: 2499,
    images: [IMG("1549467950-9a0b0b5b5b5b"), IMG("1513885535751-8b9238b12210")],
    rating: 4.9,
    reviewCount: 67,
    isBestSeller: true,
    isNew: false,
    isFeatured: true,
    stock: 50,
    sku: "DC-GB-001",
    variants: [
      {
        id: "v12",
        name: "Standard",
        price: 1999,
        packSize: "Standard",
        stock: 30,
      },
      {
        id: "v13",
        name: "Premium",
        price: 3499,
        packSize: "Premium",
        stock: 20,
      },
    ],
    tags: ["gift", "festive", "corporate"],
  },
  {
    id: "7",
    name: "Energy Snack Pack",
    slug: "energy-snack-pack",
    description:
      "Your daily dose of energy in one pack — almonds, dates, walnuts, and dark chocolate clusters. Designed for busy professionals and fitness enthusiasts.",
    shortDescription:
      "Almonds, dates, walnuts & dark chocolate — daily energy pack.",
    category: "Nuts",
    categorySlug: "nuts",
    price: 249,
    compareAtPrice: 299,
    images: [
      IMG("1599591156908-0b5a0b5b5b5b"),
      IMG("1508747703725-4ce3b7f7a8c4"),
    ],
    rating: 4.8,
    reviewCount: 312,
    isBestSeller: true,
    isNew: false,
    isFeatured: true,
    stock: 250,
    sku: "DC-SP-001",
    variants: [
      {
        id: "v14",
        name: "Single Pack",
        price: 249,
        packSize: "1 pack",
        stock: 150,
      },
      {
        id: "v15",
        name: "Pack of 5",
        price: 1099,
        packSize: "5 packs",
        stock: 80,
      },
    ],
    tags: ["best-seller", "energy", "snack-pack"],
  },
  {
    id: "8",
    name: "Ajwa Dates Premium",
    slug: "ajwa-dates-premium",
    description:
      "Sacred Ajwa dates from Medina — known for their unique soft texture and rich flavor. A premium choice for health-conscious consumers and thoughtful gifting.",
    shortDescription: "Sacred Ajwa dates from Medina — soft & rich.",
    category: "Dates",
    categorySlug: "dates",
    price: 599,
    compareAtPrice: 749,
    images: [
      IMG("1606312619070-0859f91a7b0f"),
      IMG("1606313564200-8d0c8310a1a0"),
    ],
    rating: 4.9,
    reviewCount: 145,
    isBestSeller: false,
    isNew: true,
    isFeatured: true,
    stock: 80,
    sku: "DC-DT-002",
    variants: [
      { id: "v16", name: "250g", price: 599, weight: "250g", stock: 40 },
      { id: "v17", name: "500g", price: 1099, weight: "500g", stock: 25 },
    ],
    tags: ["new", "dates", "premium"],
  },
];

export const MOCK_REVIEWS: Review[] = [
  {
    id: "1",
    author: "Priya Sharma",
    rating: 5,
    title: "Best dates I've ever had!",
    comment:
      "The Medjool dates are incredibly fresh and soft. My whole family loves them. DayCrunch has become our go-to for healthy snacking.",
    date: "2026-05-15",
    verified: true,
  },
  {
    id: "2",
    author: "Rahul Mehta",
    rating: 5,
    title: "Perfect office snack",
    comment:
      "The energy snack packs are a lifesaver during long work days. Great quality, fast delivery, and beautiful packaging.",
    date: "2026-05-10",
    verified: true,
  },
  {
    id: "3",
    author: "Ananya Patel",
    rating: 5,
    title: "Amazing gift hamper",
    comment:
      "Ordered the festive hamper for Diwali gifting. The presentation was stunning and the products were top-notch. Highly recommend!",
    date: "2026-04-28",
    verified: true,
  },
  {
    id: "4",
    author: "Vikram Singh",
    rating: 4,
    title: "Great almonds, fast delivery",
    comment:
      "California almonds are fresh and crunchy. Delivery was within 2 days to Bangalore. Will order again.",
    date: "2026-04-20",
    verified: true,
  },
];

export const MOCK_TESTIMONIALS: Testimonial[] = [
  {
    id: "1",
    name: "Priya Sharma",
    location: "Mumbai",
    rating: 5,
    comment:
      "DayCrunch has completely changed how I snack. Premium quality, beautiful packaging, and delivered fresh every time.",
  },
  {
    id: "2",
    name: "Rahul Mehta",
    location: "Bangalore",
    rating: 5,
    comment:
      "The energy snack packs are my daily essential. Finally, a brand that understands healthy snacking for busy professionals.",
  },
  {
    id: "3",
    name: "Ananya Patel",
    location: "Delhi",
    rating: 5,
    comment:
      "Ordered gift hampers for our entire team. Everyone was impressed with the quality and presentation. Perfect corporate gifting!",
  },
];

export const MOCK_BLOG_POSTS: BlogPost[] = [
  {
    id: "1",
    title: "5 Health Benefits of Medjool Dates You Didn't Know",
    slug: "health-benefits-medjool-dates",
    excerpt:
      "Discover why Medjool dates are nature's perfect energy snack and how they can boost your daily wellness routine.",
    content:
      "Medjool dates are one of the most nutrient-dense fruits on the planet...",
    coverImage: IMG("1606312619070-0859f91a7b0f"),
    author: "DayCrunch Team",
    publishedAt: "2026-05-01",
  },
  {
    id: "2",
    title: "The Ultimate Guide to Healthy Gifting This Festive Season",
    slug: "healthy-gifting-guide-festive-season",
    excerpt:
      "Skip the sweets and gift something that nourishes. Our curated guide to premium healthy gift hampers.",
    content: "This festive season, give the gift of health...",
    coverImage: IMG("1549467950-9a0b0b5b5b5b"),
    author: "DayCrunch Team",
    publishedAt: "2026-04-15",
  },
  {
    id: "3",
    title: "Why Dark Chocolate is Your Best Workout Recovery Snack",
    slug: "dark-chocolate-workout-recovery",
    excerpt:
      "Learn how 70%+ dark chocolate can help muscle recovery and satisfy your post-workout cravings guilt-free.",
    content: "Dark chocolate isn't just a treat — it's a recovery superfood...",
    coverImage: IMG("1511381938455-4401b45f077e"),
    author: "DayCrunch Team",
    publishedAt: "2026-03-20",
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return MOCK_PRODUCTS.find((p) => p.slug === slug);
}

export function getProductsByCategory(categorySlug: string): Product[] {
  return MOCK_PRODUCTS.filter((p) => p.categorySlug === categorySlug);
}

export function getFeaturedProducts(): Product[] {
  return MOCK_PRODUCTS.filter((p) => p.isFeatured);
}

export function getBestSellers(): Product[] {
  return MOCK_PRODUCTS.filter((p) => p.isBestSeller);
}

export function getRelatedProducts(product: Product, limit = 4): Product[] {
  return MOCK_PRODUCTS.filter(
    (p) => p.categorySlug === product.categorySlug && p.id !== product.id,
  ).slice(0, limit);
}

export function searchProducts(query: string): Product[] {
  const q = query.toLowerCase();
  return MOCK_PRODUCTS.filter((p) => {
    const categoryStr =
      typeof p.category === "string" ? p.category : p.category?.name || "";
    return (
      p.name.toLowerCase().includes(q) ||
      p.description?.toLowerCase().includes(q) ||
      categoryStr.toLowerCase().includes(q) ||
      p.tags?.some((t) => t.includes(q))
    );
  });
}
