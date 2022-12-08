import { configureStore } from "@reduxjs/toolkit"
import { createLogger } from "redux-logger"
import { allProductsReducer } from "./productsSlice"
import { singleProductReducer } from "./singleProductSlice"
import thunkMiddleware from 'redux-thunk'

const loggerMiddleware = createLogger()

const store = configureStore({
    reducer: {
        allProducts: allProductsReducer,
        singleProduct: singleProductReducer
    },
    middleware: [loggerMiddleware, thunkMiddleware]
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store