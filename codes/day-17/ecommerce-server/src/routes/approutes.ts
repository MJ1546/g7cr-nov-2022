import { Router } from "express";
import diTokens from "../constants/di-tokens";
import { ECommerceControllerContract } from "../controller/ecommerce-controller.contract";
import { injectable, inject } from "inversify";
import 'reflect-metadata'
import { AuthControllerContract } from "../controller/auth-controller.contract";
import { verifyToken } from "../middlewares/jwt-middleware";

const PRODUCTS_BASE_URL = process.env.PRODUCTS_BASE_URL || '/api/products'
const AUTH_BASE_URL = process.env.AUTH_BASE_URL || '/api/auth'

@injectable()
export class AppRoutes {

    constructor(
        @inject(diTokens.PRODUCTS_CONTROLLER_TOKEN)
        private productsController: ECommerceControllerContract,
        @inject(diTokens.AUTH_CONTROLLER_TOKEN)
        private authController: AuthControllerContract
    ) {

    }

    registerRoutes(): Router {
        const routerMiddleware = Router()

        routerMiddleware.post(`${AUTH_BASE_URL}/register`, this.authController.registerAction)
        routerMiddleware.post(`${AUTH_BASE_URL}/login`, this.authController.loginAction)

        routerMiddleware.get(
            PRODUCTS_BASE_URL, verifyToken,
            this.productsController.getAllAction
        )
        routerMiddleware.get(`${PRODUCTS_BASE_URL}/:id`, verifyToken, this.productsController.getAction)
        routerMiddleware.post(PRODUCTS_BASE_URL, verifyToken,
            this.productsController.postAction)
        routerMiddleware.put(`${PRODUCTS_BASE_URL}/:id`, verifyToken, this.productsController.putAction)
        routerMiddleware.delete(`${PRODUCTS_BASE_URL}/:id`, verifyToken, this.productsController.deleteAction)

        return routerMiddleware
    }
}