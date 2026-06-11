import { db } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const { ids } = await request.json();

    if (!Array.isArray(ids) || ids.length === 0) {
      return Response.json({ products: [] });
    }

    const products = await db.product.findMany({
      where: {
        id: { in: ids },
        isActive: true,
      },
      include: {
        images: { orderBy: { sortOrder: "asc" } },
        category: true,
        variants: { where: { isActive: true } },
        _count: { select: { reviews: true } },
      },
    });

    return Response.json({ products });
  } catch (error) {
    console.error("Error fetching products by IDs:", error);
    return Response.json(
      { error: "Failed to fetch products" },
      { status: 500 },
    );
  }
}
