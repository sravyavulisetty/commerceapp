import { mongooseConnect } from "@/app/lib/mongoose";
import { Product } from "@/models/Product";
import { NextResponse } from "next/server";
export async function GET(req,{params}) {
    const {id} = params;
    await mongooseConnect();
    const topic = await Product.findOne({ _id: id });
    return NextResponse.json(topic);
  }