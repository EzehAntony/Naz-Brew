import { NextApiResponse } from "next";
import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import item from "@/models/item";

export const POST = async (req: any) => {
  const body = await req.json();
  await dbConnect();
  try {
    const product = await item.findOne({ title: body.title });
    if (product) {
      return NextResponse.json(
        { data: "Item already exists" },
        { status: 403 }
      );
    } else {
      const newProduct = new item({
        title: body.title,
        description: body.description,
        price: body.price,
        available: body.available,
      });

      const savedProduct = await newProduct.save();
      return NextResponse.json({ data: savedProduct });
    }
  } catch (err) {
    return NextResponse.json({ err: err });
  }
};
