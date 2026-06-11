import { db } from "@/lib/db";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const featured = searchParams.get("featured");
    const bestseller = searchParams.get("bestseller");
    const limit = parseInt(searchParams.get("limit") || "50");
    const skip = parseInt(searchParams.get("skip") || "0");

    const where = {
      isActive: true,
      ...(category && { category: { slug: category } }),
      ...(featured && { isFeatured: featured === "true" }),
      ...(bestseller && { isBestSeller: bestseller === "true" }),
    };

    const [products, total] = await Promise.all([
      db.product.findMany({
        where,
        include: {
          images: { orderBy: { sortOrder: "asc" } },
          category: true,
          variants: { where: { isActive: true } },
          _count: { select: { reviews: true } },
        },
        orderBy: { createdAt: "desc" },
        take: limit,
        skip,
      }),
      db.product.count({ where }),
    ]);

    return Response.json({ products, total, count: products.length });
  } catch (error) {
    console.error("Error fetching products:", error);
    return Response.json(
      { error: "Failed to fetch products" },
      { status: 500 },
    );
  }
}
