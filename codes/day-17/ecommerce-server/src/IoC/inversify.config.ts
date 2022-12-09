import { Container } from "inversify";
import diTokens from '../constants/di-tokens'
import { ProductsDao } from "../dao/products-dao";
import { EcommerDaoContarct } from "../dao/ecommerce-dao.contract";
import { Product } from "../models/product.model";
import { ProductsBo } from "../bo/products-bo";
import { EcommerceBoContract } from "../bo/ecommerce-bo.contract";
import { ProductsController } from "../controller/products-controller";
import { ECommerceControllerContract } from "../controller/ecommerce-controller.contract";
import { ProductsMongoBo } from "../bo/products-mongo-bo";
import { AuthControllerContract } from "../controller/auth-controller.contract";
import { AuthController } from "../controller/auth-controller";
import { UsersBo } from "../bo/users-bo";
import { UsersBoContract } from "../bo/users-bo.contract";

const diContainer = new Container()

diContainer.bind<EcommerDaoContarct<Product>>(diTokens.PRODUCTS_DAO_TOKEN).to(ProductsDao)

// diContainer.bind<EcommerceBoContract<Product>>(diTokens.PRODUCTS_BO_TOKEN).to(ProductsBo)

diContainer.bind<EcommerceBoContract<Product>>(diTokens.PRODUCTS_BO_TOKEN).to(ProductsMongoBo)
diContainer.bind<UsersBoContract>(diTokens.USERS_BO_TOKEN).to(UsersBo)

diContainer.bind<ECommerceControllerContract>(diTokens.PRODUCTS_CONTROLLER_TOKEN).to(ProductsController)

diContainer.bind<AuthControllerContract>(diTokens.AUTH_CONTROLLER_TOKEN).to(AuthController)

export default diContainer