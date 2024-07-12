import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { NextResponse } from "next/server";
import prisma from "@/db";

export async function GET(req: Request) {
  const session = await getServerSession(authOptions);
  const { searchParams } = new URL(req.url);
  const page = searchParams.get("page") as string;
  const limit = searchParams.get("limit") as string;

  if (!session?.user) {
    return NextResponse.json(null, {
      status: 401,
    });
  }

  const count = await prisma.like.count({
    where: {
      userId: parseInt(session?.user?.id),
    },
  });

  const skipPage = parseInt(page) - 1;
  const likes = await prisma.like.findMany({
    orderBy: {
      createdAt: "desc",
    },
    where: {
      userId: parseInt(session?.user?.id),
    },
    include: {
      store: true,
    },
    skip: skipPage * parseInt(limit),
    take: parseInt(limit),
  });

  return NextResponse.json(
    {
      data: likes,
      page: parseInt(page),
      totalPage: Math.ceil(count / parseInt(limit)),
    },
    {
      status: 200,
    }
  );
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  const body = await req.json();
  const { storeId } = body;

  if (!session?.user) {
    return NextResponse.json(null, {
      status: 401,
    });
  }

  let like = await prisma.like.findFirst({
    where: {
      storeId,
      userId: parseInt(session?.user?.id as string),
    },
  });

  if (like) {
    await prisma.like.delete({
      where: {
        id: like.id,
      },
    });

    return NextResponse.json(null, {
      status: 200,
    });
  } else {
    like = await prisma.like.create({
      data: {
        storeId,
        userId: parseInt(session?.user?.id as string),
      },
    });

    return NextResponse.json(like, {
      status: 201,
    });
  }
}
