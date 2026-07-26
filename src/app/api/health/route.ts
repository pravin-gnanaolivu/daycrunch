import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  try {
    await db.$queryRaw`SELECT 1`;
    return NextResponse.json({ ok: true, database: "connected" });
  } catch (error) {
    console.error("Health check failed:", error);
    return NextResponse.json(
      {
        ok: false,
        database: "disconnected",
        hint: "Start PostgreSQL with: docker compose up -d && npm run db:push",
      },
      { status: 503 },
    );
  }
}
