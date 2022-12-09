import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Product } from "../models/product.model"
import { initialSingleProductState, SingleProductStateType } from "./initialStates"

/*
const actionTypes = {
    SUCCESS: 'SUCCESS',
    FAILURE: 'FAILURE',
    INITIATE: 'INITIATE'
}

interface myActionType<T> {
    type: string;
    payload?: T
}
const initiateActionCreator = (): PayloadAction<null> => {
    const initiateAction = { type: actionTypes.INITIATE }
    return initiateAction
}
const successActionCreator = (data: Product): PayloadAction<Product> => {
    const successAction = { type: actionTypes.SUCCESS, payload: data }
    return successAction
}
const failureActionCreator = (data: string): PayloadAction<string> => {
    const failureAction = { type: actionTypes.FAILURE, payload: data }
    return failureAction
}

const singleProductReducer = (state: SingleProductStateType = initialSingleProductState, action: myActionType<Product | string>): SingleProductStateType => {
    let newState: SingleProductStateType;
    switch (action.type) {
        case actionTypes.INITIATE:
            newState = {
                ...state,
                loading: true,
                errorMessage: '',
                product: null
            }
            break;

        case actionTypes.SUCCESS:
            newState = {
                ...state,
                loading: false,
                errorMessage: '',
                product: action.payload ? action.payload as Product : null
            }
            break;

        case actionTypes.FAILURE:
            newState = {
                ...state,
                loading: false,
                errorMessage: action.payload ? action.payload as string : '',
                product: null
            }
            break;

        default:
            newState = state
            break;
    }
    return newState
}
*/

const singleProductSlice = createSlice({
    name: 'product',
    initialState: initialSingleProductState,
    reducers: {
        /*
        action type: product/initiate
        const initiate = (): PayloadAction<null> => {
            const initiateAction = { type: 'product/initiate' }
            return initiateAction
        } 
        */
        initiate: (state, action: PayloadAction<null>) => {
            state.loading = true
            state.errorMessage = ''
            state.product = null
        },
        /*
        action type:: product/success
        const success = (data: Product): PayloadAction<Product> => {
            const successAction = { type: 'product/success', payload: data }
            return successAction
        } 
        */
        success: (state, { payload }: PayloadAction<Product>) => {
            state.loading = false
            state.errorMessage = ''
            state.product = payload
        },
        /*
        action type: product/faliure
        
        const failure = (data: string): PayloadAction<string> => {
            const failureAction = { type: 'product/failure', payload: data }
            return failureAction
        }
         */
        failure: (state, { payload }: PayloadAction<string>) => {
            state.loading = false
            state.errorMessage = payload
            state.product = null
        }
    },
    extraReducers: (builder) => {

    }
})

export const singleProductReducer = singleProductSlice.reducer
export const { initiate: initiateCreator, success: successCreator, failure: failureCreator } = singleProductSlice.actions
