import { injectable } from "inversify";
import ProductModel from "../db/models/productmodel";
import { Product } from "../models/product.model";
import { EcommerceBoContract } from "./ecommerce-bo.contract";
import 'reflect-metadata'

@injectable()
export class ProductsMongoBo implements EcommerceBoContract<Product>{
    async add(data: Product): Promise<Product> {
        try {
            const products = await ProductModel.find()
            let id = 1
            if (products.length > 0) {
                const lastRecord = products[products.length - 1]
                if (lastRecord.productId) {
                    id = lastRecord.productId + 1
                }
            }
            data.productId = id
            await ProductModel.create({ ...data })
            return data
        } catch (error) {
            throw error
        }
    }
    async update(data: Product, id: number): Promise<Product> {
        try {
            const found = await ProductModel.findOne({ productId: id })
            if (found) {
                data.productId = id
                const updated = await ProductModel.updateOne({ productId: id }, { ...data })
                if (updated.modifiedCount > 0)
                    return found as Product
                else
                    throw new Error(`the product with id:${id} could not be updated`)
            } else
                throw new Error(`the product with id:${id} does not exist`)
        } catch (error) {
            throw error
        }
    }
    async remove(id: number): Promise<Product> {
        try {
            const found = await ProductModel.findOne({ productId: id })
            if (found) {
                const deleted = await ProductModel.deleteOne({ productId: id })
                if (deleted.deletedCount > 0)
                    return found as Product
                else
                    throw new Error(`the product with id:${id} could not be deleted`)
            } else
                throw new Error(`the product with id:${id} does not exist`)
        } catch (error) {
            throw error
        }
    }
    async get(id: number): Promise<Product> {
        try {
            const found = await ProductModel.findOne({ productId: id })
            console.log(found)
            if (found) {
                const p = found as Product
                console.log(p)
                return p
            } else
                throw new Error(`the product with id:${id} does not exist`)
        } catch (error) {
            throw error
        }
    }
    async getAll(): Promise<Product[]> {
        try {
            const products = await ProductModel.find()
            if (products.length > 0) {
                return products as Product[]
            } else
                throw new Error(`no record found`)
        } catch (error) {
            throw error
        }
    }
}