import { Product } from "@/models/Product";
import { mongooseConnect } from "../../lib/mongoose";
import { NextResponse } from "next/server";
async function handler(req) {
    const {method} = req;
    await mongooseConnect();
    if (method === 'GET') {
      if (req.params?.id) {
        return NextResponse.json(await Product.findOne({_id: req.params.id}));
      } 
      else {
        return NextResponse.json(await Product.find());
      }
    }
    if(method === 'POST') {
      const data = await req.json();
      const {title, description, price} = data;
      const productDoc = await Product.create({
        title, description, price})
      return NextResponse.json(productDoc);
    }
    if(method === "PUT"){
      const data = await req.json();
      const {title, description, price, id} = data;
      const productUpdate = await Product.findOneAndUpdate({_id: id},{$set:{title: title, description: description, price: price}})
      return NextResponse.json(productUpdate);
    }
}
export {handler as GET, handler as POST, handler as PUT};
