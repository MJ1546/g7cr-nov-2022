import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAllProducts } from "../services/productService";

const fetchProductsCallbackCreator = createAsyncThunk(
    'products/fetchProducts',
    async () => {
        try {
            const resp = await getAllProducts()
            return resp.data.data
        } catch (error: any) {
            return error.message
        }
    }
)

fetchProductsCallbackCreator()
export default fetchProductsCallbackCreator