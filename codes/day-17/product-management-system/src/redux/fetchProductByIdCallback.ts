import { AnyAction } from "@reduxjs/toolkit"
import { CancelToken } from "axios"
import { Dispatch } from "react"
import { Subscription } from "rxjs"
import { getProductById } from "../services/productService"
import { failureCreator, initiateCreator, successCreator } from "./singleProductSlice"

const callbackCreator = (pid: number, cancellationToken: CancelToken, subscription?: Subscription) => {

    const fetchProductByIdCallback = (dispatch: Dispatch<AnyAction>): Subscription => {

        dispatch(initiateCreator(null))

        const obs = getProductById(pid, cancellationToken)
        subscription = obs
            .subscribe({
                next: (resp) => {
                    if (resp.data.data !== null)
                        dispatch(successCreator(resp.data.data))
                    else {
                        dispatch(failureCreator(resp.data.message))
                    }
                },
                error: (err) => {
                    dispatch(failureCreator(err.message))
                }
            })
        return subscription
    }
    return fetchProductByIdCallback
}

export default callbackCreator
