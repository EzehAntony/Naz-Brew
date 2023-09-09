import dbConnect from "@/lib/mongodb";
import item from "@/models/item";
import { NextResponse } from "next/server";

export const GET = async () => {
  await dbConnect();
  try {
    const products = await item.find();
    return NextResponse.json({ data: products }, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { message: "An unexpected error has occured" },
      { status: 200 }
    );
  }
};
