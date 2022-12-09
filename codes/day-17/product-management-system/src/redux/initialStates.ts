import { Product } from "../models/product.model"

export interface ProductsStateType {
    loading: boolean,
    errorMessage: string,
    products: Product[] | null
}

export const initialProductsState: ProductsStateType = {
    loading: true,
    errorMessage: '',
    products: []
}

export interface SingleProductStateType {
    loading: boolean;
    errorMessage: string;
    product: Product | null
}

export const initialSingleProductState: SingleProductStateType = {
    loading: true,
    errorMessage: '',
    product: null
}