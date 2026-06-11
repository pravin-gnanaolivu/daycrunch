import { config } from "dotenv";
import path from "path";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";
import bcrypt from "bcryptjs";

// Load .env.local
config({ path: path.resolve(process.cwd(), ".env.local") });

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error("DATABASE_URL environment variable is not set");
}

const pool = new pg.Pool({ connectionString });
const adapter = new PrismaPg(pool);
const db = new PrismaClient({ adapter });

async function main() {
  console.log("Seeding DayCrunch database...");

  const adminPassword = await bcrypt.hash("admin123", 12);
  const admin = await db.user.upsert({
    where: { email: "admin@daycrunch.in" },
    update: {},
    create: {
      email: "admin@daycrunch.in",
      name: "Admin",
      password: adminPassword,
      role: "ADMIN",
    },
  });

  const categories = [
    {
      name: "Dates",
      slug: "dates",
      description: "Premium Medjool, Ajwa & more",
      sortOrder: 1,
    },
    {
      name: "Nuts",
      slug: "nuts",
      description: "Almonds, Cashews, Walnuts & more",
      sortOrder: 2,
    },
    {
      name: "Dry Fruits",
      slug: "dry-fruits",
      description: "Raisins, Apricots, Figs & more",
      sortOrder: 3,
    },
    {
      name: "Dark Chocolates",
      slug: "dark-chocolates",
      description: "70%+ cacao indulgence",
      sortOrder: 4,
    },
    {
      name: "Gift Boxes",
      slug: "gift-boxes",
      description: "Curated hampers for every occasion",
      sortOrder: 5,
    },
  ];

  for (const cat of categories) {
    await db.category.upsert({
      where: { slug: cat.slug },
      update: {},
      create: cat,
    });
  }

  const datesCategory = await db.category.findUnique({
    where: { slug: "dates" },
  });

  if (datesCategory) {
    await db.product.upsert({
      where: { slug: "premium-medjool-dates" },
      update: {},
      create: {
        name: "Premium Medjool Dates",
        slug: "premium-medjool-dates",
        description: "Experience the royal taste of premium Medjool dates.",
        shortDescription: "Soft, caramel-like Medjool dates.",
        categoryId: datesCategory.id,
        basePrice: 449,
        compareAtPrice: 549,
        sku: "DC-DT-001",
        stock: 150,
        isFeatured: true,
        isBestSeller: true,
        rating: 4.8,
        reviewCount: 234,
        ingredients: "100% Premium Medjool Dates",
        variants: {
          create: [
            {
              name: "250g",
              sku: "DC-DT-001-250",
              price: 449,
              weight: "250g",
              stock: 80,
            },
            {
              name: "500g",
              sku: "DC-DT-001-500",
              price: 799,
              weight: "500g",
              stock: 50,
            },
          ],
        },
        images: {
          create: [
            {
              url: "https://images.unsplash.com/photo-1606312619070-0859f91a7b0f?w=800",
              isPrimary: true,
              sortOrder: 0,
            },
          ],
        },
      },
    });
  }

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

  console.log("Seed complete!");
  console.log(`Admin: admin@daycrunch.in / admin123`);
}

main()
  .catch(console.error)
  .finally(async () => {
    await db.$disconnect();
    await pool.end();
  });
