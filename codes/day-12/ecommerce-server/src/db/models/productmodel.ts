import { Schema, model } from "mongoose";

const productSchema = new Schema({
    productId: Number,
    productName: String,
    productCode: String,
    releaseDate: String,
    description: String,
    price: Number,
    starRating: Number,
    imageUrl: String
})

const ProductModel = model('products', productSchema)
export default ProductModel

