import { NextResponse } from "next/server";
import prisma from "@/db";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const page = searchParams.get("page");
  const limit = searchParams.get("limit") as string;

  if (page) {
    const count = await prisma.store.count();
    const skipPage = parseInt(page) - 1;
    const stores = await prisma.store.findMany({
      orderBy: { id: "asc" },
      take: parseInt(limit),
      skip: skipPage * 10,
    });

    return NextResponse.json(
      {
        page: parseInt(page),
        data: stores,
        totalCount: count,
        totalPage: Math.ceil(count / 10),
      },
      {
        status: 200,
      }
    );
  } else {
    const stores = await prisma.store.findMany({
      orderBy: { id: "asc" },
    });

    return NextResponse.json(stores, {
      status: 200,
    });
  }
}
