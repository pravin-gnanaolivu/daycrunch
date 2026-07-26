import { config } from "dotenv";
import path from "path";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";
import bcrypt from "bcryptjs";

config({ path: path.resolve(process.cwd(), ".env.local") });
config({ path: path.resolve(process.cwd(), ".env") });

const connectionString = process.env.DATABASE_URL;
if (!connectionString) throw new Error("DATABASE_URL is not set");

const pool = new pg.Pool({ connectionString });
const adapter = new PrismaPg(pool);
const db = new PrismaClient({ adapter });

const IMG = (id: string) =>
  `https://images.unsplash.com/photo-${id}?w=800&h=800&fit=crop&q=80`;

const PRODUCTS = [
  {
    name: "Premium Medjool Dates",
    slug: "premium-medjool-dates",
    sku: "DC-DT-001",
    categorySlug: "dates",
    basePrice: 449,
    compareAtPrice: 549,
    stock: 150,
    isFeatured: true,
    isBestSeller: true,
    rating: 4.8,
    reviewCount: 234,
    description: "Experience the royal taste of premium Medjool dates, handpicked from the finest farms.",
    shortDescription: "Soft, caramel-like Medjool dates — nature's perfect energy snack.",
    ingredients: "100% Premium Medjool Dates",
    benefits: "Rich in fiber, potassium, and natural energy.",
    storageInfo: "Store in a cool, dry place. Refrigerate after opening.",
    nutritionInfo: { calories: "277 kcal", protein: "1.8g", fiber: "6.7g", sugar: "66g" },
    images: [IMG("1606312619070-0859f91a7b0f")],
    variants: [
      { name: "250g", sku: "DC-DT-001-250", price: 449, weight: "250g", stock: 80 },
      { name: "500g", sku: "DC-DT-001-500", price: 799, weight: "500g", stock: 50 },
      { name: "1kg", sku: "DC-DT-001-1KG", price: 1499, weight: "1kg", stock: 20 },
    ],
  },
  {
    name: "California Almonds",
    slug: "california-almonds",
    sku: "DC-NT-001",
    categorySlug: "nuts",
    basePrice: 399,
    compareAtPrice: 499,
    stock: 200,
    isFeatured: true,
    isBestSeller: true,
    rating: 4.9,
    reviewCount: 412,
    description: "Crunch into premium California almonds — lightly roasted to perfection.",
    shortDescription: "Premium California almonds, lightly roasted to perfection.",
    ingredients: "100% California Almonds",
    benefits: "High in protein, vitamin E, and healthy fats.",
    storageInfo: "Store in airtight container.",
    nutritionInfo: { calories: "579 kcal", protein: "21g", fiber: "12g", fat: "50g" },
    images: [IMG("1508747703725-4ce3b7f7a8c4")],
    variants: [
      { name: "200g", sku: "DC-NT-001-200", price: 399, weight: "200g", stock: 100 },
      { name: "500g", sku: "DC-NT-001-500", price: 899, weight: "500g", stock: 60 },
    ],
  },
  {
    name: "70% Dark Chocolate Bark",
    slug: "dark-chocolate-bark",
    sku: "DC-CH-001",
    categorySlug: "dark-chocolates",
    basePrice: 349,
    compareAtPrice: 429,
    stock: 120,
    isFeatured: true,
    isBestSeller: true,
    isNew: true,
    rating: 4.7,
    reviewCount: 189,
    description: "Indulgent 70% dark chocolate bark loaded with almonds, cranberries, and pistachios.",
    shortDescription: "70% dark chocolate with almonds, cranberries & pistachios.",
    ingredients: "Dark Chocolate (70% Cacao), Almonds, Cranberries, Pistachios",
    benefits: "Antioxidant-rich dark chocolate with nutrient-dense nuts.",
    storageInfo: "Store below 25°C.",
    images: [IMG("1511381938455-4401b45f077e")],
    variants: [
      { name: "100g", sku: "DC-CH-001-100", price: 349, weight: "100g", stock: 70 },
      { name: "200g", sku: "DC-CH-001-200", price: 649, weight: "200g", stock: 50 },
    ],
  },
  {
    name: "Premium Cashew Nuts",
    slug: "premium-cashew-nuts",
    sku: "DC-NT-002",
    categorySlug: "nuts",
    basePrice: 449,
    compareAtPrice: 549,
    stock: 180,
    isFeatured: true,
    rating: 4.6,
    reviewCount: 156,
    description: "Buttery, creamy premium cashews sourced from Goa.",
    shortDescription: "Buttery, creamy premium cashews from Goa.",
    ingredients: "100% Premium Cashew Nuts",
    images: [IMG("1508747703725-4ce3b7f7a8c4")],
    variants: [
      { name: "250g", sku: "DC-NT-002-250", price: 449, weight: "250g", stock: 90 },
      { name: "500g", sku: "DC-NT-002-500", price: 849, weight: "500g", stock: 45 },
    ],
  },
  {
    name: "Turkish Apricots",
    slug: "turkish-apricots",
    sku: "DC-DF-001",
    categorySlug: "dry-fruits",
    basePrice: 299,
    compareAtPrice: 379,
    stock: 100,
    isNew: true,
    rating: 4.5,
    reviewCount: 98,
    description: "Sun-dried Turkish apricots with no added sugar.",
    shortDescription: "Sun-dried Turkish apricots — no added sugar.",
    ingredients: "100% Sun-dried Turkish Apricots",
    images: [IMG("1606312619070-0859f91a7b0f")],
    variants: [
      { name: "200g", sku: "DC-DF-001-200", price: 299, weight: "200g", stock: 60 },
      { name: "500g", sku: "DC-DF-001-500", price: 699, weight: "500g", stock: 40 },
    ],
  },
  {
    name: "Festive Gift Hamper",
    slug: "festive-gift-hamper",
    sku: "DC-GB-001",
    categorySlug: "gift-boxes",
    basePrice: 1999,
    compareAtPrice: 2499,
    stock: 50,
    isFeatured: true,
    isBestSeller: true,
    rating: 4.9,
    reviewCount: 67,
    description: "A premium curated hamper featuring our best-selling dates, nuts, and dark chocolate.",
    shortDescription: "Premium curated hamper for festivals & corporate gifting.",
    images: [IMG("1513885535751-8b9238b12210")],
    variants: [
      { name: "Standard", sku: "DC-GB-001-STD", price: 1999, packSize: "Standard", stock: 30 },
      { name: "Premium", sku: "DC-GB-001-PRM", price: 3499, packSize: "Premium", stock: 20 },
    ],
  },
  {
    name: "Energy Snack Pack",
    slug: "energy-snack-pack",
    sku: "DC-SP-001",
    categorySlug: "nuts",
    basePrice: 249,
    compareAtPrice: 299,
    stock: 250,
    isFeatured: true,
    isBestSeller: true,
    rating: 4.8,
    reviewCount: 312,
    description: "Your daily dose of energy — almonds, dates, walnuts, and dark chocolate clusters.",
    shortDescription: "Almonds, dates, walnuts & dark chocolate — daily energy pack.",
    ingredients: "Almonds, Dates, Walnuts, Dark Chocolate",
    images: [IMG("1508747703725-4ce3b7f7a8c4")],
    variants: [
      { name: "Single Pack", sku: "DC-SP-001-1", price: 249, packSize: "1 pack", stock: 150 },
      { name: "Pack of 5", sku: "DC-SP-001-5", price: 1099, packSize: "5 packs", stock: 80 },
    ],
  },
  {
    name: "Ajwa Dates Premium",
    slug: "ajwa-dates-premium",
    sku: "DC-DT-002",
    categorySlug: "dates",
    basePrice: 599,
    compareAtPrice: 749,
    stock: 80,
    isFeatured: true,
    isNew: true,
    rating: 4.9,
    reviewCount: 145,
    description: "Sacred Ajwa dates from Medina — known for their unique soft texture and rich flavor.",
    shortDescription: "Sacred Ajwa dates from Medina — soft & rich.",
    ingredients: "100% Premium Ajwa Dates",
    images: [IMG("1606312619070-0859f91a7b0f")],
    variants: [
      { name: "250g", sku: "DC-DT-002-250", price: 599, weight: "250g", stock: 40 },
      { name: "500g", sku: "DC-DT-002-500", price: 1099, weight: "500g", stock: 25 },
    ],
  },
];

async function main() {
  console.log("🌱 Seeding DayCrunch database...\n");

  // Admin user
  const adminPassword = await bcrypt.hash("admin123", 12);
  await db.user.upsert({
    where: { email: "admin@daycrunch.in" },
    update: { role: "ADMIN", password: adminPassword },
    create: {
      email: "admin@daycrunch.in",
      name: "Admin",
      password: adminPassword,
      role: "ADMIN",
    },
  });
  console.log("✓ Admin user: admin@daycrunch.in / admin123");

  // Sample customers
  const customerPassword = await bcrypt.hash("customer123", 12);
  const customers = [
    { email: "priya@email.com", name: "Priya Sharma", phone: "+919876543210" },
    { email: "rahul@email.com", name: "Rahul Mehta", phone: "+919876543211" },
    { email: "ananya@email.com", name: "Ananya Patel", phone: "+919876543212" },
    { email: "vikram@email.com", name: "Vikram Singh", phone: "+919876543213" },
  ];

  const customerIds: string[] = [];
  for (const c of customers) {
    const user = await db.user.upsert({
      where: { email: c.email },
      update: {},
      create: { ...c, password: customerPassword, role: "USER" },
    });
    customerIds.push(user.id);
  }
  console.log(`✓ ${customers.length} sample customers (password: customer123)`);

  // Categories
  const categoryData = [
    { name: "Dates", slug: "dates", description: "Premium Medjool, Ajwa & more", sortOrder: 1 },
    { name: "Nuts", slug: "nuts", description: "Almonds, Cashews, Walnuts & more", sortOrder: 2 },
    { name: "Dry Fruits", slug: "dry-fruits", description: "Raisins, Apricots, Figs & more", sortOrder: 3 },
    { name: "Dark Chocolates", slug: "dark-chocolates", description: "70%+ cacao indulgence", sortOrder: 4 },
    { name: "Gift Boxes", slug: "gift-boxes", description: "Curated hampers for every occasion", sortOrder: 5 },
  ];

  const categoryMap = new Map<string, string>();
  for (const cat of categoryData) {
    const created = await db.category.upsert({
      where: { slug: cat.slug },
      update: cat,
      create: cat,
    });
    categoryMap.set(cat.slug, created.id);
  }
  console.log(`✓ ${categoryData.length} categories`);

  // Products
  for (const p of PRODUCTS) {
    const categoryId = categoryMap.get(p.categorySlug);
    if (!categoryId) continue;

    await db.product.upsert({
      where: { slug: p.slug },
      update: {
        name: p.name,
        basePrice: p.basePrice,
        compareAtPrice: p.compareAtPrice,
        stock: p.stock,
        isFeatured: p.isFeatured ?? false,
        isBestSeller: p.isBestSeller ?? false,
        isNew: p.isNew ?? false,
        rating: p.rating ?? 0,
        reviewCount: p.reviewCount ?? 0,
      },
      create: {
        name: p.name,
        slug: p.slug,
        sku: p.sku,
        categoryId,
        basePrice: p.basePrice,
        compareAtPrice: p.compareAtPrice,
        stock: p.stock,
        isFeatured: p.isFeatured ?? false,
        isBestSeller: p.isBestSeller ?? false,
        isNew: p.isNew ?? false,
        rating: p.rating ?? 0,
        reviewCount: p.reviewCount ?? 0,
        description: p.description,
        shortDescription: p.shortDescription,
        ingredients: p.ingredients,
        benefits: p.benefits,
        storageInfo: p.storageInfo,
        nutritionInfo: p.nutritionInfo,
        images: {
          create: p.images.map((url, i) => ({
            url,
            isPrimary: i === 0,
            sortOrder: i,
          })),
        },
        variants: {
          create: p.variants.map((v) => ({
            name: v.name,
            sku: v.sku,
            price: v.price,
            weight: "weight" in v ? v.weight : undefined,
            packSize: "packSize" in v ? v.packSize : undefined,
            stock: v.stock,
          })),
        },
      },
    });
  }
  console.log(`✓ ${PRODUCTS.length} products with variants & images`);

  // Coupons
  await db.coupon.upsert({
    where: { code: "CRUNCH10" },
    update: {},
    create: {
      code: "CRUNCH10",
      description: "10% off your order",
      discountType: "PERCENTAGE",
      discountValue: 10,
      minOrderValue: 499,
    },
  });
  await db.coupon.upsert({
    where: { code: "WELCOME50" },
    update: {},
    create: {
      code: "WELCOME50",
      description: "₹50 off for new customers",
      discountType: "FIXED",
      discountValue: 50,
      minOrderValue: 299,
    },
  });
  console.log("✓ Coupons: CRUNCH10, WELCOME50");

  // Banners
  const banners = [
    { title: "Summer Sale", subtitle: "Up to 20% off on selected items", image: IMG("1606312619070-0859f91a7b0f"), link: "/shop", position: "homepage", sortOrder: 1 },
    { title: "Gift Boxes", subtitle: "Perfect for every occasion", image: IMG("1513885535751-8b9238b12210"), link: "/gift-boxes", position: "homepage", sortOrder: 2 },
  ];
  for (const b of banners) {
    await db.banner.create({ data: b }).catch(() => {});
  }
  console.log(`✓ ${banners.length} banners`);

  // Blog posts
  const posts = [
    {
      title: "5 Health Benefits of Medjool Dates You Didn't Know",
      slug: "health-benefits-medjool-dates",
      excerpt: "Discover why Medjool dates are nature's perfect energy snack.",
      content: "Medjool dates are one of the most nutrient-dense fruits on the planet. Rich in fiber, potassium, and natural sugars, they provide sustained energy without the crash.",
      coverImage: IMG("1606312619070-0859f91a7b0f"),
      author: "DayCrunch Team",
      isPublished: true,
      publishedAt: new Date("2026-05-01"),
    },
    {
      title: "The Ultimate Guide to Healthy Gifting This Festive Season",
      slug: "healthy-gifting-guide-festive-season",
      excerpt: "Skip the sweets and gift something that nourishes.",
      content: "This festive season, give the gift of health with our premium curated hampers featuring dates, nuts, and dark chocolates.",
      coverImage: IMG("1513885535751-8b9238b12210"),
      author: "DayCrunch Team",
      isPublished: true,
      publishedAt: new Date("2026-04-15"),
    },
    {
      title: "Why Dark Chocolate is Your Best Workout Recovery Snack",
      slug: "dark-chocolate-workout-recovery",
      excerpt: "Learn how 70%+ dark chocolate helps muscle recovery.",
      content: "Dark chocolate isn't just a treat — it's a recovery superfood packed with antioxidants and magnesium.",
      coverImage: IMG("1511381938455-4401b45f077e"),
      author: "DayCrunch Team",
      isPublished: false,
    },
  ];
  for (const post of posts) {
    await db.blogPost.upsert({
      where: { slug: post.slug },
      update: post,
      create: post,
    });
  }
  console.log(`✓ ${posts.length} blog posts`);

  // Sample orders
  const medjool = await db.product.findUnique({ where: { slug: "premium-medjool-dates" } });
  const almonds = await db.product.findUnique({ where: { slug: "california-almonds" } });
  const hamper = await db.product.findUnique({ where: { slug: "festive-gift-hamper" } });

  if (medjool && almonds && customerIds.length >= 3) {
    const orderData = [
      { userId: customerIds[0], orderNumber: "DC-SEED-001", status: "DELIVERED" as const, paymentStatus: "PAID" as const, items: [{ product: medjool, qty: 2, price: 449 }, { product: almonds, qty: 1, price: 399 }] },
      { userId: customerIds[1], orderNumber: "DC-SEED-002", status: "SHIPPED" as const, paymentStatus: "PAID" as const, items: [{ product: almonds, qty: 3, price: 399 }] },
      { userId: customerIds[2], orderNumber: "DC-SEED-003", status: "PROCESSING" as const, paymentStatus: "PAID" as const, items: [{ product: hamper!, qty: 1, price: 1999 }] },
      { userId: customerIds[0], orderNumber: "DC-SEED-004", status: "PENDING" as const, paymentStatus: "PENDING" as const, items: [{ product: medjool, qty: 1, price: 449 }] },
    ];

    for (const o of orderData) {
      const subtotal = o.items.reduce((s, i) => s + i.price * i.qty, 0);
      const existing = await db.order.findUnique({ where: { orderNumber: o.orderNumber } });
      if (existing) continue;

      await db.order.create({
        data: {
          orderNumber: o.orderNumber,
          userId: o.userId,
          status: o.status,
          paymentStatus: o.paymentStatus,
          subtotal,
          total: subtotal,
          items: {
            create: o.items.map((i) => ({
              productId: i.product.id,
              name: i.product.name,
              sku: i.product.sku,
              price: i.price,
              quantity: i.qty,
              total: i.price * i.qty,
            })),
          },
        },
      });
    }
    console.log(`✓ ${orderData.length} sample orders`);
  }

  // Site settings
  const settings = [
    { key: "store_name", value: "DAYCRUNCH" },
    { key: "store_tagline", value: "Crunch Better. Live Better." },
    { key: "store_email", value: "hello@daycrunch.in" },
    { key: "free_shipping_threshold", value: "999" },
  ];
  for (const s of settings) {
    await db.siteSetting.upsert({
      where: { key: s.key },
      update: { value: s.value },
      create: s,
    });
  }
  console.log("✓ Site settings");

  console.log("\n✅ Seed complete!");
  console.log("\nLogin credentials:");
  console.log("  Admin:    admin@daycrunch.in / admin123");
  console.log("  Customer: priya@email.com / customer123");
}

main()
  .catch((e) => {
    console.error("Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
    await pool.end();
  });
