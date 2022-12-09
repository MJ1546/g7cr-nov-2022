import express, { json } from "express";
import cors from "cors";
import { config } from "dotenv";
import { AppRoutes } from "./routes/approutes";
import diContainer from "./IoC/inversify.config";
import diTokens from "./constants/di-tokens";
import { ECommerceControllerContract } from "./controller/ecommerce-controller.contract";
import connectToDb from "./db/db";
import { AuthControllerContract } from "./controller/auth-controller.contract";

config()

const PORT = process.env.PORT || 4000

const PRODUCTS_BASE_URL = process.env.PRODUCTS_BASE_URL || '/api/products'
const AUTH_BASE_URL = process.env.AUTH_BASE_URL || '/api/auth'

const MONGODB_CONSTR = process.env.MONGODB_CONSTR || 'mongodb://127.0.0.1:27017'
const MONGODB_DATABASE = process.env.MONGODB_DATABASE || 'ecommercedb'

const app = express()
app.use(cors({ origin: '*', methods: '*', allowedHeaders: '*' }))
app.use(json())

const productControllerObj = diContainer.get<ECommerceControllerContract>(diTokens.PRODUCTS_CONTROLLER_TOKEN)

const authControllerObj = diContainer.get<AuthControllerContract>(diTokens.AUTH_CONTROLLER_TOKEN)

const appRoutes = new AppRoutes(productControllerObj, authControllerObj)
app.use(appRoutes.registerRoutes())

app.listen(
    PORT,
    () => {
        connectToDb(MONGODB_CONSTR, MONGODB_DATABASE)
        console.log(`ecommerce server is running at http://localhost:${PORT}${PRODUCTS_BASE_URL}`)
        console.log(`ecommerce server is running at http://localhost:${PORT}${AUTH_BASE_URL}`)
    }
)