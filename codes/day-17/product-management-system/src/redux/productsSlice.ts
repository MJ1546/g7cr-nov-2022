import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Product } from "../models/product.model"
import fetchProductsCallbackCreator from "./fetchProductsCallback"
import { initialProductsState } from "./initialStates"

export const productsSlice = createSlice({
    name: 'products',
    initialState: initialProductsState,
    reducers: {
        initiate: (state, action: PayloadAction<undefined>) => {
            state.loading = true
            state.products = []
            state.errorMessage = ''
        },
        success: (state, action: PayloadAction<Product[]>) => {
            state.loading = false
            state.errorMessage = ''
            state.products = action.payload
        },
        failure: (state, action: PayloadAction<string>) => {
            state.loading = false
            state.errorMessage = action.payload
            state.products = null
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(
                fetchProductsCallbackCreator.pending,
                (state) => {
                    state.loading = true
                    state.products = []
                    state.errorMessage = ''
                }
            )
            .addCase(
                fetchProductsCallbackCreator.fulfilled,
                (state, action: PayloadAction<Product[]>) => {
                    state.loading = false
                    state.errorMessage = ''
                    state.products = action.payload
                }
            )
            .addCase(
                fetchProductsCallbackCreator.rejected,
                (state, action) => {
                    state.loading = false
                    state.errorMessage = action.payload as string
                    state.products = null
                }
            )

    }
})

export const { initiate: initiateActionCreator, success: successActionCreator, failure: failureActionCreator } = productsSlice.actions

export const allProductsReducer = productsSlice.reducer