import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { NextResponse } from "next/server";
import prisma from "@/db";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  const body = await req.json();
  const { storeId } = body;

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
