import mongoose,{ Schema } from "mongoose"
const ProductSchema = new Schema({
    title: {type: String},
    description: {type: String},
    price: {type: Number}
})
export const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema);