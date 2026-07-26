import { Prisma } from "@prisma/client";

export function getDbErrorMessage(error: unknown): string {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    switch (error.code) {
      case "P1001":
        return "Database is unavailable. Please start PostgreSQL and try again.";
      case "P2021":
        return "Database schema is out of date. Run npm run db:push and try again.";
      case "P2002":
        return "A duplicate record was detected. Please try again.";
      case "P2025":
        return "Record not found.";
      default:
        break;
    }
  }

  if (error instanceof Prisma.PrismaClientInitializationError) {
    return "Database connection failed. Please ensure PostgreSQL is running.";
  }

  if (error instanceof Error) {
    if (error.message.includes("ECONNREFUSED")) {
      return "Database is unavailable. Please start PostgreSQL with: docker compose up -d";
    }
    return error.message;
  }

  return "Something went wrong. Please try again.";
}

export function isDbConnectionError(error: unknown): boolean {
  if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P1001") {
    return true;
  }
  if (error instanceof Prisma.PrismaClientInitializationError) {
    return true;
  }
  if (error instanceof Error && error.message.includes("ECONNREFUSED")) {
    return true;
  }
  return false;
}
