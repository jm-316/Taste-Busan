import axios from "axios";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import prisma from "@/db";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const page = searchParams.get("page");
  const limit = searchParams.get("limit") as string;
  const query = searchParams.get("query");
  const district = searchParams.get("district");
  const id = searchParams.get("id");
  const mypage = searchParams.get("mypage");

  const session = await getServerSession(authOptions);
  const userId = session?.user?.id as string;

  if (page && mypage) {
    const skipPage = parseInt(page) - 1;
    const count = await prisma.store.count({
      where: { userId: parseInt(userId) },
    });

    const stores = await prisma.store.findMany({
      orderBy: {
        id: "asc",
      },
      where: {
        userId: parseInt(userId),
      },
      skip: skipPage * parseInt(limit),
      take: parseInt(limit),
    });

    return NextResponse.json(
      {
        page: parseInt(page),
        data: stores,
        totalCount: count,
        totalPage: Math.ceil(count / parseInt(limit)),
      },
      {
        status: 200,
      }
    );
  } else if (page) {
    const count = await prisma.store.count();
    const skipPage = parseInt(page) - 1;
    const stores = await prisma.store.findMany({
      orderBy: { id: "asc" },
      where: {
        name: query ? { contains: query } : {},
        localCategory: district ? { contains: district } : {},
      },
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
      where: {
        id: id ? parseInt(id) : {},
      },
      include: {
        likes: {
          where: session ? { userId: parseInt(userId) } : {},
        },
      },
    });

    return NextResponse.json(id ? stores[0] : stores, {
      status: 200,
    });
  }
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  const formData = await req.json();
  const headers = {
    Authorization: `KakaoAK ${process.env.KAKAO_CLIENT_ID}`,
  };

  const { data } = await axios.get(
    `https://dapi.kakao.com/v2/local/search/address.json?query=${encodeURI(
      formData.address
    )}`,
    { headers }
  );

  const result = await prisma.store.create({
    data: {
      ...formData,
      lat: parseFloat(data.documents[0].y),
      lng: parseFloat(data.documents[0].x),
      userId: parseInt(session?.user.id as string),
    },
  });

  return NextResponse.json(result, { status: 200 });
}

export async function PUT(req: Request) {
  const formData = await req.json();
  const headers = {
    Authorization: `KakaoAK ${process.env.KAKAO_CLIENT_ID}`,
  };

  const { data } = await axios.get(
    `https://dapi.kakao.com/v2/local/search/address.json?query=${encodeURI(
      formData.address
    )}`,
    { headers }
  );

  const result = await prisma.store.update({
    where: { id: formData.id },
    data: {
      ...formData,
      lat: parseFloat(data.documents[0].y),
      lng: parseFloat(data.documents[0].x),
    },
  });

  return NextResponse.json(result, { status: 200 });
}

export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (id) {
    const result = await prisma.store.delete({
      where: {
        id: parseInt(id),
      },
    });

    return NextResponse.json(result, {
      status: 200,
    });
  }

  return NextResponse.json(null, {
    status: 500,
  });
}
