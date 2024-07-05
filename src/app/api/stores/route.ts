import prisma from "@/db";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const stores = await prisma.store.findMany({
    orderBy: { id: "asc" },
  });

  return NextResponse.json(stores, {
    status: 200,
  });
}
